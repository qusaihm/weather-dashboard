import { useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherCard from "../components/WeatherCard";
import { getWeather } from "../services/weatherApi";

function Home() {
  const [weather, setWeather] = useState(null);

  const handleSearch = async (city) => {
    try {
      const data = await getWeather(city);
      setWeather(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />

      {weather && (
        <WeatherCard weather={weather} />
      )}
    </div>
  );
}

export default Home;