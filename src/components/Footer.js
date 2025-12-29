import React from 'react';

const Footer = () => {
  return (
    <footer className="relative z-10 border-t border-[#30363d] bg-[#0d1117]/80 backdrop-blur-md py-8 ml-[304px]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-[#8b949e]">
              © 2024 Google Developers Group - College Chapter
            </p>
            <p className="text-sm text-[#6e7681] mt-1">
              All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-sm text-[#6e7681]">Built with</span>
            <span className="text-[#ff006e] animate-pulse">❤️</span>
            <span className="text-sm text-[#6e7681]">by GDG Team</span>
          </div>
        </div>
        
        {/* VS Code Footer Indicator */}
        <div className="mt-6 pt-6 border-t border-[#30363d] flex items-center justify-center gap-2 text-xs text-[#6e7681]">
          <span className="text-[#00f5ff]">⚛</span>
          <span>Powered by React</span>
          <span className="text-[#8b949e]">|</span>
          <span className="text-[#8338ec]">●</span>
          <span> Theme</span>
          <span className="text-[#8b949e]">|</span>
          <span className="text-[#ff006e]">◆</span>
          <span>VS Code Inspired</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;