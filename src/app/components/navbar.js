"use client";
import React, { useState, useEffect, useRef } from "react";
import { Pacifico } from "next/font/google";
import Image from "next/image";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const GlassmorphismNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef(null);
  const dropdownRef = useRef(null);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Stories", href: "#about" },
    { name: "Aritcles", href: "#academics" },
    { name: "Buy Articles", href: "#activities" },
    { name: "Hier", href: "#admission" },
    
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // GSAP-style animations using CSS transitions and transforms
    if (navRef.current) {
      navRef.current.style.opacity = "0";
      navRef.current.style.transform = "translateY(-20px)";

      // Animate in
      setTimeout(() => {
        if (navRef.current) {
          navRef.current.style.transition =
            "all 0.8s cubic-bezier(0.23, 1, 0.32, 1)";
          navRef.current.style.opacity = "1";
          navRef.current.style.transform = "translateY(0)";
        }
      }, 100);
    }
  }, []);

  useEffect(() => {
    // Animate dropdown
    if (dropdownRef.current) {
      if (isMobileMenuOpen) {
        dropdownRef.current.style.opacity = "0";
        dropdownRef.current.style.transform = "translateY(-10px) scale(0.95)";
        dropdownRef.current.style.display = "block";

        setTimeout(() => {
          if (dropdownRef.current) {
            dropdownRef.current.style.transition =
              "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)";
            dropdownRef.current.style.opacity = "1";
            dropdownRef.current.style.transform = "translateY(0) scale(1)";
          }
        }, 10);
      } else {
        if (dropdownRef.current.style.opacity === "1") {
          dropdownRef.current.style.transition =
            "all 0.3s cubic-bezier(0.23, 1, 0.32, 1)";
          dropdownRef.current.style.opacity = "0";
          dropdownRef.current.style.transform = "translateY(-10px) scale(0.95)";

          setTimeout(() => {
            if (dropdownRef.current) {
              dropdownRef.current.style.display = "none";
            }
          }, 300);
        }
      }
    }
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-100 p-4 mb-10">
      {/* Main Navbar */}
      <nav
        ref={navRef}
        className={`mx-auto max-w-7xl transition-all duration-500 ${
          isScrolled
            ? "bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20"
            : "bg-white/8 backdrop-blur-2xl shadow-xl border border-white/15"
        } rounded-full px-8 py-4`}
        style={{
          background: isScrolled 
            ? 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.08) 100%)'
            : 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.06) 100%)',
          boxShadow: isScrolled
            ? '0 8px 32px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,0.2)'
            : '0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.15)',
        }}
      >
        <div className="flex items-center justify-between">
          {/* Logo/Title - Left Side */}
          <div className="flex-shrink-0 flex items-center space-x-2">
            <img
              src="./custom_assets/logo-no-bg-11.png"
              alt="Vidyasagar Shishu Niketan Logo"
              className="h-12 md:h-14 w-auto drop-shadow-lg"
            />
            <h1 className="text-lg md:text-2xl font-bold text-white drop-shadow-lg tracking-wide">
              <span
                className={`bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-400 bg-clip-text text-transparent ${pacifico.className}`}
              >
                ively
              </span>
            </h1>
          </div>

          {/* Desktop Navigation - Center */}
          <div className="hidden lg:flex items-center justify-center flex-1 px-8">
            <div className="flex items-center space-x-8">
              {navLinks.map((link, index) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative text-white/90 hover:text-yellow-300 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-300/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg px-4 py-2 group"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                  }}
                >
                  {link.name}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-yellow-300 to-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center rounded-full"></span>
                </a>
              ))}
            </div>
          </div>

          {/* Auth Buttons - Right Side */}
          <div className="hidden lg:flex items-center space-x-3">
            <button className="text-white/90 hover:text-yellow-300 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-300/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg px-4 py-2 hover:bg-white/10">
              Login
            </button>
            <button 
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-medium px-6 py-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-300/50 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg hover:shadow-xl transform hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                boxShadow: '0 4px 15px rgba(251, 191, 36, 0.4)',
              }}
            >
              Register
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden flex items-center justify-center w-10 h-10 text-white/90 hover:text-yellow-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-300/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg"
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <div className="relative w-6 h-6">
              <span
                className={`absolute top-0 left-0 w-full h-0.5 bg-current transform transition-all duration-300 ${
                  isMobileMenuOpen
                    ? "rotate-45 translate-y-2.5"
                    : "rotate-0 translate-y-0"
                }`}
              ></span>
              <span
                className={`absolute top-2.5 left-0 w-full h-0.5 bg-current transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : "opacity-100"
                }`}
              ></span>
              <span
                className={`absolute top-5 left-0 w-full h-0.5 bg-current transform transition-all duration-300 ${
                  isMobileMenuOpen
                    ? "-rotate-45 -translate-y-2.5"
                    : "rotate-0 translate-y-0"
                }`}
              ></span>
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Dropdown Menu */}
      <div
        ref={dropdownRef}
        className="lg:hidden mt-4 mx-auto max-w-sm"
        style={{ display: "none" }}
      >
        <div 
          className="backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.1) 100%)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)',
          }}
        >
          <div className="space-y-4">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={handleLinkClick}
                className="block text-white/90 hover:text-yellow-300 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-300/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg px-4 py-3 hover:bg-white/10 group"
                style={{
                  animationDelay: `${index * 0.05}s`,
                }}
              >
                <span className="flex items-center justify-between">
                  {link.name}
                  <span className="w-2 h-2 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110"></span>
                </span>
              </a>
            ))}
            
            {/* Mobile Auth Buttons */}
            <div className="pt-4 border-t border-white/20 space-y-3">
              <button className="w-full text-white/90 hover:text-yellow-300 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-300/50 focus:ring-offset-2 focus:ring-offset-transparent rounded-lg px-4 py-3 hover:bg-white/10 text-left">
                Login
              </button>
              <button 
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-white font-medium px-4 py-3 rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-300/50 focus:ring-offset-2 focus:ring-offset-transparent shadow-lg hover:shadow-xl border-2 border-blue-500 p-2 rounded"
                style={{
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                }}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlassmorphismNavbar;