import React from 'react'
import FinalFooter from '../components/FinalFooter'
import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import ServicesSection from '../components/ServicesSection'
import UpcomingSection from '../components/UpcomingSection'
import ContactPage from '../components/ContactPage'
import ScrollToTop from '../components/ScrollToTop'

function Home() {
  return (
    <>
         <HeroSection/>
         <AboutSection />
         <ServicesSection />
         <UpcomingSection />
         <ContactPage/>
         <FinalFooter/>
         <ScrollToTop />
    </>
  )
}

export default Home
