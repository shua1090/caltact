import { NextApiRequest, NextApiResponse } from 'next';
import { OAuth2Client } from 'google-auth-library';
import managers from '../../database/ContactManager'
import { STATUS_CODES } from 'http';
import contact from './types/contact';

// Handler function to handle when a user attempts to add a new contact
// Requires types/contact.ts
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  // Olex's special authentication method
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  try {
    let c =  {
      photo: (req.body["photo"] !== undefined) ? req.body["photo"] : null,
      college: (req.body["college"] !== undefined) ? req.body["college"] : null,
      major: (req.body["major"] !== undefined) ? req.body["major"] : null,
      firstName: (req.body["firstName"] !== undefined) ? req.body["firstName"] : null,
      lastName: (req.body["lastName"] !== undefined) ? req.body["lastName"] : null,
      email: (req.body["email"] !== undefined) ? req.body["email"] : null,
      phoneNumber: (req.body["phoneNumber"] !== undefined) ? req.body["phoneNumber"] : null,
      birthday: (req.body["birthday"] !== undefined) ? req.body["birthday"] : null,
      country: (req.body["country"] !== undefined) ? req.body["country"] : null,
      street: (req.body["street"] !== undefined) ? req.body["street"] : null,
      city: (req.body["city"] !== undefined) ? req.body["city"] : null,
      region: (req.body["region"] !== undefined) ? req.body["region"] : null,
      postalCode: (req.body["postalCode"] !== undefined) ? req.body["postalCode"] : null,
      facebook: (req.body["facebook"] !== undefined) ? req.body["facebook"] : null,
      instagram: (req.body["instagram"] !== undefined) ? req.body["instagram"] : null,
      snapchat: (req.body["snapchat"] !== undefined) ? req.body["snapchat"] : null,
      twitter: (req.body["twitter"] !== undefined) ? req.body["twitter"] : null,
      linkedin: (req.body["linkedin"] !== undefined) ? req.body["linkedin"] : null,
      discord: (req.body["discord"] !== undefined) ? req.body["discord"] : null,
      github: (req.body["github"] !== undefined) ? req.body["github"] : null,
      spotify: (req.body["spotify"] !== undefined) ? req.body["spotify"] : null
    }

    await managers.contactDBManager.addContact(req.body["userid"], c);
    // return res.status(404).json({message: req.body["userid"]});
    return res.status(404).json({message: await managers.contactDBManager.getContacts(req.body["userid"]).then((arr)=>{
      return arr[arr.length-1]})});
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Authentication failed', error: (error as any).message });
  }
}
