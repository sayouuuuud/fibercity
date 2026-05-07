import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono, Space_Grotesk, Instrument_Serif } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
})

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
})

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif-display",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Fiber City — Fiber Optic Infrastructure Solutions in Egypt",
  description:
    "Fiber City designs, supplies, installs and maintains fiber optic networks across Egypt. Trusted by Vodafone, WE, Orange and Huawei for end-to-end FTTX & GPON deployments.",
  generator: "v0.app",
  keywords: [
    "fiber optic",
    "FTTX",
    "GPON",
    "telecom",
    "Egypt",
    "Vodafone",
    "WE",
    "Huawei",
    "OTDR",
    "fusion splicing",
  ],
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
}

export const viewport: Viewport = {
  themeColor: "#F6F5F1",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrains.variable} ${spaceGrotesk.variable} ${instrumentSerif.variable} bg-background`}
    >
      <body className="font-sans antialiased bg-background text-foreground">
        {children}
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
