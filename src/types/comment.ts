export interface Comment {
  id: string
  user_id: string
  content: string
  created_at: string
  updated_at: string
  parent_id?: string
  is_edited?: boolean
  is_approved?: boolean
}

export interface CommentFormData {
  content: string
  parent_id?: string
} 