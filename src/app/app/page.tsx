"use client";

import MediaToolkit from "@/components/media-toolkit";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText, Scale } from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function AppPage() {
  const { t } = useI18n();
  const [legalOpen, setLegalOpen] = useState<{ type: 'terms' | 'privacy' | null }>({ type: null });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50 dark:bg-slate-950">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container px-4 flex h-16 items-center">
          <Link className="flex items-center justify-center transition-transform hover:scale-105" href="/">
            <Logo />
          </Link>
          <nav className="ml-auto flex items-center gap-1 sm:gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2 font-semibold hidden sm:flex">
                <ArrowLeft className="h-4 w-4" />
                {t('nav_home')}
              </Button>
              <Button variant="ghost" size="icon" className="sm:hidden">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-1 sm:gap-2">
              <ThemeToggle />
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto py-12 px-4 max-w-6xl">
        <div className="flex flex-col space-y-4 mb-12 text-center md:text-left">
          <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold w-fit mx-auto md:mx-0 bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
            {t('nav_studio')}
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl dark:text-white">{t('nav_studio')}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            {t('hero_description')}
          </p>
        </div>
        
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-none border dark:border-slate-800 overflow-hidden">
          <MediaToolkit />
        </div>
      </main>

      <footer className="py-12 border-t dark:border-slate-800 bg-white dark:bg-black">
        <div className="container px-4 md:px-6 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <Logo className="scale-75 origin-left" />
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              © 2026 {t('title')}. {t('footer_rights')}.
            </p>
          </div>
          <nav className="flex gap-6">
            <button 
              className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors dark:text-gray-400 dark:hover:text-blue-400" 
              onClick={() => setLegalOpen({ type: 'terms' })}
            >
              {t('footer_terms')}
            </button>
            <button 
              className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors dark:text-gray-400 dark:hover:text-blue-400" 
              onClick={() => setLegalOpen({ type: 'privacy' })}
            >
              {t('footer_privacy')}
            </button>
            <Link className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors dark:text-gray-400 dark:hover:text-blue-400" href="mailto:info@digiprounic.com">
              {t('footer_contact')}
            </Link>
          </nav>
        </div>
      </footer>

      <Dialog open={legalOpen.type !== null} onOpenChange={(open) => !open && setLegalOpen({ type: null })}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto dark:bg-slate-900 dark:border-slate-800">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              {legalOpen.type === 'terms' ? (
                <>
                  <FileText className="h-6 w-6 text-blue-600" />
                  {t('terms_title')}
                </>
              ) : (
                <>
                  <Scale className="h-6 w-6 text-emerald-600" />
                  {t('privacy_policy_title')}
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 text-gray-500 dark:text-gray-400 leading-relaxed text-justify space-y-4">
            {legalOpen.type === 'terms' ? t('tos_content') : t('privacy_content')}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
