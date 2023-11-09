import { type NextApiRequest, type NextApiResponse } from 'next'
import contactManager from '../../database/ContactManager'
import userManager from '../../database/index'

// Handler function to handle when a user attempts to add a new contact
// Requires types/contact.ts
export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'DELETE' && req.method !== 'POST') {
    return res.status(405).end()
  }

  //   // Olex's special authentication method
  //   if ((await verifyUser(req))) {
  //     console.log('Verified user')
  //   } else {
  //     res.status(401).json({ message: 'Invalid token' }); return
  //   }
  try {
    if (req.method === 'DELETE') {
      const user = await userManager.getUserByEmail(req.body.email)
      if (user !== null && user !== undefined) {
        if (await contactManager.removeContact(user.id, req.body.index)) {
          res.status(200).end()
        } else {
          res.status(404).end()
        }
      }
    }
    res.status(200).json({ message: 'no delete' })
  } catch (error) {
    console.log(`Error in addContacts: ${error as string}`)
    res.status(400).json({
      message: 'Authentication failed',
      error: (error as any).message
    })
  }
}
