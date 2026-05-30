import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { FaTasks, FaCheckCircle, FaCalendarDay, FaUserCircle } from "react-icons/fa";

const StaffHome = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('access-token');

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

  // Transforming your real-time stats state into a layout schema for the Recharts engine
  const chartData = [
    { name: "Assigned", count: stats.assigned || 0, color: "#7C3AED" },
    { name: "Resolved", count: stats.resolved || 0, color: "#22C55E" },
    { name: "Today's Tasks", count: stats.today || 0, color: "#F97316" }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 text-base-content bg-base-100 transition-colors duration-300 space-y-10">
      
      {/* 1. WELCOME PROFILE BANNER CARD */}
      <div className="bg-gradient-to-r from-[#7C3AED] to-[#5B21B6] p-6 md:p-8 rounded-3xl text-white shadow-xl relative overflow-hidden group">
        <div className="absolute right-0 bottom-0 opacity-10 translate-x-6 translate-y-6 group-hover:scale-110 transition-transform duration-500 text-[10rem] pointer-events-none">
          <FaTasks />
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 relative z-10">
          <div className="text-4xl md:text-5xl">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Staff profile" className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover ring-4 ring-white/20 shadow-md" />
            ) : (
              <FaUserCircle className="w-16 h-16 md:w-20 md:h-20 opacity-90" />
            )}
          </div>
          <div className="text-center sm:text-left space-y-1">
            <span className="bg-white/20 text-white font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">Staff Account Overview</span>
            <h1 className="text-2xl md:text-4xl font-black tracking-tight">Welcome Back, {user?.displayName || "Officer"}!</h1>
            <p className="text-xs md:text-sm text-purple-100 font-medium">Ready to manage operations? Here is a breakdown of your current assignments.</p>
          </div>
        </div>
      </div>

      {/* 2. CORE KPIS STATS ROW PANELS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Metric Card 1: Assigned Issues */}
        <div className="bg-base-200 border border-base-300 rounded-3xl p-6 shadow-sm flex items-center justify-between group hover:shadow-md transition-shadow duration-300">
          <div className="space-y-2">
            <h3 className="text-sm font-bold opacity-60 uppercase tracking-wider">Assigned Issues</h3>
            <p className="text-4xl md:text-5xl font-black text-[#7C3AED] tracking-tight transition-transform group-hover:scale-105 duration-200">
              {stats.assigned || 0}
            </p>
            <p className="text-xs opacity-50 font-medium">Allocated workload context</p>
          </div>
          <div className="text-4xl text-[#7C3AED] bg-[#7C3AED]/10 p-4 rounded-2xl">
            <FaTasks />
          </div>
        </div>

        {/* Metric Card 2: Resolved Issues */}
        <div className="bg-base-200 border border-base-300 rounded-3xl p-6 shadow-sm flex items-center justify-between group hover:shadow-md transition-shadow duration-300">
          <div className="space-y-2">
            <h3 className="text-sm font-bold opacity-60 uppercase tracking-wider">Resolved Issues</h3>
            <p className="text-4xl md:text-5xl font-black text-green-500 tracking-tight transition-transform group-hover:scale-105 duration-200">
              {stats.resolved || 0}
            </p>
            <p className="text-xs opacity-50 font-medium">Successfully completed repairs</p>
          </div>
          <div className="text-4xl text-green-500 bg-green-500/10 p-4 rounded-2xl">
            <FaCheckCircle />
          </div>
        </div>

        {/* Metric Card 3: Today's Tasks */}
        <div className="bg-base-200 border border-base-300 rounded-3xl p-6 shadow-sm flex items-center justify-between group hover:shadow-md transition-shadow duration-300">
          <div className="space-y-2">
            <h3 className="text-sm font-bold opacity-60 uppercase tracking-wider">Today's Tasks</h3>
            <p className="text-4xl md:text-5xl font-black text-orange-500 tracking-tight transition-transform group-hover:scale-105 duration-200">
              {stats.today || 0}
            </p>
            <p className="text-xs opacity-50 font-medium">Urgent deadlines assigned today</p>
          </div>
          <div className="text-4xl text-orange-500 bg-orange-500/10 p-4 rounded-2xl">
            <FaCalendarDay />
          </div>
        </div>

      </div>

      {/* 3. CHART METRICS WORKSPACE */}
      <div className="bg-base-200 border border-base-300 p-6 md:p-8 rounded-3xl shadow-sm">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-bold tracking-tight">Performance Analytics</h2>
          <p className="text-xs opacity-60">Visual comparison of your structural maintenance metrics across the city.</p>
        </div>

        {/* Responsive Recharts Canvas wrapper */}
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.1} />
              <XAxis 
                dataKey="name" 
                tick={{ fill: 'currentColor', fontSize: 12, fontWeight: 600 }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis 
                allowDecimals={false}
                tick={{ fill: 'currentColor', fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                cursor={{ fill: 'rgba(0, 0, 0, 0.05)' }}
                contentStyle={{
                  backgroundColor: 'var(--fallback-b1, hsl(var(--b1)))',
                  color: 'var(--fallback-bc, hsl(var(--bc)))',
                  borderRadius: '1rem',
                  border: '1px solid var(--fallback-b3, hsl(var(--b3)))',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  fontWeight: '600'
                }}
              />
              <Bar 
                dataKey="count" 
                radius={[10, 10, 0, 0]} 
                maxBarSize={60}
              >
                {chartData.map((entry, index) => (
                  <path 
                    key={`cell-${index}`} 
                    fill={entry.color} 
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

export default StaffHome;