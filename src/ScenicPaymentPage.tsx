import { useState } from 'react';
import { ArrowLeft, Shield, ChevronRight, Minus, Plus } from 'lucide-react';
import { ScenicSpot, ScenicReferralData } from './scenicData';

interface ScenicPaymentPageProps {
  spot: ScenicSpot;
  onBack: () => void;
  onJumpToWeatherApp: (data: ScenicReferralData) => void;
}

function ScenicPaymentPage({ spot, onBack, onJumpToWeatherApp }: ScenicPaymentPageProps) {
  const [showTransition, setShowTransition] = useState(false);
  const [selectedDate, setSelectedDate] = useState('11-15');
  const [ticketCount, setTicketCount] = useState(1);

  const weatherInsuranceFee = Math.round(spot.ticketPrice * spot.insuranceRate * 100) / 100;
  const compensationAmount = spot.ticketPrice;
  const totalAmount = spot.ticketPrice * ticketCount;

  const dates = [
    { id: '11-13', label: '11-13 今天', price: 88 },
    { id: '11-14', label: '11-14 明天', price: 88 },
    { id: '11-15', label: '11-15 周六', price: 88 },
  ];

  const handleJumpToWeather = () => {
    setShowTransition(true);
    setTimeout(() => {
      const referralData: ScenicReferralData = {
        source: spot.id,
        location: spot.address,
        visitDate: `2025年${selectedDate.replace('-', '月')}日`,
        amount: spot.ticketPrice,
        scenicName: spot.name,
        compensationAmount: compensationAmount,
        weatherInsuranceFee: weatherInsuranceFee,
        contactName: '王强',
        contactPhone: '13898765432',
      };
      onJumpToWeatherApp(referralData);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-[375px] bg-white min-h-screen flex flex-col relative">
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-gray-800 text-sm z-10">
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

        <div className="sticky top-0 bg-white z-20 px-4 pt-16 pb-3 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-800" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">预订选择</h1>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto pb-32">
          <div className="bg-orange-50 border-l-4 border-pink-400 mx-4 mt-3 p-3 rounded-r-lg">
            <div className="flex items-start gap-2">
              <svg className="w-4 h-4 text-pink-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2"/>
              </svg>
              <p className="text-xs text-gray-700">请先选择使用日期和场次，选择完成后即可查看购买须知</p>
            </div>
          </div>

          <div className="px-4 mt-4">
            <h2 className="text-base font-bold text-gray-900 mb-3">使用日期</h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {dates.map((date) => (
                <button
                  key={date.id}
                  onClick={() => setSelectedDate(date.id)}
                  className={`flex-shrink-0 rounded-xl px-4 py-3 min-w-[120px] transition-all ${
                    selectedDate === date.id
                      ? 'bg-green-700 text-white shadow-md'
                      : 'bg-white text-gray-900 border border-gray-200'
                  }`}
                >
                  <div className="text-sm font-medium mb-1">{date.label}</div>
                  <div className={`text-lg font-bold ${selectedDate === date.id ? 'text-white' : 'text-red-600'}`}>
                    ¥{date.price}
                  </div>
                </button>
              ))}
              <button className="flex-shrink-0 rounded-xl px-4 py-3 min-w-[120px] bg-white border border-gray-200 flex flex-col items-center justify-center">
                <span className="text-sm text-gray-900 font-medium">更多</span>
                <span className="text-sm text-gray-900 font-medium">日期</span>
                <ChevronRight className="w-5 h-5 text-gray-500 mt-1" />
              </button>
            </div>
          </div>

          <div className="px-4 mt-6">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-900 mb-1">老君山-知道老君山演艺单人票</h3>
                  <p className="text-xs text-gray-500 mb-2">适用人群：不限</p>
                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span>随买随用</span>
                    <span>|</span>
                    <span>无忧退</span>
                    <span>|</span>
                    <button className="text-blue-600">购买须知 〉</button>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <div className="text-lg font-bold text-red-600">¥88</div>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                      className="w-8 h-8 rounded flex items-center justify-center border border-gray-300 hover:bg-gray-50"
                    >
                      <Minus className="w-4 h-4 text-gray-600" />
                    </button>
                    <span className="text-base font-semibold text-gray-900 min-w-[20px] text-center">{ticketCount}</span>
                    <button
                      onClick={() => setTicketCount(ticketCount + 1)}
                      className="w-8 h-8 rounded flex items-center justify-center border border-gray-300 hover:bg-gray-50"
                    >
                      <Plus className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
              <button className="text-sm text-gray-600 flex items-center gap-1">
                查看评论 〉
              </button>
            </div>
          </div>

          <div className="px-4 mt-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <h2 className="text-base font-semibold text-gray-900 mb-3">需要填写1位游客信息</h2>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-3">
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 8v4M12 16h.01" stroke="white" strokeWidth="2"/>
                  </svg>
                  <p className="text-xs text-amber-900">应景区要求，购买1张票需提供1位游客信息！</p>
                </div>
              </div>
              <div className="flex gap-3">
                <button className="flex-1 py-3 rounded-lg bg-green-700 text-white font-medium text-sm flex items-center justify-center gap-1">
                  <span>夏颜</span>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                  </svg>
                </button>
                <button className="flex-1 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium text-sm">
                  选择/新增
                </button>
              </div>

              <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-sm font-semibold text-gray-900 mb-2">夏颜</h3>
                <div className="space-y-1.5 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                    </svg>
                    <span>游客</span>
                  </div>
                  <div className="flex justify-between">
                    <span>身份证</span>
                    <span>340223199511030039</span>
                  </div>
                  <div className="flex justify-between">
                    <span>手机号</span>
                    <span>13161299439</span>
                  </div>
                </div>
              </div>
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
                    如果国家权威数据源显示<span className="font-semibold" style={{ color: '#5B6FED' }}>08:00-18:00</span>之间下雨<span className="font-semibold" style={{ color: '#5B6FED' }}>2小时或以上</span>（{' '}
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
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">总价</span>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-red-600">¥{totalAmount}</span>
              <button className="text-sm text-gray-600 flex items-center">
                明细
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"/>
                </svg>
              </button>
            </div>
          </div>
          <button
            onClick={() => alert('支付功能仅为演示')}
            className="w-full text-white text-base font-semibold py-3.5 rounded-full transition-all shadow-sm active:scale-[0.98]"
            style={{ backgroundColor: 'linear-gradient(90deg, #4CAF50 0%, #66BB6A 100%)' }}
          >
            去支付
          </button>
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

export default ScenicPaymentPage;
