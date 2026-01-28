import React from 'react'
import Navbar from '../components/Navbar'
import { FaGlobe, FaUsers, FaHandshake, FaBriefcase } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

import googleLogo from "../assets/logos/google.png";
import metaLogo from "../assets/logos/meta.png";
import amazonLogo from "../assets/logos/amazon.png";
import netflixLogo from "../assets/logos/netflix.png";
import microsoftLogo from "../assets/logos/microsoft.png";
import appleLogo from "../assets/logos/apple.png";

const Landing = () => {

  const navigate = useNavigate();

  const logos = [
    googleLogo,
    metaLogo,
    amazonLogo,
    netflixLogo,
    microsoftLogo,
    appleLogo,
  ];

  return (
    <>
      <Navbar />

      
      <section className="bg-[#6b46c118] py-24">
        <div className="max-w-6xl mx-auto px-10 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 bg-[#E9D5FF] text-[#6B46C1] px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <FaGlobe className="text-[#6B46C1]" />
              THE WORLD'S #1 PREMIUM MARKETPLACE
            </span>

            <h1 className="text-5xl font-extrabold text-[#1F2937] leading-tight mt-4">
              Hire Top Professionals. <br />
              <span className="text-[#6B46C1]">Work on Your Own Terms.</span>
            </h1>

            <p className="text-[#6B7280] mt-5 text-lg">
              Connect with elite freelancers and scale your business with the world's most trusted gig marketplace. Quality guaranteed.
            </p>

            <div className="mt-8 flex gap-4">
              <button
                onClick={() => navigate("/signup")}
                className="bg-[#6B46C1] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#553C9A] transition"
              >
                Get Started
              </button>
              <button
                onClick={() => navigate("/login")}
                className="border border-[#6B46C1] text-[#6B46C1] px-8 py-3 rounded-xl font-semibold hover:bg-[#E9D5FF] transition"
              >
                Login
              </button>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl h-105 overflow-hidden">
            <img
              src="/your-image.png"
              alt="App Preview"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

    
      <section className="bg-white py-20">
        <h2 className="text-center text-md font-semibold tracking-widest text-[#6B7280] uppercase mb-10">
          Trusted by leading companies worldwide
        </h2>

   <div className="overflow-hidden w-full">
  <div className="relative w-full">
    <div className="flex w-max animate-marquee">
      {[...logos, ...logos].map((logo, i) => (
       <div
  key={i}
  className="logo-card shrink-0 w-48 h-28 mx-6 flex items-center justify-center 
             rounded-2xl bg-white/80 
             border border-gray-200 
             shadow-md  transition-transform duration-300 ease-out
             hover:scale-130 hover:shadow-lg"
>
  <img
    src={logo}
    alt="Company logo"
    className="h-14 w-auto object-contain"
  />
</div>

      ))}
    </div>
  </div>
</div>

      </section>

     <section className="bg-[#6b46c118] py-24">
  <div className="max-w-8xl mx-auto px-10 grid md:grid-cols-3 gap-8">

  
    <div className="bg-white rounded-2xl p-14 shadow-md hover:shadow-xl transition">
      <div className="flex items-center justify-between">
        <p className="text-xl font-semibold text-[#6B7280] uppercase">Professionals</p>
        <FaUsers className="text-[#3B82F6] text-4xl" />
      </div>
      <h3 className="text-5xl font-bold text-[#1F2937] mt-4">100k+</h3>
      <p className="text-[#6B7280] mt-5 text-md">
        Vetted experts across design, engineering, and marketing ready to start.
      </p>
    </div>

  
    <div className="bg-white rounded-2xl p-14 shadow-md hover:shadow-xl transition">
      <div className="flex items-center justify-between">
        <p className="text-xl font-semibold text-[#6B7280] uppercase">Clients</p>
        <FaHandshake className="text-[#10B981] text-4xl" />
      </div>
      <h3 className="text-5xl font-bold text-[#1F2937] mt-4">50k+</h3>
      <p className="text-[#6B7280] mt-5 text-md">
        From Fortune 500s to scaling startups trust FreeLanzo for their projects.
      </p>
    </div>

    
    <div className="bg-white rounded-2xl p-14 shadow-md hover:shadow-xl transition">
      <div className="flex items-center justify-between">
        <p className="text-xl font-semibold text-[#6B7280] uppercase">Jobs Completed</p>
        <FaBriefcase className="text-[#FB923C] text-4xl" />
      </div>
      <h3 className="text-5xl font-bold text-[#1F2937] mt-4">1M+</h3>
      <p className="text-[#6B7280] mt-5 text-md">
        Successful collaborations delivering value across industries globally.
      </p>
    </div>

  </div>
</section>

    </>
  );
};

export default Landing;
