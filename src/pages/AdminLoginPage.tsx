import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ShieldCheck } from "lucide-react";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginAsAdmin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAsAdmin(email, password);
    if (success) {
      toast.success("Welcome, Admin!");
      navigate("/admin");
    } else {
      toast.error("Invalid admin credentials");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm space-y-6 animate-fade-in">
        <Link to="/" className="block text-center">
          <span className="text-2xl font-extrabold text-primary">FreshCart</span>
        </Link>
        <div className="rounded-2xl bg-card border border-border p-6 shadow-elevated space-y-5">
          <div className="text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-xl font-bold text-foreground">Admin Access</h1>
            <p className="mt-1 text-sm text-muted-foreground">Sign in with admin credentials</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <Input type="email" placeholder="Admin email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-background h-11" />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-background h-11" />
            <Button type="submit" className="w-full h-11 bg-primary text-primary-foreground font-bold hover:brightness-110 shadow-brand">
              Sign In as Admin
            </Button>
          </form>

          <div className="rounded-lg bg-muted px-3 py-2 text-center">
            <p className="text-[11px] text-muted-foreground">
              Demo: <span className="font-semibold text-foreground">admin@shop.com</span> / <span className="font-semibold text-foreground">admin123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
