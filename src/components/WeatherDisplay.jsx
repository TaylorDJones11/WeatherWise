import { useState, useEffect } from 'react';

function WeatherDisplay() {
  const [weatherData, setWeatherData] = useState(null);
  const apiUrl = import.meta.env.VITE_WEATHER_API_URL;
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const getCoordinates = async (city) => {
    try {
      const res = await fetch(
        `${apiUrl}/geo/1.0/direct?q=${city}&appid=${apiKey}`
      );
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      if (data.length > 0) {
        return data[0];
      } else {
        throw new Error('No data found for the specified city.');
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
    }
  };

  const getWeather = async (city) => {
    try {
      const coordinates = await getCoordinates(city);
      if (coordinates) {
        const { lat, lon } = coordinates;
        const res = await fetch(
          `${apiUrl}/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,daily&appid=${apiKey}`
        );
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
        setWeatherData(data);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    getWeather('London');
  }, []);

  return (
    <div>
      {weatherData ? (
        <div>
          <h2>Current Weather</h2>
          <p>City: London</p>
          <p>Temperature: {Math.round(weatherData.current.temp - 273.15)}°C</p>
          <p>Weather: {weatherData.current.weather[0].description}</p>
          <p>Time Zone: {weatherData.timezone}</p>
        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default WeatherDisplay;
