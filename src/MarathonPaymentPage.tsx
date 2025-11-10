import { useState } from 'react';
import { ArrowLeft, Check, Shield, CloudRain, ChevronRight } from 'lucide-react';
import { MarathonEvent, ReferralData } from './marathonData';

interface MarathonPaymentPageProps {
  event: MarathonEvent;
  onBack: () => void;
  onJumpToWeatherApp: (data: ReferralData) => void;
}

function MarathonPaymentPage({ event, onBack, onJumpToWeatherApp }: MarathonPaymentPageProps) {
  const [weatherInsuranceChecked, setWeatherInsuranceChecked] = useState(false);
  const [showTransition, setShowTransition] = useState(false);

  const weatherInsuranceFee = 0.20;
  const compensationAmount = Math.round(event.registrationFee * event.compensationRate);
  const totalAmount = weatherInsuranceChecked
    ? event.registrationFee + weatherInsuranceFee
    : event.registrationFee;

  const handleJumpToWeather = () => {
    setShowTransition(true);
    setTimeout(() => {
      const referralData: ReferralData = {
        source: event.id,
        location: event.city,
        startDate: event.date,
        endDate: event.date,
        amount: event.registrationFee,
        eventName: event.name,
        compensationAmount: compensationAmount,
      };
      onJumpToWeatherApp(referralData);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-[375px] bg-gray-50 min-h-screen flex flex-col relative">
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

        <div className="sticky top-0 bg-white z-20 px-5 pt-16 pb-4 shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-800" />
            </button>
            <h1 className="text-lg font-semibold text-gray-900">{event.name} 报名支付</h1>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-50 pb-32">
          <div className="bg-white rounded-2xl mx-4 mt-3 px-5 py-5 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900 mb-4">赛事信息</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">赛事名称</span>
                <span className="text-gray-900 font-medium">{event.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">比赛日期</span>
                <span className="text-gray-900 font-medium">{event.date}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">比赛地点</span>
                <span className="text-gray-900 font-medium">{event.city}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">起跑时间</span>
                <span className="text-gray-900 font-medium">{event.startTime}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">参赛项目</span>
                <span className="text-gray-900 font-medium">全程马拉松 {event.distance}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl mx-4 mt-3 px-5 py-5 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900 mb-4">参赛者信息</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">姓名</span>
                <span className="text-gray-900 font-medium">张三</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">手机号</span>
                <span className="text-gray-900 font-medium">138****8888</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">身份证号</span>
                <span className="text-gray-900 font-medium">************1234</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">紧急联系人</span>
                <span className="text-gray-900 font-medium">李四 139****9999</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl mx-4 mt-3 px-5 py-5 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900 mb-4">费用明细</h2>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">报名费</span>
                <span className="text-gray-900 font-medium">¥{event.registrationFee}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handleJumpToWeather}
            className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-2xl mx-4 mt-3 px-5 py-5 shadow-sm hover:shadow-md transition-all active:scale-[0.98] w-[calc(100%-2rem)]"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#5B6FED' }}>
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-bold text-gray-900">赛事天气保障</h3>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-orange-100 text-orange-600 font-semibold">推荐</span>
                </div>
                <p className="text-xs text-gray-600">由陪你天气®提供</p>
              </div>
            </div>

            <div className="bg-white/80 rounded-xl p-4 mb-3">
              <div className="space-y-2.5">
                <div className="flex items-start gap-2">
                  <CloudRain className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#5B6FED' }} />
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <span className="font-semibold">保障日期：</span>{event.date}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#5B6FED' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <span className="font-semibold">保障地点：</span>{event.city}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#5B6FED' }} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                  </svg>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <span className="font-semibold">补偿金额：</span>比赛时段降雨≥2小时，补偿¥{compensationAmount}
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <svg className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#5B6FED' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    <span className="font-semibold">监测时段：</span>08:00-14:00（比赛时段）
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between bg-white/80 rounded-xl px-4 py-3">
              <div className="flex items-center gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setWeatherInsuranceChecked(!weatherInsuranceChecked);
                  }}
                  className="flex-shrink-0"
                >
                  <div className={`w-5 h-5 rounded flex items-center justify-center border-2 transition-all ${
                    weatherInsuranceChecked ? 'border-blue-500' : 'border-gray-300'
                  }`} style={{ backgroundColor: weatherInsuranceChecked ? '#5B6FED' : 'transparent' }}>
                    {weatherInsuranceChecked && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                  </div>
                </button>
                <span className="text-sm font-medium text-gray-900">添加天气保障</span>
              </div>
              <span className="text-sm font-bold" style={{ color: '#5B6FED' }}>+¥{weatherInsuranceFee.toFixed(2)}</span>
            </div>

            <div className="flex items-center justify-center gap-1 mt-3 text-xs" style={{ color: '#5B6FED' }}>
              <span className="font-medium">点击了解详情</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </div>
          </button>

          <div className="bg-white rounded-2xl mx-4 mt-3 px-5 py-5 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900 mb-4">支付方式</h2>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border-2 border-blue-400">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-500 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8.5 3A5.5 5.5 0 003 8.5v7A5.5 5.5 0 008.5 21h7a5.5 5.5 0 005.5-5.5v-7A5.5 5.5 0 0015.5 3h-7zm5.5 7h-4v2h4v2l3-3-3-3v2z"/>
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-900">微信支付</span>
              </div>
              <Check className="w-5 h-5 text-blue-500" strokeWidth={2.5} />
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 w-[375px] bg-white border-t border-gray-200 px-5 py-4 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-600">实付金额</span>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">¥{totalAmount.toFixed(2)}</div>
              {weatherInsuranceChecked && (
                <div className="text-xs text-gray-500">
                  含天气保障 ¥{weatherInsuranceFee.toFixed(2)}
                </div>
              )}
            </div>
          </div>
          <button
            onClick={() => alert('支付功能仅为演示')}
            className="w-full text-white text-base font-semibold py-3.5 rounded-full transition-all shadow-sm active:scale-[0.98]"
            style={{ backgroundColor: '#5B6FED' }}
          >
            立即支付
          </button>
        </div>

        {showTransition && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: '#5B6FED' }}>
                <CloudRain className="w-8 h-8 text-white animate-pulse" />
              </div>
              <p className="text-lg font-semibold text-gray-900">正在跳转到陪你天气...</p>
              <p className="text-sm text-gray-500 mt-2">为您自动填充赛事信息</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MarathonPaymentPage;
