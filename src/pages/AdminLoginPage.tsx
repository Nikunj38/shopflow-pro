import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ShieldCheck, Loader2 } from "lucide-react";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login, user, isAdmin } = useAuth();
  const navigate = useNavigate();

  if (user && isAdmin) {
    navigate("/admin");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    setLoading(true);
    try {
      const success = await login(email, password);
      if (success) {
        toast.success("Signed in! Checking admin access...");
        setTimeout(() => navigate("/admin"), 500);
      } else {
        toast.error("Invalid email or password");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
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
            <Input type="email" placeholder="Admin email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-background h-11" disabled={loading} />
            <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="bg-background h-11" disabled={loading} />
            <Button type="submit" disabled={loading} className="w-full h-11 bg-primary text-primary-foreground font-bold hover:brightness-110 shadow-brand">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In as Admin"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginPage;
