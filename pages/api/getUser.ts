// For use in user profile modification (changing your own details),
// this will be useful to fill a given user's current details, which
// they can just edit later on
import { type NextApiRequest, type NextApiResponse } from 'next'
import userManager from '../../database/index'
import verifyUser from './utils/verifyUser'
import { type User } from './types/user'

// Handler function to handle when a user attempts to get contacts
// Requires types/contact.ts
export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }
  // Olex's special authentication method
  if ((await verifyUser(req))) {
    console.log('Verified user')
  } else {
    res.status(401).json({ message: 'Invalid token' }); return
  }
  // Get Users can pass in an email, to get a specific profile when email is known
  // (this is primarily for your own user profile, so that when you click on your own
  // profile edit, it has what you had before saved already)
  // Or getUsers can get a prefix of a firstName, which will be used to search
  // through the public users
  try {
    let u: Array<User | null> = []
    if (req.body.email && !req.body.filter) {
      // This is fine. req.body.email must be the own user's email
      // because otherwise verifyUser above wouldn't work; All in all
      // the User can only get his/her own user profile stuff, because
      // auth makes sure of it
      u = [await userManager.getUserByEmail(req.body.email)]
    } else if (req.body.filter) {
      const users = await userManager.getUsersFiltered(req.body.filter)
      res.status(200).json({ users }); return
    } else {
      res.status(403).json({ message: "Couldn't find a valid param for the query" })
    }

    if (u === null) {
      res.status(403).json({ message: 'Errored out getting user by passed-in param' })
    } else {
      let flag = false
      u.map((value) => {
        if (value !== null) {
          value.session = ''
        } else {
          flag = true
        }
        return value
      })
      if (flag) {
        res.status(403).json({ message: 'Passed-In param returned null-d users' })
        return
      }
      res.status(200).json(u)
    }
  } catch (error) {
    console.log(`Error in getUser: ${error as string}`)
    res.status(403).json({
      message: 'Authentication failed',
      error: (error as any).message
    })
  }
}
