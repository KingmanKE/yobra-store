import { supabase } from '@/integrations/supabase/client';

const API_BASE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;

async function getAuthHeaders() {
  const session = await supabase.auth.getSession();
  const token = session.data.session?.access_token;

  return {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

export const productsApi = {
  async getAll(params?: { category?: string; search?: string; deals?: boolean; limit?: number; offset?: number }) {
    const url = new URL(`${API_BASE_URL}/products`);
    if (params?.category) url.searchParams.set('category', params.category);
    if (params?.search) url.searchParams.set('search', params.search);
    if (params?.deals) url.searchParams.set('deals', 'true');
    if (params?.limit) url.searchParams.set('limit', params.limit.toString());
    if (params?.offset) url.searchParams.set('offset', params.offset.toString());

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  async getById(id: string) {
    const response = await fetch(`${API_BASE_URL}/products/${id}`);
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  async create(product: any) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers,
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Failed to create product');
    return response.json();
  },

  async update(id: string, product: any) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Failed to update product');
    return response.json();
  },

  async delete(id: string) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'DELETE',
      headers,
    });
    if (!response.ok) throw new Error('Failed to delete product');
    return response.json();
  },
};

export const ordersApi = {
  async getAll() {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/orders`, {
      headers,
    });
    if (!response.ok) throw new Error('Failed to fetch orders');
    return response.json();
  },

  async getById(id: string) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      headers,
    });
    if (!response.ok) throw new Error('Failed to fetch order');
    return response.json();
  },

  async create(order: any) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers,
      body: JSON.stringify(order),
    });
    if (!response.ok) throw new Error('Failed to create order');
    return response.json();
  },

  async update(id: string, order: any) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(order),
    });
    if (!response.ok) throw new Error('Failed to update order');
    return response.json();
  },

  async delete(id: string) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/orders/${id}`, {
      method: 'DELETE',
      headers,
    });
    if (!response.ok) throw new Error('Failed to delete order');
    return response.json();
  },
};

export const cartApi = {
  async getAll() {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/cart`, {
      headers,
    });
    if (!response.ok) throw new Error('Failed to fetch cart');
    return response.json();
  },

  async addItem(productId: string, quantity: number = 1) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ product_id: productId, quantity }),
    });
    if (!response.ok) throw new Error('Failed to add item to cart');
    return response.json();
  },

  async updateItem(cartId: string, quantity: number) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/cart/${cartId}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ quantity }),
    });
    if (!response.ok) throw new Error('Failed to update cart item');
    return response.json();
  },

  async removeItem(cartId: string) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/cart/${cartId}`, {
      method: 'DELETE',
      headers,
    });
    if (!response.ok) throw new Error('Failed to remove item from cart');
    return response.json();
  },

  async clear() {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: 'DELETE',
      headers,
    });
    if (!response.ok) throw new Error('Failed to clear cart');
    return response.json();
  },
};

export const wishlistApi = {
  async getAll() {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/wishlist`, {
      headers,
    });
    if (!response.ok) throw new Error('Failed to fetch wishlist');
    return response.json();
  },

  async addItem(productId: string) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/wishlist`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ product_id: productId }),
    });
    if (!response.ok) throw new Error('Failed to add item to wishlist');
    return response.json();
  },

  async removeItem(wishlistId: string) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/wishlist/${wishlistId}`, {
      method: 'DELETE',
      headers,
    });
    if (!response.ok) throw new Error('Failed to remove item from wishlist');
    return response.json();
  },

  async removeByProductId(productId: string) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/wishlist/product/${productId}`, {
      method: 'DELETE',
      headers,
    });
    if (!response.ok) throw new Error('Failed to remove item from wishlist');
    return response.json();
  },
};

export const usersApi = {
  async getAll() {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/users`, {
      headers,
    });
    if (!response.ok) throw new Error('Failed to fetch users');
    return response.json();
  },

  async getById(id: string) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      headers,
    });
    if (!response.ok) throw new Error('Failed to fetch user');
    return response.json();
  },

  async getMe() {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      headers,
    });
    if (!response.ok) throw new Error('Failed to fetch user profile');
    return response.json();
  },

  async updateMe(profile: any) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/users/me`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(profile),
    });
    if (!response.ok) throw new Error('Failed to update profile');
    return response.json();
  },

  async updateRoles(userId: string, roles: string[]) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/users/${userId}/roles`, {
      method: 'PUT',
      headers,
      body: JSON.stringify({ roles }),
    });
    if (!response.ok) throw new Error('Failed to update user roles');
    return response.json();
  },

  async delete(id: string) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
      headers,
    });
    if (!response.ok) throw new Error('Failed to delete user');
    return response.json();
  },
};

export const categoriesApi = {
  async getAll() {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
  },

  async getById(id: string) {
    const response = await fetch(`${API_BASE_URL}/categories/${id}`);
    if (!response.ok) throw new Error('Failed to fetch category');
    return response.json();
  },

  async create(category: any) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/categories`, {
      method: 'POST',
      headers,
      body: JSON.stringify(category),
    });
    if (!response.ok) throw new Error('Failed to create category');
    return response.json();
  },

  async update(id: string, category: any) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'PUT',
      headers,
      body: JSON.stringify(category),
    });
    if (!response.ok) throw new Error('Failed to update category');
    return response.json();
  },

  async delete(id: string) {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/categories/${id}`, {
      method: 'DELETE',
      headers,
    });
    if (!response.ok) throw new Error('Failed to delete category');
    return response.json();
  },
};

export const analyticsApi = {
  async getDashboard() {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/analytics/dashboard`, {
      headers,
    });
    if (!response.ok) throw new Error('Failed to fetch analytics dashboard');
    return response.json();
  },

  async getRevenue(period: string = '7days') {
    const headers = await getAuthHeaders();
    const url = new URL(`${API_BASE_URL}/analytics/revenue`);
    url.searchParams.set('period', period);

    const response = await fetch(url.toString(), {
      headers,
    });
    if (!response.ok) throw new Error('Failed to fetch revenue data');
    return response.json();
  },

  async getProducts() {
    const headers = await getAuthHeaders();
    const response = await fetch(`${API_BASE_URL}/analytics/products`, {
      headers,
    });
    if (!response.ok) throw new Error('Failed to fetch product analytics');
    return response.json();
  },
};
