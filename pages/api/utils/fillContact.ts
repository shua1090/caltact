import type contact from '../types/contact'

export default function fillContact (contact: any) {
  // Get all the request params into contact object
  const contactToAdd: contact = {
    photo: contact.photo,
    college: contact.college,
    major: contact.major,
    firstName: contact.firstName,
    lastName: contact.lastName,
    email: contact.email,
    phoneNumber: contact.phoneNumber,
    birthday: contact.birthday,
    country: contact.country,
    street: contact.street,
    city: contact.city,
    region: contact.region,
    postalCode: contact.postalCode,
    facebook: contact.facebook,
    instagram: contact.instagram,
    snapchat: contact.snapchat,
    twitter: contact.twitter,
    linkedin: contact.linkedin,
    discord: contact.discord,
    github: contact.github,
    spotify: contact.spotify,
    // This is because we haven't added important to frontend, but
    // we want it to only be true/false, not null
    important: contact.important ?? false
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
