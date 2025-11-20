
import React, { useState, useEffect, useRef, FormEvent } from 'react';
import { GoogleGenAI, Chat, GenerateContentResponse } from '@google/genai';
import { BotIcon, SendIcon, XIcon } from './icons/Icons';
import { Message } from '../types';
import MessageBubble from './MessageBubble';
import { profileData, skillsData, projectsData, experienceData, servicesData, testimonialsData } from '../constants';
import { useFocusTrap } from './hooks/useFocusTrap';

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

                const portfolioContext = `
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

                chatRef.current = ai.chats.create({
                    model: 'gemini-2.5-flash',
                    config: {
                        systemInstruction: portfolioContext,
                    },
                });

                setMessages([
                    { role: 'model', content: "Hello! I'm Saiful's AI assistant. Feel free to ask me anything about his skills, projects, or experience." }
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

    const handleSendMessage = async (e: FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const input = form.elements.namedItem('message') as HTMLInputElement;
        const userInput = input.value.trim();

        if (!userInput || isLoading || !chatRef.current) return;

        setIsLoading(true);
        setError(null);
        setMessages(prev => [...prev, { role: 'user', content: userInput }]);
        input.value = '';

        try {
            const result = await chatRef.current.sendMessageStream({ message: userInput });
            
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

    return (
        <>
            <div className={`fixed bottom-8 right-8 z-50 transition-transform duration-300 ${isOpen ? 'scale-0' : 'scale-100'}`}>
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-brand-green text-mono-black rounded-full p-4 shadow-lg hover:bg-brand-green/90 focus:outline-none focus:ring-2 focus:ring-brand-green focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-mono-dark transition-transform hover:scale-110"
                    aria-label="Open AI Assistant"
                    disabled={!!error}
                >
                    <BotIcon className="w-8 h-8" />
                </button>
            </div>

            <div 
                ref={chatPanelRef}
                className={`fixed bottom-8 right-8 z-50 w-[calc(100vw-4rem)] max-w-sm h-[65vh] max-h-[600px] bg-white/80 dark:bg-mono-dark/80 backdrop-blur-lg rounded-2xl shadow-2xl border border-gray-200 dark:border-mono-mid flex flex-col transition-all duration-500 ease-in-out focus:outline-none ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16 pointer-events-none'}`}
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

                <div className="p-4 border-t border-gray-200 dark:border-mono-mid flex-shrink-0">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-3">
                        <input
                            type="text"
                            name="message"
                            placeholder="Ask about my projects..."
                            className="w-full bg-gray-100 dark:bg-mono-mid border-transparent rounded-full py-3 px-5 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-mono-light focus:outline-none focus:ring-2 focus:ring-brand-green transition-shadow"
                            disabled={isLoading || !!error}
                            autoComplete="off"
                        />
                        <button type="submit" className="bg-brand-green text-mono-black rounded-full p-3 transition-transform hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100" disabled={isLoading || !!error} aria-label="Send message">
                            <SendIcon className="w-6 h-6" />
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AIAssistant;
