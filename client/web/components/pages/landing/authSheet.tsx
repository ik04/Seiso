import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export const AuthSheet = () => {
  return (
    <Sheet>
      <SheetTrigger className="font-spaceGrotesk">Login/Register</SheetTrigger>
      <SheetContent className="font-spaceGrotesk bg-creamyPeach">
        <SheetHeader>
          <SheetTitle className="font-bold text-azureOcean uppercase">
            Login
          </SheetTitle>
          <SheetDescription className="text-sereneSky font-semibold">
            Don't have an account?{" "}
            <span className="text-azureOcean font-bold">Register</span>
          </SheetDescription>
        </SheetHeader>
        <div className="form flex flex-col space-y-5 py-5">
          <div className="">
            <Label className="capitalize text-azureOcean" htmlFor="email">
              Email
            </Label>
            <Input
              className="text-azureOcean focus:border focus:border-azureOcean"
              id="email"
            />
          </div>
          <div className="">
            <Label className="capitalize text-azureOcean" htmlFor="pass">
              Password
            </Label>
            <Input
              className="text-azureOcean focus:border focus:border-azureOcean"
              id="pass"
            />
          </div>
          <Button className="text-white bg-azureOcean">Login</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};
