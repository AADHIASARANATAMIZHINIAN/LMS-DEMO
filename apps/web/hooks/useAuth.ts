"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function useAuth(requiredRole?: string) {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/api/auth/me", { credentials: "include" })
      .then((r) => {
        if (!r.ok) throw new Error("unauthenticated");
        return r.json();
      })
      .then((data) => {
        if (requiredRole && !data.roles?.includes(requiredRole)) {
          router.push("/dashboard");
          return;
        }
        setUser(data);
      })
      .catch(() => router.push("/login"))
      .finally(() => setLoading(false));
  }, [router, requiredRole]);

  const logout = async () => {
    await fetch("http://localhost:3001/api/auth/logout", { method: "POST", credentials: "include" });
    router.push("/login");
  };

  return { user, loading, logout };
}
