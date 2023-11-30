import { type NextApiRequest, type NextApiResponse } from 'next'
import verifyUser from './utils/verifyUser'
/*
Test route, showcases how to authenticate a user through the verifyUser function
All protected routes should follow this pattern
The browser has to send the user's email in the body of the request and the user's session in the authorization header
*/
export async function handler (req: NextApiRequest, res: NextApiResponse) {
  if (await verifyUser(req)) {
    res.status(200).json({ message: 'User is verified' })
  }
  res.status(401).json({ message: 'User is not verified' })
}
