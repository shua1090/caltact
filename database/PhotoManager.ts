import { storage } from './index'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import type RequestFile from 'requestfile.ts'

class PhotoManager {
  async uploadPhoto (file: Buffer, id: string, metadata: RequestFile) {
    const path = `${id}/images/${metadata.originalFilename}`
    const storageRef = ref(storage, path)

    const uploadMetadata = {
      contentType: metadata.headers['content-type'],
      size: metadata.size
    }

    await uploadBytes(storageRef, file, uploadMetadata)
      .then((snapshot) => {
        console.log('Uploaded a file!')
      })
      .catch((error) => {
        console.log('error: ', error)
        return null
      })

    const pathReference = ref(storage, path)

    const url = await getDownloadURL(pathReference)
      .then((url) => {
        console.log('url: ', url)
        return url
      })
      .catch((error) => {
        console.log('error: ', error)
      })

    return url
  }
}

const photoManager = new PhotoManager()
export default photoManager
