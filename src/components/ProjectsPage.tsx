import { useEffect, useMemo, useState } from 'react';
const backgroundImage = '/pics/dark-background.png';
import {
  projectFilters,
  projectPageData,
  type ProjectFilter,
  type ProjectItem,
} from '../data/projectPageData';

type ProjectsPageProps = {
  isDarkMode: boolean;
  onClose: () => void;
};

export default function ProjectsPage({
  isDarkMode,
  onClose,
}: ProjectsPageProps) {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>('All');
  const [hoveredProject, setHoveredProject] = useState<ProjectItem | null>(null);
  const [activePreview, setActivePreview] = useState<ProjectItem | null>(null);
  const [exitingPreview, setExitingPreview] = useState<ProjectItem | null>(null);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return projectPageData;
    }

    return projectPageData.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  useEffect(() => {
    if (!exitingPreview) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setExitingPreview(null);
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [exitingPreview]);

  const showProjectPreview = (project: ProjectItem) => {
    setHoveredProject(project);
    setActivePreview((currentPreview) => {
      if (currentPreview && currentPreview.title !== project.title) {
        setExitingPreview(currentPreview);
      }

      return project;
    });
  };

  const resetFilter = (filter: ProjectFilter) => {
    setActiveFilter(filter);
    setHoveredProject(null);
    setActivePreview(null);
    setExitingPreview(null);
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
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div className="flex items-center gap-5">
              <span className="text-sm leading-none md:text-base">C</span>
              <h1 className="text-4xl leading-none tracking-tight md:text-6xl lg:text-7xl">
                PROJECTS
              </h1>
            </div>

            <div className="flex flex-wrap items-center gap-4 pb-1 text-base md:gap-6 md:text-lg">
              {projectFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => resetFilter(filter)}
                  className={`cursor-pointer transition-colors ${
                    activeFilter === filter
                      ? isDarkMode
                        ? 'text-white'
                        : 'text-black'
                      : isDarkMode
                        ? 'text-white/45 hover:text-white'
                        : 'text-black/45 hover:text-black'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
          <div
            className={`mt-3 h-px w-screen ${
              isDarkMode ? 'bg-white/70' : 'bg-black/70'
            }`}
          />
        </div>

        {/* Updated top position from top-[35vh] to top-[28vh] */}
        <div
          className={`pointer-events-none absolute left-[12vw] top-[28vh] hidden w-[36vw] max-w-2xl transition-all duration-300 ease-out md:block ${
            hoveredProject || exitingPreview 
              ? 'opacity-100' 
              : 'opacity-0'
          }`}
        >
          <div 
            className={`relative aspect-video w-full overflow-hidden border ${
              isDarkMode ? 'border-white' : 'border-black'
            }`}
            style={{
              WebkitBoxReflect: 'below 4px linear-gradient(to bottom, rgba(0,0,0,0) 40%, rgba(0,0,0,0.4) 100%)'
            }}
          >
            {activePreview && (
              <>
                <img
                  key={activePreview.imageUrl}
                  src={activePreview.imageUrl}
                  alt=""
                  className={`absolute inset-0 h-full w-full object-cover ${
                    isDarkMode ? 'opacity-90' : 'opacity-80'
                  }`}
                  style={{ objectPosition: activePreview.imagePosition }}
                />
                <div className="grain-overlay" />
              </>
            )}
            
            {exitingPreview && (
              <img
                key={`exiting-${exitingPreview.imageUrl}`}
                src={exitingPreview.imageUrl}
                alt=""
                className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-300"
                style={{ objectPosition: exitingPreview.imagePosition }}
              />
            )}
            
            <div
              className={`absolute inset-0 pointer-events-none ${
                isDarkMode ? 'bg-black/10' : 'bg-white/10'
              }`}
            />
          </div>
        </div>

        <div className="absolute inset-x-8 bottom-0 top-53 overflow-y-auto pb-24 pr-2 scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden md:left-[52vw] md:right-16 md:top-36 md:pb-32">
          <div className="flex flex-col gap-12 pt-16 md:gap-16 md:pt-24">
            {filteredProjects.map((project) => (
              <button
                key={project.title}
                onMouseEnter={() => showProjectPreview(project)}
                onMouseLeave={() => setHoveredProject(null)}
                className={`grid cursor-pointer grid-cols-[3rem_minmax(0,1fr)] gap-6 text-left transition-colors ${
                  isDarkMode
                    ? 'hover:text-white/50'
                    : 'hover:text-black/45'
                }`}
              >
                <span className="pt-2 text-lg leading-none md:text-xl">
                  {project.number}
                </span>
                <span>
                  <span className="block text-4xl leading-none tracking-tight md:text-5xl">
                    {project.title}
                  </span>
                  <span className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-base leading-none md:text-lg">
                    <span>{project.category}</span>
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </span>
                </span>
              </button>
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