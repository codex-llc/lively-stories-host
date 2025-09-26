"use client";
import React, { useEffect, useRef } from "react";

const LivelyInfiniteScroll = () => {
  const scrollRef = useRef(null);

  const texts = ["Create!", "Share!", "Inspire!", "Sell", "Buy", "Hier"];

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    // Calculate the width of one complete set of texts
    const scrollWidth = scrollElement.scrollWidth / 2;

    // Create infinite scrolling animation
    let animationId;
    let startTime = null;
    const duration = 30000; // 30 seconds for full cycle

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      
      const progress = (elapsed % duration) / duration;
      const translateX = -scrollWidth * progress;
      
      scrollElement.style.transform = `translateX(${translateX}px)`;
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    // Cleanup function
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, []);

  const getBoxStyle = (text) => {
    if (text.includes("!")) {
      return "bg-gradient-to-r from-slate-800 via-slate-700 to-slate-600 border border-slate-500 text-slate-100 shadow-2xl shadow-slate-900/50 hover:shadow-slate-700/60 hover:border-slate-400";
    } else {
      return "bg-gradient-to-r from-gray-900 via-gray-800 to-black border border-gray-600 text-gray-200 shadow-2xl shadow-black/80 hover:shadow-gray-800/70 hover:border-gray-500";
    }
  };

  const renderTexts = () => {
    // Duplicate the texts array to create seamless infinite scroll
    const duplicatedTexts = [...texts, ...texts];

    return duplicatedTexts.map((text, index) => (
      <div
        key={`${text}-${index}`}
        className={`flex-shrink-0 mx-8 px-8 py-4 rounded-xl font-bold text-2xl transition-all duration-500 cursor-pointer hover:scale-110 hover:rotate-1 backdrop-blur-sm ${getBoxStyle(text)}`}
      >
        <span className="drop-shadow-lg">{text}</span>
      </div>
    ));
  };

  return (
    <div className="w-full bg-black py-16 overflow-hidden relative min-h-[300px]">
      {/* Enhanced dark background pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(71, 85, 105, 0.6) 1px, transparent 0),
            radial-gradient(circle at 30px 30px, rgba(31, 41, 55, 0.4) 1px, transparent 0),
            radial-gradient(circle at 60px 10px, rgba(55, 65, 81, 0.3) 1px, transparent 0)
          `,
          backgroundSize: "50px 50px, 80px 80px, 100px 100px",
        }}
      />

      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-60" />
      
      {/* Decorative dark elements */}
      <div className="absolute top-10 right-20 w-4 h-4 bg-slate-600 rounded-full opacity-40 animate-pulse"></div>
      <div className="absolute top-32 left-16 w-6 h-6 bg-gray-700 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 right-40 w-5 h-5 bg-slate-500 rounded-full opacity-35 animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-10 w-3 h-3 bg-gray-600 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-10 left-1/3 w-4 h-4 bg-slate-700 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1.5s' }}></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Single Infinite Scroll Row */}
        <div className="overflow-hidden">
          <div ref={scrollRef} className="flex items-center whitespace-nowrap">
            {renderTexts()}
          </div>
        </div>

        {/* Optional: Add a subtle glow effect at the bottom */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-slate-600/30 to-transparent rounded-full blur-sm"></div>
      </div>
    </div>
  );
};

export default LivelyInfiniteScroll;