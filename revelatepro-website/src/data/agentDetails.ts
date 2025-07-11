import React from 'react'

// Agent detail data for each of the three current agents
export const agentDetailsData = {
  'bid-management': {
    id: 'bid-management',
    name: 'AI Bid Management Agent',
    tagline: 'Win more bids with intelligent automation',
    description: 'Streamline your bidding process with intelligent proposal generation, competitive analysis, and automated documentation.',
    longDescription: 'Transform your bidding process with our AI-powered Bid Management Agent. From initial opportunity identification to final proposal submission, our intelligent system handles the complex workflows that typically consume hours of your team\'s time. Leverage machine learning to analyze competitor strategies, optimize pricing, and generate compelling proposals that win more projects.',
    color: 'pastel-blue',
    bgColor: 'bg-pastel-blue/10',
    borderColor: 'border-pastel-blue/30',
    price: '$30',
    period: 'month',
    savings: 'Save 15+ hours weekly',
    icon: React.createElement('svg', {
      className: 'w-8 h-8',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24'
    }, React.createElement('path', {
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: 2,
      d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
    })),
    features: [
      {
        title: 'Intelligent Proposal Generation',
        description: 'Auto-generate compelling proposals using AI analysis of project requirements, historical data, and winning patterns.',
        icon: React.createElement('svg', {
          className: 'w-8 h-8',
          fill: 'none',
          stroke: 'currentColor',
          viewBox: '0 0 24 24'
        }, React.createElement('path', {
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2,
          d: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
        }))
      },
      {
        title: 'Competitive Analysis',
        description: 'AI-powered competitor research and analysis to position your bids strategically and increase win rates.',
        icon: React.createElement('svg', {
          className: 'w-8 h-8',
          fill: 'none',
          stroke: 'currentColor',
          viewBox: '0 0 24 24'
        }, React.createElement('path', {
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2,
          d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
        }))
      },
      {
        title: 'Automated Document Assembly',
        description: 'Streamline document creation with intelligent templates and automated assembly of bid packages.',
        icon: React.createElement('svg', {
          className: 'w-8 h-8',
          fill: 'none',
          stroke: 'currentColor',
          viewBox: '0 0 24 24'
        }, React.createElement('path', {
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2,
          d: 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h2a2 2 0 002-2z'
        }))
      },
      {
        title: 'Bid Tracking & Analytics',
        description: 'Track all your bids in one place with AI-powered analytics to identify patterns and improve success rates.',
        icon: React.createElement('svg', {
          className: 'w-8 h-8',
          fill: 'none',
          stroke: 'currentColor',
          viewBox: '0 0 24 24'
        }, React.createElement('path', {
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2,
          d: 'M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z'
        }))
      },
      {
        title: 'Win Rate Optimization',
        description: 'Machine learning algorithms analyze your historical bids to recommend strategies for higher win rates.',
        icon: React.createElement('svg', {
          className: 'w-8 h-8',
          fill: 'none',
          stroke: 'currentColor',
          viewBox: '0 0 24 24'
        }, React.createElement('path', {
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2,
          d: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
        }))
      },
      {
        title: 'Smart Collaboration',
        description: 'Coordinate bid teams efficiently with automated task assignment and progress tracking.',
        icon: React.createElement('svg', {
          className: 'w-8 h-8',
          fill: 'none',
          stroke: 'currentColor',
          viewBox: '0 0 24 24'
        }, React.createElement('path', {
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2,
          d: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
        }))
      }
    ],
    benefits: [
      { metric: '40%', description: 'Higher Win Rate', color: 'pastel-blue' },
      { metric: '15hrs', description: 'Saved Weekly', color: 'bright-blue' },
      { metric: '90%', description: 'Faster Proposals', color: 'agent-cyan' },
      { metric: '25%', description: 'More Profitable Bids', color: 'pastel-blue' }
    ],
    useCases: [
      {
        title: 'Large Commercial Project Bidding',
        description: 'Streamline complex multi-trade bidding for large commercial developments.',
        before: 'Manually coordinating 15+ subcontractors, spending 40+ hours per bid, missing deadlines, inconsistent pricing across trades.',
        after: 'AI coordinates all trades automatically, generates complete bid packages in 8 hours, ensures consistent pricing and compliance.'
      },
      {
        title: 'Government Contract Proposals',
        description: 'Navigate complex government requirements with AI-powered compliance checking.',
        before: 'Hours spent reviewing requirements documents, risk of non-compliance, manual document assembly taking days.',
        after: 'AI instantly analyzes requirements, ensures 100% compliance, auto-generates all required documentation in proper format.'
      },
      {
        title: 'Competitive Market Analysis',
        description: 'Stay ahead of competitors with intelligent market positioning.',
        before: 'Limited competitor intelligence, pricing based on guesswork, losing bids to better-positioned competitors.',
        after: 'AI provides detailed competitor analysis, optimal pricing recommendations, strategic positioning for maximum win probability.'
      }
    ],
    integrations: [
      'Sage', 'Xero', 'Microsoft', 'Google', 'Quickbooks', 'Bluebeam',
      'Open AI', 'Gemini AI', 'Make', 'Glide', 'DropBox', 'Rest API'
    ],
    testimonial: {
      quote: 'These guys go above and beyond what we ask, reducing our 8 daily spreadsheets into 1 easy app.',
      author: 'Ryan Tittsworth',
      company: 'RBT Electric',
      role: 'Owner'
    }
  },

  'estimating': {
    id: 'estimating',
    name: 'AI Estimating Agent',
    tagline: 'Accurate estimates in minutes, not hours',
    description: 'Generate accurate cost estimates instantly using machine learning models trained on historical construction data.',
    longDescription: 'Revolutionize your estimating process with our AI-powered Estimating Agent. Built on decades of construction data and machine learning algorithms, our system delivers accurate cost estimates in minutes instead of hours. From material takeoffs to labor calculations, our AI understands the nuances of construction pricing and delivers estimates you can trust.',
    color: 'pastel-blue',
    bgColor: 'bg-bright-blue/10',
    borderColor: 'border-bright-blue/30',
    price: '$30',
    period: 'month',
    savings: 'Save 20+ hours weekly',
    featured: true,
    icon: React.createElement('svg', {
      className: 'w-8 h-8',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24'
    }, React.createElement('path', {
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: 2,
      d: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z'
    })),
    features: [
      {
        title: 'Intelligent Material Takeoffs',
        description: 'AI-powered quantity takeoffs from plans and specifications with 99% accuracy.',
        icon: React.createElement('svg', {
          className: 'w-8 h-8',
          fill: 'none',
          stroke: 'currentColor',
          viewBox: '0 0 24 24'
        }, React.createElement('path', {
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2,
          d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
        }))
      },
      {
        title: 'Real-Time Pricing Intelligence',
        description: 'Access live material and labor pricing data from thousands of suppliers and databases.',
        icon: React.createElement('svg', {
          className: 'w-8 h-8',
          fill: 'none',
          stroke: 'currentColor',
          viewBox: '0 0 24 24'
        }, React.createElement('path', {
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2,
          d: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6'
        }))
      },
      {
        title: 'Automated Labor Calculations',
        description: 'Precise labor hour calculations based on crew productivity, location, and project complexity.',
        icon: React.createElement('svg', {
          className: 'w-8 h-8',
          fill: 'none',
          stroke: 'currentColor',
          viewBox: '0 0 24 24'
        }, React.createElement('path', {
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2,
          d: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z'
        }))
      },
      {
        title: 'Risk Assessment & Contingencies',
        description: 'AI analyzes project risk factors and recommends appropriate contingency levels.',
        icon: React.createElement('svg', {
          className: 'w-8 h-8',
          fill: 'none',
          stroke: 'currentColor',
          viewBox: '0 0 24 24'
        }, React.createElement('path', {
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2,
          d: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
        }))
      },
      {
        title: 'Historical Data Learning',
        description: 'Machine learning from your past projects to improve accuracy with every estimate.',
        icon: React.createElement('svg', {
          className: 'w-8 h-8',
          fill: 'none',
          stroke: 'currentColor',
          viewBox: '0 0 24 24'
        }, React.createElement('path', {
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2,
          d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
        }))
      },
      {
        title: 'Multi-Format Plan Reading',
        description: 'Process plans in any format - PDF, CAD, BIM, or hand-drawn sketches.',
        icon: React.createElement('svg', {
          className: 'w-8 h-8',
          fill: 'none',
          stroke: 'currentColor',
          viewBox: '0 0 24 24'
        }, React.createElement('path', {
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2,
          d: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
        }))
      }
    ],
    benefits: [
      { metric: '95%', description: 'Estimate Accuracy', color: 'bright-blue' },
      { metric: '20hrs', description: 'Saved Weekly', color: 'pastel-blue' },
      { metric: '85%', description: 'Faster Estimates', color: 'agent-cyan' },
      { metric: '30%', description: 'More Profitable Jobs', color: 'bright-blue' }
    ],
    useCases: [
      {
        title: 'Complex Residential Projects',
        description: 'Accurate estimates for custom homes and renovations with unique requirements.',
        before: 'Manual takeoffs taking 8+ hours, frequent errors in calculations, inconsistent labor estimates across similar projects.',
        after: 'AI completes takeoffs in 30 minutes with 99% accuracy, consistent labor calculations, detailed material breakdown.'
      },
      {
        title: 'Commercial Building Estimates',
        description: 'Multi-trade coordination and comprehensive cost breakdowns for large projects.',
        before: 'Coordinating estimates from multiple trades manually, pricing inconsistencies, missed scope items.',
        after: 'AI coordinates all trades automatically, ensures comprehensive scope coverage, provides unified pricing strategy.'
      },
      {
        title: 'Emergency Cost Assessment',
        description: 'Rapid damage assessment and repair cost estimation for insurance claims.',
        before: 'Site visits required for every assessment, manual calculations taking days, delayed insurance processing.',
        after: 'AI processes photos and descriptions for instant estimates, 24/7 availability, immediate insurance submission.'
      }
    ],
    integrations: [
      'Sage', 'Xero', 'Microsoft', 'Google', 'Quickbooks', 'Bluebeam',
      'Open AI', 'Gemini AI', 'Make', 'Glide', 'DropBox', 'Rest API'
    ],
    testimonial: {
      quote: 'AI has helped me get quotes out I usually left for the end of the day faster than I ever could.',
      author: 'Paul Lorefice',
      company: 'New City Electric',
      role: 'Owner'
    }
  },

  'expense': {
    id: 'expense',
    name: 'AI Expense Agent',
    tagline: 'Effortless expense tracking and optimization',
    description: 'Track, categorize, and optimize project expenses with automated receipt processing and budget monitoring.',
    longDescription: 'Take control of your project finances with our intelligent Expense Agent. Using advanced OCR and machine learning, our system automatically processes receipts, categorizes expenses, and provides real-time budget insights. From field purchases to vendor invoices, track every dollar and optimize project profitability with AI-powered financial intelligence.',
    color: 'pastel-blue',
    bgColor: 'bg-pastel-blue/10',
    borderColor: 'border-pastel-blue/30',
    price: '$30',
    period: 'month',
    savings: 'Save 10+ hours weekly',
    icon: React.createElement('svg', {
      className: 'w-8 h-8',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24'
    }, React.createElement('path', {
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: 2,
      d: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
    })),
    features: [
      {
        title: 'Smart Receipt Processing',
        description: 'Advanced OCR technology automatically extracts data from receipts and invoices.',
        icon: React.createElement('svg', {
          className: 'w-8 h-8',
          fill: 'none',
          stroke: 'currentColor',
          viewBox: '0 0 24 24'
        }, React.createElement('path', {
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2,
          d: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
        }))
      },
      {
        title: 'Automated Categorization',
        description: 'AI intelligently categorizes expenses by project, trade, and cost code.',
        icon: React.createElement('svg', {
          className: 'w-8 h-8',
          fill: 'none',
          stroke: 'currentColor',
          viewBox: '0 0 24 24'
        }, React.createElement('path', {
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2,
          d: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10'
        }))
      },
      {
        title: 'Real-Time Budget Tracking',
        description: 'Monitor project budgets in real-time with alerts for potential overruns.',
        icon: React.createElement('svg', {
          className: 'w-8 h-8',
          fill: 'none',
          stroke: 'currentColor',
          viewBox: '0 0 24 24'
        }, React.createElement('path', {
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2,
          d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
        }))
      },
      {
        title: 'Vendor Management',
        description: 'Track vendor performance, payment terms, and spending patterns.',
        icon: React.createElement('svg', {
          className: 'w-8 h-8',
          fill: 'none',
          stroke: 'currentColor',
          viewBox: '0 0 24 24'
        }, React.createElement('path', {
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2,
          d: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
        }))
      },
      {
        title: 'Tax Compliance & Reporting',
        description: 'Automatic tax categorization and compliance reporting for audits.',
        icon: React.createElement('svg', {
          className: 'w-8 h-8',
          fill: 'none',
          stroke: 'currentColor',
          viewBox: '0 0 24 24'
        }, React.createElement('path', {
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2,
          d: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'
        }))
      },
      {
        title: 'Mobile Expense Capture',
        description: 'Capture and process expenses instantly from any mobile device.',
        icon: React.createElement('svg', {
          className: 'w-8 h-8',
          fill: 'none',
          stroke: 'currentColor',
          viewBox: '0 0 24 24'
        }, React.createElement('path', {
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2,
          d: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z'
        }))
      }
    ],
    benefits: [
      { metric: '99%', description: 'Receipt Accuracy', color: 'pastel-blue' },
      { metric: '10hrs', description: 'Saved Weekly', color: 'bright-blue' },
      { metric: '50%', description: 'Faster Processing', color: 'agent-cyan' },
      { metric: '15%', description: 'Cost Savings', color: 'pastel-blue' }
    ],
    useCases: [
      {
        title: 'Field Expense Management',
        description: 'Capture and track expenses from remote job sites and field operations.',
        before: 'Lost receipts, delayed expense reporting, manual data entry taking hours, no real-time budget visibility.',
        after: 'Instant mobile capture, automatic processing, real-time budget updates, 100% receipt retention.'
      },
      {
        title: 'Multi-Project Cost Tracking',
        description: 'Manage expenses across multiple concurrent construction projects.',
        before: 'Mixed expenses across projects, manual allocation, delayed reporting, inaccurate project profitability.',
        after: 'AI automatically allocates expenses to correct projects, real-time profitability tracking, instant reporting.'
      },
      {
        title: 'Vendor Invoice Processing',
        description: 'Streamline vendor invoice approval and payment workflows.',
        before: 'Paper-based approvals, manual data entry, payment delays, vendor relationship issues.',
        after: 'AI processes invoices instantly, automated approval workflows, timely payments, improved vendor relationships.'
      }
    ],
    integrations: [
      'Sage', 'Xero', 'Microsoft', 'Google', 'Quickbooks', 'Bluebeam',
      'Open AI', 'Gemini AI', 'Make', 'Glide', 'DropBox', 'Rest API'
    ],
    testimonial: {
      quote: 'Being able to get rid of the spreadsheets that have taken me hours to fill out is game changing.',
      author: 'Mondo Marshall',
      company: 'Semetra',
      role: 'Project Manager'
    }
  },

  'ai-processing': {
    id: 'ai-processing',
    name: 'AI Processing Agent',
    tagline: 'Eliminate behind-the-scenes admin tasks',
    description: 'Automate administrative workflows, document processing, and routine tasks to free up your team for high-value work.',
    longDescription: 'Transform your administrative operations with our AI Processing Agent. This intelligent automation system works behind the scenes to handle routine administrative tasks, document processing, and workflow management that typically consume valuable team time. From invoice processing to permit tracking, our AI agent learns your business processes and executes them with precision and consistency.',
    color: 'bright-blue',
    bgColor: 'bg-bright-blue/10',
    borderColor: 'border-bright-blue/30',
    price: '$30',
    period: 'month',
    savings: 'Save 20+ hours weekly',
    icon: React.createElement('svg', {
      className: 'w-8 h-8',
      fill: 'none',
      stroke: 'currentColor',
      viewBox: '0 0 24 24'
    }, React.createElement('path', {
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      strokeWidth: 2,
      d: 'M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
    })),
    features: [
      {
        title: 'Automated Document Processing',
        description: 'AI extracts data from contracts, invoices, permits, and other documents with 99% accuracy.',
        icon: React.createElement('svg', {
          className: 'w-8 h-8',
          fill: 'none',
          stroke: 'currentColor',
          viewBox: '0 0 24 24'
        }, React.createElement('path', {
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2,
          d: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
        }))
      },
      {
        title: 'Workflow Automation',
        description: 'Set up custom workflows that trigger automatically based on events, deadlines, or conditions.',
        icon: React.createElement('svg', {
          className: 'w-8 h-8',
          fill: 'none',
          stroke: 'currentColor',
          viewBox: '0 0 24 24'
        }, React.createElement('path', {
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2,
          d: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15'
        }))
      },
      {
        title: 'Smart Task Assignment',
        description: 'AI intelligently assigns tasks to team members based on workload, skills, and availability.',
        icon: React.createElement('svg', {
          className: 'w-8 h-8',
          fill: 'none',
          stroke: 'currentColor',
          viewBox: '0 0 24 24'
        }, React.createElement('path', {
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2,
          d: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
        }))
      },
      {
        title: 'Permit & Compliance Tracking',
        description: 'Automatically track permit status, deadlines, and compliance requirements across all projects.',
        icon: React.createElement('svg', {
          className: 'w-8 h-8',
          fill: 'none',
          stroke: 'currentColor',
          viewBox: '0 0 24 24'
        }, React.createElement('path', {
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2,
          d: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
        }))
      },
      {
        title: 'Communication Automation',
        description: 'Send automated updates, reminders, and notifications to clients, vendors, and team members.',
        icon: React.createElement('svg', {
          className: 'w-8 h-8',
          fill: 'none',
          stroke: 'currentColor',
          viewBox: '0 0 24 24'
        }, React.createElement('path', {
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2,
          d: 'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
        }))
      },
      {
        title: 'Optional Dashboard Interface',
        description: 'Choose between fully automated background processing or an optional dashboard for monitoring and control.',
        icon: React.createElement('svg', {
          className: 'w-8 h-8',
          fill: 'none',
          stroke: 'currentColor',
          viewBox: '0 0 24 24'
        }, React.createElement('path', {
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          strokeWidth: 2,
          d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
        }))
      }
    ],
    benefits: [
      { metric: '85%', description: 'Admin Time Reduction', color: 'bright-blue' },
      { metric: '24/7', description: 'Automated Processing', color: 'pastel-blue' },
      { metric: '99%', description: 'Task Completion Rate', color: 'agent-cyan' },
      { metric: '30+', description: 'Process Types Handled', color: 'bright-blue' }
    ],
    useCases: [
      {
        title: 'Invoice & Payment Processing',
        description: 'Automated vendor invoice processing, approval workflows, and payment scheduling.',
        before: 'Manual invoice entry, slow approval processes, missed payment deadlines, vendor relationship issues.',
        after: 'AI processes invoices in seconds, automated approval routing, scheduled payments, improved vendor relations.'
      },
      {
        title: 'Permit & Inspection Management',
        description: 'Automated permit applications, inspection scheduling, and compliance tracking.',
        before: 'Manual permit tracking, missed inspection deadlines, compliance gaps, project delays.',
        after: 'Automated permit monitoring, proactive inspection scheduling, real-time compliance status, on-time project delivery.'
      },
      {
        title: 'Client Communication Workflows',
        description: 'Automated project updates, milestone notifications, and client check-ins.',
        before: 'Manual client updates, inconsistent communication, forgotten follow-ups, client dissatisfaction.',
        after: 'Scheduled updates sent automatically, consistent communication flow, proactive follow-ups, delighted clients.'
      }
    ],
    integrations: [
      'Sage', 'Xero', 'Microsoft', 'Google', 'Quickbooks', 'Bluebeam',
      'Open AI', 'Gemini AI', 'Make', 'Glide', 'DropBox', 'Rest API'
    ],
    testimonial: {
      quote: 'The Processing Agent handles all our administrative tasks invisibly. We focus on building while it manages everything else.',
      author: 'Marcus Thompson',
      company: 'Thompson Construction Solutions',
      role: 'Operations Manager'
    }
  }
}
