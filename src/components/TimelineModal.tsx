import { X } from 'lucide-react';
import ReadableBlock from './ReadableBlock';

interface TimelineModalProps {
  activeModal: 'projects' | 'sidequests' | 'experience' | null;
  onClose: () => void;
  isAudioOn: boolean;
  activeVoice: SpeechSynthesisVoice | null;
  highlightColor: string;
}

export default function TimelineModal({ activeModal, onClose, isAudioOn, activeVoice, highlightColor }: TimelineModalProps) {
  if (!activeModal) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 dark:bg-black/60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-[#f4f4f5] dark:bg-[#111111] p-8 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto relative border border-zinc-200 dark:border-zinc-800 shadow-2xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose} 
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-[#1a1a1a] text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors z-10"
        >
           <X size={20} />
        </button>

        {activeModal === 'experience' && (
          <div className="relative pl-6 border-l-2 border-zinc-200 dark:border-zinc-800 space-y-12 mt-4 pt-4 pb-4">
            <div className="relative">
              <div className="absolute w-3 h-3 bg-zinc-300 dark:bg-zinc-600 rounded-full -left-[31px] top-1.5 border-4 border-[#f4f4f5] dark:border-[#111111] box-content"></div>
              <h3 className="text-xl text-zinc-900 dark:text-zinc-100 font-medium mb-1">Frontend Developer Internship</h3>
              <p className="text-zinc-500 text-sm mb-6 italic">Hiraya Technology Solutions, Inc. • Feb - May 2026</p>
              
              <div className="space-y-4 text-sm md:text-base leading-relaxed">
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 mr-2">Problem:</span>
                  <ReadableBlock 
                    isAudioOn={isAudioOn} voice={activeVoice} highlightColor={highlightColor} className="inline text-zinc-600 dark:text-zinc-400"
                    text="The city needed a way to visualize urban data, but rendering thousands of structures manually was too slow and extracting geospatial data was tedious."
                  />
                </div>
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 mr-2">Solution:</span>
                  <ReadableBlock 
                    isAudioOn={isAudioOn} voice={activeVoice} highlightColor={highlightColor} className="inline text-zinc-600 dark:text-zinc-400"
                    text="I built a 3D map interface for the Himo Digital Twin using React and MapLibre GL. I also wrote a Node.js script to pull data from OpenStreetMap, and added a Django-powered location search feature."
                  />
                </div>
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 mr-2">Result:</span>
                  <ReadableBlock 
                    isAudioOn={isAudioOn} voice={activeVoice} highlightColor={highlightColor} className="inline text-zinc-600 dark:text-zinc-400"
                    text="Successfully rendered over 10,000 city structures, creating a smooth visualization and eliminating manual data entry for the mapping team."
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {activeModal === 'projects' && (
          <div className="relative pl-6 border-l-2 border-zinc-200 dark:border-zinc-800 space-y-12 mt-4 pt-4 pb-4">
            
            <div className="relative">
              <div className="absolute w-3 h-3 bg-zinc-300 dark:bg-zinc-600 rounded-full -left-[31px] top-1.5 border-4 border-[#f4f4f5] dark:border-[#111111] box-content"></div>
              <h3 className="text-xl text-zinc-900 dark:text-zinc-100 font-medium mb-1">Darwin's Hardware</h3>
              <p className="text-zinc-500 text-sm mb-4 italic">Capstone Project • Jul - Nov 2025</p>
              
              <div className="w-full h-48 md:h-64 bg-zinc-200 dark:bg-[#1a1a1a] rounded-xl overflow-hidden mb-6 border border-zinc-200 dark:border-zinc-800">
                <img 
                  src="/path-to-darwin-image.jpg" 
                  alt="Darwin's Hardware preview" 
                  className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                />
              </div>
              
              <div className="space-y-4 text-sm md:text-base leading-relaxed">
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 mr-2">Problem:</span>
                  <ReadableBlock 
                    isAudioOn={isAudioOn} voice={activeVoice} highlightColor={highlightColor} className="inline text-zinc-600 dark:text-zinc-400"
                    text="Managing over 1,500 hardware products manually caused syncing issues, and the existing store lacked a mobile-friendly design."
                  />
                </div>
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 mr-2">Solution:</span>
                  <ReadableBlock 
                    isAudioOn={isAudioOn} voice={activeVoice} highlightColor={highlightColor} className="inline text-zinc-600 dark:text-zinc-400"
                    text="I led a team of four to build a PHP and MySQL e-commerce platform. I designed a mobile-first UI with Tailwind CSS and wrote logic to automate real-time inventory syncing."
                  />
                </div>
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 mr-2">Result:</span>
                  <ReadableBlock 
                    isAudioOn={isAudioOn} voice={activeVoice} highlightColor={highlightColor} className="inline text-zinc-600 dark:text-zinc-400"
                    text="Reduced page load times by 35%, improved mobile accessibility, and stopped inventory mismatches during daily transactions."
                  />
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute w-3 h-3 bg-zinc-300 dark:bg-zinc-600 rounded-full -left-[31px] top-1.5 border-4 border-[#f4f4f5] dark:border-[#111111] box-content"></div>
              <h3 className="text-xl text-zinc-900 dark:text-zinc-100 font-medium mb-1">Compo</h3>
              <p className="text-zinc-500 text-sm mb-4 italic">Productivity Web App • May 2026</p>
              
              <div className="w-full h-48 md:h-64 bg-zinc-200 dark:bg-[#1a1a1a] rounded-xl overflow-hidden mb-6 border border-zinc-200 dark:border-zinc-800">
                <img 
                  src="/path-to-compo-image.jpg" 
                  alt="Compo preview" 
                  className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                />
              </div>

              <div className="space-y-4 text-sm md:text-base leading-relaxed">
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 mr-2">Problem:</span>
                  <ReadableBlock 
                    isAudioOn={isAudioOn} voice={activeVoice} highlightColor={highlightColor} className="inline text-zinc-600 dark:text-zinc-400"
                    text="Relying on multiple apps for notes, tasks, and time management broke focus and reduced productivity."
                  />
                </div>
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 mr-2">Solution:</span>
                  <ReadableBlock 
                    isAudioOn={isAudioOn} voice={activeVoice} highlightColor={highlightColor} className="inline text-zinc-600 dark:text-zinc-400"
                    text="I built a unified workspace using React, TypeScript, and Supabase. I integrated a Tiptap rich-text editor, task manager, and Pomodoro timer into a Progressive Web App."
                  />
                </div>
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 mr-2">Result:</span>
                  <ReadableBlock 
                    isAudioOn={isAudioOn} voice={activeVoice} highlightColor={highlightColor} className="inline text-zinc-600 dark:text-zinc-400"
                    text="Created an all-in-one offline-capable app that keeps workflows continuous and secures data with username-based authentication."
                  />
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="absolute w-3 h-3 bg-zinc-300 dark:bg-zinc-600 rounded-full -left-[31px] top-1.5 border-4 border-[#f4f4f5] dark:border-[#111111] box-content"></div>
              <h3 className="text-xl text-zinc-900 dark:text-zinc-100 font-medium mb-1">Credibly</h3>
              <p className="text-zinc-500 text-sm mb-4 italic">Personal Learning Platform</p>
              
              <div className="w-full h-48 md:h-64 bg-zinc-200 dark:bg-[#1a1a1a] rounded-xl overflow-hidden mb-6 border border-zinc-200 dark:border-zinc-800">
                <img 
                  src="/path-to-credibly-image.jpg" 
                  alt="Credibly preview" 
                  className="w-full h-full object-cover grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
                />
              </div>

              <div className="space-y-4 text-sm md:text-base leading-relaxed">
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 mr-2">Problem:</span>
                  <ReadableBlock 
                    isAudioOn={isAudioOn} voice={activeVoice} highlightColor={highlightColor} className="inline text-zinc-600 dark:text-zinc-400"
                    text="Tracking scattered certifications and course completions across different platforms was disorganized."
                  />
                </div>
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 mr-2">Solution:</span>
                  <ReadableBlock 
                    isAudioOn={isAudioOn} voice={activeVoice} highlightColor={highlightColor} className="inline text-zinc-600 dark:text-zinc-400"
                    text="A personal platform was developed to consolidate this data. Focus was kept on clean data management and deployment on Vercel, avoiding unnecessary features like leveling systems."
                  />
                </div>
                <div>
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 mr-2">Result:</span>
                  <ReadableBlock 
                    isAudioOn={isAudioOn} voice={activeVoice} highlightColor={highlightColor} className="inline text-zinc-600 dark:text-zinc-400"
                    text="Provided a centralized dashboard to instantly view and manage educational progress."
                  />
                </div>
              </div>
            </div>

          </div>
        )}

        {activeModal === 'sidequests' && (
          <div className="relative pl-6 border-l-2 border-zinc-200 dark:border-zinc-800 space-y-12 mt-4 pt-4 pb-4">
            <div className="relative">
              <div className="absolute w-3 h-3 bg-zinc-300 dark:bg-zinc-600 rounded-full -left-[31px] top-1.5 border-4 border-[#f4f4f5] dark:border-[#111111] box-content"></div>
              <h3 className="text-xl text-zinc-900 dark:text-zinc-100 font-medium mb-1">Manic Emulator Skins</h3>
              <p className="text-zinc-500 text-sm mb-4 italic">UI Design • Apr 2026</p>
              <ReadableBlock 
                isAudioOn={isAudioOn} voice={activeVoice} highlightColor={highlightColor} className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed"
                text="Designed and released a collection of custom 3DS emulator skins. Handled the functional JSON configuration for assets, styling them around minimalist themes featuring NewJeans and Aespa graphics."
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}