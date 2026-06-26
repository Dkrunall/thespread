"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: "savory" | "sweet" | "specialty" | "vegan";
  color: string;
  tags: string[];
  imageBg: string; // SVG or color code for background representation
}

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartCount: number;
  cartTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const products: Product[] = [
  {
    id: "herb-garlic",
    name: "Herb & Garlic",
    price: 26,
    description: "Classic, aromatic and perfect on everything.",
    category: "savory",
    color: "#BCD49A", /* Lime Accent Alternative */
    tags: ["Herb & Savory", "Everyday"],
    imageBg: "bg-bag-lime-alt",
  },
  {
    id: "spicy-thai",
    name: "Spicy Thai",
    price: 28,
    description: "Bold, zesty and slightly spicy.",
    category: "savory",
    color: "#F587B2", /* Pink Accent Alternative */
    tags: ["Herb & Savory", "Zesty"],
    imageBg: "bg-rose-blush-alt",
  },
  {
    id: "sundried-tomatoes",
    name: "Sundried Tomatoes",
    price: 27,
    description: "Rich, tangy and full of flavour.",
    category: "savory",
    color: "#418764", /* Secondary Green */
    tags: ["Herb & Savory", "Tangy"],
    imageBg: "bg-[#418764]",
  },
  {
    id: "curry-cumin",
    name: "Curry Leaves & Cumin",
    price: 28,
    description: "Fragrant, earthy and deeply comforting.",
    category: "savory",
    color: "#07745B", /* Primary Green */
    tags: ["Herb & Savory", "Earthy"],
    imageBg: "bg-[#07745B]",
  },
  {
    id: "raspberry",
    name: "Raspberry Spread",
    price: 27,
    description: "Fruity, bright and irresistibly smooth.",
    category: "sweet",
    color: "#F587B2", /* Pink Accent Alternative */
    tags: ["Sweet & Indulgent", "Toast"],
    imageBg: "bg-rose-blush-alt",
  },
  {
    id: "chocolate-hazelnut",
    name: "Chocolate Hazelnut",
    price: 33,
    description: "Decadent, creamy and seriously moreish.",
    category: "sweet",
    color: "#418764", /* Secondary Green */
    tags: ["Sweet & Indulgent", "Decadent"],
    imageBg: "bg-[#418764]",
  },
  {
    id: "peanut-butter",
    name: "Classic Peanut",
    price: 28,
    description: "Nutty, creamy and perfectly balanced.",
    category: "sweet",
    color: "#BCD49A", /* Lime Accent Alternative */
    tags: ["Sweet & Indulgent", "Snack"],
    imageBg: "bg-bag-lime-alt",
  },
  {
    id: "date-miso",
    name: "Date Miso Butter",
    price: 34,
    description: "Sweet, umami and naturally unique.",
    category: "sweet",
    color: "#04AE97", /* Accent Teal */
    tags: ["Sweet & Indulgent", "Signature"],
    imageBg: "bg-[#04AE97]",
  },
  {
    id: "saffron-honey",
    name: "Saffron Honey",
    price: 32,
    description: "Luxurious, floral and delicately sweet.",
    category: "specialty",
    color: "#8BD2CE", /* Light Aqua Alternative */
    tags: ["Specialty", "Giftable"],
    imageBg: "bg-bag-aqua-alt",
  },
  {
    id: "karak-chai",
    name: "Karak Chai Butter",
    price: 30,
    description: "Warm, spiced and full of nostalgic comfort.",
    category: "specialty",
    color: "#418764", /* Secondary Green */
    tags: ["Specialty", "Cozy"],
    imageBg: "bg-[#418764]",
  },
  {
    id: "vegan-butter",
    name: "Vegan Butter",
    price: 31,
    description: "Creamy, rich and perfectly spreadable.",
    category: "vegan",
    color: "#BCD49A", /* Lime Accent Alternative */
    tags: ["Specialty", "Plant-Based"],
    imageBg: "bg-bag-lime-alt",
  },
  {
    id: "vegan-garlic-butter",
    name: "Vegan Garlic Butter",
    price: 32,
    description: "Buttery, garlicky and full of flavour.",
    category: "vegan",
    color: "#07745B", /* Primary Green */
    tags: ["Specialty", "Plant-Based"],
    imageBg: "bg-[#07745B]",
  },
  {
    id: "smoked-chilli",
    name: "Smoked Chilli",
    price: 29,
    description: "Smoky, spicy and packed with flavour.",
    category: "savory",
    color: "#F587B2", /* Pink Accent Alternative */
    tags: ["Salt & Smoke", "Bold"],
    imageBg: "bg-rose-blush-alt",
  },
  {
    id: "bourbon",
    name: "Bourbon Butter",
    price: 32,
    description: "Smoky and sweet gourmet infusion.",
    category: "specialty",
    color: "#04AE97", /* Accent Teal */
    tags: ["Salt & Smoke", "Indulgent"],
    imageBg: "bg-[#04AE97]",
  },
];

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("thedailyspread_cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
    setMounted(true);
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("thedailyspread_cart", JSON.stringify(cart));
    }
  }, [cart, mounted]);

  const addToCart = (product: Product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
    setIsCartOpen(true); // Automatically open cart drawer on add
  };

  const removeFromCart = (productId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
