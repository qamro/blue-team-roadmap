import { motion } from 'framer-motion'

const FOOTER_LINKS = {
  Roadmap:   ['Phase 1: Foundations', 'Phase 2: Security Core', 'Phase 3: SIEM', 'Phase 4: SOC & IR', 'Phase 5: Forensics'],
  Certifications: ['CompTIA Security+', 'BTL1', 'CySA+', 'GCIA', 'SC-200'],
  Platforms: ['TryHackMe', 'LetsDefend', 'Blue Team Labs', 'CyberDefenders', 'Hack The Box'],
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-cyan-500/10 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#030810]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-cyan-500/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <div className="relative">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-400 flex items-center justify-center text-sm font-black text-white">
                  BT
                </div>
                <div className="absolute inset-0 rounded-xl bg-cyan-400/20 blur-md" />
              </div>
              <span className="font-bold text-xl gradient-text">BlueTeam</span>
            </div>
            <p className="text-sm text-blue-300/50 leading-relaxed mb-6">
              The most comprehensive Blue Team cybersecurity roadmap. From foundations to professional — structured, visual, and actionable.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs text-blue-400/40">Always free. Always updated.</span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-bold text-white mb-5 tracking-wide">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <button className="text-sm text-blue-300/50 hover:text-cyan-400 transition-colors text-left">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-cyan-500/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-blue-400/30">
            © {year} BlueTeam Roadmap. Built for the cybersecurity community.
          </p>
          <div className="flex items-center gap-6">
            {['MITRE ATT&CK', 'NIST', 'SANS'].map((t) => (
              <span key={t} className="text-xs text-blue-400/20 hover:text-blue-400/50 transition-colors cursor-default">
                {t}
              </span>
            ))}
          </div>
          <div className="text-xs text-blue-400/20">
            Developed by <span style="color: red;">Bakhouche Mohamed Qamar Eddine.</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
