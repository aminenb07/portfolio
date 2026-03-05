import type { Metadata } from "next";
import { EB_Garamond, IM_Fell_English_SC, Uncial_Antiqua, Inknut_Antiqua } from "next/font/google";
import "./globals.css";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-garamond",
  display: "swap",
});

const imFell = IM_Fell_English_SC({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-fell",
  display: "swap",
});

const uncial = Uncial_Antiqua({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-uncial",
  display: "swap",
});

const inknut = Inknut_Antiqua({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-inknut",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Amine Nabou | Portfolio",
  description: "Creative Front-End Engineer & Designer Portfolio - Volume MMXXIV",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${ebGaramond.variable} ${imFell.variable} ${uncial.variable} ${inknut.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
