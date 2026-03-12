// src/components/InnovationRoadmap.jsx - Fully Responsive Version

import React, { useState } from "react";

// SEO-optimized roadmap data with dates
const roadmapData = [
    {
        id: "q2-ai-agents",
        quarter: "Q2 2025",
        title: "AI Agents Launch",
        description: "Beta release of intelligent automation agents for customer service and data analysis",
        color: "bg-blue-600",
        date: "2025-04-01",
        endDate: "2025-06-30",
        details: "Launch advanced AI automation agents with natural language processing capabilities",
        keywords: "AI agents, automation, customer service automation",
    },
    {
        id: "q3-payment-platform",
        quarter: "Q3 2025",
        title: "Payment Platform",
        description: "Secure payment gateway with global reach and multi-currency support",
        color: "bg-orange-500",
        date: "2025-07-01",
        endDate: "2025-09-30",
        details: "Advanced payment processing with fraud detection and real-time analytics",
        keywords: "payment gateway, secure payments, multi-currency transactions",
    },
    {
        id: "q4-marketing-suite",
        quarter: "Q4 2025",
        title: "Marketing Suite",
        description: "Complete marketing automation platform with AI-powered insights",
        color: "bg-green-600",
        date: "2025-10-01",
        endDate: "2025-12-31",
        details: "Comprehensive marketing automation with campaign management and analytics",
        keywords: "marketing automation, campaign management, AI marketing tools",
    },
    {
        id: "2025-next-generation",
        quarter: "2025",
        title: "Next Generation",
        description: "Revolutionary technologies in development for digital transformation",
        color: "bg-purple-600",
        date: "2025-01-01",
        endDate: "2025-12-31",
        details: "Future innovations including blockchain, IoT integration, and advanced analytics",
        keywords: "digital transformation, emerging technologies, innovation roadmap",
    },
];

