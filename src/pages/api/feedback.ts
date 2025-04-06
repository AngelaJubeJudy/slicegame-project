import { NextApiRequest, NextApiResponse } from 'next';
import { csrfProtection } from '../../middleware/csrf';
import { feedbackService } from '../../services/feedback';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    await csrfProtection(req, res, async () => {
      const { type } = req.body;
      const data = await feedbackService.updateFeedback(type);
      res.json(data);
    });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
}