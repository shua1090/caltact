/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import '../app/globals.css'
import Image from 'next/image'
import TextEntry from '@/components/textentry'
import pfp from '../public/pfp.png'
import { type FormEvent, useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type contact from './api/types/contact'

async function updatePFP (image: File | undefined) {
  const token = localStorage.getItem('token')
  const body = new FormData()

  let email = localStorage.getItem('email')
  if (email === null) {
    email = ''
  }

  body.append('email', email)
  if (image) {
    body.append('file', image)
  }

  const promise = fetch('/api/uploadPhoto', {
    method: 'POST',
    headers: {
      authorization: 'Bearer ' + token
    },
    body
  })

  return await promise
}

async function updateUser (user: contact, index: number) {
  const { ...userProperties } = user
  const requestBody = {
    email: localStorage.getItem('email'),
    other_info: userProperties,
    session: localStorage.getItem('token')
  }

  const promise = fetch('/api/updateUser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + localStorage.getItem('token')
    },
    body: JSON.stringify(requestBody)
  })

  return await promise
}

export default function UserInfo () {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [contact, setContact] = useState<contact>({
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
  })
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
            setContact(data[0].other_info)
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

  function handleSubmit (event: FormEvent) {
    /* handle form submission */
    event.preventDefault()

    console.log(imageFile)

    if (imageFile) {
      updatePFP(imageFile)
        .then(async (res: Response) => {
          if (res.status === 201) {
            return await res.json()
          }
        })
        .then((res) => {
          let contactToAdd = contact
          if (res) {
            contactToAdd = { ...contactToAdd, photo: res.url as string }
          }
          updateUser(contactToAdd, indexNum)
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
                alert('Personal Information updated successfully!')
              } else {
                alert('Personal Information could not be updated.')
              }
              if (index) {
                void router.push(`/individualContact/${index[0]}`)
              } else {
                void router.push('/')
              }
            })
            .catch((error: Error) => {
              console.log(error)
            })
        })
        .catch((error: Error) => {
          console.log(error)
        })
    } else {
      updateUser(contact, indexNum)
        .then(async (res: Response) => {
          console.log(`Returned result with status: ${res.status}`)
          if (res.status === 400) {
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
            alert('Personal Information updated successfully!')
          } else {
            alert('Personal Information could not be updated.')
          }
          if (index) {
            void router.push(`/individualContact/${index[0]}`)
          } else {
            void router.push('/')
          }
        })
        .catch((error: Error) => {
          console.log(error)
        })
    }
  }

  function handleChange (event: FormEvent) {
    const { name, value, checked } = event.target as HTMLInputElement
    switch (name) {
      case 'college': {
        setContact({ ...contact, college: value })
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
      case 'check-important': {
        setContact({ ...contact, important: checked })
        break
      }
    }
  }

  function handleFileChange (event: FormEvent) {
    const value = event.target as HTMLInputElement
    if (value.files) {
      setImageFile(value.files[0])
      setPhotoChanged(true)
      console.log('Importing Photo')
      console.log(value.files[0])
    }
  }

  function deleteAllContacts () {
    if (confirm('Deletion of all contacts is permanent. Ok?')) {
      const token = localStorage.getItem('token')
      const promise = fetch('/api/updateContact', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
          email: localStorage.getItem('email'),
          index: -1
        })
      })
      promise
        .then(async (res: Response) => {
          if (res.status === 200) {
            return await res.json()
          } else if (res.status === 401) {
            alert('Authorization failed.')
            return undefined
          } else {
            return undefined
          }
        })
        .then((res) => {
          // redirect to user home page
          if (!res) {
            alert(
              'Contacts could not be deleted, check further logs or contact administrator'
            )
            console.log(`status: ${res.status}, message: ${res.message}`)
          }
          console.log('pushing home route')
          void router.push('/')
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  function readAndUploadCSV (csv: string | undefined) {
    if (csv) {
      const csvLines = csv.split('Categories\n')[1].split('myContacts,\n')
      let singleLine: string[] = []
      let i = 1
      let amount = 0
      let c: contact | null = null
      const contacts = []
      const isEmpty = (str: string) =>
        !str || str.length === 0
          ? null
          : str.trim().replace('\n', ' ').replace('"', '').trim()
      for (i = 0; i < csvLines.length; i++) {
        singleLine = csvLines[i]
          .replace(', ', ' ')
          .replace('\n', ' ')
          .split(',')
        // Get rid of Addresses of the form Home, Street
        c = {
          firstName: isEmpty(singleLine[0]),
          lastName: isEmpty(singleLine[2]),
          email: isEmpty(singleLine[14]),
          phoneNumber: isEmpty(singleLine[20]),
          street: isEmpty(singleLine[24]),
          city: isEmpty(singleLine[28]),
          region: isEmpty(singleLine[29]),
          postalCode: isEmpty(singleLine[30])
        }
        if (c.firstName) {
          console.log(
						`valid contact: ${JSON.stringify(c)} was found, uploading`
          )
          contacts.push(c)
          amount++
        }
      }
      const token = localStorage.getItem('token')
      const promise = fetch('/api/addContact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
          email: localStorage.getItem('email'),
          contacts: JSON.stringify(contacts)
        })
      })
      promise
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
          if (!res) {
            alert('Contacts could not be added, check further logs')
            console.log(`status: ${res.status}, message: ${res.message}`)
          }
          void router.push('/')
        })
        .catch((error: Error) => {
          console.log(error)
        })
      alert(`added ${amount} contacts`)
    }
  }

  function getImportedContacts (event: FormEvent) {
    const value = event.target as HTMLInputElement
    if (value.files) {
      console.log('importing contacts')
      console.log(value.files[0])
      const reader = new FileReader()
      reader.onload = (event) => {
        if (event.target) readAndUploadCSV(event.target.result?.toString())
      }
      reader.onerror = (error) => {
        console.log(error)
      }
      reader.readAsText(value.files[0]) // you could also read images and other binaries
    }
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
						<div className="pt-6 pb-5 border-b dark:border-zinc-300  border-gray-900/10">
							<h2 className="text-2xl font-semibold leading-7 dark:text-white">
								Settings
							</h2>
							<p className="mt-1 text-lg leading-6 text-gray-600 dark:text-zinc-300">
								Update your profile and account
							</p>
						</div>
						<div className="border-b dark:border-zinc-300 border-gray-900/10 pb-12">
							<div className="col-span-full">
								<div className="text-base font-semibold leading-7 dark:text-white">
									Photo
								</div>
								<div className="mt-2 flex items-center gap-x-3">
									<Image
										src={
											photoChanged
											  ? imageFile
											    ? URL.createObjectURL(imageFile)
											    : (contact?.photo) ?? pfp
											  : (contact?.photo) ?? pfp
										}
										alt="User Photo"
										width="48"
										height="48"
										className="rounded-full object-cover w-12 h-12"
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

						<div className="border-b dark:border-zinc-300 border-gray-900/10 pb-12">
							<h2 className="text-base font-semibold leading-7 dark:text-white">
								School Information
							</h2>
							<p className="mt-1 text-sm leading-6 text-gray-600 dark:text-zinc-300">
								Fill out school information including college and major.
							</p>

							<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
								<div className="sm:col-span-4">
									<TextEntry
										label="College"
										id="college"
										placeholder="CENG"
										value={contact?.college ? contact?.college : ''}
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
										value={contact?.major ? contact?.major : ''}
										changeHandler={handleChange}
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
											value={contact?.firstName ? contact?.firstName : ''}
											onChange={handleChange}
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
											value={contact?.lastName ? contact?.lastName : ''}
											onChange={handleChange}
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
											value={contact?.email ? contact?.email : ''}
											onChange={handleChange}
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
											value={contact?.phoneNumber ? contact?.phoneNumber : ''}
											onChange={handleChange}
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
											value={contact?.birthday ? contact?.birthday : ''}
											onChange={handleChange}
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
											value={contact?.country ? contact?.country : ''}
											onChange={handleChange}
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
											value={contact?.street ? contact?.street : ''}
											onChange={handleChange}
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
											value={contact?.city ? contact?.city : ''}
											onChange={handleChange}
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
											value={contact?.region ? contact?.region : ''}
											onChange={handleChange}
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
											value={contact?.postalCode ? contact?.postalCode : ''}
											onChange={handleChange}
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
										value={contact?.facebook ? contact?.facebook : ''}
										changeHandler={handleChange}
									/>
								</div>
								<div className="sm:col-span-2">
									<TextEntry
										label="Instagram"
										id="instagram"
										value={contact?.instagram ? contact?.instagram : ''}
										changeHandler={handleChange}
									/>
								</div>
								<div className="sm:col-span-2">
									<TextEntry
										label="Snapchat"
										id="snapchat"
										value={contact?.snapchat ? contact?.snapchat : ''}
										changeHandler={handleChange}
									/>
								</div>
								<div className="sm:col-span-2">
									<TextEntry
										label="Twitter"
										id="twitter"
										value={contact?.twitter ? contact?.twitter : ''}
										changeHandler={handleChange}
									/>
								</div>
								<div className="sm:col-span-2">
									<TextEntry
										label="LinkedIn"
										id="linkedin"
										value={contact?.linkedin ? contact?.linkedin : ''}
										changeHandler={handleChange}
									/>
								</div>
								<div className="sm:col-span-2">
									<TextEntry
										label="Discord"
										id="discord"
										value={contact?.discord ? contact?.discord : ''}
										changeHandler={handleChange}
									/>
								</div>
								<div className="sm:col-span-2">
									<TextEntry
										label="Github"
										id="github"
										value={contact?.github ? contact?.github : ''}
										changeHandler={handleChange}
									/>
								</div>
								<div className="sm:col-span-2">
									<TextEntry
										label="Spotify"
										id="spotify"
										value={contact?.spotify ? contact?.spotify : ''}
										changeHandler={handleChange}
									/>
								</div>
							</div>
						</div>

						<div className="border-b dark:border-zinc-300 border-gray-900/10 pb-12">
							<h2 className="text-base font-semibold leading-7 dark:text-white">
								Privacy Settings
							</h2>
							<p className="mt-1 text-sm leading-6 text-gray-600 dark:text-zinc-300">
								Set your profile to public or private.
							</p>

							<div className="mt-5 flex items-center">
								<input
									id="check-important"
									name="check-important"
									type="checkbox"
									className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
									value={
										contact?.important ? contact?.important.toString() : 'false'
									}
									checked={contact?.important ? contact?.important : false}
									onChange={handleChange}
								/>
								<label
									htmlFor="check-important"
									className="w-full py-4 ms-2 text-base font-medium"
								>
									Public Profile
								</label>
							</div>
						</div>
						<div className="border-b dark:border-zinc-300 border-gray-900/10 pb-12">
							<h2 className="text-base font-semibold leading-7 text-red-600 dark:text-red-400">
								Delete All Contacts
							</h2>
							<p className="mt-1 text-sm leading-6 text-gray-600 dark:text-zinc-300">
								Warning! This action is irreversible!
							</p>
							<div className="col-span-full">
								<div className="mt-2 flex items-center gap-x-3">
									<label
										className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:text-gray-900"
										onClick={deleteAllContacts}
									>
										Delete All Contacts!
									</label>
								</div>
							</div>
						</div>
						<div className="border-b dark:border-zinc-300 border-gray-900/10 pb-12">
							<h2 className="text-base font-semibold leading-7 dark:text-white">
								Batch Add
							</h2>
							<p className="mt-1 text-sm leading-6 text-gray-600 dark:text-zinc-300">
								Import a csv file to add multiple contacts at once.
							</p>
							<div className="col-span-full">
								<div className="mt-5 flex items-center gap-x-3">
									<label
										htmlFor="importfile-upload"
										className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:text-gray-900"
									>
										Import File
									</label>
									<input
										id="importfile-upload"
										name="importfile-upload"
										type="file"
										className="sr-only"
										onChange={getImportedContacts}
									/>
								</div>
							</div>
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
