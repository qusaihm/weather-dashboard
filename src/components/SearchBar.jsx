import { useState } from "react";
function SearchBar({ onSearch }) {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!city.trim()) return;

    onSearch(city);
    setCity("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="d-flex gap-2 justify-content-center mb-4"
    >
      <input
        type="text"
        className="form-control"
        style={{ maxWidth: "300px" }}
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button
        type="submit"
        className="btn btn-primary"
      >
        Search
      </button>
    </form>
  );
}

export default SearchBar;