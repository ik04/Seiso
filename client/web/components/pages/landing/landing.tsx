"use client";
import React, { useEffect } from "react";
import { Navbar } from "../landing/navbar";
import Lottie from "react-lottie-player";
import laundryDude from "../../../app/lottie/laundryDude.json";
// import laundryDude from "../../../app/lottie/laundryDude2.json";

export const Landing = () => {
  return (
    <div className="min-h-screen bg-creamyPeach">
      <Navbar />
      <div className="flex xl:flex-row flex-col-reverse items-center mt-12 xl:mt-0 xl:h-[70%] justify-center space-x-5 xl:space-x-10">
        <Lottie
          loop
          animationData={laundryDude}
          play
          className="xl:w-[800px] xl:h-[800px] w-full h-full"
          
        />
        <div className="flex flex-col space-y-2 xl:space-y-10">
          <div className="flex flex-col space-y-2 font-limelight text-azureOcean uppercase text-7xl lg:text-[120px]">
            <h1>Track</h1>
            <h1>Your</h1>
            <h1>Apparel</h1>
          </div>
          <p className="text-sereneSky text-3xl xl:w-[600px] font-spaceGrotesk">
            follow your laundry across multiple laundromats with ease
          </p>
        </div>
      </div>
    </div>
  );
};
