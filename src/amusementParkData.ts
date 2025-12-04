export interface AmusementPark {
  id: string;
  name: string;
  city: string;
  address: string;
  ticketPrice: number;
  imageUrl: string;
  description: string;
  openingHours: string;
  insuranceRate: number;
}

export const amusementParks: AmusementPark[] = [
  {
    id: 'mickey-kingdom',
    name: '米奇王国',
    city: '上海',
    address: '上海市浦东新区米奇大道1号',
    ticketPrice: 60,
    imageUrl: '/image copy.png',
    description: '欢乐畅玩，梦幻体验',
    openingHours: '09:00-21:00',
    insuranceRate: 0.08,
  },
];

export interface AmusementParkReferralData {
  source: string;
  location: string;
  visitDate: string;
  amount: number;
  parkName: string;
  compensationAmount: number;
  weatherInsuranceFee: number;
  contactName?: string;
  contactPhone?: string;
}
