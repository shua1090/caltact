/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Sun, Moon } from 'lucide-react'

const ThemeToggle = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
		<div className='flex items-center '>
			{theme === 'dark'
			  ? (
				<button
					onClick={() => {
					  setTheme('light')
					}}
					className='flex'
				>
					<Sun size={24} /> Dark Mode
				</button>
			    )
			  : (
				<button
					onClick={() => {
					  setTheme('dark')
					}}
					className='flex'
				>
					<Moon size={24} /> Light Mode
				</button>
			    )}
		</div>
  )
}

export default ThemeToggle
