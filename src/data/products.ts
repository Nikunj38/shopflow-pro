export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  mrp?: number;
  image: string;
  category: string;
  unit: string;
  stock: number;
  tag?: "bestseller" | "new" | "offer";
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export const CATEGORIES: Category[] = [
  { id: "fruits", name: "Fruits", icon: "🍎", color: "bg-red-50" },
  { id: "vegetables", name: "Vegetables", icon: "🥬", color: "bg-green-50" },
  { id: "dairy", name: "Dairy & Eggs", icon: "🥛", color: "bg-blue-50" },
  { id: "bakery", name: "Bakery", icon: "🍞", color: "bg-amber-50" },
  { id: "beverages", name: "Beverages", icon: "🧃", color: "bg-orange-50" },
  { id: "snacks", name: "Snacks", icon: "🍿", color: "bg-yellow-50" },
  { id: "meat", name: "Meat & Fish", icon: "🍗", color: "bg-pink-50" },
  { id: "pantry", name: "Pantry", icon: "🫙", color: "bg-purple-50" },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1", name: "Fresh Bananas", description: "Ripe yellow bananas, rich in potassium",
    price: 40, mrp: 55, image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop",
    category: "fruits", unit: "1 dozen", stock: 50, tag: "bestseller",
  },
  {
    id: "2", name: "Organic Tomatoes", description: "Farm-fresh organic tomatoes",
    price: 35, image: "https://images.unsplash.com/photo-1546470427-0d4db154ceb8?w=400&h=400&fit=crop",
    category: "vegetables", unit: "500 g", stock: 30,
  },
  {
    id: "3", name: "Full Cream Milk", description: "Fresh pasteurized whole milk",
    price: 68, mrp: 72, image: "https://images.unsplash.com/photo-1563636619-e9143da7973b?w=400&h=400&fit=crop",
    category: "dairy", unit: "1 L", stock: 100, tag: "bestseller",
  },
  {
    id: "4", name: "Sourdough Bread", description: "Artisan sourdough loaf, freshly baked",
    price: 120, image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop",
    category: "bakery", unit: "400 g", stock: 15, tag: "new",
  },
  {
    id: "5", name: "Green Apples", description: "Crisp Granny Smith apples",
    price: 180, mrp: 220, image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=400&h=400&fit=crop",
    category: "fruits", unit: "1 kg", stock: 25, tag: "offer",
  },
  {
    id: "6", name: "Farm Eggs", description: "Free-range brown eggs, pack of 12",
    price: 90, image: "https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=400&h=400&fit=crop",
    category: "dairy", unit: "12 pcs", stock: 40,
  },
  {
    id: "7", name: "Orange Juice", description: "100% fresh-squeezed orange juice",
    price: 95, mrp: 120, image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=400&h=400&fit=crop",
    category: "beverages", unit: "1 L", stock: 20, tag: "offer",
  },
  {
    id: "8", name: "Potato Chips", description: "Classic salted crunchy chips",
    price: 30, image: "https://images.unsplash.com/photo-1566478989037-eec170784d0b?w=400&h=400&fit=crop",
    category: "snacks", unit: "150 g", stock: 60,
  },
  {
    id: "9", name: "Baby Spinach", description: "Tender baby spinach leaves, washed",
    price: 45, image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=400&h=400&fit=crop",
    category: "vegetables", unit: "200 g", stock: 18, tag: "new",
  },
  {
    id: "10", name: "Greek Yogurt", description: "Thick creamy Greek-style yogurt",
    price: 55, mrp: 65, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop",
    category: "dairy", unit: "400 g", stock: 35, tag: "bestseller",
  },
  {
    id: "11", name: "Chicken Breast", description: "Boneless skinless chicken breast",
    price: 280, mrp: 320, image: "https://images.unsplash.com/photo-1604503468506-a8da13d82571?w=400&h=400&fit=crop",
    category: "meat", unit: "500 g", stock: 12, tag: "offer",
  },
  {
    id: "12", name: "Basmati Rice", description: "Premium aged basmati rice",
    price: 160, image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&h=400&fit=crop",
    category: "pantry", unit: "1 kg", stock: 45,
  },
];
