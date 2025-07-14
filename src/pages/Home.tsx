import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import ProductCard from '@/components/ProductCard';
import { products, categories } from '@/data/products';
import bannerImage from '@/assets/banner-deals.jpg';

const Home = () => {
  const rollbackProducts = products.filter(p => p.isRollback);
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative bg-gradient-to-r from-primary to-walmart-blue-light text-primary-foreground">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Save money. Live better.
              </h1>
              <p className="text-xl mb-6 opacity-90">
                Shop thousands of items with everyday low prices and free shipping on orders $35+
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-walmart-yellow text-walmart-yellow-foreground hover:bg-walmart-yellow/90">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Link to="/quick-delivery">
                  <Button size="lg" className="bg-sale-red text-sale-red-foreground hover:bg-sale-red/90">
                    Get In 10 Mins
                    <TrendingUp className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/district">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                    Walmart District
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/gamification">
                  <Button size="lg" className="bg-walmart-yellow text-walmart-yellow-foreground hover:bg-walmart-yellow/90">
                    Rewards Hub
                    <TrendingUp className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Weekly Ad
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src={bannerImage}
                alt="Great Deals"
                className="rounded-lg shadow-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link key={category.id} to={`/category/${category.id}`}>
              <Card className="hover:shadow-md transition-shadow duration-200 h-full">
                <CardContent className="p-6 text-center">
                  <div className="text-4xl mb-2">{category.icon}</div>
                  <h3 className="font-medium text-sm">{category.name}</h3>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Rollback Deals */}
      <section className="bg-walmart-gray-light">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Badge className="bg-sale-red text-sale-red-foreground text-lg px-3 py-1">
                Rollbacks
              </Badge>
              <h2 className="text-2xl font-bold">Great Value, Every Day</h2>
            </div>
            <Link to="/deals">
              <Button variant="outline">
                View All Deals
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {rollbackProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Top Picks */}
      <section className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-2">
            <Star className="h-6 w-6 fill-walmart-yellow text-walmart-yellow" />
            <h2 className="text-2xl font-bold">Top Picks for You</h2>
          </div>
          <Link to="/products">
            <Button variant="outline">
              View All Products
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Services Banner */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">More Ways to Shop</h2>
            <p className="text-xl mb-8 opacity-90">
              Pickup, delivery, and more services to make shopping easier
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-primary-foreground text-primary">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-2">🚚</div>
                  <h3 className="font-bold mb-2">Free Delivery</h3>
                  <p className="text-sm">On orders $35+ or with Walmart+</p>
                </CardContent>
              </Card>
              <Card className="bg-primary-foreground text-primary">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-2">🏪</div>
                  <h3 className="font-bold mb-2">Store Pickup</h3>
                  <p className="text-sm">Order online, pickup in store</p>
                </CardContent>
              </Card>
              <Card className="bg-primary-foreground text-primary">
                <CardContent className="p-6 text-center">
                  <div className="text-3xl mb-2">⚡</div>
                  <h3 className="font-bold mb-2">Same-Day Delivery</h3>
                  <p className="text-sm">Get it today with Walmart+</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;