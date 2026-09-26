import { useEffect, useMemo, useState } from "react";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import {
  AreaChart,
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";
import {
  CloudSun,
  Droplets,
  Heart,
  History,
  LoaderCircle,
  MapPin,
  Moon,
  Search,
  Sun,
  Trash2,
  Wind
} from "lucide-react";

const API = "";

const weatherArt = {
  Clouds: "☁️",
  Clear: "☀️",
  Rain: "🌧️",
  Drizzle: "🌦️",
  Thunderstorm: "⛈️",
  Snow: "❄️",
  Mist: "🌫️"
};

function toTitleCase(value = "") {
  return value.replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatHour(timestamp) {
  return new Intl.DateTimeFormat("en-IN", {
    hour: "numeric",
    hour12: true
  }).format(new Date(timestamp * 1000));
}

export default function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem("skycast-theme") || "dark");
  const [query, setQuery] = useState("Ahmedabad");
  const [weather, setWeather] = useState(null);
  const [coordinates, setCoordinates] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem("skycast-theme", theme);
  }, [theme]);

  useEffect(() => {
    loadSideData();
    searchWeather("Ahmedabad");
  }, []);

  const chartData = useMemo(
    () => forecast.map((point) => ({ ...point, label: formatHour(point.timestamp) })),
    [forecast]
  );

  async function loadSideData() {
    const [favouritesResult, historyResult] = await Promise.allSettled([
      fetch(`${API}/api/favourite`).then((response) => response.ok ? response.json() : []),
      fetch(`${API}/api/Search`).then((response) => response.ok ? response.json() : [])
    ]);

    if (favouritesResult.status === "fulfilled") setFavourites(favouritesResult.value);
    if (historyResult.status === "fulfilled") setHistory(historyResult.value);
  }

  async function locateCity(city) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=jsonv2&limit=1&q=${encodeURIComponent(city)}`
      );
      const data = await response.json();
      if (data[0]) {
        return { lat: Number(data[0].lat), lon: Number(data[0].lon) };
      }
    } catch {
      return null;
    }
    return null;
  }

  async function loadHourlyForecast(coords) {
    if (!coords) return setForecast([]);

    try {
      const response = await fetch(`${API}/api/hourly?lat=${coords.lat}&lon=${coords.lon}`);
      if (!response.ok) return setForecast([]);
      const data = await response.json();
      setForecast(data.slice(0, 24));
    } catch {
      setForecast([]);
    }
  }

  async function searchWeather(city = query) {
    const cleanCity = city.trim();
    if (!cleanCity) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`${API}/api/${encodeURIComponent(cleanCity)}`);
      if (!response.ok) throw new Error("City not found. Try another city.");

      const data = await response.json();
      setWeather(data);
      setQuery(data.city);

      const coords = await locateCity(data.city);
      setCoordinates(coords);
      loadHourlyForecast(coords);
      loadSideData();
    } catch (error) {
      setMessage(error.message || "Could not load weather data.");
    } finally {
      setLoading(false);
    }
  }

  async function addFavourite() {
    if (!weather) return;
    try {
      const response = await fetch(`${API}/api/favourite`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city: weather.city })
      });
      if (!response.ok) throw new Error("Could not add favourite.");
      await loadSideData();
    } catch (error) {
      setMessage(error.message);
    }
  }

  async function removeFavourite(id) {
    await fetch(`${API}/api/favourite/${id}`, { method: "DELETE" });
    loadSideData();
  }

  const weatherEmoji = weatherArt[weather?.main] || "🌤️";
  const mapPosition = coordinates ? [coordinates.lat, coordinates.lon] : null;

  return (
    <main className="app-shell">
      <header className="topbar">
        <div className="brand"><CloudSun size={28} /><span>Skycast</span></div>
        <button className="theme-toggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} aria-label="Toggle colour theme">
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          <span>{theme === "dark" ? "Light" : "Dark"}</span>
        </button>
      </header>

      <section className="hero">
        <p className="eyebrow">Live weather, beautifully clear</p>
        <h1>Plan around the <em>sky.</em></h1>
        <form className="search-form" onSubmit={(event) => { event.preventDefault(); searchWeather(); }}>
          <Search size={20} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search any city" aria-label="Search city" />
          <button type="submit" disabled={loading}>{loading ? <LoaderCircle className="spin" size={19} /> : "Search"}</button>
        </form>
        {message && <p className="error-message">{message}</p>}
      </section>

      <section className="dashboard">
        <article className="current-card">
          {weather ? <>
            <div className="current-header">
              <div><p className="location"><MapPin size={16} /> {weather.city}</p><p className="date">Current conditions</p></div>
              <button className="icon-button" onClick={addFavourite} aria-label="Add city to favourites"><Heart size={21} /></button>
            </div>
            <div className="temperature-row">
              <span className="weather-emoji">{weatherEmoji}</span>
              <p className="temperature">{Math.round(weather.temperature)}<sup>°</sup></p>
              <p className="condition">{toTitleCase(weather.description)}</p>
            </div>
            <div className="metric-grid">
              <div><Wind size={20} /><span>Wind</span><strong>{weather.windspeed} m/s</strong></div>
              <div><Droplets size={20} /><span>Humidity</span><strong>{weather.humidity}%</strong></div>
              <div><CloudSun size={20} /><span>Feels like</span><strong>{Math.round(weather.temperature)}°</strong></div>
            </div>
          </> : <div className="empty-state">Search for a city to see live weather.</div>}
        </article>

        <article className="map-card">
          <div className="section-heading"><div><p className="eyebrow">Location</p><h2>Weather map</h2></div><MapPin size={20} /></div>
          {mapPosition ? <MapContainer key={`${mapPosition[0]}-${mapPosition[1]}`} center={mapPosition} zoom={10} scrollWheelZoom={false}>
            <TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <CircleMarker center={mapPosition} radius={12} pathOptions={{ color: "#fff", fillColor: "#5b7cfa", fillOpacity: 1 }}>
              <Popup>{weather?.city}</Popup>
            </CircleMarker>
          </MapContainer> : <div className="map-empty">Search a city to load its map.</div>}
        </article>

        <article className="forecast-card">
          <div className="section-heading"><div><p className="eyebrow">Next 24 hours</p><h2>Temperature trend</h2></div><span className="live-dot">Live</span></div>
          {chartData.length ? <ResponsiveContainer width="100%" height={260}>
            <AreaChart data={chartData} margin={{ top: 12, right: 8, left: -22, bottom: 0 }}>
              <defs><linearGradient id="temperatureFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#5b7cfa" stopOpacity={0.42} /><stop offset="100%" stopColor="#5b7cfa" stopOpacity={0} /></linearGradient></defs>
              <CartesianGrid vertical={false} stroke="currentColor" opacity={0.1} />
              <XAxis dataKey="label" interval="preserveStartEnd" tickLine={false} axisLine={false} />
              <YAxis unit="°" tickLine={false} axisLine={false} />
              <Tooltip formatter={(value) => [`${value}°C`, "Temperature"]} />
              <Area type="monotone" dataKey="temperature" stroke="#5b7cfa" fill="url(#temperatureFill)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer> : <div className="chart-empty">Add the backend <code>/api/hourly</code> endpoint to show the hourly chart.</div>}
        </article>

        <aside className="side-column">
          <section className="list-card">
            <div className="section-heading"><div><p className="eyebrow">Saved places</p><h2>Favourites</h2></div><Heart size={19} /></div>
            {favourites.length ? favourites.map((favourite) => <div className="list-row" key={favourite.id}><button onClick={() => searchWeather(favourite.city)}>{favourite.city}</button><button className="delete-button" onClick={() => removeFavourite(favourite.id)} aria-label={`Remove ${favourite.city}`}><Trash2 size={16} /></button></div>) : <p className="list-empty">Tap the heart to save a city.</p>}
          </section>
          <section className="list-card history-card">
            <div className="section-heading"><div><p className="eyebrow">Recently viewed</p><h2>Search history</h2></div><History size={19} /></div>
            {history.length ? history.slice(0, 5).map((item) => <button className="history-row" key={item.id} onClick={() => searchWeather(item.city)}><span>{item.city}</span><small>{item.searchAt ? new Date(item.searchAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" }) : "Recent"}</small></button>) : <p className="list-empty">Your recent searches appear here.</p>}
          </section>
        </aside>
      </section>
    </main>
  );
}
