// src/components/HeroSection.jsx - Fixed Heading Spacing & Button Width

import React, { useEffect, useRef, useState } from 'react';

// Reusable FeatureBadge component - responsive sizing
function FeatureBadge({ text, color = 'from-blue-500 to-amber-400' }) {
  return (
    <span
      className={`inline-block px-2 xs:px-3 py-1 xs:py-1.5 rounded-full font-semibold text-[10px] xs:text-xs sm:text-sm bg-gradient-to-r ${color} text-white shadow-md backdrop-blur-sm select-none border border-white/10 focus:outline-none focus:ring-2 focus:ring-sky-300`}
      role="status"
      aria-label={text}
    >
      {text}
    </span>
  );
}

const defaultBadges = [
  { text: 'Web Development', color: 'from-blue-800 to-sky-600' },
  { text: 'AI Tools', color: 'from-sky-800 to-cyan-600' },
  { text: 'Digital Marketing', color: 'from-blue-800 to-cyan-600' },
  { text: 'Restaurant SaaS', color: 'from-cyan-800 to-blue-600' },
];

const defaultStats = [
  { value: 50, suffix: '+', label: 'Projects' },
  { value: 99, suffix: '%', label: 'Satisfaction' },
  { value: 24, suffix: '/7', label: 'Support' },
  { value: 5, suffix: '+', label: 'Years' },
];

// Animated Counter - only animates when visible
function AnimatedCounter({ value, suffix, visible }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!visible) return;
    
    let start = 0;
    const end = Number(value) || 0;
    const duration = 800;
    let frameId;
    
    function step() {
      start += 1;
      if (start >= end) {
        setCount(end);
      } else {
        setCount(start);
        frameId = requestAnimationFrame(step);
      }
    }
    
    step();
    return () => cancelAnimationFrame(frameId);
  }, [visible, value]);

  return <span aria-live="polite">{count}{suffix}</span>;
}

