import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { generateUsername } from '../utils/username'
import { handleApiError } from '../utils/errorHandler'
import type { Review } from '../types/review'

export function useReviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(false)
  const [likeLoading, setLikeLoading] = useState(false)
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
      setError(handleApiError(err))
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
      setError(handleApiError(err))
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
      setError(handleApiError(err))
      throw err
    } finally {
      setLoading(false)
    }
  }

  // 点赞评论
  const likeReview = async (id: string) => {
    try {
      setLikeLoading(true)
      setError(null)

      // 使用原子操作更新点赞数
      const { data, error } = await supabase
        .rpc('toggle_like', { p_review_id: id })

      if (error) {
        console.error('点赞操作失败:', error)
        throw error
      }

      if (!data || data.length === 0) {
        console.error('点赞操作未返回数据')
        throw new Error('操作失败')
      }

      const { likes, is_liked } = data[0]

      // 更新本地状态
      setReviews(prev => 
        prev.map(review => 
          review.id === id 
            ? { 
                ...review, 
                likes,
                is_liked
              } 
            : review
        )
      )
    } catch (err) {
      console.error('点赞操作失败:', err)
      setError(handleApiError(err))
    } finally {
      setLikeLoading(false)
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  return {
    reviews,
    loading,
    likeLoading,
    error,
    submitReview,
    deleteReview,
    likeReview
  }
} 