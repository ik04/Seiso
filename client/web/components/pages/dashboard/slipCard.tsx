"use client";
import { Status } from "@/app/enums/Status";
import { Slip } from "@/types/Slip";
import axios from "axios";
import React, { useState } from "react";

const formatDateString = (dateString: Date) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString().slice(-2);
  const weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const weekday = weekdays[date.getDay()];
  const formattedDate = `${day}/${month}/${year} (${weekday})`;
  return formattedDate;
};

export const SlipCard = (slip: Slip) => {
  const [status, setStatus] = useState(slip.status);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const process = async () => {
    setIsLoading(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/process/${slip.uuid}`;
      const resp = await axios.put(url);
      setStatus((prev) => prev + 1);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to process slip:", error);
    } finally {
      setIsLoading(false);
    }
  };
  switch (status) {
    case 0:
      return (
        <div
          key={slip.uuid}
          className="bg-salmonPink md:w-80 md:h-[30rem] text-creamyPeach font-spaceGrotesk capitalize font-semibold md:text-2xl text-start flex flex-col justify-between py-5 px-3"
        >
          <div className="flex flex-col">
            <div className="border-b-2 border-dashed border-creamyPeach text-center p-3 text-3xl">
              <h2>{slip.laundry.name}</h2>
              <div className="text-sm">
                Submitted: {formatDateString(slip.date)}
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-start space-y-3 py-2">
            {Object.entries(slip.items).map(([key, value]: [string, any]) => (
              <div className="flex space-x-3" key={key}>
                <span>{key}: </span>
                <span>{value}</span>
              </div>
            ))}
          </div>
          <div className="flex-2 border-t-2 border-dashed border-creamyPeach flex items-start justify-between pt-3">
            <div className="stats text-creamyPeach text-start p-2">
              <div className="uppercase">Total: {slip.total_items}</div>
              <div className="text-base">
                <div className="uppercase">Status:</div>
                <div className="uppercase text-navyBlue">
                  {Status[slip.status as keyof typeof Status]}
                </div>
              </div>
            </div>
            <div className="buttons text-base text-center flex flex-col space-y-3 justify-center p-3 h-full">
              <div className="view capitalize bg-creamyPeach text-navyBlue p-[0.2rem] rounded-lg">
                view
              </div>
              <button
                onClick={process}
                className="view capitalize bg-creamyPeach text-navyBlue p-[0.2rem] rounded-lg"
              >
                Process
              </button>
            </div>
          </div>
        </div>
      );
    case 1:
      return (
        <div
          key={slip.uuid}
          className="bg-azureOcean md:w-80 md:h-[30rem] text-creamyPeach font-spaceGrotesk capitalize font-semibold md:text-2xl text-start flex flex-col justify-between py-5 px-3"
        >
          <div className="flex flex-col">
            <div className="border-b-2 border-dashed border-creamyPeach text-center p-3 text-3xl">
              <h2>{slip.laundry.name}</h2>
              <div className="text-sm">
                Submitted: {formatDateString(slip.date)}
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-start space-y-3 py-2">
            {Object.entries(slip.items).map(([key, value]: [string, any]) => (
              <div className="flex space-x-3" key={key}>
                <span>{key}: </span>
                <span>{value}</span>
              </div>
            ))}
          </div>
          <div className="flex-2 border-t-2 border-dashed border-creamyPeach flex items-start justify-between pt-3">
            <div className="stats text-breezyAqua text-start p-2">
              <div className="uppercase">Total: {slip.total_items}</div>
              <div className="text-base">
                <div className="uppercase">Status:</div>
                <div className="uppercase text-creamyPeach">
                  {Status[status as keyof typeof Status]}
                </div>
              </div>
            </div>
            <div className="buttons text-base text-center flex flex-col space-y-3 justify-center p-3 h-full">
              <div className="view capitalize bg-breezyAqua text-navyBlue p-[0.2rem] rounded-lg">
                view
              </div>
              <div className="view capitalize bg-breezyAqua text-navyBlue p-[0.2rem] rounded-lg">
                Finish
              </div>
            </div>
          </div>
        </div>
      );

    default:
      break;
  }
};
