// src/components/ServicesSection.jsx - Fully Responsive & SEO-Friendly

import React from 'react';

// Service data with SEO keywords
const defaultServices = [
  {
    title: 'App Development',
    desc: 'Custom mobile and web apps for business growth and digital transformation.',
    icon: 'https://img.icons8.com/?size=100&id=Nopy6eQh4zfT&format=png&color=000000',
    features: ['CMS Integration', 'API Development', 'Cross-Platform'],
    accent: 'bg-blue-100',
    keywords: 'mobile app development, web application development',
  },
  {
    title: 'Restaurant SaaS',
    desc: 'Complete restaurant management platform for efficient operations.',
    icon: 'https://img.icons8.com/?size=100&id=115346&format=png&color=000000',
    features: ['Point of Sale System', 'Inventory Management', 'Real-time Analytics'],
    accent: 'bg-amber-100',
    keywords: 'restaurant management software, POS system',
  },
  {
    title: 'Cloud Solutions',
    desc: 'Secure, scalable cloud infrastructure and seamless migration services.',
    icon: 'https://img.icons8.com/color/48/000000/cloud.png',
    features: ['AWS/Azure', 'DevOps', 'Data Backup'],
    accent: 'bg-green-100',
    keywords: 'cloud infrastructure, AWS solutions, cloud migration',
  },
  {
    title: 'Web Development',
    desc: 'Custom websites and web applications built with modern technologies.',
    icon: 'https://img.icons8.com/color/48/000000/source-code.png',
    features: ['Responsive Design', 'E-commerce Solutions', 'CMS Integration'],
    accent: 'bg-blue-100',
    keywords: 'custom web development, e-commerce websites',
  },
  {
    title: 'Digital Marketing',
    desc: 'SEO, SEM, and social media strategies for business visibility.',
    icon: 'https://img.icons8.com/?size=100&id=xOxAdcl6DVo2&format=png&color=000000',
    features: ['SEO/SEM', 'Content Strategy', 'Analytics'],
    accent: 'bg-amber-100',
    keywords: 'digital marketing services, SEO, social media marketing',
  },
  {
    title: 'IT Consulting',
    desc: 'Expert advice for digital transformation and technology strategy.',
    icon: 'https://img.icons8.com/?size=100&id=R1kC9AoaoQgQ&format=png&color=000000',
    features: ['Strategy', 'Security', 'Process Audit'],
    accent: 'bg-green-100',
    keywords: 'IT consulting, digital transformation, tech strategy',
  },
];

const defaultProcessSteps = [
  { title: 'Planning', desc: 'We analyze your needs and define a clear roadmap.', icon: '📝' },
  { title: 'Design', desc: 'Wireframes, prototypes, and UI/UX for every device.', icon: '🎨' },
  { title: 'Development', desc: 'Agile coding, integrations, and rigorous testing.', icon: '💻' },
  { title: 'Launch & Support', desc: 'Go live with confidence and ongoing support.', icon: '🚀' },
];

// Service Card - Responsive & Semantic
function ServiceCard({ icon, title, desc, features, accent, keywords }) {
  return (
    <article
      className={`relative bg-white/80 backdrop-blur border border-gray-200 p-3 xs:p-4 sm:p-6 md:p-8 rounded-lg sm:rounded-xl md:rounded-2xl flex flex-col items-center text-center shadow-md hover:shadow-lg transition-shadow duration-200 ${accent}`}
      itemScope
      itemType="https://schema.org/Service"
    >
      {/* Icon */}
      <div className="mb-3 xs:mb-4 sm:mb-5">
        <img 
          src={icon} 
          alt={`${title} service icon`} 
          className="h-10 w-10 xs:h-12 xs:w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 mx-auto object-contain" 
          loading="lazy"
        />
      </div>

      {/* Title */}
      <h3 className="text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mb-1 xs:mb-2 sm:mb-3" itemProp="name">
        {title}
      </h3>

      {/* Description */}
      <p className="text-xs xs:text-sm sm:text-base text-gray-700 mb-3 xs:mb-4 sm:mb-5 line-clamp-3" itemProp="description">
        {desc}
      </p>

      {/* Features List */}
      <ul className="space-y-1 xs:space-y-1.5 sm:space-y-2 w-full max-w-xs mx-auto text-left mb-3 xs:mb-4">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-xs xs:text-sm">
            <span className="inline-block w-1.5 h-1.5 xs:w-2 xs:h-2 rounded-full bg-blue-400 mt-1 flex-shrink-0" aria-hidden="true"></span>
            <span className="text-gray-700">{f}</span>
          </li>
        ))}
      </ul>

      {/* Hidden Schema Data */}
      <meta itemProp="provider" content="White Mirror Solutions" />
      <meta itemProp="areaServed" content="IN" />
    </article>
  );
}

// Process Step - Responsive
function ProcessStep({ icon, title, desc, index }) {
  return (
    <section className="flex flex-col items-center text-center bg-white rounded-lg sm:rounded-xl border border-gray-200 p-3 xs:p-4 sm:p-6 md:p-8 shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-blue-500 text-white font-bold text-base xs:text-lg sm:text-xl mb-3 xs:mb-4 sm:mb-5" aria-hidden="true">
        {icon}
      </div>
      <h4 className="text-sm xs:text-base sm:text-lg font-bold text-gray-900 mb-1 xs:mb-2 sm:mb-3">{title}</h4>
      <p className="text-xs xs:text-sm text-gray-600 leading-relaxed">{desc}</p>
    </section>
  );
}

