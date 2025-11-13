import { useState } from 'react';
import { ArrowLeft, Shield, ChevronRight, MoreVertical } from 'lucide-react';
import { ScenicSpot, ScenicReferralData } from './scenicData';

interface ScenicReservationSuccessPageProps {
  spot: ScenicSpot;
  onBack: () => void;
  onJumpToWeatherApp: (data: ScenicReferralData) => void;
}

function ScenicReservationSuccessPage({ spot, onBack, onJumpToWeatherApp }: ScenicReservationSuccessPageProps) {
  const [showTransition, setShowTransition] = useState(false);

  const weatherInsuranceFee = Math.round(spot.ticketPrice * spot.insuranceRate * 100) / 100;
  const compensationAmount = spot.ticketPrice;

  const handleJumpToWeather = () => {
    setShowTransition(true);
    setTimeout(() => {
      const referralData: ScenicReferralData = {
        source: spot.id,
        location: spot.address,
        visitDate: '2025年09月08日',
        amount: spot.ticketPrice,
        scenicName: spot.name,
        compensationAmount: compensationAmount,
        weatherInsuranceFee: weatherInsuranceFee,
      };
      onJumpToWeatherApp(referralData);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-[375px] bg-white min-h-screen flex flex-col relative">
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-gray-800 text-sm z-10">
          <span className="font-semibold">12:02</span>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 20h4v-4H2v4zm6 0h4v-8H8v8zm6 0h4V10h-4v10zm6-18v18h4V2h-4z"/>
            </svg>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"/>
            </svg>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/>
            </svg>
          </div>
        </div>

        <div className="sticky top-0 bg-white z-20 px-4 pt-16 pb-3 shadow-sm">
          <div className="flex items-center justify-between">
            <button
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-gray-800" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">取号成功</h1>
            <div className="flex items-center gap-2">
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <MoreVertical className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="w-6 h-6 text-gray-800" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M12 8v4l3 3" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pb-4">
          <div className="bg-gray-50 rounded-3xl mx-4 mt-4 p-6">
            <div className="flex items-center justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center">
                <svg className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">预约成功</h2>

            <div className="text-center mb-8">
              <div className="text-5xl font-bold text-blue-600 mb-2">1号</div>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-center text-gray-600 text-sm">感谢您的预约，以下是您的预约详情</p>

              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">预约项目：</span>
                  <span className="text-gray-900 font-medium">超级大秋千</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">日期：</span>
                  <span className="text-gray-900 font-medium">2025-09-08</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">时间：</span>
                  <span className="text-gray-900 font-medium">13:00-14:00</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">预期排队时间：</span>
                  <span className="text-gray-900 font-medium">14天</span>
                </div>
              </div>

              <button className="w-full py-2.5 rounded-full border-2 border-teal-600 text-teal-600 font-medium text-sm hover:bg-teal-50 transition-colors mt-4">
                取消预约
              </button>
            </div>
          </div>

          <div className="bg-red-50 mx-4 mt-4 p-4 rounded-xl">
            <h3 className="text-sm font-semibold text-red-900 mb-2">友情提示：</h3>
            <div className="space-y-2 text-xs text-gray-700">
              <p>请您提前10分钟到达现场</p>
              <p>请在预订的时间内体验项目，以免错过。<span className="text-blue-600 font-medium">如预约过号后，需要重新预约</span>。</p>
            </div>
          </div>

          <div
            onClick={handleJumpToWeather}
            className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl mx-4 mt-4 px-5 py-5 shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#5B6FED' }}>
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-bold text-gray-900">游玩天气保障</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 font-semibold">推荐</span>
                </div>
                <p className="text-xs text-gray-600">由陪你天气®提供</p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-3.5 mb-3">
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                陪你天气®将在您游玩期间监测天气预报。
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#5B6FED' }}></div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    如果国家权威数据源显示<span className="font-semibold" style={{ color: '#5B6FED' }}>09:00-18:00</span>之间下雨<span className="font-semibold" style={{ color: '#5B6FED' }}>2小时或以上</span>（{' '}
                    <span className="font-semibold border-b border-dashed border-gray-400" style={{ color: '#5B6FED' }}>≥1.50mm/h</span>
                    ）
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#5B6FED' }}></div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    陪你天气®将向您退还<span className="font-semibold text-sm" style={{ color: '#5B6FED' }}>{compensationAmount}元</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl px-4 py-3 mb-3 border border-orange-200">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-gray-900">天气保障</p>
                <p className="text-xl font-bold" style={{ color: '#5B6FED' }}>¥{weatherInsuranceFee.toFixed(2)}</p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl px-3 py-2.5 mb-3 border border-blue-200">
              <p className="text-xs text-gray-700 leading-relaxed">
                💡 点击此横幅跳转到陪你天气小程序购买天气保障
              </p>
            </div>

            <div className="flex items-center justify-center gap-1 text-sm font-medium" style={{ color: '#5B6FED' }}>
              <span>点击跳转购买</span>
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>

        {showTransition && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#5B6FED' }}>
                <Shield className="w-8 h-8 text-white animate-pulse" />
              </div>
              <p className="text-lg font-semibold text-gray-900">正在跳转到陪你天气...</p>
              <p className="text-sm text-gray-500 mt-2">为您自动填充景区信息</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ScenicReservationSuccessPage;
