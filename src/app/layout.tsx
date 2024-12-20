import Layout from "@/components/layout";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";
import type { Metadata, Viewport } from "next";
import "./globals.css";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Camera - 相机",
  description:
    "浏览最新发布相机的传感器大小，像素，外观尺寸，重量等信息，对比选出适合自己的相机",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Theme accentColor="gray" panelBackground="solid">
          <Layout>{children}</Layout>
          {modal}
          <div id="modal-root" />
        </Theme>
      </body>
    </html>
  );
}
