"use client"

import { API_SERVICES } from "@/lib/constant";
import { createContext, useContext, useState, useEffect } from "react";

interface User {
  id: string;
  fullName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}
type AuthContextType = {
  user: User | null;
  setUser: (user: User) => void,
  loading: boolean;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  loading: true,
  logout: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const meEndpoint = `${API_SERVICES.auth}/me`;
  const logoutEndpoint = `${API_SERVICES.auth}/logout`;


  useEffect(() => {
    const checkProfile = async () => {
      try {
        const res = await fetch(meEndpoint, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch profile");
        const data = await res.json();
        setUser(data.user || null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkProfile();
  }, [meEndpoint]);

  const logout = async () => {
    try {
      await fetch(logoutEndpoint, {
        method: "POST",
        credentials: "include",
      });
      setUser(null);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };
  return (
    <AuthContext.Provider value={{ user, setUser, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
