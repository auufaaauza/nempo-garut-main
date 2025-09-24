"use client";
import { useState, useEffect } from "react";
import Preloader from "@/components/ui/Preloader";

export default function RootClient({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const done = () => setLoading(false);
    window.addEventListener("load", done);
    const timer = setTimeout(done, 2500);
    return () => {
      window.removeEventListener("load", done);
      clearTimeout(timer);
    };
  }, []);

  if (loading) return <Preloader />;

  return <>{children}</>;
}
