import { NextApiRequest, NextApiResponse } from 'next';
import { OAuth2Client } from 'google-auth-library';
import managers from '../../database';
import { STATUS_CODES } from 'http';

export function addContactToUser(){
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Got addUser");
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  try {
    console.log(req.body);
    // console.log((await managers.userDBManager.getContacts("Gk7gRQI7s4ZJtTfmmWhTa")).);
    console.log((await managers.userDBManager.addContacts("Gk7gRQI7s4ZJtTfmmWhTs", "test")));
    return res.status(404).json({message: "Failure"});

  } catch (error) {
    return res.status(401).json({ message: 'Authentication failed', error: (error as any).message });
  }
}
