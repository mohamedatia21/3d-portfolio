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
        <img src="/images/bg.png" alt="background" />
      </div>

      {/* Layout */}
      <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-12 md:gap-6 hero-layout px-5 md:px-20 pt-16">
        {/* LEFT: Hero Content */}
        <header className="flex flex-col items-center md:items-start justify-center w-full md:w-1/2 text-center md:text-left gap-7">
          <div className="hero-text space-y-4">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
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
                      <span>{word.text}</span>
                    </span>
                  ))}
                </span>
              </span>
            </h1>
            <h1 className="text-3xl md:text-5xl font-bold">into Real Projects</h1>
            <h1 className="text-3xl md:text-5xl font-bold">that Deliver Results</h1>
          </div>

          <p className="text-gray-400 text-base md:text-xl max-w-lg">
            Hi, I’m Mohamed Attia, a developer based in Egypt with a passion for code.
          </p>

          <Button text="See My Work" className="w-48 h-12 md:w-80 md:h-16" id="counter" />
        </header>

        {/* RIGHT: 3D Model */}
        <figure className="w-full md:w-1/2 h-[300px] md:h-[600px] flex justify-center hero-3d-layout">
          <HeroExperience />
        </figure>
      </div>

      {/* ✅ صورتك مع Glow بنفسجي */}
      <div className="flex justify-center mt-20 md:mt-12 mb-8">
        <img
          src="/images/attia.png"
          alt="Mohamed Attia"
          className="profile-img object-cover w-52 h-52 md:w-[400px] md:h-[400px] rounded-full shadow-2xl border-4 border-purple-500 transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-[0_0_60px_15px_rgba(168,85,247,0.8)]"
        />
      </div>

      {/* الخانات (AnimatedCounter) */}
      <div className="mt-16 md:mt-12">
        <AnimatedCounter />
      </div>
    </section>
  );
};

export default Hero;
