// src/components/AboutSection.jsx - SEO-Friendly & Fully Responsive Version

import React, { useEffect, useRef } from 'react';
import { MapPin, Phone } from 'lucide-react';

// Reusable FeatureCard - Semantic and responsive
function FeatureCard({ icon, title, desc }) {
  return (
    <article className="flex items-start space-x-2 xs:space-x-3 bg-white rounded-lg sm:rounded-xl p-2 xs:p-3 sm:p-4 shadow border border-gray-200 hover:shadow-md transition-shadow duration-200" tabIndex={0} aria-label={title}>
      <div className="w-6 h-6 xs:w-8 xs:h-8 sm:w-10 sm:h-10 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-white text-xs xs:text-sm sm:text-lg font-bold shadow-sm" aria-hidden="true">
        <span className="leading-none">{icon}</span>
      </div>
      <div className="min-w-0 flex-1">
        <h4 className="font-semibold text-gray-900 mb-0.5 text-xs xs:text-sm sm:text-base">{title}</h4>
        <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600 line-clamp-2">{desc}</p>
      </div>
    </article>
  );
}

// Reusable MissionCard - Semantic and responsive
function MissionCard({ icon, title, desc, bg = 'bg-blue-100' }) {
  return (
    <section className={`text-center p-3 xs:p-4 sm:p-6 md:p-8 bg-white rounded-lg sm:rounded-xl shadow-md border border-gray-200 ${bg} hover:shadow-lg transition-shadow duration-200`} tabIndex={0} aria-label={title}>
      <div className={`w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 ${bg} rounded-full flex items-center justify-center mx-auto mb-2 xs:mb-3 sm:mb-4 text-base xs:text-xl sm:text-2xl`} role="img" aria-label={`${title} icon`}>
        <span className="leading-none">{icon}</span>
      </div>
      <h3 className="text-xs xs:text-sm sm:text-lg md:text-xl font-bold text-gray-900 mb-0.5 xs:mb-1">{title}</h3>
      <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600 leading-snug line-clamp-3">{desc}</p>
    </section>
  );
}

const defaultFeatures = [
  { icon: '👨‍💻', title: 'Expert Team', desc: 'Skilled professionals with 5+ years experience' },
  { icon: '⏰', title: '24/7 Support', desc: 'Round-the-clock assistance for all clients' },
  { icon: '💡', title: 'Innovation Focus', desc: 'Cutting-edge solutions for modern challenges' },
  { icon: '🏆', title: 'Proven Results', desc: '99% client satisfaction rate' },
];

const defaultMissionCards = [
  { icon: '🎯', bg: 'bg-blue-100', title: 'Our Mission', desc: 'Empowering businesses with innovative technology solutions that drive growth and digital transformation.' },
  { icon: '🚀', bg: 'bg-amber-100', title: 'Our Vision', desc: 'To be the leading IT solutions provider, setting new standards in technology innovation and client satisfaction.' },
  { icon: '💎', bg: 'bg-green-100', title: 'Our Values', desc: 'Excellence, innovation, integrity, and client-first approach guide everything we do at White Mirror Solutions.' },
];

