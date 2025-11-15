{/*Temperature*/}
{/*Humidity Percentage*/}
{/*Wind Speed*/}
{/*Weather description*/}
import { useState } from 'react';


const apiKey = VITE_REACT_APP_WEATHER_API_KEY;
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

export default function Weather() {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = () => {
    if (!location) return;

    setError(null);
    setWeatherData(null); 

    try {
      const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error('Weather data not found. Please check the location.');
      }
      
      const data = await response.json();
      setWeatherData(data); 
      setLocation(''); 

    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError(err.message); 
    }
  };

  
  return (
    <h1>hello world</h1>>
  );
}