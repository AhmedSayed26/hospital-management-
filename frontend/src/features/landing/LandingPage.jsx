import { useLayoutEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import CareSection from "./components/CareSection"
import DepartmentsSection from "./components/DepartmentsSection"
import DoctorsSection from "./components/DoctorsSection"
import EmergencyBanner from "./components/EmergencyBanner"
import FaqSection from "./components/FaqSection"
import Hero from "./components/Hero"
import ProcessSection from "./components/ProcessSection"
import ServicesSection from "./components/ServicesSection"
import TestimonialsSection from "./components/TestimonialsSection"

gsap.registerPlugin(ScrollTrigger)

export default function LandingPage() {
  const rootRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-title", {
        y: 36,
        opacity: 0,
        duration: 1,
        delay: 0.15,
        ease: "power3.out",
      })
      gsap.from(".hero-copy, .hero-cta", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.35,
        stagger: 0.12,
        ease: "power3.out",
        clearProps: "opacity,transform",
      })
      gsap.from(".hero-hand", {
        y: 48,
        opacity: 0,
        duration: 1.2,
        delay: 0.25,
        ease: "power3.out",
      })
      gsap.from(".float-card", {
        y: 28,
        opacity: 0,
        duration: 0.9,
        delay: 0.55,
        stagger: 0.15,
        ease: "power3.out",
      })
      gsap.to(".float-card", {
        y: "-=10",
        duration: 3.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.45,
        delay: 1.4,
      })

      gsap.utils.toArray(".landing-section").forEach((section) => {
        gsap.from(section, {
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          y: 40,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })
      })

      gsap.utils.toArray(".service-card, .doctor-card, .testimonial-card, .process-step, .stat-card, .pillar-card, .faq-item").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
          y: 24,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        })
      })
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={rootRef} className="landing-page">
      <Hero />
      {/* <EmergencyBanner /> */}
      <CareSection />
      <ServicesSection />
      <DepartmentsSection />
      <DoctorsSection />
      <ProcessSection />
      <TestimonialsSection />
      <FaqSection />
    </div>
  )
}
