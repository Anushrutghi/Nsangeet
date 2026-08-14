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
  title: "Rai ko Chiya Pasal — राईको चिया पसल",
  description:
    "A cozy Nepali roadside tea shop, and an old radio playing Sabin Rai, John Rai, Bartika Eam Rai, Ankita Pun, Sajjan Raj Vaidya, Sushant KC, Samir Shrestha, The Elements and The Tribal Rain.",
  openGraph: {
    title: "Rai ko Chiya Pasal — राईको चिया पसल",
    description:
      "A cozy Nepali roadside tea shop, and an old radio playing 9 Nepali artists — switch them from the top-right menu.",
    type: "website",
    images: ["/images/chiya-pasal.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rai ko Chiya Pasal — राईको चिया पसल",
    description:
      "A cozy Nepali roadside tea shop, and an old radio playing 9 Nepali artists — switch them from the top-right menu.",
    images: ["/images/chiya-pasal.jpg"],
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
