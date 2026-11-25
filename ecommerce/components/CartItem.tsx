"use client";

import { ubahQtyKeranjang, hapusItemKeranjang } from "@/app/action";

export type ItemKeranjang = {
    id: number;
    qty: number;
    produk: {
        id: number;
        nama: string;
        harga: number;
        gambar: string;
    };
};

export default function CartItem({ item }: { item: ItemKeranjang }) {
    return (
        <div className="flex items-center justify-between gap-4 border-b py-4">
            <div className="flex items-center gap-4">
                <img
                    src={item.produk.gambar}
                    alt={item.produk.nama}
                    className="h-16 w-16 rounded object-cover"
                />
                <div>
                    <h4 className="font-semibold text-gray-900">{item.produk.nama}</h4>
                    <p className="text-sm text-gray-600">
                        Rp {item.produk.harga.toLocaleString("id-ID")}
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={() => ubahQtyKeranjang(item.id, item.qty - 1)}
                    disabled={item.qty <= 1}
                    className="rounded border px-2.5 py-1 text-sm disabled:opacity-40"
                >
                    -
                </button>
                <span className="w-6 text-center font-medium">{item.qty}</span>
                <button
                    type="button"
                    onClick={() => ubahQtyKeranjang(item.id, item.qty + 1)}
                    className="rounded border px-2.5 py-1 text-sm"
                >
                    +
                </button>
                <button
                    type="button"
                    onClick={() => hapusItemKeranjang(item.id)}
                    className="ml-2 text-sm text-red-600 hover:underline"
                >
                    Hapus
                </button>
            </div>
        </div>
    );
}