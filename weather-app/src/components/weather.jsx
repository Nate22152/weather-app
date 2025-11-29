
export default function Weather({data,unit}){
  return (
    <div className="weather-info">
      <h3 id="location">{data.name}</h3>
      <p id="temperature">{Math.round(data.main.temp)}°{unit}</p>
      <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}/>
      <p id="description">{data.weather[0].description}</p>
      <div className="weather-details"></div>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Wind Speed: {data.wind.speed} {unit === 'F' ? 'mph' : 'm/s'}</p>
    </div>
  );
}
