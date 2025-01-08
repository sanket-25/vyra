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
            className={`border-r border-b border-[#9e9e9e] ${index % 4 === 3 ? "border-r-0" : ""} ${index >= 96 ? "border-b-0" : ""
              } aspect-square`}
          />
        ))}
      </div>

      {/* Text Overlay */}
      <div
        className={`absolute inset-0 flex flex-col md:flex-row justify-start -mt-10 top-[20vh] ${isAnimating ? "opacity-100 transition-opacity duration-1000" : "opacity-0"
          }`}
      >
        <div className="w-full md:w-1/2 h-100">
          <h1
            className="text-[7vw] font-bold leading-none tracking-wider mt-8 ml-10 text-left text-black"
          >
            <p className="chonburi-regular font-900">
              EXPLORE THE RACE WITHIN YOU
            </p>
          </h1>
        </div>
        <div className="w-full md:w-1/2 h-100">
          <img
            src="/images/appDemo.png"
            alt="Explore the Race"
            className=""
          />
        </div>
      </div>


      {/* Videos */}
      <div
        className={`absolute inset-x-0 top-[100vh] flex flex-col items-center space-y-4 ${isAnimating ? "opacity-100 transition-opacity duration-1000" : "opacity-0"
          }`}
      >
        <div className="relative w-full aspect-video">
          <video
            src="/videos/earth.mp4"
            autoPlay
            loop
            muted
            className="w-full h-full object-cover rounded-lg shadow"
          />
          <h2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl font-bold">
            AI Based Training Analysis and Social Networking app for Athletes
          </h2>
        </div>
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
