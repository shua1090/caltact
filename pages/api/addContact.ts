import { NextApiRequest, NextApiResponse } from 'next';
import { OAuth2Client } from 'google-auth-library';
import managers from '../../database/ContactManager'
import { STATUS_CODES } from 'http';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  // const token = req.headers.authorization?.split(' ')[1];
  // if (!token) {
  //   return res.status(401).json({ message: 'Authorization token missing' });
  // }

  try {
    let c =  {
      email: req.body["email"],
      name: req.body["name"],
      phone: req.body["phone"],
      instagram: req.body["instagram"],
      discord: req.body["discord"],
      spotify: req.body["spotify"],
      snapchat: req.body["snapchat"],
    }
    await managers.contactDBManager.addContact(req.body["userid"], c);
    return res.status(404).json({message: managers.contactDBManager.getContacts(req.body["userid"])});

  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Authentication failed', error: (error as any).message });
  }
}
