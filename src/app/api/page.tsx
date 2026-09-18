'use client'

import { useState } from 'react'
import { Code, Copy, Key, Globe, Zap, Clock, Check, X, Plus, Trash2, RefreshCw, ExternalLink } from 'lucide-react'

interface ApiKey {
  id: string
  name: string
  key: string
  created_at: string
  last_used: string | null
  permissions: string[]
}

interface Webhook {
  id: string
  url: string
  events: string[]
  active: boolean
  created_at: string
}

const mockApiKeys: ApiKey[] = [
  { id: '1', name: 'Production API', key: 'cf_live_8f3a2b1c9d4e5f6a7b8c9d0e', created_at: '2026-08-15T10:00:00Z', last_used: '2026-09-18T14:32:00Z', permissions: ['read:customers', 'write:customers', 'read:jobs', 'write:jobs', 'read:invoices', 'write:invoices'] },
  { id: '2', name: 'Zapier Integration', key: 'cf_live_1a2b3c4d5e6f7a8b9c0d1e2f', created_at: '2026-09-01T08:00:00Z', last_used: '2026-09-17T09:15:00Z', permissions: ['read:customers', 'read:jobs'] },
  { id: '3', name: 'Mobile App', key: 'cf_live_xyz789abc123def456', created_at: '2026-09-10T12:00:00Z', last_used: null, permissions: ['read:profile', 'read:jobs', 'write:checkins'] },
]

