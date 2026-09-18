'use client'

import { useState, useEffect, useRef, useMemo } from 'react'
import { Search, Users, Calendar, CreditCard, ClipboardCheck, Package, Command } from 'lucide-react'

interface CommandItem {
  id: string
  label: string
  description?: string
  icon: React.ElementType
  action?: () => void
  section: string
}

interface CommandPaletteProps {
  open: boolean
  onClose: () => void
}

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)

  // Mock data for search
  const items: CommandItem[] = useMemo(() => [
    { id: '1', label: 'Sarah Johnson', description: 'Customer · sarah@example.com', icon: Users, section: 'Customers' },
    { id: '2', label: 'TechStart Inc.', description: 'Commercial · office@techstart.io', icon: Users, section: 'Customers' },
    { id: '3', label: 'Michael Chen', description: 'Residential · mchen@email.com', icon: Users, section: 'Customers' },
    { id: '4', label: 'Deep Clean - Sarah Johnson', description: 'Today at 9:00 AM', icon: Calendar, section: 'Jobs' },
    { id: '5', label: 'Office Clean - TechStart', description: 'Today at 2:00 PM', icon: Calendar, section: 'Jobs' },
    { id: '6', label: 'INV-001', description: '$250 · Paid', icon: CreditCard, section: 'Invoices' },
    { id: '7', label: 'INV-003', description: '$120 · Overdue', icon: CreditCard, section: 'Invoices' },
    { id: '8', label: 'Deep Clean QA Checklist', description: '12 tasks, 8 done', icon: ClipboardCheck, section: 'Checklists' },
    { id: '9', label: 'All-Purpose Cleaner', description: '24 gal in stock', icon: Package, section: 'Inventory' },
  ], [])

  const filtered = useMemo(() => {
    if (!query) return items
    const q = query.toLowerCase()
    return items.filter(i => i.label.toLowerCase().includes(q) || i.description?.toLowerCase().includes(q))
  }, [query, items])

  const grouped = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {}
    filtered.forEach(item => {
      if (!groups[item.section]) groups[item.section] = []
      groups[item.section].push(item)
    })
    return groups
  }, [filtered])

  useEffect(() => {
    if (open) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  useEffect(() => {
    // Listen for custom event from sidebar search button
    const handler = () => {
      // The parent component manages open state
      const event = new CustomEvent('openCommandPalette')
      document.dispatchEvent(event)
    }
    
    const keyHandler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        if (open) {
          onClose()
        } else {
          handler()
        }
      }
    }
    
    window.addEventListener('keydown', keyHandler)
    return () => window.removeEventListener('keydown', keyHandler)
  }, [open, onClose])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => Math.min(prev + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => Math.max(prev - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      const item = filtered[selectedIndex]
      if (item?.action) item.action()
      onClose()
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]" onClick={onClose}>
      <div className="fixed inset-0 bg-black/60 overlay-enter" />
      <div
        className="relative w-full max-w-lg bg-[#111113] border border-[#27272a] rounded-xl shadow-2xl overflow-hidden modal-enter"
        onClick={e => e.stopPropagation()}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-[#27272a]">
          <Search size={18} className="text-[#71717a] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => { setQuery(e.target.value); setSelectedIndex(0) }}
            onKeyDown={handleKeyDown}
            placeholder="Search customers, jobs, invoices..."
            className="flex-1 bg-transparent text-sm focus:outline-none placeholder:text-[#71717a]"
          />
          <kbd className="px-2 py-1 text-[10px] font-medium text-[#71717a] bg-[#18181b] border border-[#27272a] rounded">Esc</kbd>
        </div>

        {/* Results */}
        <div className="max-h-80 overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-[#71717a]">
              No results found.
            </div>
          ) : (
            <div className="space-y-1">
              {Object.entries(grouped).map(([section, items]) => (
                <div key={section}>
                  <p className="px-4 py-2 text-[10px] uppercase tracking-wider text-[#71717a] font-semibold">
                    {section}
                  </p>
                  {items.map((item, idx) => {
                    const globalIndex = filtered.indexOf(item)
                    return (
                      <button
                        key={item.id}
                        onClick={() => { item.action?.(); onClose() }}
                        onMouseEnter={() => setSelectedIndex(globalIndex)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                          selectedIndex === globalIndex ? 'bg-[#1e3a5f] text-blue-400' : 'text-[#a1a1aa] hover:bg-[#18181b]'
                        }`}
                      >
                        <item.icon size={16} className="flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{item.label}</p>
                          {item.description && (
                            <p className="text-xs text-[#71717a] truncate">{item.description}</p>
                          )}
                        </div>
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-[#27272a] flex items-center justify-between text-[10px] text-[#71717a]">
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-[#18181b] border border-[#27272a] rounded">↑↓</kbd>
            to navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-[#18181b] border border-[#27272a] rounded">↵</kbd>
            to select
          </span>
          <span className="flex items-center gap-1">
            <Command size={10} />
            K to toggle
          </span>
        </div>
      </div>
    </div>
  )
}
