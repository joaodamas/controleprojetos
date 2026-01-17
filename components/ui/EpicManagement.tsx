"use client"

import React from 'react';
import { Plus, Filter, ChevronDown, GripVertical } from 'lucide-react';

// --- MOCK DATA ---
const mockEpics = [
    {
        id: 'EPIC-01',
        title: 'DESENVOLVIMENTO',
        tasks: [
            { id: 'T-01', title: 'Modelagem do Banco de Dados', status: 'Concluído' },
            { id: 'T-02', title: 'Criação da API de Autenticação', status: 'Em Progresso' },
            { id: 'T-03', title: 'Desenvolvimento do Dashboard Principal', status: 'Pendente' },
        ]
    },
    {
        id: 'EPIC-02',
        title: 'MARKETING',
        tasks: [
            { id: 'T-04', title: 'Definição de Público Alvo', status: 'Concluído' },
            { id: 'T-05', title: 'Criação de Conteúdo para Blog', status: 'Pendente' },
        ]
    }
];

const statusPill = (status: string) => {
    const styles = {
        'Em Progresso': 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300',
        'Concluído': 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300',
        'Pendente': 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300',
    };
    return <span className={`px-3 py-1 rounded-full text-xs font-bold ${styles[status as keyof typeof styles] || styles['Pendente']}`}>{status}</span>
}

export default function EpicManagement() {
    return (
        <div className="min-h-screen w-full bg-slate-50 dark:bg-[#0B0F1A] p-8 font-['Outfit']">
            <header className="mb-12">
                <div className="flex justify-start gap-1 mb-4 opacity-80">
                    <span className="text-3xl font-[900] italic tracking-tighter uppercase text-slate-900 dark:text-white">Axon</span>
                    <span className="text-3xl font-[100] italic tracking-tighter uppercase text-slate-400">Projects</span>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Gestão de Épicos e Detalhes</h2>
            </header>

            <div className="space-y-8">
                {mockEpics.map(epic => (
                    <div key={epic.id} className="bg-white dark:bg-[#0F172A] rounded-3xl border border-slate-100 dark:border-slate-800">
                        {/* --- EPIC HEADER --- */}
                        <div className="p-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
                            <div className="flex items-center gap-4">
                                <GripVertical className="text-slate-400 cursor-grab" />
                                <h3 className="text-lg font-[900] text-slate-800 dark:text-slate-100 tracking-wider uppercase">{epic.title}</h3>
                            </div>
                            {/* --- ACTIONS ALIGNED WITH HEADER --- */}
                            <div className="flex items-center gap-2">
                                <button className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold flex items-center gap-2">
                                    <Filter size={14} /> Filtros
                                </button>
                                <button className="px-3 py-2 rounded-lg bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/20 text-sm font-bold flex items-center gap-2">
                                    <Plus size={14} /> Nova Atividade
                                </button>
                            </div>
                        </div>

                        {/* --- TASKS TABLE --- */}
                        <div className="p-4">
                            <div className="flow-root">
                                {epic.tasks.map((task, index) => (
                                    <div key={task.id} className="relative flex items-center gap-4">
                                        {/* --- HIERARCHY LINE --- */}
                                        <div className="absolute left-6 h-full w-px bg-slate-200 dark:bg-slate-700" style={{ top: index === 0 ? '50%' : '0' }}></div>
                                        <div className="absolute left-6 h-px w-4 bg-slate-200 dark:bg-slate-700"></div>

                                        {/* --- INDENTED CONTENT --- */}
                                        <div className="relative pl-12 flex-1 flex items-center justify-between py-2 group">
                                            <span className="font-medium text-slate-700 dark:text-slate-300">{task.title}</span>
                                            {statusPill(task.status)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
