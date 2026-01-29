import { useState } from "react";
import { useDispatch } from "react-redux";
import { setActiveSection } from "../features/ui/uislice";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const NavbarLanding = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleScroll = (sectionId) => {
    dispatch(setActiveSection(sectionId));
    const element = document.getElementById(sectionId);
    if (element) element.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <nav className="bg-white border-b px-4 lg:px-12 py-4 flex items-center justify-between relative">

     
      <div className="md:hidden">
        <button onClick={() => setOpen(!open)} className="text-2xl text-[#1F2937]">
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

    
      <div className="text-3xl font-bold text-[#6B46C1] absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
        FreeLanzo
      </div>

      <div className="hidden md:flex items-center gap-6 text-[#1F2937] font-medium">
        <span onClick={() => handleScroll("browse")} className="cursor-pointer hover:text-[#3B82F6]">Browse Services</span>
        <span onClick={() => handleScroll("how")} className="cursor-pointer hover:text-[#3B82F6]">How It Works</span>
        <span onClick={() => handleScroll("testimonials")} className="cursor-pointer hover:text-[#3B82F6]">Testimonials</span>
        <span onClick={() => navigate("/about")} className="cursor-pointer hover:text-[#3B82F6]">About Us</span>
      </div>

      
      <div className="flex gap-3">
        <button onClick={() => navigate("/login")} className="text-sm font-medium hover:text-[#3B82F6]">
          Login
        </button>
        <button onClick={() => navigate("/signup")} className="bg-[#6B46C1] text-white px-4 py-1.5 rounded-lg text-sm">
          Signup
        </button>
      </div>

      {open && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md flex flex-col items-center gap-5 py-6 md:hidden z-50">
          <span onClick={() => handleScroll("browse")} className="font-medium text-lg">Browse Services</span>
          <span onClick={() => handleScroll("how")} className="font-medium text-lg">How It Works</span>
          <span onClick={() => handleScroll("testimonials")} className="font-medium text-lg">Testimonials</span>
          <span onClick={() => handleScroll("about")} className="font-medium text-lg">About Us</span>
        </div>
      )}
    </nav>
  );
};

export default NavbarLanding;

