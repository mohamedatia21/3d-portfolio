import { logoIconsList } from "../constants";
import { useState, useEffect, useRef } from "react";

const LogoIcon = ({ icon, index, isVisible }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      className={`
        flex-none flex items-center justify-center marquee-item group relative
        transition-all duration-500 ease-out
        ${isVisible ? 'animate-fade-in' : 'opacity-0'}
        ${isHovered ? 'z-20' : 'z-10'}
      `}
      style={{ 
        animationDelay: `${index * 0.1}s`,
        transform: isHovered ? 'scale(1.1)' : 'scale(1)'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* حاوي الشعار مع تأثيرات */}
      <div className={`
        relative p-4 md:p-6 rounded-2xl
        bg-gradient-to-br from-gray-900/50 to-gray-800/30
        backdrop-blur-sm border border-gray-700/30
        transition-all duration-500 ease-out
        hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/20
        hover:bg-gradient-to-br hover:from-purple-900/30 hover:to-blue-900/20
        ${isHovered ? 'scale-110 rotate-3' : ''}
      `}>
        
        {/* تأثير الإضاءة الخلفية */}
        <div className={`
          absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
          bg-gradient-to-r from-purple-500/10 via-blue-500/10 to-green-500/10
          transition-opacity duration-500
        `} />

        {/* الشعار */}
        <img
          src={icon.imgPath}
          alt={`${icon.name} technology logo`}
          className={`
            relative z-10 object-contain transition-all duration-500
            w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
            ${isHovered ? 'brightness-110 contrast-110' : ''}
            group-hover:drop-shadow-lg
          `}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
        />

        {/* النص التفاعلي */}
        <div className={`
          absolute -bottom-8 left-1/2 transform -translate-x-1/2
          transition-all duration-300 pointer-events-none
          ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
        `}>
          <span className="text-xs md:text-sm font-medium text-purple-300 whitespace-nowrap px-2 py-1 bg-black/70 rounded-md">
            {icon.name}
          </span>
        </div>

        {/* تأثير الوهج */}
        <div className={`
          absolute -inset-1 rounded-2xl blur-md opacity-0
          bg-gradient-to-r from-purple-500/20 to-blue-500/20
          group-hover:opacity-100 transition-opacity duration-500
        `} />
      </div>
    </div>
  );
};

const LogoShowcase = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);

  // مراقب الرؤية
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // إنشاء عدة نسخ للحركة السلسة
  const repeatedLogos = [
    ...logoIconsList,
    ...logoIconsList,
    ...logoIconsList
  ];

  return (
    <section 
      ref={sectionRef}
      className="relative py-12 md:py-20 lg:py-24 overflow-hidden"
    >
      {/* عنوان القسم */}
      <div className="text-center mb-12 md:mb-16 px-4 sm:px-6">
        <h2 className={`
          text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4
          transition-all duration-1000 delay-300
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}>
          Technologies & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Tools</span>
        </h2>
        <p className={`
          text-gray-400 text-base md:text-lg max-w-2xl mx-auto
          transition-all duration-1000 delay-500
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}>
          The powerful stack of technologies I work with to bring ideas to life
        </p>
      </div>

      {/* الحاوي الرئيسي */}
      <div className="relative">
        
        {/* تأثيرات التدرج الجانبية المحسنة */}
        <div className="absolute left-0 top-0 h-full w-20 md:w-32 lg:w-40 bg-gradient-to-r from-black via-black/80 to-transparent z-30 pointer-events-none" />
        <div className="absolute right-0 top-0 h-full w-20 md:w-32 lg:w-40 bg-gradient-to-l from-black via-black/80 to-transparent z-30 pointer-events-none" />

        {/* خط مضيء في الأعلى والأسفل */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

        {/* حاوي الشعارات المتحركة */}
        <div 
          className={`
            flex gap-8 md:gap-12 lg:gap-16 py-8 md:py-12
            ${isPaused ? '[animation-play-state:paused]' : ''}
          `}
          style={{
            animation: 'marquee 60s linear infinite',
            width: 'max-content'
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {repeatedLogos.map((icon, index) => (
            <LogoIcon 
              key={`${icon.name}-${index}`} 
              icon={icon} 
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* مؤشرات التحكم */}
        <div className="absolute bottom-4 right-4 flex gap-2 z-40">
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="w-8 h-8 bg-gray-800/80 hover:bg-purple-600/80 rounded-full flex items-center justify-center transition-colors duration-300 backdrop-blur-sm"
            aria-label={isPaused ? 'Resume animation' : 'Pause animation'}
          >
            {isPaused ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>

        {/* تأثيرات الخلفية */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
      </div>

      {/* إحصائيات سريعة */}
      <div className={`
        mt-12 md:mt-16 text-center transition-all duration-1000 delay-700
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12 text-sm md:text-base text-gray-400">
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
            {logoIconsList.length}+ Technologies
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300"></span>
            Always Learning
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse delay-600"></span>
            Production Ready
          </span>
        </div>
      </div>

      {/* CSS للأنيميشن */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333333%);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
        }

        /* تحسينات الأداء */
        .marquee-item {
          will-change: transform;
        }

        /* تحسينات للأجهزة المحمولة */
        @media (max-width: 768px) {
          @keyframes marquee {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        }

        /* تحسين للحركة المخفضة */
        @media (prefers-reduced-motion: reduce) {
          .marquee-item,
          [style*="animation"] {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </section>
  );
};

export default LogoShowcase;