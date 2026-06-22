import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "booking.noosa — Holiday Accommodation in Noosa",
  description: "Discover stunning holiday properties across the Noosa region. Beachfront villas, riverfront cottages, hinterland retreats and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} bg-gray-50 min-h-full flex flex-col`}>
        <Navbar />
        <main className="pt-16 flex-1">{children}</main>
      </body>
    </html>
  );
}
