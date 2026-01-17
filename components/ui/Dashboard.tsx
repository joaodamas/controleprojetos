"use client"

import React, { useState } from 'react';
import { AuditTrailDrawer } from './AuditTrailDrawer';
import {
  AlertTriangle,
  MoreHorizontal,
  CheckCircle2,
  History,
  CalendarDays,
  Zap,
  Search,
} from 'lucide-react';

const criticalActions = [
  { id: 'act-01', title: 'Criar job PHP para iniciar fluxo via WS_HUB SFTP_MONITORING', client: 'KPMG', owner: 'Lucas Svizzero', tag: 'Intervenção imediata', status: 'Em risco', statusState: 'warning' },
  { id: 'act-02', title: 'Implementar job wsdocs de monitoramento SFTP', client: 'KPMG', owner: 'Lucas Svizzero', tag: 'Manual', status: 'Em risco', statusState: 'warning' },
  { id: 'act-03', title: 'Ativação do formulário de digitalização e vídeo conferência com PDF', client: 'KPMG', owner: 'Lucas Svizzero', tag: 'Prioridade', status: 'Em risco', statusState: 'warning' },
  { id: 'act-04', title: 'Testes integrados', client: 'KPMG', owner: 'Lucas Svizzero', tag: 'QA', status: 'Em dia', statusState: 'success' },
  { id: 'act-05', title: 'Testes unitários', client: 'KPMG', owner: 'Lucas Svizzero', tag: 'QA', status: 'Em dia', statusState: 'success' },
  { id: 'act-06', title: 'Deploy ambiente de produção', client: 'KPMG', owner: 'Lucas Svizzero', tag: 'Deploy', status: 'Em risco', statusState: 'warning' },
];

const upcomingWeek = [
  { id: 'up-01', title: 'Deploy ambiente de produção', day: '19 JAN', status: 'Próximo', owner: 'Hanna Kodama' },
  { id: 'up-02', title: 'Painéis e relatórios', day: '20 JAN', status: 'Próximo', owner: 'Fernando Barrozo' },
  { id: 'up-03', title: 'Carga de documentos - diferencial de alíquota', day: '21 JAN', status: 'Próximo', owner: 'Fernando Barrozo' },
  { id: 'up-04', title: 'Carga de documentos - razão', day: '21 JAN', status: 'Próximo', owner: 'Fernando Barrozo' },
  { id: 'up-05', title: 'Carga de documentos - TAG', day: '22 JAN', status: 'Próximo', owner: 'Fernando Barrozo' },
  { id: 'up-06', title: 'Carga de documentos - saída', day: '22 JAN', status: 'Próximo', owner: 'Fernando Barrozo' },
];

const timeMetrics = [
  { id: 'tm-01', name: 'Lucas Svizzero', load: '11 atividades', bubble: '11 atrasadas' },
  { id: 'tm-02', name: 'Fernanda Silva', load: '08 atividades', bubble: '02 atrasadas' },
];

const selectOptions = {
  clientes: ['Todos', 'KPMG', 'Jequiti', 'Seripetec'],
  projetos: ['Todos', 'OBI - KPMG', 'AI Matrix', 'Rede Integrada'],
  responsaveis: ['Todos', 'Lucas Svizzero', 'Fernando Barrozo', 'Ana'],
};

const enterpriseStats = [
  { id: 'stat-01', label: 'Realizado (7d)', value: '81.3%', trend: '+4.2pp', trendLabel: 'vs meta', color: 'from-emerald-500 to-emerald-600' },
  { id: 'stat-02', label: 'Previsto (7d)', value: '76.4%', trend: '-1.1pp', trendLabel: 'vs previsto', color: 'from-sky-500 to-sky-600' },
  { id: 'stat-03', label: 'Gap', value: '-4.9pp', trend: 'Abaixo do alvo', trendLabel: 'Atenção', color: 'from-amber-500 to-amber-600' },
];

const projectHighlights = [
  {
    id: 'proj-01',
    client: 'ASCENTY',
    code: 'AS',
    health: 'Em risco',
    progress: 81,
    badge: 'Risco',
    status: 'Em risco',
    statusState: 'warning',
    reason: 'Maior atraso: 23d – Desenvolvimento de Integração – Vinhedo – MONITORAMENTO NFSe',
  },
  {
    id: 'proj-02',
    client: 'SERGIPETEC',
    code: 'SE',
    health: 'Em risco',
    progress: 50,
    badge: 'Risco',
    status: 'Em risco',
    statusState: 'warning',
    reason: 'Plano de recuperação com QA consolidado',
    isLive: true,
  },
  {
    id: 'proj-03',
    client: 'KPMG',
    code: 'KP',
    health: 'Atenção',
    progress: 70.3,
    badge: 'Atenção',
    status: 'Atenção',
    statusState: 'warning',
    reason: 'Deploy/Data Lake em validação',
    isLive: true,
  },
  {
    id: 'proj-04',
    client: 'JEQUITI',
    code: 'JE',
    health: 'Saúde estável',
    progress: 100,
    badge: 'Concluído',
    status: 'Concluído',
    statusState: 'completed',
    reason: 'Entrega finalizada em 05/12',
    completedDate: '05 Dez 2025',
  },
];

