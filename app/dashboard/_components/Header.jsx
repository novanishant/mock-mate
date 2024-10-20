"use client";
import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";
import { useUser } from "@clerk/nextjs";
import Link from 'next/link';
function Header() {
  const path = usePathname();
  const { user } = useUser();
  return (
    <div className="flex p-2 px-5 justify-between bg-secondary shadow-sm">
      <Link href ={'/'}>
      <Image src={"/logo.svg"} width={200} height={120} alt={"MockMate"} className="cursor-pointer"/>
      </Link>
      {/* <ul className={"hidden md:flex gap-10 pt-4"}>
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path == "/dashboard" && " text-primary font-bold"
          }`}
        >
          Dashboard
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path == "/dashboard/questions" && " text-primary font-bold"
          }`}
        >
          Questions
        </li>
        
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path == "/dashboard/how " && " text-primary font-bold"
          }`}
        >
          How it Works?
        </li>
      </ul> */}
      <div className="flex items-center gap-4">
        <UserButton />
        <h1 className="text-gray-800 text-lg font-bold hidden md:block">
          {user?.firstName} {user?.lastName}
        </h1>
      </div>
    </div>
  );
}

export default Header;
