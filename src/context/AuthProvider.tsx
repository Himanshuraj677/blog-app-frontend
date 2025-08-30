"use client"

import { authClient } from '@/lib/auth-client';
import React, { ReactNode, useState, useEffect } from 'react'
import { createContext } from 'react';

interface AuthContextType {
    session: Record<string, any> | null;
    loading: boolean;
    refreshSession: () => void;
}
export const AuthContext = createContext<AuthContextType>({
    session: null,
    loading: false,
    refreshSession: () => {}
});

export default function AuthProvider({children} : {children: ReactNode}) {
    const [session, setSession] = useState<Record<string, any> | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchSession = async () => {
    setLoading(true);
    const s = authClient.useSession();
    setSession(s);
    setLoading(false);
  };

  useEffect(() => {
    fetchSession();
  }, []);

  return (
    <AuthContext.Provider value={{session, loading, refreshSession: fetchSession}}>
        {children}
    </AuthContext.Provider>
  )
}
