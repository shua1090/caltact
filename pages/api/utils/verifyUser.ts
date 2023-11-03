import { userDBManager } from '@/database'
import { type NextApiRequest } from 'next'

export default async function verifyUser (req: NextApiRequest) {
  try {
    const body = JSON.parse(req.body)
    const email = body.email
    const session = req.headers.authorization?.split(' ')[1]
    const user = await userDBManager.getUserByEmail(email)
    if (!user) {
      return false
    }
    return user.session === session
  } catch (error) {
    return false
  }
}
