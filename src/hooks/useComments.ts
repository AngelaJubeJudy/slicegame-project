import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import type { Comment, CommentFormData } from '../types/comment'

export function useComments() {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const COMMENTS_PER_PAGE = 10

  // 获取评论列表
  const fetchComments = async (pageNum: number = 1) => {
    try {
      setLoading(true)
      const from = (pageNum - 1) * COMMENTS_PER_PAGE
      const to = from + COMMENTS_PER_PAGE - 1

      const { data, error, count } = await supabase
        .from('comments')
        .select('*', { count: 'exact' })
        .eq('is_approved', true)
        .order('created_at', { ascending: false })
        .range(from, to)

      if (error) throw error

      if (pageNum === 1) {
        setComments(data)
      } else {
        setComments(prev => [...prev, ...data])
      }

      setHasMore(data.length === COMMENTS_PER_PAGE)
      setPage(pageNum)
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取评论失败')
    } finally {
      setLoading(false)
    }
  }

  // 添加评论
  const addComment = async (formData: CommentFormData) => {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) throw new Error('请先登录')

      const { data, error } = await supabase
        .from('comments')
        .insert([{
          content: formData.content,
          parent_id: formData.parent_id,
          user_id: user.id,
          is_approved: false // 默认需要审核
        }])
        .select()

      if (error) throw error
      setComments(prev => [data[0], ...prev])
      return data[0]
    } catch (err) {
      setError(err instanceof Error ? err.message : '添加评论失败')
      throw err
    }
  }

  // 更新评论
  const updateComment = async (id: string, content: string) => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .update({ 
          content,
          is_edited: true,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()

      if (error) throw error
      setComments(prev => 
        prev.map(comment => 
          comment.id === id ? data[0] : comment
        )
      )
      return data[0]
    } catch (err) {
      setError(err instanceof Error ? err.message : '更新评论失败')
      throw err
    }
  }

  // 删除评论
  const deleteComment = async (id: string) => {
    try {
      const { error } = await supabase
        .from('comments')
        .delete()
        .eq('id', id)

      if (error) throw error
      setComments(prev => prev.filter(comment => comment.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : '删除评论失败')
      throw err
    }
  }

  // 加载更多评论
  const loadMore = () => {
    if (!loading && hasMore) {
      fetchComments(page + 1)
    }
  }

  useEffect(() => {
    fetchComments()
  }, [])

  return {
    comments,
    loading,
    error,
    hasMore,
    addComment,
    updateComment,
    deleteComment,
    loadMore
  }
} 