"use client";
import React, { useContext, useEffect, useState } from "react";
import { Navbar } from "./navbar";
import Link from "next/link";
import axios from "axios";
import { GlobalContext } from "@/app/context/GlobalContext";
import { Slip } from "@/types/Slip";
import { Skeleton } from "@/components/ui/skeleton";
import { Status } from "@/app/enums/Status";

export const Dashboard = () => {
  const { token } = useContext(GlobalContext);
  const [slips, setSlips] = useState<Slip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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
        setLoading(false);
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
          {!loading ? (
            <>
              {slips.map((slip) => (
                <div
                  key={slip.uuid}
                  className="bg-azureOcean md:w-80 md:h-[30rem] text-creamyPeach font-spaceGrotesk capitalize font-semibold md:text-2xl text-start flex flex-col justify-between py-5 px-3"
                >
                  <div className="border-b-2 border-dashed border-creamyPeach text-center p-2 text-3xl">
                    {slip.laundry.name}
                  </div>
                  <div className="flex-1 flex flex-col justify-center space-y-5">
                    {Object.entries(slip.items).map(
                      ([key, value]: [string, any]) => (
                        <div className="flex space-x-3" key={key}>
                          <span>{key}: </span>
                          <span>{value}</span>
                        </div>
                      )
                    )}
                  </div>
                  <div className="flex-2 border-t-2 border-dashed border-creamyPeach">
                    <div className="stats text-breezyAqua text-start p-2">
                      <div className="uppercase">Total: {slip.total_items}</div>
                      <div className="text-base">
                        <div className="uppercase">Status:</div>
                        <div className="uppercase text-creamyPeach">
                          {Status[slip.status as keyof typeof Status]}
                        </div>
                      </div>
                    </div>
                    <div className="buttons">
                      <div className="view capitalize bg-breezyAqua text-azureOcean">
                        view
                      </div>
                      <div className=""></div>
                    </div>
                  </div>
                </div>
              ))}
              <Link href={"/slip/add"}>
                <div className="bg-breezyAqua w-80 h-[30rem] flex justify-center items-center text-9xl font-spaceGrotesk text-sereneSky">
                  +
                </div>
              </Link>
            </>
          ) : (
            <>
              {Array.from({ length: 10 }, (_, index) => (
                <Skeleton className="bg-sereneSky md:w-80 md:h-[30rem]" />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
