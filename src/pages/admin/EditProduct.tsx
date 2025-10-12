import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useNavigate, useParams } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ArrowLeft } from 'lucide-react';

export const EditProduct: React.FC = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const { toast } = useToast();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    price: 0,
    original_price: 0,
    discount: 0,
    category_id: '',
    description: '',
    image: '',
    in_stock: true,
    stock_quantity: 0,
    is_todays_deals: false
  });

  useEffect(() => {
    fetchCategories();
    fetchProduct();
  }, [productId]);

  const fetchCategories = async () => {
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('name');

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to load categories',
        variant: 'destructive'
      });
    } else {
      setCategories(data || []);
    }
  };

  const fetchProduct = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single();

    if (error) {
      toast({
        title: 'Product not found',
        description: "The product you're trying to edit doesn't exist.",
        variant: 'destructive'
      });
      navigate('/admin/products');
    } else if (data) {
      setFormData({
        name: data.name || '',
        brand: data.brand || '',
        price: data.price || 0,
        original_price: data.original_price || 0,
        discount: data.discount || 0,
        category_id: data.category_id || '',
        description: data.description || '',
        image: data.image || '',
        in_stock: data.in_stock ?? true,
        stock_quantity: data.stock_quantity || 0,
        is_todays_deals: data.is_todays_deals ?? false
      });
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.brand || formData.price <= 0) {
      toast({
        title: 'Validation Error',
        description: 'Please fill in all required fields correctly.',
        variant: 'destructive'
      });
      return;
    }

    const { error } = await supabase
      .from('products')
      .update(formData)
      .eq('id', productId);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to update product',
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Product updated',
        description: `${formData.name} has been updated successfully.`
      });
      navigate('/admin/products');
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-16 text-center">Loading product...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/admin/products')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand">Brand *</Label>
                <Input
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price ($) *</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="originalPrice">Original Price ($)</Label>
                <Input
                  id="originalPrice"
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.original_price}
                  onChange={(e) => setFormData({ ...formData, original_price: parseFloat(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discount">Discount (%)</Label>
                <Input
                  id="discount"
                  type="number"
                  min="0"
                  max="100"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: parseInt(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select
                  value={formData.category_id}
                  onValueChange={(value) => setFormData({ ...formData, category_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="stockQuantity">Stock Quantity</Label>
                <Input
                  id="stockQuantity"
                  type="number"
                  min="0"
                  value={formData.stock_quantity}
                  onChange={(e) => setFormData({ ...formData, stock_quantity: parseInt(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL</Label>
                <Input
                  id="image"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                placeholder="Enter product description..."
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="inStock">In Stock</Label>
                <p className="text-sm text-muted-foreground">Product is available for purchase</p>
              </div>
              <Switch
                id="inStock"
                checked={formData.in_stock}
                onCheckedChange={(checked) => setFormData({ ...formData, in_stock: checked })}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <Label htmlFor="todaysDeals">Add to Today's Deals</Label>
                <p className="text-sm text-muted-foreground">Feature this product in Today's Deals section</p>
              </div>
              <Switch
                id="todaysDeals"
                checked={formData.is_todays_deals}
                onCheckedChange={(checked) => setFormData({ ...formData, is_todays_deals: checked })}
              />
            </div>

            <div className="flex gap-4 justify-end">
              <Button type="button" variant="outline" onClick={() => navigate('/admin/products')}>
                Cancel
              </Button>
              <Button type="submit" className="gradient-primary">
                Update Product
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
