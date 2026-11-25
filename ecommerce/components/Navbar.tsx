import Link from "next/link";

export default function Navbar({ jumlahItem = 0 }: { jumlahItem?: number }) {
    return (
        <nav className="border-b bg-white px-6 py-4 shadow-sm">
            <div className="mx-auto flex max-w-5xl items-center justify-between">
                <Link href="/" className="text-xl font-bold text-blue-600">
                    TokoKita
                </Link>

                <div className="flex items-center gap-6">
                    <Link href="/" className="text-sm font-medium text-gray-700 hover:text-blue-600">
                        Katalog
                    </Link>
                    <Link
                        href="/keranjang"
                        className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                    >
                        Keranjang ({jumlahItem})
                    </Link>
                </div>
            </div>
        </nav>
    );
}