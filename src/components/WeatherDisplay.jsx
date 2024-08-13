import { useState, useEffect } from 'react';

function WeatherDisplay({ city }) {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(''); // State to manage errors
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
        throw new Error('City not found.');
      }
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
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
        setWeatherData(data);
        setError('');
      }
    } catch (error) {
      setError(error.message);
      setWeatherData(null);
    }
  };

  useEffect(() => {
    if (city) {
      getWeather(city);
    }
  }, [city]);

  return (
    <div className='weather-data'>
      {error && <p className='error-message'>{error}</p>}{' '}
      {/* Display error message */}
      {weatherData ? (
        <div>
          <h2>Current Weather</h2>
          <p>
            <b>City :</b> {city}
          </p>
          <p>
            <b>Temperature :</b> {Math.round(weatherData.current.temp - 273.15)}
            °C
          </p>
          <p>
            <b>Weather :</b> {weatherData.current.weather[0].description}
          </p>
          <p>
            <b>Time Zone :</b> {weatherData.timezone}
          </p>
        </div>
      ) : (
        !error && <p>Loading weather data...</p>
      )}
    </div>
  );
}

export default WeatherDisplay;
