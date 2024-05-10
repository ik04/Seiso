"use client";
import React, { useContext, useEffect, useState } from "react";
import { Navbar } from "./navbar";
import Link from "next/link";
import axios from "axios";
import { GlobalContext } from "@/app/context/GlobalContext";
import { Slip } from "@/types/Slip";

export const Dashboard = () => {
  const { token } = useContext(GlobalContext);
  const [slips, setSlips] = useState<Slip[]>([]);

  const fetchSlips = async () => {
    if (token) {
      try {
        const resp = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/slip/fetch`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSlips(resp.data.slips);
      } catch (error) {
        console.error("Error fetching slips:", error);
      }
    }
  };

  useEffect(() => {
    fetchSlips();
  }, [token]);

  return (
    <div className="h-screen bg-creamyPeach">
      <Navbar />
      <div className="p-10 overflow-auto bg-creamyPeach">
        <h2 className="uppercase font-bold font-spaceGrotesk text-azureOcean text-4xl mb-3">
          Slips
        </h2>
        <div className="grid grid-cols-5 gap-y-10">
          {slips.map((slip) => (
            <div
              key={slip.uuid}
              className="bg-azureOcean md:w-80 md:h-[30rem] text-breezyAqua font-spaceGrotesk capitalize font-semibold md:text-2xl text-start flex flex-col justify-center px-3"
            >
              {Object.entries(slip.items).map(([key, value]: [string, any]) => (
                <div className="flex space-x-3" key={key}>
                  <span>{key}: </span>
                  <span>{value}</span>
                </div>
              ))}
              <div className="text-center">{slip.laundry.name}</div>
            </div>
          ))}
          <Link href={"/slip/add"}>
            <div className="bg-breezyAqua w-80 h-[30rem] flex justify-center items-center text-9xl font-spaceGrotesk text-sereneSky">
              +
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
