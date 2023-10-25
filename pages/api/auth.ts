import { NextApiRequest, NextApiResponse } from 'next';
import { OAuth2Client } from 'google-auth-library';
import managers from '../../database';

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
const client = new OAuth2Client(CLIENT_ID);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload || !payload.email_verified || !payload.email) {
      return res.status(401).json({ message: 'Invalid token' });
    }


    const session = await managers.userDBManager.login(payload.given_name || '', payload.family_name || '', payload.email as string);
    return res.status(200).json({
      session,
      firstName: payload.given_name,
      lastName: payload.family_name,
      email: payload.email,
    });

  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed', error: (error as any).message });
  }
}
