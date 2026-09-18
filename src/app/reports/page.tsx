'use client'

import { useState } from 'react'
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Users, Calendar, Clock, Star, ArrowUpRight, ArrowDownRight, Download, Filter } from 'lucide-react'

interface MetricCard {
  label: string
  value: string
  change: number
  prefix?: string
  suffix?: string
}

const metrics: MetricCard[] = [
  { label: 'Monthly Revenue', value: '12,450', change: 12.5, prefix: '$' },
  { label: 'Jobs Completed', value: '87', change: 8.3 },
  { label: 'Active Customers', value: '142', change: 5.1 },
  { label: 'Avg Job Value', value: '143', change: -2.1, prefix: '$' },
  { label: 'Utilization Rate', value: '78', change: 4.2, suffix: '%' },
  { label: 'Customer Retention', value: '94', change: 1.8, suffix: '%' },
]

const revenueData = [
  { month: 'Jan', amount: 8200 },
  { month: 'Feb', amount: 9100 },
  { month: 'Mar', amount: 8800 },
  { month: 'Apr', amount: 10200 },
  { month: 'May', amount: 11500 },
  { month: 'Jun', amount: 10800 },
  { month: 'Jul', amount: 12100 },
  { month: 'Aug', amount: 11900 },
  { month: 'Sep', amount: 12450 },
]

const jobsByService = [
  { service: 'Regular Clean', count: 45, percentage: 52 },
  { service: 'Deep Clean', count: 22, percentage: 25 },
  { service: 'Move-in/out', count: 8, percentage: 9 },
  { service: 'Office Clean', count: 7, percentage: 8 },
  { service: 'Post-Construction', count: 5, percentage: 6 },
]

const cleanerPerformance = [
  { name: 'Maria G.', jobs: 23, rating: 4.8, hours: 184, revenue: 3450 },
  { name: 'Ahmed S.', jobs: 27, rating: 4.9, hours: 196, revenue: 3980 },
  { name: 'Team Alpha', jobs: 31, rating: 4.5, hours: 220, revenue: 4200 },
  { name: 'John D.', jobs: 18, rating: 4.2, hours: 142, revenue: 2380 },
  { name: 'Lisa K.', jobs: 12, rating: 3.9, hours: 98, revenue: 1840 },
]

const customerRetentionData = [
  { cohort: 'Jan 2026', retained: 24, total: 28 },
  { cohort: 'Feb 2026', retained: 19, total: 22 },
  { cohort: 'Mar 2026', retained: 15, total: 18 },
  { cohort: 'Apr 2026', retained: 22, total: 25 },
  { cohort: 'May 2026', retained: 18, total: 20 },
  { cohort: 'Jun 2026', retained: 16, total: 17 },
]

