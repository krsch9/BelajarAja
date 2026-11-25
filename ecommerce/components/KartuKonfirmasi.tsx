import Link from "next/link";

type KartuKonfirmasiProps = {
    orderId?: string;
    metode?: string;
};

export default function KartuKonfirmasi({
    orderId = "ORD-000000",
    metode = "QRIS",
}: KartuKonfirmasiProps) {
    return (
        <div className="mx-auto max-w-md rounded-lg border border-gray-200 bg-white p-8 text-center shadow-sm">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-600">
                ✓
            </div>

            <h1 className="mt-4 text-2xl font-bold text-gray-900">Pembayaran Berhasil!</h1>
            <p className="mt-2 text-sm text-gray-600">
                Terima kasih atas pesanan Anda. Pesanan sedang kami proses untuk pengiriman.
            </p>

            <div className="mt-6 rounded bg-gray-50 p-4 text-left text-sm">
                <div className="flex justify-between py-1">
                    <span className="text-gray-500">Nomor Pesanan</span>
                    <span className="font-semibold text-gray-900">{orderId}</span>
                </div>
                <div className="flex justify-between py-1">
                    <span className="text-gray-500">Metode Bayar</span>
                    <span className="font-semibold text-gray-900">{metode}</span>
                </div>
            </div>

            <Link
                href="/"
                className="mt-6 inline-block w-full rounded bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
                Kembali ke Halaman Utama
            </Link>
        </div>
    );
}