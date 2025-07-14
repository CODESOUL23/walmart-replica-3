import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import { quickDeliveryProducts } from '@/data/products';

const QuickDelivery = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-walmart-yellow text-walmart-yellow-foreground">
        <div className="container mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center text-walmart-yellow-foreground hover:underline mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center space-x-3">
            <Clock className="h-8 w-8" />
            <h1 className="text-3xl font-bold">Get In 10 Mins</h1>
          </div>
          <p className="text-lg mt-2 opacity-90">
            Daily essentials and everyday items delivered in just 10 minutes
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Quick Delivery Info */}
        <section className="mb-12">
          <div className="bg-primary text-primary-foreground rounded-lg p-6 mb-8">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="h-6 w-6" />
              <h2 className="text-xl font-bold">Lightning Fast Delivery</h2>
            </div>
            <p className="mb-4">
              Need something urgently? Our 10-minute delivery service brings daily essentials 
              straight to your door in record time. Perfect for last-minute needs!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Badge className="bg-walmart-yellow text-walmart-yellow-foreground">
                  ✓
                </Badge>
                <span>10-minute delivery guarantee</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-walmart-yellow text-walmart-yellow-foreground">
                  ✓
                </Badge>
                <span>No minimum order</span>
              </div>
              <div className="flex items-center space-x-2">
                <Badge className="bg-walmart-yellow text-walmart-yellow-foreground">
                  ✓
                </Badge>
                <span>Available 24/7</span>
              </div>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section>
          <div className="flex items-center space-x-2 mb-6">
            <Badge className="bg-walmart-yellow text-walmart-yellow-foreground text-lg px-3 py-1">
              Quick Delivery
            </Badge>
            <h2 className="text-2xl font-bold">Daily Essentials</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {quickDeliveryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {quickDeliveryProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No quick delivery items available right now</h3>
            <p className="text-muted-foreground mb-4">Check back later for instant delivery options!</p>
            <Link to="/">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickDelivery;