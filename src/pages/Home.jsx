 import { useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import { getWeather } from "../services/weatherApi";

import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

function Home() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (city) => {
    try {
      setLoading(true);
      setError("");

      const data = await getWeather(city);

      setWeather(data);
    } catch (error) {
      setError("City not found");
      setWeather(null);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="mb-4">
        Weather Dashboard
      </h1>

      <SearchBar onSearch={handleSearch} />

      {loading && (
        <div className="mt-4">
          <Spinner
            animation="border"
            role="status"
          >
            <span className="visually-hidden">
              Loading...
            </span>
          </Spinner>
        </div>
      )}

      {error && (
        <Alert
          variant="danger"
          className="mt-3"
        >
          {error}
        </Alert>
      )}

      {weather && !loading && (
        <WeatherCard weather={weather} />
      )}
    </div>
  );
}

export default Home;