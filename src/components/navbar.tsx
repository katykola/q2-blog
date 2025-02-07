'use client';

import { usePathname } from "next/navigation";
import Link from "next/link";

const navLinks = [
    {name: 'Blog', href: '/'},
    {name: 'Přidat článek', href: '/new'},
  ]

export default function Navbar() {
    const pathname = usePathname();
    return(
        <div className="flex flex-row items-center">
            <div className="flex flex-row items-top text-white gap-8 text-opacity-100">
              {navLinks.map((link, index) => {
                const isActive = link.href === pathname || (pathname.startsWith(link.href) && link.href !== '/');
                return(
                  <Link key={index} href={link.href}>
                    <p className="menuItem text-sm p-1 hover:text-[#D4A373]">{link.name}</p>
                    {isActive && <div className="h-[2px] bg-[#D4A373]"></div>}
                  </Link>
              )})}
          </div>
        </div>
    )
} 