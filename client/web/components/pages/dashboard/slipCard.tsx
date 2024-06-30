"use client";
import { GlobalContext } from "@/app/context/GlobalContext";
import { Status } from "@/app/enums/Status";
import { Slip } from "@/types/Slip";
import axios from "axios";
import { Trash } from "lucide-react";
import React, { useContext, useState } from "react";
import { BeatLoader } from "react-spinners";
import { toast } from "sonner";

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
  const { token } = useContext(GlobalContext);
  const [status, setStatus] = useState(slip.status);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteSlip = async () => {
    setIsLoading(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/slip/delete/${slip.uuid}`;
      const resp = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStatus(3);
      // ! make this dynamic, assign to greater than final enum to ensure card dissapears
      toast.info("Slip deleted successfully!");
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to delete slip:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const processSlip = async () => {
    setIsLoading(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/slip/process/${slip.uuid}`;
      const resp = await axios.put(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Laundry Submitted and Slip processed!");
      setStatus((prev) => prev + 1);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to process slip:", error);
    } finally {
      setIsLoading(false);
    }
  };
  const finishSlip = async () => {
    setIsLoading(true);
    try {
      const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/slip/finish/${slip.uuid}`;
      const resp = await axios.put(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // setStatus((prev) => prev + 1);
      setStatus(3);
      // ! make this dynamic, assign to greater than final enum to ensure card dissapears
      toast.success("Slip processed successfully, shifted to the drawer!");
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to finish slip:", error);
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
            <div className="border-b-2 border-dashed border-creamyPeach text-start p-3 text-3xl">
              <div className="flex">
                <h2 className="flex-1">{slip.laundry.name}</h2>
                <Trash onClick={deleteSlip} size={30} className="" />
              </div>
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
              {!isLoading ? (
                <button
                  onClick={processSlip}
                  className="view capitalize bg-creamyPeach text-navyBlue p-[0.2rem] rounded-lg"
                >
                  Process
                </button>
              ) : (
                <button
                  onClick={processSlip}
                  className="view capitalize bg-creamyPeach text-navyBlue p-[0.2rem] rounded-lg justify-center items-center"
                  disabled
                >
                  <BeatLoader color="#003F71" size={10} />
                </button>
              )}
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
            <div className="border-b-2 border-dashed border-creamyPeach text-start p-3 text-3xl">
              <div className="flex">
                <h2 className="flex-1">{slip.laundry.name}</h2>
                <Trash onClick={deleteSlip} size={30} className="" />
              </div>
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
              <button className="view capitalize bg-breezyAqua text-navyBlue p-[0.2rem] rounded-lg">
                view
              </button>
              {!isLoading ? (
                <button
                  onClick={finishSlip}
                  className="view capitalize bg-breezyAqua text-navyBlue p-[0.2rem] rounded-lg"
                >
                  Recieved
                </button>
              ) : (
                <button
                  className="view capitalize bg-breezyAqua text-navyBlue p-[0.2rem] rounded-lg"
                  disabled
                >
                  <BeatLoader color="#003F71" size={10} />
                </button>
              )}
            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div
          key={slip.uuid}
          className="bg-green-700 md:w-80 md:h-[30rem] text-breezyAqua font-spaceGrotesk capitalize font-semibold md:text-2xl text-start flex flex-col justify-between py-5 px-3"
        >
          <div className="flex flex-col">
            <div className="border-b-2 border-dashed border-breezyAqua text-center p-3 text-3xl">
              <div className="flex">
                <h2 className="flex-1">{slip.laundry.name}</h2>
              </div>
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
          <div className="flex-2 border-t-2 border-dashed border-breezyAqua flex items-start justify-between pt-3">
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
              <Trash onClick={deleteSlip} size={30} className="" />
            </div>
          </div>
        </div>
      );

    default:
      break;
  }
};
