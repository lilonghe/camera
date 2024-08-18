import { ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";
import IconCamera from "../../assets/camera.svg";
import "./index.css";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="border-b">
        <div className="content flex items-center">
          <Link
            href="/"
            passHref
            className="px-2 py-2 inline-flex items-center"
          >
            <Image src={IconCamera} alt="camera" width={30} height={30} />
            <span className="ml-3 text-xl font-light">Camera</span>
          </Link>
          <Link
            href="/light"
            passHref
            className="px-2 py-2 inline-flex items-center"
          >
            <span className="ml-3 text-xl font-light">Light</span>
          </Link>
        </div>
      </header>
      {children}
    </>
  );
}
