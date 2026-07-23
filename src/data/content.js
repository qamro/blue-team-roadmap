// ── Blue Team What/Why cards ─────────────────────────────────
export const BLUE_TEAM_CARDS = [
  {
    icon: '🛡️',
    title: 'Blue Team',
    desc: 'The defensive force that protects organizations from cyber threats. Blue Teams monitor, detect, and respond to attacks in real time.',
    color: 'from-blue-600 to-cyan-500',
  },
  {
    icon: '🔍',
    title: 'SOC Operations',
    desc: 'Security Operations Centers are the nerve centers of cyber defense — monitoring systems 24/7 and triaging security alerts.',
    color: 'from-cyan-600 to-blue-400',
  },
  {
    icon: '⚡',
    title: 'Incident Response',
    desc: 'When attacks happen, IR teams spring into action to contain, eradicate, and recover from security incidents rapidly.',
    color: 'from-blue-700 to-indigo-500',
  },
  {
    icon: '🔬',
    title: 'Threat Detection',
    desc: 'Using advanced analytics, SIEM platforms, and behavioral analysis to identify malicious activity before it causes damage.',
    color: 'from-cyan-700 to-teal-500',
  },
  {
    icon: '🧬',
    title: 'Digital Forensics',
    desc: 'Investigating security incidents and breaches to understand what happened, how it happened, and prevent recurrence.',
    color: 'from-blue-500 to-sky-400',
  },
  {
    icon: '🌐',
    title: 'Threat Intelligence',
    desc: 'Gathering and analyzing information about adversaries, their tools, tactics, and procedures to stay ahead of threats.',
    color: 'from-indigo-600 to-blue-400',
  },
]

// ── Why Blue Team ─────────────────────────────────────────────
export const WHY_REASONS = [
  { stat: '$120K+',  label: 'Average SOC Analyst salary',          icon: '💰' },
  { stat: '3.5M',   label: 'Unfilled cybersecurity jobs globally', icon: '📊' },
  { stat: '95%',    label: 'Companies report talent shortage',     icon: '🏢' },
  { stat: '300%',   label: 'Industry growth in 5 years',          icon: '📈' },
]

