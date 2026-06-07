import Card from "react-bootstrap/Card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const buildChartData = (list) =>
  list.slice(0, 8).map((item) => ({
    time: new Date(item.dt * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    temp: Math.round(item.main.temp),
    feels: Math.round(item.main.feels_like),
  }));

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #dee2e6",
        borderRadius: "8px",
        padding: "10px 14px",
        fontSize: "13px",
      }}
    >
      <p className="text-muted mb-1">{label}</p>
      <p className="mb-0 fw-bold text-primary">{payload[0]?.value}°C</p>
      <p className="mb-0 text-secondary" style={{ fontSize: "12px" }}>
        Feels like {payload[1]?.value}°C
      </p>
    </div>
  );
};

function TemperatureChart({ forecast }) {
  const data = buildChartData(forecast.list);

  return (
    <Card className="shadow mt-4 mx-auto" style={{ maxWidth: "450px" }}>
      <Card.Body>
        <Card.Title
          className="text-muted mb-3"
          style={{
            fontSize: "14px",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          }}
        >
          Temperature — Next 24h
        </Card.Title>

        <ResponsiveContainer width="100%" height={180}>
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#0d6efd" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#0d6efd" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="feelsGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%"  stopColor="#20c997" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#20c997" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e9ecef"
              vertical={false}
            />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 11, fill: "#6c757d" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 11, fill: "#6c757d" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${v}°`}
            />
            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="temp"
              stroke="#0d6efd"
              strokeWidth={2.5}
              fill="url(#tempGrad)"
              dot={false}
              activeDot={{ r: 5, fill: "#0d6efd", strokeWidth: 0 }}
            />
            <Area
              type="monotone"
              dataKey="feels"
              stroke="#20c997"
              strokeWidth={1.5}
              strokeDasharray="5 3"
              fill="url(#feelsGrad)"
              dot={false}
              activeDot={{ r: 4, fill: "#20c997", strokeWidth: 0 }}
            />
          </AreaChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="d-flex justify-content-center gap-4 mt-2">
          <span className="d-flex align-items-center gap-1" style={{ fontSize: "12px", color: "#6c757d" }}>
            <span
              style={{
                width: "12px",
                height: "3px",
                background: "#0d6efd",
                borderRadius: "99px",
                display: "inline-block",
              }}
            />
            Temperature
          </span>
          <span className="d-flex align-items-center gap-1" style={{ fontSize: "12px", color: "#6c757d" }}>
            <span
              style={{
                width: "12px",
                height: "3px",
                background: "#20c997",
                borderRadius: "99px",
                display: "inline-block",
              }}
            />
            Feels like
          </span>
        </div>
      </Card.Body>
    </Card>
  );
}

export default TemperatureChart;