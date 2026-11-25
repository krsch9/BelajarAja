-- CreateTable
CREATE TABLE "Produk" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "harga" INTEGER NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "gambar" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ItemKeranjang" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "produkId" INTEGER NOT NULL,
    "qty" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "ItemKeranjang_produkId_fkey" FOREIGN KEY ("produkId") REFERENCES "Produk" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Pesanan" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nama" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "metode" TEXT NOT NULL,
    "total" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "ItemKeranjang_produkId_key" ON "ItemKeranjang"("produkId");
