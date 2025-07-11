import type React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="bg-dark-bg border-t border-gray-700 py-8">
      <div className="container mx-auto px-6">
        {/* Navigation Links */}
        <div className="text-center mb-4">
          <div className="flex flex-wrap items-center justify-center gap-1 text-sm text-gray-400">
            <a href="https://terms.revalate.com/" className="hover:text-pastel-blue transition-colors duration-200" target="_blank" rel="noopener noreferrer">
              Terms of Service
            </a>
            <span className="mx-2">|</span>
            <a href="https://terms.revalate.com/privacy-policy/" className="hover:text-pastel-blue transition-colors duration-200" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
            <span className="mx-2">|</span>
            <a href="https://terms.revalate.com/understand-usage/" className="hover:text-pastel-blue transition-colors duration-200" target="_blank" rel="noopener noreferrer">
              Understand Usage
            </a>
            <span className="mx-2">|</span>
            <a href="https://terms.revalate.com/support-schedule/" className="hover:text-pastel-blue transition-colors duration-200" target="_blank" rel="noopener noreferrer">
              Support Schedule
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Copyright © Revalate Inc. 2025
          </p>
        </div>
      </div>
    </footer>
  )
}
