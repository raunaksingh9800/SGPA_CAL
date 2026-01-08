import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CGPA Calculator",
    template: "%s | CGPA Calculator",
  },
  description:
    "Accurate CGPA calculator for engineering students with IA, Assignment, and SEE marks. Mobile-friendly, fast, and offline-ready.",
  applicationName: "CGPA Calculator",
  keywords: [
    "CGPA calculator",
    "engineering CGPA",
    "SGPA to CGPA",
    "college marks calculator",
    "VTU CGPA",
  ],
  authors: [{ name: "Raunak Singh" }],
  creator: "Raunak Singh",
  metadataBase: new URL("https://cgpa-calculator.vercel.app"),
  openGraph: {
    title: "CGPA Calculator",
    description:
      "Calculate your CGPA instantly using IA, Assignment, and SEE marks.",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "CGPA Calculator",
    description:
      "Fast and accurate CGPA calculator for engineering students.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
