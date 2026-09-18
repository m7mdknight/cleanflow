'use client'

import { useState } from 'react'
import { Truck, User, MapPin, Clock, Phone, Navigation, Wrench, Fuel, Package, AlertTriangle, Check, X, ChevronRight } from 'lucide-react'
import type { Cleaner } from '@/types'

const mockCleaners: Cleaner[] = [
  { id: 'c1', name: 'Maria G.', email: 'maria@cleanflow.io', phone: '+1 555-1001', status: 'active', jobs_completed: 23, rating: 4.8 },
  { id: 'c2', name: 'Team Alpha', email: 'alpha@cleanflow.io', phone: '+1 555-1002', status: 'active', jobs_completed: 31, rating: 4.5 },
  { id: 'c3', name: 'John D.', email: 'john@cleanflow.io', phone: '+1 555-1003', status: 'active', jobs_completed: 18, rating: 4.2 },
  { id: 'c4', name: 'Lisa K.', email: 'lisa@cleanflow.io', phone: '+1 555-1004', status: 'inactive', jobs_completed: 12, rating: 3.9 },
  { id: 'c5', name: 'Ahmed S.', email: 'ahmed@cleanflow.io', phone: '+1 555-1005', status: 'active', jobs_completed: 27, rating: 4.9 },
]

const mockVehicles = [
  { id: 'v1', name: 'Van #1 - Ford Transit', driver: 'Maria G.', status: 'en-route', fuel: 72, mileage: 45200, next_service: '2026-10-01', location: '123 Oak St, Springfield' },
  { id: 'v2', name: 'Van #2 - Mercedes Sprinter', driver: 'Team Alpha', status: 'at-job', fuel: 45, mileage: 62100, next_service: '2026-09-25', location: '456 Innovation Blvd' },
  { id: 'v3', name: 'Van #3 - Ram ProMaster', driver: 'John D.', status: 'returning', fuel: 88, mileage: 31500, next_service: '2026-10-15', location: 'En route to depot' },
  { id: 'v4', name: 'Van #4 - Ford Transit', driver: 'Ahmed S.', status: 'depot', fuel: 100, mileage: 18900, next_service: '2026-11-01', location: 'Depot - 100 Main St' },
]

const mockJobs = [
  { id: 'j1', customer: 'Sarah Johnson', address: '123 Oak Street, Springfield', assigned_to: 'Maria G.', status: 'en-route', eta: '12 min', distance: '3.2 mi' },
  { id: 'j2', customer: 'TechStart Inc.', address: '456 Innovation Blvd, Austin', assigned_to: 'Team Alpha', status: 'at-job', eta: 'In progress', distance: '0.1 mi' },
  { id: 'j3', customer: 'Michael Chen', address: '789 Pine Ave, Seattle', assigned_to: null, status: 'unassigned', eta: null, distance: null },
  { id: 'j4', customer: 'Green Valley HOA', address: '100 Green Valley Dr, Boulder', assigned_to: 'Ahmed S.', status: 'depot', eta: 'Not started', distance: null },
]

const statusColors: Record<string, string> = {
  'en-route': 'text-blue-400 bg-blue-500/10',
  'at-job': 'text-green-400 bg-green-500/10',
  'returning': 'text-yellow-400 bg-yellow-500/10',
  depot: 'text-[#71717a] bg-[#18181b]',
  unassigned: 'text-red-400 bg-red-500/10',
}

const statusDots: Record<string, string> = {
  'en-route': 'bg-blue-400 animate-pulse',
  'at-job': 'bg-green-400',
  'returning': 'bg-yellow-400 animate-pulse',
  depot: 'bg-[#71717a]',
  unassigned: 'bg-red-400',
}

