import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export const Cart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "LCD Monitor",
      price: 650,
      quantity: 1,
      image: "/placeholder.svg"
    },
    {
      id: "2", 
      name: "H1 Gamepad",
      price: 550,
      quantity: 2,
      image: "/placeholder.svg"
    }
  ]);

  const [couponCode, setCouponCode] = useState("");

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 0; // Free shipping
  const total = subtotal + shipping;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <span>/</span>
        <span>Cart</span>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-3">
          {/* Header */}
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
                  <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-xl">
                    🖥️
                  </div>
                  <span className="font-medium">{item.name}</span>
                </div>
                
                <span>${item.price}</span>
                
                <div className="flex items-center gap-2">
                  <div className="flex items-center border rounded w-20">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-8 w-8 p-0"
                    >
                      -
                    </Button>
                    <span className="flex-1 text-center text-sm">{item.quantity.toString().padStart(2, '0')}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-8 w-8 p-0"
                    >
                      +
                    </Button>
                  </div>
                </div>
                
                <span className="font-medium">${item.price * item.quantity}</span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between">
            <Button variant="outline" asChild>
              <Link to="/">Return To Shop</Link>
            </Button>
            <Button variant="outline">Update Cart</Button>
          </div>

          {/* Coupon */}
          <div className="flex gap-4 mt-8 max-w-md">
            <Input
              placeholder="Coupon Code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
            />
            <Button className="bg-destructive hover:bg-destructive/90">
              Apply Coupon
            </Button>
          </div>
        </div>

        {/* Cart Total */}
        <div>
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-medium mb-6">Cart Total</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between pb-2">
                <span>Subtotal:</span>
                <span>${subtotal}</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between pb-2">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              
              <Separator />
              
              <div className="flex justify-between font-medium text-lg py-2">
                <span>Total:</span>
                <span>${total}</span>
              </div>

              <Button className="w-full bg-destructive hover:bg-destructive/90 mt-6">
                Proceed to checkout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};