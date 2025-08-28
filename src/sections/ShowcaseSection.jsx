import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const [fullscreenImage, setFullscreenImage] = useState(null);

  const projects = [
    { img: "/images/porttfolio.jpg", title: "🚀 3D Portfolio", tech: "React • Three.js • GSAP" },
    { img: "/images/thecupegame.jpg", title: "🎮 The Cupe Game", tech: "Puzzle • Logic • Fun" },
    { img: "/images/coloron.jpg", title: "🎨 Coloron Game", tech: "Fun • Interactive • Colorful" },
    { img: "/images/3Dcard.jpg", title: "🃏 3D Card Animation", tech: "GSAP • Three.js • Motion" },
  ];

  useGSAP(() => {
    gsap.fromTo(
      ".project-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom-=100",
        },
      }
    );
  }, []);

  return (
    <div id="work" ref={sectionRef} className="app-showcase py-12 bg-black text-white">
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Title */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-4 flex items-center gap-3 justify-center md:justify-start group">
            <span className="text-purple-400 text-4xl transform transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
              🚀
            </span>
            Featured Projects
          </h2>
          <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed mx-auto md:mx-0">
            Explore some of my most creative and technically advanced projects, each built with 
            precision, innovation, and a strong focus on user experience.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card relative bg-[#3B1E54] rounded-2xl sm:rounded-3xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:scale-[1.03] cursor-pointer"
              onClick={() => setFullscreenImage(project.img)}
            >
              <div className="flex justify-center items-center">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-full h-52 sm:h-64 md:h-72 object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center text-center p-4">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white drop-shadow-lg mb-2 tracking-wide">
                  {project.title}
                </h2>
                <h3 className="text-purple-300 text-sm sm:text-lg font-medium">
                  {project.tech}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Image */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-black/90 flex justify-center items-center z-50 px-4"
        >
          <div className="relative">
            {/* Close Button */}
            <button
              onClick={() => setFullscreenImage(null)}
              className="absolute top-4 right-4 text-white text-3xl hover:text-purple-400 transition"
            >
              ✕
            </button>
            <img
              src={fullscreenImage}
              alt="Fullscreen Project"
              className="max-w-full max-h-[85vh] rounded-xl shadow-2xl scale-90 opacity-0 animate-[zoomFade_0.5s_forwards]"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AppShowcase;

