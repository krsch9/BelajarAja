import Link from "next/link";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import FormPembayaran from "@/components/FormPembayaran";

export default async function PembayaranPage() {
    const isiKeranjang = await prisma.itemKeranjang.findMany({
        include: { produk: true },
    });

    // Cegah akses halaman bayar jika keranjang kosong
    if (isiKeranjang.length === 0) {
        redirect("/keranjang");
    }

    const totalBayar = isiKeranjang.reduce(
        (sum: number, item: (typeof isiKeranjang)[number]) =>
            sum + item.produk.harga * item.qty,
        0
    );

    return (
        <main className="mx-auto max-w-2xl">
            <Link href="/keranjang" className="text-sm text-blue-600 hover:underline">
                &larr; Kembali ke Keranjang
            </Link>

            <h1 className="mt-3 mb-6 text-2xl font-bold">Pembayaran</h1>

            <div className="mb-6 rounded-lg border bg-white p-5">
                <h2 className="mb-3 font-semibold text-gray-800">Rincian Pesanan</h2>
                <ul className="space-y-2 border-b pb-3 text-sm text-gray-600">
                    {isiKeranjang.map((item: (typeof isiKeranjang)[number]) => (
                        <li key={item.id} className="flex justify-between">
                            <span>
                                {item.produk.nama} (x{item.qty})
                            </span>
                            <span>
                                Rp {(item.produk.harga * item.qty).toLocaleString("id-ID")}
                            </span>
                        </li>
                    ))}
                </ul>
                <div className="mt-3 flex justify-between font-bold text-gray-900">
                    <span>Total Pembayaran</span>
                    <span className="text-blue-600">
                        Rp {totalBayar.toLocaleString("id-ID")}
                    </span>
                </div>
            </div>

            <FormPembayaran />
        </main>
    );
}