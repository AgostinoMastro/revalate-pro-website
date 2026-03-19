import { useState } from 'react';
import NotFound from './components/NotFound';

// Logo Assets
const LOGOS = {
  panelWordmark: "https://storage.googleapis.com/revalate-ai-studio-media/Panel%20logos/Panel%20Logos%20(Jan%207%202026)/Logo%20files/PNGs%20-%20SVGs/1x/Asset%201%401x.png",
  panelEmblem: "https://storage.googleapis.com/revalate-ai-studio-media/Panel%20logos/Panel%20Logos%20(Jan%207%202026)/Logo%20files/Emblem/1x/Asset%204%401x.png",
  revalate: "https://storage.googleapis.com/revalate-ai-studio-media/revalate-logos/revalate-ai-studio-wordmark-white.png",
};

// Legal Modal Component
interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const LegalModal = ({ isOpen, onClose, title, children }: LegalModalProps) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-card-bg border border-slate-800 max-w-3xl w-full max-h-[85vh] overflow-y-auto rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-card-bg border-b border-slate-800 px-6 py-4 flex items-center justify-between">
          <h2 className="text-white text-xl font-medium">{title}</h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-2"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-6 py-8 prose prose-invert prose-slate max-w-none">
          {children}
        </div>
      </div>
    </div>
  );
};

// Terms of Use Content
const TermsContent = () => (
  <div className="space-y-6 text-slate-400">
    <p className="text-sm text-slate-500">Last updated: January 2026</p>
    
    <section className="space-y-3">
      <h3 className="text-white text-lg font-medium">1. Acceptance of Terms</h3>
      <p>
        By accessing and using this website (revalate.com), you accept and agree to be bound by these Terms of Use. 
        If you do not agree to these terms, please do not use this website.
      </p>
    </section>

    <section className="space-y-3">
      <h3 className="text-white text-lg font-medium">2. Website Purpose</h3>
      <p>
        This website is provided by Revalate Inc. for informational purposes only. The content on this site is 
        intended to provide general information about Revalate Inc. and its products, including Panel.
      </p>
    </section>

    <section className="space-y-3">
      <h3 className="text-white text-lg font-medium">3. No Data Collection</h3>
      <p>
        This website does not use cookies, tracking pixels, or collect any personal data from visitors. 
        We do not store any information about your visit to this site.
      </p>
      <p>
        If you choose to contact us through our scheduling tool (Cal.com), that interaction is governed by 
        Cal.com's privacy policy and terms of service.
      </p>
    </section>

    <section className="space-y-3">
      <h3 className="text-white text-lg font-medium">4. Intellectual Property</h3>
      <p>
        All content on this website, including but not limited to text, graphics, logos, images, and software, 
        is the property of Revalate Inc. and is protected by applicable intellectual property laws. You may not 
        reproduce, distribute, or create derivative works from this content without our express written permission.
      </p>
    </section>

    <section className="space-y-3">
      <h3 className="text-white text-lg font-medium">5. External Links</h3>
      <p>
        This website may contain links to third-party websites. These links are provided for your convenience only. 
        Revalate Inc. does not endorse or assume responsibility for the content or practices of any linked sites.
      </p>
    </section>

    <section className="space-y-3">
      <h3 className="text-white text-lg font-medium">6. Disclaimer of Warranties</h3>
      <p>
        This website is provided "as is" without any warranties, express or implied. Revalate Inc. makes no 
        representations or warranties regarding the accuracy, completeness, or reliability of any information 
        on this site.
      </p>
    </section>

    <section className="space-y-3">
      <h3 className="text-white text-lg font-medium">7. Limitation of Liability</h3>
      <p>
        To the fullest extent permitted by law, Revalate Inc. shall not be liable for any direct, indirect, 
        incidental, consequential, or punitive damages arising from your use of or inability to use this website.
      </p>
    </section>

    <section className="space-y-3">
      <h3 className="text-white text-lg font-medium">8. Changes to Terms</h3>
      <p>
        We reserve the right to modify these Terms of Use at any time. Any changes will be effective immediately 
        upon posting to this website. Your continued use of the site after any changes constitutes acceptance of 
        the new terms.
      </p>
    </section>

    <section className="space-y-3">
      <h3 className="text-white text-lg font-medium">9. Governing Law</h3>
      <p>
        These Terms of Use shall be governed by and construed in accordance with the laws of the jurisdiction 
        in which Revalate Inc. is incorporated, without regard to its conflict of law provisions.
      </p>
    </section>

    <section className="space-y-3">
      <h3 className="text-white text-lg font-medium">10. Contact</h3>
      <p>
        If you have any questions about these Terms of Use, please contact us through the scheduling 
        link on this website.
      </p>
    </section>
  </div>
);

