import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Button from "../components/Button";
import { words } from "../constants";
import HeroExperience from "../components/models/hero_models/HeroExperience";

const Hero = () => {
  const [clicked, setClicked] = useState(false);
  
  // Counter animation function
  const AnimatedCounter = ({ target, suffix = "" }) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(null);
    
    useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          let start = 0;
          const end = parseInt(target);
          const duration = 2000;
          const increment = end / (duration / 16);
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          
          observer.disconnect();
        }
      });
      
      if (countRef.current) {
        observer.observe(countRef.current);
      }
      
      return () => observer.disconnect();
    }, [target]);
    
    return <span ref={countRef}>{count}{suffix}</span>;
  };

  const handleClick = () => {
    setClicked(true);
    
    // Enhanced click animation
    gsap.to(".profile-img", {
      scale: 0.9,
      duration: 0.1,
      ease: "power2.out",
      yoyo: true,
      repeat: 1,
      onComplete: () => setClicked(false)
    });
    
    // Glow pulse effect
    gsap.to(".profile-glow", {
      boxShadow: "0 0 100px 25px rgba(168,85,247,1), 0 0 40px 10px rgba(20,183,137,0.8)",
      duration: 0.3,
      ease: "power2.out",
      yoyo: true,
      repeat: 1
    });
  };

  useGSAP(() => {
    // Hero text animation
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
    );
    
    // 3D model animation
    gsap.fromTo(
      ".hero-photo",
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 }
    );
    
    // Profile image animation
    gsap.fromTo(
      ".profile-img",
      { y: 50, opacity: 0, scale: 0.8 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 1.2, 
        ease: "elastic.out(1, 0.5)", 
        delay: 0.6 
      }
    );
    
    // Counters animation
    gsap.fromTo(
      ".counter-card",
      { y: 50, opacity: 0, scale: 0.9 },
      { 
        y: 0, 
        opacity: 1, 
        scale: 1,
        duration: 0.8, 
        stagger: 0.15, 
        ease: "back.out(1.7)", 
        delay: 1.2 
      }
    );
    

  });

  return (
    <section id="hero" className="relative overflow-hidden bg-black text-white min-h-screen">

      {/* Background */}
      <div className="absolute top-0 left-0 z-10 w-full h-full">
        <img
          src="/images/bg.png"
          alt="background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Layout */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-6 hero-layout px-5 sm:px-10 md:px-20 pt-16 relative z-20">
        
        {/* 3D Model */}
        <figure className="w-full md:w-1/2 min-h-[300px] sm:min-h-[400px] md:min-h-[600px] flex justify-center hero-3d-layout hero-photo order-1 md:order-2">
          <HeroExperience />
        </figure>

        {/* Hero Content */}
        <header className="flex flex-col items-center md:items-start justify-center w-full md:w-1/2 text-center md:text-left gap-6 md:gap-7 order-2 md:order-1">
          <div className="hero-text space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-snug">
              Shaping{" "}
              <span className="slide block">
                <span className="wrapper flex flex-col md:flex-row md:gap-3 gap-1">
                  {words.map((word, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-2 justify-center md:justify-start"
                    >
                      <img
                        src={word.imgPath}
                        alt="person"
                        className="xl:size-12 md:size-10 size-7 p-1 md:p-2 rounded-full bg-purple-500 shadow-lg"
                      />
                      <span className="text-base sm:text-lg md:text-xl">{word.text}</span>
                    </span>
                  ))}
                </span>
              </span>
            </h1>
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold">
              into Real Projects
            </h1>
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold">
              that Deliver Results
            </h1>
          </div>

          <p className="text-gray-400 text-sm sm:text-base md:text-xl max-w-full md:max-w-lg">
            Hi, I'm Mohamed Attia, a developer based in Egypt with a passion for code.
          </p>

          <Button
            text="See My Work"
            className="w-40 sm:w-48 md:w-64 lg:w-80 h-10 sm:h-12 md:h-14 lg:h-16"
            id="counter"
          />
        </header>
      </div>

      {/* Profile Image */}
      <div className="flex justify-center mt-8 mb-12 relative z-20">
        <div
          onClick={handleClick}
          className="profile-glow p-1 rounded-[50%_20%_50%_20%] bg-gradient-to-r from-purple-500 to-green-400 cursor-pointer transform transition-all duration-300 hover:scale-105"
        >
          <img
            src="/images/attia.png"
            alt="Mohamed Attia"
            className="profile-img object-cover w-36 sm:w-48 md:w-[300px] max-w-full h-auto rounded-[50%_20%_50%_20%] shadow-[0_0_60px_15px_rgba(168,85,247,0.8),0_0_20px_5px_rgba(20,183,137,0.5)] transition-all duration-300 hover:shadow-[0_0_80px_20px_rgba(168,85,247,0.9),0_0_30px_8px_rgba(20,183,137,0.7)]"
          />
        </div>
      </div>

      {/* 4 Counters - Modern Design */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 px-4 sm:px-8 md:px-20 relative z-20 max-w-7xl mx-auto">
        
        <div className="counter-card group">
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-6 sm:p-8 rounded-2xl text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 backdrop-blur-lg border border-purple-500/20">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
              <AnimatedCounter target="1" suffix="+" />
            </div>
            <p className="text-purple-100 text-sm sm:text-base font-medium">Years of Experience</p>
          </div>
        </div>

        <div className="counter-card group">
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-6 sm:p-8 rounded-2xl text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 backdrop-blur-lg border border-purple-500/20">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
              <AnimatedCounter target="3" suffix="+" />
            </div>
            <p className="text-purple-100 text-sm sm:text-base font-medium">Satisfied Clients</p>
          </div>
        </div>

        <div className="counter-card group">
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-6 sm:p-8 rounded-2xl text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 backdrop-blur-lg border border-purple-500/20">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
              <AnimatedCounter target="7" suffix="+" />
            </div>
            <p className="text-purple-100 text-sm sm:text-base font-medium">Completed Projects</p>
          </div>
        </div>

        <div className="counter-card group">
          <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-6 sm:p-8 rounded-2xl text-center transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 backdrop-blur-lg border border-purple-500/20">
            <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2">
              <AnimatedCounter target="79" suffix="%" />
            </div>
            <p className="text-purple-100 text-sm sm:text-base font-medium">Client Retention Rate</p>
          </div>
        </div>

      </div>

      {/* Extra spacing */}
      <div className="h-16"></div>
      
    </section>
  );
};

export default Hero;