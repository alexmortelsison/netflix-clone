"use client";
import { BellIcon, SearchIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import UserNav from "./UserNav";

interface linkProps {
  name: string;
  href: string;
}

const links: linkProps[] = [
  { name: "Home", href: "/home" },
  { name: "Tv Shows", href: "/home/shows" },
  { name: "Movies", href: "/home/movies" },
  { name: "Recently Added", href: "/home/recently" },
  { name: "My List", href: "/home/user/list" },
];

export default function Navbar() {
  const pathname = usePathname();
  return (
    <div className="w-full max-w-7xl mx-auto items-center justify-between px-5 sm:px-6 py-5 lg:px-8 flex">
      <div className="flex items-center">
        <Link href={"/home"} className="w-32">
          <Image
            src={"/netflix_logo.svg"}
            alt="logo"
            priority
            width={200}
            height={200}
          />
        </Link>
        <ul className="lg:flex gap-x-4 ml-14 hidden">
          {links.map((link, idx) => (
            <div key={idx}>
              {pathname === link.href ? (
                <li>
                  <Link
                    className="text-white font-semibold underline text-sm"
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                </li>
              ) : (
                <li>
                  <Link
                    className="text-gray-300 font-normal text-sm"
                    href={link.href}
                  >
                    {link.name}
                  </Link>
                </li>
              )}
            </div>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-x-8">
        <SearchIcon className="w-5 h-5 text-gray-300 cursor-pointer" />
        <BellIcon className="w-5 h-5 text-gray-300 cursor-pointer" />
        <UserNav />
      </div>
    </div>
  );
}
