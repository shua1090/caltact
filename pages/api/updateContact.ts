import { type NextApiRequest, type NextApiResponse } from 'next'
import contactManager from '../../database/ContactManager'
import userManager from '../../database/index'
import fillContact from './utils/fillContact'
import verifyUser from './utils/verifyUser'

// Handler function to handle when a user attempts to add a new contact
// Requires types/contact.ts
export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'DELETE' && req.method !== 'POST') {
    return res.status(405).end()
  }

  // Olex's special authentication method
  if ((await verifyUser(req))) {
    console.log('Verified user')
  } else {
    res.status(401).json({ message: 'Invalid token' }); return
  }
  try {
    if (req.method === 'POST') {
      const user = await userManager.getUserByEmail(req.body.email)
      if (user !== null && user !== undefined) {
        const contactToAdd = fillContact(req)
        if (await contactManager.modifyContact(user.id, contactToAdd, req.body.index)) {
          res.status(201).json({
            message: await contactManager
              .getContacts(user.id)
              .then((arr) => arr[arr.length - 1])
          })
        } else {
          res.status(401).end()
        }
      }
    }
    if (req.method === 'DELETE') {
      const user = await userManager.getUserByEmail(req.body.email)
      if (user !== null && user !== undefined) {
        if (await contactManager.modifyContact(user.id, null, req.body.index)) {
          res.status(200).end()
        } else {
          res.status(401).end()
        }
      }
    }
    res.status(200).json({ message: 'no delete' })
  } catch (error) {
    console.log(`Error in updateContacts: ${error as string}`)
    res.status(401).json({
      message: 'Authentication failed',
      error: (error as any).message
    })
  }
}
