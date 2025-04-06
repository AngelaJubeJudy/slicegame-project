import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextApiRequest, NextApiResponse } from 'next';

export const csrfProtection = async (req: NextApiRequest, res: NextApiResponse, next: () => void) => {
  const supabase = createServerSupabaseClient({ req, res });
  
  // 验证用户是否已认证
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // 验证请求来源
  const origin = req.headers.origin;
  const allowedOrigins = [process.env.NEXT_PUBLIC_SITE_URL];
  
  if (!allowedOrigins.includes(origin)) {
    return res.status(403).json({ error: 'Invalid origin' });
  }

  next();
};