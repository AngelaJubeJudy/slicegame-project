import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ArrowUpDown, ThumbsUp, ThumbsDown, Minus } from 'lucide-react';
import type { Comment } from '../lib/localStorage';

interface ReviewListProps {
  comments: Comment[];
  onFeedback: (id: string, type: 'good' | 'bad' | 'normal') => void;
}

type SortType = 'latest' | 'hottest';

export function ReviewList({ comments, onFeedback }: ReviewListProps) {
  const { t } = useTranslation();
  const [sortType, setSortType] = useState<SortType>('latest');

  const sortedComments = [...comments].sort((a, b) => {
    if (sortType === 'latest') {
      return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    } else {
      // 按总反馈数排序
      const getTotalFeedback = (comment: Comment) => 
        comment.feedback.reduce((sum, f) => sum + f.count, 0);
      return getTotalFeedback(b) - getTotalFeedback(a);
    }
  });

  const getFeedbackCount = (comment: Comment, type: 'good' | 'bad' | 'normal') => {
    const feedback = comment.feedback.find(f => f.type === type);
    return feedback ? feedback.count : 0;
  };

  const isVoted = (comment: Comment, type: 'good' | 'bad' | 'normal') => {
    const feedback = comment.feedback.find(f => f.type === type);
    return feedback?.userVotes.has(localStorage.getItem('slicegame_user_id') || '') || false;
  };

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
        {sortedComments.map((comment) => (
          <div key={comment.id} className="bg-white dark:bg-primary-dark p-4 rounded-lg shadow-sm">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <p className="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">
                  {comment.content}
                </p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{comment.username}</span>
                  <span>•</span>
                  <span>{new Date(comment.created_at).toLocaleString()}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onFeedback(comment.id, 'good')}
                  className={`p-2 rounded-full transition-colors ${
                    isVoted(comment, 'good')
                      ? 'bg-green-100 dark:bg-green-900 text-green-500'
                      : 'hover:bg-gray-100 dark:hover:bg-primary-light text-gray-500'
                  }`}
                  title="Good"
                >
                  <ThumbsUp className="w-4 h-4" />
                  <span className="ml-1">{getFeedbackCount(comment, 'good')}</span>
                </button>
                <button
                  onClick={() => onFeedback(comment.id, 'bad')}
                  className={`p-2 rounded-full transition-colors ${
                    isVoted(comment, 'bad')
                      ? 'bg-red-100 dark:bg-red-900 text-red-500'
                      : 'hover:bg-gray-100 dark:hover:bg-primary-light text-gray-500'
                  }`}
                  title="Bad"
                >
                  <ThumbsDown className="w-4 h-4" />
                  <span className="ml-1">{getFeedbackCount(comment, 'bad')}</span>
                </button>
                <button
                  onClick={() => onFeedback(comment.id, 'normal')}
                  className={`p-2 rounded-full transition-colors ${
                    isVoted(comment, 'normal')
                      ? 'bg-yellow-100 dark:bg-yellow-900 text-yellow-500'
                      : 'hover:bg-gray-100 dark:hover:bg-primary-light text-gray-500'
                  }`}
                  title="Normal"
                >
                  <Minus className="w-4 h-4" />
                  <span className="ml-1">{getFeedbackCount(comment, 'normal')}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 