import { Poppins } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from "@/components/utils/theme-provider"
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const poppins = Poppins({
  subsets: ['latin']
  , weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata = {
  title: 'Tri Nugroho Yosef Irawan',
  description: 'A comprehensive showcase of my backend development skills, experiences, and projects, highlighting my expertise and dedication to the craft of coding.',
  icons: {
    icon: [
      {
        url: '/logo-light.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/logo.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={poppins.className}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
