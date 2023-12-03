/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import '../../app/globals.css'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import type contact from '.././api/types/contact'
import '.././index.css'
import pfp from '@/public/pfp.png'
import Link from 'next/link'
import { ArrowLeftToLine } from 'lucide-react'

const DynamicContactPage = () => {
  const router = useRouter()
  const { index } = router.query
  const [userData, setUserData] = useState<contact | null>(null)
  const [loading, setIsLoading] = useState<boolean | null>(true)

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

  function redirectToEdit () {
    if (index) {
      void router.push(`/updatepage?index=${index[0]}`)
    }
  }
  const defaultPfp =
		userData?.photo === ''
		  ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/2048px-Default_pfp.svg.png'
		  : userData?.photo

  if (loading) {
    return (
			<main className="min-h-screen">
				<div className="w-screen flex flex-row items-center justify-center">
					<div className="animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900 dark:border-white mx-auto text-center mt-20"></div>
				</div>{' '}
			</main>
    )
  }
  return (
		<>
			<main className="min-h-screen px-10">
				<div className="flex items-center gap-5">
					<Link href="/">
						<button className="hover:animate-[wiggle_1s_ease-in-out_infinite] rounded-lg p-2 hover:dark:bg-zinc-300 dark:bg-zinc-50 shadow-lg dark:text-gray-900">
							<ArrowLeftToLine size={24} />
						</button>
					</Link>
				</div>
				<img
					src={defaultPfp}
					alt="Brian Mai"
					height="275"
					width="275"
					className="text-center mx-auto transform rounded-lg lg:hidden mb-4 lg:mb-0 text-loose"
				/>
				<h1 className="text-4xl flex justify-center lg:hidden mb-6 py-1 font-md">
					{userData?.firstName} {userData?.lastName}
				</h1>
				<div className="grid lg:grid-cols-2 grid-cols-1 lg:max-w-7xl md:max-w-2xl items-start max-w-lg">
					<div className="flex flex-col">
						<div className="text-center mx-auto transform hidden lg:block">
							<img
								src={defaultPfp}
								alt="Brian Mai"
								height="400"
								width="400"
								className="rounded-xl"
							/>
							<h1 className="text-4xl flex justify-center pt-2">
								{userData?.firstName} {userData?.lastName}
							</h1>
						</div>
					</div>
					<div className="prose prose-p:text-[16px] prose-ul:text-[15px] w-full text-left dark:prose-invert">
						<section className="mt-10">
							<p className="flex text-2xl font-bold mb-4">Information</p>
							<div className="flex justify-between dark:text-zinc-300 text-lg">
								<ul className="ml-6 list-disc list-outside">
									<li className="mb-2">Email: {userData.email}</li>
									<li className="mb-2">Phone: {userData.phoneNumber}</li>
									<li className="mb-2">Instagram: {userData.instagram}</li>
									<li className="mb-2">Snapchat: {userData.snapchat}</li>
									<li className="mb-2">Discord: {userData.discord}</li>
									<li className="mb-2">LinkedIn: {userData.linkedin}</li>
									<li className="mb-2">Github: {userData.github}</li>
									<li className="mb-2">Facebook: {userData.facebook}</li>
									<li className="mb-2">Twitter: {userData.twitter}</li>
								</ul>
								<ul className="list-disc list-outside">
									<li className="mb-2">Birthday: {userData.birthday}</li>
									<li className="mb-2">City: {userData.city}</li>
									<li className="mb-2">College: {userData.college}</li>
									<li className="mb-2">Major: {userData.major}</li>
									<li className="mb-2">Country: {userData.country}</li>
									<li className="mb-2">Street: {userData.street}</li>
									<li className="mb-2">Postal Code: {userData.postalCode}</li>
									<li className="mb-2">State/Region: {userData.region}</li>
									<li className="mb-2">Spotify: {userData.spotify}</li>
								</ul>
							</div>
						</section>{' '}
						<div className="flex justify-center">
							{/* edit button */}
							<button
								onClick={redirectToEdit}
								className="mt-12 flex justify-center py-1 w-1/3  border-2 rounded-lg border-black dark:bg-zinc-50 hover:bg-zinc-300 dark:hover:bg-zinc-300 dark:text-gray-900"
							>
								Edit Contact
							</button>
						</div>
					</div>
				</div>
			</main>
		</>
  )
}

export default DynamicContactPage
