import { CoinPackage, PaymentMethod, Article, Review, FAQItem, Coupon } from '../types';

export const COIN_PACKAGES: CoinPackage[] = [
  {
    id: 'ef-130',
    name: '130 eFootball Coins',
    coins: 130,
    bonusCoins: 0,
    priceBDT: 140,
    priceUSD: 1.25,
    originalPriceBDT: 160,
    category: 'standard',
    discountPercent: 12,
    image: 'https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?w=400&auto=format&fit=crop&q=80',
    description: 'Starter pack ideal for single player contract renewals or quick item draws.',
    features: ['Instant Auto-Delivery', '100% Account Safe', 'KONAMI ID / User ID Supported']
  },
  {
    id: 'ef-320',
    name: '320 eFootball Coins',
    coins: 300,
    bonusCoins: 20,
    priceBDT: 330,
    priceUSD: 2.90,
    originalPriceBDT: 380,
    category: 'standard',
    popular: true,
    discountPercent: 13,
    badge: '🔥 HOT SELLER',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&auto=format&fit=crop&q=80',
    description: 'Includes 20 Bonus Coins! Great value for single special player draw boxes.',
    features: ['20 Bonus Coins Included', 'Instant Delivery (2-5 mins)', 'Guaranteed Delivery or Refund']
  },
  {
    id: 'ef-550',
    name: '550 eFootball Coins',
    coins: 500,
    bonusCoins: 50,
    priceBDT: 560,
    priceUSD: 4.90,
    originalPriceBDT: 650,
    category: 'standard',
    discountPercent: 14,
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&auto=format&fit=crop&q=80',
    description: '500 Base + 50 Bonus Coins. Ideal for Weekly POTW Spin Box.',
    features: ['50 Bonus Coins', 'Automated Verification', '24/7 Live Support']
  },
  {
    id: 'ef-1040',
    name: '1,040 eFootball Coins',
    coins: 960,
    bonusCoins: 80,
    priceBDT: 1050,
    priceUSD: 9.20,
    originalPriceBDT: 1250,
    category: 'standard',
    popular: true,
    discountPercent: 16,
    badge: '⭐ MOST POPULAR',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&auto=format&fit=crop&q=80',
    description: '1,040 Coins Bundle! Ideal for 10x Spin Boxes and Match Pass unlock.',
    features: ['80 Bonus Coins', 'Unlocks Match Pass Premium', 'Instant Automated Injection']
  },
  {
    id: 'ef-2130',
    name: '2,130 eFootball Coins',
    coins: 1900,
    bonusCoins: 230,
    priceBDT: 2100,
    priceUSD: 18.50,
    originalPriceBDT: 2500,
    category: 'standard',
    bestValue: true,
    discountPercent: 16,
    badge: '👑 BEST VALUE',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&auto=format&fit=crop&q=80',
    description: 'Mega savings with 230 Free Bonus Coins! Perfect for Epic Box spin sprees.',
    features: ['230 Free Bonus Coins', 'Priority Instant Top-Up', 'VIP Customer Assistance']
  },
  {
    id: 'ef-3250',
    name: '3,250 eFootball Coins',
    coins: 2800,
    bonusCoins: 450,
    priceBDT: 3150,
    priceUSD: 27.50,
    originalPriceBDT: 3800,
    category: 'standard',
    discountPercent: 17,
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=400&auto=format&fit=crop&q=80',
    description: '3,250 Total Coins with 450 Bonus Coins. Guaranteed high value tier.',
    features: ['450 Bonus Coins', 'Full Epic Booster Compatibility', 'Express 60-Second Processing']
  },
  {
    id: 'ef-5700',
    name: '5,700 eFootball Coins',
    coins: 4800,
    bonusCoins: 900,
    priceBDT: 5400,
    priceUSD: 47.00,
    originalPriceBDT: 6600,
    category: 'standard',
    bestValue: true,
    discountPercent: 18,
    badge: '💎 PRO GAMER CHOICE',
    image: 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=400&auto=format&fit=crop&q=80',
    description: 'Huge 900 Bonus Coins! Designed for squad builders seeking Epic & Big Time Legends.',
    features: ['900 Bonus Coins', 'Direct Server Top-Up', 'Zero Account Risk Guarantee']
  },
  {
    id: 'ef-12000',
    name: '12,000 eFootball Coins Mega Vault',
    coins: 10000,
    bonusCoins: 2000,
    priceBDT: 10900,
    priceUSD: 95.00,
    originalPriceBDT: 13500,
    category: 'special',
    bestValue: true,
    discountPercent: 19,
    badge: '🚀 ULTIMATE PACK',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&auto=format&fit=crop&q=80',
    description: 'The Ultimate eFootball Vault! Massive 2,000 bonus coins. Complete any Epic Box.',
    features: ['2,000 Free Bonus Coins', 'Dedicated Personal Account Manager', 'Instant VIP Queue Processing']
  },
  {
    id: 'epic-messi-bundle',
    name: 'Messi Big Time Ambassador Pack + 1000 Coins',
    coins: 1000,
    bonusCoins: 500,
    priceBDT: 1850,
    priceUSD: 16.00,
    originalPriceBDT: 2300,
    category: 'epic_pack',
    badge: '⚽ AMBASSADOR PACK',
    discountPercent: 20,
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=400&auto=format&fit=crop&q=80',
    description: 'Includes Lionel Messi Special Card + Manager Pep Guardiola + 1,500 Total Coins.',
    features: ['Boosted Lionel Messi Card', 'Exclusive Team Uniform', '1,500 eFootball Coins']
  },
  {
    id: 'epic-neymar-bundle',
    name: 'Neymar Jr Show-Time Pack + 1000 Coins',
    coins: 1000,
    bonusCoins: 500,
    priceBDT: 1850,
    priceUSD: 16.00,
    originalPriceBDT: 2300,
    category: 'epic_pack',
    badge: '🔥 SPECIAL PACK',
    discountPercent: 20,
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&auto=format&fit=crop&q=80',
    description: 'Special Neymar Jr Phenomenal Finishing Card + 1,500 Coins + Skill Program items.',
    features: ['103 OVR Neymar Jr Card', 'Exclusive Neymar Avatar Badge', '1,500 eFootball Coins']
  }
];

