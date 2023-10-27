import { use, useEffect } from 'react'
import '../app/globals.css'
import Header from '@/components/header'

export default function Index() {
  useEffect(() => {
    const session = localStorage.getItem('token')
    const email = localStorage.getItem('email')
    fetch('/api/testLogin', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session}`,
      },
      body: JSON.stringify({ email }),
    })
  }, [])

  return (
    <main className="min-h-screen bg-white">
      <Header />
      Contact Page
    </main>
  )
}