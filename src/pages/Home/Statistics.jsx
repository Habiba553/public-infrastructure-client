import {
  FaUsers,
  FaCheckCircle,
  FaExclamationTriangle,
  FaMapMarkedAlt
} from "react-icons/fa";

const Statistics = () => {

  return (

    <div className="bg-base-200 py-20">

      <div className="max-w-7xl mx-auto px-5">

        {/* TITLE */}
        <div className="text-center mb-16">

          <h1 className="text-5xl font-black text-base-content">

            Platform Statistics

          </h1>

          <p className="text-gray-500 mt-5 text-lg max-w-2xl mx-auto">

            Thousands of citizens are actively reporting and resolving
            infrastructure problems every day.

          </p>

        </div>



        {/* CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* CARD */}
          <div className="bg-base-100 rounded-3xl p-10 shadow-xl text-center hover:-translate-y-2 transition-all duration-300">

            <div className="w-20 h-20 mx-auto rounded-full bg-[#7C3AED]/10 flex items-center justify-center text-[#7C3AED] text-4xl">

              <FaUsers />

            </div>

            <h2 className="text-5xl font-black mt-6">

              5K+

            </h2>

            <p className="text-gray-500 mt-3 text-lg">

              Active Citizens

            </p>

          </div>



          {/* CARD */}
          <div className="bg-base-100 rounded-3xl p-10 shadow-xl text-center hover:-translate-y-2 transition-all duration-300">

            <div className="w-20 h-20 mx-auto rounded-full bg-green-100 flex items-center justify-center text-green-600 text-4xl">

              <FaCheckCircle />

            </div>

            <h2 className="text-5xl font-black mt-6">

              8K+

            </h2>

            <p className="text-gray-500 mt-3 text-lg">

              Issues Resolved

            </p>

          </div>



          {/* CARD */}
          <div className="bg-base-100 rounded-3xl p-10 shadow-xl text-center hover:-translate-y-2 transition-all duration-300">

            <div className="w-20 h-20 mx-auto rounded-full bg-red-100 flex items-center justify-center text-red-500 text-4xl">

              <FaExclamationTriangle />

            </div>

            <h2 className="text-5xl font-black mt-6">

              10K+

            </h2>

            <p className="text-gray-500 mt-3 text-lg">

              Issues Reported

            </p>

          </div>



          {/* CARD */}
          <div className="bg-base-100 rounded-3xl p-10 shadow-xl text-center hover:-translate-y-2 transition-all duration-300">

            <div className="w-20 h-20 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-blue-500 text-4xl">

              <FaMapMarkedAlt />

            </div>

            <h2 className="text-5xl font-black mt-6">

              120+

            </h2>

            <p className="text-gray-500 mt-3 text-lg">

              Areas Covered

            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Statistics;