"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaGooglePlay, FaAppStore } from "react-icons/fa";
import gsap from "gsap";
import Image from "next/image";

export default function Home() {
  const [isAnimating, setIsAnimating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setIsAnimating(true), 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isAnimating) {
      // Hero animations - simplified
      gsap.from(".hero-title", { 
        opacity: 0, 
        y: 30, 
        duration: 1, 
        delay: 0.3 
      });
      gsap.from(".hero-tagline", { 
        opacity: 0, 
        y: 20, 
        duration: 1, 
        delay: 0.5 
      });
      gsap.from(".cta-button", { 
        opacity: 0, 
        y: 15, 
        duration: 0.7, 
        delay: 0.8,
        stagger: 0.2
      });
      
      // Features animations - simplified
      gsap.from(".feature-card", { 
        opacity: 0, 
        y: 30, 
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".features-section",
          start: "top 80%"
        }
      });
    }
  }, [isAnimating]);

  return (
    <div className="relative w-full min-h-screen bg-white text-gray-800">
      {/* Hero Section with Background Video */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video with Light Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-opacity-40 z-10"></div>
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            className="absolute w-full h-full object-cover z-0"
          >
            <source src="/videos/run.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="container mx-auto px-6 relative z-20 text-center">
          <h1 className="hero-title text-6xl md:text-8xl font-bold mb-4 tracking-tight">
            <span className="text-red-600">VY</span>
            <span className="text-gray-800">RA</span>
          </h1>
          <p className="hero-tagline text-xl md:text-2xl font-normal mb-10 tracking-wide text-gray-700">
            Explore the race within you
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
            <button className="cta-button bg-red-600 text-white px-6 py-2.5 rounded font-medium flex items-center transition hover:bg-red-700 w-48">
              <FaGooglePlay className="mr-2" /> Google Play
            </button>
            <button className="cta-button bg-transparent border border-gray-600 text-gray-800 px-6 py-2.5 rounded font-medium flex items-center transition hover:bg-gray-100 w-48">
              <FaAppStore className="mr-2" /> App Store
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-0 right-0 flex justify-center z-20">
          <div className="animate-bounce w-8 h-8 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-12 text-gray-800">Race-Ready Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="feature-card p-5 bg-white shadow-sm rounded">
              <div className="w-12 h-12 bg-red-100 flex items-center justify-center mb-4 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Real-time Race Tracking</h3>
              <p className="text-gray-600">Track your performance metrics in real-time with advanced GPS and biometric monitoring.</p>
            </div>
            
            <div className="feature-card p-5 bg-white shadow-sm rounded">
              <div className="w-12 h-12 bg-red-100 flex items-center justify-center mb-4 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Global Athlete Network</h3>
              <p className="text-gray-600">Connect with elite athletes and racing enthusiasts from around the world.</p>
            </div>
            
            <div className="feature-card p-5 bg-white shadow-sm rounded">
              <div className="w-12 h-12 bg-red-100 flex items-center justify-center mb-4 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-800">Advanced Performance Analytics</h3>
              <p className="text-gray-600">Gain insights with AI-powered analysis of your race patterns, strengths, and areas for improvement.</p>
            </div>
          </div>
        </div>
      </div>

      {/* App Screenshots */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-12 text-gray-800">Experience VYRA</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <Image 
                  src="/images/app/home.jpg" 
                  width={320}
                  height={640}
                  alt="VYRA App Screenshot - Dashboard"
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            <div className="text-center mt-4 md:mt-0">
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <Image 
                  src="/images/app/run.jpg" 
                  width={320}
                  height={640}
                  alt="VYRA App Screenshot - Race Tracking"
                  className="w-full h-auto"
                />
              </div>
            </div>
            
            <div className="text-center mt-4 md:mt-0">
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <Image 
                  src="/images/app/profile.jpg" 
                  width={320}
                  height={640}
                  alt="VYRA App Screenshot - Performance Analytics"
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* User Reviews */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center mb-12 text-gray-800">Athlete Testimonials</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "Michael T., Marathon Runner",
                review: "VYRA has transformed my training regimen. The detailed metrics and pace analysis have helped shave minutes off my marathon time.",
                rating: 5
              },
              {
                name: "Sarah J., Triathlete",
                review: "As a professional triathlete, I need comprehensive analytics. VYRA delivers with its multi-sport tracking and community challenges.",
                rating: 5
              },
              {
                name: "David R., Cycling Enthusiast",
                review: "The global riding community on VYRA has connected me with riders across continents. The virtual races keep me motivated year-round.",
                rating: 4
              }
            ].map((review, index) => (
              <div key={index} className="bg-white p-5 shadow-sm rounded">
                <div className="flex mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${i < review.rating ? 'text-red-500' : 'text-gray-300'}`} viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-600 mb-3 text-sm">{review.review}</p>
                <p className="font-medium text-gray-800 text-sm">{review.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Download CTA */}
      <div className="py-12 bg-gray-100">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-semibold mb-4">Ready to Discover Your Racing Potential?</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Join elite athletes and weekend warriors who have unlocked their true racing potential with VYRA.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="bg-red-600 text-white px-6 py-2.5 rounded font-medium flex items-center transition hover:bg-red-700">
              <FaGooglePlay className="mr-2" /> Download on Google Play
            </button>
            <button className="bg-gray-800 text-white px-6 py-2.5 rounded font-medium flex items-center transition hover:bg-gray-900">
              <FaAppStore className="mr-2" /> Download on App Store
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white text-gray-600 py-8 border-t border-gray-200">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-gray-800 font-semibold mb-4">
                <span className="text-red-600">VY</span><span className="text-gray-800">RA</span>
              </h3>
              <p className="mb-4 text-sm">Explore the race within you. Premium sports tracking for elite athletes and enthusiasts alike.</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-red-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-red-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-red-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-gray-800 font-semibold mb-4 text-sm">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-red-600">Home</a></li>
                <li><a href="#" className="hover:text-red-600">Features</a></li>
                <li><a href="#" className="hover:text-red-600">Testimonials</a></li>
                <li><a href="#" className="hover:text-red-600">Download</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-gray-800 font-semibold mb-4 text-sm">Sports</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-red-600">Running</a></li>
                <li><a href="#" className="hover:text-red-600">Cycling</a></li>
                <li><a href="#" className="hover:text-red-600">Triathlon</a></li>
                <li><a href="#" className="hover:text-red-600">Swimming</a></li>
                <li><a href="#" className="hover:text-red-600">Adventure Racing</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-gray-800 font-semibold mb-4 text-sm">Support</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-red-600">Help Center</a></li>
                <li><a href="#" className="hover:text-red-600">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-red-600">Terms of Service</a></li>
                <li><a href="#" className="hover:text-red-600">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-6 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} VYRA. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}