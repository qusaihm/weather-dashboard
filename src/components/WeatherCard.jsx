import { useMemo } from "react";
import Card from "react-bootstrap/Card";

const formatTime = (unix) =>
  new Date(unix * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

const getGradient = (code) => {
  if (code >= 200 && code < 300) return "linear-gradient(135deg,#4a5568,#2d3748)";
  if (code >= 300 && code < 600) return "linear-gradient(135deg,#667eea,#4a5568)";
  if (code >= 600 && code < 700) return "linear-gradient(135deg,#cbd5e0,#a0aec0)";
  if (code >= 700 && code < 800) return "linear-gradient(135deg,#b8c2cc,#8795a1)";
  if (code === 800)               return "linear-gradient(135deg,#60a5fa,#2563eb)";
  return                                 "linear-gradient(135deg,#93c5fd,#3b82f6)";
};

function StatItem({ icon, label, value }) {
  return (
    <div className="d-flex flex-column align-items-center gap-1 py-3"
      style={{ borderRight: "0.5px solid #dee2e6", borderBottom: "0.5px solid #dee2e6" }}>
      <i className={`ti ${icon}`} style={{ fontSize: "18px", color: "#2563eb" }} aria-hidden="true" />
      <span style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: ".05em", color: "#6c757d" }}>
        {label}
      </span>
      <span style={{ fontSize: "13px", fontWeight: 500, fontFamily: "monospace" }}>
        {value}
      </span>
    </div>
  );
}

function WeatherCard({ weather }) {
  const sunrise = useMemo(() => formatTime(weather.sys.sunrise), [weather.sys.sunrise]);
  const sunset  = useMemo(() => formatTime(weather.sys.sunset),  [weather.sys.sunset]);

  const code     = weather.weather[0].id;
  const iconCode = weather.weather[0].icon;
  const gradient = getGradient(code);

  return (
    <Card className="overflow-hidden h-100" style={{ border: "0.5px solid #dee2e6" }}>

      {/* Hero */}
      <div style={{ background: gradient, padding: "22px 22px 18px", color: "#fff" }}>
        <div className="d-flex justify-content-between align-items-start">
          <div>
            <div style={{ fontSize: "22px", fontWeight: 500 }}>{weather.name}</div>
            <div style={{ fontSize: "13px", opacity: 0.8, marginTop: "3px" }}>
              {weather.sys.country}
            </div>
          </div>
          <img
            src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
            alt={weather.weather[0].description}
            style={{ width: "64px", height: "64px", marginTop: "-8px", marginRight: "-8px" }}
          />
        </div>

        <div className="d-flex align-items-end gap-3 mt-2">
          <span style={{ fontSize: "56px", fontWeight: 300, lineHeight: 1, letterSpacing: "-2px" }}>
            {Math.round(weather.main.temp)}°
          </span>
          <div className="d-flex flex-column gap-1 pb-2" style={{ fontSize: "13px", opacity: 0.85 }}>
            <span>Feels like {Math.round(weather.main.feels_like)}°</span>
            <span>↑ {Math.round(weather.main.temp_max)}°  ↓ {Math.round(weather.main.temp_min)}°</span>
            <span style={{ textTransform: "capitalize", fontWeight: 500 }}>
              {weather.weather[0].description}
            </span>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
      }}>
        <StatItem icon="ti-droplet"  label="Humidity"   value={`${weather.main.humidity}%`} />
        <StatItem icon="ti-wind"     label="Wind"        value={`${weather.wind.speed} m/s`} />
        <StatItem icon="ti-eye"      label="Visibility"  value={`${(weather.visibility / 1000).toFixed(1)} km`} />
        <StatItem icon="ti-gauge"    label="Pressure"    value={`${weather.main.pressure} hPa`} />
        <StatItem icon="ti-sunrise"  label="Sunrise"     value={sunrise} />
        <StatItem icon="ti-sunset"   label="Sunset"      value={sunset} />
      </div>

    </Card>
  );
}

export default WeatherCard;