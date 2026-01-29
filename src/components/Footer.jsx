import { useState } from "react";
import { FaGlobe, FaShareAlt, FaUsers, FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";

const Footer = () => {
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [message, setMessage] = useState("");

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.origin);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSend = () => {
  if (!message.trim()) return;

  window.location.href = `mailto:singhpriyanshu741@gmail.com?subject=Message from FreeLanzo&body=${encodeURIComponent(message)}`;
  setSent(true);
  setMessage("");

  setTimeout(() => setSent(false), 3000);
};


  return (
    <footer className="bg-black text-white py-24">
      <div className="max-w-7xl mx-auto px-10 grid md:grid-cols-4 gap-16">

  
        <div>
          <h3 className="text-3xl font-bold mb-4">FreeLanzo</h3>
          <p className="text-gray-400 text-base leading-relaxed">
            The world’s premier marketplace for elite freelancers and ambitious clients.
          </p>

          <div className="flex gap-4 mt-6 relative">
            <div className="w-12 h-12 rounded-full bg-[#111827] flex items-center justify-center">
              <FaGlobe />
            </div>

            <div onClick={handleShare} className="w-12 h-12 rounded-full bg-[#111827] flex items-center justify-center cursor-pointer">
              <FaShareAlt />
            </div>

            <a
              href="https://instagram.com/freelanzo"
              target="_blank"
              className="w-12 h-12 rounded-full bg-[#111827] flex items-center justify-center"
            >
              <FaUsers />
            </a>

            {copied && (
              <span className="absolute -top-8 left-16 bg-[#1F2937] px-3 py-1 rounded text-sm">
                Link copied!
              </span>
            )}
          </div>

          
          <div className="text-gray-400 text-sm mt-6 ">
            © {new Date().getFullYear()}{" "}
            <span className="text-[#10B981] font-semibold">FreeLanzo</span>. All rights reserved.
          </div>
        </div>

        
        <div>
          <h4 className="text-lg font-semibold mb-5">PLATFORM</h4>
          <ul className="space-y-3 text-gray-400 text-base">
            <li>Browse Jobs</li>
            <li>Find Talent</li>
            <li>FreeLanzo Pro</li>
            <li>Enterprise</li>
          </ul>
        </div>

        
        <div>
          <h4 className="text-lg font-semibold mb-5">COMPANY</h4>
          <ul className="space-y-3 text-gray-400 text-base">
            <li>About Us</li>
            <li>Careers</li>
            <li>Press</li>
            <li>Contact</li>
          </ul>
        </div>

        
        <div>
          <h4 className="text-lg font-semibold mb-5">SEND US A MESSAGE</h4>

          <textarea
            className="w-full bg-[#111827] border border-[#1F2937] rounded-lg p-3 text-sm text-white outline-none resize-none"
            rows="4"
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <button
            onClick={handleSend}
            className="mt-3 w-full bg-[#6B46C1] hover:bg-[#553C9A] transition py-2 rounded-lg font-semibold"
          >
            Send Message
          </button>

          {sent && (
            <p className="text-[#10B981] text-sm mt-2">Message sent successfully!</p>
          )}

          
          <div className="flex gap-4 mt-6">
            <a href="https://instagram.com/freelanzo" target="_blank" className="w-10 h-10 bg-[#111827] flex items-center justify-center rounded-full">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" className="w-10 h-10 bg-[#111827] flex items-center justify-center rounded-full">
              <FaTwitter />
            </a>
            <a href="https://facebook.com" target="_blank" className="w-10 h-10 bg-[#111827] flex items-center justify-center rounded-full">
              <FaFacebook />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
