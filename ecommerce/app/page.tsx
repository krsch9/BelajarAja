import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import SearchBar from "@/components/SearchBar";
import ProductCard from "@/components/ProductCard";

async function DaftarProduk({ cari }: { cari?: string }) {
  const produkList = await prisma.produk.findMany({
    where: cari ? { nama: { contains: cari } } : undefined,
    orderBy: { id: "asc" },
  });

  if (produkList.length === 0) {
    return (
      <p className="py-12 text-center text-gray-500">
        {cari
          ? `Tidak ada produk dengan kata kunci "${cari}".`
          : "Belum ada produk di katalog."}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
      {produkList.map((produk: (typeof produkList)[number]) => (
        <ProductCard key={produk.id} produk={produk} />
      ))}
    </div>
  );
}

async function KontenKatalog({
  searchParams,
}: {
  searchParams: Promise<{ cari?: string | string[] }>;
}) {
  const { cari: nilaiCari } = await searchParams;
  const cari = Array.isArray(nilaiCari) ? nilaiCari[0] : nilaiCari;

  return (
    <>
      <SearchBar defaultValue={cari} />
      <Suspense
        key={cari}
        fallback={<p className="py-10 text-center text-gray-500">Memuat produk...</p>}
      >
        <DaftarProduk cari={cari} />
      </Suspense>
    </>
  );
}

export default function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ cari?: string | string[] }>;
}) {
  return (
    <main>
      <h1 className="mb-6 text-2xl font-bold">Katalog Produk</h1>
      <Suspense fallback={<p className="text-gray-500">Memuat halaman...</p>}>
        <KontenKatalog searchParams={searchParams} />
      </Suspense>
    </main>
  );
}