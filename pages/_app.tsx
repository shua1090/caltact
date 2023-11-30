/* eslint-disable no-mixed-spaces-and-tabs */
/* eslint-disable no-tabs */

import { ThemeProvider } from 'next-themes'
import { type AppProps } from 'next/app'
import Header from '@/components/header'
import Footer from '@/components/footer'

function MyApp ({ Component, pageProps }: AppProps) {
  return (
		<>
			<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                <div className='dark:text-white text-black bg-zinc-50 dark:bg-zinc-800'>
				<Header />
				<Component {...pageProps} />
                <Footer/>
                </div>
			</ThemeProvider>
		</>
  )
}

export default MyApp
