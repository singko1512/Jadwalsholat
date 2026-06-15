/**
 * PrayerTimeIcon.jsx — ikon SVG sesuai `prayerKey`.
 * highlight mengubah warna lewat CSS (kelas `prayer-row--highlight`).
 */
export default function PrayerTimeIcon({ prayerKey, highlight }) {
  const cn = `prayer-time-icon ${highlight ? 'prayer-time-icon--highlight' : ''}`;

  switch (prayerKey) {
    case 'imsak':
      return (
        <svg className={cn} viewBox="0 0 24 24" width={22} height={22} aria-hidden="true">
          <path
            className="prayer-icon-moon"
            d="M14.5 4.5a7 7 0 1 0 7 11.8 7 7 0 0 1-7-11.8z"
          />
          <circle className="prayer-icon-star" cx="6" cy="6" r="0.9" />
          <circle className="prayer-icon-star" cx="8.5" cy="9" r="0.55" />
        </svg>
      );
    case 'subuh':
      return (
        <svg className={cn} viewBox="0 0 24 24" width={22} height={22} aria-hidden="true">
          <path className="prayer-icon-moon" d="M15 5a6.5 6.5 0 1 0 6.2 10.4A6.5 6.5 0 0 1 15 5z" />
          <path
            className="prayer-icon-dawn"
            d="M3 17.5h18"
            fill="none"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            className="prayer-icon-dawn"
            d="M5 17.5c2.2-2.8 5.3-4.5 10-4.5s8 1.5 10 4.5"
            fill="none"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      );
    case 'terbit':
      return (
        <svg className={cn} viewBox="0 0 24 24" width={22} height={22} aria-hidden="true">
          <path className="prayer-icon-sun-rise" d="M4 14a8 8 0 0 1 16 0" fill="none" />
          {[0, 45, 90, 135].map((deg, i) => (
            <line
              key={i}
              className="prayer-icon-ray"
              x1="12"
              y1="2.5"
              x2="12"
              y2="5"
              transform={`rotate(${deg} 12 10)`}
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          ))}
        </svg>
      );
    case 'dhuha':
      return (
        <svg className={cn} viewBox="0 0 24 24" width={22} height={22} aria-hidden="true">
          <circle className="prayer-icon-sun-body" cx="12" cy="11" r="4.5" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
            <line
              key={i}
              className="prayer-icon-ray-short"
              x1="12"
              y1="2.5"
              x2="12"
              y2="4.5"
              transform={`rotate(${deg} 12 11)`}
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          ))}
        </svg>
      );
    case 'dzuhur':
      return (
        <svg className={cn} viewBox="0 0 24 24" width={22} height={22} aria-hidden="true">
          <circle className="prayer-icon-sun-body" cx="12" cy="12" r="5" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => (
            <line
              key={i}
              className="prayer-icon-ray"
              x1="12"
              y1="1.2"
              x2="12"
              y2="4"
              transform={`rotate(${deg} 12 12)`}
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          ))}
        </svg>
      );
    case 'ashar':
      return (
        <svg className={cn} viewBox="0 0 24 24" width={22} height={22} aria-hidden="true">
          <circle className="prayer-icon-sun-body ashar" cx="12" cy="12" r="4.5" opacity="0.95" />
          {[45, 90, 135, 180, 225].map((deg, i) => (
            <line
              key={i}
              className="prayer-icon-ray ashar"
              x1="12"
              y1="3"
              x2="12"
              y2="5.5"
              transform={`rotate(${deg} 12 12)`}
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          ))}
        </svg>
      );
    case 'maghrib':
      return (
        <svg className={cn} viewBox="0 0 24 24" width={22} height={22} aria-hidden="true">
          <rect className="prayer-icon-horizon" x="2" y="14" width="20" height="8" rx="1" />
          <path className="prayer-icon-sunset" d="M4 14a8 8 0 0 1 16 0z" />
          <path
            className="prayer-icon-sun-glow"
            d="M8 14c1.2-2.5 3.5-4 4-4s2.8 1.5 4 4"
            fill="none"
            strokeWidth="1"
            opacity="0.6"
          />
        </svg>
      );
    case 'isya':
      return (
        <svg className={cn} viewBox="0 0 24 24" width={22} height={22} aria-hidden="true">
          <path className="prayer-icon-moon" d="M16 5a6 6 0 1 0 5.2 9.6A6 6 0 0 1 16 5z" />
          <circle className="prayer-icon-star" cx="7" cy="7" r="0.85" />
          <circle className="prayer-icon-star" cx="9.5" cy="11" r="0.5" />
          <circle className="prayer-icon-star" cx="5" cy="12" r="0.45" />
        </svg>
      );
    default:
      return (
        <svg className={cn} viewBox="0 0 24 24" width={22} height={22} aria-hidden="true">
          <circle className="prayer-icon-sun-body" cx="12" cy="12" r="4" />
        </svg>
      );
  }
}
