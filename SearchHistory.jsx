export default function SearchHistory({ history, onSelect, onRemove, onClearAll }) {
  return (
    <aside className="glass history-card">
      <div className="history-header">
        <span className="history-title">Recent Searches</span>
        {history.length > 0 && (
          <button
            className="history-clear-btn"
            onClick={onClearAll}
            aria-label="Clear all search history"
          >
            Clear all
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="history-empty">
          <p>Your searched cities will appear here.</p>
        </div>
      ) : (
        <ul className="history-list" role="list">
          {history.map((city) => (
            <li key={city} className="history-item">
              <button
                className="history-item-left"
                onClick={() => onSelect(city)}
                aria-label={`Search weather for ${city}`}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'inherit',
                  font: 'inherit',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  flex: 1,
                  minWidth: 0,
                  textAlign: 'left',
                  padding: 0,
                }}
              >
                <span className="history-dot" aria-hidden="true" />
                <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {city}
                </span>
              </button>
              <button
                className="history-remove-btn"
                onClick={() => onRemove(city)}
                aria-label={`Remove ${city} from history`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  )
}
