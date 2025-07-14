export interface Movie {
  id: string;
  title: string;
  genre: string;
  duration: string;
  rating: string;
  image: string;
  theaters: string[];
  showtimes: string[];
  price: number;
}

export interface Event {
  id: string;
  title: string;
  category: 'concert' | 'comedy' | 'cultural' | 'lifestyle' | 'sports';
  date: string;
  time: string;
  venue: string;
  location: string;
  price: number;
  image: string;
  description: string;
  isMemberOnly?: boolean;
  isAppOnly?: boolean;
}

export interface FBCombo {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  discountPrice: number;
  image: string;
  validUntil: string;
  venues: string[];
}

export interface Promotion {
  id: string;
  title: string;
  description: string;
  discount: string;
  code: string;
  validUntil: string;
  image: string;
  isMemberOnly?: boolean;
  isAppOnly?: boolean;
}

export interface Merchandise {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  relatedEvent?: string;
}

// Mock Data
export const movies: Movie[] = [
  {
    id: 'm1',
    title: 'Guardians of the Galaxy Vol. 3',
    genre: 'Action, Adventure, Comedy',
    duration: '2h 30m',
    rating: 'PG-13',
    image: 'https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=400&h=600&fit=crop',
    theaters: ['AMC Theater', 'Regal Cinemas', 'Cinemark'],
    showtimes: ['2:00 PM', '5:30 PM', '8:45 PM'],
    price: 12.99
  },
  {
    id: 'm2',
    title: 'Spider-Man: Across the Spider-Verse',
    genre: 'Animation, Action, Adventure',
    duration: '2h 20m',
    rating: 'PG',
    image: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop',
    theaters: ['AMC Theater', 'Showcase Cinemas'],
    showtimes: ['1:30 PM', '4:15 PM', '7:00 PM', '9:45 PM'],
    price: 13.99
  },
  {
    id: 'm3',
    title: 'The Little Mermaid',
    genre: 'Family, Fantasy, Musical',
    duration: '2h 15m',
    rating: 'PG',
    image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=600&fit=crop',
    theaters: ['Regal Cinemas', 'Cinemark', 'AMC Theater'],
    showtimes: ['12:00 PM', '3:30 PM', '6:45 PM'],
    price: 11.99
  }
];

export const events: Event[] = [
  {
    id: 'e1',
    title: 'Summer Music Festival 2024',
    category: 'concert',
    date: '2024-07-15',
    time: '6:00 PM',
    venue: 'Central Park Amphitheater',
    location: 'New York, NY',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop',
    description: 'Join us for an unforgettable evening of live music featuring top artists from around the world.',
  },
  {
    id: 'e2',
    title: 'Comedy Night with Dave Chappelle',
    category: 'comedy',
    date: '2024-06-20',
    time: '8:00 PM',
    venue: 'Madison Square Garden',
    location: 'New York, NY',
    price: 125.00,
    image: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=400&h=300&fit=crop',
    description: 'An evening of hilarious stand-up comedy with one of the greatest comedians of our time.',
    isMemberOnly: true
  },
  {
    id: 'e3',
    title: 'Local Art & Craft Fair',
    category: 'lifestyle',
    date: '2024-06-25',
    time: '10:00 AM',
    venue: 'Downtown Convention Center',
    location: 'Austin, TX',
    price: 15.00,
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=300&fit=crop',
    description: 'Discover unique handmade crafts, art pieces, and local delicacies from talented artisans.',
  },
  {
    id: 'e4',
    title: 'Cultural Heritage Festival',
    category: 'cultural',
    date: '2024-07-01',
    time: '2:00 PM',
    venue: 'Heritage Park',
    location: 'San Francisco, CA',
    price: 25.00,
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=300&fit=crop',
    description: 'Celebrate diverse cultures with traditional performances, food, and interactive exhibits.',
    isAppOnly: true
  },
  {
    id: 'e5',
    title: 'NBA Finals Watch Party',
    category: 'sports',
    date: '2024-06-18',
    time: '7:00 PM',
    venue: 'Sports Bar & Grill',
    location: 'Los Angeles, CA',
    price: 35.00,
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400&h=300&fit=crop',
    description: 'Watch the NBA Finals on big screens with fellow fans, food, and drinks included.',
  }
];

export const fbCombos: FBCombo[] = [
  {
    id: 'fb1',
    title: 'Movie Night Combo',
    description: 'Large popcorn + 2 drinks + candy for movie tickets',
    originalPrice: 25.99,
    discountPrice: 15.99,
    image: 'https://images.unsplash.com/photo-1489599735734-79b4169c2a78?w=400&h=300&fit=crop',
    validUntil: '2024-07-31',
    venues: ['AMC Theater', 'Regal Cinemas']
  },
  {
    id: 'fb2',
    title: 'Concert Pre-Show Dinner',
    description: 'Appetizer + Main Course + Dessert at partner restaurants',
    originalPrice: 45.00,
    discountPrice: 29.99,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop',
    validUntil: '2024-08-15',
    venues: ['Downtown Bistro', 'Garden Restaurant']
  },
  {
    id: 'fb3',
    title: 'Festival Food Pass',
    description: '5 food vouchers + 3 beverage tokens for any festival',
    originalPrice: 60.00,
    discountPrice: 39.99,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=300&fit=crop',
    validUntil: '2024-09-30',
    venues: ['All Festival Venues']
  }
];

export const promotions: Promotion[] = [
  {
    id: 'p1',
    title: 'Summer Entertainment Pass',
    description: 'Get 30% off on all events and movie tickets',
    discount: '30% OFF',
    code: 'SUMMER30',
    validUntil: '2024-08-31',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop'
  },
  {
    id: 'p2',
    title: 'Walmart+ Exclusive',
    description: 'Members get early access to premium events',
    discount: 'EARLY ACCESS',
    code: 'WALMARTPLUS',
    validUntil: '2024-12-31',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop',
    isMemberOnly: true
  },
  {
    id: 'p3',
    title: 'App-Only Flash Sale',
    description: 'Limited time: 50% off selected comedy shows',
    discount: '50% OFF',
    code: 'APPFLASH50',
    validUntil: '2024-06-30',
    image: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=400&h=300&fit=crop',
    isAppOnly: true
  }
];

export const merchandise: Merchandise[] = [
  {
    id: 'mer1',
    name: 'Concert T-Shirt',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    category: 'Apparel',
    relatedEvent: 'e1'
  },
  {
    id: 'mer2',
    name: 'Festival Camping Chair',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=400&fit=crop',
    category: 'Outdoor',
    relatedEvent: 'e1'
  },
  {
    id: 'mer3',
    name: 'Comedy Show Mug',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop',
    category: 'Accessories',
    relatedEvent: 'e2'
  },
  {
    id: 'mer4',
    name: 'Art Fair Tote Bag',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop',
    category: 'Accessories',
    relatedEvent: 'e3'
  },
  {
    id: 'mer5',
    name: 'Sports Fan Jersey',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop',
    category: 'Apparel',
    relatedEvent: 'e5'
  },
  {
    id: 'mer6',
    name: 'Portable Cooler',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    category: 'Outdoor',
    relatedEvent: 'e5'
  }
];

export const categories = [
  { id: 'all', name: 'All Events', icon: '🎪' },
  { id: 'movies', name: 'Movies', icon: '🎬' },
  { id: 'concert', name: 'Concerts', icon: '🎤' },
  { id: 'comedy', name: 'Comedy', icon: '😂' },
  { id: 'cultural', name: 'Cultural', icon: '🎭' },
  { id: 'lifestyle', name: 'Lifestyle', icon: '🎨' },
  { id: 'sports', name: 'Sports', icon: '⚽' }
];