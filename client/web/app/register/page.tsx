"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

const Page = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [pass, setPass] = useState<string>("");

  const [errors, setErrors] = useState({
    nameError: "",
    passError: "",
    emailError: "",
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;

    if (name.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        nameError: "Name is required",
      }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        nameError: "",
      }));
    }

    if (!validateEmail(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailError: "Invalid email address",
      }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        emailError: "",
      }));
    }

    if (pass.trim() === "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passError: "Password is required",
      }));
      valid = false;
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        passError: "",
      }));
    }

    if (valid) {
      try {
        const resp = await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/signup`,
          { email, password: pass, name }
        );

        if (resp.status == 201 || resp.status == 200) {
          toast({
            variant: "default",
            title: "Account created successfully!",
            description: "your account has been created successfully!",
          });
          location.href = "/login";
        }
      } catch (error: any) {
        toast({
          title: error.response.data.message,
          variant: "destructive",
          description: "please re-fill your details",
        });
        console.error(e);
      }
    }
  };

  return (
    <div className="bg-creamyPeach h-screen font-spaceGrotesk flex justify-center items-center">
      <div className="flex flex-col space-y-4">
        <h2 className="text-azureOcean font-limelight text-5xl tracking-widest uppercase text-center">
          Seiso
        </h2>
        <Label className="capitalize text-azureOcean" htmlFor="name">
          name
        </Label>
        <div>
          <Input
            className="bg-breezyAqua"
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.nameError && (
            <p className="mt-1 text-red-500">{errors.nameError}</p>
          )}
        </div>

        <Label className="capitalize text-azureOcean" htmlFor="email">
          email
        </Label>
        <div>
          <Input
            className="bg-breezyAqua"
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.emailError && (
            <p className="mt-1 text-red-500">{errors.emailError}</p>
          )}
        </div>
        <Label className="capitalize text-azureOcean" htmlFor="password">
          password
        </Label>
        <div>
          <Input
            className="bg-breezyAqua"
            id="password"
            name="password"
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          {errors.passError && (
            <p className="mt-1 text-red-500">{errors.passError}</p>
          )}
        </div>
        <Button
          variant={"ghost"}
          className="text-azureOcean font-spaceGrotesk w-full uppercase text-lg font-bold tracking-[0.2rem]"
          onClick={handleSubmit}
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

export default Page;