const activeClients = new Set(projectHighlights.map((project) => project.client)).size;
const completedProjects = projectHighlights.filter((project) => project.progress >= 100);
const activeProjects = Math.max(projectHighlights.length - completedProjects.length, 0);
const averageProgress =
  projectHighlights.reduce((sum, project) => sum + Math.min(project.progress, 100), 0) / projectHighlights.length;

const summaryStats = [
  { id: 'summary-01', label: 'Clientes ativos', value: `${activeClients}` },
  { id: 'summary-02', label: 'Projetos ativos', value: `${activeProjects}` },
  { id: 'summary-03', label: 'Concluídos (Últ. 7d)', value: `${completedProjects.length}` },
  { id: 'summary-04', label: 'Progresso médio', value: `${averageProgress.toFixed(1)}%` },
];

const reportProject = {
  name: 'JnJ',
  client: 'KPMG',
  responsible: 'Mário Zuccheri',
  reportDate: '16/01/2026',
  status: 'Não iniciado',
  health: 'Em dia',
  goLive: '25/02/2026',
};

const MonitorFilters = () => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-slate-200">
    {[
      { label: 'Cliente', options: selectOptions.clientes },
      { label: 'Projeto', options: selectOptions.projetos },
      { label: 'Responsável', options: selectOptions.responsaveis },
    ].map((filter) => (
      <label key={filter.label} className="flex flex-col text-xs uppercase tracking-[0.4em] text-slate-300 font-bold">
        {filter.label}
        <select className="mt-2 rounded-2xl border border-slate-800 bg-[#030914] text-slate-100 text-sm px-3 py-2 focus:outline-none focus:ring-emerald-400">
          {filter.options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>
    ))}
    <div className="flex items-end gap-2">
      {['Todos', 'Atrasadas', 'Próximas'].map((value) => (
        <button
          key={value}
          className="flex-1 rounded-2xl border border-slate-800 bg-[#0b1026] text-slate-200 text-xs uppercase tracking-[0.3em] font-bold py-2 transition hover:border-emerald-400"
        >
          {value}
        </button>
      ))}
    </div>
  </div>
);

const Sparkline = () => (
  <div className="mt-2 grid grid-cols-5 gap-1">
    {[8, 12, 9, 14, 11].map((height, index) => (
      <span
        key={index}
        className="block h-7 rounded-full bg-gradient-to-t from-slate-600 to-slate-400"
        style={{ height: `${height}px` }}
      />
    ))}
  </div>
);

