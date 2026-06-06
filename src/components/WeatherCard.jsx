 import Card from "react-bootstrap/Card";

function WeatherCard({ weather }) {
  const iconCode = weather.weather[0].icon;

  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const sunrise = new Date(
    weather.sys.sunrise * 1000
  ).toLocaleTimeString();

  const sunset = new Date(
    weather.sys.sunset * 1000
  ).toLocaleTimeString();

  return (
    <Card
      className="text-center shadow-lg mt-4 mx-auto"
      style={{ maxWidth: "450px" }}
    >
      <Card.Body>
        <Card.Title>
          {weather.name}
        </Card.Title>

        <Card.Subtitle className="mb-3 text-muted">
          {weather.sys.country}
        </Card.Subtitle>

        <img
          src={iconUrl}
          alt={weather.weather[0].description}
        />

        <h1>{Math.round(weather.main.temp)}°C</h1>

        <p className="text-capitalize">
          {weather.weather[0].description}
        </p>

        <hr />

        <p>
          💧 Humidity: {weather.main.humidity}%
        </p>

        <p>
          🌬️ Wind: {weather.wind.speed} m/s
        </p>

        <p>
          🌅 Sunrise: {sunrise}
        </p>

        <p>
          🌇 Sunset: {sunset}
        </p>
      </Card.Body>
    </Card>
  );
}

export default WeatherCard;