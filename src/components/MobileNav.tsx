'use client'

import { useState, useEffect, useCallback } from 'react'
import { Menu, X, Users, Calendar, Package, BarChart3, Settings, LogOut, Search, Bell } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const mainNav = [
  { href: '/', label: 'Dashboard', icon: BarChart3 },
  { href: '/crm', label: 'Customers', icon: Users },
  { href: '/scheduling', label: 'Schedule', icon: Calendar },
  { href: '/inventory', label: 'Inventory', icon: Package },
  { href: '/reports', label: 'Reports', icon: BarChart3 },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  // Close on route change
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  // Close on escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      {/* Mobile header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-14 bg-[#111113] border-b border-[#27272a] flex items-center justify-between px-4 z-50">
        <button
          onClick={() => setOpen(true)}
          className="p-2 hover:bg-[#18181b] rounded-lg transition-colors"
        >
          <Menu size={20} />
        </button>
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            C
          </div>
          <span className="font-semibold text-sm">CleanFlow</span>
        </div>
        <button className="p-2 hover:bg-[#18181b] rounded-lg transition-colors">
          <Bell size={18} className="text-[#71717a]" />
        </button>
      </header>

      {/* Mobile sidebar overlay */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-[#111113] border-r border-[#27272a] flex flex-col animate-slide-in">
            {/* Header */}
            <div className="h-14 flex items-center justify-between px-4 border-b border-[#27272a]">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                  C
                </div>
                <span className="font-semibold text-sm">CleanFlow</span>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-2 hover:bg-[#18181b] rounded-lg transition-colors"
              >
                <X size={18} className="text-[#71717a]" />
              </button>
            </div>

            {/* Search */}
            <div className="px-3 py-2">
              <button
                onClick={() => {
                  setOpen(false)
                  document.dispatchEvent(new CustomEvent('openCommandPalette'))
                }}
                className="w-full flex items-center gap-2 px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm text-[#71717a]"
              >
                <Search size={14} />
                Search...
              </button>
            </div>

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
              <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-2 px-2">
                Menu
              </p>
              {mainNav.map((item) => {
                const active = pathname === item.href
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      active
                        ? 'bg-[#1e3a5f] text-blue-400'
                        : 'text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#18181b]'
                    }`}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                )
              })}

              <div className="pt-4 mt-4 border-t border-[#27272a]">
                <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-2 px-2">
                  More
                </p>
                {[
                  { href: '/dispatch', label: 'Dispatch', icon: Calendar },
                  { href: '/checklists', label: 'Checklists', icon: Calendar },
                  { href: '/invoicing', label: 'Invoicing', icon: Calendar },
                  { href: '/settings', label: 'Settings', icon: Settings },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#18181b] transition-colors"
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                ))}
              </div>
            </nav>

            {/* User */}
            <div className="px-3 py-3 border-t border-[#27272a]">
              <div className="flex items-center gap-3 px-2 py-2">
                <div className="w-8 h-8 bg-[#18181b] rounded-full flex items-center justify-center text-xs font-medium text-[#a1a1aa]">
                  M
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">Maria G.</p>
                  <p className="text-[10px] text-[#71717a] truncate">Manager</p>
                </div>
                <button className="p-1.5 hover:bg-[#18181b] rounded transition-colors">
                  <LogOut size={14} className="text-[#71717a]" />
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* Bottom nav for mobile */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#111113] border-t border-[#27272a] flex items-center justify-around z-40">
        {mainNav.slice(0, 5).map((item) => {
          const active = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                active ? 'text-blue-400' : 'text-[#71717a]'
              }`}
            >
              <item.icon size={18} />
              <span className="text-[10px]">{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </>
  )
}

const slideIn = `
  @keyframes slideIn {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }
  .animate-slide-in {
    animation: slideIn 0.2s ease-out;
  }
`

if (typeof document !== 'undefined') {
  const style = document.createElement('style')
  style.textContent = slideIn
  document.head.appendChild(style)
}
