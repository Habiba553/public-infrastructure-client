import { useEffect, useState } from "react";

import useAuth from "./useAuth";

import axios from "axios";

const useRole = () => {

  const { user } = useAuth();

  const [role, setRole] = useState('');
  const [roleLoading, setRoleLoading] = useState(true);

  useEffect(() => {

    if (user?.email) {

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
      
        setRole(res.data.role);
      
        setRoleLoading(false);
      
      });

    }

  }, [user]);

  return [role, roleLoading];
};

export default useRole;