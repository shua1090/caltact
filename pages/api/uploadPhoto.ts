import { type NextApiRequest, type NextApiResponse } from 'next'
import photoManager from '../../database/PhotoManager'
import multiparty from 'multiparty'
import { readFile } from 'fs/promises'
// import verifyUser from './utils/verifyUser'
import type RequestFile from './types/requestfile.ts'

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

  // authenticate user

  // if ((await verifyUser(req))) {
  //   console.log('Verified user')
  // } else {
  //   res.status(401).json({ message: 'Invalid token' }); return
  // }

  // if (!data.files) {
  //   res.status(201).json({ url: '' })
  // }

  const file = data.files.file[0] as RequestFile

  console.log(file)

  readFile(file.path)
    .then(async (contents) => {
      await photoManager.uploadPhoto(contents, '', file)
        .then(async (path) => {
          await photoManager.getPhotoURL(path)
            .then((url) => {
              console.log(url)
              res.status(201).json({ url })
            })
            .catch((error) => {
              console.log('url error: ', error)
            })
        })
        .catch((error) => {
          console.log('upload error: ', error)
        })
    })
    .catch((error) => {
      console.log('readfile error: ', error)
    })
}
