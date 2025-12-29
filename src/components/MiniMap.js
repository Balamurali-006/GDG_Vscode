import React, { useEffect, useState } from 'react';

const MiniMap = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setScrollProgress(progress);
    };

    // Detect sections
    const detectSections = () => {
      const allSections = [];
      const content = document.querySelectorAll('h1, h2, h3');
      
      content.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        allSections.push({
          id: index,
          title: element.textContent.slice(0, 20),
          position: (rect.top + scrollTop) / document.documentElement.scrollHeight * 100,
          type: element.tagName
        });
      });
      
      setSections(allSections);
    };

    window.addEventListener('scroll', handleScroll);
    detectSections();
    
    // Re-detect on resize
    window.addEventListener('resize', detectSections);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', detectSections);
    };
  }, []);

  const handleMinimapClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const y = e.clientY - rect.top;
    const percentage = y / rect.height;
    const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({
      top: documentHeight * percentage,
      behavior: 'smooth'
    });
  };

  return (
    <div className="fixed right-0 top-0 bottom-6 w-24 bg-[#0d1117]/80 border-l border-[#30363d] z-30 hidden lg:block backdrop-blur-sm">
      {/* Minimap Header */}
      <div className="px-2 py-2 border-b border-[#30363d]">
        <div className="text-[10px] text-[#8b949e] text-center">MINIMAP</div>
      </div>

      {/* Minimap Canvas */}
      <div 
        className="relative h-[calc(100%-32px)] cursor-pointer"
        onClick={handleMinimapClick}
      >
        {/* Code lines representation */}
        <div className="absolute inset-0 p-2 space-y-[2px] overflow-hidden">
          {[...Array(100)].map((_, index) => (
            <div
              key={index}
              className="h-[2px] rounded-full"
              style={{
                width: `${Math.random() * 60 + 40}%`,
                backgroundColor: index % 10 === 0 ? '#8338ec40' : '#30363d',
                marginLeft: index % 15 === 0 ? '10px' : '0'
              }}
            />
          ))}
        </div>

        {/* Section markers */}
        {sections.map((section) => (
          <div
            key={section.id}
            className="absolute left-0 right-0 h-1 group"
            style={{ top: `${section.position}%` }}
          >
            <div className="h-full bg-[#00f5ff]/50 group-hover:bg-[#00f5ff] transition-colors" />
            <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              <div className="text-[10px] text-[#00f5ff] bg-[#0d1117] border border-[#30363d] px-2 py-1 rounded">
                {section.title}
              </div>
            </div>
          </div>
        ))}

        {/* Viewport indicator */}
        <div
          className="absolute left-0 right-0 h-12 bg-[#8338ec]/20 border-y border-[#8338ec] pointer-events-none"
          style={{ top: `${scrollProgress}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#8338ec]/30 to-transparent" />
        </div>

        {/* Scroll position indicator */}
        <div className="absolute top-2 right-2 text-[10px] text-[#8b949e] bg-[#161b22] px-2 py-1 rounded border border-[#30363d]">
          {Math.round(scrollProgress)}%
        </div>
      </div>
    </div>
  );
};

export default MiniMap;