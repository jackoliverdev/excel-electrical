import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
// import Script from "next/script"; // re-enable when the AI chatbot goes back in
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
const siteName = "Excel Electrics";
const siteDescription =
  "Friendly local electricians for your home: electrical work, fire safety, access systems and garage doors. Essex, Suffolk, Cambridgeshire, London and Hertfordshire.";
const socialImage = "/ExcelElectrics/NewLogo/ExcelWhatsapp.png";

const businessJsonLd = {
  "@context": "https://schema.org",
  "@type": "Electrician",
  name: siteName,
  legalName: "Excel Fire Ltd",
  alternateName: "Excel Fire Ltd, trading as Excel Electrics",
  url: siteUrl,
  logo: `${siteUrl}/ExcelElectrics/NewLogo/Excel%20Electrics%20Horizontal%20Light%20Mode.png`,
  image: `${siteUrl}${socialImage}`,
  description: siteDescription,
  telephone: "07730591822",
  email: "info@excelelectrics.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "124 City Road",
    addressLocality: "London",
    postalCode: "EC1V 2NX",
    addressCountry: "GB",
  },
  areaServed: ["Essex", "Suffolk", "Cambridgeshire", "Hertfordshire", "London", "Greater London"],
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "17:00",
    },
  ],
  makesOffer: [
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Domestic electrical work" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Fire safety systems" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Access and security systems" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "Garage doors and electric gates" } },
    { "@type": "Offer", itemOffered: { "@type": "Service", name: "EV charging" } },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Excel Electrics - Wire & Fire",
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Excel Electrics - Wire & Fire",
    description: siteDescription,
    siteName,
    images: [
      {
        url: socialImage,
        width: 1200,
        height: 630,
        alt: "Excel Electrics - Wire & Fire logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Excel Electrics - Wire & Fire",
    description: siteDescription,
    images: [socialImage],
  },
  icons: {
    icon: [
      { url: "/ExcelElectrics/FavIcons/excel-favicon-purple.svg", type: "image/svg+xml" },
      { url: "/ExcelElectrics/FavIcons/excel-favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/ExcelElectrics/FavIcons/excel-favicon-32.png",
    apple: "/ExcelElectrics/FavIcons/excel-favicon-180.png",
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
        {/* AI chatbot temporarily disabled until it's finished - re-enable with the Script import above
        <Script
          src="https://app.centrus.ai/embed/custom-chatbot.js"
          data-chatbot-id="d559aaa9-a68c-48e3-9063-39a8547405fe"
          strategy="afterInteractive"
        /> */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(businessJsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
