"use client";

import { useState } from "react";
import { tambahKeKeranjang } from "@/app/action";

export default function TombolTambahKeranjang({ produkId }: { produkId: number }) {
    const [memuat, setMemuat] = useState(false);
    const [sukses, setSukses] = useState(false);

    async function handleKlik() {
        setMemuat(true);
        await tambahKeKeranjang(produkId);
        setMemuat(false);
        setSukses(true);
        setTimeout(() => setSukses(false), 1500);
    }

    return (
        <button
            type="button"
            onClick={handleKlik}
            disabled={memuat}
            className="mt-4 w-full rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
            {memuat ? "Menyimpan..." : sukses ? "✓ Masuk Keranjang" : "+ Tambah ke Keranjang"}
        </button>
    );
}