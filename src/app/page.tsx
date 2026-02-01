"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  TrendingUp,
  ShieldCheck,
  Zap,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

const MOCK_PRODUCTS = products.slice(0, 3);

export default function Home() {
  return (
    <div className="space-y-24 px-6">
      {/* Hero Section */}
      <section
        className="relative 
      p-5 flex items-center justify-center rounded-[3rem] overflow-hidden bg-gradient-to-br from-indigo-900/20 via-black to-purple-900/20 border border-white/5"
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-indigo-500/10 blur-[120px] rounded-full" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-purple-500/10 blur-[120px] rounded-full" />
        </div>

        <div className="relative text-center max-w-4xl px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full text-sm font-medium mb-8"
          >
            <Sparkles size={16} className="text-blue-400" />
            New Season Collection 2024
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-black tracking-tight mb-8"
          >
            FUTURE OF <span className="luxe-text">SHOPPING</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto"
          >
            Experience premium curated tech and lifestyle products designed for
            the modern era. High fidelity gear, unparalleled quality.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="btn-premium bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-indigo-600/20">
              Shop Collection <ArrowRight size={20} />
            </button>
            <button className="btn-premium bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-2xl font-bold border border-white/10">
              View Lookbook
            </button>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h2 className="text-4xl font-bold mb-4">Curated Selection</h2>
            <p className="text-gray-400">
              Rare finds and limited edition drops available now.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-sm border border-white/10">
              <TrendingUp size={16} className="text-blue-400" /> Trending
            </div>
            <div className="flex items-center gap-2 px-4 py-2 glass rounded-xl text-sm border border-white/10">
              <ShieldCheck size={16} className="text-purple-500" /> Inspected
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="max-w-7xl mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div
            whileHover={{ y: -5 }}
            className="glass p-8 rounded-[2rem] border border-white/10"
          >
            <Zap size={32} className="text-blue-400 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Rapid Shipping</h3>
            <p className="text-gray-400">
              Get your products delivered in record time with our lightning-fast
              logistics network.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="glass p-8 rounded-[2rem] border border-white/10"
          >
            <ShieldCheck size={32} className="text-purple-500 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Secure Checkout</h3>
            <p className="text-gray-400">
              Bank-grade encryption ensures your transaction is 100% safe and
              your data protected.
            </p>
          </motion.div>
          <motion.div
            whileHover={{ y: -5 }}
            className="glass p-8 rounded-[2rem] border border-white/10"
          >
            <Sparkles size={32} className="text-blue-600 mb-6" />
            <h3 className="text-2xl font-bold mb-4">Premium Quality</h3>
            <p className="text-gray-400">
              Every item in our store undergoes a rigorous 50-point quality
              inspection.
            </p>
          </motion.div>
        </div>
      </section>
      {/* Testimonials */}
      <section className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-black mb-4 uppercase">
            User <span className="luxe-text">Reviews</span>
          </h2>
          <p className="text-gray-400">
            Join over 100,000+ satisfied customers worldwide.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[
            {
              name: "Sarah J.",
              role: "Tech Enthusiast",
              content:
                "The quality of these products is simply unmatched. The attention to detail in the packaging and the speed of delivery sets LuxeStore apart.",
            },
            {
              name: "Michael T.",
              role: "Software Engineer",
              content:
                "Finally, a store that curate products that actually matter. The Stealth Navigator Pro has completely changed my workflow.",
            },
          ].map((test, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="glass p-10 rounded-[3rem] border border-white/10"
            >
              <p className="text-xl text-gray-300 italic mb-8">
                {test.content}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center font-bold text-blue-400">
                  {test.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold">{test.name}</p>
                  <p className="text-gray-500 text-sm">{test.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-5xl mx-auto pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-indigo-600 rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden shadow-2xl shadow-indigo-600/20"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2" />
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Stay ahead of the curve.
          </h2>
          <p className="text-red-100 text-lg mb-12 max-w-xl mx-auto opacity-80">
            Subscribe to our newsletter and get early access to exclusive drops,
            tech insights, and premium offers.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-white/10 border border-white/20 rounded-2xl px-6 py-4 outline-none focus:bg-white/20 transition-all placeholder:text-red-200"
            />
            <button className="btn-premium bg-white text-blue-600 font-black px-8 py-4 rounded-2xl">
              Subscribe
            </button>
          </form>
        </motion.div>
      </section>
    </div>
  );
}
