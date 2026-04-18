import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StadiumSync",
  description: "Real-time crowd coordination engine for smart stadiums.",
  manifest: "/manifest.json",
  themeColor: "#0a0a0a",
  viewport: "minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-neutral-950 text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
