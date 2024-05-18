"use client";
import React, { useContext, useEffect, useState } from "react";
import { Navbar } from "../navbar";
import axios from "axios";
import { GlobalContext } from "@/app/context/GlobalContext";

export const AddPage = () => {
  const { token } = useContext(GlobalContext);
  const [laundry, setLaundry] = useState();
  const [laundries, setLaundries] = useState([]);
  const callLaundries = async () => {
    if (token) {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/laundry/all`;
      const resp = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(resp.data);
      setLaundries(resp.data.laundries);
    }
  };
  useEffect(() => {
    callLaundries();
  }, [token]);
  // todo: onchange of selected call the get schema end point and map out the slip, when nothing is selected display a please select your laundry state
  return (
    <div className="h-screen bg-creamyPeach">
      <Navbar />
      <div className="p-10">
        <div className="">
          <select value={laundry}>{}</select>
        </div>
      </div>
    </div>
  );
};
