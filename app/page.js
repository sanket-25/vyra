"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaGooglePlay, FaAppStore, FaGlobe } from "react-icons/fa";
import gsap from "gsap";

export default function Home() {
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const onScroll = () => {
        const scrollPosition = window.scrollY;
        document.body.style.backgroundColor = scrollPosition > window.innerHeight * 0.1 ? "black" : "white";
      };
      window.addEventListener("scroll", onScroll);
      return () => window.removeEventListener("scroll", onScroll);
    }
  }, []);

  const gridItems = Array.from({ length: 40 });

  return (
    <div className="relative w-full min-h-screen">
      {/* Grid Background */}
      <div
        className="grid grid-cols-4 gap-0 min-h-screen"
        style={{ gridTemplateRows: "repeat(auto-fill, minmax(100px, 1fr))" }}
      >
        {gridItems.map((_, index) => (
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
        {/* ...buttons */}
      </div>

      {/* Videos */}
      <div
        className={`absolute inset-x-0 top-[100vh] flex flex-col items-center space-y-4 ${
          isAnimating ? "opacity-100 transition-opacity duration-1000" : "opacity-0"
        }`}
      >
        <video
          src="/videos/earth.mp4"
          autoPlay
          loop
          muted
          className="w-full aspect-video object-cover rounded-lg shadow"
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
