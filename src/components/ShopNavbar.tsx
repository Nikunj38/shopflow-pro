import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, User, LogOut, Settings, Search, MapPin } from "lucide-react";
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
    <header className="sticky top-0 z-50 bg-primary shadow-brand">
      <div className="container mx-auto px-4">
        {/* Top row */}
        <div className="flex h-16 items-center gap-4">
          <Link to="/" className="flex flex-col shrink-0">
            <span className="text-xl font-extrabold text-primary-foreground tracking-tight">
              FreshCart
            </span>
            <span className="text-[10px] font-medium text-primary-foreground/70 -mt-1">
              Groceries in minutes
            </span>
          </Link>

          <div className="hidden sm:flex items-center gap-1.5 shrink-0 rounded-lg bg-primary-foreground/10 px-3 py-1.5 text-primary-foreground/80 text-xs">
            <MapPin className="h-3.5 w-3.5" />
            <span className="font-medium">Delivery in <strong className="text-primary-foreground">10 mins</strong></span>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for groceries, fruits, vegetables..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full rounded-lg bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {isAdmin && (
              <Link
                to="/admin"
                className="hidden sm:flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-primary-foreground/80 hover:bg-primary-foreground/10 transition-colors"
              >
                <Settings className="h-4 w-4" />
                Admin
              </Link>
            )}

            {user ? (
              <button
                onClick={() => { logout(); navigate("/"); }}
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium text-primary-foreground/80 hover:bg-primary-foreground/10 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
              >
                <User className="h-4 w-4" />
                Login
              </Link>
            )}

            {/* Cart button */}
            <button
              onClick={() => {
                // Trigger cart sheet via a custom event
                window.dispatchEvent(new Event("open-cart"));
              }}
              className="relative flex items-center gap-2 rounded-lg bg-brand-green px-4 py-2.5 text-sm font-bold text-primary-foreground hover:brightness-110 transition-all border border-primary-foreground/20"
            >
              <ShoppingCart className="h-4 w-4" />
              {totalItems > 0 ? (
                <>
                  <span className="hidden sm:inline">{totalItems} items</span>
                  <span className="hidden sm:inline">· ₹{totalPrice}</span>
                  <span className="sm:hidden">{totalItems}</span>
                </>
              ) : (
                <span className="hidden sm:inline">Cart</span>
              )}
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground animate-bounce-in sm:hidden">
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
