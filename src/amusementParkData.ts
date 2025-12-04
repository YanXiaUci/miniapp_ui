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
    city: '平顶山',
    address: '河南省平顶山市鲁山县',
    ticketPrice: 169,
    imageUrl: '/image copy.png',
    description: '欢乐畅玩，梦幻体验',
    openingHours: '09:30-19:00',
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
