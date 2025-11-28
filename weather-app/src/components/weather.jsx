import { useState } from 'react';
import Forecast from './forecast.jsx';
const apiKey = import.meta.env.VITE_REACT_APP_WEATHER_API_KEY;
const apiUrl = 'https://api.openweathermap.org/data/2.5/';

export default function Weather() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const[isLoading, setIsLoading] = useState(false);
  const fetchWeather = async () => {
    if (!location) return;

    setError(null);
    setWeatherData(null);
    setForecastData(null);
    
    try {
      const url = `${apiUrl}weather?q=${location}&appid=${apiKey}&units=imperial`;
      const response = await fetch(url);
      const data = await response.json();
      
      const forecasturl= `${apiUrl}forecast?q=${location}&appid=${apiKey}`;
      const forecastresponse = await fetch(forecasturl);
      const forecastJson = await forecastresponse.json();
      const dailyData = forecastJson.list.filter((reading) => 
          reading.dt_txt.includes("12:00:00")
      );
      
      if (!response.ok || !forecastresponse.ok) {
        throw new Error('Weather data not found. Please check the location.');
      }
      setWeatherData(data);
      setForecastData(dailyData);
      setLocation(''); 

    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError(err.message); 
    }
  };

  return (
    <div className="weather-container">
      <h2>Location</h2>
      <div className="search-bar">
        <input 
          type="text" 
          id="locationInput"
          placeholder="Enter a city name"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchWeather()}
        />
        <button id="searchButton" onClick={fetchWeather}>
          Search
        </button>
      </div>
      {error && <p className="error-message">{error}</p>}

      {weatherData && (
        <div className="weather-info">
          <h3 id="location">{weatherData.name}</h3>
          <p id="temperature">{Math.round(weatherData.main.temp)}°F</p>
          <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}/>
          <p id="description">{weatherData.weather[0].description}</p>
        </div>
      )}
      {forecastData && <Forecast data={forecastData} />}
    </div>
  );
}