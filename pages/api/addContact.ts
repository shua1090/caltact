import { type NextApiRequest, type NextApiResponse } from 'next'
import contactManager from '../../database/ContactManager'
import userManager from '../../database/index'
import { profanity } from '@2toad/profanity'
import verifyUser from './utils/verifyUser'
import fillContact from './utils/fillContact'

// Handler function to handle when a user attempts to add a new contact
// Requires types/contact.ts
export async function handler (
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
  for (const prop in req.body.contact) {
    if (profanity.exists(req.body.contact[prop])) {
      res.status(403).json({
        // Just a flag, so its easy to check (code == PROF) back in frontend
        message: `Profanity filter flagged ${prop}:'${req.body.contact[prop]}'`
      }); return
    }
  }

  try {
    const contactToAdd = fillContact(req)
    const user = await userManager.getUserByEmail(req.body.email)
    let userid: string
    if (user?.id !== undefined) {
      userid = user.id
      // upload photo, get download link to add to database
      // await photoManager.uploadPhoto(req.body.photo, `${userid}`)
      // Gets the contact we just added in and sends it back
      await contactManager.addContact(userid, contactToAdd)
      res.status(201).json({
        message: await contactManager
          .getContacts(userid)
          .then((arr) => arr[arr.length - 1])
      })
    } else {
      console.log(`Could not find user with email ${req.body.email}`)
      res.status(401).json({ message: `Authentication failed, ${req.body.email} dne.` })
    }
  } catch (error) {
    console.log(`Error in addContacts: ${error as string}`)
    res.status(401).json({
      message: 'Authentication failed',
      error: (error as any).message
    })
  }
}
