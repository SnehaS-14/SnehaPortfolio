import React, { useEffect, useState } from 'react'
import AOS from 'aos'
import { motion } from 'framer-motion'
import Preloader from './components/Preloader'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Explore from './components/Explore'
import About from './components/About'
import Services from './components/Services'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { ArrowUpRight, Container } from './components/Editorial'
import { pages } from './data/pages'

const pageComponents = {
  about: () => (
    // Top padding keeps the About content clear of the fixed navbar
    <div className="bg-[#ff2a2a] pt-16 md:pt-20">
      <About />
    </div>
  ),
  services: Services,
  projects: Projects,
  contact: Contact
}

// The URL hash picks the page; anything unknown (#home, empty) is the home page
const routeFromHash = () => {
  const id = window.location.hash.slice(1)
  return pageComponents[id] ? id : 'home'
}

// "Next page" link shown at the bottom of every inner page
const NextPage = ({ current }) => {
  const index = pages.findIndex((page) => page.id === current)
  const next = pages[index + 1]
  const href = next ? `#${next.id}` : '#home'
  const name = next ? next.name : 'Home'

  return (
    <section className="editorial grain bg-paper">
      <Container className="pt-12 pb-20 md:pt-16 md:pb-28">
        <a href={href} className="group flex items-end justify-between gap-6 border-t border-ink pt-8 md:pt-10">
          <span>
            <span className="t-label text-muted">{next ? 'Next page' : 'Back to'}</span>
            <span className="mt-4 block text-[clamp(2.5rem,7vw,6.5rem)] leading-[0.9] font-semibold tracking-[-0.05em] transition-transform duration-700 ease-[var(--ease-expo)] group-hover:translate-x-2">
              {name}<em>.</em>
            </span>
          </span>
          <span className="mb-2 grid size-12 shrink-0 place-items-center rounded-full border border-ink/20 transition-colors duration-500 group-hover:border-ink group-hover:bg-ink group-hover:text-paper md:size-16">
            <ArrowUpRight className="size-5" />
          </span>
        </a>
      </Container>
    </section>
  )
}

function App() {
  const [route, setRoute] = useState(routeFromHash)

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: 'ease-out' })

    const handleHashChange = () => {
      setRoute(routeFromHash())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Pick up data-aos elements on the newly shown page
  useEffect(() => {
    AOS.refreshHard()
  }, [route])

  const Page = pageComponents[route]

  return (
    <>
      <Preloader />
      <Navbar solid={route !== 'home'} />
      <motion.main
        key={route}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {Page ? (
          <>
            <Page />
            <NextPage current={route} />
          </>
        ) : (
          <>
            <Hero />
            <Explore />
          </>
        )}
      </motion.main>
      <Footer />
    </>
  )
}

export default App
