import { useState, useEffect } from 'react';
import { ArrowLeft, Check, User, Calendar, CloudRain, Sun, AlertCircle, X, MoreVertical, Plus, ChevronRight, ChevronDown, ChevronUp, Shield, HelpCircle, MessageCircle, FileText, Info, Clock, Lock, Code, Camera, Image as ImageIcon } from 'lucide-react';
import AboutPage from './AboutPage';
import Tooltip from './Tooltip';
import MarathonListPage from './MarathonListPage';
import MarathonPaymentPage from './MarathonPaymentPage';
import LoginPage from './LoginPage';
import { MarathonEvent, ReferralData, marathonEvents } from './marathonData';
import ScenicListPage from './ScenicListPage';
import ScenicReservationSuccessPage from './ScenicReservationSuccessPage';
import ScenicPaymentPage from './ScenicPaymentPage';
import ScenicAddWeatherServicePage from './ScenicAddWeatherServicePage';
import ScenicOrderDetailPage from './ScenicOrderDetailPage';
import { ScenicSpot, ScenicReferralData } from './scenicData';
import AmusementParkListPage from './AmusementParkListPage';
import MickeyKingdomPaymentPage from './MickeyKingdomPaymentPage';
import AmusementParkAddWeatherServicePage from './AmusementParkAddWeatherServicePage';
import AmusementParkOrderDetailPage from './AmusementParkOrderDetailPage';
import { AmusementPark, AmusementParkReferralData } from './amusementParkData';
import CameraPage from './CameraPage';
import CheckInRecordsPage from './CheckInRecordsPage';
import OnboardingPage from './OnboardingPage';

type Page = 'home' | 'add' | 'trips' | 'tripDetail' | 'profile' | 'about' | 'marathonList' | 'marathonPayment' | 'scenicList' | 'scenicReservation' | 'scenicPayment' | 'scenicAddWeather' | 'scenicOrderDetail' | 'amusementParkList' | 'mickeyKingdomPayment' | 'amusementParkAddWeather' | 'amusementParkOrderDetail' | 'login' | 'camera' | 'checkInRecords';

