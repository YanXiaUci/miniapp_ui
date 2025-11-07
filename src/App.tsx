import { useState } from 'react';
import { ArrowLeft, Check, User, Calendar } from 'lucide-react';

type Page = 'home' | 'add' | 'trips' | 'tripDetail';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('trips');
  const [agreed, setAgreed] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<string | null>(null);

  if (currentPage === 'trips') {
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

          <div className="sticky top-0 bg-white z-20 px-5 pt-16 pb-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-semibold text-gray-900">行程</h1>
              <div className="flex items-center gap-2">
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                    <circle cx="12" cy="5" r="2"/>
                    <circle cx="12" cy="12" r="2"/>
                    <circle cx="12" cy="19" r="2"/>
                  </svg>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" rx="1"/>
                    <rect x="14" y="3" width="7" height="7" rx="1"/>
                    <rect x="3" y="14" width="7" height="7" rx="1"/>
                    <rect x="14" y="14" width="7" height="7" rx="1"/>
                  </svg>
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10"/>
                    <line x1="12" y1="8" x2="12" y2="12"/>
                    <line x1="12" y1="16" x2="12.01" y2="16"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-gray-50 px-4 pb-24">
            <div className="bg-white rounded-2xl p-4 mb-3 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <div>
                  <div className="text-base font-medium text-gray-900">xy</div>
                  <div className="text-sm text-gray-400">131****9439</div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setSelectedTrip('MHLDST5E069100');
                  setCurrentPage('tripDetail');
                }}
                className="w-full bg-white rounded-2xl p-4 shadow-sm text-left hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">订单号</div>
                    <div className="text-sm font-medium text-gray-900">MHLDST5E069100</div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">已失效</span>
                </div>
                <div className="mb-3">
                  <div className="text-xs text-gray-400 mb-1">地点</div>
                  <div className="text-base text-gray-900">上海迪士尼乐园酒店</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">日期</div>
                    <div className="text-sm text-gray-900">11月11日 - 11月11日</div>
                    <div className="text-xs text-gray-500 mt-0.5">共1天</div>
                  </div>
                  <div className="flex items-center gap-1 text-sm" style={{ color: '#5B6FED' }}>
                    查看详情
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  setSelectedTrip('MHJW7P95879232');
                  setCurrentPage('tripDetail');
                }}
                className="w-full bg-white rounded-2xl p-4 shadow-sm text-left hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">订单号</div>
                    <div className="text-sm font-medium text-gray-900">MHJW7P95879232</div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">已失效</span>
                </div>
                <div className="mb-3">
                  <div className="text-xs text-gray-400 mb-1">地点</div>
                  <div className="text-base text-gray-900">上海南站</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">日期</div>
                    <div className="text-sm text-gray-900">11月13日 - 11月13日</div>
                    <div className="text-xs text-gray-500 mt-0.5">共1天</div>
                  </div>
                  <div className="flex items-center gap-1 text-sm" style={{ color: '#5B6FED' }}>
                    查看详情
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </div>
                </div>
              </button>

              <button
                onClick={() => {
                  setSelectedTrip('MHEBP5ZI239310');
                  setCurrentPage('tripDetail');
                }}
                className="w-full bg-white rounded-2xl p-4 shadow-sm text-left hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">订单号</div>
                    <div className="text-sm font-medium text-gray-900">MHEBP5ZI239310</div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-500">已失效</span>
                </div>
                <div className="mb-3">
                  <div className="text-xs text-gray-400 mb-1">地点</div>
                  <div className="text-base text-gray-900">上海浦东国际机场</div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">日期</div>
                    <div className="text-sm text-gray-900">11月14日 - 11月14日</div>
                    <div className="text-xs text-gray-500 mt-0.5">共1天</div>
                  </div>
                  <div className="flex items-center gap-1 text-sm" style={{ color: '#5B6FED' }}>
                    查看详情
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6"/>
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <div className="fixed bottom-0 w-[375px] bg-white border-t border-gray-200">
            <div className="flex items-center justify-around py-2">
              <button
                onClick={() => setCurrentPage('home')}
                className="flex flex-col items-center justify-center py-1 px-6 text-center"
              >
                <svg className="w-6 h-6 mb-1 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" rx="1"/>
                  <rect x="14" y="3" width="7" height="7" rx="1"/>
                  <rect x="3" y="14" width="7" height="7" rx="1"/>
                  <rect x="14" y="14" width="7" height="7" rx="1"/>
                </svg>
                <span className="text-xs text-gray-400">首页</span>
              </button>
              <button className="flex flex-col items-center justify-center py-1 px-6 text-center">
                <Calendar className="w-6 h-6 mb-1" style={{ color: '#5B6FED' }} />
                <span className="text-xs" style={{ color: '#5B6FED' }}>行程</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'tripDetail') {
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
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button onClick={() => setCurrentPage('trips')} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                  <ArrowLeft className="w-5 h-5 text-gray-800" />
                </button>
                <h1 className="text-lg font-semibold text-gray-900">订单详情</h1>
              </div>
              <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="1" fill="currentColor"/>
                  <circle cx="19" cy="12" r="1" fill="currentColor"/>
                  <circle cx="5" cy="12" r="1" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-gray-50 px-4 pb-8">
            <div className="bg-white rounded-2xl p-4 mt-3 shadow-sm">
              <div className="mb-3">
                <div className="text-xs text-gray-400 mb-1">订单号</div>
                <div className="text-base font-medium text-gray-900">{selectedTrip}</div>
              </div>
              <div className="mb-3">
                <div className="text-xs text-gray-400 mb-1">地点</div>
                <div className="text-base text-gray-900">上海迪士尼乐园酒店</div>
              </div>
              <div>
                <div className="text-xs text-gray-400 mb-1">日期</div>
                <div className="text-base text-gray-900">11月11日</div>
                <div className="text-sm text-gray-500 mt-1">共1天</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-4 mt-3 shadow-sm">
              <h2 className="text-base font-semibold text-gray-900 mb-3">补偿规则</h2>
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#5B6FED' }}></div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      每天下雨满 <span className="font-semibold" style={{ color: '#5B6FED' }}>4 小时</span>，可获得 <span className="font-semibold" style={{ color: '#5B6FED' }}>1 元/天</span> 补偿
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#5B6FED' }}></div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      降雨强度达到 <span className="font-semibold" style={{ color: '#5B6FED' }}>1.5 mm/h</span>
                      <button className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full" style={{ backgroundColor: '#5B6FED' }}>
                        <span className="text-white text-xs font-semibold">?</span>
                      </button>
                    </p>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#5B6FED' }}></div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      补偿通知将通过短信发送
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'add') {
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
                <button onClick={() => setCurrentPage('home')} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                  <ArrowLeft className="w-5 h-5 text-gray-800" />
                </button>
                <h1 className="text-lg font-semibold text-gray-900">添加天气服务</h1>
              </div>
              <button className="p-1 hover:bg-gray-100 rounded-full transition-colors">
                <svg className="w-5 h-5 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="1" fill="currentColor"/>
                  <circle cx="19" cy="12" r="1" fill="currentColor"/>
                  <circle cx="5" cy="12" r="1" fill="currentColor"/>
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-gray-50 pb-32">
            <div className="bg-white rounded-2xl mx-4 mt-3 px-4 py-3.5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm text-gray-600">11月6日 今天</span>
                <span className="text-gray-400">→</span>
                <span className="text-sm text-gray-600">11月7日 明天</span>
                <span className="ml-auto text-sm font-medium text-gray-900">1晚</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base text-gray-900">北京市 · 朝阳区</span>
                <span className="text-sm text-gray-500">每日行程费用 ¥100</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl mx-4 mt-2.5 px-4 py-2.5 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-base font-semibold text-gray-900">服务详情</h2>
                <div className="flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#F59E0B' }} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                  </svg>
                  <span className="text-xs text-gray-700">
                    <span className="font-semibold" style={{ color: '#F59E0B' }}>25:06</span>
                  </span>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 mb-3">
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  陪你天气®将在您行程期间每天监测天气预报。
                </p>
                <div className="space-y-2.5">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#5B6FED' }}></div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      如果国家权威数据源显示<span className="font-semibold" style={{ color: '#5B6FED' }}>08:00-20:00</span>之间下雨<span className="font-semibold" style={{ color: '#5B6FED' }}>2小时或以上（≥1.50mm/h）</span>
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#5B6FED' }}></div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      陪你天气®将向您退还<span className="font-semibold text-sm" style={{ color: '#5B6FED' }}>100元</span>
                    </p>
                  </div>
                </div>
              </div>

            </div>

            <div className="bg-white rounded-2xl mx-4 mt-2.5 mb-4 px-4 py-2.5 shadow-sm">
              <h2 className="text-base font-semibold text-gray-900 mb-2.5">联系信息</h2>

              <div className="space-y-2.5 mb-2.5">
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">姓名</label>
                  <input
                    type="text"
                    placeholder="请输入姓名"
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-600 mb-1 block">手机号码</label>
                  <input
                    type="tel"
                    placeholder="请输入手机号码"
                    className="w-full px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-2.5 mb-2.5">
                <p className="text-xs text-gray-600 leading-relaxed">
                  陪你天气仅监测出行期间的天气。如有需要，可能需提供行程凭证（如机票、酒店订单）以核实退款。
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
                <span className="text-2xl font-bold text-gray-900">¥0.20</span>
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
                  <span>¥0.1/天</span>
                </div>
                <div className="flex justify-between">
                  <span>天数</span>
                  <span>2天</span>
                </div>
                <div className="flex justify-between font-medium text-gray-700">
                  <span>总价</span>
                  <span>¥0.20</span>
                </div>
              </div>
            </div>
            <button
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

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="w-[375px] bg-white min-h-screen flex flex-col relative">
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

        <div className="flex-1 pb-[56px]">
          <div className="relative">
            <img
              src="/image copy.png"
              alt="Mountain view"
              className="w-full h-56 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-white"></div>
          </div>

          <div className="px-6 pt-8 pb-6 space-y-10 bg-white">
            <div className="flex justify-start pl-1">
              <img src="/image copy copy.png" alt="陪你天气" className="h-10" />
            </div>

            <div className="space-y-2 pl-1">
              <div className="text-sm text-gray-500">目的地</div>
              <div className="border-b border-gray-200 pb-3"></div>
            </div>

            <div className="grid grid-cols-2 gap-4 pl-1">
              <div className="space-y-2">
                <div className="text-sm text-gray-500">开始日期</div>
                <div className="border-b border-gray-200 pb-3"></div>
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-500">结束日期</div>
                <div className="border-b border-gray-200 pb-3"></div>
              </div>
            </div>

            <div className="space-y-2 pl-1">
              <div className="text-sm text-gray-500">每日行程费用</div>
              <div className="border-b border-gray-200 pb-3"></div>
            </div>

            <button
              onClick={() => setCurrentPage('add')}
              className="w-full text-white text-base font-medium py-3.5 rounded-full transition-all shadow-sm active:scale-[0.98]"
              style={{ backgroundColor: '#5B6FED' }}
            >
              添加天气保障
            </button>
          </div>
        </div>

        <div className="fixed bottom-0 w-[375px] bg-white border-t border-gray-200">
          <div className="flex items-center justify-around py-2">
            <button className="flex flex-col items-center justify-center py-1 px-6 text-center">
              <svg className="w-6 h-6 mb-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7" rx="1" fill="#5B6FED"/>
                <rect x="14" y="3" width="7" height="7" rx="1" fill="#5B6FED"/>
                <rect x="3" y="14" width="7" height="7" rx="1" fill="#5B6FED"/>
                <rect x="14" y="14" width="7" height="7" rx="1" fill="#5B6FED"/>
              </svg>
              <span className="text-xs" style={{ color: '#5B6FED' }}>首页</span>
            </button>
            <button
              onClick={() => setCurrentPage('trips')}
              className="flex flex-col items-center justify-center py-1 px-6 text-center"
            >
              <Calendar className="w-6 h-6 mb-1 text-gray-400" />
              <span className="text-xs text-gray-400">行程</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
