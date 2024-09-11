"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  const links: {
    href: string;
    label: string;
    children?: { href: string; label: string }[];
  }[] = [
    {
      href: "/",
      label: "首页",
    },
    {
      href: "/camera",
      label: "相机",
    },
    // {
    //   href: "/tools",
    //   label: "工具",
    //   children: [
    //     {
    //       href: "/tools/exif",
    //       label: "照片信息",
    //     },
    //   ],
    // },
    {
      href: "/tools/exif",
      label: "照片信息解析",
    },
    // {
    //   href: "/light",
    //   label: "灯光模拟",
    // },
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
            <ul className="border-t ml-0 absolute top-[44px] left-0 shadow-lg w-full rounded hidden group-hover/item:block">
              {link.children.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    className={`text-center px-3 py-2 inline-flex min-w-full items-center justify-center whitespace-nowrap bg-white 
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
