export type Plan = 'basic' | 'featured';
export type VerificationStatus = 'none' | 'pending' | 'approved' | 'rejected';
export type SubscriptionStatus = 'active' | 'expired' | 'cancelled';

export interface Photo {
  id: number;
  url: string;
  isMain: boolean;
}

export interface Video {
  id: number;
  url: string;
  thumbnail?: string;
  duration?: string;
  title?: string;
}

export interface User {
  id: number;
  name: string;
  age: number;
  city: string;
  neighborhood: string;
  description: string;
  services: string[];
  schedule: string;
  priceRange: string;
  height: string;
  weight: string;
  ethnicity: string;
  hairColor: string;
  eyeColor: string;
  bodyType: string;
  phone: string;
  whatsapp: string;
  isActive: boolean;
  isVerified: boolean;
  verificationStatus: VerificationStatus;
  plan: Plan;
  views: number;
  whatsappClicks: number;
  photos: Photo[];
  videos: Video[];
  createdAt: string;
}

export interface FilterState {
  city: string;
  ethnicity: string;
  bodyType: string;
  minAge: number;
  maxAge: number;
  minPrice: number;
  maxPrice: number;
  services: string[];
  verified: boolean;
}
