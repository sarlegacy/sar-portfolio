
import React from 'react';
import { Message } from '../types';

interface MessageBubbleProps {
    message: Message;
    isTyping?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, isTyping }) => {
    const isUser = message.role === 'user';

    const baseClasses = "px-4 py-3 max-w-xs md:max-w-md rounded-2xl animate-fade-in";
    const userClasses = "bg-brand-green text-mono-black rounded-br-none ml-auto";
    const modelClasses = "bg-gray-200 dark:bg-mono-mid text-gray-900 dark:text-white rounded-bl-none";

    // Basic markdown-like formatting for bold text
    const formatContent = (content: string) => {
        return content.split('**').map((part, index) => 
            index % 2 === 1 ? <strong key={index}>{part}</strong> : part
        );
    };

    return (
        <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
            <div className={`${baseClasses} ${isUser ? userClasses : modelClasses}`}>
                <p className="text-sm whitespace-pre-wrap">
                    {formatContent(message.content)}
                    {isTyping && (
                        <span className="inline-block w-1.5 h-4 ml-1 align-middle bg-current animate-pulse" />
                    )}
                </p>
            </div>
        </div>
    );
};

export default MessageBubble;
