import { Link } from 'react-router-dom';
import './Header.css';
import { useState } from 'react';
import Menu from './Menu';
import Overlay from './Overlay';

function Header() {
  const [menu, setMenu] = useState(false);

  return (
    <div className="header-container">
      <header className="header wrapper">
        <button className="menu-btn" onClick={() => setMenu(true)}></button>
        {menu && (
          <Overlay onClose={() => setMenu(false)}>
            <Menu onNavigation={() => setMenu(false)} />
          </Overlay>
        )}
        <Link to="/">
          <div className="logo">WeatherApp</div>
        </Link>
      </header>
    </div>
  );
}

export default Header;
