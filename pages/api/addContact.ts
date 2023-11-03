import { type NextApiRequest, type NextApiResponse } from 'next'
import managers from '../../database/ContactManager'
import type contact from './types/contact'
import { profanity } from '@2toad/profanity'

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
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    res.status(401).json({ message: 'Authorization token missing' }); return
  }

  // For each argument passed in, check through the profanity filter
  for (const prop in req.body) {
    if (profanity.exists(req.body[prop])) {
      res.status(403).json({
        // Just a flag, so its easy to check (code == PROF) back in frontend
        code: 'PROF',
        message: `Profanity filter flagged '${req.body[prop]}'`
      }); return
    }
  }

  try {
    // Get all the request params into contact object
    const contactToAdd: contact = {
      photo: req.body.photo,
      college: req.body.college,
      major: req.body.major,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      birthday: req.body.birthday,
      country: req.body.country,
      street: req.body.street,
      city: req.body.city,
      region: req.body.region,
      postalCode: req.body.postalCode,
      facebook: req.body.facebook,
      instagram: req.body.instagram,
      snapchat: req.body.snapchat,
      twitter: req.body.twitter,
      linkedin: req.body.linkedin,
      discord: req.body.discord,
      github: req.body.github,
      spotify: req.body.spotify
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

    // No return value; if it fails, it'd have thrown exception
    await managers.contactDBManager.addContact(req.body.userid, contactToAdd)

    // Gets the contact we just added in and sends it back
    res.status(404).json({
      message: await managers
        .contactDBManager
        .getContacts(req.body.userid)
        .then((arr) => arr[arr.length - 1])
    })
  } catch (error) {
    console.log(`Error in addContacts: ${error as string}`)
    res.status(401).json({
      message: 'Authentication failed',
      error: (error as any).message
    })
  }
}
