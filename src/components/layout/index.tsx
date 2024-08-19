import { ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";
import IconCamera from "../../assets/camera.svg";
import "./index.css";
import NavLinks from "./nav-links";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="border-b">
        <div className="content flex items-center">
          <Link href={"/"} className="mr-2">
            <Image src={IconCamera} alt="camera" width={30} height={30} />
          </Link>
          <NavLinks />
        </div>
      </header>
      {children}
    </>
  );
}
