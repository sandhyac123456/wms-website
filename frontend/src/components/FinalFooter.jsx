// src/components/FooterCombined.jsx - Fully Responsive & SEO-Friendly (No Animations)

import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const defaultQuickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Upcoming', href: '#upcoming' },
    { label: 'Contact', href: '#contact' },
    { label: 'Career', href: '#career' },
];

const defaultServices = [
    { label: 'App Development', icon: '💻' },
    { label: 'Restaurant SaaS', icon: '🍽' },
    { label: 'Cloud Solutions', icon: '☁' },
    { label: 'Web Development', icon: '🌐' },
    { label: 'Digital Marketing', icon: '📈' },
    { label: 'IT Consulting', icon: '🧑‍💼' },
];

const defaultContact = [
    { icon: '📍', label: 'Indore, Madhya Pradesh' },
    { icon: '📞', label: '+91 79874-35108' },
    { icon: '✉', label: 'contact@whitemirror.in' },
];

const socials = [
    {
        icon: <FaGithub />,
        href: 'https://github.com/WhiteMirrorSolutions',
        label: 'GitHub',
        ariaLabel: 'Visit our GitHub profile',
    },
    {
        icon: <FaLinkedin />,
        href: 'https://linkedin.com/company/whitemirror',
        label: 'LinkedIn',
        ariaLabel: 'Visit our LinkedIn page',
    },
    {
        icon: <FaTwitter />,
        href: 'https://twitter.com/whitemirrorai',
        label: 'Twitter',
        ariaLabel: 'Follow us on Twitter',
    },
    {
        icon: <FaInstagram />,
        href: 'https://instagram.com/whitemirrorai',
        label: 'Instagram',
        ariaLabel: 'Follow us on Instagram',
    },
    {
        icon: <FaWhatsapp />,
        href: 'https://wa.me/917987435108',
        label: 'WhatsApp',
        ariaLabel: 'Contact us on WhatsApp',
    },
];

