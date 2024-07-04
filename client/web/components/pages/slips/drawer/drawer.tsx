"use client";
import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../dashboard/navbar";
import { Toaster } from "sonner";
import axios from "axios";
import { GlobalContext } from "@/app/context/GlobalContext";
import { Slip } from "@/types/Slip";
import { Skeleton } from "@/components/ui/skeleton";
import { SlipCard } from "../../dashboard/slipCard";
import Image from "next/image";

export const DrawerPage = () => {
  const { token } = useContext(GlobalContext);
  const [slips, setSlips] = useState<Slip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isEmpty, setIsEmpty] = useState<boolean>(false);
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
      console.log(resp.data.slips.length);

      if (resp.data.slips.length == 0) {
        setIsEmpty(true);
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchFinishedSlips();
  }, [token]);

  return (
    <div className="min-h-screen bg-creamyPeach flex flex-col">
      <Navbar />
      <Toaster position="bottom-right" richColors expand={true} />
      <div className="md:p-10 flex-1 flex flex-col space-y-5">
        <h1 className="text-center font-spaceGrotesk md:font-bold text-azureOcean uppercase md:text-4xl">
          The Drawer
        </h1>
        {!isEmpty ? (
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
        ) : (
          <div className="flex justify-center items-center flex-1">
            <div className="flex flex-col justify-center items-center space-y-4">
              <Image
                alt=""
                src={"/assets/emptyDrawer.png"}
                height={130}
                width={130}
              />
              <p className="font-spaceGrotesk font-black text-azureOcean capitalize text-4xl">
                The Drawer is empty
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
