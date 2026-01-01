import { useState, useEffect } from 'react';
import { ArrowLeft, Check, User, CloudRain, Sun, AlertCircle, X, MoreVertical, ChevronRight, ChevronDown, ChevronUp, Shield, HelpCircle, MessageCircle, FileText, Info, Lock, Code, Image as ImageIcon, Copy, Gift, Home, Briefcase, Clock, Search, MapPin, Sparkles, Zap, CloudSun, Calendar, Users, Star, Navigation, Minus, Plus } from 'lucide-react';
import AboutPage from './AboutPage';
import Tooltip from './Tooltip';
import MarathonListPage from './MarathonListPage';
import MarathonPaymentPage from './MarathonPaymentPage';
import LoginPage from './LoginPage';
import { MarathonEvent, ReferralData } from './marathonData';
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
import ChatAssistant from './ChatAssistant';


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

function parseDateStub(str: string, year: number): Date | null {
  const match = str.match(/(\d+)月(\d+)日/);
  if (!match) return null;
  const month = parseInt(match[1]) - 1;
  const day = parseInt(match[2]);
  return new Date(year, month, day);
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

function getWeekday(dateStr: string): string {
  const currentYear = new Date().getFullYear();
  const date = parseDateStub(dateStr, currentYear);
  if (!date) return '';
  const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
  return weekdays[date.getDay()];
}

const trips: Trip[] = [
  {
    id: 'MHNEW20251229',
    location: '哈尔滨冰雪大世界',
    startDate: '12月28日',
    endDate: '01月03日',
    days: 7,
    status: '保障中',
    statusColor: 'bg-primary-100 text-primary-600',
    dailyPrice: 280,
    serviceFee: 25.00,
    totalAmount: 25.00,
    totalCompensation: 0,
    weatherData: [
      { date: '12月28日', status: '已补偿', rained: true, hours: 5, amount: 200, paidAt: '12月29日 10:00' },
      { date: '12月29日', status: '待补偿', rained: true, hours: 4, amount: 200 },
      { date: '12月30日', status: '确认中', rained: true, hours: 3.5 },
      { date: '12月31日', status: '未达标', rained: true, hours: 2 },
      { date: '01月01日', status: '待补偿', rained: true, hours: 4.5, amount: 200 },
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
    statusColor: 'bg-warning-100 text-warning-600',
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
    statusColor: 'bg-primary-100 text-primary-600',
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
    statusColor: 'bg-warning-100 text-warning-600',
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
    statusColor: 'bg-success-100 text-success-600',
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
    statusColor: 'bg-neutral-100 text-neutral-500',
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
  const [isLoggedIn, setIsLoggedIn] = useState(true);
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
  const [copyToast] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [animatedCompensation, setAnimatedCompensation] = useState(0);
  const [countdown, setCountdown] = useState(1800);

  // Animate compensation amount changes with spring-like easing
  useEffect(() => {
    if (!selectedTrip) return;
    const target = selectedTrip.totalCompensation;
    const current = animatedCompensation;

    if (current === target) return;

    const duration = 1200; // ms
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-out cubic for spring-like effect
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = current + (target - current) * eased;

      setAnimatedCompensation(value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setAnimatedCompensation(target);
      }
    };

    requestAnimationFrame(animate);
  }, [selectedTrip?.totalCompensation]);
  const [selectedMarathon, setSelectedMarathon] = useState<MarathonEvent | null>(null);
  const [referralData, setReferralData] = useState<ReferralData | null>(null);
  const [selectedScenic, setSelectedScenic] = useState<ScenicSpot | null>(null);
  const [scenicReferralData, setScenicReferralData] = useState<ScenicReferralData | null>(null);
  const [selectedAmusementPark, setSelectedAmusementPark] = useState<AmusementPark | null>(null);
  const [amusementParkReferralData, setAmusementParkReferralData] = useState<AmusementParkReferralData | null>(null);
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [preselectedOrderId, setPreselectedOrderId] = useState<string>('');
  const [searchStep, setSearchStep] = useState<'destination' | 'dates' | 'who' | 'amount' | null>(null);
  const [searchDestination, setSearchDestination] = useState('');
  const [searchDates, setSearchDates] = useState<{ start: Date | null; end: Date | null }>({ start: null, end: null });
  const [searchGuests, setSearchGuests] = useState({ adults: 0, children: 0, infants: 0, pets: 0 });
  const [searchDailyAmount, setSearchDailyAmount] = useState(100);
  const [homeScrollOffset, setHomeScrollOffset] = useState(0);
  const [activeCategory, setActiveCategory] = useState('名山大川');

  const CATEGORY_DATA: Record<string, { name: string; location: string; img: string; price: string; rating: number }[]> = {
    '名山大川': [
      { name: '黄山风景区', location: '安徽 · 黄山', img: 'https://images.unsplash.com/photo-1549693578-d683be217e58?auto=format&fit=crop&q=80&w=800', price: '¥25', rating: 4.8 },
      { name: '泰山风景名胜区', location: '山东 · 泰安', img: 'https://images.unsplash.com/photo-1544084944-15269ec7b5a0?auto=format&fit=crop&q=80&w=800', price: '¥22', rating: 4.7 },
      { name: '张家界国家森林公园', location: '湖南 · 张家界', img: 'https://images.unsplash.com/photo-1596701062351-8798e9b626d0?auto=format&fit=crop&q=80&w=800', price: '¥28', rating: 4.9 },
    ],
    '主题乐园': [
      { name: '上海迪士尼度假区', location: '上海 · 浦东', img: 'https://images.unsplash.com/photo-1505995433366-e12044405840?auto=format&fit=crop&q=80&w=800', price: '¥18', rating: 4.9 },
      { name: '北京环球度假区', location: '北京 · 通州', img: 'https://images.unsplash.com/photo-1626244199435-09511520199e?auto=format&fit=crop&q=80&w=800', price: '¥20', rating: 4.8 },
      { name: '广州长隆欢乐世界', location: '广东 · 广州', img: 'https://images.unsplash.com/photo-1596422846543-75c6fc183fdf?auto=format&fit=crop&q=80&w=800', price: '¥16', rating: 4.7 },
    ],
    '避寒圣地': [
      { name: '亚龙湾热带天堂森林公园', location: '海南 · 三亚', img: 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?auto=format&fit=crop&q=80&w=800', price: '¥30', rating: 4.9 },
      { name: '西双版纳热带植物园', location: '云南 · 景洪', img: 'https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?auto=format&fit=crop&q=80&w=800', price: '¥24', rating: 4.8 },
      { name: '北海涠洲岛', location: '广西 · 北海', img: 'https://images.unsplash.com/photo-1541414779316-956a5084c0d4?auto=format&fit=crop&q=80&w=800', price: '¥22', rating: 4.7 },
    ],
    '赛事保障': [
      { name: '上海国际马拉松', location: '上海 · 全城', img: 'https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?auto=format&fit=crop&q=80&w=800', price: '¥15', rating: 4.9 },
      { name: '北京马拉松', location: '北京 · 全城', img: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&q=80&w=800', price: '¥15', rating: 4.8 },
      { name: '厦门马拉松', location: '福建 · 厦门', img: 'https://images.unsplash.com/photo-1524628854695-1f9e83162b77?auto=format&fit=crop&q=80&w=800', price: '¥12', rating: 4.9 },
    ],
    '露营自驾': [
      { name: '川藏线 318 国道', location: '四川 - 西藏', img: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800', price: '¥35', rating: 4.9 },
      { name: '独库公路', location: '新疆 · 克拉玛依', img: 'https://images.unsplash.com/photo-1444491741275-3747c33cc99b?auto=format&fit=crop&q=80&w=800', price: '¥40', rating: 4.8 },
      { name: '呼伦贝尔草原', location: '内蒙古 · 海拉尔', img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800', price: '¥30', rating: 4.9 },
    ],
  };


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

  const renderSearchWizard = () => {
    if (!searchStep) return null;

    const handleNext = () => {
      if (searchStep === 'destination') setSearchStep('dates');
      else if (searchStep === 'dates') setSearchStep('who');
      else if (searchStep === 'who') setSearchStep('amount');
      else if (searchStep === 'amount') {
        setSearchStep(null);
        setCurrentPage('add');
      }
    };

    const handleBack = () => {
      if (searchStep === 'destination') setSearchStep(null);
      else if (searchStep === 'dates') setSearchStep('destination');
      else if (searchStep === 'who') setSearchStep('dates');
      else if (searchStep === 'amount') setSearchStep('who');
    };

    const updateGuestCount = (type: keyof typeof searchGuests, delta: number) => {
      setSearchGuests(prev => ({
        ...prev,
        [type]: Math.max(0, prev[type] + delta)
      }));
    };

    return (
      <div className="fixed inset-0 z-[100] bg-white animate-slide-up flex flex-col">
        {/* Top Navigation Bar (Mobile Airbnb Style) */}
        <div className="h-[72px] flex items-center justify-between px-6 pt-2">
          <div className="flex items-center gap-6">
            <button onClick={() => setSearchStep(null)} className="p-2 -ml-2 hover:bg-neutral-100 rounded-full transition-colors flex items-center justify-center border border-neutral-200">
              <X size={20} className="text-neutral-900" />
            </button>
            <div className="flex gap-10">
              <button
                className={`text-[16px] font-semibold transition-all relative pb-2 ${searchStep === 'destination' ? 'text-neutral-900' : 'text-neutral-400'}`}
                onClick={() => setSearchStep('destination')}
              >
                陪你保障
                {searchStep === 'destination' && <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-neutral-900 rounded-full"></div>}
              </button>
              <button
                className={`text-[16px] font-semibold transition-all relative pb-2 ${searchStep === 'dates' ? 'text-neutral-900' : 'text-neutral-400'}`}
                onClick={() => setSearchStep('dates')}
              >
                体验
                {searchStep === 'dates' && <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-neutral-900 rounded-full"></div>}
              </button>
              <button
                className={`text-[16px] font-semibold transition-all relative pb-2 ${searchStep === 'who' ? 'text-neutral-900' : 'text-neutral-400'}`}
                onClick={() => setSearchStep('who')}
              >
                服务
                {searchStep === 'who' && <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-neutral-900 rounded-full"></div>}
              </button>
            </div>
          </div>
        </div>

        {/* Selected Step Summary (When not active) */}
        <div className="px-6 py-2 space-y-3">
          {searchStep !== 'destination' && (
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100 flex items-center justify-between animate-fade-in">
              <span className="text-neutral-500 font-medium">地点</span>
              <span className="text-neutral-900 font-bold">{searchDestination || '添加目的地'}</span>
            </div>
          )}
          {searchStep !== 'dates' && searchStep !== 'destination' && (
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-100 flex items-center justify-between animate-fade-in">
              <span className="text-neutral-500 font-medium">时间</span>
              <span className="text-neutral-900 font-bold">{searchDates.start ? `${searchDates.start.toLocaleDateString()} - ${searchDates.end?.toLocaleDateString() || ''}` : '添加日期'}</span>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {searchStep === 'destination' && (
            <div className="animate-fade-in bg-white rounded-3xl p-6 shadow-xl border border-neutral-100">
              <h2 className="text-[32px] font-bold text-neutral-900 mb-6 font-display">要去哪里？</h2>
              <div className="relative mb-8">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-900" size={20} strokeWidth={2.5} />
                <input
                  type="text"
                  placeholder="搜索目的地"
                  value={searchDestination}
                  onChange={(e) => setSearchDestination(e.target.value)}
                  className="w-full bg-white h-14 rounded-2xl pl-12 pr-6 text-neutral-900 font-semibold border border-neutral-300 focus:border-neutral-900 transition-all outline-none text-lg"
                  autoFocus
                />
              </div>

              <div>
                <p className="text-[14px] font-bold text-neutral-900 mb-5">推荐目的地</p>
                <div className="space-y-6">
                  {[
                    { name: '附近', desc: '发现你周边的美景', icon: Navigation, bgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
                    { name: '上海迪士尼', desc: '热门旅游目的地', icon: MapPin, bgColor: 'bg-orange-50', iconColor: 'text-orange-600' },
                    { name: '黄山风景区', desc: '名山大川之首', icon: ImageIcon, bgColor: 'bg-emerald-50', iconColor: 'text-emerald-600' },
                    { name: '三亚湾', desc: '避寒圣地', icon: CloudSun, bgColor: 'bg-cyan-50', iconColor: 'text-cyan-600' },
                  ].map((dest) => (
                    <button
                      key={dest.name}
                      onClick={() => {
                        setSearchDestination(dest.name);
                        handleNext();
                      }}
                      className="w-full flex items-center gap-4 group active:scale-95 transition-all text-left"
                    >
                      <div className={`w-14 h-14 ${dest.bgColor} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                        <dest.icon size={24} className={dest.iconColor} />
                      </div>
                      <div>
                        <div className="font-bold text-neutral-900 text-lg">{dest.name}</div>
                        <div className="text-neutral-500 text-sm font-medium">{dest.desc}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {searchStep === 'dates' && (
            <div className="animate-fade-in bg-white rounded-3xl p-6 shadow-xl border border-neutral-100 h-full flex flex-col">
              <h2 className="text-[32px] font-bold text-neutral-900 mb-6 font-display">什么时候？</h2>

              {/* Tabs */}
              <div className="bg-neutral-100 p-1 rounded-full flex gap-1 mb-8">
                {['日期', '月份', '灵活'].map((tab) => (
                  <button
                    key={tab}
                    className={`flex-1 py-2.5 rounded-full text-sm font-bold transition-all ${tab === '日期' ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-900'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="flex-1 overflow-y-auto min-h-0">
                <div className="space-y-10">
                  {/* December 2025 */}
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-6">2025年 12月</h3>
                    <div className="grid grid-cols-7 gap-y-4 text-center">
                      {['日', '一', '二', '三', '四', '五', '六'].map(d => (
                        <span key={d} className="text-[12px] text-neutral-400 font-bold uppercase tracking-wider">{d}</span>
                      ))}
                      {Array.from({ length: 10 }).map((_, i) => <div key={`empty-${i}`}></div>)}
                      {Array.from({ length: 21 }).map((_, i) => {
                        const day = i + 11;
                        const isPast = day < 30;
                        const isSelected = searchDates.start?.getDate() === day && searchDates.start?.getMonth() === 11;
                        const isEnd = searchDates.end?.getDate() === day && searchDates.end?.getMonth() === 11;
                        return (
                          <button
                            key={day}
                            onClick={() => {
                              if (!searchDates.start || (searchDates.start && searchDates.end)) {
                                setSearchDates({ start: new Date(2025, 11, day), end: null });
                              } else {
                                setSearchDates({ ...searchDates, end: new Date(2025, 11, day) });
                              }
                            }}
                            disabled={isPast}
                            className={`h-12 w-12 flex items-center justify-center rounded-full text-[14px] font-bold mx-auto transition-all relative
                              ${isPast ? 'text-neutral-200 line-through' : 'text-neutral-900 hover:bg-neutral-100'}
                              ${isSelected || isEnd ? 'bg-neutral-900 text-white !line-through-none' : ''}
                            `}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* January 2026 */}
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-6">2026年 1月</h3>
                    <div className="grid grid-cols-7 gap-y-4 text-center">
                      {['日', '一', '二', '三', '四', '五', '六'].map(d => (
                        <span key={d} className="text-[12px] text-neutral-400 font-bold uppercase tracking-wider">{d}</span>
                      ))}
                      {Array.from({ length: 4 }).map((_, i) => <div key={`empty-jan-${i}`}></div>)}
                      {Array.from({ length: 31 }).map((_, i) => {
                        const day = i + 1;
                        const isSelected = searchDates.start?.getDate() === day && searchDates.start?.getFullYear() === 2026;
                        const isEnd = searchDates.end?.getDate() === day && searchDates.end?.getFullYear() === 2026;
                        return (
                          <button
                            key={day}
                            onClick={() => {
                              if (!searchDates.start || (searchDates.start && searchDates.end)) {
                                setSearchDates({ start: new Date(2026, 0, day), end: null });
                              } else {
                                setSearchDates({ ...searchDates, end: new Date(2026, 0, day) });
                              }
                            }}
                            className={`h-12 w-12 flex items-center justify-center rounded-full text-[14px] font-bold mx-auto transition-all relative
                              ${isSelected || isEnd ? 'bg-neutral-900 text-white' : 'text-neutral-900 hover:bg-neutral-100'}
                            `}
                          >
                            {day}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>

              {/* Date Options */}
              <div className="flex gap-3 mt-6 overflow-x-auto pb-2 no-scrollbar">
                {['精确日期', '± 1天', '± 2天', '± 3天'].map((opt) => (
                  <button key={opt} className={`px-5 py-2.5 rounded-full border border-neutral-200 text-sm font-bold whitespace-nowrap active:scale-95 transition-all ${opt === '精确日期' ? 'bg-neutral-900 text-white border-neutral-900' : 'bg-white text-neutral-900'}`}>
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {searchStep === 'who' && (
            <div className="animate-fade-in bg-white rounded-3xl p-8 shadow-xl border border-neutral-100">
              <h2 className="text-[32px] font-bold text-neutral-900 mb-10 font-display">谁去？</h2>
              <div className="space-y-10">
                {[
                  { label: '成人', sub: '13岁或以上', type: 'adults' as const },
                  { label: '儿童', sub: '2-12岁', type: 'children' as const },
                  { label: '婴儿', sub: '2岁以下', type: 'infants' as const },
                  { label: '宠物', sub: '携带服务犬？', type: 'pets' as const },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between">
                    <div>
                      <div className="text-xl font-bold text-neutral-900">{item.label}</div>
                      <div className="text-neutral-500 font-medium">{item.sub}</div>
                    </div>
                    <div className="flex items-center gap-6">
                      <button
                        onClick={() => updateGuestCount(item.type, -1)}
                        className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${searchGuests[item.type] > 0 ? 'border-neutral-400 text-neutral-900 hover:border-neutral-900' : 'border-neutral-100 text-neutral-200 cursor-not-allowed'}`}
                      >
                        <Minus size={20} />
                      </button>
                      <span className="text-xl font-bold w-4 text-center">{searchGuests[item.type]}</span>
                      <button
                        onClick={() => updateGuestCount(item.type, 1)}
                        className="w-10 h-10 rounded-full border border-neutral-400 text-neutral-900 flex items-center justify-center hover:border-neutral-900 transition-all"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {searchStep === 'amount' && (
            <div className="animate-fade-in bg-white rounded-3xl p-8 shadow-xl border border-neutral-100">
              <h2 className="text-[32px] font-bold text-neutral-900 mb-10 font-display">每人每日预算？</h2>
              <div className="text-center">
                <p className="text-[64px] font-bold text-neutral-900 mb-2 leading-tight">¥{searchDailyAmount}</p>
                <p className="text-neutral-500 font-medium text-lg mb-12">建议根据您的门票和房费设定</p>

                <input
                  type="range"
                  min="50"
                  max="5000"
                  step="50"
                  value={searchDailyAmount}
                  onChange={(e) => setSearchDailyAmount(parseInt(e.target.value))}
                  className="w-full h-3 bg-neutral-100 rounded-full appearance-none cursor-pointer accent-neutral-900 mb-8"
                />

                <div className="flex justify-between text-sm font-bold text-neutral-400">
                  <span>¥50</span>
                  <span>¥5000+</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="p-6 pb-12 border-t border-neutral-100 bg-white flex items-center justify-between">
          <button
            onClick={() => {
              if (searchStep === 'destination') setSearchStep(null);
              else {
                setSearchDates({ start: null, end: null });
                setSearchGuests({ adults: 0, children: 0, infants: 0, pets: 0 });
                setSearchDestination('');
              }
            }}
            className="text-neutral-900 font-bold hover:underline opacity-80"
          >
            {searchStep === 'destination' ? '取消' : '全部清除'}
          </button>
          <button
            onClick={handleNext}
            className="bg-[#E31C5F] text-white px-10 py-4 rounded-2xl font-bold flex items-center gap-3 active:scale-95 transition-all shadow-lg hover:bg-[#D70466] disabled:opacity-50 disabled:bg-neutral-300"
            disabled={searchStep === 'destination' && !searchDestination}
          >
            {searchStep === 'amount' ? (
              <>
                <Search size={20} strokeWidth={3} />
                <span>立即搜索</span>
              </>
            ) : (
              <span>继续</span>
            )}
          </button>
        </div>
      </div>
    );
  };

  const renderBottomNav = () => {
    const isHome = currentPage === 'home';
    const isTrips = currentPage === 'trips' || currentPage === 'tripDetail';
    const isCamera = currentPage === 'camera' || currentPage === 'checkInRecords';
    const isProfile = currentPage === 'profile';

    const items = [
      { id: 'nav-home', page: 'home', icon: Home, label: '首页', isActive: isHome },
      { id: 'nav-trips', page: 'trips', icon: Briefcase, label: '旅程', isActive: isTrips },
      { id: 'nav-camera', page: 'camera', icon: Clock, label: '记录', isActive: isCamera },
      { id: 'nav-profile', page: 'profile', icon: User, label: '我的', isActive: isProfile }
    ];

    return (
      <div className="sticky bottom-0 w-full bg-white/95 backdrop-blur-sm border-t border-neutral-100 z-50 px-8 py-2">
        <div className="flex items-center justify-between">
          {items.map((item) => (
            <button
              key={item.id}
              id={item.id}
              onClick={() => {
                if (item.page === 'camera') setPreselectedOrderId('');
                setCurrentPage(item.page as Page);
              }}
              className={`transition-all duration-300 ease-spring flex items-center gap-1.5 ${item.isActive
                ? 'bg-neutral-900 text-white px-3.5 py-1.5 rounded-full shadow-sm'
                : 'text-neutral-400 p-2 hover:bg-neutral-50 rounded-full'
                }`}
            >
              <item.icon size={20} strokeWidth={item.isActive ? 2.5 : 2} />
              {item.isActive && (
                <span className="text-xs font-bold tracking-tight animate-fade-in whitespace-nowrap">
                  {item.label}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    );
  };

  if (currentPage === 'trips') {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center py-10">
        <div className="w-[375px] h-[812px] bg-neutral-50 flex flex-col relative shadow-2xl overflow-hidden rounded-[30px] ring-8 ring-black">
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-neutral-800 text-body z-10">
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
                  className="p-2 -ml-2 hover:bg-neutral-100 rounded-full transition-colors"
                >
                  <ArrowLeft className="w-7 h-7 text-neutral-800" strokeWidth={2} />
                </button>
                <h1 className="text-h1 text-neutral-900">我的保障</h1>
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

          <div className="flex-1 overflow-y-auto bg-neutral-50 px-6 pb-24">
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
                      <div className="text-h3 text-neutral-900 mb-1">{trip.location}</div>
                      <div className="text-caption text-neutral-500 font-medium">订单号 {trip.id}</div>
                    </div>
                    <span className={`text-xs px-3 py-1.5 rounded-full font-semibold whitespace-nowrap ${trip.statusColor}`}>{trip.status}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-body text-neutral-700 font-medium mb-0.5">{trip.startDate} - {trip.endDate}</div>
                      <div className="text-caption text-neutral-500">共{trip.days}天</div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-neutral-400" />
                  </div>
                </button>
              ))}
            </div>
          </div>
          {renderBottomNav()}
        </div>
      </div>
    );
  }

  if (currentPage === 'tripDetail') {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center py-10">
        <div className="w-[375px] h-[812px] bg-neutral-50 flex flex-col relative shadow-2xl overflow-hidden rounded-[30px] ring-8 ring-black">
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-neutral-800 text-body z-10">
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
                <button onClick={() => setCurrentPage('trips')} className="p-1 hover:bg-neutral-100 rounded-full transition-colors">
                  <ArrowLeft className="w-5 h-5 text-neutral-800" />
                </button>
                <h1 className="text-h4 text-neutral-900">订单详情</h1>
              </div>
              {(selectedTrip?.status === '已支付' || selectedTrip?.status === '保障中' || selectedTrip?.status === '结算中' || selectedTrip?.status === '已完成') && (
                <div className="relative">
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="p-1 hover:bg-neutral-100 rounded-full transition-colors"
                  >
                    <MoreVertical className="w-5 h-5 text-neutral-600" />
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
                            className="w-full px-4 py-3 text-body text-left text-neutral-700 hover:bg-neutral-50 transition-colors"
                          >
                            申请退款
                          </button>
                        )}
                        <button
                          onClick={() => {
                            setShowMenu(false);
                            alert('联系客服');
                          }}
                          className="w-full px-4 py-3 text-body text-left text-neutral-700 hover:bg-neutral-50 transition-colors"
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

          <div className="flex-1 overflow-y-auto bg-neutral-50 px-4 pb-8">
            {selectedTrip && (
              <>
                <div className="rounded-[24px] mt-3 shadow-xl ring-1 ring-black/5 relative overflow-hidden bg-white">
                  {/* Top Section: Pastel Card Style */}
                  {/* Top Section: Pastel Card Style */}
                  <div className="bg-orange-50 p-6 pb-6 relative">
                    {/* Status Pill - Moved Out for Alignment */}
                    <div className="relative z-10">
                      <div className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-2.5 py-0.5 rounded-full shadow-sm mb-3">
                        <div className={`w-1.5 h-1.5 rounded-full ${selectedTrip.status === '保障中' ? 'bg-orange-500' : 'bg-neutral-400'}`}></div>
                        <span className={`text-[11px] font-bold ${selectedTrip.status === '保障中' ? 'text-orange-600' : 'text-neutral-500'}`}>
                          {selectedTrip.status}
                        </span>
                      </div>
                    </div>

                    <div className="flex justify-between items-start">
                      <div className="flex-1 z-10">
                        {/* Title */}
                        <div className="text-xl font-bold text-neutral-900 mb-3 leading-tight tracking-tight">
                          {selectedTrip.location}
                        </div>

                        {/* Date & Info Block with Vertical Bar */}
                        <div className="flex items-start gap-4 border-l-4 border-orange-200 pl-3 py-0.5">
                          <div className="space-y-1">
                            <div className="text-neutral-700 font-medium text-sm leading-none">
                              {selectedTrip.startDate.replace('月', '.').replace('日', '')}至{selectedTrip.endDate.replace('月', '.').replace('日', '')} {selectedTrip.days}天{selectedTrip.days - 1}晚
                            </div>
                            <div className="text-xs text-neutral-400 font-medium tracking-wide">
                              订单号 {selectedTrip.id}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Image - Default Photo */}
                      <div className="ml-4 shrink-0">
                        <img
                          src="/harbin_ice.png"
                          alt="Harbin Ice World"
                          className="w-20 h-20 rounded-xl object-cover shadow-sm ring-2 ring-white/50"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Ticket Divider */}
                  <div className="relative h-4 bg-white -mt-0">
                    <div className="absolute top-0 left-0 right-0 h-4 bg-orange-50 rounded-br-3xl rounded-bl-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-full border-t-2 border-dashed border-neutral-100"></div>
                    {/* Punch Holes - White background to mask */}
                    <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-neutral-100 rounded-full z-20"></div>
                    <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-neutral-100 rounded-full z-20"></div>
                  </div>

                  {/* Financial Ticket Stub */}
                  <div className="p-5 pt-4 flex items-center justify-between bg-white relative z-10">
                    <div>
                      <div className="text-caption text-neutral-400 mb-0.5 font-medium">总补偿金额</div>
                      <div className="text-3xl font-bold text-orange-600 tracking-tight">
                        {Math.round(animatedCompensation)} <span className="text-base font-medium text-neutral-400">元</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-caption text-neutral-400 mb-0.5 font-medium">保障费用</div>
                      <div className="text-body text-neutral-900 font-semibold text-lg">{selectedTrip.serviceFee}<span className="text-sm font-normal text-neutral-400 ml-0.5">元</span></div>
                    </div>
                  </div>
                </div>

                {(selectedTrip.status === '已支付' || selectedTrip.status === '保障中' || selectedTrip.status === '结算中' || selectedTrip.status === '已完成') && (
                  <div className="mt-10 px-2">
                    <div className="flex items-center gap-2 mb-4 px-1">
                      <div className="flex-1 h-1 bg-neutral-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary-500 rounded-full transition-all duration-1000 ease-out"
                          style={{ width: `${(selectedTrip.weatherData.filter(d => d.status !== '待开始').length / selectedTrip.days) * 100}%` }}
                        />
                      </div>
                      <button
                        onClick={() => setShowRules(!showRules)}
                        className="flex items-center gap-2 group/rules transition-all active:scale-95 cursor-pointer"
                      >
                        <div className="flex items-center gap-1">
                          <span className="text-[11px] font-black text-neutral-800 tracking-tighter">
                            {selectedTrip.weatherData.filter(d => d.status !== '待开始').length}/{selectedTrip.days}
                          </span>
                          <div className={`transition-transform duration-300 ${showRules ? 'rotate-180 text-primary-500' : 'text-neutral-400 group-hover/rules:text-primary-400'}`}>
                            <ChevronDown className="w-4 h-4" />
                          </div>
                        </div>
                        <span className="text-xs font-bold text-neutral-400 tracking-wider group-hover/rules:text-primary-500 transition-colors">保障进度</span>
                      </button>
                    </div>

                    {showRules && (
                      <div className="mb-4 bg-primary-50/50 rounded-2xl p-4 border border-primary-100/30 animate-in slide-in-from-top-2 fade-in duration-300 ease-out overflow-hidden relative">
                        <div className="absolute top-0 right-0 p-3 opacity-10">
                          <HelpCircle className="w-12 h-12 text-primary-500" />
                        </div>
                        <div className="space-y-3 relative z-10">
                          <div className="flex items-start gap-2.5">
                            <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-primary-400"></div>
                            <p className="text-sm text-neutral-600 leading-relaxed font-medium">
                              每天下雨满 <span className="font-bold text-primary-600">4 小时</span>，即可获得 <span className="font-bold text-primary-600">2 元/天</span> 补偿
                            </p>
                          </div>
                          <div className="flex items-start gap-2.5">
                            <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-primary-400"></div>
                            <p className="text-sm text-neutral-600 leading-relaxed font-medium">
                              降雨强度达到 <span className="font-bold text-primary-600">1.5 mm/h</span> 为达标标准（地面有明显降雨感）
                            </p>
                          </div>
                          <div className="flex items-start gap-2.5">
                            <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 bg-primary-400"></div>
                            <p className="text-sm text-neutral-600 leading-relaxed font-medium">
                              补偿奖励将通过短信或钱包通知，请注意查收。
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-4 px-1">
                      <div className="flex gap-10 ml-1">
                        <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">日期</span>
                        <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest">动态</span>
                      </div>
                    </div>

                    <div className="space-y-4">
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

                        return groups.map((g, idx) => {
                          const isLast = idx === groups.length - 1;

                          if (g.type === 'processed' && g.data) {
                            const day = g.data;
                            const isExpanded = expandedDates.has(day.date);
                            const isToday = day.status === '保障中';
                            const weekday = getWeekday(day.date);
                            const formattedDate = day.date.replace('月', '.').replace('日', '');

                            let cardBg = '';
                            let accentColor = '';
                            let titleColor = 'text-neutral-900';
                            let subtitleColor = 'text-neutral-500';

                            switch (day.status) {
                              case '已补偿':
                                cardBg = 'bg-[#EDFBF5]';
                                accentColor = 'text-[#10B981]';
                                break;
                              case '待补偿':
                                cardBg = 'bg-[#F2F4FF]';
                                accentColor = 'text-[#5B6FED]';
                                break;
                              case '保障中':
                                cardBg = 'bg-[#FFF9F2]';
                                accentColor = 'text-[#F97316]';
                                break;
                              default:
                                cardBg = 'bg-white';
                                accentColor = 'text-neutral-400';
                            }

                            return (
                              <div key={idx} className="flex gap-2 relative pb-5 w-full overflow-hidden">
                                {/* Date Column */}
                                <div className="w-12 flex flex-col items-center shrink-0 pt-0.5">
                                  <span className={`text-lg font-black leading-tight tabular-nums ${isToday ? 'text-primary-500' : 'text-neutral-800'}`}>
                                    {formattedDate}
                                  </span>
                                  <span className={`text-[11px] font-bold tracking-wide ${isToday ? 'text-primary-400' : 'text-neutral-400'}`}>{weekday}</span>
                                </div>

                                {/* Timeline Line */}
                                <div className="relative flex flex-col items-center px-1">
                                  <div className={`w-[1px] h-full ${isLast && !isExpanded ? 'bg-gradient-to-b from-primary-400 to-transparent' : 'bg-primary-300'} absolute top-1.5`}></div>
                                  <div className={`w-2.5 h-2.5 rounded-full border-2 bg-white z-10 mt-2 transition-all duration-300 ${day.status === '已补偿' || day.status === '待补偿' ? 'border-[#5B6FED]' : day.status === '保障中' ? 'border-[#F97316]' : 'border-primary-300'}`}></div>
                                </div>

                                {/* Event Card */}
                                <div
                                  className={`flex-1 min-w-0 rounded-xl ${cardBg} p-3 transition-all duration-300 active:scale-[0.98] cursor-pointer relative shadow-md shadow-neutral-200/50 hover:shadow-lg hover:shadow-neutral-300/50 ${isToday ? 'ring-2 ring-primary-500/10' : ''}`}
                                  onClick={() => toggleDate(day.date)}
                                >
                                  {isToday && (
                                    <div className="absolute top-1.5 right-1.5 flex items-center gap-1.5">
                                      <div className="w-1.5 h-1.5 rounded-full bg-primary-500 animate-pulse"></div>
                                      <div className="bg-primary-500 text-white text-[7px] font-black px-1.5 py-0.5 rounded uppercase tracking-tighter">今日</div>
                                    </div>
                                  )}

                                  <div className="flex items-center gap-3">
                                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${cardBg === 'bg-white' ? 'bg-neutral-50' : 'bg-white/90 shadow-sm'} ${accentColor}`}>
                                      {day.status === '待补偿' ? <Gift className="w-4 h-4" /> : day.rained ? <CloudRain className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
                                    </div>
                                    <div className="flex-1 min-w-0 pr-6">
                                      <div className={`text-[11px] font-bold uppercase tracking-wider mb-0.5 ${subtitleColor}`}>
                                        {day.status}
                                      </div>
                                      <div className={`text-sm font-bold truncate ${titleColor}`}>
                                        {day.status === '已补偿' ? `已获得补偿 ¥${day.amount}` : day.status === '待补偿' ? '符合条件，请点击领取' : day.status === '保障中' ? '降雨持续监测中' : '当日降雨未达补偿标准'}
                                      </div>
                                    </div>
                                    <MoreVertical className="w-4 h-4 text-neutral-300 shrink-0" />
                                  </div>

                                  {isExpanded && (
                                    <div className="mt-4 pt-4 border-t border-black/5 animate-in slide-in-from-top-1 duration-200">
                                      <div className="space-y-3">
                                        <p className="text-sm text-neutral-600 leading-relaxed font-medium">
                                          {day.status === '已补偿' ? `由于降雨时长已达标，补贴金¥${day.amount}已发放到账。` : day.status === '待补偿' ? '系统已确认当日降雨符合补偿标准，可立即领取奖金。' : '如降雨强度达到1.5mm/h并持续4小时，系统将自动核算。'}
                                        </p>

                                        {day.status === '待补偿' && (
                                          <button
                                            className="w-full bg-[#5B6FED] text-white py-2 rounded-xl font-black text-[10px] shadow-lg shadow-[#5B6FED]/30 active:scale-95 transition-all tracking-[0.05em]"
                                            onClick={(e) => {
                                              e.stopPropagation();
                                              const updatedWeatherData = selectedTrip.weatherData.map(d =>
                                                d.date === day.date ? { ...d, status: '已补偿' as const } : d
                                              );
                                              setSelectedTrip({
                                                ...selectedTrip,
                                                totalCompensation: selectedTrip.totalCompensation + (day.amount || 0),
                                                weatherData: updatedWeatherData
                                              });
                                            }}
                                          >
                                            立即领取 ¥{day.amount}
                                          </button>
                                        )}

                                        {day.hours !== undefined && (
                                          <div className="flex justify-between items-center bg-black/5 p-2 px-3 rounded-lg">
                                            <span className="text-xs font-bold text-neutral-400 tracking-wider">累计降雨时长</span>
                                            <span className="text-sm font-black text-neutral-800 tabular-nums">{day.hours}h</span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          } else if (g.type === 'pending' && g.dates) {
                            const pendingKey = `pending-${g.dates[0]}`;
                            const isPendingExpanded = expandedDates.has(pendingKey);
                            const firstDate = g.dates[0].replace('月', '.').replace('日', '');
                            const lastDate = g.dates[g.dates.length - 1].replace('月', '.').replace('日', '');
                            const weekday = getWeekday(g.dates[0]);

                            return (
                              <div key={idx} className="flex gap-2 relative pb-5 opacity-70 w-full overflow-hidden">
                                {/* Date Column */}
                                <div className="w-12 flex flex-col items-center shrink-0 pt-0.5">
                                  <span className="text-xs font-black text-neutral-400 leading-tight tabular-nums">
                                    {g.dates.length > 1 ? `${firstDate}-${lastDate}` : firstDate}
                                  </span>
                                  <span className="text-[11px] font-bold text-neutral-300 tracking-wide">{weekday}</span>
                                </div>

                                {/* Timeline Line */}
                                <div className="relative flex flex-col items-center px-1">
                                  <div className="w-[1px] h-full border-l border-dashed border-neutral-200 absolute top-1.5"></div>
                                  <div className="w-2 rounded-full bg-neutral-100 z-10 mt-2 h-2"></div>
                                </div>

                                {/* Event Card */}
                                <div
                                  className={`flex-1 min-w-0 rounded-xl bg-white/60 p-3 cursor-pointer shadow-sm shadow-neutral-100/50 hover:bg-white hover:shadow-md transition-all`}
                                  onClick={() => toggleDate(pendingKey)}
                                >
                                  <div className="flex items-center justify-between">
                                    <div className="flex-1 min-w-0 pr-4">
                                      <div className="text-[11px] font-bold text-neutral-300 uppercase tracking-wider mb-0.5">待开始</div>
                                      <div className="text-sm font-bold text-neutral-300 truncate tracking-tight">
                                        {g.dates.length > 1 ? `${g.dates.length}天的行程尚未开始` : '行程尚未开始'}
                                      </div>
                                    </div>
                                    <ChevronRight className={`w-3.5 h-3.5 text-neutral-200 transition-transform ${isPendingExpanded ? 'rotate-90' : ''}`} />
                                  </div>
                                  {isPendingExpanded && (
                                    <div className="mt-2 text-[10px] font-bold text-neutral-300 uppercase tracking-widest">
                                      {g.dates.length > 1 ? `保障计划将按日期自动开启` : '保障将于当日 08:00 开始'}
                                    </div>
                                  )}
                                </div>
                              </div>
                            );
                          }
                          return null;
                        });
                      })()}
                    </div>
                  </div>
                )}

                {/* Progress Info Modal removed */}

                {/* Copy Toast */}
                {copyToast && (
                  <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-neutral-800 text-white px-4 py-2 rounded-lg shadow-lg text-body-sm animate-fade-in">
                    已复制
                  </div>
                )}


              </  >
            )}
          </div>

          {
            selectedTrip?.status === '待支付' && (
              <div className="fixed bottom-0 w-[375px] bg-white border-t border-neutral-200 px-4 py-3 shadow-lg">
                <button
                  onClick={() => alert('跳转支付页面')}
                  className="w-full py-3 rounded-xl text-white font-semibold transition-all hover:opacity-90 bg-primary-500"
                >
                  立即支付 ¥{selectedTrip.totalAmount}
                </button>
              </div>
            )
          }

          {
            showRefundModal && (
              <div className="fixed inset-0 z-50 flex items-end justify-center">
                <div
                  className="absolute inset-0 bg-black bg-opacity-50"
                  onClick={() => setShowRefundModal(false)}
                ></div>
                <div className="relative w-[375px] bg-white rounded-t-3xl p-6 animate-slide-up">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-h3 text-neutral-900">申请退款</h2>
                    <button
                      onClick={() => setShowRefundModal(false)}
                      className="p-1 hover:bg-neutral-100 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-neutral-500" />
                    </button>
                  </div>

                  <div className="bg-neutral-50 rounded-xl p-4 mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-body-sm text-neutral-600">订单号</span>
                      <span className="text-body-sm font-medium text-neutral-900">{selectedTrip?.id}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-body-sm text-neutral-600">地点</span>
                      <span className="text-body-sm text-neutral-900">{selectedTrip?.location}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-body-sm text-neutral-600">退款金额</span>
                      <span className="text-body-sm font-semibold text-primary-500">
                        ¥{selectedTrip?.totalAmount}
                      </span>
                    </div>
                  </div>

                  <div className="bg-primary-50 rounded-xl p-4 mb-6">
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                      <div className="text-body-sm text-neutral-700">
                        <p className="font-semibold text-neutral-900 mb-1">退款说明</p>
                        <p className="leading-relaxed">由于保障期尚未开始，退款将自动处理并在1-3个工作日内原路退回。</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowRefundModal(false)}
                      className="flex-1 py-3 rounded-xl border-2 border-neutral-200 text-neutral-700 font-semibold hover:bg-neutral-50 transition-colors"
                    >
                      取消
                    </button>
                    <button
                      onClick={() => {
                        setShowRefundModal(false);
                        alert('退款成功！款项将在1-3个工作日内退回');
                      }}
                      className="flex-1 py-3 rounded-xl text-white font-semibold transition-all hover:opacity-90 bg-primary-500"
                    >
                      确认退款
                    </button>
                  </div>
                </div>
              </div>
            )
          }
        </div >
      </div >
    );
  }

  if (currentPage === 'add') {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <div className="w-[375px] bg-neutral-50 min-h-screen flex flex-col relative">
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-neutral-800 text-body z-10">
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
                <button onClick={() => setCurrentPage('home')} className="p-1 hover:bg-neutral-100 rounded-full transition-colors">
                  <ArrowLeft className="w-5 h-5 text-neutral-800" />
                </button>
                <h1 className="text-h4 text-neutral-900">添加天气服务</h1>
              </div>
              <button className="p-1 hover:bg-neutral-100 rounded-full transition-colors">
                <svg className="w-5 h-5 text-neutral-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                <span className="text-body-sm text-neutral-900 font-medium">
                  {searchDates.start ? `${searchDates.start.getMonth() + 1}月${searchDates.start.getDate()}日` : (referralData ? referralData.startDate : '11月6日')}
                </span>
                <span className="text-neutral-400">→</span>
                <span className="text-body-sm text-neutral-900 font-medium">
                  {searchDates.end ? `${searchDates.end.getMonth() + 1}月${searchDates.end.getDate()}日` : (referralData ? referralData.endDate : '11月7日')}
                </span>
                <span className="ml-auto text-body-sm font-medium text-neutral-900">
                  {searchDates.start && searchDates.end
                    ? `${Math.ceil((searchDates.end.getTime() - searchDates.start.getTime()) / (1000 * 60 * 60 * 24))}天`
                    : '1晚'}
                </span>
                {referralData && <Lock className="w-4 h-4 text-neutral-400 ml-2" />}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-h4 text-neutral-900 font-medium">{searchDestination || (referralData ? referralData.location : '北京市朝阳区')}</span>
                <span className="text-body-sm text-neutral-500">每日行程费用 ¥{searchDailyAmount || (referralData ? referralData.amount : '100')}</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl mx-4 mt-3 px-4 py-4 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-h4 font-semibold text-neutral-900">服务详情</h2>
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 flex-shrink-0 text-warning-500" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
                  </svg>
                  <span className="text-caption font-semibold text-warning-500">{formatCountdown(countdown)}</span>
                </div>
              </div>

              <div className="bg-primary-50 rounded-xl p-3.5">
                <p className="text-body-sm text-neutral-700 leading-relaxed mb-3">
                  陪你天气®将在您{referralData ? '比赛' : '行程'}期间每天监测天气预报。
                </p>
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bg-primary-500"></div>
                    <p className="text-body-sm text-neutral-700 leading-relaxed">
                      如果国家权威数据源显示<span className="font-semibold text-primary-500">{referralData ? '08:00-14:00' : '08:00-20:00'}</span>之间下雨<span className="font-semibold text-primary-500">2小时或以上</span>（{' '}
                      <Tooltip content="地面有小水坑的程度。">
                        <span className="font-semibold border-b border-dashed border-neutral-400 text-primary-500">≥1.50mm/h</span>
                      </Tooltip>
                      ）
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 bg-primary-500"></div>
                    <p className="text-body-sm text-neutral-700 leading-relaxed">
                      陪你天气®将向您退还<span className="font-semibold text-body-sm text-primary-500">{referralData ? referralData.compensationAmount : '100'}元</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl mx-4 mt-3 mb-4 px-4 py-4 shadow-sm">
              <h2 className="text-h4 font-semibold text-neutral-900 mb-3">联系信息</h2>

              <div className="space-y-3 mb-3">
                <div>
                  <label className="text-body-sm text-neutral-600 mb-1 block">姓名</label>
                  <input
                    type="text"
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="请输入姓名"
                    className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="text-body-sm text-neutral-600 mb-1 block">手机号码</label>
                  <input
                    type="tel"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="请输入手机号码"
                    className="w-full px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-body-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:bg-white transition-all"
                  />
                </div>
              </div>

              <div className="bg-primary-50 rounded-xl p-2.5 mb-2.5">
                <p className="text-caption text-neutral-600 leading-relaxed">
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
                    ? 'border-primary-500 bg-primary-500'
                    : 'border-neutral-300'
                    }`}>
                    {agreed && <Check className="w-3 h-3 text-white" />}
                  </div>
                </button>
                <div className="text-caption text-neutral-600 leading-relaxed">
                  我已阅读并同意
                  <button className="font-medium text-primary-600"> 《服务条款》</button>
                  和
                  <button className="font-medium text-primary-600">《隐私政策》</button>
                </div>
              </div>
            </div>
          </div>

          <div className="fixed bottom-0 w-[375px] bg-white border-t border-neutral-200 px-5 py-3 shadow-lg">
            <div className="flex items-center justify-between mb-2.5">
              <div className="flex items-baseline gap-2">
                <span className="text-body-sm text-neutral-600">服务费用</span>
                <span className="text-2xl font-bold text-neutral-900">¥{referralData ? referralData.weatherInsuranceFee.toFixed(2) : '0.20'}</span>
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
              <div className="text-caption text-neutral-500 space-y-0.5">
                <div className="flex justify-between">
                  <span>单价</span>
                  <span>¥{referralData ? referralData.weatherInsuranceFee.toFixed(2) : '0.1'}/天</span>
                </div>
                <div className="flex justify-between">
                  <span>天数</span>
                  <span>{referralData ? '1天' : '2天'}</span>
                </div>
                <div className="flex justify-between font-medium text-neutral-700">
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
              className="w-full text-white text-base font-semibold py-3 rounded-full transition-all shadow-sm active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed bg-primary-500"
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
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center py-10">
        <div className="w-[375px] h-[812px] bg-neutral-50 flex flex-col relative shadow-2xl overflow-hidden rounded-[30px] ring-8 ring-black">
          <div className="flex-1 overflow-y-auto">
            <CameraPage
              onBack={() => setCurrentPage('home')}
              preselectedOrderId={preselectedOrderId}
              trips={trips}
              onPhotoSaved={() => {
                setPreselectedOrderId('');
              }}
            />
          </div>
          {renderBottomNav()}
        </div>
      </div>
    );
  }

  if (currentPage === 'checkInRecords') {
    return (
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center py-10">
        <div className="w-[375px] h-[812px] bg-white flex flex-col relative shadow-2xl overflow-hidden rounded-[30px] ring-8 ring-black">
          <div className="flex-1 overflow-y-auto pb-20">
            <CheckInRecordsPage onBack={() => setCurrentPage('profile')} trips={trips} />
          </div>
          {renderBottomNav()}
        </div>
      </div>
    );
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
      <div className="min-h-screen bg-neutral-100 flex items-center justify-center py-10">
        <div className="w-[375px] h-[812px] bg-white flex flex-col relative shadow-2xl overflow-hidden rounded-[30px] ring-8 ring-black">
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-neutral-800 text-caption z-10">
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

          <div className="flex-1 overflow-y-auto bg-gradient-to-b from-primary-100/10 via-white to-white">
            <div className="px-6 pt-14 pb-6">
              <button
                onClick={() => setCurrentPage('trips')}
                className="p-2 -ml-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <ArrowLeft className="w-7 h-7 text-gray-800" strokeWidth={2} />
              </button>
            </div>

            <div className="flex flex-col items-center px-5 pb-10">
              <div className="w-28 h-28 rounded-full shadow-lg mb-4 overflow-hidden border-4 border-white">
                <img
                  src="/4c3b9c4f58ed2b07bd1cf80f69b1b28f.jpg"
                  alt="User Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-0">xy</h2>
            </div>

            <div className="px-6 pb-8">
              <div className="bg-white rounded-2xl shadow-sm border border-neutral-100 overflow-hidden">
                <button
                  onClick={() => alert('账号与安全功能即将推出')}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-50"
                >
                  <div className="flex items-center gap-3.5">
                    <User className="w-5 h-5 text-gray-900" strokeWidth={2} />
                    <span className="text-base text-gray-900">账号与安全</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" strokeWidth={2} />
                </button>

                <button
                  onClick={() => setCurrentPage('checkInRecords')}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-50"
                >
                  <div className="flex items-center gap-3.5">
                    <ImageIcon className="w-5 h-5 text-gray-900" strokeWidth={2} />
                    <span className="text-base text-gray-900">打卡记录</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" strokeWidth={2} />
                </button>

                <button
                  onClick={() => alert('和开发者聊聊')}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-50"
                >
                  <div className="flex items-center gap-3.5">
                    <MessageCircle className="w-5 h-5 text-gray-900" strokeWidth={2} />
                    <span className="text-base text-gray-900">和开发者聊聊</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" strokeWidth={2} />
                </button>

                <button
                  onClick={() => alert('条款协议')}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-50"
                >
                  <div className="flex items-center gap-3.5">
                    <Info className="w-5 h-5 text-gray-900" strokeWidth={2} />
                    <span className="text-base text-gray-900">条款协议</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" strokeWidth={2} />
                </button>

                <button
                  onClick={() => setCurrentPage('about')}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-50"
                >
                  <div className="flex items-center gap-3.5">
                    <HelpCircle className="w-5 h-5 text-gray-900" strokeWidth={2} />
                    <span className="text-base text-gray-900">关于陪你天气</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" strokeWidth={2} />
                </button>

                <button
                  onClick={() => setCurrentPage('marathonList')}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-50"
                >
                  <div className="flex items-center gap-3.5">
                    <Code className="w-5 h-5 text-gray-900" strokeWidth={2} />
                    <span className="text-base text-gray-900">马拉松集成演示</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" strokeWidth={2} />
                </button>

                <button
                  onClick={() => setCurrentPage('scenicList')}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-50"
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
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 active:bg-gray-100 transition-colors border-b border-gray-50"
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
          {renderBottomNav()}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-100 flex items-center justify-center py-10">
      <div className="w-[375px] h-[812px] bg-white flex flex-col relative shadow-2xl overflow-hidden rounded-[30px] ring-8 ring-black">
        {/* Status Bar */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center text-white text-sm z-30">
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

        <div
          className="flex-1 overflow-y-auto bg-white pb-24 no-scrollbar"
          onScroll={(e) => setHomeScrollOffset(e.currentTarget.scrollTop)}
        >

          {/* Custom Status Bar Spacer for Airbnb look */}
          <div className="h-12 bg-white sticky top-0 z-30 flex items-center justify-between px-6">
            <span className="font-bold text-sm text-neutral-900">9:41</span>
            <div className="flex items-center gap-1.5 text-neutral-900">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M2 20h4v-4H2v4zm6 0h4v-8H8v8zm6 0h4V10h-4v10zm6-18v18h4V2h-4z" /></svg>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" /></svg>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" /></svg>
            </div>
          </div>

          <div className="px-6 pt-2">
            {/* Airbnb Style Search Bar - Shrinking on scroll */}
            <div
              className="sticky top-0 z-40 bg-white/80 backdrop-blur-md -mx-6 px-6 py-4 transition-all duration-300 ease-out"
              style={{
                transform: `translateY(${Math.max(0, homeScrollOffset > 20 ? 0 : 0)}px)`,
                paddingTop: homeScrollOffset > 50 ? '8px' : '16px',
                paddingBottom: homeScrollOffset > 50 ? '8px' : '16px',
                borderBottom: homeScrollOffset > 50 ? '1px solid rgba(0,0,0,0.05)' : '1px solid transparent'
              }}
            >
              <button
                onClick={() => setSearchStep('destination')}
                className="w-full bg-white rounded-full shadow-[0_3px_12px_rgba(0,0,0,0.1)] flex items-center px-6 gap-4 border border-neutral-100 hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] transition-all active:scale-[0.98]"
                style={{
                  height: homeScrollOffset > 50 ? '48px' : '56px',
                  transform: `scale(${Math.max(0.9, 1 - homeScrollOffset / 1000)})`,
                }}
              >
                <Search size={homeScrollOffset > 50 ? 16 : 18} className="text-neutral-900" strokeWidth={3} />
                <div className="text-left">
                  <p className={`${homeScrollOffset > 50 ? 'text-[13px]' : 'text-[14px]'} text-neutral-900 font-semibold transition-all`}>开始你的行程</p>
                  {homeScrollOffset <= 50 && (
                    <p className="text-[12px] text-neutral-500 font-normal animate-fade-in">目的地 • 时间 • 金额</p>
                  )}
                </div>
              </button>
            </div>


            {/* Categories Quick Selector - Airbnb Icons Look */}
            <div className="flex items-center gap-8 overflow-x-auto py-2 no-scrollbar mb-8 border-b border-neutral-100">
              {[
                { icon: ImageIcon, label: '名山大川' },
                { icon: MapPin, label: '主题乐园' },
                { icon: CloudSun, label: '避寒圣地' },
                { icon: Zap, label: '赛事保障' },
                { icon: Sparkles, label: '露营自驾' },
              ].map((cat, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCategory(cat.label)}
                  className={`flex flex-col items-center gap-2 min-w-fit transition-all relative pb-3 ${activeCategory === cat.label ? 'text-neutral-900 opacity-100' : 'text-neutral-500 opacity-60 hover:opacity-100'
                    }`}
                >
                  <cat.icon size={24} strokeWidth={2} />
                  <span className="text-[11px] font-semibold whitespace-nowrap">{cat.label}</span>
                  {activeCategory === cat.label && <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-neutral-900"></div>}
                </button>
              ))}
            </div>

            {/* Featured Section */}
            <div className="space-y-10 mb-10">
              {/* Category 1: Popular Scenic spots */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[22px] font-bold text-neutral-900 tracking-tight">热门景区</h2>
                </div>

                <div className="grid grid-cols-1 gap-8">
                  {CATEGORY_DATA[activeCategory]?.map((dest, i) => (
                    <div key={i} className="group cursor-pointer">
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-3">
                        <img
                          src={dest.img}
                          alt={dest.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <button className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20 transition-all">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                          </svg>
                        </button>
                      </div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-neutral-900 text-base">{dest.name}</h3>
                          <p className="text-neutral-500 text-sm">{dest.location}</p>
                          <p className="mt-2 text-neutral-900 font-semibold"><span className="text-neutral-500 font-normal">雨天保障</span> {dest.price}元 <span className="text-neutral-500 font-normal">/ 每天</span></p>
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 text-neutral-900" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                          <span className="text-sm font-medium">{dest.rating}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>


              </div>


            </div>
          </div>
        </div>
        {renderBottomNav()}
        {currentPage === 'home' && <ChatAssistant />}
        {renderSearchWizard()}

      </div>
    </div>
  );
}

export default App;
