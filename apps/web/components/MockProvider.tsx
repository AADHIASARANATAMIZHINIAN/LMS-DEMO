"use client";
import "@/lib/mockFetch";
import { ReactNode } from "react";

export function MockProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
