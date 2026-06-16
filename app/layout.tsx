import type { Metadata } from "next"
import { Geist_Mono, Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { cn } from "@/lib/utils"
import { SearchDialog } from "@/components/search-dialog"

export const metadata: Metadata = {
  title: {
    default:
      "browse.pro.bd — Discover Bangladeshi developers and open-source creations",
    template: "%s | browse.pro.bd",
  },
  description:
    "A curated directory of open-source projects, developer portfolios, tools, and libraries built by Bangladeshi developers.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://browse.pro.bd",
    siteName: "browse.pro.bd",
    title:
      "browse.pro.bd — Discover Bangladeshi developers and open-source creations",
    description:
      "A curated directory of open-source projects, developer portfolios, tools, and libraries built by Bangladeshi developers.",
  },
  twitter: {
    card: "summary_large_image",
    site: "@browsepro_bd",
  },
  robots: {
    index: true,
    follow: true,
  },
}

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, inter.variable)}
    >
      <body className="flex min-h-screen flex-col">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1" data-pagefind-body>
            {children}
          </main>
          <Footer />
          <SearchDialog />
        </ThemeProvider>
      </body>
    </html>
  )
}
