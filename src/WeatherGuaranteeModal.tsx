import React from 'react';

interface WeatherGuaranteeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: () => void;
    onOpenDetails: () => void;
    price: number;
    compensationAmount: number;
}

const WeatherGuaranteeModal: React.FC<WeatherGuaranteeModalProps> = ({
    isOpen,
    onClose,
    onAdd,
    onOpenDetails,
    price,
    compensationAmount,
}) => {
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-[2px] p-4 animate-in fade-in duration-200">
            <div className="w-full max-w-[340px] bg-white rounded-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10 duration-300">

                {/* Main Content Section */}
                <div className="p-7">
                    <div className="flex gap-3 items-stretch mb-8">
                        {/* Left Column: Title & Price */}
                        <div className="flex-[1.4] flex flex-col justify-between pt-1 min-w-0">
                            <div className="space-y-1">
                                <h2 className="text-[15px] font-extrabold text-slate-900 leading-tight whitespace-nowrap">
                                    每天降雨 3 小时及以上
                                </h2>
                                <div className="text-[15px] font-extrabold text-slate-900 leading-tight whitespace-nowrap">
                                    即自动补偿 <span className="text-[#4667F2]">¥{compensationAmount}/天</span>
                                </div>
                            </div>

                            <div className="mt-5 flex items-center gap-2">
                                <span className="text-2xl font-extrabold text-slate-900 font-sans tracking-tight">¥{price}</span>
                                <span className="px-1.5 py-0.5 rounded-[4px] bg-[#FF6B00] text-white text-[10px] font-bold whitespace-nowrap">
                                    自动补偿
                                </span>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="w-[1px] bg-slate-100 self-stretch my-1"></div>

                        {/* Right Column: Details */}
                        <div className="flex-1 flex flex-col justify-between pl-1 gap-3 pt-1 min-w-0">
                            {/* Item 1 */}
                            <div className="flex gap-2 items-start">
                                <div className="mt-0.5 text-slate-800 shrink-0 w-3.5 flex justify-center">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </div>
                                <div className="space-y-0.5 min-w-0">
                                    <div className="text-[13px] font-bold text-slate-900 leading-none whitespace-nowrap">09:00 - 21:00</div>
                                    <div className="text-[10px] text-slate-400 scale-95 origin-left whitespace-nowrap">行程保障时段</div>
                                </div>
                            </div>

                            {/* Item 2 */}
                            <div className="flex gap-2 items-start">
                                <div className="mt-0.5 text-slate-800 shrink-0 w-3.5 flex justify-center">
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17.5 19c.7 0 1.3-.2 1.9-.6a3 3 0 0 0 .6-4.5 5 5 0 0 0-9.5-1.9 4 4 0 0 0-2.5 7h9.5z" />
                                    </svg>
                                </div>
                                <div className="space-y-0.5 min-w-0">
                                    <div className="text-[13px] font-bold text-slate-900 leading-none whitespace-nowrap">权威气象数据</div>
                                    <div className="text-[10px] text-slate-400 scale-95 origin-left whitespace-nowrap">降水强度 ≥ 1.5mm/h</div>
                                </div>
                            </div>

                            {/* Link */}
                            <div className="mt-0.5 ml-[22px]">
                                <button
                                    onClick={onOpenDetails}
                                    className="text-[11px] text-[#4667F2] font-medium flex items-center hover:opacity-80 transition-opacity whitespace-nowrap"
                                >
                                    了解详情 <span className="ml-[1px] font-bold">&gt;</span>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-3">
                        <button
                            onClick={onClose}
                            className="w-full py-3 rounded-xl font-medium text-slate-400 bg-slate-50/50 hover:bg-slate-50 hover:text-slate-500 active:scale-[0.98] transition-all text-sm"
                        >
                            暂不需要
                        </button>
                        <button
                            onClick={onAdd}
                            className="w-full py-3 rounded-xl font-bold text-white bg-[#4667F2] hover:bg-[#3b5bd6] active:scale-[0.96] shadow-[0_8px_20px_-4px_rgba(70,103,242,0.45)] hover:shadow-[0_12px_24px_-4px_rgba(70,103,242,0.55)] active:shadow-none transition-all duration-200 text-sm"
                        >
                            加购保障
                        </button>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="bg-[#F8F9FB] px-6 py-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-[10px] text-slate-400">
                        <button onClick={onOpenDetails} className="hover:text-slate-600 transition-colors cursor-pointer">服务条款</button>
                        <span className="w-[1px] h-2.5 bg-slate-200"></span>
                        <button className="hover:text-slate-600 transition-colors cursor-pointer">隐私政策</button>
                    </div>

                    {/* Logo Area */}
                    <div className="flex items-center gap-1.5 opacity-80 mix-blend-multiply">
                        <img src="/peini_logo.png" alt="Peini" className="h-[18px] w-auto object-contain" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherGuaranteeModal;
