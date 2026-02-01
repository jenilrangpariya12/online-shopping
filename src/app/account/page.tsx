"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, 
  Package, 
  Settings, 
  LogOut, 
  Calendar, 
  Mail, 
  Shield, 
  ChevronRight,
  Clock,
  MapPin,
  Plus
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AccountPage() {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"profile" | "orders" | "settings">("profile");
  const [updateLoading, setUpdateLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push("/login");
        return;
      }

      setUser(user);

      // Fetch orders
      const { data: ordersData } = await supabase
        .from("orders")
        .select("*")
        .eq("email", user.email)
        .order("created_at", { ascending: false });

      if (ordersData) {
        setOrders(ordersData);
      }
      
      setLoading(false);
    };

    getProfile();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  };

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUpdateLoading(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const fullName = formData.get("fullName") as string;

    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName }
    });

    if (error) {
      setMessage({ type: "error", text: error.message });
    } else {
      setMessage({ type: "success", text: "Profile updated successfully!" });
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    }
    setUpdateLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-8">
          <div className="glass p-8 rounded-[2.5rem] border border-white/10 text-center">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-full blur-lg opacity-40 animate-pulse" />
              <div className="relative w-full h-full bg-white/10 rounded-full border border-white/20 flex items-center justify-center text-3xl font-bold">
                {user.user_metadata?.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
              </div>
            </div>
            <h2 className="text-xl font-bold mb-1 truncate">
              {user.user_metadata?.full_name || "Luxe Member"}
            </h2>
            <p className="text-gray-500 text-sm mb-8 truncate">{user.email}</p>
            
            <button 
              onClick={handleLogout}
              className="btn-premium w-full flex items-center justify-center gap-2 py-3 bg-red-500/10 text-red-400 rounded-2xl text-sm font-bold border border-red-500/20"
            >
              <LogOut size={16} /> Sign Out
            </button>
          </div>

          <nav className="glass p-4 rounded-[2.5rem] border border-white/10 space-y-2">
            {[
              { id: "profile", label: "Profile", icon: User },
              { id: "orders", label: "My Orders", icon: Package },
              { id: "settings", label: "Settings", icon: Settings },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${
                  activeTab === tab.id 
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <AnimatePresence mode="wait">
            {activeTab === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="glass p-10 rounded-[3rem] border border-white/10">
                  <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                    <Shield className="text-indigo-400" /> Account Security
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</p>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
                        <Mail className="text-gray-500" size={18} />
                        <span className="font-medium">{user.email}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Member Since</p>
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4">
                        <Calendar className="text-gray-500" size={18} />
                        <span className="font-medium">
                          {new Date(user.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass p-10 rounded-[3rem] border border-white/10">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold flex items-center gap-3">
                      <MapPin className="text-indigo-400" /> Saved Addresses
                    </h3>
                    <button className="text-indigo-400 text-sm font-bold flex items-center gap-2 hover:bg-white/5 px-4 py-2 rounded-xl transition-all">
                      <Plus size={16} /> Add New
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl relative group hover:border-indigo-500/30 transition-all">
                      <div className="absolute top-4 right-4 bg-indigo-600/20 text-indigo-400 px-2 py-1 rounded text-[10px] font-bold uppercase">Default</div>
                      <p className="font-bold mb-1">Home Office</p>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        123 Tech Avenue, Silicon Valley<br />
                        California, 94043, United States
                      </p>
                    </div>
                    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl group hover:border-indigo-500/30 transition-all cursor-pointer">
                      <p className="font-bold mb-1">Summer House</p>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        456 Ocean Drive, Miami Beach<br />
                        Florida, 33139, United States
                      </p>
                    </div>
                  </div>
                </div>

                <div className="glass p-10 rounded-[3rem] border border-white/10">
                  <h3 className="text-2xl font-bold mb-4">Luxe Rewards</h3>
                  <p className="text-gray-500 mb-8">You have <span className="text-white font-bold">1,250</span> premium points available.</p>
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden mb-4">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "65%" }}
                      className="h-full bg-gradient-to-r from-indigo-500 to-purple-500" 
                    />
                  </div>
                  <p className="text-xs text-gray-500">Earn <span className="text-white">750 more points</span> to unlock Elite tier benefits.</p>
                </div>
              </motion.div>
            )}

            {activeTab === "orders" && (
              <motion.div
                key="orders"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-bold">Order History</h3>
                  <span className="text-sm text-gray-500 font-medium">{orders.length} total orders</span>
                </div>

                {orders.length === 0 ? (
                  <div className="glass p-20 rounded-[3rem] border border-white/10 text-center">
                    <Package size={48} className="mx-auto text-gray-700 mb-4 opacity-30" />
                    <p className="text-gray-500 font-medium text-lg">No orders yet.</p>
                    <button 
                      onClick={() => router.push("/shop")}
                      className="btn-premium mt-6 px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold inline-flex items-center gap-2"
                    >
                      Start Shopping <ChevronRight size={18} />
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div key={order.id} className="glass p-6 rounded-[2rem] border border-white/10 hover:border-indigo-500/30 transition-all group">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                          <div className="flex items-center gap-6">
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-indigo-400">
                              <Package size={28} />
                            </div>
                            <div>
                              <p className="font-bold text-lg mb-1">Order #{order.id.toString().slice(0, 8).toUpperCase()}</p>
                              <div className="flex items-center gap-4 text-xs text-gray-500 font-bold uppercase tracking-wider">
                                <span className="flex items-center gap-1.5">
                                  <Clock size={12} /> {new Date(order.created_at).toLocaleDateString()}
                                </span>
                                <span className={`px-2 py-0.5 rounded-md border ${
                                  order.status === 'completed' 
                                    ? 'bg-green-500/10 border-green-500/20 text-green-400' 
                                    : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
                                }`}>
                                  {order.status}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right flex items-center justify-between md:block">
                            <p className="text-2xl font-black text-white md:mb-1">${order.total_amount}</p>
                            <button className="text-indigo-400 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                              Details <ChevronRight size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="glass p-10 rounded-[3rem] border border-white/10">
                  <h3 className="text-2xl font-bold mb-8">Personal Information</h3>
                  {message && (
                    <motion.div
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`mb-6 p-4 rounded-2xl text-sm ${
                        message.type === "success" 
                          ? "bg-green-500/10 border border-green-500/20 text-green-400" 
                          : "bg-red-500/10 border border-red-500/20 text-red-400"
                      }`}
                    >
                      {message.text}
                    </motion.div>
                  )}
                  <form className="space-y-6" onSubmit={handleUpdateProfile}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                        <input 
                          name="fullName"
                          type="text" 
                          defaultValue={user.user_metadata?.full_name}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-indigo-500/50 transition-all font-medium"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Phone Number</label>
                        <input 
                          name="phone"
                          type="tel" 
                          placeholder="+1 (555) 000-0000"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-indigo-500/50 transition-all font-medium cursor-not-allowed"
                          disabled
                        />
                      </div>
                    </div>
                    <button 
                      type="submit"
                      disabled={updateLoading}
                      className="btn-premium px-10 py-4 bg-white text-black rounded-2xl font-bold shadow-xl disabled:opacity-50"
                    >
                      {updateLoading ? "Saving..." : "Save Changes"}
                    </button>
                  </form>
                </div>

                <div className="glass p-10 rounded-[3rem] border border-white/10 border-red-500/10">
                  <h3 className="text-2xl font-bold mb-4 text-red-400">Danger Zone</h3>
                  <p className="text-gray-500 mb-8">Once you delete your account, there is no going back. Please be certain.</p>
                  <button className="px-8 py-4 bg-red-500/10 text-red-500 border border-red-500/20 rounded-2xl font-bold hover:bg-red-500 hover:text-white transition-all">
                    Delete Account
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
