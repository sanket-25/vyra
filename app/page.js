"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaGooglePlay, FaAppStore, FaGlobe } from "react-icons/fa"; // Import icons

export default function Home() {
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsAnimating(true); // Trigger animation after the component is mounted
  }, []);

  return (
    <div className="relative w-full min-h-screen">
      {/* Grid Background */}
      <div
        className="grid grid-cols-4 gap-0 min-h-screen"
        style={{ gridTemplateRows: "repeat(auto-fill, minmax(100px, 1fr))" }}
      >
        {Array.from({ length: 40 }).map((_, index) => (
          <div
            key={index}
            className={`border-r border-b border-[#9e9e9e] ${index % 4 === 3 ? "border-r-0" : ""} ${
              index >= 96 ? "border-b-0" : ""
            } aspect-square`}
          />
        ))}
      </div>

      {/* Text Overlay */}
      <div
        className={`absolute inset-0 flex flex-col justify-start -mt-10 top-[20vh] ${
          isAnimating ? "opacity-100 transition-opacity duration-1000" : "opacity-0"
        }`}
      >
        <h1
          className="text-[7vw] font-bold leading-none tracking-wider text-transparent mt-8 ml-10 text-left"
          style={{
            WebkitTextStroke: "2px var(--stroke-color)",
            textStroke: "2px var(--stroke-color)",
          }}
        >
          <p className="font-claven">
            EXPLORE THE <br />
            RACE WITHIN <br />
            YOU!
          </p>
        </h1>
      </div>

      {/* Buttons */}
      <div
        className={`absolute inset-x-0 flex items-center justify-center space-x-40 mt-[40vh] ${
          isAnimating ? "opacity-100 transition-opacity duration-1000" : "opacity-0"
        }`}
        style={{ top: "40vh", height: "30vh" }}
      >
        <button
          className="bg-red-600 text-black dark:text-white px-6 py-2 flex items-center space-x-2 hover:bg-[#e4e4e4] hover:text-black hover:border-black border-2"
          style={{
            clipPath:
              "polygon(10% 0%, 99% 0%, 100% 70%, 100% 70%, 90% 100%, 1% 100%, 0% 30%)",
            borderRadius: "5px",
            border: "1px solid red",
          }}
          onClick={() => router.push("/page1")}
        >
          <FaGooglePlay size={20} />
          <span>Play Store</span>
        </button>
        <button
          className="bg-red-600 text-black dark:text-white px-6 py-2 flex items-center space-x-2 hover:bg-[#e4e4e4] hover:text-black hover:border-black border-2"
          style={{
            clipPath:
              "polygon(10% 0%, 99% 0%, 100% 70%, 100% 70%, 90% 100%, 1% 100%, 0% 30%)",
            borderRadius: "5px",
            border: "1px solid red",
          }}
          onClick={() => router.push("/page2")}
        >
          <FaAppStore size={20} />
          <span>App Store</span>
        </button>
        <button
          className="bg-red-600 text-black dark:text-white px-6 py-2 flex items-center space-x-2 hover:bg-[#e4e4e4] hover:text-black hover:border-black border-2"
          style={{
            clipPath:
              "polygon(10% 0%, 99% 0%, 100% 70%, 100% 70%, 90% 100%, 1% 100%, 0% 30%)",
            borderRadius: "5px",
            border: "1px solid red",
          }}
          onClick={() => router.push("/page3")}
        >
          <FaGlobe size={20} />
          <span>Web App</span>
        </button>
      </div>

      {/* Videos */}
      <div
        className={`absolute inset-x-0 bottom-[20vh] flex flex-col items-center space-y-4 ${
          isAnimating ? "opacity-100 transition-opacity duration-1000" : "opacity-0"
        }`}
      >
        <div className="flex justify-center space-x-4 w-full px-4">
          <video
            src="assets/start.mp4"
            autoPlay
            loop
            muted
            className="w-[50%] aspect-square object-cover rounded-lg shadow"
          />
          <video
            src="assets/start.mp4"
            autoPlay
            loop
            muted
            className="w-[50%] aspect-square object-cover rounded-lg shadow"
          />
        </div>
        <video
          src="assets/analysis.mp4"
          autoPlay
          loop
          muted
          className="w-full aspect-video object-cover rounded-lg shadow px-4"
        />
        <h1
          className="text-[23vw] font-bold leading-none tracking-wider text-black dark:text-white mt-30"
          style={{
            WebkitTextStroke: "1px #1a1a1a",
            textStroke: "1px #1a1a1a",
          }}
        >
          <div className="font-claven ">V Y R A</div>
        </h1>
      </div>
    </div>
  );
}
