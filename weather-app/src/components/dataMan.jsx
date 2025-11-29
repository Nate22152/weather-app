import { useState, useEffect } from 'react';
import Forecast from './forecast.jsx';
import Weather from './weather.jsx';
import SearchBar from './searchbar.jsx';
const apiKey = import.meta.env.VITE_REACT_APP_WEATHER_API_KEY;
const apiUrl = 'https://api.openweathermap.org/data/2.5/';

export default function dataMan() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(null);
  const[isLoading, setIsLoading] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);
  const [unitSystem, setUnitSystem] = useState('imperial');

  useEffect(() => {
    const savedHistory = localStorage.getItem('recentSearches');
    if (savedHistory) {
      setRecentSearches(JSON.parse(savedHistory));
    }
    const savedCity = localStorage.getItem('lastCity');
    if (savedCity) {
      setLocation(savedCity);
      fetchWeather(savedCity);
    }
  }, []);

  const toggleUnit = () => {
    const nextUnit = unitSystem === 'imperial' ? 'metric' : 'imperial';
    setUnitSystem(nextUnit);
    fetchWeather(undefined, nextUnit);
  };

  const fetchWeather = async (cityOverride,unitOverride) => {
    const cityToFetch = typeof cityOverride === 'string' ? cityOverride : location;
    const unitToUse = unitOverride || (unitSystem ? 'imperial' : 'metric');

    if (!cityToFetch) return;


    setIsLoading(true);
    setError(null);
    setWeatherData(null);
    setForecastData(null);
    

    try {
      const url = `${apiUrl}weather?q=${cityToFetch}&appid=${apiKey}&units=${unitToUse}`;
      const response = await fetch(url);
      const data = await response.json();
      
      const forecasturl= `${apiUrl}forecast?q=${cityToFetch}&appid=${apiKey}&units=${unitToUse}`;
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

      addToHistory(data.name);
      localStorage.setItem('lastCity', data.name);
      setLocation(data.name);

    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError(err.message); 
    } finally {
      setIsLoading(false);
    }
  };
  
  const addToHistory = (city) => {
    const newHistory = [city, ...recentSearches.filter(c => c !== city)].slice(0, 5);
    setRecentSearches(newHistory);
    localStorage.setItem('recentSearches', JSON.stringify(newHistory));
  };

  return (
    <div className="weather-container">
      <h2>Location</h2>      
 
      <SearchBar 
        location={location}
        setLocation={setLocation}
        fetchWeather={fetchWeather}
        isLoading={isLoading}
        recentSearches={recentSearches}
        unit={unitSystem}
        toggleUnit={toggleUnit}
      />

      {error && <p className="error-message">{error}</p>}
      
      {isLoading && <div className="loader"></div>}

      {!isLoading && weatherData && (
        <Weather 
          data={weatherData} 
          unit={unitSystem === 'imperial' ? 'F' : 'C'} 
        />
      )}

      {!isLoading && forecastData && (
        <Forecast 
          data={forecastData} 
          unit={unitSystem === 'imperial' ? 'F' : 'C'} 
        />
      )}
    </div>
  );
}