'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Users,
  Calendar,
  ClipboardCheck,
  Truck,
  Package,
  Clock,
  Globe,
  Bell,
  CreditCard,
  BarChart3,
  Plug,
  Wrench,
  ShieldCheck,
  Building2,
  Star,
  Gift,
  Smartphone,
  Search,
  ChevronDown,
} from 'lucide-react'
import { useState } from 'react'

const navSections = [
  {
    label: 'Overview',
    items: [
      { href: '/', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    label: 'Core',
    items: [
      { href: '/crm', label: 'Customers', icon: Users },
      { href: '/scheduling', label: 'Scheduling', icon: Calendar },
      { href: '/dispatch', label: 'Dispatch', icon: Truck },
    ],
  },
  {
    label: 'Operations',
    items: [
      { href: '/checklists', label: 'Checklists', icon: ClipboardCheck },
      { href: '/time-tracking', label: 'Time Tracking', icon: Clock },
      { href: '/inventory', label: 'Inventory', icon: Package },
      { href: '/maintenance', label: 'Maintenance', icon: Wrench },
      { href: '/compliance', label: 'Compliance', icon: ShieldCheck },
      { href: '/locations', label: 'Locations', icon: Building2 },
    ],
  },
  {
    label: 'Growth',
    items: [
      { href: '/booking', label: 'Booking', icon: Globe },
      { href: '/reminders', label: 'Reminders', icon: Bell },
      { href: '/portal', label: 'Customer Portal', icon: LayoutDashboard },
      { href: '/reviews', label: 'Reviews', icon: Star },
      { href: '/referrals', label: 'Referrals', icon: Gift },
      { href: '/mobile', label: 'Mobile App', icon: Smartphone },
    ],
  },
  {
    label: 'Finance',
    items: [
      { href: '/invoicing', label: 'Invoicing', icon: CreditCard },
      { href: '/reports', label: 'Reports', icon: BarChart3 },
      { href: '/api', label: 'API & Webhooks', icon: Plug },
    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()
  const [collapsedSections, setCollapsedSections] = useState<string[]>([])

  const toggleSection = (label: string) => {
    setCollapsedSections(prev =>
      prev.includes(label) ? prev.filter(s => s !== label) : [...prev, label]
    )
  }

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-60 bg-[#111113] border-r border-[#27272a] flex flex-col">
      {/* Brand */}
      <div className="h-14 flex items-center gap-3 px-4 border-b border-[#27272a]">
        <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
          C
        </div>
        <span className="font-semibold text-sm tracking-tight">CleanFlow</span>
      </div>

      {/* Search trigger */}
      <div className="px-3 py-2">
        <button
          onClick={() => document.dispatchEvent(new CustomEvent('openCommandPalette'))}
          className="w-full flex items-center gap-2 px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm text-[#71717a] hover:border-[#3f3f46] transition-colors"
        >
          <Search size={14} />
          <span className="flex-1 text-left">Search...</span>
          <kbd className="px-1.5 py-0.5 text-[10px] font-medium bg-[#18181b] border border-[#27272a] rounded">⌘K</kbd>
        </button>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2 px-3 space-y-1">
        {navSections.map((section) => {
          const isCollapsed = collapsedSections.includes(section.label)
          return (
            <div key={section.label}>
              <button
                onClick={() => toggleSection(section.label)}
                className="w-full flex items-center justify-between px-2 py-2 text-[10px] uppercase tracking-wider text-[#71717a] font-semibold hover:text-[#a1a1aa] transition-colors"
              >
                {section.label}
                <ChevronDown size={12} className={`transition-transform ${isCollapsed ? '-rotate-90' : ''}`} />
              </button>
              {!isCollapsed && (
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const active = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-2.5 px-2 py-1.5 rounded-md text-sm transition-colors ${
                          active
                            ? 'bg-[#1e3a5f] text-blue-400'
                            : 'text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#18181b]'
                        }`}
                      >
                        <item.icon size={16} />
                        {item.label}
                      </Link>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-3 border-t border-[#27272a]">
        <div className="flex items-center gap-2 px-2 py-1.5">
          <div className="w-7 h-7 bg-[#18181b] rounded-full flex items-center justify-center text-xs font-medium text-[#a1a1aa]">
            M
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate">Maria G.</p>
            <p className="text-[10px] text-[#71717a] truncate">Manager · Springfield</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
