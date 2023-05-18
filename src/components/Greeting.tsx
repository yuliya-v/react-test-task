import { useEffect, useState } from 'react';

function Greeting() {
  const [greeting, setGreeting] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const updateTime = () => {
    const LOCALE = 'ru-RU';
    const TIME_OPTIONS = { hour12: false };
    const DATE_OPTIONS = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    } as const;

    const currentDate = new Date();
    setTime(currentDate.toLocaleTimeString(LOCALE, TIME_OPTIONS));
    setDate(currentDate.toLocaleDateString(LOCALE, DATE_OPTIONS));
  };

  const updateGreeting = () => {
    enum GREETINGS {
      'Доброй ночи',
      'Доброе утро',
      'Добрый день',
      'Добрый вечер',
    }

    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const timeOfTheDay = GREETINGS[Math.floor(currentHour / 6)];
    setGreeting(timeOfTheDay + '!');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      updateTime();
      updateGreeting();
    }, 1000);
    return () => clearTimeout(timer);
  }, [time]);
  return (
    <div className="greeting">
      {time}
      {date}
      {greeting}
    </div>
  );
}

export default Greeting;
