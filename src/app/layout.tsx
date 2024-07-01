import type { Metadata } from "next";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import Layout from "@/components/layout";
import { Theme } from "@radix-ui/themes";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Camera",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Theme accentColor="gray" panelBackground="solid">
          <Layout>{children}</Layout>
        </Theme>
      </body>
    </html>
  );
}
