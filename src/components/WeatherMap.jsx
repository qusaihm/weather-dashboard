import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

function WeatherMap({ weather }) {
  const lat = weather.coord.lat;
  const lon = weather.coord.lon;
  const cityName = weather.name;
  const country = weather.sys.country;
  const temp = Math.round(weather.main.temp);
  const description = weather.weather[0].description;
  const iconCode = weather.weather[0].icon;

  return (
    <div
      className="card"
      style={{ border: "0.5px solid #dee2e6", borderRadius: "12px", overflow: "hidden" }}
    >
      {/* Card Header */}
      <div className="card-body py-2 px-3 border-bottom d-flex align-items-center gap-2">
        <i className="ti ti-map" style={{ fontSize: "16px", color: "#2563eb" }} aria-hidden="true" />
        <span style={{ fontSize: "11px", fontWeight: 500, textTransform: "uppercase", letterSpacing: ".07em", color: "#6c757d" }}>
          Location
        </span>
      </div>

      {/* Map */}
      <MapContainer
        center={[lat, lon]}
        zoom={10}
        style={{ height: "280px", width: "100%", zIndex: 0 }}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lon]}>
          <Popup>
            <div style={{ textAlign: "center", minWidth: "120px" }}>
              <img
                src={`https://openweathermap.org/img/wn/${iconCode}@2x.png`}
                alt={description}
                style={{ width: "48px", height: "48px" }}
              />
              <p style={{ margin: "0", fontWeight: 600, fontSize: "15px" }}>
                {cityName}, {country}
              </p>
              <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#6c757d", textTransform: "capitalize" }}>
                {description}
              </p>
              <p style={{ margin: "4px 0 0", fontSize: "20px", fontWeight: 300 }}>
                {temp}°C
              </p>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default WeatherMap;