import { Users, Calendar, CreditCard, TrendingUp, Clock, ClipboardCheck, Package, Star, Truck, MapPin, CheckCircle2, AlertCircle, Plus, Sparkles } from 'lucide-react'

const stats = [
  { label: 'Revenue (MTD)', value: '$12,450', change: '+12.5%', up: true, icon: CreditCard, accent: true },
  { label: 'Jobs Completed', value: '87', change: '+8.3%', up: true, icon: CheckCircle2, success: true },
  { label: 'Team Utilization', value: '78%', change: '-2.1%', up: false, icon: Clock, warning: true },
  { label: 'Customer Rating', value: '4.8', change: '+0.3', up: true, icon: Star, purple: true },
]

const schedule = [
  { customer: 'Sarah Johnson', service: 'Deep Clean', time: '9:00 AM', cleaner: 'Maria G.', status: 'confirmed', address: '123 Oak Street' },
  { customer: 'TechStart Inc.', service: 'Office Clean', time: '2:00 PM', cleaner: 'Team Alpha', status: 'en-route', address: '456 Innovation Blvd' },
  { customer: 'Michael Chen', service: 'Regular Clean', time: '4:00 PM', cleaner: 'John D.', status: 'pending', address: '789 Pine Ave' },
]

const team = [
  { name: 'Maria G.', initials: 'M', status: 'online', jobs: 2 },
  { name: 'Ahmed S.', initials: 'A', status: 'online', jobs: 1 },
  { name: 'John D.', initials: 'J', status: 'online', jobs: 1 },
  { name: 'Lisa K.', initials: 'L', status: 'offline', jobs: 0 },
]

const activity = [
  { type: 'success', text: 'Maria G. completed Deep Clean for Sarah Johnson', time: '2 min ago' },
  { type: 'info', text: 'New booking from TechStart Inc.', time: '15 min ago' },
  { type: 'warning', text: 'Low stock alert: Nitrile Gloves', time: '32 min ago' },
  { type: 'success', text: 'Invoice INV-004 marked as paid', time: '1 hour ago' },
]

