import { type NextApiRequest, type NextApiResponse } from 'next'
import verifyUser from './utils/verifyUser'
import { profanity } from '@2toad/profanity'
import userDBManager from '../../database/index'

// Handler function to handle when a user attempts to add a new contact
// Requires types/contact.ts
export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }
  // Olex's special authentication method
  if ((await verifyUser(req))) {
    console.log('Verified user')
  } else {
    res.status(401).json({ message: 'Invalid token' }); return
  }

  // For each argument passed in, check through the profanity filter
  for (const prop in req.body.user) {
    if (profanity.exists(req.body.contact[prop])) {
      res.status(403).json({
        // Just a flag, so its easy to check (code == PROF) back in frontend
        message: `Profanity filter flagged ${prop}:'${req.body.contact[prop]}'`
      }); return
    }
  }

  try {
    const updatedUser = req.body
    await userDBManager.updateUser(updatedUser)
    res.status(400).send({ message: 'Succesfully modified User' })
  } catch (error) {
    console.log(`Error in addContacts: ${error as string}`)
    res.status(401).json({
      message: 'Authentication failed',
      error: (error as any).message
    })
  }
}
