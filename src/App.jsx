import { useState } from 'react';
import FavoriteCities from './components/FavoriteCities';
import Logo from './components/Logo';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';

function App() {
  const [city, setCity] = useState('');

  function handleSearch(cityName) {
    setCity(cityName);
  }
  return (
    <>
      <Logo />
      <SearchBar onSearch={handleSearch} />
      {city && <WeatherDisplay city={city} />}
      <FavoriteCities />
    </>
  );
}

export default App;
