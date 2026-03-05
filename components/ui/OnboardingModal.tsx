import React, { useMemo, useState } from "react";
import { Building2, Users, Sparkles, ArrowRight, ArrowLeft } from "lucide-react";

type TeamSize = "1-5" | "6-20" | "21+";

type PlanSuggestion = {
  name: string;
  description: string;
  highlight: string;
};

export type OnboardingPayload = {
  companyName: string;
  sector: string;
  teamSize: TeamSize;
  focusArea: string;
  suggestedPlan: string;
};

type OnboardingModalProps = {
  isOpen: boolean;
  isDarkMode?: boolean;
  onComplete: (payload: OnboardingPayload) => void;
};

const TEAM_SIZES: Array<{ value: TeamSize; label: string; helper: string }> = [
  { value: "1-5", label: "1-5 funcionarios", helper: "Ideal para times pequenos" },
  { value: "6-20", label: "6-20 funcionarios", helper: "Perfeito para times em crescimento" },
  { value: "21+", label: "21+ funcionarios", helper: "Escala enterprise e multiplos projetos" },
];

const SECTORS = [
  { value: "tech", label: "Tecnologia" },
  { value: "const", label: "Construcao civil" },
  { value: "serv", label: "Servicos" },
  { value: "ind", label: "Industria" },
  { value: "retail", label: "Varejo" },
  { value: "health", label: "Saude" },
];

const FOCUS_OPTIONS = [
  { value: "monitor", label: "Monitor de atividades" },
  { value: "dashboards", label: "Dashboards de projetos" },
  { value: "governance", label: "Governanca e compliance" },
  { value: "automation", label: "Automacoes e alertas" },
];

function getPlanSuggestion(size: TeamSize | ""): PlanSuggestion {
  if (size === "1-5") {
    return {
      name: "Starter",
      description: "Organizacao pessoal, cronogramas e foco em entrega.",
      highlight: "Projetos essenciais para times pequenos.",
    };
  }
  if (size === "6-20") {
    return {
      name: "Professional",
      description: "Dashboards de time, metas e metricas de produtividade.",
      highlight: "Colaboracao e visibilidade para equipes.",
    };
  }
  return {
    name: "Enterprise",
    description: "Governanca, multiplas frentes e relatorios avancados.",
    highlight: "Operacao corporativa em escala.",
  };
}

