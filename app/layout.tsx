import './globals.css'
import type { Metadata } from 'next'
import { Lora } from 'next/font/google'
import { ExitTransitionProvider } from '@/components/exit-transition-context';
const font = Lora({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nomad Garden',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ExitTransitionProvider>
          {children}
        </ExitTransitionProvider>
      </body>
    </html>
  )
}
