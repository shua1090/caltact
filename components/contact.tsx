/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import { Phone, Mail, Delete } from 'lucide-react'
import { useRouter } from 'next/router'

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
    }).then(() => {
      router.reload()
    }).catch(() => {
      router.reload()
    })
  }
  return (
    <div className="relative cursor-pointer bg-white border-gray-200 border-2 rounded-xl m-2 w-50 h-68 flex justify-center">
      <button onClick={() => { deleteContact(index) }}>
        <Delete className="text-indigo-800 absolute top-5 right-5" size={25} />
      </button>
      <div className="m-4 flex flex-col items-center justify-center">
        <img
          src={photo}
          alt="Profile Image"
          className="rounded-2xl h-24 w-24 object-cover"
        />
        <h1 className="font-bold mt-1 text-gray-800">
          {firstName ?? 'N/A'} {lastName ?? 'N/A'}
        </h1>
        <p className="font-light text-s text-gray-500">Computer Science at </p>
        <p className="text-s text-indigo-700">Cal Poly SLO</p>
        <hr className="w-48 h-0.5 mx-auto bg-gray-200 border-0 rounded-2xl my-2.5" />

        <div className="flex justify-start flex-col gap-3">
          <div className="phone-stuff text-gray-700 flex">
            <div className="w-10 h-10 rounded-2xl bg-indigo-200 flex justify-center">
              <Phone className="text-indigo-800 mt-2" size={22} />
            </div>
            <div className="font-medium m-2">{phoneNumber || 'No number provided'}</div>
          </div>
          <div className="mail-stuff text-gray-700 flex">
            <div className="w-10 h-10 rounded-2xl bg-indigo-200 flex justify-center">
              <Mail className="text-indigo-800 mt-2" size={22} />
            </div>
            <div className="font-medium m-2">
              <a href="mailto:evcao@calpoly.edu">{email || 'No email provided'}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
