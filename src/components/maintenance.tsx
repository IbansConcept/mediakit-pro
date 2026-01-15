"use client";

import { Hammer, Mail, Sparkles, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/config";
import { useI18n } from "@/lib/i18n-context";

export function Maintenance() {
  const { t } = useI18n();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background Animated Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse delay-700" />

      <div className="max-w-2xl w-full text-center space-y-8 relative z-10">
        {/* Animated Icon Container */}
        <div className="relative inline-block">
          <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-2xl animate-ping" />
          <div className="relative bg-card border border-border p-6 rounded-3xl shadow-2xl inline-flex items-center justify-center">
            <Hammer className="w-16 h-16 text-emerald-500 animate-bounce" />
          </div>
          <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-cyan-500 animate-pulse" />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">
            {t.maintenanceTitle || "Maintenance en cours"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-lg mx-auto leading-relaxed">
            {t.maintenanceDescription || "Nous améliorons Mediakit Pro pour vous offrir une expérience encore plus fluide. Revenez très bientôt !"}
          </p>
        </div>

        {/* Progress Bar Animation */}
        <div className="max-w-xs mx-auto w-full h-2 bg-muted rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 w-1/2 rounded-full animate-[progress_2s_ease-in-out_infinite]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-8">
          <div className="p-6 bg-card/50 backdrop-blur-sm border border-border rounded-2xl hover:border-emerald-500/50 transition-colors group">
            <Mail className="w-8 h-8 text-emerald-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-lg mb-2">Email</h3>
            <p className="text-sm text-muted-foreground mb-4">{siteConfig.contactEmail}</p>
            <Button variant="outline" className="w-full" asChild>
              <a href={`mailto:${siteConfig.contactEmail}`}>
                Nous contacter
              </a>
            </Button>
          </div>

          <div className="p-6 bg-card/50 backdrop-blur-sm border border-border rounded-2xl hover:border-cyan-500/50 transition-colors group">
            <MessageSquare className="w-8 h-8 text-cyan-500 mb-4 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-lg mb-2">Assistance</h3>
            <p className="text-sm text-muted-foreground mb-4">Besoin d'aide urgente ?</p>
            <Button className="w-full bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-white border-none shadow-lg shadow-emerald-500/20" asChild>
              <a href={`mailto:${siteConfig.contactEmail}?subject=Assistance Mediakit Pro`}>
                Demander de l'aide
              </a>
            </Button>
          </div>
        </div>

        <p className="text-sm text-muted-foreground animate-pulse">
          © 2026 Mediakit Pro — {t.footerLegal || "Tous droits réservés."}
        </p>
      </div>

      <style jsx>{`
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </div>
  );
}
