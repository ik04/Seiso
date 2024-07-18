"use client";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "./navbar";
import Link from "next/link";
import axios from "axios";
import { GlobalContext } from "@/app/context/GlobalContext";
import { Slip } from "@/types/Slip";
import { Skeleton } from "@/components/ui/skeleton";
import { SlipCard } from "./slipCard";
import { Toaster } from "sonner";

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
      <Toaster position="bottom-right" richColors expand={true} />
      <div className="p-5 sm:p-10 overflow-auto bg-creamyPeach">
        <div className="flex flex-wrap gap-5">
          <Link
            href={"/slip/add"}
            className="bg-breezyAqua w-full xl:w-80 h-auto sm:h-[20rem] lg:h-[30rem] flex justify-center items-center text-9xl font-spaceGrotesk text-sereneSky"
          >
            <div>+</div>
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
