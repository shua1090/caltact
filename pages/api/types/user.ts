import type contact from './contact'

export interface User {
  email: string
  firstName: string
  lastName: string
  session: string
  id: string
  other_info: contact
}
