import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { testimonials } from "../constants";
import TitleHeader from "../components/TitleHeader";
import GlowCard from "../components/GlowCard";

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  useGSAP(() => {
    gsap.fromTo(
      ".testimonial-card",
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.3,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "#testimonials",
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section id="testimonials" className="flex-center section-padding bg-black text-white">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="What People Say About Me?"
          sub="⭐ Customer feedback highlights"
        />

        <div className="lg:columns-3 md:columns-2 columns-1 mt-16 gap-6 space-y-6">
          {testimonials.map((testimonial, index) => (
            <GlowCard
              card={testimonial}
              key={index}
              index={index}
              className="testimonial-card relative group p-6 rounded-2xl shadow-lg 
                         bg-[#1e1e1e] hover:scale-105 transform transition-all duration-500"
            >
              <div className="flex items-center gap-4">
                <div
                  className="w-16 h-16 rounded-full overflow-hidden border-4 
                             border-gradient-to-r from-purple-500 to-pink-500 shadow-md"
                >
                  <img
                    src={testimonial.imgPath}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-lg">{testimonial.name}</p>
                  <p className="text-gray-400 text-sm">{testimonial.mentions}</p>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
