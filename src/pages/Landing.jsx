import React from 'react'
import Navbar from '../components/Navbar'
import { FaGlobe } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const Landing = () => {

  const navigate=useNavigate();
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
              <button  onClick={() => navigate("/signup")} className="bg-[#6B46C1] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#553C9A] transition">
                Get Started
              </button>
              <button onClick={() => navigate("/login")} className="border border-[#6B46C1] text-[#6B46C1] px-8 py-3 rounded-xl font-semibold hover:bg-[#E9D5FF] transition">
                Login
              </button>
            </div>

          
          </div>

          
          <div className="bg-white rounded-2xl shadow-xl h-105 flex items-center justify-center text-[#6B7280]">
            <img
    src="/your-image.png"
    alt="App Preview"
    className="w-full h-full object-cover"
  />
          </div>

        </div>
      </section>
    </>
  )
}

export default Landing
