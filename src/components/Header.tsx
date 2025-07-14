import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, MapPin, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/contexts/CartContext';

const Header = () => {
  const { state } = useCart();
  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-primary text-primary-foreground">
      {/* Top bar */}
      <div className="border-b border-walmart-blue-light">
        <div className="container mx-auto px-4 py-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>Store Finder</span>
              </span>
              <span>Weekly Ad</span>
              <span>Services</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Hi! Sign in or create account</span>
              <span>$0.00</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="bg-walmart-yellow text-walmart-yellow-foreground px-3 py-2 rounded-md font-bold text-xl">
              W
            </div>
            <span className="text-2xl font-bold">Walmart</span>
          </Link>

          {/* Search bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Input
                placeholder="Search everything at Walmart online and in store"
                className="pl-4 pr-12 py-3 text-foreground bg-background border-input"
              />
              <Button 
                size="sm" 
                className="absolute right-1 top-1 bg-walmart-yellow text-walmart-yellow-foreground hover:bg-walmart-yellow/90"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="flex items-center space-x-1">
              <User className="h-5 w-5" />
              <span className="hidden md:inline">Account</span>
            </Button>
            
            <Link to="/cart">
              <Button variant="ghost" size="sm" className="flex items-center space-x-1 relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="hidden md:inline">Cart</span>
                {totalItems > 0 && (
                  <Badge 
                    variant="secondary" 
                    className="absolute -top-2 -right-2 bg-walmart-yellow text-walmart-yellow-foreground h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                  >
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-walmart-blue-light">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-6 py-3">
            <Button variant="ghost" size="sm" className="flex items-center space-x-1">
              <Menu className="h-4 w-4" />
              <span>All Departments</span>
            </Button>
            <Link to="/category/electronics" className="hover:underline">Electronics</Link>
            <Link to="/category/home" className="hover:underline">Home & Garden</Link>
            <Link to="/category/clothing" className="hover:underline">Clothing</Link>
            <Link to="/category/grocery" className="hover:underline">Grocery</Link>
            <Link to="/category/auto" className="hover:underline">Auto & Tires</Link>
            <Link to="/deals" className="hover:underline text-walmart-yellow">Deals</Link>
            <Link to="/district" className="hover:underline text-walmart-yellow">District</Link>
            <Link to="/gamification" className="hover:underline text-walmart-yellow">Rewards</Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;