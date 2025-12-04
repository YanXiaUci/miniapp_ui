import { useState } from 'react';
import { ArrowLeft, Shield, ChevronRight, CloudRain } from 'lucide-react';
import { AmusementPark, AmusementParkReferralData } from './amusementParkData';

interface MickeyKingdomPaymentPageProps {
  park: AmusementPark;
  onBack: () => void;
  onJumpToWeatherApp: (data: AmusementParkReferralData) => void;
}

function MickeyKingdomPaymentPage({ park, onBack, onJumpToWeatherApp }: MickeyKingdomPaymentPageProps) {
  const [showTransition, setShowTransition] = useState(false);

  const weatherInsuranceFee = Math.round(park.ticketPrice * park.insuranceRate * 100) / 100;
  const compensationAmount = park.ticketPrice;
  const totalAmount = park.ticketPrice;

  const handleJumpToWeather = () => {
    setShowTransition(true);
    setTimeout(() => {
      const referralData: AmusementParkReferralData = {
        source: park.id,
        location: park.address,
        visitDate: '2025年12月18日',
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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-[375px] bg-gray-50 min-h-screen flex flex-col relative">
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-white text-sm z-10">
          <span className="font-semibold">9:41</span>
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

        <div className="sticky top-0 z-20 px-4 pt-16 pb-4" style={{ backgroundColor: '#1E90FF' }}>
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-1 hover:bg-white/10 rounded-full transition-colors"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>
            <h1 className="text-xl font-semibold text-white">订单支付</h1>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-50 pb-32">
          <div className="px-4 pt-4">
            <h2 className="text-lg font-bold text-gray-900 mb-3">成人畅玩票</h2>

            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4 mb-4 border-2 border-red-200">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900 mb-3">成人畅玩票</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">随时退</span>
                    <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">无需换票</span>
                    <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">1日票</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">票价</div>
                  <div className="text-sm text-gray-400 line-through mb-1">¥60.00</div>
                  <div className="text-2xl font-bold text-red-600">¥60.00</div>
                </div>
              </div>
            </div>

            <div className="space-y-2.5 text-sm mb-4">
              <div className="flex items-center">
                <span className="text-gray-700 w-24">游玩人数：</span>
                <span className="text-gray-900 font-semibold">1</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-700 w-24">游玩日期：</span>
                <span className="text-gray-900 font-semibold">2025-12-18</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-700 w-24">订单状态：</span>
                <span className="text-orange-600 font-semibold">待支付</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-700 w-24">订单编号：</span>
                <span className="text-gray-900 font-medium">PDSL417648703378895270O</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-700 w-24">下单时间：</span>
                <span className="text-gray-900 font-medium">2025-12-05 01:45:37</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex items-center text-lg">
                <span className="text-gray-700">应付金额：</span>
                <span className="text-2xl font-bold text-red-600 ml-2">¥ 60.00</span>
              </div>
            </div>
          </div>

          <div
            onClick={handleJumpToWeather}
            className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl mx-4 mt-6 px-5 py-5 shadow-sm hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#5B6FED' }}>
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-bold text-gray-900">游乐园天气保障</h3>
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
                    如果国家权威数据源显示<span className="font-semibold" style={{ color: '#5B6FED' }}>09:00-21:00</span>之间下雨<span className="font-semibold" style={{ color: '#5B6FED' }}>2小时或以上</span>（{' '}
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

        <div className="fixed bottom-0 w-[375px] bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
          <div className="flex gap-3">
            <button
              onClick={() => alert('支付功能仅为演示')}
              className="flex-1 text-white text-lg font-semibold py-4 rounded-lg transition-all shadow-sm active:scale-[0.98]"
              style={{ backgroundColor: '#4CAF50' }}
            >
              支付
            </button>
            <button
              onClick={() => alert('取消订单')}
              className="flex-1 text-white text-lg font-semibold py-4 rounded-lg transition-all shadow-sm active:scale-[0.98]"
              style={{ backgroundColor: '#F44336' }}
            >
              取消
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
      </div>
    </div>
  );
}

export default MickeyKingdomPaymentPage;