export const PAYMENT_METHODS: PaymentMethod[] = [
  {
    id: 'bkash',
    name: 'bKash Send Money / Cash In',
    icon: 'fa-solid fa-mobile-screen-button',
    color: '#E2136E',
    type: 'mobile_banking',
    accountNumber: '01700998877',
    chargePercent: 0,
    instructions: [
      'Open your bKash Mobile App or Dial *247#',
      'Select "Send Money" or "Payment" option',
      'Enter our Personal bKash Number: 01700998877',
      'Enter total amount calculated in your order summary',
      'Enter Reference: "eFootball" or your Player ID',
      'Confirm transaction with your bKash PIN',
      'Copy the 10-digit Transaction ID (TrxID) and enter it below'
    ]
  },
  {
    id: 'nagad',
    name: 'Nagad Send Money',
    icon: 'fa-solid fa-wallet',
    color: '#F7921E',
    type: 'mobile_banking',
    accountNumber: '01811223344',
    chargePercent: 0,
    instructions: [
      'Open your Nagad App or Dial *167#',
      'Select "Send Money"',
      'Enter Nagad Personal Number: 01811223344',
      'Enter the exact order total amount',
      'Enter Reference: Your Player ID',
      'Enter your PIN to complete transfer',
      'Paste the Nagad Transaction ID (TrxID) below'
    ]
  },
  {
    id: 'rocket',
    name: 'Dutch-Bangla Rocket',
    icon: 'fa-solid fa-bolt',
    color: '#8C298B',
    type: 'mobile_banking',
    accountNumber: '01900112233-4',
    chargePercent: 0,
    instructions: [
      'Open Rocket App or Dial *322#',
      'Choose "Send Money"',
      'Enter Rocket Account: 019001122334',
      'Enter exact BDT amount',
      'Confirm transaction with PIN',
      'Enter the Transaction ID below'
    ]
  },
  {
    id: 'visa',
    name: 'Visa Card / Debit / Credit',
    icon: 'fa-brands fa-cc-visa',
    color: '#1A1F71',
    type: 'card',
    chargePercent: 1.5,
    instructions: [
      'Select Visa Card option',
      'Click Place Order to launch SSLCommerz / Stripe Secure Gateway',
      'Enter Card Number, Expiry, and CVV securely',
      'Complete OTP verification from your issuing bank'
    ]
  },
  {
    id: 'mastercard',
    name: 'MasterCard Gateway',
    icon: 'fa-brands fa-cc-mastercard',
    color: '#EB001B',
    type: 'card',
    chargePercent: 1.5,
    instructions: [
      'Select MasterCard option',
      'Proceed to SSL / Card Checkout gateway',
      'Enter card credentials & complete OTP authentication'
    ]
  },
  {
    id: 'paypal',
    name: 'PayPal Global (USD)',
    icon: 'fa-brands fa-paypal',
    color: '#003087',
    type: 'digital_wallet',
    accountNumber: 'payments@efootballcoinhub.com',
    chargePercent: 2.0,
    instructions: [
      'Send payment in USD to PayPal: payments@efootballcoinhub.com',
      'Select "Friends & Family" to avoid delays',
      'Enter Transaction ID / Sender Email in verification field'
    ]
  }
];

