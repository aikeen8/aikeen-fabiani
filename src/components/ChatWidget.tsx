import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, Mail } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'ai';
  text: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'chat' | 'email'>('chat');
  
  // Chat state
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      text: "hi! i'm kate's personal ai assistant. i know all about her projects, experience, and tech stack. what would you like to know?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Email state
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (mode === 'chat') {
      scrollToBottom();
    }
  }, [messages, isTyping, mode]);

  const handleSendChat = () => {
    if (!inputValue.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: inputValue
    };

    setMessages(prev => [...prev, newUserMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const newAiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        text: "i am currently running in demo mode on the frontend! to make me fully functional, connect this chat component to a backend api using gemini or openai, and feed it kate's resume."
      };
      setMessages(prev => [...prev, newAiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendChat();
    }
  };

  const handleSendEmail = () => {
    // Change this to your actual email address
    const yourEmail = "your.email@gmail.com";
    window.location.href = `mailto:${yourEmail}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 sm:w-96 h-[32rem] bg-[#f4f4f5] dark:bg-[#111111] border border-zinc-200 dark:border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
          
          {/* Header with Toggle */}
          <div className="flex items-center justify-between px-4 py-3 bg-white dark:bg-[#161616] border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex bg-zinc-100 dark:bg-[#1a1a1a] p-1 rounded-lg">
              <button
                onClick={() => setMode('chat')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  mode === 'chat' 
                    ? 'bg-white dark:bg-[#2a2a2a] text-zinc-900 dark:text-white shadow-sm' 
                    : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                }`}
              >
                <Bot size={14} /> AI Chat
              </button>
              <button
                onClick={() => setMode('email')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                  mode === 'email' 
                    ? 'bg-white dark:bg-[#2a2a2a] text-zinc-900 dark:text-white shadow-sm' 
                    : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                }`}
              >
                <Mail size={14} /> Email
              </button>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1.5 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Chat Mode */}
          {mode === 'chat' && (
            <>
              <div className="flex-1 overflow-y-auto p-4 space-y-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                        msg.role === 'user' 
                          ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-br-sm' 
                          : 'bg-white dark:bg-[#1a1a1a] text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 rounded-bl-sm'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white dark:bg-[#1a1a1a] border border-zinc-200 dark:border-zinc-800 rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1.5 items-center">
                      <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="p-3 bg-white dark:bg-[#161616] border-t border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center gap-2 bg-[#f4f4f5] dark:bg-[#111111] p-1.5 rounded-xl border border-zinc-200 dark:border-zinc-800">
                  <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about her skills, projects..." 
                    className="flex-1 bg-transparent px-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 outline-none"
                  />
                  <button 
                    onClick={handleSendChat}
                    disabled={!inputValue.trim() || isTyping}
                    className="p-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity"
                  >
                    <Send size={16} className={inputValue.trim() && !isTyping ? "translate-x-0.5 -translate-y-0.5 transition-transform" : ""} />
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Email Mode */}
          {mode === 'email' && (
            <div className="flex-1 flex flex-col p-5 bg-[#f4f4f5] dark:bg-[#111111] overflow-y-auto">
              <div className="space-y-4 flex-1 flex flex-col">
                <div>
                  <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Subject</label>
                  <input
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    placeholder="Job opportunity, project, etc."
                    className="w-full bg-white dark:bg-[#1a1a1a] border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors"
                  />
                </div>
                <div className="flex-1 flex flex-col min-h-0">
                  <label className="block text-xs font-medium text-zinc-700 dark:text-zinc-300 mb-1.5">Message</label>
                  <textarea
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    placeholder="Hi Kate, I'm reaching out because..."
                    className="w-full flex-1 bg-white dark:bg-[#1a1a1a] border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 outline-none focus:border-zinc-400 dark:focus:border-zinc-600 transition-colors resize-none"
                  />
                </div>
              </div>
              <div className="mt-5">
                <button
                  onClick={handleSendEmail}
                  disabled={!emailSubject.trim() || !emailBody.trim()}
                  className="w-full py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-medium text-sm rounded-lg hover:opacity-90 disabled:opacity-50 transition-opacity flex items-center justify-center gap-2"
                >
                  <Mail size={16} /> Open Mail App
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Floating Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 px-5 py-3.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-2xl shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 group font-medium text-sm border border-zinc-800 dark:border-zinc-200"
      >
        {isOpen ? (
          <X size={18} className="group-hover:rotate-90 transition-transform duration-300" />
        ) : (
          <>
            <MessageCircle size={18} className="group-hover:-translate-y-0.5 transition-transform duration-300" />
            <span>Chat with Kate</span>
          </>
        )}
      </button>
    </div>
  );
}