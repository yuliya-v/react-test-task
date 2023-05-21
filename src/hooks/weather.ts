import { useEffect, useState } from 'react';

const STORAGE_KEY = 'weather-app-location';

const DEFAULT_CITY = 'Минск';

const BASE_LINK = 'https://api.openweathermap.org/data/2.5/weather?';

interface WeatherAPIResponse {
  weather: [{ id: number; description: string }];
  main: {
    temp: number;
  };
  wind: { speed: number };
  name: string;
}

interface WeatherData {
  temp: string;
  description: string;
  icon: number;
  wind: string;
  city: string;
}

export function useWeather() {
  const city = localStorage.getItem(STORAGE_KEY) || DEFAULT_CITY;
  const [weather, setWeather] = useState<WeatherData>();
  const [query, setQuery] = useState(city);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function fetchWeather(query: string) {
    setLoading(true);
    const response = await fetch(
      BASE_LINK +
        new URLSearchParams({
          q: query,
          lang: 'ru',
          appid: '395d1a1348d8dc89c86f8a213cc650ec',
          units: 'metric',
        })
    );
    if (!response.ok) {
      setLoading(false);
      setError('Город не найден');
      setWeather(undefined);
      return;
    }
    const data: WeatherAPIResponse = await response.json();
    setWeather({
      temp: data.main.temp.toFixed(1),
      description: data.weather[0].description,
      icon: data.weather[0].id,
      wind: data.wind.speed.toFixed(1),
      city: data.name,
    });
    setError('');
    setLoading(false);
    localStorage.setItem(STORAGE_KEY, query);
  }

  useEffect(() => {
    fetchWeather(query);
  }, [query]);

  return { weather, error, loading, setQuery };
}
