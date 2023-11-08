'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import '../../app/globals.css'
import './contacts.css'

import ContactCard from '@/components/contactcard'
import Header from '@/components/header'
import Footer from '@/components/footer'
export default function ContactsPage() {
	useEffect(() => {
		//  localhost:3000/api/
		//
	}, [])
	// get data from firebase
	return (
		<main className="min-h-screen min-w-screen bg-gray-50 ">
			<Header />
			<div className="contacts gap-2 mx-4">
				<ContactCard />
				<ContactCard />
				<ContactCard />
				<ContactCard />
				<ContactCard />
				<ContactCard />
				<ContactCard />
				<ContactCard />
			</div>
			<Footer/>
		</main>
	)
}
