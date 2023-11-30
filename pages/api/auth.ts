import { type NextApiRequest, type NextApiResponse } from 'next'
import { OAuth2Client } from 'google-auth-library'
import userDBManager from '../../database/index'

const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? ''
const client = new OAuth2Client(CLIENT_ID)

export async function handler (req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    res.status(401).json({ message: 'Authorization token missing' }); return
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID
    })

    const payload = ticket.getPayload()
    console.log(payload)
    if (!payload || !payload.email_verified || !payload.email) {
      res.status(401).json({ message: 'Invalid token' }); return
    }

    const session = await userDBManager.login(payload.given_name ?? '', payload.family_name ?? '', payload.email)
    res.status(200).json({
      session,
      firstName: payload.given_name,
      lastName: payload.family_name,
      email: payload.email
    })
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed', error: (error as any).message })
  }
}
