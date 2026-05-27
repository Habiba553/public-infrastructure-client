import { useEffect, useState } from "react";

import axios from "axios";

import useAuth from "./useAuth";

const usePremium = () => {

  const { user } = useAuth();

  const [premium, setPremium] = useState(false);

  useEffect(() => {

    if (user?.email) {

      axios.get(

        `http://localhost:5000/users/${user.email}`,

        {
          headers: {
            authorization: `Bearer ${
              localStorage.getItem('access-token')
            }`
          }
        }
      )
      .then(res => {

        setPremium(res.data.premium);
      });
    }

  }, [user]);

  return premium;
};

export default usePremium;