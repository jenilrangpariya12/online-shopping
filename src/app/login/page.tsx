"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, Lock, ArrowRight, Github, AlertCircle, LogIn } from "lucide-react";
import { supabase } from "@/lib/supabase";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginValues) => {
    setLoading(true);
    setServerError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      if (error) {
        if (error.message.toLowerCase().includes("email logins are disabled")) {
          setServerError("Email login is currently disabled in your Supabase project settings. Please enable the 'Email' provider and 'Allow password-based login' in the Supabase Dashboard.");
        } else {
          setServerError(error.message);
        }
        console.error("Login error:", error.message);
        setLoading(false);
      } else {
        router.push("/");
        router.refresh(); // Ensure the Navbar and other components update immediately
      }
    } catch (err) {
      setServerError("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  const handleGithubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -right-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-md w-full glass p-10 rounded-[32px] border border-white/10 relative z-10"
      >
        <div className="text-center mb-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="w-20 h-20 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-indigo-400 border border-indigo-500/30 shadow-lg shadow-indigo-500/10"
          >
            <LogIn size={40} />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold mb-3 luxe-text-gradient tracking-tight"
          >
            Welcome Back
          </motion.h1>
          <p className="text-gray-400 font-medium">Login to your account to continue</p>
        </div>

        {serverError && (
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-sm flex items-center gap-3"
          >
            <AlertCircle size={18} />
            {serverError}
          </motion.div>
        )}

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-300 ml-1">
              Email Address
            </label>
            <div className="relative group">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors"
                size={20}
              />
              <input
                {...register("email")}
                type="email"
                className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-indigo-500/50 focus:bg-white/[0.08] transition-all`}
                placeholder="name@example.com"
              />
              {errors.email && (
                <p className="text-xs text-red-400 mt-1 ml-1">{errors.email.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-300 ml-1">
              Password
            </label>
            <div className="relative group">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-indigo-400 transition-colors"
                size={20}
              />
              <input
                {...register("password")}
                type="password"
                className={`w-full bg-white/5 border ${errors.password ? 'border-red-500/50' : 'border-white/10'} rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-indigo-500/50 focus:bg-white/[0.08] transition-all`}
                placeholder="••••••••"
              />
              {errors.password && (
                <p className="text-xs text-red-400 mt-1 ml-1">{errors.password.message}</p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between text-sm px-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-white/10 bg-white/5 accent-indigo-600 cursor-pointer"
              />
              <span className="text-gray-400 group-hover:text-gray-300 transition-colors">Remember me</span>
            </label>
            <button
              type="button"
              className="text-indigo-400 hover:text-indigo-300 font-semibold transition-colors"
            >
              Forgot password?
            </button>
          </div>

          <motion.button
            disabled={loading}
            className="btn-premium w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Sign In <ArrowRight size={20} />
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-8">
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#030305] px-4 text-gray-500 font-medium">
                Or continue with
              </span>
            </div>
          </div>

          <button
            onClick={handleGithubLogin}
            className="btn-premium w-full bg-white/5 border border-white/10 text-white py-4 rounded-2xl flex items-center justify-center gap-3"
          >
            <Github size={22} />
            <span className="font-semibold text-sm">GitHub account</span>
          </button>
        </div>

        <p className="mt-10 text-center text-sm text-gray-400 font-medium">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="text-indigo-400 font-bold hover:text-indigo-300 transition-colors underline-offset-4 hover:underline"
          >
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
