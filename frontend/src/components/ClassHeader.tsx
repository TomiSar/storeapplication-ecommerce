import { faShoppingBasket, faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function ClassHeader() {
  return (
    <header className="header">
      <div className="container">
        <a className="link" href="_">
          <FontAwesomeIcon className="fa-icon" icon={faTags} />
          <span className="brand-title">Eazy Stickers</span>
        </a>
        <nav className="nav">
          <ul>
            <li>
              <a className="nav-link" href="/">
                Home
              </a>
            </li>
            <li>
              <a className="nav-link" href="/about">
                About
              </a>
            </li>
            <li>
              <a className="nav-link" href="/contact">
                Contact
              </a>
            </li>
            <li>
              <a className="nav-link" href="/login">
                Login
              </a>
            </li>
            <li>
              <a className="nav-link" href="/cart">
                <FontAwesomeIcon icon={faShoppingBasket} />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
