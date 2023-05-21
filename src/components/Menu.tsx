import { Link } from 'react-router-dom';
import './Menu.css';

interface MenuProps {
  onNavigation: () => void;
}

function Menu({ onNavigation }: MenuProps) {
  return (
    <nav className="nav">
      <ul className="nav-list" onClick={onNavigation}>
        <li className="nav-list-item">
          <Link to="/">Календарь</Link>
        </li>
        <li className="nav-list-item">
          <Link to="weather">Погода</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
