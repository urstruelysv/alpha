import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AudioProvider } from "@/hooks/useAudioPlayer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Alpha Fitness Shadnagar",
  description:
    "Alpha Fitness is Shadnagar's biggest and most premium gym. We offer 24/7 access to advanced fitness equipment, expert personal trainers, and specialized programs like bodybuilding, strength training, and women's fitness. Join our community to achieve your fitness goals with services like nutrition consultation and physiotherapy.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AudioProvider>{children}</AudioProvider>
      </body>
    </html>
  );
}
