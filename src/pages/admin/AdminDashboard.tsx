import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  Package, 
  Users, 
  ShoppingCart,
  DollarSign,
  Eye,
  MessageCircle
} from 'lucide-react';
import { mockProducts, mockUserActivities } from '@/data/mockData';

export const AdminDashboard: React.FC = () => {
  const totalProducts = mockProducts.length;
  const inStockProducts = mockProducts.filter(p => p.inStock).length;
  const totalRevenue = mockProducts.reduce((sum, p) => sum + (p.price * 10), 0); // Mock revenue
  const recentActivities = mockUserActivities.slice(0, 5);

  const stats = [
    {
      title: 'Total Products',
      value: totalProducts,
      icon: Package,
      change: '+12%',
      changeType: 'positive' as const
    },
    {
      title: 'In Stock',
      value: inStockProducts,
      icon: TrendingUp,
      change: '+5%',
      changeType: 'positive' as const
    },
    {
      title: 'Total Revenue',
      value: `$${totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      change: '+23%',
      changeType: 'positive' as const
    },
    {
      title: 'Active Users',
      value: '1,247',
      icon: Users,
      change: '+8%',
      changeType: 'positive' as const
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your store performance</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="gradient-card">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <Badge variant={stat.changeType === 'positive' ? 'default' : 'destructive'} className="text-xs">
                    {stat.change}
                  </Badge>
                  <span className="ml-2">from last month</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Products */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockProducts.slice(0, 5).map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-10 h-10 rounded object-cover"
                    />
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm">${product.price}</p>
                    <Badge variant={product.inStock ? 'default' : 'destructive'} className="text-xs">
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card>
          <CardHeader>
            <CardTitle>User Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => {
                const getIcon = (action: string) => {
                  switch (action) {
                    case 'Product Viewed':
                      return Eye;
                    case 'WhatsApp Order':
                      return MessageCircle;
                    case 'Search Performed':
                    case 'Category Browsed':
                      return TrendingUp;
                    default:
                      return Users;
                  }
                };
                
                const Icon = getIcon(activity.action);
                
                return (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{activity.userName}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.action}
                        {activity.productName && ` - ${activity.productName}`}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-fast">
              <Package className="h-6 w-6 text-primary mb-2" />
              <p className="text-sm font-medium">Add Product</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-fast">
              <Users className="h-6 w-6 text-primary mb-2" />
              <p className="text-sm font-medium">View Users</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-fast">
              <ShoppingCart className="h-6 w-6 text-primary mb-2" />
              <p className="text-sm font-medium">Orders</p>
            </div>
            <div className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-fast">
              <TrendingUp className="h-6 w-6 text-primary mb-2" />
              <p className="text-sm font-medium">Analytics</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};