import React, { useState, useEffect } from 'react';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing');
  const [showCode, setShowCode] = useState(false);

  const loadingSteps = [
    { percent: 20, text: 'Loading  Theme...' },
    { percent: 40, text: 'Importing Components...' },
    { percent: 60, text: 'Connecting to GDG Network...' },
    { percent: 80, text: 'Rendering Interface...' },
    { percent: 100, text: 'Ready!' }
  ];

  useEffect(() => {
    setTimeout(() => setShowCode(true), 300);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const currentStep = loadingSteps.find(step => progress <= step.percent);
    if (currentStep) {
      setLoadingText(currentStep.text);
    }
  }, [progress]);

  return (
    <div className="fixed inset-0 bg-[#0d1117] z-50 flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#ff006e]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8338ec]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.5s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#00f5ff]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 w-full max-w-2xl px-8">
        {/* VS Code Logo */}
        <div className="flex justify-center mb-8 animate-fadeIn">
          <div className="w-20 h-20 bg-gradient-to-br from-[#ff006e] via-[#8338ec] to-[#00f5ff] rounded-lg flex items-center justify-center">
            <span className="text-4xl">⚛️</span>
          </div>
        </div>

        {/* Loading Code Animation */}
        {showCode && (
          <div className="mb-8 font-mono text-sm space-y-2 animate-slideDown">
            <div className="text-[#8b949e] animate-typingLine" style={{ animationDelay: '0s' }}>
              <span className="text-[#ff006e]">import</span> <span className="text-[#00f5ff]">React</span> <span className="text-[#ff006e]">from</span> <span className="text-[#8338ec]">'react'</span>;
            </div>
            <div className="text-[#8b949e] animate-typingLine" style={{ animationDelay: '0.3s' }}>
              <span className="text-[#ff006e]">import</span> {'{ '}<span className="text-[#00f5ff]">GDG</span> {'} '}<span className="text-[#ff006e]">from</span> <span className="text-[#8338ec]">'./'</span>;
            </div>
            <div className="h-2" />
            <div className="text-[#8b949e] animate-typingLine" style={{ animationDelay: '0.6s' }}>
              <span className="text-[#6e7681]">// Initializing Google Developer Groups</span>
            </div>
            <div className="text-[#8b949e] animate-typingLine" style={{ animationDelay: '0.9s' }}>
              <span className="text-[#ff006e]">const</span> <span className="text-[#ffd700]">app</span> = <span className="text-[#ff006e]">new</span> <span className="text-[#00f5ff]">GDG</span>();
            </div>
            <div className="text-[#8b949e] animate-typingLine" style={{ animationDelay: '1.2s' }}>
              <span className="text-[#ffd700]">app</span>.<span className="text-[#00f5ff]">start</span>();
            </div>
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-2 animate-fadeIn">
          <span className="text-transparent bg-gradient-to-r from-[#ff006e] via-[#8338ec] to-[#00f5ff] bg-clip-text">
            GDG 
          </span>
        </h1>
        <p className="text-center text-[#8b949e] mb-8 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
          Powered by VS Code Theme
        </p>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-xs text-[#8b949e] mb-2">
            <span className="animate-fadeIn">{loadingText}</span>
            <span className="animate-fadeIn">{progress}%</span>
          </div>
          <div className="h-1 bg-[#21262d] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#ff006e] via-[#8338ec] to-[#00f5ff] rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="h-full w-full bg-white/20 animate-shimmer" />
            </div>
          </div>
        </div>

        {/* Loading Dots */}
        <div className="flex justify-center gap-2 mt-8">
          <div className="w-2 h-2 bg-[#ff006e] rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
          <div className="w-2 h-2 bg-[#8338ec] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 bg-[#00f5ff] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes typingLine {
          from { opacity: 0; transform: translateX(-10px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-slideDown {
          animation: slideDown 0.8s ease-out forwards;
        }
        .animate-typingLine {
          animation: typingLine 0.5s ease-out forwards;
          opacity: 0;
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;