import { abilities } from "../constants";

const FeatureCards = () => (
  <div className="w-full px-6 md:px-10">
    <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {abilities.map(({ imgPath, title, desc }) => (
        <div
          key={title}
          className="card-border rounded-xl p-8 flex flex-col items-start gap-4 bg-[#1c1c1c] hover:scale-105 transition-transform"
        >
          <div className="size-14 flex items-center justify-center rounded-full bg-purple-600">
            <img src={imgPath} alt={title} className="w-8 h-8" />
          </div>
          <h3 className="text-white text-2xl font-semibold mt-2">{title}</h3>
          <p className="text-gray-400 text-lg">{desc}</p>
        </div>
      ))}
    </div>
  </div>
);

export default FeatureCards;
