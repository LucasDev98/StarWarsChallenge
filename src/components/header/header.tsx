import { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./header.css";
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <>
      <header className="bg-slate-950 text-white shadow-md">
        <nav className="flex justify-between px-2 items-center">
          <Link to="/heroes">
          <img
            className="w-28 invert brightness-0"
            src="/images/star-wars-logo.png"
            alt="Star Wars Logo"
          />
          </Link>
          <button onClick={toggleMenu} className="md:hidden focus:outline-none">
            <FaBars className="w-9 h-9" />
          </button>

          <nav className="hidden md:flex">
            <ul className="hidden sm:flex">
              <li className="hover:text-amber-500 p-2">
                <Link to="/" className="block w-full">
                  INICIO
                </Link>
              </li>
              <li className="hover:text-amber-500 p-2">
                <Link to="/heroes" className="block w-full">
                  HEROES
                </Link>
              </li>
              <li className="hover:text-amber-500 p-2">
                <Link to="/planetas" className="block w-full">
                  PLANETAS
                </Link>
              </li>
            </ul>
          </nav>
        </nav>
        
        {/* START Menú  (Mobile) */}
        <div
          className={` gray-800 overflow-hidden
            transition-all duration-500 ease-in-out  ${
              isMenuOpen
                ? "max-h-32 opacity-100 visible"
                : "max-h-0 opacity-0 invisible"
            }`}
        >
          <nav>
            <ul className="flex flex-col">
              <li className="hover:bg-slate-400 p-2">
                <Link to="/" className="block w-full">
                  INICIO
                </Link>
              </li>
              <li className="hover:bg-slate-400 p-2">
                <Link to="/heroes" className="block w-full">
                  HEROES
                </Link>
              </li>
              <li className="hover:bg-slate-400 p-2">
                <Link to="/planetas" className="block w-full">
                  PLANETAS
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {/* END Menú (Mobile) */}
      </header>
    </>
  );
}
