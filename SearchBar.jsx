import { useState } from 'react'

export default function SearchBar({ onSearch, loading }) {
  const [input, setInput] = useState('')
  const [error, setError]   = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const city = input.trim()
    if (!city) {
      setError('Please enter a city name.')
      return
    }
    setError('')
    onSearch(city)
  }

  return (
    <section className="glass search-section">
      <form className="search-form" onSubmit={handleSubmit} noValidate>
        <div className="search-input-wrap">
          <span className="search-icon" aria-hidden="true">🔍</span>
          <input
            className="search-input"
            type="text"
            placeholder="Search for a city…"
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              if (error) setError('')
            }}
            disabled={loading}
            aria-label="City name"
          />
        </div>
        <button className="search-btn" type="submit" disabled={loading}>
          {loading ? 'Searching…' : 'Search'}
        </button>
      </form>
      {error && (
        <p className="search-error" role="alert">
          <span aria-hidden="true">⚠️</span> {error}
        </p>
      )}
    </section>
  )
}
