import type { Metadata } from "next";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import "./globals.css";

export const metadata: Metadata = {
  title: "number1",
  description: "High-end web design and motion graphics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