function HeroSection({
  badges = defaultBadges,
  stats = defaultStats,
  bgImage = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1172&auto=format&fit=crop',
}) {
  const sectionRef = useRef(null);
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  // Website Schema Markup for SEO
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "White Mirror Solutions",
    "url": "https://yourdomain.com",
    "description": "Transform your digital future with innovative IT solutions for restaurants, web development, and digital marketing.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://yourdomain.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // Parallax effect - performance optimized
  useEffect(() => {
    const handleScroll = () => {
      const bg = document.getElementById('hero-bg-img');
      if (bg) {
        const scrolled = window.scrollY;
        bg.style.transform = `translateY(${Math.min(scrolled * 0.3, 500)}px)`;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // IntersectionObserver for stats visibility
  useEffect(() => {
    if (!statsRef.current) return;
    
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setStatsVisible(true);
            obs.disconnect();
          }
        });
      },
      { rootMargin: '-50px', threshold: 0.2 }
    );
    
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      {/* Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />

      <section
        id="hero"
        ref={sectionRef}
        className="relative w-full min-h-screen pt-20 xs:pt-28 sm:pt-32 md:pt-40 flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-sky-100 to-cyan-50"
        aria-label="White Mirror Solutions - Transform Your Digital Future"
      >
        {/* Background Image - Responsive & optimized */}
        <div className="absolute inset-0 z-0">
          <img
            id="hero-bg-img"
            src={bgImage}
            alt=""
            className="w-full h-full object-cover transition-transform duration-500 opacity-80"
            loading="eager"
            sizes="(max-width: 768px) 100vw, 100vw"
            srcSet={`${bgImage}?w=768 768w, ${bgImage}?w=1200 1200w, ${bgImage}?w=1920 1920w`}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 via-sky-100/80 to-cyan-100 opacity-80 backdrop-blur-md"></div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute inset-0 z-10 pointer-events-none hidden sm:block" aria-hidden="true">
          <div className="absolute top-10 left-10 w-8 h-8 bg-blue-200/20 rounded-full blur-xl"></div>
          <div className="absolute top-20 right-16 w-6 h-6 bg-sky-200/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-24 left-1/4 w-5 h-5 bg-cyan-200/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-1/3 w-7 h-7 bg-blue-100/20 rounded-full blur-xl"></div>
        </div>

        {/* Hero Content - Center aligned */}
        <div className="relative z-20 w-full flex items-center justify-center min-h-[calc(100vh-80px)] sm:min-h-[calc(100vh-120px)]">
          <div className="max-w-5xl mx-auto px-3 xs:px-4 sm:px-6 md:px-8 text-center w-full py-12 xs:py-16 sm:py-20">
            <div className="space-y-6 xs:space-y-8 sm:space-y-10 md:space-y-12">
              
              {/* Headline - Increased vertical spacing */}
              <div className="space-y-4 xs:space-y-6 sm:space-y-8">
                <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight drop-shadow-lg">
                  <span className="block">Transform Your</span>
                  <span className="block bg-gradient-to-r from-blue-800 via-sky-700 to-cyan-600 bg-clip-text text-transparent py-2 xs:py-3 sm:py-4">Digital Future</span>
                </h1>
                <p className="text-sm xs:text-base sm:text-lg md:text-xl text-gray-700 max-w-xs xs:max-w-sm sm:max-w-2xl md:max-w-3xl mx-auto leading-relaxed px-2">
                  Innovative IT solutions for restaurants, web development, and digital marketing. Building tomorrow's technology today.
                </p>
              </div>

              {/* Feature Badges - Responsive wrapping */}
              <div className="flex flex-wrap justify-center gap-2 xs:gap-3 sm:gap-4" role="region" aria-label="Key services">
                {badges.map((badge) => (
                  <FeatureBadge
                    key={badge.text}
                    text={badge.text}
                    color={badge.color}
                  />
                ))}
              </div>

            {/* CTA Buttons - Properly Responsive */}
<div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center pt-4 xs:pt-6 sm:pt-8 w-full max-w-md sm:max-w-lg mx-auto px-4 sm:px-0">
  
  {/* Primary Button */}
  <button
    className="w-full sm:w-auto sm:min-w-[180px] md:min-w-[200px] px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 text-sm sm:text-base font-bold bg-gradient-to-r from-blue-800 via-sky-600 to-cyan-600 text-white rounded-lg shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 whitespace-nowrap"
    onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
  >
    Get Started
  </button>

  {/* Secondary Button */}
  <button
    className="w-full sm:w-auto sm:min-w-[180px] md:min-w-[200px] px-6 sm:px-8 md:px-10 py-3 sm:py-3.5 text-sm sm:text-base font-bold border-2 border-blue-200 text-blue-700 hover:text-blue-900 hover:bg-blue-50 hover:shadow-lg active:scale-95 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 flex items-center justify-center gap-2 whitespace-nowrap"
    onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
  >
    <span>View Work</span>
    <svg className="w-4 h-4 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
    </svg>
  </button>
</div>


              {/* Stats Grid - Responsive columns */}
              <div
                ref={statsRef}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 xs:gap-4 sm:gap-8 pt-8 xs:pt-10 sm:pt-14 pb-6 xs:pb-10 sm:pb-16 max-w-xs xs:max-w-sm sm:max-w-2xl md:max-w-3xl mx-auto"
                role="region"
                aria-label="Key statistics"
              >
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl font-bold text-blue-700 mb-1 xs:mb-2 sm:mb-3">
                      <AnimatedCounter value={stat.value} suffix={stat.suffix} visible={statsVisible} />
                    </div>
                    <div className="text-xs xs:text-sm sm:text-base text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Hidden on mobile */}
        <div
          className="hidden md:flex absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 cursor-pointer transition-opacity hover:opacity-70 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-2"
          onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }
          }}
          tabIndex={0}
          role="button"
          aria-label="Scroll down to explore"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-sm text-gray-600 bg-white/80 px-3 py-1 rounded-full shadow-sm">Scroll to explore</span>
            <div className="w-6 h-10 border-2 border-blue-300 rounded-full flex justify-center items-start bg-white/70 backdrop-blur-sm">
              <div className="w-1 h-3 bg-blue-400 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default HeroSection;