// ── Complete Roadmap ──────────────────────────────────────────
export const ROADMAP = [
  {
    phase: 1,
    title: 'Foundations',
    color: '#0066FF',
    glow:  'rgba(0, 102, 255, 0.3)',
    icon:  '🏗️',
    topics: [
      { name: 'Computer Fundamentals',  desc: 'Hardware, OS concepts, binary, hex', time: '2 weeks' },
      { name: 'Operating Systems',       desc: 'Windows & Linux architecture', time: '3 weeks' },
      { name: 'Linux Mastery',           desc: 'CLI, bash scripting, file system, permissions', time: '4 weeks' },
      { name: 'Windows Deep Dive',       desc: 'Registry, processes, event logs, PowerShell', time: '3 weeks' },
      { name: 'Networking Essentials',   desc: 'OSI model, protocols, subnetting', time: '3 weeks' },
      { name: 'TCP/IP & Protocols',      desc: 'HTTP, DNS, DHCP, FTP, SMB deep dive', time: '2 weeks' },
      { name: 'Python for Security',     desc: 'Automation, scripts, log parsing', time: '4 weeks' },
      { name: 'Git & Version Control',   desc: 'Repositories, branching, collaboration', time: '1 week' },
      { name: 'Virtualization',          desc: 'VMware, VirtualBox, lab setup', time: '1 week' },
    ],
  },
  {
    phase: 2,
    title: 'Cybersecurity Core',
    color: '#00A3FF',
    glow:  'rgba(0, 163, 255, 0.3)',
    icon:  '🔐',
    topics: [
      { name: 'Cybersecurity Fundamentals', desc: 'CIA triad, threat landscape, risk', time: '2 weeks' },
      { name: 'Cryptography',               desc: 'Encryption, hashing, PKI, TLS', time: '3 weeks' },
      { name: 'Network Security',           desc: 'VPNs, secure protocols, segmentation', time: '2 weeks' },
      { name: 'Firewalls & WAF',            desc: 'Rules, zones, traffic filtering', time: '2 weeks' },
      { name: 'IDS / IPS',                  desc: 'Snort, Suricata, signature tuning', time: '2 weeks' },
      { name: 'Log Analysis',               desc: 'Windows events, syslog, parsing', time: '3 weeks' },
      { name: 'Active Directory',           desc: 'Users, groups, GPO, attacks & defense', time: '4 weeks' },
      { name: 'Identity & Access',          desc: 'MFA, SSO, PAM, Zero Trust', time: '2 weeks' },
    ],
  },
  {
    phase: 3,
    title: 'SIEM & Detection',
    color: '#00C8FF',
    glow:  'rgba(0, 200, 255, 0.3)',
    icon:  '📡',
    topics: [
      { name: 'SIEM Fundamentals',      desc: 'Architecture, use cases, alert logic', time: '2 weeks' },
      { name: 'Splunk',                 desc: 'SPL queries, dashboards, correlation', time: '4 weeks' },
      { name: 'Elastic / ELK Stack',   desc: 'Elasticsearch, Kibana, Logstash', time: '4 weeks' },
      { name: 'Microsoft Sentinel',     desc: 'KQL, analytics rules, playbooks', time: '3 weeks' },
      { name: 'IBM QRadar',             desc: 'Offenses, rules, DSM configuration', time: '2 weeks' },
      { name: 'Sigma Rules',            desc: 'Writing detection rules for any SIEM', time: '2 weeks' },
      { name: 'YARA Rules',             desc: 'Malware detection patterns', time: '2 weeks' },
      { name: 'Detection Engineering',  desc: 'Hypothesis-driven detection lifecycle', time: '3 weeks' },
    ],
  },
  {
    phase: 4,
    title: 'SOC & IR',
    color: '#00F5FF',
    glow:  'rgba(0, 245, 255, 0.3)',
    icon:  '🚨',
    topics: [
      { name: 'SOC Operations',         desc: 'Tier model, workflows, escalation', time: '2 weeks' },
      { name: 'MITRE ATT&CK',           desc: 'Framework, TTPs, navigator mapping', time: '3 weeks' },
      { name: 'Incident Response',       desc: 'PICERL methodology, playbooks', time: '4 weeks' },
      { name: 'Threat Intelligence',     desc: 'IOCs, threat feeds, CTI platforms', time: '2 weeks' },
      { name: 'Threat Hunting',          desc: 'Proactive hunting, hypothesis creation', time: '3 weeks' },
      { name: 'Alert Triage',            desc: 'FP reduction, severity classification', time: '2 weeks' },
      { name: 'EDR / XDR',              desc: 'CrowdStrike, Defender, SentinelOne', time: '3 weeks' },
      { name: 'SOAR Automation',        desc: 'Playbook automation, orchestration', time: '2 weeks' },
    ],
  },
  {
    phase: 5,
    title: 'Digital Forensics',
    color: '#3B82F6',
    glow:  'rgba(59, 130, 246, 0.3)',
    icon:  '🔬',
    topics: [
      { name: 'DFIR Fundamentals',      desc: 'Evidence handling, chain of custody', time: '2 weeks' },
      { name: 'Memory Forensics',       desc: 'Volatility, memory dumps, analysis', time: '3 weeks' },
      { name: 'Disk Forensics',         desc: 'Autopsy, FTK, artifact analysis', time: '3 weeks' },
      { name: 'Network Forensics',      desc: 'Wireshark, PCAP analysis, flows', time: '2 weeks' },
      { name: 'Malware Analysis Basics',desc: 'Static & dynamic analysis, sandboxes', time: '4 weeks' },
      { name: 'Log Forensics',          desc: 'Timeline reconstruction, artifacts', time: '2 weeks' },
      { name: 'Velociraptor',           desc: 'DFIR platform, hunting at scale', time: '2 weeks' },
    ],
  },
  {
    phase: 6,
    title: 'Cloud & Advanced',
    color: '#60A5FA',
    glow:  'rgba(96, 165, 250, 0.3)',
    icon:  '☁️',
    topics: [
      { name: 'Cloud Security Fundamentals', desc: 'Shared responsibility, misconfigs', time: '2 weeks' },
      { name: 'Azure Security',              desc: 'Defender for Cloud, Sentinel, RBAC', time: '4 weeks' },
      { name: 'AWS Security',               desc: 'GuardDuty, CloudTrail, Security Hub', time: '4 weeks' },
      { name: 'Container Security',         desc: 'Docker, Kubernetes security basics', time: '2 weeks' },
      { name: 'Vulnerability Management',   desc: 'Nessus, scanning, remediation', time: '2 weeks' },
      { name: 'Risk Assessment',            desc: 'Risk frameworks, scoring, reporting', time: '2 weeks' },
      { name: 'NIST Framework',             desc: 'Identify, Protect, Detect, Respond', time: '2 weeks' },
      { name: 'ISO 27001',                  desc: 'ISMS, controls, compliance', time: '2 weeks' },
    ],
  },
  {
    phase: 7,
    title: 'Career & Portfolio',
    color: '#93C5FD',
    glow:  'rgba(147, 197, 253, 0.3)',
    icon:  '🚀',
    topics: [
      { name: 'Resume & LinkedIn',       desc: 'Tailoring for SOC roles', time: '1 week' },
      { name: 'Portfolio Projects',      desc: 'Home lab, write-ups, GitHub', time: '4 weeks' },
      { name: 'Interview Preparation',   desc: 'Technical & behavioral questions', time: '2 weeks' },
      { name: 'CTF Competitions',        desc: 'Blue Team-focused challenges', time: 'Ongoing' },
      { name: 'Networking & Community',  desc: 'LinkedIn, Discord, conferences', time: 'Ongoing' },
      { name: 'Soft Skills',             desc: 'Communication, reporting, teamwork', time: 'Ongoing' },
    ],
  },
]