// Privacy Policy Content
const PrivacyContent = () => (
  <div className="space-y-6 text-slate-400">
    <p className="text-sm text-slate-500">Last updated: January 2026</p>
    
    <section className="space-y-3">
      <h3 className="text-white text-lg font-medium">Overview</h3>
      <p>
        Revalate Inc. ("we", "us", or "our") respects your privacy. This Privacy Policy explains our practices 
        regarding information collection on this website (revalate.com).
      </p>
    </section>

    <section className="space-y-3">
      <h3 className="text-white text-lg font-medium">Information We Collect</h3>
      <p>
        <strong className="text-white">We do not collect any personal information from visitors to this website.</strong>
      </p>
      <ul className="list-disc list-inside space-y-2 ml-4">
        <li>We do not use cookies</li>
        <li>We do not use tracking pixels or analytics</li>
        <li>We do not collect IP addresses or device information</li>
        <li>We do not store any data about your visit</li>
      </ul>
    </section>

    <section className="space-y-3">
      <h3 className="text-white text-lg font-medium">Third-Party Services</h3>
      <p>
        Our website includes a scheduling widget powered by Cal.com. If you choose to schedule a meeting with us, 
        you will be interacting with Cal.com's service. Any information you provide through that service is 
        governed by Cal.com's privacy policy.
      </p>
      <p>
        We encourage you to review Cal.com's privacy policy before providing any personal information through 
        their scheduling tool.
      </p>
    </section>

    <section className="space-y-3">
      <h3 className="text-white text-lg font-medium">External Links</h3>
      <p>
        This website contains links to external sites (such as panelai.app). These sites have their own 
        privacy policies, and we encourage you to review them. We are not responsible for the privacy 
        practices of external websites.
      </p>
    </section>

    <section className="space-y-3">
      <h3 className="text-white text-lg font-medium">Children's Privacy</h3>
      <p>
        This website is not intended for children under 13 years of age. We do not knowingly collect any 
        information from children.
      </p>
    </section>

    <section className="space-y-3">
      <h3 className="text-white text-lg font-medium">Changes to This Policy</h3>
      <p>
        We may update this Privacy Policy from time to time. Any changes will be posted on this page with 
        an updated revision date.
      </p>
    </section>

    <section className="space-y-3">
      <h3 className="text-white text-lg font-medium">Contact Us</h3>
      <p>
        If you have questions about this Privacy Policy, please contact us through the scheduling 
        link on this website.
      </p>
    </section>
  </div>
);

// Grid Lines Background Component
const GridLines = () => (
  <div className="fixed inset-0 pointer-events-none z-[5] grid grid-cols-4 md:grid-cols-6 lg:grid-cols-12 gap-0 h-full w-full opacity-[0.03] px-6 lg:px-12">
    {[...Array(12)].map((_, i) => (
      <div 
        key={i}
        className={`border-r border-slate-500 h-full ${
          i >= 4 && i < 6 ? 'hidden md:block' : ''
        } ${i >= 6 ? 'hidden lg:block' : ''}`}
      />
    ))}
  </div>
);

// Header Component
const Header = () => {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6 lg:px-12 xl:px-24 bg-background/95 backdrop-blur-md border-b border-slate-800/50">
      <div className="flex items-center justify-between max-w-[90rem] mx-auto">
        <img 
          src={LOGOS.revalate} 
          alt="Revalate" 
          className="h-8 w-auto"
        />
        <button 
          onClick={scrollToContact}
          className="text-slate-400 hover:text-white transition-colors text-sm"
        >
          Contact
        </button>
      </div>
    </header>
  );
};

