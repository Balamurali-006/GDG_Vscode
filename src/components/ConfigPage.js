import React, { useState } from 'react';
import { ChevronRight, Circle, MoreHorizontal } from 'lucide-react';

const ConfigPage = ({ openTab, activeTab }) => {
  const [hoveredLine, setHoveredLine] = useState(null);

  const configJson = `{
  "name": "gdg",
  "version": "1.0.0",
  "description": "GDG on Campus CIT - Google Developer Groups Community Website",
  "author": "GDG Team",
  "theme": {
    "name": "",
    "colors": {
      "primary": "#00f5ff",
      "secondary": "#8338ec",
      "accent": "#ff006e",
      "background": "#0d1117",
      "surface": "#161b22",
      "text": "#c9d1d9"
    }
  },
  "community": {
    "name": "GDG on Campus CIT",
    "location": "Coimbatore Institute of Technology",
    "established": "2023",
    "members": 500,
    "events": 50,
    "projects": 20
  },
  "social": {
    "website": "https://gdg.community.dev/gdg-on-campus-coimbatore-institute-of-technology-coimbatore-india/",
    "instagram": "https://www.instagram.com/gdgoncampus_cit",
    "linkedin": "https://www.linkedin.com/company/gdg-on-campus-coimbatore-institute-of-technology/",
    "whatsapp": "https://chat.whatsapp.com/IQ6BptPIFg85ZB7RdUq0No"
  },
  "technologies": [
    "Android",
    "Flutter",
    "Firebase",
    "Google Cloud Platform",
    "TensorFlow",
    "Kubernetes",
    "Angular",
    "Kotlin",
    "Dart"
  ],
  "events": {
    "workshops": [
      "Android Development",
      "Flutter Bootcamp",
      "Firebase Workshop",
      "Cloud Computing"
    ],
    "hackathons": [
      "GDG Hack 2024",
      "Solution Challenge",
      "DevFest Hackathon"
    ],
    "studyJams": [
      "Android Study Jam",
      "Cloud Study Jam",
      "ML Study Jam"
    ]
  },
  "team": {
    "lead": "Alex Johnson",
    "coLead": "Sarah Chen",
    "technicalLead": "Mike Rodriguez",
    "designLead": "Emma Davis",
    "eventCoordinator": "James Wilson"
  },
  "features": {
    "vscodeTheme": true,
    "darkMode": true,
    "animations": true,
    "terminal": true,
    "minimap": true,
    "debugging": true
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "deploy": "npm run build && firebase deploy"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/gdg-cit/-theme"
  },
  "license": "MIT"
}`;

  const lines = configJson.split('\n');

  const renderJsonLine = (line, index) => {
    let coloredLine = line;

    // Property names (keys)
    coloredLine = coloredLine.replace(/"([^"]+)":/g, '<span class="text-[#00f5ff]">"$1"</span>:');
    
    // String values
    coloredLine = coloredLine.replace(/: "([^"]+)"/g, ': <span class="text-[#8338ec]">"$1"</span>');
    
    // Numbers
    coloredLine = coloredLine.replace(/: (\d+)/g, ': <span class="text-[#ffd700]">$1</span>');
    
    // Booleans
    coloredLine = coloredLine.replace(/: (true|false)/g, ': <span class="text-[#ff006e]">$1</span>');
    
    // Brackets and braces
    coloredLine = coloredLine.replace(/([{}[\]])/g, '<span class="text-[#c9d1d9]">$1</span>');

    return (
      <div
        key={index}
        className="text-sm"
        dangerouslySetInnerHTML={{ __html: coloredLine }}
      />
    );
  };

  return (
    <div className="relative min-h-screen bg-[#0d1117] text-[#c9d1d9] overflow-hidden font-mono ml-[304px] lg:mr-24">
      {/* VS Code Tab Bar */}
      <div className="bg-[#161b22] border-b border-[#30363d] flex items-center">
        <div className={`flex items-center gap-2 px-4 py-2 border-r border-[#30363d] text-sm min-w-[200px] group ${
          activeTab === 'config' ? 'bg-[#0d1117]' : 'bg-[#161b22]'
        }`}>
          <span className="text-[#ff006e]">{'{ }'}</span>
          <span className="flex-1">config.json</span>
          <Circle size={8} className="text-[#8b949e] fill-[#8b949e]" />
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
        <span className="text-[#c9d1d9]">config.json</span>
      </div>

      {/* Editor Content */}
      <div className="flex min-h-screen">
        {/* Line numbers */}
        <div className="bg-[#0d1117] text-[#6e7681] text-right select-none border-r border-[#30363d] sticky left-0">
          {lines.map((_, i) => (
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

        {/* JSON Content */}
        <div className="flex-1 p-4 font-mono">
          <div className="space-y-[2px]">
            {lines.map((line, index) => renderJsonLine(line, index))}
          </div>

          {/* JSON Tree View */}
          <div className="mt-12 p-6 bg-[#161b22] border border-[#30363d] rounded-lg">
            <h3 className="text-sm font-semibold text-[#8b949e] mb-4 uppercase tracking-wider">
              Configuration Overview
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex items-center justify-between p-3 bg-[#0d1117] rounded border border-[#30363d]">
                <span className="text-[#c9d1d9]">Community Members</span>
                <span className="text-[#00f5ff] font-semibold">500+</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#0d1117] rounded border border-[#30363d]">
                <span className="text-[#c9d1d9]">Events Hosted</span>
                <span className="text-[#8338ec] font-semibold">50+</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#0d1117] rounded border border-[#30363d]">
                <span className="text-[#c9d1d9]">Projects Built</span>
                <span className="text-[#ff006e] font-semibold">20+</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-[#0d1117] rounded border border-[#30363d]">
                <span className="text-[#c9d1d9]">Technologies</span>
                <span className="text-[#ffd700] font-semibold">9</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfigPage;