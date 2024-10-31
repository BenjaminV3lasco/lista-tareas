import { useEffect, useState } from "react";
import { URL } from "../consts/consts";


export const useGetUserById = (userId) => {
  const [user, setUser] = useState({
    data: null,
    loading: true,
    error: null,
  });

  const fetchUserById = async () => {
    try {
      const url = `${URL}/users/${userId}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          auth: localStorage.getItem("token"),
        },
      });

      const { data } = await response.json();

      setUser({
        data: data,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.log(error);
      setUser({
        data: null,
        loading: false,
        error: "Failed to fetch user",
      });
    }
  };

  useEffect(() => {
    fetchUserById();
  }, [userId]);

  return user;

  
};