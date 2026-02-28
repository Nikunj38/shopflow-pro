import { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { useAuth } from "@/context/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, ArrowLeft, Package, BarChart3, Boxes, Tag } from "lucide-react";
import { Product, CATEGORIES } from "@/data/products";
import { toast } from "sonner";

const emptyForm = { name: "", description: "", price: 0, mrp: 0, image: "", category: "", unit: "", stock: 0 };

const AdminDashboard = () => {
  const { user, isAdmin, logout } = useAuth();
  const { products, addProduct, updateProduct, deleteProduct } = useStore();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  if (!user || !isAdmin) return <Navigate to="/admin-login" replace />;

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditingId(p.id);
    setForm({ name: p.name, description: p.description, price: p.price, mrp: p.mrp || 0, image: p.image, category: p.category, unit: p.unit, stock: p.stock });
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!form.name || !form.price) {
      toast.error("Name and price are required");
      return;
    }
    if (editingId) {
      updateProduct(editingId, form);
      toast.success("Product updated");
    } else {
      addProduct(form);
      toast.success("Product added");
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    deleteProduct(id);
    toast.success("Product removed");
  };

  const totalStock = products.reduce((s, p) => s + p.stock, 0);
  const categoriesCount = new Set(products.map((p) => p.category)).size;
  const lowStock = products.filter((p) => p.stock < 10).length;

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
            <Button variant="outline" size="sm" onClick={logout}>
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
            <DialogContent className="bg-card">
              <DialogHeader>
                <DialogTitle className="text-lg font-bold">{editingId ? "Edit Product" : "New Product"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 pt-2">
                <Input placeholder="Product name" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} className="bg-background" />
                <Textarea placeholder="Description" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="bg-background" />
                <div className="grid grid-cols-2 gap-3">
                  <Input type="number" placeholder="Price (₹)" value={form.price || ""} onChange={(e) => setForm((f) => ({ ...f, price: +e.target.value }))} className="bg-background" />
                  <Input type="number" placeholder="MRP (₹)" value={form.mrp || ""} onChange={(e) => setForm((f) => ({ ...f, mrp: +e.target.value }))} className="bg-background" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Input type="number" placeholder="Stock" value={form.stock || ""} onChange={(e) => setForm((f) => ({ ...f, stock: +e.target.value }))} className="bg-background" />
                  <Input placeholder="Unit (e.g. 500 g)" value={form.unit} onChange={(e) => setForm((f) => ({ ...f, unit: e.target.value }))} className="bg-background" />
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
                <Button onClick={handleSave} className="w-full bg-primary text-primary-foreground font-bold hover:brightness-110">
                  {editingId ? "Update" : "Add"} Product
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Table-like list */}
        <div className="rounded-xl border border-border overflow-hidden bg-card shadow-card">
          <div className="hidden sm:grid grid-cols-[auto_1fr_100px_80px_80px_80px] gap-4 px-5 py-3 border-b border-border bg-muted text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            <span className="w-12" />
            <span>Product</span>
            <span>Category</span>
            <span className="text-right">Price</span>
            <span className="text-right">Stock</span>
            <span className="text-right">Actions</span>
          </div>
          {products.map((p) => (
            <div key={p.id} className="grid sm:grid-cols-[auto_1fr_100px_80px_80px_80px] grid-cols-[auto_1fr_auto] items-center gap-4 px-5 py-3 border-b border-border last:border-0 hover:bg-muted/50 transition-colors animate-fade-in">
              {p.image ? (
                <img src={p.image} alt={p.name} className="h-10 w-10 rounded-lg object-cover bg-muted" />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                  <Package className="h-5 w-5 text-muted-foreground" />
                </div>
              )}
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{p.name}</p>
                <p className="text-xs text-muted-foreground sm:hidden">{p.unit} · ₹{p.price}</p>
              </div>
              <span className="hidden sm:inline text-xs text-muted-foreground capitalize">{p.category}</span>
              <span className="hidden sm:block text-sm font-semibold text-foreground text-right">₹{p.price}</span>
              <span className={`hidden sm:block text-sm font-semibold text-right ${p.stock < 10 ? "text-destructive" : "text-foreground"}`}>{p.stock}</span>
              <div className="flex gap-1 justify-end">
                <button onClick={() => openEdit(p)} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                  <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => handleDelete(p.id)} className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
