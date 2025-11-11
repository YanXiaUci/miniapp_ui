export interface MarathonEvent {
  id: string;
  name: string;
  city: string;
  address: string;
  date: string;
  registrationFee: number;
  imageUrl: string;
  description: string;
  distance: string;
  startTime: string;
  compensationRate: number;
  insuranceRate: number;
}

export const marathonEvents: MarathonEvent[] = [
  {
    id: 'shanghai-2025',
    name: '2025上海马拉松',
    city: '上海',
    address: '上海市黄浦区外滩路',
    date: '2025年11月30日',
    registrationFee: 200,
    imageUrl: '/image copy.png',
    description: '中国田径协会金牌赛事',
    distance: '42.195公里',
    startTime: '07:00',
    compensationRate: 0.5,
    insuranceRate: 0.08,
  },
  {
    id: 'beijing-2025',
    name: '2025北京马拉松',
    city: '北京',
    address: '北京市朝阳区天安门广场',
    date: '2025年10月26日',
    registrationFee: 300,
    imageUrl: '/image copy.png',
    description: '国际田联金标赛事',
    distance: '42.195公里',
    startTime: '07:30',
    compensationRate: 0.5,
    insuranceRate: 0.10,
  },
  {
    id: 'guangzhou-2025',
    name: '2025广州马拉松',
    city: '广州',
    address: '广州市天河区天河体育中心',
    date: '2025年12月14日',
    registrationFee: 180,
    imageUrl: '/image copy.png',
    description: '中国田径协会金牌赛事',
    distance: '42.195公里',
    startTime: '07:30',
    compensationRate: 0.5,
    insuranceRate: 0.06,
  },
  {
    id: 'hangzhou-2025',
    name: '2025杭州马拉松',
    city: '杭州',
    address: '杭州市西湖区黄龙体育中心',
    date: '2025年11月2日',
    registrationFee: 200,
    imageUrl: '/image copy.png',
    description: '中国田径协会金牌赛事',
    distance: '42.195公里',
    startTime: '07:00',
    compensationRate: 0.5,
    insuranceRate: 0.07,
  },
  {
    id: 'xiamen-2025',
    name: '2025厦门马拉松',
    city: '厦门',
    address: '厦门市思明区厦门国际会展中心',
    date: '2025年1月5日',
    registrationFee: 160,
    imageUrl: '/image copy.png',
    description: '国际田联金标赛事',
    distance: '42.195公里',
    startTime: '08:00',
    compensationRate: 0.5,
    insuranceRate: 0.05,
  },
  {
    id: 'chengdu-2025',
    name: '2025成都马拉松',
    city: '成都',
    address: '成都市锦江区天府广场',
    date: '2025年3月23日',
    registrationFee: 220,
    imageUrl: '/image copy.png',
    description: '中国田径协会金牌赛事',
    distance: '42.195公里',
    startTime: '07:30',
    compensationRate: 0.5,
    insuranceRate: 0.09,
  },
];

export interface ReferralData {
  source: string;
  location: string;
  startDate: string;
  endDate: string;
  amount: number;
  eventName: string;
  compensationAmount: number;
  weatherInsuranceFee: number;
}
