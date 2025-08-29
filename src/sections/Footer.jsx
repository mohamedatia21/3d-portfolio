import { socialImgs } from "../constants";
import { useState } from "react";

const Footer = () => {
  const [hoveredSocial, setHoveredSocial] = useState(null);

  // قائمة الروابط السريعة
  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-gradient-to-t from-black via-gray-900 to-black text-gray-300 relative overflow-hidden">
      {/* خط مضيء في الأعلى */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
      
      {/* تأثير الخلفية */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent" />
      
      <div className="relative z-10 py-8 md:py-12 px-4 sm:px-6 md:px-8 lg:px-10">
        <div className="max-w-7xl mx-auto">
          
          {/* الجزء الرئيسي */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-8 md:mb-12">
            
            {/* معلومات شخصية */}
            <div className="lg:col-span-2 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                Mohamed <span className="text-purple-400">Attia</span>
              </h3>
              <p className="text-gray-400 leading-relaxed mb-6 max-w-md mx-auto md:mx-0">
                Full-stack developer passionate about creating innovative digital experiences. 
                Let's build something amazing together!
              </p>
              
              {/* أزرار التواصل */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <a 
                  href="#contact"
                  className="inline-flex items-center justify-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
                >
                  Get In Touch
                </a>
                <a 
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 border border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white font-medium rounded-lg transition-all duration-300 hover:scale-105"
                >
                  Download CV
                </a>
              </div>
            </div>

            {/* روابط سريعة */}
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
              <nav className="space-y-3">
                {quickLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="block text-gray-400 hover:text-purple-400 hover:translate-x-1 transition-all duration-300"
                  >
                    {link.name}
                  </a>
                ))}
              </nav>
            </div>

            {/* معلومات إضافية */}
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold text-white mb-4">Connect</h4>
              <div className="space-y-3">
                <p className="text-gray-400">
                  <span className="inline-block w-5">📧</span>
                  <a href="mailto:contact@mohamedattia.dev" className="hover:text-purple-400 transition-colors">
                    contact@mohamedattia.dev
                  </a>
                </p>
                <p className="text-gray-400">
                  <span className="inline-block w-5">📍</span>
                  Port Said, Egypt
                </p>
                <p className="text-gray-400">
                  <span className="inline-block w-5">⏰</span>
                  Available for freelance
                </p>
              </div>
            </div>
          </div>

          {/* خط فاصل */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-8" />

          {/* الجزء السفلي */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* حقوق النشر */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <p className="text-sm md:text-base text-gray-400">
                © {new Date().getFullYear()}{" "}
                <span className="text-purple-400 font-semibold hover:text-purple-300 transition-colors">
                  Mohamed Attia
                </span>
                . All rights reserved.
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Built with React & Tailwind CSS
              </p>
            </div>

            {/* أيقونات التواصل الاجتماعي */}
            <div className="flex items-center gap-4 order-1 lg:order-2">
              {socialImgs.map((socialImg, index) => (
                <a
                  key={index}
                  href={socialImg.link || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    group relative w-12 h-12 flex items-center justify-center 
                    bg-gray-800 hover:bg-purple-600 rounded-full 
                    transition-all duration-300 hover:scale-110 hover:rotate-6
                    ${hoveredSocial === index ? 'shadow-lg shadow-purple-500/25' : ''}
                  `}
                  onMouseEnter={() => setHoveredSocial(index)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  aria-label={`Visit ${socialImg.name || 'social profile'}`}
                >
                  <img
                    src={socialImg.imgPath}
                    alt={`${socialImg.name || 'Social'} icon`}
                    className="w-5 h-5 md:w-6 md:h-6 transition-all duration-300 group-hover:scale-110 group-hover:brightness-110"
                    loading="lazy"
                  />
                  
                  {/* تأثير الوهج */}
                  <div className="absolute inset-0 rounded-full bg-purple-400/20 scale-0 group-hover:scale-100 transition-transform duration-300" />
                </a>
              ))}
            </div>

            {/* الشروط والأحكام + زر العودة للأعلى */}
            <div className="flex items-center gap-4 order-3">
              <button
                onClick={() => {/* Add terms modal logic */}}
                className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
              >
                Terms & Conditions
              </button>
              
              <span className="text-gray-600">|</span>
              
              <button
                onClick={() => {/* Add privacy modal logic */}}
                className="text-sm text-gray-400 hover:text-purple-400 transition-colors"
              >
                Privacy Policy
              </button>
              
              <button
                onClick={scrollToTop}
                className="ml-4 w-10 h-10 flex items-center justify-center bg-gray-800 hover:bg-purple-600 rounded-full transition-all duration-300 hover:scale-110 group"
                aria-label="Back to top"
              >
                <svg 
                  className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              </button>
            </div>
          </div>

          {/* رسالة خفية للمطورين */}
          <div className="mt-8 text-center">
            <p className="text-xs text-gray-600 opacity-50 hover:opacity-100 transition-opacity">
              Made with ☕ and lots of ☕
            </p>
          </div>
        </div>
      </div>

      {/* تأثير الجسيمات المتحركة (اختياري) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-2 -right-2 w-4 h-4 bg-purple-500/20 rounded-full animate-ping" />
        <div className="absolute top-1/2 -left-2 w-2 h-2 bg-blue-500/20 rounded-full animate-pulse" />
        <div className="absolute -bottom-2 left-1/3 w-3 h-3 bg-purple-400/10 rounded-full animate-bounce" />
      </div>
    </footer>
  );
};

export default Footer;