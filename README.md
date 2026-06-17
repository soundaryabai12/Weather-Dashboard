# Weather Dashboard 🌤️

A responsive React web application that displays real-time weather data for any city using the OpenWeatherMap API. Search history is saved in browser Local Storage so it persists across page refreshes.

---

## Project Overview

Weather Dashboard lets users search for current weather conditions in any city around the world. Results include temperature, weather description, humidity, wind speed, pressure, and visibility. Every searched city is saved locally, and clicking a history item re-fetches its weather instantly.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 (Vite) |
| Styling | Custom CSS (glassmorphism + responsive grid) |
| API | OpenWeatherMap — Current Weather Data |
| Storage | Browser Local Storage |
| Version Control | Git & GitHub |

---

## Setup Instructions

### 1. Clone the repository
```bash
git clone <repository-url>
cd weather-dashboard
```

### 2. Install dependencies
```bash
npm install
```

### 3. Add your OpenWeatherMap API key

Open `src/App.jsx` and replace the placeholder on line 9:

```js
const API_KEY = 'YOUR_API_KEY_HERE'   // ← paste your key here
```

Get a free key at [openweathermap.org/api](https://openweathermap.org/api). The **Current Weather Data** free tier is sufficient.

### 4. Run the development server
```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

### 5. Build for production
```bash
npm run build
```

---

## Features

- **City Search** — Input with validation; shows a clear error for empty input or unknown cities.
- **Live Weather Data** — Fetches from `api.openweathermap.org/data/2.5/weather` with `units=metric`.
- **Weather Details** — Displays temperature, feels-like, humidity, wind speed + direction, pressure, visibility, and min/max temp.
- **Weather Icons** — Emoji icons mapped to OpenWeather condition codes (thunderstorm, rain, snow, clear, clouds, etc.).
- **Search History** — Last 10 unique cities stored in Local Storage; persists across sessions.
- **Remove & Clear** — Individual city removal or "Clear all" for full history reset.
- **Responsive Design** — Two-column layout on desktop, stacked on mobile.
- **Loading States** — Spinner during API requests.
- **Error Handling** — Friendly messages for 404 (city not found), 401 (bad API key), and network failures.

---

## Folder Structure

```
weather-dashboard/
│
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx       # Input + submit, validation, error display
│   │   ├── WeatherCard.jsx     # Displays weather data / loading / error states
│   │   └── SearchHistory.jsx   # History list with select & remove actions
│   │
│   ├── App.jsx                 # Root component; state, API calls, localStorage logic
│   ├── App.css                 # All styles (twilight glass theme, responsive grid)
│   └── main.jsx                # ReactDOM entry point
│
├── index.html
├── vite.config.js
├── package.json
└── README.md
```

---

## API Reference

```
GET https://api.openweathermap.org/data/2.5/weather?q={CITY}&appid={API_KEY}&units=metric
```

Key response fields used:
- `name`, `sys.country` — City and country name
- `main.temp`, `main.feels_like`, `main.temp_min`, `main.temp_max` — Temperature values
- `main.humidity`, `main.pressure` — Humidity and pressure
- `weather[0].id`, `weather[0].description` — Condition code and label
- `wind.speed`, `wind.deg` — Wind speed (m/s) and direction
- `visibility` — Visibility in metres

---

## Local Storage Schema

```js
// Key: "weather_history"
// Value: JSON array of city name strings, most recent first, max 10 items
["Bangalore", "Mysore", "Delhi", "Mumbai"]
```

---

## Assumptions

- An active internet connection is required.
- A valid OpenWeatherMap API key must be configured.
- Search history is stored per browser; it is not shared across devices.
- Temperature is displayed in Celsius (metric units).

---

## AI Tools Used

I used Claude (Anthropic) during development to assist with project architecture, React component structure, API integration, CSS design, and error-handling edge cases. Claude helped generate clean boilerplate, suggested best practices for `useCallback` memoisation, improved accessibility (ARIA labels, semantic HTML), and identified edge cases such as duplicate history entries and wind speed unit conversion. One challenge was ensuring the search history updated correctly when the API returned a canonically different city name (e.g. "bengaluru" → "Bengaluru"); Claude suggested using the API response's `name` field rather than the raw user input. AI assistance sped up development while I reviewed and adapted all generated code to fit the project requirements.
