import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "TokoKita E-Commerce",
  description: "Aplikasi E-Commerce Next.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Hitung total qty barang di keranjang dari database
  const isiKeranjang = await prisma.itemKeranjang.findMany();
  const jumlahItem = isiKeranjang.reduce(
    (total: number, item: (typeof isiKeranjang)[number]) => total + item.qty,
    0
  );

  return (
    <html lang="id">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar jumlahItem={jumlahItem} />
        <div className="mx-auto max-w-5xl px-6 py-8">{children}</div>
      </body>
    </html>
  );
}