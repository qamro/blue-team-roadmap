import { motion } from 'framer-motion'

const FOOTER_LINKS = {
  Roadmap:        ['Phase 1: Foundations', 'Phase 2: Security Core', 'Phase 3: SIEM', 'Phase 4: SOC & IR', 'Phase 5: Forensics'],
  Certifications: ['CompTIA Security+', 'BTL1', 'CySA+', 'GCIA', 'SC-200'],
  Platforms:      ['TryHackMe', 'LetsDefend', 'Blue Team Labs', 'CyberDefenders', 'Hack The Box'],
}

const SOCIALS = [
  {
    name:  'GitHub',
    url:   'https://github.com/qamro',
    icon:  (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    color: '#A8D4FF',
  },
  {
    name:  'LinkedIn',
    url:   'https://www.linkedin.com/in/mohamed-qamar-eddine-bakhouche-55b4153b7/',
    icon:  (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    color: '#0A66C2',
  },
  {
    name:  'X / Twitter',
    url:   'https://x.com/qamroBKC',
    icon:  (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
    color: '#A8D4FF',
  },
  {
    name:  'Instagram',
    url:   'https://www.instagram.com/qamro_bkc',
    icon:  (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
    color: '#E1306C',
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-cyan-500/8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#020810]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-cyan-500/20 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10">
                <rect width="32" height="32" rx="8" fill="#050D1A"/>
                <rect x="8" y="6" width="16" height="20" rx="3" fill="none" stroke="#00F5FF" strokeWidth="1.5"/>
                <rect x="11" y="10" width="10" height="1.5" rx="0.75" fill="#00F5FF" opacity="0.7"/>
                <rect x="11" y="13.5" width="7" height="1.5" rx="0.75" fill="#00F5FF" opacity="0.5"/>
                <circle cx="16" cy="22" r="2" fill="#00F5FF" opacity="0.9"/>
              </svg>
              <span className="font-bold text-xl"
                style={{ background: 'linear-gradient(135deg, #FFFFFF, #A8D4FF, #00F5FF)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                BlueTeam
              </span>
            </div>
            <p className="text-sm text-blue-300/40 leading-relaxed mb-6">
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
                    <button className="text-sm text-blue-300/40 hover:text-cyan-400 transition-colors text-left">
                      {link}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ── */}
        <div className="pt-8 border-t border-cyan-500/8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">

            {/* Developer credit */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-xs text-blue-400/30">Developed by</span>
                <span className="text-xs font-semibold text-white/60">
                  Bakhouche Mohamed Qamar Eddine
                </span>
              </div>

              {/* Social icons */}
              <div className="flex items-center gap-2">
                {SOCIALS.map((s) => (
                  <motion.a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.name}
                    className="w-8 h-8 rounded-lg border border-white/8 flex items-center justify-center transition-all duration-200 group"
                    style={{ background: 'rgba(255,255,255,0.03)' }}
                    whileHover={{
                      scale: 1.15,
                      borderColor: s.color + '60',
                      background: s.color + '18',
                    }}
                    whileTap={{ scale: 0.92 }}
                  >
                    <span className="text-white/30 group-hover:text-white/90 transition-colors" style={{ '--hover-color': s.color }}>
                      {s.icon}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-6">
              {['MITRE ATT&CK', 'NIST', 'SANS'].map((t) => (
                <span key={t} className="text-xs text-blue-400/20 hover:text-blue-400/50 transition-colors cursor-default">
                  {t}
                </span>
              ))}
              <span className="text-xs text-blue-400/20">© {year}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}