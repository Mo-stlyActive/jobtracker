import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "JobTracker - Application Management System",
  description: "A modern, feature-rich job application tracking system built with Next.js, React, and TypeScript. Track your job applications, manage interviews, and analyze your job search progress.",
  keywords: ["job tracker", "job application", "career management", "job search", "interview tracking"],
  authors: [{ name: "JobTracker Team" }],
  creator: "JobTracker",
  publisher: "JobTracker",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/icons/icon-192x192.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jobtracker.example.com",
    title: "JobTracker - Application Management System",
    description: "Track your job applications with ease. A modern, open-source job tracking application.",
    siteName: "JobTracker",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "JobTracker Application Management System",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "JobTracker - Application Management System",
    description: "Track your job applications with ease. A modern, open-source job tracking application.",
    images: ["/og-image.png"],
    creator: "@jobtracker",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1f2937" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <div id="modal-root" />
        {children}
      </body>
    </html>
  );
}