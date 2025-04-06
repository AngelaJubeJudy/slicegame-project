import { useState, useEffect } from 'react'
import { generateUsername } from '../utils/username'
import { getComments, addComment as addCommentToStorage, deleteComment as deleteCommentFromStorage, updateFeedback as updateFeedbackInStorage } from '../lib/localStorage'
import type { Comment } from '../lib/localStorage'
import { useTranslation } from 'react-i18next'

export function useComments() {
  const { t } = useTranslation()
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // 获取评论列表
  const fetchComments = () => {
    try {
      setLoading(true)
      const storedComments = getComments()
      setComments(storedComments)
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errors.fetchCommentsFailed'))
    } finally {
      setLoading(false)
    }
  }

  // 添加评论
  const addComment = async (content: string, language: string) => {
    try {
      setLoading(true)
      const username = generateUsername(language)
      const newComment = addCommentToStorage(content, username)
      setComments(prev => [newComment, ...prev])
      return newComment
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errors.addCommentFailed'))
      throw err
    } finally {
      setLoading(false)
    }
  }

  // 删除评论
  const deleteComment = (id: string) => {
    try {
      deleteCommentFromStorage(id)
      setComments(prev => prev.filter(comment => comment.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errors.deleteCommentFailed'))
      throw err
    }
  }

  // 更新反馈
  const updateFeedback = (commentId: string, feedbackType: 'good' | 'bad' | 'normal') => {
    try {
      updateFeedbackInStorage(commentId, feedbackType)
      fetchComments() // 重新获取评论列表以更新状态
    } catch (err) {
      setError(err instanceof Error ? err.message : t('errors.updateFeedbackFailed'))
    }
  }

  useEffect(() => {
    fetchComments()
  }, [])

  return {
    comments,
    loading,
    error,
    addComment,
    deleteComment,
    updateFeedback
  }
} 