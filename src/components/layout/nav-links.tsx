"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      <Link
        href="/"
        passHref
        className={
          "px-2 py-2 inline-flex items-center " +
          `${pathname === "/" ? "" : "text-[#73828c]"}`
        }
      >
        <span className="ml-3 text-xl font-light">Home</span>
      </Link>
      <Link
        href="/light"
        passHref
        className={
          "px-2 py-2 inline-flex items-center " +
          `${pathname === "/light" ? "" : "text-[#73828c]"}`
        }
      >
        <span className="ml-3 text-xl font-light">Light</span>
      </Link>
    </>
  );
}
