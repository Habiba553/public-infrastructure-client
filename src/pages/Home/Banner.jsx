import { Link } from "react-router-dom";

const Banner = () => {

  return (

    <div className="bg-base-100 overflow-hidden">

      <div className="max-w-7xl mx-auto px-5 py-16 lg:py-24">

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">

          {/* LEFT CONTENT */}
          <div>

            {/* BADGE */}
            <div className="inline-flex items-center gap-2 bg-[#7C3AED]/10 text-[#7C3AED] px-5 py-2 rounded-full font-semibold mb-6">

              🚧 Smart Public Infrastructure Solution

            </div>



            {/* HEADING */}
            <h1 className="text-5xl lg:text-7xl font-black leading-tight text-base-content">

              Report Public

              <span className="text-[#7C3AED] block mt-2">

                Infrastructure Issues

              </span>

              Easily & Quickly

            </h1>



            {/* DESCRIPTION */}
            <p className="text-lg text-gray-500 mt-8 leading-relaxed max-w-xl">

              Help your city become cleaner, safer, and smarter by reporting
              road damage, water leakage, electricity problems, garbage issues,
              and other public infrastructure concerns instantly.

            </p>



            {/* BUTTONS */}
            <div className="flex flex-wrap gap-5 mt-10">

              <Link
                to='/dashboard/report-issue'
                className="bg-[#7C3AED] hover:bg-[#6D28D9] text-white px-8 py-4 rounded-2xl font-bold shadow-lg hover:scale-105 transition-all duration-300"
              >

                Report Issue

              </Link>



              <Link
                to='/all-issues'
                className="border-2 border-[#7C3AED] text-[#7C3AED] hover:bg-[#7C3AED] hover:text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300"
              >

                Explore Issues

              </Link>

            </div>



            {/* STATS */}
            <div className="grid grid-cols-3 gap-5 mt-14">

              <div className="bg-base-200 rounded-2xl p-5 text-center shadow-md">

                <h2 className="text-3xl font-black text-[#7C3AED]">

                  10K+

                </h2>

                <p className="text-sm text-gray-500 mt-2">

                  Issues Reported

                </p>

              </div>



              <div className="bg-base-200 rounded-2xl p-5 text-center shadow-md">

                <h2 className="text-3xl font-black text-[#7C3AED]">

                  8K+

                </h2>

                <p className="text-sm text-gray-500 mt-2">

                  Issues Resolved

                </p>

              </div>



              <div className="bg-base-200 rounded-2xl p-5 text-center shadow-md">

                <h2 className="text-3xl font-black text-[#7C3AED]">

                  5K+

                </h2>

                <p className="text-sm text-gray-500 mt-2">

                  Active Citizens

                </p>

              </div>

            </div>

          </div>



          {/* RIGHT SIDE */}
          <div className="relative flex justify-center">

            {/* MAIN IMAGE */}
            <img
              src="https://i.ibb.co/f2rr2Y5/smart-city.png"
              alt=""
              className="w-full max-w-2xl animate-pulse"
            />



            {/* FLOATING CARD 1 */}
            <div className="absolute top-10 left-0 bg-base-100 shadow-2xl rounded-2xl p-5 w-64 hidden md:block">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-2xl">

                  🚧

                </div>



                <div>

                  <h3 className="font-bold text-lg">

                    Road Damage

                  </h3>

                  <p className="text-sm text-gray-500">

                    Reported Successfully

                  </p>

                </div>

              </div>

            </div>



            {/* FLOATING CARD 2 */}
            <div className="absolute bottom-10 right-0 bg-base-100 shadow-2xl rounded-2xl p-5 w-64 hidden md:block">

              <div className="flex items-center gap-4">

                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-2xl">

                  💧

                </div>



                <div>

                  <h3 className="font-bold text-lg">

                    Water Leakage

                  </h3>

                  <p className="text-sm text-gray-500">

                    Under Maintenance

                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Banner;