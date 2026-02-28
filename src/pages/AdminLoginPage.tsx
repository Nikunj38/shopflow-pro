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
        <Link to="/" className="block font-display text-2xl font-bold text-center text-foreground">
          Atelier
        </Link>
        <div className="text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-secondary">
            <ShieldCheck className="h-6 w-6 text-accent" />
          </div>
          <h1 className="font-display text-2xl font-semibold text-foreground">Admin Access</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Sign in with admin credentials
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="Admin email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="bg-card"
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="bg-card"
          />
          <Button type="submit" className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
            Sign In as Admin
          </Button>
        </form>

        <p className="text-center text-xs text-muted-foreground">
          Demo: admin@shop.com / admin123
        </p>
      </div>
    </div>
  );
};

export default AdminLoginPage;
