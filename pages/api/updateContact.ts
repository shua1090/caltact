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
  console.log(req.method)
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
    const index = req.body.index
    if (req.method === 'POST') {
      const user = await userManager.getUserByEmail(req.body.email)
      if (user !== null && user !== undefined && index !== undefined) {
        const contactToAdd = fillContact(req.body.contact)
        if (await contactManager.modifyContact(user.id, contactToAdd, index)) {
          res.status(201).json({
            message: await contactManager
              .getContacts(user.id)
              .then((arr) => arr[index])
          })
        } else {
          res.status(401).end()
        }
      } else {
        res.status(400).end()
      }
    }
    if (req.method === 'DELETE') {
      const user = await userManager.getUserByEmail(req.body.email)
      if (user !== null && user !== undefined && index !== undefined) {
        // This means delete all contacts
        if (index === -1 && await contactManager.deleteAllContacts(user.id)) {
          res.status(200).json({ message: 'Batch Delete Succesful' })
        } else if (await contactManager.modifyContact(user.id, null, index)) {
          res.status(200).json({ message: 'Deletion Succesful' })
        } else {
          res.status(401).json({ message: 'invalid values passed in, or db modification failed' })
        }
      } else {
        res.status(400).end()
      }
    }
  } catch (error) {
    console.log(`Error in updateContacts: ${error as string}`)
    res.status(401).json({
      message: 'Authentication failed',
      error: (error as any).message
    })
  }
}
