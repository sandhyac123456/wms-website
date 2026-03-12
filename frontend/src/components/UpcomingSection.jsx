// src/components/UpcomingSection.jsx - Enhanced Responsive & SEO-Optimized

import React, { useState } from "react";
import InnovationRoadmap from "./InnovationRoadmap";

// Feature cards data with SEO-optimized content
const features = [
  {
    id: "ai-agents",
    title: "AI Agents",
    badge: "Q2 2025",
    badgeColor: "bg-blue-600",
    description:
      "Intelligent automation agents that handle customer service, data analysis, and business processes autonomously. Revolutionize your workflow with AI-powered efficiency.",
    points: [
      "Natural Language Processing",
      "24/7 Automated Customer Support",
      "Predictive Analytics & Insights",
    ],
    button: "Get Early Access",
    buttonColor: "bg-blue-700",
    ariaLabel: "Get early access to AI Agents",
    keyword: "AI automation agents for business",
  },
  {
    id: "payment-gateways",
    title: "Payment Gateways",
    badge: "Q3 2025",
    badgeColor: "bg-orange-500",
    description:
      "Secure, fast, and flexible payment processing solutions with multi-currency support and advanced fraud protection. Trusted by thousands of businesses worldwide.",
    points: [
      "Multi-Currency Payment Support",
      "Advanced Fraud Detection System",
      "Real-time Transaction Analytics",
    ],
    button: "Join Waitlist",
    buttonColor: "bg-yellow-600",
    ariaLabel: "Join the waitlist for payment gateways",
    keyword: "secure payment gateway solutions",
  },
  {
    id: "marketing-tools",
    title: "Marketing Tools",
    badge: "Q4 2025",
    badgeColor: "bg-green-600",
    description:
      "Comprehensive marketing automation platform with AI-powered insights and omnichannel campaign management. Reach your customers where they are with intelligent targeting.",
    points: [
      "Intelligent Campaign Automation",
      "Advanced Customer Segmentation",
      "Detailed Performance Analytics",
    ],
    button: "Request Demo",
    buttonColor: "bg-green-700",
    ariaLabel: "Request a demo for marketing tools",
    keyword: "AI marketing automation platform",
  },
];

