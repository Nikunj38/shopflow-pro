import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    const success = isRegister ? register(email, password) : login(email, password);
    if (success) {
      toast.success(isRegister ? "Account created!" : "Welcome back!");
      navigate("/");
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
            <h1 className="text-xl font-bold text-foreground">
              {isRegister ? "Create account" : "Welcome back"}
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {isRegister ? "Sign up to start ordering" : "Sign in to continue shopping"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-background h-11"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-background h-11"
            />
            <Button
              type="submit"
              className="w-full h-11 bg-primary text-primary-foreground font-bold hover:brightness-110 shadow-brand"
            >
              {isRegister ? "Create Account" : "Sign In"}
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground">
            {isRegister ? "Already have an account?" : "Don't have an account?"}{" "}
            <button
              onClick={() => setIsRegister(!isRegister)}
              className="font-bold text-primary hover:underline"
            >
              {isRegister ? "Sign in" : "Sign up"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
