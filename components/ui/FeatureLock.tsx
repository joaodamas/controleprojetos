"use client"

import React from "react"
import { Lock, Sparkles } from "lucide-react"
// Assuming a Button component is available from a UI library
// import { Button } from "@/components/ui/button" 

// A basic button component to make the FeatureLock self-contained for now.
// The user can replace this with their actual Button component.
const Button = ({ className, onClick, children }: { className?: string; onClick?: () => void; children: React.ReactNode }) => (
    <button className={className} onClick={onClick}>
        {children}
    </button>
);


interface FeatureLockProps {
  children: React.ReactNode;
  featureName: string;
  planRequired: "PRO" | "BUSINESS" | "ENTERPRISE";
  // This prop will determine if the feature is locked.
  // We'll get this from the usePlan hook in the parent component.
  isLocked: boolean; 
}

export function FeatureLock({ children, featureName, planRequired, isLocked }: FeatureLockProps) {

  if (!isLocked) return <>{children}</>;

  return (
    <div className="relative group">
      {/* The original content is blurred and non-interactive */}
      <div className="filter blur-[6px] grayscale pointer-events-none opacity-50 transition-all">
        {children}
      </div>

      {/* The lock overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10 bg-white/10 dark:bg-black/10 backdrop-blur-[2px] rounded-[32px]">
        <div className="size-16 rounded-3xl bg-white dark:bg-[#0F172A] shadow-xl border border-slate-100 dark:border-slate-800 flex items-center justify-center mb-6 animate-bounce-slow">
          <Lock className="text-emerald-500" size={28} strokeWidth={2.5} />
        </div>
        
        <div className="space-y-2 max-w-[280px]">
          <h4 className="text-xl font-[900] italic tracking-tighter text-slate-900 dark:text-white uppercase leading-none">
            {featureName} <br/> <span className="text-emerald-500 text-sm font-bold tracking-widest uppercase">Bloqueado</span>
          </h4>
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-relaxed">
            Disponível exclusivamente para membros do plano <span className="text-slate-900 dark:text-white underline">{planRequired}</span>.
          </p>
        </div>

        <Button 
          className="mt-8 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-[900] uppercase tracking-tighter px-8 py-6 rounded-2xl hover:scale-105 transition-transform"
          onClick={() => {
            // This will scroll to the pricing section on the page
            const pricingElement = document.getElementById('pricing');
            if (pricingElement) {
              pricingElement.scrollIntoView({ behavior: 'smooth' });
            } else {
              // Fallback if the element doesn't exist on the current page
              window.location.hash = "#pricing";
            }
          }}
        >
          <Sparkles className="mr-2 size-4 text-emerald-500" />
          Fazer Upgrade Agora
        </Button>
      </div>
    </div>
  )
}
