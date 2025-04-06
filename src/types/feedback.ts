export interface FeedbackData {
    good: number;
    bad: number;
    normal: number;
    userVotes: {
      good: boolean;
      bad: boolean;
      normal: boolean;
    };
}
  
  export interface FeedbackRecord {
    id: string;
    type: 'good' | 'bad' | 'normal';
    count: number;
    user_votes: string[];
    created_at: string;
    updated_at: string;
}