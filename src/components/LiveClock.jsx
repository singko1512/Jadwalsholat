/**
 * LiveClock.jsx — Jam analog + digital real-time
 * Fungsi: menampilkan waktu lokal perangkat; diperbarui setiap detik untuk jarum dan teks.
 */
import { useEffect, useState } from 'react';

function formatTime(date) {
  return date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

function formatDate(date) {
  return date.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default function LiveClock() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours();

  // 6° per detik; menit ditambah smoothing dari detik; jam 30° per jam + offset menit
  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;

  return (
    <div className="clock-widget">
      <p className="clock-label">Waktu Sekarang</p>

      <div className="analog-clock" aria-label="Jam analog">
        <span className="clock-number clock-number-12">12</span>
        <span className="clock-number clock-number-3">3</span>
        <span className="clock-number clock-number-6">6</span>
        <span className="clock-number clock-number-9">9</span>

        <span
          className="clock-hand clock-hand-hour"
          style={{ transform: `translateX(-50%) rotate(${hourDeg}deg)` }}
        />
        <span
          className="clock-hand clock-hand-minute"
          style={{ transform: `translateX(-50%) rotate(${minuteDeg}deg)` }}
        />
        <span
          className="clock-hand clock-hand-second"
          style={{ transform: `translateX(-50%) rotate(${secondDeg}deg)` }}
        />
        <span className="clock-center-dot" />
      </div>

      <p className="clock-time">{formatTime(now)}</p>
      <p className="clock-date">{formatDate(now)}</p>
    </div>
  );
}