const mockWebhooks: Webhook[] = [
  { id: '1', url: 'https://hooks.zapier.com/hooks/catch/123456/abc123/', events: ['job.created', 'job.completed'], active: true, created_at: '2026-09-05T10:00:00Z' },
  { id: '2', url: 'https://your-app.com/webhooks/cleanflow', events: ['invoice.paid', 'customer.created'], active: true, created_at: '2026-09-12T14:00:00Z' },
  { id: '3', url: 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXX', events: ['job.cancelled'], active: false, created_at: '2026-08-20T09:00:00Z' },
]

const eventTypes = [
  { id: 'job.created', label: 'Job Created' },
  { id: 'job.updated', label: 'Job Updated' },
  { id: 'job.completed', label: 'Job Completed' },
  { id: 'job.cancelled', label: 'Job Cancelled' },
  { id: 'customer.created', label: 'Customer Created' },
  { id: 'customer.updated', label: 'Customer Updated' },
  { id: 'invoice.created', label: 'Invoice Created' },
  { id: 'invoice.sent', label: 'Invoice Sent' },
  { id: 'invoice.paid', label: 'Invoice Paid' },
  { id: 'invoice.overdue', label: 'Invoice Overdue' },
  { id: 'checklist.completed', label: 'Checklist Completed' },
  { id: 'review.received', label: 'Review Received' },
]

const apiEndpoints = [
  { method: 'GET', path: '/api/v1/customers', description: 'List all customers' },
  { method: 'POST', path: '/api/v1/customers', description: 'Create a new customer' },
  { method: 'GET', path: '/api/v1/customers/:id', description: 'Get customer details' },
  { method: 'GET', path: '/api/v1/jobs', description: 'List all jobs' },
  { method: 'POST', path: '/api/v1/jobs', description: 'Create a new job' },
  { method: 'PATCH', path: '/api/v1/jobs/:id', description: 'Update job status' },
  { method: 'GET', path: '/api/v1/invoices', description: 'List all invoices' },
  { method: 'POST', path: '/api/v1/invoices', description: 'Create a new invoice' },
  { method: 'GET', path: '/api/v1/cleaners', description: 'List all cleaners' },
  { method: 'GET', path: '/api/v1/checklists', description: 'List all checklists' },
]

const methodColors: Record<string, string> = {
  GET: 'bg-green-500/10 text-green-400',
  POST: 'bg-blue-500/10 text-blue-400',
  PATCH: 'bg-yellow-500/10 text-yellow-400',
  DELETE: 'bg-red-500/10 text-red-400',
}

export default function ApiPage() {
  const [activeTab, setActiveTab] = useState<'keys' | 'webhooks' | 'docs'>('keys')
  const [apiKeys, setApiKeys] = useState<ApiKey[]>(mockApiKeys)
  const [webhooks, setWebhooks] = useState<Webhook[]>(mockWebhooks)
  const [showCreateKey, setShowCreateKey] = useState(false)
  const [showCreateWebhook, setShowCreateWebhook] = useState(false)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(text)
    setTimeout(() => setCopiedKey(null), 2000)
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">API & Webhooks</h1>
          <p className="text-sm text-[#a1a1aa] mt-1">Integrate CleanFlow with your apps and workflows</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#111113] border border-[#27272a] hover:border-[#3f3f46] text-sm font-medium rounded-lg transition-colors">
          <ExternalLink size={16} />
          Full Documentation
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('keys')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${activeTab === 'keys' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-[#111113] border-[#27272a] text-[#71717a] hover:text-[#fafafa]'}`}
        >
          <Key size={16} /> API Keys ({apiKeys.length})
        </button>
        <button
          onClick={() => setActiveTab('webhooks')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${activeTab === 'webhooks' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-[#111113] border-[#27272a] text-[#71717a] hover:text-[#fafafa]'}`}
        >
          <Zap size={16} /> Webhooks ({webhooks.length})
        </button>
        <button
          onClick={() => setActiveTab('docs')}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${activeTab === 'docs' ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-[#111113] border-[#27272a] text-[#71717a] hover:text-[#fafafa]'}`}
        >
          <Code size={16} /> API Reference
        </button>
      </div>

      {/* API Keys Tab */}
      {activeTab === 'keys' && (
        <div>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowCreateKey(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Plus size={16} /> New API Key
            </button>
          </div>
          <div className="space-y-3">
            {apiKeys.map(apiKey => (
              <div key={apiKey.id} className="bg-[#111113] border border-[#27272a] rounded-lg p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-sm">{apiKey.name}</h3>
                    <p className="text-xs text-[#71717a]">Created {new Date(apiKey.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {apiKey.last_used && (
                      <span className="flex items-center gap-1 text-xs text-[#71717a]">
                        <Clock size={11} />
                        Last used {new Date(apiKey.last_used).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    )}
                    <button className="p-1.5 hover:bg-red-500/10 rounded transition-colors" title="Delete key">
                      <Trash2 size={14} className="text-red-400" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <code className="flex-1 px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-xs font-mono text-[#a1a1aa] truncate">
                    {apiKey.key}
                  </code>
                  <button
                    onClick={() => copyToClipboard(apiKey.key)}
                    className={`px-3 py-2 border rounded-lg text-xs font-medium transition-colors ${copiedKey === apiKey.key ? 'bg-green-500/10 border-green-500/30 text-green-400' : 'bg-[#18181b] border-[#27272a] text-[#71717a] hover:text-[#fafafa]'}`}
                  >
                    {copiedKey === apiKey.key ? <Check size={14} /> : <Copy size={14} />}
                  </button>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {apiKey.permissions.map(perm => (
                    <span key={perm} className="px-2 py-0.5 text-[10px] font-mono bg-[#0a0a0b] border border-[#27272a] rounded text-[#71717a]">
                      {perm}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Webhooks Tab */}
      {activeTab === 'webhooks' && (
        <div>
          <div className="flex justify-end mb-4">
            <button
              onClick={() => setShowCreateWebhook(true)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Plus size={16} /> New Webhook
            </button>
          </div>
          <div className="space-y-3">
            {webhooks.map(webhook => (
              <div key={webhook.id} className={`bg-[#111113] border rounded-lg p-5 transition-all ${webhook.active ? 'border-[#27272a]' : 'border-[#27272a] opacity-60'}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Globe size={14} className="text-[#71717a]" />
                      <code className="text-sm font-mono text-[#a1a1aa] truncate">{webhook.url}</code>
                    </div>
                    <p className="text-xs text-[#71717a]">Created {new Date(webhook.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setWebhooks(prev => prev.map(w => w.id === webhook.id ? { ...w, active: !w.active } : w))}
                      className={`relative w-10 h-5 rounded-full transition-colors ${webhook.active ? 'bg-blue-500' : 'bg-[#27272a]'}`}
                    >
                      <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full transition-transform ${webhook.active ? 'left-5.5' : 'left-0.5'}`} />
                    </button>
                    <button className="p-1.5 hover:bg-[#18181b] rounded transition-colors">
                      <RefreshCw size={14} className="text-[#71717a]" />
                    </button>
                    <button className="p-1.5 hover:bg-red-500/10 rounded transition-colors">
                      <Trash2 size={14} className="text-red-400" />
                    </button>
                  </div>
                </div>
                <div className="flex gap-1.5 flex-wrap">
                  {webhook.events.map(event => (
                    <span key={event} className="px-2 py-0.5 text-[10px] font-medium bg-[#0a0a0b] border border-[#27272a] rounded text-[#71717a]">
                      {event}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Docs Tab */}
      {activeTab === 'docs' && (
        <div>
          <div className="bg-[#111113] border border-[#27272a] rounded-lg p-6 mb-6">
            <h3 className="font-semibold mb-2">Base URL</h3>
            <code className="text-sm text-[#a1a1aa] bg-[#0a0a0b] px-4 py-2 rounded-lg font-mono">https://api.cleanflow.io/v1</code>
            <p className="text-xs text-[#71717a] mt-3">All requests require an API key passed in the Authorization header:</p>
            <code className="block text-xs text-[#a1a1aa] bg-[#0a0a0b] px-4 py-2 rounded-lg font-mono mt-2">
              Authorization: Bearer cf_live_your_api_key_here
            </code>
          </div>

          <div className="bg-[#111113] border border-[#27272a] rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#27272a] text-left">
                  <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Method</th>
                  <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Endpoint</th>
                  <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Description</th>
                </tr>
              </thead>
              <tbody>
                {apiEndpoints.map((endpoint, i) => (
                  <tr key={i} className="border-b border-[#1e1e22] last:border-b-0">
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 text-[10px] font-bold rounded ${methodColors[endpoint.method]}`}>
                        {endpoint.method}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-[#a1a1aa]">{endpoint.path}</td>
                    <td className="px-4 py-3 text-[#71717a]">{endpoint.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create API Key Modal */}
      {showCreateKey && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowCreateKey(false)}>
          <div className="bg-[#111113] border border-[#27272a] rounded-xl w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">New API Key</h2>
              <button onClick={() => setShowCreateKey(false)} className="p-1 hover:bg-[#18181b] rounded transition-colors">
                <X size={18} className="text-[#71717a]" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-[#71717a] font-medium mb-1.5">Key Name</label>
                <input type="text" placeholder="e.g., Production App" className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-xs text-[#71717a] font-medium mb-1.5">Permissions</label>
                <div className="space-y-2">
                  {['read:customers', 'write:customers', 'read:jobs', 'write:jobs', 'read:invoices', 'write:invoices'].map(perm => (
                    <label key={perm} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" defaultChecked={perm.startsWith('read')} className="w-4 h-4 rounded border-[#3f3f46] bg-[#0a0a0b] text-blue-500" />
                      <span className="font-mono text-xs">{perm}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowCreateKey(false)} className="px-4 py-2 text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors">Cancel</button>
              <button onClick={() => setShowCreateKey(false)} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors">Generate Key</button>
            </div>
          </div>
        </div>
      )}

      {/* Create Webhook Modal */}
      {showCreateWebhook && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowCreateWebhook(false)}>
          <div className="bg-[#111113] border border-[#27272a] rounded-xl w-full max-w-lg p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">New Webhook</h2>
              <button onClick={() => setShowCreateWebhook(false)} className="p-1 hover:bg-[#18181b] rounded transition-colors">
                <X size={18} className="text-[#71717a]" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-[#71717a] font-medium mb-1.5">Endpoint URL</label>
                <input type="url" placeholder="https://your-app.com/webhook" className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500" />
              </div>
              <div>
                <label className="block text-xs text-[#71717a] font-medium mb-1.5">Events</label>
                <div className="grid grid-cols-2 gap-2">
                  {eventTypes.map(event => (
                    <label key={event.id} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" className="w-4 h-4 rounded border-[#3f3f46] bg-[#0a0a0b] text-blue-500" />
                      <span>{event.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button onClick={() => setShowCreateWebhook(false)} className="px-4 py-2 text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors">Cancel</button>
              <button onClick={() => setShowCreateWebhook(false)} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors">Create Webhook</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
