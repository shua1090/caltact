// For use in user profile modification (changing your own details),
// this will be useful to fill a given user's current details, which
// they can just edit later on
import { type NextApiRequest, type NextApiResponse } from 'next'
import userManager from '../../database/index'
import verifyUser from './utils/verifyUser'

// Handler function to handle when a user attempts to get contacts
// Requires types/contact.ts
export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    return res.status(405).end()
  }
  // Olex's special authentication method
  if ((await verifyUser(req))) {
    console.log('Verified user')
  } else {
    res.status(401).json({ message: 'Invalid token' }); return
  }
  try {
    const u = await userManager.getUserByEmail(req.body.email)
    if (u === null) {
      res.status(403).json({ message: 'Errored out getting user by passed-in email' })
    } else {
      res.status(400).json(u)
    }
  } catch (error) {
    console.log(`Error in addContacts: ${error as string}`)
    res.status(403).json({
      message: 'Authentication failed',
      error: (error as any).message
    })
  }
}
