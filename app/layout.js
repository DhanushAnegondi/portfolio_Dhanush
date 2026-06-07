import "./globals.css";
import { Hanken_Grotesk, JetBrains_Mono, Caveat } from "next/font/google";

const sans = Hanken_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

const hand = Caveat({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700"],
  variable: "--font-hand",
});

export const metadata = {
  title: "Dhanush Chandra — Data Engineer",
  description:
    "Data Engineer building reliable, observable data pipelines in Python, SQL, Spark, and Airflow. Ask the on-site AI why to hire him.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`dark ${sans.variable} ${mono.variable} ${hand.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
