"use client";

import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  MoreVertical,
  Edit2,
  Trash2,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { Product } from "@/store/cartStore";
import Image from "next/image";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = useCallback(async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false });

    return { data, error };
  }, []);

  useEffect(() => {
    let mounted = true;

    fetchProducts().then(({ data, error }) => {
      if (mounted && !error && data) {
        setProducts(data);
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, [fetchProducts]);

  const deleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const { error } = await supabase.from("products").delete().eq("id", id);

    if (!error) {
      setProducts(products.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight">PRODUCTS</h1>
          <p className="text-gray-400">
            Manage your inventory and product details.
          </p>
        </div>
        <Link
          href="/admin/products/add"
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-red-600/20"
        >
          <Plus size={20} /> Add Product
        </Link>
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-red-500/50 transition-all"
          />
        </div>
        <button className="px-6 py-3 glass rounded-2xl border border-white/10 flex items-center gap-2 hover:bg-white/5 transition-all">
          <Filter size={18} /> Filter
        </button>
      </div>

      <div className="glass rounded-[2rem] border border-white/5 overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/5 bg-white/5">
              <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-gray-500">
                Product
              </th>
              <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-gray-500">
                Price
              </th>
              <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-gray-500">
                Status
              </th>
              <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-gray-300">
            {loading ? (
              [1, 2, 3].map((i) => (
                <tr key={i} className="animate-pulse">
                  <td className="px-8 py-6">
                    <div className="h-12 w-48 bg-white/5 rounded-xl" />
                  </td>
                  <td className="px-8 py-6">
                    <div className="h-6 w-16 bg-white/5 rounded-lg" />
                  </td>
                  <td className="px-8 py-6">
                    <div className="h-6 w-20 bg-white/5 rounded-lg" />
                  </td>
                  <td className="px-8 py-6">
                    <div className="h-10 w-24 bg-white/5 rounded-xl" />
                  </td>
                </tr>
              ))
            ) : products.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="px-8 py-20 text-center text-gray-500"
                >
                  No products found. Start by adding one!
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl border border-white/10 relative overflow-hidden bg-black shrink-0">
                        {product.image && (
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div>
                        <p className="font-bold text-white">{product.name}</p>
                        <p className="text-sm text-gray-500 truncate max-w-xs">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6 font-bold text-white">
                    ${product.price}
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded-full border border-green-500/20">
                      Active
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <Link 
                        href={`/admin/products/edit/${product.id}`}
                        className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                      >
                        <Edit2 size={18} />
                      </Link>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="p-2 hover:bg-red-500/10 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                      <button className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
