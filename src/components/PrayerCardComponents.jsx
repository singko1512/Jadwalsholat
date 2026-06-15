import { Card } from 'flowbite-react';

export default function PrayerCard({ label, time, isNext }) {
    return (
        <Card className={`text-center border ${isNext ? 'border-green-500 shadow-lg' : 'border-gray-100'} bg-white/90`}>
            <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
            <p className="mt-2 text-3xl font-bold text-blue-600">{time || '--:--'}</p>
            {isNext && (
                <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Selanjutnya
                </span>
            )}
        </Card>
    );
}