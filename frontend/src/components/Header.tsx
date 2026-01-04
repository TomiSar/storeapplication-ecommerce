import { useEffect, useState, useRef, useCallback } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingBasket,
  faTags,
  faSun,
  faMoon,
  faAngleDown,
} from '@fortawesome/free-solid-svg-icons';
import { formatUsername } from '../utils/helpers';
import { useCart } from '../contexts/cartContext';
import { useAuth } from '../contexts/authContext';
import { toast } from 'react-toastify';

export default function Header() {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem('theme') === 'dark' ? 'dark' : 'light',
  );
  const navigate = useNavigate();
  const location = useLocation();
  const { totalQuantity } = useCart();
  const { isAuthenticated, logout, user } = useAuth();

  const isAdmin = true; // Replace with actual admin check logic
  const [isUserMenuOpen, setUserMenuOpen] = useState(false);
  const [isAdminMenuOpen, setAdminMenuOpen] = useState(false);
  const toggleAdminMenu = () => setAdminMenuOpen((prev) => !prev);
  const toggleUserMenu = () => setUserMenuOpen((prev) => !prev);
  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const closeMenus = useCallback(() => {
    setAdminMenuOpen(false);
    setUserMenuOpen(false);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    closeMenus();
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        closeMenus();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
  }, [location.pathname, closeMenus]);

  function toggleTheme() {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  }

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    logout();
    toast.success('Logout successful');
    navigate('/home');
  };

  const navLinkClass =
    'text-center text-lg font-primary font-semibold text-primary py-2 dark:text-light hover:text-dark dark:hover:text-lighter';

  const dropdownLinkClass =
    'block w-full text-left px-4 py-2 text-lg font-primary font-semibold text-primary dark:text-light hover:bg-gray-100 dark:hover:bg-gray-600';

  return (
    <header className="border-b border-gray-300 dark:border-gray-600 sticky top-0 z-20 bg-normalbg dark:bg-darkbg">
      <div className="flex items-center justify-between mx-auto max-w-[1152px] px-6 py-4">
        <Link className={navLinkClass} to="/">
          <FontAwesomeIcon className="h-8 w-8" icon={faTags} />
          <span className="font-bold">Eazy Stickers</span>
        </Link>
        <nav className="flex items-center py-2 z-10">
          <button
            className="flex items-center justify-center mx-3 w-8 h-8 rounded-full border border-primary dark:border-light transition duration-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            <FontAwesomeIcon
              className="w-4 h-4 dark:text-light text-primary"
              icon={theme === 'dark' ? faMoon : faSun}
            />
          </button>
          <ul className="flex space-x-6">
            <li>
              <NavLink
                to="/home"
                className={({ isActive }) =>
                  isActive ? `underline ${navLinkClass}` : navLinkClass
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  isActive ? `underline ${navLinkClass}` : navLinkClass
                }
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive ? `underline ${navLinkClass}` : navLinkClass
                }
              >
                Contact
              </NavLink>
            </li>
            <li>
              {isAuthenticated ? (
                <div className="relative" ref={userMenuRef}>
                  <button className="relative text-primary" onClick={toggleUserMenu}>
                    {user && (
                      <span className={navLinkClass}>
                        Hello {formatUsername(String(user.name))}
                      </span>
                    )}
                    <FontAwesomeIcon
                      icon={faAngleDown}
                      className="text-primary dark:text-light w-6 h-6"
                    />
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 w-48 bg-normalbg dark:bg-darkbg border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-20 transition ease-in-out duration-200">
                      <ul className="py-2">
                        <li>
                          <Link to="/profile" className={dropdownLinkClass}>
                            Profile
                          </Link>
                        </li>
                        <li>
                          <Link to="/orders" className={dropdownLinkClass}>
                            Orders
                          </Link>
                        </li>
                        {isAdmin && (
                          <li>
                            <button
                              className={`${dropdownLinkClass} flex items-center justify-between`}
                              onClick={toggleAdminMenu}
                            >
                              Admin
                              <FontAwesomeIcon icon={faAngleDown} />
                            </button>
                            {isAdminMenuOpen && (
                              <ul className="ml-4 mt-2 space-y-2">
                                <li>
                                  <Link to="/admin/orders" className={dropdownLinkClass}>
                                    Orders
                                  </Link>
                                </li>
                                <li>
                                  <Link to="/admin/messages" className={dropdownLinkClass}>
                                    Messages
                                  </Link>
                                </li>
                              </ul>
                            )}
                          </li>
                        )}
                        <li>
                          <Link
                            className={dropdownLinkClass}
                            to="/home"
                            onClick={(event: React.MouseEvent<HTMLAnchorElement>) =>
                              handleLogout(event)
                            }
                          >
                            Logout
                          </Link>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive ? `underline ${navLinkClass}` : navLinkClass
                  }
                >
                  Login
                </NavLink>
              )}
            </li>
            <li>
              <Link className=" relative text-primary py-2" to="/cart">
                <FontAwesomeIcon
                  className="text-primary dark:text-light w-6"
                  icon={faShoppingBasket}
                />
                <div className="absolute -top-2 -right-6 text-xs bg-yellow-400 text-black font-semibold rounded-full px-2 py-1 leading-none">
                  {totalQuantity}
                </div>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
