import { ReactNode } from "react";

import Link from "next/link";
import "./index.css";
import Image from "next/image";
import IconCamera from "../../assets/camera.svg";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <header className="border-b">
        <div className="content">
          <Link href="/" passHref className="px-2 py-2 inline-flex">
            <Image src={IconCamera} alt="camera" width={30} height={30} />
          </Link>
        </div>
      </header>
      {children}
    </>
  );
}
