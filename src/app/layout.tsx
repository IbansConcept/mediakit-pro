import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { I18nProvider } from "@/lib/i18n-context";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { MaintenanceConfig } from "../../POURMAINTENANCE/MaintenanceLogic";
import MaintenanceUI from "../../POURMAINTENANCE/MaintenanceUI";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mediakit Pro | Toolkit d'optimisation multimédia 100% client-side",
  description: "Compressez, convertissez et optimisez vos images, vidéos et audios directement dans votre navigateur. Gratuit, privé et sans limite.",
  keywords: ["compression image", "conversion vidéo", "optimisation audio", "ffmpeg wasm", "client-side", "vie privée"],
  authors: [{ name: "Mediakit Pro Team" }],
  openGraph: {
    title: "Mediakit Pro | Optimisation Multimédia 100% Client-Side",
    description: "Vos fichiers ne quittent jamais votre ordinateur. Traitement ultra-rapide et privé.",
    url: "https://mediakit-pro.vercel.app/",
    siteName: "Mediakit Pro",
    images: [
      {
        url: "/mediakitpro.webp",
        width: 1200,
        height: 630,
        alt: "Mediakit Pro Preview",
      },
    ],
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mediakit Pro | Optimisation Multimédia 100% Client-Side",
    description: "Traitement multimédia privé et rapide directement dans votre navigateur.",
    images: ["/mediakitpro.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Maintenance mode
  if (MaintenanceConfig.isActive) {
    return (
      <html lang="fr" suppressHydrationWarning>
        <body>
          <MaintenanceUI config={MaintenanceConfig.content} />
        </body>
      </html>
    );
  }

  // Normal site
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "Mediakit Pro",
              "url": "https://mediakit-pro.vercel.app/",
              "description": "Toolkit d'optimisation multimédia 100% client-side. Compressez et convertissez vos images, vidéos et audios en toute confidentialité.",
              "applicationCategory": "MultimediaApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "EUR"
              },
              "featureList": [
                "Compression Image JPG/PNG/WebP",
                "Conversion Vidéo MP4/WebM",
                "Extraction Audio MP3",
                "Traitement 100% Local"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} bg-background text-foreground`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider>
            {children}
            <Analytics />
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
