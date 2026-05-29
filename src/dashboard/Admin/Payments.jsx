import { useEffect, useState } from "react";
import axios from "axios";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const token = localStorage.getItem('access-token');

  const secureAxios = axios.create({
    headers: { authorization: `Bearer ${token}` }
  });

  useEffect(() => {
    secureAxios.get('http://localhost:5000/admin/payments')
      .then(res => setPayments(res.data))
      .catch(err => console.error(err));
  }, []);

  const filteredPayments = payments.filter(p => {
    if (filterType === "premium") return p.type === "premium_tier";
    if (filterType === "boost") return p.type === "issue_boost";
    return true;
  });

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-4xl font-extrabold">Transaction History Logs</h1>
        
        <div className="form-control w-full sm:w-xs">
          <select 
            className="select select-bordered" 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">Show All Transactions</option>
            <option value="premium">Premium Subscriptions</option>
            <option value="boost">Issue Boosting Fees</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-base-100 shadow border rounded-xl">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-base-200">
              <th>Transaction ID</th>
              <th>Payer Email</th>
              <th>Allocation Category</th>
              <th>Amount Settled</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map(pay => (
              <tr key={pay._id}>
                <td className="font-mono text-xs text-secondary font-bold">{pay.transactionId}</td>
                <td>{pay.userEmail}</td>
                <td>
                  <span className={`badge ${pay.type === 'premium_tier' ? 'badge-primary' : 'badge-accent'}`}>
                    {pay.type === 'premium_tier' ? 'Premium Upgrade' : 'Issue Boost'}
                  </span>
                </td>
                <td className="font-bold text-success">${pay.amount}</td>
                <td className="text-sm opacity-70">{new Date(pay.date).toLocaleDateString()}</td>
              </tr>
            ))}
            {filteredPayments.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center py-6 text-base-content/40 italic">No corresponding records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Payments;