import * as React from "react";
import { toast } from "sonner";
import { products, type Product } from "./catalog";

export type CartLine = { product: Product; qty: number };

export type DeliveryAddress = {
  fullName: string;
  phone: string;
  pincode: string;
  addressLine: string;
  city: string;
  state: string;
  landmark?: string;
  addressType: "home" | "work";
};

export type StoreState = {
  query: string;
  setQuery: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  visibleProducts: Product[];
  cart: CartLine[];
  cartCount: number;
  cartTotal: number;
  cartMrpTotal: number;
  cartSubtotal: number;
  cartGstTotal: number;
  deliveryFee: number;
  addToCart: (p: Product) => void;
  buyNowProduct: CartLine | null;
  setBuyNowProduct: (v: CartLine | null) => void;
  buyNow: (p: Product) => void;
  clearBuyNow: () => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  wishlist: string[];
  toggleWishlist: (p: Product) => void;
  recentlyViewed: string[];
  addRecentlyViewed: (id: string) => void;
  user: string | null;
  signIn: (phone: string) => void;
  signOut: () => void;
  pincode: string;
  setPincode: (v: string) => void;
  savedAddress: DeliveryAddress | null;
  setSavedAddress: (addr: DeliveryAddress | null) => void;
  orders: any[];
};

const StoreContext = React.createContext<StoreState | null>(null);

