import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import React, { useState, useEffect } from "react";

const CartSheet = ({ children }: { children?: React.ReactNode }) => {
  const { items, updateQuantity, removeFromCart, totalPrice, totalItems } = useCart();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-cart", handler);
    return () => window.removeEventListener("open-cart", handler);
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      {children}
      <SheetContent className="flex flex-col bg-card p-0 w-full sm:max-w-md">
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="flex items-center gap-2 text-lg font-bold">
            <ShoppingBag className="h-5 w-5 text-primary" />
            My Cart
            {totalItems > 0 && (
              <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 text-muted-foreground p-8">
            <ShoppingBag className="h-16 w-16 opacity-20" />
            <p className="text-sm font-medium">Your cart is empty</p>
            <p className="text-xs">Add items to get started</p>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-0 overflow-y-auto">
              {items.map(({ product, variantId, quantity }) => {
                const variant = product.variants.find(v => v.id === variantId);
                if (!variant) return null;
                return (
                  <div key={`${product.id}-${variantId}`} className="flex gap-3 border-b border-border px-5 py-4 animate-fade-in">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-16 w-16 rounded-lg object-cover bg-muted"
                    />
                    <div className="flex flex-1 flex-col justify-between min-w-0">
                      <div>
                        <p className="text-sm font-semibold text-foreground truncate">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{variant.label}</p>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-0 rounded-md border border-border overflow-hidden">
                          <button
                            onClick={() => updateQuantity(product.id, variantId, quantity - 1)}
                            className="flex h-7 w-7 items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="flex h-7 w-7 items-center justify-center text-xs font-bold text-foreground bg-muted/50">
                            {quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(product.id, variantId, Math.min(quantity + 1, variant.stock))}
                            className="flex h-7 w-7 items-center justify-center text-muted-foreground hover:bg-muted transition-colors"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-foreground">₹{variant.price * quantity}</span>
                          <button
                            onClick={() => removeFromCart(product.id, variantId)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="border-t border-border p-5 space-y-3 bg-background">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold text-foreground">₹{totalPrice.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery</span>
                <span className="font-semibold text-primary">FREE</span>
              </div>
              <div className="flex justify-between text-base border-t border-border pt-3">
                <span className="font-bold text-foreground">Total</span>
                <span className="font-bold text-foreground">₹{totalPrice.toFixed(0)}</span>
              </div>
              <Button className="w-full h-12 bg-primary text-primary-foreground font-bold text-sm hover:brightness-110 shadow-brand">
                Proceed to Checkout · ₹{totalPrice.toFixed(0)}
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;
