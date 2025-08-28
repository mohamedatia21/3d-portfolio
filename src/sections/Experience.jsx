import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState } from "react";

import { expCards } from "../constants";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const [isMobile, setIsMobile] = useState(false);

  // إضافة مراقب لحجم الشاشة
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useGSAP(() => {
    // تحسين الأنيميشن للأجهزة المختلفة
    gsap.utils.toArray(".timeline-card").forEach((card, index) => {
      gsap.from(card, {
        xPercent: isMobile ? 0 : -100,
        yPercent: isMobile ? 50 : 0,
        opacity: 0,
        transformOrigin: "left left",
        duration: isMobile ? 0.8 : 1,
        ease: "power2.out",
        delay: index * 0.1, // تأخير تدريجي
        scrollTrigger: {
          trigger: card,
          start: isMobile ? "top 90%" : "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        },
      });
    });

    // تحسين أنيميشن التايم لاين
    if (!isMobile) {
      gsap.to(".timeline", {
        transformOrigin: "top center",
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: ".timeline",
          start: "top center",
          end: "bottom center",
          scrub: 1,
          onUpdate: (self) => {
            gsap.to(".timeline", {
              scaleY: Math.max(0.1, 1 - self.progress * 0.8),
              duration: 0.1
            });
          },
        },
      });
    }

    // تحسين أنيميشن النص
    gsap.utils.toArray(".expText").forEach((text, index) => {
      gsap.from(text, {
        opacity: 0,
        y: isMobile ? 30 : 0,
        xPercent: isMobile ? 0 : 20,
        duration: 0.8,
        ease: "power2.out",
        delay: index * 0.15,
        scrollTrigger: {
          trigger: text,
          start: isMobile ? "top 85%" : "top 70%",
          toggleActions: "play none none reverse"
        },
      });
    });

    // إضافة أنيميشن للصور
    gsap.utils.toArray(".exp-image").forEach((img, index) => {
      gsap.from(img, {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)",
        delay: index * 0.1,
        scrollTrigger: {
          trigger: img,
          start: "top 80%",
          toggleActions: "play none none reverse"
        },
      });
    });

  }, [isMobile]);

  return (
    <section
      id="experience"
      className="flex-center mt-16 md:mt-32 lg:mt-40 section-padding xl:px-0 px-4"
    >
      <div className="w-full max-w-7xl mx-auto h-full md:px-8 lg:px-16 xl:px-20">
        <TitleHeader
          title="Professional Work Experience"
          sub="💼 My Career Overview"
        />
        
        <div className="mt-16 md:mt-24 lg:mt-32 relative">
          {/* الخط الفاصل للأجهزة الكبيرة فقط */}
          <div className="hidden md:block absolute left-8 lg:left-16 xl:left-20 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-transparent opacity-30" />
          
          <div className="relative z-50 space-y-8 md:space-y-16 lg:space-y-20 xl:space-y-32">
            {expCards.map((card, index) => (
              <div
                key={card.title}
                className="timeline-card exp-card-wrapper group"
              >
                <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12 xl:gap-20 items-start">
                  
                  {/* قسم الصورة - تحسين للأجهزة المختلفة */}
                  <div className="w-full lg:w-2/5 xl:w-2/6 flex-shrink-0">
                    <GlowCard card={card}>
                      <div className="exp-image overflow-hidden rounded-lg">
                        <img
                          src={card.imgPath}
                          alt={`${card.title} experience`}
                          className="w-full h-48 md:h-56 lg:h-64 xl:h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                    </GlowCard>
                  </div>

                  {/* قسم النص - تحسين للأجهزة المختلفة */}
                  <div className="w-full lg:w-3/5 xl:w-4/6">
                    <div className="flex items-start gap-4 md:gap-6">
                      
                      {/* التايم لاين للأجهزة الكبيرة */}
                      <div className="timeline-wrapper hidden lg:flex flex-col items-center flex-shrink-0">
                        <div className="timeline w-px h-20 bg-gradient-to-b from-blue-500 to-purple-500" />
                        <div className="w-3 h-3 bg-blue-500 rounded-full shadow-lg" />
                        <div className="gradient-line w-px h-full bg-gradient-to-b from-purple-500 to-transparent" />
                      </div>

                      <div className="expText flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start gap-4 md:gap-6 lg:gap-8 xl:gap-12">
                          
                          {/* اللوجو */}
                          <div className="timeline-logo flex-shrink-0 self-start">
                            <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center overflow-hidden">
                              <img
                                src={card.logoPath}
                                alt={`${card.title} logo`}
                                className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain"
                                loading="lazy"
                              />
                            </div>
                          </div>

                          {/* محتوى النص */}
                          <div className="flex-1 min-w-0">
                            <h1 className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white mb-2 md:mb-3 break-words">
                              {card.title}
                            </h1>
                            
                            <p className="mb-3 md:mb-4 lg:mb-5 text-white/70 text-sm md:text-base flex items-center gap-2">
                              <span className="text-base md:text-lg">🗓️</span>
                              <span>{card.date}</span>
                            </p>
                            
                            <p className="text-blue-300 italic text-sm md:text-base mb-3 md:mb-4">
                              Responsibilities
                            </p>
                            
                            <ul className="space-y-2 md:space-y-3 lg:space-y-4 text-white/80">
                              {card.responsibilities.map((responsibility, respIndex) => (
                                <li 
                                  key={respIndex} 
                                  className="text-sm md:text-base lg:text-lg leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-blue-400 before:font-bold hover:text-white transition-colors duration-300"
                                >
                                  {responsibility}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* خط فاصل للموبايل */}
                <div className="md:hidden w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mt-8" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;