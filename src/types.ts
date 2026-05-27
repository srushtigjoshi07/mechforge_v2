export interface Bike {
  id: string;
  name: string;
  category: 'sports' | 'performance' | 'commuter' | 'scooter';
  tagline: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  colors: { name: string; hex: string; imgUrl: string }[];
  specs: {
    displacement: string;
    cooling: string;
    fuelSystem: string;
    brakes: string;
    transmission: string;
    power: string;
    torque: string;
    weight: string;
  };
  description: string;
  riderImg: string;
}

export interface Dealer {
  id: string;
  name: string;
  division: string;
  address: string;
  phone: string;
  email?: string;
  hasService: boolean;
}

export interface TimelineMoment {
  year: string;
  title: string;
  body: string;
}

export interface TechItem {
  id: string;
  num: string;
  acronym: string;
  name: string;
  desc: string;
}

export interface DealItem {
  id: string;
  banner: string;
  name: string;
  wasPrice: number;
  nowPrice: number;
  saveAmount: number;
  colorsCount: number;
  colorsText: string;
  imgUrl: string;
}

export interface SafetyPillar {
  icon: string;
  title: string;
  desc: string;
}

export interface ServiceFAQ {
  title: string;
  content: string;
}
