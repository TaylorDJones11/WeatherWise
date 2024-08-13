import FavoriteCities from './components/FavoriteCities';
import Logo from './components/Logo';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';

function App() {
  return (
    <>
      <Logo />
      <SearchBar />
      <WeatherDisplay />
      <FavoriteCities />
    </>
  );
}

export default App;
