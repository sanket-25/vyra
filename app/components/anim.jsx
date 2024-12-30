"use client";

import { useEffect, useState } from "react";
import { animatePageIn } from "../../utils/animations";

export default function Template({ children }) {
  const [showAnimation, setShowAnimation] = useState(true);

  useEffect(() => {
    // Trigger the animation
    animatePageIn();

    // Set a timeout to hide the animation and show the content
    const timer = setTimeout(() => {
      setShowAnimation(false); // Hide animation after completion
    }, 1500); // Match the animation duration

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);

  return (
    <>
      {/* Animation banners */}
      {showAnimation && (
        <div>
          <div
            id="banner-1"
            className="min-h-screen bg-red-700 z-10 fixed top-0 left-0 w-1/4"
          />
          <div
            id="banner-2"
            className="min-h-screen bg-red-700 z-10 fixed top-0 left-1/4 w-1/4"
          />
          <div
            id="banner-3"
            className="min-h-screen bg-red-700 z-10 fixed top-0 left-2/4 w-1/4"
          />
          <div
            id="banner-4"
            className="min-h-screen bg-red-700 z-10 fixed top-0 left-3/4 w-1/4"
          />
        </div>
      )}

      {/* Page content */}
      <div
        className={`transition-opacity duration-500 ${
          showAnimation ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
    </>
  );
}