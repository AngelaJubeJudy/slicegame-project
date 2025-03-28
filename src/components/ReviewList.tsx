import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ThumbsUp, ArrowUpDown } from 'lucide-react';
import type { Review } from '../hooks/useReviews';

interface ReviewListProps {
  reviews: Review[];
  onLike: (id: string) => Promise<void>;
  likeLoading: boolean;
}

type SortType = 'latest' | 'hottest';

export function ReviewList({ reviews, onLike, likeLoading }: ReviewListProps) {
  const { t } = useTranslation();
  const [sortType, setSortType] = useState<SortType>('latest');

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortType === 'latest') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    } else {
      return (b.likes || 0) - (a.likes || 0);
    }
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold">{t('testimonials.reviewList')}</h3>
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-gray-500" />
          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value as SortType)}
            className="bg-transparent border-none focus:outline-none text-sm"
          >
            <option value="latest">{t('testimonials.sortLatest')}</option>
            <option value="hottest">{t('testimonials.sortHottest')}</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {sortedReviews.map((review) => (
          <div key={review.id} className="bg-white dark:bg-primary-dark p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${
                        i < review.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                  {review.content}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{new Date(review.created_at).toLocaleString()}</span>
                  <span>•</span>
                  <span>{review.likes || 0} {t('testimonials.likes')}</span>
                </div>
              </div>
              <button
                onClick={() => onLike(review.id)}
                disabled={likeLoading}
                className={`p-1 rounded-full transition-colors ${
                  review.is_liked 
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-500' 
                    : 'hover:bg-gray-100 dark:hover:bg-primary-light text-gray-500'
                } ${likeLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <ThumbsUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 