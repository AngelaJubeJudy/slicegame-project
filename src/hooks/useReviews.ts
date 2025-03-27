import { useState } from 'react'
import { supabase } from '../lib/supabase'

export interface Review {
  rating: number
  content: string
  user_id?: string
  created_at: string
}

export function useReviews() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const submitReview = async (rating: number, content: string) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from('reviews')
        .insert([
          {
            rating,
            content
          }
        ])
        .select()

      if (error) throw error
      return data[0]
    } catch (err) {
      setError(err instanceof Error ? err.message : '提交评价失败')
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    submitReview,
    loading,
    error
  }
} 