const UpcomingSection = () => {
  const [expandedFeature, setExpandedFeature] = useState(null);

  // Enhanced Product Collection Schema Markup for SEO [web:31][web:42]
  const productCollectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": "https://yourdomain.com/#upcoming",
    "name": "Upcoming Innovations 2025 - White Mirror Solutions",
    "description": "Explore revolutionary upcoming products and services including AI Agents, Payment Gateways, and Marketing Tools launching in 2025.",
    "url": "https://yourdomain.com/upcoming",
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": features.length,
      "itemListElement": features.map((feature, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "Product",
          "@id": `https://yourdomain.com/#${feature.id}`,
          "name": feature.title,
          "description": feature.description,
          "keywords": feature.keyword,
          "brand": {
            "@type": "Brand",
            "name": "White Mirror Solutions"
          },
          "availabilityStarts": new Date(2025, [2, 5, 8][index], 1).toISOString(),
          "availability": "https://schema.org/PreOrder",
          "offers": {
            "@type": "Offer",
            "url": `https://yourdomain.com/#${feature.id}`,
            "availability": "https://schema.org/PreOrder",
            "priceCurrency": "INR",
            "price": "0",
            "description": feature.button
          },
          "features": feature.points.map(point => ({
            "@type": "Text",
            "name": point
          }))
        }
      }))
    }
  };

  return (
    <>
      {/* Schema Markup for Search Engines */}
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productCollectionSchema) }} 
      />

      <section
        id="upcoming"
        className="relative py-6 xs:py-8 sm:py-12 md:py-16 lg:py-20 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 text-gray-900 overflow-hidden bg-gradient-to-br from-white via-sky-100 to-cyan-50"
        aria-labelledby="upcoming-heading"
        aria-describedby="upcoming-description"
      >
        {/* Decorative background - hidden on mobile for performance */}
        <div className="absolute inset-0 pointer-events-none z-0 hidden sm:block" aria-hidden="true">
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] h-[25vh] sm:h-[35vh] md:h-[50vh] bg-white/80 backdrop-blur-2xl rounded-2xl md:rounded-3xl shadow-2xl border border-white/30"
            style={{ filter: "blur(2px)" }}
          />
          <div 
            className="absolute bottom-0 right-0 w-1/2 h-1/4 sm:h-1/3 bg-gradient-to-br from-blue-200/30 via-sky-100/30 to-cyan-100/30 rounded-full blur-2xl" 
          />
        </div>

        <div className="relative max-w-7xl mx-auto text-center z-10">
          {/* Heading - Fully responsive sizing */}
          <h1
            id="upcoming-heading"
            className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 xs:mb-3 sm:mb-4 md:mb-5 bg-gradient-to-r from-blue-800 via-sky-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg tracking-tight px-2"
          >
            Upcoming Innovations - 2025
          </h1>

          {/* Description - Responsive sizing and width */}
          <p 
            id="upcoming-description"
            className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-700 mb-4 xs:mb-6 sm:mb-8 md:mb-10 max-w-xs xs:max-w-sm sm:max-w-2xl md:max-w-3xl lg:max-w-4xl mx-auto px-2"
          >
            Revolutionary technologies in development that will reshape the future of{' '}
            <strong className="text-blue-700">business automation</strong>, {' '}
            <strong className="text-orange-500">payment processing</strong>, and{' '}
            <strong className="text-green-600">digital innovation</strong>. Explore AI agents, secure payment gateways, and marketing automation tools.
          </p>

          {/* Coming Soon Badge - Mobile responsive */}
          <div
            className="inline-block px-3 xs:px-4 sm:px-6 md:px-8 py-1.5 xs:py-2 sm:py-2.5 md:py-3 rounded-full bg-gradient-to-r from-blue-800 via-sky-500 to-cyan-400 text-white font-semibold shadow-lg mb-6 xs:mb-8 sm:mb-10 md:mb-12 lg:mb-16 tracking-wide text-xs xs:text-sm sm:text-base md:text-lg border-2 border-sky-100/40 drop-shadow-xl"
            role="status"
            aria-live="polite"
            aria-label="Coming Soon 2025"
          >
            🚀 Coming Soon - 2025
          </div>

          {/* Feature Cards - Fully Responsive Grid [web:70][web:77] */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6 md:gap-8 lg:gap-10 w-full mb-8 sm:mb-12 md:mb-16 lg:mb-20">
            {features.map((feature, index) => (
              <article
                key={feature.id}
                id={feature.id}
                className="relative bg-white/80 backdrop-blur-xl border border-slate-200 shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden hover:border-blue-200 focus-within:ring-2 focus-within:ring-blue-500 rounded-lg sm:rounded-xl md:rounded-2xl p-4 xs:p-5 sm:p-6 md:p-8 flex flex-col"
                aria-labelledby={`feature-${index}-title`}
                aria-describedby={`feature-${index}-description`}
              >
                {/* Accent gradient ring */}
                <div 
                  className="absolute -top-3 xs:-top-4 left-1/2 -translate-x-1/2 w-10 xs:w-12 sm:w-16 md:w-20 h-10 xs:h-12 sm:h-16 md:h-20 bg-gradient-to-tr from-blue-400 via-sky-300 to-cyan-200 opacity-20 blur-2xl rounded-full z-0 hidden sm:block" 
                  aria-hidden="true"
                />

                {/* Badge - Mobile first approach */}
                <div className="flex justify-end relative z-10 mb-2 xs:mb-3 sm:mb-4">
                  <time
                    className={`text-white text-[10px] xs:text-xs sm:text-sm px-2.5 xs:px-3 sm:px-4 py-1 xs:py-1.5 sm:py-2 rounded-full font-semibold shadow-md ${feature.badgeColor} border border-white/40`}
                    dateTime={`2025-Q${[1, 2, 3][index % 3]}`}
                    aria-label={`Release ${feature.badge}`}
                  >
                    {feature.badge}
                  </time>
                </div>

                {/* Title - Responsive sizing */}
                <h2 
                  id={`feature-${index}-title`}
                  className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-extrabold mb-2 xs:mb-3 sm:mb-4 bg-gradient-to-r from-blue-800 via-sky-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg relative z-10 line-clamp-2"
                >
                  {feature.title}
                </h2>

                {/* Description - Responsive sizing */}
                <p 
                  id={`feature-${index}-description`}
                  className="text-xs xs:text-sm sm:text-base text-gray-700 mb-3 xs:mb-4 sm:mb-5 line-clamp-4 relative z-10 leading-relaxed"
                >
                  {feature.description}
                </p>

                {/* Features List - Responsive */}
                <ul 
                  className="mb-4 xs:mb-5 sm:mb-6 md:mb-8 space-y-1 xs:space-y-1.5 sm:space-y-2 relative z-10"
                  aria-label={`Key features of ${feature.title}`}
                >
                  {feature.points.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 xs:gap-2 text-xs xs:text-sm sm:text-base text-gray-700">
                      <span aria-hidden="true" className="text-blue-600 font-bold mt-0.5 flex-shrink-0">✓</span>
                      <span className="line-clamp-2">{point}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button - Responsive sizing & width control */}
                <button
                  className={`w-full mt-auto px-3 xs:px-4 sm:px-6 md:px-8 py-2 xs:py-2.5 sm:py-3 md:py-3.5 rounded-lg sm:rounded-xl font-bold shadow-md transition-all duration-200 ${feature.buttonColor} border border-white/40 text-xs xs:text-sm sm:text-base md:text-lg text-white hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 active:scale-95`}
                  aria-label={feature.ariaLabel}
                  onClick={() => setExpandedFeature(expandedFeature === feature.id ? null : feature.id)}
                >
                  {feature.button}
                </button>

                {/* Expandable Details - Mobile optimized */}
                {expandedFeature === feature.id && (
                  <div className="mt-3 xs:mt-4 sm:mt-5 pt-3 xs:pt-4 sm:pt-5 border-t border-gray-200 relative z-10">
                    <p className="text-[10px] xs:text-xs sm:text-sm text-gray-600 line-clamp-3">
                      <strong>Focus:</strong> {feature.keyword}
                    </p>
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>

        {/* Innovation Roadmap Section - Responsive spacing */}
        <div className="relative z-10 mt-8 sm:mt-12 md:mt-16 lg:mt-20">
          <InnovationRoadmap />
        </div>
      </section>
    </>
  );
};

export default UpcomingSection;
