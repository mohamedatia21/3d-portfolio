import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AppShowcase = () => {
  const sectionRef = useRef(null);
  const rydeRef = useRef(null);
  const newProjectRef = useRef(null);
  const libraryRef = useRef(null);
  const ycDirectoryRef = useRef(null);

  const [fullscreenImage, setFullscreenImage] = useState(null);

  useGSAP(() => {
    gsap.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 });

    const cards = [rydeRef.current, newProjectRef.current, libraryRef.current, ycDirectoryRef.current];

    cards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3 * (index + 1),
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
          },
        }
      );
    });
  }, []);

  return (
    <div id="work" ref={sectionRef} className="app-showcase py-12 bg-black text-white">
      <div className="w-full max-w-6xl mx-auto px-4">
        
        {/* Section Title */}
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-left flex items-center gap-3 group">
            <span className="text-purple-400 text-4xl transform transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
              🚀
            </span>
            Featured Projects
          </h2>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl leading-relaxed">
            Explore some of my most creative and technically advanced projects, each built with 
            precision, innovation, and a strong focus on user experience.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Project 1 */}
          <div
            ref={rydeRef}
            className="project relative bg-[#3B1E54] rounded-3xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:scale-[1.03]"
            onClick={() => setFullscreenImage("/images/porttfolio.jpg")}
          >
            <div className="image-wrapper flex justify-center items-center">
              <img
                src="/images/porttfolio.jpg"
                alt="3D Portfolio Experience"
                className="w-full h-56 object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center text-center p-4">
              <h2 className="text-3xl font-extrabold text-white drop-shadow-lg mb-2 tracking-wide">
                🚀 3D Portfolio
              </h2>
              <h3 className="text-purple-300 text-lg font-medium">
                React • Three.js • GSAP
              </h3>
            </div>
          </div>

          {/* Project 2 */}
          <div
            ref={newProjectRef}
            className="project relative bg-[#3B1E54] rounded-3xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:scale-[1.03]"
            onClick={() => setFullscreenImage("/images/thecupegame.jpg")}
          >
            <div className="image-wrapper flex justify-center items-center">
              <img
                src="/images/thecupegame.jpg"
                alt="The Cupe Game"
                className="w-full h-56 object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center text-center p-4">
              <h2 className="text-3xl font-extrabold text-white drop-shadow-lg mb-2 tracking-wide">
                🎮 The Cupe Game
              </h2>
              <h3 className="text-purple-300 text-lg font-medium">
                Puzzle • Logic • Fun
              </h3>
            </div>
          </div>

          {/* Project 3 */}
          <div
            ref={libraryRef}
            className="project relative bg-[#3B1E54] rounded-3xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:scale-[1.03]"
            onClick={() => setFullscreenImage("/images/coloron.jpg")}
          >
            <div className="image-wrapper flex justify-center items-center">
              <img
                src="/images/coloron.jpg"
                alt="Coloron Game"
                className="w-full h-56 object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center text-center p-4">
              <h2 className="text-3xl font-extrabold text-white drop-shadow-lg mb-2 tracking-wide">
                🎨 Coloron Game
              </h2>
              <h3 className="text-purple-300 text-lg font-medium">
                Fun • Interactive • Colorful
              </h3>
            </div>
          </div>

          {/* Project 4 */}
          <div
            ref={ycDirectoryRef}
            className="project relative bg-[#3B1E54] rounded-3xl shadow-lg overflow-hidden group transition-all duration-300 hover:shadow-2xl hover:scale-[1.03]"
            onClick={() => setFullscreenImage("/images/3Dcard.jpg")}
          >
            <div className="image-wrapper flex justify-center items-center">
              <img
                src="/images/3Dcard.jpg"
                alt="3D Card Animation"
                className="w-full h-56 object-contain transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-center items-center text-center p-4">
              <h2 className="text-3xl font-extrabold text-white drop-shadow-lg mb-2 tracking-wide">
                🃏 3D Card Animation
              </h2>
              <h3 className="text-purple-300 text-lg font-medium">
                GSAP • Three.js • Motion
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Image */}
      {fullscreenImage && (
        <div
          className="fixed inset-0 bg-black/90 flex justify-center items-center z-50 cursor-pointer"
          onClick={() => setFullscreenImage(null)}
        >
          <img
            src={fullscreenImage}
            alt="Fullscreen Project"
            className="max-w-4xl max-h-[90vh] rounded-xl shadow-2xl transition-transform duration-500"
          />
        </div>
      )}
    </div>
  );
};

export default AppShowcase;