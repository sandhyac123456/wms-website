// ==========================================
// src/components/JobListings.jsx - Simple & Clean
// ==========================================

import { useEffect, useState } from "react";
import { getAllJobs } from "../Service/Operation/jobApi";
import ApplyModal from "./ApplyModal";

const JobListings = () => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch jobs on mount
  useEffect(() => {
    fetchJobs();
  }, []);

  // Fetch jobs function
  const fetchJobs = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getAllJobs(1, 10);
      if (response.success) {
        setJobs(response.data || []);
      } else {
        setError(response.message || "Failed to load jobs");
      }
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to load job listings");
    } finally {
      setLoading(false);
    }
  };

  // Generate JobPosting Schema for each job
  const generateJobSchema = (job) => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "datePosted": new Date().toISOString(),
    "validThrough": new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    "employmentType": job.jobType || "FULL_TIME",
    "hiringOrganization": {
      "@type": "Organization",
      "name": "White Mirror Solutions",
      "sameAs": "https://yourdomain.com"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": job.location || "Indore",
        "addressCountry": "IN"
      }
    }
  });

  return (
    <>
      {/* Schema Markup */}
      {jobs.map((job, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(generateJobSchema(job)) }}
        />
      ))}

      <section
        id="job-listings"
        className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-6 sm:py-10 md:py-16 lg:py-20 px-3 xs:px-4 sm:px-6 md:px-8 lg:px-12"
        aria-labelledby="job-listings-heading"
        aria-describedby="job-listings-description"
      >
        <div className="w-full max-w-7xl mx-auto">
          {/* Header */}
          <header className="text-center mb-6 sm:mb-10 md:mb-12 lg:mb-16">
            <h1
              id="job-listings-heading"
              className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-2 sm:mb-3 md:mb-4"
            >
              <span className="bg-gradient-to-r from-blue-700 via-blue-600 to-blue-800 bg-clip-text text-transparent">
                Current Openings
              </span>
            </h1>
            <p
              id="job-listings-description"
              className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-700 max-w-xs xs:max-w-sm sm:max-w-2xl mx-auto"
            >
              Join our team and be part of an innovative organization driving digital transformation.
            </p>

            <div className="flex justify-center mt-4 sm:mt-6">
              <div className="h-1 w-16 sm:w-20 md:w-24 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
            </div>
          </header>

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-12 sm:py-16">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-600 text-sm sm:text-base">Loading job opportunities...</p>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div role="alert" className="bg-red-50 border-l-4 border-red-500 text-red-700 px-4 py-4 rounded-lg mb-8 text-sm sm:text-base">
              <strong>Error:</strong> {error}
            </div>
          )}

          {/* Empty */}
          {!loading && jobs.length === 0 && (
            <div className="text-center py-12 sm:py-16 bg-white/80 rounded-lg border border-blue-100">
              <p className="text-gray-600 text-sm sm:text-base md:text-lg">
                No job openings available at the moment. Check back soon!
              </p>
            </div>
          )}

          {/* Jobs Grid */}
          {!loading && jobs.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-6 md:gap-8">
              {jobs.map((job, index) => (
                <article
                  key={job._id || index}
                  className="bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg border border-blue-100 p-4 xs:p-5 sm:p-6 md:p-8 flex flex-col transition-all duration-200 hover:-translate-y-1 sm:hover:-translate-y-2 hover:shadow-xl group overflow-hidden"
                  itemScope
                  itemType="https://schema.org/JobPosting"
                >
                  {/* Accent */}
                  <div className="absolute -top-6 -right-6 opacity-5 group-hover:opacity-10 transition-opacity duration-300 hidden sm:block" aria-hidden="true">
                    <svg width="80" height="80" fill="none" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="40" fill="#3B82F6" />
                    </svg>
                  </div>

                  {/* Title */}
                  <h2
                    className="text-lg xs:text-xl sm:text-2xl font-bold text-blue-700 mb-1 xs:mb-2 sm:mb-3 line-clamp-2 relative z-10"
                    itemProp="title"
                  >
                    {job.title}
                  </h2>

                  {/* Department */}
                  {job.department && (
                    <p className="text-xs xs:text-sm sm:text-base text-blue-600 font-semibold mb-2 relative z-10">
                      {job.department}
                    </p>
                  )}

                  {/* Meta */}
                  <div className="flex flex-col xs:flex-row gap-2 xs:gap-3 mb-3 xs:mb-4 sm:mb-5 text-gray-600 text-xs xs:text-sm relative z-10">
                    {job.location && (
                      <span className="flex items-center gap-1" itemProp="jobLocation">
                        <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 2C6.13 2 3 5.13 3 9c0 5.25 7 9 7 9s7-3.75 7-9c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 10 6a2.5 2.5 0 0 1 0 5.5z" />
                        </svg>
                        {job.location}
                      </span>
                    )}
                    {job.jobType && (
                      <span className="flex items-center gap-1" itemProp="employmentType">
                        <svg className="w-4 h-4 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M6 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6zm0 2h8v12H6V4zm2 2v8h4V6H8z" />
                        </svg>
                        {job.jobType}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p
                    className="text-gray-700 flex-1 mb-4 xs:mb-5 sm:mb-6 line-clamp-3 sm:line-clamp-4 text-xs xs:text-sm sm:text-base leading-relaxed relative z-10"
                    itemProp="description"
                  >
                    {job.description}
                  </p>

                  {/* Schema Meta */}
                  <meta itemProp="datePosted" content={new Date().toISOString()} />
                  <meta itemProp="validThrough" content={new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()} />

                  {/* Button */}
                  <button
                    className="w-full mt-auto px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-bold rounded-lg sm:rounded-xl shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 active:scale-95 text-xs xs:text-sm sm:text-base relative z-10"
                    onClick={() => setSelectedJob(job)}
                    aria-label={`Apply for ${job.title}`}
                  >
                    Apply Now
                  </button>

                  {/* Bottom accent */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </article>
              ))}
            </div>
          )}

          {/* Modal */}
          {selectedJob && (
            <ApplyModal job={selectedJob} onClose={() => setSelectedJob(null)} />
          )}
        </div>
      </section>
    </>
  );
};

export default JobListings;
