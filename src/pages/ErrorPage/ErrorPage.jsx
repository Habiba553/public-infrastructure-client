import { Link } from "react-router-dom";
import Navbar from "../../shared/Navbar";
import Footer from "../../shared/Footer";

const ErrorPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-base-100 text-base-content transition-colors duration-300">
      {/* Dynamic Navbar */}
      <Navbar />

      {/* Main Error Content Area */}
      <div className="flex-1 flex flex-col justify-center items-center px-4 py-16 text-center">
        <div className="max-w-md w-full space-y-6">
          
          {/* Main Visual Indicator */}
          <div className="relative select-none">
            <h1 className="text-9xl font-extrabold tracking-widest text-[#7C3AED] opacity-20 md:text-[12rem]">
              404
            </h1>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl md:text-3xl font-bold uppercase tracking-wide px-2 bg-base-100">
                Oops! Lost Track?
              </span>
            </div>
          </div>

          {/* Descriptive Information Text */}
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold">
              Page Not Found
            </h2>
            <p className="text-sm md:text-base opacity-70 max-w-sm mx-auto leading-relaxed">
              The public infrastructure route you are trying to reach doesn't exist, has been maintenance-removed, or shifted locations.
            </p>
          </div>

          {/* Action Call Button */}
          <div className="pt-4">
            <Link
              to='/'
              className="btn bg-[#7C3AED] hover:bg-[#6D28D9] text-white border-none font-bold px-8 py-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 inline-flex items-center gap-2"
            >
              Back To Home
            </Link>
          </div>

        </div>
      </div>

      {/* Dynamic Footer */}
      <Footer />
    </div>
  );
};

export default ErrorPage;