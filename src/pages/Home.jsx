import React, { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Hero from '../components/Hero'
import IntroSection from '../components/IntroSection'
import ProblemSection from '../components/ProblemSection'
import SystemSection from '../components/SystemSection'
import LiveEnvironment from '../components/LiveEnvironment'
import Features from '../components/Features'
import AnomalyDetection from '../components/AnomalyDetection'
import UseCases from '../components/UseCases'
import ProductShowcase from '../components/ProductShowcase'
import HowItWorks from '../components/HowItWorks'
import PreOrder from '../components/PreOrder'
import Footer from '../components/Footer'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  useEffect(() => {
    // Smooth scroll initialization
    ScrollTrigger.refresh()
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <main id="main-content">
      <Hero />
      <IntroSection />
      <ProblemSection />
      <SystemSection />
      <LiveEnvironment />
      <Features />
      <AnomalyDetection />
      <UseCases />
      <ProductShowcase />
      <HowItWorks />
      <PreOrder />
      <Footer />
    </main>
  )
}
