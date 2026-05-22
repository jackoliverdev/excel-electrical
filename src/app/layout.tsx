import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { DesktopNavbar } from "@/components/Navigation/DesktopNavbar/DesktopNavbar";
import { MobileNavbar } from "@/components/Navigation/MobileNavbar/MobileNavbar";
import { ComingSoonScreen } from "@/components/ComingSoon/ComingSoonScreen";
import { ThemeProvider } from "@/components/Theme/ThemeProvider";
import { SiteFooter } from "@/components/Footer/SiteFooter";
import { CookieConsentBanner } from "@/components/CookieConsent/CookieConsentBanner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://excel-electrical.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Excel Electrics - Wire & Fire",
  description:
    "Friendly local electricians for your home: electrical work, fire safety, access systems and garage doors. Essex, Suffolk, Cambridgeshire, London and Hertfordshire.",
  openGraph: {
    type: "website",
    url: "/",
    title: "Excel Electrics - Wire & Fire",
    description:
      "Friendly local electricians for your home: electrical work, fire safety, access systems and garage doors.",
    siteName: "Excel Electrics",
    images: [
      {
        url: "/ExcelElectrics/excelelectricsx.png",
        width: 1024,
        height: 1024,
        alt: "Excel Electrics logo mark",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Excel Electrics - Wire & Fire",
    description:
      "Friendly local electricians for your home: electrical work, fire safety, access systems and garage doors.",
    images: ["/ExcelElectrics/excelelectricsx.png"],
  },
  icons: {
    icon: "/ExcelElectrics/excelelectricsnobgx.ico",
    shortcut: "/ExcelElectrics/excelelectricsnobgx.ico",
    apple: "/ExcelElectrics/ExcelElectrics.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const comingSoonFlag = process.env.coming_soon ?? process.env.COMING_SOON ?? "";
  const isComingSoon = comingSoonFlag.toLowerCase() === "true";

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {isComingSoon ? (
            <ComingSoonScreen />
          ) : (
            <>
              <MobileNavbar />
              <DesktopNavbar />
              <main className="flex-1">{children}</main>
              <SiteFooter />
              <CookieConsentBanner />
            </>
          )}
        </ThemeProvider>
        <Script
          src="https://app.centrus.ai/embed/custom-chatbot.js"
          data-chatbot-id="d559aaa9-a68c-48e3-9063-39a8547405fe"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
