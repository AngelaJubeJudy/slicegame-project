export interface Review {
  id: string;
  rating: number;
  content: string;
  username: string;
  created_at: string;
  likes: number;
  is_liked: boolean;
} 