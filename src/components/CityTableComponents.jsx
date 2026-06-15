export default function CityTable({ rows = [] }) {
    return (
        <div className="mt-10 overflow-x-auto rounded-xl bg-white shadow">
            <table className="min-w-full text-sm">
                <thead className="bg-gray-100 text-xs uppercase text-gray-600">
                    <tr>
                        <th className="px-4 py-2 text-left">Kota</th>
                        <th className="px-4 py-2 text-left">Wilayah</th>
                        <th className="px-2 py-2">Imsak</th>
                        <th className="px-2 py-2">Subuh</th>
                        <th className="px-2 py-2">Terbit</th>
                        <th className="px-2 py-2">Dhuha</th>
                        <th className="px-2 py-2">Dzuhur</th>
                        <th className="px-2 py-2">Ashar</th>
                        <th className="px-2 py-2">Maghrib</th>
                        <th className="px-2 py-2">Isya</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {rows.map((row) => (
                        <tr key={row.id}>
                            <td className="px-4 py-2 whitespace-nowrap">{row.name}</td>
                            <td className="px-4 py-2 whitespace-nowrap">{row.region}</td>
                            <td className="px-2 py-2 text-center">{row.jadwal?.imsak}</td>
                            <td className="px-2 py-2 text-center">{row.jadwal?.subuh}</td>
                            <td className="px-2 py-2 text-center">{row.jadwal?.terbit}</td>
                            <td className="px-2 py-2 text-center">{row.jadwal?.dhuha}</td>
                            <td className="px-2 py-2 text-center">{row.jadwal?.dzuhur}</td>
                            <td className="px-2 py-2 text-center">{row.jadwal?.ashar}</td>
                            <td className="px-2 py-2 text-center">{row.jadwal?.maghrib}</td>
                            <td className="px-2 py-2 text-center">{row.jadwal?.isya}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}