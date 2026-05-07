"use client";

import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { MessageSquare, Github, Chrome, Send, LogOut, User } from "lucide-react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";

// Inisialisasi Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function CommentSection({ postSlug }: { postSlug: string }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [commentsList, setCommentsList] = useState<any[]>([]);

  // 1. Ambil Komentar dari Supabase
  const fetchComments = async () => {
    const { data, error } = await supabase
      .from("comments")
      .select("*")
      .eq("post_slug", postSlug)
      .order("created_at", { ascending: false });

    if (!error && data) setCommentsList(data);
  };

  useEffect(() => {
    fetchComments();
  }, [postSlug]);

  // 2. Kirim Komentar (Langsung Approved)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment || !session) return;
    setIsSubmitting(true);

    const { error } = await supabase.from("comments").insert([
      {
        post_slug: postSlug,
        user_name: session.user?.name,
        user_email: session.user?.email,
        user_image: session.user?.image,
        content: comment,
        // is_approved otomatis true dari database
      },
    ]);

    if (!error) {
      setComment("");
      fetchComments(); // Refresh list agar komentar baru muncul
    }
    setIsSubmitting(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric", month: "short", hour: "2-digit", minute: "2-digit"
    });
  };

  return (
    <section className="mt-16 border-t border-gray-100 pt-16">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-1.5 h-8 bg-[#FF4500] rounded-full"></div>
        <h3 className="text-2xl font-black uppercase tracking-tighter text-gray-900">
          Suara <span className="text-[#FF4500]">Rakyat</span>
        </h3>
      </div>

      {/* FORM INPUT KOMENTAR */}
      {!session ? (
        <div className="bg-gray-50 rounded-[2rem] p-8 text-center border border-dashed border-gray-200">
          <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.3em] mb-6">
            Login untuk mengirim aspirasi
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button onClick={() => signIn("google")} className="flex items-center justify-center gap-3 bg-white border border-gray-200 px-6 py-3 rounded-xl font-bold text-xs hover:bg-gray-50 transition-all shadow-sm">
              <Chrome size={18} className="text-red-500" /> Google
            </button>
            <button onClick={() => signIn("github")} className="flex items-center justify-center gap-3 bg-black text-white px-6 py-3 rounded-xl font-bold text-xs hover:bg-gray-800 transition-all shadow-sm">
              <Github size={18} /> GitHub
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm mb-12">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-orange-100">
                <Image src={session.user?.image || "/placeholder.jpg"} alt="User" fill className="object-cover" />
              </div>
              <div>
                <p className="text-[10px] font-black text-gray-900 uppercase tracking-tight">{session.user?.name}</p>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Siap Bergerak</span>
                </div>
              </div>
            </div>
            <button onClick={() => signOut()} className="text-gray-300 hover:text-red-500 transition-colors p-2"><LogOut size={16} /></button>
          </div>

          <form onSubmit={handleSubmit} className="relative">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Apa pendapatmu mengenai berita ini?"
              className="w-full bg-gray-50 border-none rounded-2xl p-5 text-sm focus:ring-2 focus:ring-orange-100 outline-none transition-all min-h-[100px] resize-none"
            />
            <button type="submit" disabled={isSubmitting || !comment} className="absolute bottom-4 right-4 bg-[#FF4500] text-white p-3 rounded-xl hover:bg-black transition-all shadow-lg disabled:opacity-30">
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {/* DAFTAR KOMENTAR */}
      <div className="space-y-8">
        {commentsList.length > 0 ? (
          commentsList.map((c) => (
            <div key={c.id} className="flex gap-4 animate-in fade-in slide-in-from-bottom-2">
              <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                {c.user_image ? (
                  <Image src={c.user_image} alt={c.user_name} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300"><User size={20} /></div>
                )}
              </div>
              <div className="flex-1">
                <div className="bg-gray-50/70 rounded-2xl rounded-tl-none p-5 border border-gray-100">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-[10px] font-black uppercase text-gray-900 tracking-wider">{c.user_name}</h4>
                    <span className="text-[8px] font-bold text-gray-400 uppercase">{formatDate(c.created_at)}</span>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{c.content}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 opacity-30 grayscale">
            <MessageSquare size={40} className="mx-auto mb-4" />
            <p className="text-[10px] font-black uppercase tracking-[0.3em]">Belum ada suara rakyat</p>
          </div>
        )}
      </div>
    </section>
  );
}