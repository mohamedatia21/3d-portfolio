import { useState, useEffect, useRef, useCallback, memo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../components/Button";
import { words, counterItems } from "../constants";
gsap.registerPlugin(ScrollTrigger);

// مكون منفصل للكلمات المتغيرة
const WordRotator = memo(({ currentWordIndex }) => {
  return (
    <span className="inline-block min-w-[200px] sm:min-w-[250px] md:min-w-[300px] text-center lg:text-left">
      <span className="flex items-center gap-2 sm:gap-3 justify-center lg:justify-start">
        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 p-1.5 md:p-2 shadow-md transition-all duration-300">
          <img
            key={currentWordIndex}
            src={words[currentWordIndex].imgPath}
            alt={`${words[currentWordIndex].text} icon`}
            className="w-full h-full object-contain animate-fade-in"
            loading="lazy"
          />
        </div>
        <span
          key={`text-${currentWordIndex}`}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-medium text-gray-100 animate-fade-in"
        >
          {words[currentWordIndex].text}
        </span>
      </span>
    </span>
  );
});

const Hero = () => {
  const [clicked, setClicked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  // Handle screen size and word switching
  useEffect(() => {
    let resizeTimeout;
    const checkMobile = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setIsMobile(window.innerWidth < 768);
      }, 100);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    setIsLoaded(true);
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => {
      window.removeEventListener("resize", checkMobile);
      clearInterval(interval);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Optimized AnimatedCounter component
  const AnimatedCounter = memo(({ target, suffix = "", duration = 2000, id }) => {
    const countRef = useRef(null);
    const animationRef = useRef(null);
    const isAnimated = useRef(false);
    const finalValue = useRef(`${target}${suffix}`);

    const animateCounter = useCallback(() => {
      if (isAnimated.current) {
        console.log(`Counter ${id} already animated, skipping.`);
        if (countRef.current) {
          countRef.current.textContent = finalValue.current;
        }
        return;
      }

      console.log(`Starting animation for counter ${id}`);
      isAnimated.current = true;
      const startValue = 0;
      const endValue = parseInt(target);
      const startTime = performance.now();

      const updateCounter = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(startValue + (endValue - startValue) * easeOutCubic);

        if (countRef.current) {
          countRef.current.textContent = `${currentValue}${suffix}`;
        }

        if (progress >= 1) {
          if (countRef.current) {
            countRef.current.textContent = finalValue.current;
          }
          animationRef.current = null;
          console.log(`Animation completed for counter ${id} at ${finalValue.current}`);
        } else {
          animationRef.current = requestAnimationFrame(updateCounter);
        }
      };

      animationRef.current = requestAnimationFrame(updateCounter);
    }, [target, suffix, duration, id]);

    useEffect(() => {
      if (isAnimated.current) {
        console.log(`Counter ${id} already animated on mount, setting final value`);
        if (countRef.current) {
          countRef.current.textContent = finalValue.current;
        }
        return;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && !isAnimated.current) {
            console.log(`Counter ${id} intersected, triggering animation`);
            animateCounter();
            observer.disconnect();
          }
        },
        { threshold: 0.5 }
      );

      const currentRef = countRef.current;
      if (currentRef) {
        observer.observe(currentRef);
      }

      return () => {
        observer.disconnect();
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          console.log(`Animation cancelled for counter ${id}`);
        }
        console.log(`Observer disconnected for counter ${id}`);
      };
    }, [animateCounter, id]);

    return <span ref={countRef}>{finalValue.current}</span>;
  });

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
      .to(
        ".profile-glow",
        {
          boxShadow: "0 0 80px 20px rgba(168,85,247,0.7), 0 0 40px 10px rgba(20,183,137,0.5)",
          duration: 0.3,
          ease: "power2.out",
          yoyo: true,
          repeat: 1,
        },
        0
      )
      .to(
        ".profile-container",
        {
          rotation: 2,
          duration: 0.05,
          yoyo: true,
          repeat: 3,
          ease: "power2.inOut",
        },
        0
      );
  }, [clicked]);

  useGSAP(() => {
    if (!isLoaded) return;
    const masterTl = gsap.timeline({ paused: true });
    masterTl.fromTo(
      ".hero-title-line",
      { y: isMobile ? 20 : 40, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 0.8, ease: "power3.out" }
    );
    masterTl.fromTo(
      ".hero-description",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.4"
    );
    masterTl.fromTo(
      ".hero-button",
      { y: 30, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.4)" },
      "-=0.3"
    );
    masterTl.fromTo(
      ".profile-container",
      { y: isMobile ? 30 : 60, opacity: 0, scale: 0.8, rotation: -10 },
      { y: 0, opacity: 1, scale: 1, rotation: 0, duration: 1.2, ease: "power3.out" },
      "-=0.8"
    );
    masterTl.fromTo(
      ".counter-card",
      { y: isMobile ? 20 : 40, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.2, ease: "back.out(1.2)" },
      "-=0.6"
    );
    masterTl.play();
  }, [isLoaded, isMobile]);

  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white min-h-screen flex flex-col">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/15 via-transparent to-blue-900/15" />
        <div className="absolute inset-0 bg-gradient-to-tl from-green-900/10 via-transparent to-purple-900/10" />
        <div className="absolute top-20 left-10 w-2 h-2 bg-purple-400/30 rounded-full animate-pulse" />
        <div className="absolute top-40 right-20 w-1 h-1 bg-blue-400/40 rounded-full animate-ping" />
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-green-400/20 rounded-full animate-bounce" />
      </div>
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-between gap-12 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pt-16 sm:pt-20 lg:pt-28 pb-16 sm:pb-20 lg:pb-28 relative z-20 max-w-7xl mx-auto w-full">
        <div className="w-full lg:w-1/2 order-2 lg:order-1 text-center lg:text-left">
          <div className="space-y-6 sm:space-y-8 lg:space-y-10">
            <div className="hero-text space-y-4 sm:space-y-6">
              <h1 className="hero-title-line text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                Shaping <WordRotator currentWordIndex={currentWordIndex} />
              </h1>
              <h1 className="hero-title-line text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                into Real Projects
              </h1>
              <h1 className="hero-title-line text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight">
                that{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
                  Deliver Results
                </span>
              </h1>
            </div>
            <p className="hero-description text-gray-400 text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl leading-relaxed max-w-full md:max-w-xl lg:max-w-full mx-auto lg:mx-0">
              Hi, I'm <span className="text-purple-400 font-semibold">Mohamed Attia</span>, a developer based in Egypt with a passion for code.
            </p>
            <div className="hero-button flex justify-center lg:justify-start">
              <Button
                text="See My Work"
                className="w-40 sm:w-48 md:w-56 lg:w-64 h-10 sm:h-12 md:h-14"
                id="counter"
              />
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center lg:justify-end">
          <div
            onClick={handleClick}
            className="profile-container relative cursor-pointer group"
            role="button"
            tabIndex={0}
            aria-label="Mohamed Attia's profile picture"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleClick();
              }
            }}
          >
            <div className="profile-glow p-2 sm:p-3 rounded-[50%_20%_50%_20%] bg-gradient-to-r from-purple-500 via-blue-500 to-green-400 transition-all duration-500 group-hover:scale-102">
              <img
                src="/images/attia.png"
                alt="Mohamed Attia - Full Stack Developer"
                className="profile-img object-cover w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem] h-auto rounded-[50%_20%_50%_20%] shadow-[0_0_40px_15px_rgba(168,85,247,0.5),0_0_20px_10px_rgba(20,183,137,0.4)] transition-all duration-500 group-hover:shadow-[0_0_60px_20px_rgba(168,85,247,0.7),0_0_30px_15px_rgba(20,183,137,0.6)]"
                loading="eager"
                sizes="(max-width: 640px) 256px, (max-width: 768px) 320px, (max-width: 1024px) 384px, 512px"
              />
            </div>
            <div className="absolute -inset-3 bg-gradient-to-r from-purple-400/10 via-blue-400/10 to-green-400/10 rounded-[50%_20%_50%_20%] opacity-0 group-hover:opacity-80 transition-all duration-500 blur-lg -z-10" />
          </div>
        </div>
      </div>
      <div className="relative z-20 max-w-7xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 pb-16 sm:pb-20 lg:pb-28">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-6 xl:gap-8 mt-12 sm:mt-16 lg:mt-20">
          {counterItems.map((counter) => (
            <div key={counter.id} className="counter-card group">
              <div className="bg-gradient-to-br from-gray-800/70 to-gray-700/50 backdrop-blur-md border border-purple-500/20 p-6 sm:p-8 lg:p-6 xl:p-8 rounded-xl xl:rounded-2xl text-center transition-all duration-400 hover:scale-102 hover:border-purple-400/40 hover:shadow-lg hover:shadow-purple-500/20">
                <div className="text-3xl sm:text-4xl lg:text-3xl xl:text-4xl mb-3 sm:mb-4 group-hover:scale-105 transition-transform duration-200">
                  {counter.icon}
                </div>
                <div className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl xl:text-5xl font-bold text-white mb-3 sm:mb-4 group-hover:text-purple-200 transition-colors duration-200">
                  <AnimatedCounter
                    target={counter.value}
                    suffix={counter.suffix}
                    id={counter.id}
                  />
                </div>
                <p className="text-gray-300 text-sm sm:text-base lg:text-sm xl:text-base font-medium group-hover:text-gray-100 transition-colors duration-200">
                  {counter.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(-8px) scale(0.95);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
        @media (max-width: 768px) {
          .animate-fade-in {
            animation: fade-in 0.4s ease-out forwards;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;