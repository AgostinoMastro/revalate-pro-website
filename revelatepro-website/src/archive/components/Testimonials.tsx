import type React from 'react'
import { AnimatedSection, StaggeredAnimation } from './AnimatedSection'
import { User, Wrench, Monitor, Zap } from 'lucide-react'

// Icon mapping for professional avatars
const iconMap = {
  'business': User,
  'technician': Wrench,
  'developer': Monitor,
  'electrical': Zap
}

const testimonials = [
  {
    id: 1,
    name: 'Anthony C',
    role: 'Owner',
    company: 'Surrey Construction',
    location: 'Surrey, BC',
    avatar: 'business',
    quote: "Agostino knows your business more than you do, I swear.",
    metrics: {
      label: 'Process Improvement',
      value: '80%',
      color: 'pastel-blue'
    },
    projectType: 'Commercial Construction'
  },
  {
    id: 2,
    name: 'Ryan Tittsworth',
    role: 'Owner',
    company: 'RBT Electric',
    location: 'Ontario, CA',
    avatar: 'technician',
    quote: "These guys go above and beyond what we ask, reducing our 8 daily spreadsheets into 1 easy app.",
    metrics: {
      label: 'Efficiency Gain',
      value: '8:1',
      color: 'pastel-blue'
    },
    projectType: 'Electrical Construction'
  },
  {
    id: 3,
    name: 'Mondo Marshall',
    role: 'Project Manager',
    company: 'Semetra',
    location: 'Toronto, ON',
    avatar: 'developer',
    quote: "Being able to get rid of the spreadsheets that have taken me hours to fill out is game changing.",
    metrics: {
      label: 'Time Savings',
      value: '137 Hours',
      color: 'pastel-blue'
    },
    projectType: 'Infrastructure Projects'
  },
  {
    id: 4,
    name: 'Matthew Cinelli',
    role: 'Owner',
    company: 'Essential Soils Solutions',
    location: 'British Columbia',
    avatar: 'technician',
    quote: "Nick & Aug are amazing. The best part of working with Revalate is I come up with a crazy idea and they make it a reality.",
    metrics: {
      label: 'Custom Solutions',
      value: '100%',
      color: 'agent-cyan'
    },
    projectType: 'Soil Solutions'
  },
  {
    id: 5,
    name: 'Paul Lorefice',
    role: 'Owner',
    company: 'New City Electric',
    location: 'New York',
    avatar: 'electrical',
    quote: "AI has helped me get quotes out I usually left for the end of the day faster than I ever could.",
    metrics: {
      label: 'Quote Speed',
      value: '7x',
      color: 'agent-red'
    },
    projectType: 'Electrical Contracting'
  },
  {
    id: 6,
    name: 'Eric LaMarre',
    role: 'Owner',
    company: 'Bayview Glass',
    location: 'Ontario, CA',
    avatar: 'technician',
    quote: "Nick & Agostino made it easy to get my workflows in order.",
    metrics: {
      label: 'Workflow Optimized',
      value: '26:1',
      color: 'pastel-blue'
    },
    projectType: 'Glass Installation'
  },
  {
    id: 7,
    name: 'Dean Muir',
    role: 'Owner',
    company: '360 Mechanical Group',
    location: 'Alberta, CA',
    avatar: 'technician',
    quote: "The AI tool they built me helped reduce mundane tasks. Something that took 30 minutes, now takes 5. Its nuts, thanks guys!",
    metrics: {
      label: 'Task Reduction',
      value: '6x Faster',
      color: 'pastel-blue'
    },
    projectType: 'Mechanical Services'
  },
  {
    id: 8,
    name: 'Sarah Mitchell',
    role: 'Project Manager',
    company: 'Premier Roofing Solutions',
    location: 'Texas, USA',
    avatar: 'business',
    quote: "RevalatePro transformed our estimating process. What used to take my team 3 hours now takes 45 minutes with incredible accuracy.",
    metrics: {
      label: 'Time Savings',
      value: '75%',
      color: 'agent-cyan'
    },
    projectType: 'Commercial Roofing'
  },
  {
    id: 9,
    name: 'Carlos Rodriguez',
    role: 'Owner',
    company: 'Rodriguez Concrete & Masonry',
    location: 'California, USA',
    avatar: 'technician',
    quote: "The automated material calculations and cost tracking have boosted our profit margins significantly. Best investment we've made.",
    metrics: {
      label: 'Profit Increase',
      value: '25%',
      color: 'agent-red'
    },
    projectType: 'Concrete & Masonry'
  }
]

