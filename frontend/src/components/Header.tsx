import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faShoppingBasket,
  faTags,
  faSun,
  faMoon,
} from '@fortawesome/free-solid-svg-icons';

export default function Header() {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem('theme') === 'dark' ? 'dark' : 'light'
  );

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  function toggleTheme() {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newTheme);
      return newTheme;
    });
  }

  const navLinkClass =
    'text-center text-lg font-primary font-semibold text-primary py-2 dark:text-light hover:text-dark dark:hover:text-lighter';
  return (
    <header className='border-b border-gray-300 dark:border-gray-600 sticky top-0 z-20 bg-normalbg dark:bg-darkbg'>
      <div className='flex items-center justify-between mx-auto max-w-[1152px] px-6 py-4'>
        <a className={navLinkClass} href='/'>
          <FontAwesomeIcon className='h-8 w-8' icon={faTags} />
          <span className='font-bold'>Eazy Stickers</span>
        </a>
        <nav className='flex items-center py-2 z-10'>
          <button
            className='flex items-center justify-center mx-3 w-8 h-8 rounded-full border border-primary dark:border-light transition duration-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            aria-label='Toggle theme'
            onClick={toggleTheme}
          >
            <FontAwesomeIcon
              className='w-4 h-4 dark:text-light text-primary'
              icon={theme === 'dark' ? faMoon : faSun}
            />
          </button>
          <ul className='flex space-x-6'>
            <li>
              <a className={navLinkClass} href='/'>
                Home
              </a>
            </li>
            <li>
              <a className={navLinkClass} href='/about'>
                About
              </a>
            </li>
            <li>
              <a className={navLinkClass} href='/contact'>
                Contact
              </a>
            </li>
            <li>
              <a className={navLinkClass} href='/login'>
                Login
              </a>
            </li>
            <li>
              <a href='/cart' className='text-primary py-2'>
                <FontAwesomeIcon
                  className='dark:text-light'
                  icon={faShoppingBasket}
                />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
