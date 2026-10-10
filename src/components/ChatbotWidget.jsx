import React, { useState, useEffect, useRef } from 'react';

export default function ChatbotWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'bot', content: "Welcome, dear guest. May I guide you through our artisanal masterpieces?" }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const [bottomOffset, setBottomOffset] = useState(16);
    
    const messagesEndRef = useRef(null);

    // Ensure scrolling snaps to the newest message
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) scrollToBottom();
    }, [messages, isOpen, isTyping]);

    // Footer obstacle avoidance system mapping viewport distances securely
    useEffect(() => {
        const handleScroll = () => {
            const footer = document.querySelector('footer');
            if (!footer) return;
            
            const rect = footer.getBoundingClientRect();
            // If footer enters standard viewport bounds, push the bot upwards natively
            if (rect.top <= window.innerHeight) {
                const overlap = window.innerHeight - rect.top;
                setBottomOffset(Math.max(16, overlap + 16));
            } else {
                setBottomOffset(16);
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleScroll);
        handleScroll(); // Initial boot check
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleScroll);
        };
    }, []);

    // Conversational Interaction Simulator
    const processInteractivity = (userText) => {
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            const lowerText = userText.toLowerCase();
            let response = "I didn’t quite understand. Try asking me about our 'Menu', 'Best Sellers', or 'Custom Cakes'.";
            
            if (lowerText.includes('menu')) {
                response = "Our menu is a testament to Bengal's heritage merged with French pastry arts. Please visit the Menu page to explore the Director's cut.";
            } else if (lowerText.includes('best seller') || lowerText.includes('bestseller')) {
                response = "Our 'Grand Truffle Croissant' and 'Darjeeling First Flush' are absolute cinematic favorites among our patrons right now!";
            } else if (lowerText.includes('custom cake') || lowerText.includes('cake')) {
                response = "We sculpt custom cakes tailored to your narrative! Head over to the Custom Cakes section to begin casting your vision.";
            }
            
            setMessages(prev => [...prev, { role: 'bot', content: response }]);
        }, 1200);
    };

    const handleSend = (text) => {
        if (!text.trim() || isTyping) return;
        setMessages(prev => [...prev, { role: 'user', content: text }]);
        processInteractivity(text);
    };

    return (
        <div 
            className="fixed right-4 z-[60] transition-all duration-300 ease-out" 
            style={{ bottom: `${bottomOffset}px` }}
        >
            {!isOpen ? (
                <button 
                    onClick={() => setIsOpen(true)}
                    aria-label="Open AI Assistant"
                    className="w-[60px] h-[60px] bg-[#a63b10] text-[#fff8f6] rounded-full flex items-center justify-center cinematic-hover shadow-[0_8px_20px_rgba(166,59,16,0.3)] border-2 border-white/10"
                >
                    <span className="material-symbols-outlined text-3xl">smart_toy</span>
                </button>
            ) : (
                <div 
                    role="dialog"
                    aria-label="AI Chat Assistant"
                    className="w-[360px] h-[520px] max-h-[85vh] max-w-[calc(100vw-32px)] bg-surface/95 backdrop-blur-xl border border-outline-variant/30 shadow-[0_20px_40px_rgba(0,0,0,0.15)] rounded-2xl flex flex-col cinematic-enter overflow-hidden"
                >
                    {/* Header Zone */}
                    <div className="bg-primary/10 px-5 py-4 flex justify-between items-center border-b border-outline-variant/20">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-primary text-white flex justify-center items-center shadow-inner">
                                <span className="material-symbols-outlined text-[20px]">smart_toy</span>
                            </div>
                            <div>
                                <h3 className="font-headline font-bold text-[15px] leading-tight text-on-surface">L'RAY Assistant</h3>
                                <p className="text-[10px] uppercase font-label tracking-widest text-primary">AI Concierge</p>
                            </div>
                        </div>
                        <button 
                            onClick={() => setIsOpen(false)}
                            aria-label="Close Assistant Window"
                            className="w-8 h-8 rounded-full bg-transparent hover:bg-black/5 text-on-surface-variant hover:text-error transition-colors flex items-center justify-center"
                        >
                            <span className="material-symbols-outlined text-lg">close</span>
                        </button>
                    </div>

                    {/* Chat Bubble Rendering Canvas */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-5 custom-scrollbar bg-gradient-to-b from-transparent to-black/5 dark:to-white/5">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`max-w-[85%] ${msg.role === 'user' ? 'ml-auto' : 'mr-auto'}`}>
                                <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-primary text-white rounded-br-sm shadow-sm' : 'bg-surface-container-low text-on-surface rounded-bl-sm border border-outline-variant/20 shadow-sm'}`}>
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        
                        {/* Shimmering Typing Indicator */}
                        {isTyping && (
                            <div className="max-w-[85%] mr-auto animate-in fade-in slide-in-from-bottom-2">
                                <div className="px-5 py-4 bg-surface-container-low rounded-2xl rounded-bl-sm border border-outline-variant/20 flex gap-1.5 w-fit shadow-sm">
                                    <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                                    <div className="w-2 h-2 bg-primary/80 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Predictive Quick Actions */}
                    {!isTyping && messages[messages.length-1]?.role === 'bot' && (
                        <div className="px-4 pb-3 flex gap-2 overflow-x-auto no-scrollbar scroll-smooth" aria-label="Suggested Queries">
                            {['View Menu', 'Best Sellers', 'Custom Cake Help'].map((reply, i) => (
                                <button 
                                    key={i}
                                    onClick={() => handleSend(reply)}
                                    className="whitespace-nowrap px-4 py-2 rounded-full border border-primary/20 text-primary text-[11px] font-label uppercase font-bold hover:bg-primary/10 transition-colors shadow-sm cursor-pointer cinematic-hover"
                                >
                                    {reply}
                                </button>
                            ))}
                        </div>
                    )}

                    {/* Keyboard Input Core */}
                    <div className="p-3 border-t border-outline-variant/20 bg-surface-container-lowest">
                        <div className="relative flex items-center">
                            <input 
                                type="text"
                                aria-label="Chat input field"
                                className="w-full bg-surface border border-outline-variant/40 rounded-full pl-5 pr-12 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary shadow-inner"
                                placeholder="Write a cinematic inquiry..."
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleSend(e.target.value);
                                        e.target.value = '';
                                    }
                                }}
                            />
                            <button 
                                onClick={(e) => {
                                    const input = e.currentTarget.previousElementSibling;
                                    handleSend(input.value);
                                    input.value = '';
                                }}
                                aria-label="Send message"
                                className="absolute right-1 w-10 h-10 flex items-center justify-center rounded-full text-primary hover:bg-primary/10 transition-colors cursor-pointer"
                            >
                                <span className="material-symbols-outlined text-[20px] ml-1" style={{fontVariationSettings: "'FILL' 1"}}>send</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
