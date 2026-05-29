import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import axios from "axios";

const useRole = () => {
  const { user } = useAuth();
  const [role, setRole] = useState('');
  const [isBlocked, setIsBlocked] = useState(false); // Added state
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setRoleLoading(true); // Reset loading state when user changes
      const token = localStorage.getItem('access-token');

      axios.get(
        `http://localhost:5000/users/${user.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`
          }
        }
      )
      .then(res => {
      
        console.log("FULL RESPONSE:", res);
        console.log("DATA:", res.data);
        console.log("ROLE:", res.data?.role);
      
        setRole(res.data?.role || 'citizen');
        setIsBlocked(res.data?.blocked === true);
        setRoleLoading(false);
      
      })
      .catch(err => {
      
        console.log("ROLE FETCH ERROR:", err);
      
        setRoleLoading(false);
      });
    } else {
      setRoleLoading(false);
    }
  }, [user]);

  // Return role, isBlocked, and the loading tracker
  return [role, isBlocked, roleLoading];
};

export default useRole;