import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="bg-creamyPeach h-screen font-spaceGrotesk flex justify-center items-center">
      <div className="flex flex-col space-y-4">
        <h2 className="text-azureOcean font-limelight text-5xl tracking-widest uppercase text-center">
          Seiso
        </h2>
        <Label className="capitalize text-azureOcean" htmlFor="name">
          name
        </Label>
        <Input className="bg-breezyAqua" id="name" name="name" type="text" />
        <Label className="capitalize text-azureOcean" htmlFor="email">
          email
        </Label>
        <Input className="bg-breezyAqua" id="email" name="email" type="text" />
        <Label className="capitalize text-azureOcean" htmlFor="password">
          password
        </Label>
        <Input
          className="bg-breezyAqua"
          id="password"
          name="password"
          type="text"
        />
        <Button
          variant={"ghost"}
          className="text-azureOcean font-spaceGrotesk w-full uppercase text-lg font-bold tracking-[0.2rem]"
        >
          Register
        </Button>
        <p className="text-sereneSky font-bold">
          Have an account?{" "}
          <Link href={"/login"} className="text-azureOcean font-bold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
