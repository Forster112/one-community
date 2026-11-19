import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ALX One Community Festival 🌍 | 23 November – 13 December",
  description:
    "The ONE COMMUNITY FESTIVAL 🌍 is happening from 23 November to 13 December! Join the ALX community for regional meetups, virtual events, career conversations, and earn DOUBLE LEGACY POINTS on eligible festival activities.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F8F8F8] text-[#03134F]">
        {children}
      </body>
    </html>
  );
}
