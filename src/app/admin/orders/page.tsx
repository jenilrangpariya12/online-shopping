"use client";

import { motion } from "framer-motion";
import {
  ShoppingBag,
  Clock,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  Eye,
} from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useIsClient } from "@/hooks/useIsClient";

interface OrderItem {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  image_url?: string;
}

interface Order {
  id: string;
  total_amount: number;
  status: string;
  items: OrderItem[];
  payment_id: string;
  created_at: string;
  user_id: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const isClient = useIsClient();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setOrders(data);
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  if (!isClient) return null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-black tracking-tight">ORDERS</h1>
        <p className="text-gray-400">Track and manage customer transactions.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: "Total Revenue",
            value: `$${orders
              .reduce((acc, o) => acc + o.total_amount, 0)
              .toLocaleString()}`,
            icon: ShoppingBag,
            color: "text-red-500",
          },
          {
            label: "Active Orders",
            value: orders.filter((o) => o.status === "pending").length,
            icon: Clock,
            color: "text-amber-500",
          },
          {
            label: "Completed",
            value: orders.filter((o) => o.status === "completed").length,
            icon: CheckCircle2,
            color: "text-green-500",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="glass p-8 rounded-[2rem] border border-white/5 space-y-2"
          >
            <stat.icon className={stat.color} size={24} />
            <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">
              {stat.label}
            </p>
            <p className="text-3xl font-black">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            size={18}
          />
          <input
            type="text"
            placeholder="Search orders..."
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 outline-none focus:border-red-500/50 transition-all font-medium"
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
                Order ID
              </th>
              <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-gray-500">
                Date
              </th>
              <th className="px-8 py-6 text-xs font-bold uppercase tracking-widest text-gray-500">
                Total
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
                    <div className="h-6 w-32 bg-white/5 rounded-lg" />
                  </td>
                  <td className="px-8 py-6">
                    <div className="h-6 w-24 bg-white/5 rounded-lg" />
                  </td>
                  <td className="px-8 py-6">
                    <div className="h-6 w-16 bg-white/5 rounded-lg" />
                  </td>
                  <td className="px-8 py-6">
                    <div className="h-8 w-20 bg-white/5 rounded-full" />
                  </td>
                  <td className="px-8 py-6">
                    <div className="h-10 w-10 bg-white/5 rounded-xl" />
                  </td>
                </tr>
              ))
            ) : orders.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-8 py-20 text-center text-gray-500"
                >
                  No orders found.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-white/5 transition-colors"
                >
                  <td className="px-8 py-6 font-mono text-xs text-gray-400">
                    #{order.id.slice(0, 8)}...
                  </td>
                  <td className="px-8 py-6 text-sm">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-6 font-bold text-white">
                    ${order.total_amount}
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          order.status === "completed"
                            ? "bg-green-500"
                            : order.status === "pending"
                            ? "bg-amber-500"
                            : "bg-red-500"
                        }`}
                      />
                      <span
                        className={`text-xs font-bold uppercase tracking-widest ${
                          order.status === "completed"
                            ? "text-green-400"
                            : order.status === "pending"
                            ? "text-amber-400"
                            : "text-red-400"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <button className="p-3 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-all">
                      <Eye size={18} />
                    </button>
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
