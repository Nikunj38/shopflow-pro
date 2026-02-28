import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = () => {
    if (!user) {
      toast.info("Please sign in to add items to your cart");
      navigate("/login");
      return;
    }
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="group animate-fade-in">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-secondary mb-3">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <button
          onClick={handleAddToCart}
          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 shadow-elevated transition-all duration-300 group-hover:opacity-100 hover:shadow-accent hover:bg-accent"
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingBag className="h-4 w-4" />
        </button>
        {product.stock <= 5 && (
          <span className="absolute top-3 left-3 rounded-full bg-accent px-2.5 py-0.5 text-xs font-medium text-accent-foreground">
            Only {product.stock} left
          </span>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {product.category}
        </p>
        <h3 className="font-display text-lg font-medium leading-tight text-foreground">
          {product.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
        <p className="text-base font-semibold text-foreground">${product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
