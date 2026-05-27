import {
  FaStar
} from "react-icons/fa";

const Testimonials = () => {

  return (

    <div className="bg-base-100 py-24">

      <div className="max-w-7xl mx-auto px-5">

        {/* TITLE */}
        <div className="text-center mb-20">

          <h1 className="text-5xl font-black text-base-content">

            What Citizens Say

          </h1>

          <p className="text-gray-500 mt-5 text-lg max-w-2xl mx-auto">

            People across the city are using InfraReporter
            to improve public infrastructure faster than ever.

          </p>

        </div>



        {/* TESTIMONIAL CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* CARD */}
          <div className="bg-base-200 rounded-3xl p-10 shadow-xl">

            <div className="flex items-center gap-1 text-yellow-500 text-xl">

              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />

            </div>



            <p className="text-gray-600 mt-6 leading-relaxed text-lg">

              "This platform helped us report dangerous road damage
              quickly and the issue was resolved within days."

            </p>



            <div className="flex items-center gap-4 mt-8">

              <img
                src="https://i.ibb.co/4pDNDk1/avatar.png"
                alt=""
                className="w-16 h-16 rounded-full"
              />



              <div>

                <h3 className="font-bold text-xl">

                  Ahmed Rahman

                </h3>

                <p className="text-gray-500">

                  Dhaka Citizen

                </p>

              </div>

            </div>

          </div>



          {/* CARD */}
          <div className="bg-base-200 rounded-3xl p-10 shadow-xl">

            <div className="flex items-center gap-1 text-yellow-500 text-xl">

              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />

            </div>



            <p className="text-gray-600 mt-6 leading-relaxed text-lg">

              "The system is very easy to use and the authorities
              responded much faster than expected."

            </p>



            <div className="flex items-center gap-4 mt-8">

              <img
                src="https://i.ibb.co/4pDNDk1/avatar.png"
                alt=""
                className="w-16 h-16 rounded-full"
              />



              <div>

                <h3 className="font-bold text-xl">

                  Nusrat Jahan

                </h3>

                <p className="text-gray-500">

                  Community Volunteer

                </p>

              </div>

            </div>

          </div>



          {/* CARD */}
          <div className="bg-base-200 rounded-3xl p-10 shadow-xl">

            <div className="flex items-center gap-1 text-yellow-500 text-xl">

              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />

            </div>



            <p className="text-gray-600 mt-6 leading-relaxed text-lg">

              "InfraReporter creates a direct bridge between
              citizens and local authorities."

            </p>



            <div className="flex items-center gap-4 mt-8">

              <img
                src="https://i.ibb.co/4pDNDk1/avatar.png"
                alt=""
                className="w-16 h-16 rounded-full"
              />



              <div>

                <h3 className="font-bold text-xl">

                  Karim Hossain

                </h3>

                <p className="text-gray-500">

                  City Resident

                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Testimonials;