function AboutSection({
  heading = 'About White Mirror Solutions',
  subtext = 'Pioneering digital transformation with cutting-edge technology solutions that drive business growth and innovation.',
  features = defaultFeatures,
  missionCards = defaultMissionCards,
  contact = { address: '669, A-2, SCH No.136, Indore-452010', phone: '7987435108', email: 'contact@whitemirror.in' }
}) {
  const sectionRef = useRef(null);

  // Organization Schema Markup for SEO [web:31][web:88][web:91]
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://yourdomain.com/#organization",
    "name": "White Mirror Solutions",
    "alternateName": "WhiteMirror",
    "url": "https://yourdomain.com",
    "logo": "https://yourdomain.com/logo.png",
    "description": "White Mirror Solutions is a leading IT solutions provider specializing in MERN stack development, restaurant management systems, AI voice agents, and digital transformation services.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "669, A-2, SCH No.136",
      "addressLocality": "Indore",
      "addressRegion": "MP",
      "postalCode": "452010",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "telephone": "+91 79874-35108",
      "email": "contact@whitemirror.in"
    },
    "sameAs": [
      "https://github.com/WhiteMirrorSolutions",
      "https://linkedin.com/company/whitemirror",
      "https://twitter.com/whitemirrorai",
      "https://instagram.com/whitemirrorai"
    ],
    "knowsAbout": [
      "MERN Stack Development",
      "Restaurant Management Systems",
      "AI Voice Agents",
      "Payment Gateway Integration",
      "Digital Marketing",
      "Web Development"
    ]
  };

  // About Page Schema [web:86]
  const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": "https://yourdomain.com/#about",
    "name": "About White Mirror Solutions",
    "url": "https://yourdomain.com/about",
    "mainEntity": {
      "@type": "Organization",
      "@id": "https://yourdomain.com/#organization"
    }
  };

  useEffect(() => {
    // Placeholder for analytics or SEO hooks
  }, []);

  return (
    <>
      {/* Schema Markups for SEO */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} 
      />
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }} 
      />

      <section 
        id="about" 
        ref={sectionRef} 
        className="relative py-6 sm:py-10 md:py-14 lg:py-20 px-3 sm:px-4 md:px-6 lg:px-8 bg-gradient-to-br from-white via-sky-100 to-cyan-50 overflow-hidden"
        aria-labelledby="about-heading"
        aria-describedby="about-description"
      >
        {/* Background gradients (decorative) */}
        <div className="absolute inset-0 pointer-events-none z-0 hidden sm:block" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 sm:h-40 bg-gradient-to-r from-blue-100 via-sky-100 to-cyan-100 opacity-60 blur-2xl rounded-full"></div>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-24 sm:h-32 bg-gradient-to-r from-cyan-100 via-sky-100 to-blue-100 opacity-40 blur-2xl rounded-full"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header - Responsive sizing */}
          <header className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
            <h1 
              id="about-heading"
              className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-2 sm:mb-3 md:mb-4 bg-gradient-to-r from-blue-800 via-sky-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg tracking-tight px-2"
            >
              {heading}
            </h1>
            <p 
              id="about-description"
              className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-700 max-w-xs xs:max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto font-medium px-2"
            >
              {subtext}
            </p>
          </header>

          {/* Main Content Grid - Responsive layout [web:77][web:79] */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 md:gap-8 lg:gap-12 items-start mb-6 sm:mb-8 md:mb-12 lg:mb-20">
            
            {/* Left Content Section */}
            <main className="space-y-4 sm:space-y-6 md:space-y-8">
              <div className="space-y-2 sm:space-y-3 md:space-y-4">
                <h2 className="text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900">Building Tomorrow's Technology Today</h2>
                <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">White Mirror Solutions transforms businesses through innovative IT solutions. From restaurant SaaS platforms to custom web development, we deliver excellence.</p>
                <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">Our expertise spans digital marketing, AI agents, payment gateways, and marketing tools that empower businesses to thrive in the digital age.</p>
              </div>

              {/* Features Grid - Responsive columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 xs:gap-3 sm:gap-4">
                {features.map((f) => (
                  <FeatureCard key={f.title} icon={f.icon} title={f.title} desc={f.desc} />
                ))}
              </div>
            </main>

            {/* Right Image Section - Responsive */}
            <aside className="relative w-full">
              <div className="relative overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg md:shadow-2xl aspect-video w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-full mx-auto border border-sky-100 bg-white/80 backdrop-blur-md">
                <img
                  src="https://images.unsplash.com/photo-1515923256482-1c04580b477c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                  alt="Modern tech office with blue color scheme"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                  width="1080"
                  height="720"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-200/30 to-cyan-100/10"></div>
              </div>

              {/* Stats Badge - Responsive positioning */}
              <div className="absolute -bottom-3 -left-3 xs:-bottom-4 xs:-left-4 sm:-bottom-6 sm:-left-6 bg-white/95 backdrop-blur rounded-lg sm:rounded-xl shadow-lg p-2 xs:p-3 sm:p-4 md:p-6 border border-sky-100" aria-hidden="true">
                <div className="text-center">
                  <div className="text-base xs:text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 mb-0.5">50+</div>
                  <div className="text-[10px] xs:text-xs sm:text-sm text-gray-600 whitespace-nowrap">Projects Completed</div>
                </div>
              </div>
            </aside>
          </div>

          {/* Mission Cards Section - Fully responsive grid */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6 md:gap-8 mb-6 sm:mb-8 md:mb-12 lg:mb-16">
            {missionCards.map((card) => (
              <MissionCard key={card.title} icon={card.icon} title={card.title} desc={card.desc} bg={card.bg} />
            ))}
          </section>

          {/* Office Images Section - Responsive layout */}
          <section className="py-6 sm:py-8 md:py-12 lg:py-16 bg-white/80 backdrop-blur-md rounded-lg sm:rounded-xl md:rounded-2xl px-3 sm:px-4 md:px-6 lg:px-8 mb-6 sm:mb-8 md:mb-12 lg:mb-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 sm:gap-6 md:gap-8 lg:gap-10">
              {[
                {
                  img: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1170&q=80",
                  title: "Modern Workspace",
                  desc: "Collaborative environment for innovation"
                },
                {
                  img: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1170&q=80",
                  title: "Innovation Hub",
                  desc: "Where ideas become reality"
                }
              ].map((item, i) => (
                <figure key={i} className="overflow-hidden border border-blue-100 bg-white/90 rounded-lg sm:rounded-xl md:rounded-2xl hover:shadow-lg transition-shadow duration-200">
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-40 xs:h-48 sm:h-56 md:h-64 object-cover rounded-lg sm:rounded-xl md:rounded-2xl" 
                    loading="lazy"
                    width="1170"
                    height="256"
                  />
                  <figcaption className="p-2 xs:p-3 sm:p-4">
                    <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold mb-0.5 xs:mb-1 text-gray-900">{item.title}</h3>
                    <p className="text-gray-600 text-xs xs:text-sm">{item.desc}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </section>

          {/* Contact Section - Fully responsive */}
          <section className="py-6 sm:py-8 md:py-12 lg:py-16 bg-gradient-to-br from-white via-sky-100 to-cyan-50/80 backdrop-blur-md rounded-lg sm:rounded-xl md:rounded-2xl text-center px-3 sm:px-4 md:px-6 lg:px-8">
            <h2 className="text-base xs:text-lg sm:text-2xl md:text-3xl lg:text-4xl font-extrabold mb-2 sm:mb-3 md:mb-4 bg-gradient-to-r from-blue-800 via-sky-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg tracking-tight inline-block px-2 xs:px-3 sm:px-4 md:px-6 py-1 sm:py-2 rounded-lg sm:rounded-xl shadow-md border border-sky-100/60 backdrop-blur-sm">
              Get In Touch
            </h2>
            <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6 md:mb-8 lg:mb-10 max-w-xs xs:max-w-sm sm:max-w-xl md:max-w-2xl mx-auto font-medium">We'd love to hear from you. Reach out for a consultation, partnership, or just to say hello!</p>

            {/* Contact Cards - Responsive flex layout */}
            <div className="flex flex-col xs:flex-row gap-2 xs:gap-3 sm:gap-4 md:gap-6 max-w-xs xs:max-w-lg sm:max-w-2xl md:max-w-4xl mx-auto justify-center items-stretch">
              <a 
                href="https://www.google.com/maps?q=669,+A-2,+SCH+No.136,+Indore-452010" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex-1 flex flex-col items-center text-center bg-white/90 border border-sky-100 rounded-lg sm:rounded-xl p-3 xs:p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-xl transition-shadow duration-200 min-w-0"
                aria-label={`Address: ${contact.address}`}
              >
                <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-100 via-sky-100 to-cyan-100 rounded-full flex items-center justify-center mb-2 xs:mb-2.5 sm:mb-3 shadow-md flex-shrink-0" aria-hidden="true">
                  <MapPin className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-0.5 xs:mb-1 text-xs xs:text-sm sm:text-base md:text-lg">Address</h4>
                <p className="text-gray-600 text-[9px] xs:text-xs sm:text-sm text-center font-medium line-clamp-2">{contact.address}</p>
              </a>

              <a 
                href={`tel:+91${contact.phone}`} 
                className="flex-1 flex flex-col items-center text-center bg-white/90 border border-sky-100 rounded-lg sm:rounded-xl p-3 xs:p-4 sm:p-5 md:p-6 shadow-lg hover:shadow-xl transition-shadow duration-200 min-w-0"
                aria-label={`Call: +91 ${contact.phone}`}
              >
                <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-100 via-sky-100 to-cyan-100 rounded-full flex items-center justify-center mb-2 xs:mb-2.5 sm:mb-3 shadow-md flex-shrink-0" aria-hidden="true">
                  <Phone className="w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-0.5 xs:mb-1 text-xs xs:text-sm sm:text-base md:text-lg">Contact</h4>
                <p className="text-gray-600 text-[9px] xs:text-xs sm:text-sm font-medium">+91 {contact.phone}</p>
              </a>
            </div>
          </section>
        </div>
      </section>
    </>
  );
}

export default AboutSection;
