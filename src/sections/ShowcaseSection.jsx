import { useRef, useState, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredCard, setHoveredCard] = useState(null);

  const projects = [
    { 
      img: "/images/porttfolio.jpg", 
      title: "3D Portfolio", 
      tech: "React • Three.js • GSAP",
      category: "web",
      description: "Interactive 3D portfolio showcasing modern web technologies with stunning animations and responsive design.",
      link: "https://3d-portfolio-three-nu.vercel.app/",
      github: "https://github.com/mohamedattia/3d-portfolio"
    },
    { 
      img: "/images/thecupegame.jpg", 
      title: "The Cupe Game", 
      tech: "JavaScript • Canvas • Game Logic",
      category: "game",
      description: "Engaging puzzle game with multiple levels, smooth animations, and intuitive gameplay mechanics.",
      link: "#",
      github: "#"
    },
    { 
      img: "/images/coloron.jpg", 
      title: "Coloron Game", 
      tech: "HTML5 • CSS3 • JavaScript",
      category: "game",
      description: "Fun and colorful interactive game featuring dynamic color matching and responsive design.",
      link: "#",
      github: "#"
    },
    { 
      img: "/images/3Dcard.jpg", 
      title: "3D Card Animation", 
      tech: "GSAP • Three.js • WebGL",
      category: "animation",
      description: "Stunning 3D card animations with realistic physics and smooth transitions using advanced web technologies.",
      link: "#",
      github: "#"
    },
  ];

  const filters = [
    { id: 'all', label: 'All Projects', icon: '🚀' },
    { id: 'web', label: 'Web Apps', icon: '💻' },
    { id: 'game', label: 'Games', icon: '🎮' },
    { id: 'animation', label: 'Animations', icon: '✨' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  // تأثيرات تحميل الصور
  useEffect(() => {
    const imagePromises = projects.map(project => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve;
        img.src = project.img;
      });
    });

    Promise.all(imagePromises).then(() => {
      setIsLoading(false);
    });
  }, []);

  // معالجة الضغط على Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && fullscreenImage) {
        setFullscreenImage(null);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [fullscreenImage]);

  // منع التمرير عند فتح الصورة كاملة الشاشة
  useEffect(() => {
    if (fullscreenImage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [fullscreenImage]);

  const handleImageClick = useCallback((imageSrc) => {
    setFullscreenImage(imageSrc);
  }, []);

  const handleFilterChange = useCallback((filter) => {
    setActiveFilter(filter);
  }, []);

  useGSAP(() => {
    if (isLoading) return;

    // أنيميشن العنوان
    gsap.fromTo(
      ".showcase-title",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom-=150",
        },
      }
    );

    // أنيميشن الفلاتر
    gsap.fromTo(
      ".filter-btn",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".filters-container",
          start: "top bottom-=100",
        },
      }
    );

    // أنيميشن الكروت بدون تداخل
    gsap.fromTo(
      ".project-card",
      { 
        y: 60, 
        opacity: 0,
        scale: 0.95
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        stagger: {
          amount: 0.4,
          from: "start"
        },
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom-=100",
        },
      }
    );

    // تأثير parallax خفيف للكروت (مزال لتجنب التداخل)
    gsap.utils.toArray(".project-card").forEach((card, i) => {
      gsap.to(card, {
        yPercent: -10 * (i % 2 === 0 ? 1 : -1),
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.5,
        },
      });
    });

  }, [isLoading, activeFilter]);

  return (
    <section 
      id="work" 
      ref={sectionRef} 
      className="app-showcase py-16 md:py-24 bg-gradient-to-b from-black via-gray-900 to-black text-white relative overflow-hidden"
    >
      {/* تأثيرات الخلفية */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* عنوان القسم */}
        <div className="showcase-title mb-12 md:mb-16 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 group cursor-default">
            <span className="inline-block text-4xl sm:text-5xl md:text-6xl mr-4 transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
              🚀
            </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-green-400">
              Featured Projects
            </span>
          </h2>
          <p className="text-gray-300 text-lg md:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed">
            Explore my creative and technically advanced projects, each built with 
            <span className="text-purple-400 font-semibold"> precision</span>, 
            <span className="text-blue-400 font-semibold"> innovation</span>, and a strong focus on 
            <span className="text-green-400 font-semibold"> user experience</span>.
          </p>
        </div>

        {/* فلاتر المشاريع */}
        <div className="filters-container flex flex-wrap justify-center gap-3 md:gap-4 mb-12 md:mb-16">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => handleFilterChange(filter.id)}
              className={`
                filter-btn group relative px-4 py-2 md:px-6 md:py-3 rounded-full
                text-sm md:text-base font-semibold transition-all duration-300
                backdrop-blur-sm border
                ${activeFilter === filter.id 
                  ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-500/25' 
                  : 'bg-gray-800/50 text-gray-300 border-gray-600 hover:bg-purple-600/20 hover:border-purple-500/50 hover:text-white'
                }
              `}
            >
              <span className="mr-2 text-lg transition-transform duration-300 group-hover:scale-110">
                {filter.icon}
              </span>
              {filter.label}
              
              {/* تأثير الوهج */}
              {activeFilter === filter.id && (
                <div className="absolute inset-0 rounded-full bg-purple-400/20 blur-md -z-10" />
              )}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="flex space-x-2">
              <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
              <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}

        {/* شبكة المشاريع - محسنة للأجهزة */}
        {!isLoading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:gap-10">
            {filteredProjects.map((project, index) => (
              <div
                key={`${project.title}-${activeFilter}`}
                className="project-card group relative bg-gradient-to-br from-gray-900/90 to-gray-800/90 rounded-xl lg:rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.01] lg:hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/15 cursor-pointer border border-gray-700/50 hover:border-purple-500/40"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                onClick={() => handleImageClick(project.img)}
              >
                {/* الصورة */}
                <div className="relative overflow-hidden">
                  <img
                    src={project.img}
                    alt={project.title}
                    className="w-full h-48 sm:h-56 lg:h-64 xl:h-72 object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
                    loading="lazy"
                  />
                  
                  {/* تأثير التدرج */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-500" />
                  
                  {/* أيقونة التكبير */}
                  <div className={`
                    absolute top-3 right-3 w-8 h-8 lg:w-10 lg:h-10 bg-white/10 backdrop-blur-sm rounded-full 
                    flex items-center justify-center transition-all duration-300
                    ${hoveredCard === index ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}
                  `}>
                    <svg className="w-4 h-4 lg:w-5 lg:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </div>

                {/* محتوى الكارت */}
                <div className="absolute inset-0 flex flex-col justify-end p-4 lg:p-6">
                  <div className={`
                    transition-all duration-500 transform
                    ${hoveredCard === index ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-95'}
                  `}>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-1 lg:mb-2">
                      {project.title}
                    </h3>
                    <p className="text-purple-300 text-xs sm:text-sm lg:text-base font-medium mb-2 lg:mb-3">
                      {project.tech}
                    </p>
                    
                    {/* الوصف - يظهر فقط على الشاشات الكبيرة */}
                    <p className={`
                      hidden lg:block text-gray-300 text-sm leading-relaxed mb-3
                      transition-all duration-500
                      ${hoveredCard === index ? 'opacity-100 max-h-16' : 'opacity-0 max-h-0'}
                      overflow-hidden
                    `}>
                      {project.description}
                    </p>

                    {/* الروابط */}
                    <div className={`
                      flex gap-2 lg:gap-3 transition-all duration-500
                      ${hoveredCard === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}
                    `}>
                      {project.link !== '#' && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 lg:px-4 lg:py-2 bg-purple-600 hover:bg-purple-700 text-white text-xs lg:text-sm font-medium rounded-md lg:rounded-lg transition-colors duration-300"
                          onClick={(e) => e.stopPropagation()}
                        >
                          Live Demo
                        </a>
                      )}
                      {project.github !== '#' && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 lg:px-4 lg:py-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white text-xs lg:text-sm font-medium rounded-md lg:rounded-lg transition-all duration-300"
                          onClick={(e) => e.stopPropagation()}
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* تأثير الوهج المخفف */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl lg:rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-10" />
              </div>
            ))}
          </div>
        )}

        {/* رسالة عدم وجود مشاريع */}
        {!isLoading && filteredProjects.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl md:text-2xl font-semibold text-gray-400 mb-2">
              No projects found
            </h3>
            <p className="text-gray-500">
              Try selecting a different filter or check back later for new projects.
            </p>
          </div>
        )}
      </div>

      {/* عرض الصورة كاملة الشاشة */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-black/95 flex justify-center items-center z-50 p-4 backdrop-blur-sm"
          onClick={() => setFullscreenImage(null)}
        >
          <div className="relative max-w-full max-h-full">
            {/* أزرار التحكم */}
            <div className="absolute -top-12 right-0 flex gap-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  // تحميل الصورة
                  const link = document.createElement('a');
                  link.download = 'project-image.jpg';
                  link.href = fullscreenImage;
                  link.click();
                }}
                className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors duration-300"
                aria-label="Download image"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </button>
              <button
                onClick={() => setFullscreenImage(null)}
                className="w-10 h-10 bg-white/10 hover:bg-red-500/20 rounded-full flex items-center justify-center transition-colors duration-300 text-white hover:text-red-400"
                aria-label="Close fullscreen"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* الصورة */}
            <img
              src={fullscreenImage}
              alt="Fullscreen project view"
              className="max-w-full max-h-[85vh] rounded-xl shadow-2xl animate-[zoomFade_0.5s_ease-out_forwards] opacity-0"
              style={{
                animation: 'zoomFade 0.5s ease-out forwards'
              }}
            />
          </div>
        </div>
      )}

      {/* CSS للأنيميشن */}
      <style jsx>{`
        @keyframes zoomFade {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </section>
  );
};

export default AppShowcase;