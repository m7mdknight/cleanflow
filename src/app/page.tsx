import {
  Users,
  Calendar,
  ClipboardCheck,
  CreditCard,
  TrendingUp,
  Clock,
} from 'lucide-react'

const stats = [
  { label: 'Active Customers', value: '0', change: '+0%', icon: Users },
  { label: 'Scheduled Jobs', value: '0', change: '+0%', icon: Calendar },
  { label: 'Open Checklists', value: '0', change: '+0%', icon: ClipboardCheck },
  { label: 'Revenue (MTD)', value: '$0', change: '+0%', icon: CreditCard },
  { label: 'Utilization', value: '0%', change: '+0%', icon: TrendingUp },
  { label: 'Hours Logged', value: '0', change: '+0%', icon: Clock },
]

export default function DashboardPage() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-[#a1a1aa] mt-1">Welcome to CleanFlow — your cleaning company OS.</p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-[#111113] border border-[#27272a] rounded-lg p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-[#71717a] uppercase tracking-wider font-semibold">
                {stat.label}
              </span>
              <stat.icon size={16} className="text-[#71717a]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-semibold">{stat.value}</span>
              <span className="text-xs text-green-400">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Placeholder for charts */}
      <div className="bg-[#111113] border border-[#27272a] rounded-lg p-8 text-center">
        <p className="text-sm text-[#71717a]">
          Connect your Supabase project to see live data.{' '}
          <code className="text-blue-400">.env.local</code> →{' '}
          <code className="text-blue-400">NEXT_PUBLIC_SUPABASE_URL</code>
        </p>
      </div>
    </div>
  )
}
