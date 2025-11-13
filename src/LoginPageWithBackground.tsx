import { useState } from 'react';
import { Check } from 'lucide-react';

interface LoginPageWithBackgroundProps {
  onLoginSuccess: () => void;
}

function LoginPageWithBackground({ onLoginSuccess }: LoginPageWithBackgroundProps) {
  const [agreed, setAgreed] = useState(false);

  const handleLogin = () => {
    if (agreed) {
      onLoginSuccess();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-[375px] min-h-screen flex flex-col relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'linear-gradient(180deg, rgba(235, 220, 200, 0.95) 0%, rgba(245, 235, 220, 0.9) 50%, rgba(255, 250, 240, 0.85) 100%)',
          }}
        />

        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url("https://images.pexels.com/photos/2549018/pexels-photo-2549018.jpeg?auto=compress&cs=tinysrgb&w=600")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />

        <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-gray-800 text-sm z-10">
          <span className="font-semibold">8:40</span>
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

        <div className="flex-1 flex flex-col px-6 pt-16 relative z-10">
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="mb-16">
              <div className="flex items-center justify-center mb-8 bg-white/60 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-lg">
                <img src="/image copy copy.png" alt="陪你天气" className="h-10" />
              </div>

              <p className="text-center text-lg text-gray-900 font-medium drop-shadow-sm">
                让每一次出行都充满信心
              </p>
            </div>

            <div className="w-full">
              <button
                onClick={handleLogin}
                disabled={!agreed}
                className="w-full py-4 rounded-2xl text-white font-semibold text-base transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed mb-6"
                style={{ backgroundColor: '#5B6FED' }}
              >
                同意协议并快捷登录
              </button>
            </div>
          </div>

          <div className="pb-8">
            <div className="flex items-start gap-2.5 mb-3 bg-white/70 backdrop-blur-sm p-3 rounded-xl">
              <button
                onClick={() => setAgreed(!agreed)}
                className="flex-shrink-0 mt-1"
              >
                <div className={`w-5 h-5 rounded-sm flex items-center justify-center border-2 transition-all ${
                  agreed ? 'bg-white border-gray-300' : 'border-gray-300 bg-white'
                }`}>
                  {agreed && (
                    <div className="w-3 h-3 flex items-center justify-center">
                      <Check className="w-3 h-3 text-gray-700" strokeWidth={3} />
                    </div>
                  )}
                </div>
              </button>
              <div className="text-sm text-gray-700 leading-relaxed">
                我已阅读并同意{' '}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    alert('用户协议');
                  }}
                  className="font-medium"
                  style={{ color: '#5B6FED' }}
                >
                  《用户协议》
                </button>
                {' '}和{' '}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    alert('隐私政策');
                  }}
                  className="font-medium"
                  style={{ color: '#5B6FED' }}
                >
                  《隐私政策》
                </button>
              </div>
            </div>

            <p className="text-xs text-gray-700 text-center leading-relaxed px-2 drop-shadow-sm">
              未注册的手机号将自动创建账号
            </p>
          </div>
        </div>

        <div className="fixed bottom-0 w-[375px] bg-white/90 backdrop-blur-md border-t border-gray-200 py-3 z-20">
          <div className="flex items-center justify-around px-6">
            <button className="flex flex-col items-center justify-center text-center">
              <svg className="w-6 h-6 mb-1 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/>
                <rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
              <span className="text-xs text-gray-400">首页</span>
            </button>
            <button className="flex flex-col items-center justify-center text-center">
              <svg className="w-6 h-6 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" style={{ stroke: '#5B6FED' }}/>
                <line x1="16" y1="2" x2="16" y2="6" style={{ stroke: '#5B6FED' }}/>
                <line x1="8" y1="2" x2="8" y2="6" style={{ stroke: '#5B6FED' }}/>
                <line x1="3" y1="10" x2="21" y2="10" style={{ stroke: '#5B6FED' }}/>
              </svg>
              <span className="text-xs" style={{ color: '#5B6FED' }}>行程</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPageWithBackground;
