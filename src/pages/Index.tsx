import ShopNavbar from "@/components/ShopNavbar";
import ProductCard from "@/components/ProductCard";
import { useStore } from "@/context/StoreContext";

const Index = () => {
  const { products } = useStore();

  return (
    <div className="min-h-screen bg-background">
      <ShopNavbar />

      {/* Hero */}
      <section className="container mx-auto px-4 py-16 text-center md:py-24">
        <p className="mb-3 text-sm font-medium uppercase tracking-widest text-accent">
          Curated Collection
        </p>
        <h1 className="font-display text-4xl font-bold leading-tight text-foreground md:text-6xl">
          Handmade with<br />intention
        </h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          Thoughtfully crafted goods for your home. Every piece tells a story of care and quality.
        </p>
      </section>

      {/* Products */}
      <section className="container mx-auto px-4 pb-20">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-display text-2xl font-semibold text-foreground">All Products</h2>
          <span className="text-sm text-muted-foreground">{products.length} items</span>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
