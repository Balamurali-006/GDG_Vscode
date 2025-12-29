import React from 'react';
import { FileText, Folder, Code, Users, Mail, BookOpen } from 'lucide-react';

const WelcomePage = ({ navigate }) => {
  const quickActions = [
    { icon: <Folder size={24} />, label: 'Home', action: () => navigate('home'), color: '#00f5ff' },
    { icon: <Users size={24} />, label: 'Our Team', action: () => navigate('members'), color: '#8338ec' },
    { icon: <Mail size={24} />, label: 'Contact Us', action: () => navigate('contact'), color: '#ff006e' },
    { icon: <BookOpen size={24} />, label: 'About Us', action: () => navigate('about'), color: '#3fb950' },
  ];

  const recentFiles = [
    { name: 'Home.tsx', path: 'src/pages/Home.tsx', icon: '⚛️', action: () => navigate('home') },
    { name: 'Members.tsx', path: 'src/pages/Members.tsx', icon: '⚛️', action: () => navigate('members') },
    { name: 'README.md', path: 'README.md', icon: '📖', action: () => navigate('readme') },
    { name: 'config.json', path: 'config.json', icon: '{ }', action: () => navigate('config') },
  ];

  return (
    <div className="ml-[304px] lg:mr-24 min-h-screen flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        {/* Welcome Header */}
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-6xl font-bold mb-4">
            <span className="text-transparent bg-gradient-to-r from-[#ff006e] via-[#8338ec] to-[#00f5ff] bg-clip-text">
              GDG 
            </span>
          </h1>
          <p className="text-xl text-[#8b949e]">Welcome to Google Developer Groups - VS Code Edition</p>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-sm font-semibold text-[#8b949e] mb-4 uppercase tracking-wider">Start</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, idx) => (
              <button
                key={idx}
                onClick={action.action}
                className="flex items-center gap-4 p-4 bg-[#161b22] border border-[#30363d] rounded-lg hover:border-[#8b949e] hover:bg-[#21262d] transition-all text-left group"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div 
                  className="p-3 rounded-lg group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: `${action.color}20`, color: action.color }}
                >
                  {action.icon}
                </div>
                <div>
                  <div className="text-white font-medium mb-1">{action.label}</div>
                  <div className="text-xs text-[#8b949e]">Click to open</div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Recent Files */}
        <div className="mb-12">
          <h2 className="text-sm font-semibold text-[#8b949e] mb-4 uppercase tracking-wider">Recent</h2>
          <div className="space-y-2">
            {recentFiles.map((file, idx) => (
              <button
                key={idx}
                onClick={file.action}
                className="w-full flex items-center gap-3 p-3 bg-[#161b22] border border-[#30363d] rounded-lg hover:border-[#8b949e] hover:bg-[#21262d] transition-all text-left group"
              >
                <span className="text-xl">{file.icon}</span>
                <div className="flex-1">
                  <div className="text-[#c9d1d9] font-medium group-hover:text-[#00f5ff] transition-colors">
                    {file.name}
                  </div>
                  <div className="text-xs text-[#8b949e]">{file.path}</div>
                </div>
                <div className="text-[#8b949e] group-hover:text-[#00f5ff] opacity-0 group-hover:opacity-100 transition-all">
                  →
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Help Section */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-lg p-6">
          <h3 className="text-sm font-semibold text-[#8b949e] mb-3 uppercase tracking-wider">Help</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <a href="#" className="text-[#00f5ff] hover:underline flex items-center gap-2">
              <Code size={16} />
              <span>Documentation</span>
            </a>
            <a href="#" className="text-[#00f5ff] hover:underline flex items-center gap-2">
              <FileText size={16} />
              <span>Release Notes</span>
            </a>
          </div>
        </div>

        {/* Version Info */}
        <div className="mt-8 text-center text-xs text-[#6e7681]">
          GDG  Theme v1.0.0 | VS Code Edition
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out;
        }
      `}</style>
    </div>
  );
};

export default WelcomePage;