import i18next from 'i18next';
import type { ApiError, SupabaseError } from '../types/error';

export function getErrorMessage(statusCode: number): string {
  if (statusCode >= 500) {
    return i18next.t('errors.serverError');
  } else if (statusCode >= 400) {
    return i18next.t('errors.clientError');
  }
  
  return i18next.t('errors.unknownError');
}

export function handleApiError(error: unknown): string {
  const apiError = error as ApiError;
  if (apiError?.response?.status) {
    return getErrorMessage(apiError.response.status);
  }
  
  const supabaseError = error as SupabaseError;
  if (supabaseError?.code) {
    if (supabaseError.code === '23505') {
      return i18next.t('errors.duplicateOperation');
    } else if (supabaseError.code === '23503') {
      return i18next.t('errors.notFound');
    }
  }
  
  return getErrorMessage(500);
} 