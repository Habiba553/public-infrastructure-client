import { useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../../shared/LoadingSpinner";

import {
  PieChart, Pie, Cell, Tooltip, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from "recharts";

const AdminHome = () => {
  const [stats, setStats] = useState(null);
  const token = localStorage.getItem('access-token');

  const secureAxios = axios.create({
    headers: { authorization: `Bearer ${token}` }
  });

  useEffect(() => {
    secureAxios.get('http://localhost:5000/admin/statistics')
      .then(res => setStats(res.data))
      .catch(err => console.error("Error fetching stats", err));
  }, []);

  if (!stats) return <LoadingSpinner />;

  const pieData = [
    { name: 'Resolved', value: stats.resolvedIssues || 0 },
    { name: 'Pending', value: stats.pendingIssues || 0 },
    { name: 'Rejected', value: stats.rejectedIssues || 0 }
  ];

  const barData = [
    { name: 'Users', value: stats.totalUsers || 0 },
    { name: 'Issues', value: stats.totalIssues || 0 },
    { name: 'Premium', value: stats.premiumUsers || 0 }
  ];

  const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-4xl font-extrabold tracking-tight">Admin Analytics Dashboard</h1>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="stats shadow bg-primary text-primary-content p-4">
          <div className="stat">
            <div className="stat-title text-primary-content/70">Total Users</div>
            <div className="stat-value text-3xl">{stats.totalUsers || 0}</div>
          </div>
        </div>
        <div className="stats shadow bg-secondary text-secondary-content p-4">
          <div className="stat">
            <div className="stat-title text-secondary-content/70">Pending Issues</div>
            <div className="stat-value text-3xl">{stats.pendingIssues || 0}</div>
          </div>
        </div>
        <div className="stats shadow bg-success text-success-content p-4">
          <div className="stat">
            <div className="stat-title text-success-content/70">Resolved Issues</div>
            <div className="stat-value text-3xl">{stats.resolvedIssues || 0}</div>
          </div>
        </div>
        <div className="stats shadow bg-error text-error-content p-4">
          <div className="stat">
            <div className="stat-title text-error-content/70">Rejected Issues</div>
            <div className="stat-value text-3xl">{stats.rejectedIssues || 0}</div>
          </div>
        </div>
        <div className="stats shadow bg-accent text-accent-content p-4">
          <div className="stat">
            <div className="stat-title text-accent-content/70">Payments Rec.</div>
            <div className="stat-value text-2xl">${stats.totalPaymentsReceived || 0}</div>
          </div>
        </div>
      </div>

      {/* GRAPH SECTIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200">
          <h2 className="text-xl font-bold mb-4">Issue Status Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={80} label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200">
          <h2 className="text-xl font-bold mb-4">Platform Growth Scope</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#661AE6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* RECENT DATA FEEDS */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="card bg-base-100 border border-base-200 shadow-sm p-4">
          <h3 className="font-bold text-lg mb-3 text-neutral">Latest Issues</h3>
          <ul className="divide-y divide-base-200 text-sm">
            {stats.latestIssues?.map(issue => (
              <li key={issue._id} className="py-2 flex justify-between">
                <span className="truncate max-w-[180px] font-medium">{issue.title}</span>
                <span className={`badge badge-sm ${issue.status === 'resolved' ? 'badge-success' : 'badge-warning'}`}>{issue.status}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card bg-base-100 border border-base-200 shadow-sm p-4">
          <h3 className="font-bold text-lg mb-3 text-neutral">Latest Payments</h3>
          <ul className="divide-y divide-base-200 text-sm">
            {stats.latestPayments?.map(p => (
              <li key={p._id} className="py-2 flex justify-between">
                <span>{p.userEmail}</span>
                <span className="font-semibold text-success">${p.amount}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card bg-base-100 border border-base-200 shadow-sm p-4">
          <h3 className="font-bold text-lg mb-3 text-neutral">New Registered Citizens</h3>
          <ul className="divide-y divide-base-200 text-sm">
            {stats.latestUsers?.map(u => (
              <li key={u._id} className="py-2 block">
                <p className="font-medium truncate">{u.name}</p>
                <p className="text-xs text-base-content/60 truncate">{u.email}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;