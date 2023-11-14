import '../app/globals.css'
import Header from '@/components/header'
import Image from 'next/image'
import TextEntry from '@/components/textentry'
import pfp from '../public/pfp.png'
import { type FormEvent, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

// async function postPFP(image: File | undefined) {
//   const token = localStorage.getItem('token')
//   const promise = fetch('/api/addContact', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//       authorization: 'Bearer ' + token
//     },
//     body: JSON.stringify({
//       email: localStorage.getItem('email'),
//       photo: image
//     })
//   })
//   return await promise
// }

async function postContact (contact: Record<string, unknown>, image: File | undefined) {
  const token = localStorage.getItem('token')
  const promise = fetch('/api/addContact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + token
    },
    body: JSON.stringify({
      email: localStorage.getItem('email'),
      contact
    })
  })
  return await promise
}

export default function AddPage () {
  const [isClient, setIsClient] = useState(false)
  const [contact, setContact] = useState({
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
    spotify: ''
  })
  const [imageFile, setImageFile] = useState<File>()

  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return null // or return a loader, placeholder, etc.
  }

  function handleSubmit (event: FormEvent) {
    /* handle form submission */
    event.preventDefault()

    postContact(contact, imageFile)
      .then(async (res: Response) => {
        if (res.status === 201) {
          return await res.json()
        } else if (res.status === 401) {
          alert('Authorization failed.')
          return undefined
        } else if (res.status === 403) {
          alert(`Bad word: ${await res.json().then((js) => js.message)}`)
        } else {
          return undefined
        }
      })
      .then((res) => {
        // redirect to user home page
        if (res !== undefined) {
          alert('Contact added successfully!')
        } else {
          alert('Contact could not be added.')
        }
        void router.push('/')
      })
      .catch((error: Error) => {
        console.log(error)
      })
  }

  function handleFileChange (event: FormEvent) {
    const value = event.target as HTMLInputElement
    if (value.files) {
      setImageFile(value.files[0])
      console.log(value.files[0])
    }
  }

  function handleChange (event: FormEvent) {
    const { name, value } = event.target as HTMLInputElement
    switch (name) {
      case 'college': {
        setContact({ ...contact, college: value })
        console.log(value)
        break
      }
      case 'major': {
        setContact({ ...contact, major: value })
        break
      }
      case 'first-name': {
        setContact({ ...contact, firstName: value })
        break
      }
      case 'last-name': {
        setContact({ ...contact, lastName: value })
        break
      }
      case 'email': {
        setContact({ ...contact, email: value })
        break
      }
      case 'phone-number': {
        setContact({ ...contact, phoneNumber: value })
        break
      }
      case 'birthday': {
        setContact({ ...contact, birthday: value })
        break
      }
      case 'country': {
        setContact({ ...contact, country: value })
        break
      }
      case 'street-address': {
        setContact({ ...contact, street: value })
        break
      }
      case 'city': {
        setContact({ ...contact, city: value })
        break
      }
      case 'region': {
        setContact({ ...contact, region: value })
        break
      }
      case 'postal-code': {
        setContact({ ...contact, postalCode: value })
        break
      }
      case 'facebook': {
        setContact({ ...contact, facebook: value })
        break
      }
      case 'instagram': {
        setContact({ ...contact, instagram: value })
        break
      }
      case 'snapchat': {
        setContact({ ...contact, snapchat: value })
        break
      }
      case 'twitter': {
        setContact({ ...contact, twitter: value })
        break
      }
      case 'linkedin': {
        setContact({ ...contact, linkedin: value })
        break
      }
      case 'discord': {
        setContact({ ...contact, discord: value })
        break
      }
      case 'github': {
        setContact({ ...contact, github: value })
        break
      }
      case 'spotify': {
        setContact({ ...contact, spotify: value })
        break
      }
    }
  }

  if (localStorage.getItem('token') === null) {
    void router.push('/signin')
    return <div></div>
  }

  return (
    <main className=" min-h-screen bg-white">
      <Header />
      <div className="w-4/5 mx-auto">
        <form>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Create New Contact
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Fill out the information of the contact you would like to add
                below.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="col-span-full">
                  <div className="block text-sm font-medium leading-6 text-gray-900">
                    Photo
                  </div>
                  <div className="mt-2 flex items-center gap-x-3">
                    <Image
                      src={imageFile ? URL.createObjectURL(imageFile) : pfp}
                      width="50"
                      height="50"
                      alt="upload profile picture preview"
                    />
                    <label
                      htmlFor="file-upload"
                      className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                      Change
                    </label>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
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
                    value={contact.college}
                    changeHandler={handleChange}
                  />
                </div>
              </div>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-4">
                  <TextEntry
                    label="Major"
                    id="major"
                    placeholder="Computer Science"
                    value={contact.major}
                    changeHandler={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Personal Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Use a permanent address where you can receive mail.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="first-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    First Name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="first-name"
                      id="first-name"
                      value={contact.firstName}
                      onChange={handleChange}
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="last-name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="last-name"
                      id="last-name"
                      value={contact.lastName}
                      onChange={handleChange}
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={contact.email}
                      onChange={handleChange}
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="phone-number"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Phone Number
                  </label>
                  <div className="mt-2">
                    <input
                      id="phone-number"
                      name="phone-number"
                      type="text"
                      value={contact.phoneNumber}
                      onChange={handleChange}
                      autoComplete="phone-number"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="birthday"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Birthday:
                  </label>
                  <div className="mt-2">
                    <input
                      id="birthday"
                      name="birthday"
                      type="date"
                      value={contact.birthday}
                      onChange={handleChange}
                      autoComplete="birthday"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Country
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      name="country"
                      value={contact.country}
                      onChange={handleChange}
                      autoComplete="country-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
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
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Street address
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="street-address"
                      id="street-address"
                      value={contact.street}
                      onChange={handleChange}
                      autoComplete="street-address"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    City
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="city"
                      id="city"
                      value={contact.city}
                      onChange={handleChange}
                      autoComplete="address-level2"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="region"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    State / Province
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="region"
                      id="region"
                      value={contact.region}
                      onChange={handleChange}
                      autoComplete="address-level1"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="postal-code"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ZIP / Postal code
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="postal-code"
                      id="postal-code"
                      value={contact.postalCode}
                      onChange={handleChange}
                      autoComplete="postal-code"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Social Media
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Fill out social media handles. Leave entry blank if not
                applicable.
              </p>
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-2">
                  <TextEntry
                    label="Facebook"
                    id="facebook"
                    value={contact.facebook}
                    changeHandler={handleChange}
                  />
                </div>
                <div className="sm:col-span-2">
                  <TextEntry
                    label="Instagram"
                    id="instagram"
                    value={contact.instagram}
                    changeHandler={handleChange}
                  />
                </div>
                <div className="sm:col-span-2">
                  <TextEntry
                    label="Snapchat"
                    id="snapchat"
                    value={contact.snapchat}
                    changeHandler={handleChange}
                  />
                </div>
                <div className="sm:col-span-2">
                  <TextEntry
                    label="Twitter"
                    id="twitter"
                    value={contact.twitter}
                    changeHandler={handleChange}
                  />
                </div>
                <div className="sm:col-span-2">
                  <TextEntry
                    label="LinkedIn"
                    id="linkedin"
                    value={contact.linkedin}
                    changeHandler={handleChange}
                  />
                </div>
                <div className="sm:col-span-2">
                  <TextEntry
                    label="Discord"
                    id="discord"
                    value={contact.discord}
                    changeHandler={handleChange}
                  />
                </div>
                <div className="sm:col-span-2">
                  <TextEntry
                    label="Github"
                    id="github"
                    value={contact.github}
                    changeHandler={handleChange}
                  />
                </div>
                <div className="sm:col-span-2">
                  <TextEntry
                    label="Spotify"
                    id="spotify"
                    value={contact.spotify}
                    changeHandler={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-6 flex items-center justify-end gap-x-6">
                <Link href="/">
                  <button className="text-sm font-semibold leading-6 text-gray-900">
                    Cancel
                  </button>
                </Link>
                <input
                  type="submit"
                  value="Submit"
                  className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}
