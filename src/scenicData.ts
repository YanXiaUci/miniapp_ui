export interface ScenicSpot {
  id: string;
  name: string;
  city: string;
  address: string;
  ticketPrice: number;
  imageUrl: string;
  description: string;
  openingHours: string;
  insuranceRate: number;
  type: 'reservation' | 'payment';
}

export const scenicSpots: ScenicSpot[] = [
  {
    id: 'guizhou-houertk',
    name: '贵州猴耳天坑',
    city: '贵州',
    address: '贵州省紫云县猴耳天坑景区',
    ticketPrice: 120,
    imageUrl: '/image copy.png',
    description: '世界级天坑群，壮观的喀斯特地貌',
    openingHours: '08:00-18:00',
    insuranceRate: 0.08,
    type: 'reservation',
  },
  {
    id: 'luoyang-laojunshan',
    name: '洛阳老君山',
    city: '洛阳',
    address: '河南省洛阳市栾川县老君山景区',
    ticketPrice: 88,
    imageUrl: '/image copy.png',
    description: '道教圣地，云海日出绝美景观',
    openingHours: '07:00-19:00',
    insuranceRate: 0.06,
    type: 'payment',
  },
];

export interface ScenicReferralData {
  source: string;
  location: string;
  visitDate: string;
  amount: number;
  scenicName: string;
  compensationAmount: number;
  weatherInsuranceFee: number;
  contactName?: string;
  contactPhone?: string;
}
