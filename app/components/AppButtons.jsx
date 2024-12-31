import React from 'react';
import { FaGooglePlay, FaAppStore, FaGlobe } from "react-icons/fa"; // Import icons

const AppButtons = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
      {/* Play Store Button */}
      <button
        className="bg-red-600 text-black dark:text-white px-6 py-2 flex items-center space-x-2 hover:bg-[#e4e4e4] hover:text-black hover:border-black border-2"
        style={{
          clipPath:
            "polygon(10% 0%, 99% 0%, 100% 70%, 100% 70%, 90% 100%, 1% 100%, 0% 30%)",
          borderRadius: "5px",
          border: "1px solid red",
        }}
        onClick={() => window.open("https://play.google.com/store/apps", "_blank")}
      >
        <FaGooglePlay size={20} />
        <span>Play Store</span>
      </button>

      {/* App Store Button */}
      <button
        className="bg-red-600 text-black dark:text-white px-6 py-2 flex items-center space-x-2 hover:bg-[#e4e4e4] hover:text-black hover:border-black border-2"
        style={{
          clipPath:
            "polygon(10% 0%, 99% 0%, 100% 70%, 100% 70%, 90% 100%, 1% 100%, 0% 30%)",
          borderRadius: "5px",
          border: "1px solid red",
        }}
        onClick={() => window.open("https://apps.apple.com", "_blank")}
      >
        <FaAppStore size={20} />
        <span>App Store</span>
      </button>

      {/* Web App Button */}
      <button
        className="bg-red-600 text-black dark:text-white px-6 py-2 flex items-center space-x-2 hover:bg-[#e4e4e4] hover:text-black hover:border-black border-2"
        style={{
          clipPath:
            "polygon(10% 0%, 99% 0%, 100% 70%, 100% 70%, 90% 100%, 1% 100%, 0% 30%)",
          borderRadius: "5px",
          border: "1px solid red",
        }}
        onClick={() => window.open("/web-app", "_self")}
      >
        <FaGlobe size={20} />
        <span>Web App</span>
      </button>
    </div>
  );
};

export default AppButtons;
