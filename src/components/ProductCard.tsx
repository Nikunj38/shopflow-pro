import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { Plus, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { items, addToCart, updateQuantity } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const cartItem = items.find((i) => i.product.id === product.id);
  const quantity = cartItem?.quantity || 0;
  const discount = product.mrp ? Math.round(((product.mrp - product.price) / product.mrp) * 100) : 0;

  const handleAdd = () => {
    if (!user) {
      toast.info("Please sign in to add items to cart");
      navigate("/login");
      return;
    }
    addToCart(product);
    toast.success(`Added ${product.name}`);
  };

  return (
    <div className="group relative flex flex-col rounded-2xl bg-card border border-border hover:border-primary/20 shadow-card hover:shadow-elevated transition-all animate-fade-in overflow-hidden">
      {/* Tag */}
      {product.tag && (
        <span
          className={`absolute top-2.5 left-2.5 z-10 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
            product.tag === "bestseller"
              ? "bg-primary text-primary-foreground"
              : product.tag === "offer"
              ? "bg-accent text-accent-foreground"
              : "bg-secondary text-secondary-foreground"
          }`}
        >
          {product.tag === "offer" ? `${discount}% OFF` : product.tag}
        </span>
      )}

      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-muted/50 p-3">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover rounded-xl transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col p-3.5 gap-1.5">
        <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          {product.unit}
        </span>
        <h3 className="font-display text-sm font-semibold text-foreground leading-tight line-clamp-2">
          {product.name}
        </h3>

        <div className="mt-auto flex items-end justify-between pt-2">
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-base font-bold text-foreground">₹{product.price}</span>
            {product.mrp && product.mrp > product.price && (
              <span className="text-xs text-muted-foreground line-through">₹{product.mrp}</span>
            )}
          </div>

          {/* Add / Qty controls */}
          {quantity === 0 ? (
            <button
              onClick={handleAdd}
              className="flex items-center gap-1 rounded-full border-2 border-primary px-3 py-1.5 text-xs font-bold text-primary hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              ADD
              <Plus className="h-3.5 w-3.5" />
            </button>
          ) : (
            <div className="flex items-center gap-0 rounded-full bg-primary overflow-hidden animate-scale-in">
              <button
                onClick={() => updateQuantity(product.id, quantity - 1)}
                className="flex h-8 w-8 items-center justify-center text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="flex h-8 w-6 items-center justify-center text-sm font-bold text-primary-foreground">
                {quantity}
              </span>
              <button
                onClick={() => updateQuantity(product.id, quantity + 1)}
                className="flex h-8 w-8 items-center justify-center text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
