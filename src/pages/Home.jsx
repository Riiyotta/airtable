import Hero from '../components/Hero.jsx'
import LogoBar from '../components/LogoBar.jsx'
import Workflows from '../components/Workflows.jsx'
import AIPlays from '../components/AIPlays.jsx'
import Resources from '../components/Resources.jsx'
import CustomerStory from '../components/CustomerStory.jsx'
import CtaBox from '../components/CtaBox.jsx'

// Page order per CLONE_SPEC §1–§9.
export default function Home() {
  return (
    <>
      <Hero />
      <LogoBar />
      <Workflows />
      <AIPlays />
      <Resources />
      <CustomerStory />
      <CtaBox />
    </>
  )
}