function ServicesSection({ services = defaultServices, processSteps = defaultProcessSteps }) {
  // Organization Service Schema [web:142][web:143]
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "itemListElement": services.map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Service",
        "@id": `https://yourdomain.com/#service-${service.title.toLowerCase().replace(/\s+/g, '-')}`,
        "name": service.title,
        "description": service.desc,
        "provider": {
          "@type": "Organization",
          "name": "White Mirror Solutions",
          "url": "https://yourdomain.com"
        },
        "areaServed": "IN",
        "serviceType": service.keywords
      }
    }))
  };

  return (
    <>
      {/* Service Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <section 
        id="services" 
        className="relative py-6 sm:py-12 md:py-16 lg:py-20 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12 bg-gradient-to-br from-white via-sky-100 to-cyan-50 overflow-hidden"
        aria-labelledby="services-heading"
        aria-describedby="services-description"
      >
        {/* Decorative background - hidden on mobile */}
        <div className="absolute inset-0 pointer-events-none z-0 hidden sm:block" aria-hidden="true">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[60vh] bg-white/80 rounded-3xl shadow-inner border border-white/30" />
          <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-gradient-to-br from-blue-200/30 via-sky-100/30 to-cyan-100/30 rounded-full" />
        </div>

        <div className="relative max-w-7xl mx-auto z-10">
          {/* Section Header - Fully responsive */}
          <header className="text-center mb-6 xs:mb-8 sm:mb-12 md:mb-16">
            <h2 
              id="services-heading"
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 xs:mb-3 sm:mb-4 bg-gradient-to-r from-blue-800 via-sky-600 to-cyan-500 bg-clip-text text-transparent"
            >
              Our Services
            </h2>
            <p 
              id="services-description"
              className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-700 max-w-xs xs:max-w-sm sm:max-w-2xl md:max-w-3xl mx-auto px-2"
            >
              Comprehensive IT solutions tailored to your business needs, delivered with <strong>innovation</strong> and <strong>expertise</strong>. From web development to restaurant management systems, we've got you covered.
            </p>
          </header>

          {/* Services Grid - Fully responsive [web:70][web:77] */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16 lg:mb-20">
            {services.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>

          {/* Development Process Section - Responsive */}
          <section 
            className="bg-white/80 backdrop-blur border border-gray-200 rounded-lg sm:rounded-xl md:rounded-2xl p-4 xs:p-6 sm:p-8 md:p-12 max-w-5xl mx-auto mb-8 sm:mb-12 md:mb-16 shadow-lg"
            aria-labelledby="process-heading"
          >
            <h3 
              id="process-heading"
              className="text-base xs:text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 xs:mb-3 sm:mb-4 text-center"
            >
              Our Development Process
            </h3>
            <p className="text-xs xs:text-sm sm:text-base text-gray-700 mb-4 xs:mb-6 sm:mb-8 text-center max-w-2xl mx-auto">
              We follow a proven, agile methodology to deliver high-quality solutions on time and within budget.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 md:gap-8">
              {processSteps.map((step, idx) => (
                <ProcessStep key={step.title} {...step} index={idx + 1} />
              ))}
            </div>
          </section>

          {/* Call to Action - Responsive */}
          <div className="text-center bg-white/80 backdrop-blur border border-gray-200 rounded-lg sm:rounded-xl md:rounded-2xl p-4 xs:p-6 sm:p-8 md:p-12 max-w-3xl mx-auto shadow-lg">
            <h3 className="text-base xs:text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 mb-1 xs:mb-2 sm:mb-3">
              Ready to Transform Your Business?
            </h3>
            <p className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-700 mb-4 xs:mb-5 sm:mb-6 max-w-xs xs:max-w-sm sm:max-w-xl mx-auto">
              Let's discuss your project and build something amazing together.
            </p>

            <div className="flex flex-col xs:flex-row gap-3 xs:gap-4 sm:gap-5 items-stretch xs:items-center justify-center w-full max-w-md xs:max-w-lg mx-auto">
              <button
                className="flex-1 xs:flex-none xs:min-w-[180px] md:min-w-[200px] px-4 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold rounded-lg sm:rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 text-xs xs:text-sm sm:text-base active:scale-95"
                onClick={() => {
                  const contact = document.getElementById('contact');
                  if (contact) contact.scrollIntoView({ behavior: 'smooth' });
                }}
                aria-label="Get Free Consultation"
              >
                Get Free Consultation
              </button>

              <button
                className="flex-1 xs:flex-none xs:min-w-[180px] md:min-w-[200px] px-4 xs:px-6 sm:px-8 py-2.5 xs:py-3 sm:py-3.5 border-2 border-sky-300 bg-white hover:bg-sky-50 text-sky-700 font-bold rounded-lg sm:rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-offset-2 text-xs xs:text-sm sm:text-base active:scale-95"
                onClick={() => {
                  window.location.href = '#portfolio';
                }}
                aria-label="View Portfolio"
              >
                View Portfolio
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ServicesSection;
