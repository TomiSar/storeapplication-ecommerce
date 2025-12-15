import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
  return (
    <>
      <footer className="flex justify-center items-center p-4 text-gray-700 dark:text-gray-300">
        Build with
        <FontAwesomeIcon
          className="text-red-600 mx-1 animate-pulse"
          icon={faHeart}
          aria-hidden={true}
        />
        by
        <a
          className="text-primary dark:text-light font-semibold px-1 transition-colors duration-300 hover:text-dark dark:hover:text-lighter"
          href="https://eazybytes.com/"
          target="_blank"
          rel="noreferrer"
        >
          EazyBytes Team
        </a>
      </footer>
    </>
  );
}
