import TombolTambahKeranjang from "./TombolTambahKeranjang";

export type Produk = {
    id: number;
    nama: string;
    harga: number;
    deskripsi: string;
    gambar: string;
};

export default function ProductCard({ produk }: { produk: Produk }) {
    return (
        <div className="flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
            <div>
                <img
                    src={produk.gambar}
                    alt={produk.nama}
                    className="h-48 w-full rounded object-cover"
                />
                <h3 className="mt-3 text-lg font-semibold text-gray-900">{produk.nama}</h3>
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">{produk.deskripsi}</p>
            </div>

            <div className="mt-4">
                <p className="text-base font-bold text-blue-600">
                    Rp {produk.harga.toLocaleString("id-ID")}
                </p>
                <TombolTambahKeranjang produk={produk} />
            </div>
        </div>
    );
}