import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, User, Bot, HelpCircle } from 'lucide-react';

interface Message {
    id: string;
    type: 'user' | 'bot';
    content: string;
    timestamp: Date;
}

const DEFAULT_QUESTIONS = [
    { id: 'q1', text: '雨天保障包含哪些内容？', answer: '我们的雨天保障包含：自动赔付、无需申请、快速到账。具体涵盖门票补偿、交通补贴等。' },
    { id: 'q2', text: '如何办理退款？', answer: '在保单生效前，您可以在“我的-打卡记录-订单详情”中申请退款。生效后将无法退款哦。' },
    { id: 'q3', text: '赔付金额多久到账？', answer: '在权威气象数据确认达标后，赔付款项通常会在24小时内原路退回您的支付账户。' },
    { id: 'q4', text: '保障生效的条件是什么？', answer: '保障生效的具体条件（如下雨时长、降雨量等）在您购买时的服务协议中有详细说明。' },
];

const ChatAssistant: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isConnectingHuman, setIsConnectingHuman] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 'welcome',
            type: 'bot',
            content: '您好！我是陪你天气小助手。有什么我可以帮您的吗？您可以选择下方常见问题，或直接输入您的问题。',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
        }
    }, [messages, isOpen]);

    const handleSend = (text: string = inputValue) => {
        if (!text.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: text,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);
        setInputValue('');

        // Simulate bot thinking
        setTimeout(() => {
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                type: 'bot',
                content: `感谢您的提问！关于“${text}”，我已经记录下来。如果是常见问题，您可以参考下方的快捷选项。如果您需要真人服务，请点击“接入真人”。`,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMsg]);
        }, 800);
    };

    const handleQuestionClick = (q: typeof DEFAULT_QUESTIONS[0]) => {
        const userMsg: Message = {
            id: Date.now().toString(),
            type: 'user',
            content: q.text,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMsg]);

        setTimeout(() => {
            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                type: 'bot',
                content: q.answer,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMsg]);
        }, 500);
    };

    const connectToHuman = () => {
        setIsConnectingHuman(true);
        setTimeout(() => {
            const botMsg: Message = {
                id: Date.now().toString(),
                type: 'bot',
                content: '为您接通真人客服中，请稍候...（演示模式：当前无真人在线）',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMsg]);
            setIsConnectingHuman(false);
        }, 1500);
    };

    return (
        <div className="absolute bottom-24 right-6 z-[60]">
            {/* Floating Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-14 h-14 bg-neutral-900 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 group relative"
                >
                    <MessageCircle size={28} />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-primary-500 rounded-full border-2 border-white animate-pulse"></div>
                    <span className="absolute right-full mr-3 bg-neutral-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-xl text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                        有什么可以帮您？
                    </span>
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-0 right-0 w-[340px] h-[520px] bg-white rounded-[32px] shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden border border-neutral-100 animate-slide-up">
                    {/* Header */}
                    <div className="bg-neutral-900 px-6 py-5 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center">
                                <Bot className="text-white" size={24} />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-base">陪你助手</h3>
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                                    <span className="text-white/60 text-[10px] font-medium tracking-wider uppercase">Online</span>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-white/10 rounded-full transition-colors text-white/80"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-5 space-y-4 no-scrollbar">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-[14px] leading-relaxed shadow-sm ${msg.type === 'user'
                                        ? 'bg-neutral-900 text-white rounded-tr-none'
                                        : 'bg-neutral-100 text-neutral-800 rounded-tl-none border border-neutral-200/50'
                                        }`}
                                >
                                    {msg.content}
                                    <div className={`text-[9px] mt-1.5 font-medium opacity-40 ${msg.type === 'user' ? 'text-right' : 'text-left'}`}>
                                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                </div>
                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Quick Actions (FAQs) */}
                    <div className="px-5 py-2 border-t border-neutral-50 bg-neutral-50/50">
                        <div className="flex items-center gap-1.5 mb-2.5">
                            <HelpCircle size={14} className="text-neutral-400" />
                            <span className="text-[11px] font-bold text-neutral-400 tracking-wide uppercase">常见问题</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {DEFAULT_QUESTIONS.map((q) => (
                                <button
                                    key={q.id}
                                    onClick={() => handleQuestionClick(q)}
                                    className="bg-white border border-neutral-200 px-3.5 py-2 rounded-xl text-xs font-semibold text-neutral-700 hover:border-neutral-900 hover:text-neutral-900 transition-all shadow-sm active:scale-95"
                                >
                                    {q.text}
                                </button>
                            ))}
                            <button
                                onClick={connectToHuman}
                                disabled={isConnectingHuman}
                                className="bg-primary-50 border border-primary-200 px-3.5 py-2 rounded-xl text-xs font-bold text-primary-600 hover:bg-primary-100 transition-all shadow-sm flex items-center gap-1.5"
                            >
                                {isConnectingHuman ? '连接中...' : <><User size={14} /> 接入真人</>}
                            </button>
                        </div>
                    </div>

                    {/* Input Area */}
                    <div className="p-5 bg-white border-t border-neutral-100 flex items-center gap-3">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="输入您的问题..."
                            className="flex-1 bg-neutral-100 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-neutral-900 transition-all outline-none"
                        />
                        <button
                            onClick={() => handleSend()}
                            disabled={!inputValue.trim()}
                            className="w-11 h-11 bg-neutral-900 text-white rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-30 disabled:hover:scale-100 transition-all shrink-0"
                        >
                            <Send size={18} fill="currentColor" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatAssistant;