export const COUPONS: Coupon[] = [
  {
    code: 'EFOOTBALL2026',
    discountPercent: 10,
    maxDiscountBDT: 300,
    minSpendBDT: 300,
    description: 'Get 10% OFF on any order over ৳300!'
  },
  {
    code: 'EPICBONUS',
    discountPercent: 15,
    maxDiscountBDT: 600,
    minSpendBDT: 1000,
    description: '15% OFF for orders ৳1,000+ (Epic Hunters)'
  },
  {
    code: 'MESSI10',
    discountPercent: 10,
    maxDiscountBDT: 250,
    minSpendBDT: 500,
    description: 'Special 10% discount on Ambassador Packs'
  }
];

export const REVIEWS: Review[] = [
  {
    id: 'rev-1',
    userName: 'Tanvir Hossain',
    userAvatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    date: '10 minutes ago',
    coinsBought: 2130,
    comment: 'Instantly got my 2,130 coins via bKash! Took literally 90 seconds. Drawn Epic Maldini on my first multi-spin! Best store in BD 🔥',
    verifiedPurchase: true,
    platform: 'Android'
  },
  {
    id: 'rev-2',
    userName: 'Arik Rahman',
    userAvatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    date: '1 hour ago',
    coinsBought: 1040,
    comment: '100% genuine and safe. I was worried about my KONAMI ID safety but their auto-id method is completely safe. Highly recommended!',
    verifiedPurchase: true,
    platform: 'iOS'
  },
  {
    id: 'rev-3',
    userName: 'Sabbir Ahmed',
    userAvatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    date: '3 hours ago',
    coinsBought: 5700,
    comment: 'Top-notch service! Customer support replied on WhatsApp in 20 seconds when I made a typo in my ID. Fixed instantly. 10/10.',
    verifiedPurchase: true,
    platform: 'PC / Steam'
  },
  {
    id: 'rev-4',
    userName: 'Rafid Islam',
    userAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    date: 'Yesterday',
    coinsBought: 3250,
    comment: 'Prices are cheaper than direct in-game purchases! Discount coupon EFOOTBALL2026 worked perfectly.',
    verifiedPurchase: true,
    platform: 'PlayStation'
  },
  {
    id: 'rev-5',
    userName: 'Mahmudul Hasan',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    rating: 5,
    date: '2 days ago',
    coinsBought: 12000,
    comment: 'Bought 12,000 Mega Vault! Got all 3 Epics from the box. Instant delivery via Nagad. Will buy every season!',
    verifiedPurchase: true,
    platform: 'Android'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Top-Up',
    question: 'How long does top-up delivery take?',
    answer: 'Our automated coin injection system processes 98% of orders within 60 to 180 seconds after payment verification. During peak release hours (e.g. Thursday Epic box drops), processing can take up to 5 minutes.'
  },
  {
    id: 'faq-2',
    category: 'Top-Up',
    question: 'Is my eFootball account 100% safe from bans?',
    answer: 'Yes! We only use official regional KONAMI partner top-up protocols and official eFootball ID refill systems. Your account is 100% safe, clean, and zero-risk. We never request password access for standard ID top-ups.'
  },
  {
    id: 'faq-3',
    category: 'Payment',
    question: 'Which payment methods do you accept?',
    answer: 'We accept bKash Send Money/Payment, Nagad, DBBL Rocket, Visa Card, MasterCard, and PayPal. All Bangladeshi local mobile wallets have 0% fee charges!'
  },
  {
    id: 'faq-4',
    category: 'Top-Up',
    question: 'Where can I find my eFootball Player ID / User ID?',
    answer: 'Open eFootball on your device → Go to Extras → User Information → User Details. Your User ID is a 9-digit number (e.g. 123-456-789). You can click the copy button next to it!'
  },
  {
    id: 'faq-5',
    category: 'Refund',
    question: 'What is your refund policy?',
    answer: 'If an order fails or cannot be delivered due to system maintenance on KONAMI servers, we guarantee a 100% full instant refund to your bKash, Nagad, or bank account within 1 hour.'
  },
  {
    id: 'faq-6',
    category: 'Safety',
    question: 'Do you need my KONAMI Password?',
    answer: 'No! For eFootball User ID top-ups, we ONLY require your 9-digit User ID. Never share your password with anyone.'
  }
];

