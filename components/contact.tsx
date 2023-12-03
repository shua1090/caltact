/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { Phone, Mail, Delete } from 'lucide-react'
import { useRouter } from 'next/router'
import NextLink from 'next/link'
import pfp from '@/public/pfp.png'
interface DataInterface {
  photo: string | undefined
  firstName: string | undefined
  lastName: string | undefined
  phoneNumber: string | undefined
  email: string | undefined
  index: number
  setIsLoading: any
}

export default function ContactCard ({
  photo,
  firstName,
  lastName,
  phoneNumber,
  index,
  email,
  setIsLoading
}: DataInterface) {
  const router = useRouter()
  function deleteContact (index: number) {
    setIsLoading(true)
    fetch('/api/updateContact', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        email: localStorage.getItem('email'),
        index
      })
    })
      .then(() => {
        router.reload()
      })
      .catch(() => {
        router.reload()
      })
  }
  const photoURL = photo === '' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png' : photo

  return (
    <div className="drop-shadow-xl relative cursor-pointer bg-white border-gray-200 dark:border-zinc-900 dark:bg-zinc-900 border-2 rounded-xl w-50 h-68 flex justify-center">
      <button
        onClick={() => {
          deleteContact(index)
        }}
      >
        <Delete className="text-indigo-800 dark:text-indigo-600 absolute top-5 right-5" size={25} />
      </button>

      {/* Wrap each ContactCard with Link and use passHref */}
      <NextLink href={`/individualContact/${index}`} passHref>
        <div className="m-4 flex flex-col items-center justify-center">
          <img
            src={photoURL}
            alt="Profile Image"
            className="rounded-full h-28 w-28 object-cover"
          />
          <h1 className="font-bold mt-1 text-gray-800 dark:text-zinc-200 tracking-wide">
            {firstName ?? 'N/A'} {lastName ?? 'N/A'}
          </h1>
          <p className="font-light text-s dark:text-zinc-300">
            Computer Science at{' '}
          </p>
          <p className="text-s text-indigo-700 dark:text-indigo-400">Cal Poly SLO</p>
          <hr className="w-48 h-0.5 mx-auto bg-gray-200 border-0 rounded-2xl my-4 mb-6" />
          <div className="flex justify-start flex-col gap-3">
            <div className="phone-stuff text-gray-700 dark:text-zinc-100 font-normal flex">
              <div className="w-10 h-10 rounded-2xl bg-indigo-200 flex justify-center">
                <Phone className="text-indigo-800 mt-2" size={22} />
              </div>
              <div className="m-2">
                {phoneNumber || 'No number provided'}
              </div>
            </div>
            <div className="mail-stuff text-gray-700 dark:text-zinc-100 font-normal flex">
              <div className="w-10 h-10 rounded-2xl bg-indigo-200 flex justify-center">
                <Mail className="text-indigo-800 mt-2" size={22} />
              </div>
              <div className="m-2">
                <a href={`mailto:${email}`}>{email || 'No email provided'}</a>
              </div>
            </div>
          </div>
        </div>
      </NextLink>
    </div>
  )
}
