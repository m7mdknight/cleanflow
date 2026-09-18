'use client'

import { useState } from 'react'
import { Building2, Plus, Users, BarChart3, DollarSign, Calendar, MapPin, Phone, Mail, ChevronRight, Search, TrendingUp, Package, Wrench, ShieldCheck, Truck, X } from 'lucide-react'

interface Location {
  id: string
  name: string
  address: string
  phone: string
  email: string
  manager: string
  employees: number
  active_jobs: number
  monthly_revenue: number
  status: 'active' | 'inactive'
  open_issues: number
}

const mockLocations: Location[] = [
  { id: '1', name: 'Springfield HQ', address: '123 Main St, Springfield, IL 62701', phone: '+1 555-0001', email: 'springfield@cleanflow.io', manager: 'Maria G.', employees: 12, active_jobs: 28, monthly_revenue: 18500, status: 'active', open_issues: 2 },
  { id: '2', name: 'Austin Branch', address: '456 Tech Blvd, Austin, TX 78701', phone: '+1 555-0002', email: 'austin@cleanflow.io', manager: 'Ahmed S.', employees: 8, active_jobs: 19, monthly_revenue: 12200, status: 'active', open_issues: 1 },
  { id: '3', name: 'Seattle Branch', address: '789 Pine St, Seattle, WA 98101', phone: '+1 555-0003', email: 'seattle@cleanflow.io', manager: 'John D.', employees: 6, active_jobs: 14, monthly_revenue: 9800, status: 'active', open_issues: 3 },
  { id: '4', name: 'Boulder Satellite', address: '321 Canyon Rd, Boulder, CO 80302', phone: '+1 555-0004', email: 'boulder@cleanflow.io', manager: 'Lisa K.', employees: 3, active_jobs: 7, monthly_revenue: 4500, status: 'active', open_issues: 0 },
  { id: '5', name: 'Denver Branch (New)', address: '567 Colfax Ave, Denver, CO 80206', phone: '+1 555-0005', email: 'denver@cleanflow.io', manager: 'TBD', employees: 0, active_jobs: 0, monthly_revenue: 0, status: 'inactive', open_issues: 0 },
]

const locationMetrics = [
  { label: 'Total Locations', value: mockLocations.length, icon: Building2 },
  { label: 'Active Employees', value: mockLocations.reduce((s, l) => s + l.employees, 0), icon: Users },
  { label: 'Total Revenue', value: `$${mockLocations.reduce((s, l) => s + l.monthly_revenue, 0).toLocaleString()}`, icon: DollarSign },
  { label: 'Active Jobs', value: mockLocations.reduce((s, l) => s + l.active_jobs, 0), icon: Calendar },
]

