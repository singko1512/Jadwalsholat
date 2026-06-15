/**
 * QuoteRotator.jsx — Kata-kata bergilir otomatis
 * Fungsi: menampilkan satu kutipan, lalu ganti setiap beberapa detik dengan transisi halus.
 */
import { useEffect, useState } from 'react';

const QUOTES = [
  'Sesungguhnya sholat itu adalah kewajiban yang ditentukan waktunya atas orang-orang yang beriman.',
  'Dan dirikanlah sholat; sesungguhnya sholat itu mencegah dari perbuatan keji dan mungkar.',
  'Maka sampaikanlah kabar gembira kepada orang-orang yang beriman.',
  'Dan barang siapa bertakwa kepada Allah, niscaya Dia akan mengadakan baginya jalan keluar.',
  'Sesungguhnya bersama kesulitan ada kemudahan.',
  'Dan jadikanlah sabar dan sholat sebagai penolongmu; sesungguhnya yang demikian itu sungguh berat, kecuali bagi orang-orang yang khusyuk.',
  'Allah tidak membebani seseorang melainkan sesuai dengan kesanggupannya.',
  'Barang siapa bertawakal kepada Allah, niscaya Allah akan mencukupkan keperluannya.',
];

const INTERVAL_MS = 6000;

export default function QuoteRotator() {
  const [index, setIndex] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setFadeIn(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % QUOTES.length);
        setFadeIn(true);
      }, 350);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="quote-rotator" aria-live="polite">
      <p className={`quote-rotator-text ${fadeIn ? 'quote-rotator-text--visible' : ''}`}>
        {QUOTES[index]}
      </p>
      <div className="quote-rotator-dots" aria-hidden="true">
        {QUOTES.map((_, i) => (
          <span key={i} className={`quote-dot ${i === index ? 'quote-dot--active' : ''}`} />
        ))}
      </div>
    </section>
  );
}

