import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Terminal, Award } from 'lucide-react';

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

const certifications = [
  { name: "Introduction to Large Language Models", issuer: "Google Cloud", link: "https://www.skills.google/public_profiles/80eb5874-91ba-4fcb-a602-2101f65410d0/badges/24958771" },
  { name: "Prompt Design in Vertex AI", issuer: "Google Cloud", link: "https://www.skills.google/public_profiles/80eb5874-91ba-4fcb-a602-2101f65410d0/badges/24941120" },
  { name: "Agent Fundamentals", issuer: "Google Cloud", link: "https://www.skills.google/public_profiles/80eb5874-91ba-4fcb-a602-2101f65410d0/badges/24843753" }
];
const research = [
  { title: "TaskFlow Optimizer", achievement: "Shortlisted for presentation at IEEE International Conference", description: "Focused on graph analytics and machine learning for distributed task scheduling." }
];

const projects = [
  { title: "RiskSight", description: "ML and RAG-powered financial risk assessment system.", tech: ["Python", "LangChain", "Streamlit"], link: "https://risksight-hkdtllhbswncfgku7qc5p4.streamlit.app/", github: "https://github.com/0duckie0/RiskSight" },
  { title: "GameLens", description: "Sentiment analysis for gaming market forecasting.", tech: ["Python", "NLTK", "Reddit API"], link: "https://gamelenss.streamlit.app/", github: "https://github.com/0duckie0/GameLens" },
  { title: "Financial Stress Analyzer", description: "AI-driven personal finance stress analysis.", tech: ["Python", "Flask"], link: "https://financial-stress-app.vercel.app/", github: "https://github.com/0duckie0/financial-stress-app" },
  { title: "TaskFlow-Optimizer", description: "Graph-based workflow optimization.", tech: ["Python", "Neo4j", "NetworkX"], link: "#", github: "https://github.com/0duckie0/TaskFlow-Optimizer" }
];

const metrics = [
  { label: "End-to-End Projects", value: "4+", icon: <RocketIcon size={24} className="text-purple-400" /> },
  { label: "Research Papers", value: "2+", icon: <CommitIcon size={24} className="text-cyan-400" /> },
  { label: "Tech Stack Tools", value: "15+", icon: <CodeIcon size={24} className="text-emerald-400" /> }
];

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
    <div className={`min-h-screen font-sans transition-colors duration-700 ${isPartyMode ? 'bg-slate-900 text-white' : 'bg-[#0a0a0a] text-gray-300'}`}>
      <main className="max-w-5xl mx-auto px-6 pt-20 pb-24">
        
        {/* Intro Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mb-24">
          <h1 className="text-5xl font-extrabold text-white mb-6">Parth Chaudhari</h1>
          <p className="text-lg text-gray-400">Computer Science student focused on Machine Learning, AI, and Data Analytics.</p>
        </motion.div>

        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-24">
          {metrics.map((metric, i) => (
            <div key={i} className="p-6 rounded-2xl bg-[#111] border border-gray-800 flex items-center gap-5">
              <div className="p-4 bg-gray-900 rounded-xl">{metric.icon}</div>
              <div>
                <h4 className="text-3xl font-extrabold text-white">{metric.value}</h4>
                <p className="text-sm text-gray-400">{metric.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Research */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold text-white mb-8">Research & Achievements</h2>
          {research.map((item, i) => (
            <div key={i} className="p-6 rounded-xl bg-[#111] border border-gray-800">
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="text-cyan-400 mb-2">{item.achievement}</p>
              <p className="text-gray-400 text-sm">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Certifications & Milestones */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold text-white mb-8">Certifications & Milestones</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <motion.a key={index} href={cert.link} target="_blank" className="p-6 rounded-xl bg-[#111] border border-gray-800 hover:border-cyan-500/50 transition-all group flex items-start gap-4">
                <div className="p-3 bg-gray-900 rounded-lg text-cyan-400"><Award size={24} /></div>
                <div>
                  <h3 className="text-white font-bold text-sm">{cert.name}</h3>
                  <p className="text-gray-500 text-xs font-mono">{cert.issuer}</p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Technical Core */}
        <div className="mb-24">
          <h2 className="text-2xl font-bold text-white mb-8">Technical Core</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {skills.map((skill, i) => (
              <div key={i} className="p-5 rounded-xl bg-[#111] border border-gray-800">
                <h3 className="text-xs text-cyan-400 uppercase mb-3">{skill.category}</h3>
                <ul className="space-y-2">
                  {skill.items.map((item, j) => <li key={j} className="text-sm text-gray-400">{item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
};

export default App;