export const ARTICLES: Article[] = [
  {
    id: 'art-1',
    title: 'eFootball 2026 Season Update: Best Epic Booster Cards & Squad Meta Guide',
    slug: 'efootball-2026-epic-booster-meta-guide',
    category: 'Packs & Epics',
    readTime: '5 min read',
    date: 'July 28, 2026',
    author: 'eFootball Analyst Crew',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Discover which Epic Booster cards are dominating the Division 1 ladder in eFootball 2026 and how many coins you need to guarantee them.',
    content: `
      eFootball 2026 has introduced revolutionary **Epic Booster** mechanics that push player stats beyond the classic 100 overall limit up to 105+!

      ### Key Highlights of the Current Meta:
      1. **Physicality & Speed Duo**: Central defenders with +4 Physicality boosters dominate high-line pressing.
      2. **Phenomenal Finishing**: Striker cards like Big Time Haaland & Rummenigge trigger automatic curled shots under pressure.
      3. **Optimal Coin Spinning**: Statistically, opening 10x boxes (900 coins) gives a 12% higher probability per coin spent compared to single spins.

      ### Coin Savings Tip:
      Always stock up on 2,130 or 5,700 Coin Bundles before Thursday box drops to maximize bonus coins!
    `,
    popular: true,
    tags: ['Epic Booster', 'Meta', 'Coins Guide', 'Division 1']
  },
  {
    id: 'art-2',
    title: 'How to Top-Up eFootball Coins Safely via bKash & Nagad (Step-by-Step)',
    slug: 'how-to-topup-efootball-coins-bkash-nagad-guide',
    category: 'Top-Up Tips',
    readTime: '3 min read',
    date: 'July 25, 2026',
    author: 'Coin Hub Security Team',
    image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Complete tutorial on finding your 9-digit eFootball User ID, placing an order, and verifying your TrxID for 60-second delivery.',
    content: `
      Recharging eFootball Coins in Bangladesh has never been easier or faster. Follow these 3 simple steps to get coins instantly on your account!

      ### Step 1: Copy Your User ID
      Open eFootball → Extras → User Info → User Details. Tap the Copy icon next to your 9-digit User ID.

      ### Step 2: Choose Your Coin Pack
      Select from 130 Coins up to 12,000 Mega Vault. Enter your User ID and select your platform (Android, iOS, or Steam).

      ### Step 3: Complete Mobile Banking Payment
      Use Send Money on bKash (01700998877) or Nagad (01811223344), paste your Transaction ID, and watch your coins arrive in 60 seconds!
    `,
    popular: true,
    tags: ['bKash', 'Nagad', 'Tutorial', 'Safe Top Up']
  },
  {
    id: 'art-3',
    title: 'Top 5 Managers in eFootball 2026 & Manager Boost Synergy Explained',
    slug: 'top-5-managers-efootball-2026-synergy',
    category: 'Game Guide',
    readTime: '4 min read',
    date: 'July 20, 2026',
    author: 'Tactics Master',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&auto=format&fit=crop&q=80',
    excerpt: 'Learn how Pep Guardiola, Johan Cruyff, and Alex Ferguson manager cards provide +1 to all squad attributes.',
    content: `
      Manager playstyles determine how your team responds in defense and transition. Choosing the right 88-rated manager can turn average players into unstoppable forces.

      ### Manager Recommendations:
      - **Possession Game**: Pep Guardiola (+1 Accelerating)
      - **Quick Counter**: Johan Cruyff (+1 Speed & Stamina)
      - **Out-Wide**: Xabi Alonso (+1 Crossing Accuracy)
    `,
    tags: ['Manager', 'Tactics', 'Squad Building']
  }
];

export const RECENT_TOP_UPS = [
  { name: 'Siam K.', id: '284****91', coins: 2130, time: '2 mins ago', method: 'bKash' },
  { name: 'Tanvir M.', id: '891****02', coins: 5700, time: '4 mins ago', method: 'Nagad' },
  { name: 'Fahim A.', id: '104****55', coins: 1040, time: '7 mins ago', method: 'bKash' },
  { name: 'Naim R.', id: '553****19', coins: 320, time: '12 mins ago', method: 'Rocket' },
  { name: 'Zubair H.', id: '772****88', coins: 12000, time: '15 mins ago', method: 'Visa' },
  { name: 'Shakil S.', id: '402****31', coins: 3250, time: '18 mins ago', method: 'bKash' }
];
