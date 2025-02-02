import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import StoreProvider from "./StoreProvider";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bison Web React task",
  description:
    "Bison Web React task, interview assignment see REQUIREMENTS.MD for details.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={openSans.variable}>
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
