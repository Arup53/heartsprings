import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import { useRef } from "react";
import AboutUs from "../pages/Home/Home/AboutUs/AboutUs";

function Main() {
  const { pathname } = useLocation();
  const footerRef = useRef(null);
  const aboutUsref = useRef(null);

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToAboutUs = () => {
    aboutUsref.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <NavBar
        scrollToFooter={scrollToFooter}
        scrollToAboutUs={scrollToAboutUs}
      />

      <Outlet />
      {pathname === "/" && <AboutUs ref={aboutUsref} />}
      <Footer ref={footerRef} />
    </div>
  );
}

export default Main;
