import { abilities } from "../constants";
import { useState, useEffect } from "react";

const FeatureCards = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById('feature-cards-section');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      id="feature-cards-section"
      className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-8 md:py-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* إضافة عنوان للقسم */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            My Abilities
          </h2>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            Explore the skills and technologies I work with
          </p>
        </div>

        {/* Grid محسن للاستجابة */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {abilities.map(({ imgPath, title, desc }, index) => (
            <div
              key={title}
              className={`
                group relative overflow-hidden
                card-border rounded-xl p-6 md:p-8 
                flex flex-col items-start gap-4
                bg-gradient-to-br from-[#1c1c1c] to-[#0f0f0f]
                hover:from-[#2a2a2a] hover:to-[#1a1a1a]
                border border-gray-800 hover:border-purple-500/50
                transition-all duration-500 ease-out
                transform hover:scale-105 hover:-translate-y-2
                cursor-pointer
                ${isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-8'}
              `}
              style={{
                animationDelay: isVisible ? `${index * 0.1}s` : '0s'
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* تأثير الضوء المتحرك */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/0 via-purple-600/5 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              {/* حاوي الأيقونة المحسن */}
              <div className={`
                relative size-12 sm:size-14 md:size-16
                flex items-center justify-center 
                rounded-full transition-all duration-500
                ${hoveredCard === index 
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 shadow-lg shadow-purple-500/25 scale-110' 
                  : 'bg-purple-600'
                }
              `}>
                <img 
                  src={imgPath} 
                  alt={`${title} icon`}
                  className={`
                    w-6 h-6 sm:w-8 sm:h-8 object-contain
                    transition-all duration-300
                    ${hoveredCard === index ? 'scale-110 brightness-110' : ''}
                  `}
                  loading="lazy"
                />
                
                {/* تأثير الوهج */}
                <div className={`
                  absolute inset-0 rounded-full 
                  bg-purple-400/20 blur-md
                  transition-opacity duration-500
                  ${hoveredCard === index ? 'opacity-100' : 'opacity-0'}
                `} />
              </div>

              {/* عنوان محسن */}
              <h3 className={`
                text-white font-semibold mt-2 mb-1
                text-lg sm:text-xl md:text-2xl
                transition-all duration-300
                group-hover:text-purple-200
                line-clamp-2
              `}>
                {title}
              </h3>

              {/* وصف محسن */}
              <p className={`
                text-gray-400 leading-relaxed
                text-sm sm:text-base md:text-lg
                transition-colors duration-300
                group-hover:text-gray-300
                line-clamp-3 flex-1
              `}>
                {desc}
              </p>

              {/* مؤشر المزيد (اختياري) */}
              <div className={`
                mt-auto pt-4 flex items-center gap-2
                text-purple-400 text-sm font-medium
                transition-all duration-300
                ${hoveredCard === index ? 'opacity-100 translate-x-2' : 'opacity-0'}
              `}>
                <span>Learn more</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>

              {/* تأثير الحواف المضيئة */}
              <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-purple-500/30 transition-colors duration-500" />
            </div>
          ))}
        </div>

        {/* إضافة نمط CSS للأنيميشن */}
        <style jsx>{`
          @keyframes fade-in-up {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          .animate-fade-in-up {
            animation: fade-in-up 0.8s ease-out forwards;
          }
          
          .line-clamp-2 {
            display: -webkit-box;
            -webkit-line-clamp: 2;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          
          .line-clamp-3 {
            display: -webkit-box;
            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          
          /* تحسينات للأجهزة الصغيرة */
          @media (max-width: 640px) {
            .group:hover {
              transform: scale(1.02) translateY(-4px);
            }
          }
          
          /* تحسين الأداء للأنيميشن */
          .group {
            will-change: transform;
          }
          
          .group:hover {
            will-change: auto;
          }
        `}</style>
      </div>
    </div>
  );
};

export default FeatureCards;