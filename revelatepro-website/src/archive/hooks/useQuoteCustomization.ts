import { useState, useCallback } from 'react'

export interface QuoteCustomization {
  // Branding
  companyName: string
  companyLogo: string
  primaryColor: string
  secondaryColor: string

  // Terms
  paymentTerms: string
  validityDays: number
  warrantyPeriod: string

  // Pricing
  subtotal: number
  overheadPercent: number
  profitPercent: number
  taxPercent: number

  // Customer Details
  customerName: string
  projectName: string

  // Document Type
  documentType: 'takeoff' | 'purchase-order' | 'change-order' | 'subcontractor-agreement'
}

const defaultCustomization: QuoteCustomization = {
  companyName: 'Elite Construction Group',
  companyLogo: '🏗️',
  primaryColor: '#0AAEFF',
  secondaryColor: '#1a202c',

  paymentTerms: 'Net 30 days',
  validityDays: 30,
  warrantyPeriod: '1 year',

  subtotal: 846000,
  overheadPercent: 10,
  profitPercent: 15,
  taxPercent: 8.25,

  customerName: 'Sarah Mitchell',
  projectName: 'Oak Ridge Phase 2',

  documentType: 'takeoff'
}

export const useQuoteCustomization = () => {
  const [customization, setCustomization] = useState<QuoteCustomization>(defaultCustomization)

  const updateCustomization = useCallback((updates: Partial<QuoteCustomization>) => {
    setCustomization(prev => ({ ...prev, ...updates }))
  }, [])

  const resetToDefaults = useCallback(() => {
    setCustomization(defaultCustomization)
  }, [])

  // Calculated values
  const calculatedValues = {
    overheadAmount: customization.subtotal * (customization.overheadPercent / 100),
    profitAmount: customization.subtotal * (customization.profitPercent / 100),
    get subtotalWithMarkup() {
      return customization.subtotal + this.overheadAmount + this.profitAmount
    },
    get taxAmount() {
      return this.subtotalWithMarkup * (customization.taxPercent / 100)
    },
    get totalAmount() {
      return this.subtotalWithMarkup + this.taxAmount
    }
  }

  const documentTypeOptions = [
    { value: 'takeoff', label: 'Takeoff Review', icon: '📋' },
    { value: 'purchase-order', label: 'Purchase Order', icon: '🛒' },
    { value: 'change-order', label: 'Change Order', icon: '📝' },
    { value: 'subcontractor-agreement', label: 'Subcontractor Agreement', icon: '🤝' }
  ]

  return {
    customization,
    updateCustomization,
    resetToDefaults,
    calculatedValues,
    documentTypeOptions
  }
}
