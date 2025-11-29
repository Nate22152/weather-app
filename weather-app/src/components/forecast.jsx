
export default function Forecast({ data= {}, unit}) {
    if (!Array.isArray(data) || data.length === 0) {
    return null; 
    }
  console.log(data);
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
                
                <p className="temp">{Math.round(day.main.temp)}°{unit}</p>
                
                <p className="desc">{day.weather[0].main}</p>
                <p className="desc">High: {Math.round(day.main.temp_max)}°{unit}</p>
                <p className="desc">Low: {Math.round(day.main.temp_min)}°{unit}</p>
              </div>
            ))}
          </div>
        </div>
  );
}