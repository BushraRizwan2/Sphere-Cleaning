

import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI, Chat } from '@google/genai';
import type { ChatMessage } from '../types';

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isAvailable, setIsAvailable] = useState(false);
    const [chat, setChat] = useState<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // This check is crucial for stability. It ensures the API key is available
        // and prevents a crash if `process.env` is not defined or structured as expected in the browser.
        if (typeof process === 'undefined' || !process.env || !process.env.API_KEY) {
            console.error("Chatbot Error: API_KEY is not configured for this environment.");
            setMessages([{
                id: crypto.randomUUID(),
                role: 'system',
                text: 'Sorry, the chatbot is currently unavailable due to a configuration issue.'
            }]);
            setIsAvailable(false);
            return;
        }

        try {
            const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });
            const chatSession = ai.chats.create({
                model: 'gemini-2.5-flash',
                config: {
                    systemInstruction: 'You are a friendly and professional customer support assistant for CleanSphere, a cleaning service company for both B2B and B2C clients. Your goal is to answer user questions about the company, its services (Residential, Office, Hospital, Kitchen), and pricing. Always be helpful and encourage them to book an appointment for a free quote. Keep responses concise and easy to read.'
                }
            });
            setChat(chatSession);
            setMessages([{
                id: crypto.randomUUID(),
                role: 'model',
                text: 'Hello! How can I help you with CleanSphere\'s cleaning services today?'
            }]);
            setIsAvailable(true);
        } catch (error) {
            console.error("Failed to initialize chatbot:", error);
            setMessages([{
                id: crypto.randomUUID(),
                role: 'system',
                text: 'Sorry, the chatbot could not be started.'
            }]);
            setIsAvailable(false);
        }
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    const handleSendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userInput = e.currentTarget.message.value.trim();
        if (!userInput || isLoading || !chat) return;

        const userMessage: ChatMessage = { id: crypto.randomUUID(), role: 'user', text: userInput };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);
        e.currentTarget.reset();

        try {
            const response = await chat.sendMessage({ message: userInput });
            const modelMessage: ChatMessage = { id: crypto.randomUUID(), role: 'model', text: response.text };
            setMessages(prev => [...prev, modelMessage]);
        } catch (error) {
            console.error('Chat API error:', error);
            const errorMessage: ChatMessage = { id: crypto.randomUUID(), role: 'system', text: 'Sorry, I encountered an error. Please try again.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end">
            {/* Chat Window */}
            <div className={`w-[calc(100vw-2.5rem)] max-w-sm sm:w-96 h-[28rem] sm:h-[32rem] max-h-[80vh] bg-white rounded-xl shadow-2xl flex flex-col transition-all duration-300 ease-in-out ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}`}>
                <div className="bg-primary p-4 rounded-t-xl text-white font-bold text-center">CleanSphere Assistant</div>
                <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex my-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                           {msg.role !== 'system' ? (
                             <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-brand-purple text-white' : 'bg-gray-200 text-gray-800'}`}>
                                {msg.text}
                             </div>
                           ) : (
                             <div className="text-center w-full text-sm text-gray-500 italic p-2">{msg.text}</div>
                           )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex justify-start my-2">
                            <div className="bg-gray-200 text-gray-800 p-3 rounded-lg flex items-center space-x-2">
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                                <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
                <form onSubmit={handleSendMessage} className="p-3 border-t bg-white rounded-b-xl">
                    <div className="flex items-center">
                        <input
                            type="text"
                            name="message"
                            placeholder={isAvailable ? "Type a message..." : "Chat unavailable"}
                            className="flex-grow py-2 px-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary disabled:bg-gray-100"
                            disabled={isLoading || !isAvailable}
                            autoComplete="off"
                        />
                        <button type="submit" className="ml-3 bg-primary text-white p-2 rounded-full hover:bg-opacity-90 disabled:bg-gray-400" disabled={isLoading || !isAvailable}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                        </button>
                    </div>
                </form>
            </div>
            
            {/* Chat Toggle Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="mt-4 bg-primary text-white w-16 h-16 rounded-full shadow-lg flex items-center justify-center hover:bg-opacity-90 transition-transform hover:scale-110" aria-label="Toggle Chat">
                {isOpen ? (
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                )}
            </button>
        </div>
    );
};

export default Chatbot;