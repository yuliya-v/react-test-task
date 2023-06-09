import { Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './pages/MainPage';
import NotFoundPage from './pages/NotFoundPage';
import Header from './components/Header';
import Footer from './components/Footer';
import WeatherPage from './pages/WeatherPage';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="wrapper">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
