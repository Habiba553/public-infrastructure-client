import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const StaffHome = () => {

  const { user } = useAuth();

  const [stats, setStats] = useState({});

  useEffect(() => {

    const token =
      localStorage.getItem('access-token');

    axios.get(

      `http://localhost:5000/staff-stats/${user?.email}`,

      {
        headers: {
          authorization: `Bearer ${token}`
        }
      }

    )
    .then(res => {

      setStats(res.data);
    });

  }, [user]);

  return (

    <div className="p-5">

      <h1 className="text-4xl font-bold mb-10">

        Staff Dashboard

      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="bg-white shadow-xl rounded-2xl p-8">

          <h2 className="text-2xl font-bold">

            Assigned Issues

          </h2>

          <p className="text-6xl font-black text-[#7C3AED] mt-5">

            {stats.assigned || 0}

          </p>

        </div>

        <div className="bg-white shadow-xl rounded-2xl p-8">

          <h2 className="text-2xl font-bold">

            Resolved Issues

          </h2>

          <p className="text-6xl font-black text-green-500 mt-5">

            {stats.resolved || 0}

          </p>

        </div>

        <div className="bg-white shadow-xl rounded-2xl p-8">

          <h2 className="text-2xl font-bold">

            Today's Tasks

          </h2>

          <p className="text-6xl font-black text-orange-500 mt-5">

            {stats.today || 0}

          </p>

        </div>

      </div>

    </div>
  );
};

export default StaffHome;