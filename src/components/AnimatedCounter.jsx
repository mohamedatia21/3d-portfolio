import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import { counterItems } from "../constants";

gsap.registerPlugin(ScrollTrigger);

const AnimatedCounter = () => {
  const counterRef = useRef(null);
  const countersRef = useRef([]);

  useGSAP(() => {
    countersRef.current.forEach((counter, index) => {
      const numberElement = counter.querySelector(".counter-number");
      const item = counterItems[index];

      gsap.set(numberElement, { innerText: "0" });

      gsap.to(numberElement, {
        innerText: item.value,
        duration: 2.5,
        ease: "power2.out",
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: counter,
          start: "top 80%",
        },
        onComplete: () => {
          numberElement.textContent = `${item.value}${item.suffix}`;
        },
      });

      // إضافة حركة دخول للكروت نفسها
      gsap.fromTo(
        counter,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 85%",
          },
        }
      );
    });
  }, []);

  return (
    <div
      id="counter"
      ref={counterRef}
      className="padding-x-lg xl:mt-0 mt-20"
    >
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
      >
        {counterItems.map((item, index) => (
          <div
            key={index}
            ref={(el) => el && (countersRef.current[index] = el)}
            className="bg-gradient-to-br from-purple-700 to-indigo-900 rounded-2xl p-8 flex flex-col justify-center items-center text-center shadow-lg transform hover:scale-105 transition-all duration-500"
          >
            <div className="counter-number text-white text-5xl font-bold mb-3">
              0{item.suffix}
            </div>
            <div className="text-gray-300 text-lg font-medium">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedCounter;
