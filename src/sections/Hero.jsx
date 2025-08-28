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
      ".hero-photo",
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
    <section id="hero" className="relative overflow-hidden bg-black text-white">
      {/* Background */}
      <div className="absolute top-0 left-0 z-10 w-full h-full">
        <img src="/images/bg.png" alt="background" className="w-full h-full object-cover" />
      </div>

      {/* Layout */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-6 hero-layout px-5 md:px-20 pt-16">

        {/* LEFT: Hero Content */}
        <header className="flex flex-col items-center md:items-start justify-center w-full md:w-1/2 text-center md:text-left gap-6 md:gap-7 order-2 md:order-1">
          <div className="hero-text space-y-4">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold leading-snug">
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
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">into Real Projects</h1>
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold">that Deliver Results</h1>
          </div>

          <p className="text-gray-400 text-sm sm:text-base md:text-xl max-w-lg">
            Hi, I'm Mohamed Attia, a developer based in Egypt with a passion for code.
          </p>

          <Button text="See My Work" className="w-40 h-10 sm:w-48 sm:h-12 md:w-80 md:h-16" id="counter" />
        </header>

        {/* RIGHT: 3D Model */}
        <figure className="w-full md:w-1/2 h-[300px] sm:h-[400px] md:h-[600px] flex justify-center hero-3d-layout hero-photo order-1 md:order-2">
          <HeroExperience />
        </figure>
      </div>

      {/* Profile Image */}
      <div className="flex justify-center mt-12 sm:mt-16 md:mt-12 mb-8">
        <img
          src="/images/attia.png"
          alt="Mohamed Attia"
          className="profile-img object-cover w-36 sm:w-48 md:w-[400px] h-36 sm:h-48 md:h-[400px] rounded-full shadow-2xl border-4 border-purple-500 transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-[0_0_60px_15px_rgba(168,85,247,0.8)]"
        />
      </div>

      {/* Animated Counters */}
      <div className="mt-12 sm:mt-16 md:mt-12">
        <AnimatedCounter />
      </div>
    </section>
  );
};

export default Hero;