"use client";
import React, { useContext, useEffect, useState } from "react";
import { Navbar } from "../../dashboard/navbar";
import { Toaster } from "sonner";
import axios from "axios";
import { GlobalContext } from "@/app/context/GlobalContext";
import { Slip } from "@/types/Slip";
import { Skeleton } from "@/components/ui/skeleton";
import { SlipCard } from "../../dashboard/slipCard";

export const DrawerPage = () => {
  const { token } = useContext(GlobalContext);
  const [slips, setSlips] = useState<Slip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchFinishedSlips = async () => {
    if (token) {
      const resp = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/slip/fetch/finished`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSlips(resp.data.slips);
      setLoading(false);
      console.log(resp);
    }
  };
  useEffect(() => {
    fetchFinishedSlips();
  }, [token]);

  return (
    <div className="min-h-screen bg-creamyPeach">
      <Navbar />
      <Toaster position="bottom-right" richColors expand={true} />
      <div className="md:p-10 md:h-[90%] flex flex-col space-y-5">
        <h1 className="text-center font-spaceGrotesk md:font-bold text-azureOcean uppercase md:text-4xl">
          The Drawer
        </h1>
        <div className="slips-container grid grid-cols-5 gap-y-10">
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
