import { useEffect, useState } from 'react';

export default function FloatingFish() {
  const [isBlinking, setIsBlinking] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsBlinking(prev => !prev);
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    // Added [text-shadow:0_0_10px_currentColor] for the glow effect
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden text-zinc-900 dark:text-white font-mono select-none [text-shadow:0_0_10px_currentColor]">
      <style>{`
        @keyframes swim-main {
          0% { transform: translate(0, 0) rotate(-2deg); }
          33% { transform: translate(25px, -15px) rotate(2deg); }
          66% { transform: translate(-15px, 15px) rotate(-4deg); }
          100% { transform: translate(0, 0) rotate(-2deg); }
        }
        @keyframes orbit-cw {
          0% { transform: rotate(0deg) translateX(80px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(80px) rotate(-360deg); }
        }
        @keyframes orbit-ccw {
          0% { transform: rotate(0deg) translateX(120px) rotate(0deg); }
          100% { transform: rotate(-360deg) translateX(120px) rotate(360deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-10px) translateX(10px); }
        }
        @keyframes seaweed {
          0%, 100% { transform: skewX(-12deg); }
          50% { transform: skewX(12deg); }
        }
        @keyframes bubble-rise {
          0% { transform: translateY(20px) translateX(0) scale(0.5); opacity: 0; }
          20% { opacity: 0.6; }
          50% { transform: translateY(-50px) translateX(15px) scale(1); }
          100% { transform: translateY(-120px) translateX(-10px) scale(1.5); opacity: 0; }
        }
        .animate-swim-main { animation: swim-main 6s ease-in-out infinite; }
        .animate-orbit-1 { animation: orbit-cw 12s linear infinite; }
        .animate-orbit-2 { animation: orbit-ccw 16s linear infinite; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-seaweed-1 { animation: seaweed 4s ease-in-out infinite; transform-origin: bottom; }
        .animate-seaweed-2 { animation: seaweed 5.5s ease-in-out infinite reverse; transform-origin: bottom; }
        .animate-seaweed-3 { animation: seaweed 3.5s ease-in-out infinite 1s; transform-origin: bottom; }
        .animate-bubble-1 { animation: bubble-rise 4.5s ease-in infinite; }
        .animate-bubble-2 { animation: bubble-rise 6s ease-in infinite 2s; }
        .animate-bubble-3 { animation: bubble-rise 3.5s ease-in infinite 1s; }
      `}</style>
      
      {/* Main Fish */}
      <div className="absolute right-[15%] top-[40%] animate-swim-main text-2xl tracking-widest opacity-80 z-20">
        {isBlinking ? "><((((°>" : "><(((('>"}
      </div>

      {/* Orbiting Small Fishes */}
      <div className="absolute right-[15%] top-[40%] animate-orbit-1 text-sm tracking-widest opacity-50 z-10">
        {"<°)))><"}
      </div>
      <div className="absolute right-[15%] top-[40%] animate-orbit-2 text-xs tracking-wider opacity-40 mt-8 z-10">
        {"><>"}
      </div>

      {/* Pushed these elements from left-[15%] to left-[45%] and beyond to clear the buttons */}
      <div className="absolute left-[45%] top-[30%] animate-float-slow text-sm tracking-widest opacity-50 z-10" style={{ animationDuration: '8s' }}>
        {"<°)))><"}
      </div>
      <div className="absolute left-[60%] top-[60%] animate-float-slow text-xs tracking-widest opacity-40 z-10" style={{ animationDuration: '6s', animationDelay: '1s' }}>
        {"><((>"}
      </div>

      {/* Starfish on the floor */}
      <div className="absolute left-[42%] bottom-1 opacity-50 text-sm animate-pulse">★</div>
      <div className="absolute left-[65%] bottom-2 opacity-40 text-xs rotate-12">☆</div>
      <div className="absolute right-[25%] bottom-0 opacity-50 text-sm -rotate-12">★</div>

      {/* Scattered Bubbles */}
      <div className="absolute left-[40%] bottom-0 animate-bubble-1 text-xs opacity-50">°</div>
      <div className="absolute left-[55%] bottom-[-10px] animate-bubble-2 text-[10px] opacity-40">o</div>
      <div className="absolute right-[25%] bottom-0 animate-bubble-1 text-xs opacity-50" style={{ animationDelay: '1.5s' }}>°</div>
      <div className="absolute right-[45%] bottom-[-10px] animate-bubble-2 text-[10px] opacity-40">o</div>
      <div className="absolute right-[10%] bottom-[10px] animate-bubble-3 text-sm opacity-30">O</div>

      {/* Ascii Seaweed / Grass across the bottom */}
      <div className="absolute bottom-0 left-[42%] flex flex-col items-center animate-seaweed-1 text-sm opacity-50 leading-none">
        <span>(</span><span>)</span><span>(</span>
      </div>
      <div className="absolute bottom-0 left-[55%] flex flex-col items-center animate-seaweed-2 text-xs opacity-40 leading-none">
        <span>~</span><span>~</span><span>~</span><span>~</span>
      </div>
      <div className="absolute bottom-0 right-[25%] flex flex-col items-center animate-seaweed-1 text-sm opacity-50 leading-none">
        <span>(</span><span>)</span><span>(</span><span>)</span>
      </div>
      <div className="absolute bottom-0 right-[45%] flex flex-col items-center animate-seaweed-2 text-xs opacity-40 leading-none">
        <span>~</span><span>~</span><span>~</span><span>~</span><span>~</span>
      </div>
      <div className="absolute bottom-0 right-[10%] flex flex-col items-center animate-seaweed-3 text-sm opacity-60 leading-none">
        <span>)</span><span>(</span><span>)</span><span>(</span>
      </div>
    </div>
  );
}