const InnovationRoadmap = () => {
    const [expandedPhase, setExpandedPhase] = useState(null);
    const [viewType, setViewType] = useState("cards"); // 'cards' or 'table'

    // Event Schema Markup for SEO
    const eventSchemaList = roadmapData.map((item) => ({
        "@context": "https://schema.org",
        "@type": "Event",
        "@id": `https://yourdomain.com/#${item.id}`,
        "name": `${item.title} - ${item.quarter}`,
        "description": item.description,
        "keywords": item.keywords,
        "startDate": item.date,
        "endDate": item.endDate,
        "eventStatus": "https://schema.org/EventScheduled",
        "eventAttendanceMode": "https://schema.org/OnlineEventAttendanceMode",
        "location": {
            "@type": "VirtualLocation",
            "url": `https://yourdomain.com/#${item.id}`
        },
        "organizer": {
            "@type": "Organization",
            "name": "White Mirror Solutions",
            "url": "https://yourdomain.com"
        },
        "offers": {
            "@type": "Offer",
            "url": `https://yourdomain.com/#${item.id}`,
            "price": "0",
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
            "validFrom": item.date
        }
    }));

    // Combined schema for timeline
    const timelineSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "@id": "https://yourdomain.com/#roadmap",
        "name": "White Mirror Innovation Roadmap 2025",
        "description": "Complete product development roadmap for 2025 including AI agents, payment platforms, and marketing automation suite",
        "itemListElement": roadmapData.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.title,
            "description": item.description,
            "url": `https://yourdomain.com/#${item.id}`,
            "datePublished": item.date
        }))
    };

    return (
        <>
            {/* Event Schema Markup for each roadmap item */}
            {eventSchemaList.map((schema, idx) => (
                <script 
                    key={idx}
                    type="application/ld+json" 
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} 
                />
            ))}

            {/* Timeline Schema Markup */}
            <script 
                type="application/ld+json" 
                dangerouslySetInnerHTML={{ __html: JSON.stringify(timelineSchema) }} 
            />

            <section 
                id="roadmap"
                className="relative py-6 sm:py-8 md:py-12 lg:py-16 px-3 sm:px-4 md:px-6 lg:px-8 text-gray-900 overflow-hidden bg-gradient-to-br from-white via-sky-100 to-cyan-50"
                aria-labelledby="roadmap-heading"
                aria-describedby="roadmap-description"
            >
                {/* Decorative background - hidden on mobile for better performance */}
                <div className="absolute inset-0 pointer-events-none z-0 hidden sm:block" aria-hidden="true">
                    <div
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-[90vw] h-[25vh] sm:h-[35vh] md:h-[50vh] bg-white/80 backdrop-blur-2xl rounded-2xl md:rounded-3xl shadow-2xl border border-white/30"
                        style={{ filter: "blur(2px)" }}
                        aria-hidden="true"
                    />
                    <div 
                        className="absolute bottom-0 right-0 w-1/2 h-1/4 sm:h-1/3 bg-gradient-to-br from-blue-200/30 via-sky-100/30 to-cyan-100/30 rounded-full blur-2xl" 
                        aria-hidden="true"
                    />
                </div>

                <div className="relative max-w-7xl mx-auto text-center z-10">
                    {/* Heading - Responsive sizing */}
                    <h2
                        id="roadmap-heading"
                        className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2 sm:mb-3 md:mb-4 bg-gradient-to-r from-blue-800 via-sky-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg"
                    >
                        Innovation Roadmap 2025
                    </h2>

                    {/* Description - Responsive sizing */}
                    <p
                        id="roadmap-description"
                        className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-6 md:mb-8 max-w-xs xs:max-w-sm sm:max-w-2xl md:max-w-3xl mx-auto px-2"
                    >
                        Our commitment to pushing the boundaries of technology and delivering{' '}
                        <strong className="text-blue-700">cutting-edge AI solutions</strong>, {' '}
                        <strong className="text-orange-500">secure payment processing</strong>, and{' '}
                        <strong className="text-green-600">marketing automation tools</strong> for a brighter tomorrow.
                    </p>

                    {/* View Toggle - Mobile first approach */}
                    <div className="flex justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 md:mb-8 px-2">
                        <button
                            onClick={() => setViewType("cards")}
                            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm font-semibold transition-all duration-200 ${
                                viewType === "cards"
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "bg-white/80 text-blue-600 border border-blue-200 hover:bg-white"
                            }`}
                            aria-label="Switch to card view"
                        >
                            📱 Cards
                        </button>
                        <button
                            onClick={() => setViewType("table")}
                            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded text-xs sm:text-sm font-semibold transition-all duration-200 ${
                                viewType === "table"
                                    ? "bg-blue-600 text-white shadow-md"
                                    : "bg-white/80 text-blue-600 border border-blue-200 hover:bg-white"
                            }`}
                            aria-label="Switch to table view"
                        >
                            📊 Table
                        </button>
                    </div>

                    {/* CARD VIEW - Mobile Optimized */}
                    {viewType === "cards" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8">
                            {roadmapData.map((item, i) => (
                                <article
                                    key={item.id}
                                    id={item.id}
                                    className="relative bg-white/80 backdrop-blur-xl border border-slate-200 shadow-lg hover:shadow-xl transition-shadow duration-300 group cursor-pointer focus-within:ring-2 focus-within:ring-blue-500 rounded-xl sm:rounded-2xl p-3 sm:p-4 md:p-6"
                                    onClick={() => setExpandedPhase(expandedPhase === item.id ? null : item.id)}
                                    aria-labelledby={`roadmap-title-${i}`}
                                    aria-describedby={`roadmap-desc-${i}`}
                                    aria-expanded={expandedPhase === item.id}
                                >
                                    {/* Accent gradient ring */}
                                    <div 
                                        className="absolute -top-2 xs:-top-2.5 left-1/2 -translate-x-1/2 w-8 xs:w-10 sm:w-12 md:w-16 h-8 xs:h-10 sm:h-12 md:h-16 bg-gradient-to-tr from-blue-400 via-sky-300 to-cyan-200 opacity-20 blur-2xl rounded-full z-0" 
                                        aria-hidden="true"
                                    />

                                    <div className="flex flex-col items-center space-y-2 sm:space-y-3 relative z-10">
                                        {/* Timeline Quarter Badge */}
                                        <time
                                            className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-white text-sm xs:text-base sm:text-lg md:text-2xl font-bold shadow-lg border-2 sm:border-3 md:border-4 border-white/40 ${item.color} group-hover:scale-110 transition-transform duration-200`}
                                            dateTime={item.date}
                                            aria-label={`Timeline period ${item.quarter}`}
                                        >
                                            {item.quarter.split(" ")[0]}
                                        </time>

                                        {/* Title - Responsive sizing */}
                                        <h3 
                                            id={`roadmap-title-${i}`}
                                            className="text-xs xs:text-sm sm:text-base md:text-lg font-bold text-gray-900 group-hover:text-sky-700 transition-colors duration-200 text-center"
                                        >
                                            {item.title}
                                        </h3>

                                        {/* Description - Responsive sizing */}
                                        <p 
                                            id={`roadmap-desc-${i}`}
                                            className="text-[10px] xs:text-xs sm:text-sm text-gray-600 text-center line-clamp-3"
                                        >
                                            {item.description}
                                        </p>

                                        {/* Expandable details */}
                                        {expandedPhase === item.id && (
                                            <div
                                                className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-200 w-full text-left transition-all duration-200"
                                            >
                                                <p className="text-[9px] xs:text-[10px] sm:text-xs text-gray-700 font-medium line-clamp-4">
                                                    {item.details}
                                                </p>
                                                <p className="text-[8px] xs:text-[9px] sm:text-xs text-gray-500 mt-1.5">
                                                    <strong>Focus:</strong> {item.keywords}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                    {/* TABLE VIEW - Fully Responsive [web:71] */}
                    {viewType === "table" && (
                        <div className="overflow-x-auto w-full">
                            <table className="w-full border-collapse text-xs sm:text-sm md:text-base">
                                <thead>
                                    <tr className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-400 text-white">
                                        <th className="border border-slate-200 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left font-bold">Quarter</th>
                                        <th className="border border-slate-200 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left font-bold">Product</th>
                                        <th className="border border-slate-200 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left font-bold hidden sm:table-cell">Description</th>
                                        <th className="border border-slate-200 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left font-bold hidden md:table-cell">Start Date</th>
                                        <th className="border border-slate-200 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left font-bold hidden md:table-cell">End Date</th>
                                        <th className="border border-slate-200 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-left font-bold hidden lg:table-cell">Keywords</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {roadmapData.map((item, idx) => (
                                        <tr 
                                            key={item.id}
                                            className="hover:bg-blue-50/50 transition-colors duration-200 border-b border-slate-200 cursor-pointer"
                                            onClick={() => setExpandedPhase(expandedPhase === item.id ? null : item.id)}
                                        >
                                            {/* Quarter - Mobile responsive */}
                                            <td className="border border-slate-200 px-2 sm:px-3 md:px-4 py-2 sm:py-3 font-bold">
                                                <span className={`inline-block px-2 py-1 rounded-full text-white text-xs sm:text-sm font-bold ${item.color}`}>
                                                    {item.quarter.split(" ")[0]}
                                                </span>
                                            </td>

                                            {/* Title - Mobile first */}
                                            <td className="border border-slate-200 px-2 sm:px-3 md:px-4 py-2 sm:py-3 font-bold text-gray-900">
                                                <div className="flex flex-col gap-1">
                                                    <span>{item.title}</span>
                                                    {/* Mobile: Show description in collapsed row */}
                                                    <span className="text-[9px] xs:text-xs text-gray-600 font-normal sm:hidden">
                                                        {item.description.substring(0, 50)}...
                                                    </span>
                                                </div>
                                            </td>

                                            {/* Description - Hidden on mobile */}
                                            <td className="border border-slate-200 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-gray-700 hidden sm:table-cell text-xs sm:text-sm">
                                                {item.description.substring(0, 80)}...
                                            </td>

                                            {/* Start Date - Hidden on tablet */}
                                            <td className="border border-slate-200 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-gray-700 hidden md:table-cell text-xs sm:text-sm">
                                                {new Date(item.date).toLocaleDateString("en-IN")}
                                            </td>

                                            {/* End Date - Hidden on tablet */}
                                            <td className="border border-slate-200 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-gray-700 hidden md:table-cell text-xs sm:text-sm">
                                                {new Date(item.endDate).toLocaleDateString("en-IN")}
                                            </td>

                                            {/* Keywords - Hidden on large screens */}
                                            <td className="border border-slate-200 px-2 sm:px-3 md:px-4 py-2 sm:py-3 text-gray-600 hidden lg:table-cell text-xs">
                                                {item.keywords.substring(0, 30)}...
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Expandable details for table view */}
                    {viewType === "table" && expandedPhase && (
                        <div className="mt-4 sm:mt-6 bg-white/80 backdrop-blur border border-slate-200 rounded-lg sm:rounded-xl p-3 sm:p-4 md:p-6">
                            {roadmapData.map(item => 
                                expandedPhase === item.id && (
                                    <div key={item.id} className="space-y-2 sm:space-y-3">
                                        <h4 className="text-sm sm:text-base md:text-lg font-bold text-gray-900">{item.title}</h4>
                                        <p className="text-xs sm:text-sm text-gray-700">{item.details}</p>
                                        <p className="text-xs sm:text-sm text-gray-600"><strong>Focus Keywords:</strong> {item.keywords}</p>
                                    </div>
                                )
                            )}
                        </div>
                    )}

                    {/* CTA Section - Fully responsive */}
                    <section
                        className="mt-6 sm:mt-8 md:mt-12 bg-white/90 backdrop-blur-2xl border border-slate-200 shadow-2xl p-4 xs:p-5 sm:p-6 md:p-8 lg:p-12 rounded-xl sm:rounded-2xl md:rounded-3xl text-center relative overflow-hidden transition-shadow duration-300 hover:shadow-2xl"
                        aria-labelledby="cta-heading"
                        aria-describedby="cta-description"
                    >
                        <div 
                            className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-700/20 via-sky-400/10 to-cyan-300/10 opacity-80 rounded-xl sm:rounded-2xl md:rounded-3xl" 
                            aria-hidden="true"
                        />

                        <h3 
                            id="cta-heading"
                            className="text-base xs:text-lg sm:text-2xl md:text-3xl font-extrabold mb-2 sm:mb-3 md:mb-4 bg-gradient-to-r from-blue-800 via-sky-500 to-cyan-400 bg-clip-text text-transparent drop-shadow-lg"
                        >
                            Be First to Experience Innovation
                        </h3>

                        <p 
                            id="cta-description"
                            className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-700 mb-4 sm:mb-5 md:mb-8 max-w-xs xs:max-w-sm sm:max-w-2xl md:max-w-3xl mx-auto px-2"
                        >
                            Join our exclusive early access program and get{" "}
                            <strong className="text-sky-700">priority access</strong> to cutting-edge AI agents, secure payment solutions, and marketing automation tools launching in 2025.
                        </p>

                        <div className="flex justify-center gap-2 sm:gap-3 flex-wrap px-2">
                            <button 
                                className="bg-gradient-to-r from-blue-800 via-sky-500 to-cyan-400 text-white font-bold px-3 xs:px-4 sm:px-6 md:px-8 py-2 xs:py-2.5 sm:py-3 rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 text-xs xs:text-sm sm:text-base active:scale-95"
                                aria-label="Get early access to innovation roadmap"
                            >
                                Get Early Access
                            </button>
                            <button 
                                className="bg-white/90 border border-sky-400 text-sky-700 font-semibold px-3 xs:px-4 sm:px-6 md:px-8 py-2 xs:py-2.5 sm:py-3 rounded-lg sm:rounded-xl shadow hover:bg-sky-50 hover:text-sky-900 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-400 transition-all duration-200 text-xs xs:text-sm sm:text-base active:scale-95"
                                aria-label="Learn more about our innovation roadmap"
                            >
                                Learn More
                            </button>
                        </div>
                    </section>
                </div>
            </section>
        </>
    );
};

export default InnovationRoadmap;
