import type RequestFile from './requestfile'

export default interface ReqFormData {
  fields: { email: string[] }
  files: { file: RequestFile[] }
}
