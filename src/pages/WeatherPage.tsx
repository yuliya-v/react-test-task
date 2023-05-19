import { useEffect, useState } from 'react';
import './WeatherPage.css';
import '../css/owfont-regular.css';
import Overlay from '../components/Overlay';
import Modal from '../components/Modal';

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
  temp: number;
  description: string;
  icon: number;
  wind: number;
  city: string;
}

function WeatherPage() {
  const city = localStorage.getItem(STORAGE_KEY) || DEFAULT_CITY;
  const [weather, setWeather] = useState<WeatherData>();
  const [query, setQuery] = useState(city);
  const [error, setError] = useState('');
  const [modal, setModal] = useState(false);

  async function fetchWeather(query: string) {
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
      setError('Город не найден');
      setWeather(undefined);
      return;
    }
    const data: WeatherAPIResponse = await response.json();
    setWeather({
      temp: +data.main.temp.toFixed(1),
      description: data.weather[0].description,
      icon: data.weather[0].id,
      wind: +data.wind.speed.toFixed(1),
      city: data.name,
    });
    setError('');
    localStorage.setItem(STORAGE_KEY, query);
  }

  useEffect(() => {
    fetchWeather(query);
  }, [query]);

  return (
    <>
      {modal && (
        <Overlay onClose={() => setModal(false)}>
          <Modal
            onSubmit={(value) => {
              setQuery(value);
              setModal(false);
            }}
          />
        </Overlay>
      )}
      <div className="weather">
        {error && <div className="weather-error">{error}</div>}
        {weather && (
          <>
            <span className="city">{weather.city}</span>
            <span className="temperature">{weather.temp + '°'}</span>
            <span id="weather-icon" className={`owf owf-${weather.icon}`}></span>
            <span className="weather-description">{weather.description}</span>
            <span className="wind">{'Ветер: ' + weather.wind + ' м/с'}</span>
          </>
        )}
        {(weather || error) && (
          <button className="weather-btn" onClick={() => setModal(true)}>
            Изменить город
          </button>
        )}
      </div>
    </>
  );
}

export default WeatherPage;
