"use client";
import { GlobalContext } from "@/app/context/GlobalContext";
import Link from "next/link";
import React, { useContext } from "react";

export const Navbar = () => {
  const { name, isAuthenticated } = useContext(GlobalContext);
  const navlinks = [
    { name: "login", href: "/login" },
    { name: "register", href: "/register" },
  ];

  const authLinks = [
    { name: name, href: "/dashboard" },
    { name: "dashboard", href: "/dashboard" },
  ];
  return (
    <div className="w-full border-[3px] p-3 md:p-5 border-b-azureOcean flex items-center justify-between">
      <h1 className="text-azureOcean font-limelight text-5xl tracking-widest uppercase text-center">
        Seiso
      </h1>
      <div className="navlinks flex space-x-8 text-azureOcean font-spaceGrotesk font-semibold uppercase">
        {!isAuthenticated ? (
          <>
            {navlinks.map((navlink) => (
              <Link href={navlink.href} className="">
                {navlink.name}
              </Link>
            ))}
          </>
        ) : (
          <>
            {authLinks.map((navlink) => (
              <Link href={navlink.href} className="">
                {navlink.name}
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
