import { useLenis }            from './hooks/useLenis'
import Cursor                   from './components/ui/Cursor'
import Navbar                   from './components/layout/Navbar'
import Footer                   from './components/layout/Footer'
import Hero                     from './components/hero/Hero'
import WhatIsBlueTeam           from './components/sections/WhatIsBlueTeam'
import WhyBlueTeam              from './components/sections/WhyBlueTeam'
import RoadmapSection           from './components/sections/RoadmapSection'
import CertificationsSection    from './components/sections/CertificationsSection'
import LabsSection              from './components/sections/LabsSection'
import ToolsSection             from './components/sections/ToolsSection'
import ResourcesSection         from './components/sections/ResourcesSection'
import FinalCTA                 from './components/sections/FinalCTA'

export default function App() {
  useLenis()

  return (
    <div className="relative min-h-screen bg-[#050D1A] text-white overflow-x-hidden">
      {/* Custom cursor */}
      <Cursor />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <Hero />
        <WhatIsBlueTeam />
        <WhyBlueTeam />
        <RoadmapSection />
        <CertificationsSection />
        <LabsSection />
        <ToolsSection />
        <ResourcesSection />
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
