import { useState, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

interface OnboardingPageProps {
    onComplete: () => void;
}

export default function OnboardingPage({ onComplete }: OnboardingPageProps) {
    const [currentSlide, setCurrentSlide] = useState(0);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const slides = [
        {
            id: 0,
            image: "/onboarding_rain_worry_1765342650415.png",
            title: "出行担心下雨？",
            description: "精心策划的行程，因为突如其来的降雨而泡汤？心情也跟着变得湿漉漉...",
        },
        {
            id: 1,
            image: "/onboarding_protection_1765342664479.png",
            title: "陪你天气全程守护",
            description: "我们为您提供专业的天气保障服务。无论去哪玩，都有一份安心相伴。",
        },
        {
            id: 2,
            image: "/onboarding_compensation_1765342676356.png",
            title: "下雨即赔 自动到账",
            description: "达到理赔标准，无需手动申请，赔偿金自动打入您的账户，省心更省力。",
        },
        {
            id: 3,
            image: "/onboarding_happy_journey_1765342690590.png",
            title: "开启无忧旅程",
            description: "现在的您，只管享受旅途的风景。剩下的，交给我们。",
        },
    ];

    const handleNext = () => {
        if (currentSlide < slides.length - 1) {
            setCurrentSlide(curr => curr + 1);
        } else {
            onComplete();
        }
    };

    const handleSkip = () => {
        onComplete();
    };

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.targetTouches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.targetTouches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (touchStartX.current - touchEndX.current > 50) {
            // Swipe Left (Next)
            if (currentSlide < slides.length - 1) {
                setCurrentSlide(curr => curr + 1);
            }
        }

        if (touchStartX.current - touchEndX.current < -50) {
            // Swipe Right (Prev)
            if (currentSlide > 0) {
                setCurrentSlide(curr => curr - 1);
            }
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center">
            <div
                className="w-[375px] bg-white min-h-screen flex flex-col relative overflow-hidden"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                {/* Skip Button */}
                <div className="absolute top-4 right-4 z-20">
                    <button
                        onClick={handleSkip}
                        className="text-sm font-medium text-gray-400 hover:text-gray-600 px-4 py-2"
                    >
                        {currentSlide === slides.length - 1 ? '' : '跳过'}
                    </button>
                </div>

                {/* Slides */}
                <div className="flex-1 relative">
                    <div
                        className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
                        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                    >
                        {slides.map((slide) => (
                            <div
                                key={slide.id}
                                className="w-full h-full flex-shrink-0 flex flex-col items-center justify-start pt-20 px-8"
                            >
                                <div className="w-[300px] h-[300px] mb-8 relative flex items-center justify-center transform transition-all duration-700 delay-100 ease-out translate-y-0 opacity-100">
                                    <div className="absolute inset-0 bg-blue-50/50 rounded-full scale-90 blur-xl"></div>
                                    <img
                                        src={slide.image}
                                        alt={slide.title}
                                        className="w-full h-full object-contain relative z-10 drop-shadow-sm"
                                    />
                                </div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                                    {slide.title}
                                </h2>
                                <p className="text-gray-600 text-center leading-relaxed text-sm">
                                    {slide.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Controls */}
                <div className="px-6 pb-12 bg-white pt-6">
                    {/* Indicators */}
                    <div className="flex justify-center gap-2 mb-8">
                        {slides.map((_, index) => (
                            <div
                                key={index}
                                className={`h-2 rounded-full transition-all duration-300 ${currentSlide === index ? 'w-8 bg-blue-500' : 'w-2 bg-gray-200'
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Action Button */}
                    <button
                        onClick={handleNext}
                        className="w-full py-4 rounded-2xl text-white font-semibold text-lg transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
                        style={{ backgroundColor: '#5B6FED' }}
                    >
                        {currentSlide === slides.length - 1 ? '开始体验' : '下一步'}
                        {currentSlide !== slides.length - 1 && <ArrowRight className="w-5 h-5" />}
                    </button>
                </div>
            </div>
        </div>
    );
}
