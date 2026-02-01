"use client";

import { motion } from "framer-motion";
import { Users, Globe, Award, ShieldCheck } from "lucide-react";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="space-y-32 py-20">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-indigo-400 font-bold tracking-widest uppercase text-sm"
        >
          Our Story
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-black mt-6 mb-12 tracking-tight"
        >
          DEFINING THE <br />
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            FUTURE OF RETAIL
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-3xl mx-auto text-xl text-gray-400 leading-relaxed"
        >
          Started in 2024, we set out to bridge the gap between high-end
          technology and unparalleled user experience. Our mission is to curate
          the world&apos;s most innovative products and deliver them to your
          doorstep with zero compromise.
        </motion.p>
      </section>

      {/* Stats Section */}
      <section className="bg-white/5 border-y border-white/10 py-24">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12">
          {[
            { label: "Active Users", value: "500K+" },
            { label: "Products", value: "12,000" },
            { label: "Countries", value: "45+" },
            { label: "Satisfaction", value: "99.9%" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-2">
                {stat.value}
              </h2>
              <p className="text-gray-500 font-medium uppercase text-sm tracking-widest">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-8">
              Guided by our core principles
            </h2>
            <div className="space-y-8">
              {[
                {
                  icon: ShieldCheck,
                  title: "Quality First",
                  desc: "Every product in our catalog undergoes rigorous testing and certification.",
                },
                {
                  icon: Globe,
                  title: "Sustainability",
                  desc: "We are committed to carbon-neutral shipping and eco-friendly packaging.",
                },
                {
                  icon: Award,
                  title: "Excellence",
                  desc: "Providing world-class support and a seamless shopping experience.",
                },
                {
                  icon: Users,
                  title: "Community",
                  desc: "Built by creators, for creators. We listen to our users' feedback.",
                },
              ].map((val, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex gap-6"
                >
                  <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
                    <val.icon className="text-indigo-500" size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{val.title}</h3>
                    <p className="text-gray-400 leading-relaxed">{val.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="aspect-square rounded-[3rem] overflow-hidden border border-white/10 relative"
          >
            <Image
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
              alt="Team working"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>
        </div>
      </section>

      {/* Team CTA */}
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="glass p-16 rounded-[4rem] text-center border border-white/10 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-indigo-500/5 blur-3xl rounded-full -z-10" />
          <h2 className="text-4xl font-bold mb-6">Want to join the mission?</h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            We&apos;re always looking for talented individuals who share our
            passion for technology and design. Check out our open roles.
          </p>
          <button className="btn-premium bg-white text-black px-10 py-4 rounded-2xl font-bold shadow-xl">
            View Careers
          </button>
        </motion.div>
      </section>
    </div>
  );
}
