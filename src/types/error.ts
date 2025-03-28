export interface ApiError {
  response?: {
    status: number;
    data?: unknown;
  };
  code?: string;
  message?: string;
}

export interface SupabaseError extends ApiError {
  code: string;
  message: string;
  details?: string;
  hint?: string;
} 