const FooterCombined = ({
    showSocials = true,
    quickLinks = defaultQuickLinks,
    services = defaultServices,
    contactDetails = defaultContact,
    address = '669, A-2, SCH No.136, Indore-452010',
    phoneNumber = '+91 79874-35108',
    companyName = 'White Mirror Solutions',
    companyUrl = 'https://whitemirror.in',
}) => {
    // Organization Schema Markup for SEO [web:34][web:37][web:40]
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": `${companyUrl}/#organization`,
        "name": companyName,
        "url": companyUrl,
        "logo": `${companyUrl}/logo.png`,
        "description": "White Mirror Solutions - Expert MERN stack development, restaurant management systems, AI voice agents, and digital transformation services.",
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
            "telephone": phoneNumber,
            "email": "contact@whitemirror.in",
            "availableLanguage": ["en", "hi"]
        },
        "sameAs": [
            "https://github.com/WhiteMirrorSolutions",
            "https://linkedin.com/company/whitemirror",
            "https://twitter.com/whitemirrorai",
            "https://instagram.com/whitemirrorai"
        ]
    };

    return (
        <>
            {/* Schema Markup - placed in footer for SEO [web:31][web:34] */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />

            {/* Main Footer Section - Semantic HTML [web:36][web:113] */}
            <footer
                className="relative bg-gradient-to-br from-white via-sky-100 to-cyan-50 py-6 sm:py-8 md:py-10 lg:py-12 xl:py-16 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden border-t border-blue-100/40 shadow-xl"
                aria-label="Site footer"
            >
                {/* Decorative background SVG - hidden on mobile for performance */}
                <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[200px] z-0 pointer-events-none hidden sm:block" aria-hidden="true">
                    <svg width="600" height="200" viewBox="0 0 600 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <radialGradient id="footerMainBlobLight" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.18" />
                                <stop offset="100%" stopColor="#a21caf" stopOpacity="0.06" />
                            </radialGradient>
                        </defs>
                        <ellipse cx="300" cy="100" rx="260" ry="70" fill="url(#footerMainBlobLight)" />
                    </svg>
                </div>

                {/* Main Content Grid - Fully responsive */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 xs:gap-5 sm:gap-6 md:gap-8 lg:gap-10 relative z-10">
                    
                    {/* Company Information - Responsive sizing */}
                    <section aria-labelledby="company-info-heading" className="col-span-1 xs:col-span-1 sm:col-span-1 md:col-span-1">
                        <h3 id="company-info-heading" className="text-base xs:text-lg sm:text-xl md:text-2xl font-extrabold text-gray-900 flex items-center gap-1 xs:gap-2 mb-2 xs:mb-3 hover:text-blue-600 transition-colors duration-200">
                            White Mirror <span className="text-sky-500">Solutions</span>
                        </h3>
                        <p className="text-xs xs:text-sm sm:text-base text-gray-600 mb-2 xs:mb-3 leading-relaxed">
                            Elevating Digital Innovation with MERN stack, AI solutions, and restaurant management systems.
                        </p>
                        <div className="h-0.5 xs:h-1 w-10 xs:w-12 sm:w-16 bg-gradient-to-r from-blue-800 via-sky-500 to-cyan-400 rounded-full"></div>
                    </section>

                    {/* Quick Links & Services - Responsive grid */}
                    <div className="col-span-1 xs:col-span-2 sm:col-span-2 md:col-span-2 flex flex-col xs:flex-row gap-3 xs:gap-4 sm:gap-6 md:gap-8 w-full">
                        
                        {/* Quick Links Navigation - Responsive */}
                        <nav aria-labelledby="quick-links-heading" className="flex-1">
                            <h3 id="quick-links-heading" className="text-xs xs:text-sm sm:text-base font-bold text-gray-900 mb-2 xs:mb-2.5 sm:mb-3">
                                Quick Links
                            </h3>
                            <ul className="space-y-0.5 xs:space-y-1 sm:space-y-1.5">
                                {quickLinks.map((link) => (
                                    <li key={link.label}>
                                        <a
                                            href={link.href}
                                            className="text-[10px] xs:text-xs sm:text-sm text-gray-700 hover:text-blue-600 hover:underline underline-offset-2 transition-all duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        {/* Services - Responsive */}
                        <section aria-labelledby="services-heading" className="flex-1">
                            <h3 id="services-heading" className="text-xs xs:text-sm sm:text-base font-bold text-gray-900 mb-2 xs:mb-2.5 sm:mb-3">
                                Services
                            </h3>
                            <ul className="space-y-0.5 xs:space-y-1 sm:space-y-1.5">
                                {services.map((srv) => (
                                    <li key={srv.label} className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 text-[10px] xs:text-xs sm:text-sm text-gray-700 hover:text-blue-600 transition-colors duration-200">
                                        <span aria-hidden="true" className="text-xs xs:text-sm sm:text-base flex-shrink-0">
                                            {srv.icon}
                                        </span>
                                        <span className="line-clamp-1">{srv.label}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    {/* Contact Information - Responsive sizing */}
                    <section aria-labelledby="contact-heading" className="col-span-1 xs:col-span-2 sm:col-span-1 md:col-span-1">
                        <h3 id="contact-heading" className="text-xs xs:text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-2 xs:mb-2.5 sm:mb-3">
                            Get in Touch
                        </h3>
                        <address className="space-y-1 xs:space-y-1.5 sm:space-y-2 mb-3 xs:mb-4 not-italic">
                            {contactDetails.map((c) => (
                                <div key={c.label} className="flex items-start gap-2 xs:gap-2.5 sm:gap-3">
                                    <span className="bg-blue-100 text-blue-600 w-6 h-6 xs:w-7 xs:h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-full text-xs xs:text-sm sm:text-base shadow-md flex-shrink-0" aria-hidden="true">
                                        {c.icon}
                                    </span>
                                    <span className="text-gray-700 font-medium text-xs xs:text-xs sm:text-sm md:text-base line-clamp-2">
                                        {c.label}
                                    </span>
                                </div>
                            ))}
                        </address>

                        {/* Social Media Links - Responsive spacing */}
                        {showSocials && (
                            <nav aria-label="Social media links" className="flex gap-2 xs:gap-3 sm:gap-4 mt-3 xs:mt-4 sm:mt-5">
                                {socials.map((s) => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={s.ariaLabel}
                                        title={s.label}
                                        className="text-base xs:text-lg sm:text-xl md:text-2xl text-gray-400 hover:text-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-full p-1.5 xs:p-2 hover:scale-110 active:scale-95"
                                    >
                                        {s.icon}
                                    </a>
                                ))}
                            </nav>
                        )}
                    </section>
                </div>

                {/* Divider and Copyright - Responsive typography */}
                <div className="border-t border-blue-100/40 mt-4 xs:mt-5 sm:mt-6 md:mt-8 lg:mt-10 pt-3 xs:pt-4 sm:pt-5 md:pt-6 relative z-10">
                    <div className="text-[9px] xs:text-xs sm:text-sm text-gray-500 text-center space-y-1 xs:space-y-1.5 sm:space-y-2">
                        <p className="leading-relaxed">
                            © {new Date().getFullYear()} <strong className="text-gray-700">White Mirror Solutions</strong>. All rights reserved.
                        </p>
                        <p className="flex justify-center gap-2 xs:gap-3 flex-wrap">
                            <a href={`${companyUrl}/privacy-policy`} className="hover:text-blue-600 hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1">
                                Privacy Policy
                            </a>
                            <span aria-hidden="true">•</span>
                            <a href={`${companyUrl}/terms-of-service`} className="hover:text-blue-600 hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1">
                                Terms of Service
                            </a>
                        </p>
                        <p>
                            Built with <span className="text-pink-400">❤</span> by WMS development team.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default FooterCombined;
