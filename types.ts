
export interface Package {
  name: string;
  price: string;
  period: string;
  isPopular: boolean;
  highlightColor?: 'purple' | 'blue' | 'pink';
}

export interface Feature {
  name: string;
  values: (string | boolean)[];
}

export interface CategoryData {
  id: string;
  label: string;
  icon?: string;
  shortDesc?: string;
  packages: Package[];
  features: Feature[];
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user';
  position?: string; // e.g., "Web Sitesi İstiyorum"
  avatar?: string;
}

export interface Lead {
  id: number;
  name: string;
  email: string;
  serviceInterest: string;
  status: 'Yeni' | 'Görüşüldü' | 'Teklif Verildi' | 'Satış';
  date: string;
}

export interface Ticket {
  id: string;
  subject: string;
  status: 'Açık' | 'Yanıtlandı' | 'Kapalı';
  lastUpdate: string;
  priority: 'Düşük' | 'Orta' | 'Yüksek';
}

export interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  consultant: string;
  status: 'Onaylandı' | 'Bekliyor';
}
