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
  Settings,
} from 'lucide-react'

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
      { href: '/portal', label: 'Customer Portal', icon: Settings },
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

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-60 bg-[#111113] border-r border-[#27272a] flex flex-col">
      {/* Brand */}
      <div className="h-14 flex items-center gap-3 px-4 border-b border-[#27272a]">
        <div className="w-7 h-7 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
          C
        </div>
        <span className="font-semibold text-sm tracking-tight">CleanFlow</span>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {navSections.map((section) => (
          <div key={section.label}>
            <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-2 px-2">
              {section.label}
            </p>
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
          </div>
        ))}
      </nav>
    </aside>
  )
}
