import { logoIconsList } from "../constants";

const LogoIcon = ({ icon }) => {
  return (
    <div className="flex-none flex-center marquee-item">
      <img
        src={icon.imgPath}
        alt={icon.name}
        className="w-20 h-20 object-contain md:w-28 md:h-28"
      />
    </div>
  );
};

const LogoShowcase = () => (
  <div className="relative overflow-hidden md:my-20 my-10">
    {/* Gradient edges for fading effect */}
    <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-black to-transparent z-10" />
    <div className="absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-black to-transparent z-10" />

    {/* Marquee container */}
    <div className="flex gap-10 animate-marquee hover:[animation-play-state:paused]">
      {[...logoIconsList, ...logoIconsList].map((icon, index) => (
        <LogoIcon key={index} icon={icon} />
      ))}
    </div>
  </div>
);

export default LogoShowcase;
