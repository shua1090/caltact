import { type NextApiRequest, type NextApiResponse } from 'next'
import contactManager from '../../database/ContactManager'
import userManager from '../../database/index'
import type contact from './types/contact'
import { profanity } from '@2toad/profanity'
import verifyUser from './utils/verifyUser'

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
  for (const prop in req.body.contact) {
    if (profanity.exists(req.body.contact[prop])) {
      res.status(403).json({
        // Just a flag, so its easy to check (code == PROF) back in frontend
        message: `Profanity filter flagged ${prop}:'${req.body.contact[prop]}'`
      }); return
    }
  }

  try {
    // Get all the request params into contact object
    const contactToAdd: contact = {
      photo: req.body.contact.photo,
      college: req.body.contact.college,
      major: req.body.contact.major,
      firstName: req.body.contact.firstName,
      lastName: req.body.contact.lastName,
      email: req.body.contact.email,
      phoneNumber: req.body.contact.phoneNumber,
      birthday: req.body.contact.birthday,
      country: req.body.contact.country,
      street: req.body.contact.street,
      city: req.body.contact.city,
      region: req.body.contact.region,
      postalCode: req.body.contact.postalCode,
      facebook: req.body.contact.facebook,
      instagram: req.body.contact.instagram,
      snapchat: req.body.contact.snapchat,
      twitter: req.body.contact.twitter,
      linkedin: req.body.contact.linkedin,
      discord: req.body.contact.discord,
      github: req.body.contact.github,
      spotify: req.body.contact.spotify
    }

    // Nullify undefined properties (undefined not applicable to firestore)
    for (const prop in contactToAdd) {
      if (Object.hasOwnProperty.call(contactToAdd, prop)) {
        const value = contactToAdd[prop as keyof contact]
        if (value === undefined) {
          contactToAdd[prop as keyof contact] = null
        }
      }
    }

    const user = await userManager.getUserByEmail(req.body.email)
    let userid: string
    if (user?.id !== undefined) {
      userid = user.id
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
