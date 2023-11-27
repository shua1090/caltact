import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Caltact',
  description: 'A Prof. Kubiak Enterprise'
}

export default function RootLayout ({
  children
}: {
  children: React.ReactNode
}) {
  return (
		<>
			<body className={inter.className}>{children}</body>
		</>
  )
}
