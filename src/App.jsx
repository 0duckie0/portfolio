import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Terminal } from 'lucide-react';

// --- CUSTOM ICONS ---
const GithubIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path></svg>
);

const LinkedInIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect width="4" height="12" x="2" y="9"></rect><circle cx="4" cy="4" r="2"></circle></svg>
);

const DownloadIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
);

const CodeIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
);

const CommitIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="3"></circle><line x1="3" y1="12" x2="9" y2="12"></line><line x1="15" y1="12" x2="21" y2="12"></line></svg>
);

const RocketIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"></path><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"></path><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"></path><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"></path></svg>
);

// --- DATA ARRAYS ---
const skills = [
  { category: "Intelligence / ML", items: ["Scikit-learn", "Predictive Modeling", "NLTK", "LangChain", "RAG Systems"] },
  { category: "Data / Graph Infrastructure", items: ["Neo4j", "Graph Analytics", "Pandas", "Supabase"] },
  { category: "Backend / Automation", items: ["Python", "Flask", "Selenium", "Jenkins APIs"] },
  { category: "Frontend / Interface", items: ["React", "Tailwind CSS", "Framer Motion", "Streamlit"] }
];

const research = [
  {
    title: "TaskFlow Optimizer",
    achievement: "Shortlisted for presentation at IEEE International Conference",
    description: "Focused on graph analytics and machine learning for distributed task scheduling, providing optimized throughput in complex dependency graphs."
  }
];

// NEW CERTIFICATIONS ARRAY
const certifications = [
  { name: "Introduction to Large Language Models", issuer: "Google Cloud", link: "https://www.skills.google/public_profiles/80eb5874-91ba-4fcb-a602-2101f65410d0/badges/24958771" },
  { name: "Prompt Design in Vertex AI", issuer: "Google Cloud", link: "https://www.skills.google/public_profiles/80eb5874-91ba-4fcb-a602-2101f65410d0/badges/24941120" },
  { name: "Agent Fundamentals", issuer: "Google Cloud", link: "https://www.skills.google/public_profiles/80eb5874-91ba-4fcb-a602-2101f65410d0/badges/24843753" }
];

const projects = [
  {
    title: "RiskSight",
    description: "Built an end-to-end ML and RAG-powered risk assessment system that analyzes financial statements, classifies company health using a Random Forest model, and augments decisions with AI-generated market intelligence from live financial data.",
    tech: ["Python", "Scikit-learn", "LangChain", "Llama 3.1", "Streamlit"],
    link: "https://risksight-hkdtllhbswncfgku7qc5p4.streamlit.app/",
    github: "https://github.com/0duckie0/RiskSight"
  },
  {
    title: "GameLens",
    description: "An AI-powered analytics platform that analyzes gaming community sentiment from Reddit and YouTube to forecast publisher stock movements, transforming real-time player discussions into actionable market intelligence.",
    tech: ["Python", "NLTK", "Streamlit", "Reddit API", "YouTube API"],
    link: "https://gamelenss.streamlit.app/",
    github: "https://github.com/0duckie0/GameLens"
  },
  {
    title: "Financial Stress Analyzer",
    description: "The application analyzes a user's income, expenses, savings, and debt to estimate their financial stress level and highlight potential risk areas.",
    tech: ["Python", "Flask", "Machine Learning", "Pandas"],
    link: "https://financial-stress-app.vercel.app/",
    github: "https://github.com/0duckie0/financial-stress-app"
  },
  {
    title: "TaskFlow-Optimizer",
    description: "An intelligent workflow optimization system that combines graph analytics and machine learning to analyze task dependencies, predict execution bottlenecks, and improve scheduling efficiency in distributed computing environments.",
    tech: ["Python", "NetworkX", "Neo4j", "Random Forest", "Graph Analytics"],
    link: "#",
    github: "https://github.com/0duckie0/TaskFlow-Optimizer"
  },
  {
    title: "Developer Portfolio",
    description: "A high-performance, dark-themed personal portfolio engineered with fluid animations and a modern, minimalist UI.",
    tech: ["React", "Tailwind v4", "Framer Motion"],
    link: "#",
    github: "#"
  }
];

