import { supabase } from '../lib/supabaseClient';
import type { FeedbackData, FeedbackRecord } from '../types/feedback';

export const feedbackService = {
  async getFeedback(): Promise<FeedbackData> {
    const { data, error } = await supabase
      .from('feedback')
      .select('*');

    if (error) throw error;

    // 转换数据格式
    const feedback: FeedbackData = {
      good: 0,
      bad: 0,
      normal: 0,
      userVotes: {
        good: false,
        bad: false,
        normal: false
      }
    };

    data.forEach((record: FeedbackRecord) => {
      feedback[record.type] = record.count;
      // 检查当前用户是否已投票
      const userId = supabase.auth.user()?.id;
      if (userId) {
        feedback.userVotes[record.type] = record.user_votes.includes(userId);
      }
    });

    return feedback;
  },

  async updateFeedback(type: 'good' | 'bad' | 'normal'): Promise<FeedbackData> {
    const userId = supabase.auth.user()?.id;
    if (!userId) throw new Error('User not authenticated');

    // 获取当前反馈记录
    const { data: currentData, error: fetchError } = await supabase
      .from('feedback')
      .select('*')
      .eq('type', type)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') throw fetchError;

    if (!currentData) {
      // 创建新记录
      const { error: insertError } = await supabase
        .from('feedback')
        .insert({
          type,
          count: 1,
          user_votes: [userId]
        });

      if (insertError) throw insertError;
    } else {
      // 更新现有记录
      const hasVoted = currentData.user_votes.includes(userId);
      const { error: updateError } = await supabase
        .from('feedback')
        .update({
          count: Math.max(0, currentData.count + (hasVoted ? -1 : 1)),
          user_votes: hasVoted
            ? currentData.user_votes.filter(id => id !== userId)
            : [...currentData.user_votes, userId]
        })
        .eq('type', type);

      if (updateError) throw updateError;
    }

    // 返回更新后的数据
    return this.getFeedback();
  }
};