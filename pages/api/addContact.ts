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
      photo: req.body.contact["photo"],
      college: req.body.contact["college"],
      major: req.body.contact["major"],
      firstName: req.body.contact["firstName"],
      lastName: req.body.contact["lastName"],
      email: req.body.contact["email"],
      phoneNumber: req.body.contact["phoneNumber"],
      birthday: req.body.contact["birthday"],
      country: req.body.contact["country"],
      street: req.body.contact["street"],
      city: req.body.contact["city"],
      region: req.body.contact["region"],
      postalCode: req.body.contact["postalCode"],
      facebook: req.body.contact["facebook"],
      instagram: req.body.contact["instagram"],
      snapchat: req.body.contact["snapchat"],
      twitter: req.body.contact["twitter"],
      linkedin: req.body.contact["linkedin"],
      discord: req.body.contact["discord"],
      github: req.body.contact["github"],
      spotify: req.body.contact["spotify"]
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

    let user = await userManager.getUserByEmail(req.body["email"]);
    let userid: string;
    if (user?.id != undefined){
      userid = user.id;
      // Gets the contact we just added in and sends it back
      await contactManager.addContact(userid, contactToAdd);
      return res.status(201).json({
        message: await contactManager
        .getContacts(userid)
        .then((arr)=>arr[arr.length-1])
      });
    } else {
      console.log(`Could not find user with email ${req.body["email"]}`);
      return res.status(401).json({message: `Authentication failed, ${req.body["email"]} dne.`});
    }
  } catch (error) {
    console.log(`Error in addContacts: ${error}`);
    return res.status(401).json({ 
      message: 'Authentication failed', 
      error: (error as any).message 
    });
  }
}
