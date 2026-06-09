import { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import ForecastCard from "../components/ForecastCard";
import TemperatureChart from "../components/TemperatureChart";
import {
  getWeather,
  getWeatherByCoords,
  getForecast,
  getForecastByCoords,
} from "../services/weatherApi";

import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import WeatherMap from "../components/WeatherMap";

function Home() {
  const [weather, setWeather]   = useState(null);
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState("");
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  // تطبيق الثيم على document عند كل تغيير
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-bs-theme",
      darkMode ? "dark" : "light"
    );
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const handleSearch = async (city) => {
    try {
      setLoading(true);
      setError("");
      const [weatherData, forecastData] = await Promise.all([
        getWeather(city),
        getForecast(city),
      ]);
      setWeather(weatherData);
      setForecast(forecastData);
    } catch (err) {
      if (err.response?.status === 404)
        setError("City not found. Please check the name and try again.");
      else if (err.response?.status === 401)
        setError("Invalid API key. Check your .env file.");
      else
        setError("Something went wrong. Please try again.");
      setWeather(null);
      setForecast(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          setLoading(true);
          setError("");
          const [weatherData, forecastData] = await Promise.all([
            getWeatherByCoords(position.coords.latitude, position.coords.longitude),
            getForecastByCoords(position.coords.latitude, position.coords.longitude),
          ]);
          setWeather(weatherData);
          setForecast(forecastData);
        } catch (err) {
          if (err.response?.status === 401)
            setError("Invalid API key. Check your .env file.");
          else
            setError("Failed to get weather for your location.");
          setWeather(null);
          setForecast(null);
        } finally {
          setLoading(false);
        }
      },
      () => setError("Location access denied. Please allow location or search manually.")
    );
  };

  return (
    <div style={{ minHeight: "100vh" }}>

      {/* ── Header ── */}
      <header className="bg-body border-bottom sticky-top" style={{ zIndex: 100 }}>
        <div
          className="d-flex align-items-center justify-content-between px-4"
          style={{ height: "58px", maxWidth: "1100px", margin: "0 auto" }}
        >
          <div className="d-flex align-items-center gap-2">
            <i className="ti ti-cloud" style={{ fontSize: "22px", color: "#2563eb" }} aria-hidden="true" />
            <span style={{ fontSize: "16px", fontWeight: 500 }}>WeatherDash</span>
          </div>

          {/* Dark Mode Toggle */}
          <button
            className="btn btn-outline-secondary btn-sm rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "36px", height: "36px" }}
            onClick={() => setDarkMode((d) => !d)}
            aria-label="Toggle dark mode"
          >
            <i
              className={`ti ${darkMode ? "ti-sun" : "ti-moon"}`}
              style={{ fontSize: "16px" }}
              aria-hidden="true"
            />
          </button>
        </div>
      </header>

      {/* ── Hero / Search ── */}
      <div
        className="bg-body border-bottom text-center"
        style={{ padding: "28px 24px 20px" }}
      >
        <p className="text-muted mb-3" style={{ fontSize: "14px" }}>
          Real-time weather at your fingertips
        </p>

        <div className="d-flex gap-2 justify-content-center mb-2">
          <SearchBar onSearch={handleSearch} />
        </div>

        <button
          className="btn btn-outline-secondary btn-sm rounded-pill px-3"
          onClick={handleCurrentLocation}
          disabled={loading}
        >
          <i className="ti ti-map-pin me-1" style={{ fontSize: "14px" }} aria-hidden="true" />
          Use my location
        </button>
      </div>

      {/* ── Content ── */}
      <div
        className="px-3 px-md-4 py-4"
        style={{ maxWidth: "1100px", margin: "0 auto" }}
      >

        {/* Loading */}
        {loading && (
          <div className="text-center py-5">
            <Spinner animation="border" role="status" style={{ color: "#2563eb" }}>
              <span className="visually-hidden">Loading...</span>
            </Spinner>
            <p className="text-muted mt-3" style={{ fontSize: "14px" }}>
              Fetching weather data...
            </p>
          </div>
        )}

        {/* Error */}
        {error && !loading && (
          <Alert variant="danger" className="d-flex align-items-center gap-2">
            <i className="ti ti-alert-triangle" style={{ fontSize: "18px" }} aria-hidden="true" />
            {error}
          </Alert>
        )}

        {/* Results */}
        {weather && !loading && (
          <div className="d-flex flex-column gap-3">

            <div className="row g-3">
              <div className="col-12 col-md-6">
                <WeatherCard weather={weather} />
              </div>
              <div className="col-12 col-md-6">
                {forecast && <TemperatureChart forecast={forecast} />}
              </div>
            </div>

            {forecast && (
              <div className="row">
                <div className="col-12">
                  <ForecastCard forecast={forecast} />
                </div>
              </div>
            )}


            {weather && !loading && (
               <div className="row">
               <div className="col-12">
               <WeatherMap weather={weather} />
               </div>
               </div>
              )}

          </div>
        )}

        {/* Empty state */}
        {!weather && !loading && !error && (
          <div className="text-center py-5">
            <i
              className="ti ti-search"
              style={{ fontSize: "52px", color: "#dee2e6" }}
              aria-hidden="true"
            />
            <p className="mt-3 fw-medium text-secondary">Search for a city</p>
            <p className="text-muted" style={{ fontSize: "14px" }}>
              Enter a city name or use your current location
            </p>
          </div>
        )}

      </div>
    </div>
  );
}

export default Home;