import * as React from "react";
import { toast } from "sonner";
import { products, type Product } from "./catalog";

type CartLine = { product: Product; qty: number };

type StoreState = {
  query: string;
  setQuery: (v: string) => void;
  category: string;
  setCategory: (v: string) => void;
  visibleProducts: Product[];
  cart: CartLine[];
  cartCount: number;
  cartTotal: number;
  cartMrpTotal: number;
  addToCart: (p: Product) => void;
  setQty: (id: string, qty: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  cartOpen: boolean;
  setCartOpen: (v: boolean) => void;
  wishlist: string[];
  toggleWishlist: (p: Product) => void;
  user: string | null;
  signIn: (phone: string) => void;
  signOut: () => void;
  pincode: string;
  setPincode: (v: string) => void;
};

const StoreContext = React.createContext<StoreState | null>(null);

const read = <T,>(key: string, fallback: T): T => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState("For You");
  const [cart, setCart] = React.useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [wishlist, setWishlist] = React.useState<string[]>([]);
  const [user, setUser] = React.useState<string | null>(null);
  const [pincode, setPincode] = React.useState("560001");

  // Hydrate from local storage after mount (avoids SSR mismatch).
  React.useEffect(() => {
    setCart(read<CartLine[]>("kartly.cart", []));
    setWishlist(read<string[]>("kartly.wishlist", []));
    setUser(read<string | null>("kartly.user", null));
    setPincode(read<string>("kartly.pincode", "560001"));
  }, []);

  React.useEffect(() => {
    window.localStorage.setItem("kartly.cart", JSON.stringify(cart));
  }, [cart]);
  React.useEffect(() => {
    window.localStorage.setItem("kartly.wishlist", JSON.stringify(wishlist));
  }, [wishlist]);
  React.useEffect(() => {
    window.localStorage.setItem("kartly.user", JSON.stringify(user));
  }, [user]);
  React.useEffect(() => {
    window.localStorage.setItem("kartly.pincode", JSON.stringify(pincode));
  }, [pincode]);

  const visibleProducts = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const inCategory = category === "For You" || p.category === category;
      const inQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q);
      return inCategory && inQuery;
    });
  }, [query, category]);

  const addToCart = React.useCallback((p: Product) => {
    setCart((prev) => {
      const found = prev.find((l) => l.product.id === p.id);
      if (found) {
        return prev.map((l) => (l.product.id === p.id ? { ...l, qty: l.qty + 1 } : l));
      }
      return [...prev, { product: p, qty: 1 }];
    });
    toast.success("Added to cart", { description: p.title });
  }, []);

  const setQty = React.useCallback((id: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((l) => l.product.id !== id)
        : prev.map((l) => (l.product.id === id ? { ...l, qty } : l)),
    );
  }, []);

  const removeFromCart = React.useCallback((id: string) => {
    setCart((prev) => prev.filter((l) => l.product.id !== id));
    toast("Removed from cart");
  }, []);

  const clearCart = React.useCallback(() => setCart([]), []);

  const toggleWishlist = React.useCallback((p: Product) => {
    setWishlist((prev) => {
      const has = prev.includes(p.id);
      toast(has ? "Removed from wishlist" : "Saved to wishlist", { description: p.title });
      return has ? prev.filter((id) => id !== p.id) : [...prev, p.id];
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

  const cartCount = cart.reduce((n, l) => n + l.qty, 0);
  const cartTotal = cart.reduce((n, l) => n + l.qty * l.product.price, 0);
  const cartMrpTotal = cart.reduce((n, l) => n + l.qty * l.product.mrp, 0);

  const value: StoreState = {
    query,
    setQuery,
    category,
    setCategory,
    visibleProducts,
    cart,
    cartCount,
    cartTotal,
    cartMrpTotal,
    addToCart,
    setQty,
    removeFromCart,
    clearCart,
    cartOpen,
    setCartOpen,
    wishlist,
    toggleWishlist,
    user,
    signIn,
    signOut,
    pincode,
    setPincode,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = React.useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}
