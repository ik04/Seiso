"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import Link from "next/link";
import React, { FormEvent } from "react";

const page = () => {
  const login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    let formData = new FormData();

    for (let i = 0; i < form.elements.length; i++) {
      const element = form.elements[i] as HTMLInputElement;
      if (element.name) {
        formData.append(element.name, element.value);
      }
    }

    const loginData = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    try {
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/login`,
        { email: loginData.email, password: loginData.password },
        {
          withCredentials: true,
        }
      );
      toast({
        variant: "default",
        title: "Logged in!",
        description: "you have been logged in successfully!",
      });
      console.log(resp.data);

      location.href = "/dashboard";
    } catch (error: any) {
      console.error("Network error:", error);
      toast({
        title: error.response.data.message,
        variant: "destructive",
        description: "wrong email and password combination",
      });
    }
  };

  return (
    <div>
      <div className="bg-creamyPeach h-screen font-spaceGrotesk flex justify-center items-center">
        <form onSubmit={login} className="flex flex-col space-y-4">
          <h2 className="text-azureOcean font-limelight text-5xl tracking-widest uppercase text-center">
            Seiso
          </h2>
          <Label className="capitalize text-azureOcean" htmlFor="email">
            email
          </Label>
          <Input
            className="bg-breezyAqua"
            id="email"
            name="email"
            type="text"
          />
          <Label className="capitalize text-azureOcean" htmlFor="password">
            password
          </Label>
          <Input
            className="bg-breezyAqua"
            id="password"
            name="password"
            type="password"
          />
          <Button
            type="submit"
            variant={"ghost"}
            className="text-azureOcean font-spaceGrotesk w-full uppercase text-lg font-bold tracking-[0.2rem]"
          >
            Login
          </Button>
          <p className="text-sereneSky font-bold">
            Don't have an account?{" "}
            <Link href={"/register"} className="text-azureOcean font-bold">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default page;
