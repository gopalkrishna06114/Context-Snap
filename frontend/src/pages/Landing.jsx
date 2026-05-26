import Hero from '../components/landing/Hero'
import Features from '../components/landing/Features'
import BrowserSupport from '../components/landing/BrowserSupport'
import Testimonials from '../components/landing/Testimonials'
import DownloadSection from '../components/landing/DownloadSection'

export default function Landing() {
  return (
    <main>
      <Hero />
      <Features />
      <BrowserSupport />
      <Testimonials />
      <DownloadSection />
    </main>
  )
}