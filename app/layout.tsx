// @ts-nocheck
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/react'
import '@/app/globals.css'
import { cn } from '@/lib/utils'
import { TailwindIndicator } from '@/components/tailwind-indicator'
import { Providers } from '@/components/providers'
import { Header } from '@/components/header'
import { Toaster } from '@/components/ui/sonner'
import { GlobalStateProvider } from '@/context/GlobalContext'

//dep
export const metadata = {
  metadataBase: new URL('http://localhost:3000'),
  title: {
    default: 'Real Estate Mogul',
    template: `%s - Real Estate Mogul`
  },
  description: 'Talk to your own real estate mogul',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png'
  }
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ]
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'font-sans antialiased',
          GeistSans.variable,
          GeistMono.variable
        )}
      >
          <Toaster position="top-center" />
            <Providers
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              >
              <GlobalStateProvider>
                {children}
                <TailwindIndicator />
              </GlobalStateProvider>
            </Providers>
          <Analytics />
      </body>
    </html>
  )
}
