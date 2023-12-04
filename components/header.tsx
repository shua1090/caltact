/* eslint-disable no-tabs */
import Link from 'next/link'
import ThemeToggle from './themetoggle'
import { User2Icon } from 'lucide-react'
import Image from 'next/image'

export default function Header () {
  return (
		<header className="rounded-lg mb-10 flex justify-between bg-white dark:bg-zinc-900 px-10 py-4 drop-shadow-md p-2 text-gray-800 dark:text-slate-100">
			<Link href="/">
				<h1 className="font-bold text-4xl tracking-tighter flex items-center gap-2">
					Caltact <User2Icon size={32} />
				</h1>
			</Link>
			<div className="flex flex-row items-center justify-end gap-6">

				<Link href="/addpage">
					<p className="hover:animate-[wiggle_1s_ease-in-out_infinite] text-lg font-light">Add Contact</p>
				</Link>
				<Link href="/signin">
					<p className="hover:animate-[wiggle_1s_ease-in-out_infinite] text-lg font-light">Sign In</p>
				</Link>
				<Link href="/userInfo">
					<Image src="/gear.png" alt="Gear Image" width={32} height={32} className="cursor-pointer" />
				</Link>
				<ThemeToggle />
			</div>
		</header>
  )
}
