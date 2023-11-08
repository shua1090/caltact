import React from 'react'
import { AlignHorizontalDistributeCenter } from 'lucide-react'
import { MoreVertical, Phone, Mail } from 'lucide-react'
import { useRouter } from 'next/router'

interface DataInterface {
	s: string
}

export default function ContactCard({ data }) {
	const router = useRouter()

	return (
			<div onClick={() => router.push('/')}className="cursor-pointer bg-white border-gray-200 border-2 rounded-xl m-2 w-50 h-68 flex justify-center">
				<div className="m-4 flex flex-col items-center justify-center">
					<img
						src="https://media.discordapp.net/attachments/1165064545673433200/1170131752015122603/yudongcao.jpeg?ex=6557ed1d&is=6545781d&hm=23285ae7960d058bc3f3e742f64b466b9a37ab443c932ebb2fe24e13d03f0019&=&width=1227&height=1227"
						alt="Profile Image"
						className="rounded-2xl h-24 w-24"
					/>
					<h1 className="font-bold mt-1 text-gray-800">Evan Cao </h1>
					<p className="font-light text-s text-gray-500">
						Computer Science at{' '}
					</p>
					<p className="text-s text-indigo-700">Cal Poly SLO</p>
					<hr className="w-48 h-0.5 mx-auto bg-gray-200 border-0 rounded-2xl my-2.5"/>

					<div className="flex justify-start flex-col gap-3">
						<div className="phone-stuff text-gray-700 flex">
							<div className="w-10 h-10 rounded-2xl bg-indigo-200 flex justify-center">
								<Phone className="text-indigo-800 mt-2" size={22} />
							</div>
							<div className="font-medium m-2">(626) 558 - 1789</div>
						</div>
						<div className="mail-stuff text-gray-700 flex">
							<div className="w-10 h-10 rounded-2xl bg-indigo-200 flex justify-center">
								<Mail className="text-indigo-800 mt-2" size={22} />
							</div>
							<div className="font-medium m-2">
								<a href="mailto:evcao@calpoly.edu">evcao@calpoly.edu</a>
							</div>
						</div>
					</div>
				</div>
			</div>
	)
}
