'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  BarChart3,
  Users,
  Calendar,
  ClipboardCheck,
  Truck,
  Package,
  Clock,
  Globe,
  Bell,
  CreditCard,
  TrendingUp,
  Wrench,
  ShieldCheck,
  Building2,
  Star,
  Gift,
  Search,
  Sparkles,
} from 'lucide-react'
import { useState } from 'react'

const navSections = [
  {
    label: 'Overview',
    items: [
      { href: '/', label: 'Dashboard', icon: BarChart3 },
    ],
  },
  {
    label: 'Operations',
    items: [
      { href: '/crm', label: 'Customers', icon: Users, badge: '142' },
      { href: '/scheduling', label: 'Scheduling', icon: Calendar },
      { href: '/dispatch', label: 'Dispatch', icon: Truck },
      { href: '/checklists', label: 'Checklists', icon: ClipboardCheck },
    ],
  },
  {
    label: 'Management',
    items: [
      { href: '/time-tracking', label: 'Time Tracking', icon: Clock },
      { href: '/inventory', label: 'Inventory', icon: Package, badge: '5' },
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
      { href: '/reviews', label: 'Reviews', icon: Star },
      { href: '/referrals', label: 'Referrals', icon: Gift },
    ],
  },
  {
    label: 'Finance',
    items: [
      { href: '/invoicing', label: 'Invoicing', icon: CreditCard },
      { href: '/reports', label: 'Reports', icon: TrendingUp },
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
    <aside className="fixed left-0 top-0 bottom-0 w-[260px] glass border-r border-[#27272a] flex flex-col z-50">
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-[#27272a]">
        <div className="w-8 h-8 bg-gradient-to-br from-[#3b82f6] to-[#a855f7] rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/20">
          C
        </div>
        <span className="font-semibold text-sm tracking-tight">CleanFlow</span>
        <Sparkles size={14} className="text-[#3b82f6] ml-auto" />
      </div>

      {/* Search trigger */}
      <div className="px-3 py-2">
        <button
          onClick={() => document.dispatchEvent(new CustomEvent('openCommandPalette'))}
          className="w-full flex items-center gap-2 px-3 py-2 bg-[#0f0f12] border border-[#27272a] rounded-lg text-sm text-[#71717a] hover:border-[#3f3f46] transition-colors"
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
                className="w-full flex items-center justify-between px-3 py-2 text-[10px] uppercase tracking-wider text-[#71717a] font-semibold hover:text-[#a1a1aa] transition-colors"
              >
                {section.label}
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`transition-transform ${isCollapsed ? '-rotate-90' : ''}`}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
              {!isCollapsed && (
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const active = pathname === item.href
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all ${
                          active
                            ? 'bg-[#3b82f6] text-white shadow-lg shadow-blue-500/20'
                            : 'text-[#a1a1aa] hover:text-white hover:bg-[#18181b]'
                        }`}
                      >
                        <item.icon size={16} />
                        <span className="flex-1">{item.label}</span>
                        {item.badge && (
                          <span className={`px-1.5 py-0.5 text-[10px] font-semibold rounded-full ${
                            active ? 'bg-white/20 text-white' : 'bg-[#ef4444] text-white'
                          }`}>
                            {item.badge}
                          </span>
                        )}
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
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg bg-[#0f0f12] cursor-pointer hover:bg-[#18181b] transition-colors">
          <div className="w-8 h-8 bg-gradient-to-br from-[#3b82f6] to-[#a855f7] rounded-full flex items-center justify-center text-white text-xs font-semibold">
            M
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate">Maria Garcia</p>
            <p className="text-[10px] text-[#71717a] truncate">Manager · Springfield</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
