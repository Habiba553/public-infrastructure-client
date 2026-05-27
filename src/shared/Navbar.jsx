import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

import {
  FaBars,
  FaTimes,
  FaCrown,
  FaSun, 
  FaMoon    
} from "react-icons/fa";

import useAuth from "../hooks/useAuth";
import usePremium from "../hooks/usePremium";

const Navbar = () => {
  const {
    user,
    logoutUser
  } = useAuth();

  const premium = usePremium();

  const [openProfile, setOpenProfile] = useState(false);
  const [openMenu, setOpenMenu] = useState(false); // Mobile menu state
  
  
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      theme
    );
  
    localStorage.setItem("theme", theme);
  
  }, [theme]);

  const handleLogout = () => {
    logoutUser()
      .then(() => {})
      .catch(() => {});
  };

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to='/'
          onClick={() => setOpenMenu(false)}
          className={({ isActive }) =>
            isActive
              ? "text-[#7C3AED]"
              : "hover:text-[#7C3AED] transition-all duration-300"
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to='/all-issues'
          onClick={() => setOpenMenu(false)}
          className={({ isActive }) =>
            isActive
              ? "text-[#7C3AED]"
              : "hover:text-[#7C3AED] transition-all duration-300"
          }
        >
          All Issues
        </NavLink>
      </li>

      <li>
        <NavLink
          to='/about'
          onClick={() => setOpenMenu(false)}
          className={({ isActive }) =>
            isActive
              ? "text-[#7C3AED]"
              : "hover:text-[#7C3AED] transition-all duration-300"
          }
        >
          About
        </NavLink>
      </li>

      <li>
        <NavLink
          to='/contact'
          onClick={() => setOpenMenu(false)}
          className={({ isActive }) =>
            isActive
              ? "text-[#7C3AED]"
              : "hover:text-[#7C3AED] transition-all duration-300"
          }
        >
          Contact
        </NavLink>
      </li>
    </>
  );

  return (
    
    <div className="shadow-md sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">
        <div className="flex items-center justify-between gap-4">
          
          {/* LEFT: HAMBURGER & LOGO */}
          <div className="flex items-center gap-3">
            {/* Mobile Hamburger Button */}
            <button 
              onClick={() => setOpenMenu(!openMenu)}
              className="lg:hidden text-xl focus:outline-none"
            >
              {openMenu ? <FaTimes /> : <FaBars />}
            </button>

            {/* LOGO */}
            <Link
              to='/'
              className="flex items-center gap-2 flex-shrink-0"
            >
              <div className="w-10 h-10 rounded-xl bg-[#7C3AED] flex items-center justify-center text-white font-bold text-xl">
                I
              </div>

              <h1 className="text-xl md:text-3xl font-extrabold whitespace-nowrap">
                <span className="text-[#7C3AED]">
                  Infra
                </span>
                {/* FIXED: Removed color overrides so text correctly aligns to theme colors */}
                <span className="transition-colors duration-300">
                  Reporter
                </span>
              </h1>
            </Link>
          </div>

          {/* DESKTOP MENU */}
          <ul className="hidden lg:flex items-center gap-7 text-[17px] font-semibold whitespace-nowrap">
            {navLinks}
          </ul>

          {/* RIGHT SIDE (THEME TOGGLE & USER) */}
          <div className="flex items-center gap-3 md:gap-5 flex-shrink-0">
            
            {/* DARK/LIGHT THEME TOGGLE BUTTON */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="p-2.5 md:p-3 bg-opacity-20 bg-gray-500 hover:bg-opacity-30 rounded-full transition-all duration-300 focus:outline-none flex items-center justify-center"
            >
              {/* Conditional Icon Rendering matches global data-theme status */}
              {theme === "dark" ? (
                <FaSun className="text-base md:text-lg text-amber-500" />
              ) : (
                <FaMoon className="text-base md:text-lg text-slate-700" />
              )}
            </button>

            {/* USER */}
            {
              user ? (
                <div className="relative">
                  {/* PROFILE IMAGE */}
                  <div className="relative">
                    <img
                      onClick={() => setOpenProfile(!openProfile)}
                      src={
                        user.photoURL ||
                        "https://i.ibb.co/4pDNDk1/avatar.png"
                      }
                      alt=""
                      className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-2 cursor-pointer object-cover ${
                        premium ? "border-amber-500" : "border-[#7C3AED]"
                      }`}
                    />
                    {/* Tiny premium indicator on the outer avatar ring */}
                    {premium && (
                      <span className="absolute -top-1 -right-1 bg-amber-500 text-white text-[9px] p-0.5 rounded-full">
                        <FaCrown />
                      </span>
                    )}
                  </div>

                  {/* DROPDOWN */}
                  {
                    openProfile && (
                      <div className="absolute right-0 top-14 md:top-16 w-[280px] bg-base-100 rounded-3xl shadow-2xl p-6 z-50 border border-base-200 transition-all duration-300">
                        {/* TOP */}
                        <div className="flex flex-col items-center border-b border-base-200 pb-5">
                          <img
                            src={
                              user.photoURL ||
                              "https://i.ibb.co/4pDNDk1/avatar.png"
                            }
                            alt=""
                            className={`w-24 h-24 rounded-full border-4 object-cover ${
                              premium ? "border-amber-500" : "border-[#7C3AED]"
                            }`}
                          />

                          <h2 className="text-2xl font-bold mt-4 text-center flex items-center gap-1.5 justify-center">
                            {user.displayName}
                          </h2>

                          <p className="opacity-70 text-sm mt-1 break-all text-center">
                            {user.email}
                          </p>

                          {/* PREMIUM BADGE */}
                          {
                            premium && (
                              <div className="mt-3 inline-flex items-center gap-1 bg-gradient-to-r from-amber-500 to-yellow-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm select-none">
                                <FaCrown className="text-sm" />
                                <span>Premium Member</span>
                              </div>
                            )
                          }
                        </div>

                        {/* MENU */}
                        <div className="mt-5 flex flex-col gap-3">
                          <Link
                            to='/dashboard'
                            onClick={() => setOpenProfile(false)}
                            className="hover:bg-base-200 px-4 py-3 rounded-xl transition-all duration-300 font-medium text-center"
                          >
                            Dashboard
                          </Link>

                          <button
                            onClick={handleLogout}
                            className="bg-[#7C3AED] hover:bg-[#6D28D9] transition-all duration-300 text-white font-bold py-3 rounded-xl"
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    )
                  }
                </div>
              ) : (
                <Link
                  to='/login'
                  className="bg-[#7C3AED] hover:bg-[#6D28D9] transition-all duration-300 text-white font-bold px-4 md:px-8 py-2 md:py-3 rounded-xl text-xs md:text-base whitespace-nowrap"
                >
                  LOGIN
                </Link>
              )
            }
          </div>
        </div>

        {/* MOBILE MENU DROPDOWN */}
        {openMenu && (
          <div className="lg:hidden mt-4 pt-4 border-t border-base-200 transition-all duration-300">
            <ul className="flex flex-col gap-4 text-base font-semibold pl-2">
              {navLinks}
            </ul>
          </div>
        )}

      </div>
    </div>
  );
};

export default Navbar;