import { Zap } from "lucide-react";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-emerald-600 shadow-lg shadow-blue-200">
        <Zap className="h-6 w-6 text-white" fill="white" />
        <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-yellow-400 border-2 border-white" />
      </div>
      <span className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">
        MEDIAKIT<span className="text-blue-600">PRO</span>
      </span>
    </div>
  );
}

export function IconOnly({ className = "" }: { className?: string }) {
  return (
    <div className={`relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-emerald-600 shadow-lg shadow-blue-200 ${className}`}>
      <Zap className="h-6 w-6 text-white" fill="white" />
      <div className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-yellow-400 border-2 border-white" />
    </div>
  );
}
