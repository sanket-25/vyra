import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import SocialLinks from "./components/SocialLinks";
import Anim from "../app/components/anim";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "VYRA",
  description: "AI Based Training Analysis and Social Networking app for Athletes",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#e4e4e4] `}
      ><Anim>
          <Navbar />
          <div className="relative flex justify-center">
            {/* <main className="container mx-[5vw] border-l border-r border-b border-[#9e9e9e] max-w-[90vw] mt-[-10]"> */}
            <main className="container mx-[0vw] border-l border-r border-b border-[#9e9e9e] max-w-[100vw] mt-[-0]">
              {children}
            </main>
            {/* <SocialLinks /> */}
          </div>
        </Anim>
      </body>
    </html>
  );
}
