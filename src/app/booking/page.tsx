'use client'

import { useState } from 'react'
import { Globe, Clock, DollarSign, Calendar, User, Mail, Phone, MapPin, Check, Sparkles, Settings, Eye, Code, Copy, ArrowRight, ArrowLeft, X } from 'lucide-react'

const serviceTypes = [
  { id: 'regular', name: 'Regular Clean', duration: '2-3 hours', basePrice: 120, description: 'Standard cleaning for maintained homes' },
  { id: 'deep', name: 'Deep Clean', duration: '4-5 hours', basePrice: 250, description: 'Thorough cleaning including baseboards, inside appliances' },
  { id: 'move', name: 'Move-in/out', duration: '5-6 hours', basePrice: 350, description: 'Complete cleaning for moving transitions' },
  { id: 'office', name: 'Office Clean', duration: '3-4 hours', basePrice: 200, description: 'Commercial space cleaning' },
  { id: 'post-construction', name: 'Post-Construction', duration: '6-8 hours', basePrice: 450, description: 'Cleanup after renovation or build-out' },
]

const timeSlots = [
  { id: '08:00', label: '8:00 AM' },
  { id: '09:00', label: '9:00 AM' },
  { id: '10:00', label: '10:00 AM' },
  { id: '11:00', label: '11:00 AM' },
  { id: '13:00', label: '1:00 PM' },
  { id: '14:00', label: '2:00 PM' },
  { id: '15:00', label: '3:00 PM' },
  { id: '16:00', label: '4:00 PM' },
]

