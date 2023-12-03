import '../app/globals.css'
import Image from 'next/image'
import TextEntry from '@/components/textentry'
import pfp from '../public/pfp.png'
import { type FormEvent, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type contact from './api/types/contact'
import { type User } from './api/types/user'

export default function UserInfo () {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [contact, setContact] = useState<contact>(
    {
      photo: '',
      college: '',
      major: '',
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      birthday: '',
      country: '',
      street: '',
      city: '',
      region: '',
      postalCode: '',
      facebook: '',
      instagram: '',
      snapchat: '',
      twitter: '',
      linkedin: '',
      discord: '',
      github: '',
      spotify: '',
      important: false
    }
  )
  const [, setIsLoading] = useState<boolean | null>(true)
  const { index } = router.query

  let indexNum: number
  if (index) {
    indexNum = parseInt(index[0])
  }

  useEffect(() => {
    setIsClient(true)
    const fetchUserData = async () => {
      setIsLoading(true)

      try {
        const body = {
          email: localStorage.getItem('email')
        }
        const response = await fetch('/api/getUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(body)
        })

        if (response.ok) {
          const data = await response.json()
          if (data.length > 0) {
            console.log('User data received:', data[0])
            setContact(data[0])
          } else {
            console.error('User not found')
          }
        } else if (response.status === 401) {
          console.log('Unauthorized, redirecting to login')
          window.location.href = '/signin'
        } else {
          console.error('Failed to fetch user:', response.statusText)
        }
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setIsLoading(false)
      }
    }

    void fetchUserData()
  }, [index])

  const [imageFile, setImageFile] = useState<File>()
  const [photoChanged, setPhotoChanged] = useState(false)

  if (!isClient) {
    return null // or return a loader, placeholder, etc.
  }

  if (isClient && localStorage.getItem('token') === null) {
    void router.push('/signin')
    return <div></div>
  }

  return (
    <main className=" min-h-screen">
      <div className="w-4/5 mx-auto">
        <form>
          <div className="space-y-12">
            <div className="border-b dark:border-zinc-300  border-gray-900/10 pb-12">
              <h2 className="text-2xl font-semibold leading-7 dark:text-white">
                Update Contact Information
              </h2>
              <p className="mt-1 text-lg leading-6 text-gray-600 dark:text-zinc-300">
                Change the information of the contact you would like to update
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <div className="block text-sm font-medium leading-6 dark:text-white">
                    Photo
                  </div>
                  <div className="mt-2 flex items-center gap-x-3">
                    <Image
                      src={photoChanged ? imageFile ? URL.createObjectURL(imageFile) : contact.photo ? contact.photo : pfp : contact.photo ? contact.photo : pfp }
                      width="48"
                      height="48"
                      alt="upload profile picture preview"
                      className = "rounded-full object-cover w-12 h-12"
                    />
                    <label
                      htmlFor="file-upload"
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:text-gray-900"
                    >
                      Change
                    </label>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <TextEntry
                    label="College"
                    id="college"
                    placeholder="CENG"
                    value={contact.college ? contact.college : ''}
                  />
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <TextEntry
                    label="Major"
                    id="major"
                    placeholder="Computer Science"
                    value={contact.major ? contact.major : ''}
                  />
                </div>
              </div>
            </div>

            <div className="border-b dark:border-zinc-300  border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 dark:text-white">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-zinc-300">
                Use a permanent address where you can receive mail.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6"
                  >
                    First Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      value={contact.firstName ? contact.firstName : ''}
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6"
                  >
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      value={contact.lastName ? contact.lastName : ''}
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={contact.email ? contact.email : ''}
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="phone-number"
                    className="block text-sm font-medium leading-6"
                  >
                    Phone Number
                  </label>
                  <div className="mt-2">
                    <input
                      id="phone-number"
                      name="phone-number"
                      type="text"
                      value={contact.phoneNumber ? contact.phoneNumber : ''}
                      autoComplete="phone-number"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="birthday"
                    className="block text-sm font-medium leading-6"
                  >
                    Birthday:
                  </label>
                  <div className="mt-2">
                    <input
                      id="birthday"
                      name="birthday"
                      type="date"
                      value={contact.birthday ? contact.birthday : ''}
                      autoComplete="birthday"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6"
                  >
                    Country
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      name="country"
                      value={contact.country ? contact.country : ''}
                      autoComplete="country-name"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option>United States</option>
                      <option>Canada</option>
                      <option>Mexico</option>
                    </select>
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="street-address"
                    className="block text-sm font-medium leading-6"
                  >
                    Street address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="street-address"
                      id="street-address"
                      value={contact.street ? contact.street : ''}
                      autoComplete="street-address"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6"
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={contact.city ? contact.city : ''}
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium leading-6"
                  >
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="region"
                      id="region"
                      value={contact.region ? contact.region : ''}
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium leading-6"
                  >
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="postal-code"
                      id="postal-code"
                      value={contact.postalCode ? contact.postalCode : ''}
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b dark:border-zinc-300  border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7">
                Social Media
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600 dark:text-zinc-300">
                Fill out social media handles. Leave entry blank if not
                applicable.
              </p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2">
                  <TextEntry
                    label="Facebook"
                    id="facebook"
                    value={contact.facebook ? contact.facebook : ''}
                    changeHandler={() => {}}
                  />
                </div>
                <div className="sm:col-span-2">
                  <TextEntry
                    label="Instagram"
                    id="instagram"
                    value={contact.instagram ? contact.instagram : ''}
                    changeHandler={() => {}}
                  />
                </div>
                <div className="sm:col-span-2">
                  <TextEntry
                    label="Snapchat"
                    id="snapchat"
                    value={contact.snapchat ? contact.snapchat : ''}
                    changeHandler={() => {}}
                  />
                </div>
                <div className="sm:col-span-2">
                  <TextEntry
                    label="Twitter"
                    id="twitter"
                    value={contact.twitter ? contact.twitter : ''}
                    changeHandler={() => {}}
                  />
                </div>
                <div className="sm:col-span-2">
                  <TextEntry
                    label="LinkedIn"
                    id="linkedin"
                    value={contact.linkedin ? contact.linkedin : ''}
                    changeHandler={() => {}}
                  />
                </div>
                <div className="sm:col-span-2">
                  <TextEntry
                    label="Discord"
                    id="discord"
                    value={contact.discord ? contact.discord : ''}
                    changeHandler={() => {}}
                  />
                </div>
                <div className="sm:col-span-2">
                  <TextEntry
                    label="Github"
                    id="github"
                    value={contact.github ? contact.github : ''}
                    changeHandler={() => {}}
                  />
                </div>
                <div className="sm:col-span-2">
                  <TextEntry
                    label="Spotify"
                    id="spotify"
                    value={contact.spotify ? contact.spotify : ''}
                    changeHandler={() => {}}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center mb-4 border-b dark:border-zinc-300  border-gray-900/10 pb-12">
                <input
                  id="check-important"
                  name="check-important"
                  type="checkbox"
                  className='w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                  value={contact.important ? contact.important.toString() : 'false'}
                  checked = {contact.important ? contact.important : false}
                  onChange={() => {}}
                />
                <label
                  htmlFor="check-important"
                  className="w-full py-4 ms-2 text-base font-medium">
                    Mark contact as important
                </label>
            </div>

            <div className="border-b dark:border-zinc-300  border-gray-900/10 pb-12">
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link href="/">
                  <button className="text-sm font-semibold leading-6 dark:text-red-400 text-red-600">
                    Cancel
                  </button>
                </Link>
                <input
                  type="submit"
                  value="Save"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={() => {}}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}
