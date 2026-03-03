export interface ProductVariant {
  id: string;
  label: string;
  price: number;
  mrp?: number;
  stock: number;
  outOfStock: boolean;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  unit: string;
  variants: ProductVariant[];
  tag?: string | null;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CartItem {
  product: Product;
  variantId: string;
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
