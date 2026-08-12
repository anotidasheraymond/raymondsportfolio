import IntroCurtain from '@/components/IntroCurtain'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import HeroStrip from '@/components/HeroStrip'
import StatBand from '@/components/StatBand'
import Marquee from '@/components/Marquee'
import WorkList from '@/components/WorkList'
import VideoSection from '@/components/VideoSection'
import CaseStudies from '@/components/CaseStudies'
import About from '@/components/About'
import History from '@/components/History'
import Contact from '@/components/Contact'
import { OPTIONS } from '@/lib/content'

export const dynamic = 'force-static'

export default function Page() {
  return (
    <>
      {OPTIONS.introSequence && <IntroCurtain />}
      <Nav />

      <header id="top">
        <Hero />
        <HeroStrip />
        <StatBand />
        <Marquee />
      </header>

      <main>
        <section id="work" className="wrap sec" style={{ paddingTop: 'clamp(56px,8vw,108px)' }}>
          <WorkList />
        </section>

        <section id="motion" className="wrap sec">
          <VideoSection />
        </section>

        <section id="case" className="wrap sec">
          <CaseStudies />
        </section>

        <section id="about" className="wrap sec">
          <About />
        </section>

        <section id="history" className="wrap sec">
          <History />
        </section>

        <section id="contact" className="contact">
          <Contact />
        </section>
      </main>
    </>
  )
}
