"use client";

import { useActionState } from "react";
import { prosesPembayaran, type FormBayarState } from "@/app/action";

const awal: FormBayarState = { pesan: "" };

export default function FormPembayaran() {
  const [state, formAction, pending] = useActionState(prosesPembayaran, awal);

  return (
    <form action={formAction} className="space-y-4 rounded-lg border bg-white p-6">
      {state.pesan && (
        <p className="rounded bg-red-50 p-3 text-sm text-red-600">{state.pesan}</p>
      )}

      <div>
        <label htmlFor="nama" className="block text-sm font-medium text-gray-700">
          Nama Penerima
        </label>
        <input
          id="nama"
          name="nama"
          type="text"
          placeholder="Masukkan nama lengkap"
          className="mt-1 w-full rounded border border-gray-300 p-2.5 text-sm"
        />
        {state.galat?.nama && (
          <p className="mt-1 text-xs text-red-600">{state.galat.nama}</p>
        )}
      </div>

      <div>
        <label htmlFor="alamat" className="block text-sm font-medium text-gray-700">
          Alamat Pengiriman
        </label>
        <textarea
          id="alamat"
          name="alamat"
          rows={3}
          placeholder="Masukkan alamat lengkap pengiriman"
          className="mt-1 w-full rounded border border-gray-300 p-2.5 text-sm"
        />
        {state.galat?.alamat && (
          <p className="mt-1 text-xs text-red-600">{state.galat.alamat}</p>
        )}
      </div>

      <div>
        <label htmlFor="metode" className="block text-sm font-medium text-gray-700">
          Metode Pembayaran
        </label>
        <select
          id="metode"
          name="metode"
          className="mt-1 w-full rounded border border-gray-300 p-2.5 text-sm"
        >
          <option value="QRIS">QRIS</option>
          <option value="Transfer Bank">Transfer Bank</option>
          <option value="E-Wallet">E-Wallet</option>
        </select>
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded bg-green-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
      >
        {pending ? "Memproses..." : "Bayar Sekarang"}
      </button>
    </form>
  );
}