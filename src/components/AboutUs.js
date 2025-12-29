import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight, Circle, MoreHorizontal } from 'lucide-react';

const AboutUs = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [hoveredLine, setHoveredLine] = useState(null);
  const observerRefs = useRef([]);

  const codeLines = [
    "import React from 'react';",
    "import { Mission, Vision, Values } from '@/components';",
    "",
    "// About GDG on Campus CIT",
    "interface AboutProps {",
    "  mission: string;",
    "  vision: string;",
    "  technologies: string[];",
    "}",
    "",
    "export const AboutUs: React.FC<AboutProps> = () => {",
    "  return (",
    "    <section className=\"about-gdg\">",
    "      <Mission />",
    "      <Vision />",
    "      <Technologies />",
    "    </section>",
    "  );",
    "};",
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements(prev => new Set([...prev, entry.target.dataset.animate]));
          }
        });
      },
      { threshold: 0.2 }
    );

    observerRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const renderCodeLine = (line, index) => {
    if (line.includes('import')) {
      const parts = line.match(/(import)\s+(\{?[^}]*\}?)\s+(from)\s+('.*')/);
      if (parts) {
        return (
          <div key={index}>
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
      return <div key={index}><span className="text-[#6e7681]">{line}</span></div>;
    }
    if (line.includes('interface') || line.includes('export')) {
      return <div key={index}><span className="text-[#ff006e]">{line}</span></div>;
    }
    return <div key={index}><span className="text-[#c9d1d9]">{line}</span></div>;
  };

  return (
    <div className="relative min-h-screen bg-[#0d1117] text-[#c9d1d9] overflow-hidden font-mono ml-[304px] lg:mr-24">
      {/* VS Code Tab Bar */}
      <div className="bg-[#161b22] border-b border-[#30363d] flex items-center">
        <div className="flex items-center gap-2 px-4 py-2 bg-[#0d1117] border-r border-[#30363d] text-sm min-w-[200px] group">
          <span className="text-[#00f5ff]">⚛️</span>
          <span className="flex-1">AboutUs.tsx</span>
          <Circle size={8} className="text-[#8b949e] fill-[#8b949e]" />
          <button className="text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#21262d] rounded px-1 transition-colors opacity-0 group-hover:opacity-100">✕</button>
        </div>
        <div className="flex-1"></div>
        <button className="text-[#8b949e] hover:text-white p-1 hover:bg-[#21262d] rounded transition-colors mr-2">
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Breadcrumb */}
      <div className="bg-[#161b22] border-b border-[#30363d] px-4 py-1 text-xs flex items-center gap-2 text-[#8b949e]">
        <span>gdg</span>
        <ChevronRight size={12} />
        <span>src</span>
        <ChevronRight size={12} />
        <span>pages</span>
        <ChevronRight size={12} />
        <span className="text-[#c9d1d9]">AboutUs.tsx</span>
      </div>

      {/* Editor Content */}
      <div className="flex min-h-screen">
        {/* Line numbers */}
        <div className="bg-[#0d1117] text-[#6e7681] text-right select-none border-r border-[#30363d] sticky left-0">
          {codeLines.map((_, i) => (
            <div 
              key={i} 
              className={`px-4 py-[2px] hover:bg-[#161b22] transition-colors ${
                hoveredLine === i ? 'bg-[#161b22]' : ''
              }`}
              onMouseEnter={() => setHoveredLine(i)}
              onMouseLeave={() => setHoveredLine(null)}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Code editor */}
        <div className="flex-1 p-4 md:p-8">
          <div className="space-y-[2px] text-xs md:text-sm mb-8 max-w-5xl mx-auto">
            {codeLines.map((line, index) => renderCodeLine(line, index))}
          </div>

          {/* Rendered Content */}
          <div className="max-w-5xl mx-auto z-10 py-12">
            <div className="text-xs text-[#6e7681] mb-8">
              {'/* ==================== RENDERED OUTPUT ==================== */'}
            </div>

            <div 
              ref={el => observerRefs.current[0] = el}
              data-animate="header"
              className={visibleElements.has('header') ? 'animate-slideDown' : 'opacity-0'}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-transparent bg-gradient-to-r from-[#ff006e] via-[#8338ec] to-[#00f5ff] bg-clip-text animate-gradient">
                About Us
              </h2>
              <p className="text-center text-[#8b949e] mb-12 max-w-2xl mx-auto">
                Empowering students to explore, learn, and innovate with Google's cutting-edge technologies
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div 
                ref={el => observerRefs.current[1] = el}
                data-animate="mission"
                className={`group bg-[#161b22] border border-[#30363d] rounded-xl p-8 hover:border-[#ff006e] transition-all duration-300 hover:shadow-xl hover:shadow-[#ff006e]/20 hover:-translate-y-1 ${
                  visibleElements.has('mission') ? 'animate-slideRight' : 'opacity-0 translate-x-[-50px]'
                }`}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#ff006e] to-[#8338ec] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-transform">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-[#00f5ff]">Our Mission</h3>
                <p className="text-[#c9d1d9] leading-relaxed">
                  To empower students with cutting-edge Google technologies, foster a collaborative learning environment, and build innovative solutions that make a difference in our community and beyond.
                </p>
              </div>
              
              <div 
                ref={el => observerRefs.current[2] = el}
                data-animate="vision"
                className={`group bg-[#161b22] border border-[#30363d] rounded-xl p-8 hover:border-[#8338ec] transition-all duration-300 hover:shadow-xl hover:shadow-[#8338ec]/20 hover:-translate-y-1 ${
                  visibleElements.has('vision') ? 'animate-slideLeft' : 'opacity-0 translate-x-[50px]'
                }`}
                style={{ animationDelay: '0.2s' }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#8338ec] to-[#00f5ff] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-transform">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-[#00f5ff]">Our Vision</h3>
                <p className="text-[#c9d1d9] leading-relaxed">
                  To create a thriving developer ecosystem where students can explore emerging technologies, connect with industry experts, and transform ideas into impactful projects that shape the future.
                </p>
              </div>
              
              <div 
                ref={el => observerRefs.current[3] = el}
                data-animate="whatwedo"
                className={`md:col-span-2 group bg-[#161b22] border border-[#30363d] rounded-xl p-8 hover:border-[#00f5ff] transition-all duration-300 hover:shadow-xl hover:shadow-[#00f5ff]/20 hover:-translate-y-1 ${
                  visibleElements.has('whatwedo') ? 'animate-zoomIn' : 'opacity-0 scale-95'
                }`}
                style={{ animationDelay: '0.4s' }}
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#00f5ff] to-[#ff006e] rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-transform">
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="text-2xl font-semibold mb-4 text-[#00f5ff]">What We Do</h3>
                <p className="text-[#c9d1d9] leading-relaxed">
                  We organize workshops, hackathons, and tech talks featuring Google technologies including Cloud Platform, Firebase, TensorFlow, Flutter, and more. Our chapter provides hands-on learning experiences, mentorship opportunities, and a platform for students to collaborate on real-world projects while building their technical skills and professional network.
                </p>
              </div>
            </div>

            {/* Technologies Section */}
            <div 
              className="mt-16"
              ref={el => observerRefs.current[4] = el}
              data-animate="technologies"
            >
              <h3 className={`text-2xl font-bold text-center mb-8 text-white ${
                visibleElements.has('technologies') ? 'animate-fadeIn' : 'opacity-0'
              }`}>
                Technologies We Work With
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {['Firebase', 'TensorFlow', 'Flutter', 'Google Cloud', 'Android', 'Kubernetes'].map((tech, idx) => (
                  <div 
                    key={tech}
                    className={`px-6 py-3 bg-[#161b22] border border-[#30363d] rounded-full text-[#c9d1d9] hover:border-[#00f5ff] hover:text-[#00f5ff] hover:shadow-lg hover:shadow-[#00f5ff]/30 transition-all hover:scale-110 ${
                      visibleElements.has('technologies') ? 'animate-popIn' : 'opacity-0 scale-0'
                    }`}
                    style={{ animationDelay: `${idx * 0.1}s` }}
                  >
                    {tech}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideRight {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideLeft {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes zoomIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0); }
          50% { transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-slideDown {
          animation: slideDown 0.8s ease-out forwards;
        }
        .animate-slideRight {
          animation: slideRight 0.8s ease-out forwards;
        }
        .animate-slideLeft {
          animation: slideLeft 0.8s ease-out forwards;
        }
        .animate-zoomIn {
          animation: zoomIn 0.8s ease-out forwards;
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .animate-popIn {
          animation: popIn 0.5s ease-out forwards;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default AboutUs;