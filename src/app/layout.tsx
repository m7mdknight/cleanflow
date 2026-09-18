'use client'

import { useState, useEffect } from 'react'
import Sidebar from '@/components/Sidebar'
import { ToastProvider } from '@/components/Toast'
import CommandPalette from '@/components/CommandPalette'
import { MobileNav } from '@/components/MobileNav'
import { ThemeToggle } from '@/components/ThemeToggle'
import { SetupWizard } from '@/components/SetupWizard'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false)
  const [setupWizardOpen, setSetupWizardOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handler = () => setCommandPaletteOpen(true)
    document.addEventListener('openCommandPalette', handler)
    return () => document.removeEventListener('openCommandPalette', handler)
  }, [])

  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-[#0a0a0b] text-[#fafafa] antialiased">
        <ToastProvider>
          {mounted && (
            <>
              {/* Desktop sidebar - hidden on mobile */}
              <div className="hidden lg:block">
                <Sidebar />
              </div>
              {/* Mobile nav - hidden on desktop */}
              <div className="lg:hidden">
                <MobileNav />
              </div>
              {/* Main content with responsive margin */}
              <main className="lg:ml-60 pt-14 lg:pt-0 pb-16 lg:pb-0 min-h-screen">
                {children}
              </main>
              <CommandPalette open={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />
              <SetupWizard open={setupWizardOpen} onClose={() => setSetupWizardOpen(false)} onComplete={() => {}} />
            </>
          )}
        </ToastProvider>
      </body>
    </html>
  )
}
