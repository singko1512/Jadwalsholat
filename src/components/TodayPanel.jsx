/**
 * TodayPanel.jsx — Panel jadwal sholat hari ini.
 * Menampilkan nama lokasi, tanggal dari API, dan list jam per waktu sholat.
 * Baris yang highlight adalah sholat berikutnya berdasarkan jam sekarang.
 */
import PrayerRow from './PrayerRow.jsx';

// Urutan tampilan mengikuti field response API: imsak, subuh, ...
const PRAYER_ORDER = [
  { key: 'imsak', label: 'Imsak' },
  { key: 'subuh', label: 'Subuh' },
  { key: 'terbit', label: 'Terbit' },
  { key: 'dhuha', label: 'Dhuha' },
  { key: 'dzuhur', label: 'Dzuhur' },
  { key: 'ashar', label: 'Ashar' },
  { key: 'maghrib', label: 'Maghrib' },
  { key: 'isya', label: 'Isya' },
];

export default function TodayPanel({ cityName, regionName, todaySchedule }) {
  const now = new Date();

  // Cari key sholat pertama yang jamnya masih di depan waktu sekarang
  const nextKey =
    todaySchedule &&
    PRAYER_ORDER.find(({ key }) => {
      const t = todaySchedule[key];
      if (!t) return false;
      const [h, m] = t.split(':').map(Number);
      const d = new Date();
      d.setHours(h, m, 0, 0);
      return d > now;
    })?.key;

  return (
    <section className="today-panel">
      <header className="today-header">
        <div>
          <h2 className="today-title">Jadwal Waktu Sholat</h2>
          <p className="today-location">
            {cityName}
            {regionName ? ` · ${regionName}` : ''}
          </p>
          {todaySchedule && (
            <p className="today-date">{todaySchedule.tanggal}</p>
          )}
        </div>
      </header>

      <div className="today-prayers">
        {PRAYER_ORDER.map(({ key, label }) => (
          <PrayerRow
            key={key}
            prayerKey={key}
            name={label}
            time={todaySchedule ? todaySchedule[key] : null}
            highlight={key === nextKey}
          />
        ))}
      </div>
    </section>
  );
}