// Hero Section Component
const Hero = () => (
  <section className="min-h-[60vh] flex flex-col justify-center px-6 lg:px-12 xl:px-24 pt-24 pb-12">
    <div className="max-w-[90rem] mx-auto w-full">
      {/* Section Label */}
      <span className="text-primary text-xs font-semibold tracking-widest uppercase block mb-6">
        The Company Behind Panel
      </span>
      
      {/* Main Headline */}
      <h1 className="text-white text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-medium tracking-tight mb-8 max-w-4xl leading-tight">
        Building intelligent software for the construction industry.
      </h1>
      
      {/* Description */}
      <p className="text-slate-400 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl">
        We create AI-native tools that transform how construction teams work — from estimating to invoicing, expense tracking to project delivery.
      </p>
    </div>
  </section>
);

// Two Cards Section - Panel CTA and Contact Revalate
const CardsSection = () => (
  <section className="px-6 lg:px-12 xl:px-24 py-20 border-t border-slate-800/50">
    <div className="max-w-[90rem] mx-auto">
      <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
        
        {/* Card 1: Panel CTA */}
        <div className="bg-card-bg border border-slate-800/50 p-8 lg:p-10 flex flex-col h-full">
          <span className="text-primary text-xs font-semibold tracking-widest uppercase block mb-4">
            Our Product
          </span>
          <h3 className="text-white text-2xl md:text-3xl font-medium tracking-tight mb-4">
            Looking for Panel?
          </h3>
          <p className="text-slate-400 leading-relaxed mb-8 flex-grow">
            Panel is the AI-native operating system for construction — intelligent estimating, expense tracking, invoicing, and project management in one platform.
          </p>
          
          {/* Logo above on mobile, Button left + Logo right on desktop */}
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
            <a 
              href="https://panelai.app"
              className="btn-primary"
            >
              Enter Panel
            </a>
            <img 
              src={LOGOS.panelWordmark}
              alt="Panel"
              className="h-8 w-auto object-contain self-start sm:self-auto"
            />
          </div>
        </div>
        
        {/* Card 2: Contact Revalate */}
        <div className="bg-card-bg border border-slate-800/50 p-8 lg:p-10 flex flex-col h-full">
          <span className="text-primary text-xs font-semibold tracking-widest uppercase block mb-4">
            Get in Touch
          </span>
          <h3 className="text-white text-2xl md:text-3xl font-medium tracking-tight mb-4">
            Contact Revalate
          </h3>
          <p className="text-slate-400 leading-relaxed mb-8 flex-grow">
            Interested in partnerships, investment opportunities, or an existing Revalate custom software customer? We'd love to hear from you.
          </p>
          
          {/* Logo above on mobile, Button left + Logo right on desktop */}
          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-4">
            <button
              data-cal-namespace="15-min-meeting-with-nick"
              data-cal-link="nickb/15-min-meeting-with-nick"
              data-cal-config='{"layout":"month_view","theme":"dark"}'
              className="btn-primary cursor-pointer"
            >
              Schedule a Call
            </button>
            <img 
              src={LOGOS.revalate}
              alt="Revalate"
              className="h-8 w-auto object-contain self-start sm:self-auto"
            />
          </div>
        </div>
        
      </div>
    </div>
  </section>
);

// Contact Section - Let's Talk
const ContactSection = () => (
  <section id="contact" className="px-6 lg:px-12 xl:px-24 py-20 border-t border-slate-800/50">
    <div className="max-w-[90rem] mx-auto">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div className="max-w-xl">
          <span className="text-primary text-xs font-semibold tracking-widest uppercase block mb-4">
            Contact Revalate
          </span>
          <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-6">
            Let's Talk
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Interested in partnerships, investment opportunities, or an existing Revalate custom software customer? We'd love to hear from you.
          </p>
        </div>
        
        <div className="flex-shrink-0">
          <button
            data-cal-namespace="15-min-meeting-with-nick"
            data-cal-link="nickb/15-min-meeting-with-nick"
            data-cal-config='{"layout":"month_view","theme":"dark"}'
            className="btn-primary cursor-pointer"
          >
            Schedule a Call
          </button>
        </div>
      </div>
    </div>
  </section>
);

