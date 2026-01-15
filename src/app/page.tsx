"use client";

import { Button } from "@/components/ui/button";
import { 
  Image as ImageIcon, 
  Video as VideoIcon, 
  Music as AudioIcon, 
  Zap, 
  ShieldCheck, 
  Globe,
  ArrowUp,
  Layout,
  Mail,
  Scale,
  FileText
} from "lucide-react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n-context";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useEffect, useState } from "react";
import { Logo, IconOnly } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { MobileMenu } from "@/components/mobile-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  const { t } = useI18n();
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [legalOpen, setLegalOpen] = useState<{ type: 'terms' | 'privacy' | null }>({ type: null });

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="flex flex-col min-h-screen scroll-smooth">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container px-4 flex h-16 items-center">
          <Link className="flex items-center justify-center transition-transform hover:scale-105" href="/">
            <Logo />
          </Link>
          <nav className="ml-auto flex items-center gap-2 sm:gap-6">
            <div className="hidden md:flex items-center gap-6 mr-4">
              <Link className="text-sm font-semibold hover:text-blue-600 transition-colors" href="#features">
                {t('features')}
              </Link>
              <Link className="text-sm font-semibold hover:text-blue-600 transition-colors" href="/app">
                {t('nav_studio')}
              </Link>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <ThemeToggle />
              <LanguageSwitcher />
              <MobileMenu />
            </div>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900">
          <div className="container px-4 md:px-6 text-center">
            <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 mb-8 bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800">
              {t('hero_subtitle')}
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6 dark:text-white">
              {t('hero_title')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">{t('hero_subtitle')}</span>
            </h1>
            <p className="mx-auto max-w-[800px] text-gray-500 md:text-xl dark:text-gray-400 mb-10 leading-relaxed px-4">
              {t('hero_description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
              <Link href="/app" className="w-full sm:w-auto">
                <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 h-14 px-8 text-lg rounded-xl shadow-lg shadow-blue-200 dark:shadow-none transition-all hover:translate-y-[-2px]">
                  {t('get_started')}
                </Button>
              </Link>
              <Link href="https://github.com/mryans/mediakit-pro" target="_blank" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full h-14 px-8 text-lg rounded-xl border-2 dark:bg-slate-900">
                  {t('github')}
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        <section id="features" className="w-full py-24 md:py-32 bg-white dark:bg-slate-950">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-16 px-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl dark:text-white">{t('all_tools')}</h2>
              <p className="max-w-[800px] text-gray-500 md:text-xl dark:text-gray-400 leading-relaxed">
                {t('all_tools_desc')}
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 px-4">
              <div className="group relative overflow-hidden rounded-3xl border bg-white dark:bg-slate-900 p-8 transition-all hover:shadow-2xl hover:shadow-blue-100 dark:hover:shadow-none hover:translate-y-[-4px] dark:border-slate-800">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors dark:bg-blue-900/30 dark:text-blue-400">
                  <ImageIcon className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3 dark:text-white">{t('images')}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  {t('images_desc')}
                </p>
              </div>
              <div className="group relative overflow-hidden rounded-3xl border bg-white dark:bg-slate-900 p-8 transition-all hover:shadow-2xl hover:shadow-blue-100 dark:hover:shadow-none hover:translate-y-[-4px] dark:border-slate-800">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors dark:bg-emerald-900/30 dark:text-emerald-400">
                  <VideoIcon className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3 dark:text-white">{t('videos')}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  {t('videos_desc')}
                </p>
              </div>
              <div className="group relative overflow-hidden rounded-3xl border bg-white dark:bg-slate-900 p-8 transition-all hover:shadow-2xl hover:shadow-blue-100 dark:hover:shadow-none hover:translate-y-[-4px] dark:border-slate-800">
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-colors dark:bg-cyan-900/30 dark:text-cyan-400">
                  <AudioIcon className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3 dark:text-white">{t('audio')}</h3>
                <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                  {t('audio_desc')}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-24 bg-slate-950 dark:bg-black text-white overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_50%_50%,#3b82f6,transparent_50%)]"></div>
          <div className="container px-4 md:px-6 text-center relative z-10">
            <h2 className="text-3xl font-bold mb-16 sm:text-4xl">{t('why_choose')}</h2>
            <div className="grid gap-12 md:grid-cols-3">
              <div className="flex flex-col items-center px-4">
                <div className="mb-6 h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                  <ShieldCheck className="h-8 w-8 text-green-400" />
                </div>
                <h4 className="text-xl font-bold mb-3">{t('privacy_title')}</h4>
                <p className="text-slate-400 max-w-[300px] mx-auto">{t('privacy_desc')}</p>
              </div>
              <div className="flex flex-col items-center px-4">
                <div className="mb-6 h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                  <Globe className="h-8 w-8 text-blue-400" />
                </div>
                <h4 className="text-xl font-bold mb-3">{t('unlimited_title')}</h4>
                <p className="text-slate-400 max-w-[300px] mx-auto">{t('unlimited_desc')}</p>
              </div>
              <div className="flex flex-col items-center px-4">
                <div className="mb-6 h-16 w-16 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20">
                  <Zap className="h-8 w-8 text-yellow-400" />
                </div>
                <h4 className="text-xl font-bold mb-3">{t('fast_title')}</h4>
                <p className="text-slate-400 max-w-[300px] mx-auto">{t('fast_desc')}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section Contact & Liens Rapides */}
        <section id="contact" className="w-full py-24 bg-white dark:bg-slate-950 border-t dark:border-slate-800">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto grid gap-16 md:grid-cols-2">
              <div className="space-y-6 px-4">
                <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
                  <Mail className="h-6 w-6" />
                  <h3 className="text-2xl font-bold">{t('footer_contact')}</h3>
                </div>
                <div className="space-y-3">
                  <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
                    {t('help_needed')}
                  </p>
                  <a href="mailto:info@digiprounic.com" className="inline-block text-blue-600 dark:text-blue-400 font-bold hover:underline text-lg">
                    info@digiprounic.com
                  </a>
                </div>
              </div>
              
              <div className="space-y-6 px-4">
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                  <Layout className="h-6 w-6" />
                  <h3 className="text-2xl font-bold">{t('legal_title')}</h3>
                </div>
                <div className="flex flex-col gap-4">
                  <Button 
                    variant="outline" 
                    className="justify-start gap-2 h-12 dark:bg-slate-900" 
                    onClick={() => setLegalOpen({ type: 'terms' })}
                  >
                    <FileText className="h-4 w-4" />
                    {t('footer_terms')}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="justify-start gap-2 h-12 dark:bg-slate-900" 
                    onClick={() => setLegalOpen({ type: 'privacy' })}
                  >
                    <Scale className="h-4 w-4" />
                    {t('footer_privacy')}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Modales Légales */}
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

      <footer className="py-12 border-t dark:border-slate-800 bg-slate-50 dark:bg-black">
        <div className="container px-4 md:px-6 flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex items-center gap-2">
            <IconOnly className="h-8 w-8" />
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
            <Link className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors dark:text-gray-400 dark:hover:text-blue-400" href="#contact">
              {t('footer_contact')}
            </Link>
          </nav>
        </div>
      </footer>

      {showScrollTop && (
        <Button 
          onClick={scrollToTop} 
          className="fixed bottom-8 right-8 h-12 w-12 rounded-full shadow-2xl z-50 p-0 hover:scale-110 transition-transform"
          size="icon"
        >
          <ArrowUp className="h-6 w-6" />
        </Button>
      )}
    </div>
  );
}
