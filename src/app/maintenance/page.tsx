'use client'

import { useState } from 'react'
import { Wrench, AlertTriangle, Calendar, DollarSign, FileText, Plus, Check, X, Clock, ChevronRight, Filter, Search, Truck } from 'lucide-react'

interface Equipment {
  id: string
  name: string
  type: string
  status: 'operational' | 'needs-maintenance' | 'out-of-service'
  assigned_to: string | null
  purchase_date: string
  last_service: string
  next_service: string
  service_interval_days: number
  total_services: number
  notes: string
}

interface ServiceRecord {
  id: string
  equipment_id: string
  equipment_name: string
  date: string
  type: 'routine' | 'repair' | 'replacement'
  description: string
  cost: number
  performed_by: string
  notes: string
}

const mockEquipment: Equipment[] = [
  { id: '1', name: 'Industrial Vacuum #1', type: 'vacuum', status: 'operational', assigned_to: 'Maria G.', purchase_date: '2025-06-15', last_service: '2026-08-20', next_service: '2026-11-20', service_interval_days: 90, total_services: 4, notes: 'Good condition. Minor hose wear.' },
  { id: '2', name: 'Floor Buffer #1', type: 'buffer', status: 'needs-maintenance', assigned_to: 'Team Alpha', purchase_date: '2024-03-10', last_service: '2026-06-15', next_service: '2026-09-15', service_interval_days: 90, total_services: 6, notes: 'Brush head needs replacement. Making grinding noise.' },
  { id: '3', name: 'Pressure Washer #1', type: 'pressure-washer', status: 'operational', assigned_to: 'John D.', purchase_date: '2025-01-20', last_service: '2026-09-01', next_service: '2026-12-01', service_interval_days: 90, total_services: 2, notes: '' },
  { id: '4', name: 'Carpet Extractor #1', type: 'extractor', status: 'out-of-service', assigned_to: null, purchase_date: '2023-08-05', last_service: '2026-07-10', next_service: '2026-10-10', service_interval_days: 90, total_services: 8, notes: 'Motor failure. Parts ordered. ETA 2 weeks.' },
  { id: '5', name: 'Window Cleaning System', type: 'window-system', status: 'operational', assigned_to: 'Ahmed S.', purchase_date: '2025-09-12', last_service: '2026-09-10', next_service: '2027-03-10', service_interval_days: 180, total_services: 1, notes: 'New equipment. First service not yet due.' },
]

const mockServiceHistory: ServiceRecord[] = [
  { id: 's1', equipment_id: '1', equipment_name: 'Industrial Vacuum #1', date: '2026-08-20', type: 'routine', description: 'Filter replacement and hose inspection', cost: 45, performed_by: 'CleanFlow Ops', notes: '' },
  { id: 's2', equipment_id: '2', equipment_name: 'Floor Buffer #1', date: '2026-06-15', type: 'repair', description: 'Belt replacement and motor cleaning', cost: 120, performed_by: 'ProEquipment Repair', notes: 'Found debris in motor housing' },
  { id: 's3', equipment_id: '4', equipment_name: 'Carpet Extractor #1', date: '2026-07-10', type: 'repair', description: 'Pump seal replacement', cost: 280, performed_by: 'ProEquipment Repair', notes: 'Motor showing signs of wear' },
  { id: 's4', equipment_id: '3', equipment_name: 'Pressure Washer #1', date: '2026-09-01', type: 'routine', description: 'Nozzle check and pump oil change', cost: 35, performed_by: 'CleanFlow Ops', notes: '' },
]

