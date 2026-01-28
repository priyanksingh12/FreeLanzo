import { useDispatch, useSelector } from "react-redux";
import { setActiveSection } from "../features/ui/uislice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleScroll = (sectionId) => {
  dispatch(setActiveSection(sectionId));
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};


  return (
    <nav className="flex justify-between items-center px-12 py-5 bg-white border-b border-gray-200">
      
      <div className="text-4xl font-bold text-[#6B46C1]">
        FreeLanzo
      </div>

    <div className="flex items-center gap-6 text-[#1F2937] font-medium">
  <span
    className="cursor-pointer hover:text-[#3B82F6] transition"
    onClick={() => handleScroll("browse")}
  >
    Browse Services
  </span>

  <span className="text-gray-300"></span>

  <span
    className="cursor-pointer hover:text-[#3B82F6] transition"
    onClick={() => handleScroll("how")}
  >
    How It Works
  </span>
</div>

      <div className="flex gap-4">
        <button
          className="text-[#1F2937] font-medium hover:text-[#3B82F6] transition"
          onClick={() => navigate("/login")}
        >
          Login
        </button>
        <button
          className="bg-[#6B46C1] text-white px-5 py-2 rounded-lg hover:bg-[#553C9A] transition"
          onClick={() => navigate("/signup")}
        >
          Signup
        </button>
      </div>
    </nav>
  );
};

export default Navbar;


