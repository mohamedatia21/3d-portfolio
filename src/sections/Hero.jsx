import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import AnimatedCounter from "../components/AnimatedCounter";
import Button from "../components/Button";
import { words } from "../constants";
import HeroExperience from "../components/models/hero_models/HeroExperience";

const Hero = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".hero-text h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power2.inOut" }
    );
    gsap.fromTo(
      ".hero-3d-container",
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "power3.out", delay: 0.3 }
    );
    gsap.fromTo(
      ".profile-img",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.6 }
    );
  });

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background */}
      <div className="absolute top-0 left-0 z-0 w-full h-full">
        <img 
          src="/images/bg.png" 
          alt="background" 
          className="w-full h-full object-cover opacity-50" 
        />
      </div>

      {/* Main Container */}
      <div className="relative z-10 min-h-screen flex flex-col">
        
        {/* Hero Content */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 px-4 sm:px-6 md:px-8 lg:px-20 pt-20 pb-8">
          
          {/* LEFT: Text Content */}
          <div className="flex flex-col justify-center items-center lg:items-start text-center lg:text-left order-2 lg:order-1">
            <div className="hero-text space-y-4 md:space-y-6 max-w-2xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
                Shaping{" "}
                <span className="slide block mt-2 md:mt-4">
                  <span className="wrapper space-y-2 md:space-y-3">
                    {words.map((word, index) => (
                      <span
                        key={index}
                        className="flex items-center gap-3 justify-center lg:justify-start"
                      >
                        <img
                          src={word.imgPath}
                          alt="icon"
                          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 xl:w-14 xl:h-14 p-2 rounded-full bg-purple-500 shadow-lg flex-shrink-0"
                        />
                        <span className="text-xl sm:text-2xl md:text-3xl xl:text-4xl font-bold text-gradient bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                          {word.text}
                        </span>
                      </span>
                    ))}
                  </span>
                </span>
              </h1>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
                into Real Projects
              </h1>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl xl:text-6xl font-bold leading-tight">
                that <span className="text-gradient bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Deliver Results</span>
              </h1>
            </div>

            <p className="text-gray-300 text-base sm:text-lg md:text-xl mt-6 md:mt-8 max-w-xl leading-relaxed">
              Hi, I'm <span className="text-purple-400 font-semibold">Mohamed Attia</span>, a developer based in Egypt with a passion for creating innovative solutions through code.
            </p>

            <div className="mt-8 md:mt-10">
              <Button 
                text="See My Work" 
                className="w-48 h-12 sm:w-56 sm:h-14 md:w-64 md:h-16 text-base sm:text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-2xl" 
                id="cta-button" 
              />
            </div>
          </div>

          {/* RIGHT: 3D Model Container */}
          <div className="flex items-center justify-center order-1 lg:order-2">
            <div className="hero-3d-container w-full max-w-lg lg:max-w-none">
              <div className="relative w-full h-[350px] sm:h-[400px] md:h-[500px] lg:h-[600px] xl:h-[700px]">
                <HeroExperience />
              </div>
            </div>
          </div>
        </div>

        {/* Profile Image Section */}
        <div className="flex justify-center px-4 sm:px-6 md:px-8 py-8 md:py-12">
          <div className="relative">
            <img
              src="/images/attia.png"
              alt="Mohamed Attia"
              className="profile-img object-cover w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 rounded-full shadow-2xl border-4 border-purple-500 transition-all duration-500 ease-in-out hover:scale-110 hover:shadow-[0_0_60px_15px_rgba(168,85,247,0.8)] hover:border-purple-400"
            />
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500/20 to-blue-500/20 animate-pulse"></div>
          </div>
        </div>

        {/* Animated Counters */}
        <div className="px-4 sm:px-6 md:px-8 lg:px-20 pb-12 md:pb-16">
          <AnimatedCounter />
        </div>
      </div>
    </section>
  );
};

export default Hero;