const statusConfig = {
  'operational': { label: 'Operational', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/30', icon: Check },
  'needs-maintenance': { label: 'Needs Maintenance', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/30', icon: AlertTriangle },
  'out-of-service': { label: 'Out of Service', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30', icon: X },
}

export default function MaintenancePage() {
  const [equipment, setEquipment] = useState<Equipment[]>(mockEquipment)
  const [serviceHistory, setServiceHistory] = useState<ServiceRecord[]>(mockServiceHistory)
  const [showServiceModal, setShowServiceModal] = useState(false)
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<string | null>(null)

  const filtered = equipment.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.type.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = !filterStatus || e.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleService = () => {
    if (!selectedEquipment) return
    setEquipment(prev => prev.map(e => {
      if (e.id !== selectedEquipment.id) return e
      const nextDate = new Date()
      nextDate.setDate(nextDate.getDate() + e.service_interval_days)
      return { ...e, status: 'operational', last_service: new Date().toISOString().split('T')[0], next_service: nextDate.toISOString().split('T')[0], total_services: e.total_services + 1 }
    }))
    setShowServiceModal(false)
    setSelectedEquipment(null)
  }

  const operationalCount = equipment.filter(e => e.status === 'operational').length
  const needsMaintenanceCount = equipment.filter(e => e.status === 'needs-maintenance').length
  const outOfServiceCount = equipment.filter(e => e.status === 'out-of-service').length
  const totalServices = equipment.reduce((sum, e) => sum + e.total_services, 0)

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Equipment Maintenance</h1>
          <p className="text-sm text-[#a1a1aa] mt-1">{equipment.length} assets · {totalServices} total services</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors">
          <Plus size={16} />
          Add Equipment
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Operational</p>
          <p className="text-2xl font-semibold text-green-400">{operationalCount}</p>
        </div>
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Needs Maintenance</p>
          <p className={`text-2xl font-semibold ${needsMaintenanceCount > 0 ? 'text-yellow-400' : ''}`}>{needsMaintenanceCount}</p>
        </div>
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Out of Service</p>
          <p className={`text-2xl font-semibold ${outOfServiceCount > 0 ? 'text-red-400' : ''}`}>{outOfServiceCount}</p>
        </div>
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Total Services</p>
          <p className="text-2xl font-semibold">{totalServices}</p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717a]" />
          <input
            type="text"
            placeholder="Search equipment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#111113] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus(null)}
            className={`px-3 py-2 text-xs font-medium rounded-lg border transition-colors ${!filterStatus ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-[#111113] border-[#27272a] text-[#71717a] hover:text-[#fafafa]'}`}
          >
            All
          </button>
          {Object.entries(statusConfig).map(([status, config]) => (
            <button
              key={status}
              onClick={() => setFilterStatus(filterStatus === status ? null : status)}
              className={`px-3 py-2 text-xs font-medium rounded-lg border capitalize transition-colors ${filterStatus === status ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-[#111113] border-[#27272a] text-[#71717a] hover:text-[#fafafa]'}`}
            >
              {config.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Equipment List */}
        <div className="col-span-2 space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-[#71717a]">
              <Wrench size={32} className="mx-auto mb-3 opacity-50" />
              <p className="text-sm">No equipment found.</p>
            </div>
          ) : (
            filtered.map(item => {
              const status = statusConfig[item.status]
              const isOverdue = new Date(item.next_service) < new Date(2026, 8, 18)
              return (
                <div key={item.id} className={`bg-[#111113] border rounded-lg p-5 transition-all ${item.status !== 'operational' ? 'border-[#27272a]' : 'border-[#27272a]'}`}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <span className={`px-1.5 py-0.5 text-[10px] font-medium rounded border capitalize ${status.bg} ${status.color}`}>
                          {status.label}
                        </span>
                      </div>
                      <p className="text-xs text-[#71717a] capitalize">{item.type.replace('-', ' ')}</p>
                    </div>
                    <button
                      onClick={() => { setSelectedEquipment(item); setShowServiceModal(true) }}
                      className="px-3 py-1.5 text-xs font-medium bg-[#18181b] border border-[#27272a] hover:border-blue-500/50 hover:text-blue-400 rounded-lg transition-colors"
                    >
                      Log Service
                    </button>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-4 gap-4 mb-3">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Assigned To</p>
                      <p className="text-sm text-[#a1a1aa]">{item.assigned_to || 'Unassigned'}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Last Service</p>
                      <p className="text-sm text-[#a1a1aa]">{new Date(item.last_service).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Next Service</p>
                      <p className={`text-sm ${isOverdue && item.status !== 'out-of-service' ? 'text-red-400' : 'text-[#a1a1aa]'}`}>
                        {new Date(item.next_service).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        {isOverdue && item.status !== 'out-of-service' && ' (overdue)'}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Total Services</p>
                      <p className="text-sm text-[#a1a1aa]">{item.total_services}</p>
                    </div>
                  </div>

                  {/* Notes */}
                  {item.notes && (
                    <p className="text-xs text-[#71717a] bg-[#0a0a0b] p-2 rounded">{item.notes}</p>
                  )}
                </div>
              )
            })
          )}
        </div>

        {/* Service History Sidebar */}
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-5 h-fit">
          <h3 className="font-semibold mb-4 flex items-center gap-2">
            <Clock size={16} />
            Recent Service History
          </h3>
          <div className="space-y-3">
            {serviceHistory.map(record => (
              <div key={record.id} className="p-3 bg-[#0a0a0b] rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium">{record.equipment_name}</span>
                  <span className={`px-1.5 py-0.5 text-[10px] font-medium rounded capitalize ${
                    record.type === 'routine' ? 'bg-green-500/10 text-green-400' :
                    record.type === 'repair' ? 'bg-yellow-500/10 text-yellow-400' :
                    'bg-red-500/10 text-red-400'
                  }`}>
                    {record.type}
                  </span>
                </div>
                <p className="text-xs text-[#71717a] mb-1">{record.description}</p>
                <div className="flex items-center justify-between text-[10px] text-[#71717a]">
                  <span>{new Date(record.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  <span>${record.cost}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Log Service Modal */}
      {showServiceModal && selectedEquipment && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowServiceModal(false)}>
          <div className="bg-[#111113] border border-[#27272a] rounded-xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Log Service</h2>
              <button onClick={() => setShowServiceModal(false)} className="p-1 hover:bg-[#18181b] rounded transition-colors">
                <X size={18} className="text-[#71717a]" />
              </button>
            </div>

            <div className="mb-4 p-3 bg-[#0a0a0b] rounded-lg">
              <p className="text-sm font-medium">{selectedEquipment.name}</p>
              <p className="text-xs text-[#71717a]">Current status: {statusConfig[selectedEquipment.status]?.label}</p>
            </div>

            <div className="space-y-3 mb-6">
              <div>
                <label className="block text-xs text-[#71717a] font-medium mb-1">Service Type</label>
                <select className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500">
                  <option>Routine Maintenance</option>
                  <option>Repair</option>
                  <option>Part Replacement</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#71717a] font-medium mb-1">Description</label>
                <textarea rows={2} placeholder="What was done?" className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500 resize-none" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#71717a] font-medium mb-1">Cost ($)</label>
                  <input type="number" placeholder="0.00" className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500" />
                </div>
                <div>
                  <label className="block text-xs text-[#71717a] font-medium mb-1">Performed By</label>
                  <input type="text" placeholder="Technician name" className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500" />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={() => setShowServiceModal(false)} className="px-4 py-2 text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors">
                Cancel
              </button>
              <button onClick={handleService} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors">
                Complete Service
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
