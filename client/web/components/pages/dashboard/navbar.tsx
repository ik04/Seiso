"use client";
import { GlobalContext } from "@/app/context/GlobalContext";
import axios from "axios";
import Link from "next/link";
import React, { useContext } from "react";
import { toast } from "sonner";

export const Navbar = () => {
  const { token } = useContext(GlobalContext);
  const navlinks = [
    { name: "home", href: "/dashboard" },
    { name: "drawer", href: "slip/drawer" },
    { name: "add", href: "/slip/add" },
    // { name: "laundries", href: "/laundries" },
  ];
  const logout = async () => {
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/logout`;
    const resp = await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    toast.success("User logged out successfully!");
    // location.href = "/";
  };
  return (
    <div className="w-full border-[3px] p-3 md:p-5 border-b-azureOcean flex items-center justify-between">
      <h1 className="text-azureOcean font-limelight text-5xl tracking-widest uppercase text-center">
        Seiso
      </h1>
      <div className="navlinks flex space-x-8 text-azureOcean font-spaceGrotesk font-semibold uppercase">
        {navlinks.map((navlink) => (
          <Link href={navlink.href} className="">
            {navlink.name}
          </Link>
        ))}
        {/* <div
          onClick={logout}
          className="logout text-red-500 font-semibold cursor-pointer"
        >
          logout
        </div> */}
      </div>
    </div>
  );
};
