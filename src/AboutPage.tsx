import { ArrowLeft, Check, Shield, Umbrella, TrendingUp, Award } from 'lucide-react';

interface AboutPageProps {
  onBack: () => void;
}

function AboutPage({ onBack }: AboutPageProps) {
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

        <div className="sticky top-0 bg-white z-20 px-6 pt-16 pb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-7 h-7 text-gray-800" strokeWidth={2} />
            </button>
            <h1 className="text-2xl font-bold text-gray-900">关于陪你天气</h1>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto bg-gray-50 px-6 pb-10">
          <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
            <div className="flex justify-center mb-5">
              <img src="/image copy copy.png" alt="陪你天气" className="h-12" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 text-center mb-4">
              每一次旅行，我们都在您身边
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed text-center">
              如果您对天气订了酒店或行程，无法是景观，或因这些天气影响旅行体验，我们为您提供保障。
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">陪你天气保障™如何工作</h3>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-600">1</span>
                </div>
                <div className="flex-1 pt-2">
                  <h4 className="font-semibold text-gray-900 mb-1">预订您的行程</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    通过自动监测您的旅行地点和日期，我们全程守护您的行程。
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-600">2</span>
                </div>
                <div className="flex-1 pt-2">
                  <h4 className="font-semibold text-gray-900 mb-1">添加天气保障™</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    我们实时监测权威天气数据源，如果触发补偿条件，将自动为您处理。
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <span className="text-lg font-bold text-blue-600">3</span>
                </div>
                <div className="flex-1 pt-2">
                  <h4 className="font-semibold text-gray-900 mb-1">获得当日补偿</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    无需报案、无需预测、无需复杂程序，让您安心出行。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-5">保障范围</h3>
            <p className="text-sm text-gray-600 mb-4 leading-relaxed">
              哪些活动在保障范围内？
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: '🏕️', name: '露营野餐' },
                { icon: '⛺', name: '露营' },
                { icon: '🎭', name: '旅行节' },
                { icon: '🎪', name: '演出' },
                { icon: '🚶', name: '徒步旅行' },
                { icon: '⛳', name: '高尔夫' },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm text-gray-700 font-medium">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">为什么选择我们</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">99.90%</div>
                  <div className="text-sm text-gray-600">触发精度准确度</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Umbrella className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">1.5mm</div>
                  <div className="text-sm text-gray-600">降雨标准</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">1次</div>
                  <div className="text-sm text-gray-600">一项活动，全程守护</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Award className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 mb-1">100%</div>
                  <div className="text-sm text-gray-600">自动理赔体验</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">常见问题</h3>

            <div className="space-y-5">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm">什么是天气保障？</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  陪你天气®是一项创新服务，当您的旅行因恶劣天气受到影响时，为您提供经济补偿，让您的出行更有保障。
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm">如何购买天气保障？</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  在首页输入您的目的地、旅行日期和行程费用，点击"添加天气保障"即可购买。费用根据天数计算，简单透明。
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-2 text-sm">何时获得补偿？</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  当监测到您的旅行地点在08:00-20:00期间降雨达到4小时且强度≥1.5mm/h时，系统会自动处理补偿，无需您申请。
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-2xl p-6 mb-6">
            <h3 className="text-base font-semibold text-gray-900 mb-3">公司信息</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>陪你天气科技有限公司</p>
              <p className="text-xs text-gray-500">版本 1.0.0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
