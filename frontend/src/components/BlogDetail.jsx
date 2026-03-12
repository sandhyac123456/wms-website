import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getSingleBlog } from "../Service/Operation/blogApi";
import { FaLink, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import toast from "react-hot-toast";

const BlogDetails = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const response = await getSingleBlog(slug);
      if (response?.blog) {
        setBlog(response.blog);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load blog");
    }
  };

  if (!blog) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Loading blog...</p>
      </div>
    );
  }

  const shareUrl = window.location.href;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    image: blog.image,
    description: blog.description,
    datePublished: blog.createdAt,
    author: {
      "@type": "Organization",
      name: "WMS Solutions",
    },
    publisher: {
      "@type": "Organization",
      name: "WMS Solutions",
      logo: {
        "@type": "ImageObject",
        url: window.location.origin+"/logo.jpg",
      },
    },
    mainEntityOfPage: shareUrl,
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied successfully!");
  };

  return (
    <>
      <Helmet>
        <title>{blog.title} | WMS Solutions</title>

        <meta name="description" content={blog.description} />
        <meta name="keywords" content={blog.keywords?.join(", ")} />
        <meta name="author" content="WMS Solutions" />

        {/* Canonical */}
        <link rel="canonical" href={shareUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.description} />
        <meta property="og:image" content={blog.image} />
        <meta property="og:url" content={shareUrl} />
        <meta property="og:type" content="article" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.description} />
        <meta name="twitter:image" content={blog.image} />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="bg-gradient-to-br from-white via-sky-50 to-cyan-100 min-h-screen">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20">

          {/* Blog Image */}
          <div className="overflow-hidden rounded-3xl shadow-xl mb-8">
            <img
              src={blog.image}
              alt={blog.title}
              loading="lazy"   
              className="w-full h-56 sm:h-72 md:h-96 object-cover hover:scale-105 transition duration-500"
            />
          </div>

          {/* Category */}
          <span className="inline-block bg-blue-600 text-white text-xs sm:text-sm px-3 py-1 rounded-full mb-4 capitalize">
            {blog.category?.name}
          </span>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-800 leading-tight mb-4">
            {blog.title}
          </h1>

          {/* Date + Views */}
          <p className="text-gray-500 text-sm sm:text-base mb-6">
            {new Date(blog.createdAt).toLocaleDateString()} • {blog.views} views
          </p>

          {/* Share Section */}
          <div className="flex flex-wrap items-center gap-3 mb-10">
            <span className="text-sm text-gray-600 font-medium mr-2">
              Share:
            </span>

            <a
              href={`https://wa.me/?text=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 p-3 rounded-full text-white shadow-md hover:scale-110 transition duration-300"
            >
              <FaWhatsapp size={18} />
            </a>

            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full text-white shadow-md hover:scale-110 transition duration-300"
            >
              <FaLinkedinIn size={18} />
            </a>

            <button
              onClick={handleCopyLink}
              className="bg-gray-700 hover:bg-gray-800 p-3 rounded-full text-white shadow-md hover:scale-110 transition duration-300"
            >
              <FaLink size={18} />
            </button>
          </div>

          <div className="border-t border-gray-200 mb-8"></div>

          {/* Content */}
          <div className="prose max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
            {blog.content}
          </div>

        </div>
      </div>
    </>
  );
};

export default BlogDetails;