import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Square } from 'lucide-react';

const Terminal = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([
    { type: 'output', text: 'Welcome to GDG Terminal v1.0.0' },
    { type: 'output', text: 'Type "help" for available commands' },
    { type: 'output', text: '' }
  ]);
  const [currentLine, setCurrentLine] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const terminalRef = useRef(null);
  const inputRef = useRef(null);

  const commands = {
    help: () => [
      'Available commands:',
      '  help       - Show this help message',
      '  about      - About GDG College',
      '  members    - List team members',
      '  events     - Show upcoming events',
      '  projects   - List our projects',
      '  social     - Social media links',
      '  clear      - Clear terminal',
      '  skills     - Technologies we use',
      ''
    ],
    about: () => [
      'Google Developer Groups - College Chapter',
      'A community of student developers building the future',
      'with Google technologies',
      ''
    ],
    members: () => [
      '👥 Core Team Members:',
      '  - Alex Johnson (Lead)',
      '  - Sarah Chen (Co-Lead)',
      '  - Mike Rodriguez (Technical Lead)',
      '  - Emma Davis (Design Lead)',
      '500+ Active Members in total!',
      ''
    ],
    events: () => [
      '📅 Upcoming Events:',
      '  - Android Workshop - Next Week',
      '  - Cloud Study Jam - Feb 15',
      '  - Hackathon 2024 - March 1-2',
      '  - TensorFlow Session - March 10',
      ''
    ],
    projects: () => [
      '💻 Featured Projects:',
      '  - Campus Connect App (Flutter)',
      '  - AI Study Assistant (TensorFlow)',
      '  - Event Management System (Firebase)',
      '  - Code Collaboration Platform (React)',
      ''
    ],
    social: () => [
      '🌐 Connect with us:',
      '  LinkedIn: /gdg-college',
      '  GitHub: /gdg-college',
      '  Email: gdg@college.edu',
      ''
    ],
    skills: () => [
      '🚀 Technologies:',
      '  Android | Flutter | Firebase',
      '  TensorFlow | Google Cloud | Angular',
      '  Kotlin | Go | Kubernetes',
      ''
    ],
    clear: () => {
      setHistory([]);
      return [];
    }
  };

  const typeWriter = (text, callback) => {
    setIsTyping(true);
    let i = 0;
    const speed = 20;

    const type = () => {
      if (i < text.length) {
        setCurrentLine(prev => prev + text.charAt(i));
        i++;
        setTimeout(type, speed);
      } else {
        setIsTyping(false);
        if (callback) callback();
      }
    };

    type();
  };

  const handleCommand = (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    setHistory(prev => [...prev, { type: 'input', text: `$ ${cmd}` }]);

    if (commands[trimmedCmd]) {
      const output = commands[trimmedCmd]();
      output.forEach((line, index) => {
        setTimeout(() => {
          setHistory(prev => [...prev, { type: 'output', text: line }]);
        }, index * 50);
      });
    } else if (trimmedCmd === '') {
      setHistory(prev => [...prev, { type: 'output', text: '' }]);
    } else {
      setHistory(prev => [...prev, { 
        type: 'error', 
        text: `Command not found: ${cmd}. Type "help" for available commands.` 
      }]);
    }

    setInput('');
    setCurrentLine('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !isTyping) {
      handleCommand(input);
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history, currentLine]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="fixed bottom-6 left-12 right-0 h-80 bg-[#0d1117] border-t border-[#30363d] z-40 animate-slideUp">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#30363d]">
        <div className="flex items-center gap-3">
          <span className="text-sm text-[#c9d1d9]">TERMINAL</span>
          <span className="text-xs text-[#8b949e]">bash</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-[#8b949e] hover:text-white p-1">
            <Minus size={14} />
          </button>
          <button className="text-[#8b949e] hover:text-white p-1">
            <Square size={14} />
          </button>
          <button onClick={onClose} className="text-[#8b949e] hover:text-[#ff006e] p-1">
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={terminalRef}
        className="p-4 font-mono text-sm overflow-y-auto h-[calc(100%-40px)] scroll-smooth"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item, index) => (
          <div 
            key={index} 
            className={`mb-1 ${
              item.type === 'input' ? 'text-[#00f5ff]' : 
              item.type === 'error' ? 'text-[#ff006e]' : 
              'text-[#c9d1d9]'
            }`}
          >
            {item.text}
          </div>
        ))}
        {currentLine && (
          <div className="text-[#c9d1d9]">{currentLine}<span className="animate-pulse">_</span></div>
        )}
        <div className="flex items-center gap-2">
          <span className="text-[#00f5ff]">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isTyping}
            className="flex-1 bg-transparent outline-none text-[#c9d1d9] caret-[#00f5ff]"
            autoFocus
          />
          <span className="animate-pulse text-[#00f5ff]">▊</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Terminal;