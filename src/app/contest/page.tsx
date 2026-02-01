"use client";

import { motion } from "framer-motion";
import { Trophy, Gift, Timer, Users, Send, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function ContestPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-6 py-20">
      {/* Hero Section */}
      <section className="text-center mb-32 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-indigo-500/10 blur-[120px] rounded-full -z-10" />

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-500/30 px-6 py-2 rounded-full text-indigo-400 font-bold mb-8"
        >
          <Trophy size={18} /> ANNUAL SETUP CONTEST 2024
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-6xl md:text-8xl font-black mb-8 tracking-tighter"
        >
          WIN THE ULTIMATE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-500">
            DREAM SETUP
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-xl text-gray-400 max-w-3xl mx-auto mb-12"
        >
          Submit your workspace photo and join 50,000+ creators competing for
          $10,000 worth of premium gear. Entries close in 48 hours!
        </motion.p>

        <div className="flex flex-wrap justify-center gap-8 text-sm font-bold uppercase tracking-widest text-gray-500">
          <div className="flex items-center gap-2">
            <Timer size={18} /> 2 Days Left
          </div>
          <div className="flex items-center gap-2">
            <Users size={18} /> 54,231 Entries
          </div>
          <div className="flex items-center gap-2">
            <Gift size={18} /> $10K Prize Pool
          </div>
        </div>
      </section>

      {/* Prize Showcase */}
      <section className="mb-40 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: "Grand Prize",
            prize: "Full Tech Overhaul",
            desc: 'Custom PC + 49" Monitor + Pro Audio',
          },
          {
            title: "Runner Up",
            prize: "The Minimalist Kit",
            desc: "MacBook Pro + Standing Desk + Chair",
          },
          {
            title: "Community Star",
            prize: "Content Creator Pack",
            desc: "Sony A7SIII + Lighting + Microphones",
          },
        ].map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass p-10 rounded-[3rem] border border-white/10 relative overflow-hidden group hover:border-indigo-500/50 transition-colors"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500/5 blur-3xl rounded-full" />
            <span className="text-indigo-400 font-bold text-xs uppercase mb-4 block">
              {item.title}
            </span>
            <h3 className="text-2xl font-bold mb-4">{item.prize}</h3>
            <p className="text-gray-400 mb-8">{item.desc}</p>
            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
              <Gift size={24} className="group-hover:text-white" />
            </div>
          </motion.div>
        ))}
      </section>

      {/* Participation Form */}
      <section className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-[4rem] p-12 md:p-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-10 opacity-10">
          <Trophy size={200} />
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-10"
          >
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-green-500/30">
              <CheckCircle2 color="#22c55e" size={40} />
            </div>
            <h2 className="text-4xl font-bold mb-4">Entry Confirmed!</h2>
            <p className="text-gray-400 text-lg mb-8">
              We&apos;ve received your submission. Check your email for further
              instructions.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-indigo-400 font-bold hover:underline"
            >
              Submit another entry
            </button>
          </motion.div>
        ) : (
          <>
            <div className="mb-12">
              <h2 className="text-4xl font-bold mb-4">Enter the Contest</h2>
              <p className="text-gray-400">
                Fill out the details below to secure your spot in the 2024 draw.
              </p>
            </div>

            <form
              className="space-y-8"
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500 ml-1 uppercase tracking-widest">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-indigo-500 transition-all"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-500 ml-1 uppercase tracking-widest">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-indigo-500 transition-all"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-500 ml-1 uppercase tracking-widest">
                  Portfolio or Setup Link
                </label>
                <input
                  required
                  type="url"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-indigo-500 transition-all"
                  placeholder="https://instagram.com/yoursetup"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-500 ml-1 uppercase tracking-widest">
                  Why do you deserve the win?
                </label>
                <textarea
                  rows={4}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-indigo-500 transition-all resize-none"
                  placeholder="Tell us about your journey..."
                ></textarea>
              </div>

              <button className="btn-premium w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-5 rounded-[2rem] flex items-center justify-center gap-3">
                Submit My Entry <Send size={20} />
              </button>

              <p className="text-center text-xs text-gray-600">
                By entering, you agree to our Terms of Service and Privacy
                Policy. Must be 18+ to enter.
              </p>
            </form>
          </>
        )}
      </section>
    </div>
  );
}
