'use client'

import { useState } from 'react'
import { User, Calendar, CreditCard, FileText, Settings, LogOut, Bell, MapPin, Phone, Mail, Clock, Check, X, ChevronRight, Plus, Download, Eye } from 'lucide-react'

interface PortalCustomer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  member_since: string
}

interface PortalJob {
  id: string
  service_type: string
  date: string
  time: string
  cleaner: string
  status: 'upcoming' | 'completed' | 'cancelled'
  total: number
}

interface PortalInvoice {
  id: string
  date: string
  amount: number
  status: 'paid' | 'pending' | 'overdue'
  service: string
}

const mockCustomer: PortalCustomer = {
  id: '1',
  name: 'Sarah Johnson',
  email: 'sarah@example.com',
  phone: '+1 555-0123',
  address: '123 Oak Street, Springfield, IL 62701',
  member_since: 'June 2026',
}

const mockJobs: PortalJob[] = [
  { id: '1', service_type: 'Deep Clean', date: '2026-09-25', time: '09:00', cleaner: 'Maria G.', status: 'upcoming', total: 250 },
  { id: '2', service_type: 'Regular Clean', date: '2026-09-18', time: '09:00', cleaner: 'Maria G.', status: 'completed', total: 120 },
  { id: '3', service_type: 'Regular Clean', date: '2026-09-10', time: '09:00', cleaner: 'Maria G.', status: 'completed', total: 120 },
  { id: '4', service_type: 'Deep Clean', date: '2026-08-27', time: '09:00', cleaner: 'Maria G.', status: 'completed', total: 250 },
]

const mockInvoices: PortalInvoice[] = [
  { id: 'INV-001', date: '2026-09-18', amount: 120, status: 'paid', service: 'Regular Clean' },
  { id: 'INV-002', date: '2026-09-10', amount: 120, status: 'paid', service: 'Regular Clean' },
  { id: 'INV-003', date: '2026-08-27', amount: 250, status: 'paid', service: 'Deep Clean' },
  { id: 'INV-004', date: '2026-09-25', amount: 250, status: 'pending', service: 'Deep Clean' },
]

