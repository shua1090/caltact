import { storage } from './index'
import { ref, uploadBytes } from 'firebase/storage'

class PhotoManager {
  async uploadPhoto (file: File, id: string) {
    const path = `${id}/images/${file.name}`
    const storageRef = ref(storage, path)

    console.log(file.type)

    uploadBytes(storageRef, file)
      .then((snapshot) => {
        console.log('Uploaded a file!')
      })
      .catch((error) => {
        console.log(error)
        return null
      })

    // const pathReference = ref(storage, `${path}/`)
  }
}

const photoManager = new PhotoManager()
export default photoManager
