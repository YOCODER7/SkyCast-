import { Droplets, Thermometer, Wind } from "lucide-react";

export default function WeatherDetails({ weather }) {
  return (
    <section className="weather-details-section">
      <div className="section-heading">
        <div><p className="eyebrow">At a glance</p><h2>Weather details</h2></div>
        <Thermometer size={20} />
      </div>
      {weather ? (
        <div className="detail-card-grid">
          <article className="detail-card"><span className="detail-icon"><Thermometer size={24} /></span><p>Temperature</p><strong>{Math.round(weather.temperature)}°C</strong><small>How warm or cool the air is right now.</small></article>
          <article className="detail-card"><span className="detail-icon"><Wind size={24} /></span><p>Wind speed</p><strong>{weather.windspeed} m/s</strong><small>How fast the air is moving around you.</small></article>
          <article className="detail-card"><span className="detail-icon"><Droplets size={24} /></span><p>Humidity</p><strong>{weather.humidity}%</strong><small>The amount of moisture present in the air.</small></article>
        </div>
      ) : <div className="details-empty">Search for a city to see details.</div>}
    </section>
  );
}
