import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Share2, ChevronLeft, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/contexts/CartContext';
import { products } from '@/data/products';
import { useToast } from '@/hooks/use-toast';
import ARViewer from '@/components/ARViewer';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { addItem } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Link to="/">
          <Button>Back to Home</Button>
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product);
    }
    toast({
      title: "Added to cart!",
      description: `${quantity} x ${product.name} added to your cart.`,
    });
  };

  const relatedProducts = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

  // Mock AR model URLs - in a real app, these would come from the product data
  const getARModelUrl = (productId: string) => {
    const arModels: Record<string, { modelUrl: string; posterUrl: string }> = {
      '1': {
        modelUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.glb',
        posterUrl: 'https://modelviewer.dev/shared-assets/models/Astronaut.webp'
      },
      '2': {
        modelUrl: 'https://modelviewer.dev/shared-assets/models/shishkebab.glb',
        posterUrl: 'https://modelviewer.dev/shared-assets/models/shishkebab.webp'
      },
      '5': {
        modelUrl: 'https://modelviewer.dev/shared-assets/models/reflective-sphere.glb',
        posterUrl: 'https://modelviewer.dev/shared-assets/models/reflective-sphere.webp'
      }
    };
    return arModels[productId];
  };

  const arModel = getARModelUrl(product.id);

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-primary hover:underline">Home</Link>
            <span>/</span>
            <Link to={`/category/${product.category.toLowerCase()}`} className="text-primary hover:underline">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-muted-foreground">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Link to="/" className="inline-flex items-center text-primary hover:underline mb-6">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Products
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg border"
              />
              {product.isRollback && (
                <Badge className="absolute top-4 left-4 bg-sale-red text-sale-red-foreground">
                  Rollback
                </Badge>
              )}
            </div>
            
            {/* Thumbnail images */}
            <div className="flex space-x-2">
              {[...Array(4)].map((_, i) => (
                <img
                  key={i}
                  src={product.image}
                  alt={`${product.name} view ${i + 1}`}
                  className="w-16 h-16 object-cover rounded border cursor-pointer hover:border-primary"
                />
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < 4 ? 'fill-walmart-yellow text-walmart-yellow' : 'text-muted-foreground'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">(124 reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-foreground">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
                {product.originalPrice && (
                  <Badge variant="secondary" className="bg-sale-red text-sale-red-foreground">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </Badge>
                )}
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-2">Product Description</h3>
              <p className="text-muted-foreground leading-relaxed">
                {product.description}
              </p>
            </div>

            <Separator />

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Quantity</label>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-walmart-yellow text-walmart-yellow-foreground hover:bg-walmart-yellow/90"
                  size="lg"
                >
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Add to Cart
                </Button>
                <Button variant="outline" size="lg">
                  <Heart className="h-5 w-5 mr-2" />
                  Save for Later
                </Button>
              </div>

              {/* AR Viewer */}
              <ARViewer
                productName={product.name}
                modelUrl={arModel?.modelUrl}
                posterUrl={arModel?.posterUrl}
                className="mt-4"
              />
            </div>

            <Separator />

            {/* Additional Info */}
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">SKU:</span>
                <span>{product.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category:</span>
                <span>{product.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Availability:</span>
                <span className="text-green-600">In Stock</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping:</span>
                <span>Free on orders $35+</span>
              </div>
            </div>

            {/* Share */}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-muted-foreground">Share:</span>
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <Link to={`/product/${relatedProduct.id}`}>
                      <img
                        src={relatedProduct.image}
                        alt={relatedProduct.name}
                        className="w-full h-40 object-cover rounded mb-3"
                      />
                      <h3 className="font-medium text-sm line-clamp-2 mb-2">
                        {relatedProduct.name}
                      </h3>
                      <div className="text-lg font-bold">
                        ${relatedProduct.price.toFixed(2)}
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;