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
      <div className="absolute top-0 left-0 z-10">
        <img src="/images/bg.png" alt="background" className="w-full h-full object-cover" />
      </div>

      {/* Layout */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-16 hero-layout px-6 md:px-20 pt-16 max-w-[1400px] mx-auto">
        {/* LEFT: Hero Content */}
        <header className="flex flex-col items-center md:items-start justify-center w-full md:w-1/2 text-center md:text-left gap-7">
          <div className="hero-text space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              Shaping
              <span className="slide block mt-3">
                <span className="wrapper flex flex-col md:flex-row md:gap-4 gap-2">
                  {words.map((word, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-3 justify-center md:justify-start text-lg md:text-2xl"
                    >
                      <img
                        src={word.imgPath}
                        alt="person"
                        className="xl:w-14 xl:h-14 md:w-12 md:h-12 w-8 h-8 p-1 md:p-2 rounded-full bg-purple-500 shadow-lg"
                      />
                      <span>{word.text}</span>
                    </span>
                  ))}
                </span>
              </span>
            </h1>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">into Real Projects</h1>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold">that Deliver Results</h1>
          </div>

          <p className="text-gray-400 text-lg md:text-xl max-w-xl leading-relaxed">
            Hi, I’m Mohamed Attia, a developer based in Egypt with a passion for code.
          </p>

          <Button
            text="See My Work"
            className="w-52 h-14 md:w-80 md:h-16 text-lg md:text-xl"
            id="counter"
          />
        </header>

        {/* RIGHT: 3D Model */}
        <figure className="w-full md:w-1/2 h-[350px] md:h-[600px] flex justify-center hero-3d-layout">
          <HeroExperience />
        </figure>
      </div>

      {/* ✅ صورتك مع Glow بنفسجي */}
      <div className="flex justify-center mt-16 mb-12">
        <img
          src="/images/attia.png"
          alt="Mohamed Attia"
          className="profile-img object-cover w-56 h-56 sm:w-64 sm:h-64 md:w-[450px] md:h-[450px] rounded-full shadow-2xl 
          border-4 border-purple-500
          transition-all duration-500 ease-in-out 
          hover:scale-105 hover:shadow-[0_0_80px_20px_rgba(168,85,247,0.8)]"
        />
      </div>

      {/* الخانات (AnimatedCounter) */}
      <AnimatedCounter />
    </section>
  );
};

export default Hero;
