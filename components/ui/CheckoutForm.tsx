"use client"

import React, { useState } from 'react';
import { useUser } from '../../hooks/useUser'; // Adjust path as needed

// A basic button component to make the CheckoutForm self-contained for now.
const Button = ({ className, onClick, children, disabled }: { className?: string; onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; children: React.ReactNode; disabled?: boolean }) => (
    <button className={className} onClick={onClick} disabled={disabled}>
        {children}
    </button>
);

// This component will be responsible for handling the checkout process
export default function CheckoutForm() {
    const { user } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    
    // Hardcoded plan details for demonstration purposes
    const selectedPlan = {
        name: 'Business',
        cycle: 'Anual',
        price: 'R$ 349,93',
        billingCycle: 'faturamento anual',
        priceId: 'price_YOUR_ANNUAL_BUSINESS_PLAN_ID' // IMPORTANT: Replace with your actual Stripe Price ID
    };

    const handleSubscribe = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setIsLoading(true);

        // This would be the actual priceId and billing cycle from your state management
        const priceId = selectedPlan.priceId;
        const cycle = selectedPlan.cycle.toLowerCase();

        try {
            // The URL should point to your Python backend
            const response = await fetch('http://localhost:8000/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    priceId,
                    email: user.email,
                    cycle: cycle
                })
            });

            if (!response.ok) {
                throw new Error('Failed to create checkout session');
            }

            const data = await response.json();
            // Redirect to Stripe's secure checkout page
            window.location.href = data.url;
        } catch (error) {
            console.error("Checkout Error:", error);
            setIsLoading(false);
            // Here you would show an error message to the user
        }
    };

    return (
        <div className="max-w-xl mx-auto py-20 px-6 font-['Outfit']" id="pricing">
            {/* Centered Logo */}
            <div className="flex justify-center gap-1 mb-12 opacity-50">
                <span className="text-2xl font-[900] italic tracking-tighter uppercase text-slate-900 dark:text-white">Axon</span>
                <span className="text-2xl font-[100] italic tracking-tighter uppercase text-slate-400">Projects</span>
            </div>

            <div className="bg-white dark:bg-[#0F172A] rounded-[40px] p-10 shadow-2xl border border-slate-100 dark:border-slate-800">
                <h2 className="text-3xl font-[900] italic tracking-tighter text-slate-900 dark:text-white uppercase mb-8">
                    Checkout <span className="text-emerald-500">.</span>
                </h2>

                {/* Plan Summary (Bento Style) */}
                <div className="bg-slate-50 dark:bg-slate-900/50 p-6 rounded-3xl mb-10 flex justify-between items-center border border-slate-100 dark:border-slate-800">
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Plano Selecionado</p>
                        <p className="text-xl font-black text-slate-900 dark:text-white italic uppercase">{selectedPlan.name} / {selectedPlan.cycle}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-2xl font-black text-emerald-500 italic">{selectedPlan.price}</p>
                        <p className="text-[10px] font-medium text-slate-400">{selectedPlan.billingCycle}</p>
                    </div>
                </div>

                {/* Form */}
                <form>
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Dados do Cartão</label>
                            <div className="relative">
                                {/* This is a placeholder. In a real app, you would use Stripe Elements here for PCI compliance. */}
                                <input
                                    type="text"
                                    placeholder="0000 0000 0000 0000"
                                    className="w-full bg-slate-50 dark:bg-slate-900 border-none rounded-2xl py-5 px-6 text-sm font-bold focus:ring-2 focus:ring-emerald-500 transition-all outline-none text-slate-900 dark:text-white"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder="MM/AA" className="bg-slate-50 dark:bg-slate-900 border-none rounded-2xl py-5 px-6 text-sm font-bold outline-none" />
                            <input type="text" placeholder="CVC" className="bg-slate-50 dark:bg-slate-900 border-none rounded-2xl py-5 px-6 text-sm font-bold outline-none" />
                        </div>

                        <Button 
                            onClick={handleSubscribe} 
                            disabled={isLoading}
                            className="w-full bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-[900] uppercase tracking-tighter py-8 rounded-2xl text-lg hover:scale-[1.02] transition-transform disabled:opacity-50"
                        >
                            {isLoading ? 'Processando...' : 'Confirmar Assinatura'}
                        </Button>
                    </div>
                </form>

                {/* Trust Badges */}
                <div className="mt-10 flex justify-center gap-6 opacity-30">
                    <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.3em]">SSL Secured</span>
                    <span className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.3em]">LGPD Compliant</span>
                </div>
            </div>
        </div>
    );
}
