export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export const MOCK_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Handcrafted Ceramic Mug",
    description: "A beautifully glazed ceramic mug, perfect for your morning coffee. Each piece is unique.",
    price: 28,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&h=600&fit=crop",
    category: "Ceramics",
    stock: 15,
  },
  {
    id: "2",
    name: "Linen Throw Blanket",
    description: "Soft, stonewashed linen blanket in a natural oat color. Generously sized.",
    price: 89,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop",
    category: "Textiles",
    stock: 8,
  },
  {
    id: "3",
    name: "Olive Wood Cutting Board",
    description: "Sustainably sourced olive wood board with natural grain patterns.",
    price: 54,
    image: "https://images.unsplash.com/photo-1607301405390-d831c242f59b?w=600&h=600&fit=crop",
    category: "Kitchen",
    stock: 12,
  },
  {
    id: "4",
    name: "Soy Wax Candle Set",
    description: "Set of three hand-poured soy candles in amber, cedar, and vanilla.",
    price: 42,
    image: "https://images.unsplash.com/photo-1602607429820-0ee1e064d700?w=600&h=600&fit=crop",
    category: "Home",
    stock: 20,
  },
  {
    id: "5",
    name: "Woven Storage Basket",
    description: "Handwoven seagrass basket, ideal for organizing any room.",
    price: 36,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&h=600&fit=crop",
    category: "Home",
    stock: 6,
  },
  {
    id: "6",
    name: "Stoneware Dinner Plate",
    description: "Matte-finish stoneware plate in warm sand. Dishwasher safe.",
    price: 32,
    image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=600&h=600&fit=crop",
    category: "Ceramics",
    stock: 25,
  },
];
