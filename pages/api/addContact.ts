import { NextApiRequest, NextApiResponse } from 'next';
import { OAuth2Client } from 'google-auth-library';
import contactManager from '../../database/ContactManager'
import userManager from '../../database/index'

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
      photo: (req.body.contact["photo"] !== undefined) ? req.body.contact["photo"] : null,
      college: (req.body.contact["college"] !== undefined) ? req.body.contact["college"] : null,
      major: (req.body.contact["major"] !== undefined) ? req.body.contact["major"] : null,
      firstName: (req.body.contact["firstName"] !== undefined) ? req.body.contact["firstName"] : null,
      lastName: (req.body.contact["lastName"] !== undefined) ? req.body.contact["lastName"] : null,
      email: (req.body.contact["email"] !== undefined) ? req.body.contact["email"] : null,
      phoneNumber: (req.body.contact["phoneNumber"] !== undefined) ? req.body.contact["phoneNumber"] : null,
      birthday: (req.body.contact["birthday"] !== undefined) ? req.body.contact["birthday"] : null,
      country: (req.body.contact["country"] !== undefined) ? req.body.contact["country"] : null,
      street: (req.body.contact["street"] !== undefined) ? req.body.contact["street"] : null,
      city: (req.body.contact["city"] !== undefined) ? req.body.contact["city"] : null,
      region: (req.body.contact["region"] !== undefined) ? req.body.contact["region"] : null,
      postalCode: (req.body.contact["postalCode"] !== undefined) ? req.body.contact["postalCode"] : null,
      facebook: (req.body.contact["facebook"] !== undefined) ? req.body.contact["facebook"] : null,
      instagram: (req.body.contact["instagram"] !== undefined) ? req.body.contact["instagram"] : null,
      snapchat: (req.body.contact["snapchat"] !== undefined) ? req.body.contact["snapchat"] : null,
      twitter: (req.body.contact["twitter"] !== undefined) ? req.body.contact["twitter"] : null,
      linkedin: (req.body.contact["linkedin"] !== undefined) ? req.body.contact["linkedin"] : null,
      discord: (req.body.contact["discord"] !== undefined) ? req.body.contact["discord"] : null,
      github: (req.body.contact["github"] !== undefined) ? req.body.contact["github"] : null,
      spotify: (req.body.contact["spotify"] !== undefined) ? req.body.contact["spotify"] : null
    }
    let user = await userManager.userDBManager.getUserByEmail(req.body["email"]);
    let userid: string;
    if (user?.id != undefined){
      userid = user.id;
      return res.status(404).json({message: await contactManager.contactDBManager.getContacts(userid).then((arr)=>{
        return arr[arr.length-1]})});
    } else {
      console.log(`Could not find user with email ${req.body["email"]}`);
      return res.status(401).json({message: `Authentication failed, ${req.body["email"]} dne.`});
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Authentication failed', error: (error as any).message });
  }
}
