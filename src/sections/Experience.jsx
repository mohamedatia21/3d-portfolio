import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useState, useRef } from "react";

import { expCards } from "../constants";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";

gsap.registerPlugin(ScrollTrigger);

const Experience = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

  // تأكد من أن الكومبوننت جاهز
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useGSAP(() => {
    if (!isLoaded) return;
    
    // تنظيف الأنيميشن السابق
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());

    // أنيميشن الكروت الرئيسية
    gsap.utils.toArray(".timeline-card").forEach((card, index) => {
      gsap.fromTo(card, 
        {
          x: -50,
          y: 30,
          opacity: 0,
          scale: 0.95
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: index * 0.15,
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // أنيميشن النصوص
    gsap.utils.toArray(".expText").forEach((text, index) => {
      gsap.fromTo(text,
        {
          opacity: 0,
          x: 20,
          y: 15
        },
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
          delay: index * 0.2,
          scrollTrigger: {
            trigger: text,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // أنيميشن الصور
    gsap.utils.toArray(".exp-image").forEach((img, index) => {
      gsap.fromTo(img,
        {
          scale: 0.9,
          opacity: 0,
          rotation: 2
        },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: index * 0.1,
          scrollTrigger: {
            trigger: img,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        }
      );
    });

    // أنيميشن اللوجوهات
    gsap.utils.toArray(".timeline-logo").forEach((logo, index) => {
      gsap.fromTo(logo,
        {
          scale: 0,
          rotation: 90
        },
        {
          scale: 1,
          rotation: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          delay: index * 0.15 + 0.3,
          scrollTrigger: {
            trigger: logo,
            start: "top 85%",
            toggleActions: "play none none none",
          }
        }
      );
    });

    // أنيميشن التايم لاين للأجهزة الكبيرة فقط
    const timeline = document.querySelector(".main-timeline");
    if (timeline && window.innerWidth >= 1024) {
      gsap.fromTo(timeline,
        {
          scaleY: 0,
          transformOrigin: "top center"
        },
        {
          scaleY: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: timeline,
            start: "top 90%",
            end: "bottom 10%",
            scrub: 1,
          }
        }
      );
    }

    // تحديث ScrollTrigger
    ScrollTrigger.refresh();

  }, [isLoaded]);

  // تنظيف عند unmount
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  if (!isLoaded) {
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
          <div className="mt-16 md:mt-24 lg:mt-32 flex items-center justify-center">
            <div className="text-white/70 text-lg">Loading experience...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="experience"
      ref={containerRef}
      className="flex-center mt-16 md:mt-32 lg:mt-40 section-padding xl:px-0 px-4"
    >
      <div className="w-full max-w-7xl mx-auto h-full md:px-8 lg:px-16 xl:px-20">
        <TitleHeader
          title="Professional Work Experience"
          sub="💼 My Career Overview"
        />
        
        <div className="mt-16 md:mt-24 lg:mt-32 relative">
          {/* الخط الفاصل الرئيسي للأجهزة الكبيرة */}
          <div className="main-timeline hidden lg:block absolute left-8 lg:left-16 xl:left-20 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-transparent opacity-30" />
          
          <div className="relative z-50 space-y-8 md:space-y-16 lg:space-y-20 xl:space-y-32">
            {expCards?.map((card, index) => (
              <div
                key={`${card?.title || 'experience'}-${index}`}
                className="timeline-card exp-card-wrapper group"
              >
                <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-12 xl:gap-20 items-start">
                  
                  {/* قسم الصورة */}
                  <div className="w-full lg:w-2/5 xl:w-2/6 flex-shrink-0">
                    <GlowCard card={card}>
                      <div className="exp-image overflow-hidden rounded-lg">
                        <img
                          src={card?.imgPath || '/placeholder-image.jpg'}
                          alt={`${card?.title || 'Experience'} experience`}
                          className="w-full h-48 md:h-56 lg:h-64 xl:h-auto object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                          loading="lazy"
                          onLoad={(e) => {
                            // تأكد من تحديث ScrollTrigger بعد تحميل الصور
                            setTimeout(() => ScrollTrigger.refresh(), 100);
                          }}
                          onError={(e) => {
                            e.target.src = '/placeholder-image.jpg';
                          }}
                        />
                      </div>
                    </GlowCard>
                  </div>

                  {/* قسم النص */}
                  <div className="w-full lg:w-3/5 xl:w-4/6">
                    <div className="flex items-start gap-4 md:gap-6">
                      
                      {/* التايم لاين للأجهزة الكبيرة */}
                      <div className="timeline-wrapper hidden lg:flex flex-col items-center flex-shrink-0">
                        <div className="timeline w-px h-20 bg-gradient-to-b from-blue-500 to-purple-500" />
                        <div className="w-3 h-3 bg-blue-500 rounded-full shadow-lg shadow-blue-500/50" />
                        <div className="gradient-line w-px h-full bg-gradient-to-b from-purple-500 to-transparent" />
                      </div>

                      <div className="expText flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start gap-4 md:gap-6 lg:gap-8 xl:gap-12">
                          
                          {/* اللوجو */}
                          <div className="timeline-logo flex-shrink-0 self-start">
                            <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center overflow-hidden transition-all duration-300 hover:bg-white/20 hover:border-white/40">
                              <img
                                src={card?.logoPath || '/placeholder-logo.jpg'}
                                alt={`${card?.title || 'Company'} logo`}
                                className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 object-contain transition-transform duration-300 hover:scale-110"
                                loading="lazy"
                                onError={(e) => {
                                  e.target.src = '/placeholder-logo.jpg';
                                }}
                              />
                            </div>
                          </div>

                          {/* محتوى النص */}
                          <div className="flex-1 min-w-0">
                            <h1 className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-white mb-2 md:mb-3 break-words transition-colors duration-300 hover:text-blue-300">
                              {card?.title || 'Job Title'}
                            </h1>
                            
                            <p className="mb-3 md:mb-4 lg:mb-5 text-white/70 text-sm md:text-base flex items-center gap-2">
                              <span className="text-base md:text-lg">🗓️</span>
                              <span>{card?.date || 'Date'}</span>
                            </p>
                            
                            <p className="text-blue-300 italic text-sm md:text-base mb-3 md:mb-4 font-medium">
                              Responsibilities
                            </p>
                            
                            <ul className="space-y-2 md:space-y-3 lg:space-y-4 text-white/80">
                              {card?.responsibilities?.map((responsibility, respIndex) => (
                                <li 
                                  key={`${index}-${respIndex}`}
                                  className="text-sm md:text-base lg:text-lg leading-relaxed pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-blue-400 before:font-bold hover:text-white transition-all duration-300 hover:pl-6"
                                >
                                  {responsibility}
                                </li>
                              )) || []}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* خط فاصل للموبايل */}
                {index < (expCards?.length || 0) - 1 && (
                  <div className="md:hidden w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mt-8" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;