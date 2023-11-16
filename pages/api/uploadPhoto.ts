import { type NextApiRequest, type NextApiResponse } from 'next'
import photoManager from '../../database/PhotoManager'
import verifyUser from './utils/verifyUser'
import multiparty from 'multiparty'
import { readFile } from 'fs/promises'
import type RequestFile from 'requestfile.ts'

export const config = {
  api: {
    // bodyParser: {
    //   sizeLimit: '4mb' // Set desired value here
    // }
    bodyParser: false
  }
}

// handler function for when a user tries uploading a photo to cloud storage

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).end()
  }

  const form = new multiparty.Form()
  const data = await new Promise((resolve, reject) => {
    form.parse(req, (error, fields, files) => {
      if (error) reject(error)
      resolve({ fields, files })
    })
  })

  let authorization = req.headers.authorization
  if (!authorization) {
    authorization = ''
  }

  // authenticate user

  fetch('api/verifyUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization
    },
    body: JSON.stringify({ email: data.fields.email[0] })
  })
    .then((response) => {
      if (response) {
        console.log('Verified user')
      } else {
        res.status(401).json({ message: 'Invalid token' })
      }
    })
    .catch((error) => {
      console.log('error: ', error)
    })

  const file = data.files.file[0] as RequestFile

  console.log(file)

  readFile(file.path)
    .then(async (contents) => {
      console.log(contents)
      await photoManager.uploadPhoto(contents, '', file)
    })
    .catch((error) => {
      console.log(error)
    })
}
