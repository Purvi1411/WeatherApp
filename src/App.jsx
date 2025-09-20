import { useState, useEffect } from 'react';

const App = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Function to fetch weather data from the API
  const fetchWeatherData = async (cityName) => {
    setLoading(true);
    setError('');
    setWeatherData(null);

    // FIX: Replaced import.meta.env with a placeholder.
    // Please paste your API key here between the quotes.
    const apiKey = 'd8a511ce50ba69cd114c1fb25d732e5c';

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('City not found. Please try again.');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (city) {
      fetchWeatherData(city);
    }
  };

  // Effect to fetch initial weather data for a default city (e.g., London)
  useEffect(() => {
    fetchWeatherData('London');
  }, []);

  // Function to get the appropriate icon based on weather condition using inline SVGs
  const getWeatherIcon = (condition) => {
    let iconPath;
    let iconColor;
    let viewBox = "0 0 24 24";

    switch (condition) {
      case 'Clear':
        iconPath = "M12 1.5A10.5 10.5 0 1012 22.5 10.5 10.5 0 0012 1.5zM12 3a9 9 0 110 18 9 9 0 010-18zM12 5a7 7 0 100 14 7 7 0 000-14z";
        iconColor = "text-yellow-400";
        break;
      case 'Clouds':
        iconPath = "M18.5 12c.386 0 .753.036 1.111.107A5.968 5.968 0 0122 17.5 6.5 6.5 0 0115.5 24H7.5A7.5 7.5 0 010 16.5 7.5 7.5 0 017.5 9h11z";
        iconColor = "text-gray-400";
        break;
      case 'Rain':
        iconPath = "M21 16.5c-1.49-.6-2.65-1.74-3.32-3.14-.38-.79-.58-1.63-.58-2.58A6.5 6.5 0 0010.5 4a6.5 6.5 0 00-6.26 4.67C2.98 9.38 2.08 10.53 1.5 12A6.5 6.5 0 008 18.5a6.5 6.5 0 0013-0zM12 22v2m-4-2v2m8-2v2";
        iconColor = "text-blue-400";
        break;
      case 'Snow':
        iconPath = "M12 2a10 10 0 100 20 10 10 0 000-20zM12 4a8 8 0 010 16 8 8 0 010-16zM12 6a6 6 0 100 12 6 6 0 000-12zM12 8a4 4 0 100 8 4 4 0 000-8z";
        iconColor = "text-white";
        break;
      case 'Thunderstorm':
        iconPath = "M15.5 20.5l-3.5 2.5v-3h-1.5l3.5-2.5v3h1.5zM22 15a5.5 5.5 0 00-5.46-4.59C15.93 7.82 13.06 6 10 6a7 7 0 00-7 7c-1.12 0-2.09.43-2.85 1.15a.5.5 0 00-.09.68l.09.13A4 4 0 002.5 17c.56 0 1.09-.13 1.57-.37A4.5 4.5 0 008 20.5a5.5 5.5 0 005.5-5.5V14h-1l.5-1.5h1.5v-1h-2.5l-1.5-3.5H11l1-3c.8-.82 2.15-1.5 3.5-1.5 1.83 0 3.39.75 4.5 1.76a.5.5 0 00.75-.63L21.5 9A6.5 6.5 0 0022 15z";
        iconColor = "text-gray-600";
        break;
      case 'Mist':
      case 'Haze':
      case 'Smoke':
        iconPath = "M20 10a1 1 0 00-1-1h-2a1 1 0 00-1 1v1a1 1 0 001 1h2a1 1 0 001-1zM10 16a1 1 0 00-1-1H7a1 1 0 00-1 1v1a1 1 0 001 1h2a1 1 0 001-1zM4 10a1 1 0 00-1-1H1a1 1 0 00-1 1v1a1 1 0 001 1h2a1 1 0 001-1zM14 4a1 1 0 00-1-1h-2a1 1 0 00-1 1v1a1 1 0 001 1h2a1 1 0 001-1z";
        iconColor = "text-gray-400";
        break;
      case 'Wind':
        iconPath = "M12 2a10 10 0 100 20 10 10 0 000-20zM12 4a8 8 0 010 16 8 8 0 010-16zM12 6a6 6 0 100 12 6 6 0 000-12z";
        iconColor = "text-blue-300";
        break;
      default:
        return null;
    }
    return (
      <svg width="100" height="100" viewBox={viewBox} fill="currentColor" className={iconColor}>
        <path d={iconPath} />
      </svg>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-4">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-6 text-indigo-400">Weather App</h1>
        
        {/* Search Form */}
        <form onSubmit={handleSubmit} className="mb-6 flex">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name..."
            className="flex-grow p-3 rounded-l-xl bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-r-xl transition duration-300 ease-in-out"
          >
            Search
          </button>
        </form>

        {/* Loading and Error States */}
        {loading && <p className="text-center text-indigo-300 animate-pulse">Loading weather data...</p>}
        {error && <p className="text-center text-red-400">{error}</p>}

        {/* Weather Display */}
        {weatherData && (
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-semibold">{weatherData.name}, {weatherData.sys.country}</h2>
            <div className="flex items-center justify-center">
              {getWeatherIcon(weatherData.weather[0].main)}
            </div>
            <p className="text-6xl font-extrabold text-indigo-300">{Math.round(weatherData.main.temp)}°C</p>
            <p className="text-xl font-light capitalize">{weatherData.weather[0].description}</p>
            <div className="grid grid-cols-2 gap-4 text-left mt-6">
              <div className="p-4 bg-gray-700 rounded-xl shadow-lg">
                <p className="text-sm text-gray-400">Feels Like</p>
                <p className="text-lg font-medium">{Math.round(weatherData.main.feels_like)}°C</p>
              </div>
              <div className="p-4 bg-gray-700 rounded-xl shadow-lg">
                <p className="text-sm text-gray-400">Humidity</p>
                <p className="text-lg font-medium">{weatherData.main.humidity}%</p>
              </div>
              <div className="p-4 bg-gray-700 rounded-xl shadow-lg">
                <p className="text-sm text-gray-400">Wind Speed</p>
                <p className="text-lg font-medium">{weatherData.wind.speed} m/s</p>
              </div>
              <div className="p-4 bg-gray-700 rounded-xl shadow-lg">
                <p className="text-sm text-gray-400">Pressure</p>
                <p className="text-lg font-medium">{weatherData.main.pressure} hPa</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;