const addOns = [
  { id: 'windows', name: 'Window Cleaning (interior)', price: 40 },
  { id: 'fridge', name: 'Inside Fridge/Freezer', price: 30 },
  { id: 'oven', name: 'Inside Oven', price: 35 },
  { id: 'cabinets', name: 'Inside Cabinets', price: 50 },
  { id: 'laundry', name: 'Laundry (1 load)', price: 25 },
  { id: 'garage', name: 'Garage Sweep', price: 60 },
]

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState<string | null>(null)
  const [selectedDate, setSelectedDate] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([])
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', address: '', notes: '' })
  const [showPreview, setShowPreview] = useState(false)

  const service = serviceTypes.find(s => s.id === selectedService)
  const addOnTotal = selectedAddOns.reduce((sum, id) => sum + (addOns.find(a => a.id === id)?.price || 0), 0)
  const totalPrice = (service?.basePrice || 0) + addOnTotal

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id])
  }

  const generateDates = () => {
    const dates = []
    const today = new Date(2026, 8, 18) // Mock today
    for (let i = 1; i <= 14; i++) {
      const d = new Date(today)
      d.setDate(d.getDate() + i)
      if (d.getDay() !== 0 && d.getDay() !== 6) { // Skip weekends
        dates.push(d)
      }
    }
    return dates.slice(0, 7)
  }

  const dates = generateDates()

  const widgetCode = `<!-- CleanFlow Booking Widget -->
<div id="cleanflow-booking"></div>
<script src="https://cleanflow.io/widget.js"></script>
<script>
  CleanFlow.init({
    target: '#cleanflow-booking',
    theme: 'dark',
    primaryColor: '#3b82f6',
    services: ['regular', 'deep', 'move', 'office']
  });
</script>`

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Booking Widget</h1>
          <p className="text-sm text-[#a1a1aa] mt-1">Embeddable form for your website with instant quotes</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${showPreview ? 'bg-blue-500/10 border-blue-500/30 text-blue-400' : 'bg-[#111113] border-[#27272a] hover:border-[#3f3f46]'}`}
          >
            <Eye size={16} />
            {showPreview ? 'Hide Preview' : 'Preview Widget'}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors">
            <Code size={16} />
            Get Code
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Widget Preview */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs text-[#71717a] font-semibold uppercase tracking-wider">
            <Globe size={14} />
            Live Preview
          </div>
          <div className="bg-[#111113] border border-[#27272a] rounded-xl p-6">
            {/* Booking Form Widget */}
            <div className="max-w-sm mx-auto">
              {/* Step Indicator */}
              <div className="flex items-center justify-center gap-2 mb-6">
                {[1, 2, 3, 4].map(s => (
                  <div key={s} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${step >= s ? 'bg-blue-500 text-white' : 'bg-[#18181b] text-[#71717a]'}`}>
                      {step > s ? <Check size={14} /> : s}
                    </div>
                    {s < 4 && <div className={`w-8 h-0.5 ${step > s ? 'bg-blue-500' : 'bg-[#27272a]'}`} />}
                  </div>
                ))}
              </div>

              {/* Step 1: Service Selection */}
              {step === 1 && (
                <div>
                  <h3 className="text-center font-semibold mb-1">Choose a Service</h3>
                  <p className="text-center text-xs text-[#71717a] mb-4">Select the type of cleaning you need</p>
                  <div className="space-y-2">
                    {serviceTypes.map(s => (
                      <button
                        key={s.id}
                        onClick={() => setSelectedService(s.id)}
                        className={`w-full text-left p-3 rounded-lg border transition-all ${selectedService === s.id ? 'bg-blue-500/5 border-blue-500/30' : 'bg-[#0a0a0b] border-[#27272a] hover:border-[#3f3f46]'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">{s.name}</p>
                            <p className="text-xs text-[#71717a]">{s.duration}</p>
                          </div>
                          <span className="text-sm font-semibold text-blue-400">${s.basePrice}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Date & Time */}
              {step === 2 && (
                <div>
                  <h3 className="text-center font-semibold mb-1">Pick a Date & Time</h3>
                  <p className="text-center text-xs text-[#71717a] mb-4">Select your preferred appointment slot</p>
                  <div className="grid grid-cols-4 gap-1 mb-4">
                    {dates.map(d => {
                      const dateStr = d.toISOString().split('T')[0]
                      return (
                        <button
                          key={dateStr}
                          onClick={() => setSelectedDate(dateStr)}
                          className={`p-2 rounded-lg border text-center transition-all ${selectedDate === dateStr ? 'bg-blue-500/5 border-blue-500/30' : 'bg-[#0a0a0b] border-[#27272a] hover:border-[#3f3f46]'}`}
                        >
                          <p className="text-[10px] text-[#71717a]">{d.toLocaleDateString('en-US', { weekday: 'short' })}</p>
                          <p className="text-sm font-medium">{d.getDate()}</p>
                        </button>
                      )
                    })}
                  </div>
                  {selectedDate && (
                    <div className="grid grid-cols-4 gap-1">
                      {timeSlots.map(slot => (
                        <button
                          key={slot.id}
                          onClick={() => setSelectedTime(slot.id)}
                          className={`p-2 rounded border text-xs transition-all ${selectedTime === slot.id ? 'bg-blue-500/5 border-blue-500/30 text-blue-400' : 'bg-[#0a0a0b] border-[#27272a] hover:border-[#3f3f46]'}`}
                        >
                          {slot.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Add-ons */}
              {step === 3 && (
                <div>
                  <h3 className="text-center font-semibold mb-1">Any Add-ons?</h3>
                  <p className="text-center text-xs text-[#71717a] mb-4">Enhance your cleaning with extras</p>
                  <div className="space-y-2">
                    {addOns.map(addon => (
                      <button
                        key={addon.id}
                        onClick={() => toggleAddOn(addon.id)}
                        className={`w-full text-left p-3 rounded-lg border transition-all ${selectedAddOns.includes(addon.id) ? 'bg-blue-500/5 border-blue-500/30' : 'bg-[#0a0a0b] border-[#27272a] hover:border-[#3f3f46]'}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded border flex items-center justify-center ${selectedAddOns.includes(addon.id) ? 'bg-blue-500 border-blue-500' : 'border-[#3f3f46]'}`}>
                              {selectedAddOns.includes(addon.id) && <Check size={10} className="text-white" />}
                            </div>
                            <span className="text-sm">{addon.name}</span>
                          </div>
                          <span className="text-xs text-[#a1a1aa]">+${addon.price}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 4: Contact Info */}
              {step === 4 && (
                <div>
                  <h3 className="text-center font-semibold mb-1">Your Details</h3>
                  <p className="text-center text-xs text-[#71717a] mb-4">We'll confirm your booking via email</p>
                  <div className="space-y-3">
                    <input type="text" placeholder="Full Name" className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500" />
                    <input type="email" placeholder="Email Address" className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500" />
                    <input type="tel" placeholder="Phone Number" className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500" />
                    <input type="text" placeholder="Service Address" className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500" />
                    <textarea placeholder="Special instructions (optional)" rows={2} className="w-full px-3 py-2 bg-[#0a0a0b] border border-[#27272a] rounded-lg text-sm focus:outline-none focus:border-blue-500 resize-none" />
                  </div>
                </div>
              )}

              {/* Price Summary */}
              {service && (
                <div className="mt-4 p-3 bg-[#0a0a0b] rounded-lg border border-[#27272a]">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-[#a1a1aa]">{service.name}</span>
                    <span>${service.basePrice}</span>
                  </div>
                  {selectedAddOns.length > 0 && (
                    <div className="flex justify-between text-xs mb-1 text-[#71717a]">
                      <span>Add-ons ({selectedAddOns.length})</span>
                      <span>+${addOnTotal}</span>
                    </div>
                  )}
                  <div className="border-t border-[#27272a] pt-2 mt-2 flex justify-between font-semibold">
                    <span>Total</span>
                    <span className="text-blue-400">${totalPrice}</span>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex gap-2 mt-4">
                {step > 1 && (
                  <button onClick={() => setStep(step - 1)} className="flex-1 py-2 text-sm text-[#a1a1aa] border border-[#27272a] rounded-lg hover:text-white hover:border-[#3f3f46] transition-colors flex items-center justify-center gap-1">
                    <ArrowLeft size={14} /> Back
                  </button>
                )}
                <button
                  onClick={() => step < 4 ? setStep(step + 1) : alert('Booking submitted!')}
                  disabled={step === 1 && !selectedService}
                  className="flex-1 py-2 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors flex items-center justify-center gap-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {step === 4 ? 'Book Now' : 'Continue'} <ArrowRight size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Configuration */}
        <div className="space-y-6">
          {/* Widget Embed Code */}
          <div className="bg-[#111113] border border-[#27272a] rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold flex items-center gap-2">
                <Code size={16} />
                Embed Code
              </h3>
              <button className="flex items-center gap-1 px-2 py-1 text-xs text-blue-400 hover:bg-blue-500/10 rounded transition-colors">
                <Copy size={12} />
                Copy
              </button>
            </div>
            <pre className="text-xs text-[#a1a1aa] bg-[#0a0a0b] p-4 rounded-lg overflow-x-auto font-mono">
              {widgetCode}
            </pre>
          </div>

          {/* Widget Settings */}
          <div className="bg-[#111113] border border-[#27272a] rounded-xl p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Settings size={16} />
              Configuration
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-[#71717a] font-medium mb-1.5">Theme</label>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 text-xs font-medium bg-blue-500/10 border border-blue-500/30 text-blue-400 rounded-lg">Dark</button>
                  <button className="px-3 py-1.5 text-xs font-medium bg-[#0a0a0b] border border-[#27272a] text-[#71717a] hover:text-[#fafafa] rounded-lg">Light</button>
                  <button className="px-3 py-1.5 text-xs font-medium bg-[#0a0a0b] border border-[#27272a] text-[#71717a] hover:text-[#fafafa] rounded-lg">Auto</button>
                </div>
              </div>
              <div>
                <label className="block text-xs text-[#71717a] font-medium mb-1.5">Primary Color</label>
                <div className="flex gap-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg border-2 border-white/20 cursor-pointer" />
                  <div className="w-8 h-8 bg-green-500 rounded-lg cursor-pointer hover:ring-2 hover:ring-white/20" />
                  <div className="w-8 h-8 bg-purple-500 rounded-lg cursor-pointer hover:ring-2 hover:ring-white/20" />
                  <div className="w-8 h-8 bg-orange-500 rounded-lg cursor-pointer hover:ring-2 hover:ring-white/20" />
                  <div className="w-8 h-8 bg-pink-500 rounded-lg cursor-pointer hover:ring-2 hover:ring-white/20" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-[#71717a] font-medium mb-1.5">Available Services</label>
                <div className="space-y-2">
                  {serviceTypes.map(s => (
                    <label key={s.id} className="flex items-center gap-2 text-sm">
                      <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-[#3f3f46] bg-[#0a0a0b] text-blue-500 focus:ring-blue-500" />
                      <span>{s.name}</span>
                      <span className="text-xs text-[#71717a]">${s.basePrice}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Bookings */}
          <div className="bg-[#111113] border border-[#27272a] rounded-xl p-5">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Sparkles size={16} />
              Recent Widget Bookings
            </h3>
            <div className="space-y-3">
              {[
                { name: 'Alex Rivera', service: 'Deep Clean', date: 'Sep 22', price: 250, status: 'confirmed' },
                { name: 'Jennifer W.', service: 'Regular Clean', date: 'Sep 20', price: 120, status: 'confirmed' },
                { name: 'David Kim', service: 'Move-in/out', date: 'Sep 25', price: 390, status: 'pending' },
              ].map((booking, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-[#0a0a0b] rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#18181b] rounded-full flex items-center justify-center text-xs font-medium">
                      {booking.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{booking.name}</p>
                      <p className="text-xs text-[#71717a]">{booking.service} · {booking.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">${booking.price}</p>
                    <span className={`text-[10px] font-medium ${booking.status === 'confirmed' ? 'text-green-400' : 'text-yellow-400'}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
