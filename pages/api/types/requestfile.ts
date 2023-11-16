export default interface RequestFile {
  fieldname: string
  originalname: string
  path: string
  headers: {
    'content-disposition': string
    'content-type': string
  }
  size: number
}
