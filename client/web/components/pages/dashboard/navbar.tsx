import Link from "next/link";
import React from "react";

export const Navbar = () => {
  const navlinks = [
    { name: "home", href: "/dashboard" },
    { name: "add", href: "/slip/add" },
    // { name: "laundries", href: "/laundries" },
    { name: "drawer", href: "slip/drawer" },
  ];
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
      </div>
    </div>
  );
};
