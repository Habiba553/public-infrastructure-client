import { Link } from "react-router-dom";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub, FaPaperPlane } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content transition-colors duration-300">
      {/* Top Section: Main Content Grid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          
          {/* Column 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#7C3AED] flex items-center justify-center text-white font-bold text-lg">
                I
              </div>
              <h2 className="text-xl font-extrabold tracking-wide">
                <span className="text-[#7C3AED]">Infra</span>Reporter
              </h2>
            </div>
            <p className="text-sm opacity-70 leading-relaxed">
              Empowering communities to report, track, and resolve public infrastructure concerns efficiently for a better tomorrow.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#7C3AED]">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="opacity-75 hover:opacity-100 hover:text-[#7C3AED] transition-colors duration-200">Home</Link>
              </li>
              <li>
                <Link to="/all-issues" className="opacity-75 hover:opacity-100 hover:text-[#7C3AED] transition-colors duration-200">All Issues</Link>
              </li>
              <li>
                <Link to="/about" className="opacity-75 hover:opacity-100 hover:text-[#7C3AED] transition-colors duration-200">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="opacity-75 hover:opacity-100 hover:text-[#7C3AED] transition-colors duration-200">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal / Resources */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#7C3AED]">
              Resources
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/dashboard" className="opacity-75 hover:opacity-100 hover:text-[#7C3AED] transition-colors duration-200">User Dashboard</Link>
              </li>
              <li>
                <a href="#privacy" className="opacity-75 hover:opacity-100 hover:text-[#7C3AED] transition-colors duration-200">Privacy Policy</a>
              </li>
              <li>
                <a href="#terms" className="opacity-75 hover:opacity-100 hover:text-[#7C3AED] transition-colors duration-200">Terms of Service</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Subscription */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#7C3AED]">
              Stay Updated
            </h3>
            <p className="text-sm opacity-70">
              Subscribe to get latest reports and system updates.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter email address" 
                className="input input-bordered w-full max-w-xs focus:outline-none focus:border-[#7C3AED] bg-base-100 text-sm h-11"
                required
              />
              <button 
                type="submit" 
                className="btn bg-[#7C3AED] hover:bg-[#6D28D9] text-white border-none h-11 min-h-0 px-4"
                aria-label="Subscribe"
              >
                <FaPaperPlane />
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-base-300 opacity-40"></div>

      {/* Bottom Section: Copyright & Socials */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-center sm:text-left">
          
          <aside className="opacity-70">
            <p>Copyright © 2026 - InfraReporter. All rights reserved.</p>
          </aside>

          {/* Social Media Links */}
          <div className="flex items-center gap-4 text-lg">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="opacity-70 hover:opacity-100 hover:text-[#7C3AED] transition-all duration-200 transform hover:-translate-y-0.5">
              <FaFacebook />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="opacity-70 hover:opacity-100 hover:text-[#7C3AED] transition-all duration-200 transform hover:-translate-y-0.5">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="opacity-70 hover:opacity-100 hover:text-[#7C3AED] transition-all duration-200 transform hover:-translate-y-0.5">
              <FaInstagram />
            </a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="opacity-70 hover:opacity-100 hover:text-[#7C3AED] transition-all duration-200 transform hover:-translate-y-0.5">
              <FaGithub />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;