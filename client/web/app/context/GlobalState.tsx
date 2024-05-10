"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import axios from "axios";

export const GlobalState = ({
  children,
  baseUrl,
}: {
  children: ReactNode;
  baseUrl?: string;
}) => {
  const [name, setName] = useState<string>();
  const [token, setToken] = useState<string>();
  const callUserData = async () => {
    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user-data`,
        {
          withCredentials: true,
        }
      );
      // console.log(resp.data);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${resp.data.token}`;
      setName(resp.data.user.name);
      setToken(resp.data.token);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callUserData();
  }, []);
  return (
    <GlobalContext.Provider value={{ token }}>
      {children}
    </GlobalContext.Provider>
  );
};
