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
  title: "Nsangeet — नेपाली संगीतको रेडियो",
  description:
    "A cozy Nepali radio streaming Sabin Rai, John Rai, Bartika Eam Rai, Ankita Pun, Sajjan Raj Vaidya, Sushant KC, Samir Shrestha, The Elements and The Tribal Rain.",
  openGraph: {
    title: "Nsangeet — नेपाली संगीतको रेडियो",
    description:
      "A Nepali music radio — 9 artists, 45 hit songs. Switch artists from the top-right menu.",
    type: "website",
    images: ["/images/nsangeet-logo.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nsangeet — नेपाली संगीतको रेडियो",
    description:
      "A Nepali music radio — 9 artists, 45 hit songs. Switch artists from the top-right menu.",
    images: ["/images/nsangeet-logo.png"],
  },
  icons: {
    icon: "/images/nsangeet-logo.png",
    apple: "/apple-touch-icon.png",
  },
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
