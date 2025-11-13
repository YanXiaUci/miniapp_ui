import { useState, useEffect } from 'react';
import { ArrowLeft, Check, Shield, MoreVertical } from 'lucide-react';
import { ScenicReferralData } from './scenicData';
import Tooltip from './Tooltip';

interface ScenicAddWeatherServicePageProps {
  referralData: ScenicReferralData;
  onBack: () => void;
  onComplete: () => void;
}

function ScenicAddWeatherServicePage({ referralData, onBack, onComplete }: ScenicAddWeatherServicePageProps) {
  const [agreed, setAgreed] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [countdown, setCountdown] = useState(1800);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  const isHouErTianKeng = referralData.scenicName.includes('猴耳天坑');
  const timeRange = isHouErTianKeng ? '09:00-18:00' : '08:00-18:00';
  const minDuration = isHouErTianKeng ? '2小时' : '2小时';

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [countdown]);

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePurchase = () => {
    if (agreed) {
      onComplete();
    }
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

        <div className="sticky top-0 bg-white z-20 px-5 pt-4 pb-3 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button onClick={onBack} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5 text-gray-800" />
              </button>
              <h1 className="text-lg font-semibold text-gray-900">添加天气服务</h1>
            </div>
            <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-50 pb-32">
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 mx-4 mt-3 p-4 rounded-r-xl shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#5B6FED' }}>
                <Shield className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-900 mb-1">来自 {referralData.scenicName}</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  景区信息已自动填入，请继续完成天气保障流程
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl mx-4 mt-3 px-4 py-4 shadow-sm">
            <div className="flex items-center gap-2.5 mb-3">
              <span className="text-sm text-gray-900 font-medium">{referralData.visitDate}</span>
              <span className="ml-auto text-sm font-medium text-gray-900">1天</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base text-gray-900 font-medium">{referralData.location.split('省')[1] || referralData.location}</span>
              <span className="text-sm text-gray-500">每日行程费用 ¥{referralData.amount}</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl mx-4 mt-3 px-4 py-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-gray-900">服务详情</h2>
              <div className="flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#F59E0B' }} viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                </svg>
                <span className="text-xs font-semibold" style={{ color: '#F59E0B' }}>{formatCountdown(countdown)}</span>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-3.5">
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                陪你天气®将在您游玩期间每天监测天气预报。
              </p>
              <div className="space-y-2">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#5B6FED' }}></div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    如果国家权威数据源显示<span className="font-semibold" style={{ color: '#5B6FED' }}>{timeRange}</span>之间下雨<span className="font-semibold" style={{ color: '#5B6FED' }}>{minDuration}或以上</span>（{' '}
                    <Tooltip content="地面有小水坑的程度。">
                      <span className="font-semibold border-b border-dashed border-gray-400" style={{ color: '#5B6FED' }}>≥1.50mm/h</span>
                    </Tooltip>
                    ）
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#5B6FED' }}></div>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    陪你天气®将向您退还<span className="font-semibold text-sm" style={{ color: '#5B6FED' }}>{referralData.compensationAmount}元</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl mx-4 mt-3 mb-4 px-4 py-4 shadow-sm">
            <h2 className="text-base font-semibold text-gray-900 mb-3">联系信息</h2>

            <div className="space-y-3 mb-3">
              <div>
                <label className="text-sm text-gray-600 mb-1 block">姓名</label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  placeholder="请输入姓名"
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 mb-1 block">手机号码</label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="请输入手机号码"
                  className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                />
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-2.5 mb-2.5">
              <p className="text-xs text-gray-600 leading-relaxed">
                陪你天气仅保障出行期间的天气，如有需要，我们将要求您提供行程凭证（如机票、酒店订单）以核实补偿。
              </p>
            </div>

            <div className="flex items-start gap-2">
              <button
                onClick={() => setAgreed(!agreed)}
                className="flex-shrink-0 mt-0.5"
              >
                <div className={`w-4 h-4 rounded flex items-center justify-center border-2 transition-all ${
                  agreed
                    ? 'border-blue-500'
                    : 'border-gray-300'
                }`} style={{ backgroundColor: agreed ? '#5B6FED' : 'transparent' }}>
                  {agreed && <Check className="w-3 h-3 text-white" />}
                </div>
              </button>
              <div className="text-xs text-gray-600 leading-relaxed">
                我已阅读并同意
                <button className="font-medium" style={{ color: '#5B6FED' }}> 《服务条款》</button>
                和
                <button className="font-medium" style={{ color: '#5B6FED' }}>《隐私政策》</button>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 w-[375px] bg-white border-t border-gray-200 px-5 py-3 shadow-lg">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-baseline gap-2">
              <span className="text-sm text-gray-600">服务费用</span>
              <span className="text-2xl font-bold text-gray-900">¥{referralData.weatherInsuranceFee.toFixed(2)}</span>
            </div>
            <button
              onClick={() => setShowDetail(!showDetail)}
              className="text-sm text-gray-600 flex items-center gap-1"
            >
              明细
              <svg
                className={`w-4 h-4 transition-transform ${showDetail ? 'rotate-180' : ''}`}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </button>
          </div>
          <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showDetail ? 'max-h-32 opacity-100 mb-2.5' : 'max-h-0 opacity-0'}`}>
            <div className="text-xs text-gray-500 space-y-0.5">
              <div className="flex justify-between">
                <span>单价</span>
                <span>¥{referralData.weatherInsuranceFee.toFixed(2)}/天</span>
              </div>
              <div className="flex justify-between">
                <span>天数</span>
                <span>1天</span>
              </div>
              <div className="flex justify-between font-medium text-gray-700">
                <span>总价</span>
                <span>¥{referralData.weatherInsuranceFee.toFixed(2)}</span>
              </div>
            </div>
          </div>
          <button
            onClick={handlePurchase}
            className="w-full text-white text-base font-semibold py-3 rounded-full transition-all shadow-sm active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: '#5B6FED' }}
            disabled={!agreed}
          >
            立即购买
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScenicAddWeatherServicePage;
