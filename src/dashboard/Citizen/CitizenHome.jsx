import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import useAuth from '../../hooks/useAuth'; // Adjust path based on your directory structure
import axios from "axios";
import useUserStatus from '../../hooks/useRole';
import { useEffect, useState } from "react";
const CitizenHome = () => {
  const { user } = useAuth();
  const [role, isBlocked, roleLoading] = useUserStatus();
  const [payments, setPayments] = useState([]);
  // Fetch all issues submitted by this specific user
  const token = localStorage.getItem("access-token");
  useEffect(() => {
    if (!user?.email) return;
    axios.get(
      `http://localhost:5000/payments/${user.email}`,
      {
        headers: {
          authorization: `Bearer ${token}`
        }
      }
    )
    .then(res => {
      console.log("PAYMENTS =", res.data);
      setPayments(res.data);
    })
    .catch(err => {
      console.log(err);
    });
  
  }, [user]);
  const {
    data: myIssues = [],
    isLoading: issuesLoading
  } = useQuery({
    queryKey: ['myIssues', user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:5000/my-issues/${user.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      );
      console.log(res.data);
      return res.data;
    }
  });

  // Calculate Metrics based on user data
  const totalSubmitted = myIssues.length;
  const pendingIssues = myIssues.filter(issue => issue.status === 'pending').length;
  const inProgressIssues = myIssues.filter(issue => issue.status === 'in-progress' || issue.status === 'ongoing').length;
  const resolvedIssues = myIssues.filter(issue => issue.status === 'resolved').length;
  
  // Calculate payments (assuming premium status or a local payments check)
  // If you track a payment array, change 1 to your metric. Here we check premium status.
  const totalPayments =
  payments.length;
const totalAmountPaid =
  payments.reduce(
    (sum, payment) =>
      sum + Number(payment.amount || 0),
    0
  );

  if (roleLoading || issuesLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  // Chart Mapping Data
  const chartData = [
    { name: 'Pending', count: pendingIssues, color: '#F97316' },
    { name: 'In Progress', count: inProgressIssues, color: '#3B82F6' },
    { name: 'Resolved', count: resolvedIssues, color: '#10B981' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Welcome & Blocked Notification Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-base-100 p-6 rounded-2xl shadow-sm border border-base-200">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Citizen Dashboard
          </h1>
          <p className="text-sm text-base-content/70 mt-1">
            Welcome back, {user?.displayName || 'Citizen'}. Track and manage your neighborhood infrastructure reports.
          </p>
        </div>
        {isBlocked && (
          <div className="alert alert-error max-w-md shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="Grid 10M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <h3 className="font-bold text-sm">Account Suspended</h3>
              <p className="text-xs opacity-90">Your account is blocked. Submission, updates, upvotes, and boosting actions are restricted.</p>
            </div>
          </div>
        )}
      </div>

      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-base-100 p-5 rounded-xl border border-base-200 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-bold text-base-content/60 uppercase tracking-wider">Total Filed</span>
          <span className="text-3xl font-black text-neutral mt-2">{totalSubmitted}</span>
        </div>
        <div className="bg-base-100 p-5 rounded-xl border border-base-200 shadow-sm flex flex-col justify-between border-l-4 border-l-orange-500">
          <span className="text-xs font-bold text-orange-600 uppercase tracking-wider">Pending</span>
          <span className="text-3xl font-black text-orange-600 mt-2">{pendingIssues}</span>
        </div>
        <div className="bg-base-100 p-5 rounded-xl border border-base-200 shadow-sm flex flex-col justify-between border-l-4 border-l-blue-500">
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">In Progress</span>
          <span className="text-3xl font-black text-blue-600 mt-2">{inProgressIssues}</span>
        </div>
        <div className="bg-base-100 p-5 rounded-xl border border-base-200 shadow-sm flex flex-col justify-between border-l-4 border-l-emerald-500">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Resolved</span>
          <span className="text-3xl font-black text-emerald-600 mt-2">{resolvedIssues}</span>
        </div>
        <div className="bg-base-100 p-5 rounded-xl border border-base-200 shadow-sm flex flex-col justify-between border-l-4 border-l-purple-500">
          <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Payments</span>
          <span className="text-3xl font-black text-purple-600 mt-2">৳{totalAmountPaid}<span className="text-xs font-normal text-base-content/50">({payments.length})</span></span>
        </div>
      </div>

      {/* Visual Analytics Block */}
      <div className="bg-base-100 p-6 rounded-2xl border border-base-200 shadow-sm">
        <h3 className="text-lg font-bold mb-4">Resolution Performance Matrix</h3>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
              <YAxis allowDecimals={false} tick={{ fill: '#6B7280', fontSize: 12 }} axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: 'rgba(0,0,0,0.02)' }} />
              <Bar dataKey="count" radius={[6, 6, 0, 0]} maxBarSize={50}>
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CitizenHome;