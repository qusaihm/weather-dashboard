import Card from "react-bootstrap/Card";

const getDailyForecasts = (list) => {
  const byDay = {};

  list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!byDay[date]) {
      byDay[date] = {
        date,
        icon: item.weather[0].icon,
        description: item.weather[0].main,
        temps: [],
      };
    }
    byDay[date].temps.push(item.main.temp);
  });

  const today = new Date().toISOString().split("T")[0];

  return Object.values(byDay)
    .filter((day) => day.date !== today)
    .slice(0, 5)
    .map((day) => ({
      ...day,
      tempMax: Math.round(Math.max(...day.temps)),
      tempMin: Math.round(Math.min(...day.temps)),
    }));
};

const getDayName = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US", { weekday: "short" });

const getTablerIcon = (iconCode) => {
  if (iconCode.startsWith("01")) return "ti-sun";
  if (iconCode.startsWith("02")) return "ti-cloud-sun";
  if (iconCode.startsWith("03") || iconCode.startsWith("04")) return "ti-cloud";
  if (iconCode.startsWith("09") || iconCode.startsWith("10")) return "ti-cloud-rain";
  if (iconCode.startsWith("11")) return "ti-storm";
  if (iconCode.startsWith("13")) return "ti-snowflake";
  if (iconCode.startsWith("50")) return "ti-mist";
  return "ti-cloud";
};

function ForecastCard({ forecast }) {
  const days = getDailyForecasts(forecast.list);

  return (
    <Card style={{ border: "0.5px solid #dee2e6" }}>
      <Card.Body className="px-4 py-3">
        <p style={{
          fontSize: "11px",
          fontWeight: 500,
          textTransform: "uppercase",
          letterSpacing: ".07em",
          color: "#6c757d",
          marginBottom: "14px",
        }}>
          5-Day Forecast
        </p>

        <div className="d-flex justify-content-between">
          {days.map((day) => (
            <div key={day.date} className="d-flex flex-column align-items-center gap-1 flex-fill">
              <span style={{
                fontSize: "11px",
                fontWeight: 500,
                textTransform: "uppercase",
                letterSpacing: ".04em",
                color: "#6c757d",
              }}>
                {getDayName(day.date)}
              </span>

              <i
                className={`ti ${getTablerIcon(day.icon)}`}
                style={{ fontSize: "26px", color: "#2563eb" }}
                aria-hidden="true"
              />

              <span style={{ fontSize: "13px", color: "#6c757d" }}>
                {day.description}
              </span>

              {/* أعلى درجة — نهار */}
              <span style={{ fontSize: "15px", fontWeight: 500, fontFamily: "monospace" }}>
                {day.tempMax}°
              </span>

              {/* أدنى درجة — ليل */}
              <span style={{ fontSize: "12px", color: "#6c757d", fontFamily: "monospace" }}>
                {day.tempMin}°
              </span>
            </div>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
}

export default ForecastCard;