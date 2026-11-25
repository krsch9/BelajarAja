export default function SearchBar({ defaultValue = "" }: { defaultValue?: string }) {
    return (
        <form action="/" method="get" className="mb-6 flex gap-2">
            <input
                type="text"
                name="cari"
                defaultValue={defaultValue}
                placeholder="Cari nama produk..."
                className="w-full rounded border border-gray-300 p-2.5 text-sm"
            />
            <button
                type="submit"
                className="rounded bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900"
            >
                Cari
            </button>
        </form>
    );
}