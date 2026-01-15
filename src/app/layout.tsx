import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { I18nProvider } from "@/lib/i18n-context";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { siteConfig } from "@/lib/config";
import { Maintenance } from "@/components/maintenance";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Mediakit Pro | Toolkit d'optimisation multimédia 100% client-side",
  description: "Compressez, convertissez et optimisez vos images, vidéos et audios directement dans votre navigateur. Gratuit, privé et sans limite.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <I18nProvider>
            {siteConfig.maintenanceMode ? (
              <Maintenance />
            ) : (
              <>
                {children}
                <Analytics />
              </>
            )}
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
