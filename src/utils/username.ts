// 英文单词列表
const ENGLISH_WORDS = [
  'adventure', 'brilliant', 'creative', 'dynamic', 'energetic',
  'friendly', 'genius', 'heroic', 'infinite', 'joyful',
  'kindness', 'lively', 'magical', 'noble', 'optimistic',
  'peaceful', 'quick', 'radiant', 'stellar', 'unique',
  'vibrant', 'wonderful', 'xenial', 'youthful', 'zealous'
];

// 中文词组列表
const CHINESE_WORDS = [
  '快乐', '勇敢', '智慧', '善良', '坚强',
  '温柔', '聪明', '活泼', '可爱', '聪明',
  '机智', '勇敢', '善良', '温柔', '坚强',
  '快乐', '活泼', '可爱', '聪明', '机智',
  '勇敢', '善良', '温柔', '坚强', '快乐'
];

export function generateUsername(language: string): string {
  const words = language.startsWith('zh') ? CHINESE_WORDS : ENGLISH_WORDS;
  const randomIndex = Math.floor(Math.random() * words.length);
  const word = words[randomIndex];
  
  // 如果是英文，取前8个字符，如果是中文，直接使用
  return language.startsWith('zh') ? word : word.slice(0, 8);
} 