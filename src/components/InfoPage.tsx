import { useState } from 'react';
import backgroundImage from '../assets/pics/dark-background.png';
import { infoPageData } from '../data/infoPageData';

type InfoPageProps = {
  isDarkMode: boolean;
  onClose: () => void;
};

export default function InfoPage({ isDarkMode, onClose }: InfoPageProps) {
  const [isAboutHovered, setIsAboutHovered] = useState(false);

  const handleMouseEnter = (title: string) => {
    if (title.toLowerCase() === 'about me') {
      setIsAboutHovered(true);
    }
  };

  const handleMouseLeave = (title: string) => {
    if (title.toLowerCase() === 'about me') {
      setIsAboutHovered(false);
    }
  };

  return (
    <section
      className={`relative min-h-screen w-full overflow-hidden font-instrument select-none transition-colors duration-300 ${
        isDarkMode ? 'bg-black text-white' : 'bg-[#F2F2F2] text-black'
      }`}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes moving-grain {
          0%, 100% { transform: translate(0, 0); }
          10% { transform: translate(-2%, -2%); }
          20% { transform: translate(2%, -1%); }
          30% { transform: translate(-1%, 2%); }
          40% { transform: translate(1%, -1%); }
          50% { transform: translate(-2%, 1%); }
          60% { transform: translate(1%, 2%); }
          70% { transform: translate(-1%, -1%); }
          80% { transform: translate(2%, 2%); }
          90% { transform: translate(-2%, 1%); }
        }
        
        .grain-overlay {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          animation: moving-grain 0.4s steps(4) infinite;
          pointer-events: none;
          mix-blend-mode: overlay;
          opacity: 0.35;
        }
      `}} />

      <img
        src={backgroundImage}
        alt=""
        className={`absolute inset-0 h-full w-full object-cover transition-all duration-300 animate-background-pan ${
          isDarkMode ? 'opacity-45' : 'opacity-35 invert'
        }`}
      />
      <div
        className={`absolute inset-0 ${
          isDarkMode ? 'bg-black/60' : 'bg-white/60'
        }`}
      />

      <div className="relative z-10 h-screen px-8 py-8 md:px-16 md:py-12">
        <div className="absolute left-12 top-12 origin-top-left scale-[0.5] md:left-24">
          <div className="flex flex-col items-start">
            <p className="text-5xl leading-none tracking-tight md:text-6xl lg:text-[5.5rem]">
              AIKEEN KATE
            </p>
            <p className="ml-28 text-5xl leading-none tracking-tight md:ml-40 md:text-6xl lg:text-[5.5rem]">
              PORTFOLIO
            </p>
          </div>
        </div>

        <div className="pt-28 md:ml-[34vw] md:pt-2">
          <div className="flex items-center gap-5">
            <span className="text-sm leading-none md:text-base">A</span>
            <h1 className="text-4xl leading-none tracking-tight md:text-6xl lg:text-7xl">
              INFORMATION
            </h1>
          </div>
          <div
            className={`mt-3 h-px w-screen ${
              isDarkMode ? 'bg-white/70' : 'bg-black/70'
            }`}
          />
        </div>

        {/* Square Image Preview Container */}
        <div
          className={`pointer-events-none absolute left-[14vw] top-[38vh] hidden h-56 w-56 transition-all duration-300 ease-out md:block ${
            isAboutHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div 
            className={`relative h-full w-full overflow-hidden border ${
              isDarkMode ? 'border-white' : 'border-black'
            }`}
            style={{
              WebkitBoxReflect: 'below 4px linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.4) 100%)'
            }}
          >
            <img
              src="/pics/png.JPG" // CHANGE THIS TO YOUR ACTUAL IMAGE PATH
              alt="Profile Preview"
              className={`absolute inset-0 h-full w-full object-cover ${
                isDarkMode ? 'opacity-90' : 'opacity-80'
              }`}
            />
            <div className="grain-overlay" />
            <div
              className={`absolute inset-0 pointer-events-none ${
                isDarkMode ? 'bg-black/10' : 'bg-white/10'
              }`}
            />
          </div>
        </div>

        <div className="absolute inset-x-8 bottom-0 top-53 overflow-y-auto pb-24 pr-2 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:left-[40vw] md:right-16 md:top-36 md:pb-32">
          <div className="grid gap-y-14 pt-16 md:grid-cols-[180px_minmax(320px,560px)] md:gap-x-24 md:gap-y-20 md:pt-24">
            {infoPageData.map((section) => (
              <div
                key={section.title}
                className="grid gap-4 md:contents"
              >
                <h2 
                  className="text-xl font-thin leading-none md:text-2xl cursor-default"
                  onMouseEnter={() => handleMouseEnter(section.title)}
                  onMouseLeave={() => handleMouseLeave(section.title)}
                >
                  {section.title}
                </h2>
                <p
                  className={`whitespace-pre-wrap max-w-xl text-lg font-thin leading-relaxed md:text-xl cursor-default ${
                    isDarkMode ? 'text-white/85' : 'text-black/75'
                  }`}
                  onMouseEnter={() => handleMouseEnter(section.title)}
                  onMouseLeave={() => handleMouseLeave(section.title)}
                >
                  {section.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={onClose}
        className={`absolute bottom-32 left-12 z-20 origin-bottom-left -rotate-90 cursor-pointer tracking-widest text-sm transition-colors md:left-24 md:text-base ${
          isDarkMode ? 'hover:text-gray-400' : 'hover:text-[#D0D0D0]'
        }`}
      >
        CLOSE
      </button>
    </section>
  );
}