const StatusBadge = ({ label, variant }: { label: string; variant: 'success' | 'warning' | 'completed'; }) => {
  const styles = {
    success: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-100 text-amber-700 border border-amber-200',
    completed: 'bg-emerald-500/10 text-emerald-300 border border-emerald-400',
  };
  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] ${styles[variant]}`}>
      {label}
    </span>
  );
};

const ActivityToolbar = () => (
  <div className="mt-6 flex flex-col gap-4 border border-slate-800 bg-[#020712] p-4 shadow-[0_10px_30px_rgba(15,23,42,0.5)] sm:flex-row sm:items-center sm:justify-between">
    <div className="relative flex items-center gap-3 rounded-2xl border border-slate-800 bg-[#050c1a] px-3 py-2">
      <Search size={16} className="text-slate-400" />
      <input
        type="text"
        placeholder="Buscar atividade ou responsável"
        className="w-full bg-transparent text-xs text-slate-200 outline-none placeholder:text-slate-500"
      />
    </div>
    <div className="flex flex-wrap gap-3 text-[11px] uppercase tracking-[0.3em]">
      {['Status', 'Responsável', 'Data'].map((filter) => (
        <button
          key={filter}
          className="rounded-full border border-slate-800 bg-[#030815] px-4 py-2 text-slate-200 transition hover:border-emerald-400"
        >
          {filter}
        </button>
      ))}
      <button className="rounded-full border border-transparent bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-900 shadow-[0_10px_25px_rgba(16,185,129,0.4)]">
        Exportar (PDF · XLS · CSV)
      </button>
    </div>
  </div>
);

const ReportPanel = ({ project, onClose }: { project: typeof reportProject; onClose: () => void }) => (
  <div className="rounded-3xl bg-[#f5f5f7] p-8 shadow-[0_20px_60px_rgba(15,23,42,0.25)] text-slate-900">
    <div className="flex items-center justify-between gap-4">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">{project.name}</h2>
        <div className="mt-2 flex flex-wrap gap-2 text-[11px] uppercase tracking-[0.4em] text-slate-500">
          <span className="rounded-full border border-slate-300 bg-white px-3 py-1">Cliente {project.client}</span>
          <span className="rounded-full border border-slate-300 bg-white px-3 py-1">Responsável {project.responsible}</span>
          <span className="rounded-full border border-slate-300 bg-white px-3 py-1">Data report {project.reportDate}</span>
          <span className="rounded-full border border-emerald-400 bg-emerald-100 px-3 py-1 text-emerald-700">Status {project.status}</span>
          <span className="rounded-full border border-emerald-400 bg-emerald-100 px-3 py-1 text-emerald-700">Saúde {project.health}</span>
          <span className="rounded-full border border-slate-300 bg-white px-3 py-1">GoLive {project.goLive}</span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={onClose}
          className="rounded-full border border-slate-700 bg-[#030915] px-4 py-2 text-xs uppercase tracking-[0.4em] text-white transition hover:border-emerald-400 hover:text-emerald-100"
        >
          Voltar
        </button>
        <button className="rounded-full border border-transparent bg-gradient-to-r from-emerald-500 to-emerald-400 px-4 py-2 text-xs font-semibold uppercase tracking-[0.4em] text-slate-950 shadow-[0_10px_25px_rgba(16,185,129,0.5)]">
          Exportar
        </button>
      </div>
    </div>
    <div className="mt-6 grid gap-6 lg:grid-cols-4">
      <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm text-[13px] uppercase tracking-[0.4em] text-slate-500">
        Projetos com risco
        <p className="mt-3 text-3xl font-semibold text-slate-900">1</p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm text-[13px] uppercase tracking-[0.4em] text-slate-500">
        Atividades no prazo
        <p className="mt-3 text-3xl font-semibold text-slate-900">7</p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm text-[13px] uppercase tracking-[0.4em] text-slate-500">
        GAP Médio
        <p className="mt-3 text-3xl font-semibold text-slate-900">-3,4%</p>
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm text-[13px] uppercase tracking-[0.4em] text-slate-500">
        Score de entrega
        <p className="mt-3 text-3xl font-semibold text-slate-900">84</p>
      </div>
    </div>
  </div>
);

// This represents the main dashboard for AXON Projects
export default function Dashboard() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isReportVisible, setIsReportVisible] = useState(false);

  return (
    <>
      <div className="min-h-screen w-full bg-[#030615] p-8 font-['Outfit'] text-slate-200">
        <header className="mb-10 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs text-slate-400 uppercase tracking-[0.5em]">
              Home / {isReportVisible ? 'Relatório do Projeto' : 'Monitor de Atividades'}
            </p>
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-[900] italic tracking-tighter text-white">
                  Monitor de Atividades
                </h1>
                <p className="text-sm text-slate-400">Acompanhe intervenções críticas, cronogramas e gargalos.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setIsDrawerOpen(true)}
                  className="flex items-center gap-2 rounded-full border border-slate-700 px-4 py-2 text-xs uppercase tracking-[0.4em] text-slate-300 transition hover:border-emerald-400 hover:text-emerald-400"
                >
                  <History size={16} />
                  Histórico
                </button>
                <button
                  onClick={() => setIsReportVisible((prev) => !prev)}
                  className="rounded-full bg-gradient-to-r from-slate-800 to-slate-900 text-white px-4 py-2 text-xs uppercase tracking-[0.4em] shadow-[0_10px_20px_rgba(16,185,129,0.4)]"
                >
                  {isReportVisible ? 'Fechar Relatório' : 'Gerar Relatório'}
                </button>
                <button className="rounded-full bg-[#061127] border border-slate-800 px-4 py-2 text-xs uppercase tracking-[0.4em] text-slate-200">
                  Gerar GANTT
                </button>
                <button className="rounded-full bg-emerald-500 px-4 py-2 text-xs uppercase tracking-[0.4em] text-slate-950">
                  + Adicionar Projeto
                </button>
              </div>
            </div>
          </div>
          <div className="grid gap-4 rounded-3xl border border-slate-800 bg-[#050c1e] p-6 shadow-[0_20px_55px_rgba(0,0,0,0.8)]">
            <MonitorFilters />
          </div>
          <div className="grid grid-cols-2 gap-4 text-slate-200 md:grid-cols-4">
            {summaryStats.map((stat) => (
              <div key={stat.id} className="rounded-2xl border border-slate-800 bg-[#040e1f] p-4 transition hover:border-emerald-400">
                <p className="text-[11px] uppercase tracking-[0.4em] text-slate-400">{stat.label}</p>
                <p className="text-3xl font-semibold text-white">{stat.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {enterpriseStats.map((stat) => (
              <div
                key={stat.id}
                className="rounded-3xl border border-slate-800 bg-[#040b1a] p-5 shadow-[0_10px_30px_rgba(15,23,42,0.5)]"
              >
                <p className="text-[11px] uppercase tracking-[0.4em] text-slate-500">{stat.label}</p>
                <div className="mt-3 flex items-end justify-between gap-3">
                  <p className="text-3xl font-semibold text-white">{stat.value}</p>
                  <span className="text-xs text-slate-400">{stat.trendLabel}</span>
                </div>
                <p className="text-xs text-slate-400">{stat.trend}</p>
                <Sparkline />
              </div>
            ))}
          </div>
          <ActivityToolbar />
          {isReportVisible && <ReportPanel project={reportProject} onClose={() => setIsReportVisible(false)} />}
          <div className="grid gap-6 lg:grid-cols-2">
            {projectHighlights.map((project) => {
              const isCompleted = project.progress >= 100;
              const progressWidth = Math.min(Math.max(project.progress, 0), 100);
              return (
                <div
                  key={project.id}
                  className={`rounded-3xl border border-slate-800 bg-[#050c1b] p-6 shadow-[0_20px_45px_rgba(0,0,0,0.7)] transition hover:border-emerald-500 ${isCompleted ? 'opacity-90' : ''}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-[0.5em] text-slate-400">Cliente</p>
                      <h3 className="text-3xl font-[900] tracking-tight text-white">{project.client}</h3>
                      <p className="text-[11px] uppercase tracking-[0.4em] text-slate-500">{project.code}</p>
                    </div>
                    <div className="h-10 w-10 rounded-full bg-[#0a152b] border border-slate-800 grid place-items-center text-xs font-bold text-slate-400">
                      {project.code}
                    </div>
                  </div>
                  <div className="mt-4 flex flex-wrap items-center gap-3">
                    <StatusBadge
                      label={isCompleted ? 'Concluído' : project.badge}
                      variant={isCompleted ? 'completed' : project.statusState === 'success' ? 'success' : 'warning'}
                    />
                    {project.isLive && !isCompleted && (
                      <span className="rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-[11px] uppercase tracking-[0.4em] text-emerald-300">
                        Live
                      </span>
                    )}
                    {isCompleted && project.completedDate && (
                      <span className="rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1 text-[11px] uppercase tracking-[0.4em] text-slate-300">
                        Finalizado {project.completedDate}
                      </span>
                    )}
                  </div>
                  <div className="mt-6 grid gap-4 text-sm text-slate-200">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Saúde</span>
                      <span className="text-xs uppercase tracking-[0.3em] text-slate-400">{project.status}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-semibold">Progressão</span>
                      <span className="text-xs uppercase tracking-[0.3em] text-slate-400">{project.progress.toFixed(1)}%</span>
                    </div>
                  </div>
                  {project.reason && (
                    <p className="mt-4 text-xs leading-relaxed text-slate-400">{project.reason}</p>
                  )}
                  <div className="mt-6 h-2 rounded-full bg-slate-900/40">
                    <span
                      className={`block h-full rounded-full bg-gradient-to-r ${isCompleted ? 'from-emerald-500 to-emerald-400' : 'from-emerald-400 to-emerald-500'}`}
                      style={{ width: `${progressWidth}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </header>

        <section className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6 items-start">
            <div className="rounded-3xl border border-slate-800 bg-[#050c1b] p-6 shadow-[0_20px_45px_rgba(0,0,0,0.7)]">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.5em] text-red-400">Ações Críticas</p>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Intervenção imediata</p>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <AlertTriangle size={16} className="text-red-400" />
                  12 atividades
                </div>
              </div>
              <div className="mt-6 space-y-4 pr-1">
                {criticalActions.map((action) => (
                  <div key={action.id} className="flex items-start gap-4 rounded-2xl border border-slate-800 bg-[#0c1325] p-4 shadow-[0_10px_30px_rgba(15,23,42,0.4)]">
                    <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-600 focus:ring-emerald-400" />
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-white">{action.title}</p>
                      <div className="flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.4em] text-slate-400">
                        <span>{action.client}</span>
                        <span>•</span>
                        <span>{action.owner}</span>
                      </div>
                      <p className="mt-2 text-[11px] uppercase tracking-[0.5em] text-slate-400">
                        {action.tag}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <StatusBadge label={action.status} variant={action.statusState === 'warning' ? 'warning' : 'success'} />
                        <button className="text-[11px] uppercase tracking-[0.3em] text-slate-400 hover:text-white">
                          Histórico
                        </button>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-white">
                      <MoreHorizontal size={20} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-xs uppercase tracking-[0.4em] text-slate-400">
                +6 restantes
              </div>
            </div>

            <div className="grid gap-6">
              <div className="rounded-3xl border border-slate-800 bg-[#050c1a] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-emerald-400">Cronograma do Dia</p>
                    <p className="text-sm text-slate-400">Entrega e follow-up</p>
                  </div>
                  <CalendarDays size={20} className="text-emerald-400" />
                </div>
                <div className="mt-6 flex min-h-[160px] flex-col items-center justify-center gap-3 rounded-2xl border border-slate-700/80 bg-[#020712] p-6 text-center text-slate-400">
                  <CheckCircle2 size={36} className="text-emerald-500" />
                  <p className="text-sm text-slate-200">Sem atividades.</p>
                  <p className="text-xs uppercase tracking-[0.4em] text-slate-500">#calm</p>
                </div>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-[#050c1a] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Próximos 7 dias</p>
                    <p className="text-sm text-slate-400">Planejamento</p>
                  </div>
                  <Zap size={20} className="text-slate-400" />
                </div>
                <div className="mt-6 flex flex-col gap-4 overflow-y-auto pr-2">
                  {upcomingWeek.slice(0, 6).map((item) => (
                    <div key={item.id} className="flex items-start gap-3 rounded-2xl border border-slate-800 bg-[#0c1426] px-4 py-3">
                      <input type="checkbox" className="mt-1 h-4 w-4 rounded border-slate-600 focus:ring-emerald-400" />
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-100">{item.title}</p>
                        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.4em] text-slate-400">
                          <span>{item.owner}</span>
                          <span>•</span>
                          <span>{item.status}</span>
                        </div>
                      </div>
                      <span className="text-[11px] uppercase tracking-[0.4em] text-slate-400">{item.day}</span>
                    </div>
                  ))}
                  <div className="text-xs uppercase tracking-[0.4em] text-slate-400">
                    +1 restante
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-slate-800 bg-[#050c1b] p-6 shadow-[0_15px_45px_rgba(0,0,0,0.7)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Métricas de Time</h3>
                <span className="text-xs uppercase tracking-[0.4em] text-slate-400">Carga por responsável</span>
              </div>
            <div className="space-y-4">
              {timeMetrics.map((metric) => (
                  <div key={metric.id} className="rounded-2xl border border-slate-800/60 bg-[#0b1326] p-4">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-100">{metric.name}</p>
                      <span className="text-[11px] uppercase tracking-[0.4em] text-slate-400">{metric.bubble}</span>
                    </div>
                    <p className="text-xs text-slate-400">{metric.load}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-800 bg-[#050c1b] p-6 shadow-[0_15px_45px_rgba(0,0,0,0.7)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white">Gargalos</h3>
                <span className="text-xs uppercase tracking-[0.4em] text-slate-400">Projetos com atraso</span>
              </div>
              <div className="space-y-4 text-sm text-slate-200">
                <p className="rounded-2xl border border-rose-600/40 bg-rose-600/10 px-3 py-2 text-rose-300">Célula de Digitalização — 7 atrasos</p>
                <p className="rounded-2xl border border-amber-500/40 bg-amber-500/10 px-3 py-2 text-amber-300">Equipe de Integração — 3 dependências bloqueadas</p>
                <p className="rounded-2xl border border-slate-700/60 bg-slate-800/40 px-3 py-2 text-slate-300">Operação Cloud Services — 2 revisões pendentes</p>
              </div>
              <button className="mt-4 w-full rounded-2xl border border-slate-800 bg-[#020711] px-4 py-2 text-xs uppercase tracking-[0.4em] text-slate-300 hover:border-emerald-400">
                Revisar todas as pendências
              </button>
            </div>
          </div>
        </section>
      </div>
      <AuditTrailDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
    </>
  );
}