interface DayWeather {
  date: string;
  status: '待开始' | '保障中' | '确认中' | '未达标' | '待补偿' | '已补偿';
  rained?: boolean;
  hours?: number;
  amount?: number;
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
    id: 'MHNEW20251229',
    location: '哈尔滨冰雪大世界',
    startDate: '12月28日',
    endDate: '01月03日',
    days: 7,
    status: '保障中',
    statusColor: 'bg-blue-100 text-blue-600',
    dailyPrice: 280,
    serviceFee: 25.00,
    totalAmount: 25.00,
    totalCompensation: 0,
    weatherData: [
      { date: '12月28日', status: '已补偿', rained: true, hours: 5, amount: 2, paidAt: '12月29日 10:00' },
      { date: '12月29日', status: '待补偿', rained: true, hours: 4, amount: 2 },
      { date: '12月30日', status: '确认中', rained: true, hours: 3.5 },
      { date: '12月31日', status: '未达标', rained: true, hours: 2 },
      { date: '01月01日', status: '保障中', rained: false },
      // 01月02日 and 01月03日 will be handled as pending (待开始) by logic if missing or explicitly added
      { date: '01月02日', status: '待开始', rained: false },
    ],
  },
  {
    id: 'MHSH20251130',
    location: '上海市黄浦区外滩路',
    startDate: '11月30日',
    endDate: '11月30日',
    days: 1,
    status: '保障中',
    statusColor: 'bg-blue-100 text-blue-600',
    dailyPrice: 200,
    serviceFee: 16.00,
    totalAmount: 16.00,
    totalCompensation: 0,
    weatherData: [],
  },
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
      { date: '11月08日', status: '已补偿', rained: true, hours: 5, amount: 2, paidAt: '11月09日 10:32' },
      { date: '11月09日', status: '未达标', rained: false },
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
      { date: '11月05日', status: '已补偿', rained: true, hours: 5, amount: 2, paidAt: '11月06日 09:15' },
      { date: '11月06日', status: '未达标', rained: false },
      { date: '11月07日', status: '确认中', rained: true, hours: 6, amount: 2 },
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
      { date: '11月03日', status: '已补偿', rained: true, hours: 5, amount: 2, paidAt: '11月04日 11:20' },
      { date: '11月04日', status: '已补偿', rained: true, hours: 4, amount: 2, paidAt: '11月05日 10:05' },
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
      { date: '10月25日', status: '已补偿', rained: true, hours: 6, amount: 2, paidAt: '10月26日 10:15' },
      { date: '10月26日', status: '未达标', rained: true, hours: 2 },
      { date: '10月27日', status: '未达标', rained: false },
      { date: '10月28日', status: '已补偿', rained: true, hours: 5, amount: 2, paidAt: '10月29日 09:45' },
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
      { date: '10月20日', status: '未达标', rained: false },
      { date: '10月21日', status: '未达标', rained: true, hours: 3 },
      { date: '10月22日', status: '已补偿', rained: true, hours: 5, amount: 2, paidAt: '10月23日 11:30' },
      { date: '10月23日', status: '未达标', rained: false },
      { date: '10月24日', status: '未达标', rained: true, hours: 2 },
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
      { date: '11月01日', status: '未达标', rained: false },
      { date: '11月02日', status: '未达标', rained: false },
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
      { date: '10月28日', status: '未达标', rained: true, hours: 2 },
      { date: '10月29日', status: '未达标', rained: true, hours: 3 },
      { date: '10月30日', status: '未达标', rained: false },
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(() => {
    return localStorage.getItem('hasSeenOnboarding') === 'true';
  });
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [agreed, setAgreed] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [expandedDates, setExpandedDates] = useState<Set<string>>(new Set());
  const toggleDate = (date: string) => {
    const newSet = new Set(expandedDates);
    if (newSet.has(date)) {
      newSet.delete(date);
    } else {
      newSet.add(date);
    }
    setExpandedDates(newSet);
  };
  const [showMenu, setShowMenu] = useState(false);
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [countdown, setCountdown] = useState(1800);
  const [selectedMarathon, setSelectedMarathon] = useState<MarathonEvent | null>(null);
  const [referralData, setReferralData] = useState<ReferralData | null>(null);
  const [selectedScenic, setSelectedScenic] = useState<ScenicSpot | null>(null);
  const [scenicReferralData, setScenicReferralData] = useState<ScenicReferralData | null>(null);
  const [selectedAmusementPark, setSelectedAmusementPark] = useState<AmusementPark | null>(null);
  const [amusementParkReferralData, setAmusementParkReferralData] = useState<AmusementParkReferralData | null>(null);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [preselectedOrderId, setPreselectedOrderId] = useState<string>('');

  useEffect(() => {
    if (currentPage === 'add' && countdown > 0) {
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
  }, [currentPage, countdown]);

  useEffect(() => {
    if (referralData) {
      setContactName('张三');
      setContactPhone('138****8888');
    }
  }, [referralData]);

  const formatCountdown = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

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
                    const autoExpandDates = trip.weatherData
                      .filter(d => d.status === '保障中' || d.status === '待补偿')
                      .map(d => d.date);
                    // If no specific dates found, default to our demo date if needed, otherwise just use found ones
                    if (autoExpandDates.length === 0) autoExpandDates.push('01月01日');
                    setExpandedDates(new Set(autoExpandDates));
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

                {(selectedTrip.status === '已支付' || selectedTrip.status === '保障中' || selectedTrip.status === '结算中' || selectedTrip.status === '已完成') && (
                  <div className="bg-white rounded-2xl p-4 mt-3 shadow-sm">
                    <div className="flex items-center justify-between mb-3">
                      <h2 className="text-base font-semibold text-gray-900">保障进度</h2>
                      {selectedTrip.status === '结算中' && (
                        <span className="text-xs px-2.5 py-1 rounded-full bg-amber-100 text-amber-700 font-medium">
                          结算处理中
                        </span>
                      )}
                    </div>

                    {selectedTrip.status === '保障中' && (
                      <div className="rounded-xl p-4 mb-6 border-l-4" style={{ backgroundColor: '#F6F9FF', borderColor: '#5B6FED' }}>
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-xs mb-1" style={{ color: '#7E8DA6' }}>总补偿金额</div>
                            <div className="text-2xl font-bold" style={{ color: '#5B6FED' }}>
                              {selectedTrip.totalCompensation} <span className="text-sm font-normal" style={{ color: '#7E8DA6' }}>元</span>
                            </div>
                          </div>
                          <div className="h-8 w-[1px] mx-4" style={{ backgroundColor: '#E3E8F0' }}></div>
                          <div>
                            <div className="text-xs mb-1" style={{ color: '#7E8DA6' }}>保障费用</div>
                            <div className="text-base text-gray-900">
                              {selectedTrip.serviceFee} 元 <span className="text-xs font-normal" style={{ color: '#9AA5B8' }}>({selectedTrip.days}天)</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="mt-8">
                      {(() => {
                        const dates = getTripDateStrings(selectedTrip.startDate, selectedTrip.days);
                        const groups: any[] = [];
                        let pendingBuffer: string[] = [];

                        dates.forEach((date) => {
                          const data = selectedTrip.weatherData.find(d => d.date === date);
                          if (data) {
                            if (pendingBuffer.length > 0) {
                              groups.push({ type: 'pending', dates: [...pendingBuffer] });
                              pendingBuffer = [];
                            }

                            // Treat explicit '待开始' same as missing data -> group into pending
                            if (data.status === '待开始') {
                              pendingBuffer.push(date);
                            } else {
                              groups.push({ type: 'processed', date, data });
                            }
                          } else {
                            pendingBuffer.push(date);
                          }
                        });

                        if (pendingBuffer.length > 0) {
                          groups.push({ type: 'pending', dates: [...pendingBuffer] });
                        }

                        // We might need to mock 'today' for the demo to show '保障中' correctly with 'Today' badge
                        // Let's assume 01月01日 is today for the visual logic if status is 保障中

                        return groups.map((g, idx) => {
                          const isLast = idx === groups.length - 1;

                          if (g.type === 'processed' && g.data) {
                            const day = g.data;
                            const isExpanded = expandedDates.has(day.date);

                            let statusText = '';
                            let statusColor = '';
                            let statusBgColor = '';
                            let iconColor = '#9CA3AF';
                            let description = '';
                            let isBlueBorder = false;

                            switch (day.status) {
                              case '待开始':
                                statusText = '待开始';
                                statusColor = 'text-blue-600';
                                statusBgColor = 'bg-blue-50';
                                iconColor = '#5B6FED';
                                description = '保障将于当日 08:00 开始，祝您行程愉快！';
                                isBlueBorder = false;
                                break;
                              case '保障中':
                                statusText = '保障中';
                                statusColor = 'text-blue-600';
                                statusBgColor = 'bg-blue-50';
                                iconColor = '#F59E0B'; // Yellow Sun for active/forecast
                                description = '保障已生效，正在持续监测天气。';
                                isBlueBorder = false;
                                break;
                              case '确认中':
                                statusText = '确认中';
                                statusColor = 'text-blue-600';
                                statusBgColor = 'bg-blue-50';
                                iconColor = '#5B6FED';
                                description = '当日保障已结束，补偿结果确认中。';
                                isBlueBorder = false;
                                break;
                              case '待补偿':
                                statusText = '待补偿';
                                statusColor = 'text-emerald-600';
                                statusBgColor = 'bg-emerald-50';
                                iconColor = '#5B6FED';
                                description = '已达到补偿条件，请及时领取补偿金。';
                                isBlueBorder = true;
                                break;
                              case '已补偿':
                                statusText = '已补偿';
                                statusColor = 'text-emerald-600';
                                statusBgColor = 'bg-emerald-50';
                                iconColor = '#3B82F6';
                                description = `补偿金${day.amount}元已到账，祝您行程顺利！`;
                                isBlueBorder = true;
                                break;
                              case '未达标':
                                statusText = '未达标';
                                statusColor = 'text-gray-500';
                                statusBgColor = 'bg-gray-100';
                                iconColor = '#9CA3AF'; // Gray icon
                                description = '当日未达到补偿条件，祝您行程顺利！';
                                isBlueBorder = false;
                                break;
                              default:
                                statusText = '未达标';
                                statusColor = 'text-gray-500';
                                statusBgColor = 'bg-gray-100';
                                break;
                            }

                            // Show 'Today' badge if status is '保障中'
                            const isToday = day.status === '保障中';

                            return (
                              <div key={idx} className={`relative pl-6 ${isLast ? 'pb-0' : 'pb-8'} border-l-2 ${isLast && !isExpanded ? 'border-transparent' : ''}`} style={{ borderColor: (isLast && !isExpanded) ? 'transparent' : (isBlueBorder ? '#5B6FED' : '#E5E7EB') }}>
                                <div
                                  className={`absolute -left-[9px] top-0 w-[18px] h-[18px] rounded-full flex items-center justify-center z-10 transition-all bg-white`}
                                >
                                  {day.status === '待开始' ? (
                                    <Clock className="w-4 h-4 text-blue-500" />
                                  ) : day.rained && (day.status === '未达标' || day.status === '已补偿' || day.status === '待补偿' || day.status === '确认中') ? (
                                    <CloudRain className="w-4 h-4" style={{ color: (day.status === '已补偿' || day.status === '待补偿' || day.status === '确认中') ? '#3B82F6' : '#9CA3AF' }} />
                                  ) : (
                                    <Sun className="w-4 h-4" style={{ color: '#F59E0B' }} />
                                  )}
                                </div>

                                <div
                                  className="flex items-start justify-between mb-2 -mt-1 cursor-pointer select-none"
                                  onClick={() => toggleDate(day.date)}
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-900">{day.date}</span>
                                    {isToday && (
                                      <span className="text-[10px] px-1.5 py-0.5 rounded-full text-white font-medium shadow-sm transform -translate-y-[1px]" style={{ backgroundColor: '#5B6FED' }}>
                                        今天
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusBgColor} ${statusColor}`}>{statusText}</span>
                                  </div>
                                </div>

                                {
                                  isExpanded && (
                                    <div className={`rounded-lg p-3 overflow-hidden transition-all bg-gray-50`}>
                                      <p className="text-sm text-gray-700 leading-relaxed mb-1">
                                        {description}
                                      </p>
                                      {(day.status === '未达标' || day.status === '已补偿' || day.status === '待补偿') && (
                                        <div className="flex justify-between items-center text-sm mt-3 pt-3 border-t border-gray-100">
                                          <span className="text-gray-500">降雨时长</span>
                                          <span className="text-gray-900 flex items-center gap-1">
                                            {day.hours || 0}小时
                                            {day.status === '未达标' && <span className="text-gray-400">（不足4小时）</span>}
                                            {(day.status === '已补偿' || day.status === '待补偿') && <Check className="w-4 h-4 text-emerald-500" />}
                                          </span>
                                        </div>
                                      )}

                                      {day.status === '待补偿' && (
                                        <button
                                          className="w-full mt-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 rounded-full font-semibold text-sm shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            // Handle claim logic
                                            if (!selectedTrip) return;

                                            // 1. Update the status of this specific day
                                            const updatedWeatherData = selectedTrip.weatherData.map(d => {
                                              if (d.date === day.date) {
                                                return { ...d, status: '已补偿' as const };
                                              }
                                              return d;
                                            });

                                            // 2. Update total compensation
                                            const updatedTrip = {
                                              ...selectedTrip,
                                              totalCompensation: selectedTrip.totalCompensation + (day.amount || 0),
                                              weatherData: updatedWeatherData
                                            };

                                            // 3. Update state to reflect changes
                                            setSelectedTrip(updatedTrip);
                                            alert(`已领取 ${day.date} 补偿金 ¥${day.amount}`);
                                          }}
                                        >
                                          <span>领取补偿</span>
                                          <span className="font-bold text-base">¥{day.amount}</span>
                                        </button>
                                      )}
                                    </div>
                                  )
                                }
                              </div>
                            );
                          } else if (g.type === 'pending' && g.dates) {
                            const dateRange = g.dates.length > 1
                              ? `${g.dates[0]}-${g.dates[g.dates.length - 1]}`
                              : g.dates[0];

                            const pendingKey = `pending-${g.dates[0]}`;
                            const isPendingExpanded = expandedDates.has(pendingKey);

                            return (
                              <div key={idx} className={`relative pl-6 ${isLast ? 'pb-0' : 'pb-8'} border-l-2 ${isLast && !isPendingExpanded ? 'border-transparent' : ''}`} style={{ borderColor: (isLast && !isPendingExpanded) ? 'transparent' : '#E5E7EB' }}>
                                <div
                                  className="absolute -left-[9px] top-0 w-[18px] h-[18px] rounded-full bg-white flex items-center justify-center z-10"
                                >
                                  <Clock className="w-4 h-4" style={{ color: '#5B6FED' }} />
                                </div>

                                <div
                                  className="flex items-start justify-between mb-2 -mt-1 cursor-pointer select-none"
                                  onClick={() => toggleDate(pendingKey)}
                                >
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-gray-900">{dateRange}</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-blue-50 text-blue-600">待开始</span>
                                  </div>
                                </div>
                                {isPendingExpanded && (
                                  <div className="bg-gray-50 rounded-lg p-3">
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                      保障将于当日 08:00 开始，祝您行程愉快！
                                    </p>
                                  </div>
                                )}
                              </div>
                            );
                          }
                          return null;
                        });
                      })()}
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
      </div >
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
                  <circle cx="12" cy="12" r="1" fill="currentColor" />
                  <circle cx="19" cy="12" r="1" fill="currentColor" />
                  <circle cx="5" cy="12" r="1" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto bg-gray-50 pb-32">
            {referralData && (
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 mx-4 mt-3 p-4 rounded-r-xl shadow-sm">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#5B6FED' }}>
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900 mb-1">来自 {referralData.eventName}</p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      赛事信息已自动填入，请继续完成天气保障流程
                    </p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-white rounded-2xl mx-4 mt-3 px-4 py-4 shadow-sm">
              <div className="flex items-center gap-2.5 mb-3">
                <span className="text-sm text-gray-900 font-medium">{referralData ? referralData.startDate : '11月6日'}</span>
                <span className="text-gray-400">→</span>
                <span className="text-sm text-gray-900 font-medium">{referralData ? referralData.endDate : '11月7日'}</span>
                <span className="ml-auto text-sm font-medium text-gray-900">1晚</span>
                {referralData && <Lock className="w-4 h-4 text-gray-400 ml-2" />}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-base text-gray-900 font-medium">{referralData ? referralData.location : '北京市朝阳区'}</span>
                <span className="text-sm text-gray-500">每日行程费用 ¥{referralData ? referralData.amount : '100'}</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl mx-4 mt-3 px-4 py-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-semibold text-gray-900">服务详情</h2>
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#F59E0B' }} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                  </svg>
                  <span className="text-xs font-semibold" style={{ color: '#F59E0B' }}>{formatCountdown(countdown)}</span>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-3.5">
                <p className="text-sm text-gray-700 leading-relaxed mb-3">
                  陪你天气®将在您{referralData ? '比赛' : '行程'}期间每天监测天气预报。
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#5B6FED' }}></div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      如果国家权威数据源显示<span className="font-semibold" style={{ color: '#5B6FED' }}>{referralData ? '08:00-14:00' : '08:00-20:00'}</span>之间下雨<span className="font-semibold" style={{ color: '#5B6FED' }}>2小时或以上</span>（{' '}
                      <Tooltip content="地面有小水坑的程度。">
                        <span className="font-semibold border-b border-dashed border-gray-400" style={{ color: '#5B6FED' }}>≥1.50mm/h</span>
                      </Tooltip>
                      ）
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: '#5B6FED' }}></div>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      陪你天气®将向您退还<span className="font-semibold text-sm" style={{ color: '#5B6FED' }}>{referralData ? referralData.compensationAmount : '100'}元</span>
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
                  {referralData
                    ? `陪你天气仅保障${referralData.eventName}比赛当天的天气，如有需要，我们将要求您提供报名凭证以核实补偿。`
                    : '陪你天气仅保障出行期间的天气，如有需要，我们将要求您提供行程凭证（如机票、酒店订单）以核实补偿。'
                  }
                </p>
              </div>

              <div className="flex items-start gap-2">
                <button
                  onClick={() => setAgreed(!agreed)}
                  className="flex-shrink-0 mt-0.5"
                >
                  <div className={`w-4 h-4 rounded flex items-center justify-center border-2 transition-all ${agreed
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
                <span className="text-2xl font-bold text-gray-900">¥{referralData ? referralData.weatherInsuranceFee.toFixed(2) : '0.20'}</span>
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
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </div>
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${showDetail ? 'max-h-32 opacity-100 mb-2.5' : 'max-h-0 opacity-0'}`}>
              <div className="text-xs text-gray-500 space-y-0.5">
                <div className="flex justify-between">
                  <span>单价</span>
                  <span>¥{referralData ? referralData.weatherInsuranceFee.toFixed(2) : '0.1'}/天</span>
                </div>
                <div className="flex justify-between">
                  <span>天数</span>
                  <span>{referralData ? '1天' : '2天'}</span>
                </div>
                <div className="flex justify-between font-medium text-gray-700">
                  <span>总价</span>
                  <span>¥{referralData ? referralData.weatherInsuranceFee.toFixed(2) : '0.20'}</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                const shanghaiMarathonTrip = trips.find(trip => trip.id === 'MHSH20251130');
                if (shanghaiMarathonTrip) {
                  setSelectedTrip(shanghaiMarathonTrip);
                  setCurrentPage('tripDetail');
                }
              }}
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

  if (currentPage === 'marathonList') {
    return (
      <MarathonListPage
        onBack={() => setCurrentPage('profile')}
        onSelectMarathon={(event) => {
          setSelectedMarathon(event);
          setCurrentPage('marathonPayment');
        }}
      />
    );
  }

  if (currentPage === 'marathonPayment' && selectedMarathon) {
    return (
      <MarathonPaymentPage
        event={selectedMarathon}
        onBack={() => setCurrentPage('marathonList')}
        onJumpToWeatherApp={(data) => {
          setReferralData(data);
          setCurrentPage('home');
        }}
      />
    );
  }

  if (currentPage === 'scenicList') {
    return (
      <ScenicListPage
        onBack={() => setCurrentPage('profile')}
        onSelectScenic={(spot) => {
          setSelectedScenic(spot);
          if (spot.type === 'reservation') {
            setCurrentPage('scenicReservation');
          } else {
            setCurrentPage('scenicPayment');
          }
        }}
      />
    );
  }

  if (currentPage === 'scenicReservation' && selectedScenic) {
    return (
      <ScenicReservationSuccessPage
        spot={selectedScenic}
        onBack={() => setCurrentPage('scenicList')}
        onJumpToWeatherApp={(data) => {
          setScenicReferralData(data);
          setCurrentPage('scenicAddWeather');
        }}
      />
    );
  }

  if (currentPage === 'scenicPayment' && selectedScenic) {
    return (
      <ScenicPaymentPage
        spot={selectedScenic}
        onBack={() => setCurrentPage('scenicList')}
        onJumpToWeatherApp={(data) => {
          setScenicReferralData(data);
          setCurrentPage('scenicAddWeather');
        }}
      />
    );
  }

  if (currentPage === 'scenicAddWeather' && scenicReferralData) {
    return (
      <ScenicAddWeatherServicePage
        referralData={scenicReferralData}
        onBack={() => {
          if (selectedScenic?.type === 'reservation') {
            setCurrentPage('scenicReservation');
          } else {
            setCurrentPage('scenicPayment');
          }
        }}
        onComplete={() => setCurrentPage('scenicOrderDetail')}
      />
    );
  }

  if (currentPage === 'scenicOrderDetail' && scenicReferralData) {
    return (
      <ScenicOrderDetailPage
        referralData={scenicReferralData}
        onBack={() => setCurrentPage('trips')}
      />
    );
  }

  if (currentPage === 'amusementParkList') {
    return (
      <AmusementParkListPage
        onBack={() => setCurrentPage('profile')}
        onSelectPark={(park) => {
          setSelectedAmusementPark(park);
          setCurrentPage('mickeyKingdomPayment');
        }}
      />
    );
  }

  if (currentPage === 'mickeyKingdomPayment' && selectedAmusementPark) {
    return (
      <MickeyKingdomPaymentPage
        park={selectedAmusementPark}
        onBack={() => setCurrentPage('amusementParkList')}
        onJumpToWeatherApp={(data) => {
          setAmusementParkReferralData(data);
          setCurrentPage('amusementParkAddWeather');
        }}
      />
    );
  }

  if (currentPage === 'amusementParkAddWeather' && amusementParkReferralData) {
    return (
      <AmusementParkAddWeatherServicePage
        referralData={amusementParkReferralData}
        onBack={() => setCurrentPage('mickeyKingdomPayment')}
        onComplete={() => setCurrentPage('amusementParkOrderDetail')}
      />
    );
  }

  if (currentPage === 'amusementParkOrderDetail' && amusementParkReferralData) {
    return (
      <AmusementParkOrderDetailPage
        referralData={amusementParkReferralData}
        onBack={() => setCurrentPage('trips')}
      />
    );
  }

  if (currentPage === 'about') {
    return <AboutPage onBack={() => setCurrentPage('profile')} />;
  }

  if (currentPage === 'camera') {
    return (
      <CameraPage
        onBack={() => setCurrentPage('home')}
        preselectedOrderId={preselectedOrderId}
        trips={trips}
        onPhotoSaved={() => {
          setPreselectedOrderId('');
        }}
      />
    );
  }

  if (currentPage === 'checkInRecords') {
    return <CheckInRecordsPage onBack={() => setCurrentPage('profile')} trips={trips} />;
  }

  if (!hasSeenOnboarding) {
    return (
      <OnboardingPage
        onComplete={() => {
          setHasSeenOnboarding(true);
          localStorage.setItem('hasSeenOnboarding', 'true');
        }}
      />
    );
  }

  if (!isLoggedIn) {
    return <LoginPage onLoginSuccess={() => setIsLoggedIn(true)} />;
  }

  if (currentPage === 'profile') {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-[375px] bg-gradient-to-b from-blue-100/30 via-blue-50/20 to-white min-h-screen flex flex-col relative">
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-gray-800 text-sm z-10">
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
                onClick={() => setCurrentPage('checkInRecords')}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-100"
              >
                <div className="flex items-center gap-3.5">
                  <ImageIcon className="w-5 h-5 text-gray-900" strokeWidth={2} />
                  <span className="text-base text-gray-900">打卡记录</span>
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
                onClick={() => setCurrentPage('marathonList')}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-100"
              >
                <div className="flex items-center gap-3.5">
                  <Code className="w-5 h-5 text-gray-900" strokeWidth={2} />
                  <span className="text-base text-gray-900">马拉松集成演示</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" strokeWidth={2} />
              </button>

              <button
                onClick={() => setCurrentPage('scenicList')}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-100"
              >
                <div className="flex items-center gap-3.5">
                  <svg className="w-5 h-5 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                    <polyline points="9 22 9 12 15 12 15 22"></polyline>
                  </svg>
                  <span className="text-base text-gray-900">景区集成演示</span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" strokeWidth={2} />
              </button>

              <button
                onClick={() => setCurrentPage('amusementParkList')}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-100"
              >
                <div className="flex items-center gap-3.5">
                  <svg className="w-5 h-5 text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="2" />
                    <path d="M12 2v4m0 12v4M2 12h4m12 0h4" />
                    <circle cx="12" cy="12" r="8" />
                  </svg>
                  <span className="text-base text-gray-900">游乐园集成演示</span>
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

        <div className="flex-1 pb-[56px]">
          <div className="relative">
            <img
              src="/image copy.png"
              alt="Mountain view"
              className="w-full h-56 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-white"></div>
          </div>

          {referralData && (
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500 mx-6 mt-4 p-4 rounded-r-xl shadow-sm">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: '#5B6FED' }}>
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="text-sm font-semibold text-gray-900 mb-1">来自 {referralData.eventName}</p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        赛事信息已自动填入，请继续完成天气保障流程
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const marathon = marathonEvents.find(e => e.id === referralData.source);
                      if (marathon) {
                        setSelectedMarathon(marathon);
                        setReferralData(null);
                        setCurrentPage('marathonPayment');
                      }
                    }}
                    className="mt-2 text-xs font-medium flex items-center gap-1 hover:underline"
                    style={{ color: '#5B6FED' }}
                  >
                    <ArrowLeft className="w-3 h-3" />
                    返回{referralData.eventName}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="px-6 pt-8 pb-6 space-y-10 bg-white">
            <div className="flex justify-start pl-1">
              <img src="/image copy copy.png" alt="陪你天气" className="h-10" />
            </div>

            <div className="space-y-2 pl-1">
              <div className="text-sm text-gray-500">目的地</div>
              {referralData ? (
                <div className="relative">
                  <div className="border-b border-gray-300 pb-3 flex items-center justify-between">
                    <span className="text-base text-gray-900 font-medium">{referralData.location}</span>
                    <Lock className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="absolute -bottom-5 left-0 text-xs text-gray-500 flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    <span>此信息由赛事方提供，不可修改</span>
                  </div>
                </div>
              ) : (
                <div className="border-b border-gray-200 pb-3"></div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 pl-1">
              <div className="space-y-2">
                <div className="text-sm text-gray-500">开始日期</div>
                {referralData ? (
                  <div className="relative">
                    <div className="border-b border-gray-300 pb-3 flex items-center justify-between">
                      <span className="text-sm text-gray-900 font-medium">{referralData.startDate}</span>
                      <Lock className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                  </div>
                ) : (
                  <div className="border-b border-gray-200 pb-3"></div>
                )}
              </div>
              <div className="space-y-2">
                <div className="text-sm text-gray-500">结束日期</div>
                {referralData ? (
                  <div className="relative">
                    <div className="border-b border-gray-300 pb-3 flex items-center justify-between">
                      <span className="text-sm text-gray-900 font-medium">{referralData.endDate}</span>
                      <Lock className="w-3.5 h-3.5 text-gray-400" />
                    </div>
                  </div>
                ) : (
                  <div className="border-b border-gray-200 pb-3"></div>
                )}
              </div>
            </div>

            <div className="space-y-2 pl-1">
              <div className="text-sm text-gray-500">每日行程费用</div>
              {referralData ? (
                <div className="relative">
                  <div className="border-b border-gray-300 pb-3 flex items-center justify-between">
                    <span className="text-base text-gray-900 font-medium">¥{referralData.amount}</span>
                    <Lock className="w-4 h-4 text-gray-400" />
                  </div>
                </div>
              ) : (
                <div className="border-b border-gray-200 pb-3"></div>
              )}
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
                <rect x="3" y="3" width="7" height="7" rx="1" fill="#5B6FED" />
                <rect x="14" y="3" width="7" height="7" rx="1" fill="#5B6FED" />
                <rect x="3" y="14" width="7" height="7" rx="1" fill="#5B6FED" />
                <rect x="14" y="14" width="7" height="7" rx="1" fill="#5B6FED" />
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
            <button
              onClick={() => {
                setPreselectedOrderId('');
                setCurrentPage('camera');
              }}
              className="flex flex-col items-center justify-center py-1 px-6 text-center"
            >
              <Camera className="w-6 h-6 mb-1 text-gray-400" />
              <span className="text-xs text-gray-400">相机</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


function getTripDateStrings(startDateStr: string, days: number): string[] {
  const dates: string[] = [];
  const currentYear = new Date().getFullYear();

  const start = parseDateStub(startDateStr, currentYear);
  if (!start) return [];

  const current = new Date(start);
  for (let i = 0; i < days; i++) {
    const m = current.getMonth() + 1;
    const d = current.getDate();
    dates.push(`${m.toString().padStart(2, '0')}月${d.toString().padStart(2, '0')}日`);
    current.setDate(current.getDate() + 1);
  }

  return dates;
}

function parseDateStub(str: string, year: number): Date | null {
  const match = str.match(/(\d+)月(\d+)日/);
  if (!match) return null;
  const month = parseInt(match[1]) - 1;
  const day = parseInt(match[2]);

  // Handle overlap year case briefly if needed, but for now strict
  // If parsing logic needs to be smarter about year boundaries (e.g. Dec -> Jan), 
  // it would need more context, but assuming linear progression from start date is fine.

  return new Date(year, month, day);
}

export default App;