// Icon Avatar Component
const IconAvatar: React.FC<{ iconType: string; className?: string }> = ({ iconType, className = "" }) => {
  const IconComponent = iconMap[iconType as keyof typeof iconMap] || User

  return (
    <div className={`w-12 h-12 rounded-full bg-black-olive border border-pastel-blue/20 flex items-center justify-center ${className}`}>
      <IconComponent className="w-6 h-6 text-pastel-blue" />
    </div>
  )
}

interface TestimonialsProps {
  onDemoClick?: () => void
}

export const Testimonials: React.FC<TestimonialsProps> = ({ onDemoClick }) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Mobile-optimized section header */}
        <AnimatedSection animation="slideUp" duration={0.8}>
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl xs:text-4xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              <span className="gradient-text">Contractor Feedback</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto px-4">
              Don't Take Our Word for It.
            </p>
          </div>
        </AnimatedSection>



        {/* Mobile-optimized testimonials grid */}
        <StaggeredAnimation
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16"
          staggerDelay={120}
          childAnimation="slideUp"
        >
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group relative p-6 rounded-2xl bg-dark-card/50 border border-dark-border
                         hover:border-gray-600 transition-all duration-300 hover:scale-105"
            >
              {/* Quote */}
              <div className="mb-6">
                <svg className="w-8 h-8 text-gray-600 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                </svg>
                <p className="text-gray-300 leading-relaxed italic">"{testimonial.quote}"</p>
              </div>

              {/* Metrics */}
              <div className="mb-6 p-4 rounded-xl bg-black/30 border border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400 text-sm">{testimonial.metrics.label}</span>
                  <span className={`text-2xl font-bold text-${testimonial.metrics.color}`}>
                    {testimonial.metrics.value}
                  </span>
                </div>
              </div>

              {/* Author info */}
              <div className="flex items-center">
                <IconAvatar iconType={testimonial.avatar} className="mr-4" />
                <div>
                  <div className="font-semibold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                  <div className="text-sm text-gray-500">{testimonial.company}</div>
                  <div className="text-xs text-gray-600">{testimonial.location} • {testimonial.projectType}</div>
                </div>
              </div>

              {/* Hover effect */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />
              </div>
            </div>
          ))}
        </StaggeredAnimation>

        {/* Case study highlight */}
        <AnimatedSection animation="scaleIn" delay={400} duration={0.8}>
          <div className="max-w-4xl mx-auto p-8 rounded-3xl bg-gradient-to-r from-dark-card/50 to-[#010a14]/50 border border-dark-border">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold mb-4 gradient-text">Featured Case Study</h3>
            <p className="text-lg text-gray-400">
              How RBT Electric streamlined their workflow from 8 daily spreadsheets to 1 easy app
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6 rounded-xl bg-black/30">
              <div className="text-3xl font-bold text-neon-green mb-2">8:1</div>
              <div className="text-gray-400">Spreadsheet Reduction</div>
            </div>
            <div className="p-6 rounded-xl bg-black/30">
              <div className="text-3xl font-bold text-bright-blue mb-2">90%</div>
              <div className="text-gray-400">Time Saved Daily</div>
            </div>
            <div className="p-6 rounded-xl bg-black/30">
              <div className="text-3xl font-bold text-agent-cyan mb-2">100%</div>
              <div className="text-gray-400">Workflow Efficiency</div>
            </div>
          </div>
          </div>
        </AnimatedSection>


      </div>
    </section>
  )
}
