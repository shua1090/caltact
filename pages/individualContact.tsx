// pages/individualContact.tsx
import '../app/globals.css'
import React from 'react'
import Link from 'next/link'

const IndividualContact = () => {
  return (
    <div className="bg-blue-200 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-green-900">
          Evan Chang
        </h1>
        <p className="text-gray-700 mb-2">Email: evanchang@gmail.com</p>
        <p className="text-gray-700 mb-2">Phone: 123434</p>
        <img
          src="https://avatars.githubusercontent.com/u/49057496?v=4"
          alt="Profile"
          className="mb-4 rounded-full w-32 h-32 mx-auto"
        />
        <p className="text-gray-700 mb-2">Instagram: bruh</p>
        <p className="text-gray-700 mb-2">Snapchat: bruh</p>
        <p className="text-gray-700 mb-2">Discord: bruh</p>
        <p className="text-gray-700 mb-2">LinkedIn: bruh</p>
        <div className="text-center mt-4">
          <Link href="/" className="text-blue-500 underline hover:text-blue-700">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default IndividualContact
