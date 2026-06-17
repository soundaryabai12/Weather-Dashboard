// Maps OpenWeather condition codes to emojis
function getWeatherEmoji(code) {
  if (code >= 200 && code < 300) return '⛈️'   // Thunderstorm
  if (code >= 300 && code < 400) return '🌦️'   // Drizzle
  if (code >= 500 && code < 600) return '🌧️'   // Rain
  if (code >= 600 && code < 700) return '❄️'    // Snow
  if (code >= 700 && code < 800) return '🌫️'   // Atmosphere (fog, haze…)
  if (code === 800)               return '☀️'    // Clear
  if (code === 801)               return '🌤️'   // Few clouds
  if (code === 802)               return '⛅'    // Scattered clouds
  if (code >= 803)               return '☁️'    // Broken / overcast
  return '🌡️'
}

function getWindDir(deg) {
  const dirs = ['N','NE','E','SE','S','SW','W','NW']
  return dirs[Math.round(deg / 45) % 8]
}

export default function WeatherCard({ data, loading, error }) {
  if (loading) {
    return (
      <div className="glass weather-card">
        <div className="loading-wrap">
          <div className="spinner" role="status" aria-label="Loading weather" />
          <p>Fetching weather data…</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="glass weather-card">
        <div className="weather-empty">
          <span className="weather-empty-icon">❌</span>
          <h2>City not found</h2>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="glass weather-card">
        <div className="weather-empty">
          <span className="weather-empty-icon">🌍</span>
          <h2>No weather data yet</h2>
          <p>Search for a city above to see current conditions.</p>
        </div>
      </div>
    )
  }

  const { name, sys, main, weather, wind } = data
  const emoji = getWeatherEmoji(weather[0].id)
  const windDir = getWindDir(wind.deg ?? 0)

  return (
    <div className="glass weather-card fade-in" role="region" aria-label={`Weather for ${name}`}>
      <p className="weather-location">
        <span aria-hidden="true">📍</span> Current Weather
      </p>
      <h2 className="weather-city">{name}</h2>
      <p className="weather-country">{sys.country}</p>

      <div className="weather-main">
        <span className="weather-icon" aria-hidden="true">{emoji}</span>
        <div>
          <div className="weather-temp">
            {Math.round(main.temp)}<sup>°C</sup>
          </div>
          <div className="weather-condition">{weather[0].description}</div>
        </div>
      </div>

      <div className="weather-divider" />

      <div className="weather-stats">
        <div className="stat-item">
          <span className="stat-label">Feels Like</span>
          <span className="stat-value">
            <span className="stat-icon" aria-hidden="true">🌡️</span>
            {Math.round(main.feels_like)}<span>°C</span>
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Humidity</span>
          <span className="stat-value">
            <span className="stat-icon" aria-hidden="true">💧</span>
            {main.humidity}<span>%</span>
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Wind Speed</span>
          <span className="stat-value">
            <span className="stat-icon" aria-hidden="true">💨</span>
            {Math.round(main.speed ?? wind.speed * 3.6)}<span> km/h {windDir}</span>
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Pressure</span>
          <span className="stat-value">
            <span className="stat-icon" aria-hidden="true">🔵</span>
            {main.pressure}<span> hPa</span>
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Min / Max</span>
          <span className="stat-value" style={{ fontSize: '1rem' }}>
            {Math.round(main.temp_min)}° / {Math.round(main.temp_max)}°<span>C</span>
          </span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Visibility</span>
          <span className="stat-value">
            {data.visibility ? (data.visibility / 1000).toFixed(1) : '—'}<span> km</span>
          </span>
        </div>
      </div>
    </div>
  )
}
