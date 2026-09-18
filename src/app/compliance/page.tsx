'use client'

import { useState } from 'react'
import { ShieldCheck, AlertTriangle, FileText, Plus, Check, X, Clock, ChevronRight, Search, Filter, Download, Eye } from 'lucide-react'

interface ComplianceItem {
  id: string
  title: string
  category: 'chemical' | 'safety' | 'training' | 'incident'
  severity: 'low' | 'medium' | 'high' | 'critical'
  status: 'open' | 'in-progress' | 'resolved' | 'closed'
  reported_by: string
  reported_date: string
  due_date: string
  description: string
  corrective_action?: string
  resolved_date?: string
}

interface TrainingRecord {
  id: string
  employee: string
  training_type: string
  completed_date: string
  expiry_date: string
  status: 'current' | 'expiring' | 'expired'
  certificate_url?: string
}

interface ChemicalLog {
  id: string
  chemical: string
  used_by: string
  used_date: string
  quantity: string
  location: string
  sds_available: boolean
  ppe_used: string[]
}

const mockComplianceItems: ComplianceItem[] = [
  { id: '1', title: 'Chemical spill in Van #2', category: 'chemical', severity: 'high', status: 'resolved', reported_by: 'Maria G.', reported_date: '2026-09-15', due_date: '2026-09-17', description: 'Small spill of all-purpose cleaner during transport. No injuries.', corrective_action: 'Restocked spill kit. Reviewed transport procedures with team.', resolved_date: '2026-09-16' },
  { id: '2', title: 'Missing SDS for new disinfectant', category: 'chemical', severity: 'medium', status: 'open', reported_by: 'Safety Manager', reported_date: '2026-09-18', due_date: '2026-09-25', description: 'New disinfectant product missing Safety Data Sheet in vehicle binders.', corrective_action: undefined },
  { id: '3', title: 'Slip hazard - wet floor sign not used', category: 'safety', severity: 'medium', status: 'in-progress', reported_by: 'Supervisor', reported_date: '2026-09-17', due_date: '2026-09-24', description: 'Wet floor sign not deployed at TechStart office after mopping.', corrective_action: 'Retrained team on wet floor protocols.' },
  { id: '4', title: 'Ladder inspection overdue', category: 'safety', severity: 'high', status: 'open', reported_by: 'Admin', reported_date: '2026-09-10', due_date: '2026-09-12', description: 'Annual ladder inspection expired on Sept 12.', corrective_action: undefined },
  { id: '5', title: 'New hire safety training incomplete', category: 'training', severity: 'low', status: 'open', reported_by: 'HR', reported_date: '2026-09-18', due_date: '2026-09-30', description: 'Lisa K. has not completed mandatory safety onboarding.', corrective_action: undefined },
]

const mockTraining: TrainingRecord[] = [
  { id: '1', employee: 'Maria G.', training_type: 'Chemical Handling', completed_date: '2026-03-15', expiry_date: '2027-03-15', status: 'current' },
  { id: '2', employee: 'Team Alpha', training_type: 'Ladder Safety', completed_date: '2026-01-10', expiry_date: '2027-01-10', status: 'current' },
  { id: '3', employee: 'John D.', training_type: 'PPE Usage', completed_date: '2025-09-20', expiry_date: '2026-09-20', status: 'expiring' },
  { id: '4', employee: 'Lisa K.', training_type: 'Safety Onboarding', completed_date: '', expiry_date: '', status: 'expired' },
  { id: '5', employee: 'Ahmed S.', training_type: 'First Aid', completed_date: '2026-06-01', expiry_date: '2027-06-01', status: 'current' },
]

const mockChemicalLogs: ChemicalLog[] = [
  { id: '1', chemical: 'All-Purpose Cleaner (gal)', used_by: 'Maria G.', used_date: '2026-09-18', quantity: '0.5 gal', location: 'Sarah Johnson - 123 Oak St', sds_available: true, ppe_used: ['gloves'] },
  { id: '2', chemical: 'Glass Cleaner (gal)', used_by: 'Team Alpha', used_date: '2026-09-18', quantity: '0.25 gal', location: 'TechStart - 456 Innovation Blvd', sds_available: true, ppe_used: ['gloves'] },
  { id: '3', chemical: 'Disinfectant Wipes', used_by: 'Maria G.', used_date: '2026-09-18', quantity: '1 pack', location: 'Sarah Johnson - 123 Oak St', sds_available: true, ppe_used: ['gloves', 'mask'] },
]

