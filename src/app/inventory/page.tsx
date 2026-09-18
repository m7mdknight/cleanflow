'use client'

import { useState } from 'react'
import { Package, AlertTriangle, Plus, Search, Filter, Truck, Warehouse, Wrench, ShoppingCart, X } from 'lucide-react'

interface InventoryItem {
  id: string
  name: string
  category: 'cleaning-supply' | 'equipment' | 'ppe' | 'consumable'
  sku: string
  quantity: number
  min_stock: number
  unit: string
  location: 'warehouse' | string // vehicle id or warehouse
  location_name: string
  cost_per_unit: number
  supplier: string
  last_restocked: string
  status: 'in-stock' | 'low-stock' | 'out-of-stock'
}

const mockInventory: InventoryItem[] = [
  { id: '1', name: 'All-Purpose Cleaner (gal)', category: 'cleaning-supply', sku: 'CLN-001', quantity: 24, min_stock: 10, unit: 'gal', location: 'warehouse', location_name: 'Main Warehouse', cost_per_unit: 8.50, supplier: 'CleanSupply Co.', last_restocked: '2026-09-10', status: 'in-stock' },
  { id: '2', name: 'Glass Cleaner (gal)', category: 'cleaning-supply', sku: 'CLN-002', quantity: 18, min_stock: 8, unit: 'gal', location: 'warehouse', location_name: 'Main Warehouse', cost_per_unit: 7.25, supplier: 'CleanSupply Co.', last_restocked: '2026-09-08', status: 'in-stock' },
  { id: '3', name: 'Microfiber Cloths (50-pack)', category: 'consumable', sku: 'CNB-001', quantity: 3, min_stock: 5, unit: 'packs', location: 'warehouse', location_name: 'Main Warehouse', cost_per_unit: 22.00, supplier: 'ProClean Tools', last_restocked: '2026-08-15', status: 'low-stock' },
  { id: '4', name: 'HEPA Vacuum Filters', category: 'equipment', sku: 'EQP-001', quantity: 8, min_stock: 4, unit: 'units', location: 'v2', location_name: 'Van #2 - Mercedes Sprinter', cost_per_unit: 34.99, supplier: 'FilterPro Inc.', last_restocked: '2026-09-01', status: 'in-stock' },
  { id: '5', name: 'Nitrile Gloves (box of 100)', category: 'ppe', sku: 'PPE-001', quantity: 2, min_stock: 10, unit: 'boxes', location: 'warehouse', location_name: 'Main Warehouse', cost_per_unit: 12.50, supplier: 'SafetyFirst Ltd.', last_restocked: '2026-08-20', status: 'low-stock' },
  { id: '6', name: 'Floor Wax (gal)', category: 'cleaning-supply', sku: 'CLN-003', quantity: 0, min_stock: 4, unit: 'gal', location: 'warehouse', location_name: 'Main Warehouse', cost_per_unit: 18.75, supplier: 'CleanSupply Co.', last_restocked: '2026-07-15', status: 'out-of-stock' },
  { id: '7', name: 'Spray Bottles (16oz)', category: 'equipment', sku: 'EQP-002', quantity: 15, min_stock: 6, unit: 'units', location: 'v1', location_name: 'Van #1 - Ford Transit', cost_per_unit: 3.99, supplier: 'ProClean Tools', last_restocked: '2026-09-05', status: 'in-stock' },
  { id: '8', name: 'Trash Bags (50-count)', category: 'consumable', sku: 'CNB-002', quantity: 6, min_stock: 8, unit: 'rolls', location: 'warehouse', location_name: 'Main Warehouse', cost_per_unit: 15.00, supplier: 'CleanSupply Co.', last_restocked: '2026-09-12', status: 'low-stock' },
  { id: '9', name: 'Disinfectant Wipes (5-pack)', category: 'cleaning-supply', sku: 'CLN-004', quantity: 1, min_stock: 5, unit: 'packs', location: 'v3', location_name: 'Van #3 - Ram ProMaster', cost_per_unit: 28.00, supplier: 'CleanSupply Co.', last_restocked: '2026-08-28', status: 'low-stock' },
  { id: '10', name: 'Knee Pads', category: 'ppe', sku: 'PPE-002', quantity: 0, min_stock: 3, unit: 'pairs', location: 'warehouse', location_name: 'Main Warehouse', cost_per_unit: 14.50, supplier: 'SafetyFirst Ltd.', last_restocked: '2026-07-20', status: 'out-of-stock' },
]

