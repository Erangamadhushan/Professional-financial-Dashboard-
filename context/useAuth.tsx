"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { ApiUser } from "@/lib/auth-client";
import { apiLogout, fetchCurrentUser, getTokenLocal, saveToken, clearToken } from "@/lib/auth-client";

/** Types */
type AuthContextType = {
  user: ApiUser | null;
  loading: boolean;
  login: (id: string, email: string) => void;
  logout: () => Promise<void>;
  refresh: () => Promise<ApiUser | null>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/** Provider component to wrap app (optional) */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

/** Hook to consume auth context */
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

/** Core logic implemented here */
function useProvideAuth(): AuthContextType {
  const [user, setUser] = useState<ApiUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // load on mount: read token -> fetch user if present
  useEffect(() => {
    let cancelled = false;

    async function init() {
      setLoading(true);
      try {
        const token = getTokenLocal();
        if (!token) {
          setUser(null);
          setLoading(false);
          return;
        }
        const data = await fetchCurrentUser();
        if (!cancelled) {
          setUser(data?.user ?? null);
        }
      } catch (err) {
        console.error("init auth error:", err);
        setUser(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    init();

    return () => {
      cancelled = true;
    };
  }, []);

  // cross-tab sync: listen for "token-update-ts" changes
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (e.key === "token-update-ts") {
        // token changed in another tab — refresh user accordingly
        (async () => {
          setLoading(true);
          try {
            const token = getTokenLocal();
            if (!token) {
              setUser(null);
            } else {
              const data = await fetchCurrentUser();
              setUser(data?.user ?? null);
            }
          } catch (err) {
            console.error("storage sync fetch user error:", err);
            setUser(null);
          } finally {
            setLoading(false);
          }
        })();
      }
    }

    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const login = useCallback(async (id: string, email: string) => {
    setLoading(true);
    try {
      const data = { id, email};
      setUser(data);
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    try {
      await apiLogout();
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchCurrentUser();
      setUser(data?.user ?? null);
      return data?.user ?? null;
    } finally {
      setLoading(false);
    }
  }, []);

  return { user, loading, login, logout, refresh };
}
