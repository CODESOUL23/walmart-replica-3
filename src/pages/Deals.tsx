import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

const Deals = () => {
  const rollbackProducts = products.filter(p => p.isRollback);
  const allDeals = products.filter(p => p.originalPrice && p.originalPrice > p.price);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-sale-red text-sale-red-foreground">
        <div className="container mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center text-sale-red-foreground hover:underline mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center space-x-3">
            <Tag className="h-8 w-8" />
            <h1 className="text-3xl font-bold">Deals & Rollbacks</h1>
          </div>
          <p className="text-lg mt-2 opacity-90">
            Save big on your favorite items with our everyday low prices
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Rollback Section */}
        <section className="mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <Badge className="bg-sale-red text-sale-red-foreground text-lg px-3 py-1">
              Rollbacks
            </Badge>
            <h2 className="text-2xl font-bold">Rolled Back Prices</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {rollbackProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* All Deals Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">All Deals</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {allDeals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {allDeals.length === 0 && rollbackProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold mb-2">No deals available right now</h3>
            <p className="text-muted-foreground mb-4">Check back later for great savings!</p>
            <Link to="/">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Deals;