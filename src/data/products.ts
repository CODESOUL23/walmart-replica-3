import { Product } from '@/contexts/CartContext';
import tvImage from '@/assets/tv-65inch.jpg';
import laptopImage from '@/assets/laptop-premium.jpg';
import earbudsImage from '@/assets/earbuds-wireless.jpg';
import smartphoneImage from '@/assets/smartphone-black.jpg';
import coffeeMakerImage from '@/assets/coffee-maker.jpg';
import milkImage from '@/assets/milk-gallon.jpg';
import breadImage from '@/assets/bread-loaf.jpg';
import eggsImage from '@/assets/eggs-dozen.jpg';
import bananasImage from '@/assets/bananas-fresh.jpg';
import toiletPaperImage from '@/assets/toilet-paper.jpg';
import handSanitizerImage from '@/assets/hand-sanitizer.jpg';

// Daily essentials for quick delivery
export const quickDeliveryProducts: Product[] = [
  {
    id: 'q1',
    name: 'Milk - Whole, 1 Gallon',
    price: 3.98,
    image: milkImage,
    description: 'Fresh whole milk, perfect for daily needs.',
    category: 'Grocery',
    isQuickDelivery: true,
  },
  {
    id: 'q2',
    name: 'Bread - White Loaf',
    price: 2.48,
    image: breadImage,
    description: 'Fresh white bread loaf for everyday meals.',
    category: 'Grocery',
    isQuickDelivery: true,
  },
  {
    id: 'q3',
    name: 'Eggs - Grade A Large, 12 Count',
    price: 2.78,
    image: eggsImage,
    description: 'Fresh grade A large eggs, dozen pack.',
    category: 'Grocery',
    isQuickDelivery: true,
  },
  {
    id: 'q4',
    name: 'Bananas - Fresh, 3 lbs',
    price: 1.98,
    image: bananasImage,
    description: 'Fresh ripe bananas, perfect for snacking.',
    category: 'Grocery',
    isQuickDelivery: true,
  },
  {
    id: 'q5',
    name: 'Toilet Paper - 12 Pack',
    price: 8.98,
    image: toiletPaperImage,
    description: 'Essential bathroom tissue, 12-roll pack.',
    category: 'Home & Kitchen',
    isQuickDelivery: true,
  },
  {
    id: 'q6',
    name: 'Hand Sanitizer - 8 oz',
    price: 3.47,
    image: handSanitizerImage,
    description: 'Antibacterial hand sanitizer gel.',
    category: 'Health & Personal Care',
    isQuickDelivery: true,
  },
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Samsung 65" Class 4K UHD Smart TV',
    price: 548.00,
    originalPrice: 698.00,
    image: tvImage,
    description: 'Experience stunning 4K UHD picture quality with this Samsung 65-inch smart TV. Features built-in streaming apps, voice control, and HDR technology for vibrant colors and sharp detail.',
    category: 'Electronics',
    isRollback: true,
  },
  {
    id: '2',
    name: 'HP Laptop 15.6" Intel Core i5, 8GB RAM, 256GB SSD',
    price: 429.00,
    originalPrice: 549.00,
    image: laptopImage,
    description: 'Powerful and portable HP laptop with Intel Core i5 processor, 8GB RAM, and 256GB SSD storage. Perfect for work, study, and entertainment.',
    category: 'Electronics',
    isRollback: true,
  },
  {
    id: '3',
    name: 'Apple AirPods Pro (2nd Generation)',
    price: 199.00,
    originalPrice: 249.00,
    image: earbudsImage,
    description: 'Next-level Active Noise Cancellation, Adaptive Transparency, and Personalized Spatial Audio. Sweat and water resistant.',
    category: 'Electronics',
    isRollback: false,
  },
  {
    id: '4',
    name: 'iPhone 15 Pro 128GB - Natural Titanium',
    price: 999.00,
    image: smartphoneImage,
    description: 'iPhone 15 Pro with titanium design, A17 Pro chip, and advanced camera system. The most Pro iPhone ever.',
    category: 'Electronics',
    isRollback: false,
  },
  {
    id: '5',
    name: 'Keurig K-Classic Coffee Maker',
    price: 89.00,
    originalPrice: 129.00,
    image: coffeeMakerImage,
    description: 'Brew a perfect cup every time with this classic Keurig coffee maker. Compatible with all K-Cup pods.',
    category: 'Home & Kitchen',
    isRollback: true,
  },
  {
    id: '6',
    name: 'Samsung Galaxy S24 Ultra 256GB',
    price: 1199.00,
    image: smartphoneImage,
    description: 'The ultimate Galaxy S experience with S Pen, advanced AI features, and professional-grade camera.',
    category: 'Electronics',
    isRollback: false,
  },
];

export const categories = [
  { id: 'electronics', name: 'Electronics', icon: '📱' },
  { id: 'home', name: 'Home & Garden', icon: '🏠' },
  { id: 'clothing', name: 'Clothing', icon: '👕' },
  { id: 'grocery', name: 'Grocery', icon: '🛒' },
  { id: 'auto', name: 'Auto & Tires', icon: '🚗' },
  { id: 'pharmacy', name: 'Pharmacy', icon: '💊' },
];