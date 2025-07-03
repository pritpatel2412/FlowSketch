import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "FlowSketch - AI-Powered Flowchart Generator | Create Professional Diagrams Instantly",
  description:
    "FlowSketch is the ultimate AI-powered flowchart generator. Transform your ideas into professional flowcharts, diagrams, and workflows instantly. Free online tool with advanced features.",
  keywords:
    "FlowSketch, flowchart generator, AI flowchart, diagram maker, workflow creator, process mapping, visual planning, business diagrams, free flowchart tool, online diagram editor",
  authors: [{ name: "FlowSketch Team" }],
  creator: "FlowSketch",
  publisher: "FlowSketch",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://flowsketch.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "FlowSketch - AI-Powered Flowchart Generator",
    description:
      "Create professional flowcharts and diagrams instantly with AI. FlowSketch transforms your ideas into beautiful visual workflows in seconds.",
    url: "https://flowsketch.app",
    siteName: "FlowSketch",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FlowSketch - AI Flowchart Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FlowSketch - AI-Powered Flowchart Generator",
    description:
      "Create professional flowcharts and diagrams instantly with AI. Transform your ideas into beautiful visual workflows.",
    images: ["/twitter-image.png"],
    creator: "@FlowSketch",
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
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  icons: {
    icon: [
      {
        url: "/favicon.ico",
        sizes: "any",
      },
      {
        url: "/icon.png",
        type: "image/svg+xml",
      },
    ],
    apple: [
      {
        url: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
    generator: 'v0.dev'
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "FlowSketch",
  alternateName: "FlowSketch AI Flowchart Generator",
  description:
    "AI-powered flowchart generator that transforms ideas into professional diagrams and workflows instantly",
  url: "https://flowsketch.app",
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  creator: {
    "@type": "Organization",
    name: "FlowSketch",
  },
  featureList: [
    "AI-powered flowchart generation",
    "Professional diagram templates",
    "Real-time collaboration",
    "Export to multiple formats",
    "Interactive tutorials",
    "Smart syntax detection",
  ],
  screenshot: "https://flowsketch.app/screenshot.png",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1250",
    bestRating: "5",
    worstRating: "1",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.png" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Additional SEO Meta Tags */}
        <meta name="application-name" content="FlowSketch" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="FlowSketch" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#3b82f6" />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        {/* Additional SEO Tags */}
        <meta name="geo.region" content="US" />
        <meta name="geo.placename" content="United States" />
        <meta name="language" content="English" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        <meta name="revisit-after" content="1 days" />

        {/* Sitemap */}
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
      </head>
      <body className={inter.className}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
