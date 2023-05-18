import { useEffect, useState } from 'react';
import './Calendar.css';

function capitalize(value: string): string {
  return value[0].toUpperCase() + value.slice(1);
}

function Calendar() {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const updateCalendar = () => {
    const LOCALE = 'ru-RU';
    const TIME_OPTIONS = { hour12: false };
    const DATE_OPTIONS = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    } as const;

    const currentDate = new Date();
    const time = currentDate.toLocaleTimeString(LOCALE, TIME_OPTIONS);
    const date = currentDate.toLocaleDateString(LOCALE, DATE_OPTIONS);
    setTime(time);
    setDate(capitalize(date));
  };

  useEffect(() => {
    updateCalendar();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateCalendar();
    }, 1000);
    return () => clearTimeout(timer);
  }, [time]);
  return (
    <>
      <div className="date">{date}</div>
      <div className="time">{time}</div>
    </>
  );
}

export default Calendar;
