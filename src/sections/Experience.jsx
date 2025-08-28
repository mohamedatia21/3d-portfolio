import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { expCards } from "../constants";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  useGSAP(() => {
    gsap.utils.toArray(".timeline-card").forEach((card) => {
      gsap.from(card, {
        xPercent: -100,
        opacity: 0,
        transformOrigin: "left left",
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: card,
          start: "top 80%",
        },
      });
    });

    gsap.to(".timeline", {
      transformOrigin: "bottom bottom",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: ".timeline",
        start: "top center",
        end: "70% center",
        onUpdate: (self) => {
          gsap.to(".timeline", {
            scaleY: 1 - self.progress,
          });
        },
      },
    });

    gsap.utils.toArray(".expText").forEach((text) => {
      gsap.from(text, {
        opacity: 0,
        xPercent: 0,
        duration: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: text,
          start: "top 60%",
        },
      });
    }, "<");
  }, []);

  return (
    <section
      id="experience"
      className="flex-center md:mt-40 mt-20 section-padding xl:px-0"
    >
      <div className="w-full h-full md:px-20 px-5">
        <TitleHeader
          title="Professional Work Experience"
          sub="💼 My Career Overview"
        />
        <div className="mt-32 relative">
          <div className="relative z-50 xl:space-y-32 space-y-10">
            {expCards.map((card) => (
              <div
                key={card.title}
                className="exp-card-wrapper flex flex-col md:flex-row gap-6 md:gap-10 xl:gap-20"
              >
                {/* Image Section */}
                <div className="w-full md:w-2/6">
                  <GlowCard card={card}>
                    <div>
                      <img
                        src={card.imgPath}
                        alt="exp-img"
                        className="w-full h-auto rounded-lg object-cover"
                      />
                    </div>
                  </GlowCard>
                </div>

                {/* Text Section */}
                <div className="w-full md:w-4/6">
                  <div className="flex items-start">
                    <div className="timeline-wrapper hidden md:block">
                      <div className="timeline" />
                      <div className="gradient-line w-1 h-full" />
                    </div>
                    <div className="expText flex flex-col md:flex-row md:gap-10 xl:gap-20 gap-5 relative z-20">
                      <div className="timeline-logo flex-shrink-0">
                        <img
                          src={card.logoPath}
                          alt="logo"
                          className="w-10 h-10 md:w-14 md:h-14"
                        />
                      </div>
                      <div>
                        <h1 className="font-semibold text-xl md:text-2xl xl:text-3xl">
                          {card.title}
                        </h1>
                        <p className="my-3 md:my-5 text-white-50 text-sm md:text-base">
                          🗓️&nbsp;{card.date}
                        </p>
                        <p className="text-[#839CB5] italic text-sm md:text-base">
                          Responsibilities
                        </p>
                        <ul className="list-disc ms-5 mt-3 md:mt-5 flex flex-col gap-3 md:gap-5 text-white-50">
                          {card.responsibilities.map((responsibility, index) => (
                            <li key={index} className="text-sm md:text-lg">
                              {responsibility}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
