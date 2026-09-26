import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";
import { MapPin } from "lucide-react";

export default function WeatherMap({ coordinates, city }) {
  const position = coordinates ? [coordinates.lat, coordinates.lon] : null;
  return <article className="map-card"><div className="section-heading"><div><p className="eyebrow">Location</p><h2>Weather map</h2></div><MapPin size={20} /></div>{position ? <MapContainer key={`${position[0]}-${position[1]}`} center={position} zoom={10} scrollWheelZoom={false}><TileLayer attribution="&copy; OpenStreetMap contributors" url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /><CircleMarker center={position} radius={12} pathOptions={{ color: "#fff", fillColor: "#5b7cfa", fillOpacity: 1 }}><Popup>{city}</Popup></CircleMarker></MapContainer> : <div className="map-empty">Search a city to load its map.</div>}</article>;
}
