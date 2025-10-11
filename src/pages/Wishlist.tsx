import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingCart, Eye, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface WishlistItem {
  id: string;
  product_id: string;
  products: {
    id: string;
    name: string;
    price: number;
    original_price: number | null;
    discount: number | null;
    image: string;
  };
}

export const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchWishlist();
  }, [user, navigate]);

  const fetchWishlist = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('wishlists')
      .select(`
        id,
        product_id,
        products (
          id,
          name,
          price,
          original_price,
          discount,
          image
        )
      `)
      .eq('user_id', user.id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to load wishlist',
        variant: 'destructive'
      });
    } else {
      setWishlistItems(data || []);
    }
    setLoading(false);
  };

  const removeFromWishlist = async (id: string) => {
    const { error } = await supabase
      .from('wishlists')
      .delete()
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove item',
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Removed',
        description: 'Item removed from wishlist'
      });
      fetchWishlist();
    }
  };

  const addToCart = async (productId: string) => {
    if (!user) return;

    const { error } = await supabase
      .from('carts')
      .upsert({
        user_id: user.id,
        product_id: productId,
        quantity: 1
      }, {
        onConflict: 'user_id,product_id'
      });

    if (error) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Added to cart',
        description: 'Item added to your cart'
      });
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-16 text-center">Loading wishlist...</div>;
  }

  if (!user) {
    return null;
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
        <Button asChild>
          <Link to="/products">Browse Products</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl">Wishlist ({wishlistItems.length})</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {wishlistItems.map((item) => (
          <Card key={item.id} className="group relative overflow-hidden">
            <CardContent className="p-0">
              {item.products.discount && (
                <div className="absolute top-3 left-3 bg-destructive text-white px-2 py-1 text-xs rounded z-10">
                  -{item.products.discount}%
                </div>
              )}
              
              <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                <Button 
                  size="icon" 
                  variant="outline" 
                  className="h-8 w-8 bg-white"
                  onClick={() => removeFromWishlist(item.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="aspect-square bg-gray-100 relative overflow-hidden">
                <img
                  src={item.products.image}
                  alt={item.products.name}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white p-3 transform translate-y-full group-hover:translate-y-0 transition-transform">
                  <Button 
                    className="w-full bg-black hover:bg-gray-800 text-white"
                    onClick={() => addToCart(item.product_id)}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add To Cart
                  </Button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-medium mb-2">{item.products.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-destructive font-bold">${item.products.price}</span>
                  {item.products.original_price && (
                    <span className="text-gray-500 line-through text-sm">
                      ${item.products.original_price}
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};