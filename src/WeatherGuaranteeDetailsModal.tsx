import React from 'react';

interface WeatherGuaranteeDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd?: () => void; // Optional direct purchase action
    price?: number;
}

const WeatherGuaranteeDetailsModal: React.FC<WeatherGuaranteeDetailsModalProps> = ({
    isOpen,
    onClose,
    onAdd,
    price = 18,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-black/30 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="w-full h-[95vh] sm:h-[85vh] max-w-md bg-white sm:rounded-2xl rounded-t-3xl overflow-hidden shadow-2xl flex flex-col relative animate-in slide-in-from-bottom-20 duration-300">

                {/* Header (Clean & Simple) */}
                <div className="absolute top-0 left-0 right-0 z-10 p-5 flex items-center justify-between bg-white border-b border-slate-100">
                    <h3 className="font-extrabold text-slate-900 text-xl">保障范围</h3>
                    <button
                        onClick={onClose}
                        className="p-1.5 rounded-full hover:bg-slate-100 transition-colors text-slate-500"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                    <div className="w-8 hidden"></div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto pt-24 pb-32 px-8 bg-white">

                    <div className="space-y-12">
                        {/* Section 1 */}
                        <Section title="我需要提供下雨证明吗？">
                            <p className="font-medium text-slate-900 mb-4 text-base leading-relaxed">不需要。如果达到保障标准，系统将自动核算并在后台为您发放补偿金。</p>
                            <div className="bg-slate-50 p-4 rounded-xl space-y-3">
                                <ListItem icon={<SatelliteIcon />}>
                                    使用国家气象局及权威第三方气象机构的高精度数据（不可篡改）。
                                </ListItem>
                            </div>
                        </Section>

                        {/* Section 2 */}
                        <Section title="补偿金如何发放？">
                            <p className="mb-4 text-base text-slate-700 leading-relaxed">
                                <span className="font-bold text-slate-900">一旦您的行程结束</span>，我们将在 24小时内 通知您是否获得补偿。
                            </p>
                            <p className="text-slate-700 text-base leading-relaxed">
                                如果符合条件，您将通过<span className="font-bold text-slate-900">陪你天气小程序</span>领取天气保障补偿金，无需复杂申请。
                            </p>
                        </Section>

                        {/* Section 3 */}
                        <Section title="我的保障内容是什么？">
                            <p className="font-bold text-slate-900 mb-4 text-base">如果您的行程中降雨达到以下标准，将自动获得 ¥{price ? (price / 0.15 * 1).toFixed(0) : '---'} 的补偿：</p>
                            <div className="bg-slate-50 p-5 rounded-xl border border-slate-100">
                                <ul className="list-disc pl-5 space-y-3 text-slate-700 marker:text-slate-400 text-sm leading-relaxed">
                                    <li>
                                        当日 09:00 - 21:00 之间，累计降雨时长达到 <span className="font-bold text-slate-900">3小时及以上</span>。
                                    </li>
                                    <li>
                                        降雨强度需达到 <span className="font-bold text-slate-900">1.5mm/h</span>（地面湿润积水程度）。
                                    </li>
                                </ul>
                                <div className="mt-4 pt-4 border-t border-slate-200 flex justify-between items-center text-sm">
                                    <span className="text-slate-500">保障费用</span>
                                    <span className="font-bold text-slate-900">¥{price}</span>
                                </div>
                            </div>
                        </Section>

                        {/* Section 4 */}
                        <Section title="何为“小雨”？">
                            <p className="font-medium text-slate-900 mb-2 text-base">
                                我们将小雨定义是每小时累计降雨量为 <span className="font-bold">1.5毫米 (1.5mm/h)</span>。
                            </p>
                            <p className="text-slate-600 text-base leading-relaxed">
                                小雨是指当客户外行走时，地面看起来略微潮湿过的，有些地方会出现小水洼。
                            </p>
                        </Section>

                        {/* Section 5 */}
                        <Section title="保障的时间和地点？">
                            <div className="space-y-6">
                                <div className="flex gap-4 items-start">
                                    <div className="mt-1 text-slate-400"><CalendarIcon /></div>
                                    <div>
                                        <p className="font-bold text-slate-900 text-base">2025年12月17日</p>
                                        <p className="text-sm text-slate-500 mt-1">仅在您选定的出行日期当天生效。</p>
                                    </div>
                                </div>
                                <div className="flex gap-4 items-start">
                                    <div className="mt-1 text-slate-400"><MapPinIcon /></div>
                                    <div>
                                        <p className="font-bold text-slate-900 text-base">贵州省安顺市紫云县猴耳天坑景区</p>
                                        <p className="text-xs text-slate-900/60 mt-1 font-mono">27.08°N, 107.01°E</p>
                                    </div>
                                </div>
                            </div>
                        </Section>

                        {/* Section 5 */}
                        <Section title="我可以取消吗？">
                            <div className="flex gap-4 items-start">
                                <div className="mt-1 text-slate-400"><CalendarIcon /></div>
                                <div>
                                    <p className="font-bold text-slate-900 text-base">出行前随时可退</p>
                                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">只要未到出行日期，您可以随时联系我们或在订单页申请退款。</p>
                                </div>
                            </div>
                        </Section>

                        {/* Section 6 - Simpler Footer Info */}
                        <div className="pt-8 border-t border-slate-100 text-center">
                            <p className="text-slate-400 text-xs">
                                陪你天气是您本次天气保障的服务提供方。
                            </p>
                        </div>

                    </div>
                </div>

                {/* Footer Buttons */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-slate-100 flex items-center gap-3 safe-area-bottom">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 rounded-lg font-bold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-all text-sm"
                    >
                        关闭
                    </button>
                    {onAdd && (
                        <button
                            onClick={() => {
                                onAdd();
                                onClose();
                            }}
                            className="flex-[2] py-3 rounded-lg font-bold text-white bg-[#4667F2] hover:bg-[#3b5bd6] shadow-sm transition-all text-sm"
                        >
                            ¥{price} 添加保障
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
};

// Helper Components & Icons
const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
    <div className="py-2">
        <h4 className="text-xl font-bold text-slate-900 mb-4">{title}</h4>
        <div className="text-sm text-slate-600 leading-relaxed">
            {children}
        </div>
    </div>
);

const ListItem = ({ icon, children }: { icon: React.ReactNode, children: React.ReactNode }) => (
    <div className="flex gap-3">
        <div className="flex-shrink-0 mt-0.5 text-slate-400">
            {icon}
        </div>
        <div className="text-slate-600 leading-6">
            {children}
        </div>
    </div>
);

// Simple SVG Icons
const SatelliteIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13.2 7.7a2.8 2.8 0 1 0-3.9 3.9"></path><path d="M10 12l-3 3"></path><path d="M10 21a2 2 0 0 1-3.5-3.5l2.5-2.5"></path><path d="M13.5 2.5a2 2 0 0 1 3.5 3.5L14.5 9"></path><path d="M22 2l-6 6"></path></svg>
);
const CalendarIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
);
const MapPinIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);

export default WeatherGuaranteeDetailsModal;
