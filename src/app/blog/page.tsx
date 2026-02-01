"use client";

import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Bookmark } from "lucide-react";
import Image from "next/image";

const BLOG_POSTS = [
  {
    id: 1,
    title: "The Future of Minimalist Workspace Design",
    excerpt:
      "Discover how a clean desk environment can boost your productivity by up to 40% based on recent studies.",
    category: "Design",
    date: "March 15, 2024",
    author: "Alex Rivera",
    image:
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=800&q=80",
  },
  {
    id: 2,
    title: "Why Mechanical Keyboards are Making a Comeback",
    excerpt:
      "Exploring the tactile world of switches, keycaps, and why developers are obsessed with their sound.",
    category: "Tech",
    date: "March 12, 2024",
    author: "Sarah Chen",
    image:
      "https://images.unsplash.com/photo-1511467683457-4560d2681531?w=800&q=80",
  },
  {
    id: 3,
    title: "Eco-Friendly Tech: Small Changes, Large Impact",
    excerpt:
      "Transitioning to a sustainable digital lifestyle through conscious purchasing and recycling habits.",
    category: "Lifestyle",
    date: "March 10, 2024",
    author: "Jordan Smith",
    image:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80",
  },
];

export default function BlogPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <header className="mb-20">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-5xl font-black mb-6"
        >
          LATEST <span className="text-indigo-500">INSIGHTS</span>
        </motion.h1>
        <p className="text-gray-400 text-lg max-w-2xl">
          Deep dives into tech trends, workspace optimization, and the stories
          behind our favorite products.
        </p>
      </header>

      {/* Featured Post */}
      <section className="mb-32">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="group relative h-[500px] rounded-[3rem] overflow-hidden border border-white/10"
        >
          <Image
            src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&q=80"
            fill
            priority
            className="object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
            alt="Featured post"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

          <div className="absolute bottom-0 left-0 p-12 max-w-3xl">
            <span className="bg-indigo-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block">
              Editor&apos;s Choice
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 group-hover:text-indigo-400 transition-colors">
              The Evolution of Mobile Computing in 2024
            </h2>
            <div className="flex items-center gap-6 text-gray-300 text-sm">
              <span className="flex items-center gap-2">
                <User size={16} /> Marcus Thorne
              </span>
              <span className="flex items-center gap-2">
                <Calendar size={16} /> March 20, 2024
              </span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Blog Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {BLOG_POSTS.map((post, idx) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group cursor-pointer"
          >
            <div className="aspect-[16/10] rounded-[2rem] overflow-hidden border border-white/10 mb-8 relative">
              <Image
                src={post.image}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                alt={post.title}
              />
              <button className="btn-premium absolute top-4 right-4 w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Bookmark size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <span className="text-indigo-400 font-bold text-xs uppercase tracking-widest">
                {post.category}
              </span>
              <h3 className="text-2xl font-bold leading-tight group-hover:text-indigo-400 transition-colors">
                {post.title}
              </h3>
              <p className="text-gray-400 line-clamp-2">{post.excerpt}</p>
              <div className="pt-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center text-[10px] font-bold">
                    {post.author.charAt(0)}
                  </div>
                  <span className="text-sm text-gray-500">{post.author}</span>
                </div>
                <button className="btn-premium flex items-center gap-2 text-sm font-bold">
                  Read More <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </section>
    </div>
  );
}
