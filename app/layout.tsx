import type { Metadata, Viewport } from "next"
import { Inter, JetBrains_Mono, Space_Grotesk, Cairo } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/i18n/language-provider"
import { getDirection } from "@/lib/i18n/locale"
import { getServerLocale } from "@/lib/i18n/server-locale"
import { buildPageMetadata } from "@/lib/seo/metadata"
import { JsonLd } from "@/components/seo/json-ld"
import {
  organizationLd,
  websiteLd,
  localBusinessLd,
} from "@/lib/seo/jsonld"
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

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-arabic",
  display: "swap",
})

const cairoDisplay = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["700", "800", "900"],
  variable: "--font-arabic-display",
  display: "swap",
})

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getServerLocale()
  return buildPageMetadata({ locale, path: "/" })
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F6F5F1" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1220" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getServerLocale()
  const dir = getDirection(locale)

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${inter.variable} ${jetbrains.variable} ${spaceGrotesk.variable} ${cairo.variable} ${cairoDisplay.variable} bg-background`}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <LanguageProvider initialLocale={locale}>{children}</LanguageProvider>
        </ThemeProvider>
        <JsonLd id="ld-organization" data={organizationLd(locale)} />
        <JsonLd id="ld-website" data={websiteLd(locale)} />
        <JsonLd id="ld-local-business" data={localBusinessLd(locale)} />
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}
