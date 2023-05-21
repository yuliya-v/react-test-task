import { useState } from 'react';
import './WeatherPage.css';
import '../css/owfont-regular.css';
import Overlay from '../components/Overlay';
import Modal from '../components/Modal';
import { capitalize } from '../utils/utils';
import { useWeather } from '../hooks/weather';

function WeatherPage() {
  const { weather, error, loading, setQuery } = useWeather();
  const [modal, setModal] = useState(false);

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
      {!loading && (
        <div className="weather">
          {error && <div className="weather-error">{error}</div>}
          {weather && (
            <>
              <span className="city">{weather.city}</span>
              <span className="temperature">{weather.temp + '°'}</span>
              <span id="weather-icon" className={`owf owf-${weather.icon}`}></span>
              <span className="weather-description">{capitalize(weather.description)}</span>
              <span className="wind">{'Ветер: ' + weather.wind + ' м/с'}</span>
            </>
          )}
          <button className="weather-btn" onClick={() => setModal(true)}>
            Изменить город
          </button>
        </div>
      )}
    </>
  );
}

export default WeatherPage;
