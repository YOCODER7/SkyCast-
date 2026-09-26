import { CloudSun, Droplets, Heart, MapPin, Wind } from "lucide-react";

function getEmoji(description = "") { const text = description.toLowerCase(); if (text.includes("thunder")) return "⛈️"; if (text.includes("rain") || text.includes("drizzle")) return "🌧️"; if (text.includes("snow")) return "❄️"; if (text.includes("cloud")) return "☁️"; if (text.includes("mist") || text.includes("fog")) return "🌫️"; return "☀️"; }
function titleCase(value = "") { return value.replace(/\b\w/g, (letter) => letter.toUpperCase()); }

export default function WeatherCard({ weather, onAddFavourite }) {
  if (!weather) return <article className="current-card empty-state">Search for a city to see live weather.</article>;
  return <article className="current-card"><div className="current-header"><div><p className="location"><MapPin size={16} /> {weather.city}</p><p className="date">Current conditions</p></div><button className="icon-button" onClick={onAddFavourite} aria-label="Add city to favourites"><Heart size={21} /></button></div><div className="temperature-row"><span className="weather-emoji">{getEmoji(weather.description)}</span><p className="temperature">{Math.round(weather.temperature)}<sup>°</sup></p><p className="condition">{titleCase(weather.description)}</p></div><div className="metric-grid"><div><Wind size={20} /><span>Wind</span><strong>{weather.windspeed} m/s</strong></div><div><Droplets size={20} /><span>Humidity</span><strong>{weather.humidity}%</strong></div><div><CloudSun size={20} /><span>Temperature</span><strong>{Math.round(weather.temperature)}°</strong></div></div></article>;
}
