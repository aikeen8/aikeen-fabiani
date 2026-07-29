import { useState } from 'react';
import Hero from './components/Hero';
import InfoPage from './components/InfoPage';
import ProjectsPage from './components/ProjectsPage';
import StackPage from './components/StackPage';
import ExperiencePage from './components/ExperiencePage';
import CustomCursor from './components/CustomCursor';

function App() {
  const [activePage, setActivePage] = useState<'home' | 'info' | 'projects' | 'stack' | 'experience'>(
    'home',
  );
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isBlackoutVisible, setIsBlackoutVisible] = useState(false);

  const navigateToPage = (page: 'home' | 'info' | 'projects' | 'stack' | 'experience') => {
    if (page === activePage) {
      return;
    }

    setIsBlackoutVisible(true);

    window.setTimeout(() => {
      setActivePage(page);

      window.setTimeout(() => {
        setIsBlackoutVisible(false);
      }, 80);
    }, 320);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black">
      {/* Pass isDarkMode prop here */}
      <CustomCursor isDarkMode={isDarkMode} />
      
      <div
        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
          activePage === 'home' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Hero
          isDarkMode={isDarkMode}
          onOpenInfo={() => navigateToPage('info')}
          onOpenExperience={() => navigateToPage('experience')}
          onOpenProjects={() => navigateToPage('projects')}
          onOpenStack={() => navigateToPage('stack')}
          onToggleTheme={() => setIsDarkMode((currentMode) => !currentMode)}
        />
      </div>

      <div
        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
          activePage === 'projects'
            ? 'opacity-100'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <ProjectsPage
          isDarkMode={isDarkMode}
          onClose={() => navigateToPage('home')}
        />
      </div>

      <div
        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
          activePage === 'info' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <InfoPage
          isDarkMode={isDarkMode}
          onClose={() => navigateToPage('home')}
        />
      </div>

      <div
        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
          activePage === 'stack' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <StackPage
          isDarkMode={isDarkMode}
          onClose={() => navigateToPage('home')}
        />
      </div>

      <div
        className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
          activePage === 'experience' ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <ExperiencePage
          isDarkMode={isDarkMode}
          onClose={() => navigateToPage('home')}
        />
      </div>

      <div
        className={`pointer-events-none absolute inset-0 z-50 transition-opacity duration-500 ease-in-out ${
          isDarkMode ? 'bg-black' : 'bg-[#F2F2F2]'
        } ${isBlackoutVisible ? 'opacity-100' : 'opacity-0'}`}
      />
    </main>
  );
}

export default App;