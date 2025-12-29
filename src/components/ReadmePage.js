import React, { useState } from 'react';
import { ChevronRight, Circle, MoreHorizontal } from 'lucide-react';

const ReadmePage = ({ openTab, activeTab }) => {
  const [hoveredLine, setHoveredLine] = useState(null);

  const markdownLines = [
    "# GDG on Campus - Coimbatore Institute of Technology",
    "",
    "![GDG Logo](https://gdg-logo.png)",
    "",
    "## 🚀 Welcome to Google Developer Groups",
    "",
    "We are a community of passionate student developers learning and building",
    "with Google technologies at Coimbatore Institute of Technology.",
    "",
    "### 🎯 What We Do",
    "",
    "- **Workshops**: Hands-on sessions on Android, Flutter, Cloud, and more",
    "- **Hackathons**: 24-hour coding marathons to build amazing projects",
    "- **Study Jams**: Collaborative learning programs",
    "- **Tech Talks**: Sessions with industry experts",
    "- **Community Events**: Networking and fun activities",
    "",
    "### 💻 Technologies We Focus On",
    "",
    "- Android Development with Kotlin",
    "- Flutter & Dart for cross-platform apps",
    "- Firebase for backend services",
    "- Google Cloud Platform (GCP)",
    "- TensorFlow & Machine Learning",
    "- Web Development with Angular",
    "",
    "### 📊 Our Impact",
    "",
    "- 500+ Active Members",
    "- 50+ Events Organized",
    "- 20+ Projects Built",
    "- 1000+ Students Reached",
    "",
    "### 🔗 Connect With Us",
    "",
    "- **Website**: [gdg.community.dev](https://gdg.community.dev/gdg-on-campus-coimbatore-institute-of-technology-coimbatore-india/)",
    "- **Instagram**: [@gdgoncampus_cit](https://www.instagram.com/gdgoncampus_cit)",
    "- **LinkedIn**: [GDG on Campus CIT](https://www.linkedin.com/company/gdg-on-campus-coimbatore-institute-of-technology/)",
    "- **WhatsApp**: [Join Group](https://chat.whatsapp.com/IQ6BptPIFg85ZB7RdUq0No)",
    "",
    "### 🤝 How to Join",
    "",
    "1. Visit our community page and register",
    "2. Join our WhatsApp group for updates",
    "3. Attend your first event",
    "4. Start contributing to projects",
    "5. Become a core team member!",
    "",
    "### 📅 Upcoming Events",
    "",
    "- **Android Workshop** - Next Week",
    "- **Cloud Study Jam** - Feb 15, 2024",
    "- **Hackathon 2024** - March 1-2",
    "- **TensorFlow Session** - March 10",
    "",
    "---",
    "",
    "Made with ❤️ by GDG on Campus CIT Team",
    "",
    "© 2024 Google Developer Groups. All rights reserved."
  ];

  const renderMarkdownLine = (line, index) => {
    if (line.startsWith('# ')) {
      return (
        <div key={index} className="text-3xl font-bold text-white mb-4 mt-6">
          {line.substring(2)}
        </div>
      );
    }
    if (line.startsWith('## ')) {
      return (
        <div key={index} className="text-2xl font-bold text-[#00f5ff] mb-3 mt-6 flex items-center gap-2">
          {line.substring(3)}
        </div>
      );
    }
    if (line.startsWith('### ')) {
      return (
        <div key={index} className="text-xl font-bold text-[#8338ec] mb-3 mt-5">
          {line.substring(4)}
        </div>
      );
    }
    if (line.startsWith('- ')) {
      const content = line.substring(2);
      if (content.startsWith('**')) {
        const match = content.match(/\*\*(.*?)\*\*: (.*)/);
        if (match) {
          return (
            <div key={index} className="flex items-start gap-3 mb-2 ml-4">
              <span className="text-[#00f5ff] mt-1">•</span>
              <div>
                <span className="text-[#ff006e] font-semibold">{match[1]}</span>
                <span className="text-[#c9d1d9]">: {match[2]}</span>
              </div>
            </div>
          );
        }
      }
      return (
        <div key={index} className="flex items-start gap-3 mb-2 ml-4">
          <span className="text-[#00f5ff] mt-1">•</span>
          <span className="text-[#c9d1d9]">{content}</span>
        </div>
      );
    }
    if (line.match(/^\d+\./)) {
      return (
        <div key={index} className="flex items-start gap-3 mb-2 ml-4">
          <span className="text-[#00f5ff]">{line.split('.')[0]}.</span>
          <span className="text-[#c9d1d9]">{line.split('.').slice(1).join('.')}</span>
        </div>
      );
    }
    if (line.startsWith('---')) {
      return <div key={index} className="border-t border-[#30363d] my-6"></div>;
    }
    if (line.match(/\[.*?\]\(.*?\)/)) {
      const match = line.match(/\[(.*?)\]\((.*?)\)/g);
      let result = line;
      match?.forEach(link => {
        const [text, url] = link.match(/\[(.*?)\]\((.*?)\)/).slice(1);
        result = result.replace(link, `<a href="${url}" target="_blank" class="text-[#00f5ff] hover:underline">${text}</a>`);
      });
      return <div key={index} className="text-[#c9d1d9] mb-2" dangerouslySetInnerHTML={{ __html: result }} />;
    }
    if (line.includes('![')) {
      return (
        <div key={index} className="my-4 p-4 bg-[#21262d] rounded border border-[#30363d] text-center text-[#8b949e]">
          [Image: GDG Logo]
        </div>
      );
    }
    if (line === '') {
      return <div key={index} className="h-4"></div>;
    }
    return (
      <div key={index} className="text-[#c9d1d9] mb-2">
        {line}
      </div>
    );
  };

  return (
    <div className="relative min-h-screen bg-[#0d1117] text-[#c9d1d9] overflow-hidden font-mono ml-[304px] lg:mr-24">
      {/* VS Code Tab Bar */}
      <div className="bg-[#161b22] border-b border-[#30363d] flex items-center">
        <div className={`flex items-center gap-2 px-4 py-2 border-r border-[#30363d] text-sm min-w-[200px] group ${
          activeTab === 'readme' ? 'bg-[#0d1117]' : 'bg-[#161b22]'
        }`}>
          <span className="text-[#8338ec]">📖</span>
          <span className="flex-1">README.md</span>
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
        <span className="text-[#c9d1d9]">README.md</span>
      </div>

      {/* Editor Content */}
      <div className="flex min-h-screen">
        {/* Line numbers */}
        <div className="bg-[#0d1117] text-[#6e7681] text-right select-none border-r border-[#30363d] sticky left-0">
          {markdownLines.map((_, i) => (
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

        {/* Markdown Content */}
        <div className="flex-1 p-8 max-w-4xl">
          {markdownLines.map((line, index) => renderMarkdownLine(line, index))}
        </div>
      </div>
    </div>
  );
};

export default ReadmePage;