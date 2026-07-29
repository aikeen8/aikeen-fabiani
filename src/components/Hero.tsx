import { Menu, Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { navigationData } from '../data/navigationData';
import backgroundImage from '../assets/pics/dark-background.png';

type HeroProps = {
  isDarkMode: boolean;
  onOpenInfo: () => void;
  onOpenExperience: () => void;
  onOpenProjects: () => void;
  onOpenStack: () => void;
  onToggleTheme: () => void;
};

export default function Hero({
  isDarkMode,
  onOpenInfo,
  onOpenExperience,
  onOpenProjects,
  onOpenStack,
  onToggleTheme,
}: HeroProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const handleNavigationClick = (label: string) => {
    if (label === 'INFO') {
      onOpenInfo();
      return;
    }

    if (label === 'EXPERIENCES') {
      onOpenExperience();
      return;
    }

    if (label === 'PROJECTS') {
      onOpenProjects();
      return;
    }

    if (label === 'STACK') {
      onOpenStack();
    }
  };

  return (
    <section
      className={`relative w-full h-screen overflow-hidden font-instrument select-none transition-colors duration-300 ${
        isDarkMode ? 'bg-[#000000] text-white' : 'bg-[#F2F2F2] text-black'
      }`}
    >
      <img
        src={backgroundImage}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover transition-all duration-300 ${
          isDarkMode ? 'opacity-45' : 'opacity-35 invert'
        }`}
      />
      <div
        className={`absolute inset-0 ${
          isDarkMode ? 'bg-black/60' : 'bg-white/60'
        }`}
      />
      <div
        className={`absolute z-30 transition-all duration-700 ease-in-out origin-top-left ${
          isMenuOpen
            ? 'top-12 left-12 md:left-24 translate-x-0 translate-y-0 scale-[0.5]'
            : 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-100'
        }`}
      >
        <div className="relative flex flex-col items-start md:items-center">
          
          <div className="flex items-center gap-8 md:gap-12">
            <div className="relative">
              <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] tracking-tight leading-none whitespace-nowrap">
                AIKEEN KATE
              </h1>
              
              <div
                key={`v-line-${isMenuOpen}`}
                className={`absolute -right-4 md:-right-6 bottom-0 w-px h-screen animate-line-vertical transition-opacity duration-300 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                } ${isDarkMode ? 'bg-white/40' : 'bg-black/40'}`}
              />
            </div>

            <p
              className={`text-base md:text-lg mt-3 md:mt-5 transition-opacity duration-300 whitespace-nowrap ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              } ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}
            >
              aspiring web/frontend developer
            </p>
          </div>

          <div className="relative mt-1 md:mt-2">
            <div
              key={`h-line-${isMenuOpen}`}
              className={`absolute right-full top-[46%] -translate-y-1/2 w-screen mr-6 md:mr-8 h-px animate-line-horizontal transition-opacity duration-300 ${
                isMenuOpen ? 'opacity-0' : 'opacity-100'
              } ${isDarkMode ? 'bg-white/40' : 'bg-black/40'}`}
            />
            
            <h1 className="text-5xl md:text-6xl lg:text-[5.5rem] tracking-tight leading-none whitespace-nowrap">
              PORTFOLIO
            </h1>
          </div>
          
        </div>
      </div>

      <div
        className={`absolute inset-0 transition-opacity duration-500 z-20 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="w-full h-full">
          <ul className="absolute top-1/2 -translate-y-1/2 left-48 md:left-80 flex flex-col gap-3 md:gap-4">
            {navigationData.map((item) => (
              <li
                    key={item.id}
                    onClick={() => handleNavigationClick(item.label)}
                    className={`flex items-center gap-4 md:gap-6 cursor-pointer transition-colors ${
                        isDarkMode ? 'hover:text-gray-400' : 'hover:text-[#D0D0D0]'
                    }`}
                    >
                    <span className="w-4 text-xs md:text-sm leading-none text-right">
                        {item.id}
                    </span>
                    <span className="text-4xl md:text-5xl lg:text-6xl tracking-wide font-thin leading-none">
                        {item.label}
                    </span>
             </li>
            ))}
          </ul>
        </div>

        <button
          onClick={toggleMenu}
          className={`absolute bottom-32 left-12 md:left-24 origin-bottom-left -rotate-90 tracking-widest text-sm md:text-base cursor-pointer transition-colors ${
            isDarkMode ? 'hover:text-gray-400' : 'hover:text-[#D0D0D0]'
          }`}
        >
          CLOSE
        </button>
      </div>

      <button
        onClick={toggleMenu}
        className={`absolute z-30 bottom-32 left-12 md:left-24 origin-bottom-left -rotate-90 flex items-center gap-3 cursor-pointer transition-all duration-300 ${
          isMenuOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        } ${isDarkMode ? 'hover:text-gray-400' : 'hover:text-[#D0D0D0]'}`}
      >
        <Menu size={18} />
        <span className="tracking-widest text-sm md:text-base">MENU</span>
      </button>

      <button
        onClick={onToggleTheme}
        className="absolute z-40 top-48 right-12 md:right-24 origin-top-right rotate-90 flex items-center gap-3 cursor-pointer transition-all duration-300 opacity-100"
      >
        {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
        <span className="tracking-widest text-sm md:text-base">
          <span
            className={`transition-colors ${
              isDarkMode ? 'hover:text-gray-400' : 'hover:text-[#D0D0D0]'
            }`}
          >
            LIGHT
          </span>
          /
          <span
            className={`transition-colors ${
              isDarkMode ? 'hover:text-gray-400' : 'hover:text-[#D0D0D0]'
            }`}
          >
            DARK
          </span>
        </span>
      </button>
    </section>
  );
}