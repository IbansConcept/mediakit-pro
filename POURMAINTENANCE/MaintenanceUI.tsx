"use client";

import React from 'react';
import { Hammer, Mail, Sparkles, MessageSquare, ShieldCheck, Zap } from "lucide-react";

/**
 * COMPOSANT UI DE MAINTENANCE PREMIUM - MEDIAKIT PRO
 */

interface MaintenanceProps {
  config: {
    title: string;
    description: string;
    logoColor: string;
    bgColor: string;
    brandName: string;
    contactEmail: string;
  };
}

const MaintenanceUI: React.FC<MaintenanceProps> = ({ config }) => {
  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Animated Orbs with Project Identity */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-500/10 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse delay-1000" />
      
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="max-w-3xl w-full text-center space-y-12 relative z-10">
        {/* Animated Brand Identity */}
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-emerald-500/30 rounded-full blur-3xl animate-ping opacity-50" />
            <div className="relative bg-[#0f172a] border border-emerald-500/20 p-8 rounded-[2.5rem] shadow-2xl shadow-emerald-500/10 inline-flex items-center justify-center">
              <Hammer className="w-16 h-16 text-emerald-400 animate-bounce" />
              <Sparkles className="absolute -top-4 -right-4 w-10 h-10 text-cyan-400 animate-pulse" />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium tracking-wider uppercase">
              <Zap className="w-3 h-3" />
              <span>Mise à jour majeure</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter bg-gradient-to-br from-white via-emerald-100 to-emerald-500 bg-clip-text text-transparent py-2">
              {config.title}
            </h1>
          </div>
        </div>

        {/* Description & Mission */}
        <div className="max-w-xl mx-auto space-y-6">
          <p className="text-lg md:text-xl text-slate-400 leading-relaxed font-medium">
            {config.description}
          </p>
          
          {/* Animated Progress Loader */}
          <div className="relative h-1.5 w-full bg-slate-800 rounded-full overflow-hidden border border-slate-700/50">
            <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 via-cyan-500 to-emerald-500 w-[40%] rounded-full animate-[loading_3s_infinite_ease-in-out]" />
          </div>
        </div>

        {/* Contact & Assistance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
          <a 
            href={`mailto:${config.contactEmail}`}
            className="group p-8 bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-[2rem] hover:border-emerald-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/5"
          >
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <Mail className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Support Direct</h3>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">Une question urgente ? Notre équipe reste disponible par email.</p>
            <span className="text-emerald-400 font-semibold text-sm inline-flex items-center group-hover:translate-x-1 transition-transform">
              Envoyer un message <Zap className="w-3 h-3 ml-2" />
            </span>
          </a>

          <a 
            href={`mailto:${config.contactEmail}?subject=Assistance Mediakit Pro`}
            className="group p-8 bg-slate-900/40 backdrop-blur-xl border border-slate-800 rounded-[2rem] hover:border-cyan-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/5"
          >
            <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
              <MessageSquare className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Assistance Technique</h3>
            <p className="text-slate-400 text-sm mb-4 leading-relaxed">Besoin d'aide avec un service spécifique de Mediakit Pro ?</p>
            <span className="text-cyan-400 font-semibold text-sm inline-flex items-center group-hover:translate-x-1 transition-transform">
              Demander de l'aide <Zap className="w-3 h-3 ml-2" />
            </span>
          </a>
        </div>

        {/* Secure Trust Footer */}
        <div className="pt-12 flex flex-col items-center space-y-6">
          <div className="flex items-center space-x-6 text-slate-500">
            <div className="flex items-center space-x-2 text-xs font-semibold tracking-widest uppercase">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Client-Side Protection</span>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-sm font-bold tracking-[0.3em] text-slate-500 uppercase">
              {config.brandName}
            </p>
            <p className="text-xs text-slate-600 mt-2 font-medium">
              © {new Date().getFullYear()} — Engineering for better media performance.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% { left: -40%; width: 20%; }
          50% { width: 40%; }
          100% { left: 120%; width: 20%; }
        }
      `}</style>
    </div>
  );
};

export default MaintenanceUI;
