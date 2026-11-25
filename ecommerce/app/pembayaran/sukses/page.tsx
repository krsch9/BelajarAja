import { Suspense } from "react";
import KartuKonfirmasi from "@/components/KartuKonfirmasi";

async function KontenSukses({
    searchParams,
}: {
    searchParams: Promise<{ orderId?: string; metode?: string }>;
}) {
    const { orderId, metode } = await searchParams;
    return <KartuKonfirmasi orderId={orderId} metode={metode} />;
}

export default function PembayaranSuksesPage({
    searchParams,
}: {
    searchParams: Promise<{ orderId?: string; metode?: string }>;
}) {
    return (
        <main className="py-10">
            <Suspense fallback={<p className="text-center text-gray-500">Memuat konfirmasi...</p>}>
                <KontenSukses searchParams={searchParams} />
            </Suspense>
        </main>
    );
}