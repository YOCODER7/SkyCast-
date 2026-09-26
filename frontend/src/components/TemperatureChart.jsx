import { useMemo } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function formatHour(timestamp) { return new Intl.DateTimeFormat("en-IN", { hour: "numeric", hour12: true }).format(new Date(timestamp * 1000)); }

export default function TemperatureChart({ forecast }) {
  const chartData = useMemo(() => forecast.map((point) => ({ ...point, label: formatHour(point.timestamp) })), [forecast]);
  return <article className="forecast-card"><div className="section-heading"><div><p className="eyebrow">Next 24 hours</p><h2>Temperature trend</h2></div><span className="live-dot">Live</span></div>{chartData.length ? <ResponsiveContainer width="100%" height={260}><AreaChart data={chartData} margin={{ top: 12, right: 8, left: -22, bottom: 0 }}><defs><linearGradient id="temperatureFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#5b7cfa" stopOpacity={0.42} /><stop offset="100%" stopColor="#5b7cfa" stopOpacity={0} /></linearGradient></defs><CartesianGrid vertical={false} stroke="currentColor" opacity={0.1} /><XAxis dataKey="label" interval="preserveStartEnd" tickLine={false} axisLine={false} /><YAxis unit="°" tickLine={false} axisLine={false} /><Tooltip formatter={(value) => [`${value}°C`, "Temperature"]} /><Area type="monotone" dataKey="temperature" stroke="#5b7cfa" fill="url(#temperatureFill)" strokeWidth={3} /></AreaChart></ResponsiveContainer> : <div className="chart-empty">Add the backend <code>/api/hourly</code> endpoint to show the hourly chart.</div>}</article>;
}
