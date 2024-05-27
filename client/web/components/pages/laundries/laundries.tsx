"use client";
import React, { useContext, useEffect, useState } from "react";
import { Navbar } from "../dashboard/navbar";
import { GlobalContext } from "@/app/context/GlobalContext";
import axios from "axios";
import { Laundry } from "@/types/Laundry";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

export const Laundries = () => {
  const { token } = useContext(GlobalContext);
  const [laundries, setLaundries] = useState<Laundry[]>([]);
  const [loading, setLoading] = useState(true);

  const callLaundries = async () => {
    if (token) {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/laundry/names`;
      const resp = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(resp.data.laundries);
      setLaundries(resp.data.laundries);
      setLoading(false);
    }
  };
  useEffect(() => {
    callLaundries();
  }, [token]);
  return (
    <div className="bg-creamyPeach h-screen">
      <Navbar />
      <div className="p-10">
        <div className="flex flex-wrap gap-4">
          {!loading ? (
            <>
              {laundries.map((laundry) => (
                <>
                  <Link
                    href={`/laundry/${laundry.slug}`}
                    className=" text-creamyPeach font-spaceGrotesk capitalize font-bold text-3xl"
                  >
                    <div className="w-72 h-72 bg-azureOcean flex justify-center items-center">
                      {laundry.name}
                    </div>
                  </Link>
                </>
              ))}
            </>
          ) : (
            Array.from({ length: 12 }, (_, index) => (
              <Skeleton key={index} className="w-72 h-72 bg-sereneSky" />
            ))
          )}
        </div>
      </div>
    </div>
  );
};
