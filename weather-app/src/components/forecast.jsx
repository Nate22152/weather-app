
export default function Forecast({ data= {} }) {
    if (!Array.isArray(data) || data.length === 0) {
    return null; 
  }
  return (
        <div className="forecast-container">
          <h3>5-Day Forecast</h3>
          <div className="forecast-grid">
            {data.map((day, index) => (
              <div key={index} className="forecast-card">

                <p className="date">
                  {new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: 'short' })}
                </p>

                <img 
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} 
                  alt="weather icon"
                />
                
                <p className="temp">{Math.round(day.main.temp)}°F</p>
                
                <p className="desc">{day.weather[0].main}</p>
              </div>
            ))}
          </div>
        </div>
  );
}