import {
  FaClipboardList,
  FaUserShield,
  FaTools,
  FaCheckCircle
} from "react-icons/fa";

const HowItWorks = () => {

  const steps = [

    {
      id: 1,
      icon: <FaClipboardList />,
      title: "Report an Issue",
      description:
        "Citizens can easily submit infrastructure problems with images, descriptions, category, and location details.",
      color: "bg-[#7C3AED]"
    },

    {
      id: 2,
      icon: <FaUserShield />,
      title: "Admin Verification",
      description:
        "Administrators review and verify reported issues to ensure accurate and valid infrastructure complaints.",
      color: "bg-blue-500"
    },

    {
      id: 3,
      icon: <FaTools />,
      title: "Authority Resolution",
      description:
        "Relevant authorities take action to repair and resolve the reported public infrastructure issue.",
      color: "bg-orange-500"
    },

    {
      id: 4,
      icon: <FaCheckCircle />,
      title: "Issue Resolved",
      description:
        "Once completed, the issue status is updated and visible to all citizens on the platform.",
      color: "bg-green-500"
    }

  ];



  return (

    <div className="bg-base-100 py-24 overflow-hidden">

      <div className="max-w-7xl mx-auto px-5">

        {/* TITLE */}
        <div className="text-center mb-20">

          <h1 className="text-5xl font-black text-base-content">

            How It Works

          </h1>

          <p className="text-gray-500 mt-6 text-lg max-w-3xl mx-auto leading-relaxed">

            InfraReporter connects citizens and authorities through
            a simple, efficient, and transparent issue resolution process.

          </p>

        </div>



        {/* STEPS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative">

          {
            steps.map((step, index) => (

              <div
                key={step.id}
                className="relative bg-base-200 rounded-3xl p-10 shadow-xl hover:-translate-y-3 transition-all duration-300"
              >

                {/* STEP NUMBER */}
                <div className="absolute -top-5 left-8 w-12 h-12 rounded-full bg-base-100 shadow-lg flex items-center justify-center text-xl font-black text-[#7C3AED]">

                  {step.id}

                </div>



                {/* ICON */}
                <div className={`w-20 h-20 rounded-2xl ${step.color} text-white flex items-center justify-center text-4xl mt-6`}>

                  {step.icon}

                </div>



                {/* TITLE */}
                <h2 className="text-2xl font-black mt-8 text-base-content">

                  {step.title}

                </h2>



                {/* DESCRIPTION */}
                <p className="text-gray-500 mt-5 leading-relaxed text-lg">

                  {step.description}

                </p>



                {/* CONNECTOR LINE */}
                {
                  index !== steps.length - 1 && (

                    <div className="hidden lg:block absolute top-1/2 -right-12 w-24 h-1 bg-[#7C3AED]/30">

                    </div>
                  )
                }

              </div>

            ))
          }

        </div>

      </div>

    </div>
  );
};

export default HowItWorks;