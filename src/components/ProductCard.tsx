"use client";

import { Product, useCartStore } from "@/store/cartStore";
import { motion } from "framer-motion";
import { Plus, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  const router = useRouter();

  const handleAddToCart = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      router.push("/login");
      return;
    }

    addItem(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="relative aspect-square rounded-3xl overflow-hidden glass border border-white/10 mb-4 group-hover:border-indigo-500/30 transition-colors">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-xl"
          >
            <Plus size={24} />
          </motion.button>
        </div>
        <div className="absolute top-4 right-4 h-8 px-3 bg-indigo-600 rounded-full flex items-center text-xs font-bold shadow-lg shadow-indigo-600/20">
          ${product.price}
        </div>
      </div>

      <div className="px-2">
        <h3 className="text-lg font-bold mb-1 truncate">{product.name}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-1">
          {product.description}
        </p>
        <button
          onClick={handleAddToCart}
          className="btn-premium w-full py-2 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center gap-2 text-sm font-medium"
        >
          <ShoppingCart size={16} /> Add to Cart
        </button>
      </div>
    </motion.div>
  );
}
