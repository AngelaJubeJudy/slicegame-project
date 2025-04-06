import { supabase } from '../lib/supabaseClient';
import type { FeedbackData, FeedbackRecord } from '../types/feedback';

// 生成匿名用户ID
const getAnonymousUserId = () => {
    let userId = localStorage.getItem('anonymous_user_id');
    if (!userId) {
    userId = 'anon_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('anonymous_user_id', userId);
    }
    return userId;
};

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

    // data.forEach((record: FeedbackRecord) => {
    //   feedback[record.type] = record.count;
    //   // 检查当前用户是否已投票
    //   const { data: { user } } = await supabase.auth.getUser();
    //   if (!user) throw new Error('User not authenticated');
    // //   const userId = supabase.auth.user()?.id;
    //   const userId = user?.id;
    //   if (userId) {
    //     feedback.userVotes[record.type] = record.user_votes.includes(userId);
    //   }
    // });
    // for (const record of data) {
    //     feedback[record.type] = record.count;
    //     // 检查当前用户是否已投票
    //     const { data: { user } } = await supabase.auth.getUser();
    //     const userId = user?.id;
    //     if (userId) {
    //       feedback.userVotes[record.type] = record.user_votes.includes(userId);
    //     }
    // }
    await Promise.all(data.map(async (record: FeedbackRecord) => {
        feedback[record.type] = record.count;
        // 检查当前用户是否已投票
        const { data: { user } } = await supabase.auth.getUser();
        const userId = user?.id;
        if (userId) {
          feedback.userVotes[record.type] = record.user_votes.includes(userId);
        }
    }));

    return feedback;
    },

    async updateFeedback(type: 'good' | 'bad' | 'normal'): Promise<FeedbackData> {
        const userId = getAnonymousUserId();
        
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
                ? currentData.user_votes.filter((id: string) => id !== userId)
                : [...currentData.user_votes, userId]
            })
            .eq('type', type);
      
          if (updateError) throw updateError;
        }
      
        return this.getFeedback();
      }
};