import React, { useEffect, useRef, useState } from 'react';
import { Github, Linkedin, Mail, X, MapPin, Calendar, Award, Code, ChevronRight, Circle, MoreHorizontal } from 'lucide-react';

const Members = () => {
  const [visibleElements, setVisibleElements] = useState(new Set());
  const [selectedMember, setSelectedMember] = useState(null);
  const [hoveredLine, setHoveredLine] = useState(null);
  const observerRefs = useRef([]);

  const teamMembers = [
    { 
      name: 'Alex Johnson', 
      role: 'Lead', 
      image: '👨‍💻', 
      linkedin: '#', 
      github: '#',
      email: 'alex@gdg.college.edu',
      location: 'San Francisco, CA',
      joined: 'Jan 2023',
      bio: 'Passionate about Android development and community building. Leading GDG with 3+ years of experience.',
      skills: ['Android', 'Kotlin', 'Firebase', 'Leadership'],
      achievements: ['Organized 15+ events', 'Mentored 50+ students', 'Google I/O Extended Lead']
    },
    { 
      name: 'Sarah Chen', 
      role: 'Co-Lead', 
      image: '👩‍💻', 
      linkedin: '#', 
      github: '#',
      email: 'sarah@gdg.college.edu',
      location: 'New York, NY',
      joined: 'Feb 2023',
      bio: 'Flutter enthusiast and UI/UX designer. Love creating beautiful and functional mobile apps.',
      skills: ['Flutter', 'Dart', 'UI/UX', 'Figma'],
      achievements: ['Published 5+ Flutter apps', 'Flutter Forward attendee', 'Design workshop facilitator']
    },
    { 
      name: 'Mike Rodriguez', 
      role: 'Technical Lead', 
      image: '👨‍💼', 
      linkedin: '#', 
      github: '#',
      email: 'mike@gdg.college.edu',
      location: 'Austin, TX',
      joined: 'Mar 2023',
      bio: 'Full-stack developer with expertise in cloud technologies. Building scalable solutions.',
      skills: ['Google Cloud', 'Node.js', 'React', 'Docker'],
      achievements: ['GCP certified', '10+ hackathon wins', 'Open source contributor']
    },
    { 
      name: 'Emma Davis', 
      role: 'Design Lead', 
      image: '👩‍🎨', 
      linkedin: '#', 
      github: '#',
      email: 'emma@gdg.college.edu',
      location: 'Seattle, WA',
      joined: 'Apr 2023',
      bio: 'Creative designer passionate about Material Design and user experience.',
      skills: ['Material Design', 'Figma', 'Adobe XD', 'Prototyping'],
      achievements: ['Material Design award winner', 'Designed 20+ projects', 'Workshop leader']
    },
    { 
      name: 'James Wilson', 
      role: 'Event Coordinator', 
      image: '👨‍🏫', 
      linkedin: '#', 
      github: '#',
      email: 'james@gdg.college.edu',
      location: 'Boston, MA',
      joined: 'May 2023',
      bio: 'Event management expert dedicated to creating memorable tech experiences.',
      skills: ['Event Planning', 'Public Speaking', 'Networking', 'Marketing'],
      achievements: ['Coordinated 30+ events', '500+ attendees managed', 'Keynote speaker']
    },
    { 
      name: 'Lisa Anderson', 
      role: 'Community Manager', 
      image: '👩‍💼', 
      linkedin: '#', 
      github: '#',
      email: 'lisa@gdg.college.edu',
      location: 'Chicago, IL',
      joined: 'Jun 2023',
      bio: 'Building and nurturing our vibrant developer community one connection at a time.',
      skills: ['Community Building', 'Social Media', 'Content Creation', 'Engagement'],
      achievements: ['Grew community by 200%', 'Active Discord manager', 'Monthly newsletter author']
    },
    { 
      name: 'David Kim', 
      role: 'Marketing Lead', 
      image: '👨‍💼', 
      linkedin: '#', 
      github: '#',
      email: 'david@gdg.college.edu',
      location: 'Los Angeles, CA',
      joined: 'Jul 2023',
      bio: 'Marketing strategist with a passion for tech outreach and brand growth.',
      skills: ['Digital Marketing', 'SEO', 'Content Strategy', 'Analytics'],
      achievements: ['Increased reach by 300%', 'Campaign award winner', 'Brand partnerships']
    },
    { 
      name: 'Rachel Green', 
      role: 'Content Writer', 
      image: '👩‍💻', 
      linkedin: '#', 
      github: '#',
      email: 'rachel@gdg.college.edu',
      location: 'Denver, CO',
      joined: 'Aug 2023',
      bio: 'Technical writer crafting engaging content about Google technologies.',
      skills: ['Technical Writing', 'Blogging', 'Documentation', 'Storytelling'],
      achievements: ['Published 50+ articles', 'Tech blog curator', 'Conference speaker']
    },
    { 
      name: 'Tom Harris', 
      role: 'Developer Advocate', 
      image: '👨‍🏫', 
      linkedin: '#', 
      github: '#',
      email: 'tom@gdg.college.edu',
      location: 'Portland, OR',
      joined: 'Sep 2023',
      bio: 'Advocating for developers and spreading knowledge about Google technologies.',
      skills: ['Public Speaking', 'Teaching', 'Python', 'Machine Learning'],
      achievements: ['50+ talks delivered', 'YouTube tech channel', 'TensorFlow certified']
    }
  ];

  const codeLines = [
    "import React from 'react';",
    "import { TeamMember } from '@/types';",
    "",
    "// GDG Core Team Members",
    "const team: TeamMember[] = [",
    "  { name: 'Alex', role: 'Lead' },",
    "  { name: 'Sarah', role: 'Co-Lead' },",
    "  // ... more members",
    "];",
    "",
    "export const Members = () => {",
    "  return team.map(member => (",
    "    <MemberCard key={member.name} {...member} />",
    "  ));",
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
      { threshold: 0.1 }
    );

    observerRefs.current.forEach(ref => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  const openMemberModal = (member) => {
    setSelectedMember(member);
    document.body.style.overflow = 'hidden';
  };

  const closeMemberModal = () => {
    setSelectedMember(null);
    document.body.style.overflow = 'auto';
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
    return <div key={index}><span className="text-[#c9d1d9]">{line}</span></div>;
  };

  return (
    <div className="relative min-h-screen bg-[#0d1117] text-[#c9d1d9] overflow-hidden font-mono ml-[304px] lg:mr-24">
      {/* VS Code Tab Bar */}
      <div className="bg-[#161b22] border-b border-[#30363d] flex items-center">
        <div className="flex items-center gap-2 px-4 py-2 bg-[#0d1117] border-r border-[#30363d] text-sm min-w-[200px] group">
          <span className="text-[#00f5ff]">⚛️</span>
          <span className="flex-1">Members.tsx</span>
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
        <span className="text-[#c9d1d9]">Members.tsx</span>
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
          <div className="space-y-[2px] text-xs md:text-sm mb-8 max-w-6xl mx-auto">
            {codeLines.map((line, index) => renderCodeLine(line, index))}
          </div>

          {/* Rendered Content */}
          <div className="max-w-6xl mx-auto z-10 w-full py-12">
            <div className="text-xs text-[#6e7681] mb-8">
              {'/* ==================== RENDERED OUTPUT ==================== */'}
            </div>

            <div 
              ref={el => observerRefs.current[0] = el}
              data-animate="header"
              className={visibleElements.has('header') ? 'animate-slideDown' : 'opacity-0'}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-transparent bg-gradient-to-r from-[#ff006e] via-[#8338ec] to-[#00f5ff] bg-clip-text animate-gradient">
                Our Team
              </h2>
              <p className="text-center text-[#8b949e] mb-12 max-w-2xl mx-auto">
                Meet the passionate individuals driving innovation and community growth
              </p>
            </div>
            
            <div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              ref={el => observerRefs.current[1] = el}
              data-animate="members"
            >
              {teamMembers.map((member, index) => (
                <div
                  key={index}
                  onClick={() => openMemberModal(member)}
                  className={`group bg-[#161b22] border border-[#30363d] rounded-xl p-6 hover:border-[#00f5ff] transition-all duration-300 hover:shadow-xl hover:shadow-[#00f5ff]/30 hover:scale-105 cursor-pointer ${
                    visibleElements.has('members') ? 'animate-flipIn' : 'opacity-0'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-6xl mb-4 text-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                    {member.image}
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-2 text-white group-hover:text-[#00f5ff] transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-[#00f5ff] text-center mb-4 text-sm">{member.role}</p>
                  <div className="flex justify-center space-x-4">
                    <a
                      href={member.linkedin}
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-lg bg-[#1f6feb]/20 text-[#8b949e] hover:text-[#1f6feb] hover:bg-[#1f6feb]/30 transition-all hover:scale-110"
                      aria-label="LinkedIn"
                    >
                      <Linkedin size={20} />
                    </a>
                    <a
                      href={member.github}
                      onClick={(e) => e.stopPropagation()}
                      className="p-2 rounded-lg bg-[#8338ec]/20 text-[#8b949e] hover:text-[#8338ec] hover:bg-[#8338ec]/30 transition-all hover:scale-110"
                      aria-label="GitHub"
                    >
                      <Github size={20} />
                    </a>
                  </div>
                  <div className="mt-4 text-center">
                    <span className="text-xs text-[#8b949e] hover:text-[#00f5ff] transition-colors">
                      Click for more details →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Member Profile Modal */}
      {selectedMember && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={closeMemberModal}
        >
          <div 
            className="bg-[#161b22] border border-[#30363d] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animate-modalSlideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-[#161b22] border-b border-[#30363d] p-6 flex items-start justify-between z-10">
              <div className="flex items-center gap-4">
                <div className="text-5xl">{selectedMember.image}</div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-1">{selectedMember.name}</h3>
                  <p className="text-[#00f5ff] text-sm">{selectedMember.role}</p>
                </div>
              </div>
              <button
                onClick={closeMemberModal}
                className="p-2 hover:bg-[#21262d] rounded-lg text-[#8b949e] hover:text-white transition-all"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Bio */}
              <div>
                <h4 className="text-sm text-[#8b949e] mb-2 flex items-center gap-2">
                  <span>{'// '}</span>
                  About
                </h4>
                <p className="text-[#c9d1d9] leading-relaxed">{selectedMember.bio}</p>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 text-sm">
                  <Mail size={16} className="text-[#00f5ff]" />
                  <span className="text-[#c9d1d9]">{selectedMember.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MapPin size={16} className="text-[#8338ec]" />
                  <span className="text-[#c9d1d9]">{selectedMember.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Calendar size={16} className="text-[#ff006e]" />
                  <span className="text-[#c9d1d9]">Joined {selectedMember.joined}</span>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h4 className="text-sm text-[#8b949e] mb-3 flex items-center gap-2">
                  <Code size={16} />
                  Skills & Expertise
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMember.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[#0d1117] border border-[#30363d] rounded-full text-sm text-[#00f5ff] hover:border-[#00f5ff] transition-all"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h4 className="text-sm text-[#8b949e] mb-3 flex items-center gap-2">
                  <Award size={16} />
                  Achievements
                </h4>
                <ul className="space-y-2">
                  {selectedMember.achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-[#c9d1d9]">
                      <span className="text-[#00f5ff] mt-1">✓</span>
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Social Links */}
              <div className="flex gap-4 pt-4 border-t border-[#30363d]">
                <a
                  href={selectedMember.linkedin}
                  className="flex-1 px-4 py-2 bg-[#1f6feb]/20 hover:bg-[#1f6feb]/30 text-[#1f6feb] rounded-lg flex items-center justify-center gap-2 transition-all hover:scale-105"
                >
                  <Linkedin size={20} />
                  <span className="text-sm">LinkedIn</span>
                </a>
                <a
                  href={selectedMember.github}
                  className="flex-1 px-4 py-2 bg-[#8338ec]/20 hover:bg-[#8338ec]/30 text-[#8338ec] rounded-lg flex items-center justify-center gap-2 transition-all hover:scale-105"
                >
                  <Github size={20} />
                  <span className="text-sm">GitHub</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes flipIn {
          0% { 
            opacity: 0; 
            transform: perspective(600px) rotateY(-90deg);
          }
          50% {
            transform: perspective(600px) rotateY(-10deg);
          }
          100% { 
            opacity: 1; 
            transform: perspective(600px) rotateY(0deg);
          }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalSlideUp {
          from { opacity: 0; transform: translateY(50px) scale(0.95); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-slideDown {
          animation: slideDown 0.8s ease-out forwards;
        }
        .animate-flipIn {
          animation: flipIn 0.8s ease-out forwards;
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-modalSlideUp {
          animation: modalSlideUp 0.4s ease-out forwards;
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default Members;