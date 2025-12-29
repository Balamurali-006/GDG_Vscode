import React from 'react';

const Header = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/*  Glow Background */}
      <div className="absolute inset-0 bg-[#0d1117]"></div>
      
      {/* Animated  Orbs */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-96 h-96 bg-[#ff006e]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#8338ec]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#00f5ff]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>
    </div>
  );
};

export default Header;