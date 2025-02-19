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
      <p class="text-[0px]">Vyra: The Ultimate AI-Powered Sports Platform for Athletes

Train Smarter, Compete Harder, Connect Faster!

Welcome to Vyra, the ultimate AI-driven training analysis and social networking platform designed exclusively for athletes. Whether you're a sprinter aiming for lightning-fast starts, a powerlifter perfecting your deadlift, or an aspiring athlete looking to connect with top-tier coaches and sponsors, Vyra has got you covered!

Gone are the days of guessing if your form is correct or spending hours searching for the right training plan. With Vyra’s AI-powered analysis, dynamic social networking, and interactive community, you can level up your game, showcase your achievements, and build connections that matter.

🚀 What Makes Vyra a Game-Changer?

📹 AI-Powered Video Analysis

Let’s be real—everyone thinks they have the perfect form until they actually see themselves on video. That’s where Vyra’s AI Video Analysis steps in!

Simply upload your workout or sports performance video, and our advanced system (built on complex mathematics, not just AI wizardry) will analyze your technique with pinpoint accuracy.

Get instant feedback on your form, movement efficiency, and areas for improvement.

Improve your speed, agility, balance, and power like never before!

🤖 Your AI Coach (Because Robots Are Smarter Than Your Gym Bro)

Vyra isn’t just about analyzing your movements; we also help plan your training. Our AI Coach tailors workout routines and practice sessions based on your strengths, weaknesses, and goals.

Need a custom training timetable? Done.

Want to optimize your workout schedule? Got you.

Looking for an AI that won’t ghost you like your personal trainer? You’re in luck!

🏆 Compete, Win, and Get Featured

Athletes who crush competitions don’t just win medals; they get the spotlight in Vyra’s Hall of Fame!

Our app highlights top-performing athletes, rising stars, and biggest upsets in the sports world.

Compete in challenges, participate in local sports events, and climb the leaderboards.

📢 Social Networking for Athletes (Because Instagram Won’t Analyze Your Deadlift)

Vyra isn’t just about training; it’s about building connections in the sports world. Think of it as a social media platform, but exclusively for athletes, coaches, and fitness enthusiasts.

Follow/Unfollow: Stay updated on the latest training trends, workout routines, and competitions.

Post, Like, and Comment: Share your achievements, celebrate wins, and get feedback from professionals.

Personalized Profiles: Showcase your sports career, achievements, and training stats.

In-App Messaging: Chat with other athletes, discuss strategies, and connect with coaches.

👥 Coaches, This One’s for You!

We didn’t forget about the masterminds behind every great athlete—the coaches. Vyra gives coaches the tools they need to manage and develop top-tier talent:

Track athlete performance with real-time stats and data.

Monitor attendance and workout schedules.

Provide direct feedback through video analysis and messaging.

Connect with sponsors looking to invest in promising talents.

🌍 Explore Local Sports Events & Clubs

Forget searching through endless event listings—Vyra brings the best sports events and clubs directly to you!

Find nearby sports events tailored to your discipline.

Join clubs that match your interests and training level.

Compete in exciting challenges to gain recognition in your sport.

💰 Sponsorship Opportunities (Because Great Athletes Deserve Great Support)

Looking to take your career to the next level? Vyra helps athletes connect with sponsors who are eager to support rising talent. Build your profile, showcase your progress, and attract sponsors who believe in your potential.

🌟 Why Choose Vyra?

✅ Train smarter with AI-driven workout analysis.
✅ Connect with top athletes, coaches, and sponsors.
✅ Compete, win, and get featured in the sports community.
✅ Stay motivated with real-time feedback and coaching.
✅ Build a strong sports profile that showcases your achievements.
✅ Explore local events and clubs to stay active and engaged.
✅ Experience an exclusive sports social network built for performance-driven individuals.

So, are you ready to take your training, competition, and networking to the next level? Join Vyra today and become the athlete you were meant to be!

📲 Download Vyra on the Play Store & App Store Soon!</p>

    </div>
  );
}
