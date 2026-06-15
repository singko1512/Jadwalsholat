/**
 * FilterBar.jsx
 * UI dropdown lokasi: pilih `Provinsi` lalu `Kota/Kabupaten` menyesuaikan provinsi tersebut.
 */
export default function FilterBar({
  provinces,
  selectedProvince,
  onChangeProvince,
  selectedCity,
  onChangeCity,
}) {
  // Ambil daftar kota berdasarkan provinsi yang dipilih
  const currentProvince = provinces.find((p) => p.code === selectedProvince);
  const cityOptions = currentProvince?.cities ?? [];

  return (
    <section className="filter-bar filter-bar--compact">
      <div className="filter-group">
        <label className="filter-label" htmlFor="province">
          Provinsi
        </label>
        <select
          id="province"
          className="filter-select"
          value={selectedProvince || ''}
          onChange={(e) => onChangeProvince(e.target.value)}
        >
          {provinces.map((prov) => (
            <option key={prov.code} value={prov.code}>
              {prov.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label className="filter-label" htmlFor="city">
          Kota / Kabupaten
        </label>
        <select
          id="city"
          className="filter-select"
          value={selectedCity || ''}
          onChange={(e) => onChangeCity(e.target.value)}
        >
          {cityOptions.map((city) => (
            <option key={city.id} value={city.id}>
              {city.name}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}
