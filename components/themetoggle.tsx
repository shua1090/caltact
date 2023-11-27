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
		<div className='border-2 p-1.5 dark:border-zinc-500 flex items-center rounded-lg hover:animate-[wiggle_1s_ease-in-out_infinite]'>
			{theme === 'dark'
			  ? (
				<button
					onClick={() => {
					  setTheme('light')
					}}
				>
					<Sun size={24} />
				</button>
			    )
			  : (
				<button
					onClick={() => {
					  setTheme('dark')
					}}
				>
					<Moon size={24} />
				</button>
			    )}
		</div>
  )
}

export default ThemeToggle
