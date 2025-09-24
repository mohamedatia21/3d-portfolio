import { useState, useEffect, useRef, useCallback, memo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { words, counterItems } from "../constants";

gsap.registerPlugin(ScrollTrigger);

// Enhanced Word Rotator Component
const WordRotator = memo(({ currentWordIndex }) => {
  const [displayIndex, setDisplayIndex] = useState(currentWordIndex);
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setDisplayIndex(currentWordIndex);
      setIsAnimating(false);
    }, 100);
    return () => clearTimeout(timer);
  }, [currentWordIndex]);

  return (
    <span className="inline-flex items-center min-w-[120px] sm:min-w-[140px] md:min-w-[160px] lg:min-w-[180px] xl:min-w-[200px] justify-center lg:justify-start">
      <div className="flex items-center gap-1 sm:gap-2">
        <div className={`flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-1 shadow-lg transition-all duration-500 ${isAnimating ? 'scale-110' : 'scale-100'}`}>
          <img
            key={`img-${displayIndex}`}
            src={words[displayIndex].imgPath}
            alt={`${words[displayIndex].text} icon`}
            className="w-full h-full object-contain animate-fade-in"
            loading="lazy"
          />
        </div>
        <span
          key={`text-${displayIndex}`}
          className={`text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent animate-fade-in whitespace-nowrap ${isAnimating ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        >
          {words[displayIndex].text}
        </span>
      </div>
    </span>
  );
});

// Enhanced Animated Counter
const AnimatedCounter = memo(({ target, suffix = "", prefix = "", duration = 2000, id, decimals = 0 }) => {
  const countRef = useRef(null);
  const hasAnimated = useRef(false);
  const observerRef = useRef(null);

  const animateCounter = useCallback(() => {
    if (hasAnimated.current || !countRef.current) return;
    
    hasAnimated.current = true;
    const startValue = 0;
    const endValue = parseFloat(target);
    const startTime = Date.now();

    const updateCounter = () => {
      if (!countRef.current) return;
      
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Enhanced easing function
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentValue = startValue + (endValue - startValue) * easeOutExpo;
      
      const formattedValue = decimals > 0 
        ? currentValue.toFixed(decimals)
        : Math.floor(currentValue).toString();
      
      countRef.current.textContent = `${prefix}${formattedValue}${suffix}`;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      }
    };

    updateCounter();
  }, [target, suffix, prefix, duration, decimals]);

  useEffect(() => {
    if (hasAnimated.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !hasAnimated.current) {
          animateCounter();
          observerRef.current?.disconnect();
        }
      },
      { threshold: 0.3, rootMargin: '50px' }
    );

    if (countRef.current) {
      observerRef.current.observe(countRef.current);
    }

    return () => {
      observerRef.current?.disconnect();
    };
  }, [animateCounter]);

  return (
    <span ref={countRef} className="tabular-nums font-mono">
      {prefix}{target}{suffix}
    </span>
  );
});

const Hero = () => {
  const [clicked, setClicked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const wordIntervalRef = useRef(null);
  const heroRef = useRef(null);

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left - rect.width / 2) / rect.width,
        y: (e.clientY - rect.top - rect.height / 2) / rect.height,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Loading and word rotation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // Word rotation cycle
    wordIntervalRef.current = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 3500);

    return () => {
      clearTimeout(timer);
      if (wordIntervalRef.current) {
        clearInterval(wordIntervalRef.current);
      }
    };
  }, []);

  // Enhanced click animation
  const handleClick = useCallback(() => {
    if (clicked) return;
    
    setClicked(true);
    
    // Create ripple effect
    const ripple = document.createElement('div');
    ripple.className = 'ripple-effect';
    document.querySelector('.profile-container')?.appendChild(ripple);
    
    const tl = gsap.timeline({
      onComplete: () => {
        setClicked(false);
        ripple?.remove();
      },
    });

    tl.to(".profile-img", {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.out",
    })
    .to(".profile-img", {
      scale: 1.08,
      duration: 0.3,
      ease: "elastic.out(1, 0.5)",
    })
    .to(".profile-img", {
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    })
    .to(".profile-glow", {
      boxShadow: "0 0 100px 30px rgba(168,85,247,0.8), 0 0 50px 15px rgba(20,183,137,0.6)",
      duration: 0.4,
      ease: "power2.out",
    }, 0)
    .to(".profile-glow", {
      boxShadow: "0 0 40px 15px rgba(168,85,247,0.5), 0 0 20px 10px rgba(20,183,137,0.4)",
      duration: 0.6,
      ease: "power2.inOut",
    });
  }, [clicked]);

  // GSAP Animations
  useGSAP(() => {
    if (!isLoaded) return;

    const tl = gsap.timeline();

    // Enhanced title animation with stagger
    tl.fromTo(".hero-title-line", 
      { 
        y: 60, 
        opacity: 0,
        rotationX: -90,
      },
      { 
        y: 0, 
        opacity: 1, 
        rotationX: 0,
        duration: 1, 
        stagger: 0.15, 
        ease: "power3.out" 
      }
    );

    // Description with blur effect
    tl.fromTo(".hero-description",
      { 
        y: 30, 
        opacity: 0,
        filter: "blur(10px)"
      },
      { 
        y: 0, 
        opacity: 1, 
        filter: "blur(0px)",
        duration: 0.8, 
        ease: "power2.out" 
      },
      "-=0.5"
    );

    // Button with bounce
    tl.fromTo(".hero-button",
      { 
        y: 30, 
        opacity: 0, 
        scale: 0.8
      },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        duration: 0.7, 
        ease: "elastic.out(1, 0.5)" 
      },
      "-=0.4"
    );

    // Profile image with 3D effect
    tl.fromTo(".profile-container",
      { 
        y: 60, 
        opacity: 0, 
        scale: 0.8,
        rotationY: -30
      },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1, 
        rotationY: 0,
        duration: 1.2, 
        ease: "power3.out" 
      },
      "-=0.8"
    );

    // Counter cards with wave effect
    tl.fromTo(".counter-card",
      { 
        y: 50, 
        opacity: 0,
        scale: 0.9
      },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 0.7, 
        stagger: {
          each: 0.1,
          from: "start"
        },
        ease: "back.out(1.5)" 
      },
      "-=0.6"
    );

    // Floating animation for background elements
    gsap.to(".floating-element", {
      y: "random(-20, 20)",
      x: "random(-20, 20)",
      duration: "random(3, 5)",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: {
        each: 0.5,
        from: "random"
      }
    });
  }, [isLoaded]);

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white min-h-screen flex flex-col"
    >
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0 z-0">
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20" />
        <div className="absolute inset-0 bg-gradient-to-tl from-green-900/10 via-transparent to-purple-900/10" />
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(90deg, rgba(168,85,247,0.1) 1px, transparent 1px),
                             linear-gradient(rgba(168,85,247,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px'
          }} />
        </div>
        
        {/* Floating Elements */}
        <div className="floating-element absolute top-20 left-10 w-3 h-3 bg-purple-400/40 rounded-full blur-sm" />
        <div className="floating-element absolute top-40 right-20 w-2 h-2 bg-blue-400/50 rounded-full blur-sm" />
        <div className="floating-element absolute bottom-40 left-20 w-4 h-4 bg-green-400/30 rounded-full blur-sm" />
        <div className="floating-element absolute top-60 left-1/3 w-2 h-2 bg-pink-400/40 rounded-full blur-sm" />
        <div className="floating-element absolute bottom-60 right-1/3 w-3 h-3 bg-yellow-400/30 rounded-full blur-sm" />
        
        {/* Parallax Layer */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
            transition: 'transform 0.3s ease-out'
          }}
        >
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-16 sm:pt-20 lg:pt-28 pb-8 sm:pb-12 lg:pb-16 relative z-20 max-w-7xl mx-auto w-full">
        
        {/* Text Section */}
        <div className="w-full lg:w-1/2 order-2 lg:order-1 text-center lg:text-left">
          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            
            {/* Hero Title */}
            <div className="hero-text space-y-3 sm:space-y-4 lg:space-y-6">
              <div className="hero-title-line text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1 sm:gap-2">
                  <span className="text-gray-100">Shaping</span>
                  <WordRotator currentWordIndex={currentWordIndex} />
                </div>
              </div>
              <div className="hero-title-line text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-center lg:text-left">
                <span className="text-gray-100">into Real Projects that</span>
              </div>
              <div className="hero-title-line text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-center lg:text-left">
                <span className="relative">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
                    Deliver Results
                  </span>
                  <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 transform scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="hero-description text-gray-300 text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl leading-relaxed max-w-full md:max-w-xl lg:max-w-full mx-auto lg:mx-0">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 font-semibold">Mohamed Attia</span>, 
              a passionate <span className="text-blue-400">Full-Stack Developer</span> based in Egypt, 
              crafting digital experiences with modern technologies.
            </p>

            {/* CTA Buttons */}
            <div className="hero-button flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border border-purple-500/30 hover:border-purple-400/50 overflow-hidden"
                onClick={() => {
                  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                <span className="relative z-10 text-sm sm:text-base font-medium">
                  See My Work
                </span>
                <div className="relative z-10 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:rotate-90">
                  <svg 
                    className="w-3 h-3 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
              </button>
              
              <button
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-transparent hover:bg-white/10 text-white font-semibold rounded-full border-2 border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-105 active:scale-95"
                onClick={() => {
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="text-sm sm:text-base font-medium">
                  Get In Touch
                </span>
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center transition-transform duration-300 group-hover:translate-x-1">
                  <svg 
                    className="w-3 h-3 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Profile Image Section */}
        <div className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center lg:justify-end">
          <div
            onClick={handleClick}
            className="profile-container relative cursor-pointer group transform-gpu perspective-1000"
            role="button"
            tabIndex={0}
            aria-label="Mohamed Attia's profile picture - Click for animation"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleClick();
              }
            }}
            style={{
              transform: `rotateY(${mousePosition.x * 5}deg) rotateX(${-mousePosition.y * 5}deg)`,
              transition: 'transform 0.1s ease-out'
            }}
          >
            <div className="profile-glow relative p-2 sm:p-3 rounded-[50%_20%_50%_20%] bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 transition-all duration-500 group-hover:scale-102 animate-gradient">
              <img
                src="/images/attia.png"
                alt="Mohamed Attia - Full Stack Developer"
                className="profile-img object-cover h-auto rounded-[50%_20%_50%_20%] shadow-[0_0_40px_15px_rgba(168,85,247,0.5),0_0_20px_10px_rgba(20,183,137,0.4)] transition-all duration-500 group-hover:shadow-[0_0_60px_20px_rgba(168,85,247,0.7),0_0_30px_15px_rgba(20,183,137,0.6)] w-56 sm:w-64 md:w-80 lg:w-96 xl:w-[28rem] 2xl:w-[32rem]"
                loading="eager"
                sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 320px, 448px"
              />
              {/* Click hint */}
              <div className="absolute bottom-4 right-4 bg-white/90 text-gray-800 px-3 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                Click me! 🎨
              </div>
            </div>
            <div className="absolute -inset-3 bg-gradient-to-r from-purple-400/10 via-pink-400/10 to-blue-400/10 rounded-[50%_20%_50%_20%] opacity-0 group-hover:opacity-80 transition-all duration-500 blur-xl -z-10" />
          </div>
        </div>
      </div>

      {/* Enhanced Counters Section */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pb-16 sm:pb-20 lg:pb-28">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-4 xl:gap-6 mt-8 sm:mt-12 lg:mt-16">
          {counterItems.map((counter, index) => (
            <div 
              key={`counter-${counter.id}-${index}`} 
              className="counter-card group transform-gpu"
            >
              <div className="relative bg-gradient-to-br from-gray-800/80 to-gray-700/60 backdrop-blur-lg border border-purple-500/20 rounded-xl xl:rounded-2xl text-center transition-all duration-400 hover:scale-105 hover:border-purple-400/40 hover:shadow-2xl hover:shadow-purple-500/30 p-4 sm:p-6 lg:p-5 xl:p-8 overflow-hidden">
                {/* Background animation */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/0 to-blue-600/0 group-hover:from-purple-600/10 group-hover:to-blue-600/10 transition-all duration-500" />
                
                <div className="relative z-10">
                  <div className="mb-2 sm:mb-3 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 text-2xl sm:text-3xl lg:text-2xl xl:text-4xl">
                    {counter.icon}
                  </div>
                  <div className="font-bold text-white mb-2 sm:mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-blue-300 transition-all duration-300 text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-5xl">
                    <AnimatedCounter
                      target={counter.value}
                      suffix={counter.suffix}
                      prefix={counter.prefix || ""}
                      id={`${counter.id}-${index}`}
                      duration={2000}
                      decimals={counter.decimals || 0}
                    />
                  </div>
                  <p className="text-gray-300 font-medium group-hover:text-gray-100 transition-colors duration-300 text-xs sm:text-sm lg:text-xs xl:text-base">
                    {counter.label}
                  </p>
                </div>
                
                {/* Hover effect corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-500/0 to-purple-500/20 rounded-bl-full transform translate-x-8 -translate-y-8 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(-10px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 4s ease infinite;
        }
        
        .tabular-nums {
          font-variant-numeric: tabular-nums;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .ripple-effect {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 20px;
          height: 20px;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.5);
          animation: ripple 0.6s ease-out;
          pointer-events: none;
        }
        
        @keyframes ripple {
          to {
            width: 300px;
            height: 300px;
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;