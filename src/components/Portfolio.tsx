import { useState, useEffect } from 'react';
import { MapPin, Download, Briefcase, FolderOpen, Code2, GraduationCap, User, Sun, Moon, Volume2, VolumeX, Settings2, Gamepad2, ArrowRight } from 'lucide-react';
import ReadableBlock from './ReadableBlock';
import TimelineModal from './TimelineModal';
import ChatWidget from './ChatWidget';

export default function Portfolio() {
  const [theme, setTheme] = useState('dark');
  const [isAudioOn, setIsAudioOn] = useState(false);
  const [showAudioSettings, setShowAudioSettings] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voicePreference, setVoicePreference] = useState<'female' | 'male'>('female');
  const [highlightColor, setHighlightColor] = useState('bg-white');
  const [activeModal, setActiveModal] = useState<'projects' | 'sidequests' | 'experience' | null>(null);
  
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    if (activeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [activeModal]);

  useEffect(() => {
    const loadVoices = () => setVoices(window.speechSynthesis.getVoices());
    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
    return () => window.speechSynthesis.cancel();
  }, []);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  const toggleAudio = () => {
    const newState = !isAudioOn;
    setIsAudioOn(newState);
    if (newState) {
      const unlock = new SpeechSynthesisUtterance('');
      window.speechSynthesis.speak(unlock);
    } else {
      window.speechSynthesis.cancel();
    }
  };

  const getSelectedVoice = () => {
    if (voices.length === 0) return null;
    if (voicePreference === 'female') {
      return voices.find(v => v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Zira') || v.name.includes('Google US English')) || voices[0];
    } else {
      return voices.find(v => v.name.includes('Male') || v.name.includes('Alex') || v.name.includes('David') || v.name.includes('Mark')) || voices[1] || voices[0];
    }
  };

  const activeVoice = getSelectedVoice();

  const isMatch = (techs: string[]) => !selectedTech || techs.includes(selectedTech);
  
  const expTech = ['React', 'TypeScript', 'MapLibre GL', 'Node.js', 'React Hook Form', 'Zod', 'Tailwind CSS', 'JavaScript', 'Git', 'GitHub', 'Jira', 'VS Code', 'Python'];
  const darwinTech = ['HTML5', 'CSS3', 'Tailwind CSS', 'MySQL', 'JavaScript', 'Git', 'GitHub', 'VS Code', 'XAMPP'];
  const compoTech = ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Git', 'GitHub', 'VS Code'];
  const questsTech = ['Python', 'Git', 'GitHub', 'VS Code'];

  const TechBadge = ({ tech }: { tech: string }) => {
    const isSelected = selectedTech === tech;
    const isDimmed = selectedTech && !isSelected;
    return (
      <button
        onClick={() => setSelectedTech(isSelected ? null : tech)}
        className={`px-3 py-1 text-xs rounded-md transition-all border ${
           isSelected ? 'bg-zinc-800 text-white border-zinc-800 dark:bg-zinc-200 dark:text-zinc-900 dark:border-zinc-200 scale-105 shadow-sm z-10'
           : isDimmed ? 'bg-zinc-50 dark:bg-[#1a1a1a] text-zinc-400 dark:text-zinc-600 border-transparent opacity-50 hover:opacity-100'
           : 'bg-zinc-100 dark:bg-[#1a1a1a] text-zinc-700 dark:text-zinc-300 border-transparent hover:border-zinc-300 dark:hover:border-zinc-700'
        }`}
      >
        {tech}
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-[#f4f4f5] dark:bg-[#050505] text-zinc-700 dark:text-zinc-300 p-6 md:p-16 selection:bg-zinc-300 dark:selection:bg-zinc-700 font-['Times_New_Roman',Times,serif] transition-colors duration-300">
      <div className="max-w-6xl mx-auto flex flex-col gap-8 relative z-10">
        
        <div className="absolute -top-2 right-0 md:-right-4 flex items-center gap-2 z-50 bg-white/50 dark:bg-black/50 backdrop-blur-md p-1.5 rounded-full border border-zinc-200 dark:border-zinc-800">
          <div className="relative">
            {isAudioOn && (
              <button 
                onClick={() => setShowAudioSettings(!showAudioSettings)}
                className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-[#111111] transition-colors text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
              >
                <Settings2 size={16} />
              </button>
            )}
            
            {showAudioSettings && isAudioOn && (
              <div className="absolute top-10 right-0 w-48 bg-white dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800 rounded-lg shadow-xl p-4 flex flex-col gap-4 font-sans text-sm">
                <div>
                  <p className="text-zinc-500 mb-2 font-medium">Voice</p>
                  <div className="flex gap-2">
                    <button onClick={() => setVoicePreference('female')} className={`px-3 py-1 rounded-md transition-colors ${voicePreference === 'female' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'bg-zinc-100 dark:bg-zinc-800'}`}>Female</button>
                    <button onClick={() => setVoicePreference('male')} className={`px-3 py-1 rounded-md transition-colors ${voicePreference === 'male' ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' : 'bg-zinc-100 dark:bg-zinc-800'}`}>Male</button>
                  </div>
                </div>
                <div>
                  <p className="text-zinc-500 mb-2 font-medium">Highlight</p>
                  <div className="flex gap-2">
                    <button onClick={() => setHighlightColor('bg-white')} className={`w-6 h-6 rounded-full bg-white border ${highlightColor === 'bg-white' ? 'ring-2 ring-zinc-500 ring-offset-2 dark:ring-offset-[#111111]' : 'border-zinc-300'}`} />
                    <button onClick={() => setHighlightColor('bg-blue-300')} className={`w-6 h-6 rounded-full bg-blue-300 border border-transparent ${highlightColor === 'bg-blue-300' ? 'ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-[#111111]' : ''}`} />
                    <button onClick={() => setHighlightColor('bg-emerald-300')} className={`w-6 h-6 rounded-full bg-emerald-300 border border-transparent ${highlightColor === 'bg-emerald-300' ? 'ring-2 ring-emerald-500 ring-offset-2 dark:ring-offset-[#111111]' : ''}`} />
                    <button onClick={() => setHighlightColor('bg-rose-300')} className={`w-6 h-6 rounded-full bg-rose-300 border border-transparent ${highlightColor === 'bg-rose-300' ? 'ring-2 ring-rose-500 ring-offset-2 dark:ring-offset-[#111111]' : ''}`} />
                  </div>
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={toggleAudio}
            className={`p-2 rounded-full transition-colors ${isAudioOn ? 'text-zinc-900 dark:text-zinc-100 bg-zinc-200 dark:bg-[#1a1a1a]' : 'text-zinc-500 hover:bg-zinc-200 dark:hover:bg-[#111111] hover:text-zinc-900 dark:hover:text-zinc-100'}`}
          >
            {isAudioOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-[#111111] transition-colors text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <header className="flex flex-col md:flex-row items-center md:items-stretch gap-8 pb-6 mt-12 md:mt-0">
          <div className="w-40 h-40 overflow-hidden shrink-0 shadow-sm rounded-lg bg-zinc-200 dark:bg-zinc-800">
            <img 
              src="src/assets/id.png" 
              alt="Profile" 
              className="w-full h-full object-cover grayscale opacity-90 transition-all duration-500"
            />
          </div>
          
          <div className="flex flex-col flex-1 text-center md:text-left justify-center">
            <div>
              <h1 className="text-3xl md:text-4xl text-zinc-900 dark:text-zinc-100 font-normal tracking-wide mb-3">
                Kate Aikeen Fabiani
              </h1>
              
              <div className="flex flex-col md:flex-row items-center md:items-start gap-4 text-sm text-zinc-500 dark:text-zinc-400 font-sans mb-3">
                <div className="flex items-center justify-center md:justify-start gap-1.5 text-sm text-zinc-500 dark:text-zinc-400 font-sans">
                    <MapPin size={14} />
                    <span>Caloocan City, Metro Manila</span>
                </div>
              </div>
              
              <p className="text-base text-zinc-600 dark:text-zinc-300 italic">
                Web Developer
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-3 text-sm mt-5 font-sans">
              <a href="#" className="flex items-center gap-2 px-4 py-2 hover:-translate-y-0.5 shadow-sm transition-all bg-zinc-900 dark:bg-zinc-200 text-white dark:text-zinc-900 rounded-md hover:bg-zinc-800 dark:hover:bg-white">
                <Download size={14} />
                Download CV
              </a>
              <a href="https://github.com/aikeen8" target="_blank" rel="noreferrer" className="flex items-center gap-2 px-4 py-2 transition-all hover:-translate-y-0.5 shadow-sm bg-white dark:bg-[#111111] text-zinc-900 dark:text-zinc-100 rounded-md hover:bg-zinc-50 dark:hover:bg-[#1a1a1a] border border-zinc-200 dark:border-zinc-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                Github
              </a>
              <a href="#" className="flex items-center gap-2 px-4 py-2 transition-all hover:-translate-y-0.5 shadow-sm bg-white dark:bg-[#111111] text-zinc-900 dark:text-zinc-100 rounded-md hover:bg-zinc-50 dark:hover:bg-[#1a1a1a] border border-zinc-200 dark:border-zinc-800">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                LinkedIn
              </a>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mt-2">
          
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            <section className="bg-white dark:bg-[#111111] p-8 rounded-xl shadow-sm border border-zinc-100 dark:border-transparent hover:-translate-y-1 hover:shadow-md dark:hover:bg-[#161616] transition-all duration-300">
              <h2 className="text-xl text-zinc-900 dark:text-zinc-100 mb-6 flex items-center gap-3 font-semibold">
                <User size={18} className="text-zinc-400 dark:text-zinc-500" />
                About
              </h2>
              <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                <ReadableBlock 
                  isAudioOn={isAudioOn} voice={activeVoice} highlightColor={highlightColor}
                  text="Web Developer with hands-on experience developing modern web applications using React, TypeScript, Tailwind CSS, and REST APIs." 
                />
                <ReadableBlock 
                  isAudioOn={isAudioOn} voice={activeVoice} highlightColor={highlightColor}
                  text="Experienced in building responsive user interfaces, integrating backend services, and developing geospatial mapping features for smart city applications." 
                />
              </div>
            </section>

            <section className="bg-white dark:bg-[#111111] p-8 rounded-xl shadow-sm border border-zinc-100 dark:border-transparent hover:-translate-y-1 hover:shadow-md dark:hover:bg-[#161616] transition-all duration-300 relative">
              <h2 className="text-xl text-zinc-900 dark:text-zinc-100 mb-2 flex items-center gap-3 font-semibold">
                <Code2 size={18} className="text-zinc-400 dark:text-zinc-500" />
                Tech Stack
              </h2>
              <p className="text-xs text-zinc-500 mb-6 font-sans italic">Click a tool to filter projects & experience.</p>
              
              <div className="space-y-6 font-sans">
                <div>
                  <h3 className="text-zinc-900 dark:text-zinc-100 text-xs tracking-widest uppercase mb-3">Frontend</h3>
                  <div className="flex flex-wrap gap-2">
                    {['React', 'HTML5', 'CSS3', 'Tailwind CSS', 'React Hook Form', 'Zod', 'MapLibre GL'].map(tech => (
                      <TechBadge key={tech} tech={tech} />
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-zinc-900 dark:text-zinc-100 text-xs tracking-widest uppercase mb-3">Backend & Database</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Node.js', 'Express.js', 'PostgreSQL', 'MySQL', 'Supabase', 'MongoDB'].map(tech => (
                      <TechBadge key={tech} tech={tech} />
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-zinc-900 dark:text-zinc-100 text-xs tracking-widest uppercase mb-3">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {['JavaScript', 'TypeScript', 'Python', 'C#'].map(tech => (
                      <TechBadge key={tech} tech={tech} />
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-zinc-900 dark:text-zinc-100 text-xs tracking-widest uppercase mb-3">Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Git', 'GitHub', 'Visual Studio', 'VS Code', 'Jira', 'XAMPP'].map(tech => (
                      <TechBadge key={tech} tech={tech} />
                    ))}
                  </div>
                </div>
              </div>
            </section>

            <section className="bg-white dark:bg-[#111111] p-8 rounded-xl h-full shadow-sm border border-zinc-100 dark:border-transparent hover:-translate-y-1 hover:shadow-md dark:hover:bg-[#161616] transition-all duration-300">
              <h2 className="text-xl text-zinc-900 dark:text-zinc-100 mb-6 flex items-center gap-3 font-semibold">
                <GraduationCap size={18} className="text-zinc-400 dark:text-zinc-500" />
                Education
              </h2>
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-base text-zinc-900 dark:text-zinc-100">STI College Fairview</h3>
                  <span className="text-xs text-zinc-500 font-sans">2022 - 2026</span>
                </div>
                <ReadableBlock 
                  isAudioOn={isAudioOn} voice={activeVoice} highlightColor={highlightColor} className="text-zinc-600 dark:text-zinc-400 text-sm"
                  text="Bachelor of Science in Information Technology" 
                />
                <p className="text-zinc-500 text-xs mt-2 italic">Dean's Lister (A.Y. 2023–2024, 2024–2025)</p>
              </div>
            </section>
            
          </div>

          <div className="lg:col-span-7 flex flex-col gap-6">
            
            <section className={`bg-white dark:bg-[#111111] p-8 rounded-xl shadow-sm border border-zinc-100 dark:border-transparent hover:-translate-y-1 hover:shadow-md dark:hover:bg-[#161616] transition-all duration-500 ${isMatch(expTech) ? 'opacity-100' : 'opacity-40 grayscale'}`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl text-zinc-900 dark:text-zinc-100 flex items-center gap-3 font-semibold">
                  <Briefcase size={18} className="text-zinc-400 dark:text-zinc-500" />
                  Experience
                </h2>
                <button 
                  onClick={() => setActiveModal('experience')} 
                  className="flex items-center gap-1 text-xs font-sans text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  Show More <ArrowRight size={14} />
                </button>
              </div>
              
              <div className="relative pl-5 border-l border-zinc-200 dark:border-zinc-800">
                <div className="absolute w-2 h-2 rounded-full left-[-4.5px] top-1.5 bg-zinc-400 dark:bg-zinc-500"></div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline mb-2">
                  <h3 className="text-lg text-zinc-900 dark:text-zinc-100 font-medium">Frontend Developer Internship</h3>
                  <span className="text-xs text-zinc-500 font-sans">Feb - May 2026</span>
                </div>
                <p className="text-zinc-600 dark:text-zinc-300 text-sm mb-4 italic">Hiraya Technology Solutions, Inc.</p>
                
                <ul className="space-y-4 text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed">
                  <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:rounded-full before:bg-zinc-400 dark:before:bg-zinc-600">
                    <ReadableBlock 
                      isAudioOn={isAudioOn} voice={activeVoice} highlightColor={highlightColor}
                      text="Developed a 3D interactive map interface for the Himo Digital Twin using React, TypeScript, and MapLibre GL, rendering over 10,000 city structures to support smart city visualization." 
                    />
                  </li>
                  <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:rounded-full before:bg-zinc-400 dark:before:bg-zinc-600">
                    <ReadableBlock 
                      isAudioOn={isAudioOn} voice={activeVoice} highlightColor={highlightColor}
                      text="Automated geospatial data extraction by developing a Node.js script that retrieved data from OpenStreetMap and the Overpass API." 
                    />
                  </li>
                  <li className="relative pl-4 before:absolute before:left-0 before:top-2 before:w-1 before:h-1 before:rounded-full before:bg-zinc-400 dark:before:bg-zinc-600">
                    <ReadableBlock 
                      isAudioOn={isAudioOn} voice={activeVoice} highlightColor={highlightColor}
                      text="Developed a Register Area feature with location search and coordinate mapping using React Hook Form, Zod, and Tailwind CSS, integrating it with a Django REST API." 
                    />
                  </li>
                </ul>
              </div>
            </section>

            <section className={`bg-white dark:bg-[#111111] p-8 rounded-xl shadow-sm border border-zinc-100 dark:border-transparent hover:-translate-y-1 hover:shadow-md dark:hover:bg-[#161616] transition-all duration-500 ${isMatch([...darwinTech, ...compoTech]) ? 'opacity-100' : 'opacity-40 grayscale'}`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl text-zinc-900 dark:text-zinc-100 flex items-center gap-3 font-semibold">
                  <FolderOpen size={18} className="text-zinc-400 dark:text-zinc-500" />
                  Projects
                </h2>
                <button 
                  onClick={() => setActiveModal('projects')} 
                  className="flex items-center gap-1 text-xs font-sans text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  Show More <ArrowRight size={14} />
                </button>
              </div>
              
              <div className="space-y-8">
                <div className={`transition-all duration-300 ${isMatch(darwinTech) ? 'opacity-100' : 'opacity-30'}`}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-lg text-zinc-900 dark:text-zinc-100 font-medium">Darwin's Hardware</h3>
                    <span className="text-xs text-zinc-500 font-sans">Jul - Nov 2025</span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-300 text-sm mb-3 italic">Capstone Project • Programmer Lead</p>
                  <ReadableBlock 
                    isAudioOn={isAudioOn} voice={activeVoice} highlightColor={highlightColor} className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed"
                    text="Led a team of four while contributing to the development of a PHP and MySQL e-commerce platform managing over 1,500 hardware products. Built a responsive mobile-first UI with Tailwind CSS." 
                  />
                </div>
                <div className={`transition-all duration-300 ${isMatch(compoTech) ? 'opacity-100' : 'opacity-30'}`}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-lg text-zinc-900 dark:text-zinc-100 font-medium">Compo</h3>
                    <span className="text-xs text-zinc-500 font-sans">May 2026</span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-300 text-sm mb-3 italic">Minimal Digital Workspace</p>
                  <ReadableBlock 
                    isAudioOn={isAudioOn} voice={activeVoice} highlightColor={highlightColor} className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed"
                    text="Developed a productivity web application featuring a Tiptap rich-text editor, task management, and a Pomodoro timer using React, TypeScript, and Tailwind CSS. Configured as a Progressive Web App (PWA) with offline sync support." 
                  />
                </div>
              </div>
            </section>
            
            <section className={`bg-white dark:bg-[#111111] p-8 rounded-xl shadow-sm border border-zinc-100 dark:border-transparent hover:-translate-y-1 hover:shadow-md dark:hover:bg-[#161616] transition-all duration-500 ${isMatch(questsTech) ? 'opacity-100' : 'opacity-40 grayscale'}`}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl text-zinc-900 dark:text-zinc-100 flex items-center gap-3 font-semibold">
                  <Gamepad2 size={18} className="text-zinc-400 dark:text-zinc-500" />
                  Side Quests
                </h2>
                <button 
                  onClick={() => setActiveModal('sidequests')} 
                  className="flex items-center gap-1 text-xs font-sans text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  Show More <ArrowRight size={14} />
                </button>
              </div>
              
              <div>
                <h3 className="text-base text-zinc-900 dark:text-zinc-100 font-medium mb-2">Manic Emulator Skins</h3>
                <ReadableBlock 
                  isAudioOn={isAudioOn} voice={activeVoice} highlightColor={highlightColor} className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed"
                  text="Designed and released a collection of custom, functional 3DS emulator skins featuring specialized NewJeans and Aespa themes." 
                />
              </div>
            </section>

          </div>
        </div>
      </div>

      <TimelineModal 
        activeModal={activeModal} 
        onClose={() => setActiveModal(null)}
        isAudioOn={isAudioOn}
        activeVoice={activeVoice}
        highlightColor={highlightColor}
      />

      <ChatWidget />
    </div>
  );
}