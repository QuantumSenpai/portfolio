import type { Metadata } from "next";
import localFont from "next/font/local";
import { Herr_Von_Muellerhoff, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScroll } from "@/components/providers/smooth-scroll-provider";
import { MotionProvider } from "@/components/providers/motion-provider";
import "./globals.css";

const cabinetGrotesk = localFont({
  src: [
    {
      path: "../fonts/CabinetGrotesk-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/CabinetGrotesk-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/CabinetGrotesk-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../fonts/CabinetGrotesk-Extrabold.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
});

const generalSans = localFont({
  src: [
    {
      path: "../fonts/GeneralSans-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/GeneralSans-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/GeneralSans-Semibold.woff2",
      weight: "600",
      style: "normal",
    },
  ],
  variable: "--font-body",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const signatureFont = Herr_Von_Muellerhoff({
  subsets: ["latin"],
  weight: "400",
  fallback: ["Mea Culpa"],
  variable: "--font-signature",
  display: "swap",
});

const siteUrl = "https://getkisu.vercel.app";

const title = "Krishnendu Adak (Kisu) | Developer & Editor";
const description =
  "Portfolio of Krishnendu Adak (Kisu), a computer science student and full-stack developer working on web applications, machine learning, and video editing.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  authors: [{ name: "Krishnendu Adak", url: siteUrl }],
  creator: "Krishnendu Adak",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "Krishnendu Adak",
    locale: "en_IN",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Krishnendu Adak portfolio" }],
    title,
    description,
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image"],
    title,
    description,
  },
};

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f6ff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0e18" },
  ],
};

const personStructuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: "Krishnendu Adak",
  alternateName: "Kisu",
  url: siteUrl,
  description,
  jobTitle: "Full-stack Developer",
  sameAs: [
    "https://github.com/QuantumSenpai",
    "https://www.linkedin.com/in/krishnendu158",
  ],
  mainEntityOfPage: { "@type": "WebPage", "@id": siteUrl },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${cabinetGrotesk.variable} ${generalSans.variable} ${jetbrainsMono.variable} ${signatureFont.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personStructuredData).replace(/</g, "\\u003c") }}
        />
        <ThemeProvider>
          <MotionProvider>
            <SmoothScroll>{children}</SmoothScroll>
          </MotionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
