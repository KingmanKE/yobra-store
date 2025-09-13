import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { Moon, Sun, ShoppingBag, Settings, Search, User } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center gap-2">
              <ShoppingBag className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">
                StoreHub
              </span>
            </Link>
            
            {!isAdmin && (
              <div className="hidden md:flex items-center gap-1">
                <div className="relative max-w-sm">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search products..."
                    className="pl-10 w-72"
                  />
                </div>
              </div>
            )}
          </div>

          <nav className="flex items-center gap-4">
            {!isAdmin ? (
              <>
                <Link to="/admin">
                  <Button variant="ghost" size="sm">
                    <Settings className="h-4 w-4 mr-2" />
                    Admin
                  </Button>
                </Link>
                <Button variant="ghost" size="sm">
                  <User className="h-4 w-4 mr-2" />
                  Account
                </Button>
              </>
            ) : (
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  Store
                </Button>
              </Link>
            )}
            
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="p-2"
            >
              {theme === 'light' ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t bg-muted/50">
        <div className="container py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <ShoppingBag className="h-6 w-6 text-primary" />
                <span className="text-lg font-bold">StoreHub</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your trusted online marketplace for quality products.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-3">Quick Links</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/" className="hover:text-foreground transition-fast">Home</Link></li>
                <li><Link to="/categories" className="hover:text-foreground transition-fast">Categories</Link></li>
                <li><Link to="/deals" className="hover:text-foreground transition-fast">Deals</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Customer Service</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/help" className="hover:text-foreground transition-fast">Help Center</Link></li>
                <li><Link to="/returns" className="hover:text-foreground transition-fast">Returns</Link></li>
                <li><Link to="/contact" className="hover:text-foreground transition-fast">Contact Us</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Connect</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Email: support@storehub.com</li>
                <li>Phone: +1 (555) 123-4567</li>
                <li>WhatsApp: +1 (555) 987-6543</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 StoreHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};