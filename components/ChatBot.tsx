import React, { useState, useRef, useEffect, useContext } from 'react';
import { MessageCircle, X, Send, Loader2, Minimize2, Bot } from 'lucide-react';
import { AppContext } from '../App';
import { ChatMessage } from '../types';
import { TRANSLATIONS } from '../constants';
import { createChatSession } from '../services/geminiService';
import { Chat } from '@google/genai';

export const ChatBot: React.FC = () => {
  const { language } = useContext(AppContext);
  const t = TRANSLATIONS[language];
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial Greeting
    if (messages.length === 0) {
      setMessages([{
        id: 'init',
        role: 'model',
        text: t.aiWelcome,
        timestamp: new Date()
      }]);
    }
    // Initialize Gemini Chat Session
    if (!chatSessionRef.current) {
        chatSessionRef.current = createChatSession();
    }
  }, [language, t.aiWelcome]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      if (chatSessionRef.current) {
          const result = await chatSessionRef.current.sendMessage({ message: userMsg.text });
          const responseText = result.text;
          
          const modelMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'model',
            text: responseText || "I'm sorry, I couldn't generate a response at the moment.",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, modelMsg]);
      } else {
          // Fallback if API key not set
           const modelMsg: ChatMessage = {
            id: (Date.now() + 1).toString(),
            role: 'model',
            text: "AI service is currently unavailable (API Key missing). Please contact support via phone.",
            timestamp: new Date()
          };
          setMessages(prev => [...prev, modelMsg]);
      }

    } catch (error) {
      console.error("Chat error:", error);
      const errorMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: "Sorry, something went wrong. Please try again later.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-brand-600 text-white rounded-full shadow-lg shadow-brand-600/40 flex items-center justify-center hover:scale-110 transition-transform z-40 group"
      >
        <Bot size={28} className="group-hover:rotate-12 transition-transform" />
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
      </button>
    );
  }

  return (
    <div className={`fixed z-50 bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 ${isMinimized ? 'bottom-6 right-20 w-72 h-16' : 'bottom-6 right-6 w-96 h-[500px]'}`}>
      {/* Header */}
      <div className="bg-brand-900 text-white p-4 flex items-center justify-between cursor-pointer" onClick={() => isMinimized && setIsMinimized(false)}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-500/20 rounded-full flex items-center justify-center border border-brand-400/30">
             <Bot size={18} className="text-brand-100" />
          </div>
          <div>
            <h3 className="font-semibold text-sm">{t.aiAssistant}</h3>
            {!isMinimized && <p className="text-xs text-brand-200">Online | Gemini Powered</p>}
          </div>
        </div>
        <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
          <button onClick={() => setIsMinimized(!isMinimized)} className="hover:bg-white/10 p-1 rounded">
            <Minimize2 size={16} />
          </button>
          <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded">
            <X size={18} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 h-[370px] bg-gray-50 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-brand-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                 <div className="bg-white rounded-2xl px-4 py-3 border border-gray-100 rounded-bl-none flex items-center gap-2">
                    <Loader2 size={16} className="animate-spin text-brand-600" />
                    <span className="text-xs text-gray-400">Thinking...</span>
                 </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center gap-2 bg-gray-50 rounded-full px-4 py-2 border border-gray-200 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-100 transition-all">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about pneumatic parts..."
                className="flex-1 bg-transparent border-none outline-none text-sm text-gray-700 placeholder-gray-400"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                className="text-brand-600 disabled:text-gray-300 hover:scale-110 transition-transform"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};