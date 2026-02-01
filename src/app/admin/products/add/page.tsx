"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Upload, X } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "Electronics",
    stock: "0",
  });
  const [uploading, setUploading] = useState(false);
  const [imageMode, setImageMode] = useState<"url" | "upload">("url");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `product-images/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from("products")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("products").getPublicUrl(filePath);
      setFormData({ ...formData, image: data.publicUrl });
    } catch (error: any) {
      alert("Error uploading image: " + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    const { error } = await supabase.from("products").insert([
      {
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        image: formData.image,
        category: formData.category,
        stock: parseInt(formData.stock),
      },
    ]);

    if (!error) {
      setSuccessMsg("Product published successfully!");
      setTimeout(() => {
        router.push("/admin/products");
      }, 1500);
    } else {
      setErrorMsg(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl space-y-8">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/products"
          className="p-3 glass rounded-2xl border border-white/10 hover:bg-white/5 transition-all text-gray-400 hover:text-white"
        >
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1">
          <h1 className="text-4xl font-black tracking-tight">ADD PRODUCT</h1>
          <p className="text-gray-400">
            Create a new item in your store collection.
          </p>
        </div>
      </div>

      {errorMsg && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-2xl flex items-center gap-3"
        >
          <X size={20} />
          <p className="font-bold text-sm">Error: {errorMsg}</p>
          <button onClick={() => setErrorMsg(null)} className="ml-auto opacity-50 hover:opacity-100">
            <X size={16} />
          </button>
        </motion.div>
      )}

      {successMsg && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-2xl flex items-center gap-3"
        >
          <Save size={20} />
          <p className="font-bold text-sm">{successMsg}</p>
        </motion.div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <div className="space-y-6">
          <div className="glass p-8 rounded-[2rem] border border-white/5 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                Product Name
              </label>
              <input
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-red-500/50 transition-all font-medium"
                placeholder="e.g. Stealth Navigator Pro"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                Price (USD)
              </label>
              <input
                required
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-red-500/50 transition-all font-medium"
                placeholder="299.00"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                Description
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-red-500/50 transition-all font-medium resize-none"
                placeholder="A brief overview of the product's features..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-red-500/50 transition-all font-medium appearance-none"
                >
                  <option value="Electronics" className="bg-black">Electronics</option>
                  <option value="Fashion" className="bg-black">Fashion</option>
                  <option value="Accessories" className="bg-black">Accessories</option>
                  <option value="Gaming" className="bg-black">Gaming</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Stock
                </label>
                <input
                  required
                  type="number"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({ ...formData, stock: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-red-500/50 transition-all font-medium"
                  placeholder="10"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass p-8 rounded-[2rem] border border-white/5 space-y-6">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                Product Image
              </label>
              <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                <button
                  type="button"
                  onClick={() => setImageMode("url")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    imageMode === "url"
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  URL
                </button>
                <button
                  type="button"
                  onClick={() => setImageMode("upload")}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    imageMode === "upload"
                      ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  UPLOAD
                </button>
              </div>
            </div>

            {imageMode === "url" ? (
              <div className="space-y-2">
                <input
                  required
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 outline-none focus:border-red-500/50 transition-all font-medium"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
            ) : (
              <div className="space-y-2">
                <label className="relative group cursor-pointer block">
                  <div className="w-full bg-white/5 border-2 border-dashed border-white/10 rounded-2xl p-8 transition-all group-hover:border-red-500/50 flex flex-col items-center justify-center gap-3">
                    <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:bg-red-500/10 group-hover:border-red-500/20 transition-all">
                      <Upload size={20} className="text-gray-400 group-hover:text-red-500" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-gray-300">Click to upload image</p>
                      <p className="text-xs text-gray-500 mt-1">PNG, JPG or WebP (Max 5MB)</p>
                    </div>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                  {uploading && (
                    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
                        <p className="text-xs font-bold text-white tracking-widest uppercase">Uploading...</p>
                      </div>
                    </div>
                  )}
                </label>
              </div>
            )}

            <div className="aspect-square relative rounded-3xl overflow-hidden border border-white/10 bg-black/40 flex items-center justify-center group">
              {formData.image ? (
                <>
                  <Image
                    src={formData.image}
                    alt="Preview"
                    fill
                    className="object-cover transition-opacity group-hover:opacity-40"
                  />
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, image: "" })}
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <div className="bg-red-600 p-4 rounded-full shadow-xl">
                      <X size={32} />
                    </div>
                  </button>
                </>
              ) : (
                <div className="text-center space-y-4 text-gray-500 p-8">
                  <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                    <Upload size={32} />
                  </div>
                  <p className="font-bold">Image Preview</p>
                  <p className="text-sm">
                    Enter a valid URL to see a preview of your product image.
                  </p>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-black py-5 rounded-[2rem] flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-red-600/30 disabled:opacity-50 disabled:hover:scale-100"
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save size={20} /> Publish Product
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
