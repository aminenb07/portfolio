import type { Metadata } from "next";
import { EB_Garamond, Lora, IM_Fell_English_SC } from "next/font/google";
import "./globals.css";
import VignetteOverlay from "@/components/VignetteOverlay";
import CursorTracker from "@/components/CursorTracker";
import AudioManager from "@/components/AudioManager";

const garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
  display: "swap"
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
  display: "swap"
});

const fellEnglish = IM_Fell_English_SC({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-fell",
  display: "swap"
});

export const metadata: Metadata = {
  title: "A. Nabou - Journal",
  description: "Antique Journal Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${garamond.variable} ${lora.variable} ${fellEnglish.variable}`}>
      <body className="font-body">
        <VignetteOverlay />
        <CursorTracker />
        <AudioManager>
          {children}
        </AudioManager>
      </body>
    </html>
  );
}
