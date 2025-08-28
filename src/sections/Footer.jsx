import { socialImgs } from "../constants";

const Footer = () => {
  return (
    <footer className="w-full bg-black text-gray-300 py-6 px-5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Terms */}
        <div className="text-center md:text-left">
          <p className="hover:text-purple-400 cursor-pointer">
            Terms & Conditions
          </p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 justify-center">
          {socialImgs.map((socialImg, index) => (
            <a
              key={index}
              href={socialImg.link || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-purple-600 transition"
            >
              <img
                src={socialImg.imgPath}
                alt="social icon"
                className="w-5 h-5"
              />
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-center md:text-right">
          <p>
            © {new Date().getFullYear()}{" "}
            <span className="text-purple-500 font-semibold">
              Mohamed Attia
            </span>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
