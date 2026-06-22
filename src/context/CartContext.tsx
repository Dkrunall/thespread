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
    color: "#7E9F65",
    tags: ["Herb & Savory", "Everyday"],
    imageBg: "bg-[#7E9F65]",
  },
  {
    id: "spicy-thai",
    name: "Spicy Thai",
    price: 28,
    description: "Bold, zesty and slightly spicy.",
    category: "savory",
    color: "#D96B43",
    tags: ["Herb & Savory", "Zesty"],
    imageBg: "bg-[#D96B43]",
  },
  {
    id: "sundried-tomatoes",
    name: "Sundried Tomatoes",
    price: 27,
    description: "Rich, tangy and full of flavour.",
    category: "savory",
    color: "#B83A14",
    tags: ["Herb & Savory", "Tangy"],
    imageBg: "bg-[#B83A14]",
  },
  {
    id: "curry-cumin",
    name: "Curry Leaves & Cumin",
    price: 28,
    description: "Fragrant, earthy and deeply comforting.",
    category: "savory",
    color: "#8E5F3B",
    tags: ["Herb & Savory", "Earthy"],
    imageBg: "bg-[#8E5F3B]",
  },
  {
    id: "raspberry",
    name: "Raspberry Spread",
    price: 27,
    description: "Fruity, bright and irresistibly smooth.",
    category: "sweet",
    color: "#E25883",
    tags: ["Sweet & Indulgent", "Toast"],
    imageBg: "bg-[#E25883]",
  },
  {
    id: "chocolate-hazelnut",
    name: "Chocolate Hazelnut",
    price: 33,
    description: "Decadent, creamy and seriously moreish.",
    category: "sweet",
    color: "#5C3E35",
    tags: ["Sweet & Indulgent", "Decadent"],
    imageBg: "bg-[#5C3E35]",
  },
  {
    id: "peanut-butter",
    name: "Classic Peanut",
    price: 28,
    description: "Nutty, creamy and perfectly balanced.",
    category: "sweet",
    color: "#C29548",
    tags: ["Sweet & Indulgent", "Snack"],
    imageBg: "bg-[#C29548]",
  },
  {
    id: "date-miso",
    name: "Date Miso Butter",
    price: 34,
    description: "Sweet, umami and naturally unique.",
    category: "sweet",
    color: "#8E5F3B",
    tags: ["Sweet & Indulgent", "Signature"],
    imageBg: "bg-[#8E5F3B]",
  },
  {
    id: "saffron-honey",
    name: "Saffron Honey",
    price: 32,
    description: "Luxurious, floral and delicately sweet.",
    category: "specialty",
    color: "#F6C15C",
    tags: ["Specialty", "Giftable"],
    imageBg: "bg-[#F6C15C]",
  },
  {
    id: "karak-chai",
    name: "Karak Chai Butter",
    price: 30,
    description: "Warm, spiced and full of nostalgic comfort.",
    category: "specialty",
    color: "#C19A6B",
    tags: ["Specialty", "Cozy"],
    imageBg: "bg-[#C19A6B]",
  },
  {
    id: "vegan-butter",
    name: "Vegan Butter",
    price: 31,
    description: "Creamy, rich and perfectly spreadable.",
    category: "vegan",
    color: "#E5C563",
    tags: ["Specialty", "Plant-Based"],
    imageBg: "bg-[#E5C563]",
  },
  {
    id: "vegan-garlic-butter",
    name: "Vegan Garlic Butter",
    price: 32,
    description: "Buttery, garlicky and full of flavour.",
    category: "vegan",
    color: "#7E9F65",
    tags: ["Specialty", "Plant-Based"],
    imageBg: "bg-[#7E9F65]",
  },
  {
    id: "smoked-chilli",
    name: "Smoked Chilli",
    price: 29,
    description: "Smoky, spicy and packed with flavour.",
    category: "savory",
    color: "#B83A14",
    tags: ["Salt & Smoke", "Bold"],
    imageBg: "bg-[#B83A14]",
  },
  {
    id: "bourbon",
    name: "Bourbon Butter",
    price: 32,
    description: "Smoky and sweet gourmet infusion.",
    category: "specialty",
    color: "#8E5F3B",
    tags: ["Salt & Smoke", "Indulgent"],
    imageBg: "bg-[#8E5F3B]",
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
