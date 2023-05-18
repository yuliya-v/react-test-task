import { useEffect, useState } from 'react';
import './Greeting.css';

function Greeting() {
  const [greeting, setGreeting] = useState('');

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
    updateGreeting();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateGreeting();
    }, 1000);
    return () => clearTimeout(timer);
  }, [greeting]);
  return <div className="greeting">{greeting}</div>;
}

export default Greeting;
