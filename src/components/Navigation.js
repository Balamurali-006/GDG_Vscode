import React, { useState } from 'react';
import { Menu, X as XIcon, Terminal as TerminalIcon, Bug, Package, Globe, Instagram, MessageCircle, Linkedin as LinkedinIcon, Circle } from 'lucide-react';

const Navigation = ({ currentRoute, navigate, showTerminal, setShowTerminal, showGDGInfo, setShowGDGInfo, openTabs, activeTab, openTab, closeTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showExtensions, setShowExtensions] = useState(false);
  const [showDebug, setShowDebug] = useState(false);
  const [showGDGModal, setShowGDGModal] = useState(false);

  const handleNavClick = (route) => {
    navigate(route);
    setMobileMenuOpen(false);
  };

  const routes = [
    { path: 'home', label: 'Home', icon: '⚛️' },
    { path: 'about', label: 'About Us', icon: '⚛️' },
    { path: 'members', label: 'Members', icon: '⚛️' },
    { path: 'contact', label: 'Contact Us', icon: '⚛️' }
  ];

  const fileRoutes = [
    { path: 'readme', label: 'README.md', icon: '📖' },
    { path: 'config', label: 'config.json', icon: '{ }' },
  ];

  const extensions = [
    { name: ' Theme', author: 'GDG', rating: '★★★★★', installed: true },
    { name: 'React Snippets', author: 'Microsoft', rating: '★★★★☆', installed: true },
    { name: 'Prettier', author: 'Prettier', rating: '★★★★★', installed: true },
    { name: 'ESLint', author: 'Microsoft', rating: '★★★★☆', installed: true }
  ];

  const gdgLinks = [
    {
      title: 'Join Community',
      url: 'https://gdg.community.dev/gdg-on-campus-coimbatore-institute-of-technology-coimbatore-india/',
      icon: <Globe size={20} />,
      color: '#00f5ff',
      description: 'Official GDG Community Website'
    },
    {
      title: 'Instagram',
      url: 'https://www.instagram.com/gdgoncampus_cit',
      icon: <Instagram size={20} />,
      color: '#ff006e',
      description: '@gdgoncampus_cit'
    },
    {
      title: 'WhatsApp',
      url: 'https://chat.whatsapp.com/IQ6BptPIFg85ZB7RdUq0No',
      icon: <MessageCircle size={20} />,
      color: '#3fb950',
      description: 'Join our WhatsApp group'
    },
    {
      title: 'LinkedIn',
      url: 'https://www.linkedin.com/company/gdg-on-campus-coimbatore-institute-of-technology/',
      icon: <LinkedinIcon size={20} />,
      color: '#1f6feb',
      description: 'GDG on Campus CIT'
    }
  ];

  const openGDGInfo = () => {
    setShowGDGModal(true);
    document.body.style.overflow = 'hidden';
  };

  const closeGDGInfo = () => {
    setShowGDGModal(false);
    document.body.style.overflow = 'auto';
  };

  const getTabInfo = (tab) => {
    const route = [...routes, ...fileRoutes].find(r => r.path === tab);
    if (route) return route;
    return { label: tab, icon: '⚛️' };
  };

  return (
    <>
      {/* VS Code Activity Bar */}
      <div className="fixed left-0 top-0 bottom-0 w-12 bg-[#21262d] border-r border-[#30363d] flex flex-col items-center py-4 gap-4 z-50">
        <div 
          className="w-8 h-8 flex items-center justify-center text-xl cursor-pointer text-[#00f5ff] border-l-2 border-[#00f5ff] transition-colors"
          title="Explorer"
        >
          📁
        </div>
        <div 
          className="w-8 h-8 flex items-center justify-center text-xl cursor-pointer text-[#8b949e] hover:text-[#ff006e] transition-colors"
          title="Search"
        >
          🔍
        </div>
        <div 
          className="w-8 h-8 flex items-center justify-center cursor-pointer text-[#8b949e] hover:text-[#8338ec] transition-colors"
          onClick={() => setShowDebug(!showDebug)}
          title="Debug Console"
        >
          <Bug size={20} />
        </div>
        <div 
          className="w-8 h-8 flex items-center justify-center cursor-pointer text-[#8b949e] hover:text-[#00f5ff] transition-colors"
          onClick={() => setShowExtensions(!showExtensions)}
          title="Extensions"
        >
          <Package size={20} />
        </div>
        <div className="flex-1"></div>
        <div 
          className="w-8 h-8 flex items-center justify-center cursor-pointer text-[#8b949e] hover:text-[#ff006e] transition-colors"
          onClick={() => setShowTerminal(!showTerminal)}
          title="Terminal"
        >
          <TerminalIcon size={20} />
        </div>
        <div 
          className="w-8 h-8 flex items-center justify-center text-xl cursor-pointer text-[#8b949e] hover:text-[#ff006e] transition-colors mb-2 relative group"
          onClick={openGDGInfo}
          title="GDG Information"
        >
          👤
          <span className="absolute right-full mr-2 bg-[#ff006e] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            GDG Info
          </span>
        </div>
      </div>

      {/* VS Code Sidebar */}
      <div className="fixed left-12 top-0 bottom-0 w-64 bg-[#161b22] border-r border-[#30363d] z-40 overflow-y-auto">
        <div className="p-4">
          <div className="text-xs text-[#8b949e] font-semibold mb-3 uppercase tracking-wider flex items-center justify-between">
            <span>Explorer</span>
            <button className="md:hidden text-[#8b949e] hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <XIcon size={16} /> : <Menu size={16} />}
            </button>
          </div>
          <div className={`space-y-1 ${mobileMenuOpen ? 'block' : 'hidden md:block'}`}>
            <div className="flex items-center gap-2 text-sm py-1 px-2 rounded cursor-pointer">
              <span className="text-[#8b949e]">▼</span>
              <span className="font-semibold text-[#c9d1d9]">gdg</span>
            </div>
            <div className="ml-4 space-y-1">
              {/* Git Branch Indicator */}
              <div className="flex items-center gap-2 text-xs py-1 px-2 mb-2 bg-[#21262d] rounded">
                <span className="text-[#00f5ff]">⎇</span>
                <span className="text-[#8b949e]">main</span>
                <span className="text-[#6e7681]">✓</span>
              </div>

              {/* Page Files */}
              {routes.map((route) => (
                <div
                  key={route.path}
                  onClick={() => handleNavClick(route.path)}
                  className={`flex items-center gap-2 text-sm py-1 px-2 rounded cursor-pointer transition-all ${
                    currentRoute === route.path 
                      ? 'bg-[#1f6feb]/20 text-[#00f5ff] animate-fadeIn' 
                      : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#c9d1d9]'
                  }`}
                >
                  <span className={currentRoute === route.path ? 'text-[#00f5ff]' : 'text-[#8338ec]'}>{route.icon}</span>
                  <span>{route.label.replace(/\s+/g, '')}.tsx</span>
                  {currentRoute === route.path && <span className="ml-auto text-[#00f5ff]">●</span>}
                </div>
              ))}

              {/* Other Files */}
              {fileRoutes.map((route) => (
                <div
                  key={route.path}
                  onClick={() => openTab(route.path)}
                  className={`flex items-center gap-2 text-sm py-1 px-2 rounded cursor-pointer transition-all ${
                    currentRoute === route.path 
                      ? 'bg-[#1f6feb]/20 text-[#00f5ff]' 
                      : 'text-[#8b949e] hover:bg-[#21262d] hover:text-[#c9d1d9]'
                  }`}
                >
                  <span className={currentRoute === route.path ? 'text-[#00f5ff]' : route.path === 'readme' ? 'text-[#8338ec]' : 'text-[#ff006e]'}>
                    {route.icon}
                  </span>
                  <span>{route.label}</span>
                  {currentRoute === route.path && <span className="ml-auto text-[#00f5ff]">●</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Extensions Panel */}
      {showExtensions && (
        <div className="fixed left-[304px] top-0 bottom-6 w-80 bg-[#161b22] border-r border-[#30363d] z-30 overflow-y-auto animate-slideInLeft">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[#c9d1d9]">EXTENSIONS</h3>
              <button onClick={() => setShowExtensions(false)} className="text-[#8b949e] hover:text-white">
                <XIcon size={16} />
              </button>
            </div>
            <div className="space-y-3">
              {extensions.map((ext, idx) => (
                <div key={idx} className="p-3 bg-[#0d1117] rounded border border-[#30363d] hover:border-[#8338ec] transition-all">
                  <div className="flex items-start justify-between mb-1">
                    <h4 className="text-sm font-medium text-[#c9d1d9]">{ext.name}</h4>
                    {ext.installed && <span className="text-xs text-[#00f5ff]">✓</span>}
                  </div>
                  <p className="text-xs text-[#8b949e] mb-2">{ext.author}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#ffd700]">{ext.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Debug Console */}
      {showDebug && (
        <div className="fixed left-[304px] top-0 bottom-6 w-96 bg-[#161b22] border-r border-[#30363d] z-30 overflow-y-auto animate-slideInLeft">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-[#c9d1d9]">DEBUG CONSOLE</h3>
              <button onClick={() => setShowDebug(false)} className="text-[#8b949e] hover:text-white">
                <XIcon size={16} />
              </button>
            </div>
            <div className="space-y-2 font-mono text-xs">
              <div className="text-[#8b949e]">
                <span className="text-[#00f5ff]">[Info]</span> Starting GDG Application...
              </div>
              <div className="text-[#8b949e]">
                <span className="text-[#00f5ff]">[Info]</span> Loading  Theme...
              </div>
              <div className="text-[#8b949e]">
                <span className="text-[#3fb950]">[Success]</span> All components loaded successfully
              </div>
              <div className="text-[#8b949e]">
                <span className="text-[#3fb950]">[Success]</span> React DevTools connected
              </div>
              <div className="text-[#8b949e]">
                <span className="text-[#00f5ff]">[Info]</span> Current route: {currentRoute}
              </div>
              <div className="text-[#8b949e]">
                <span className="text-[#00f5ff]">[Info]</span> Open tabs: {openTabs.length}
              </div>
              <div className="text-[#8b949e]">
                <span className="text-[#ffd700]">[Warning]</span> No errors detected
              </div>
            </div>
          </div>
        </div>
      )}

      {/* GDG Information Modal */}
      {showGDGModal && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeGDGInfo}
        >
          <div 
            className="bg-[#161b22] border border-[#30363d] rounded-xl max-w-2xl w-full animate-modalSlideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#ff006e] via-[#8338ec] to-[#00f5ff] p-6 rounded-t-xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">GDG on Campus</h3>
                  <p className="text-white/80 text-sm">Coimbatore Institute of Technology</p>
                </div>
                <button
                  onClick={closeGDGInfo}
                  className="p-2 hover:bg-white/20 rounded-lg text-white transition-all"
                >
                  <XIcon size={24} />
                </button>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <p className="text-[#c9d1d9] mb-6 leading-relaxed">
                Connect with us on our official platforms! Join our community, stay updated with events, and be part of the GDG family.
              </p>

              <div className="space-y-3">
                {gdgLinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 p-4 bg-[#0d1117] border border-[#30363d] rounded-lg hover:border-[#8b949e] transition-all hover:scale-[1.02]"
                  >
                    <div 
                      className="p-3 rounded-lg transition-all group-hover:scale-110"
                      style={{ backgroundColor: `${link.color}20`, color: link.color }}
                    >
                      {link.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold mb-1 group-hover:text-[#00f5ff] transition-colors">
                        {link.title}
                      </h4>
                      <p className="text-sm text-[#8b949e]">{link.description}</p>
                    </div>
                    <div className="text-[#8b949e] group-hover:text-[#00f5ff] group-hover:translate-x-1 transition-all">
                      →
                    </div>
                  </a>
                ))}
              </div>

              <div className="mt-6 p-4 bg-[#0d1117] border border-[#30363d] rounded-lg">
                <p className="text-xs text-[#8b949e] text-center">
                  <span className="text-[#00f5ff]">💡 Tip:</span> Follow us on all platforms to never miss an update!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VS Code Tab Bar - Now handled in each page component but we show it globally here */}
      <div className="fixed top-0 left-[304px] right-0 bg-[#161b22] border-b border-[#30363d] flex items-center z-30 lg:right-24">
        {openTabs.map((tab) => {
          const tabInfo = getTabInfo(tab);
          return (
            <div
              key={tab}
              onClick={() => openTab(tab)}
              className={`flex items-center gap-2 px-4 py-2 border-r border-[#30363d] text-sm min-w-[180px] group cursor-pointer transition-colors ${
                activeTab === tab ? 'bg-[#0d1117]' : 'bg-[#161b22] hover:bg-[#1a1d23]'
              }`}
            >
              <span className={activeTab === tab ? 'text-[#00f5ff]' : 'text-[#8b949e]'}>
                {tabInfo.icon}
              </span>
              <span className="flex-1 text-[#c9d1d9]">
                {tab === 'readme' ? 'README.md' : tab === 'config' ? 'config.json' : `${tabInfo.label.replace(/\s+/g, '')}.tsx`}
              </span>
              <Circle size={8} className="text-[#8b949e] fill-[#8b949e]" />
              <button
                onClick={(e) => closeTab(tab, e)}
                className="text-[#8b949e] hover:text-[#c9d1d9] hover:bg-[#21262d] rounded px-1 transition-colors opacity-0 group-hover:opacity-100"
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>

      {/* VS Code Status Bar */}
      <div className="fixed bottom-0 left-12 right-0 h-6 bg-[#8338ec] text-white text-xs flex items-center justify-between px-4 z-30">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="animate-pulse">●</span> GDG  Theme
          </span>
          <span className="flex items-center gap-1 text-[#00f5ff]">
            <span>⎇</span> main
          </span>
          <span className="hidden sm:inline">Ln 7, Col 1</span>
          <span className="text-[#00f5ff] hidden md:inline">⚛ TypeScript React</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">UTF-8</span>
          <span className="hidden md:inline">LF</span>
          <span className="hidden sm:inline">✓ Prettier</span>
          <span className="text-[#ff006e] hidden md:inline">⚡ ESLint</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(50px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideInLeft {
          animation: slideInLeft 0.3s ease-out;
        }
        .animate-modalSlideUp {
          animation: modalSlideUp 0.4s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default Navigation;