// ── Certifications ────────────────────────────────────────────
export const CERTS = [
  { name: 'CompTIA Security+',    level: 'Entry',        color: '#0066FF', org: 'CompTIA',            time: '2-3 months', url: 'https://www.comptia.org/certifications/security' },
  { name: 'CompTIA CySA+',       level: 'Intermediate', color: '#0088FF', org: 'CompTIA',            time: '3-4 months', url: 'https://www.comptia.org/certifications/cybersecurity-analyst' },
  { name: 'BTL1',                 level: 'Entry',        color: '#00AAFF', org: 'Security Blue Team', time: '1-2 months', url: 'https://www.centri.org/certifications/blue-team-level-1' },
  { name: 'BTL2',                 level: 'Advanced',     color: '#00BBFF', org: 'Security Blue Team', time: '3-6 months', url: 'https://www.securityblue.team/certifications/btl2' },
  { name: 'GCIA',                 level: 'Advanced',     color: '#00CCFF', org: 'GIAC',               time: '4-6 months', url: 'https://www.giac.org/certifications/certified-intrusion-analyst-gcia' },
  { name: 'GCIH',                 level: 'Advanced',     color: '#00DDFF', org: 'GIAC',               time: '4-6 months', url: 'https://www.giac.org/certifications/certified-incident-handler-gcih' },
  { name: 'SC-200',               level: 'Intermediate', color: '#00EEFF', org: 'Microsoft',          time: '2-3 months', url: 'https://learn.microsoft.com/en-us/credentials/certifications/security-operations-analyst' },
  { name: 'SC-100',               level: 'Expert',       color: '#00F5FF', org: 'Microsoft',          time: '4-6 months', url: 'https://learn.microsoft.com/en-us/credentials/certifications/cybersecurity-architect-expert' },
  { name: 'GCFE',                 level: 'Advanced',     color: '#22D3EE', org: 'GIAC',               time: '3-5 months', url: 'https://www.giac.org/certifications/certified-forensic-examiner-gcfe' },
  { name: 'CEH',                  level: 'Intermediate', color: '#38BDF8', org: 'EC-Council',         time: '3-4 months', url: 'https://www.eccouncil.org/train-certify/certified-ethical-hacker-ceh' },
]

