import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
// import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import SmoothScroll from "@/components/SmoothScroll"
import { ThemeProvider } from "@/components/ThemeProvider"
import { NavigationBar } from "@/components/NavigationBar"
import { Analytics } from "@vercel/analytics/next"

const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
];

const geistSans = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

const SITE_URL = "https://portfolio-panharoth.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Panharoth Chheng — Cybersecurity & Backend Engineer",
    template: "%s | Panharoth Chheng",
  },
  description:
    "Portfolio of Panharoth Chheng, a cybersecurity-focused engineer building secure, scalable backend systems and modern web platforms.",
  applicationName: "Panharoth Portfolio",
  authors: [{ name: "Panharoth Chheng", url: "https://github.com/Panharoth06" }],
  creator: "Panharoth Chheng",
  keywords: [
    "Panharoth Chheng",
    "Cybersecurity",
    "Backend Engineer",
    "Spring Boot",
    "Next.js",
    "FastAPI",
    "Portfolio",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Panharoth Chheng — Cybersecurity & Backend Engineer",
    description:
      "Secure, scalable systems with a focus on cybersecurity, performance, and modern web architecture.",
    siteName: "Panharoth Portfolio",
    images: [
      {
        url: "/og_image.png",
        width: 960,
        height: 960,
        alt: "Panharoth Chheng",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Panharoth Chheng — Cybersecurity & Backend Engineer",
    description:
      "Secure, scalable systems with a focus on cybersecurity, performance, and modern web architecture.",
    images: ["/og_image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

const themeScript = `
(function() {
  try {
    var theme = localStorage.getItem("theme");
    if (theme !== "light" && theme !== "dark") {
      theme = null;
    }
  } catch (e) {
    theme = null;
  }
  if (!theme) {
    try {
      var mq = window.matchMedia("(prefers-color-scheme: dark)");
      theme = mq.matches ? "dark" : "light";
    } catch (e) {
      theme = "dark";
    }
  }
  document.documentElement.className = theme;
})();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-background text-foreground pt-16`}>
        <ThemeProvider>
          <NavigationBar links={NAV_LINKS} />
          <SmoothScroll />
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  )
}
