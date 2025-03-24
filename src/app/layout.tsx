import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SOSTH - เบอร์โทรฉุกเฉิน",
  description: "แหล่งรวมเบอร์โทรฉุกเฉินและหน่วยงานสำคัญในประเทศไทย",
  manifest: "/manifest.json",
  themeColor: "#1e3a8a",
  icons: {
    icon: "/icons/icon-192x192.png",
    apple: [
      { url: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" }
    ],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  openGraph: {
    title: "SOSTH - เบอร์โทรฉุกเฉิน",
    description: "แหล่งรวมเบอร์โทรฉุกเฉินและหน่วยงานสำคัญในประเทศไทย",
    url: "https://sosth.com",
    siteName: "SOSTH",
    locale: "th_TH",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SOSTH - เบอร์โทรฉุกเฉิน",
    description: "แหล่งรวมเบอร์โทรฉุกเฉินและหน่วยงานสำคัญในประเทศไทย",
  },
  appleWebApp: {
    title: "SOSTH",
    statusBarStyle: "black-translucent",
    capable: true,
    startupImage: [
      "/icons/icon-512x512.png"
    ]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}
      >
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
