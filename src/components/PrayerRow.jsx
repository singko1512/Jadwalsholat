/**
 * PrayerRow.jsx — baris jadwal sholat (ikon + nama + jam)
 * highlight=true akan memberi gaya lebih tegas untuk sholat berikutnya.
 */
import PrayerTimeIcon from './PrayerTimeIcon.jsx';

export default function PrayerRow({ prayerKey, name, time, highlight }) {
  return (
    <div className={`prayer-row ${highlight ? 'prayer-row--highlight' : ''}`}>
      <div className="prayer-row-left">
        <PrayerTimeIcon prayerKey={prayerKey} highlight={highlight} />
        <span className="prayer-name">{name}</span>
      </div>
      <div className="prayer-time">{time || '--:--'}</div>
    </div>
  );
}
