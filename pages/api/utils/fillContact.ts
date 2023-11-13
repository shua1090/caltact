import { type NextApiRequest } from 'next'
import type contact from '../types/contact'

export default function fillContact (req: NextApiRequest) {
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
    spotify: req.body.contact.spotify,
    // This is because we haven't added important to frontend, but
    // we want it to only be true/false, not null
    important: req.body.contact.important ?? false
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
  return contactToAdd
}
