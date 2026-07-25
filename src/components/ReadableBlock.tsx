import { useState } from 'react';

interface ReadableBlockProps {
  text: string;
  isAudioOn: boolean;
  voice: SpeechSynthesisVoice | null;
  highlightColor: string;
  className?: string;
}

export default function ReadableBlock({ text, isAudioOn, voice, highlightColor, className = "" }: ReadableBlockProps) {
  const [charIndex, setCharIndex] = useState(-1);

  const handleMouseEnter = () => {
    if (!isAudioOn || !text) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (voice) utterance.voice = voice;
    utterance.rate = 1;
    
    utterance.onboundary = (e) => {
      if (e.name === 'word') setCharIndex(e.charIndex);
    };
    utterance.onend = () => setCharIndex(-1);
    
    window.speechSynthesis.speak(utterance);
  };

  const handleMouseLeave = () => {
    if (!isAudioOn) return;
    window.speechSynthesis.cancel();
    setCharIndex(-1);
  };

  const renderText = () => {
    if (charIndex === -1) return text;
    
    let currentLen = 0;
    const wordsAndSpaces = text.split(/(\s+)/);
    
    return wordsAndSpaces.map((chunk, i) => {
      const start = currentLen;
      const end = currentLen + chunk.length;
      currentLen = end;
      
      const isHighlighted = charIndex >= start && charIndex < end && chunk.trim() !== '';
      
      return (
        <span 
          key={i} 
          className={isHighlighted ? `${highlightColor} text-zinc-900 rounded-sm px-0.5 transition-colors duration-75` : ''}
        >
          {chunk}
        </span>
      );
    });
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={`cursor-default ${className}`}>
      {renderText()}
    </div>
  );
}