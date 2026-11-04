import { About } from './components/About'
import { Contact } from './components/Contact'
import { Experience } from './components/Experience'
import { Expertise } from './components/Expertise'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Expertise />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
