import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./ui/header/header";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "What to watch",
  description: "Movies lookup when you are not sure what to watch",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="max-width-wrapper" style={{ margin: "0 auto" }}>
          <div>
            <Header />
          </div>
          <div style={{ marginTop: "48px" }}>{children}</div>
          <Analytics />
        </div>
      </body>
    </html>
  );
}
