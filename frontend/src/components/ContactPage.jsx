// src/components/ContactPage.jsx - Fully Responsive & SEO-Friendly

import React, { useEffect, useState } from "react";
import axios from "axios";

const ContactPage = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    number: "",
    subject: "",
    message: "",
  });
  const [customSubject, setCustomSubject] = useState("");
  const [showOtherInput, setShowOtherInput] = useState(false);
  const [services, setServices] = useState([]);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  // Meta tags & SEO
  useEffect(() => {
    document.title = "Contact Us - White Mirror | MERN Stack Development & AI Solutions";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Get in touch with White Mirror for restaurant management systems, MERN stack development, and AI voice agents. We respond within 24 hours.");
    }
  }, []);

  // Contact Page Schema Markup [web:19]
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "mainEntity": {
      "@type": "LocalBusiness",
      "name": "White Mirror Solutions",
      "image": "https://yourdomain.com/logo.png",
      "description": "MERN stack development, restaurant management systems, AI voice agents, and digital solutions.",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "669, A-2, SCH No.136",
        "addressLocality": "Indore",
        "addressRegion": "MP",
        "postalCode": "452010",
        "addressCountry": "IN"
      },
      "telephone": "+91 79874-35108",
      "email": "info@whitemirror.com",
      "url": "https://yourdomain.com",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "Customer Service",
        "telephone": "+91 79874-35108",
        "email": "info@whitemirror.com",
        "availableLanguage": ["en", "hi"]
      }
    }
  };

  // Fetch services
  useEffect(() => {
    let cancelled = false;
    
    axios.get("/api/services")
      .then(res => {
        if (cancelled) return;
        
        if (Array.isArray(res.data)) {
          setServices(res.data);
        } else if (res.data?.services && Array.isArray(res.data.services)) {
          setServices(res.data.services);
        } else {
          setServices([]);
        }
      })
      .catch(err => {
        if (!cancelled) {
          console.error("Failed to load services:", err);
          setServices([]);
        }
      });
    
    return () => { cancelled = true; };
  }, []);

  // Validation functions
  const validateEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePhone = phone => phone === "" || /^[6-9]\d{9}$/.test(phone);

  const validateForm = () => {
    const errors = {};
    
    if (!form.fullName.trim()) errors.fullName = "Full name is required";
    if (!validateEmail(form.email.trim())) errors.email = "Valid email is required";
    if (form.number && !validatePhone(form.number.trim())) errors.phone = "Valid 10-digit phone is required";
    if (!form.subject && !showOtherInput) errors.subject = "Please select a service";
    if (showOtherInput && !customSubject.trim()) errors.customSubject = "Please enter service details";
    if (!form.message.trim() || form.message.trim().length < 20) errors.message = "Message must be at least 20 characters";
    
    return errors;
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) setFieldErrors(prev => ({ ...prev, [name]: "" }));
    
    if (name === "subject") {
      setShowOtherInput(value === "Other");
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (isSubmitting) return;

    setSuccess("");
    setError("");
    setShowSuccess(false);

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError("Please fix the errors above.");
      return;
    }

    setIsSubmitting(true);

    try {
      const finalSubject = showOtherInput ? customSubject.trim() : form.subject;

      await axios.post("http://localhost:3000/api/v1/contact/create", {
        ...form,
        subject: finalSubject,
      });

      if (showOtherInput && customSubject.trim()) {
        try {
          await axios.post("http://localhost:3000/api/v1/services", { title: customSubject.trim() });
        } catch (err) {
          console.warn("Could not save custom service:", err);
        }
      }

      setSuccess("Message sent successfully! We'll respond within 24 hours.");
      setShowSuccess(true);
      setForm({ fullName: "", email: "", number: "", subject: "", message: "" });
      setCustomSubject("");
      setShowOtherInput(false);
      setFieldErrors({});
      setTimeout(() => setShowSuccess(false), 3500);
    } catch (err) {
      setError(err?.response?.data?.message || "Something went wrong! Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Schema Markup */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }} />

      <section 
        id="contact" 
        className="w-full min-h-screen py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 px-3 sm:px-4 md:px-6 lg:px-8 bg-gradient-to-br from-white via-sky-100 to-cyan-50 overflow-hidden"
        aria-labelledby="contact-heading"
        aria-describedby="contact-description"
      >
        {/* Success Toast - Responsive positioning */}
        {showSuccess && (
          <div
            role="status"
            aria-live="polite"
            className="fixed top-4 xs:top-6 left-4 right-4 xs:left-1/2 xs:-translate-x-1/2 xs:max-w-sm z-50 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 xs:px-6 py-3 rounded-lg xs:rounded-xl shadow-lg font-semibold text-xs xs:text-sm sm:text-base"
          >
            ✅ {success}
          </div>
        )}

        {/* Header - Fully responsive */}
        <div className="text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 xl:mb-16 px-2">
          <h1 
            id="contact-heading"
            className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold mb-2 xs:mb-3 sm:mb-4 bg-gradient-to-r from-blue-800 via-sky-500 to-cyan-400 bg-clip-text text-transparent"
          >
            Get in Touch
          </h1>
          <p 
            id="contact-description"
            className="text-xs xs:text-sm sm:text-base md:text-lg text-gray-700 max-w-xs xs:max-w-sm sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto px-2"
          >
            Ready to transform your business? Let's talk about your next project.
          </p>
        </div>

        {/* Main Content Grid - Responsive layout */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4 xs:gap-6 sm:gap-8 md:gap-10 lg:gap-12">
          
          {/* Form Section */}
          <div className="bg-white/80 border border-blue-100 rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg p-4 xs:p-5 sm:p-6 md:p-8 backdrop-blur-md">
            <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl font-bold text-blue-900 mb-1 xs:mb-2">Let's Start a Conversation</h2>
            <p className="text-xs xs:text-sm sm:text-base text-gray-600 mb-4 xs:mb-5 sm:mb-6">Fill out the form below and we'll respond within 24 hours.</p>

            {error && (
              <div 
                role="alert" 
                aria-live="assertive"
                className="bg-red-100 border-l-4 border-red-500 text-red-700 px-3 xs:px-4 py-2 xs:py-3 rounded-md mb-4 xs:mb-5 sm:mb-6 text-xs xs:text-sm"
              >
                <strong>Error:</strong> {error}
              </div>
            )}

            <form className="space-y-3 xs:space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
              {/* Full Name & Email */}
              <fieldset>
                <legend className="sr-only">Personal Information</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 sm:gap-5">
                  <div>
                    <label htmlFor="fullName" className="block text-xs xs:text-sm font-semibold text-blue-900 mb-1">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      name="fullName"
                      required
                      placeholder="Enter your full name"
                      className={`w-full p-2 xs:p-2.5 sm:p-3 bg-white border rounded-lg text-xs xs:text-sm sm:text-base ${
                        fieldErrors.fullName ? "border-red-500 bg-red-50" : "border-blue-200"
                      }`}
                      value={form.fullName}
                      onChange={handleChange}
                      aria-describedby={fieldErrors.fullName ? "fullName-error" : undefined}
                    />
                    {fieldErrors.fullName && <p id="fullName-error" className="text-red-600 text-xs mt-1">{fieldErrors.fullName}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs xs:text-sm font-semibold text-blue-900 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      placeholder="your@email.com"
                      className={`w-full p-2 xs:p-2.5 sm:p-3 bg-white border rounded-lg text-xs xs:text-sm sm:text-base ${
                        fieldErrors.email ? "border-red-500 bg-red-50" : "border-blue-200"
                      }`}
                      value={form.email}
                      onChange={handleChange}
                      aria-describedby={fieldErrors.email ? "email-error" : undefined}
                    />
                    {fieldErrors.email && <p id="email-error" className="text-red-600 text-xs mt-1">{fieldErrors.email}</p>}
                  </div>
                </div>
              </fieldset>

              {/* Phone & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4 sm:gap-5">
                <div>
                  <label htmlFor="number" className="block text-xs xs:text-sm font-semibold text-blue-900 mb-1">
                    Phone Number
                  </label>
                  <input
                    id="number"
                    type="tel"
                    name="number"
                    placeholder="10-digit number"
                    className={`w-full p-2 xs:p-2.5 sm:p-3 bg-white border rounded-lg text-xs xs:text-sm sm:text-base ${
                      fieldErrors.phone ? "border-red-500 bg-red-50" : "border-blue-200"
                    }`}
                    value={form.number}
                    onChange={handleChange}
                    pattern="[6-9]\d{9}"
                    aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
                  />
                  {fieldErrors.phone && <p id="phone-error" className="text-red-600 text-xs mt-1">{fieldErrors.phone}</p>}
                </div>
              </div>

              {/* Service Selection */}
              <fieldset>
                <legend className="sr-only">Service Details</legend>
                <div>
                  <label htmlFor="subject" className="block text-xs xs:text-sm font-semibold text-blue-900 mb-1">
                    Service <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className={`w-full p-2 xs:p-2.5 sm:p-3 bg-white border rounded-lg text-xs xs:text-sm sm:text-base ${
                      fieldErrors.subject ? "border-red-500 bg-red-50" : "border-blue-200"
                    }`}
                    value={form.subject}
                    onChange={handleChange}
                    aria-describedby={fieldErrors.subject ? "subject-error" : undefined}
                  >
                    <option value="">Select a service</option>
                    {Array.isArray(services) && services.length > 0 ? (
                      services.map(service => (
                        <option key={service._id || service.title} value={service.title}>
                          {service.title}
                        </option>
                      ))
                    ) : (
                      <option disabled>No services available</option>
                    )}
                    <option value="Other">Other</option>
                  </select>
                  {fieldErrors.subject && <p id="subject-error" className="text-red-600 text-xs mt-1">{fieldErrors.subject}</p>}
                </div>

                {showOtherInput && (
                  <div className="mt-3 xs:mt-4">
                    <label htmlFor="customSubject" className="block text-xs xs:text-sm font-semibold text-blue-900 mb-1">
                      Custom Service <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="customSubject"
                      type="text"
                      placeholder="Describe your service need"
                      className={`w-full p-2 xs:p-2.5 sm:p-3 bg-white border rounded-lg text-xs xs:text-sm sm:text-base ${
                        fieldErrors.customSubject ? "border-red-500 bg-red-50" : "border-blue-200"
                      }`}
                      value={customSubject}
                      onChange={e => setCustomSubject(e.target.value)}
                      required
                      aria-describedby={fieldErrors.customSubject ? "customSubject-error" : undefined}
                    />
                    {fieldErrors.customSubject && <p id="customSubject-error" className="text-red-600 text-xs mt-1">{fieldErrors.customSubject}</p>}
                  </div>
                )}
              </fieldset>

              {/* Message */}
              <fieldset>
                <legend className="sr-only">Your Message</legend>
                <div>
                  <label htmlFor="message" className="block text-xs xs:text-sm font-semibold text-blue-900 mb-1">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    name="message"
                    required
                    placeholder="Tell us about your project (min 20 characters)"
                    className={`w-full p-2 xs:p-2.5 sm:p-3 bg-white border rounded-lg resize-none text-xs xs:text-sm sm:text-base ${
                      fieldErrors.message ? "border-red-500 bg-red-50" : "border-blue-200"
                    }`}
                    value={form.message}
                    onChange={handleChange}
                    minLength="20"
                    maxLength="500"
                    aria-describedby={fieldErrors.message ? "message-error" : "message-hint"}
                  />
                  <p id="message-hint" className="text-xs text-gray-500 mt-1">{form.message.length}/500 characters</p>
                  {fieldErrors.message && <p id="message-error" className="text-red-600 text-xs mt-1">{fieldErrors.message}</p>}
                </div>
              </fieldset>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-blue-700 via-cyan-600 to-blue-800 text-white font-bold px-3 xs:px-4 sm:px-5 py-2 xs:py-2.5 sm:py-3 rounded-lg sm:rounded-xl transition duration-150 text-xs xs:text-sm sm:text-base ${
                  isSubmitting ? "opacity-60 cursor-not-allowed" : "hover:opacity-95"
                }`}
                aria-busy={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          {/* Info Cards Section - Responsive grid */}
          <div className="space-y-3 xs:space-y-4 sm:space-y-6">
            {/* Office Image */}
            <figure className="relative h-32 xs:h-36 sm:h-40 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden bg-cover bg-center shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.1.0&auto=format&fit=crop&q=80&w=869"
                alt="Modern office workspace"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-cyan-700/40 to-blue-700/60"></div>
              <figcaption className="absolute bottom-3 xs:bottom-4 left-3 xs:left-4 text-white z-10">
                <h3 className="text-sm xs:text-base font-bold">Our Office</h3>
                <p className="text-xs">Modern workspace in Indore</p>
              </figcaption>
            </figure>

            {/* Contact Cards - Responsive grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2 xs:gap-3 sm:gap-4">
              {[
                { icon: "📍", title: "Address", content: ["669, A-2, SCH No.136", "Indore-452010", "MP, India"] },
                { icon: "📞", title: "Phone", content: ["+91 79874-35108", "Mon - Fri, 9-6 PM"] },
                { icon: "📧", title: "Email", content: ["info@whitemirror.com", "24hr response"] },
                { icon: "💬", title: "Support", content: ["24/7 Support", "Always ready"] }
              ].map((card, i) => (
                <article key={i} className="bg-white/80 backdrop-blur border border-blue-100 rounded-lg sm:rounded-xl p-3 xs:p-4 sm:p-5 shadow-lg hover:shadow-xl transition-shadow">
                  <p className="font-semibold text-blue-700 flex items-center gap-2 mb-1 xs:mb-2 text-xs xs:text-sm sm:text-base">
                    <span className="text-base xs:text-lg sm:text-xl">{card.icon}</span>{card.title}
                  </p>
                  <p className="text-xs xs:text-xs sm:text-sm text-gray-700 line-clamp-2">
                    {card.content.join(" • ")}
                  </p>
                </article>
              ))}
            </div>

            {/* Team Image */}
            <figure className="relative h-32 xs:h-36 sm:h-40 rounded-lg sm:rounded-xl md:rounded-2xl overflow-hidden bg-cover bg-center shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1551135049-8a33b5883817?w=600"
                alt="Expert development team"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-900/60 via-cyan-700/40 to-blue-700/60"></div>
              <figcaption className="absolute bottom-3 xs:bottom-4 left-3 xs:left-4 text-white z-10">
                <h3 className="text-sm xs:text-base font-bold">Expert Team</h3>
                <p className="text-xs">Ready to help you succeed</p>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