export default function DashboardPage() {
  return (
    <div className="p-8 relative z-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-[#a1a1aa] mt-1">Welcome back, Maria. Here&apos;s what&apos;s happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#18181b] border border-[#27272a] rounded-lg text-sm text-[#71717a] hover:border-[#3f3f46] transition-colors">
            <MapPin size={14} />
            Springfield HQ
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white text-sm font-medium rounded-lg transition-all glow-accent btn-press">
            <Plus size={16} />
            New Job
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-5 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className={`bg-[#18181b] border border-[#27272a] rounded-xl p-5 card-hover gradient-border ${stat.accent ? 'accent' : stat.success ? 'success' : stat.warning ? 'warning' : 'danger'}`}>
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                stat.accent ? 'bg-[#3b82f6]/10 text-[#3b82f6]' :
                stat.success ? 'bg-[#22c55e]/10 text-[#22c55e]' :
                stat.warning ? 'bg-[#f59e0b]/10 text-[#f59e0b]' :
                'bg-[#a855f7]/10 text-[#a855f7]'
              }`}>
                <stat.icon size={18} />
              </div>
              <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                stat.up ? 'bg-[#22c55e]/10 text-[#22c55e]' : 'bg-[#ef4444]/10 text-[#ef4444]'
              }`}>
                {stat.up ? '↑' : '↓'} {stat.change}
              </span>
            </div>
            <p className="text-2xl font-semibold mb-1">{stat.value}</p>
            <p className="text-xs text-[#71717a]">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-5 mb-8">
        {/* Today's Schedule */}
        <div className="col-span-2 bg-[#18181b] border border-[#27272a] rounded-xl overflow-hidden card-hover">
          <div className="flex items-center justify-between p-5 border-b border-[#27272a]">
            <div>
              <h3 className="font-semibold">Today&apos;s Schedule</h3>
              <p className="text-xs text-[#71717a] mt-1">Thursday, September 18</p>
            </div>
            <button className="text-xs text-[#3b82f6] hover:text-[#60a5fa] transition-colors">View All →</button>
          </div>
          <div className="p-5 space-y-3">
            {schedule.map((job, i) => (
              <div key={i} className={`flex items-center gap-4 p-4 bg-[#0f0f12] rounded-lg border-l-[3px] transition-all hover:translate-x-1 cursor-pointer ${
                job.status === 'confirmed' ? 'border-l-[#22c55e]' :
                job.status === 'en-route' ? 'border-l-[#3b82f6]' :
                'border-l-[#f59e0b]'
              }`}>
                <div className="text-center min-w-[60px]">
                  <p className="text-sm font-semibold">{job.time}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{job.customer}</p>
                  <p className="text-xs text-[#71717a]">{job.service} · {job.address}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#71717a] px-2 py-1 bg-[#18181b] rounded-full">{job.cleaner}</span>
                  <span className={`text-[10px] font-semibold px-2 py-1 rounded-full uppercase ${
                    job.status === 'confirmed' ? 'bg-[#22c55e]/10 text-[#22c55e]' :
                    job.status === 'en-route' ? 'bg-[#3b82f6]/10 text-[#3b82f6]' :
                    'bg-[#f59e0b]/10 text-[#f59e0b]'
                  }`}>
                    {job.status.replace('-', ' ')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Activity */}
        <div className="bg-[#18181b] border border-[#27272a] rounded-xl overflow-hidden card-hover">
          <div className="flex items-center justify-between p-5 border-b border-[#27272a]">
            <div>
              <h3 className="font-semibold">Live Activity</h3>
              <p className="text-xs text-[#71717a] mt-1">Real-time updates</p>
            </div>
            <span className="flex items-center gap-1.5 text-xs font-medium text-[#22c55e] px-2 py-1 bg-[#22c55e]/10 rounded-full">
              <span className="w-1.5 h-1.5 bg-[#22c55e] rounded-full pulse-glow" />
              Live
            </span>
          </div>
          <div className="p-5 space-y-4">
            {activity.map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-[#0f0f12] transition-colors cursor-pointer">
                <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                  item.type === 'success' ? 'bg-[#22c55e]' :
                  item.type === 'warning' ? 'bg-[#f59e0b]' :
                  'bg-[#3b82f6]'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#a1a1aa] leading-relaxed">{item.text}</p>
                  <p className="text-[10px] text-[#71717a] mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team & Quick Actions */}
      <div className="grid grid-cols-3 gap-5">
        {/* Team Status */}
        <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-5 card-hover">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Team Status</h3>
            <span className="text-xs text-[#71717a]">{team.filter(t => t.status === 'online').length} online</span>
          </div>
          <div className="space-y-3">
            {team.map((member) => (
              <div key={member.name} className="flex items-center gap-3 p-3 bg-[#0f0f12] rounded-lg cursor-pointer hover:bg-[#1f1f23] transition-colors">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-semibold ${
                  member.name === 'Maria G.' ? 'bg-gradient-to-br from-[#3b82f6] to-[#a855f7]' :
                  member.name === 'Ahmed S.' ? 'bg-gradient-to-br from-[#22c55e] to-[#10b981]' :
                  member.name === 'John D.' ? 'bg-gradient-to-br from-[#f59e0b] to-[#f97316]' :
                  'bg-gradient-to-br from-[#ef4444] to-[#f97316]'
                }`}>
                  {member.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{member.name}</p>
                  <p className="text-xs text-[#71717a]">{member.jobs} active jobs</p>
                </div>
                <span className={`flex items-center gap-1.5 text-[10px] font-medium ${
                  member.status === 'online' ? 'text-[#22c55e]' : 'text-[#71717a]'
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full ${
                    member.status === 'online' ? 'bg-[#22c55e] pulse-glow' : 'bg-[#71717a]'
                  }`} />
                  {member.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-5 card-hover">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: Calendar, label: 'Schedule', color: '#3b82f6' },
              { icon: CreditCard, label: 'Invoice', color: '#22c55e' },
              { icon: Package, label: 'Restock', color: '#f59e0b' },
              { icon: TrendingUp, label: 'Reports', color: '#a855f7' },
            ].map((action) => (
              <button key={action.label} className="flex flex-col items-center gap-2 p-4 bg-[#0f0f12] rounded-lg hover:bg-[#1f1f23] transition-all hover:-translate-y-0.5 btn-press">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${action.color}20`, color: action.color }}>
                  <action.icon size={18} />
                </div>
                <span className="text-xs font-medium text-[#a1a1aa]">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Performance */}
        <div className="bg-[#18181b] border border-[#27272a] rounded-xl p-5 card-hover">
          <h3 className="font-semibold mb-4">Top Performers</h3>
          <div className="space-y-3">
            {[
              { name: 'Ahmed S.', rating: 4.9, jobs: 27 },
              { name: 'Maria G.', rating: 4.8, jobs: 23 },
              { name: 'Team Alpha', rating: 4.5, jobs: 31 },
            ].map((cleaner, i) => (
              <div key={cleaner.name} className="flex items-center gap-3 p-3 bg-[#0f0f12] rounded-lg">
                <span className="w-6 h-6 rounded-full bg-[#3b82f6]/10 text-[#3b82f6] flex items-center justify-center text-xs font-bold">
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium">{cleaner.name}</p>
                  <p className="text-xs text-[#71717a]">{cleaner.jobs} jobs this month</p>
                </div>
                <div className="flex items-center gap-1">
                  <Star size={12} className="text-[#f59e0b]" fill="currentColor" />
                  <span className="text-sm font-semibold">{cleaner.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
