import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import axios from "axios";

import {
  FaMapMarkerAlt,
  FaThumbsUp,
  FaArrowRight
} from "react-icons/fa";

const LatestResolvedIssues = () => {

  const [issues, setIssues] = useState([]);

  useEffect(() => {

    axios.get(
      'http://localhost:5000/latest-resolved-issues'
    )
    .then(res => {

      setIssues(res.data);

    });

  }, []);

  return (

    <div className="bg-base-100 py-24">

      <div className="max-w-7xl mx-auto px-5">

        {/* SECTION TITLE */}
        <div className="text-center mb-16">

          <h1 className="text-5xl font-black text-base-content">

            Latest Resolved Issues

          </h1>

          <p className="text-gray-500 mt-5 text-lg max-w-3xl mx-auto">

            Explore recently resolved infrastructure issues
            successfully handled by local authorities and communities.

          </p>

        </div>



        {/* ISSUE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {
            issues.map(issue => (

              <div
                key={issue._id}
                className="bg-base-200 rounded-3xl overflow-hidden shadow-xl hover:-translate-y-2 transition-all duration-300"
              >

                {/* IMAGE */}
                <div className="relative">

                  <img
                    src={issue.image}
                    alt=""
                    className="w-full h-64 object-cover"
                  />



                  {/* STATUS BADGE */}
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg">

                    Resolved

                  </div>

                </div>



                {/* CONTENT */}
                <div className="p-6">

                  {/* TITLE */}
                  <h2 className="text-2xl font-black text-base-content">

                    {issue.title}

                  </h2>



                  {/* DESCRIPTION */}
                  <p className="text-gray-500 mt-4 line-clamp-2">

                    {issue.description}

                  </p>



                  {/* INFO */}
                  <div className="space-y-3 mt-6">

                    <div className="flex items-center gap-3 text-gray-600">

                      <FaMapMarkerAlt className="text-[#7C3AED]" />

                      <span>

                        {issue.location}

                      </span>

                    </div>



                    <div className="flex items-center justify-between">

                      <div className="badge badge-outline badge-lg">

                        {issue.category}

                      </div>



                      <div className="flex items-center gap-2 text-[#7C3AED] font-bold">

                        <FaThumbsUp />

                        {issue.upvotes}

                      </div>

                    </div>

                  </div>



                  {/* BUTTON */}
                  <Link
                    to={`/issue-details/${issue._id}`}
                    className="mt-8 flex items-center justify-center gap-3 bg-[#7C3AED] hover:bg-[#6D28D9] text-white py-4 rounded-2xl font-bold transition-all duration-300"
                  >

                    View Details

                    <FaArrowRight />

                  </Link>

                </div>

              </div>

            ))
          }

        </div>

      </div>

    </div>
  );
};

export default LatestResolvedIssues;