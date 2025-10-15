import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Star, Eye, Heart, ArrowRight } from "lucide-react";
import { productsApi, categoriesApi } from "@/services/api";
import { useToast } from "@/hooks/use-toast";

export const Home = () => {
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56
  });
  const [flashSaleProducts, setFlashSaleProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [bestSellingProducts, setBestSellingProducts] = useState<any[]>([]);
  const [exploreProducts, setExploreProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => ({
        ...prev,
        seconds: prev.seconds > 0 ? prev.seconds - 1 : 59
      }));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [dealsData, categoriesData, allProductsData] = await Promise.all([
          productsApi.getAll({ deals: true, limit: 4 }),
          categoriesApi.getAll(),
          productsApi.getAll({ limit: 16 })
        ]);

        setFlashSaleProducts(dealsData.products || []);
        setCategories(categoriesData.categories || []);
        setBestSellingProducts((allProductsData.products || []).slice(0, 4));
        setExploreProducts((allProductsData.products || []).slice(4, 12));
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to load products. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [toast]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                  <span className="text-black text-xl">🍎</span>
                </div>
                <span>iPhone 14 Series</span>
              </div>
              <h1 className="text-5xl font-semibold mb-6 leading-tight">
                Up to 10%<br />off Voucher
              </h1>
              <Link to="/products" className="inline-flex items-center gap-2 text-white underline hover:no-underline">
                Shop Now <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center text-8xl">
                📱💜
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Flash Sales */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-5 h-10 bg-destructive rounded"></div>
            <span className="text-destructive font-semibold">Today's</span>
          </div>
          
          <div className="flex justify-between items-end mb-8">
            <div className="flex items-end gap-8">
              <h2 className="text-3xl font-semibold">Flash Sales</h2>
              <div className="flex items-center gap-4">
                {Object.entries(timeLeft).map(([unit, value]) => (
                  <div key={unit} className="text-center">
                    <div className="text-2xl font-bold">{value.toString().padStart(2, '0')}</div>
                    <div className="text-xs text-muted-foreground capitalize">{unit}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {flashSaleProducts.length === 0 ? (
              <div className="col-span-4 text-center py-8 text-gray-500">
                No flash sale products available at the moment.
              </div>
            ) : flashSaleProducts.map((product) => (
              <Card key={product.id} className="group relative overflow-hidden">
                <CardContent className="p-0">
                  {product.discount && (
                    <div className="absolute top-3 left-3 bg-destructive text-white px-2 py-1 text-xs rounded z-10">
                      -{product.discount}%
                    </div>
                  )}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                    <Button size="icon" variant="outline" className="h-8 w-8 bg-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="h-8 w-8 bg-white">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="aspect-square bg-gray-100 relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-3 transform translate-y-full group-hover:translate-y-0 transition-transform">
                      <Button className="w-full bg-black hover:bg-gray-800 text-white">
                        Add To Cart
                      </Button>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-medium mb-2">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-destructive font-bold">${product.price}</span>
                      <span className="text-gray-500 line-through text-sm">${product.originalPrice}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4" fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">({product.reviews})</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button className="bg-destructive hover:bg-destructive/90">
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Browse By Category */}
      <section className="py-16 border-t">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-5 h-10 bg-destructive rounded"></div>
            <span className="text-destructive font-semibold">Categories</span>
          </div>
          
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold">Browse By Category</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.length === 0 ? (
              <div className="col-span-6 text-center py-8 text-gray-500">
                No categories available.
              </div>
            ) : categories.slice(0, 6).map((category) => (
              <Link to={`/products?category=${category.id}`} key={category.id}>
                <Card className="cursor-pointer hover:bg-destructive hover:text-white transition-colors">
                  <CardContent className="p-6 text-center">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-16 h-16 object-cover mx-auto mb-4 rounded-full"
                    />
                    <div className="font-medium">{category.name}</div>
                    <div className="text-xs text-gray-500 mt-1">{category.product_count} items</div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Selling Products */}
      <section className="py-16 border-t">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-5 h-10 bg-destructive rounded"></div>
            <span className="text-destructive font-semibold">This Month</span>
          </div>
          
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold">Best Selling Products</h2>
            <Button className="bg-destructive hover:bg-destructive/90">
              View All
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellingProducts.length === 0 ? (
              <div className="col-span-4 text-center py-8 text-gray-500">
                No products available.
              </div>
            ) : bestSellingProducts.map((product) => (
              <Card key={product.id} className="group relative overflow-hidden">
                <CardContent className="p-0">
                  <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                    <Button size="icon" variant="outline" className="h-8 w-8 bg-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="h-8 w-8 bg-white">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="aspect-square bg-gray-100 relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-3 transform translate-y-full group-hover:translate-y-0 transition-transform">
                      <Button className="w-full bg-black hover:bg-gray-800 text-white">
                        Add To Cart
                      </Button>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-medium mb-2">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-destructive font-bold">${product.price}</span>
                      {product.original_price && (
                        <span className="text-gray-500 line-through text-sm">${product.original_price}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4" fill={i < Math.floor(product.rating) ? "currentColor" : "none"} />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">({product.reviews})</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Music Experience Banner */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-black text-white rounded-lg p-16 relative overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="text-green-400 mb-4">Categories</div>
                <h2 className="text-5xl font-bold mb-6 leading-tight">
                  Enhance Your<br />
                  Music Experience
                </h2>
                <div className="flex gap-4 mb-8">
                  <div className="bg-white text-black rounded-full w-16 h-16 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-sm font-bold">23</div>
                      <div className="text-xs">Hours</div>
                    </div>
                  </div>
                  <div className="bg-white text-black rounded-full w-16 h-16 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-sm font-bold">05</div>
                      <div className="text-xs">Days</div>
                    </div>
                  </div>
                  <div className="bg-white text-black rounded-full w-16 h-16 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-sm font-bold">59</div>
                      <div className="text-xs">Minutes</div>
                    </div>
                  </div>
                  <div className="bg-white text-black rounded-full w-16 h-16 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-sm font-bold">35</div>
                      <div className="text-xs">Seconds</div>
                    </div>
                  </div>
                </div>
                <Button className="bg-green-500 hover:bg-green-600 text-white">
                  Buy Now!
                </Button>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center text-8xl">
                  🎧
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-5 h-10 bg-destructive rounded"></div>
            <span className="text-destructive font-semibold">Our Products</span>
          </div>
          
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold">Explore Our Products</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {exploreProducts.length === 0 ? (
              <div className="col-span-4 text-center py-8 text-gray-500">
                No products available.
              </div>
            ) : exploreProducts.map((product) => (
              <Card key={product.id} className="group relative overflow-hidden">
                <CardContent className="p-0">
                  {product.in_stock === false && (
                    <div className="absolute top-3 left-3 bg-gray-500 text-white px-2 py-1 text-xs rounded z-10">
                      OUT OF STOCK
                    </div>
                  )}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                    <Button size="icon" variant="outline" className="h-8 w-8 bg-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" className="h-8 w-8 bg-white">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                  
                  <div className="aspect-square bg-gray-100 relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-3 transform translate-y-full group-hover:translate-y-0 transition-transform">
                      <Button className="w-full bg-black hover:bg-gray-800 text-white">
                        Add To Cart
                      </Button>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-medium mb-2">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-destructive font-bold">${product.price}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4" fill={i < Math.floor(product.rating || 0) ? "currentColor" : "none"} />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500">({product.reviews || 0})</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button className="bg-destructive hover:bg-destructive/90">
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* New Arrival */}
      <section className="py-16 border-t">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-5 h-10 bg-destructive rounded"></div>
            <span className="text-destructive font-semibold">Featured</span>
          </div>
          
          <h2 className="text-3xl font-semibold mb-8">New Arrival</h2>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-black text-white rounded-lg relative overflow-hidden min-h-[400px]">
              <div className="absolute inset-0 flex items-center justify-center text-8xl">
                🎮
              </div>
              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl font-bold mb-2">PlayStation 5</h3>
                <p className="text-gray-300 mb-4">Black and White version of the PS5 coming out on sale.</p>
                <Link to="/products" className="text-white underline hover:no-underline">
                  Shop Now
                </Link>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-black text-white rounded-lg relative overflow-hidden min-h-[180px]">
                <div className="absolute inset-0 flex items-center justify-center text-6xl">
                  👗
                </div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-xl font-bold mb-1">Women's Collections</h3>
                  <p className="text-gray-300 text-sm mb-2">Featured woman collections that give you another vibe.</p>
                  <Link to="/products" className="text-white underline hover:no-underline text-sm">
                    Shop Now
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black text-white rounded-lg relative overflow-hidden min-h-[180px]">
                  <div className="absolute inset-0 flex items-center justify-center text-4xl">
                    🔊
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h4 className="font-bold mb-1">Speakers</h4>
                    <p className="text-gray-300 text-xs mb-2">Amazon wireless speakers</p>
                    <Link to="/products" className="text-white underline hover:no-underline text-xs">
                      Shop Now
                    </Link>
                  </div>
                </div>
                <div className="bg-black text-white rounded-lg relative overflow-hidden min-h-[180px]">
                  <div className="absolute inset-0 flex items-center justify-center text-4xl">
                    🌿
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <h4 className="font-bold mb-1">Perfume</h4>
                    <p className="text-gray-300 text-xs mb-2">GUCCI INTENSE OUD EDP</p>
                    <Link to="/products" className="text-white underline hover:no-underline text-xs">
                      Shop Now
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                🚚
              </div>
              <h3 className="font-bold text-lg mb-2">FREE AND FAST DELIVERY</h3>
              <p className="text-sm text-gray-600">Free delivery for all orders over $140</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                🎧
              </div>
              <h3 className="font-bold text-lg mb-2">24/7 CUSTOMER SERVICE</h3>
              <p className="text-sm text-gray-600">Friendly 24/7 customer support</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                💰
              </div>
              <h3 className="font-bold text-lg mb-2">MONEY BACK GUARANTEE</h3>
              <p className="text-sm text-gray-600">We return money within 30 days</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};