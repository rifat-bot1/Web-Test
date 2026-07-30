export type PlatformType = 'Android' | 'iOS' | 'PlayStation' | 'Xbox' | 'PC / Steam';
export type RegionType = 'Global' | 'Asia / Japan' | 'Europe' | 'Americas';

export interface CoinPackage {
  id: string;
  name: string;
  coins: number;
  bonusCoins: number;
  priceBDT: number;
  priceUSD: number;
  originalPriceBDT: number;
  category: 'standard' | 'epic_pack' | 'special' | 'manager';
  popular?: boolean;
  bestValue?: boolean;
  discountPercent: number;
  image: string;
  badge?: string;
  description: string;
  features: string[];
}

export type PaymentMethodId = 'bkash' | 'nagad' | 'rocket' | 'visa' | 'mastercard' | 'paypal';

export interface PaymentMethod {
  id: PaymentMethodId;
  name: string;
  icon: string;
  color: string;
  type: 'mobile_banking' | 'card' | 'digital_wallet';
  accountNumber?: string;
  instructions: string[];
  chargePercent: number;
}

export interface Order {
  id: string;
  playerId: string;
  playerName?: string;
  platform: PlatformType;
  region: RegionType;
  packageId: string;
  packageName: string;
  coins: number;
  bonusCoins: number;
  quantity: number;
  totalPriceBDT: number;
  totalPriceUSD: number;
  discountAppliedBDT: number;
  couponCode?: string;
  paymentMethod: PaymentMethodId;
  transactionId: string;
  contactNumber: string;
  contactEmail: string;
  status: 'Pending Verification' | 'Processing Delivery' | 'Injecting Coins' | 'Completed' | 'Failed';
  createdAt: string;
  updatedAt: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  category: 'Game Guide' | 'eFootball News' | 'Top-Up Tips' | 'Packs & Epics';
  readTime: string;
  date: string;
  author: string;
  image: string;
  excerpt: string;
  content: string;
  popular?: boolean;
  tags: string[];
}

export interface Review {
  id: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  coinsBought: number;
  comment: string;
  verifiedPurchase: boolean;
  platform: string;
}

export interface FAQItem {
  id: string;
  category: 'Top-Up' | 'Payment' | 'Safety' | 'Refund';
  question: string;
  answer: string;
}

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
  options?: { label: string; action: string }[];
}

export interface Coupon {
  code: string;
  discountPercent: number;
  maxDiscountBDT: number;
  minSpendBDT: number;
  description: string;
}
