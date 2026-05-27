import { useEffect, useState } from "react";

import axios from "axios";
import LoadingSpinner from "../../shared/LoadingSpinner";
import {

  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer

} from "recharts";
const AdminHome = () => {

  const [stats, setStats] = useState({});



  const token = localStorage.getItem('access-token');



  const secureAxios = axios.create({

    headers: {
      authorization: `Bearer ${token}`
    }
  });



  useEffect(() => {

    secureAxios.get(
      'http://localhost:5000/admin/statistics'
    )
    .then(res => {

      setStats(res.data);
    });

  }, []);

  if (!stats.totalUsers) {
    return <LoadingSpinner />;
  }

  const pieData = [

    {
      name: 'Resolved',
      value: stats.resolvedIssues || 0
    },

    {
      name: 'Pending',
      value: stats.pendingIssues || 0
    }
  ];



  const barData = [

    {
      name: 'Users',
      value: stats.totalUsers || 0
    },

    {
      name: 'Issues',
      value: stats.totalIssues || 0
    },

    {
      name: 'Premium',
      value: stats.premiumUsers || 0
    }
  ];



  return (

    <div>

      <h1 className="text-5xl font-bold mb-10">

        Admin Analytics Dashboard

      </h1>



      {/* STAT CARDS */}
      <div className="grid md:grid-cols-4 gap-6 mb-16">

        <div className="card bg-primary text-primary-content p-8">

          <h2 className="text-3xl font-bold">
            {stats.totalUsers || 0}
          </h2>

          <p>Total Users</p>

        </div>



        <div className="card bg-secondary text-secondary-content p-8">

          <h2 className="text-3xl font-bold">
            {stats.totalIssues || 0}
          </h2>

          <p>Total Issues</p>

        </div>



        <div className="card bg-success text-success-content p-8">

          <h2 className="text-3xl font-bold">
            {stats.resolvedIssues || 0}
          </h2>

          <p>Resolved Issues</p>

        </div>



        <div className="card bg-warning text-warning-content p-8">

          <h2 className="text-3xl font-bold">
            {stats.pendingIssues || 0}
          </h2>

          <p>Pending Issues</p>

        </div>

      </div>



      {/* CHARTS */}
      <div className="grid md:grid-cols-2 gap-10">

        {/* PIE CHART */}
        <div className="bg-white p-5 rounded-xl shadow">

          <h2 className="text-2xl font-bold mb-5">

            Issue Status Overview

          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={100}
                fill="#8884d8"
                label
              >

                <Cell fill="#00C49F" />

                <Cell fill="#FF8042" />

              </Pie>

              <Tooltip />

            </PieChart>

          </ResponsiveContainer>

        </div>



        {/* BAR CHART */}
        <div className="bg-white p-5 rounded-xl shadow">

          <h2 className="text-2xl font-bold mb-5">

            Platform Overview

          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >

            <BarChart data={barData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#8884d8"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
};

export default AdminHome;