import { Status } from "@/app/enums/Status";
import { Slip } from "@/types/Slip";
import React from "react";

export const SlipCard = (slip: Slip) => {
  return (
    <div
      key={slip.uuid}
      className="bg-azureOcean md:w-80 md:h-[30rem] text-creamyPeach font-spaceGrotesk capitalize font-semibold md:text-2xl text-start flex flex-col justify-between py-5 px-3"
    >
      <div className="border-b-2 border-dashed border-creamyPeach text-center p-3 text-3xl">
        {slip.laundry.name}
      </div>
      <div className="flex-1 flex flex-col justify-center space-y-5">
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
              {Status[slip.status as keyof typeof Status]}
            </div>
          </div>
        </div>
        <div className="buttons text-base text-center flex flex-col space-y-3 justify-center p-3 h-full">
          <div className="view capitalize bg-breezyAqua text-azureOcean p-[0.2rem] rounded-lg">
            view
          </div>
          <div className="view capitalize bg-breezyAqua text-azureOcean p-[0.2rem] rounded-lg">
            Process
          </div>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};
