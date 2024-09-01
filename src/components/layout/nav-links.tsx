"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  const links = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/tools",
      label: "Tools",
      children: [
        {
          href: "/tools/exif",
          label: "EXIF",
        },
      ],
    },
    {
      href: "/light",
      label: "Light",
    },
  ];

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.children ? "#" : link.href}
          passHref
          className={
            "px-3 py-2 inline-flex items-center relative group/item " +
            `${
              pathname === link.href ||
              (link.children && pathname.startsWith(link.href))
                ? ""
                : "text-[#73828c] cursor-pointer"
            }`
          }
        >
          <span className="text-xl font-light">{link.label}</span>
          {link.children && (
            <ul className="border-t ml-0 absolute top-[44px] left-0 bg-white shadow-lg w-full rounded hidden group-hover/item:block">
              {link.children.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    className={`text-center px-3 py-2 inline-flex w-full items-center justify-center 
                      ${
                        pathname === child.href
                          ? ""
                          : "text-[#73828c] cursor-pointer"
                      }`}
                  >
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Link>
      ))}
    </>
  );
}