const tabs = [
  { id: 'overview', label: 'Overview', icon: User },
  { id: 'appointments', label: 'Appointments', icon: Calendar },
  { id: 'invoices', label: 'Invoices', icon: FileText },
  { id: 'payments', label: 'Payment Methods', icon: CreditCard },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function PortalPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showRescheduleModal, setShowRescheduleModal] = useState(false)
  const [rescheduleJob, setRescheduleJob] = useState<PortalJob | null>(null)

  const upcomingJobs = mockJobs.filter(j => j.status === 'upcoming')
  const completedJobs = mockJobs.filter(j => j.status === 'completed')
  const totalSpent = mockInvoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0)

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Customer Portal</h1>
          <p className="text-sm text-[#a1a1aa] mt-1">Self-service area for your customers</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/30 rounded-lg">
            Preview Mode
          </span>
        </div>
      </div>

      {/* Portal Preview */}
      <div className="bg-[#111113] border border-[#27272a] rounded-xl overflow-hidden">
        {/* Portal Header */}
        <div className="bg-[#0a0a0b] border-b border-[#27272a] px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">C</div>
            <span className="font-semibold text-sm">CleanFlow Portal</span>
          </div>
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-[#18181b] rounded-lg transition-colors">
              <Bell size={16} className="text-[#71717a]" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#18181b] rounded-full flex items-center justify-center text-xs font-medium">
                {mockCustomer.name.charAt(0)}
              </div>
              <span className="text-sm font-medium">{mockCustomer.name}</span>
            </div>
          </div>
        </div>

        <div className="flex">
          {/* Sidebar */}
          <div className="w-56 border-r border-[#27272a] p-4">
            <nav className="space-y-1">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${activeTab === tab.id ? 'bg-blue-500/10 text-blue-400' : 'text-[#a1a1aa] hover:text-[#fafafa] hover:bg-[#18181b]'}`}
                >
                  <tab.icon size={16} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1 p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-lg font-semibold mb-6">Welcome back, {mockCustomer.name.split(' ')[0]}!</h2>

                {/* Quick Stats */}
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="bg-[#0a0a0b] border border-[#27272a] rounded-lg p-4">
                    <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Upcoming</p>
                    <p className="text-2xl font-semibold">{upcomingJobs.length}</p>
                  </div>
                  <div className="bg-[#0a0a0b] border border-[#27272a] rounded-lg p-4">
                    <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Completed</p>
                    <p className="text-2xl font-semibold">{completedJobs.length}</p>
                  </div>
                  <div className="bg-[#0a0a0b] border border-[#27272a] rounded-lg p-4">
                    <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Total Spent</p>
                    <p className="text-2xl font-semibold">${totalSpent}</p>
                  </div>
                </div>

                {/* Next Appointment */}
                {upcomingJobs.length > 0 && (
                  <div className="bg-[#0a0a0b] border border-[#27272a] rounded-lg p-5 mb-6">
                    <h3 className="text-sm font-semibold mb-3">Next Appointment</h3>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{upcomingJobs[0].service_type}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-[#71717a]">
                          <span className="flex items-center gap-1"><Calendar size={12} />{new Date(upcomingJobs[0].date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                          <span className="flex items-center gap-1"><Clock size={12} />{upcomingJobs[0].time}</span>
                          <span className="flex items-center gap-1"><User size={12} />{upcomingJobs[0].cleaner}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setRescheduleJob(upcomingJobs[0]); setShowRescheduleModal(true) }}
                          className="px-3 py-1.5 text-xs font-medium bg-[#18181b] border border-[#27272a] hover:border-[#3f3f46] rounded-lg transition-colors"
                        >
                          Reschedule
                        </button>
                        <button className="px-3 py-1.5 text-xs font-medium bg-red-500/10 text-red-400 border border-red-500/30 hover:bg-red-500/20 rounded-lg transition-colors">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Quick Actions */}
                <div>
                  <h3 className="text-sm font-semibold mb-3">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <button className="p-4 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-left hover:border-[#3f3f46] transition-colors">
                      <Calendar size={18} className="text-blue-400 mb-2" />
                      <p className="text-sm font-medium">Book New Service</p>
                      <p className="text-xs text-[#71717a]">Schedule a new cleaning</p>
                    </button>
                    <button className="p-4 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-left hover:border-[#3f3f46] transition-colors">
                      <FileText size={18} className="text-green-400 mb-2" />
                      <p className="text-sm font-medium">View Invoices</p>
                      <p className="text-xs text-[#71717a]">Download past receipts</p>
                    </button>
                    <button className="p-4 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-left hover:border-[#3f3f46] transition-colors">
                      <CreditCard size={18} className="text-purple-400 mb-2" />
                      <p className="text-sm font-medium">Update Payment</p>
                      <p className="text-xs text-[#71717a]">Manage card on file</p>
                    </button>
                    <button className="p-4 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-left hover:border-[#3f3f46] transition-colors">
                      <Settings size={18} className="text-orange-400 mb-2" />
                      <p className="text-sm font-medium">Preferences</p>
                      <p className="text-xs text-[#71717a]">Cleaning preferences and notes</p>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Appointments Tab */}
            {activeTab === 'appointments' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Appointments</h2>
                  <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium rounded-lg transition-colors">
                    <Plus size={14} /> Book New
                  </button>
                </div>

                {/* Upcoming */}
                {upcomingJobs.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-xs uppercase tracking-wider text-[#71717a] font-semibold mb-3">Upcoming</h3>
                    <div className="space-y-2">
                      {upcomingJobs.map(job => (
                        <div key={job.id} className="flex items-center justify-between p-4 bg-[#0a0a0b] border border-[#27272a] rounded-lg">
                          <div>
                            <p className="font-medium text-sm">{job.service_type}</p>
                            <div className="flex items-center gap-3 mt-1 text-xs text-[#71717a]">
                              <span>{new Date(job.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                              <span>{job.time}</span>
                              <span>{job.cleaner}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-medium">${job.total}</span>
                            <button
                              onClick={() => { setRescheduleJob(job); setShowRescheduleModal(true) }}
                              className="px-2.5 py-1 text-xs bg-[#18181b] border border-[#27272a] rounded hover:border-[#3f3f46] transition-colors"
                            >
                              Reschedule
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Past */}
                <div>
                  <h3 className="text-xs uppercase tracking-wider text-[#71717a] font-semibold mb-3">Past</h3>
                  <div className="space-y-2">
                    {completedJobs.map(job => (
                      <div key={job.id} className="flex items-center justify-between p-4 bg-[#0a0a0b] border border-[#27272a] rounded-lg opacity-70">
                        <div>
                          <p className="font-medium text-sm">{job.service_type}</p>
                          <div className="flex items-center gap-3 mt-1 text-xs text-[#71717a]">
                            <span>{new Date(job.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
                            <span>{job.cleaner}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs text-green-400 font-medium">Completed</span>
                          <button className="px-2.5 py-1 text-xs bg-[#18181b] border border-[#27272a] rounded hover:border-[#3f3f46] transition-colors">
                            Rebook
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Invoices Tab */}
            {activeTab === 'invoices' && (
              <div>
                <h2 className="text-lg font-semibold mb-6">Invoices</h2>
                <div className="bg-[#0a0a0b] border border-[#27272a] rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#27272a] text-left">
                        <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Invoice</th>
                        <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Date</th>
                        <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Service</th>
                        <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Amount</th>
                        <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Status</th>
                        <th className="px-4 py-3"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockInvoices.map(invoice => (
                        <tr key={invoice.id} className="border-b border-[#1e1e22] last:border-b-0">
                          <td className="px-4 py-3 font-mono text-xs">{invoice.id}</td>
                          <td className="px-4 py-3 text-[#a1a1aa]">{new Date(invoice.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</td>
                          <td className="px-4 py-3 text-[#a1a1aa]">{invoice.service}</td>
                          <td className="px-4 py-3 font-medium">${invoice.amount}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-0.5 text-[10px] font-medium rounded ${
                              invoice.status === 'paid' ? 'bg-green-500/10 text-green-400' :
                              invoice.status === 'pending' ? 'bg-yellow-500/10 text-yellow-400' :
                              'bg-red-500/10 text-red-400'
                            }`}>
                              {invoice.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button className="p-1.5 hover:bg-[#18181b] rounded transition-colors">
                              <Download size={14} className="text-[#71717a]" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Payment Methods Tab */}
            {activeTab === 'payments' && (
              <div>
                <h2 className="text-lg font-semibold mb-6">Payment Methods</h2>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-4 bg-[#0a0a0b] border border-[#27272a] rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-7 bg-[#18181b] border border-[#27272a] rounded flex items-center justify-center text-xs font-bold text-[#a1a1aa]">VISA</div>
                      <div>
                        <p className="text-sm font-medium">•••• •••• •••• 4242</p>
                        <p className="text-xs text-[#71717a]">Expires 12/27</p>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 text-[10px] font-medium bg-blue-500/10 text-blue-400 rounded">Default</span>
                  </div>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-[#0a0a0b] border border-[#27272a] hover:border-[#3f3f46] text-sm font-medium rounded-lg transition-colors">
                  <Plus size={16} />
                  Add Payment Method
                </button>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div>
                <h2 className="text-lg font-semibold mb-6">Account Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold mb-3">Contact Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs text-[#71717a] font-medium mb-1">Name</label>
                        <input type="text" defaultValue={mockCustomer.name} className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500" />
                      </div>
                      <div>
                        <label className="block text-xs text-[#71717a] font-medium mb-1">Email</label>
                        <input type="email" defaultValue={mockCustomer.email} className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500" />
                      </div>
                      <div>
                        <label className="block text-xs text-[#71717a] font-medium mb-1">Phone</label>
                        <input type="tel" defaultValue={mockCustomer.phone} className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500" />
                      </div>
                      <div>
                        <label className="block text-xs text-[#71717a] font-medium mb-1">Service Address</label>
                        <input type="text" defaultValue={mockCustomer.address} className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold mb-3">Cleaning Preferences</h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-[#3f3f46] bg-[#0a0a0b] text-blue-500" />
                        Use eco-friendly products only
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="w-4 h-4 rounded border-[#3f3f46] bg-[#0a0a0b] text-blue-500" />
                        I have pets (keep doors closed)
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-[#3f3f46] bg-[#0a0a0b] text-blue-500" />
                        Ring doorbell before entering
                      </label>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-semibold mb-3">Notification Preferences</h3>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-[#3f3f46] bg-[#0a0a0b] text-blue-500" />
                        Email confirmations
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-[#3f3f46] bg-[#0a0a0b] text-blue-500" />
                        SMS reminders
                      </label>
                      <label className="flex items-center gap-2 text-sm">
                        <input type="checkbox" className="w-4 h-4 rounded border-[#3f3f46] bg-[#0a0a0b] text-blue-500" />
                        Review requests after service
                      </label>
                    </div>
                  </div>

                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors">
                    Save Changes
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Reschedule Modal */}
      {showRescheduleModal && rescheduleJob && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowRescheduleModal(false)}>
          <div className="bg-[#111113] border border-[#27272a] rounded-xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Reschedule Appointment</h2>
              <button onClick={() => setShowRescheduleModal(false)} className="p-1 hover:bg-[#18181b] rounded transition-colors">
                <X size={18} className="text-[#71717a]" />
              </button>
            </div>

            <div className="mb-4 p-3 bg-[#0a0a0b] rounded-lg">
              <p className="text-sm font-medium">{rescheduleJob.service_type}</p>
              <p className="text-xs text-[#71717a]">Currently: {new Date(rescheduleJob.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at {rescheduleJob.time}</p>
            </div>

            <div className="space-y-3 mb-6">
              <div>
                <label className="block text-xs text-[#71717a] font-medium mb-1">New Date</label>
                <input type="date" className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-xs text-[#71717a] font-medium mb-1">New Time</label>
                <select className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500">
                  <option>8:00 AM</option>
                  <option>9:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>1:00 PM</option>
                  <option>2:00 PM</option>
                  <option>3:00 PM</option>
                  <option>4:00 PM</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={() => setShowRescheduleModal(false)} className="px-4 py-2 text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors">
                Cancel
              </button>
              <button onClick={() => setShowRescheduleModal(false)} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors">
                Confirm Reschedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
