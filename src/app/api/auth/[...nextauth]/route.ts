import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

const handler = NextAuth({
  // 1. WAJIB: Tambahkan Secret
  // Tanpa ini, NextAuth akan error di mode produksi (Vercel)
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],

  // 2. PERINGATAN: Halaman Custom
  // Kalau kamu BELUM buat file di src/app/auth/signin/page.tsx, 
  // bagian ini sebaiknya di-comment dulu supaya kamu bisa pakai 
  // halaman login bawaan NextAuth yang sudah jadi.
  /*
  pages: {
    signIn: '/auth/signin', 
  },
  */

  // 3. Tambahkan Callback (Opsional tapi berguna)
  callbacks: {
    async session({ session, token }) {
      // Menambahkan user id ke session agar bisa dipakai di database
      if (session.user) {
        (session.user as any).id = token.sub;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };