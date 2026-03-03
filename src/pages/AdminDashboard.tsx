import { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { useAuth } from "@/context/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, ArrowLeft, Package, BarChart3, Boxes, Tag, Loader2, X } from "lucide-react";
import { Product, ProductVariant, CATEGORIES } from "@/data/products";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface VariantForm {
  id: string;
  label: string;
  price: number;
  mrp: number;
  stock: number;
  outOfStock: boolean;
}

const emptyVariant = (): VariantForm => ({
  id: crypto.randomUUID(),
  label: "",
  price: 0,
  mrp: 0,
  stock: 0,
  outOfStock: false,
});

const emptyForm = () => ({
  name: "",
  description: "",
  image: "",
  category: "",
  unit: "",
  tag: "" as string,
  is_active: true,
  variants: [emptyVariant()] as VariantForm[],
});

const AdminDashboard = () => {
  const { user, isAdmin, isLoading: authLoading, logout } = useAuth();
  const { products, isLoading, addProduct, updateProduct, deleteProduct } = useStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm());
  const [saving, setSaving] = useState(false);

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) return <Navigate to="/admin-login" replace />;

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm());
    setDialogOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditingId(p.id);
    setForm({
      name: p.name,
      description: p.description,
      image: p.image,
      category: p.category,
      unit: p.unit,
      tag: p.tag || "",
      is_active: p.is_active,
      variants: p.variants.map(v => ({
        id: v.id,
        label: v.label,
        price: v.price,
        mrp: v.mrp || 0,
        stock: v.stock,
        outOfStock: v.outOfStock,
      })),
    });
    setDialogOpen(true);
  };

  const addVariant = () => {
    setForm(f => ({ ...f, variants: [...f.variants, emptyVariant()] }));
  };

  const removeVariant = (id: string) => {
    if (form.variants.length <= 1) {
      toast.error("At least one variant is required");
      return;
    }
    setForm(f => ({ ...f, variants: f.variants.filter(v => v.id !== id) }));
  };

  const updateVariant = (id: string, field: keyof VariantForm, value: any) => {
    setForm(f => ({
      ...f,
      variants: f.variants.map(v => v.id === id ? { ...v, [field]: value } : v),
    }));
  };

  const handleSave = async () => {
    if (!form.name) {
      toast.error("Product name is required");
      return;
    }
    if (form.variants.some(v => !v.label || !v.price)) {
      toast.error("All variants need a label and price");
      return;
    }
    setSaving(true);
    try {
      const productData = {
        name: form.name,
        description: form.description,
        image: form.image,
        category: form.category,
        unit: form.unit,
        tag: form.tag || null,
        is_active: form.is_active,
        variants: form.variants.map(v => ({
          id: v.id,
          label: v.label,
          price: v.price,
          mrp: v.mrp || undefined,
          stock: v.stock,
          outOfStock: v.outOfStock,
        })),
      };

      if (editingId) {
        await updateProduct(editingId, productData);
        toast.success("Product updated");
      } else {
        await addProduct(productData);
        toast.success("Product added");
      }
      setDialogOpen(false);
    } catch (err: any) {
      toast.error(err?.message || "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteProduct(id);
      toast.success("Product removed");
    } catch {
      toast.error("Failed to delete");
    }
  };

  const totalStock = products.reduce((s, p) => s + p.variants.reduce((vs, v) => vs + v.stock, 0), 0);
  const categoriesCount = new Set(products.map((p) => p.category)).size;
  const lowStock = products.filter((p) => p.variants.some(v => v.stock < 10 && !v.outOfStock)).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-card shadow-card">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to Shop
            </Link>
            <div className="h-5 w-px bg-border" />
            <span className="text-base font-bold text-foreground">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground hidden sm:inline">{user.email}</span>
            <Button variant="outline" size="sm" onClick={() => logout()}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Package, label: "Total Products", value: products.length, color: "text-primary" },
            { icon: Boxes, label: "Total Stock", value: totalStock, color: "text-brand-orange" },
            { icon: Tag, label: "Categories", value: categoriesCount, color: "text-secondary" },
            { icon: BarChart3, label: "Low Stock", value: lowStock, color: "text-destructive" },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl border border-border bg-card p-5 shadow-card">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Product List */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Products</h2>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAdd} className="bg-primary text-primary-foreground font-bold hover:brightness-110 shadow-brand">
                <Plus className="mr-2 h-4 w-4" /> Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-card max-h-[90vh] overflow-y-auto sm:max-w-lg">
              <DialogHeader>
                <DialogTitle className="text-lg font-bold">{editingId ? "Edit Product" : "New Product"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 pt-2">
                <Input placeholder="Product name *" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="bg-background" />
                <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="bg-background" />
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="Unit (e.g. 500 g)" value={form.unit} onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))} className="bg-background" />
                  <select
                    value={form.tag}
                    onChange={(e) => setForm((f) => ({ ...f, tag: e.target.value }))}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground"
                  >
                    <option value="">No Tag</option>
                    <option value="bestseller">Bestseller</option>
                    <option value="new">New</option>
                    <option value="offer">Offer</option>
                  </select>
                </div>
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground"
                >
                  <option value="">Select Category</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <Input placeholder="Image URL" value={form.image} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} className="bg-background" />

                {/* Variants */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-foreground">Variants</span>
                    <button onClick={addVariant} className="flex items-center gap-1 text-xs font-bold text-primary hover:underline">
                      <Plus className="h-3 w-3" /> Add Variant
                    </button>
                  </div>
                  {form.variants.map((v, idx) => (
                    <div key={v.id} className="rounded-lg border border-border bg-muted/30 p-3 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-muted-foreground">Variant {idx + 1}</span>
                        <button onClick={() => removeVariant(v.id)} className="text-muted-foreground hover:text-destructive">
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <Input placeholder="Label (e.g. 500g, 1kg) *" value={v.label} onChange={(e) => updateVariant(v.id, "label", e.target.value)} className="bg-background h-9 text-sm" />
                      <div className="grid grid-cols-3 gap-2">
                        <Input type="number" placeholder="Price *" value={v.price || ""} onChange={(e) => updateVariant(v.id, "price", +e.target.value)} className="bg-background h-9 text-sm" />
                        <Input type="number" placeholder="MRP" value={v.mrp || ""} onChange={(e) => updateVariant(v.id, "mrp", +e.target.value)} className="bg-background h-9 text-sm" />
                        <Input type="number" placeholder="Stock" value={v.stock || ""} onChange={(e) => updateVariant(v.id, "stock", +e.target.value)} className="bg-background h-9 text-sm" />
                      </div>
                      <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
                        <input
                          type="checkbox"
                          checked={v.outOfStock}
                          onChange={(e) => updateVariant(v.id, "outOfStock", e.target.checked)}
                          className="rounded border-border"
                        />
                        Mark as Out of Stock
                      </label>
                    </div>
                  ))}
                </div>

                <label className="flex items-center gap-2 text-sm text-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.is_active}
                    onChange={(e) => setForm(f => ({ ...f, is_active: e.target.checked }))}
                    className="rounded border-border"
                  />
                  Active (visible in shop)
                </label>

                <Button onClick={handleSave} disabled={saving} className="w-full bg-primary text-primary-foreground font-bold hover:brightness-110">
                  {saving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  {editingId ? "Update" : "Add"} Product
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Table-like list */}
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3, 4].map(i => (
              <Skeleton key={i} className="h-16 w-full rounded-xl" />
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-border overflow-hidden bg-card shadow-card">
            <div className="hidden sm:grid grid-cols-[auto_1fr_100px_80px_80px_80px] gap-4 px-5 py-3 border-b border-border bg-muted text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              <span className="w-12" />
              <span>Product</span>
              <span>Category</span>
              <span className="text-right">Variants</span>
              <span className="text-right">Stock</span>
              <span className="text-right">Actions</span>
            </div>
            {products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                <Package className="h-12 w-12 opacity-20 mb-2" />
                <p className="text-sm font-medium">No products yet</p>
                <p className="text-xs">Add your first product to get started</p>
              </div>
            ) : (
              products.map((p) => {
                const totalProductStock = p.variants.reduce((s, v) => s + v.stock, 0);
                return (
                  <div key={p.id} className="grid sm:grid-cols-[auto_1fr_100px_80px_80px_80px] grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-3 border-b border-border last:border-0 hover:bg-muted/50 transition-colors animate-fade-in">
                    {p.image ? (
                      <img src={p.image} alt={p.name} className="h-10 w-10 rounded-lg object-cover bg-muted" />
                    ) : (
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                        <Package className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {p.name}
                        {!p.is_active && <span className="ml-2 text-[10px] text-muted-foreground">(Hidden)</span>}
                      </p>
                      <p className="text-xs text-muted-foreground sm:hidden">
                        {p.variants.map(v => v.label).join(", ")} · ₹{p.variants[0]?.price}
                      </p>
                    </div>
                    <span className="hidden sm:inline text-xs text-muted-foreground capitalize">{p.category}</span>
                    <span className="hidden sm:block text-sm font-semibold text-foreground text-right">{p.variants.length}</span>
                    <span className={`hidden sm:block text-sm font-semibold text-right ${totalProductStock < 10 ? "text-destructive" : "text-foreground"}`}>{totalProductStock}</span>
                    <div className="flex gap-1 justify-end">
                      <button onClick={() => openEdit(p)} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
