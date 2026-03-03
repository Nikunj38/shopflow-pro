import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut, Settings, Search, Clock } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

interface ShopNavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

const ShopNavbar = ({ searchQuery, onSearchChange }: ShopNavbarProps) => {
  const { totalItems, totalPrice } = useCart();
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border shadow-card">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center gap-4">
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <span className="text-lg font-bold text-primary-foreground">F</span>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-display font-bold text-foreground tracking-tight">
                FreshCart
              </span>
              <span className="text-[10px] font-medium text-muted-foreground -mt-0.5 flex items-center gap-1">
                <Clock className="h-2.5 w-2.5" />
                Delivery in 10 mins
              </span>
            </div>
          </Link>

          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for atta, dal, rice..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full rounded-xl bg-muted py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-shadow"
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {isAdmin && (
              <Link
                to="/admin"
                className="hidden sm:flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <Settings className="h-4 w-4" />
                Admin
              </Link>
            )}

            {user ? (
              <button
                onClick={async () => { await logout(); navigate("/"); }}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-foreground hover:bg-muted transition-colors"
              >
                <User className="h-4 w-4" />
                Login
              </Link>
            )}

            <button
              onClick={() => window.dispatchEvent(new Event("open-cart"))}
              className="relative flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90 transition-colors shadow-brand"
            >
              <ShoppingCart className="h-4 w-4" />
              {totalItems > 0 ? (
                <>
                  <span className="hidden sm:inline">{totalItems} items</span>
                  <span className="hidden sm:inline text-primary-foreground/70">·</span>
                  <span className="hidden sm:inline">₹{totalPrice}</span>
                  <span className="sm:hidden">{totalItems}</span>
                </>
              ) : (
                <span className="hidden sm:inline">Cart</span>
              )}
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground animate-bounce-in sm:hidden">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default ShopNavbar;