const topCustomers = [
  { name: 'Sarah Johnson', jobs: 12, spent: 2150, lastJob: '2026-09-18' },
  { name: 'TechStart Inc.', jobs: 8, spent: 1600, lastJob: '2026-09-15' },
  { name: 'Green Valley HOA', jobs: 6, spent: 1800, lastJob: '2026-09-10' },
  { name: 'Michael Chen', jobs: 5, spent: 600, lastJob: '2026-09-12' },
  { name: 'Jennifer Walsh', jobs: 4, spent: 980, lastJob: '2026-09-08' },
]

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('30d')
  const [selectedMetric, setSelectedMetric] = useState('revenue')

  const maxRevenue = Math.max(...revenueData.map(d => d.amount))

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Reports & Analytics</h1>
          <p className="text-sm text-[#a1a1aa] mt-1">Track performance, revenue, and team metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-[#111113] border border-[#27272a] rounded-lg p-0.5">
            {[
              { id: '7d', label: '7D' },
              { id: '30d', label: '30D' },
              { id: '90d', label: '90D' },
              { id: '1y', label: '1Y' },
            ].map(range => (
              <button
                key={range.id}
                onClick={() => setDateRange(range.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${dateRange === range.id ? 'bg-blue-500/10 text-blue-400' : 'text-[#71717a] hover:text-[#fafafa]'}`}
              >
                {range.label}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#111113] border border-[#27272a] hover:border-[#3f3f46] text-sm font-medium rounded-lg transition-colors">
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {metrics.map(metric => (
          <div key={metric.label} className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
            <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-2">{metric.label}</p>
            <div className="flex items-baseline gap-1">
              {metric.prefix && <span className="text-lg font-semibold text-[#71717a]">{metric.prefix}</span>}
              <span className="text-xl font-semibold">{metric.value}</span>
              {metric.suffix && <span className="text-lg font-semibold text-[#71717a]">{metric.suffix}</span>}
            </div>
            <div className={`flex items-center gap-1 mt-1 text-xs ${metric.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {metric.change >= 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
              {Math.abs(metric.change)}%
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="col-span-2 bg-[#111113] border border-[#27272a] rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-semibold">Revenue Trend</h3>
            <div className="flex gap-2">
              {['revenue', 'jobs'].map(m => (
                <button
                  key={m}
                  onClick={() => setSelectedMetric(m)}
                  className={`px-2.5 py-1 text-xs font-medium rounded capitalize transition-colors ${selectedMetric === m ? 'bg-blue-500/10 text-blue-400' : 'text-[#71717a] hover:text-[#fafafa]'}`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>
          {/* Bar Chart */}
          <div className="flex items-end gap-2 h-48">
            {revenueData.map((d, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col justify-end h-40">
                  <div
                    className="w-full bg-blue-500 rounded-t hover:bg-blue-400 transition-colors cursor-pointer relative group"
                    style={{ height: `${(d.amount / maxRevenue) * 100}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#0a0a0b] border border-[#27272a] px-2 py-1 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      ${d.amount.toLocaleString()}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] text-[#71717a]">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Jobs by Service */}
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-6">
          <h3 className="font-semibold mb-4">Jobs by Service</h3>
          <div className="space-y-3">
            {jobsByService.map((service, i) => (
              <div key={i}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>{service.service}</span>
                  <span className="text-[#71717a]">{service.count}</span>
                </div>
                <div className="h-2 bg-[#18181b] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${service.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Cleaner Performance */}
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-6">
          <h3 className="font-semibold mb-4">Cleaner Performance</h3>
          <div className="space-y-3">
            {cleanerPerformance.map((cleaner, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-[#0a0a0b] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#18181b] rounded-full flex items-center justify-center text-xs font-medium">
                    {cleaner.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{cleaner.name}</p>
                    <p className="text-xs text-[#71717a]">{cleaner.jobs} jobs · {cleaner.hours}h</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm">
                    <Star size={12} className="text-yellow-400" fill="currentColor" />
                    {cleaner.rating}
                  </div>
                  <p className="text-xs text-[#71717a]">${cleaner.revenue}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Customers */}
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-6">
          <h3 className="font-semibold mb-4">Top Customers</h3>
          <div className="space-y-3">
            {topCustomers.map((customer, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-[#0a0a0b] rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-[#18181b] rounded-full flex items-center justify-center text-[10px] font-bold text-[#71717a]">
                    {i + 1}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{customer.name}</p>
                    <p className="text-xs text-[#71717a]">{customer.jobs} jobs · Last: {new Date(customer.lastJob).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  </div>
                </div>
                <span className="text-sm font-medium">${customer.spent.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Customer Retention */}
      <div className="bg-[#111113] border border-[#27272a] rounded-lg p-6">
        <h3 className="font-semibold mb-4">Customer Retention by Cohort</h3>
        <div className="grid grid-cols-6 gap-4">
          {customerRetentionData.map((cohort, i) => {
            const rate = Math.round((cohort.retained / cohort.total) * 100)
            return (
              <div key={i} className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-2">
                  <svg className="w-16 h-16 transform -rotate-90">
                    <circle cx="32" cy="32" r="28" fill="none" stroke="#1e1e22" strokeWidth="6" />
                    <circle
                      cx="32" cy="32" r="28" fill="none"
                      stroke={rate >= 80 ? '#22c55e' : rate >= 60 ? '#f59e0b' : '#ef4444'}
                      strokeWidth="6"
                      strokeDasharray={`${(rate / 100) * 176} 176`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold">{rate}%</span>
                </div>
                <p className="text-xs text-[#71717a]">{cohort.cohort}</p>
                <p className="text-[10px] text-[#71717a]">{cohort.retained}/{cohort.total}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
