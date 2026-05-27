import {
  FaExclamationTriangle,
  FaMapMarkedAlt,
  FaBell,
  FaShieldAlt,
  FaChartLine,
  FaUsers
} from "react-icons/fa";

const Features = () => {

  const features = [

    {
      id: 1,
      icon: <FaExclamationTriangle />,
      title: "Report Infrastructure Issues",
      description:
        "Citizens can instantly report road damage, water leakage, garbage problems, electricity issues, and more.",
      color: "bg-red-100 text-red-500"
    },

    {
      id: 2,
      icon: <FaMapMarkedAlt />,
      title: "Location Based Reporting",
      description:
        "Users can provide accurate locations for issues to help authorities respond quickly and efficiently.",
      color: "bg-blue-100 text-blue-500"
    },

    {
      id: 3,
      icon: <FaBell />,
      title: "Real-time Issue Tracking",
      description:
        "Track issue progress from pending to resolved with real-time updates and status monitoring.",
      color: "bg-yellow-100 text-yellow-500"
    },

    {
      id: 4,
      icon: <FaShieldAlt />,
      title: "Secure Authentication",
      description:
        "Protected login system with JWT authentication and role-based dashboard access for security.",
      color: "bg-green-100 text-green-500"
    },

    {
      id: 5,
      icon: <FaChartLine />,
      title: "Analytics Dashboard",
      description:
        "Admins can monitor issue statistics, users, and performance through advanced visual dashboards.",
      color: "bg-purple-100 text-purple-500"
    },

    {
      id: 6,
      icon: <FaUsers />,
      title: "Community Engagement",
      description:
        "Citizens can upvote important issues and help authorities prioritize infrastructure problems.",
      color: "bg-pink-100 text-pink-500"
    }

  ];



  return (

    <div className="bg-base-200 py-24">

      <div className="max-w-7xl mx-auto px-5">

        {/* TITLE */}
        <div className="text-center mb-20">

          <h1 className="text-5xl font-black text-base-content">

            Powerful Platform Features

          </h1>

          <p className="text-gray-500 mt-6 text-lg max-w-3xl mx-auto">

            InfraReporter provides powerful tools and smart features
            to help citizens and authorities collaborate effectively
            for better public infrastructure management.

          </p>

        </div>



        {/* FEATURE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {
            features.map(feature => (

              <div
                key={feature.id}
                className="bg-base-100 rounded-3xl p-10 shadow-xl hover:-translate-y-3 transition-all duration-300"
              >

                {/* ICON */}
                <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-4xl ${feature.color}`}>

                  {feature.icon}

                </div>



                {/* TITLE */}
                <h2 className="text-2xl font-black mt-8 text-base-content">

                  {feature.title}

                </h2>



                {/* DESCRIPTION */}
                <p className="text-gray-500 mt-5 leading-relaxed text-lg">

                  {feature.description}

                </p>

              </div>

            ))
          }

        </div>

      </div>

    </div>
  );
};

export default Features;