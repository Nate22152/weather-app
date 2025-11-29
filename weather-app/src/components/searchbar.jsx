import UnitToggle from './unitToggle.jsx';

export default function SearchBar({ 
  location, 
  setLocation, 
  fetchWeather, 
  isLoading, 
  recentSearches = [],
  unit,
  toggleUnit 
}) {
  return (
    <div className="search-container-wrapper">
      <div className="search-bar">
        <input 
          type="text" 
          id="locationInput"
          placeholder="Enter a city name"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
        />
        <button id="searchButton" onClick={fetchWeather} disabled={isLoading}>
          {isLoading ? '...' : 'Search'}
        </button>
        <UnitToggle unit={unit} toggleUnit={toggleUnit} />
      </div>


      {recentSearches.length > 0 && (
        <div className="recent-searches">
          <span className= "recent-text">Recent:</span>
          {recentSearches.map((city, index) => (
            <button 
              key={index} 
              className="history-btn"
              onClick={() => fetchWeather(city)}
            >
              {city}
            </button>
          ))}
        </div>
      )}
      
    </div>
  );
}