const safeRead = <T,>(key: string, fallback: T): T => {
  try {
    if (typeof window === "undefined") return fallback;
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed !== undefined && parsed !== null ? (parsed as T) : fallback;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage`, error);
    return fallback;
  }
};

const normalizeProductLine = (item: any): CartLine | null => {
  if (!item) return null;
  if (item.product && item.product.id) {
    return {
      product: {
        id: String(item.product.id),
        title: item.product.title || item.product.name || "Product",
        price: Number(item.product.price) || 0,
        mrp: Number(item.product.mrp || item.product.price) || 0,
        brand: item.product.brand || "Brand",
        image: item.product.image || "https://picsum.photos/300?fallback",
        category: item.product.category || "general",
        rating: Number(item.product.rating) || 4.5,
        reviews: Number(item.product.reviews) || 10,
        ...item.product,
      },
      qty: typeof item.qty === "number" && item.qty > 0 ? item.qty : 1,
    };
  }
  if (item.id) {
    return {
      product: {
        id: String(item.id),
        title: item.title || item.name || "Product",
        price: Number(item.price) || 0,
        mrp: Number(item.mrp || item.price) || 0,
        brand: item.brand || "Brand",
        image: item.image || "https://picsum.photos/300?fallback",
        category: item.category || "general",
        rating: Number(item.rating) || 4.5,
        reviews: Number(item.reviews) || 10,
        ...item,
      },
      qty: typeof item.qty === "number" && item.qty > 0 ? item.qty : 1,
    };
  }
  return null;
};

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState("For You");
  const [cart, setCart] = React.useState<CartLine[]>([]);
  const [buyNowProduct, setBuyNowProduct] = React.useState<CartLine | null>(null);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [wishlist, setWishlist] = React.useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = React.useState<string[]>([]);
  const [user, setUser] = React.useState<string | null>(null);
  const [pincode, setPincode] = React.useState("560001");
  const [savedAddress, setSavedAddress] = React.useState<DeliveryAddress | null>(null);

  React.useEffect(() => {
    // Read cartItems safely from localStorage (supports both cartItems and antigravity_cart)
    const data1 = safeRead<any[]>("cartItems", []);
    const data2 = safeRead<any[]>("antigravity_cart", []);
    const rawCart = Array.isArray(data1) && data1.length > 0 ? data1 : Array.isArray(data2) ? data2 : [];
    
    // Normalize array items
    const normalizedCart: CartLine[] = rawCart
      .map(normalizeProductLine)
      .filter((item): item is CartLine => Boolean(item));

    setCart(normalizedCart);

    // Read buyNowProduct safely from localStorage
    const savedBuyNow = safeRead<any>("buyNowProduct", null);
    if (savedBuyNow) {
      const norm = normalizeProductLine(savedBuyNow);
      if (norm) setBuyNowProduct(norm);
    }

    setWishlist(safeRead<string[]>("antigravity_wishlist", []));
    setRecentlyViewed(safeRead<string[]>("antigravity_recent", []));
    setUser(safeRead<string | null>("antigravity_user", null));
    setPincode(safeRead<string>("antigravity_pincode", "560001"));
    setSavedAddress(safeRead<DeliveryAddress | null>("antigravity_address", null));
  }, []);

  React.useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("cartItems", JSON.stringify(cart));
        window.localStorage.setItem("antigravity_cart", JSON.stringify(cart));
      }
    } catch (e) {
      console.error("Failed to save cartItems to localStorage", e);
    }
  }, [cart]);

  React.useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        if (buyNowProduct) {
          window.localStorage.setItem("buyNowProduct", JSON.stringify(buyNowProduct));
        } else {
          window.localStorage.removeItem("buyNowProduct");
        }
      }
    } catch (e) {
      console.error("Failed to save buyNowProduct to localStorage", e);
    }
  }, [buyNowProduct]);

  React.useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("antigravity_wishlist", JSON.stringify(wishlist));
      }
    } catch {}
  }, [wishlist]);

  React.useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("antigravity_recent", JSON.stringify(recentlyViewed));
      }
    } catch {}
  }, [recentlyViewed]);

  React.useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("antigravity_user", JSON.stringify(user));
      }
    } catch {}
  }, [user]);

  React.useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("antigravity_pincode", JSON.stringify(pincode));
      }
    } catch {}
  }, [pincode]);

  React.useEffect(() => {
    try {
      if (typeof window !== "undefined" && savedAddress) {
        window.localStorage.setItem("antigravity_address", JSON.stringify(savedAddress));
      }
    } catch {}
  }, [savedAddress]);

  const visibleProducts = React.useMemo(() => {
    let result = products;
    if (category !== "For You") {
      result = result.filter(
        (p) =>
          p.category.toLowerCase() === category.toLowerCase() ||
          p.subCategory?.toLowerCase() === category.toLowerCase() ||
          p.fashionCategory?.toLowerCase() === category.toLowerCase()
      );
    }
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [category, query]);

  const addToCart = React.useCallback((p: Product) => {
    if (!p || !p.id) return;
    setCart((prev) => {
      const current = Array.isArray(prev) ? prev : [];
      const found = current.find((l) => l && l.product && l.product.id === p.id);
      let updated: CartLine[];
      if (found) {
        updated = current.map((l) =>
          l && l.product && l.product.id === p.id ? { ...l, qty: (l.qty || 1) + 1 } : l
        );
      } else {
        updated = [...current, { product: p, qty: 1 }];
      }
      try {
        if (typeof window !== "undefined") {
          window.localStorage.setItem("cartItems", JSON.stringify(updated));
          window.localStorage.setItem("antigravity_cart", JSON.stringify(updated));
        }
      } catch (e) {
        console.error("Error saving cartItems to localStorage", e);
      }
      return updated;
    });
    toast.success("Added to cart", { description: p.title || (p as any).name });
  }, []);

  const buyNow = React.useCallback((p: Product) => {
    if (!p || !p.id) return;
    const line = { product: p, qty: 1 };
    setBuyNowProduct(line);
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem("buyNowProduct", JSON.stringify(line));
      }
    } catch (e) {
      console.error("Error saving buyNowProduct to localStorage", e);
    }
    toast.success("Proceeding to Buy Now", { description: p.title || (p as any).name });
  }, []);

  const clearBuyNow = React.useCallback(() => {
    setBuyNowProduct(null);
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("buyNowProduct");
      }
    } catch (e) {
      console.error("Error removing buyNowProduct from localStorage", e);
    }
  }, []);

  const setQty = React.useCallback((id: string, qty: number) => {
    setCart((prev) => {
      const current = Array.isArray(prev) ? prev : [];
      return qty <= 0
        ? current.filter((l) => l && l.product && l.product.id !== id)
        : current.map((l) => (l && l.product && l.product.id === id ? { ...l, qty } : l));
    });
  }, []);

  const removeFromCart = React.useCallback((id: string) => {
    setCart((prev) => (Array.isArray(prev) ? prev.filter((l) => l && l.product && l.product.id !== id) : []));
    toast("Removed from cart");
  }, []);

  const clearCart = React.useCallback(() => {
    setCart([]);
    try {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("cartItems");
        window.localStorage.removeItem("antigravity_cart");
      }
    } catch (e) {
      console.error("Error clearing cartItems from localStorage", e);
    }
  }, []);

  const toggleWishlist = React.useCallback((p: Product) => {
    if (!p || !p.id) return;
    setWishlist((prev) => {
      const current = Array.isArray(prev) ? prev : [];
      const has = current.includes(p.id);
      toast(has ? "Removed from wishlist" : "Saved to wishlist", { description: p.title });
      return has ? current.filter((id) => id !== p.id) : [...current, p.id];
    });
  }, []);

  const addRecentlyViewed = React.useCallback((id: string) => {
    if (!id) return;
    setRecentlyViewed((prev) => {
      const current = Array.isArray(prev) ? prev : [];
      const clean = current.filter((i) => i !== id);
      return [id, ...clean].slice(0, 12);
    });
  }, []);

  const signIn = React.useCallback((phone: string) => {
    setUser(phone);
    toast.success("Signed in", { description: `Welcome back, ${phone}` });
  }, []);

  const signOut = React.useCallback(() => {
    setUser(null);
    toast("Signed out");
  }, []);

  const safeCart = Array.isArray(cart) ? cart.filter((l) => l && l.product) : [];
  const cartCount = safeCart.reduce((n, l) => n + (l.qty || 1), 0);
  const cartSubtotal = safeCart.reduce((n, l) => n + (l.qty || 1) * (l.product.price || 0), 0);
  const cartMrpTotal = safeCart.reduce((n, l) => n + (l.qty || 1) * (l.product.mrp || 0), 0);
  const cartGstTotal = safeCart.reduce(
    (n, l) => n + Math.round(((l.product.price || 0) * (l.qty || 1) * ((l.product.price || 0) <= 1000 ? 5 : 12)) / 100),
    0
  );
  const deliveryFee = cartSubtotal > 0 && cartSubtotal < 499 ? 40 : 0;
  const cartTotal = cartSubtotal + cartGstTotal + deliveryFee;

  const value: StoreState = {
    query,
    setQuery,
    category,
    setCategory,
    visibleProducts,
    cart: safeCart,
    cartCount,
    cartTotal,
    cartMrpTotal,
    cartSubtotal,
    cartGstTotal,
    deliveryFee,
    addToCart,
    buyNowProduct,
    setBuyNowProduct,
    buyNow,
    clearBuyNow,
    setQty,
    removeFromCart,
    clearCart,
    cartOpen,
    setCartOpen,
    wishlist,
    toggleWishlist,
    recentlyViewed,
    addRecentlyViewed,
    user,
    signIn,
    signOut,
    pincode,
    setPincode,
    savedAddress,
    setSavedAddress,
    orders: [],
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = React.useContext(StoreContext);
  if (!ctx) {
    throw new Error("useStore must be used within StoreProvider");
  }
  return ctx;
}

export function getGstBreakdown(price: number, qty: number) {
  const safePrice = price || 0;
  const safeQty = qty || 1;
  const rate = safePrice <= 1000 ? 5 : 12;
  const gstAmount = Math.round((safePrice * safeQty * rate) / 100);
  const itemPrice = safePrice * safeQty;
  const totalPrice = itemPrice + gstAmount;
  return { rate, gstAmount, itemPrice, totalPrice };
}
