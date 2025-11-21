import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from '@google/genai';
import { BotIcon, SendIcon, XIcon } from './icons/Icons';
import { Message } from '../types';
import MessageBubble from './MessageBubble';
import { profileData, skillsData, projectsData, experienceData, servicesData, testimonialsData } from '../constants';
import { useFocusTrap } from './hooks/useFocusTrap';

// Static data moved outside component
const SUGGESTIONS = [
    "What are your top skills?",
    "Tell me about your experience.",
    "Show me the DeFi Dashboard project.",
    "How can I contact you?"
];

const PORTFOLIO_CONTEXT = `
    You are a helpful and friendly AI assistant for Saiful Alam Rafi's personal portfolio.
    Your goal is to answer questions from recruiters and visitors based on the following information.
    Keep your answers concise, professional, and directly related to the provided data.
    Do not invent information. If a question is outside the scope of this data, politely state that you can only answer questions about Saiful's portfolio.

    Here is the data about Saiful Alam Rafi:
    ---
    PROFILE: ${JSON.stringify(profileData)}
    ---
    SKILLS: ${JSON.stringify(skillsData)}
    ---
    PROJECTS: ${JSON.stringify(projectsData)}
    ---
    WORK EXPERIENCE: ${JSON.stringify(experienceData)}
    ---
    SERVICES: ${JSON.stringify(servicesData)}
    ---
    TESTIMONIALS: ${JSON.stringify(testimonialsData)}
    ---
`;

const AIAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const chatPanelRef = useRef<HTMLDivElement>(null);

    useFocusTrap({
        trapRef: chatPanelRef,
        isActive: isOpen,
        onDeactivate: () => setIsOpen(false),
    });

    // Effect to initialize the chat model
    useEffect(() => {
        const initializeChat = async () => {
            try {
                if (!process.env.API_KEY) {
                    console.warn("API_KEY environment variable not set. AI Assistant is disabled.");
                    setError("AI Assistant is not available at the moment.");
                    return;
                }
                const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

                chatRef.current = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction: PORTFOLIO_CONTEXT,
                    },
                });

                // Enhanced Onboarding Messages
                setMessages([
                    { role: 'model', content: "Hi there! 👋 I'm Saiful's virtual assistant." },
                    { role: 'model', content: "I can answer questions about his **skills**, **experience**, and **projects**. I can also help you get in touch with him." },
                    { role: 'model', content: "What would you like to know? Feel free to type a question or select a suggestion below! 👇" }
                ]);

            } catch (err) {
                console.error("Failed to initialize AI Assistant:", err);
                setError("Could not connect to the AI service.");
            }
        };

        initializeChat();
    }, []);

    // Effect to scroll to the latest message
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const sendMessage = async (text: string) => {
        if (!text || isLoading || !chatRef.current) return;

        setIsLoading(true);
        setError(null);
        setMessages(prev => [...prev, { role: 'user', content: text }]);

        try {
            const result = await chatRef.current.sendMessageStream({ message: text });
            
            let isFirstChunk = true;

            for await (const chunk of result) {
                const c = chunk as GenerateContentResponse;
                const chunkText = c.text;

                if (chunkText) {
                    setMessages(prev => {
                        const newMessages = [...prev];
                        if (isFirstChunk) {
                            newMessages.push({ role: 'model', content: chunkText });
                            isFirstChunk = false;
                        } else {
                            const lastMessage = newMessages[newMessages.length - 1];
                            if (lastMessage.role === 'model') {
                                newMessages[newMessages.length - 1] = {
                                    ...lastMessage,
                                    content: lastMessage.content + chunkText
                                };
                            }
                        }
                        return newMessages;
                    });
                }
            }
        } catch (err) {
            console.error("Error sending message:", err);
            setError("Sorry, I couldn't get a response. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleFormSubmit = (e: FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const input = form.elements.namedItem('message') as HTMLInputElement;
        const userInput = input.value.trim();
        
        if (userInput) {
            sendMessage(userInput);
            input.value = '';
        }
    };
    
    const hasUserInteracted = messages.some(m => m.role === 'user');

    return (
        <>
            {/* 
                Button Positioning:
                Mobile: Bottom Left (24px bottom, 16px left) - Balances BackToTop on right
                Desktop: Bottom Right (96px bottom, 32px right) - Stacks above BackToTop
            */}
            <div className={`fixed z-50 transition-transform duration-300 ${isOpen ? 'scale-0' : 'scale-100'} bottom-24 left-4 sm:bottom-24 sm:left-auto sm:right-8`}>
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-brand-green text-mono-black rounded-full p-4 shadow-lg hover:bg-brand-green/90 focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-mono-dark transition-transform hover:scale-110 group relative"
                    aria-label="Open AI Assistant"
                    disabled={!!error}
                >
                    <BotIcon className="w-8 h-8" />
                    {/* Tooltip for Desktop */}
                    <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white dark:bg-mono-mid text-gray-900 dark:text-white text-xs font-bold px-2 py-1 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden sm:block">
                        Ask AI
                    </span>
                </button>
            </div>

            <div 
                ref={chatPanelRef}
                className={`fixed z-50 w-[calc(100vw-2rem)] sm:w-[calc(100vw-4rem)] max-w-sm h-[65vh] max-h-[600px] bg-white/80 dark:bg-mono-dark/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 dark:border-mono-mid flex flex-col transition-all duration-500 ease-in-out focus:outline-none
                bottom-4 right-4 sm:bottom-8 sm:right-8
                ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'}`}
                role="dialog"
                aria-modal="true"
                aria-labelledby="ai-assistant-title"
                tabIndex={-1}
            >
                <header className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-mono-mid flex-shrink-0">
                    <div className="flex items-center gap-3">
                        <BotIcon className="w-6 h-6 text-brand-green" />
                        <h3 id="ai-assistant-title" className="font-display font-bold text-lg text-gray-900 dark:text-white">AI Assistant</h3>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="text-gray-500 dark:text-mono-light hover:text-gray-900 dark:hover:text-white" aria-label="Close chat">
                        <XIcon />
                    </button>
                </header>

                <div className="flex-grow p-4 overflow-y-auto scrollbar-hide">
                    {error ? (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-center text-status-red bg-status-red/10 p-4 rounded-lg">{error}</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {messages.map((msg, index) => (
                                <MessageBubble 
                                    key={index} 
                                    message={msg} 
                                    isTyping={isLoading && index === messages.length - 1 && msg.role === 'model'}
                                />
                            ))}
                            
                            {/* Suggestions Section */}
                            {!hasUserInteracted && !isLoading && (
                                <div className="animate-fade-in pt-2">
                                    <p className="text-xs font-bold text-gray-400 dark:text-mono-light/70 mb-3 uppercase tracking-wider">Suggested Questions</p>
                                    <div className="flex flex-wrap gap-2">
                                        {SUGGESTIONS.map((suggestion, idx) => (
                                            <button 
                                                key={idx}
                                                onClick={() => sendMessage(suggestion)}
                                                className="text-left text-sm bg-white dark:bg-mono-mid border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2 transition-all duration-200 text-gray-700 dark:text-mono-light hover:border-brand-green hover:text-brand-green dark:hover:text-brand-green hover:shadow-sm active:scale-95"
                                            >
                                                {suggestion}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {isLoading && (messages.length === 0 || messages[messages.length - 1].role !== 'model') && (
                                <div className="flex justify-start">
                                    <div className="bg-gray-200 dark:bg-mono-mid text-gray-900 dark:text-white rounded-2xl rounded-bl-none px-4 py-3 max-w-xs animate-fade-in">
                                       <div className="flex items-center gap-2">
                                           <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse"></span>
                                           <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></span>
                                           <span className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></span>
                                       </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    )}
                </div>

                {/* Footer Input Area with Glassmorphism */}
                <div className="p-4 border-t border-gray-200 dark:border-mono-mid flex-shrink-0 bg-white/50 dark:bg-mono-mid/50 backdrop-blur-md">
                    <form onSubmit={handleFormSubmit} className="flex items-center gap-3">
                        <input
                            type="text"
                            name="message"
                            placeholder="Ask about my projects..."
                            className="w-full bg-white dark:bg-mono-black/50 border border-gray-200 dark:border-white/10 rounded-full py-3 px-5 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-mono-light focus:outline-none focus:ring-2 focus:ring-brand-green transition-all shadow-inner"
                            disabled={isLoading || !!error}
                            autoComplete="off"
                        />
                        <button type="submit" className="bg-brand-green text-mono-black rounded-full p-3 transition-transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 shadow-lg shadow-brand-green/20" disabled={isLoading || !!error} aria-label="Send message">
                            <SendIcon className="w-6 h-6" />
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AIAssistant;