const statusConfig = {
  open: { label: 'Open', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30' },
  'in-progress': { label: 'In Progress', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/30' },
  resolved: { label: 'Resolved', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/30' },
  closed: { label: 'Closed', color: 'text-[#71717a]', bg: 'bg-[#18181b] border-[#27272a]' },
}

const severityConfig = {
  low: { label: 'Low', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  medium: { label: 'Medium', color: 'text-yellow-400', bg: 'bg-yellow-500/10' },
  high: { label: 'High', color: 'text-orange-400', bg: 'bg-orange-500/10' },
  critical: { label: 'Critical', color: 'text-red-400', bg: 'bg-red-500/10' },
}

export default function CompliancePage() {
  const [complianceItems, setComplianceItems] = useState<ComplianceItem[]>(mockComplianceItems)
  const [activeTab, setActiveTab] = useState<'incidents' | 'training' | 'chemicals'>('incidents')
  const [showReportModal, setShowReportModal] = useState(false)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<string | null>(null)

  const filteredItems = complianceItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || item.description.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = !filterStatus || item.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const openCount = complianceItems.filter(i => i.status === 'open').length
  const inProgressCount = complianceItems.filter(i => i.status === 'in-progress').length
  const expiringTraining = mockTraining.filter(t => t.status === 'expiring').length
  const expiredTraining = mockTraining.filter(t => t.status === 'expired').length

  const handleStatusChange = (id: string, status: ComplianceItem['status']) => {
    setComplianceItems(prev => prev.map(item => {
      if (item.id !== id) return item
      const updated = { ...item, status }
      if (status === 'resolved') {
        updated.resolved_date = new Date().toISOString().split('T')[0]
      }
      return updated
    }))
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Compliance & Safety</h1>
          <p className="text-sm text-[#a1a1aa] mt-1">{openCount} open issues · {expiredTraining + expiringTraining} training alerts</p>
        </div>
        <button
          onClick={() => setShowReportModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
        >
          <Plus size={16} />
          Report Issue
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('incidents')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${activeTab === 'incidents' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-[#111113] border-[#27272a] text-[#71717a] hover:text-[#fafafa]'}`}
        >
          <AlertTriangle size={16} /> Incidents & Issues ({complianceItems.length})
        </button>
        <button
          onClick={() => setActiveTab('training')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${activeTab === 'training' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-[#111113] border-[#27272a] text-[#71717a] hover:text-[#fafafa]'}`}
        >
          <FileText size={16} /> Training ({mockTraining.length})
        </button>
        <button
          onClick={() => setActiveTab('chemicals')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${activeTab === 'chemicals' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-[#111113] border-[#27272a] text-[#71717a] hover:text-[#fafafa]'}`}
        >
          <ShieldCheck size={16} /> Chemical Logs ({mockChemicalLogs.length})
        </button>
      </div>

      {/* Incidents Tab */}
      {activeTab === 'incidents' && (
        <div>
          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
              <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Open Issues</p>
              <p className={`text-2xl font-semibold ${openCount > 0 ? 'text-red-400' : ''}`}>{openCount}</p>
            </div>
            <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
              <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">In Progress</p>
              <p className="text-2xl font-semibold text-yellow-400">{inProgressCount}</p>
            </div>
            <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
              <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Training Expiring</p>
              <p className={`text-2xl font-semibold ${expiringTraining > 0 ? 'text-yellow-400' : ''}`}>{expiringTraining}</p>
            </div>
            <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
              <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Training Expired</p>
              <p className={`text-2xl font-semibold ${expiredTraining > 0 ? 'text-red-400' : ''}`}>{expiredTraining}</p>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="flex gap-3 mb-6">
            <div className="flex-1 relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717a]" />
              <input
                type="text"
                placeholder="Search issues..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#111113] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            <select
              value={filterStatus || ''}
              onChange={e => setFilterStatus(e.target.value || null)}
              className="px-3 py-2 bg-[#111113] border border-[#27272a] rounded-lg text-xs focus:outline-none focus:border-blue-500 capitalize"
            >
              <option value="">All Status</option>
              <option value="open">Open</option>
              <option value="in-progress">In Progress</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          {/* Issues List */}
          <div className="space-y-3">
            {filteredItems.length === 0 ? (
              <div className="text-center py-12 text-[#71717a]">
                <ShieldCheck size={32} className="mx-auto mb-3 opacity-50" />
                <p className="text-sm">No issues found.</p>
              </div>
            ) : (
              filteredItems.map(item => {
                const status = statusConfig[item.status]
                const severity = severityConfig[item.severity]
                return (
                  <div key={item.id} className={`bg-[#111113] border rounded-lg p-5 transition-all ${item.status === 'open' ? 'border-red-500/20' : 'border-[#27272a]'}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-sm">{item.title}</h3>
                          <span className={`px-1.5 py-0.5 text-[10px] font-medium rounded capitalize ${severity.bg} ${severity.color}`}>
                            {severity.label}
                          </span>
                        </div>
                        <p className="text-xs text-[#71717a]">Reported by {item.reported_by} · {new Date(item.reported_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 text-[10px] font-medium rounded border capitalize ${status.bg} ${status.color}`}>
                          {status.label}
                        </span>
                      </div>
                    </div>

                    <p className="text-sm text-[#a1a1aa] mb-3">{item.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-xs text-[#71717a]">
                        <span>Due: {new Date(item.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                        {item.resolved_date && <span>Resolved: {new Date(item.resolved_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>}
                      </div>
                      {item.status !== 'resolved' && item.status !== 'closed' && (
                        <div className="flex gap-2">
                          {item.status === 'open' && (
                            <button
                              onClick={() => handleStatusChange(item.id, 'in-progress')}
                              className="px-2.5 py-1 text-xs font-medium bg-yellow-500/10 text-yellow-400 border border-yellow-500/30 rounded hover:bg-yellow-500/20 transition-colors"
                            >
                              Start
                            </button>
                          )}
                          <button
                            onClick={() => handleStatusChange(item.id, 'resolved')}
                            className="px-2.5 py-1 text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/30 rounded hover:bg-green-500/20 transition-colors"
                          >
                            Resolve
                          </button>
                        </div>
                      )}
                    </div>

                    {item.corrective_action && (
                      <div className="mt-3 p-2 bg-[#0a0a0b] rounded text-xs text-[#71717a]">
                        <strong className="text-[#a1a1aa]">Corrective Action:</strong> {item.corrective_action}
                      </div>
                    )}
                  </div>
                )
              })
            )}
          </div>
        </div>
      )}

      {/* Training Tab */}
      {activeTab === 'training' && (
        <div className="bg-[#111113] border border-[#27272a] rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#27272a] text-left">
                <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Employee</th>
                <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Training</th>
                <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Completed</th>
                <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Expires</th>
                <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockTraining.map(record => (
                <tr key={record.id} className="border-b border-[#1e1e22] last:border-b-0">
                  <td className="px-4 py-3 font-medium">{record.employee}</td>
                  <td className="px-4 py-3 text-[#a1a1aa]">{record.training_type}</td>
                  <td className="px-4 py-3 text-[#a1a1aa]">{record.completed_date ? new Date(record.completed_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'}</td>
                  <td className="px-4 py-3 text-[#a1a1aa]">{record.expiry_date ? new Date(record.expiry_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : '—'}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 text-[10px] font-medium rounded ${
                      record.status === 'current' ? 'bg-green-500/10 text-green-400' :
                      record.status === 'expiring' ? 'bg-yellow-500/10 text-yellow-400' :
                      'bg-red-500/10 text-red-400'
                    }`}>
                      {record.status === 'current' ? 'Current' : record.status === 'expiring' ? 'Expiring Soon' : 'Expired'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Chemical Logs Tab */}
      {activeTab === 'chemicals' && (
        <div className="bg-[#111113] border border-[#27272a] rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#27272a] text-left">
                <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Chemical</th>
                <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Used By</th>
                <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Quantity</th>
                <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">SDS</th>
                <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">PPE Used</th>
              </tr>
            </thead>
            <tbody>
              {mockChemicalLogs.map(log => (
                <tr key={log.id} className="border-b border-[#1e1e22] last:border-b-0">
                  <td className="px-4 py-3 font-medium">{log.chemical}</td>
                  <td className="px-4 py-3 text-[#a1a1aa]">{log.used_by}</td>
                  <td className="px-4 py-3 text-[#a1a1aa]">{new Date(log.used_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                  <td className="px-4 py-3 text-[#a1a1aa]">{log.quantity}</td>
                  <td className="px-4 py-3 text-[#a1a1aa] max-w-[200px] truncate">{log.location}</td>
                  <td className="px-4 py-3">
                    {log.sds_available ? (
                      <span className="text-green-400 flex items-center gap-1"><Check size={14} /> Yes</span>
                    ) : (
                      <span className="text-red-400 flex items-center gap-1"><X size={14} /> No</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      {log.ppe_used.map(ppe => (
                        <span key={ppe} className="px-1.5 py-0.5 text-[10px] bg-[#0a0a0b] border border-[#27272a] rounded capitalize">{ppe}</span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowReportModal(false)}>
          <div className="bg-[#111113] border border-[#27272a] rounded-xl w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Report Safety/Compliance Issue</h2>
              <button onClick={() => setShowReportModal(false)} className="p-1 hover:bg-[#18181b] rounded transition-colors">
                <X size={18} className="text-[#71717a]" />
              </button>
            </div>

            <form className="space-y-4" onSubmit={e => { e.preventDefault(); setShowReportModal(false) }}>
              <div>
                <label className="block text-xs text-[#71717a] font-medium mb-1.5">Issue Title</label>
                <input type="text" placeholder="Brief description of the issue" className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500" required />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-[#71717a] font-medium mb-1.5">Category</label>
                  <select className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500">
                    <option>Chemical</option>
                    <option>Safety</option>
                    <option>Training</option>
                    <option>Incident</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-[#71717a] font-medium mb-1.5">Severity</label>
                  <select className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500">
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                    <option>Critical</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs text-[#71717a] font-medium mb-1.5">Description</label>
                <textarea rows={3} placeholder="Detailed description of what happened..." className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500 resize-none" required />
              </div>
              <div className="flex justify-end gap-3">
                <button type="button" onClick={() => setShowReportModal(false)} className="px-4 py-2 text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors">Submit Report</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
