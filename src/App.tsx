import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Layout } from "@/components/Layout";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Store } from "@/pages/Store";
import { Categories } from "@/pages/Categories";
import { Deals } from "@/pages/Deals";
import { Help } from "@/pages/Help";
import { ProductDetail } from "@/pages/ProductDetail";
import { SignUp } from "@/pages/SignUp";
import { Login } from "@/pages/Login";
import { Cart } from "@/pages/Cart";
import { About } from "@/pages/About";
import { Contact } from "@/pages/Contact";
import { Account } from "@/pages/Account";
import { Wishlist } from "@/pages/Wishlist";
import { AdminDashboard } from "@/pages/admin/AdminDashboard";
import { ProductManagement } from "@/pages/admin/ProductManagement";
import { UserActivityPage } from "@/pages/admin/UserActivity";
import { AddProduct } from "@/pages/admin/AddProduct";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Store Routes */}
            <Route path="/" element={
              <Layout>
                <Store />
              </Layout>
            } />
            <Route path="/categories" element={
              <Layout>
                <Categories />
              </Layout>
            } />
            <Route path="/deals" element={
              <Layout>
                <Deals />
              </Layout>
            } />
            <Route path="/help" element={
              <Layout>
                <Help />
              </Layout>
            } />
            <Route path="/product/:productId" element={
              <Layout>
                <ProductDetail />
              </Layout>
            } />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={
              <Layout>
                <Cart />
              </Layout>
            } />
            <Route path="/about" element={
              <Layout>
                <About />
              </Layout>
            } />
            <Route path="/contact" element={
              <Layout>
                <Contact />
              </Layout>
            } />
            <Route path="/account" element={
              <Layout>
                <Account />
              </Layout>
            } />
            <Route path="/wishlist" element={
              <Layout>
                <Wishlist />
              </Layout>
            } />
            
            {/* Admin Routes */}
            <Route path="/admin" element={
              <Layout>
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              </Layout>
            } />
            <Route path="/admin/products" element={
              <Layout>
                <AdminLayout>
                  <ProductManagement />
                </AdminLayout>
              </Layout>
            } />
            <Route path="/admin/products/new" element={
              <Layout>
                <AdminLayout>
                  <AddProduct />
                </AdminLayout>
              </Layout>
            } />
            <Route path="/admin/activities" element={
              <Layout>
                <AdminLayout>
                  <UserActivityPage />
                </AdminLayout>
              </Layout>
            } />
            <Route path="/admin/analytics" element={
              <Layout>
                <AdminLayout>
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold mb-4">Analytics Dashboard</h2>
                    <p className="text-muted-foreground">Coming soon...</p>
                  </div>
                </AdminLayout>
              </Layout>
            } />
            <Route path="/admin/settings" element={
              <Layout>
                <AdminLayout>
                  <div className="text-center py-12">
                    <h2 className="text-2xl font-bold mb-4">Settings</h2>
                    <p className="text-muted-foreground">Configuration options coming soon...</p>
                  </div>
                </AdminLayout>
              </Layout>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={
              <Layout>
                <NotFound />
              </Layout>
            } />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
