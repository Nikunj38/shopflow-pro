import { useState, useMemo } from "react";
import ShopNavbar from "@/components/ShopNavbar";
import ProductCard from "@/components/ProductCard";
import CategoryChips from "@/components/CategoryChips";
import PromoBanner from "@/components/PromoBanner";
import CartSheet from "@/components/CartSheet";
import { useStore } from "@/context/StoreContext";
import { CATEGORIES } from "@/data/products";

const Index = () => {
  const { products } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        !searchQuery ||
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const selectedCategoryName = selectedCategory
    ? CATEGORIES.find((c) => c.id === selectedCategory)?.name
    : "All Products";

  return (
    <div className="min-h-screen bg-background">
      <ShopNavbar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <CartSheet />

      <main className="container mx-auto px-4 py-6 space-y-6">
        {/* Promo */}
        <PromoBanner />

        {/* Categories */}
        <section>
          <h2 className="text-lg font-bold text-foreground mb-3">Shop by Category</h2>
          <CategoryChips
            categories={CATEGORIES}
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </section>

        {/* Products */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-foreground">{selectedCategoryName}</h2>
            <span className="text-xs font-medium text-muted-foreground">
              {filteredProducts.length} items
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
              <p className="text-lg font-semibold">No items found</p>
              <p className="text-sm mt-1">Try a different search or category</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12 py-8 bg-card">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm font-bold text-foreground">FreshCart</p>
          <p className="text-xs text-muted-foreground mt-1">Fresh groceries delivered to your door in minutes.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
