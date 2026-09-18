'use client'

import { useState } from 'react'
import { ArrowRight, ArrowLeft, Check, Users, Package, Calendar } from 'lucide-react'

interface SetupWizardProps {
  open: boolean
  onClose: () => void
  onComplete: () => void
}

const steps = [
  {
    title: 'Welcome to CleanFlow',
    description: 'Let\'s get your cleaning business set up in just a few steps.',
    icon: Check,
  },
  {
    title: 'Add Your First Customer',
    description: 'Start by adding your customers so you can schedule jobs for them.',
    icon: Users,
  },
  {
    title: 'Set Up Your Inventory',
    description: 'Add your cleaning supplies and equipment to track stock levels.',
    icon: Package,
  },
  {
    title: 'Schedule Your First Job',
    description: 'You\'re ready to schedule your first cleaning job!',
    icon: Calendar,
  },
]

export function SetupWizard({ open, onClose, onComplete }: SetupWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)

  if (!open) return null

  const step = steps[currentStep]
  const Icon = step.icon

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 overlay-enter" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#111113] border border-[#27272a] rounded-xl shadow-2xl overflow-hidden modal-enter">
        {/* Progress */}
        <div className="flex gap-1 px-6 pt-6">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`flex-1 h-1 rounded-full transition-colors ${
                i <= currentStep ? 'bg-blue-500' : 'bg-[#27272a]'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-blue-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Icon size={28} className="text-blue-400" />
          </div>
          <h2 className="text-xl font-semibold mb-3">{step.title}</h2>
          <p className="text-sm text-[#a1a1aa] mb-8">{step.description}</p>

          {/* Actions */}
          <div className="flex gap-3 justify-center">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-[#a1a1aa] border border-[#27272a] rounded-lg hover:text-white hover:border-[#3f3f46] transition-colors"
              >
                <ArrowLeft size={16} />
                Back
              </button>
            )}
            {currentStep < steps.length - 1 ? (
              <button
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="flex items-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Continue
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={() => {
                  onComplete()
                  onClose()
                }}
                className="flex items-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium rounded-lg transition-colors"
              >
                Get Started
                <Check size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Skip */}
        <div className="px-6 pb-4 text-center">
          <button
            onClick={onClose}
            className="text-xs text-[#71717a] hover:text-[#a1a1aa] transition-colors"
          >
            Skip setup
          </button>
        </div>
      </div>
    </div>
  )
}
