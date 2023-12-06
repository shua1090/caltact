/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { User2Icon, Sun, Moon, LogOutIcon, Contact2Icon } from 'lucide-react'

import { useTheme } from 'next-themes'

export default function Header () {
  const [dropdownVisible, setDropdownVisible] = useState(false)

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible)
  }
  // on click anywhere, make dropdown invisible
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
		<header className="z-20 rounded-lg mb-10 flex justify-between bg-white dark:bg-zinc-900 px-10 py-4 drop-shadow-md p-2 text-gray-800 dark:text-slate-100 items-center">
			<Link href="/">
				<h1 className="font-bold text-3xl lg:text-4xl tracking-tighter flex  items-center gap-2">
					Caltact       <User2Icon size={32} className='sm:hidden hidden lg:inline-block' />
      <User2Icon size={24} className='lg:hidden sm:inline-block' />
				</h1>
			</Link>
			<div className="lg:text-lg sm:text-lg text-base flex flex-row items-center justify-end gap-6">
				<Link href="/addpage">
					<p className="hover:animate-[wiggle_1s_ease-in-out_infinite] font-light">
						Add Contact
					</p>
				</Link>
				<Link href="/signin">
					<p className="hover:animate-[wiggle_1s_ease-in-out_infinite] font-light">
						Sign In
					</p>
				</Link>
				<div className="relative inline-block text-left z-10">
					<button
						onClick={toggleDropdown}
						type="button"
						className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center inline-flex items-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
					>
						Settings
						<svg
							className="w-2.5 h-2.5 ms-3"
							aria-hidden="true"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 10 6"
						>
							<path
								stroke="currentColor"
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="m1 1 4 4 4-4"
							/>
						</svg>
					</button>

					{dropdownVisible && (
						<div role="menu" className="text-base z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700">
							<div className="py-1">
								<Link href="/userInfo">
									<p
										onClick={toggleDropdown}
										className="flex gap-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
									>
										<Contact2Icon/> User Info
									</p>
								</Link>
								{theme === 'dark'
								  ? (
									<p
										onClick={() => {
										  setTheme('light')
										  toggleDropdown()
										}}
										className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
									>
										<div className="icon-container flex gap-2">
											<Sun size={24} />
											Light Mode
										</div>
									</p>
								    )
								  : (
									<p
										onClick={() => {
										  setTheme('dark')
										  toggleDropdown()
										}}
										className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
									>
										<div className="icon-container flex gap-2">
											<Moon size={24} /> Dark Mode
										</div>
									</p>
								    )}
							</div>

							<p
								onClick={() => {
								  localStorage.clear()
								  window.location.reload()
								  toggleDropdown()
								}}
								className="cursor-pointer block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white gap-2 flex "
							>
								<LogOutIcon /> Log Out
							</p>
						</div>
					)}
				</div>
			</div>
		</header>
  )
}