// About Section Component
const About = () => (
  <section className="px-6 lg:px-12 xl:px-24 py-24 bg-card-bg/50 border-t border-slate-800/50">
    <div className="max-w-[90rem] mx-auto">
      <span className="text-primary text-xs font-semibold tracking-widest uppercase block mb-4">
        About Us
      </span>
      <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight mb-12">
        Built by Builders
      </h2>
      
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-24">
        <div className="space-y-6">
          <p className="text-xl md:text-2xl text-slate-400 leading-relaxed">
            We built Panel after two decades inside construction — estimating jobs, tracking costs, and fixing workflows that slow teams down.
          </p>
          <p className="text-xl md:text-2xl text-slate-400 leading-relaxed">
            Construction has always been about solving problems — on site, on paper, and everywhere in between. But the tools most teams use weren't designed for how construction actually works.
          </p>
        </div>
        
        <div className="space-y-6">
          <p className="text-xl md:text-2xl text-slate-400 leading-relaxed">
            Panel is a construction-first intelligence engine that turns documents and data into usable workflows for estimating, expenses, invoicing, and project delivery.
          </p>
          <p className="text-xl md:text-2xl text-slate-400 leading-relaxed">
            <span className="text-white font-semibold">Intelligence that works while you build.</span>
          </p>
        </div>
      </div>
      
      {/* Founders Section */}
      <div className="mt-16 pt-16 border-t border-slate-800/50">
        <h3 className="text-white text-2xl font-medium tracking-tight mb-8">
          Founded By
        </h3>
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <h4 className="text-white text-xl font-medium">Nick Bartella</h4>
            <p className="text-primary text-sm mb-3">Co-Founder / Strategy & Development</p>
            <p className="text-slate-400 text-base leading-relaxed">
              Over a decade in financial services and business advisory — specializing in risk management and process development. Now building the operational backbone for construction technology.
            </p>
          </div>
          <div>
            <h4 className="text-white text-xl font-medium">Agostino Mastroianni</h4>
            <p className="text-primary text-sm mb-3">Co-Founder / Product Development</p>
            <p className="text-slate-400 text-base leading-relaxed">
              Nearly 20 years in construction — from electrical apprentice to journeyman, foreman, project manager, and inspector. Now building software that removes friction from construction workflows.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);


// Footer Component
interface FooterProps {
  onPrivacyClick: () => void;
  onTermsClick: () => void;
}

const Footer = ({ onPrivacyClick, onTermsClick }: FooterProps) => (
  <footer className="bg-footer-bg border-t border-slate-800 py-8 px-6 lg:px-12 xl:px-24">
    <div className="max-w-[90rem] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-slate-500 text-sm">
        © {new Date().getFullYear()} Revalate Inc. All rights reserved.
      </p>
      <div className="flex items-center gap-6 text-slate-500 text-sm">
        <button 
          onClick={onPrivacyClick}
          className="hover:text-white transition-colors"
        >
          Privacy
        </button>
        <button 
          onClick={onTermsClick}
          className="hover:text-white transition-colors"
        >
          Terms
        </button>
      </div>
    </div>
  </footer>
);

// Main App Component
function App() {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const pathname = window.location.pathname;
  if (pathname !== '/' && pathname !== '/index.html') {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background text-slate-400">
      <GridLines />
      <Header />
      <main>
        <Hero />
        <CardsSection />
        <About />
        <ContactSection />
      </main>
      <Footer 
        onPrivacyClick={() => setShowPrivacy(true)}
        onTermsClick={() => setShowTerms(true)}
      />

      {/* Legal Modals */}
      <LegalModal 
        isOpen={showTerms} 
        onClose={() => setShowTerms(false)}
        title="Terms of Use"
      >
        <TermsContent />
      </LegalModal>

      <LegalModal 
        isOpen={showPrivacy} 
        onClose={() => setShowPrivacy(false)}
        title="Privacy Policy"
      >
        <PrivacyContent />
      </LegalModal>
    </div>
  );
}

export default App;
