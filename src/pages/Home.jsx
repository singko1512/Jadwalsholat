/**
 * Home.jsx — Halaman utama aplikasi jadwal sholat
 *
 * Gaya mirip Platzi (simple):
 * - Fungsi fetch dibuat di dalam file ini (lebih mudah dijelaskan).
 * - State yang dibutuhkan disimpan di Home saja.
 * - Komponen UI tetap dipisah: `FilterBar` dan `TodayPanel`.
 *
 * MODE SETORAN:
 * - Jam & slide kata-kata sengaja tidak ditampilkan (kodenya bisa dipasang lagi nanti).
 */

import { useEffect, useState } from 'react';
import FilterBar from '../components/FilterBar.jsx';
import TodayPanel from '../components/TodayPanel.jsx';
import LiveClock from '../components/LiveClock.jsx';
import QuoteRotator from '../components/QuoteRotator.jsx';

// URL dasar endpoint jadwal sholat versi 2 dari myQuran
const BASE_URL = 'https://api.myquran.com/v2/sholat';

// Pemetaan kode provinsi (2 digit pertama dari ID kota) -> nama provinsi
const PROVINCE_MAP = {
  '01': 'Aceh',
  '02': 'Sumatera Utara',
  '03': 'Sumatera Barat',
  '04': 'Riau',
  '05': 'Kepulauan Riau',
  '06': 'Jambi',
  '07': 'Bengkulu',
  '08': 'Sumatera Selatan',
  '09': 'Kepulauan Bangka Belitung',
  '10': 'Lampung',
  '11': 'Banten',
  '12': 'Jawa Barat',
  '13': 'DKI Jakarta',
  '14': 'Jawa Tengah',
  '15': 'DI Yogyakarta',
  '16': 'Jawa Timur',
  '17': 'Bali',
  '18': 'Nusa Tenggara Barat',
  '19': 'Nusa Tenggara Timur',
  '20': 'Kalimantan Barat',
  '21': 'Kalimantan Selatan',
  '22': 'Kalimantan Tengah',
  '23': 'Kalimantan Timur',
  '24': 'Kalimantan Utara',
  '25': 'Gorontalo',
  '26': 'Sulawesi Selatan',
  '27': 'Sulawesi Tenggara',
  '28': 'Sulawesi Tengah',
  '29': 'Sulawesi Utara',
  '30': 'Sulawesi Barat',
  '31': 'Maluku',
  '32': 'Maluku Utara',
  '33': 'Papua',
  '34': 'Papua Barat',
};

// Helper: grouping array kota menjadi provinsi -> daftar kota
function groupCitiesByProvince(cities) {
  const grouped = {};

  cities.forEach((city) => {
    // ID kota di API berbentuk angka; 2 digit pertama setelah pad 4 digit dipakai sebagai kode provinsi.
    const code = String(city.id).padStart(4, '0').slice(0, 2);
    const provinceName = PROVINCE_MAP[code] || 'Lainnya';

    if (!grouped[code]) {
      grouped[code] = {
        code,
        name: provinceName,
        cities: [],
      };
    }

    grouped[code].cities.push({
      id: city.id,
      name: city.lokasi,
    });
  });

  return Object.values(grouped).sort((a, b) => a.code.localeCompare(b.code));
}

// Fetch daftar kota dari API myQuran
async function fetchAllCities() {
  const res = await fetch(`${BASE_URL}/kota/semua`);
  if (!res.ok) throw new Error(`Gagal memuat daftar kota (${res.status})`);
  const json = await res.json();
  if (!json.status) throw new Error(json.message || 'Gagal memuat daftar kota');
  return json.data; // [{ id, lokasi }]
}

// Fetch jadwal SHOLAT untuk satu tanggal tertentu
async function fetchDailySchedule(cityId, year, month, day) {
  const m = String(month).padStart(2, '0');
  const d = String(day).padStart(2, '0');

  const res = await fetch(`${BASE_URL}/jadwal/${cityId}/${year}/${m}/${d}`);
  if (!res.ok) throw new Error(`Gagal memuat jadwal (${res.status})`);
  const json = await res.json();
  if (!json.status) throw new Error(json.message || 'Gagal memuat jadwal');
  return json.data; // { lokasi, daerah, jadwal: { tanggal, imsak, ... } }
}

