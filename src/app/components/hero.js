"use client"
import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { Sparkles, BookOpen, Star, Palette, PenTool, Rocket, Library } from 'lucide-react';
import { Pacifico } from "next/font/google";

const pacifico = Pacifico({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const TypeWriter = ({ text, delay = 0, speed = 0 }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentIndex < text.length) {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }
    }, delay + (currentIndex * speed));

    return () => clearTimeout(timer);
  }, [currentIndex, text, delay, speed]);

  return (
    <span>
      {displayText}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
        className="ml-1"
      >
        
      </motion.span>
    </span>
  );
};

const FloatingElement = ({ children, delay = 0, duration = 4, ...props }) => {
  const shouldReduceMotion = useReducedMotion();
  
  return (
    <motion.div
      animate={shouldReduceMotion ? {} : {
        y: [-10, 10, -10],
        rotate: [-2, 2, -2],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};

// Enhanced breathing circles with mobile optimization
const BreathingCircle = ({ size, colors, position, delay = 0 }) => {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Reduce complexity on mobile
  const mobileSize = isMobile ? `${parseInt(size) * 0.6}px` : size;
  const animationProps = shouldReduceMotion || isMobile ? {} : {
    scale: [0.8, 1.4, 0.8],
    opacity: [0.4, 0.8, 0.4],
  };

  return (
    <div className={`absolute ${position}`}>
      {/* Main breathing circle */}
      <motion.div
        className="rounded-full absolute will-change-transform"
        style={{
          width: mobileSize,
          height: mobileSize,
          background: `radial-gradient(circle, ${colors.primary}60, ${colors.secondary}40, ${colors.accent}20, transparent)`,
          filter: isMobile ? 'blur(20px)' : 'blur(40px)',
          transform: 'translateZ(0)', // Force hardware acceleration
        }}
        animate={animationProps}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
      />
      {/* Reduce inner effects on mobile */}
      {!isMobile && (
        <>
          <motion.div
            className="rounded-full absolute will-change-transform"
            style={{
              width: `${parseInt(mobileSize) * 0.6}px`,
              height: `${parseInt(mobileSize) * 0.6}px`,
              left: '20%',
              top: '20%',
              background: `radial-gradient(circle, ${colors.primary}80, ${colors.secondary}60, transparent)`,
              filter: 'blur(20px)',
              transform: 'translateZ(0)',
            }}
            animate={shouldReduceMotion ? {} : {
              scale: [1.2, 0.8, 1.2],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay + 0.5,
            }}
          />
          <motion.div
            className="rounded-full absolute will-change-transform"
            style={{
              width: `${parseInt(mobileSize) * 0.3}px`,
              height: `${parseInt(mobileSize) * 0.3}px`,
              left: '35%',
              top: '35%',
              background: `radial-gradient(circle, ${colors.primary}90, transparent)`,
              filter: 'blur(10px)',
              transform: 'translateZ(0)',
            }}
            animate={shouldReduceMotion ? {} : {
              scale: [0.5, 1.5, 0.5],
              opacity: [0.8, 0.3, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delay + 1,
            }}
          />
        </>
      )}
    </div>
  );
};

// Enhanced floating particles with mobile optimization
const FloatingParticle = ({ style, delay, duration }) => {
  const shouldReduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (shouldReduceMotion || isMobile) return null; // Skip particles on mobile

  return (
    <motion.div className="absolute">
      {/* Main particle */}
      <motion.div
        className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full will-change-transform"
        style={{ ...style, transform: 'translateZ(0)' }}
        animate={{
          y: [-30, 30, -30],
          x: [-10, 10, -10],
          opacity: [0.3, 1, 0.3],
          scale: [0.5, 1.2, 0.5],
        }}
        transition={{
          duration,
          repeat: Infinity,
          delay,
        }}
      />
      {/* Particle trail - simplified for mobile */}
      <motion.div
        className="w-3 h-3 bg-gradient-to-r from-purple-300/30 to-pink-300/30 rounded-full blur-sm will-change-transform"
        style={{
          ...style,
          transform: 'translate(-25%, -25%) translateZ(0)',
        }}
        animate={{
          y: [-30, 30, -30],
          x: [-10, 10, -10],
          opacity: [0.1, 0.4, 0.1],
          scale: [1, 1.5, 1],
        }}
        transition={{
          duration: duration + 0.5,
          repeat: Infinity,
          delay: delay + 0.2,
        }}
      />
    </motion.div>
  );
};

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Generate fixed particle positions to avoid hydration mismatch
  const particlePositions = useMemo(() => {
    if (typeof window === 'undefined') return [];
    
    return Array.from({ length: window.innerWidth < 768 ? 10 : 25 }, (_, i) => ({
      left: `${(i * 17 + 13) % 100}%`,
      top: `${(i * 23 + 7) % 100}%`,
      delay: (i * 0.3) % 2,
      duration: 3 + (i % 3),
    }));
  }, []);

  useEffect(() => {
    setIsMounted(true);
    setIsVisible(true);
  }, []);

  // Don't render complex animations until mounted
  if (!isMounted) {
    return (
      <section className="min-h-screen pt-20 pb-16 bg-black relative overflow-hidden pt-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                  <div className="relative">
                    <div className="relative bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                      Create!
                    </div>
                  </div>
                  <div className="relative">
                    <div className="relative text-white">
                      Share!
                    </div>
                  </div>
                  <div className="relative">
                    <div className="relative bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                      Inspire!
                    </div>
                  </div>
                </h1>
                
                <div className="text-xl text-gray-300 leading-relaxed max-w-lg relative">
                  <p className="relative">
                    A vibrant creative community where stories come alive, poems touch hearts, 
                    and Shayaris inspire souls. Share your creativity with the world and 
                    discover amazing content from fellow creators.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg shadow-purple-500/25 flex items-center gap-2 overflow-hidden">
                  <Rocket className="w-5 h-5" />
                  Get Started
                </button>
                
                <button className="border border-gray-700 hover:border-purple-500 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 text-gray-300 flex items-center gap-2 relative overflow-hidden">
                  <Library className="w-5 h-5" />
                  Explore Stories
                </button>
              </div>
            </div>
            
            <div className="relative pt-10 hidden lg:block">
              <div className="relative w-full h-[600px] rounded-2xl overflow-hidden">
                <Image
                  src="/custom_assets/hero11.png"
                  alt="Creative writer at desk with books and writing materials"
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="min-h-screen pb-16 bg-black relative overflow-hidden pt-28">
      {/* Enhanced Animated Background Pattern with glow */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              radial-gradient(circle at 1px 1px, rgba(147, 51, 234, 0.4) 1px, transparent 0),
              radial-gradient(circle at 20px 20px, rgba(6, 182, 212, 0.2) 1px, transparent 0)
            `,
            backgroundSize: '40px 40px, 60px 60px',
          }}
        />
      </div>

      {/* Enhanced Breathing Color Circles with better positioning */}
      <BreathingCircle 
        size="450px" 
        colors={{
          primary: "#8B5CF6",
          secondary: "#A855F7", 
          accent: "#C084FC"
        }}
        position="-top-32 -left-32" 
        delay={0}
      />
      <BreathingCircle 
        size="350px" 
        colors={{
          primary: "#06B6D4",
          secondary: "#0891B2",
          accent: "#67E8F9"
        }}
        position="top-20 -right-24" 
        delay={1}
      />
      <BreathingCircle 
        size="300px" 
        colors={{
          primary: "#F59E0B",
          secondary: "#D97706",
          accent: "#FCD34D"
        }}
        position="bottom-32 left-1/4 -translate-x-1/2" 
        delay={2}
      />
      <BreathingCircle 
        size="400px" 
        colors={{
          primary: "#EF4444",
          secondary: "#DC2626",
          accent: "#F87171"
        }}
        position="-bottom-32 -right-32" 
        delay={1.5}
      />
      
      {/* Additional corner breathing circles for better coverage */}
      <BreathingCircle 
        size="200px" 
        colors={{
          primary: "#10B981",
          secondary: "#059669",
          accent: "#34D399"
        }}
        position="top-1/2 left-0 -translate-y-1/2 -translate-x-1/2" 
        delay={0.8}
      />
      <BreathingCircle 
        size="250px" 
        colors={{
          primary: "#F97316",
          secondary: "#EA580C",
          accent: "#FB923C"
        }}
        position="top-1/2 right-0 -translate-y-1/2 translate-x-1/2" 
        delay={2.3}
      />

      {/* Additional ambient glow circles with better positioning */}
      {!shouldReduceMotion && (
        <>
          <motion.div
            className="absolute top-1/4 left-1/3 w-96 h-96 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="w-full h-full bg-gradient-to-r from-purple-500/10 via-transparent to-cyan-500/10 rounded-full blur-3xl" />
          </motion.div>
          
          <motion.div
            className="absolute bottom-1/4 right-1/3 w-80 h-80 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            animate={{
              rotate: [360, 0],
              scale: [1.1, 0.7, 1.1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className="w-full h-full bg-gradient-to-l from-pink-500/8 via-transparent to-orange-500/8 rounded-full blur-3xl" />
          </motion.div>
        </>
      )}

      {/* Enhanced Floating Particles with trails */}
      <div className="absolute inset-0">
        {particlePositions.map((particle, i) => (
          <FloatingParticle
            key={i}
            style={{
              left: particle.left,
              top: particle.top,
            }}
            delay={particle.delay}
            duration={particle.duration}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isVisible ? "visible" : "hidden"}
          className="grid lg:grid-cols-2 gap-12 items-center min-h-[80vh]"
        >
          {/* Left Content */}
          <div className="space-y-8">
            <motion.div variants={itemVariants} className="space-y-6">
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent blur-sm opacity-50" />
                  <div className="relative bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent">
                    <h1>Create!</h1>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1.5 }}
                  className="relative"
                >
                  <div className="absolute inset-0 text-white blur-sm opacity-30" />
                  <div className="relative text-white">
                    <h1>Share!</h1>
                  </div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 2.5 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent blur-sm opacity-50" />
                  <div className="relative bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent ">
                    <h1>Inspire!</h1>
                  </div>
                </motion.div>
              </h1>
              
              <motion.div 
                variants={itemVariants}
                className="text-xl text-gray-300 leading-relaxed max-w-lg relative"
              >
                <div className="absolute inset-0 text-gray-300 blur-sm opacity-20" />
                <p className="relative">
                  A vibrant creative community where stories come alive, poems touch hearts, 
                  and Shayaris inspire souls. Share your creativity with the world and 
                  discover amazing content from fellow creators.
                </p>
              </motion.div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 40px rgba(147, 51, 234, 0.6), 0 0 80px rgba(147, 51, 234, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg shadow-purple-500/25 flex items-center gap-2 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-50 blur-xl" />
                <div className="relative flex items-center gap-2">
                  <Rocket className="w-5 h-5" />
                  Get Started
                </div>
              </motion.button>
              
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  backgroundColor: "rgba(147, 51, 234, 0.15)",
                  boxShadow: "0 0 30px rgba(147, 51, 234, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
                className="border border-gray-700 hover:border-purple-500 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 text-gray-300 flex items-center gap-2 relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                <div className="relative flex items-center gap-2">
                  <Library className="w-5 h-5" />
                  Explore Stories
                </div>
              </motion.button>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="flex items-center space-x-6 text-sm text-gray-400"
            >
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex items-center space-x-2"
              >
                <motion.span 
                  animate={{ 
                    scale: [1, 1.4, 1],
                    boxShadow: ["0 0 0px rgba(34, 197, 94, 0)", "0 0 20px rgba(34, 197, 94, 0.6)", "0 0 0px rgba(34, 197, 94, 0)"]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-2 h-2 bg-green-500 rounded-full"
                />
                <span>10k+ Active Writers</span>
              </motion.div>
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="flex items-center space-x-2"
              >
                <motion.span 
                  animate={{ 
                    scale: [1, 1.4, 1],
                    boxShadow: ["0 0 0px rgba(59, 130, 246, 0)", "0 0 20px rgba(59, 130, 246, 0.6)", "0 0 0px rgba(59, 130, 246, 0)"]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
                  className="w-2 h-2 bg-blue-500 rounded-full"
                />
                <span>50k+ Stories Shared</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Right Image with Static Container but Animated Floating Elements */}
          <motion.div 
            variants={itemVariants}
            className="relative pt-10 hidden lg:block"
          >
            {/* Static Image Container */}
            <motion.div
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 0 60px rgba(147, 51, 234, 0.3)"
              }}
              className="relative w-full h-[600px] rounded-2xl overflow-hidden"
            >
              <Image
                src="/custom_assets/hero11.png"
                alt="Creative writer at desk with books and writing materials"
                fill
                className="object-contain"
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
            
            {/* Enhanced Floating Icons with better positioning */}
            <FloatingElement delay={0.5} duration={3} className="absolute -top-4 right-12">
              <motion.div
                animate={{ 
                  rotate: [0, 10, 0],
                  filter: ["drop-shadow(0 0 10px rgba(168, 85, 247, 0.6))", "drop-shadow(0 0 20px rgba(168, 85, 247, 1))", "drop-shadow(0 0 10px rgba(168, 85, 247, 0.6))"]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-purple-400"
              >
                <Sparkles className="w-8 h-8" />
              </motion.div>
            </FloatingElement>
            
            <FloatingElement delay={1} duration={4} className="absolute bottom-8 -left-4">
              <motion.div
                animate={{ 
                  rotate: [0, -10, 0],
                  filter: ["drop-shadow(0 0 10px rgba(59, 130, 246, 0.6))", "drop-shadow(0 0 20px rgba(59, 130, 246, 1))", "drop-shadow(0 0 10px rgba(59, 130, 246, 0.6))"]
                }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="text-blue-400"
              >
                <BookOpen className="w-8 h-8" />
              </motion.div>
            </FloatingElement>
            
            <FloatingElement delay={1.5} duration={3.5} className="absolute top-1/3 -right-8">
              <motion.div
                animate={{ 
                  rotate: [0, 15, 0],
                  filter: ["drop-shadow(0 0 10px rgba(251, 191, 36, 0.6))", "drop-shadow(0 0 20px rgba(251, 191, 36, 1))", "drop-shadow(0 0 10px rgba(251, 191, 36, 0.6))"]
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="text-yellow-400"
              >
                <Star className="w-7 h-7" />
              </motion.div>
            </FloatingElement>
            
            <FloatingElement delay={0.8} duration={5} className="absolute top-16 -left-8">
              <motion.div
                animate={{ 
                  rotate: [0, -8, 0],
                  filter: ["drop-shadow(0 0 10px rgba(244, 114, 182, 0.6))", "drop-shadow(0 0 20px rgba(244, 114, 182, 1))", "drop-shadow(0 0 10px rgba(244, 114, 182, 0.6))"]
                }}
                transition={{ duration: 2.2, repeat: Infinity }}
                className="text-pink-400"
              >
                <Palette className="w-7 h-7" />
              </motion.div>
            </FloatingElement>
            
            <FloatingElement delay={2} duration={4.5} className="absolute bottom-16 right-8">
              <motion.div
                animate={{ 
                  rotate: [0, 12, 0],
                  filter: ["drop-shadow(0 0 10px rgba(34, 197, 94, 0.6))", "drop-shadow(0 0 20px rgba(34, 197, 94, 1))", "drop-shadow(0 0 10px rgba(34, 197, 94, 0.6))"]
                }}
                transition={{ duration: 2.8, repeat: Infinity }}
                className="text-green-400"
              >
                <PenTool className="w-7 h-7" />
              </motion.div>
            </FloatingElement>
            
            {/* Additional floating elements for better coverage */}
            <FloatingElement delay={3} duration={3.8} className="absolute top-2/3 left-1/4">
              <motion.div
                animate={{ 
                  rotate: [0, -12, 0],
                  filter: ["drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))", "drop-shadow(0 0 16px rgba(139, 92, 246, 0.8))", "drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))"]
                }}
                transition={{ duration: 2.6, repeat: Infinity }}
                className="text-purple-300"
              >
                <Sparkles className="w-6 h-6" />
              </motion.div>
            </FloatingElement>

            {/* Enhanced Glowing Orbs with better positioning */}
            {!shouldReduceMotion && (
              <>
                <motion.div className="absolute -top-8 -right-8">
                  <motion.div
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.4, 0.8, 0.4],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="w-24 h-24 bg-gradient-to-r from-purple-500/40 to-pink-500/40 rounded-full blur-xl"
                  />
                  <motion.div
                    animate={{
                      scale: [0.8, 1.1, 0.8],
                      opacity: [0.6, 0.3, 0.6],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                    className="absolute top-3 left-3 w-18 h-18 bg-gradient-to-r from-purple-400/60 to-pink-400/60 rounded-full blur-lg"
                  />
                </motion.div>
                
                <motion.div className="absolute -bottom-8 -left-8">
                  <motion.div
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.3, 0.7, 0.3],
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: 1 }}
                    className="w-28 h-28 bg-gradient-to-r from-cyan-500/40 to-blue-500/40 rounded-full blur-xl"
                  />
                  <motion.div
                    animate={{
                      scale: [0.7, 1.2, 0.7],
                      opacity: [0.5, 0.2, 0.5],
                    }}
                    transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
                    className="absolute top-4 left-4 w-20 h-20 bg-gradient-to-r from-cyan-400/60 to-blue-400/60 rounded-full blur-lg"
                  />
                </motion.div>
                
                {/* Additional corner orbs for better visual balance */}
                <motion.div className="absolute top-1/4 -left-6">
                  <motion.div
                    animate={{
                      scale: [0.9, 1.2, 0.9],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{ duration: 3.5, repeat: Infinity, delay: 0.8 }}
                    className="w-16 h-16 bg-gradient-to-r from-green-500/35 to-emerald-500/35 rounded-full blur-lg"
                  />
                </motion.div>
                
                <motion.div className="absolute bottom-1/4 -right-6">
                  <motion.div
                    animate={{
                      scale: [1.1, 0.8, 1.1],
                      opacity: [0.4, 0.7, 0.4],
                    }}
                    transition={{ duration: 2.8, repeat: Infinity, delay: 1.2 }}
                    className="w-20 h-20 bg-gradient-to-r from-orange-500/35 to-red-500/35 rounded-full blur-lg"
                  />
                </motion.div>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;