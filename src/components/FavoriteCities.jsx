import { useState, useEffect } from 'react';

function FavoriteCities() {
  const [weatherData, setWeatherData] = useState([]);
  const cities = [
    'Lagos, Nigeria',
    'Kuala Lumpur, Malaysia',
    'Lisbon, Portugal',
    'New York, USA',
    'Tokyo, Japan',
    'San Diego, California',
    'Bangkok, Thailand',
    'Chicago, Illinois',
    'Dubai, UAE',
    'Istanbul, Turkey',
    'Paris, France',
    'Sydney',
    'Berlin',
    'Cape Town',
  ];

  const apiUrl = import.meta.env.VITE_WEATHER_API_URL;
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  // Randomize the cities
  const getRandomCities = () => {
    const shuffled = cities.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 5);
  };

  const fetchWeatherForCities = async (selectedCities) => {
    try {
      const allWeatherData = await Promise.all(
        selectedCities.map(async (city) => {
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

  const updateWeatherData = () => {
    const selectedCities = getRandomCities();
    fetchWeatherForCities(selectedCities);
  };

  useEffect(() => {
    updateWeatherData();
    const intervalId = setInterval(updateWeatherData, 10000); // Update every 10 seconds
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  return (
    <>
      <h2 className='favorite'>Cities Around the World</h2>
      <div className='favorite-cities'>
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
    </>
  );
}

export default FavoriteCities;
