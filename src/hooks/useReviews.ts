import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { generateUsername } from '../utils/username'

export interface Review {
  id: string
  rating: number
  content: string
  username: string
  created_at: string
  likes: number
}

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 获取评论列表
  const fetchReviews = async () => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setReviews(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : '获取评论失败')
    } finally {
      setLoading(false)
    }
  }

  // 提交评论
  const submitReview = async (rating: number, content: string, language: string) => {
    try {
      setLoading(true)
      setError(null)

      const username = generateUsername(language)

      const { data, error } = await supabase
        .from('reviews')
        .insert([
          {
            rating,
            content,
            username,
            likes: 0
          }
        ])
        .select()

      if (error) throw error
      setReviews(prev => [data[0], ...prev])
      return data[0]
    } catch (err) {
      setError(err instanceof Error ? err.message : '提交评价失败')
      throw err
    } finally {
      setLoading(false)
    }
  }

  // 删除评论
  const deleteReview = async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      const { error } = await supabase
        .from('reviews')
        .delete()
        .eq('id', id)

      if (error) throw error
      setReviews(prev => prev.filter(review => review.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : '删除评论失败')
      throw err
    } finally {
      setLoading(false)
    }
  }

  // 点赞评论
  const likeReview = async (id: string) => {
    try {
      setLoading(true)
      setError(null)

      // 先获取当前评论
      const { data: currentReview, error: fetchError } = await supabase
        .from('reviews')
        .select('*')
        .eq('id', id)
        .single()

      if (fetchError) {
        throw new Error('获取评论失败')
      }

      if (!currentReview) {
        throw new Error('评论不存在')
      }

      // 更新likes值（如果已经点赞则取消点赞）
      const newLikes = (currentReview.likes || 0) > 0 ? 0 : 1

      const { data, error } = await supabase
        .from('reviews')
        .update({ likes: newLikes })
        .eq('id', id)
        .select()

      if (error) {
        throw new Error('更新点赞失败')
      }

      if (!data || data.length === 0) {
        throw new Error('更新失败')
      }

      // 更新本地状态
      setReviews(prev => 
        prev.map(review => 
          review.id === id ? { ...review, likes: newLikes } : review
        )
      )
    } catch (err) {
      setError(err instanceof Error ? err.message : '操作失败')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  return {
    reviews,
    loading,
    error,
    submitReview,
    deleteReview,
    likeReview
  }
} 