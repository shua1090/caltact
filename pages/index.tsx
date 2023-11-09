/* eslint-disable @typescript-eslint/no-unused-vars */
import { use, useEffect, useState } from 'react'
import '../app/globals.css'
import Header from '@/components/header'
import type contact from './api/types/contact'
import './index.css'
import ContactCard from '@/components/contact'
import { set } from 'firebase/database'

async function fetchContacts (setContacts: any, search: string | undefined, important: boolean | undefined) {
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
  const data = await response.json()
  setContacts(data.contacts)
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
      void fetchContacts(setContacts, search === '' ? undefined : search, important)
      setRefetch(false)
    }
  }, [refetch, isClient])

  function fetchNewContacts () {
    setRefetch(true)
  }
  return (
    <main className="min-h-screen bg-white">
      <Header />
      <div className="px-10">
        <div className="flex flex-row gap-6 items-center">
          <input
            className="border-2 border-gray-300 rounded-md p-2 w-full"
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
              className=""
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
        <div className='contacts gap-2 mt-10'>
        {contacts.map((contact, i) => (
          <div key={i}>
            <ContactCard
              photo={contact.photo ?? ''}
              firstName={contact.firstName ?? undefined}
              lastName={contact.lastName ?? undefined}
              phoneNumber={contact.phoneNumber ?? ''}
            />
          </div>
        ))}
        </div>
      </div>
    </main>
  )
}
