import { cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";

export default function Navbar() {
  const navlinks = [
    { name: "home", href: "/dashboard" },
    { name: "drawer", href: "slip/drawer" },
    { name: "add", href: "/slip/add" },
    // { name: "laundries", href: "/laundries" },
  ];
  // const logout = () => {
  //   document.cookie = `at=; Max-Age=0; path=/;`;
  //   toast.success("User logged out successfully!");
  //   // location.href = "/login";
  // };
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
}
