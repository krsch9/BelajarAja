import Link from "next/link";
import { prisma } from "@/lib/prisma";
import CartItem from "@/components/CartItem";
import RingkasanBelanja from "@/components/RingkasanBelanja";

export default async function KeranjangPage() {
    const isiKeranjang = await prisma.itemKeranjang.findMany({
        include: { produk: true },
        orderBy: { id: "asc" },
    });

    return (
        <main>
            <div className="mb-6 flex items-center justify-between">
                <h1 className="text-2xl font-bold">Keranjang Belanja</h1>
                <Link href="/" className="text-sm text-blue-600 hover:underline">
                    &larr; Lanjut Belanja
                </Link>
            </div>

            {isiKeranjang.length === 0 ? (
                <div className="rounded-lg border bg-white p-10 text-center">
                    <p className="text-gray-500">Keranjang belanja Anda masih kosong.</p>
                    <Link
                        href="/"
                        className="mt-4 inline-block rounded bg-blue-600 px-5 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Lihat Katalog
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    <div className="rounded-lg border bg-white px-6 md:col-span-2">
                        {isiKeranjang.map((item) => (
                            <CartItem key={item.id} item={item} />
                        ))}
                    </div>

                    <div>
                        <RingkasanBelanja daftarItem={isiKeranjang} />
                    </div>
                </div>
            )}
        </main>
    );
}