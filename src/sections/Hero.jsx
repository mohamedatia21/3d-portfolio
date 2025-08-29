import { useState, useEffect, useRef, useCallback, memo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { words, counterItems } from "../constants";

gsap.registerPlugin(ScrollTrigger);

// مكون منفصل للكلمات المتغيرة مع تحسينات وحجم أصغر
const WordRotator = memo(({ currentWordIndex }) => {
  const [displayIndex, setDisplayIndex] = useState(currentWordIndex);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayIndex(currentWordIndex);
    }, 100);
    return () => clearTimeout(timer);
  }, [currentWordIndex]);

  return (
    <span className="inline-flex items-center min-w-[120px] sm:min-w-[140px] md:min-w-[160px] lg:min-w-[180px] xl:min-w-[200px] justify-center lg:justify-start">
      <div className="flex items-center gap-1 sm:gap-2">
        <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-1 shadow-lg transition-all duration-500">
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
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium text-gray-100 animate-fade-in whitespace-nowrap"
        >
          {words[displayIndex].text}
        </span>
      </div>
    </span>
  );
});

// مكون محسن للعداد مع منع التكرار
const AnimatedCounter = memo(({ target, suffix = "", duration = 2000, id }) => {
  const countRef = useRef(null);
  const hasAnimated = useRef(false);
  const observerRef = useRef(null);

  const animateCounter = useCallback(() => {
    if (hasAnimated.current || !countRef.current) return;
    
    hasAnimated.current = true;
    const startValue = 0;
    const endValue = parseInt(target);
    const startTime = Date.now();
    const finalText = `${target}${suffix}`;

    const updateCounter = () => {
      if (!countRef.current) return;
      
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // easing function
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutQuart);
      
      countRef.current.textContent = `${currentValue}${suffix}`;
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        countRef.current.textContent = finalText;
      }
    };

    updateCounter();
  }, [target, suffix, duration]);

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
    <span ref={countRef} className="tabular-nums">
      {target}{suffix}
    </span>
  );
});

const Hero = () => {
  const [clicked, setClicked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const wordIntervalRef = useRef(null);

  // معالجة التحميل والكلمات المتغيرة
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    // تشغيل دورة الكلمات
    wordIntervalRef.current = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 4000);

    return () => {
      clearTimeout(timer);
      if (wordIntervalRef.current) {
        clearInterval(wordIntervalRef.current);
      }
    };
  }, []);

  const handleClick = useCallback(() => {
    if (clicked) return;
    
    setClicked(true);
    const tl = gsap.timeline({
      onComplete: () => setClicked(false),
    });

    tl.to(".profile-img", {
      scale: 0.95,
      duration: 0.1,
      ease: "power2.out",
    })
    .to(".profile-img", {
      scale: 1.05,
      duration: 0.2,
      ease: "back.out(1.5)",
    })
    .to(".profile-img", {
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    })
    .to(".profile-glow", {
      boxShadow: "0 0 80px 20px rgba(168,85,247,0.7), 0 0 40px 10px rgba(20,183,137,0.5)",
      duration: 0.3,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
    }, 0)
    .to(".profile-container", {
      rotation: 2,
      duration: 0.05,
      yoyo: true,
      repeat: 3,
      ease: "power2.inOut",
    }, 0);
  }, [clicked]);

  useGSAP(() => {
    if (!isLoaded) return;

    // أنيميشن بسيط وموحد
    const tl = gsap.timeline();

    // أنيميشن العناوين
    tl.fromTo(".hero-title-line", 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" }
    );

    // أنيميشن الوصف
    tl.fromTo(".hero-description",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    );

    // أنيميشن الزر
    tl.fromTo(".hero-button",
      { y: 30, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.3)" },
      "-=0.3"
    );

    // أنيميشن الصورة
    tl.fromTo(".profile-container",
      { y: 50, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 1, ease: "power2.out" },
      "-=0.7"
    );

    // أنيميشن العدادات
    tl.fromTo(".counter-card",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.5"
    );
  }, [isLoaded]);

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white min-h-screen flex flex-col">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/15 via-transparent to-blue-900/15" />
        <div className="absolute inset-0 bg-gradient-to-tl from-green-900/10 via-transparent to-purple-900/10" />
        <div className="absolute top-20 left-10 w-2 h-2 bg-purple-400/30 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-blue-400/40 rounded-full animate-ping" />
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-green-400/20 rounded-full animate-bounce" />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-16 sm:pt-20 lg:pt-28 pb-8 sm:pb-12 lg:pb-16 relative z-20 max-w-7xl mx-auto w-full">
        
        {/* Text Section */}
        <div className="w-full lg:w-1/2 order-2 lg:order-1 text-center lg:text-left">
          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            
            {/* Hero Title - Properly arranged in two lines */}
            <div className="hero-text space-y-3 sm:space-y-4 lg:space-y-6">
              <div className="hero-title-line text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-1 sm:gap-2">
                  <span>Shaping</span>
                  <WordRotator currentWordIndex={currentWordIndex} />
                  <span>into Real Projects</span>
                </div>
              </div>
              <div className="hero-title-line text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-center lg:text-left">
                that{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Deliver Results
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="hero-description text-gray-400 text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl leading-relaxed max-w-full md:max-w-xl lg:max-w-full mx-auto lg:mx-0">
              Hi, I'm <span className="text-purple-400 font-semibold">Mohamed Attia</span>, a developer based in Egypt with a passion for code.
            </p>

            {/* Custom Button */}
            <div className="hero-button flex justify-center lg:justify-start">
              <button
                id="work-button"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 border border-purple-500/30 hover:border-purple-400/50"
                onClick={() => {
                  document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span className="relative z-10 text-sm sm:text-base lg:text-base font-medium">
                  See My Work
                </span>
                <div className="relative z-10 w-5 h-5 rounded-full bg-white/20 flex items-center justify-center transition-transform duration-300 group-hover:rotate-45">
                  <svg 
                    className="w-3 h-3 text-white" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </div>
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Profile Image Section */}
        <div className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center lg:justify-end">
          <div
            onClick={handleClick}
            className="profile-container relative cursor-pointer group"
            role="button"
            tabIndex={0}
            aria-label="Mohamed Attia's profile picture"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleClick();
              }
            }}
          >
            <div className="profile-glow p-2 sm:p-3 rounded-[50%_20%_50%_20%] bg-gradient-to-r from-purple-500 via-blue-500 to-green-400 transition-all duration-500 group-hover:scale-102">
              <img
                src="/images/attia.png"
                alt="Mohamed Attia - Full Stack Developer"
                className="profile-img object-cover h-auto rounded-[50%_20%_50%_20%] shadow-[0_0_40px_15px_rgba(168,85,247,0.5),0_0_20px_10px_rgba(20,183,137,0.4)] transition-all duration-500 group-hover:shadow-[0_0_60px_20px_rgba(168,85,247,0.7),0_0_30px_15px_rgba(20,183,137,0.6)] w-56 sm:w-64 md:w-80 lg:w-96 xl:w-[28rem] 2xl:w-[32rem]"
                loading="eager"
                sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 320px, 448px"
              />
            </div>
            <div className="absolute -inset-3 bg-gradient-to-r from-purple-400/10 via-blue-400/10 to-green-400/10 rounded-[50%_20%_50%_20%] opacity-0 group-hover:opacity-80 transition-all duration-500 blur-lg -z-10" />
          </div>
        </div>
      </div>

      {/* Counters Section */}
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pb-16 sm:pb-20 lg:pb-28">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-4 xl:gap-6 mt-8 sm:mt-12 lg:mt-16">
          {counterItems.map((counter, index) => (
            <div 
              key={`counter-${counter.id}-${index}`} 
              className="counter-card group"
            >
              <div className="bg-gradient-to-br from-gray-800/70 to-gray-700/50 backdrop-blur-md border border-purple-500/20 rounded-xl xl:rounded-2xl text-center transition-all duration-400 hover:scale-102 hover:border-purple-400/40 hover:shadow-lg hover:shadow-purple-500/20 p-4 sm:p-6 lg:p-5 xl:p-8">
                <div className="mb-2 sm:mb-3 group-hover:scale-105 transition-transform duration-200 text-2xl sm:text-3xl lg:text-2xl xl:text-4xl">
                  {counter.icon}
                </div>
                <div className="font-bold text-white mb-2 sm:mb-3 group-hover:text-purple-200 transition-colors duration-200 text-xl sm:text-3xl md:text-4xl lg:text-3xl xl:text-5xl">
                  <AnimatedCounter
                    target={counter.value}
                    suffix={counter.suffix}
                    id={`${counter.id}-${index}`}
                    duration={1500}
                  />
                </div>
                <p className="text-gray-300 font-medium group-hover:text-gray-100 transition-colors duration-200 text-xs sm:text-sm lg:text-xs xl:text-base">
                  {counter.label}
                </p>
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
            transform: translateY(-6px) scale(0.96);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.4s ease-out forwards;
        }
        
        .tabular-nums {
          font-variant-numeric: tabular-nums;
        }
      `}</style>
    </section>
  );
};

export default Hero;