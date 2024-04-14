"use client";
import React, { useEffect } from "react";
import { AuthSheet } from "./authSheet";
import axios from "axios";

export const Landing = () => {
  const healthcheck = async () => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/healthcheck`;
    const resp = await axios.get(url, { withCredentials: true });
    console.log(resp);
  };

  useEffect(() => {
    healthcheck();
  }, []);

  return (
    <div>
      <AuthSheet />
    </div>
  );
};