export function OnboardingModal({ isOpen, isDarkMode = true, onComplete }: OnboardingModalProps) {
  const totalSteps = 3;
  const [step, setStep] = useState(1);
  const [companyName, setCompanyName] = useState("");
  const [sector, setSector] = useState("");
  const [teamSize, setTeamSize] = useState<TeamSize | "">("");
  const [focusArea, setFocusArea] = useState("");

  const suggestion = useMemo(() => getPlanSuggestion(teamSize), [teamSize]);

  if (!isOpen) return null;

  const theme = isDarkMode
    ? {
        overlay: "bg-slate-950/80",
        card: "bg-slate-900 border-slate-800 text-white",
        muted: "text-slate-400",
        input: "bg-slate-800 border-slate-700 text-white",
        button: "bg-slate-800 text-slate-200 hover:bg-slate-700",
        primary: "bg-emerald-600 hover:bg-emerald-500 text-white",
        accent: "text-emerald-400",
      }
    : {
        overlay: "bg-slate-200/70",
        card: "bg-white border-slate-200 text-slate-900",
        muted: "text-slate-500",
        input: "bg-slate-50 border-slate-200 text-slate-900",
        button: "bg-slate-100 text-slate-700 hover:bg-slate-200",
        primary: "bg-emerald-600 hover:bg-emerald-500 text-white",
        accent: "text-emerald-600",
      };

  const canGoNext =
    (step === 1 && companyName.trim().length > 1 && sector) ||
    (step === 2 && teamSize && focusArea) ||
    step === 3;

  const progress = Math.round((step / totalSteps) * 100);

  const handleNext = () => {
    if (step < totalSteps) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const handleComplete = () => {
    if (!teamSize) return;
    onComplete({
      companyName: companyName.trim(),
      sector,
      teamSize,
      focusArea,
      suggestedPlan: suggestion.name,
    });
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${theme.overlay} backdrop-blur-sm`}>
      <div className={`w-full max-w-xl rounded-2xl border shadow-2xl overflow-hidden ${theme.card}`}>
        <div className="h-1.5 w-full bg-slate-800">
          <div
            className="h-full bg-emerald-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="p-8 space-y-6">
          <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em]">
            <span className={theme.muted}>Onboarding</span>
            <span className={theme.muted}>
              Passo {step} de {totalSteps}
            </span>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="mx-auto w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                  <Building2 className={`w-6 h-6 ${theme.accent}`} />
                </div>
                <h2 className="text-2xl font-bold">Bem vindo ao JP Projects</h2>
                <p className={theme.muted}>Vamos configurar sua companhia em poucos passos.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme.muted}`}>Nome da companhia</label>
                  <input
                    value={companyName}
                    onChange={(event) => setCompanyName(event.target.value)}
                    placeholder="Ex: JP Tech"
                    className={`w-full rounded-lg px-4 py-2 border focus:ring-2 focus:ring-emerald-500 outline-none ${theme.input}`}
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-1 ${theme.muted}`}>Ramo da companhia</label>
                  <select
                    value={sector}
                    onChange={(event) => setSector(event.target.value)}
                    className={`w-full rounded-lg px-4 py-2 border focus:ring-2 focus:ring-emerald-500 outline-none ${theme.input}`}
                  >
                    <option value="">Selecione um ramo</option>
                    {SECTORS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="mx-auto w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                  <Users className={`w-6 h-6 ${theme.accent}`} />
                </div>
                <h2 className="text-2xl font-bold">Tamanho do time</h2>
                <p className={theme.muted}>Quantas pessoas vao usar o sistema?</p>
              </div>

              <div className="grid gap-3">
                {TEAM_SIZES.map((option) => {
                  const isActive = teamSize === option.value;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setTeamSize(option.value)}
                      className={`rounded-xl border px-4 py-3 text-left transition ${
                        isActive
                          ? "border-emerald-500 bg-emerald-500/10"
                          : "border-slate-700 hover:border-emerald-400"
                      }`}
                    >
                      <div className="font-semibold">{option.label}</div>
                      <div className={`text-xs ${theme.muted}`}>{option.helper}</div>
                    </button>
                  );
                })}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-1 ${theme.muted}`}>Foco inicial</label>
                <select
                  value={focusArea}
                  onChange={(event) => setFocusArea(event.target.value)}
                  className={`w-full rounded-lg px-4 py-2 border focus:ring-2 focus:ring-emerald-500 outline-none ${theme.input}`}
                >
                  <option value="">Selecione um foco</option>
                  {FOCUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="mx-auto w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                  <Sparkles className={`w-6 h-6 ${theme.accent}`} />
                </div>
                <h2 className="text-2xl font-bold">Plano sugerido</h2>
                <p className={theme.muted}>Com base no seu perfil, recomendamos:</p>
              </div>

              <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-center space-y-2">
                <h3 className={`text-xl font-bold ${theme.accent}`}>{suggestion.name}</h3>
                <p className={theme.muted}>{suggestion.description}</p>
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">{suggestion.highlight}</p>
              </div>

              <div className="rounded-xl border border-slate-800/60 p-4 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className={theme.muted}>Companhia</span>
                  <span className="font-semibold">{companyName}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={theme.muted}>Ramo</span>
                  <span className="font-semibold">
                    {SECTORS.find((option) => option.value === sector)?.label || "-"}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={theme.muted}>Time</span>
                  <span className="font-semibold">{teamSize}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={theme.muted}>Foco</span>
                  <span className="font-semibold">
                    {FOCUS_OPTIONS.find((option) => option.value === focusArea)?.label || "-"}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                step === 1 ? "opacity-50 cursor-not-allowed" : theme.button
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar
            </button>

            {step < totalSteps ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!canGoNext}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition ${
                  canGoNext ? theme.primary : "opacity-50 cursor-not-allowed bg-slate-700 text-slate-300"
                }`}
              >
                Continuar
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handleComplete}
                className={`flex items-center gap-2 px-5 py-2 rounded-lg text-sm font-semibold transition ${theme.primary}`}
              >
                Confirmar e acessar
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
