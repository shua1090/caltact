import { NextApiRequest, NextApiResponse } from 'next';
import { OAuth2Client } from 'google-auth-library';
import managers from '../../database/ContactManager'
import { STATUS_CODES } from 'http';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end();
  }
  try {
    console.log(req.body["message"]);
    // console.log((await managers.userDBManager.getContacts("Gk7gRQI7s4ZJtTfmmWhTa")).);
    await managers.contactDBManager.addContact("01y5hf7YqGZQfzqlgDXj", new Map<string, string>([
      ["test", "testval"],
      ["best", "bestval"]
    ]));
    // console.log(await managers.userDBManager.addContactToID("Gk7gRQI7s4ZJtTfmmWhT", req.body["message"]));
    return res.status(404).json({message: "Failure"});

  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: 'Authentication failed', error: (error as any).message });
  }
}