const statusConfig = {
  'in-stock': { label: 'In Stock', color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/30' },
  'low-stock': { label: 'Low Stock', color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/30' },
  'out-of-stock': { label: 'Out of Stock', color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/30' },
}

const categoryIcons: Record<string, typeof Package> = {
  'cleaning-supply': Package,
  equipment: Wrench,
  ppe: Package,
  consumable: ShoppingCart,
}

export default function InventoryPage() {
  const [items, setItems] = useState<InventoryItem[]>(mockInventory)
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<string | null>(null)
  const [filterCategory, setFilterCategory] = useState<string | null>(null)
  const [filterLocation, setFilterLocation] = useState<string | null>(null)
  const [showRestockModal, setShowRestockModal] = useState(false)
  const [restockItem, setRestockItem] = useState<InventoryItem | null>(null)
  const [restockQty, setRestockQty] = useState('')

  const locations = Array.from(new Set(items.map(i => i.location_name)))

  const filtered = items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) || item.sku.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = !filterStatus || item.status === filterStatus
    const matchesCategory = !filterCategory || item.category === filterCategory
    const matchesLocation = !filterLocation || item.location_name === filterLocation
    return matchesSearch && matchesStatus && matchesCategory && matchesLocation
  })

  const totalValue = items.reduce((sum, i) => sum + i.quantity * i.cost_per_unit, 0)
  const lowStockCount = items.filter(i => i.status === 'low-stock').length
  const outOfStockCount = items.filter(i => i.status === 'out-of-stock').length

  const handleRestock = () => {
    if (!restockItem || !restockQty) return
    const qty = parseInt(restockQty)
    if (isNaN(qty) || qty <= 0) return

    setItems(prev => prev.map(item => {
      if (item.id !== restockItem.id) return item
      const newQty = item.quantity + qty
      const newStatus = newQty === 0 ? 'out-of-stock' : newQty <= item.min_stock ? 'low-stock' : 'in-stock'
      return { ...item, quantity: newQty, status: newStatus, last_restocked: new Date().toISOString().split('T')[0] }
    }))
    setShowRestockModal(false)
    setRestockItem(null)
    setRestockQty('')
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Inventory</h1>
          <p className="text-sm text-[#a1a1aa] mt-1">{items.length} items · ${totalValue.toFixed(2)} total value</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors">
          <Plus size={16} />
          Add Item
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Total Items</p>
          <p className="text-2xl font-semibold">{items.length}</p>
        </div>
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Total Value</p>
          <p className="text-2xl font-semibold">${totalValue.toFixed(0)}</p>
        </div>
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Low Stock</p>
          <p className={`text-2xl font-semibold ${lowStockCount > 0 ? 'text-yellow-400' : ''}`}>{lowStockCount}</p>
        </div>
        <div className="bg-[#111113] border border-[#27272a] rounded-lg p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#71717a] font-semibold mb-1">Out of Stock</p>
          <p className={`text-2xl font-semibold ${outOfStockCount > 0 ? 'text-red-400' : ''}`}>{outOfStockCount}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717a]" />
          <input
            type="text"
            placeholder="Search by name or SKU..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#111113] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterStatus || ''}
            onChange={e => setFilterStatus(e.target.value || null)}
            className="px-3 py-2 bg-[#111113] border border-[#27272a] rounded-lg text-xs focus:outline-none focus:border-blue-500 capitalize"
          >
            <option value="">All Status</option>
            <option value="in-stock">In Stock</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
          <select
            value={filterCategory || ''}
            onChange={e => setFilterCategory(e.target.value || null)}
            className="px-3 py-2 bg-[#111113] border border-[#27272a] rounded-lg text-xs focus:outline-none focus:border-blue-500 capitalize"
          >
            <option value="">All Categories</option>
            <option value="cleaning-supply">Cleaning Supply</option>
            <option value="equipment">Equipment</option>
            <option value="ppe">PPE</option>
            <option value="consumable">Consumable</option>
          </select>
          <select
            value={filterLocation || ''}
            onChange={e => setFilterLocation(e.target.value || null)}
            className="px-3 py-2 bg-[#111113] border border-[#27272a] rounded-lg text-xs focus:outline-none focus:border-blue-500"
          >
            <option value="">All Locations</option>
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-[#111113] border border-[#27272a] rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-[#27272a] text-left">
              <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Item</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">SKU</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Category</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Stock</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Min</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Location</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Cost</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-xs font-semibold text-[#71717a] uppercase tracking-wider">Last Restocked</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(item => {
              const Icon = categoryIcons[item.category] || Package
              const status = statusConfig[item.status]
              const stockPercentage = item.min_stock > 0 ? Math.min((item.quantity / item.min_stock) * 100, 100) : 100
              return (
                <tr key={item.id} className="border-b border-[#1e1e22] last:border-b-0 hover:bg-[#18181b]/50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-[#18181b] rounded-lg flex items-center justify-center">
                        <Icon size={14} className="text-[#71717a]" />
                      </div>
                      <span className="font-medium">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#71717a] font-mono text-xs">{item.sku}</td>
                  <td className="px-4 py-3 text-[#a1a1aa] capitalize">{item.category.replace('-', ' ')}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="font-medium w-8 text-right">{item.quantity}</span>
                      <div className="w-16 h-1.5 bg-[#18181b] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${item.quantity === 0 ? 'bg-red-500' : stockPercentage <= 50 ? 'bg-yellow-500' : 'bg-green-500'}`}
                          style={{ width: `${stockPercentage}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-[#71717a]">{item.unit}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#71717a]">{item.min_stock} {item.unit}</td>
                  <td className="px-4 py-3 text-[#a1a1aa] text-xs">
                    <div className="flex items-center gap-1">
                      {item.location === 'warehouse' ? <Warehouse size={12} className="text-[#71717a]" /> : <Truck size={12} className="text-[#71717a]" />}
                      {item.location_name}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-[#a1a1aa]">${item.cost_per_unit.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 text-[10px] font-medium rounded border ${status.bg} ${status.color}`}>
                      {item.status === 'low-stock' && <AlertTriangle size={10} />}
                      {status.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#71717a] text-xs">
                    {new Date(item.last_restocked).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => { setRestockItem(item); setShowRestockModal(true) }}
                      className="px-2.5 py-1 text-xs font-medium bg-[#18181b] border border-[#27272a] hover:border-blue-500/50 hover:text-blue-400 rounded transition-colors"
                    >
                      Restock
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-12 text-[#71717a]">
            <Package size={32} className="mx-auto mb-3 opacity-50" />
            <p className="text-sm">No items match your filters.</p>
          </div>
        )}
      </div>

      {/* Restock Modal */}
      {showRestockModal && restockItem && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50" onClick={() => setShowRestockModal(false)}>
          <div className="bg-[#111113] border border-[#27272a] rounded-xl w-full max-w-md p-6" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Restock Item</h2>
              <button onClick={() => setShowRestockModal(false)} className="p-1 hover:bg-[#18181b] rounded transition-colors">
                <X size={18} className="text-[#71717a]" />
              </button>
            </div>

            <div className="mb-4 p-4 bg-[#0a0a0b] rounded-lg">
              <h3 className="font-medium text-sm">{restockItem.name}</h3>
              <p className="text-xs text-[#71717a]">Current: {restockItem.quantity} {restockItem.unit} · Min: {restockItem.min_stock} {restockItem.unit}</p>
            </div>

            <div className="mb-4">
              <label className="block text-xs text-[#71717a] font-medium mb-1.5">Quantity to Add ({restockItem.unit})</label>
              <input
                type="number"
                value={restockQty}
                onChange={e => setRestockQty(e.target.value)}
                placeholder="Enter quantity..."
                min="1"
                className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex justify-end gap-3">
              <button onClick={() => setShowRestockModal(false)} className="px-4 py-2 text-sm text-[#a1a1aa] hover:text-[#fafafa] transition-colors">
                Cancel
              </button>
              <button onClick={handleRestock} className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors">
                Restock
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
