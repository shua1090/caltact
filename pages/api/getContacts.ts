import { type NextApiRequest, type NextApiResponse } from 'next'
import contactManager from '../../database/ContactManager'
import userManager from '../../database/index'
import verifyUser from './utils/verifyUser'

// Handler function to handle when a user attempts to get contacts
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
  try {
    const u = await userManager.getUserByEmail(req.body.email)
    if (u === null) {
      res.status(403).json({ message: 'Errored out getting user by passed-in email' })
    } else {
      // If index isn't a number, convert it to one
      if (typeof req.body.index !== 'number') {
        req.body.index = parseInt(req.body.index)
      }
      let contacts = await contactManager.getContacts(u.id)
      if (!contacts || contacts.length === 0) {
        res.status(200).json({})
        return
      }
      if (req.body.index !== null && req.body.index !== undefined) {
        if (req.body.index <= contacts.length) {
          res.status(200).json({ contacts: contacts[req.body.index] })
          return
        }
        if (req.body.important === true) {
          contacts = contacts.filter((c: { important: boolean }) => c.important)
        }
        if (req.body.search) {
          contacts = contacts.filter(
            (c: { firstName: string, lastName: string }) => (c.firstName?.toLowerCase() + ' ' + c.lastName?.toLowerCase()).includes(req.body.search.toLowerCase())
          )
        }
        res.status(200).json({ contacts })
      }
    }
  } catch (error) {
    console.log(`Error in getContacts: ${error as string}`)
    res.status(403).json({
      message: 'Authentication failed',
      error: (error as any).message
    })
  }
}
