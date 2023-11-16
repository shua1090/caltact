export default interface RequestFile {
  fieldname: string
  originalFilename: string
  path: string
  headers: {
    'content-disposition': string
    'content-type': string
  }
  size: number
}
