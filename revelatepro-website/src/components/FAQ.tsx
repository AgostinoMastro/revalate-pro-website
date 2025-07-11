import type React from 'react'
import { useState } from 'react'

const faqs = [
  {
    id: 1,
    question: "Do you offer a money-back guarantee?",
    answer: "Absolutely! If, after using our custom solution for 6 months, you do not experience improvement, we will refund the full service cost, or work until you. For full details, please see our Terms of Service."
  },
  {
    id: 2,
    question: "Is there a warranty on the app?",
    answer: "Yes, the warranty covers the duration of the development period. This means that any issues or adjustments needed during the build process are covered. After delivery, we offer support packages to ensure the app runs smoothly."
  },
  {
    id: 3,
    question: "What is the process for building the app?",
    answer: "Our process begins with a 1-hour or 2-hour workflow analysis (depending on your plan) with our trained Construction Specialist. We identify key pain points and assess your current workflow. From there, we design a custom solution, and once you approve, we start building. Throughout the process, we check in at key development stages to ensure everything is aligned with your vision."
  },
  {
    id: 4,
    question: "What can I expect during the development process?",
    answer: "You can expect clear communication, regular progress updates, and full transparency. After the initial workflow analysis, we'll give you a detailed breakdown of the timeline, the features being built, and when you can expect to review progress. We want you to feel confident that your app is being built exactly as you envisioned."
  },
  {
    id: 5,
    question: "What support options are available for my app?",
    answer: "Our support encompasses a wide range of services to ensure your app remains efficient and tailored to your needs. This includes generating new ideas and software improvements to enhance your app, implementing modifications and adjustments, fixing bugs to ensure smooth operation, performing regular maintenance to optimize performance, and adding new features to meet your evolving requirements. **Standard Support:** Response within 48 hours. **Priority Support:** Response within 24 hours. **Same-Day Support:** Response within the same day on Enterprise plans or upon request. For more details, check out our guide 'Support Schedule'. You can find the link at the bottom of the page."
  },
  {
    id: 6,
    question: "How long will it take to deliver my custom app?",
    answer: "The delivery time varies based on the scope of the project. Smaller projects (Basic Builds) can be completed in as little as 2-4 weeks, while more complex apps (Standard and Premium Builds) can take anywhere from 6-12 weeks. We will provide a clear timeline after the initial workflow analysis."
  }
]

interface FAQProps {
  onDemoClick?: () => void
}

export const FAQ: React.FC<FAQProps> = ({ onDemoClick }) => {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (id: number) => {
    setOpenItems(prev =>
      prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  return (
    <section id="faq" className="py-16 sm:py-24 relative overflow-hidden bg-air-black">
      {/* Enhanced background gradient with Air Black theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black-olive/30 to-transparent" />

      {/* Smooth transition edges */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-air-black via-air-black/80 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-air-black via-air-black/80 to-transparent" />

      {/* Mobile-optimized background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="text-[4rem] xs:text-[5rem] sm:text-[7rem] md:text-[10rem] lg:text-[13rem] font-black leading-none select-none tracking-tighter opacity-5"
          style={{
            WebkitTextStroke: '1px rgba(148, 199, 204, 0.08)',
            color: 'rgba(148, 199, 204, 0.03)',
            transform: 'translateZ(0) rotate(-2deg)'
          }}
        >
          FAQ
        </div>
      </div>

      {/* Background elements with Alpha Studio colors */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-pastel-blue/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-black-olive/20 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Mobile-optimized section header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
            <span className="text-pastel-blue">FAQs</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-x11 max-w-3xl mx-auto px-2">
            Get quick answers and learn how we can help your construction business with custom AI Agents.
          </p>
        </div>

        {/* Mobile-optimized FAQ items */}
        <div className="max-w-4xl mx-auto">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="mb-3 sm:mb-4 rounded-xl sm:rounded-2xl bg-black-olive/40 border border-dark-liver/30 overflow-hidden
                         hover:border-pastel-blue/50 transition-all duration-300"
            >
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full p-4 sm:p-6 text-left flex items-start justify-between
                           hover:bg-pastel-blue/5 transition-colors duration-200 min-h-[60px]"
                aria-expanded={openItems.includes(faq.id)}
                aria-controls={`faq-answer-${faq.id}`}
              >
                <h3 className="text-base sm:text-lg md:text-xl font-semibold text-gray-x11 pr-3 sm:pr-4 leading-relaxed">
                  {faq.question}
                </h3>
                <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-pastel-blue
                                flex items-center justify-center transition-transform duration-300 mt-1
                                ${openItems.includes(faq.id) ? 'rotate-45' : ''}`}>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-air-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </button>

              <div
                id={`faq-answer-${faq.id}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out
                            ${openItems.includes(faq.id) ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                  <div className="text-sm sm:text-base text-dark-liver leading-relaxed">
                    {faq.answer.split('**').map((part, index) =>
                      index % 2 === 1 ? (
                        <strong key={`${faq.id}-strong-${index}`} className="text-gray-x11 font-semibold">{part}</strong>
                      ) : (
                        <span key={`${faq.id}-span-${index}`}>{part}</span>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile-optimized CTA section */}
        <div className="text-center mt-12 sm:mt-16 max-w-3xl mx-auto">
          <div className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-black-olive/40 to-black-olive/60 border border-dark-liver/30">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-gray-x11">
              Still have questions?
            </h3>
            <p className="text-base sm:text-lg text-dark-liver mb-6 sm:mb-8 px-2">
              Our team is here to help you understand how RevalatePro can transform your construction workflow.
            </p>
            <div className="flex justify-center">
              <button
                onClick={onDemoClick}
                className="px-6 sm:px-8 py-3 sm:py-4 bg-pastel-blue text-air-black font-bold text-base sm:text-lg rounded-xl transition-all duration-200 hover:bg-pastel-blue/80 shadow-lg hover:shadow-xl min-h-[48px]"
              >
                Talk to Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
