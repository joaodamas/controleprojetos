export type Blueprint = {
  id: string;
  version: number;
  name: string;
  statuses: string[];
  governancePreset: "light" | "standard" | "strict";
  defaultStructure: Array<{
    type: "phase" | "milestone" | "task";
    title: string;
    isCritical?: boolean;
    children?: any[];
  }>;
};

export const BLUEPRINTS: Record<string, Blueprint> = {
  implementation_go_live: {
    id: "implementation_go_live",
    version: 1,
    name: "Implantação (Go-live)",
    statuses: ["todo", "in_progress", "blocked", "done"],
    governancePreset: "standard",
    defaultStructure: [
      {
        type: "phase",
        title: "Planejamento",
        children: [
          { type: "task", title: "Kickoff", isCritical: true },
          { type: "task", title: "Plano de projeto" }
        ]
      },
      {
        type: "phase",
        title: "Execução",
        children: [
          { type: "milestone", title: "Go-live", isCritical: true },
          { type: "task", title: "Treinamento" }
        ]
      }
    ]
  }
};