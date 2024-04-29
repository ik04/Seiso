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
  const callUserData = async () => {
    try {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/user-data`,
        {
          withCredentials: true,
        }
      );
      console.log(resp);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    callUserData();
  }, []);
  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
};
