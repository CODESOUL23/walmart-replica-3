import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  MapPin, 
  Clock, 
  Star, 
  ShoppingCart, 
  Filter,
  Ticket,
  Gift,
  Crown,
  Smartphone,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { 
  movies, 
  events, 
  fbCombos, 
  promotions, 
  merchandise, 
  categories,
  type Movie,
  type Event,
  type FBCombo,
  type Promotion,
  type Merchandise
} from '@/data/districtData';

const District = () => {
  const { addItem } = useCart();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');

  const filteredEvents = events.filter(event => {
    if (selectedCategory === 'all') return true;
    return event.category === selectedCategory;
  });

  const handleAddMerchandise = (item: Merchandise) => {
    const product = {
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      description: `${item.category} merchandise`,
      category: 'Merchandise'
    };
    addItem(product);
    toast({
      title: "Added to cart!",
      description: `${item.name} has been added to your cart.`,
    });
  };

  const MovieCard = ({ movie }: { movie: Movie }) => (
    <Card className="hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <img
          src={movie.image}
          alt={movie.title}
          className="w-full h-64 object-cover rounded-t-lg"
        />
        <Badge className="absolute top-2 right-2 bg-walmart-yellow text-walmart-yellow-foreground">
          {movie.rating}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-1">{movie.title}</h3>
        <p className="text-sm text-muted-foreground mb-2">{movie.genre}</p>
        <div className="flex items-center space-x-2 mb-3">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">{movie.duration}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg">${movie.price}</span>
          <Button size="sm" className="bg-walmart-yellow text-walmart-yellow-foreground hover:bg-walmart-yellow/90">
            <Ticket className="h-4 w-4 mr-1" />
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const EventCard = ({ event }: { event: Event }) => (
    <Card className="hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover rounded-t-lg"
        />
        <div className="absolute top-2 left-2 flex gap-1">
          {event.isMemberOnly && (
            <Badge className="bg-primary text-primary-foreground">
              <Crown className="h-3 w-3 mr-1" />
              Walmart+
            </Badge>
          )}
          {event.isAppOnly && (
            <Badge className="bg-sale-red text-sale-red-foreground">
              <Smartphone className="h-3 w-3 mr-1" />
              App Only
            </Badge>
          )}
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-2 line-clamp-1">{event.title}</h3>
        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{event.description}</p>
        <div className="space-y-2 mb-3">
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{new Date(event.date).toLocaleDateString()} at {event.time}</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">{event.venue}, {event.location}</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-lg">${event.price}</span>
          <Button size="sm" className="bg-walmart-yellow text-walmart-yellow-foreground hover:bg-walmart-yellow/90">
            Get Tickets
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const FBComboCard = ({ combo }: { combo: FBCombo }) => (
    <Card className="hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <img
          src={combo.image}
          alt={combo.title}
          className="w-full h-40 object-cover rounded-t-lg"
        />
        <Badge className="absolute top-2 right-2 bg-sale-red text-sale-red-foreground">
          Save ${(combo.originalPrice - combo.discountPrice).toFixed(2)}
        </Badge>
      </div>
      <CardContent className="p-4">
        <h3 className="font-bold text-lg mb-2">{combo.title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{combo.description}</p>
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg font-bold">${combo.discountPrice}</span>
          <span className="text-sm text-muted-foreground line-through">${combo.originalPrice}</span>
        </div>
        <Button size="sm" className="w-full bg-walmart-yellow text-walmart-yellow-foreground hover:bg-walmart-yellow/90">
          <Gift className="h-4 w-4 mr-1" />
          Claim Deal
        </Button>
      </CardContent>
    </Card>
  );

  const PromotionCard = ({ promotion }: { promotion: Promotion }) => (
    <Card className="hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-primary/5 to-walmart-yellow/5">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">{promotion.title}</h3>
            <p className="text-sm text-muted-foreground mb-2">{promotion.description}</p>
          </div>
          <Badge className="bg-sale-red text-sale-red-foreground text-lg px-2 py-1">
            {promotion.discount}
          </Badge>
        </div>
        <div className="flex items-center justify-between">
          <div className="text-sm">
            <span className="font-medium">Code: </span>
            <span className="font-mono bg-muted px-2 py-1 rounded">{promotion.code}</span>
          </div>
          <Button size="sm" variant="outline">
            Copy Code
          </Button>
        </div>
        <div className="flex items-center space-x-2 mt-2">
          {promotion.isMemberOnly && (
            <Badge variant="secondary">
              <Crown className="h-3 w-3 mr-1" />
              Walmart+ Only
            </Badge>
          )}
          {promotion.isAppOnly && (
            <Badge variant="secondary">
              <Smartphone className="h-3 w-3 mr-1" />
              App Only
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const MerchandiseCard = ({ item }: { item: Merchandise }) => (
    <Card className="hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-40 object-cover rounded-t-lg"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-medium text-sm mb-1 line-clamp-1">{item.name}</h3>
        <p className="text-xs text-muted-foreground mb-2">{item.category}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold">${item.price}</span>
          <Button 
            size="sm" 
            onClick={() => handleAddMerchandise(item)}
            className="bg-walmart-yellow text-walmart-yellow-foreground hover:bg-walmart-yellow/90"
          >
            <ShoppingCart className="h-3 w-3 mr-1" />
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-walmart-blue-light text-primary-foreground">
        <div className="container mx-auto px-4 py-8">
          <Link to="/" className="inline-flex items-center text-primary-foreground hover:underline mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center space-x-3">
            <div className="text-4xl">🎪</div>
            <div>
              <h1 className="text-3xl font-bold">Walmart District</h1>
              <p className="text-lg opacity-90">Entertainment meets shopping - discover, experience, shop</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Locations</SelectItem>
              <SelectItem value="ny">New York, NY</SelectItem>
              <SelectItem value="la">Los Angeles, CA</SelectItem>
              <SelectItem value="austin">Austin, TX</SelectItem>
              <SelectItem value="sf">San Francisco, CA</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Tabs defaultValue="events" className="space-y-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="events">🎪 Events</TabsTrigger>
            <TabsTrigger value="movies">🎬 Movies</TabsTrigger>
            <TabsTrigger value="combos">🍔 F&B Combos</TabsTrigger>
            <TabsTrigger value="deals">🎁 Deals</TabsTrigger>
            <TabsTrigger value="shop">🛍️ Shop</TabsTrigger>
          </TabsList>

          {/* Events Tab */}
          <TabsContent value="events" className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Upcoming Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map(event => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Movies Tab */}
          <TabsContent value="movies" className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Now Showing</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {movies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* F&B Combos Tab */}
          <TabsContent value="combos" className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Food & Beverage Combos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {fbCombos.map(combo => (
                  <FBComboCard key={combo.id} combo={combo} />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Deals Tab */}
          <TabsContent value="deals" className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Exclusive Deals & Promotions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {promotions.map(promotion => (
                  <PromotionCard key={promotion.id} promotion={promotion} />
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Shop Tab */}
          <TabsContent value="shop" className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-6">Shop the Show - Event Merchandise</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {merchandise.map(item => (
                  <MerchandiseCard key={item.id} item={item} />
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Featured Section */}
        <section className="mt-16 bg-gradient-to-r from-walmart-yellow/10 to-primary/10 rounded-lg p-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Experience More with Walmart+</h2>
            <p className="text-lg text-muted-foreground mb-6">
              Get exclusive access to premium events, early bird tickets, and member-only deals
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <Crown className="h-8 w-8 mx-auto mb-3 text-walmart-yellow" />
                  <h3 className="font-bold mb-2">Early Access</h3>
                  <p className="text-sm text-muted-foreground">Be the first to book premium events</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Gift className="h-8 w-8 mx-auto mb-3 text-walmart-yellow" />
                  <h3 className="font-bold mb-2">Exclusive Deals</h3>
                  <p className="text-sm text-muted-foreground">Member-only discounts and offers</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Star className="h-8 w-8 mx-auto mb-3 text-walmart-yellow" />
                  <h3 className="font-bold mb-2">VIP Experience</h3>
                  <p className="text-sm text-muted-foreground">Premium seating and perks</p>
                </CardContent>
              </Card>
            </div>
            <Button size="lg" className="mt-6 bg-walmart-yellow text-walmart-yellow-foreground hover:bg-walmart-yellow/90">
              Join Walmart+ Today
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default District;