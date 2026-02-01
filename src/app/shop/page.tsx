"use client";

import { motion } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  Grid2X2,
  List,
  TrendingUp,
  Truck,
  BadgeCheck,
  ShoppingBag,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/store/cartStore";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { products as staticProducts } from "@/lib/products";

export default function ShopPage() {
  const [products, setProducts] = useState<Product[]>(staticProducts);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [view, setView] = useState<"grid" | "list">("grid");

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setProducts(data);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black tracking-tighter uppercase sm:text-7xl">
          THE <span className="luxe-text">COLLECTION</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Explore our meticulously curated selection of premium tech and
          lifestyle products.
        </p>
      </div>

      {/* Filters & Tools */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row items-center justify-between gap-6 glass p-6 rounded-4xl"
      >
        <div className="relative w-full md:w-96">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            size={20}
          />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-blue-500/50 transition-all font-medium"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="btn-premium flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl transition-all">
            <SlidersHorizontal size={18} /> Filters
          </button>
          <div className="h-10 w-px bg-white/10 mx-2 hidden md:block" />
          <div className="flex items-center gap-1 bg-white/5 p-1.5 rounded-2xl border border-white/10">
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded-xl transition-all ${
                view === "grid"
                  ? "bg-blue-600 text-white"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              <Grid2X2 size={20} />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 rounded-xl transition-all ${
                view === "list"
                  ? "bg-blue-600 text-white"
                  : "text-gray-500 hover:text-white"
              }`}
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div
              key={i}
              className="aspect-square glass rounded-3xl animate-pulse"
            />
          ))}
        </div>
      ) : (
        <div
          className={`grid gap-8 md:gap-12 ${
            view === "grid"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-1"
          }`}
        >
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {filteredProducts.length === 0 && !loading && (
        <div className="text-center py-20 glass rounded-[3rem]">
          <ShoppingBag
            size={48}
            className="mx-auto text-gray-500 mb-4 opacity-20"
          />
          <h3 className="text-2xl font-bold mb-2">No products found</h3>
          <p className="text-gray-400">
            Try adjusting your search query or check back later.
          </p>
        </div>
      )}

      {/* Trust Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-t border-white/10">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
            <Truck size={28} />
          </div>
          <div>
            <h4 className="font-bold">Fast Delivery</h4>
            <p className="text-sm text-gray-400 text-balance">
              Global shipping in 3-5 business days.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
            <BadgeCheck size={28} />
          </div>
          <div>
            <h4 className="font-bold">Quality Assured</h4>
            <p className="text-sm text-gray-400 text-balance">
              Every item is rigorously inspected.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
            <TrendingUp size={28} />
          </div>
          <div>
            <h4 className="font-bold">New Drops</h4>
            <p className="text-sm text-gray-400 text-balance">
              Fresh inventory added every week.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
