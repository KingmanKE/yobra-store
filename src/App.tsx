import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { Layout } from "@/components/Layout";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Store } from "@/pages/Store";
import { AdminDashboard } from "@/pages/admin/AdminDashboard";
import { ProductManagement } from "@/pages/admin/ProductManagement";
import { UserActivityPage } from "@/pages/admin/UserActivity";
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
