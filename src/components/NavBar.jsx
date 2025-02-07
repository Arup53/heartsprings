import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Button from "@mui/material/Button";
import useAdmin from "../hooks/useAdmin";
import { useState } from "react";

function NavBar({ scrollToFooter, scrollToAboutUs }) {
  const { user, logOut } = useAuth();
  const [isAdmin] = useAdmin();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between py-4">
        {/* Left Side: Logo */}
        <div className="text-xl font-bold  flex items-center gap-1">
          <img src="./Logo.png" alt="Logo" className="h-14 w-14" />
          <p className="text-sm">HeartStrings</p>
        </div>

        {/* Middle: Menu Items (Desktop) */}
        <nav className="hidden md:flex md:items-center space-x-8">
          <Link to={"/"} className="text-gray-700 hover:text-amber-600">
            Home
          </Link>
          <Link to={"/biodata"} className="text-gray-700 hover:text-amber-600">
            Biodatas
          </Link>
          <Link
            to={`/dashboard/${isAdmin ? "adminDashboard" : "editBiodata"}`}
            className="text-gray-700 hover:text-amber-600"
          >
            Dashboard
          </Link>
          <button
            onClick={scrollToFooter}
            className="text-gray-700 hover:text-amber-600"
          >
            Contact Us
          </button>
          <button
            onClick={scrollToAboutUs}
            className="text-gray-700 hover:text-amber-600"
          >
            About Us
          </button>
          {user ? (
            <Button onClick={logOut} size="small">
              Logout
            </Button>
          ) : (
            <Link to={"/login"}>Login</Link>
          )}
          {/* Right Side: Circular Image */}
          {user && (
            <div className="flex-shrink-0">
              <img
                src={user?.photoURL}
                alt="Profile"
                className="h-12 w-12 rounded-full border-2 border-amber-600"
              />
            </div>
          )}
        </nav>

        {/* Mobile Menu Toggle Button */}
        <button
          className="md:hidden text-gray-700 focus:outline-none"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
            />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden transition-all duration-300 ${
          menuOpen ? "block" : "hidden"
        }`}
      >
        <div className="space-y-4 px-4 pb-4">
          <Link to={"/"} className="block text-gray-700 hover:text-amber-600">
            Home
          </Link>
          <Link
            to={"/biodata"}
            className="block text-gray-700 hover:text-amber-600"
          >
            Biodatas
          </Link>
          <Link
            to={`/dashboard/${isAdmin ? "adminDashboard" : "editBiodata"}`}
            className="block text-gray-700 hover:text-amber-600"
          >
            Dashboard
          </Link>
          <Link className="block text-gray-700 hover:text-amber-600">
            Contact Us
          </Link>
          {user ? (
            <Button
              onClick={logOut}
              size="small"
              className="w-full text-left text-gray-700"
            >
              Logout
            </Button>
          ) : (
            <Link
              to={"/login"}
              className="block text-gray-700 hover:text-amber-600"
            >
              Login
            </Link>
          )}
          {user && (
            <div className="flex justify-center mt-2">
              <img
                src={user?.photoURL}
                alt="Profile"
                className="h-12 w-12 rounded-full border-2 border-amber-600"
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavBar;
