import { useState } from "react";
import { useStore } from "@/context/StoreContext";
import { useAuth } from "@/context/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Pencil, Trash2, ArrowLeft, Package } from "lucide-react";
import { Product } from "@/data/products";
import { toast } from "sonner";

const emptyForm = { name: "", description: "", price: 0, image: "", category: "", stock: 0 };

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
    setForm({ name: p.name, description: p.description, price: p.price, image: p.image, category: p.category, stock: p.stock });
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

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-primary text-primary-foreground">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2 text-sm opacity-70 hover:opacity-100 transition-opacity">
              <ArrowLeft className="h-4 w-4" />
              Shop
            </Link>
            <span className="font-display text-lg font-bold">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm opacity-70">{user.email}</span>
            <Button variant="outline" size="sm" onClick={logout} className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Total Products", value: products.length },
            { label: "Total Stock", value: products.reduce((s, p) => s + p.stock, 0) },
            { label: "Categories", value: new Set(products.map(p => p.category)).size },
          ].map(stat => (
            <div key={stat.label} className="rounded-lg border border-border bg-card p-5 shadow-card">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="mt-1 text-3xl font-bold text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Product List */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-semibold text-foreground">Products</h2>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openAdd} className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-accent">
                <Plus className="mr-2 h-4 w-4" /> Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-background">
              <DialogHeader>
                <DialogTitle className="font-display">{editingId ? "Edit Product" : "New Product"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-3 pt-2">
                <Input placeholder="Product name" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="bg-card" />
                <Textarea placeholder="Description" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="bg-card" />
                <div className="grid grid-cols-2 gap-3">
                  <Input type="number" placeholder="Price" value={form.price || ""} onChange={e => setForm(f => ({ ...f, price: +e.target.value }))} className="bg-card" />
                  <Input type="number" placeholder="Stock" value={form.stock || ""} onChange={e => setForm(f => ({ ...f, stock: +e.target.value }))} className="bg-card" />
                </div>
                <Input placeholder="Category" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="bg-card" />
                <Input placeholder="Image URL" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} className="bg-card" />
                <Button onClick={handleSave} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  {editingId ? "Update" : "Add"} Product
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="space-y-2">
          {products.map(p => (
            <div key={p.id} className="flex items-center gap-4 rounded-lg border border-border bg-card p-4 shadow-card animate-fade-in">
              {p.image ? (
                <img src={p.image} alt={p.name} className="h-14 w-14 rounded-md object-cover" />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-md bg-secondary">
                  <Package className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground truncate">{p.name}</p>
                <p className="text-sm text-muted-foreground">{p.category} · ${p.price} · {p.stock} in stock</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => openEdit(p)} className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors">
                  <Pencil className="h-4 w-4" />
                </button>
                <button onClick={() => handleDelete(p.id)} className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors">
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
