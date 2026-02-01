"use client";

import { useCartStore } from "@/store/cartStore";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard,
  Truck,
  Receipt,
  CheckCircle2,
  ChevronRight,
  ArrowLeft,
  Wallet,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useIsClient } from "../../hooks/useIsClient";
import { supabase } from "@/lib/supabase";

const STEPS = [
  { id: "shipping", title: "Shipping", icon: Truck },
  { id: "payment", title: "Payment", icon: CreditCard },
  { id: "review", title: "Review", icon: Receipt },
];

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState(0);
  const isClient = useIsClient();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
  });

  useEffect(() => {
    // Load Razorpay script
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!isClient) return null;

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    setLoading(true);

    try {
      // 1. Create Order on Server
      const res = await fetch("/api/razorpay/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: getTotal() }),
      });

      const orderData = await res.json();

      if (orderData.error) throw new Error(orderData.error);

      // 2. Open Razorpay Popup
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
        currency: orderData.currency,
        name: "LUXE STORE",
        description: "Premium Tech Purchase",
        order_id: orderData.id,
        handler: async function (response: RazorpayResponse) {
          // 3. Payment Successful - Save Order to Supabase
          const { error: dbError } = await supabase.from("orders").insert([
            {
              total_amount: getTotal(),
              status: "completed",
              items: items,
              payment_id: response.razorpay_payment_id,
              email: formData.email, // Can add more user info if available
            },
          ]);

          if (dbError) {
            console.error("Supabase Order Error:", dbError);
            alert("Payment successful but failed to save order record.");
          }

          clearCart();
          setCurrentStep(3); // Success Step
        },
        prefill: {
          name: formData.fullName,
          email: formData.email,
        },
        theme: {
          color: "#3b82f6",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment Error:", err);
    } finally {
      setLoading(false);
    }
  };

  if (currentStep === 3) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full glass p-12 rounded-[3.5rem] border border-white/10 text-center"
        >
          <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-8 border border-blue-500/30">
            <CheckCircle2 size={48} className="text-blue-500" />
          </div>
          <h1 className="text-4xl font-black mb-4 uppercase tracking-tight">
            ORDER PLACED!
          </h1>
          <p className="text-gray-400 mb-10 text-lg">
            Thank you for your purchase. We&apos;ve sent an email confirmation
            to your inbox.
          </p>
          <button
            onClick={() => router.push("/")}
            className="btn-premium w-full bg-blue-600 text-white font-black py-5 rounded-2xl shadow-lg shadow-blue-600/20"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex flex-col md:flex-row gap-12">
        <div className="flex-1">
          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-16 max-w-2xl">
            {STEPS.map((step, idx) => (
              <div key={step.id} className="flex items-center gap-4">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors ${
                    idx <= currentStep
                      ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-600/20"
                      : "border-white/10 text-gray-500"
                  }`}
                >
                  <step.icon size={18} />
                </div>
                <span
                  className={`text-sm font-bold uppercase tracking-widest ${
                    idx <= currentStep ? "text-white" : "text-gray-600"
                  }`}
                >
                  {step.title}
                </span>
                {idx < STEPS.length - 1 && (
                  <div className="w-12 h-[2px] bg-white/10 mx-2" />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="shipping"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="text-3xl font-black uppercase tracking-tight">
                  Shipping Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                      Full Name
                    </label>
                    <input
                      required
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-blue-500/50 transition-all font-medium"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                      Email
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-blue-500/50 transition-all font-medium"
                      placeholder="jane@example.com"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                      Address
                    </label>
                    <input
                      required
                      value={formData.address}
                      onChange={(e) =>
                        setFormData({ ...formData, address: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-blue-500/50 transition-all font-medium"
                      placeholder="123 Future Tech Ave"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                      City
                    </label>
                    <input
                      required
                      value={formData.city}
                      onChange={(e) =>
                        setFormData({ ...formData, city: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-blue-500/50 transition-all font-medium"
                      placeholder="Neo City"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                      Zip Code
                    </label>
                    <input
                      required
                      value={formData.zipCode}
                      onChange={(e) =>
                        setFormData({ ...formData, zipCode: e.target.value })
                      }
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-red-500/50 transition-all font-medium"
                      placeholder="10101"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 1 && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="text-3xl font-black uppercase">
                  Payment Method
                </h2>
                <div className="space-y-4">
                  {[
                    {
                      id: "razorpay",
                      title: "Secure Checkout",
                      icon: CreditCard,
                      subtitle: "Razorpay (Cards, UPI, Netbanking)",
                    },
                    {
                      id: "wallet",
                      title: "Digital Wallets",
                      icon: Wallet,
                      subtitle: "Apple Pay, Google Pay",
                    },
                  ].map((method) => (
                    <div
                      key={method.id}
                      className="glass p-6 rounded-3xl border border-white/10 cursor-pointer hover:border-blue-500/50 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                          <method.icon size={24} />
                        </div>
                        <div>
                          <p className="font-bold text-lg">{method.title}</p>
                          <p className="text-gray-500 text-sm">
                            {method.subtitle}
                          </p>
                        </div>
                      </div>
                      <div className="w-6 h-6 rounded-full border-2 border-white/20 group-hover:border-blue-500 flex items-center justify-center">
                        <div className="w-3 h-3 rounded-full bg-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {currentStep === 2 && (
              <motion.div
                key="review"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <h2 className="text-3xl font-black uppercase">Final Review</h2>
                <div className="glass p-8 rounded-[3rem] border border-white/10 space-y-6">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 relative">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold">{item.name}</p>
                          <p className="text-gray-400 text-xs">
                            Qty: {item.quantity}
                          </p>
                        </div>
                      </div>
                      <p className="font-bold text-white">
                        ${item.price * item.quantity}
                      </p>
                    </div>
                  ))}
                  <div className="pt-6 border-t border-white/10 flex justify-between items-end">
                    <div>
                      <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">
                        Grand Total
                      </p>
                      <p className="text-4xl font-black text-blue-500">
                        ${getTotal()}
                      </p>
                    </div>
                    <p className="text-green-400 text-sm font-bold">
                      Standard Delivery: Free
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-12 flex gap-4">
            <button
              onClick={() => currentStep > 0 && setCurrentStep(currentStep - 1)}
              className={`btn-premium px-8 py-4 rounded-2xl font-bold border border-white/10 flex items-center gap-2 hover:bg-white/5 transition-all ${
                currentStep === 0 ? "opacity-30 cursor-not-allowed" : ""
              }`}
            >
              <ArrowLeft size={18} /> Back
            </button>
            <button
              onClick={handleNext}
              disabled={
                loading ||
                (currentStep === 0 && (!formData.fullName || !formData.email))
              }
              className="btn-premium flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {currentStep === 2 ? "Complete Purchase" : "Continue to Pay"}{" "}
                  <ChevronRight size={18} />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Sidebar Summary */}
        <aside className="w-full lg:w-96">
          <div className="glass p-8 rounded-[3rem] border border-white/10 space-y-8">
            <div className="space-y-6">
              <h3 className="text-xl font-bold">Order Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between text-gray-400 font-medium">
                  <span>Subtotal</span>
                  <span className="text-white">${getTotal()}</span>
                </div>
                <div className="flex justify-between text-gray-400 font-medium">
                  <span>Shipping</span>
                  <span className="text-green-400">Free</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                  <span className="font-bold text-gray-400 uppercase tracking-widest text-xs">
                    Total
                  </span>
                  <span className="font-black text-blue-500 text-3xl">
                    ${getTotal()}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
              <p className="text-blue-400 text-sm font-bold flex items-center gap-2">
                <Receipt size={16} /> Secure Checkout Active
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