const metrics = [
  { label: "End-to-End Projects", value: "4+", icon: <RocketIcon size={24} className="text-purple-400" /> },
  { label: "Research Papers", value: "2+", icon: <CommitIcon size={24} className="text-cyan-400" /> },
  { label: "Tech Stack Tools", value: "15+", icon: <CodeIcon size={24} className="text-emerald-400" /> }
];

const currentlyLearning = ["LLMs", "Advanced System Design", "Fintech Data Analysis", ];

// --- MAIN APP COMPONENT ---
const App = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [clickCount, setClickCount] = useState(0);
  const isPartyMode = clickCount >= 5;

  useEffect(() => {
    const updateMousePosition = (e) => setMousePosition({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <div className={`min-h-screen font-sans selection:bg-cyan-500/30 transition-colors duration-700 ${isPartyMode ? 'bg-slate-900 text-white' : 'bg-[#0a0a0a] text-gray-300'}`}>
      
      {/* Custom Cursor */}
      <motion.div 
        className="hidden md:block fixed top-0 left-0 w-8 h-8 rounded-full border border-cyan-500/50 pointer-events-none z-50 mix-blend-screen"
        animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16, backgroundColor: isPartyMode ? 'rgba(168, 85, 247, 0.2)' : 'rgba(6, 182, 212, 0.1)' }}
        transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.2 }}
      />
      <motion.div 
        className="hidden md:block fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-50"
        animate={{ x: mousePosition.x - 4, y: mousePosition.y - 4 }}
        transition={{ type: "spring", stiffness: 800, damping: 20, mass: 0.1 }}
      />

      <nav className="w-full p-6 flex justify-between items-center max-w-5xl mx-auto relative z-10">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="text-xl font-bold tracking-tighter text-white select-none">
          Parth Chaudhari
          <span onClick={() => setClickCount(prev => prev + 1)} className={`cursor-pointer transition-colors duration-300 ${isPartyMode ? 'text-purple-500 animate-pulse' : 'text-cyan-500'}`}>.</span>
        </motion.div>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="flex gap-5 items-center">
          <a href="https://github.com/0duckie0" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-all"><GithubIcon size={20} /></a>
          <a href="https://www.linkedin.com/in/parth-chaudhari-706944284/" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white hover:scale-110 transition-all"><LinkedInIcon size={20} /></a>
        </motion.div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-20 pb-24 relative z-10">
        {/* Intro */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-2xl">
          <div className="flex items-center gap-2 mb-4 text-sm font-mono text-cyan-400">
            <Terminal size={16} />
            <span>B.Tech CSE |_ AI • Analytics • Automation</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
            Turning complex data into{" "}
            <span className={`text-transparent bg-clip-text bg-linear-to-r animate-gradient-x ${isPartyMode ? 'from-rose-500 via-fuchsia-500 to-indigo-500' : 'from-purple-500 via-cyan-500 to-emerald-500'}`}>intelligent</span> decisions.
          </h1>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            Computer Science student focused on Machine Learning, AI, and Data Analytics. I build systems that transform financial, behavioral, and network data into actionable insights through predictive modeling, graph analytics, and intelligent automation. No fluff, just end-to-end complete projects.
          </p>
          <div className="flex flex-wrap items-center gap-3 mt-8">
            <span className="text-sm text-gray-500 font-mono uppercase tracking-wider">Currently Learning:</span>
            {currentlyLearning.map((item, i) => (
              <span key={i} className="text-xs px-3 py-1 bg-gray-800/40 text-gray-300 border border-gray-700/50 rounded-full">{item}</span>
            ))}
          </div>
        </motion.div>

        {/* Impact Metrics Section */}
        <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {metrics.map((metric, index) => (
            <motion.div key={index} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: index * 0.1, type: "spring", stiffness: 200 }} className="p-6 rounded-2xl bg-[#111]/40 border border-gray-800/60 flex items-center gap-5 hover:bg-[#151515] hover:border-gray-700 transition-all">
              <div className="p-4 bg-gray-900 rounded-xl border border-gray-800">{metric.icon}</div>
              <div>
                <h4 className="text-3xl font-extrabold text-white mb-1">{metric.value}</h4>
                <p className="text-sm text-gray-400 font-mono">{metric.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Research Section */}
        <div className="mt-24">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
            <span className="h-px w-12 bg-gray-700"></span>Research<span className="h-px flex-1 bg-gray-700"></span>
          </motion.h2>
          <div className="grid grid-cols-1 gap-6">
            {research.map((item, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="p-6 rounded-xl bg-[#111]/40 border border-gray-800/60 hover:border-cyan-500/30 transition-all">
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-cyan-400 font-medium mb-3">{item.achievement}</p>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* NEW SECTION: Certifications & Milestones */}
        <div className="mt-32">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
            <span className="h-px w-12 bg-gray-700"></span>Certifications & Milestones<span className="h-px flex-1 bg-gray-700"></span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.a 
                key={index} 
                href={cert.link} 
                target="_blank" 
                rel="noreferrer"
                initial={{ opacity: 0, scale: 0.95 }} 
                whileInView={{ opacity: 1, scale: 1 }} 
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-xl bg-[#111]/40 border border-gray-800/60 hover:border-cyan-500/50 transition-all group flex items-start gap-4"
              >
                <div className="p-3 bg-gray-900 rounded-lg text-cyan-400 group-hover:text-white transition-colors border border-gray-800">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"></circle><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path></svg>
                </div>
                <div>
                  <h3 className="text-white font-bold mb-1 text-sm">{cert.name}</h3>
                  <p className="text-gray-500 text-xs font-mono">{cert.issuer}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Technical Core Section */}
        <div className="mt-32">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
            <span className="h-px w-12 bg-gray-700"></span>Technical Core<span className="h-px flex-1 bg-gray-700"></span>
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.05 }} className="p-5 rounded-xl bg-[#111]/40 border border-gray-800/60 hover:border-cyan-500/30 hover:bg-[#111] transition-all duration-300 group">
                <h3 className="text-xs font-mono text-cyan-400 tracking-wider uppercase mb-3 group-hover:text-cyan-300 transition-colors">{skill.category}</h3>
                <ul className="space-y-2">
                  {skill.items.map((item, i) => (
                    <li key={i} className="text-sm text-gray-400 font-medium flex items-center gap-2"><span className="w-1 h-1 rounded-full bg-gray-700 group-hover:bg-cyan-500 transition-colors"></span>{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="mt-32">
          <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
            <span className="h-px w-12 bg-gray-700"></span>Featured Builds<span className="h-px flex-1 bg-gray-700"></span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="group relative rounded-xl bg-[#111] border border-gray-800 p-6 hover:border-gray-600 transition-all duration-300">
                <div className={`absolute -inset-0.5 bg-linear-to-r rounded-xl opacity-0 group-hover:opacity-20 transition duration-500 blur ${isPartyMode ? 'from-rose-500 to-indigo-500' : 'from-purple-500 via-cyan-500 to-emerald-500'}`}></div>
                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">{project.title}</h3>
                    <div className="flex gap-3 text-gray-400">
                      <a href={project.github} target="_blank" rel="noreferrer" className="hover:text-white hover:scale-110 transition-all"><GithubIcon size={18} /></a>
                      {project.link !== "#" && <a href={project.link} target="_blank" rel="noreferrer" className="hover:text-white hover:scale-110 transition-all"><ExternalLink size={18} /></a>}
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mb-6 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto pt-4">
                    {project.tech.map((tech, i) => <span key={i} className="text-xs font-mono px-2 py-1 bg-gray-800/50 text-gray-300 rounded-md border border-gray-700/50">{tech}</span>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Download Resume */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-40 mb-10 flex justify-center">
          <a href="/Parth_Chaudhari_Resume.pdf.pdf" download="Parth_Chaudhari_Resume.pdf" className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white bg-[#111] rounded-full border border-gray-700 hover:border-cyan-500 transition-all duration-300 overflow-hidden shadow-2xl hover:shadow-cyan-500/20">
            <div className="absolute inset-0 bg-linear-to-r from-purple-500/10 via-cyan-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <span className="relative z-10 flex items-center gap-3 text-lg">Download Resume <DownloadIcon size={22} className="group-hover:translate-y-1 transition-transform duration-300" /></span>
          </a>
        </motion.div>
      </main>
    </div>
  );
};

export default App;
