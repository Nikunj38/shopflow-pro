import React, { createContext, useContext, useState, useCallback } from "react";

interface AuthContextType {
  user: { email: string } | null;
  isAdmin: boolean;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string) => boolean;
  loginAsAdmin: (email: string, password: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const login = useCallback((email: string, _password: string) => {
    // Mock login — accepts any credentials
    setUser({ email });
    setIsAdmin(false);
    return true;
  }, []);

  const register = useCallback((email: string, _password: string) => {
    setUser({ email });
    setIsAdmin(false);
    return true;
  }, []);

  const loginAsAdmin = useCallback((email: string, password: string) => {
    // Demo admin: admin@shop.com / admin123
    if (email === "admin@shop.com" && password === "admin123") {
      setUser({ email });
      setIsAdmin(true);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAdmin(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isAdmin, login, register, loginAsAdmin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
