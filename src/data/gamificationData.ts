export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  points: number;
  category: string;
}

export interface SpinReward {
  id: string;
  title: string;
  description: string;
  value: string;
  type: 'points' | 'discount' | 'free-shipping' | 'gift-card';
  probability: number;
  icon: string;
}

export interface BadgeType {
  id: string;
  name: string;
  description: string;
  icon: string;
  requirement: string;
  points: number;
}

export interface FlashSaleItem {
  id: string;
  name: string;
  originalPrice: number;
  salePrice: number;
  discount: number;
  image: string;
  endTime: string;
  total: number;
  claimed: number;
}

export interface UserProgress {
  totalPoints: number;
  level: number;
  badges: string[];
  lastQuizDate: string;
  lastSpinDate: string;
  quizStreak: number;
  totalOrders: number;
  spinsUsed: number;
  maxSpinsPerDay: number;
}

// Mock Quiz Questions
export const dailyQuizQuestions: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What year was Walmart founded?',
    options: ['1962', '1960', '1965', '1970'],
    correctAnswer: 0,
    points: 15,
    category: 'history'
  },
  {
    id: 'q2',
    question: 'Which of these is a Walmart private label brand?',
    options: ['Great Value', 'Kirkland', 'Market Pantry', 'Simple Truth'],
    correctAnswer: 0,
    points: 10,
    category: 'products'
  },
  {
    id: 'q3',
    question: 'What is Walmart\'s slogan?',
    options: ['Save Money. Live Better.', 'Always Low Prices', 'Expect More. Pay Less.', 'The Happiest Place on Earth'],
    correctAnswer: 0,
    points: 10,
    category: 'branding'
  },
  {
    id: 'q4',
    question: 'Walmart is headquartered in which state?',
    options: ['Texas', 'Arkansas', 'California', 'New York'],
    correctAnswer: 1,
    points: 15,
    category: 'company'
  },
  {
    id: 'q5',
    question: 'What service does Walmart+ provide?',
    options: ['Free shipping', 'Grocery delivery', 'Gas discounts', 'All of the above'],
    correctAnswer: 3,
    points: 20,
    category: 'services'
  }
];

// Spin Wheel Rewards
export const spinRewards: SpinReward[] = [
  {
    id: 'r1',
    title: '10 Points',
    description: 'Earn 10 reward points',
    value: '10',
    type: 'points',
    probability: 40,
    icon: '🎯'
  },
  {
    id: 'r2',
    title: '5% Off',
    description: 'Get 5% off your next purchase',
    value: '5',
    type: 'discount',
    probability: 30,
    icon: '💰'
  },
  {
    id: 'r3',
    title: 'Free Shipping',
    description: 'Free shipping on your next order',
    value: 'free',
    type: 'free-shipping',
    probability: 20,
    icon: '🚚'
  },
  {
    id: 'r4',
    title: '$5 Gift Card',
    description: 'Receive a $5 Walmart gift card',
    value: '5',
    type: 'gift-card',
    probability: 10,
    icon: '🎁'
  }
];

// Available Badges
export const availableBadges: BadgeType[] = [
  {
    id: 'quiz_master',
    name: 'Quiz Master',
    description: 'Complete 10 daily quizzes',
    icon: '🧠',
    requirement: 'Complete 10 quizzes',
    points: 100
  },
  {
    id: 'spin_champion',
    name: 'Spin Champion',
    description: 'Use the spin wheel 5 times',
    icon: '🎰',
    requirement: 'Spin 5 times',
    points: 50
  },
  {
    id: 'streak_master',
    name: 'Streak Master',
    description: 'Complete quizzes for 7 days in a row',
    icon: '🔥',
    requirement: '7-day streak',
    points: 200
  },
  {
    id: 'loyal_shopper',
    name: 'Loyal Shopper',
    description: 'Complete 5 orders',
    icon: '🛍️',
    requirement: '5 orders',
    points: 150
  },
  {
    id: 'first_order',
    name: 'First Order',
    description: 'Complete your first order',
    icon: '🎉',
    requirement: '1 order',
    points: 25
  },
  {
    id: 'big_spender',
    name: 'Big Spender',
    description: 'Spend over $500 total',
    icon: '💎',
    requirement: 'Spend $500+',
    points: 300
  }
];

// Flash Sale Items
export const flashSaleItems: FlashSaleItem[] = [
  {
    id: 'fs1',
    name: 'Wireless Bluetooth Headphones',
    originalPrice: 79.99,
    salePrice: 39.99,
    discount: 50,
    image: '/api/placeholder/300/200',
    endTime: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
    total: 100,
    claimed: 23
  },
  {
    id: 'fs2',
    name: 'Smart Fitness Watch',
    originalPrice: 199.99,
    salePrice: 99.99,
    discount: 50,
    image: '/api/placeholder/300/200',
    endTime: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString(), // 4 hours from now
    total: 50,
    claimed: 12
  },
  {
    id: 'fs3',
    name: 'Portable Phone Charger',
    originalPrice: 29.99,
    salePrice: 14.99,
    discount: 50,
    image: '/api/placeholder/300/200',
    endTime: new Date(Date.now() + 6 * 60 * 60 * 1000).toISOString(), // 6 hours from now
    total: 200,
    claimed: 67
  }
];

// Default user progress
export const defaultUserProgress: UserProgress = {
  totalPoints: 0,
  level: 1,
  badges: [],
  lastQuizDate: '',
  lastSpinDate: '',
  quizStreak: 0,
  totalOrders: 0,
  spinsUsed: 0,
  maxSpinsPerDay: 1
};