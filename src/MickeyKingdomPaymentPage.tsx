import { useState, useEffect } from 'react';
import { ArrowLeft, CloudRain } from 'lucide-react';
import { AmusementPark, AmusementParkReferralData } from './amusementParkData';
import WeatherGuaranteeModal from './WeatherGuaranteeModal';
import WeatherGuaranteeDetailsModal from './WeatherGuaranteeDetailsModal';

interface MickeyKingdomPaymentPageProps {
  park: AmusementPark;
  onBack: () => void;
  onJumpToWeatherApp: (data: AmusementParkReferralData) => void;
}

function MickeyKingdomPaymentPage({ park, onBack, onJumpToWeatherApp }: MickeyKingdomPaymentPageProps) {
  const [showTransition, setShowTransition] = useState(false);
  const [isGuaranteeModalOpen, setIsGuaranteeModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  useEffect(() => {
    setIsGuaranteeModalOpen(true);
  }, []);

  const weatherInsuranceFee = Math.round(park.ticketPrice * park.insuranceRate * 100) / 100;
  const compensationAmount = park.ticketPrice;
  const totalAmount = park.ticketPrice;

  const handleJumpToWeather = () => {
    setIsGuaranteeModalOpen(false);
    setShowTransition(true);
    setTimeout(() => {
      const referralData: AmusementParkReferralData = {
        source: park.id,
        location: park.address,
        visitDate: '2025年12月17日',
        amount: park.ticketPrice,
        parkName: park.name,
        compensationAmount: compensationAmount,
        weatherInsuranceFee: weatherInsuranceFee,
        contactName: '张三',
        contactPhone: '138****8888',
      };
      onJumpToWeatherApp(referralData);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-[375px] bg-white min-h-screen flex flex-col relative">
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-white text-sm z-10">
          <span className="font-semibold">9:41</span>
          <div className="flex items-center gap-1">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 20h4v-4H2v4zm6 0h4v-8H8v8zm6 0h4V10h-4v10zm6-18v18h4V2h-4z" />
            </svg>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
            </svg>
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
            </svg>
          </div>
        </div>

        <div className="sticky top-0 z-20 px-4 pt-16 pb-4" style={{ backgroundColor: '#1E90FF' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={onBack}
                className="p-1 hover:bg-white/10 rounded-full transition-colors"
              >
                <ArrowLeft className="w-6 h-6 text-white" />
              </button>
              <h1 className="text-xl font-semibold text-white">订单详情</h1>
            </div>
            <div className="flex items-center gap-2">
              <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <circle cx="5" cy="12" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="19" cy="12" r="2" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-white pb-28">
          <div className="px-4 pt-4">
            <h2 className="text-lg font-bold text-gray-900 mb-3">四人票</h2>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 mb-4 border-2 border-red-200">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900 mb-3">四人票</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-green-600 text-white text-xs rounded">随时退</span>
                    <span className="px-2 py-0.5 bg-blue-600 text-white text-xs rounded">无需换票</span>
                    <span className="px-2 py-0.5 bg-green-600 text-white text-xs rounded">1日票</span>
                  </div>
                  <button className="text-sm text-red-600 flex items-center gap-1">
                    游玩须知 〉
                  </button>
                </div>
                <div className="text-right ml-4">
                  <div className="text-xs text-gray-600 mb-0.5">票价</div>
                  <div className="text-xs text-gray-400 line-through mb-0.5">¥169.00</div>
                  <div className="text-2xl font-bold text-red-600">¥169.00</div>
                </div>
              </div>
            </div>

            <div className="space-y-2 text-base mb-4">
              <div className="flex items-center">
                <span className="text-gray-900 font-semibold">游玩人数：</span>
                <span className="text-gray-900 font-semibold ml-1">1</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-900 font-semibold">游玩日期：</span>
                <span className="text-gray-900 font-semibold ml-1">2025-12-17</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-900 font-semibold">订单状态：</span>
                <span className="text-orange-600 font-semibold ml-1">待支付</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-900 font-semibold">订单编号：</span>
                <span className="text-gray-900 font-semibold ml-1">PDSL417648717186074849797</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-900 font-semibold">下单时间：</span>
                <span className="text-gray-900 font-semibold ml-1">2025-12-05 02:08:38</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-900 font-semibold">订单金额：</span>
                <span className="text-gray-900 font-semibold ml-1">169.00</span>
              </div>
            </div>

            <h2 className="text-lg font-bold text-gray-900 mb-4 mt-6">游客信息</h2>
          </div>

          {/* Weather Guarantee Banner Removed - Replaced by Auto-Modal */}
        </div>

        <div className="fixed bottom-0 w-[375px] bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center text-base">
              <span className="text-gray-900 font-semibold">应付金额：</span>
              <span className="text-red-600 font-bold text-xl ml-2">¥ {totalAmount.toFixed(2)}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => alert('支付功能仅为演示')}
              className="flex-1 text-white text-base font-semibold py-3 rounded-lg transition-all shadow-sm active:scale-[0.98]"
              style={{ backgroundColor: '#4CAF50' }}
            >
              付款
            </button>
            <button
              onClick={() => alert('取消订单')}
              className="flex-1 text-white text-base font-semibold py-3 rounded-lg transition-all shadow-sm active:scale-[0.98]"
              style={{ backgroundColor: '#F44336' }}
            >
              取消订单
            </button>
          </div>
        </div>

        {showTransition && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#5B6FED' }}>
                <CloudRain className="w-8 h-8 text-white animate-pulse" />
              </div>
              <p className="text-lg font-semibold text-gray-900">正在跳转到陪你天气...</p>
              <p className="text-sm text-gray-500 mt-2">为您自动填充游乐园信息</p>
            </div>
          </div>
        )}

        <WeatherGuaranteeModal
          isOpen={isGuaranteeModalOpen}
          onClose={() => setIsGuaranteeModalOpen(false)}
          onAdd={handleJumpToWeather}
          onOpenDetails={() => setIsDetailsModalOpen(true)}
          price={weatherInsuranceFee}
          compensationAmount={compensationAmount}
        />

        <WeatherGuaranteeDetailsModal
          isOpen={isDetailsModalOpen}
          onClose={() => setIsDetailsModalOpen(false)}
          onAdd={handleJumpToWeather}
          price={weatherInsuranceFee}
        />
      </div>
    </div>
  );
}

export default MickeyKingdomPaymentPage;
