"use client";
import React, { useContext, useEffect, useState } from "react";
import { Navbar } from "./navbar";
import Link from "next/link";
import axios from "axios";
import { GlobalContext } from "@/app/context/GlobalContext";
import { Slip } from "@/types/Slip";
import { Skeleton } from "@/components/ui/skeleton";
import { SlipCard } from "./SlipCard";

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
        <div className="grid grid-cols-5 gap-y-10">
          <Link href={"/slip/add"}>
            <div className="bg-breezyAqua w-80 h-[30rem] flex justify-center items-center text-9xl font-spaceGrotesk text-sereneSky">
              +
            </div>
          </Link>
          {!loading ? (
            <>
              {slips.map((slip) => (
                <SlipCard
                  date={slip.date}
                  key={slip.uuid}
                  items={slip.items}
                  laundry={slip.laundry}
                  status={slip.status}
                  uuid={slip.uuid}
                  total_items={slip.total_items}
                />
              ))}
            </>
          ) : (
            <>
              {Array.from({ length: 10 }, (_, index) => (
                <Skeleton
                  key={index}
                  className="bg-sereneSky md:w-80 md:h-[30rem]"
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