export default function Home() {
  // state: daftar provinsi + kota hasil grouping
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // state: jadwal satu hari (hari ini)
  const [schedule, setSchedule] = useState(null);

  // state: loading / error untuk UI
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Untuk tampilan bulan & tahun di header
  const decorativeDate = new Date().toLocaleDateString('id-ID', {
    month: 'long',
    year: 'numeric',
  });

  // Ambil informasi provinsi & kota terpilih (untuk subtitle)
  const activeProvince = provinces.find((p) => p.code === selectedProvince);
  const provinceName = activeProvince?.name || '';
  const activeCity = activeProvince?.cities.find((c) => c.id === selectedCity);
  const cityName = activeCity?.name || schedule?.lokasi || '';

  // Field untuk TodayPanel (langsung sesuai struktur API)
  const todaySchedule = schedule?.jadwal ?? null;

  // Ambil jadwal hari ini untuk cityId tertentu
  async function loadSchedule(cityId) {
    setLoading(true);
    setError('');
    try {
      const now = new Date();
      const data = await fetchDailySchedule(
        cityId,
        now.getFullYear(),
        now.getMonth() + 1,
        now.getDate(),
      );
      setSchedule(data);
    } catch (e) {
      setError(e.message || 'Gagal memuat jadwal sholat');
      setSchedule(null);
    } finally {
      setLoading(false);
    }
  }

  /**
   * init:
   * 1) fetch semua kota
   * 2) group berdasarkan provinsi
   * 3) pilih default (DKI Jakarta code '13' jika ada)
   * 4) fetch jadwal untuk kota default tersebut
   */
  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        setLoading(true);
        const cities = await fetchAllCities();
        if (cancelled) return;

        const grouped = groupCitiesByProvince(cities);
        setProvinces(grouped);

        const defaultProvince = grouped.find((p) => p.code === '13') || grouped[0];
        const defaultCity = defaultProvince?.cities?.[0];

        setSelectedProvince(defaultProvince?.code || '');
        setSelectedCity(defaultCity?.id || '');

        if (defaultCity?.id) {
          // Fetch jadwal untuk default city
          const now = new Date();
          const data = await fetchDailySchedule(
            defaultCity.id,
            now.getFullYear(),
            now.getMonth() + 1,
            now.getDate(),
          );
          if (!cancelled) setSchedule(data);
        }
      } catch (e) {
        if (!cancelled) setError(e.message || 'Gagal memuat lokasi/jadwal');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    init();

    return () => {
      cancelled = true;
    };
  }, []);

  /** Jika user ganti provinsi, otomatis pilih kota pertama provinsi itu lalu fetch jadwalnya. */
  function handleChangeProvince(code) {
    const prov = provinces.find((p) => p.code === code);
    const firstCity = prov?.cities?.[0];
    if (!firstCity) return;

    setSelectedProvince(code);
    setSelectedCity(firstCity.id);
    loadSchedule(firstCity.id);
  }

  /** Jika user ganti kota, fetch jadwalnya. */
  function handleChangeCity(cityId) {
    setSelectedCity(cityId);
    loadSchedule(cityId);
  }

  return (
    <div className="page-root">
      <div className="page-container">
        {/* Header: judul + subtitle lokasi + pill tanggal */}
        <header className="page-header">
          <div>
            <h1 className="page-title">Jadwal Waktu Sholat</h1>
            <p className="page-subtitle">
              {provinceName && <span>{provinceName} · </span>}
              {cityName}
            </p>
          </div>
          <div className="page-date">
            <span>{decorativeDate}</span>
          </div>
        </header>

        {/* Filter lokasi */}
        <FilterBar
          provinces={provinces}
          selectedProvince={selectedProvince}
          onChangeProvince={handleChangeProvince}
          selectedCity={selectedCity}
          onChangeCity={handleChangeCity}
        />

        {loading && (
          <div className="loading-state">
            <div className="spinner" />
            <p>Memuat jadwal sholat...</p>
          </div>
        )}

        {error && !loading && (
          <div className="error-state">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <main className="content-layout">
            <TodayPanel
              cityName={cityName}
              regionName={schedule?.daerah || provinceName}
              todaySchedule={todaySchedule}
            />
            <aside className="decorative-panel">
              <LiveClock />
            </aside>
          </main>
        )}

        {!loading && !error && <QuoteRotator />}

        <footer className="page-footer">
          <span>Data jadwal sholat oleh API Muslim myQuran</span>
        </footer>
      </div>
    </div>
  );
}
