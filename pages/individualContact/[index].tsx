import '../../app/globals.css'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Header from '@/components/header'
import type contact from '.././api/types/contact'
import '.././index.css'

const DynamicContactPage = () => {
  const router = useRouter()
  const { index } = router.query
  const [userData, setUserData] = useState<contact | null>(null)
  const [, setIsLoading] = useState<boolean | null>(true)
  const [search, setSearch] = useState('') // Define the search state
  const [important, setImportant] = useState(false) // Define the important state
  const [, setRefetch] = useState<boolean>(true)

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true)

      try {
        const response = await fetch('/api/getContacts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            email: localStorage.getItem('email'),
            index
          })
        })

        if (response.ok) {
          const data = await response.json()
          setUserData(data.contacts)
        } else if (response.status === 401) {
          // Unauthorized, redirect user to login page
          window.location.href = '/signin'
        } else {
          // Handle other error cases as needed
          console.error('Failed to fetch user:', response.statusText)
        }
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (index) {
      void fetchUserData()
    }
  }, [index])

  function fetchNewContacts () {
    setRefetch(true)
  }

  function redirectToEdit () {
    if (index) {
      void router.push(`/updatepage?index=${index[0]}`)
    }
  }

  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="px-10 w-screen">
        <div className="flex flex-row gap-6 items-center w-full">
          <input
            className="text-black border-2 border-gray-300 rounded-md p-2 w-full"
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
            }}
          />
          <span className="text-gray-500 flex flex-row gap-2">
            Important{' '}
            <input
              type="checkbox"
              className="text-black"
              style={{
                width: '1.5rem',
                height: '1.5rem'
              }}
              value={important.toString()}
              onChange={(e) => {
                setImportant(e.target.checked)
              }}
            />
          </span>
          <button
            className="bg-blue-500 text-white rounded-md p-2"
            onClick={fetchNewContacts}
          >
            Search
          </button>
        </div>

        <div className="border-2 border-gray-300 rounded-lg p-2 flex justify-between mt-10">
          {/* Left div for picture and user name */}
          <div className="flex-shrink-0 w-1/2">
            <img
              src={userData?.photo ?? ''}
              alt="Profile"
              width="96"
              height="96"
              className="mb-4 rounded-full border-3 border-gray-300 object-cover w-96 h-96 mx-auto "
            />
            <h1 className="text-2xl text-black font-bold text-center ">
              {userData
                ? `${userData.firstName} ${userData.lastName}`
                : 'Loading...'}
            </h1>
          </div>

          {/* Right div for other information */}
          <div className = "ml-8 w-full">
            <div className = "flex flex-col">
              <div className="flex-grow w-full flex justify-between">
                {userData && (
                  <>
                    {/* First column */}
                    <div className="w-1/2 mb-4 mt-4">
                      <p className="text-gray-700 mb-2">Email: {userData.email}</p>
                      <p className="text-gray-700 mb-2">
                        Phone: {userData.phoneNumber}
                      </p>
                      <p className="text-gray-700 mb-2">
                        Instagram: {userData.instagram}
                      </p>
                      <p className="text-gray-700 mb-2">
                        Snapchat: {userData.snapchat}
                      </p>
                      <p className="text-gray-700 mb-2">
                        Discord: {userData.discord}
                      </p>
                      <p className="text-gray-700 mb-2">
                        LinkedIn: {userData.linkedin}
                      </p>
                      <p className="text-gray-700 mb-2">
                        Github: {userData.github}
                      </p>
                      <p className="text-gray-700 mb-2">
                        Facebook: {userData.facebook}
                      </p>
                      <p className="text-gray-700 mb-2">
                        Twitter: {userData.twitter}
                      </p>
                    </div>

                    {/* Second column */}
                    <div className="w-1/2 mb-4 mt-4">
                      <p className="text-gray-700 mb-2">
                        Birthday: {userData.birthday}
                      </p>
                      <p className="text-gray-700 mb-2">City: {userData.city}</p>
                      <p className="text-gray-700 mb-2">
                        College: {userData.college}
                      </p>
                      <p className="text-gray-700 mb-2">
                        Major: {userData.major}
                      </p>
                      <p className="text-gray-700 mb-2">
                        Country: {userData.country}
                      </p>
                      <p className="text-gray-700 mb-2">
                        Street: {userData.street}
                      </p>
                      <p className="text-gray-700 mb-2">
                        Postal Code: {userData.postalCode}
                      </p>
                      <p className="text-gray-700 mb-2">
                        State/Region: {userData.region}
                      </p>
                      <p className="text-gray-700 mb-2">
                        Spotify: {userData.spotify}
                      </p>
                    </div>
                  </>
                )}
              </div>

              <div className = "flex justify-center">
                {/* edit button */}
                <button onClick = {redirectToEdit} className="my-8 flex justify-center py-1 w-1/3 text-gray-700 border-2 rounded-lg border-black bg-neutral-100 hover:bg-neutral-300">Edit Contact</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default DynamicContactPage
