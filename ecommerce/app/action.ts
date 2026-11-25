"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

// 1. Tambah ke Keranjang (dipanggil oleh TombolTambahKeranjang)
export async function tambahKeKeranjang(produkId: number) {
    const itemAda = await prisma.itemKeranjang.findUnique({
        where: { produkId },
    });

    if (itemAda) {
        await prisma.itemKeranjang.update({
            where: { produkId },
            data: { qty: itemAda.qty + 1 },
        });
    } else {
        await prisma.itemKeranjang.create({
            data: { produkId, qty: 1 },
        });
    }

    revalidatePath("/");
    revalidatePath("/keranjang");
}

// 2. Ubah Qty di Keranjang
export async function ubahQtyKeranjang(id: number, qtyBaru: number) {
    if (qtyBaru < 1) return;

    await prisma.itemKeranjang.update({
        where: { id },
        data: { qty: qtyBaru },
    });

    revalidatePath("/keranjang");
}

// 3. Hapus Item dari Keranjang
export async function hapusItemKeranjang(id: number) {
    await prisma.itemKeranjang.delete({
        where: { id },
    });

    revalidatePath("/keranjang");
    revalidatePath("/");
}

// 4. Proses Pembayaran (dipanggil oleh FormPembayaran)
export type FormBayarState = {
    pesan: string;
    galat?: { nama?: string; alamat?: string };
};

export async function prosesPembayaran(
    _prev: FormBayarState,
    formData: FormData
): Promise<FormBayarState> {
    const nama = String(formData.get("nama") ?? "").trim();
    const alamat = String(formData.get("alamat") ?? "").trim();
    const metode = String(formData.get("metode") ?? "QRIS");

    // Validasi di server
    const galat: NonNullable<FormBayarState["galat"]> = {};
    if (nama.length < 3) galat.nama = "Nama penerima minimal 3 karakter.";
    if (!alamat) galat.alamat = "Alamat pengiriman wajib diisi.";

    if (Object.keys(galat).length > 0) {
        return { pesan: "Periksa kembali isian Anda.", galat };
    }

    // Ambil isi keranjang dari database untuk hitung total
    const isiKeranjang = await prisma.itemKeranjang.findMany({
        include: { produk: true },
    });

    if (isiKeranjang.length === 0) {
        return { pesan: "Keranjang belanja kosong." };
    }
    const total = isiKeranjang.reduce(
    (sum: number, item: (typeof isiKeranjang)[number]) =>
      sum + item.produk.harga * item.qty,
    0
     );

    // Simpan pesanan baru & kosongkan tabel keranjang
    let pesananBaru;
    try {
        pesananBaru = await prisma.pesanan.create({
            data: { nama, alamat, metode, total },
        });
        await prisma.itemKeranjang.deleteMany();
    } catch {
        return { pesan: "Terjadi kesalahan di server." };
    }

    revalidatePath("/");
    revalidatePath("/keranjang");

    // Redirect wajib di luar blok try/catch (Modul 03)
    redirect(
        `/pembayaran/sukses?orderId=ORD-${pesananBaru.id}&metode=${encodeURIComponent(metode)}`
    );
}