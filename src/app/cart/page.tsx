"use client";

import { useCartStore } from "@/store/cartStore";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useIsClient } from "../../hooks/useIsClient";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const isClient = useIsClient();

  if (!isClient) return null;

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-8 px-6">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center border border-white/10">
          <ShoppingBag size={40} className="text-gray-500" />
        </div>
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold">Your cart is empty</h1>
          <p className="text-gray-400">
            Looks like you haven&apos;t added anything yet.
          </p>
        </div>
        <Link
          href="/shop"
          className="btn-premium bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2"
        >
          Explore Shop <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-black mb-12 uppercase tracking-tighter">
        Shopping <span className="text-blue-500">Cart</span>
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <AnimatePresence mode="popLayout">
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="glass p-6 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-center gap-6"
              >
                <div className="w-full sm:w-32 h-32 rounded-2xl overflow-hidden border border-white/10 shrink-0 relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 space-y-2 text-center sm:text-left">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-gray-400 text-sm line-clamp-1">
                    {item.description}
                  </p>
                  <p className="text-blue-400 font-bold text-lg">
                    ${item.price}
                  </p>
                </div>

                <div className="flex items-center gap-4 bg-white/5 border border-white/10 p-2 rounded-2xl">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <Minus size={18} />
                  </button>
                  <span className="w-8 text-center font-bold text-lg">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-white/10 rounded-xl transition-colors"
                  >
                    <Plus size={18} />
                  </button>
                </div>

                <div className="flex flex-col items-end gap-2 pr-2">
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-3 text-blue-500 hover:bg-blue-500/10 rounded-xl transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                  <p className="font-black text-xl">
                    ${item.price * item.quantity}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="glass p-8 rounded-[3rem] border border-white/10 sticky top-24">
            <h2 className="text-2xl font-bold mb-8">Summary</h2>

            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal</span>
                <span className="text-white font-medium">${getTotal()}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping</span>
                <span className="text-green-400 font-medium">Free</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Tax</span>
                <span className="text-white font-medium">$0.00</span>
              </div>
              <div className="pt-4 border-t border-white/10 flex justify-between">
                <span className="text-xl font-bold">Total</span>
                <span className="text-2xl font-black text-blue-500">
                  ${getTotal()}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="btn-premium w-full bg-white text-black font-black py-5 rounded-2xl flex items-center justify-center gap-3"
            >
              Checkout <ArrowRight size={20} />
            </Link>

            <div className="mt-8 flex items-center justify-center gap-6 grayscale opacity-80">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                alt="Visa"
                width={40}
                height={12}
                className="h-3 w-auto"
              />
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                alt="Mastercard"
                width={32}
                height={20}
                className="h-5 w-auto"
              />
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                alt="Paypal"
                width={60}
                height={16}
                className="h-4 w-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
