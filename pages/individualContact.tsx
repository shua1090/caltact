// pages/individualContact.tsx
import '../app/globals.css'
import React from 'react'
import Link from 'next/link'
import mockUserData from '../mockUserData.js' // Update the path accordingly

const IndividualContact = () => {
  return (
    <div className="bg-blue-200 min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-green-900">
          {mockUserData.firstName} {mockUserData.lastName}
        </h1>
        <p className="text-gray-700 mb-2">Email: {mockUserData.email}</p>
        <p className="text-gray-700 mb-2">Phone: {mockUserData.phone}</p>
        <img
          src={mockUserData.profilePhotoURL}
          alt="Profile"
          className="mb-4 rounded-full w-32 h-32 mx-auto"
        />
        <p className="text-gray-700 mb-2">Instagram: {mockUserData.instagram}</p>
        <p className="text-gray-700 mb-2">Snapchat: {mockUserData.snapChat}</p>
        <p className="text-gray-700 mb-2">Discord: {mockUserData.discord}</p>
        <p className="text-gray-700 mb-2">LinkedIn: {mockUserData.linkedin}</p>
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
