import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: string;
  product_id: string;
  quantity: number;
  products: {
    id: string;
    name: string;
    price: number;
    image: string;
  };
}

export const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchCart();
  }, [user, navigate]);

  const fetchCart = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('carts')
      .select(`
        id,
        product_id,
        quantity,
        products (
          id,
          name,
          price,
          image
        )
      `)
      .eq('user_id', user.id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to load cart',
        variant: 'destructive'
      });
    } else {
      setCartItems(data || []);
    }
    setLoading(false);
  };

  const updateQuantity = async (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    const { error } = await supabase
      .from('carts')
      .update({ quantity: newQuantity })
      .eq('id', id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update quantity',
        variant: 'destructive'
      });
    } else {
      fetchCart();
    }
  };

  const removeItem = async (id: string) => {
    const { error } = await supabase
      .from('carts')
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
        title: 'Item removed',
        description: 'Item removed from cart'
      });
      fetchCart();
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.products.price * item.quantity), 0);
  const shipping = 0;
  const total = subtotal + shipping;

  if (loading) {
    return <div className="container mx-auto px-4 py-16 text-center">Loading cart...</div>;
  }

  if (!user) {
    return null;
  }

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <Button asChild>
          <Link to="/products">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span>/</span>
        <span>Cart</span>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-3">
          <div className="grid grid-cols-4 gap-4 font-medium py-4 border-b mb-6">
            <span>Product</span>
            <span>Price</span>  
            <span>Quantity</span>
            <span>Subtotal</span>
          </div>

          <div className="space-y-4 mb-8">
            {cartItems.map((item) => (
              <div key={item.id} className="grid grid-cols-4 gap-4 items-center py-4 border rounded-lg px-4">
                <div className="flex items-center gap-3">
                  <img
                    src={item.products.image}
                    alt={item.products.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <span className="font-medium">{item.products.name}</span>
                </div>
                
                <span>${item.products.price}</span>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center border rounded">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="px-3 text-sm">{item.quantity.toString().padStart(2, '0')}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
                
                <span className="font-medium">${(item.products.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between">
            <Button variant="outline" asChild>
              <Link to="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>

        <div>
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-medium mb-6">Cart Total</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between pb-2">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between pb-2">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-medium text-lg py-2">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <Button 
                className="w-full bg-destructive hover:bg-destructive/90 mt-6"
                onClick={() => navigate('/checkout')}
              >
                Proceed to checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};