export default function DispatchPage() {
  const [cleaners, setCleaners] = useState<Cleaner[]>(mockCleaners)
  const [selectedTab, setSelectedTab] = useState<'map' | 'cleaners' | 'vehicles' | 'jobs'>('map')

  const activeJobs = mockJobs.filter(j => j.status === 'at-job').length
  const unassignedJobs = mockJobs.filter(j => j.status === 'unassigned').length
  const activeCleaners = cleaners.filter(c => c.status === 'active').length

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dispatch & GPS</h1>
          <p className="text-sm text-[#a1a1aa] mt-1">{activeJobs} active · {unassignedJobs} unassigned · {activeCleaners} cleaners on duty</p>
        </div>
        <div className="flex gap-2">
          <div className="flex bg-[#111113] border border-[#27272a] rounded-lg p-0.5">
            {(['map', 'cleaners', 'vehicles', 'jobs'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${selectedTab === tab ? 'bg-blue-500/10 text-blue-400' : 'text-[#71717a] hover:text-[#fafafa]'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Map View */}
      {selectedTab === 'map' && (
        <div className="grid grid-cols-3 gap-6">
          {/* Map Placeholder */}
          <div className="col-span-2 bg-[#111113] border border-[#27272a] rounded-lg p-6 min-h-[500px] relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={48} className="mx-auto mb-4 text-blue-400 opacity-50" />
                <p className="text-sm text-[#71717a] mb-2">Live Map View</p>
                <p className="text-xs text-[#71717a]">Connect Google Maps API for real-time tracking</p>
                <div className="mt-4 space-y-2 text-left">
                  <div className="flex items-center gap-2 text-xs text-blue-400">
                    <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                    Maria G. — 123 Oak St (en route)
                  </div>
                  <div className="flex items-center gap-2 text-xs text-green-400">
                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                    Team Alpha — 456 Innovation Blvd (at job)
                  </div>
                  <div className="flex items-center gap-2 text-xs text-yellow-400">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse" />
                    John D. — Returning to depot
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Active Jobs Sidebar */}
          <div className="space-y-4">
            <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
              <h3 className="text-sm font-semibold mb-3">Active Jobs</h3>
              <div className="space-y-2">
                {mockJobs.map(job => (
                  <div key={job.id} className="p-3 bg-[#0a0a0b] rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{job.customer}</span>
                      <span className={`px-1.5 py-0.5 text-[10px] font-medium rounded capitalize ${statusColors[job.status]}`}>
                        {job.status}
                      </span>
                    </div>
                    <p className="text-xs text-[#71717a] flex items-center gap-1 mb-1">
                      <MapPin size={11} />{job.address}
                    </p>
                    <div className="flex items-center gap-3 text-xs">
                      {job.assigned_to && (
                        <span className="flex items-center gap-1 text-[#a1a1aa]">
                          <User size={11} />{job.assigned_to}
                        </span>
                      )}
                      {job.eta && (
                        <span className="flex items-center gap-1 text-blue-400">
                          <Clock size={11} />{job.eta}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cleaners View */}
      {selectedTab === 'cleaners' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cleaners.map(cleaner => (
            <div key={cleaner.id} className="bg-[#111113] border border-[#27272a] rounded-lg p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-medium ${cleaner.status === 'active' ? 'bg-green-500' : 'bg-[#3f3f46]'}`}>
                    {cleaner.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{cleaner.name}</h3>
                    <p className="text-xs text-[#71717a]">{cleaner.status === 'active' ? 'On duty' : 'Off duty'}</p>
                  </div>
                </div>
                <span className={`w-2 h-2 rounded-full mt-1 ${cleaner.status === 'active' ? 'bg-green-400' : 'bg-[#71717a]'}`} />
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-[#a1a1aa]">
                  <Phone size={12} />{cleaner.phone}
                </div>
              </div>

              <div className="flex items-center gap-4 pt-3 border-t border-[#27272a]">
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Jobs</p>
                  <p className="text-sm font-medium">{cleaner.jobs_completed}</p>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Rating</p>
                  <p className="text-sm flex items-center gap-1">
                    {cleaner.rating ? (
                      <>
                        <span className="text-yellow-400">★</span>
                        {cleaner.rating}
                      </>
                    ) : '—'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Vehicles View */}
      {selectedTab === 'vehicles' && (
        <div className="space-y-4">
          {mockVehicles.map(vehicle => (
            <div key={vehicle.id} className="bg-[#111113] border border-[#27272a] rounded-lg p-5">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#18181b] rounded-lg flex items-center justify-center">
                    <Truck size={18} className="text-[#71717a]" />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">{vehicle.name}</h3>
                    <p className="text-xs text-[#71717a]">Driver: {vehicle.driver}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded capitalize ${statusColors[vehicle.status]}`}>
                  {vehicle.status}
                </span>
              </div>

              <div className="grid grid-cols-4 gap-4">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Fuel</p>
                  <div className="flex items-center gap-2">
                    <Fuel size={14} className="text-[#71717a]" />
                    <div className="flex-1 h-2 bg-[#18181b] rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${vehicle.fuel > 50 ? 'bg-green-500' : vehicle.fuel > 25 ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${vehicle.fuel}%` }}
                      />
                    </div>
                    <span className="text-xs">{vehicle.fuel}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Mileage</p>
                  <p className="text-sm font-medium">{vehicle.mileage.toLocaleString()} mi</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Next Service</p>
                  <p className="text-sm font-medium">{new Date(vehicle.next_service).toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Location</p>
                  <p className="text-sm text-[#a1a1aa] truncate">{vehicle.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Jobs View */}
      {selectedTab === 'jobs' && (
        <div className="space-y-4">
          {mockJobs.map(job => (
            <div key={job.id} className="bg-[#111113] border border-[#27272a] rounded-lg p-5">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium text-sm">{job.customer}</h3>
                    <span className={`px-1.5 py-0.5 text-[10px] font-medium rounded capitalize ${statusColors[job.status]}`}>
                      {job.status}
                    </span>
                  </div>
                  <p className="text-xs text-[#71717a] flex items-center gap-1">
                    <MapPin size={11} />{job.address}
                  </p>
                </div>
                <div className="text-right">
                  {job.assigned_to ? (
                    <p className="text-sm font-medium">{job.assigned_to}</p>
                  ) : (
                    <button className="px-3 py-1.5 text-xs font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                      Assign
                    </button>
                  )}
                  {job.distance && <p className="text-xs text-[#71717a] mt-1">{job.distance}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