export default function LocationsPage() {
  const [locations, setLocations] = useState<Location[]>(mockLocations)
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null)
  const [search, setSearch] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)

  const filtered = locations.filter(loc =>
    loc.name.toLowerCase().includes(search.toLowerCase()) ||
    loc.address.toLowerCase().includes(search.toLowerCase()) ||
    loc.manager.toLowerCase().includes(search.toLowerCase())
  )

  const totalRevenue = locations.reduce((s, l) => s + l.monthly_revenue, 0)
  const totalJobs = locations.reduce((s, l) => s + l.active_jobs, 0)
  const totalEmployees = locations.reduce((s, l) => s + l.employees, 0)

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Multi-Location</h1>
          <p className="text-sm text-[#a1a1aa] mt-1">{locations.length} locations · {totalEmployees} total employees</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus size={16} />
          Add Location
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {locationMetrics.map(metric => (
          <div key={metric.label} className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold">{metric.label}</p>
              <metric.icon size={16} className="text-[#71717a]" />
            </div>
            <p className="text-xl font-semibold">{metric.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-6">
        {/* Location List */}
        <div className="flex-1">
          {/* Search */}
          <div className="relative mb-4">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717a]" />
            <input
              type="text"
              placeholder="Search locations..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#111113] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Locations */}
          <div className="space-y-3">
            {filtered.map(location => (
              <div
                key={location.id}
                onClick={() => setSelectedLocation(location)}
                className={`bg-[#111113] border rounded-lg p-5 cursor-pointer transition-all ${
                  selectedLocation?.id === location.id ? 'border-blue-500/30 bg-blue-500/5' : 'border-[#27272a] hover:border-[#3f3f46]'
                } ${location.status === 'inactive' ? 'opacity-60' : ''}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-sm">{location.name}</h3>
                      {location.status === 'inactive' && (
                        <span className="px-1.5 py-0.5 text-[10px] font-medium bg-[#18181b] text-[#71717a] border border-[#27272a] rounded">INACTIVE</span>
                      )}
                    </div>
                    <p className="text-xs text-[#71717a] flex items-center gap-1 mt-0.5">
                      <MapPin size={11} />{location.address}
                    </p>
                  </div>
                  <ChevronRight size={16} className="text-[#71717a]" />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Manager</p>
                    <p className="text-sm text-[#a1a1aa]">{location.manager}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Employees</p>
                    <p className="text-sm text-[#a1a1aa]">{location.employees}</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Revenue (mo)</p>
                    <p className="text-sm font-medium">${location.monthly_revenue.toLocaleString()}</p>
                  </div>
                </div>

                {location.open_issues > 0 && (
                  <div className="mt-3 flex items-center gap-2 text-xs text-yellow-400">
                    <ShieldCheck size={12} />
                    {location.open_issues} open compliance {location.open_issues === 1 ? 'issue' : 'issues'}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Location Detail Sidebar */}
        {selectedLocation && (
          <div className="w-96 bg-[#111113] border border-[#27272a] rounded-lg p-6 h-fit sticky top-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold">{selectedLocation.name}</h2>
                <p className="text-xs text-[#71717a]">Since 2026</p>
              </div>
              <button className="px-3 py-1.5 text-xs font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                Edit
              </button>
            </div>

            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-sm">
                <MapPin size={14} className="text-[#71717a]" />
                <span>{selectedLocation.address}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone size={14} className="text-[#71717a]" />
                <span>{selectedLocation.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail size={14} className="text-[#71717a]" />
                <span>{selectedLocation.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users size={14} className="text-[#71717a]" />
                <span>{selectedLocation.manager} · {selectedLocation.employees} employees</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-[#0a0a0b] rounded-lg p-3 text-center">
                <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Jobs</p>
                <p className="text-xl font-semibold">{selectedLocation.active_jobs}</p>
              </div>
              <div className="bg-[#0a0a0b] rounded-lg p-3 text-center">
                <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Revenue</p>
                <p className="text-xl font-semibold">${(selectedLocation.monthly_revenue / 1000).toFixed(1)}k</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-2">
              <button className="w-full flex items-center gap-3 p-3 bg-[#0a0a0b] rounded-lg hover:bg-[#18181b] transition-colors text-left">
                <BarChart3 size={16} className="text-blue-400" />
                <div>
                  <p className="text-sm font-medium">View Reports</p>
                  <p className="text-xs text-[#71717a]">Revenue, jobs, utilization</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-[#0a0a0b] rounded-lg hover:bg-[#18181b] transition-colors text-left">
                <Users size={16} className="text-green-400" />
                <div>
                  <p className="text-sm font-medium">Manage Team</p>
                  <p className="text-xs text-[#71717a]">{selectedLocation.employees} team members</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-[#0a0a0b] rounded-lg hover:bg-[#18181b] transition-colors text-left">
                <Truck size={16} className="text-purple-400" />
                <div>
                  <p className="text-sm font-medium">Fleet</p>
                  <p className="text-xs text-[#71717a]">Vehicles and equipment</p>
                </div>
              </button>
              <button className="w-full flex items-center gap-3 p-3 bg-[#0a0a0b] rounded-lg hover:bg-[#18181b] transition-colors text-left">
                <Package size={16} className="text-orange-400" />
                <div>
                  <p className="text-sm font-medium">Inventory</p>
                  <p className="text-xs text-[#71717a]">Stock levels</p>
                </div>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Cross-Location Comparison */}
      <div className="mt-8 bg-[#111113] border border-[#27272a] rounded-xl p-6">
        <h3 className="font-semibold mb-4">Cross-Location Comparison</h3>
        <div className="space-y-4">
          {locations.filter(l => l.status === 'active').map(loc => {
            const maxRevenue = Math.max(...locations.map(l => l.monthly_revenue))
            const revenuePercent = maxRevenue > 0 ? (loc.monthly_revenue / maxRevenue) * 100 : 0
            const maxJobs = Math.max(...locations.map(l => l.active_jobs))
            const jobsPercent = maxJobs > 0 ? (loc.active_jobs / maxJobs) * 100 : 0
            return (
              <div key={loc.id} className="grid grid-cols-4 gap-4 items-center">
                <div className="font-medium text-sm">{loc.name}</div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#71717a]">Revenue</span>
                    <span>${loc.monthly_revenue.toLocaleString()}</span>
                  </div>
                  <div className="h-2 bg-[#18181b] rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${revenuePercent}%` }} />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[#71717a]">Jobs</span>
                    <span>{loc.active_jobs}</span>
                  </div>
                  <div className="h-2 bg-[#18181b] rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${jobsPercent}%` }} />
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium">{loc.employees} staff</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Add Location Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowAddModal(false)}>
          <div className="bg-[#111113] border border-[#27272a] rounded-xl w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Add New Location</h2>
              <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-[#18181b] rounded transition-colors">
                <X size={18} className="text-[#71717a]" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={e => { e.preventDefault(); setShowAddModal(false) }}>
              <div>
                <label className="block text-xs text-[#71717a] font-medium mb-1.5">Location Name</label>
                <input type="text" placeholder="e.g., Phoenix Branch" className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500" required />
              </div>
              <div>
                <label className="block text-xs text-[#71717a] font-medium mb-1.5">Address</label>
                <input type="text" placeholder="Full address" className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#71717a] font-medium mb-1.5">Phone</label>
                  <input type="tel" placeholder="+1 555-0000" className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs text-[#71717a] font-medium mb-1.5">Email</label>
                  <input type="email" placeholder="branch@cleanflow.io" className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-[#71717a] font-medium mb-1.5">Branch Manager</label>
                <input type="text" placeholder="Manager name" className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500" />
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors">Create Location</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
