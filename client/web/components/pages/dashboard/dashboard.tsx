"use client";
import React from "react";
import { Navbar } from "./navbar";
import Link from "next/link";

export const Dashboard = () => {
  const fetchSlips = async () => {
    const resp = await fetch("");
  };
  return (
    <div className="h-screen bg-creamyPeach">
      <Navbar />
      <div className="p-10 overflow-auto bg-creamyPeach">
        <h2 className="uppercase font-bold font-spaceGrotesk text-azureOcean text-4xl mb-3">
          Slips
        </h2>
        <div className="grid grid-cols-5 gap-y-10">
          <div className="bg-azureOcean w-80 h-[30rem]"></div>
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
