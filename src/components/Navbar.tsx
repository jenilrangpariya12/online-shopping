"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cartStore";
import { ShoppingCart, User, Search, Store, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const items = useCartStore((state) => state.items);
  const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const router = useRouter();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
    router.refresh();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 15 }}
            className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-600/20"
          >
            <Store size={24} />
          </motion.div>
          <span className="text-xl font-bold tracking-tight">
            LUXE<span className="text-indigo-400">STORE</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="hover:text-indigo-400 transition-colors font-medium">
            Home
          </Link>
          <Link href="/shop" className="hover:text-indigo-400 transition-colors font-medium">
            Shop
          </Link>
          <Link href="/about" className="hover:text-indigo-400 transition-colors font-medium">
            About
          </Link>
          <Link href="/blog" className="hover:text-indigo-400 transition-colors font-medium">
            Blog
          </Link>
          <Link
            href="/contest"
            className="hover:text-indigo-400 transition-colors font-medium"
          >
            Contest
          </Link>
        </div>

        <div className="flex items-center gap-5">
          <button className="p-2 hover:bg-white/10 rounded-full transition-colors hidden sm:block">
            <Search size={20} />
          </button>

          <AnimatePresence mode="wait">
            {user ? (
              <motion.div
                key="user-logged-in"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="flex items-center gap-3"
              >
                <Link
                  href="/account"
                  className="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                >
                  <User size={20} className="text-indigo-400" />
                </Link>
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-red-400"
                  title="Sign Out"
                >
                  <LogOut size={20} />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="user-logged-out"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
              >
                <Link
                  href="/login"
                  className="btn-premium bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-bold shadow-lg shadow-indigo-600/20 block"
                >
                  Sign In
                </Link>
              </motion.div>
            )}
          </AnimatePresence>

          <Link
            href="/cart"
            className="relative p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ShoppingCart size={20} />
            {cartCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={cartCount}
                className="absolute -top-1 -right-1 bg-indigo-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm shadow-indigo-600/50"
              >
                {cartCount}
              </motion.span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}
