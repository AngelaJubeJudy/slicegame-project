import React, { useState, useEffect } from 'react';
import { ThumbsUp, ThumbsDown, Meh } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface FeedbackData {
  good: number;
  bad: number;
  normal: number;
  userVotes: {
    good: boolean;
    bad: boolean;
    normal: boolean;
  };
}

const FeedbackCards: React.FC = () => {
  const { t } = useTranslation();
  const [feedback, setFeedback] = useState<FeedbackData>(() => {
    const savedData = localStorage.getItem('feedbackData');
    return savedData ? JSON.parse(savedData) : {
      good: 0,
      bad: 0,
      normal: 0,
      userVotes: {
        good: false,
        bad: false,
        normal: false
      }
    };
  });

  useEffect(() => {
    localStorage.setItem('feedbackData', JSON.stringify(feedback));
  }, [feedback]);

  const handleVote = (type: 'good' | 'bad' | 'normal') => {
    setFeedback(prev => {
      const newVotes = { ...prev.userVotes };
      const isVoting = !prev.userVotes[type];
      
      // 如果之前投过票，先取消之前的投票
      Object.keys(newVotes).forEach(key => {
        if (newVotes[key as keyof typeof newVotes]) {
          prev[key as keyof typeof prev]--;
        }
      });

      // 设置新的投票状态
      newVotes[type] = isVoting;
      
      return {
        ...prev,
        [type]: isVoting ? prev[type] + 1 : prev[type],
        userVotes: newVotes
      };
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
      <div 
        className={`p-6 rounded-lg shadow-md cursor-pointer transition-all ${
          feedback.userVotes.good 
            ? 'bg-green-200 dark:bg-green-800' 
            : 'bg-green-50 dark:bg-green-900/30'
        }`}
        onClick={() => handleVote('good')}
      >
        <div className="flex items-center justify-between mb-4">
          <ThumbsUp className={`w-6 h-6 ${
            feedback.userVotes.good ? 'text-green-500' : 'text-gray-500'
          }`} />
          <span className="text-2xl font-bold">{feedback.good}</span>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-green-300">{t('feedback.good')}</h3>
        <p className="text-gray-600 dark:text-gray-300">{t('feedback.goodDescription')}</p>
      </div>

      <div 
        className={`p-6 rounded-lg shadow-md cursor-pointer transition-all ${
          feedback.userVotes.bad 
            ? 'bg-red-200 dark:bg-red-800' 
            : 'bg-red-50 dark:bg-red-900/30'
        }`}
        onClick={() => handleVote('bad')}
      >
        <div className="flex items-center justify-between mb-4">
          <ThumbsDown className={`w-6 h-6 ${
            feedback.userVotes.bad ? 'text-red-500' : 'text-gray-500'
          }`} />
          <span className="text-2xl font-bold">{feedback.bad}</span>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-red-300">{t('feedback.bad')}</h3>
        <p className="text-gray-600 dark:text-gray-300">{t('feedback.badDescription')}</p>
      </div>

      <div 
        className={`p-6 rounded-lg shadow-md cursor-pointer transition-all ${
          feedback.userVotes.normal 
            ? 'bg-yellow-200 dark:bg-yellow-800' 
            : 'bg-yellow-50 dark:bg-yellow-900/30'
        }`}
        onClick={() => handleVote('normal')}
      >
        <div className="flex items-center justify-between mb-4">
          <Meh className={`w-6 h-6 ${
            feedback.userVotes.normal ? 'text-yellow-500' : 'text-gray-500'
          }`} />
          <span className="text-2xl font-bold">{feedback.normal}</span>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-yellow-300">{t('feedback.normal')}</h3>
        <p className="text-gray-600 dark:text-gray-300">{t('feedback.normalDescription')}</p>
      </div>
    </div>
  );
};

export default FeedbackCards;