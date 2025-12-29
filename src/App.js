import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Header from './components/Header';
import Home from './components/Home';
import AboutUs from './components/AboutUs';
import Members from './components/Members';
import ContactUs from './components/ContactUs';
import Footer from './components/Footer';
import Terminal from './components/Terminal';
import MiniMap from './components/MiniMap';
import LoadingScreen from './components/LoadingScreen';
import WelcomePage from './components/WelcomePage';
import ReadmePage from './components/ReadmePage';
import ConfigPage from './components/ConfigPage';

const App = () => {
  const [currentRoute, setCurrentRoute] = useState('home');
  const [loading, setLoading] = useState(true);
  const [showTerminal, setShowTerminal] = useState(false);
  const [showMiniMap, setShowMiniMap] = useState(true);
  const [openTabs, setOpenTabs] = useState(['home']);
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2500);
  }, []);

  const navigate = (route) => {
    setCurrentRoute(route);
    if (!openTabs.includes(route)) {
      setOpenTabs([...openTabs, route]);
    }
    setActiveTab(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openTab = (tab) => {
    if (!openTabs.includes(tab)) {
      setOpenTabs([...openTabs, tab]);
    }
    setActiveTab(tab);
    setCurrentRoute(tab);
  };

  const closeTab = (tab, e) => {
    e.stopPropagation();
    const newTabs = openTabs.filter(t => t !== tab);
    setOpenTabs(newTabs);
    
    if (activeTab === tab) {
      if (newTabs.length > 0) {
        setActiveTab(newTabs[newTabs.length - 1]);
        setCurrentRoute(newTabs[newTabs.length - 1]);
      } else {
        setActiveTab('welcome');
        setCurrentRoute('welcome');
      }
    }
  };

  const renderPage = () => {
    if (openTabs.length === 0 || currentRoute === 'welcome') {
      return <WelcomePage navigate={navigate} />;
    }

    switch(currentRoute) {
      case 'home':
        return <Home navigate={navigate} openTab={openTab} activeTab={activeTab} />;
      case 'about':
        return <AboutUs openTab={openTab} activeTab={activeTab} />;
      case 'members':
        return <Members openTab={openTab} activeTab={activeTab} />;
      case 'contact':
        return <ContactUs openTab={openTab} activeTab={activeTab} />;
      case 'readme':
        return <ReadmePage openTab={openTab} activeTab={activeTab} />;
      case 'config':
        return <ConfigPage openTab={openTab} activeTab={activeTab} />;
      default:
        return <Home navigate={navigate} openTab={openTab} activeTab={activeTab} />;
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="bg-[#0d1117] text-[#c9d1d9] min-h-screen font-mono relative overflow-x-hidden">
      <Header />
      <Navigation 
        currentRoute={currentRoute} 
        navigate={navigate}
        showTerminal={showTerminal}
        setShowTerminal={setShowTerminal}
        openTabs={openTabs}
        activeTab={activeTab}
        openTab={openTab}
        closeTab={closeTab}
      />
      <main className="relative z-10">
        {renderPage()}
      </main>
      <Footer />
      {showTerminal && <Terminal onClose={() => setShowTerminal(false)} />}
      {showMiniMap && openTabs.length > 0 && <MiniMap />}
    </div>
  );
};

export default App;