// ── Labs & Platforms ──────────────────────────────────────────
export const LABS = [
  { name: 'TryHackMe',           desc: 'Beginner-friendly guided learning paths and SOC rooms', icon: '🎯', color: '#0066FF', url: 'https://tryhackme.com' },
  { name: 'Blue Team Labs',      desc: 'Dedicated Blue Team challenges and investigations',      icon: '🛡️', color: '#0088FF', url: 'https://blueteamlabs.online' },
  { name: 'LetsDefend',         desc: 'Real SOC simulator with alerts, playbooks, and IR',     icon: '⚡', color: '#00AAFF', url: 'https://letsdefend.io' },
  { name: 'CyberDefenders',     desc: 'DFIR and threat hunting CTF challenges',                 icon: '🔍', color: '#00CCFF', url: 'https://cyberdefenders.org' },
  { name: 'Hack The Box',       desc: 'Defensive and forensics challenges and Sherlocks',       icon: '📦', color: '#00DDFF', url: 'https://hackthebox.com' },
  { name: 'DetectionLab',       desc: 'Pre-built lab environment for detection engineering',   icon: '🔬', color: '#00F5FF', url: 'https://github.com/clong/DetectionLab' },
]

// ── Tools ─────────────────────────────────────────────────────
export const TOOLS = [
  { name: 'Wireshark',           icon: '🦈', category: 'Network Analysis'   },
  { name: 'Splunk',              icon: '📊', category: 'SIEM'               },
  { name: 'Elastic / ELK',      icon: '🔍', category: 'SIEM'               },
  { name: 'Microsoft Sentinel', icon: '🔷', category: 'SIEM'               },
  { name: 'Sysmon',              icon: '👁️', category: 'Endpoint Monitoring' },
  { name: 'Velociraptor',       icon: '⚡', category: 'DFIR'               },
  { name: 'Volatility',         icon: '🧠', category: 'Memory Forensics'   },
  { name: 'Autopsy',            icon: '🔬', category: 'Disk Forensics'     },
  { name: 'Snort / Suricata',  icon: '🐷', category: 'IDS/IPS'            },
  { name: 'MISP',               icon: '🌐', category: 'Threat Intel'       },
  { name: 'TheHive',            icon: '🐝', category: 'Incident Response'  },
  { name: 'Cortex',             icon: '🧬', category: 'SOAR'               },
  { name: 'YARA',               icon: '🎯', category: 'Malware Detection'  },
  { name: 'Sigma',              icon: '⚔️', category: 'Detection Rules'    },
  { name: 'Nessus',             icon: '🔭', category: 'Vuln Management'    },
  { name: 'CrowdStrike',        icon: '🦅', category: 'EDR/XDR'           },
]

// ── Resources ─────────────────────────────────────────────────
export const RESOURCES = [
  { type: '📚 Books',    items: ['The Practice of Network Security Monitoring', 'Blue Team Handbook', 'Intelligence-Driven Incident Response', 'The Defender\'s Advantage'] },
  { type: '🎓 Courses',  items: ['TCM Security SOC Analyst', 'BTL1 Course', 'Splunk Fundamentals 1 & 2', 'Microsoft SC-200 Training'] },
  { type: '🌐 Free',     items: ['SANS Reading Room', 'MITRE ATT&CK Website', 'Elastic SIEM Docs', 'Microsoft Defender Docs'] },
  { type: '📺 YouTube',  items: ['Gerald Auger - Simply Cyber', 'John Hammond', 'SANS Institute', 'Black Hills Information Security'] },
]