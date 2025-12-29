import React, { useState, useEffect, useRef } from 'react';
import { ChevronRight, Circle, Search, MoreHorizontal } from 'lucide-react';

const Home = ({ navigate }) => {
  const [typedCode, setTypedCode] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [hoveredLine, setHoveredLine] = useState(null);
  
  const codeLines = [
    "import React from 'react';",
    "import { GDG } from './community';",
    "",
    "// Welcome to Google Developer Groups",
    "// Building the future with Google technologies",
    "",
    "export const CollegeChapter = () => {",
    "  return (",
    "    <Community ",
    "      name=\"GDG College\"",
    "      members={500}",
    "      events={50}",
    "      projects={20}",
    "    />",
    "  );",
    "};",
    "",
    "export default CollegeChapter;"
  ];

  const observerRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target.dataset.animate]));
          }
        });
      },
      { threshold: 0.1 }
    );

    observerRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (currentLineIndex < codeLines.length) {
      const timer = setTimeout(() => {
        setCurrentLineIndex(prev => prev + 1);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [currentLineIndex]);

  const renderCodeLine = (line, index) => {
    const isVisible = currentLineIndex > index;
    
    if (line.includes('import')) {
      const parts = line.match(/(import)\s+(\{?\s*\w+\s*\}?)\s+(from)\s+('.*')/);
      if (parts) {
        return (
          <div key={index} className={isVisible ? 'animate-typeLine' : 'opacity-0'}>
            <span className="text-[#ff006e]">{parts[1]}</span>
            <span className="text-[#00f5ff]"> {parts[2]} </span>
            <span className="text-[#ff006e]">{parts[3]}</span>
            <span className="text-[#8338ec]"> {parts[4]}</span>
            <span className="text-[#c9d1d9]">;</span>
          </div>
        );
      }
    }
    
    if (line.includes('//')) {
      return (
        <div key={index} className={isVisible ? 'animate-typeLine' : 'opacity-0'}>
          <span className="text-[#6e7681]">{line}</span>
        </div>
      );
    }
    
    if (line.includes('export')) {
      return (
        <div key={index} className={isVisible ? 'animate-typeLine' : 'opacity-0'}>
          <span className="text-[#ff006e]">export </span>
          <span className="text-[#ff006e]">const </span>
          <span className="text-[#ffd700]">CollegeChapter</span>
          <span className="text-[#c9d1d9]"> = () =&gt; {'{'}</span>
        </div>
      );
    }
    
    if (line.includes('return')) {
      return (
        <div key={index} className={isVisible ? 'animate-typeLine' : 'opacity-0'}>
          <span className="text-[#ff006e]">  return</span>
          <span className="text-[#c9d1d9]"> (</span>
        </div>
      );
    }
    
    if (line.includes('<Community')) {
      return (
        <div key={index} className={isVisible ? 'animate-typeLine' : 'opacity-0'}>
          <span className="text-[#c9d1d9]">    &lt;</span>
          <span className="text-[#00f5ff]">Community</span>
          <span className="text-[#c9d1d9]"> </span>
        </div>
      );
    }
    
    if (line.includes('name=') || line.includes('members=') || line.includes('events=') || line.includes('projects=')) {
      const match = line.match(/(\w+)=(\{?\d+\}?|"[^"]*")/);
      if (match) {
        return (
          <div key={index} className={isVisible ? 'animate-typeLine' : 'opacity-0'}>
            <span className="text-[#c9d1d9]">      </span>
            <span className="text-[#ffd700]">{match[1]}</span>
            <span className="text-[#c9d1d9]">=</span>
            <span className={match[2].startsWith('{') ? 'text-[#00f5ff]' : 'text-[#8338ec]'}>{match[2]}</span>
          </div>
        );
      }
    }
    
    return (
      <div key={index} className={isVisible ? 'animate-typeLine' : 'opacity-0'}>
        <span className="text-[#c9d1d9]">{line}</span>
      </div>
    );
  };

  return (
    <div className="relative min-h-screen bg-[#0d1117] text-[#c9d1d9] overflow-hidden font-mono">
      <div className="ml-[304px] pt-0 pb-20 lg:mr-24">
        {/* VS Code Tab Bar */}
        <div className="bg-[#161b22] border-b border-[#30363d] flex items-center">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#0d1117] border-r border-[#30363d] text-sm min-w-[200px] group">
            <span className="text-[#00f5ff]">⚛️</span>
            <span className="flex-1">Home.tsx</span>
            <Circle size={8} className="text-[#8b949e] fill-[#8b949e]" />
            <button className="text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#21262d] rounded px-1 transition-colors opacity-0 group-hover:opacity-100">✕</button>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 text-sm text-[#8b949e] hover:text-white hover:bg-[#21262d] cursor-pointer transition-colors">
            <span>{'{ }'}</span>
            <span>community.json</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2 text-sm text-[#8b949e] hover:text-white hover:bg-[#21262d] cursor-pointer transition-colors">
            <span>📝</span>
            <span>README.md</span>
          </div>
          <div className="flex-1"></div>
          <div className="flex items-center gap-2 px-4 py-2">
            <button className="text-[#8b949e] hover:text-white p-1 hover:bg-[#21262d] rounded transition-colors">
              <MoreHorizontal size={16} />
            </button>
          </div>
        </div>

        {/* Breadcrumb */}
        <div className="bg-[#161b22] border-b border-[#30363d] px-4 py-1 text-xs flex items-center gap-2 text-[#8b949e]">
          <span>gdg</span>
          <ChevronRight size={12} />
          <span>src</span>
          <ChevronRight size={12} />
          <span>pages</span>
          <ChevronRight size={12} />
          <span className="text-[#c9d1d9]">Home.tsx</span>
        </div>

        {/* Editor Content */}
        <div className="flex">
          {/* Line numbers */}
          <div className="bg-[#0d1117] text-[#6e7681] text-right select-none border-r border-[#30363d] sticky left-0">
            {codeLines.map((_, i) => (
              <div 
                key={i} 
                className={`px-4 py-[2px] hover:bg-[#161b22] transition-colors ${
                  hoveredLine === i ? 'bg-[#161b22]' : ''
                } ${currentLineIndex > i ? 'animate-fadeIn' : 'opacity-0'}`}
                onMouseEnter={() => setHoveredLine(i)}
                onMouseLeave={() => setHoveredLine(null)}
              >
                {i + 1}
              </div>
            ))}
          </div>

          {/* Code editor */}
          <div className="flex-1 p-4 md:p-8">
            <div className="space-y-[2px] text-xs md:text-sm mb-8 max-w-7xl mx-auto">
              {codeLines.map((line, index) => renderCodeLine(line, index))}
              {currentLineIndex === codeLines.length && (
                <div className="flex items-center animate-fadeIn">
                  <span className="animate-blink text-[#00f5ff]">▊</span>
                </div>
              )}
            </div>

            {/* Rendered Content */}
            <div 
              className="mt-12 space-y-8 max-w-7xl mx-auto"
              ref={el => observerRefs.current[0] = el}
              data-animate="hero"
            >
              {/* Comment separator */}
              <div className="text-xs text-[#6e7681] mb-4">
                {'/* ==================== RENDERED OUTPUT ==================== */'}
              </div>

              <div className={visibleElements.has('hero') ? 'animate-slideUp' : 'opacity-0'}>
                <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold mb-4 leading-tight">
                  <span className="text-white">Google Developer</span>
                  <br />
                  <span className="text-transparent bg-gradient-to-r from-[#ff006e] via-[#8338ec] to-[#00f5ff] bg-clip-text animate-gradient">
                    Groups College
                  </span>
                </h1>
                <p className="text-lg md:text-xl text-[#8b949e] max-w-3xl">
                  A community of student developers building the future with Google technologies
                </p>
              </div>

              {/* Action Buttons */}
              <div 
                className={`flex flex-wrap gap-4 ${visibleElements.has('hero') ? 'animate-slideUp' : 'opacity-0'}`}
                style={{ animationDelay: '0.2s' }}
              >
                <button
                  onClick={() => navigate('contact')}
                  className="group px-6 md:px-8 py-3 bg-[#1f6feb] hover:bg-[#388bfd] text-white rounded flex items-center gap-2 transition-all duration-200 font-medium shadow-lg hover:shadow-xl hover:shadow-[#1f6feb]/50 hover:scale-105"
                >
                  <span>▶</span>
                  <span>Join Community</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </button>
                <button
                  onClick={() => navigate('members')}
                  className="px-6 md:px-8 py-3 bg-[#21262d] hover:bg-[#30363d] text-[#00f5ff] rounded flex items-center gap-2 transition-all duration-200 font-medium border border-[#30363d] hover:scale-105"
                >
                  <span>👥</span>
                  <span>View Team</span>
                </button>
                <button
                  className="px-6 md:px-8 py-3 bg-transparent hover:bg-[#21262d] text-[#8b949e] hover:text-[#ff006e] rounded flex items-center gap-2 transition-all duration-200 font-medium border border-[#30363d] hover:scale-105"
                >
                  <span>📅</span>
                  <span className="hidden sm:inline">Upcoming </span>
                  <span>Events</span>
                </button>
              </div>

              {/* Stats */}
              <div 
                className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12"
                ref={el => observerRefs.current[1] = el}
                data-animate="stats"
              >
                {[
                  { key: 'members', value: '500+', label: 'Active Members', color: '#00f5ff', icon: '👥' },
                  { key: 'events', value: '50+', label: 'Events Hosted', color: '#8338ec', icon: '📅' },
                  { key: 'projects', value: '20+', label: 'Projects Built', color: '#ff006e', icon: '💻' }
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className={`bg-[#161b22] border border-[#30363d] rounded p-6 hover:border-[#8b949e] hover:shadow-lg transition-all duration-300 group ${
                      visibleElements.has('stats') ? 'animate-popIn' : 'opacity-0 scale-90'
                    }`}
                    style={{ 
                      boxShadow: `0 4px 20px ${stat.color}20`,
                      animationDelay: `${idx * 0.1}s`
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="text-xs text-[#8b949e]">
                        // stats.{stat.key}
                      </div>
                      <span className="text-2xl group-hover:scale-110 transition-transform">{stat.icon}</span>
                    </div>
                    <div className="text-4xl md:text-5xl font-bold mb-2 group-hover:scale-105 transition-transform" style={{ color: stat.color }}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-[#8b949e]">{stat.label}</div>
                    <div className="mt-3 h-1 rounded-full bg-[#21262d] overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-1000 ${
                          visibleElements.has('stats') ? 'w-[85%]' : 'w-0'
                        }`}
                        style={{ 
                          backgroundColor: stat.color,
                          transitionDelay: `${idx * 0.2}s`
                        }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Tech Stack */}
              <div 
                className="mt-12"
                ref={el => observerRefs.current[2] = el}
                data-animate="tech"
              >
                <div className={`flex items-center gap-3 mb-4 ${visibleElements.has('tech') ? 'animate-slideRight' : 'opacity-0'}`}>
                  <div className="text-sm text-[#8b949e]">
                    {'/* Technologies We Use */'}
                  </div>
                  <div className="flex-1 h-px bg-[#30363d]"></div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { name: 'Android', color: '#3ddc84', icon: '🤖' },
                    { name: 'Flutter', color: '#54c5f8', icon: '🎨' },
                    { name: 'Firebase', color: '#ffca28', icon: '🔥' },
                    { name: 'TensorFlow', color: '#ff6f00', icon: '🧠' },
                    { name: 'Cloud', color: '#4285f4', icon: '☁️' },
                    { name: 'Angular', color: '#dd0031', icon: '🅰️' },
                    { name: 'Kotlin', color: '#7f52ff', icon: '💎' },
                    { name: 'Go', color: '#00add8', icon: '🐹' }
                  ].map((tech, idx) => (
                    <div
                      key={idx}
                      className={`group bg-[#161b22] border border-[#30363d] rounded px-4 py-3 hover:border-[#8b949e] hover:bg-[#21262d] transition-all duration-200 cursor-default ${
                        visibleElements.has('tech') ? 'animate-slideUp' : 'opacity-0'
                      }`}
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl group-hover:scale-125 transition-transform">{tech.icon}</span>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{tech.name}</div>
                          <div
                            className="w-full h-1 rounded-full mt-1"
                            style={{ backgroundColor: tech.color + '40' }}
                          >
                            <div
                              className={`h-full rounded-full transition-all duration-1000 ${
                                visibleElements.has('tech') ? 'w-[85%]' : 'w-0'
                              }`}
                              style={{ 
                                backgroundColor: tech.color,
                                transitionDelay: `${idx * 0.1}s`
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What We Do */}
              <div 
                className="mt-12 space-y-4"
                ref={el => observerRefs.current[3] = el}
                data-animate="offer"
              >
                <div className={`text-sm text-[#8b949e] ${visibleElements.has('offer') ? 'animate-fadeIn' : 'opacity-0'}`}>
                  {'/* What We Offer */'}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { title: 'Learn', desc: 'Workshops and study sessions', icon: '📚' },
                    { title: 'Build', desc: 'Hands-on projects and hackathons', icon: '🛠️' },
                    { title: 'Network', desc: 'Connect with developers globally', icon: '🌐' }
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className={`bg-[#161b22] border border-[#30363d] rounded p-6 hover:border-[#8b949e] transition-all hover:scale-105 ${
                        visibleElements.has('offer') ? 'animate-popIn' : 'opacity-0 scale-90'
                      }`}
                      style={{ animationDelay: `${idx * 0.1}s` }}
                    >
                      <div className="text-3xl mb-3">{item.icon}</div>
                      <div className="text-lg font-semibold mb-2 text-white">{item.title}</div>
                      <div className="text-sm text-[#8b949e]">{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes typeLine {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.8); }
          50% { transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
        .animate-typeLine {
          animation: typeLine 0.3s ease-out forwards;
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }
        .animate-slideRight {
          animation: slideRight 0.8s ease-out forwards;
        }
        .animate-popIn {
          animation: popIn 0.6s ease-out forwards;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;