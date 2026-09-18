'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import { ToastProvider } from '@/components/Toast'
import CommandPalette from '@/components/CommandPalette'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)

  useEffect(() => {
    const handler = () => setCommandPaletteOpen(true)
    document.addEventListener('openCommandPalette', handler)
    return () => document.removeEventListener('openCommandPalette', handler)
  }, [])

  return (
    <html lang="en">
      <body className="bg-[#0a0a0b] text-[#fafafa] antialiased">
        <ToastProvider>
          <Sidebar />
          <main className="ml-60">
            {children}
          </main>
          <CommandPalette open={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />
        </ToastProvider>
      </body>
    </html>
  )
}
