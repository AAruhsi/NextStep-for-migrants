import React, { useContext } from "react";
import background from "../assets/background.png";
import Navbar from "../components/Navbar";
import { UserContext } from "../Context/userContext";
import Page2 from "../components/Page2";
import Page3 from "../components/Page3";
import Page5 from "../components/Page5";
import Footer from "../components/Footer";

export default function HomePage() {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <div className="overflow-hidden w-full">
      <header
        className="min-h-screen w-full bg-cover bg-center flex flex-col"
        style={{ backgroundImage: `url(${background})` }}
      >
        <Navbar />
        <div className="flex-1 flex items-center justify-center px-4 sm:px-6">
          <div className="text-center max-w-3xl bg-black/75 lg:bg-none p-6 rounded-lg">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white drop-shadow-lg">
              Empowering Young Migrants
            </h1>
            <p className="mb-6 text-base sm:text-lg text-white/90 font-mono">
              Find opportunities & navigate your future
            </p>
            <a
              href={isLoggedIn ? "/healthCareSearch" : "/login"}
              className="inline-block bg-yellow-900 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
            >
              Get Started
            </a>
          </div>
        </div>
      </header>

      <main>
        <Page2 />
        <Page3 />
        <Page5 />
      </main>

      <Footer />
    </div>
  );
}
// ...existing code...
