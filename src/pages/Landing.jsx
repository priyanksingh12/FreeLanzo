import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import { FaGlobe, FaUsers, FaHandshake, FaBriefcase,FaCode, FaPaintBrush, FaPenNib, FaBullhorn, FaChartLine ,FaHome ,FaUserCheck, FaLock, FaUserPlus,FaWallet,FaShieldAlt,  FaBolt, FaRobot} from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

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

  const [activeTab, setActiveTab] = useState("client");

  
const Step = ({ icon, title, desc }) => (
  <div className="bg-[#F9FAFB] rounded-2xl p-8 shadow hover:shadow-lg transition">
    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#E9D5FF] text-[#6B46C1] text-xl mb-4">
      {icon}
    </div>
    <h3 className="font-semibold text-xl text-[#1F2937]">{title}</h3>
    <p className="text-[#6B7280] mt-2 text-md leading-relaxed">{desc}</p>
  </div>
);


  return (
    <>
      <Navbar />

      
      <section className="bg-[#6b46c141] py-24">
        <div className="max-w-6xl mx-auto px-10 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 bg-[#E9D5FF] text-[#1F2937] px-4 py-1 rounded-full text-sm font-semibold mb-4">
              <FaGlobe className="text-[#1F2937]" />
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

    
      <section className="bg-[#6b728018] pt-20 pb-10">
        <h2 className="text-center text-md font-semibold tracking-widest text-[#6B7280] uppercase mb-10">
          Trusted by leading companies worldwide
        </h2>

   <div className=" w-full">
  <div className="relative w-full">
    <div className="flex w-max animate-marquee">
      {[...logos, ...logos].map((logo, i) => (
       <div
  key={i}
  className="logo-card shrink-0 w-48 h-30 mx-6 flex items-center justify-center 
             rounded-2xl bg-white/80 
             border border-gray-200 
             shadow-md  transition-transform duration-300 ease-out
             hover:scale-120 hover:shadow-lg"
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

     <section className="bg-[#6b728018] pt-20">
  <div className="max-w-8xl mx-auto px-10 grid md:grid-cols-3 gap-8">

  
    <div className="bg-white rounded-2xl p-16 shadow-md hover:shadow-xl transition">
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


<section id="browse" className="bg-[#6b728018] pt-20">
  <div className="max-w-8xl mx-auto px-10">
    
    <div className="flex items-center gap-3 mb-12">
      <div className="w-1 h-8 bg-[#6B46C1] rounded-full"></div>
      <h2 className="text-3xl font-bold text-[#1F2937]">Popular Categories</h2>
    </div>

    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-12">

    
<div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#E9D5FF] text-[#6B46C1]">
        <FaCode className="text-xl" />
      </div>
      <h3 className="font-semibold text-xl text-[#1F2937]">Software</h3>
    </div>
    <span className="text-md text-[#6B7280] font-medium">1.2k+ Experts</span>
  </div>

  <div className="flex flex-wrap gap-2 mt-4">
    <span className="px-2.5 py-1 text-sm bg-[#E9D5FF] text-[#6B46C1] rounded-full">Web</span>
    <span className="px-2.5 py-1 text-sm bg-[#E9D5FF] text-[#6B46C1] rounded-full">Mobile</span>
    <span className="px-2.5 py-1 text-sm bg-[#E9D5FF] text-[#6B46C1] rounded-full">Cloud</span>
  </div>
</div>


<div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#DBEAFE] text-[#3B82F6]">
        <FaPaintBrush className="text-xl" />
      </div>
      <h3 className="font-semibold text-xl text-[#1F2937]">Design</h3>
    </div>
    <span className="text-md text-[#6B7280] font-medium">850+ Experts</span>
  </div>

  <div className="flex flex-wrap gap-2 mt-4">
    <span className="px-2.5 py-1 text-sm bg-[#DBEAFE] text-[#3B82F6] rounded-full">UI/UX</span>
    <span className="px-2.5 py-1 text-sm bg-[#DBEAFE] text-[#3B82F6] rounded-full">Branding</span>
    <span className="px-2.5 py-1 text-sm bg-[#DBEAFE] text-[#3B82F6] rounded-full">Illustration</span>
  </div>
</div>


<div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#E0F2FE] text-[#0EA5E9]">
        <FaPenNib className="text-xl" />
      </div>
      <h3 className="font-semibold text-xl text-[#1F2937]">Writing</h3>
    </div>
    <span className="text-md text-[#6B7280] font-medium">600+ Experts</span>
  </div>

  <div className="flex flex-wrap gap-2 mt-4">
    <span className="px-2.5 py-1 text-sm bg-[#E0F2FE] text-[#0EA5E9] rounded-full">Blogs</span>
    <span className="px-2.5 py-1 text-sm bg-[#E0F2FE] text-[#0EA5E9] rounded-full">SEO</span>
    <span className="px-2.5 py-1 text-sm bg-[#E0F2FE] text-[#0EA5E9] rounded-full">Copy</span>
  </div>
</div>


<div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#FEF3C7] text-[#F59E0B]">
        <FaBullhorn className="text-xl" />
      </div>
      <h3 className="font-semibold text-xl text-[#1F2937]">Marketing</h3>
    </div>
    <span className="text-md text-[#6B7280] font-medium">940+ Experts</span>
  </div>

  <div className="flex flex-wrap gap-2 mt-4">
    <span className="px-2.5 py-1 text-sm bg-[#FEF3C7] text-[#F59E0B] rounded-full">Ads</span>
    <span className="px-2.5 py-1 text-sm bg-[#FEF3C7] text-[#F59E0B] rounded-full">Growth</span>
    <span className="px-2.5 py-1 text-sm bg-[#FEF3C7] text-[#F59E0B] rounded-full">Social</span>
  </div>
</div>


<div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#E0E7FF] text-[#6366F1]">
        <FaHome className="text-xl" />
      </div>
      <h3 className="font-semibold text-xl text-[#1F2937]">Home Services</h3>
    </div>
    <span className="text-md text-[#6B7280] font-medium">420+ Experts</span>
  </div>

  <div className="flex flex-wrap gap-2 mt-4">
    <span className="px-2.5 py-1 text-sm bg-[#E0E7FF] text-[#6366F1] rounded-full">Cleaning</span>
    <span className="px-2.5 py-1 text-sm bg-[#E0E7FF] text-[#6366F1] rounded-full">Repair</span>
    <span className="px-2.5 py-1 text-sm bg-[#E0E7FF] text-[#6366F1] rounded-full">Electric</span>
  </div>
</div>


<div className="bg-white rounded-2xl p-6 shadow hover:shadow-lg transition">
  <div className="flex items-center justify-between">
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#FEE2E2] text-[#EF4444]">
        <FaChartLine className="text-xl" />
      </div>
      <h3 className="font-semibold text-xl text-[#1F2937]">Consulting</h3>
    </div>
    <span className="text-md text-[#6B7280] font-medium">310+ Experts</span>
  </div>

  <div className="flex flex-wrap gap-2 mt-4">
    <span className="px-2.5 py-1 text-sm bg-[#FEE2E2] text-[#EF4444] rounded-full">Strategy</span>
    <span className="px-2.5 py-1 text-sm bg-[#FEE2E2] text-[#EF4444] rounded-full">Finance</span>
    <span className="px-2.5 py-1 text-sm bg-[#FEE2E2] text-[#EF4444] rounded-full">Operations</span>
  </div>
</div>



    </div>
  </div>
</section>


<section id="how" className="bg-[#6b728018] py-24">
  <div className="max-w-8xl mx-auto px-10">

    <div className="flex items-center gap-3 mb-10">
      <div className="w-1 h-8 bg-[#6B46C1] rounded-full"></div>
      <h2 className="text-3xl font-bold text-[#1F2937]">How It Works</h2>
    </div>

    <div className="flex justify-center mb-12">
  <div className="flex bg-white rounded-xl p-1 w-fit">
    <button
      onClick={() => setActiveTab("client")}
      className={`px-6 py-4 rounded-lg  text-lg font-medium transition ${
        activeTab === "client"
          ? "bg-[#6b46c118] text-[#6B46C1] shadow"
          : "text-[#6B7280]"
      }`}
    >
      For Clients
    </button>
    <button
      onClick={() => setActiveTab("freelancer")}
      className={`px-6 py-4 rounded-lg text-lg font-medium transition ${
        activeTab === "freelancer"
          ? "bg-[#6b46c118] text-[#6B46C1] shadow"
          : "text-[#6B7280]"
      }`}
    >
      For Freelancers
    </button>
  </div>
</div>

   
    <div className="grid md:grid-cols-3 gap-8">

      {activeTab === "client" && (
        <>
          <Step icon={<FaBriefcase />} title="Post a Job" desc="Define your project goals, timeline, and budget in minutes." />
          <Step icon={<FaUserCheck />} title="Get Matched" desc="Our AI matches you with the best-suited professionals." />
          <Step icon={<FaLock />} title="Hire & Pay Securely" desc="Funds are held in escrow and released only when satisfied." />
        </>
      )}

      {activeTab === "freelancer" && (
        <>
          <Step icon={<FaUserPlus />} title="Create Profile" desc="Showcase your skills, experience, and portfolio." />
          <Step icon={<FaHandshake />} title="Get Gigs" desc="Receive high-quality job offers from verified clients." />
          <Step icon={<FaWallet />} title="Earn & Withdraw" desc="Get paid securely and withdraw earnings anytime." />
        </>
      )}

    </div>
  </div>
</section>


<section className="bg-[#0f172ad5] pt-20 text-white">
  <div className="max-w-7xl mx-auto px-10">

    
    <div className="text-center mb-12">
  <p className="text-xl tracking-widest text-[#10B981] font-semibold mb-3">
    WHY CHOOSE US
  </p>
  <h2 className="text-4xl font-bold mb-4">
    The New Standard for Professional Gigs
  </h2>
  <p className="text-[#9CA3AF] max-w-2xl mx-auto">
    Experience the most secure and efficient way to connect with top-tier talent and find your next high-paying project.
  </p>
</div>
  
    <div className="grid md:grid-cols-2 gap-6">

      
      <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6  transition">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#022C22] text-[#10B981] mb-4">
          <FaShieldAlt className="text-xl" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Verified Professionals</h3>
        <p className="text-[#9CA3AF] text-sm">
          Every professional is hand-vetted by our team for quality and reliability.
        </p>
      </div>

      
      <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6  transition">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#022C22] text-[#10B981] mb-4">
          <FaLock className="text-xl" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Escrow Protection</h3>
        <p className="text-[#9CA3AF] text-sm">
          Payments are held securely in escrow until work is reviewed and approved.
        </p>
      </div>

     
      <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6  transition">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#022C22] text-[#10B981] mb-4">
          <FaRobot className="text-xl" />
        </div>
        <h3 className="text-xl font-semibold mb-2">AI Matching</h3>
        <p className="text-[#9CA3AF] text-sm">
          Get matched with the perfect talent in minutes using our advanced algorithm.
        </p>
      </div>

     
      <div className="bg-[#111827] border border-[#1F2937] rounded-2xl p-6  transition">
        <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-[#022C22] text-[#10B981] mb-4">
          <FaBolt className="text-xl" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Fast & Reliable</h3>
        <p className="text-[#9CA3AF] text-sm">
          Launch projects quickly with high-quality professionals ready to work.
        </p>
      </div>

    </div>
  </div>
</section>

<section className="bg-[#0f172ad5] py-20 text-white">
  <div className="max-w-6xl mx-auto px-10 text-center mb-12">
    <h2 className="text-4xl font-bold">Ready to join the network?</h2>
  </div>

  <div className="max-w-6xl mx-auto px-10 grid md:grid-cols-2 gap-8">

    <div className="bg-[#111827] rounded-2xl overflow-hidden shadow-lg">
      <img
        src="/images/hire.jpg"
        alt="Looking to Hire"
        className="w-full h-56 object-cover"
      />

      <div className="p-8">
        <h3 className="text-2xl font-semibold mb-2">Looking to Hire?</h3>
        <p className="text-[#A5B4FC] mb-2">
          Find the perfect pro for your project today.
        </p>
        <p className="text-[#9CA3AF] text-sm mb-6">
          Post your job for free and get expert quotes in under an hour.
        </p>

      <button
  onClick={() => navigate("/signup")}
  className="w-full bg-[#6B46C1] hover:bg-[#553C9A] transition text-white py-3 rounded-xl font-semibold"
>
  Post a Job
</button>

      </div>
    </div>

   
    <div className="bg-[#111827] rounded-2xl overflow-hidden shadow-lg">
      <img
        src="/images/work.jpg"
        alt="Looking for Work"
        className="w-full h-56 object-cover"
      />

      <div className="p-8">
        <h3 className="text-2xl font-semibold mb-2">Looking for Work?</h3>
        <p className="text-[#A5B4FC] mb-2">
          Access high-paying gigs and grow your career.
        </p>
        <p className="text-[#9CA3AF] text-sm mb-6">
          Join a community of elite freelancers and get paid what you're worth.
        </p>
<button
  onClick={() => navigate("/signup")}
  className="w-full bg-[#6B46C1] hover:bg-[#553C9A] transition text-white py-3 rounded-xl font-semibold"
>
  Join as Pro
</button>

      </div>
    </div>

  </div>
</section>


<Footer/>
    </>
  );
};

export default Landing;
