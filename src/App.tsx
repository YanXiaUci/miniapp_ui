import { useState } from 'react';
import { ArrowLeft, Check, User, Calendar, CloudRain, Sun, AlertCircle, X, MoreVertical, Plus, ChevronRight, Shield, HelpCircle, MessageCircle, FileText, Info, Clock } from 'lucide-react';
import AboutPage from './AboutPage';
import Tooltip from './Tooltip';

type Page = 'home' | 'add' | 'trips' | 'tripDetail' | 'profile' | 'about';

interface DayWeather {
  date: string;
  rained: boolean;
  hours?: number;
  compensated: boolean;
  amount?: number;
  compensationStatus: '无需补偿' | '待结算' | '处理中' | '已到账';
  paidAt?: string;
}

interface Trip {
  id: string;
  location: string;
  startDate: string;
  endDate: string;
  days: number;
  status: '待支付' | '已支付' | '保障中' | '结算中' | '已完成' | '已失效';
  statusColor: string;
  dailyPrice: number;
  serviceFee: number;
  totalAmount: number;
  totalCompensation: number;
  weatherData: DayWeather[];
}

const trips: Trip[] = [
  {
    id: 'MHFF8Q12345678',
    location: '广州长隆欢乐世界',
    startDate: '11月15日',
    endDate: '11月17日',
    days: 3,
    status: '待支付',
    statusColor: 'bg-orange-100 text-orange-600',
    dailyPrice: 180,
    serviceFee: 0.45,
    totalAmount: 0.45,
    totalCompensation: 0,
    weatherData: [],
  },
  {
    id: 'MHPP2K87654321',
    location: '上海东方明珠',
    startDate: '11月18日',
    endDate: '11月20日',
    days: 3,
    status: '已支付',
    statusColor: 'bg-cyan-100 text-cyan-600',
    dailyPrice: 200,
    serviceFee: 0.50,
    totalAmount: 0.50,
    totalCompensation: 0,
    weatherData: [],
  },
  {
    id: 'MHGG3R23456789',
    location: '深圳欢乐谷',
    startDate: '11月08日',
    endDate: '11月10日',
    days: 3,
    status: '保障中',
    statusColor: 'bg-blue-100 text-blue-600',
    dailyPrice: 160,
    serviceFee: 0.40,
    totalAmount: 0.40,
    totalCompensation: 2,
    weatherData: [
      { date: '11月08日', rained: true, hours: 5, compensated: true, amount: 2, compensationStatus: '已到账', paidAt: '11月09日 10:32' },
      { date: '11月09日', rained: false, compensated: false, compensationStatus: '无需补偿' },
    ],
  },
  {
    id: 'MHZZ9T34567890',
    location: '厦门鼓浪屿',
    startDate: '11月05日',
    endDate: '11月07日',
    days: 3,
    status: '结算中',
    statusColor: 'bg-amber-100 text-amber-600',
    dailyPrice: 180,
    serviceFee: 0.45,
    totalAmount: 0.45,
    totalCompensation: 4,
    weatherData: [
      { date: '11月05日', rained: true, hours: 5, compensated: true, amount: 2, compensationStatus: '已到账', paidAt: '11月06日 09:15' },
      { date: '11月06日', rained: false, compensated: false, compensationStatus: '无需补偿' },
      { date: '11月07日', rained: true, hours: 6, compensated: true, amount: 2, compensationStatus: '处理中' },
    ],
  },
  {
    id: 'MHAA3X21456789',
    location: '杭州西湖风景区',
    startDate: '11月03日',
    endDate: '11月04日',
    days: 2,
    status: '已完成',
    statusColor: 'bg-green-100 text-green-600',
    dailyPrice: 200,
    serviceFee: 0.35,
    totalAmount: 0.35,
    totalCompensation: 4,
    weatherData: [
      { date: '11月03日', rained: true, hours: 5, compensated: true, amount: 2, compensationStatus: '已到账', paidAt: '11月04日 11:20' },
      { date: '11月04日', rained: true, hours: 4, compensated: true, amount: 2, compensationStatus: '已到账', paidAt: '11月05日 10:05' },
    ],
  },
  {
    id: 'MHDD7M45678901',
    location: '苏州园林',
    startDate: '10月25日',
    endDate: '10月28日',
    days: 4,
    status: '已完成',
    statusColor: 'bg-green-100 text-green-600',
    dailyPrice: 160,
    serviceFee: 0.50,
    totalAmount: 0.50,
    totalCompensation: 4,
    weatherData: [
      { date: '10月25日', rained: true, hours: 6, compensated: true, amount: 2, compensationStatus: '已到账', paidAt: '10月26日 10:15' },
      { date: '10月26日', rained: true, hours: 2, compensated: false, compensationStatus: '无需补偿' },
      { date: '10月27日', rained: false, compensated: false, compensationStatus: '无需补偿' },
      { date: '10月28日', rained: true, hours: 5, compensated: true, amount: 2, compensationStatus: '已到账', paidAt: '10月29日 09:45' },
    ],
  },
  {
    id: 'MHEE2N56789012',
    location: '西安大雁塔',
    startDate: '10月20日',
    endDate: '10月24日',
    days: 5,
    status: '已完成',
    statusColor: 'bg-green-100 text-green-600',
    dailyPrice: 140,
    serviceFee: 0.55,
    totalAmount: 0.55,
    totalCompensation: 2,
    weatherData: [
      { date: '10月20日', rained: false, compensated: false, compensationStatus: '无需补偿' },
      { date: '10月21日', rained: true, hours: 3, compensated: false, compensationStatus: '无需补偿' },
      { date: '10月22日', rained: true, hours: 5, compensated: true, amount: 2, compensationStatus: '已到账', paidAt: '10月23日 11:30' },
      { date: '10月23日', rained: false, compensated: false, compensationStatus: '无需补偿' },
      { date: '10月24日', rained: true, hours: 2, compensated: false, compensationStatus: '无需补偿' },
    ],
  },
  {
    id: 'MHBB9Y87654321',
    location: '北京故宫博物院',
    startDate: '11月01日',
    endDate: '11月02日',
    days: 2,
    status: '已完成',
    statusColor: 'bg-green-100 text-green-600',
    dailyPrice: 150,
    serviceFee: 0.30,
    totalAmount: 0.30,
    totalCompensation: 0,
    weatherData: [
      { date: '11月01日', rained: false, compensated: false, compensationStatus: '无需补偿' },
      { date: '11月02日', rained: false, compensated: false, compensationStatus: '无需补偿' },
    ],
  },
  {
    id: 'MHCC5K34567890',
    location: '成都宽窄巷子',
    startDate: '10月28日',
    endDate: '10月30日',
    days: 3,
    status: '已完成',
    statusColor: 'bg-green-100 text-green-600',
    dailyPrice: 180,
    serviceFee: 0.45,
    totalAmount: 0.45,
    totalCompensation: 0,
    weatherData: [
      { date: '10月28日', rained: true, hours: 2, compensated: false, compensationStatus: '无需补偿' },
      { date: '10月29日', rained: true, hours: 3, compensated: false, compensationStatus: '无需补偿' },
      { date: '10月30日', rained: false, compensated: false, compensationStatus: '无需补偿' },
    ],
  },
  {
    id: 'MHLDST5E069100',
    location: '上海迪士尼乐园酒店',
    startDate: '11月11日',
    endDate: '11月11日',
    days: 1,
    status: '已失效',
    statusColor: 'bg-gray-100 text-gray-500',
    dailyPrice: 100,
    serviceFee: 0.10,
    totalAmount: 0.10,
    totalCompensation: 0,
    weatherData: [],
  },
  {
    id: 'MHJW7P95879232',
    location: '上海南站',
    startDate: '11月13日',
    endDate: '11月13日',
    days: 1,
    status: '已失效',
    statusColor: 'bg-gray-100 text-gray-500',
    dailyPrice: 50,
    serviceFee: 0.05,
    totalAmount: 0.05,
    totalCompensation: 0,
    weatherData: [],
  },
  {
    id: 'MHEBP5ZI239310',
    location: '上海浦东国际机场',
    startDate: '11月14日',
    endDate: '11月14日',
    days: 1,
    status: '已失效',
    statusColor: 'bg-gray-100 text-gray-500',
    dailyPrice: 80,
    serviceFee: 0.08,
    totalAmount: 0.08,
    totalCompensation: 0,
    weatherData: [],
  },
];

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [agreed, setAgreed] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);

  const getCardGradient = (index: number) => {
    const gradients = [
      'bg-gradient-to-br from-orange-50 to-orange-100/50',
      'bg-gradient-to-br from-blue-50 to-blue-100/50',
      'bg-gradient-to-br from-emerald-50 to-emerald-100/50',
      'bg-gradient-to-br from-purple-50 to-purple-100/50',
      'bg-gradient-to-br from-pink-50 to-pink-100/50',
      'bg-gradient-to-br from-amber-50 to-amber-100/50',
      'bg-gradient-to-br from-cyan-50 to-cyan-100/50',
      'bg-gradient-to-br from-rose-50 to-rose-100/50',
      'bg-gradient-to-br from-indigo-50 to-indigo-100/50',
      'bg-gradient-to-br from-teal-50 to-teal-100/50',
    ];
    return gradients[index % gradients.length];
  };

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

          <div className="sticky top-0 bg-white z-20 px-6 pt-16 pb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setCurrentPage('home')}
                  className="p-2 -ml-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ArrowLeft className="w-7 h-7 text-gray-800" strokeWidth={2} />
                </button>
                <h1 className="text-2xl font-bold text-gray-900">我的保障</h1>
              </div>
              <button
                onClick={() => setCurrentPage('profile')}
                className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-all shadow-sm"
              >
                <img
                  src="/4c3b9c4f58ed2b07bd1cf80f69b1b28f.jpg"
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-gray-50 px-6 pb-24">
            <div className="space-y-3">
              {trips.map((trip, index) => (
                <button
                  key={trip.id}
                  onClick={() => {
                    setSelectedTrip(trip);
                    setCurrentPage('tripDetail');
                  }}
                  className={`w-full rounded-2xl p-5 shadow-sm text-left hover:shadow-md transition-all active:scale-[0.98] relative ${getCardGradient(index)}`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="text-lg font-bold text-gray-900 mb-1">{trip.location}</div>
                      <div className="text-xs text-gray-500 font-medium">订单号 {trip.id}</div>
                    </div>
                    <span className={`text-xs px-3 py-1.5 rounded-full font-semibold whitespace-nowrap ${trip.statusColor}`}>{trip.status}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm text-gray-700 font-medium mb-0.5">{trip.startDate} - {trip.endDate}</div>
                      <div className="text-xs text-gray-500">共{trip.days}天</div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </div>
                </button>
              ))}
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
{(selectedTrip?.status === '已支付' || selectedTrip?.status === '保障中' || selectedTrip?.status === '结算中' || selectedTrip?.status === '已完成') && (
                <div className="relative">
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <MoreVertical className="w-5 h-5 text-gray-600" />
                  </button>

                  {showMenu && (
                    <>
                      <div
                        className="fixed inset-0 z-30"
                        onClick={() => setShowMenu(false)}
                      ></div>
                      <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-40">
                        {selectedTrip?.status === '已支付' && (
                          <button
                            onClick={() => {
                              setShowMenu(false);
                              setShowRefundModal(true);
                            }}
                            className="w-full px-4 py-3 text-sm text-left text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            申请退款
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setShowMenu(false);
                            alert('联系客服');
                          }}
                          className="w-full px-4 py-3 text-sm text-left text-gray-700 hover:bg-gray-50 transition-colors"
                        >
                          联系客服
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-gray-50 px-4 pb-8">
            {selectedTrip && (
              <>
                <div className="bg-white rounded-2xl p-5 mt-3 shadow-sm">
                  <div className="mb-3">
                    <div className="text-lg font-bold text-gray-900 mb-1">{selectedTrip.location}</div>
                    <div className="text-xs text-gray-500 font-medium">订单号 {selectedTrip.id}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-700 font-medium mb-0.5">{selectedTrip.startDate} - {selectedTrip.endDate}</div>
                    <div className="text-xs text-gray-500">共{selectedTrip.days}天</div>
                  </div>
                </div>

                {selectedTrip.status === '已支付' && (
                  <div className="bg-white rounded-2xl p-4 mt-3 shadow-sm">
                    <h2 className="text-base font-semibold text-gray-900 mb-3">保障状态</h2>
                    <div className="bg-gradient-to-br from-cyan-50 to-cyan-100/50 rounded-xl p-5">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center">
                          <Clock className="w-6 h-6 text-cyan-600" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900 mb-0.5">等待保障生效</div>
                          <div className="text-xs text-gray-600">保障将在 {selectedTrip.startDate} 开始</div>
                        </div>
                      </div>
                      <div className="space-y-2.5 bg-white/60 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#5B6FED' }}></div>
                          <p className="text-xs text-gray-700 leading-relaxed">
                            保障期：{selectedTrip.startDate} 至 {selectedTrip.endDate}（共{selectedTrip.days}天）
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#5B6FED' }}></div>
                          <p className="text-xs text-gray-700 leading-relaxed">
                            每天监测时间：08:00-20:00
                          </p>
                        </div>
                        <div className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#5B6FED' }}></div>
                          <p className="text-xs text-gray-700 leading-relaxed">
                            补偿标准：下雨≥4小时，获得2元/天
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {((selectedTrip.status === '已完成' || selectedTrip.status === '保障中' || selectedTrip.status === '结算中') && selectedTrip.weatherData.length > 0) && (
                  <div className="bg-white rounded-2xl p-4 mt-3 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-base font-semibold text-gray-900">补偿进度</h2>
                      {selectedTrip.status === '结算中' && (
                        <span className="text-xs px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 font-medium">
                          结算处理中
                        </span>
                      )}
                    </div>
                    <div className="space-y-3">
                      {selectedTrip.weatherData.map((day, index) => (
                        <div key={index} className="border-l-2 pl-4" style={{ borderColor: day.compensated ? '#5B6FED' : '#E5E7EB' }}>
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {day.rained ? (
                                <CloudRain className="w-4 h-4" style={{ color: day.compensated ? '#5B6FED' : '#9CA3AF' }} />
                              ) : (
                                <Sun className="w-4 h-4 text-yellow-500" />
                              )}
                              <span className="text-sm font-medium text-gray-900">{day.date}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {day.compensated && (
                                <span className="text-sm font-semibold" style={{ color: '#5B6FED' }}>+¥{day.amount}</span>
                              )}
                              {day.compensationStatus === '已到账' && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 font-medium">
                                  已到账
                                </span>
                              )}
                              {day.compensationStatus === '处理中' && (
                                <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  处理中
                                </span>
                              )}
                              {day.compensationStatus === '无需补偿' && !day.compensated && (
                                <span className="text-xs text-gray-500">无需补偿</span>
                              )}
                            </div>
                          </div>
                          <div className="bg-gray-50 rounded-lg p-3">
                            {!day.rained ? (
                              <p className="text-sm text-gray-600">未触发</p>
                            ) : (
                              <div className="space-y-1.5">
                                <div className="flex justify-between text-sm">
                                  <span className="text-gray-600">降雨时长</span>
                                  <span className={`font-medium ${day.compensated ? 'text-gray-900' : 'text-gray-500'}`}>
                                    {day.hours} 小时 {day.compensated ? '✓' : '(不足4小时)'}
                                  </span>
                                </div>
                                {day.compensationStatus === '已到账' && day.paidAt && (
                                  <div className="flex justify-between text-xs text-gray-500">
                                    <span>到账时间</span>
                                    <span>{day.paidAt}</span>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {(selectedTrip.status === '已完成' || selectedTrip.status === '保障中' || selectedTrip.status === '结算中' || selectedTrip.status === '已支付') && (
                  <div className="bg-white rounded-2xl p-4 mt-3 shadow-sm">
                    <h2 className="text-base font-semibold text-gray-900 mb-3">费用明细</h2>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="space-y-2.5">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">天气保障费用（{selectedTrip.days}天）</span>
                          <span className="text-gray-900">¥{selectedTrip.serviceFee}</span>
                        </div>
                        <div className="border-t border-gray-200 pt-2.5 mt-2.5"></div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <svg className="w-4 h-4" style={{ color: '#5B6FED' }} viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                            </svg>
                            <span className="text-sm font-semibold text-gray-900">
                              总补偿金额
                            </span>
                            {selectedTrip.status === '保障中' && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-600 font-medium">
                                持续更新中
                              </span>
                            )}
                            {selectedTrip.status === '结算中' && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 font-medium">
                                结算中
                              </span>
                            )}
                          </div>
                          <span className="text-lg font-bold" style={{ color: selectedTrip.totalCompensation > 0 ? '#5B6FED' : '#6B7280' }}>
                            ¥{selectedTrip.totalCompensation}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-white rounded-2xl p-4 mt-3 shadow-sm">
                  <h2 className="text-base font-semibold text-gray-900 mb-3">补偿规则</h2>
                  <div className="bg-blue-50 rounded-xl p-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#5B6FED' }}></div>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          每天下雨满 <span className="font-semibold" style={{ color: '#5B6FED' }}>4 小时</span>，可获得 <span className="font-semibold" style={{ color: '#5B6FED' }}>2 元/天</span> 补偿
                        </p>
                      </div>
                      <div className="flex items-start gap-2.5">
                        <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: '#5B6FED' }}></div>
                        <p className="text-sm text-gray-700 leading-relaxed">
                          降雨强度达到{' '}
                          <Tooltip content="地面有小水坑的程度。">
                            <span className="font-semibold border-b border-dashed border-gray-400" style={{ color: '#5B6FED' }}>1.5 mm/h</span>
                          </Tooltip>
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
              </>
            )}
          </div>

          {selectedTrip?.status === '待支付' && (
            <div className="fixed bottom-0 w-[375px] bg-white border-t border-gray-200 px-4 py-3 shadow-lg">
              <button
                onClick={() => alert('跳转支付页面')}
                className="w-full py-3 rounded-xl text-white font-semibold transition-all hover:opacity-90"
                style={{ backgroundColor: '#5B6FED' }}
              >
                立即支付 ¥{selectedTrip.totalAmount}
              </button>
            </div>
          )}

          {showRefundModal && (
            <div className="fixed inset-0 z-50 flex items-end justify-center">
              <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={() => setShowRefundModal(false)}
              ></div>
              <div className="relative w-[375px] bg-white rounded-t-3xl p-6 animate-slide-up">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">申请退款</h2>
                  <button
                    onClick={() => setShowRefundModal(false)}
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">订单号</span>
                    <span className="text-sm font-medium text-gray-900">{selectedTrip?.id}</span>
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">地点</span>
                    <span className="text-sm text-gray-900">{selectedTrip?.location}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">退款金额</span>
                    <span className="text-sm font-semibold" style={{ color: '#5B6FED' }}>
                      ¥{selectedTrip?.totalAmount}
                    </span>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-4 mb-6">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-gray-700">
                      <p className="font-semibold text-gray-900 mb-1">退款说明</p>
                      <p className="leading-relaxed">由于保障期尚未开始，退款将自动处理并在1-3个工作日内原路退回。</p>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setShowRefundModal(false)}
                    className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
                  >
                    取消
                  </button>
                  <button
                    onClick={() => {
                      setShowRefundModal(false);
                      alert('退款成功！款项将在1-3个工作日内退回');
                    }}
                    className="flex-1 py-3 rounded-xl text-white font-semibold transition-all hover:opacity-90"
                    style={{ backgroundColor: '#5B6FED' }}
                  >
                    确认退款
                  </button>
                </div>
              </div>
            </div>
          )}
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
                      如果国家权威数据源显示<span className="font-semibold" style={{ color: '#5B6FED' }}>08:00-20:00</span>之间下雨<span className="font-semibold" style={{ color: '#5B6FED' }}>2小时或以上</span>（{' '}
                      <Tooltip content="地面有小水坑的程度。">
                        <span className="font-semibold border-b border-dashed border-gray-400" style={{ color: '#5B6FED' }}>≥1.50mm/h</span>
                      </Tooltip>
                      ）
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

  if (currentPage === 'about') {
    return <AboutPage onBack={() => setCurrentPage('profile')} />;
  }

  if (currentPage === 'profile') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-[375px] bg-gradient-to-b from-blue-100/30 via-blue-50/20 to-white min-h-screen flex flex-col relative">
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

          <div className="px-6 pt-14 pb-6">
            <button
              onClick={() => setCurrentPage('trips')}
              className="p-2 -ml-2 hover:bg-black/5 rounded-full transition-colors"
            >
              <ArrowLeft className="w-7 h-7 text-gray-800" strokeWidth={2} />
            </button>
          </div>

          <div className="flex flex-col items-center px-5 pb-10">
            <div className="w-28 h-28 rounded-full shadow-lg mb-4 overflow-hidden">
              <img 
                src="/4c3b9c4f58ed2b07bd1cf80f69b1b28f.jpg" 
                alt="User Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-0">xy</h2>
          </div>

          <div className="flex-1 px-6 pb-8">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <button
                onClick={() => alert('账号与安全功能即将推出')}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-100"
              >
                <div className="flex items-center gap-3.5">
                  <User className="w-5 h-5 text-gray-900" strokeWidth={2} />
                  <span className="text-base text-gray-900">账号与安全</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" strokeWidth={2} />
              </button>

              <button
                onClick={() => alert('和开发者聊聊')}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-100"
              >
                <div className="flex items-center gap-3.5">
                  <MessageCircle className="w-5 h-5 text-gray-900" strokeWidth={2} />
                  <span className="text-base text-gray-900">和开发者聊聊</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" strokeWidth={2} />
              </button>

              <button
                onClick={() => alert('条款协议')}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-100"
              >
                <div className="flex items-center gap-3.5">
                  <Info className="w-5 h-5 text-gray-900" strokeWidth={2} />
                  <span className="text-base text-gray-900">条款协议</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" strokeWidth={2} />
              </button>

              <button
                onClick={() => setCurrentPage('about')}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-100"
              >
                <div className="flex items-center gap-3.5">
                  <HelpCircle className="w-5 h-5 text-gray-900" strokeWidth={2} />
                  <span className="text-base text-gray-900">关于陪你天气</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" strokeWidth={2} />
              </button>

              <button
                onClick={() => alert('加入用户社群')}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <svg className="w-5 h-5 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                  <span className="text-base text-gray-900">加入用户社群</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" strokeWidth={2} />
              </button>
            </div>
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
