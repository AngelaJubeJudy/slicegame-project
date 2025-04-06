import { v4 as uuidv4 } from 'uuid'

export interface Feedback {
  id: string
  type: 'good' | 'bad' | 'normal'
  count: number
  userVotes: Set<string> // 存储用户ID，用于防止重复投票
}

export interface Comment {
  id: string
  content: string
  username: string
  created_at: string
  feedback: Feedback[]
}

const STORAGE_KEY = 'slicegame_comments'
const USER_ID_KEY = 'slicegame_user_id'

// 获取或生成用户ID
const getUserId = (): string => {
  const userId = localStorage.getItem(USER_ID_KEY)
  if (!userId) {
    const newUserId = uuidv4()
    localStorage.setItem(USER_ID_KEY, newUserId)
    return newUserId
  }
  return userId
}

// 获取所有评论
export const getComments = (): Comment[] => {
  const comments = localStorage.getItem(STORAGE_KEY)
  if (!comments) return []
  try {
    const parsedComments = JSON.parse(comments)
    return Array.isArray(parsedComments) ? parsedComments : []
  } catch {
    return []
  }
}

// 保存所有评论
const saveComments = (comments: Comment[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(comments))
}

// 添加评论
export const addComment = (content: string, username: string): Comment => {
  const comments = getComments()
  const newComment: Comment = {
    id: uuidv4(),
    content,
    username,
    created_at: new Date().toISOString(),
    feedback: [
      { id: 'good', type: 'good', count: 0, userVotes: new Set() },
      { id: 'bad', type: 'bad', count: 0, userVotes: new Set() },
      { id: 'normal', type: 'normal', count: 0, userVotes: new Set() }
    ]
  }
  
  comments.unshift(newComment)
  saveComments(comments)
  return newComment
}

// 删除评论
export const deleteComment = (id: string): void => {
  const comments = getComments()
  const filteredComments = comments.filter(comment => comment.id !== id)
  saveComments(filteredComments)
}

// 更新反馈
export const updateFeedback = (commentId: string, feedbackType: 'good' | 'bad' | 'normal'): void => {
  const comments = getComments()
  const userId = getUserId()
  
  const updatedComments = comments.map(comment => {
    if (comment.id === commentId) {
      const feedback = comment.feedback.find(f => f.type === feedbackType)
      if (feedback) {
        const hasVoted = feedback.userVotes.has(userId)
        if (hasVoted) {
          // 取消投票
          feedback.count--
          feedback.userVotes.delete(userId)
        } else {
          // 添加投票
          feedback.count++
          feedback.userVotes.add(userId)
        }
      }
    }
    return comment
  })
  
  saveComments(updatedComments)
} 