import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { GlobalState } from "./context/GlobalState";
import axios from "axios";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Seiso",
  description: "",
};
axios.defaults.withCredentials = true;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <GlobalState>{children}</GlobalState>
      </body>
    </html>
  );
}
