/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react'
import '../app/globals.css'
import Header from '@/components/header'
import type contact from './api/types/contact'
import './index.css'
import ContactCard from '@/components/contact'

async function fetchContacts (
  setIsLoading: any,
  setContacts: any,
  search: string | undefined,
  important: boolean | undefined
) {
  setIsLoading(true)
  const response = await fetch('/api/getContacts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      email: localStorage.getItem('email'),
      search,
      important
    })
  })
  try {
    if (response.status !== 200) {
      window.location.href = '/signin'
      return
    }
    const data = await response.json()
    setContacts(data.contacts)
    setIsLoading(false)
  } catch (e) {
    // Redirect user to login page
    window.location.href = '/signin'
  }
}

export default function Index () {
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])

  const [search, setSearch] = useState<string>('')
  const [important, setImportant] = useState<boolean>(false)
  const [refetch, setRefetch] = useState<boolean>(true)
  const [contacts, setContacts] = useState<contact[]>([])

  useEffect(() => {
    if (refetch && isClient) {
      void fetchContacts(
        setIsLoading,
        setContacts,
        search === '' ? undefined : search,
        important
      )
      setRefetch(false)
    }
  }, [refetch, isClient])

  function fetchNewContacts () {
    setRefetch(true)
  }

  return (
    <main className="">
      <div className="px-10 w-screen">
        <div className="flex flex-row gap-6 items-center w-full">
          <input
            className="border-2 border-gray-300 rounded-md p-2 w-full"
            type="text"
            placeholder="Search"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
            }}
          />
          <span className="text-zinc-500 dark:text-zinc-300 flex flex-row gap-2">
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
        <div className="contacts gap-4 mt-10">
          {!isLoading && contacts && contacts.length > 0
            ? contacts.map((contact, i) => (
                <div key={i}>
                  <ContactCard
                    photo={contact.photo ?? ''}
                    firstName={contact.firstName ?? undefined}
                    lastName={contact.lastName ?? undefined}
                    phoneNumber={contact.phoneNumber ?? ''}
                    index={i}
                    email={contact.email ?? ''}
                    setIsLoading={setIsLoading}
                    major={contact.major ?? undefined}
                    college={contact.college ?? undefined}
                  />
                </div>
            ))
            : !isLoading && (
                <div className="text-center text-lg font-light">
                  Please login or add more contacts
                </div>
              )}
          {isLoading && (
            <div className="w-screen flex flex-row items-center justify-center">
              <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900 dark:border-white mx-auto text-center mt-20"></div>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
