import React from 'react';
import { Routes, Route } from 'react-router-dom'; // ✅ Only use Routes here

import Header from './components/Header';

import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import UpcomingSection from './components/UpcomingSection';
// import ContactSection from './components/ContactSection';
import ContactPage from './components/ContactPage';
import Home from './pages/Home'
import AdminLogin from './adminpage/AdminLogin';
import AdminDashboard from './adminpage/AdminDashboard';
import AdminApplications from './adminpage/AdminApplications';
import AdminContacts from './adminpage/AdminContacts';
import ProtectedAdminRoute from './context/ProtectedAdminRoute'; // ✅ Import the protected route
import { useLocation } from 'react-router-dom';
import AdminSignup from './adminpage/AdminSignup';
import JobListings from './components/JobListings';
import BlogSection from './components/BlogSection';
import AdminBlogs from './adminpage/AdminBlogs';
import BlogPostForm from './adminpage/BlogPostForm';
import BlogDetails from './components/BlogDetail';
import ResumeView from './adminpage/ResumeView';
import AIChat from './components/AI/AIChat';
import AdminProjects from './adminpage/AdminProjectForm';
import AdminProjectList from './adminpage/AdminProjectList';

function HomePage() {
  return (
    <>
     <Home/>
    </>
  );
}

function App() {
    const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  return (
    <>
      {!isAdminRoute && <Header />}
      <Routes>
        
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutSection />} />
        <Route path="/services" element={<ServicesSection />} />
        <Route path="/blog" element={<BlogSection/>}/>
        <Route path="/blog/:slug" element={<BlogDetails/>}/>
        <Route path="/upcoming" element={<UpcomingSection />} />
        <Route path="/contact" element={<ContactPage/>} />
        <Route path="/job-listing" element={<JobListings/>} />

       
        
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
        <Route path="/admin/application" element={<AdminApplications />} />
        <Route path="/admin/contact" element={<AdminContacts />} />
        <Route path='/admin/register' element={<AdminSignup/>}/>
        <Route path="/admin/resume/:id" element={<ProtectedAdminRoute><ResumeView/></ProtectedAdminRoute>} />
        <Route path='/admin/blogs' element={<AdminBlogs/>}/>
        <Route path='/admin/blogs/create' element={<BlogPostForm/>}/>
        <Route path='/admin/blogs/edit/:id' element={<BlogPostForm/>}/>
        <Route path='/admin/projects' element={<AdminProjects/>}/>
        <Route path='/admin/projects-list' element={<AdminProjectList/>}/>
      </Routes>

      {!isAdminRoute && <AIChat/>}
   </>
  );
}

export default App;
