"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";

export const GlobalState = ({
  children,
  baseUrl,
}: {
  children: ReactNode;
  baseUrl?: string;
}) => {
  const callUserData = async () => {
    const resp = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user-data`,
      {
        headers: {
          credentials: "include",
        },
      }
    );
    console.log(resp);
  };

  useEffect(() => {
    callUserData();
  }, []);
  return <GlobalContext.Provider value={{}}>{children}</GlobalContext.Provider>;
};
