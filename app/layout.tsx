import type { Metadata } from "next";
import { DM_Sans, Fraunces, Yatra_One } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const yatraOne = Yatra_One({
  variable: "--font-yatra-one",
  weight: "400",
  subsets: ["latin", "devanagari"],
});

export const metadata: Metadata = {
  title: "Rai ko Chiya Pasal",
  description:
    "A cozy Nepali roadside tea shop, and an old radio playing Sabin Rai, John Rai and Bartika Eam Rai.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ne"
      className={`${dmSans.variable} ${fraunces.variable} ${yatraOne.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
