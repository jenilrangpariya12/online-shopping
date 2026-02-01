"use client";

import { motion } from "framer-motion";
import {
  ShoppingBag,
  Users,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    {
      label: "Total Revenue",
      value: "$42,890",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      label: "Total Orders",
      value: "842",
      change: "+18.2%",
      trend: "up",
      icon: ShoppingBag,
    },
    {
      label: "Total Customers",
      value: "1,204",
      change: "-2.4%",
      trend: "down",
      icon: Users,
    },
    {
      label: "Growth Rate",
      value: "24.5%",
      change: "+4.1%",
      trend: "up",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black tracking-tight">DASHBOARD</h1>
        <p className="text-gray-400">
          Overview of your store performance and metrics.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="glass p-8 rounded-[2rem] border border-white/5 space-y-4"
          >
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 rounded-2xl bg-red-600/10 flex items-center justify-center text-red-500 border border-red-500/20">
                <stat.icon size={24} />
              </div>
              <div
                className={`flex items-center gap-1 text-sm font-bold ${
                  stat.trend === "up" ? "text-green-500" : "text-red-500"
                }`}
              >
                {stat.trend === "up" ? (
                  <ArrowUpRight size={14} />
                ) : (
                  <ArrowDownRight size={14} />
                )}
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">
                {stat.label}
              </p>
              <p className="text-3xl font-black text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass p-10 rounded-[3rem] border border-white/5 h-80 flex items-center justify-center relative overflow-hidden">
          <div className="absolute top-8 left-8">
            <h3 className="text-xl font-bold">Revenue Graph</h3>
            <p className="text-sm text-gray-500">Monthly sales performance</p>
          </div>
          <div className="text-gray-600 text-center space-y-4">
            <TrendingUp size={48} className="mx-auto opacity-20" />
            <p className="font-bold tracking-widest uppercase text-xs">
              Chart Visualization Coming Soon
            </p>
          </div>
        </div>

        <div className="glass p-10 rounded-[3rem] border border-white/5 h-80 flex items-center justify-center relative overflow-hidden">
          <div className="absolute top-8 left-8">
            <h3 className="text-xl font-bold">Recent Activity</h3>
            <p className="text-sm text-gray-500">Live transaction feed</p>
          </div>
          <div className="text-gray-600 text-center space-y-4">
            <Clock size={48} className="mx-auto opacity-20" />
            <p className="font-bold tracking-widest uppercase text-xs">
              Activity Feed Coming Soon
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Clock } from "lucide-react";
