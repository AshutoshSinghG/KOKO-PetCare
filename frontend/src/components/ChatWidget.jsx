import React, { useState, useRef, useEffect } from 'react';

// Get API URL from config or environment
const getApiUrl = () => {
    if (typeof window !== 'undefined' && window.VetChatbotConfig?.apiUrl) {
        return window.VetChatbotConfig.apiUrl;
    }
    // Default to same origin for development, or specified backend
    return import.meta.env?.VITE_API_URL || 'https://koko-petcare.onrender.com';
};

// Custom hook for chat functionality
const useChat = () => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sessionId, setSessionId] = useState(null);

    const apiUrl = getApiUrl();

    // Initialize session on mount
    useEffect(() => {
        initSession();
    }, []);

    const initSession = async () => {
        try {
            // Get context from config if available
            const context = typeof window !== 'undefined' ? window.VetChatbotConfig : {};

            const response = await fetch(`${apiUrl}/api/chat/session`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ context })
            });

            const data = await response.json();
            if (data.success) {
                setSessionId(data.sessionId);
                // Add welcome message
                setMessages([{
                    role: 'assistant',
                    content: "Hello! I'm your veterinary assistant. I can help you with pet care questions, vaccination schedules, diet advice, and more. I can also help you book a veterinary appointment. How can I assist you today?",
                    timestamp: new Date()
                }]);
            }
        } catch (err) {
            console.error('Failed to initialize session:', err);
            setError('Failed to connect to chat service');
        }
    };

    const sendMessage = async (content) => {
        if (!content.trim() || isLoading) return;

        setError(null);

        // Add user message immediately
        const userMessage = {
            role: 'user',
            content: content.trim(),
            timestamp: new Date()
        };
        setMessages(prev => [...prev, userMessage]);
        setIsLoading(true);

        try {
            const response = await fetch(`${apiUrl}/api/chat/message`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId,
                    message: content.trim()
                })
            });

            const data = await response.json();

            if (data.success) {
                setMessages(prev => [...prev, {
                    role: 'assistant',
                    content: data.response,
                    timestamp: new Date()
                }]);
            } else {
                throw new Error(data.error || 'Failed to get response');
            }
        } catch (err) {
            console.error('Send message error:', err);
            setError('Sorry, something went wrong. Please try again.');
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "I'm sorry, I'm having trouble processing your request right now. Please try again in a moment.",
                timestamp: new Date(),
                isError: true
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return { messages, isLoading, error, sendMessage, sessionId };
};

// Loading indicator component
const LoadingIndicator = () => (
    <div className="vet-chat-loading">
        <div className="vet-chat-loading-dot"></div>
        <div className="vet-chat-loading-dot"></div>
        <div className="vet-chat-loading-dot"></div>
    </div>
);

// Message bubble component
const MessageBubble = ({ message }) => {
    const isUser = message.role === 'user';

    return (
        <div className={`vet-chat-message ${isUser ? 'vet-chat-message-user' : 'vet-chat-message-bot'} ${message.isError ? 'vet-chat-message-error' : ''}`}>
            {!isUser && (
                <div className="vet-chat-avatar">
                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                        <path d="M4.5 12c0-1.57.75-2.96 1.91-3.84L5 6.5C3.78 7.64 3 9.24 3 11c0 1.76.78 3.36 2 4.5l1.41-1.66C5.25 12.96 4.5 11.57 4.5 12zm15 0c0 1.57-.75 2.96-1.91 3.84L19 17.5c1.22-1.14 2-2.74 2-4.5 0-1.76-.78-3.36-2-4.5l-1.41 1.66c1.16.88 1.91 2.27 1.91 3.84zM12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z" />
                        <circle cx="9" cy="10" r="1.5" />
                        <circle cx="15" cy="10" r="1.5" />
                        <path d="M12 17.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" />
                    </svg>
                </div>
            )}
            <div className="vet-chat-bubble">
                <div className="vet-chat-text">{message.content}</div>
            </div>
        </div>
    );
};

// Main Chat Widget Component
const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const { messages, isLoading, error, sendMessage } = useChat();
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    // Auto-scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    // Focus input when opened
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
    }, [isOpen]);

    // Listen for external event to open chat (from buttons on homepage)
    useEffect(() => {
        const handleOpenChat = () => {
            setIsOpen(true);
        };

        // Listen for custom event
        window.addEventListener('openVetChatbot', handleOpenChat);

        // Expose global function for easy access from other components
        window.openVetChatbot = handleOpenChat;

        return () => {
            window.removeEventListener('openVetChatbot', handleOpenChat);
            delete window.openVetChatbot;
        };
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            sendMessage(inputValue);
            setInputValue('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="vet-chat-widget">
            {/* Chat Window */}
            {isOpen && (
                <div className="vet-chat-window">
                    {/* Header */}
                    <div className="vet-chat-header">
                        <div className="vet-chat-header-info">
                            <div className="vet-chat-header-avatar">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                                </svg>
                            </div>
                            <div>
                                <div className="vet-chat-header-title">Vet Assistant</div>
                                <div className="vet-chat-header-status">
                                    <span className="vet-chat-status-dot"></span>
                                    Online
                                </div>
                            </div>
                        </div>
                        <button className="vet-chat-close-btn" onClick={() => setIsOpen(false)} aria-label="Close chat">
                            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                            </svg>
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="vet-chat-messages">
                        {messages.map((msg, idx) => (
                            <MessageBubble key={idx} message={msg} />
                        ))}
                        {isLoading && (
                            <div className="vet-chat-message vet-chat-message-bot">
                                <div className="vet-chat-avatar">
                                    <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                                    </svg>
                                </div>
                                <LoadingIndicator />
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Error Banner */}
                    {error && (
                        <div className="vet-chat-error">
                            {error}
                        </div>
                    )}

                    {/* Input */}
                    <form className="vet-chat-input-container" onSubmit={handleSubmit}>
                        <input
                            ref={inputRef}
                            type="text"
                            className="vet-chat-input"
                            placeholder="Type a message..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isLoading}
                        />
                        <button
                            type="submit"
                            className="vet-chat-send-btn"
                            disabled={!inputValue.trim() || isLoading}
                            aria-label="Send message"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                            </svg>
                        </button>
                    </form>
                </div>
            )}

            {/* Floating Button */}
            <button
                className={`vet-chat-fab ${isOpen ? 'vet-chat-fab-hidden' : ''}`}
                onClick={() => setIsOpen(true)}
                aria-label="Open chat"
            >
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z" />
                    <path d="M12 15c1.38 0 2.5-1.12 2.5-2.5S13.38 10 12 10s-2.5 1.12-2.5 2.5S10.62 15 12 15zm0-4c.83 0 1.5.67 1.5 1.5S12.83 14 12 14s-1.5-.67-1.5-1.5S11.17 11 12 11z" />
                    <circle cx="8" cy="8" r="1.5" />
                    <circle cx="16" cy="8" r="1.5" />
                </svg>
            </button>
        </div>
    );
};

export default ChatWidget;
