import React, { useState, useEffect } from "react";
import {
  Home,
  UserPlus,
  FileText,
  UserCheck,
  Heart,
  Shield,
  Users,
  Star,
  MessageSquareMore,
  Bell,
  ChevronLeft,
  Settings,
  LayoutGrid,
  PartyPopper,
  Menu,
} from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {
  const { user, logOut } = useAuth();
  const [isAdmin] = useAdmin();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle screen resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsDrawerOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    { icon: Home, text: "Home", badge: null, path: "/" },
    { icon: LayoutGrid, text: "Dashboard", badge: null, path: "userdashboard" },
    {
      icon: UserPlus,
      text: "Create/Edit Biodata",
      badge: null,
      path: "editBiodata",
    },
    { icon: FileText, text: "View Biodata", badge: null, path: "viewBiodata" },
    {
      icon: UserCheck,
      text: "My Contact Request",
      badge: null,
      path: "myContactRequest",
    },
    {
      icon: Heart,
      text: "Favourites Biodata",
      badge: null,
      path: "myFavourite",
    },
  ];

  const adminMenuItems = [
    { icon: Home, text: "Home", badge: null, path: "/" },
    {
      icon: Shield,
      text: "Admin Dashboard",
      badge: null,
      path: "adminDashboard",
    },
    { icon: UserCheck, text: "Manage Users", badge: null, path: "mangeUsers" },
    {
      icon: Star,
      text: "Approve Premium",
      badge: null,
      path: "approvePremium",
    },
    {
      icon: MessageSquareMore,
      text: "Approved Contact Request",
      badge: null,
      path: "approvedContactRequest",
    },
    {
      icon: PartyPopper,
      text: "Success Story",
      badge: null,
      path: "success_story",
    },
  ];

  const buttonObj = { icon: Settings, text: "Logout", badge: null };

  const NavItem = ({ item, onClick }) => (
    <Link
      to={item.path}
      className="flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg mb-1 relative group"
      onClick={onClick}
    >
      <item.icon size={20} className="min-w-[20px]" />
      <span className={`ml-4 ${!isDrawerOpen && "hidden lg:hidden"}`}>
        {item.text}
      </span>
      {!isDrawerOpen && (
        <div className="hidden group-hover:block absolute left-full ml-2 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap z-50">
          {item.text}
        </div>
      )}
      {item.badge && isDrawerOpen && (
        <span className="absolute right-4 bg-blue-500 text-white text-xs rounded-full px-2 py-1">
          {item.badge}
        </span>
      )}
    </Link>
  );

  return (
    <div className="flex min-h-screen md:bg-gray-100 md:relative">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
      >
        <Menu size={24} />
      </button>
      {/* Side Navigation */}
      <div
        className={`fixed lg:static h-screen bg-white shadow-lg transition-all duration-300 z-40
          ${isDrawerOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0 lg:w-20"}`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <span
            className={`text-xl font-semibold ${!isDrawerOpen && "hidden"}`}
          ></span>
          <button
            onClick={() => setIsDrawerOpen(!isDrawerOpen)}
            className="p-2 hover:bg-gray-100 rounded-lg lg:block hidden"
          >
            <ChevronLeft
              size={20}
              className={`transform transition-transform ${!isDrawerOpen && "rotate-180"}`}
            />
          </button>
        </div>
        <nav className="p-4 overflow-y-auto h-[calc(100vh-4rem)]">
          {!isAdmin &&
            menuItems.map((item, idx) => (
              <NavItem
                key={idx}
                item={item}
                onClick={() => isMobile && setIsDrawerOpen(false)}
              />
            ))}
          {isAdmin &&
            adminMenuItems.map((item, idx) => (
              <NavItem
                key={idx}
                item={item}
                onClick={() => isMobile && setIsDrawerOpen(false)}
              />
            ))}

          <button
            onClick={logOut}
            className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg mb-1 relative group"
          >
            <buttonObj.icon size={20} className="min-w-[20px]" />
            <span className={`ml-4 ${!isDrawerOpen && "hidden lg:hidden"}`}>
              {buttonObj.text}
            </span>
            {!isDrawerOpen && (
              <div className="hidden group-hover:block absolute left-full ml-2 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap">
                {buttonObj.text}
              </div>
            )}
          </button>
        </nav>
      </div>
      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 
        ${isDrawerOpen ? "lg:ml-0" : "lg:ml-20"}
        ${isMobile ? "ml-0" : ""}`}
      >
        {/* Top Bar */}
        <div className="bg-white shadow-md p-4 flex justify-between items-center">
          <span className="text-xl font-semibold ml-12 lg:ml-0">
            Welcome Back
          </span>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full relative"></button>
            <img
              className="h-8 w-8 bg-gray-300 rounded-full object-cover"
              src={user?.photoURL}
              alt=""
            />
          </div>
        </div>
        {/* Dashboard Content */}
        <main className="p-4 lg:p-6 ">
          <Outlet />
        </main>
      </div>
      {/* Mobile Overlay */}
      {isMobile && (
        <div
          className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity z-30
            ${isDrawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          onClick={() => setIsDrawerOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
