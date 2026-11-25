import Link from "next/link";
import type { ItemKeranjang } from "./CartItem";

export default function RingkasanBelanja({ daftarItem }: { daftarItem: ItemKeranjang[] }) {
    const totalBarang = daftarItem.reduce((total, item) => total + item.qty, 0);
    const totalHarga = daftarItem.reduce((total, item) => total + item.produk.harga * item.qty, 0);

    return (
        <div className="rounded-lg border border-gray-200 bg-gray-50 p-5">
            <h3 className="text-lg font-semibold text-gray-900">Ringkasan Belanja</h3>

            <div className="mt-4 space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                    <span>Total Barang ({totalBarang} item)</span>
                    <span>Rp {totalHarga.toLocaleString("id-ID")}</span>
                </div>
                <div className="flex justify-between">
                    <span>Ongkos Kirim</span>
                    <span className="text-green-600">Gratis</span>
                </div>
            </div>

            <div className="mt-4 flex justify-between border-t pt-4 text-base font-bold text-gray-900">
                <span>Total Bayar</span>
                <span>Rp {totalHarga.toLocaleString("id-ID")}</span>
            </div>

            {daftarItem.length > 0 && (
                <Link
                    href="/pembayaran"
                    className="mt-5 block w-full rounded bg-blue-600 px-4 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700"
                >
                    Lanjut ke Pembayaran
                </Link>
            )}
        </div>
    );
}