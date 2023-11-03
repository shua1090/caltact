import { NextApiRequest, NextApiResponse } from 'next';
import { OAuth2Client } from 'google-auth-library';
import contactManager from '../../database/ContactManager'
import userManager from '../../database/index'

import { STATUS_CODES } from 'http';
import contact from './types/contact';
import { profanity } from '@2toad/profanity';

// Handler function to handle when a user attempts to add a new contact
// Requires types/contact.ts
export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
){
  if (req.method !== 'POST') {
    return res.status(405).end();
  }


  // Olex's special authentication method
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Authorization token missing' });
  }

  // For each argument passed in, check through the profanity filter
  for (let prop in req.body){
    if (profanity.exists(req.body[prop])){
      return res.status(403).json({
        // Just a flag, so its easy to check (code == PROF) back in frontend
        code: 'PROF', 
        message: `Profanity filter flagged '${req.body[prop]}'`
      });
    }
  }

  try {
    // Get all the request params into contact object
    let contactToAdd: contact =  {
      photo: req.body["photo"],
      college: req.body["college"],
      major: req.body["major"],
      firstName: req.body["firstName"],
      lastName: req.body["lastName"],
      email: req.body["email"],
      phoneNumber: req.body["phoneNumber"],
      birthday: req.body["birthday"],
      country: req.body["country"],
      street: req.body["street"],
      city: req.body["city"],
      region: req.body["region"],
      postalCode: req.body["postalCode"],
      facebook: req.body["facebook"],
      instagram: req.body["instagram"],
      snapchat: req.body["snapchat"],
      twitter: req.body["twitter"],
      linkedin: req.body["linkedin"],
      discord: req.body["discord"],
      github: req.body["github"],
      spotify: req.body["spotify"]
    }
    
    // Nullify undefined properties (undefined not applicable to firestore)
    for (let prop in contactToAdd){
      if (Object.hasOwnProperty.call(contactToAdd, prop)){
        const value = contactToAdd[prop as keyof contact];
        if (value == undefined){
          contactToAdd[prop as keyof contact] = null;
        }
      }
    }

    let user = await userManager.userDBManager.getUserByEmail(req.body["email"]);
    let userid: string;
    if (user?.id != undefined){
      userid = user.id;
          // Gets the contact we just added in and sends it back
      return res.status(404).json({
        message: await contactManager
        .contactDBManager
        .getContacts(userid)
        .then((arr)=>arr[arr.length-1])
      });
    } else {
      console.log(`Could not find user with email ${req.body["email"]}`);
      return res.status(200).json({message: `Authentication failed, ${req.body["email"]} dne.`});
    }
  } catch (error) {
    console.log(`Error in addContacts: ${error}`);
    return res.status(401).json({ 
      message: 'Authentication failed', 
      error: (error as any).message 
    });
  }
}
