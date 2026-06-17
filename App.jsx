import { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");

  return (
    <div className="container">
      <h1>Weather Dashboard</h1>

      <input
        type="text"
        placeholder="Enter City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button>Search</button>

      <p>Weather information will appear here.</p>
    </div>
  );
}

export default App;