"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isExcluded = 
    pathname?.startsWith("/admin") || 
    pathname === "/login" || 
    pathname === "/register";

  if (isExcluded) {
    return <main>{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-12">{children}</main>
      <Footer />
    </>
  );
}
