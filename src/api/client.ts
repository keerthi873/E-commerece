import { Product } from "@/components/store/catalog";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  rewardPoints: number;
};

export type AuthResponse = {
  success: boolean;
  message?: string;
  user?: AuthUser;
  token?: string;
};

export type OrderItem = {
  product: Product;
  qty: number;
};

export type OrderRecord = {
  id: string;
  date: string;
  status: string;
  expectedDelivery: string;
  totalAmount: number;
  items: OrderItem[];
  shippingAddress: Record<string, string>;
  paymentMethod?: string;
};

// Generic API Fetch Helper with Timeout & Fallback
async function fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  try {
    const token = localStorage.getItem("kartly_token");
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(options?.headers as Record<string, string>),
    };

    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!res.ok) {
      const errData = await res.json().catch(() => ({}));
      throw new Error(errData.message || `API Error ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.warn(`[Backend API] Endpoint ${endpoint} unreachable or error:`, err);
    return null;
  }
}

// ==========================================
// 1. PRODUCTS API CLIENT
// ==========================================
export async function apiGetProducts(category?: string, query?: string): Promise<Product[]> {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (query) params.set("q", query);

  const data = await fetchApi<{ success: boolean; products: Product[] }>(
    `/products?${params.toString()}`
  );
  return data?.products || [];
}

export async function apiGetProductById(id: string): Promise<Product | null> {
  const data = await fetchApi<{ success: boolean; product: Product }>(`/products/${id}`);
  return data?.product || null;
}

// ==========================================
// 2. AUTH API CLIENT
// ==========================================
export async function apiLogin(email: string, password: string): Promise<AuthResponse> {
  const res = await fetchApi<AuthResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
  return res || { success: false, message: "Server connection failed" };
}

export async function apiRegister(name: string, email: string, password: string): Promise<AuthResponse> {
  const res = await fetchApi<AuthResponse>("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
  return res || { success: false, message: "Server connection failed" };
}

// ==========================================
// 3. CART API CLIENT
// ==========================================
export async function apiGetCart(): Promise<{ product: Product; qty: number }[]> {
  const data = await fetchApi<{ success: boolean; cart: { product: Product; qty: number }[] }>("/cart");
  return data?.cart || [];
}

export async function apiAddToCart(product: Product, qty = 1) {
  return await fetchApi("/cart", {
    method: "POST",
    body: JSON.stringify({ product, qty }),
  });
}

export async function apiRemoveFromCart(productId: string) {
  return await fetchApi(`/cart/${productId}`, {
    method: "DELETE",
  });
}

// ==========================================
// 4. WISHLIST API CLIENT
// ==========================================
export async function apiGetWishlist(): Promise<string[]> {
  const data = await fetchApi<{ success: boolean; wishlist: string[] }>("/wishlist");
  return data?.wishlist || [];
}

export async function apiToggleWishlist(productId: string) {
  return await fetchApi("/wishlist", {
    method: "POST",
    body: JSON.stringify({ productId }),
  });
}

// ==========================================
// 5. ORDERS & SIMULATED PAYMENT API CLIENT
// ==========================================
export async function apiPlaceOrder(
  items: OrderItem[],
  totalAmount: number,
  shippingAddress: Record<string, string>,
  paymentMethod = "UPI / Card"
): Promise<OrderRecord | null> {
  const data = await fetchApi<{ success: boolean; order: OrderRecord }>("/orders", {
    method: "POST",
    body: JSON.stringify({ items, totalAmount, shippingAddress, paymentMethod }),
  });
  return data?.order || null;
}

export async function apiGetOrders(): Promise<OrderRecord[]> {
  const data = await fetchApi<{ success: boolean; orders: OrderRecord[] }>("/orders");
  return data?.orders || [];
}

export async function apiTrackOrder(orderId: string): Promise<OrderRecord | null> {
  const data = await fetchApi<{ success: boolean; order: OrderRecord }>(`/orders/${orderId}`);
  return data?.order || null;
}
