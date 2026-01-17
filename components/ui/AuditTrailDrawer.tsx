"use client"

import React, { useState, useEffect } from 'react';
import { X, Clock, Download, Loader, AlertTriangle, Activity } from 'lucide-react';

interface AuditLog {
  id: string;
  user: { name: string; avatarUrl?: string };
  action: string;
  timestamp: string;
}

const mockAuditLogs: AuditLog[] = [
  { id: '1', user: { name: 'João Damas' }, action: 'Atualizou o GAP para +10pp no projeto OBI.', timestamp: '2026-07-12T14:30:00Z' },
  { id: '2', user: { name: 'Lucas Bonanza' }, action: 'Moveu a atividade "Criar Endpoint" para a fase Testes.', timestamp: '2026-07-12T10:15:00Z' },
  { id: '3', user: { name: 'Pedro Henrique' }, action: 'Adicionou o responsável Lucas Bonanza ao projeto OBI.', timestamp: '2026-07-11T18:00:00Z' },
  { id: '4', user: { name: 'João Damas' }, action: 'Criou o projeto "OBI - KPMG".', timestamp: '2026-07-11T09:00:00Z' },
];

const formatTimestamp = (timestamp: string) =>
  new Date(timestamp).toLocaleString('pt-BR', { dateStyle: 'medium', timeStyle: 'short' });

export function AuditTrailDrawer({
  isOpen,
  onClose,
  projectId,
}: {
  isOpen: boolean;
  onClose: () => void;
  projectId?: string;
}) {
  const [logs, setLogs] = useState<AuditLog[]>(mockAuditLogs);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    const controller = new AbortController();

    const fetchLogs = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const targetProjectId = projectId || 'OBI-KPMG';
        const response = await fetch(`http://localhost:8000/api/audit-logs/${targetProjectId}`, {
          signal: controller.signal,
        });
        if (!response.ok) throw new Error('Não foi possível carregar o histórico de auditoria.');
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          setLogs(data);
        } else {
          setLogs(mockAuditLogs);
        }
      } catch (err: any) {
        if (err.name === 'AbortError') return;
        setError(err.message || 'Erro desconhecido na leitura do log.');
        setLogs(mockAuditLogs);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
    return () => controller.abort();
  }, [isOpen, projectId]);

  const renderTimeline = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-slate-400 h-32">
          <Loader className="animate-spin" size={32} />
          <p className="mt-3 text-sm font-semibold">Carregando histórico...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center text-red-300 bg-red-900/20 p-4 rounded-2xl">
          <AlertTriangle size={28} />
          <p className="mt-3 text-sm font-semibold">Não foi possível carregar o log.</p>
          <p className="text-xs text-red-200">{error}</p>
        </div>
      );
    }

    if (!logs.length) {
      return (
        <div className="flex flex-col items-center justify-center text-slate-400 h-32">
          <Clock size={32} />
          <p className="mt-3 text-sm font-semibold">Nenhuma atividade registrada.</p>
        </div>
      );
    }

    return (
      <div className="relative pl-8">
        <div className="absolute left-[18px] top-2 bottom-0 w-px bg-slate-800"></div>
        {logs.map((log, index) => (
          <div key={log.id} className="mb-8 last:mb-0 relative">
            <div className="absolute -left-1 top-0 flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30">
              {index % 2 === 0 ? (
                <Clock size={14} className="text-slate-950" />
              ) : (
                <Activity size={14} className="text-slate-950" />
              )}
            </div>
            <div className="ml-8 space-y-1">
              <p className="text-sm font-black italic uppercase tracking-tight text-white">{log.user.name}</p>
              <p className="text-sm text-slate-300 leading-relaxed">{log.action}</p>
              <p className="text-[10px] text-slate-500 font-medium uppercase tracking-[0.4em]">
                {formatTimestamp(log.timestamp)}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden font-['Outfit']">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-slate-950 dark:bg-[#0B0F1A] border-l border-slate-800 shadow-2xl overflow-y-auto transition-transform duration-300 ease-in-out">
        <div className="px-6 py-8 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-[900] italic uppercase tracking-tight text-white">
                Histórico
              </h2>
              <p className="text-xs text-slate-400 uppercase tracking-[0.4em] mt-1">Auditoria</p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition-colors p-2 rounded-full"
              aria-label="Fechar drawer"
            >
              <X size={24} />
            </button>
          </div>

          <button className="w-full flex items-center justify-center gap-2 bg-emerald-500/90 text-slate-950 font-bold py-3 px-4 rounded-2xl text-xs uppercase tracking-widest transition hover:bg-emerald-400">
            <Download size={16} />
            Exportar Log
          </button>

          <div className="space-y-6">{renderTimeline()}</div>
        </div>
      </div>
    </div>
  );
}
