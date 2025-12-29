import React, { useState, useEffect, useRef } from 'react';
import { Github, Linkedin, Mail, Send, CheckCircle, ChevronRight, Circle, MoreHorizontal } from 'lucide-react';

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [hoveredLine, setHoveredLine] = useState(null);
  const observerRefs = useRef([]);

  const codeLines = [
    "import React, { useState } from 'react';",
    "import { ContactForm } from '@/components';",
    "",
    "// Contact GDG on Campus CIT",
    "interface FormData {",
    "  name: string;",
    "  email: string;",
    "  message: string;",
    "}",
    "",
    "const ContactUs = () => {",
    "  const [formData, setFormData] = useState<FormData>({});",
    "  ",
    "  const handleSubmit = async (data: FormData) => {",
    "    await sendMessage(data);",
    "  };",
    "  ",
    "  return <ContactForm onSubmit={handleSubmit} />;",
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

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);
    
    setTimeout(() => {
      setIsSending(false);
      setShowSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
    }, 1500);
  };

  const renderCodeLine = (line, index) => {
    if (line.includes('import')) {
      return (
        <div key={index}>
          <span className="text-[#ff006e]">import</span>
          <span className="text-[#c9d1d9]"> {line.split('import')[1]}</span>
        </div>
      );
    }
    if (line.includes('//')) {
      return <div key={index}><span className="text-[#6e7681]">{line}</span></div>;
    }
    if (line.includes('interface') || line.includes('const') || line.includes('async')) {
      return <div key={index}><span className="text-[#ff006e]">{line.split(':')[0]}</span><span className="text-[#c9d1d9]">{line.split(':')[1] ? ':' + line.split(':')[1] : ''}</span></div>;
    }
    return <div key={index}><span className="text-[#c9d1d9]">{line}</span></div>;
  };

  return (
    <div className="relative min-h-screen bg-[#0d1117] text-[#c9d1d9] overflow-hidden font-mono ml-[304px] lg:mr-24">
      {/* VS Code Tab Bar */}
      <div className="bg-[#161b22] border-b border-[#30363d] flex items-center">
        <div className="flex items-center gap-2 px-4 py-2 bg-[#0d1117] border-r border-[#30363d] text-sm min-w-[200px] group">
          <span className="text-[#00f5ff]">⚛️</span>
          <span className="flex-1">ContactUs.tsx</span>
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
        <span className="text-[#c9d1d9]">ContactUs.tsx</span>
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
          <div className="space-y-[2px] text-xs md:text-sm mb-8 max-w-2xl mx-auto">
            {codeLines.map((line, index) => renderCodeLine(line, index))}
          </div>

          {/* Rendered Content */}
          <div className="max-w-2xl mx-auto z-10 w-full py-12">
            <div className="text-xs text-[#6e7681] mb-8">
              {'/* ==================== RENDERED OUTPUT ==================== */'}
            </div>

            <div 
              ref={el => observerRefs.current[0] = el}
              data-animate="header"
              className={visibleElements.has('header') ? 'animate-slideDown' : 'opacity-0'}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-transparent bg-gradient-to-r from-[#ff006e] via-[#8338ec] to-[#00f5ff] bg-clip-text animate-gradient">
                Contact Us
              </h2>
              <p className="text-center text-[#8b949e] mb-12">
                Have questions? We'd love to hear from you. Send us a message!
              </p>
            </div>
            
            <div 
              ref={el => observerRefs.current[1] = el}
              data-animate="form"
              className={`bg-[#161b22] border border-[#30363d] rounded-xl p-8 hover:border-[#8338ec]/40 transition-all relative overflow-hidden ${
                visibleElements.has('form') ? 'animate-zoomIn' : 'opacity-0 scale-95'
              }`}
            >
              {/* Animated background particles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff006e]/10 rounded-full blur-2xl animate-float" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#00f5ff]/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />
              </div>

              {/* Success Message */}
              {showSuccess && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#161b22]/95 backdrop-blur-sm z-20 animate-fadeIn rounded-xl">
                  <div className="text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#00f5ff]/20 rounded-full mb-4 animate-scaleIn">
                      <CheckCircle size={32} className="text-[#00f5ff]" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#00f5ff] mb-2">Message Sent!</h3>
                    <p className="text-[#8b949e]">We'll get back to you soon.</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                <div 
                  className={`transform transition-all duration-300 ${
                    visibleElements.has('form') ? 'animate-slideRight' : 'opacity-0'
                  }`}
                  style={{ animationDelay: '0.1s' }}
                >
                  <label htmlFor="name" className="block text-sm font-medium text-[#c9d1d9] mb-2 flex items-center gap-2">
                    <span className="text-[#8b949e]">{'// '}</span>
                    Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-3 bg-[#0d1117] border rounded-lg focus:outline-none text-white transition-all placeholder-[#6e7681] ${
                        focusedField === 'name' 
                          ? 'border-[#00f5ff] ring-2 ring-[#00f5ff]/20 shadow-lg shadow-[#00f5ff]/20' 
                          : 'border-[#30363d]'
                      }`}
                      placeholder="Your full name"
                      required
                    />
                    {focusedField === 'name' && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#00f5ff] animate-pulse">
                        ▊
                      </div>
                    )}
                  </div>
                </div>
                
                <div 
                  className={`transform transition-all duration-300 ${
                    visibleElements.has('form') ? 'animate-slideRight' : 'opacity-0'
                  }`}
                  style={{ animationDelay: '0.2s' }}
                >
                  <label htmlFor="email" className="block text-sm font-medium text-[#c9d1d9] mb-2 flex items-center gap-2">
                    <span className="text-[#8b949e]">{'// '}</span>
                    Email
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full px-4 py-3 bg-[#0d1117] border rounded-lg focus:outline-none text-white transition-all placeholder-[#6e7681] ${
                        focusedField === 'email' 
                          ? 'border-[#8338ec] ring-2 ring-[#8338ec]/20 shadow-lg shadow-[#8338ec]/20' 
                          : 'border-[#30363d]'
                      }`}
                      placeholder="your.email@example.com"
                      required
                    />
                    {focusedField === 'email' && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8338ec] animate-pulse">
                        ▊
                      </div>
                    )}
                  </div>
                </div>
                
                <div 
                  className={`transform transition-all duration-300 ${
                    visibleElements.has('form') ? 'animate-slideRight' : 'opacity-0'
                  }`}
                  style={{ animationDelay: '0.3s' }}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-[#c9d1d9] mb-2 flex items-center gap-2">
                    <span className="text-[#8b949e]">{'// '}</span>
                    Message
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      rows="5"
                      className={`w-full px-4 py-3 bg-[#0d1117] border rounded-lg focus:outline-none text-white transition-all resize-none placeholder-[#6e7681] ${
                        focusedField === 'message' 
                          ? 'border-[#ff006e] ring-2 ring-[#ff006e]/20 shadow-lg shadow-[#ff006e]/20' 
                          : 'border-[#30363d]'
                      }`}
                      placeholder="Tell us what's on your mind..."
                      required
                    ></textarea>
                    {focusedField === 'message' && (
                      <div className="absolute right-3 top-3 text-[#ff006e] animate-pulse">
                        ▊
                      </div>
                    )}
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isSending}
                  className={`group w-full px-8 py-4 bg-gradient-to-r from-[#ff006e] to-[#8338ec] rounded-lg font-semibold hover:from-[#ff1a7f] hover:to-[#9647f5] transition-all duration-300 hover:shadow-xl hover:shadow-[#ff006e]/50 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${
                    visibleElements.has('form') ? 'animate-popIn' : 'opacity-0'
                  }`}
                  style={{ animationDelay: '0.4s' }}
                >
                  {isSending ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
              
              <div 
                className={`mt-8 pt-8 border-t border-[#30363d] ${
                  visibleElements.has('form') ? 'animate-fadeIn' : 'opacity-0'
                }`}
                style={{ animationDelay: '0.5s' }}
              >
                <div className="flex items-center justify-center space-x-2 text-[#c9d1d9] mb-6 group cursor-pointer hover:text-[#00f5ff] transition-colors">
                  <Mail size={20} className="text-[#00f5ff] group-hover:scale-110 transition-transform" />
                  <span className="font-mono">gdg@college.edu</span>
                </div>
                
                <div className="flex justify-center space-x-6">
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 rounded-lg bg-[#1f6feb]/20 text-[#8b949e] hover:text-[#1f6feb] hover:bg-[#1f6feb]/30 transition-all hover:scale-110 hover:rotate-6 relative"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={24} />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#1f6feb] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      LinkedIn
                    </span>
                  </a>

                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-3 rounded-lg bg-[#8338ec]/20 text-[#8b949e] hover:text-[#8338ec] hover:bg-[#8338ec]/30 transition-all hover:scale-110 hover:rotate-6 relative"
                    aria-label="GitHub"
                  >
                    <Github size={24} />
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-[#8338ec] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      GitHub
                    </span>
                  </a>
                </div>
              </div>
            </div>

            {/* Additional Info */}
            <div 
              ref={el => observerRefs.current[2] = el}
              data-animate="info"
              className={`mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 ${
                visibleElements.has('info') ? '' : 'opacity-0'
              }`}
            >
              {[
                { icon: '⚡', label: 'Fast Response', desc: 'Within 24 hours', color: '#00f5ff' },
                { icon: '🔒', label: 'Secure', desc: 'Your data is safe', color: '#8338ec' },
                { icon: '💬', label: 'Open Chat', desc: 'Always available', color: '#ff006e' }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`bg-[#161b22] border border-[#30363d] rounded-lg p-4 text-center hover:border-[#8b949e] transition-all hover:scale-105 ${
                    visibleElements.has('info') ? 'animate-slideUp' : ''
                  }`}
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="text-sm font-semibold mb-1" style={{ color: item.color }}>
                    {item.label}
                  </div>
                  <div className="text-xs text-[#8b949e]">{item.desc}</div>
                </div>
              ))}
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
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
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
          0% { opacity: 0; transform: scale(0.8); }
          50% { transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes scaleIn {
          0% { transform: scale(0); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
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
        .animate-slideUp {
          animation: slideUp 0.8s ease-out forwards;
        }
        .animate-zoomIn {
          animation: zoomIn 0.8s ease-out forwards;
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-popIn {
          animation: popIn 0.6s ease-out forwards;
        }
        .animate-scaleIn {
          animation: scaleIn 0.6s ease-out forwards;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default ContactUs;