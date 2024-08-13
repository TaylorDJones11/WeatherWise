import { useState, useEffect } from 'react';

function FavoriteCities() {
  const [weatherData, setWeatherData] = useState([]);
  const cities = [
    'Lagos, Nigeria',
    'Kuala Lumpur, Malaysia',
    'Lisbon, Portugal',
    'New York, USA',
    'Tokyo, Japan',
  ];

  const apiUrl = import.meta.env.VITE_WEATHER_API_URL;
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeatherForCities = async () => {
    try {
      const allWeatherData = await Promise.all(
        cities.map(async (city) => {
          const res = await fetch(
            `${apiUrl}/geo/1.0/direct?q=${city}&appid=${apiKey}`
          );
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          const data = await res.json();
          if (data.length > 0) {
            const { lat, lon } = data[0];
            const weatherRes = await fetch(
              `${apiUrl}/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${apiKey}`
            );
            if (!weatherRes.ok) {
              throw new Error(`HTTP error! status: ${weatherRes.status}`);
            }
            const weatherData = await weatherRes.json();
            return { city, weather: weatherData };
          } else {
            throw new Error('City not found.');
          }
        })
      );
      setWeatherData(allWeatherData);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    fetchWeatherForCities();
  }, []);

  return (
    <div className='favorite-cities'>
      <h2 className='favorite'>Cities Around the World</h2>
      {weatherData.map((data, index) => (
        <div key={index} className='city-weather'>
          <h3>{data.city}</h3>
          <div className='fav-temps'>
            <p>
              Temperature: {Math.round(data.weather.current.temp - 273.15)}°C
            </p>
            <p>Weather: {data.weather.current.weather[0].description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FavoriteCities;
