// src/components/TimelineItem.jsx - Fully Responsive & SEO-Friendly (No Animations)

import React from 'react';

function TimelineItem({ quarter, title, description, isActive = false, index = 0 }) {
  return (
    <article
      className="relative flex flex-col items-center text-center px-3 xs:px-4 sm:px-5 md:px-6 py-4 xs:py-5 sm:py-6 min-w-max sm:min-w-[140px] md:min-w-[160px] lg:min-w-[180px] group bg-gradient-to-br from-white via-sky-100 to-cyan-50/80 backdrop-blur-xl border border-sky-100 shadow-lg hover:shadow-xl transition-all duration-200 hover:-translate-y-1 hover:border-blue-400 rounded-lg sm:rounded-xl md:rounded-2xl overflow-visible focus:outline-none focus:ring-2 focus:ring-blue-500"
      tabIndex={0}
      role="region"
      aria-label={`Timeline item: ${title}`}
      aria-current={isActive ? "true" : "false"}
    >
      {/* Decorative accent - hidden on mobile */}
      <div 
        className="absolute -top-3 xs:-top-4 left-1/2 -translate-x-1/2 w-12 xs:w-14 sm:w-16 h-12 xs:h-14 sm:h-16 bg-gradient-to-tr from-blue-400 via-sky-300 to-cyan-200 opacity-10 hover:opacity-20 transition-opacity blur-2xl rounded-full z-0 hidden sm:block" 
        aria-hidden="true"
      />

      {/* Timeline Dot + Line */}
      <div className="flex flex-col items-center relative z-10 mb-2 xs:mb-3">
        {/* Dot */}
        <div
          className={`w-4 xs:w-5 sm:w-6 h-4 xs:h-5 sm:h-6 rounded-full mb-2 border-3 xs:border-4 transition-all duration-200 group-hover:scale-110 shadow-md ${
            isActive
              ? 'bg-gradient-to-tr from-blue-700 via-sky-400 to-cyan-400 border-sky-200 scale-110'
              : 'bg-gray-300 border-gray-200'
          }`}
          aria-hidden="true"
        />
        
        {/* Connecting line (vertical for horizontal timeline) */}
        <div className="h-8 xs:h-10 sm:h-12 w-0.5 bg-gradient-to-b from-blue-200 via-slate-200 to-cyan-200 mx-auto" aria-hidden="true" />
      </div>

      {/* Quarter - Responsive sizing */}
      <div className="text-[10px] xs:text-xs sm:text-sm uppercase text-gray-500 mb-1 xs:mb-1.5 tracking-wide font-semibold relative z-10">
        {quarter}
      </div>

      {/* Title - Responsive sizing */}
      <h3 className="text-sm xs:text-base sm:text-lg md:text-xl font-bold bg-gradient-to-r from-blue-800 via-sky-600 to-cyan-500 bg-clip-text text-transparent mb-1 xs:mb-2 sm:mb-2.5 group-hover:text-sky-700 transition-colors duration-200 drop-shadow relative z-10 line-clamp-2">
        {title}
      </h3>

      {/* Description - Responsive sizing */}
      {description && (
        <p className="text-xs xs:text-xs sm:text-sm text-gray-600 mt-1 xs:mt-1.5 relative z-10 line-clamp-3 leading-relaxed">
          {description}
        </p>
      )}

      {/* Semantic time information */}
      <time className="sr-only" dateTime={`2025-${quarter.match(/Q(\d)/)?.[1] || '1'}`}>
        {quarter}
      </time>
    </article>
  );
}

export default TimelineItem;
