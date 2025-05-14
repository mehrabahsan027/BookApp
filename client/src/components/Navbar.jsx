import React, { useState } from 'react';
import { NavLink } from 'react-router';
import { FaShoppingCart } from 'react-icons/fa';
import { HiMenu, HiX } from 'react-icons/hi';
import { useBooks } from '../context/BookContext';

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/books', label: 'Books' },
  { to: '/membership', label: 'Membership' },
  { to: '/add-book', label: 'Request Book' },
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartNumber } = useBooks();

  return (
    <nav className="bg-white fixed w-full top-0 z-50 py-4 shadow-xs">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <NavLink to="/" className="text-xl font-bold uppercase tracking-wider">
            Book<span className="text-red-700">Bond</span>
          </NavLink>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-sm sm:text-base font-medium transition-colors ${
                    isActive ? 'text-red-700' : 'text-gray-700 hover:text-red-700'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center relative space-x-4">
            {/* Cart Icon */}
            <NavLink
              to="/cart"
              className="bg-red-900 text-white p-2 rounded-full hover:bg-red-800 transition-colors"
            >
              <div className="absolute -top-3 text-xl bg-white text-red-900 font-semibold rounded-full">
                {cartNumber}
              </div>
              <FaShoppingCart className="h-5 w-5 text-yellow-50" />
            </NavLink>

            {/* Mobile Menu Button - Only visible on mobile */}
            <button
              className="md:hidden text-gray-700 hover:text-amber-500 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <HiX className="h-6 w-6" />
              ) : (
                <HiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col space-y-3 pt-4 pb-2">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-sm font-medium py-2 transition-colors text-center ${
                    isActive ? 'text-red-700' : 'text-gray-700 hover:text-red-700'
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                {label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;