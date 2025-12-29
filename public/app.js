const firebaseConfig = {
  apiKey: "AIzaSyAR1f27oMx0maMDQ_HRGaJQ5MDIVpUnkwQ",
  authDomain: "controle-projetos-a55d5.firebaseapp.com",
  projectId: "controle-projetos-a55d5",
  databaseURL: "https://controle-projetos-a55d5-default-rtdb.firebaseio.com",
  storageBucket: "controle-projetos-a55d5.firebasestorage.app",
  messagingSenderId: "211361267384",
  appId: "1:211361267384:web:b263ea8fd2198fbffc3e4d",
  measurementId: "G-1HCL23GXV4"
};

let db = null;
let auth = null;
let appInitialized = false;

const state = {
  clients: [
    {
      name: "KPMG",
      projects: [
        {
          name: "EPAYS",
          developer: "DEV Alovado",
          start: "2025-02-12",
          end: "2025-02-26",
          progress: 0,
          tasks: [
            { title: "DESENVOLVIMENTO", phase: "DESENVOLVIMENTO", status: "em_andamento", start: "2025-02-12", due: "2025-02-26" },
            { title: "Adequar retorno dos detalhes da NF", phase: "DESENVOLVIMENTO", status: "em_andamento", start: "2025-02-12", due: "2025-02-26" },
            { title: "Adequar item para retorno do Processamento do ePAYS", phase: "DESENVOLVIMENTO", status: "em_andamento", start: "2025-02-12", due: "2025-02-26" },
            { title: "Atualizacao de Processo e Implementacao de Regras", phase: "DESENVOLVIMENTO", status: "em_andamento", start: "2025-12-22", due: "2026-01-09" },
            { title: "Gerenciador Busca Geral de NF", phase: "DESENVOLVIMENTO", status: "em_andamento", start: "2025-12-19", due: "2026-01-09" },
            { title: "Agendar Teste com Cliente", phase: "GESTAO", status: "concluido", start: "2025-11-03", due: "2025-11-03" },
            { title: "Agendar reuniao de levantamento para Mario e Hanna", phase: "LEVANTAMENTO", status: "planejado", start: "2025-12-29", due: "2025-12-29" },
            { title: "TESTE INTEGRADO", phase: "TESTES", status: "planejado", start: "2026-01-05", due: "2026-01-08" },
            { title: "Testes Integrado", phase: "TESTES", status: "planejado", start: "2026-01-05", due: "2026-01-08" },
            { title: "Testes Unitarios", phase: "TESTES", status: "planejado", start: "2026-01-06", due: "2026-01-08" },
            { title: "DEPLOY", phase: "DEPLOY", status: "planejado", start: "2026-01-06", due: "2026-01-08" },
            { title: "Deploy Ambiente de Producao", phase: "DEPLOY", status: "planejado", start: "2026-01-06", due: "2026-01-08" },
            { title: "Planejar com o cliente a virada para producao", phase: "DEPLOY", status: "planejado", start: "2026-01-06", due: "2026-01-08" },
            { title: "DEFINICOES", phase: "LEVANTAMENTO", status: "concluido", start: "2025-10-22", due: "2025-11-06" },
            { title: "Definicao integracao CAPS das notas de ePays", phase: "LEVANTAMENTO", status: "concluido", start: "2025-11-06", due: "2025-11-06" },
            { title: "Especificar campos de retorno na consulta detalhada e geral", phase: "LEVANTAMENTO", status: "concluido", start: "2025-11-05", due: "2025-11-05" },
            { title: "Definicao de Atualizacao de Processo e Determinacoes Fiscais", phase: "LEVANTAMENTO", status: "concluido", start: "2025-11-04", due: "2025-11-04" }
          ]
        },
        { name: "BAIXA EM LOTE – Demais Clientes", developer: "A definir", start: "", end: "", progress: 0, tasks: [] },
        { name: "JnJ", developer: "A definir", start: "", end: "", progress: 0, tasks: [] },
        {
          name: "OBI",
          developer: "A definir",
          start: "2025-10-13",
          end: "2026-01-12",
          progress: 0,
          tasks: [
            { title: "BBP-KPMG-OBI", phase: "GESTAO", status: "planejado", start: "2025-10-13", due: "2026-01-12" },
            { title: "ATUALIZACAO STATUS REPORT", phase: "GESTAO", status: "concluido", start: "2025-10-23", due: "2025-12-03" },
            { title: "Enviar Status Email - Posicao 03", phase: "GESTAO", status: "concluido", start: "2025-12-03", due: "2025-12-03" },
            { title: "Enviar Status Email - Posicao 02", phase: "GESTAO", status: "concluido", start: "2025-11-07", due: "2025-11-07" },
            { title: "Enviar Status Email - Posicao 01", phase: "GESTAO", status: "concluido", start: "2025-10-23", due: "2025-10-23" },
            { title: "DESENVOLVIMENTO - PACOTE 02", phase: "DESENVOLVIMENTO", status: "em_andamento", start: "2025-10-28", due: "2026-01-12" },
            { title: "Servico para Callback da Execucao", phase: "DESENVOLVIMENTO", status: "em_andamento", start: "2025-12-15", due: "2025-12-15" },
            { title: "Liberacao Rotas BTH - Ford", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-11-04", due: "2026-01-12" },
            { title: "Servico de Distribuicao", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-10-31", due: "2025-10-31" },
            { title: "Motor para Classificacao e Compactacao dos XML", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-10-28", due: "2025-10-29" },
            { title: "GO LIVE", phase: "DEPLOY", status: "planejado", start: "2025-12-17", due: "2025-12-22" },
            { title: "Operacao Assistida", phase: "DEPLOY", status: "planejado", start: "2025-12-18", due: "2025-12-22" },
            { title: "Preparacao Go Live", phase: "DEPLOY", status: "planejado", start: "2025-12-17", due: "2025-12-17" },
            { title: "TESTES INTEGRADOS E AJUSTES", phase: "TESTES", status: "planejado", start: "2025-10-29", due: "2025-12-17" },
            { title: "PACOTE 02 - Testes e Ajustes", phase: "TESTES", status: "planejado", start: "2025-12-16", due: "2025-12-17" },
            { title: "PACOTE 01 - Testes e Ajustes", phase: "TESTES", status: "concluido", start: "2025-10-29", due: "2025-10-30" },
            { title: "DESENVOLVIMENTO - PACOTE 01", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-10-13", due: "2025-10-28" },
            { title: "Disponibilizar o Download XML OBI", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-10-28", due: "2025-10-28" },
            { title: "Liberar Botao em \"Acoes\"", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-10-28", due: "2025-10-28" },
            { title: "Servico de Enriquecimento XML NFSe", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-10-27", due: "2025-10-28" },
            { title: "Upload e Salvamento do XML enriquecido", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-10-28", due: "2025-10-28" },
            { title: "Enriquecer XML com Metadata", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-10-28", due: "2025-10-28" },
            { title: "Enriquecer XML com Evento de Cancelamento", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-10-28", due: "2025-10-28" },
            { title: "Filtrar NF (invoices) por data de Atualizacao", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-10-27", due: "2025-10-27" },
            { title: "Servico de Enriquecimento XML NFe", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-10-24", due: "2025-10-27" },
            { title: "Enriquecer XML com Metadata", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-10-27", due: "2025-10-27" },
            { title: "Upload e Salvamento do XML enriquecido", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-10-27", due: "2025-10-27" },
            { title: "Filtrar NF (emissions) por data de Atualizacao", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-10-24", due: "2025-10-24" },
            { title: "Enriquecer os Itens da NF", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-10-24", due: "2025-10-24" },
            { title: "Enriquecer XML com Evento de Cancelamento", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-10-24", due: "2025-10-24" },
            { title: "Criar Endpoint de Enfileiramento OBI Saida", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-10-13", due: "2025-10-23" }
          ]
        }
      ]
    },
    {
      name: "JEQUITI",
      projects: [
        {
          name: "BBP-JEQUITI-WS360",
          developer: "A definir",
          start: "2025-10-06",
          end: "2025-12-04",
          progress: 0,
          tasks: [
            { title: "BBP-JEQUITI-WS360", phase: "GESTAO", status: "em_andamento", start: "2025-10-06", due: "2025-12-04" },
            { title: "TESTES E AJUSTES", phase: "TESTES", status: "em_andamento", start: "2025-10-15", due: "2025-12-04" },
            { title: "Pacote 02", phase: "DESENVOLVIMENTO", status: "planejado", start: "2025-10-27", due: "2025-12-04" },
            { title: "Motor de Calculo - Tatico - MRP", phase: "DESENVOLVIMENTO", status: "em_andamento", start: "2025-12-04", due: "2025-12-04" },
            { title: "Motor de Calculo - Geral - Planejamento", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-11-04", due: "2025-11-04" },
            { title: "Motor de Calculo - Tatico - Projecao", phase: "DESENVOLVIMENTO", status: "em_andamento", start: "2025-10-27", due: "2025-10-27" },
            { title: "Pacote 03", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-10-15", due: "2025-11-19" },
            { title: "Motor de Calculo - Giro de Estoque", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-11-19", due: "2025-11-19" },
            { title: "Motor de Calculo - Geral - INA", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-11-04", due: "2025-11-04" },
            { title: "Pacote 04", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-10-15", due: "2025-11-19" },
            { title: "Motor de Calculo - Informativo", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-11-19", due: "2025-11-19" },
            { title: "Motor de Calculo - Geral - Diagnostico", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-11-19", due: "2025-11-19" },
            { title: "Pacote 01", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-10-15", due: "2025-10-17" },
            { title: "Motor de Calculo - Mercadologico - Produtos", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-10-17", due: "2025-10-17" },
            { title: "Motor de Calculo - Mercadologico - Geral", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-10-17", due: "2025-10-17" },
            { title: "Motor de Calculo - Avaliacao de Demanda", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-10-17", due: "2025-10-17" },
            { title: "MOTOR DE CALCULO", phase: "DESENVOLVIMENTO", status: "em_andamento", start: "2025-10-15", due: "2025-12-03" },
            { title: "Pacote 03", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-10-29", due: "2025-10-31" },
            { title: "Motor de Calculo - Giro de Estoque", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-10-29", due: "2025-10-31" },
            { title: "Motor de Calculo - Geral - INA", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-10-29", due: "2025-10-30" },
            { title: "Pacote 02", phase: "DESENVOLVIMENTO", status: "em_andamento", start: "2025-10-29", due: "2025-12-03" },
            { title: "Motor de Calculo - Tatico - MRP", phase: "DESENVOLVIMENTO", status: "em_andamento", start: "2025-11-19", due: "2025-12-03" },
            { title: "Motor de Calculo - Tatico - Projecao", phase: "DESENVOLVIMENTO", status: "em_andamento", start: "2025-11-19", due: "2025-12-03" },
            { title: "Motor de Calculo - Geral - Planejamento", phase: "DESENVOLVIMENTO", status: "em_andamento", start: "2025-10-29", due: "2025-12-03" },
            { title: "Pacote 04", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-11-17", due: "2025-11-17" },
            { title: "Motor de Calculo - Informativo", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-11-17", due: "2025-11-17" },
            { title: "Motor de Calculo - Geral - Diagnostico", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-11-17", due: "2025-11-17" },
            { title: "Pacote 01", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-10-15", due: "2025-10-17" },
            { title: "Motor de Calculo - Mercadologico - Produtos", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-10-17", due: "2025-10-17" },
            { title: "Motor de Calculo - Mercadologico - Geral", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-10-16", due: "2025-10-16" },
            { title: "Motor de Calculo - Avaliacao de Demanda", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-10-15", due: "2025-10-15" },
            { title: "GO LIVE", phase: "DEPLOY", status: "em_andamento", start: "2025-10-06", due: "2025-12-04" },
            { title: "Producao Pacote 2", phase: "DEPLOY", status: "planejado", start: "2025-12-04", due: "2025-12-04" },
            { title: "Operacao Assistida Pacote 1, 2, 3 e 4", phase: "DEPLOY", status: "planejado", start: "2025-12-08", due: "2025-12-19" },
            { title: "ENTRADA EM PRODUCAO 2", phase: "DEPLOY", status: "planejado", start: "2025-12-05", due: "2025-12-05" },
            { title: "Preparacao para Virada Pacote 2", phase: "DEPLOY", status: "planejado", start: "2025-12-04", due: "2025-12-04" },
            { title: "Producao Pacotes 1, 3 e 4", phase: "DEPLOY", status: "concluido", start: "2025-10-06", due: "2025-11-14" },
            { title: "ENTRADA EM PRODUCAO 1", phase: "DEPLOY", status: "concluido", start: "2025-10-06", due: "2025-11-07" },
            { title: "Preparacao para Virada Pacote 1, 3 e 4", phase: "DEPLOY", status: "concluido", start: "2025-10-06", due: "2025-10-28" },
            { title: "Operacao Assistida Pacote 1, 3 e 4", phase: "DEPLOY", status: "concluido", start: "2025-10-10", due: "2025-11-14" },
            { title: "Gestao", phase: "GESTAO", status: "planejado", start: "2025-10-21", due: "2025-10-21" },
            { title: "Reuniao interna do Projeto", phase: "GESTAO", status: "planejado", start: "2025-10-21", due: "2025-10-21" },
            { title: "Pacote 1 - Reuniao de trabalho com o cliente", phase: "GESTAO", status: "planejado", start: "2025-10-21", due: "2025-10-21" }
          ]
        }
      ]
    },
    {
      name: "BYEBYEPAPER",
      projects: [
        { name: "Demandas Internas", developer: "A definir", start: "", end: "", progress: 0, tasks: [] },
        { name: "Pendente Execucao", developer: "A definir", start: "", end: "", progress: 0, tasks: [] },
        { name: "BBP - Melhorias", developer: "A definir", start: "", end: "", progress: 0, tasks: [] }
      ]
    },
    {
      name: "ASCENTY",
      projects: [
        {
          name: "Monitoramento NFSe",
          developer: "A definir",
          start: "2025-12-17",
          end: "2025-12-30",
          progress: 0,
          tasks: [
            { title: "ASCENTY - MONITORAMENTO NOTAS DE SERVICO", phase: "LEVANTAMENTO", status: "planejado", start: "2025-12-17", due: "2025-12-30" },
            { title: "DESENVOLVIMENTO", phase: "DESENVOLVIMENTO", status: "planejado", start: "2025-12-18", due: "2025-12-29" },
            { title: "PACOTE 01 - PRIORIDADE", phase: "DESENVOLVIMENTO", status: "planejado", start: "2025-12-18", due: "2025-12-24" },
            { title: "Configuracao SSO", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-12-22", due: "2025-12-22" },
            { title: "Desenvolvimento de Integracao - Rio de Janeiro", phase: "DESENVOLVIMENTO", status: "planejado", start: "2025-12-23", due: "2025-12-23" },
            { title: "Desenvolvimento de Integracao - Campinas", phase: "DESENVOLVIMENTO", status: "em_andamento", start: "2025-12-22", due: "2025-12-22" },
            { title: "Desenvolvimento de Integracao - Vinhedo", phase: "DESENVOLVIMENTO", status: "em_andamento", start: "2025-12-22", due: "2025-12-24" },
            { title: "Desenvolvimento de Integracao - NFCON", phase: "DESENVOLVIMENTO", status: "em_andamento", start: "2025-12-22", due: "2025-12-23" },
            { title: "Desenvolvimento de Integracao - Maracanau", phase: "DESENVOLVIMENTO", status: "planejado", start: "2025-12-23", due: "2025-12-23" },
            { title: "Desenvolvimento de Integracao - Osasco", phase: "DESENVOLVIMENTO", status: "concluido", start: "2025-12-18", due: "2025-12-19" },
            { title: "PACOTE 03 - PRIORIDADE 3", phase: "DESENVOLVIMENTO", status: "planejado", start: "2025-12-26", due: "2025-12-29" },
            { title: "Desenvolvimento de Integracao - Ambiente Nacional", phase: "DESENVOLVIMENTO", status: "planejado", start: "2025-12-29", due: "2025-12-29" },
            { title: "Concluir Fluxo de Consulta", phase: "DESENVOLVIMENTO", status: "planejado", start: "2025-12-26", due: "2025-12-26" },
            { title: "PACOTE 02 - PRIORIDADE 2", phase: "DESENVOLVIMENTO", status: "planejado", start: "2025-12-24", due: "2025-12-29" },
            { title: "Desenvolvimento de Integracao - Sumare", phase: "DESENVOLVIMENTO", status: "planejado", start: "2025-12-24", due: "2025-12-24" },
            { title: "Desenvolvimento de Integracao - Jundiai", phase: "DESENVOLVIMENTO", status: "planejado", start: "2025-12-24", due: "2025-12-24" },
            { title: "Desenvolvimento de Integracao - Hortolandia", phase: "DESENVOLVIMENTO", status: "planejado", start: "2025-12-24", due: "2025-12-24" },
            { title: "Desenvolvimento de Integracao - Paulinia", phase: "DESENVOLVIMENTO", status: "planejado", start: "2025-12-24", due: "2025-12-24" },
            { title: "INFRAESTRUTURA", phase: "DESENVOLVIMENTO", status: "planejado", start: "2025-12-23", due: "2025-12-29" },
            { title: "Configuracao Ambiente Nacional", phase: "DESENVOLVIMENTO", status: "em_andamento", start: "2025-12-26", due: "2025-12-29" },
            { title: "Configuracao NFCom", phase: "DESENVOLVIMENTO", status: "em_andamento", start: "2025-12-22", due: "2025-12-23" },
            { title: "Configuracao NFSe", phase: "DESENVOLVIMENTO", status: "em_andamento", start: "2025-12-22", due: "2025-12-23" },
            { title: "DEPLOY", phase: "DEPLOY", status: "planejado", start: "2025-12-30", due: "2025-12-30" },
            { title: "Homologacao", phase: "DEPLOY", status: "planejado", start: "2025-12-30", due: "2025-12-30" },
            { title: "TESTES", phase: "TESTES", status: "planejado", start: "2025-12-26", due: "2025-12-30" },
            { title: "PACOTE 03 - PRIORIZACAO 3", phase: "TESTES", status: "planejado", start: "2025-12-30", due: "2025-12-30" },
            { title: "PACOTE 01 - PRIORIZACAO 1", phase: "TESTES", status: "planejado", start: "2025-12-24", due: "2025-12-24" },
            { title: "PACOTE 02 - PRIORIZACAO 2", phase: "TESTES", status: "planejado", start: "2025-12-26", due: "2025-12-26" },
            { title: "LEVANTAMENTO", phase: "LEVANTAMENTO", status: "planejado", start: "2025-12-17", due: "2025-12-18" },
            { title: "Credenciais de Acesso SFTP", phase: "LEVANTAMENTO", status: "em_andamento", start: "2025-12-18", due: "2025-12-18" },
            { title: "Credenciais SSO", phase: "LEVANTAMENTO", status: "em_andamento", start: "2025-12-18", due: "2025-12-18" },
            { title: "Pegar os CNPJs e cadastrar as Companies", phase: "LEVANTAMENTO", status: "concluido", start: "2025-12-18", due: "2025-12-18" },
            { title: "Credenciais Prefeituras", phase: "LEVANTAMENTO", status: "concluido", start: "2025-12-18", due: "2025-12-18" },
            { title: "Criacao Grupo - TEAMS", phase: "LEVANTAMENTO", status: "concluido", start: "2025-12-18", due: "2025-12-18" },
            { title: "Envio Endpoint e APIKEY para Carga do Certificado Digital", phase: "LEVANTAMENTO", status: "concluido", start: "2025-12-18", due: "2025-12-18" }
          ]
        }
      ]
    }
  ],
  employees: [
    { name: "DEV Alovado", role: "Desenvolvedor", email: "dev.alovado@empresa.com" },
    { name: "Ana Lima", role: "Gestora de Projetos", email: "ana.lima@empresa.com" }
  ],
  selectedClient: null,
  selectedProject: null,
  collapsedPhases: {},
  clientVisibility: {},
  editingProjectId: null,
  editingTaskIndex: null,
  home: {
    lastAccess: "",
    quote: ""
  },
  currentSection: "inicio",
  dashboard: {
    sort: { key: null, direction: "asc" },
    filters: {}
  }
};

const LOCAL_STORAGE_KEY = "controle_projetos_state_v1";

const STATUS_OPTIONS = [
  { value: "planejado", label: "Planejado", className: "planejado" },
  { value: "em_andamento", label: "Em andamento", className: "em-andamento" },
  { value: "atrasado", label: "Atrasado", className: "atrasado" },
  { value: "concluido", label: "Concluido", className: "concluido" }
];

const DASHBOARD_COLUMNS = [
  { key: "name", label: "Projeto", type: "text" },
  { key: "clientName", label: "Cliente", type: "text" },
  { key: "developer", label: "Responsavel", type: "text" },
  { key: "status", label: "Status", type: "text" },
  { key: "schedule", label: "Prazo", type: "text" },
  { key: "progress", label: "Progresso", type: "number" },
  { key: "goLive", label: "Go Live previsto", type: "date" }
];

const DEFAULT_EPICS = ["LEVANTAMENTO", "DESENVOLVIMENTO", "TESTES", "DEPLOY"];
const PACKAGE_PHASES = ["DESENVOLVIMENTO", "TESTES"];

const PHASE_ORDER = ["LEVANTAMENTO", "DESENVOLVIMENTO", "TESTES", "DEPLOY", "GESTAO", "OUTROS"];

const MOTIVATIONAL_QUOTES = [
  "Projetos bem gerenciados nao atrasam, eles se adaptam.",
  "Planejamento claro reduz ruido e acelera entregas.",
  "Cada marco concluido fortalece o proximo passo.",
  "Transparencia no progresso evita surpresas no Go Live.",
  "Equipe alinhada transforma prazo em compromisso."
];

const byId = (id) => document.getElementById(id);

function formatDateTime(date) {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  const hh = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `${dd}/${mm}/${yyyy} – ${hh}:${min}`;
}

function parseTaskDate(value) {
  if (!value) return null;

  if (typeof value === "number") {
    const dt = new Date(value);
    return Number.isNaN(dt.getTime()) ? null : dt;
  }

  if (typeof value !== "string") return null;
  const v = value.trim();

  const iso = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
  if (iso) {
    const y = Number(iso[1]);
    const m = Number(iso[2]);
    const d = Number(iso[3]);
    return new Date(y, m - 1, d);
  }

  const br = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(v);
  if (br) {
    const d = Number(br[1]);
    const m = Number(br[2]);
    const y = Number(br[3]);
    return new Date(y, m - 1, d);
  }

  return null;
}

function formatDateBR(value) {
  const dt = parseTaskDate(value);
  if (!dt) return value || "-";
  const dd = String(dt.getDate()).padStart(2, "0");
  const mm = String(dt.getMonth() + 1).padStart(2, "0");
  const yyyy = dt.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

function projectTaskCounts(tasks = []) {
  const counts = {
    total: tasks.length,
    em_andamento: 0,
    planejado: 0,
    atrasado: 0,
    concluido: 0
  };
  tasks.forEach((task) => {
    const status = (task.status || "").toLowerCase();
    if (status === "em_andamento") counts.em_andamento += 1;
    else if (status === "planejado") counts.planejado += 1;
    else if (status === "atrasado") counts.atrasado += 1;
    else if (status === "concluido") counts.concluido += 1;
  });
  return counts;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function normStatus(value) {
  return String(value || "").trim().toUpperCase();
}

function taskTitle(task) {
  return task?.title || task?.name || task?.item || task?.summary || "(Sem titulo)";
}

function taskOwner(task) {
  return task?.owner || task?.responsible || task?.assignee || "";
}

function taskProgress(task) {
  const p = task?.progressPct ?? task?.progress ?? task?.percent ?? null;
  const n = Number(p);
  return Number.isFinite(n) ? n : null;
}

function taskDateStr(task) {
  return (
    task?.startDate ||
    task?.start ||
    task?.plannedStart ||
    task?.dueDate ||
    task?.due ||
    task?.endDate ||
    task?.end ||
    ""
  );
}

function taskDateValueSafe(task) {
  const dt = parseTaskDate(taskDateStr(task));
  return dt ? dt.getTime() : Number.POSITIVE_INFINITY;
}

function isDoneTask(task) {
  const st = normStatus(task?.status || task?.state);
  const p = taskProgress(task);
  return /CONCLU|DONE|FEITO|FINALIZ/.test(st) || p === 100;
}

function isInProgressTask(task) {
  const st = normStatus(task?.status || task?.state);
  const p = taskProgress(task);
  if (p != null) return p > 0 && p < 100;
  return /ANDAMENTO|IN\\s*PROGRESS|EXECU/.test(st);
}

function isPlannedTask(task) {
  const st = normStatus(task?.status || task?.state);
  const p = taskProgress(task);
  if (p != null) return p === 0;
  return /PLANEJ|TODO|A\\s*FAZER|BACKLOG|PENDEN/.test(st) || st === "";
}

function flattenProjectTasks(project) {
  const epics = project?.epics || project?.epicsList || [];
  const tasksFromEpics = Array.isArray(epics)
    ? epics.flatMap((epic) => epic?.tasks || epic?.items || [])
    : [];
  const direct = project?.tasks || project?.items || project?.activities || [];
  const all = [...tasksFromEpics, ...direct];
  return all.filter(Boolean);
}

function pickExportLists(project) {
  const tasks = flattenProjectTasks(project);

  const done = tasks
    .filter(isDoneTask)
    .slice()
    .sort((a, b) => taskDateValueSafe(b) - taskDateValueSafe(a))
    .slice(0, 5);

  const inProgress = tasks
    .filter((task) => !isDoneTask(task) && isInProgressTask(task))
    .slice()
    .sort((a, b) => taskDateValueSafe(a) - taskDateValueSafe(b))
    .slice(0, 5);

  const nextSteps = tasks
    .filter((task) => !isDoneTask(task) && !isInProgressTask(task) && isPlannedTask(task))
    .slice()
    .sort((a, b) => taskDateValueSafe(a) - taskDateValueSafe(b))
    .slice(0, 5);

  return { done, inProgress, nextSteps };
}

function taskDueStr(task) {
  return (
    task?.dueDate ||
    task?.due ||
    task?.plannedEnd ||
    task?.endDate ||
    task?.end ||
    task?.deadline ||
    ""
  );
}

function taskDueValueSafe(task) {
  const dt = parseTaskDate(taskDueStr(task));
  return dt ? dt.getTime() : Number.POSITIVE_INFINITY;
}

function todayStartTs() {
  const now = new Date();
  const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return d.getTime();
}

function isOverdueTask(task) {
  if (isDoneTask(task)) return false;
  const due = taskDueValueSafe(task);
  if (!Number.isFinite(due) || due === Number.POSITIVE_INFINITY) return false;
  return due < todayStartTs();
}

function computeScheduleSummary(project) {
  const tasks = flattenProjectTasks(project);
  const total = tasks.length;
  const inProgress = tasks.filter((task) => !isDoneTask(task) && isInProgressTask(task)).length;
  const planned = tasks.filter((task) => !isDoneTask(task) && !isInProgressTask(task) && isPlannedTask(task)).length;
  const overdue = tasks.filter(isOverdueTask).length;
  const scheduleHealthStatus = overdue > 0 ? "em_atraso" : "em_dia";
  return { total, inProgress, planned, overdue, scheduleHealthStatus };
}

function renderTaskLi(task) {
  const dateRaw = taskDateStr(task);
  const dateLabel = dateRaw ? formatDateBR(dateRaw) : "";
  const owner = taskOwner(task);
  const right = [owner, dateLabel].filter(Boolean).join(" • ");
  return `
    <li class="op-task">
      <div class="op-task-title">${escapeHtml(taskTitle(task))}</div>
      ${right ? `<div class="op-task-meta">${escapeHtml(right)}</div>` : ""}
    </li>
  `;
}

function latestCompletedTasks(tasks = [], limit = 5) {
  return tasks
    .filter((task) => (task.status || "").toLowerCase() === "concluido")
    .slice()
    .sort((a, b) => {
      const aTs = dateMetricValue(a.due) ?? Number.NEGATIVE_INFINITY;
      const bTs = dateMetricValue(b.due) ?? Number.NEGATIVE_INFINITY;
      if (aTs !== bTs) return bTs - aTs;
      return (a.title || "").localeCompare(b.title || "");
    })
    .slice(0, limit);
}

function buildProjectReportStyles() {
  return `
    :root {
      --text: #1f252f;
      --muted: #7b8794;
      --border: #e4e8f0;
      --panel: #ffffff;
      --shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
      --success-bg: #e6f6ed;
      --success-text: #1e824c;
      --danger-bg: #ffe5e5;
      --danger-text: #c01b24;
      --info-bg: #e5f0ff;
      --info-text: #1b63c3;
      --muted-bg: #f1f2f6;
      --muted-text: #6b7280;
    }

    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: "Poppins", system-ui, -apple-system, sans-serif;
      color: var(--text);
      background: #f4f6fb;
    }

    .report-page {
      max-width: 1100px;
      margin: 24px auto;
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 18px;
      padding: 24px;
      box-shadow: var(--shadow);
    }

    .report-header {
      display: grid;
      grid-template-columns: 1.2fr 0.8fr;
      gap: 24px;
      align-items: start;
    }

    .report-title {
      font-size: 26px;
      font-weight: 800;
      margin: 0 0 6px;
    }

    .report-subtitle {
      color: var(--muted);
      font-weight: 600;
    }

    .report-meta {
      margin-top: 10px;
      color: var(--muted);
      font-size: 13px;
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .report-health {
      display: grid;
      gap: 10px;
      justify-items: end;
    }

    .health-box {
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 12px 14px;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .pill {
      display: inline-flex;
      align-items: center;
      padding: 6px 12px;
      border-radius: 999px;
      font-weight: 700;
      font-size: 12px;
      white-space: nowrap;
    }

    .pill.planejado { background: var(--muted-bg); color: var(--muted-text); }
    .pill.em-andamento { background: var(--info-bg); color: var(--info-text); }
    .pill.atrasado { background: var(--danger-bg); color: var(--danger-text); }
    .pill.concluido { background: var(--success-bg); color: var(--success-text); }
    .pill.em-dia { background: var(--success-bg); color: var(--success-text); }
    .pill.em-atraso { background: var(--danger-bg); color: var(--danger-text); }

    .report-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 18px;
      margin-top: 18px;
    }

    .report-card {
      border: 1px solid var(--border);
      border-radius: 16px;
      padding: 16px;
      background: #fff;
      box-shadow: var(--shadow);
    }

    .report-card h3 {
      margin: 0 0 10px;
      font-size: 16px;
    }

    .report-list {
      margin: 0;
      padding-left: 18px;
      color: var(--text);
      display: grid;
      gap: 8px;
    }

    .report-list li {
      color: var(--text);
      font-size: 14px;
    }

    .report-list span {
      color: var(--muted);
      font-size: 12px;
      margin-left: 6px;
    }

    .report-progress {
      display: grid;
      gap: 8px;
    }

    .progress-value {
      font-size: 32px;
      font-weight: 800;
    }

    .progress-meta {
      color: var(--muted);
      font-size: 13px;
    }

    .counts-grid {
      display: grid;
      grid-template-columns: repeat(4, minmax(140px, 1fr));
      gap: 12px;
      margin-top: 10px;
    }

    .count-card {
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 12px;
      background: #fff;
    }

    .count-card strong {
      display: block;
      font-size: 20px;
      margin-top: 6px;
    }

    .count-card.total { background: #f8fafc; }
    .count-card.em-andamento { background: var(--info-bg); color: var(--info-text); }
    .count-card.planejado { background: var(--muted-bg); color: var(--muted-text); }
    .count-card.atrasado { background: var(--danger-bg); color: var(--danger-text); }

    .op-grid-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-top: 18px;
    }

    .op-list {
      list-style: none;
      padding: 0;
      margin: 8px 0 0;
      display: grid;
      gap: 8px;
    }

    .op-task {
      padding: 8px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    }

    .op-task:last-child {
      border-bottom: none;
    }

    .op-task-title {
      font-weight: 600;
      font-size: 13px;
    }

    .op-task-meta {
      margin-top: 2px;
      font-size: 12px;
      color: var(--muted);
    }

    .op-kpis {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
      margin-top: 10px;
    }

    .op-kpi {
      padding: 12px;
      border-radius: 12px;
      border: 1px solid rgba(0, 0, 0, 0.08);
      background: #fff;
    }

    .op-kpi-label {
      font-size: 12px;
      color: var(--muted);
    }

    .op-kpi-value {
      font-size: 22px;
      font-weight: 700;
      margin-top: 4px;
    }

    .kpi-total { background: #f8fafc; }
    .kpi-progress { background: var(--info-bg); color: var(--info-text); }
    .kpi-planned { background: var(--muted-bg); color: var(--muted-text); }
    .kpi-overdue { background: var(--danger-bg); color: var(--danger-text); }

    @media print {
      body { background: #fff; }
      .report-page {
        margin: 0;
        box-shadow: none;
        border: none;
      }
    }
  `;
}

function buildProjectReportStylesScoped() {
  return buildProjectReportStyles()
    .replace(/:root/g, "#export-onepage-root")
    .replace(/\bbody\b/g, "#export-onepage-root");
}

function buildProjectReportSection({ project, client, metrics }) {
  const { done, inProgress, nextSteps } = pickExportLists(project);
  const schedule = computeScheduleSummary(project);
  const statusBadge = statusInfo(projectStatus(project, metrics));
  const scheduleBadge = scheduleStatusInfo(schedule.scheduleHealthStatus);
  const progress = metrics.progress ?? 0;
  const goLiveLabel = formatDateBR(project.end || project.goLive || project.goLiveDate || "");
  const startLabel = formatDateBR(project.start || "");
  const developer = project.developer || "A definir";
  const clientName = client?.name || "Cliente";

  const latestList = latest.length
    ? latest
        .map((task) => `<li>${task.title || "Atividade"} <span>${formatDateBR(task.due)}</span></li>`)
        .join("")
    : "<li>Nenhuma atividade concluida.</li>";

  return `
    <div class="report-page">
      <div class="report-header">
        <div>
          <div class="report-title">${project.name || "Projeto"}</div>
          <div class="report-subtitle">${clientName} • ${developer}</div>
          <div class="report-meta">
            <span>Inicio: ${startLabel || "-"}</span>
            <span>Go Live: ${goLiveLabel || "-"}</span>
          </div>
        </div>
        <div class="report-health">
          <div class="report-progress">
            <div class="progress-value">${progress}%</div>
            <div class="progress-meta">${statusBadge.label} • Go Live: ${goLiveLabel || "-"}</div>
          </div>
          <div class="health-box">
            <span>Status do projeto</span>
            <span class="pill ${statusBadge.className}">${statusBadge.label}</span>
          </div>
          <div class="health-box">
            <span>Prazo</span>
            <span class="pill ${scheduleBadge.className}">${scheduleBadge.label}</span>
          </div>
        </div>
      </div>

      <div class="report-grid">
        <div class="report-card">
          <h3>Destaques (ultimas 5 concluidas)</h3>
          <ul class="report-list">
            ${latestList}
          </ul>
        </div>
        <div class="report-card">
          <h3>Saude do projeto</h3>
          <div class="health-box">
            <span>Status</span>
            <span class="pill ${statusBadge.className}">${statusBadge.label}</span>
          </div>
          <div class="health-box" style="margin-top:10px;">
            <span>Prazo</span>
            <span class="pill ${scheduleBadge.className}">${scheduleBadge.label}</span>
          </div>
        </div>
      </div>

      <div class="report-card" style="margin-top:18px;">
        <h3>Resumo do Cronograma</h3>
        <div class="report-meta">Total de atividades: ${counts.total}</div>
        <div class="counts-grid">
          <div class="count-card em-andamento">
            Em andamento
            <strong>${counts.em_andamento}</strong>
          </div>
          <div class="count-card planejado">
            Planejado
            <strong>${counts.planejado}</strong>
          </div>
          <div class="count-card atrasado">
            Em atraso
            <strong>${counts.atrasado}</strong>
          </div>
          <div class="count-card total">
            Total
            <strong>${counts.total}</strong>
          </div>
        </div>
      </div>
    </div>
  `;
}

function buildProjectReportHtml({ project, client, metrics }) {
  return `<!DOCTYPE html>
  <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Resumo ${project.name || "Projeto"}</title>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap" rel="stylesheet">
      <style>${buildProjectReportStyles()}</style>
    </head>
    <body>
      ${buildProjectReportSection({ project, client, metrics })}
    </body>
  </html>`;
}

function renderOnePageExportHtml({ project, client, metrics }) {
  const { done, inProgress, nextSteps } = pickExportLists(project);
  const schedule = computeScheduleSummary(project);
  const statusBadge = statusInfo(projectStatus(project, metrics));
  const scheduleBadge = scheduleStatusInfo(schedule.scheduleHealthStatus);
  const progress = metrics?.progress ?? 0;
  const goLiveLabel = formatDateBR(project.end || project.goLive || project.goLiveDate || "");
  const startLabel = formatDateBR(project.start || "");
  const developer = project.developer || "A definir";
  const clientName = client?.name || "Cliente";

  const doneList = (done.length ? done : [{ title: "Sem atividades" }]).map(renderTaskLi).join("");
  const inProgressList = (inProgress.length ? inProgress : [{ title: "Sem atividades" }])
    .map(renderTaskLi)
    .join("");
  const nextStepsList = (nextSteps.length ? nextSteps : [{ title: "Sem atividades" }])
    .map(renderTaskLi)
    .join("");

  return `<style>${buildProjectReportStylesScoped()}</style>
    <div class="report-page">
      <div class="report-header">
        <div>
          <div class="report-title">${escapeHtml(project.name || "Projeto")}</div>
          <div class="report-subtitle">${escapeHtml(clientName)} • ${escapeHtml(developer)}</div>
          <div class="report-meta">
            <span>Inicio: ${escapeHtml(startLabel || "-")}</span>
            <span>Go Live: ${escapeHtml(goLiveLabel || "-")}</span>
          </div>
        </div>
        <div class="report-health">
          <div class="report-progress">
            <div class="progress-value">${progress}%</div>
            <div class="progress-meta">${statusBadge.label} • Go Live: ${escapeHtml(goLiveLabel || "-")}</div>
          </div>
          <div class="health-box">
            <span>Status do projeto</span>
            <span class="pill ${statusBadge.className}">${statusBadge.label}</span>
          </div>
          <div class="health-box">
            <span>Prazo</span>
            <span class="pill ${scheduleBadge.className}">${scheduleBadge.label}</span>
          </div>
        </div>
      </div>

      <div class="report-grid">
        <div class="report-card">
          <h3>Saude</h3>
          <div class="health-box">
            <span>Status do projeto</span>
            <span class="pill ${statusBadge.className}">${statusBadge.label}</span>
          </div>
          <div class="health-box" style="margin-top:10px;">
            <span>Prazo</span>
            <span class="pill ${scheduleBadge.className}">${scheduleBadge.label}</span>
          </div>
        </div>
        <div class="report-card">
          <h3>Resumo do Cronograma</h3>
          <div class="op-kpis">
            <div class="op-kpi kpi-total">
              <div class="op-kpi-label">Total</div>
              <div class="op-kpi-value">${schedule.total}</div>
            </div>
            <div class="op-kpi kpi-progress">
              <div class="op-kpi-label">Em andamento</div>
              <div class="op-kpi-value">${schedule.inProgress}</div>
            </div>
            <div class="op-kpi kpi-planned">
              <div class="op-kpi-label">Planejado</div>
              <div class="op-kpi-value">${schedule.planned}</div>
            </div>
            <div class="op-kpi kpi-overdue">
              <div class="op-kpi-label">Em atraso</div>
              <div class="op-kpi-value">${schedule.overdue}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="op-grid-3">
        <section class="report-card">
          <h3>Ultimas Concluidas</h3>
          <ul class="op-list">${doneList}</ul>
        </section>

        <section class="report-card">
          <h3>Em Andamento</h3>
          <ul class="op-list">${inProgressList}</ul>
        </section>

        <section class="report-card">
          <h3>Proximos Passos</h3>
          <ul class="op-list">${nextStepsList}</ul>
        </section>
      </div>
    </div>`;
}

function safeFileName(value, fallback = "projeto") {
  const raw = String(value || "").toLowerCase();
  const cleaned = raw.replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  return cleaned || fallback;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForImages(rootEl) {
  const imgs = Array.from(rootEl.querySelectorAll("img"));
  await Promise.all(
    imgs.map((img) => {
      if (img.complete) return Promise.resolve();
      return new Promise((resolve) => {
        img.onload = () => resolve();
        img.onerror = () => resolve();
      });
    })
  );
}

function getJsPDF() {
  if (window.jspdf?.jsPDF) return window.jspdf.jsPDF;
  return window.jsPDF;
}

async function exportProjectReportPdf() {
  const project = state.selectedProject;
  const client = state.selectedClient;
  if (!project || !client) {
    alert("Nenhum projeto selecionado.");
    return;
  }
  const metrics = projectMetrics(project.tasks || []);
  const filename = `${safeFileName(project.name, "projeto")}-onepage.pdf`;

  if (!window.html2canvas) {
    alert("html2canvas nao carregou.");
    return;
  }
  const JsPDF = getJsPDF();
  if (!JsPDF) {
    alert("jsPDF nao carregou.");
    return;
  }

  const priorRoot = document.getElementById("export-onepage-root");
  if (priorRoot) priorRoot.remove();

  const root = document.createElement("div");
  root.id = "export-onepage-root";
  root.innerHTML = renderOnePageExportHtml({ project, client, metrics });
  document.body.appendChild(root);

  try {
    if (document.fonts?.ready) await document.fonts.ready;
    await sleep(50);
    await waitForImages(root);
    await sleep(50);

    const canvas = await window.html2canvas(root, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
      allowTaint: true,
      scrollX: 0,
      scrollY: 0,
      onclone: (clonedDoc) => {
        const clonedRoot = clonedDoc.getElementById("export-onepage-root");
        if (clonedRoot) {
          clonedRoot.style.opacity = "1";
          clonedRoot.style.visibility = "visible";
          clonedRoot.style.display = "block";
        }
      }
    });

    const imgData = canvas.toDataURL("image/jpeg", 0.92);
    const pdf = new JsPDF({ orientation: "p", unit: "pt", format: "a4" });
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const imgW = pageW;
    const imgH = (canvas.height * imgW) / canvas.width;

    let y = 0;
    pdf.addImage(imgData, "JPEG", 0, y, imgW, imgH, undefined, "FAST");
    let remaining = imgH - pageH;

    while (remaining > 0) {
      pdf.addPage();
      y -= pageH;
      pdf.addImage(imgData, "JPEG", 0, y, imgW, imgH, undefined, "FAST");
      remaining -= pageH;
    }

    pdf.save(filename);
  } catch (err) {
    console.error(err);
    alert(`Falha ao exportar PDF: ${err.message || err}`);
  } finally {
    root.remove();
  }
}

function exportProjectReportPptx() {
  const project = state.selectedProject;
  const client = state.selectedClient;
  if (!project || !client) {
    alert("Nenhum projeto selecionado.");
    return;
  }
  if (!window.PptxGenJS) {
    alert("Biblioteca de exportacao PPTX nao carregada.");
    return;
  }

  const metrics = projectMetrics(project.tasks || []);
  const tasks = Array.isArray(project.tasks) ? project.tasks : [];
  const latest = latestCompletedTasks(tasks, 5);
  const counts = projectTaskCounts(tasks);
  const statusBadge = statusInfo(projectStatus(project, metrics));
  const scheduleBadge = scheduleStatusInfo(projectScheduleStatus(project));
  const progress = metrics.progress ?? 0;
  const goLiveLabel = formatDateBR(project.end || project.goLive || project.goLiveDate || "");
  const startLabel = formatDateBR(project.start || "");
  const developer = project.developer || "A definir";
  const clientName = client?.name || "Cliente";

  const pptx = new window.PptxGenJS();
  pptx.layout = "LAYOUT_WIDE";
  const slide = pptx.addSlide();

  slide.addText(project.name || "Projeto", {
    x: 0.5,
    y: 0.4,
    w: 12.5,
    h: 0.6,
    fontSize: 28,
    bold: true,
    color: "1F252F"
  });
  slide.addText(`${clientName} • ${developer}`, {
    x: 0.5,
    y: 1.0,
    w: 7,
    h: 0.3,
    fontSize: 14,
    color: "7B8794"
  });
  slide.addText(`Inicio: ${startLabel || "-"} | Go Live: ${goLiveLabel || "-"}`, {
    x: 0.5,
    y: 1.35,
    w: 7,
    h: 0.3,
    fontSize: 12,
    color: "7B8794"
  });

  slide.addText(`Progresso ${progress}%`, {
    x: 9.2,
    y: 0.4,
    w: 3.5,
    h: 0.4,
    fontSize: 18,
    bold: true,
    color: "1F252F"
  });
  slide.addText(`${statusBadge.label} • Go Live ${goLiveLabel || "-"}`, {
    x: 9.2,
    y: 0.85,
    w: 3.5,
    h: 0.3,
    fontSize: 11,
    color: "7B8794"
  });

  const statusColorMap = {
    planejado: { fill: "F1F2F6", text: "6B7280" },
    "em-andamento": { fill: "E5F0FF", text: "1B63C3" },
    atrasado: { fill: "FFE5E5", text: "C01B24" },
    concluido: { fill: "E6F6ED", text: "1E824C" }
  };
  const scheduleColorMap = {
    "em-dia": { fill: "E6F6ED", text: "1E824C" },
    "em-atraso": { fill: "FFE5E5", text: "C01B24" }
  };
  const statusColors = statusColorMap[statusBadge.className] || statusColorMap.planejado;
  const scheduleColors = scheduleColorMap[scheduleBadge.className] || scheduleColorMap["em-dia"];

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 9.2,
    y: 1.3,
    w: 3.4,
    h: 0.45,
    fill: { color: statusColors.fill },
    line: { color: statusColors.fill },
    radius: 0.1
  });
  slide.addText(`Status: ${statusBadge.label}`, {
    x: 9.3,
    y: 1.38,
    w: 3.2,
    h: 0.3,
    fontSize: 11,
    color: statusColors.text,
    bold: true
  });

  slide.addShape(pptx.ShapeType.roundRect, {
    x: 9.2,
    y: 1.85,
    w: 3.4,
    h: 0.45,
    fill: { color: scheduleColors.fill },
    line: { color: scheduleColors.fill },
    radius: 0.1
  });
  slide.addText(`Prazo: ${scheduleBadge.label}`, {
    x: 9.3,
    y: 1.93,
    w: 3.2,
    h: 0.3,
    fontSize: 11,
    color: scheduleColors.text,
    bold: true
  });

  slide.addText("Ultimas concluidas", {
    x: 0.5,
    y: 2.0,
    w: 3.8,
    h: 0.3,
    fontSize: 12,
    bold: true,
    color: "1F252F"
  });
  const doneText = done.length
    ? done.map((task) => `• ${task.title || "Atividade"} (${formatDateBR(taskDateStr(task))})`).join("\n")
    : "Sem atividades.";
  slide.addText(doneText, {
    x: 0.5,
    y: 2.35,
    w: 3.8,
    h: 2.8,
    fontSize: 11,
    color: "1F252F"
  });

  slide.addText("Em andamento", {
    x: 4.75,
    y: 2.0,
    w: 3.8,
    h: 0.3,
    fontSize: 12,
    bold: true,
    color: "1F252F"
  });
  const progressText = inProgress.length
    ? inProgress.map((task) => `• ${task.title || "Atividade"} (${formatDateBR(taskDateStr(task))})`).join("\n")
    : "Sem atividades.";
  slide.addText(progressText, {
    x: 4.75,
    y: 2.35,
    w: 3.8,
    h: 2.8,
    fontSize: 11,
    color: "1F252F"
  });

  slide.addText("Proximos passos", {
    x: 9.0,
    y: 2.0,
    w: 3.8,
    h: 0.3,
    fontSize: 12,
    bold: true,
    color: "1F252F"
  });
  const nextText = nextSteps.length
    ? nextSteps.map((task) => `• ${task.title || "Atividade"} (${formatDateBR(taskDateStr(task))})`).join("\n")
    : "Sem atividades.";
  slide.addText(nextText, {
    x: 9.0,
    y: 2.35,
    w: 3.8,
    h: 2.8,
    fontSize: 11,
    color: "1F252F"
  });

  slide.addText("Resumo do Cronograma", {
    x: 0.5,
    y: 5.5,
    w: 6.0,
    h: 0.3,
    fontSize: 12,
    bold: true,
    color: "1F252F"
  });
  const summaryItems = [
    { label: "Total", value: schedule.total, fill: "F8FAFC", text: "1F252F" },
    { label: "Em andamento", value: schedule.inProgress, fill: "E5F0FF", text: "1B63C3" },
    { label: "Planejado", value: schedule.planned, fill: "F1F2F6", text: "6B7280" },
    { label: "Em atraso", value: schedule.overdue, fill: "FFE5E5", text: "C01B24" }
  ];
  summaryItems.forEach((item, idx) => {
    const x = 0.5 + idx * 3.1;
    const y = 5.85;
    slide.addShape(pptx.ShapeType.roundRect, {
      x,
      y,
      w: 2.9,
      h: 0.95,
      fill: { color: item.fill },
      line: { color: item.fill },
      radius: 0.08
    });
    slide.addText(item.label, {
      x: x + 0.15,
      y: y + 0.12,
      w: 2.6,
      h: 0.2,
      fontSize: 10,
      color: item.text
    });
    slide.addText(String(item.value), {
      x: x + 0.15,
      y: y + 0.45,
      w: 2.6,
      h: 0.3,
      fontSize: 18,
      bold: true,
      color: item.text
    });
  });

  pptx.writeFile({ fileName: `projeto-${safeFileName(project.name)}.pptx` });
}

function exportProjectReport(format = "pdf") {
  if (format === "pptx") {
    exportProjectReportPptx();
    return;
  }
  exportProjectReportPdf();
}

function clampPct(n) {
  if (Number.isNaN(n) || n == null) return 0;
  return Math.max(0, Math.min(100, Math.round(n)));
}

function getAllProjects(clients) {
  const all = [];
  (clients || []).forEach((c) => (c.projects || []).forEach((p) => all.push({ client: c, project: p })));
  return all;
}

function getProjectStatus(project) {
  const progress = clampPct(project.progress || 0);
  if (progress >= 100) return "Concluido";

  const end = project.end || project.goLive || project.goLiveDate || null;
  const endDt = parseTaskDate(end);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();

  if (endDt && endDt.getTime() < today) {
    return "Atrasado";
  }
  if (progress > 0) return "Em andamento";
  return "Planejado";
}

function getAllTasksFromProject(project) {
  return Array.isArray(project.tasks) ? project.tasks : [];
}

function countTasksNextDays(clients, days = 7) {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const end = start + days * 24 * 60 * 60 * 1000;

  let count = 0;
  const all = getAllProjects(clients);

  for (const { project } of all) {
    const tasks = getAllTasksFromProject(project);

    for (const t of tasks) {
      if ((t.status || "").toLowerCase() === "concluido") continue;

      const dt = parseTaskDate(t.due);
      if (!dt) continue;
      const ts = dt.getTime();

      if (ts >= start && ts <= end) count++;
    }
  }

  return count;
}

function computeHomeMacroStats(clients) {
  const allProjects = getAllProjects(clients);
  const activeClients = (clients || []).filter((c) => (c.projects || []).length > 0).length;
  const projectsActive = allProjects.filter(({ project }) => clampPct(project.progress || 0) < 100).length;
  const tasksNext7 = countTasksNextDays(clients, 7);

  const avgProgress =
    allProjects.length === 0
      ? 0
      : Math.round(
          allProjects.reduce((acc, { project }) => acc + clampPct(project.progress || 0), 0) / allProjects.length
        );

  const clientsCards = (clients || [])
    .filter((c) => (c.projects || []).length > 0)
    .map((c) => {
      const projs = c.projects || [];
      const avg = projs.length
        ? Math.round(projs.reduce((a, p) => a + clampPct(p.progress || 0), 0) / projs.length)
        : 0;

      const counters = { Planejado: 0, "Em andamento": 0, Atrasado: 0, Concluido: 0 };
      projs.forEach((p) => {
        const st = getProjectStatus(p);
        counters[st] = (counters[st] || 0) + 1;
      });

      return {
        name: c.name || c.id || "Cliente",
        projectsCount: projs.length,
        avgProgress: avg,
        counters
      };
    });

  return { activeClients, projectsActive, tasksNext7, avgProgress, clientsCards };
}

function renderHomeMacroSummary() {
  const { activeClients, projectsActive, tasksNext7, avgProgress, clientsCards } = computeHomeMacroStats(state.clients);

  const cardsHtml = clientsCards
    .map((card) => {
      return `
        <div class="home-client-card">
          <div class="home-client-title">${card.name}</div>

          <div class="home-client-top">
            <div class="mini-box">
              <div class="mini-label">Projetos:</div>
              <div class="mini-value">${card.projectsCount}</div>
            </div>
            <div class="mini-box">
              <div class="mini-label">Progresso medio:</div>
              <div class="mini-value">${card.avgProgress}%</div>
            </div>
          </div>

          <div class="chips">
            <div class="chip planned">Planejado: ${card.counters.Planejado || 0}</div>
            <div class="chip progress">Em andamento: ${card.counters["Em andamento"] || 0}</div>
            <div class="chip late">Atrasado: ${card.counters.Atrasado || 0}</div>
            <div class="chip done">Concluido: ${card.counters.Concluido || 0}</div>
          </div>
        </div>
      `;
    })
    .join("");

  return `
    <div class="home-macro">
      <div class="home-macro-grid">
        <div class="home-stat-card">
          <div class="home-stat-label">Clientes ativos</div>
          <div class="home-stat-value">${activeClients}</div>
        </div>

        <div class="home-stat-card">
          <div class="home-stat-label">Projetos ativos</div>
          <div class="home-stat-value">${projectsActive}</div>
        </div>

        <div class="home-stat-card">
          <div class="home-stat-label">Atividades prox. 7 dias</div>
          <div class="home-stat-value">${tasksNext7}</div>
        </div>

        <div class="home-stat-card">
          <div class="home-stat-label">Progresso medio</div>
          <div class="home-stat-value">${avgProgress}%</div>
        </div>
      </div>

      <div class="home-client-grid">
        ${cardsHtml}
      </div>
    </div>
  `;
}

function normalizePackageLabel(label) {
  if (!label) return "";
  return label.trim().replace(/\s+/g, " ");
}

function parsePackageTitle(title) {
  if (!title) return "";
  const match = title.trim().match(/^PACOTE\s*\d+/i);
  if (!match) return "";
  return normalizePackageLabel(match[0].toUpperCase());
}

function extractPackageLabel(task) {
  if (!task) return "";
  if (task.package) return normalizePackageLabel(String(task.package));
  return parsePackageTitle(task.title || "");
}

function formatTaskTitle(title, subTitle) {
  if (!title || !subTitle) return title || "";
  const normalizedTitle = title.trim();
  const normalizedSub = subTitle.trim();
  const safeSub = normalizedSub.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`^${safeSub}\\s*[-:–—]?\\s*`, "i");
  return normalizedTitle.replace(regex, "").trim() || normalizedTitle;
}

function pickMotivationalQuote() {
  return MOTIVATIONAL_QUOTES[Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)];
}

function loadHomeContext() {
  const nowLabel = formatDateTime(new Date());
  try {
    const lastAccess = localStorage.getItem("lastAccess");
    state.home.lastAccess = lastAccess || nowLabel;
    localStorage.setItem("lastAccess", nowLabel);
  } catch (err) {
    state.home.lastAccess = nowLabel;
  }
  state.home.quote = pickMotivationalQuote();
}

function loadLocalState() {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return false;
    const data = JSON.parse(raw);
    if (!data || !Array.isArray(data.clients)) return false;
    state.clients = data.clients;
    state.employees = Array.isArray(data.employees) ? data.employees : [];
    return true;
  } catch (err) {
    console.warn("Nao foi possivel carregar dados locais.", err);
    return false;
  }
}

function saveLocalState() {
  try {
    const payload = {
      clients: state.clients,
      employees: state.employees
    };
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.warn("Nao foi possivel salvar dados locais.", err);
  }
}

function ensureFirebaseApp() {
  if (!firebase.apps?.length) {
    firebase.initializeApp(firebaseConfig);
  }
}

async function initFirebase() {
  if (!firebaseConfig.apiKey || firebaseConfig.apiKey === "YOUR_API_KEY") {
    console.warn("Firebase nao configurado. Usando dados locais.");
    return false;
  }
  try {
    ensureFirebaseApp();
    db = firebase.database();
    return true;
  } catch (err) {
    console.error("Falha ao inicializar Firebase.", err);
    db = null;
    return false;
  }
}

async function loadStateFromDb(keepSelection = null) {
  if (!db) return;
  const snapshot = await db.ref("clients").once("value");
  const clientsData = snapshot.val() || {};
  const clients = Object.entries(clientsData).map(([clientId, clientData]) => {
    const projectsData = clientData.projects || {};
    const projects = Object.entries(projectsData).map(([projectId, projData]) => {
      const tasksData = projData.tasks || {};
      const tasks = Object.entries(tasksData).map(([taskId, taskData]) => ({
        id: taskId,
        ...taskData
      }));
      const progress = computeProgress(tasks);
      const epics = Array.isArray(projData.epics) ? projData.epics : DEFAULT_EPICS.slice();
      const packages = Array.isArray(projData.packages) ? projData.packages : [];
      return {
        id: projectId,
        clientId,
        ...projData,
        progress,
        epics,
        packages,
        tasks
      };
    });
    return { id: clientId, ...clientData, projects };
  });

  state.clients = clients;
  if (keepSelection && (keepSelection.clientId || keepSelection.projectId || keepSelection.clientName || keepSelection.projectName)) {
    const normalize = (value) => (value || "").trim().toLowerCase();
    const selectedClientById = keepSelection.clientId
      ? clients.find((client) => client.id === keepSelection.clientId)
      : null;
    const selectedClientByName = !selectedClientById && keepSelection.clientName
      ? clients.find((client) => normalize(client.name) === normalize(keepSelection.clientName))
      : null;
    state.selectedClient = selectedClientById || selectedClientByName || clients[0] || null;
    if (state.selectedClient) {
      const selectedProjectById = keepSelection.projectId
        ? state.selectedClient.projects?.find((project) => project.id === keepSelection.projectId)
        : null;
      const selectedProjectByName = !selectedProjectById && keepSelection.projectName
        ? state.selectedClient.projects?.find((project) => normalize(project.name) === normalize(keepSelection.projectName))
        : null;
      state.selectedProject = selectedProjectById || selectedProjectByName || state.selectedClient.projects?.[0] || null;
    } else {
      state.selectedProject = null;
    }
  } else {
    state.selectedClient = clients[0] || null;
    state.selectedProject = clients[0]?.projects?.[0] || null;
  }
  renderClientList();
  renderMain();
  hydrateClientSelect();
}

async function initApp() {
  loadHomeContext();
  const firebaseReady = db ? true : await initFirebase();
  if (firebaseReady) {
    try {
      await loadStateFromDb();
      if (!state.clients.length && loadLocalState()) {
        state.selectedClient = state.clients[0] || null;
        state.selectedProject = state.clients[0]?.projects?.[0] || null;
        renderClientList();
        renderMain();
        hydrateClientSelect();
      }
      saveLocalState();
    } catch (err) {
      console.error(err);
      const hasLocal = loadLocalState();
      if (hasLocal) {
        state.selectedClient = state.clients[0] || null;
        state.selectedProject = state.clients[0]?.projects?.[0] || null;
        renderClientList();
        renderMain();
        hydrateClientSelect();
      }
    }
  } else {
    const hasLocal = loadLocalState();
    if (state.clients.length === 0 && !hasLocal) {
      state.clients = [];
    }
    state.selectedClient = state.clients[0] || null;
    state.selectedProject = state.clients[0]?.projects?.[0] || null;
    renderClientList();
    renderMain();
    hydrateClientSelect();
  }
  wireNav();
  wireModals();
  setupStatusPopover();
  setupTaskActions();
  setupDashboardFilters();
}

function renderClientList() {
  const list = byId("client-list");
  list.innerHTML = "";

  state.clients.forEach((client) => {
    const wrapper = document.createElement("div");
    wrapper.className = "sub-item";
    const isOpen =
      state.clientVisibility[client.name] !== undefined
        ? state.clientVisibility[client.name]
        : client === state.selectedClient;
    if (isOpen) wrapper.classList.add("open");

    const header = document.createElement("div");
    header.className = "sub-header";
    const title = document.createElement("span");
    title.className = "client-title";
    title.textContent = client.name;
    const actions = document.createElement("div");
    actions.className = "client-actions";
    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "client-edit-btn";
    editBtn.textContent = "Editar";
    editBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      handleRenameClient(client);
    });
    const caret = document.createElement("span");
    caret.className = "caret";
    caret.textContent = "›";
    actions.appendChild(editBtn);
    actions.appendChild(caret);
    header.appendChild(title);
    header.appendChild(actions);
    header.addEventListener("click", () => {
      const nextOpen = !wrapper.classList.contains("open");
      wrapper.classList.toggle("open", nextOpen);
      state.clientVisibility[client.name] = nextOpen;
    });

    const projects = document.createElement("div");
    projects.className = "projects-list";
    client.projects.forEach((proj) => {
      const btn = document.createElement("button");
      btn.className = "project-chip";
      btn.textContent = proj.name;
      btn.addEventListener("click", () => {
        openProject(client, proj);
      });
      projects.appendChild(btn);
    });

    wrapper.appendChild(header);
    wrapper.appendChild(projects);
    list.appendChild(wrapper);
  });

  highlightActiveProject(state.selectedProject?.name);
}

function highlightActiveProject(name) {
  document.querySelectorAll(".project-chip").forEach((chip) => {
    chip.classList.toggle("active", chip.textContent === name);
  });
}

function setActiveNav(section) {
  document.querySelectorAll(".nav-link").forEach((el) => el.classList.remove("active"));
  const active = document.querySelector(`.nav-link[data-section="${section}"]`);
  if (active) active.classList.add("active");
  if (section === "meus-projetos") {
    ensureProjectsNavOpen();
  }
}

function ensureProjectsNavOpen() {
  const link = document.querySelector('.nav-link[data-section="meus-projetos"]');
  if (link) link.classList.add("open");
}

function openProject(client, project) {
  state.selectedClient = client;
  state.selectedProject = project;
  state.clientVisibility[client.name] = true;
  state.currentSection = "meus-projetos";
  highlightActiveProject(project.name);
  setActiveNav("meus-projetos");
  renderMain();
}

function updateTopActions() {
  const openProjectBtn = byId("open-project-modal");
  const editProjectBtn = byId("edit-project-btn");
  const openEmployeeBtn = byId("open-employee-modal");
  const isHome = state.currentSection === "inicio";
  const isProject = state.currentSection === "meus-projetos";
  if (openProjectBtn) openProjectBtn.classList.toggle("hidden", isHome);
  if (openEmployeeBtn) openEmployeeBtn.classList.toggle("hidden", isHome);
  if (editProjectBtn) editProjectBtn.classList.toggle("hidden", !isProject);
}

function renderHome(container) {
  byId("crumb-path").textContent = "Inicio";
  container.innerHTML = renderHomeMacroSummary();
}

function renderMain() {
  const { selectedClient, selectedProject } = state;
  const panels = byId("dashboard-panels");
  panels.innerHTML = "";
  setActiveNav(state.currentSection);
  updateTopActions();

  if (state.currentSection === "inicio") {
    renderHome(panels);
    return;
  }

  if (state.currentSection === "dashboard") {
    renderDashboard(panels);
    return;
  }

  if (!selectedClient || !selectedProject) return;

  byId("crumb-path").textContent = `${selectedClient.name} / ${selectedProject.name}`;

  const metrics = projectMetrics(selectedProject.tasks || []);
  const status = projectStatus(selectedProject, metrics);
  const statusBadge = statusInfo(status);
  const scheduleBadge = scheduleStatusInfo(projectScheduleStatus(selectedProject));

  const headerCard = document.createElement("div");
  headerCard.className = "card project-header span-all";
  headerCard.innerHTML = `
    <div class="project-header-top">
      <div>
        <h2>${selectedProject.name}</h2>
        <div class="project-subtitle">${selectedClient.name}</div>
      </div>
      <div class="project-header-badges">
        <span class="pill project-status ${statusBadge.className}">${statusBadge.label}</span>
        <span class="pill schedule-status ${scheduleBadge.className}">${scheduleBadge.label}</span>
        <button class="btn sm ghost" type="button" data-export-project>Exportar</button>
      </div>
    </div>
    <div class="project-meta-grid">
      <div class="meta-item">
        <div class="label">Cliente</div>
        <div class="value">${selectedClient.name}</div>
      </div>
      <div class="meta-item">
        <div class="label">Responsavel</div>
        <div class="value">${selectedProject.developer || "A definir"}</div>
      </div>
      <div class="meta-item">
        <div class="label">Data inicio</div>
        <div class="value">${formatDateBR(selectedProject.start) || "-"}</div>
      </div>
      <div class="meta-item">
        <div class="label">Go Live previsto</div>
        <div class="value">${formatDateBR(selectedProject.end) || "-"}</div>
      </div>
    </div>
    <div>
      <div class="label">Progresso (%)</div>
      <div class="progress"><div class="progress-bar" style="width: ${metrics.progress}%"></div></div>
      <div class="value" style="margin-top:6px;">${metrics.progress}% concluido</div>
    </div>
  `;

  const metricsGrid = document.createElement("div");
  metricsGrid.className = "metrics-grid span-all";
  metricsGrid.innerHTML = `
    <div class="metric-card">
      <div class="label">Total de atividades</div>
      <div class="value">${metrics.total}</div>
    </div>
    <div class="metric-card">
      <div class="label">Atividades concluidas</div>
      <div class="value">${metrics.done}</div>
    </div>
    <div class="metric-card">
      <div class="label">Atividades pendentes</div>
      <div class="value">${metrics.pending}</div>
    </div>
    <div class="metric-card">
      <div class="label">% Progresso</div>
      <div class="value">${metrics.progress}%</div>
    </div>
  `;

  const tasks = selectedProject.tasks || [];
  const requiredPhases = Array.isArray(selectedProject.epics) && selectedProject.epics.length
    ? selectedProject.epics
    : DEFAULT_EPICS;
  const tasksCard = document.createElement("div");
  tasksCard.className = "card scroll-card span-all";
  tasksCard.innerHTML = `
    <div class="card-head">
      <h3>Atividades</h3>
      <button class="btn sm ghost" data-open-activity>+ Nova Atividade</button>
    </div>`;
  const tasksBox = document.createElement("div");
  tasksBox.className = "tasks";

  const grouped = groupTasksByPhase(tasks, requiredPhases);
  if (!grouped.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "Nenhuma atividade cadastrada.";
    tasksBox.appendChild(empty);
  } else {
    grouped.forEach(({ phase, tasks, subEpics, isEmpty }) => {
      const isCollapsed = !!state.collapsedPhases[phase];
      const totalCount = tasks.length + subEpics.reduce((sum, sub) => sum + sub.tasks.length, 0);
      const header = document.createElement("div");
      header.className = "phase-head";
      header.dataset.phaseToggle = phase;
      header.innerHTML = `
        <div class="phase-title">
          <span class="caret ${isCollapsed ? "collapsed" : ""}">›</span>
          <span>${phase}</span>
        </div>
        <span class="phase-count">${totalCount} itens</span>
      `;
      tasksBox.appendChild(header);

      const body = document.createElement("div");
      body.className = `phase-body ${isCollapsed ? "collapsed" : ""}`;
      if (isEmpty) {
        const empty = document.createElement("div");
        empty.className = "empty";
        empty.textContent = "Nenhuma atividade neste epico.";
        body.appendChild(empty);
      }
      if (subEpics.length) {
        subEpics.forEach((sub) => {
          const subKey = `${phase}::${sub.title}`;
          const subCollapsed = !!state.collapsedPhases[subKey];
          const subHeader = document.createElement("div");
          subHeader.className = "sub-epic-head";
          subHeader.dataset.subEpicToggle = subKey;
          subHeader.innerHTML = `
            <div class="sub-epic-title">
              <span class="caret ${subCollapsed ? "collapsed" : ""}">›</span>
              <span>${sub.title}</span>
            </div>
            <span class="phase-count">${sub.tasks.length} itens</span>
          `;
          body.appendChild(subHeader);

          const subBody = document.createElement("div");
          subBody.className = `sub-epic-body ${subCollapsed ? "collapsed" : ""}`;
          sub.tasks.forEach((task) => {
            const row = document.createElement("div");
            row.className = "task-row";
            const info = statusInfo(task.status);
            const title = formatTaskTitle(task.title, sub.title);
            row.innerHTML = `
              <div>${title}</div>
              <div style="color: var(--muted); font-weight:500;">${formatDateBR(task.due)}</div>
              <button class="pill ${info.className} status-btn" data-task-index="${task._idx}">
                ${info.label}
              </button>
              <button class="btn sm ghost task-action-btn" data-task-action data-task-index="${task._idx}">
                ...
              </button>
            `;
            subBody.appendChild(row);
          });
          body.appendChild(subBody);
        });
      }

      tasks.forEach((task) => {
        const row = document.createElement("div");
        row.className = "task-row";
        const info = statusInfo(task.status);
        row.innerHTML = `
          <div>${task.title}</div>
          <div style="color: var(--muted); font-weight:500;">${formatDateBR(task.due)}</div>
          <button class="pill ${info.className} status-btn" data-task-index="${task._idx}">
            ${info.label}
          </button>
          <button class="btn sm ghost task-action-btn" data-task-action data-task-index="${task._idx}">
            ...
          </button>
        `;
        body.appendChild(row);
      });
      tasksBox.appendChild(body);
    });
  }
  tasksCard.appendChild(tasksBox);

  panels.appendChild(headerCard);
  panels.appendChild(metricsGrid);
  panels.appendChild(tasksCard);
}

function wireNav() {
  document.querySelectorAll(".nav-link").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.section === "sair") {
        logout();
        return;
      }
      if (btn.dataset.section === "meus-projetos") {
        btn.classList.toggle("open");
        return;
      }
      state.currentSection = btn.dataset.section || "inicio";
      setActiveNav(state.currentSection);
      renderMain();
    });
  });
}

function wireModals() {
  const projectModal = byId("project-modal");
  const employeeModal = byId("employee-modal");
  const activityModal = byId("activity-modal");
  const deleteProjectBtn = byId("delete-project-btn");

  const openProjectBtn = byId("open-project-modal");
  const editProjectBtn = byId("edit-project-btn");
  const openEmployeeBtn = byId("open-employee-modal");

  if (openProjectBtn) {
    openProjectBtn.addEventListener("click", () => openProjectModal("new"));
  }
  if (editProjectBtn) {
    editProjectBtn.addEventListener("click", () => openProjectModal("edit"));
  }
  if (openEmployeeBtn && employeeModal) {
    openEmployeeBtn.addEventListener("click", () => showModal(employeeModal));
  }
  document.body.addEventListener("click", (e) => {
    if (e.target.closest("[data-open-activity]")) {
      openActivityModal("new");
      return;
    }
    const exportBtn = e.target.closest("[data-export-project]");
    if (exportBtn) {
      openExportPopover(exportBtn);
      return;
    }
    const exportOpt = e.target.closest("[data-export-format]");
    if (exportOpt) {
      hideExportPopover();
      exportProjectReport(exportOpt.dataset.exportFormat);
      return;
    }
    if (!e.target.closest("#export-popover")) {
      hideExportPopover();
    }
  });

  document.querySelectorAll("[data-close-modal]").forEach((el) => {
    el.addEventListener("click", () => {
      if (projectModal) hideModal(projectModal);
      if (employeeModal) hideModal(employeeModal);
      if (activityModal) hideModal(activityModal);
      resetProjectModal();
      resetActivityModal();
    });
  });

  if (deleteProjectBtn) {
    deleteProjectBtn.addEventListener("click", () => handleDeleteProject());
  }

  const projectForm = byId("project-form");
  if (projectForm) {
    projectForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(projectForm);
      let clientName = data.get("client");
      if (clientName === "__new__") {
        const name = promptNewClientName();
        if (!name) return;
        const existing = findClientByName(name);
        const client = existing || addClientToState(name);
        if (db) {
          ensureClientDoc(client.name).catch((err) => console.error(err));
        }
        hydrateClientSelect(client.name);
        clientName = client.name;
      }
      const payload = {
        name: data.get("name"),
        developer: data.get("developer"),
        start: data.get("start"),
        end: data.get("end"),
        client: clientName
      };

      if (state.editingProjectId) {
        if (db && state.selectedProject?.id && state.selectedProject?.clientId) {
          updateProjectOnDb(state.selectedProject.clientId, state.selectedProject.id, payload)
            .then(async () => {
              await loadStateFromDb();
              resetProjectModal();
              if (projectModal) hideModal(projectModal);
            })
            .catch((err) => {
              console.error(err);
              alert("Erro ao atualizar projeto no Firebase.");
            });
        } else {
          updateProjectInState(payload);
          saveLocalState();
          renderClientList();
          renderMain();
          resetProjectModal();
          if (projectModal) hideModal(projectModal);
        }
        return;
      }

      if (db) {
        saveProjectToDb(payload)
          .then(async () => {
            await loadStateFromDb();
            resetProjectModal();
            if (projectModal) hideModal(projectModal);
          })
          .catch((err) => {
            console.error(err);
            alert("Erro ao salvar projeto no Firebase.");
          });
      } else {
        const client = state.clients.find((c) => c.name === clientName);
        if (!client) {
          alert("Cliente nao encontrado.");
          return;
        }
        const newProject = { ...payload, tasks: [], epics: DEFAULT_EPICS.slice(), packages: [] };
        client.projects.push(newProject);
        state.selectedClient = client;
        state.selectedProject = newProject;
        saveLocalState();
        renderClientList();
        renderMain();
        resetProjectModal();
        if (projectModal) hideModal(projectModal);
      }
    });
  } else {
    console.warn("Formulario de projeto nao encontrado.");
  }

  const employeeForm = byId("employee-form");
  if (employeeForm) {
    employeeForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(employeeForm);
      const employee = {
        name: data.get("name"),
        role: data.get("role"),
        email: data.get("email")
      };
      state.employees.push(employee);
      saveLocalState();
      employeeForm.reset();
      if (employeeModal) hideModal(employeeModal);
      alert("Funcionario cadastrado!");
    });
  }

  const activityForm = byId("activity-form");
  if (activityForm) {
    activityForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const keepClientId = state.selectedClient?.id;
      const keepProjectId = state.selectedProject?.id;
      const keepClientName = state.selectedClient?.name;
      const keepProjectName = state.selectedProject?.name;
      const { selectedProject } = state;
      if (!selectedProject) {
        alert("Nenhum projeto selecionado.");
        return;
      }
      const data = new FormData(activityForm);
      const task = {
        title: data.get("title"),
        phase: data.get("phase"),
        package: data.get("package") || "",
        due: data.get("due"),
        status: data.get("status")
      };
      if (state.editingTaskIndex !== null && state.editingTaskIndex !== undefined) {
        const idx = Number(state.editingTaskIndex);
        const currentTask = selectedProject.tasks?.[idx];
        if (!currentTask) return;
        const payload = { ...currentTask, ...task };
        if (db && selectedProject.id && selectedProject.clientId && currentTask.id) {
          updateTaskOnDb(selectedProject.clientId, selectedProject.id, currentTask.id, payload)
            .then(async () => {
              await loadStateFromDb({
                clientId: keepClientId,
                projectId: keepProjectId,
                clientName: keepClientName,
                projectName: keepProjectName
              });
              resetActivityModal();
              if (activityModal) hideModal(activityModal);
            })
            .catch((err) => {
              console.error(err);
              alert("Erro ao atualizar atividade no Firebase.");
            });
        } else {
          selectedProject.tasks[idx] = payload;
          saveLocalState();
          renderMain();
          resetActivityModal();
          if (activityModal) hideModal(activityModal);
        }
        return;
      }

      if (db && selectedProject.id && selectedProject.clientId) {
        saveTaskToDb(selectedProject.clientId, selectedProject.id, task)
          .then(async () => {
            await loadStateFromDb({
              clientId: keepClientId,
              projectId: keepProjectId,
              clientName: keepClientName,
              projectName: keepProjectName
            });
            resetActivityModal();
            if (activityModal) hideModal(activityModal);
          })
          .catch((err) => {
            console.error(err);
            alert("Erro ao salvar atividade no Firebase.");
          });
      } else {
        selectedProject.tasks.push(task);
        saveLocalState();
        renderMain();
        resetActivityModal();
        if (activityModal) hideModal(activityModal);
      }
    });
  }

  const activityPhaseSelect = byId("activity-phase-select");
  if (activityPhaseSelect) {
    activityPhaseSelect.addEventListener("change", () => {
      updateActivityPackageField();
    });
  }
}

function showModal(modalEl) {
  modalEl.classList.add("show");
}

function hideModal(modalEl) {
  modalEl.classList.remove("show");
}

function openProjectModal(mode = "new") {
  const modal = byId("project-modal");
  const title = modal.querySelector("h2");
  const submitBtn = modal.querySelector('button[type="submit"]');
  const form = byId("project-form");
  const clientSelect = byId("project-client-select");
  const deleteProjectBtn = byId("delete-project-btn");

  if (mode === "edit" && state.selectedProject && state.selectedClient) {
    state.editingProjectId = state.selectedProject.id || "local";
    hydrateClientSelect(state.selectedClient.name);
    form.elements.name.value = state.selectedProject.name || "";
    form.elements.developer.value = state.selectedProject.developer || "";
    form.elements.start.value = state.selectedProject.start || "";
    form.elements.end.value = state.selectedProject.end || "";
    clientSelect.value = state.selectedClient.name;
    clientSelect.disabled = true;
    title.textContent = "Editar Projeto";
    submitBtn.textContent = "Salvar Alteracoes";
    if (deleteProjectBtn) deleteProjectBtn.classList.remove("hidden");
  } else {
    resetProjectModal();
    hydrateClientSelect();
    title.textContent = "Novo Projeto";
    submitBtn.textContent = "Salvar Projeto";
    if (deleteProjectBtn) deleteProjectBtn.classList.add("hidden");
  }

  showModal(modal);
}

function resetProjectModal() {
  const form = byId("project-form");
  const modal = byId("project-modal");
  const title = modal.querySelector("h2");
  const submitBtn = modal.querySelector('button[type="submit"]');
  const clientSelect = byId("project-client-select");
  const deleteProjectBtn = byId("delete-project-btn");
  state.editingProjectId = null;
  if (form) form.reset();
  if (clientSelect) clientSelect.disabled = false;
  if (title) title.textContent = "Novo Projeto";
  if (submitBtn) submitBtn.textContent = "Salvar Projeto";
  if (deleteProjectBtn) deleteProjectBtn.classList.add("hidden");
}

async function handleDeleteProject() {
  const project = state.selectedProject;
  const client = state.selectedClient;
  if (!project || !client) {
    alert("Nenhum projeto selecionado.");
    return;
  }
  const confirmed = window.confirm(`Excluir o projeto "${project.name}"? Esta acao nao pode ser desfeita.`);
  if (!confirmed) return;

  const modal = byId("project-modal");
  if (db && project.id && project.clientId) {
    try {
      await deleteProjectFromDb(project.clientId, project.id);
      await loadStateFromDb({ clientId: client.id, clientName: client.name });
      resetProjectModal();
      if (modal) hideModal(modal);
      return;
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir projeto no Firebase.");
      return;
    }
  }

  const idx = client.projects.findIndex((p) => p === project || (p.id && p.id === project.id) || p.name === project.name);
  if (idx >= 0) {
    client.projects.splice(idx, 1);
  }
  state.selectedProject = client.projects[0] || null;
  saveLocalState();
  renderClientList();
  renderMain();
  resetProjectModal();
  if (modal) hideModal(modal);
}

function openActivityModal(mode = "new", taskIndex = null) {
  const modal = byId("activity-modal");
  const title = modal.querySelector("h2");
  const submitBtn = modal.querySelector('button[type="submit"]');
  const form = byId("activity-form");

  if (mode === "edit" && Number.isInteger(taskIndex) && state.selectedProject) {
    const task = state.selectedProject.tasks?.[taskIndex];
    if (!task) return;
    state.editingTaskIndex = taskIndex;
    const derivedPackage = task.package || extractPackageLabel(task);
    form.elements.title.value = task.title || "";
    form.elements.phase.value = (task.phase || "LEVANTAMENTO").toUpperCase();
    updateActivityPackageField();
    if (derivedPackage) {
      addPackageToProject(state.selectedProject, derivedPackage);
    }
    form.elements.package.value = derivedPackage || "";
    form.elements.due.value = task.due || "";
    form.elements.status.value = task.status || "planejado";
    title.textContent = "Editar Atividade";
    submitBtn.textContent = "Salvar Alteracoes";
  } else {
    resetActivityModal();
    updateActivityPackageField();
    title.textContent = "Nova Atividade";
    submitBtn.textContent = "Salvar Atividade";
  }

  updateActivityProjectLabel();
  showModal(modal);
}

function resetActivityModal() {
  const form = byId("activity-form");
  const modal = byId("activity-modal");
  const title = modal.querySelector("h2");
  const submitBtn = modal.querySelector('button[type="submit"]');
  state.editingTaskIndex = null;
  if (form) form.reset();
  if (title) title.textContent = "Nova Atividade";
  if (submitBtn) submitBtn.textContent = "Salvar Atividade";
  updateActivityPackageField();
}

function deleteTaskByIndex(idx) {
  const project = state.selectedProject;
  if (!project || !project.tasks || !project.tasks[idx]) return;
  const keepClientId = state.selectedClient?.id;
  const keepProjectId = state.selectedProject?.id;
  const keepClientName = state.selectedClient?.name;
  const keepProjectName = state.selectedProject?.name;
  const task = project.tasks[idx];
  if (db && project.id && project.clientId && task.id) {
    deleteTaskFromDb(project.clientId, project.id, task.id)
      .then(async () => {
        await loadStateFromDb({
          clientId: keepClientId,
          projectId: keepProjectId,
          clientName: keepClientName,
          projectName: keepProjectName
        });
      })
      .catch((err) => {
        console.error(err);
        alert("Erro ao excluir atividade no Firebase.");
      });
    return;
  }
  project.tasks.splice(idx, 1);
  saveLocalState();
  renderMain();
}

function findClientByName(name) {
  if (!name) return null;
  const normalized = name.trim().toLowerCase();
  return state.clients.find((client) => client.name.trim().toLowerCase() === normalized) || null;
}

function addClientToState(name) {
  const existing = findClientByName(name);
  if (existing) return existing;
  const client = { name, projects: [] };
  state.clients.push(client);
  saveLocalState();
  renderClientList();
  return client;
}

function updateProjectInState(payload) {
  if (!payload) return;
  const client =
    state.clients.find((c) => c.name === payload.client) ||
    state.selectedClient ||
    state.clients[0];
  if (!client) return;
  const current = state.selectedProject;
  const idx = client.projects.findIndex(
    (proj) => proj === current || (current?.id && proj.id === current.id) || proj.name === current?.name
  );
  if (idx === -1) return;
  const existing = client.projects[idx];
  const updated = {
    ...existing,
    name: payload.name,
    developer: payload.developer,
    start: payload.start,
    end: payload.end
  };
  client.projects[idx] = updated;
  state.selectedClient = client;
  state.selectedProject = updated;
}

function getProjectPackages(project) {
  if (!project) return [];
  if (!Array.isArray(project.packages)) {
    project.packages = [];
  }
  if (!project.packages.length) {
    const derived = derivePackagesFromTasks(project.tasks || []);
    if (derived.length) {
      project.packages = derived;
    }
  }
  return project.packages;
}

function derivePackagesFromTasks(tasks = []) {
  const unique = new Set();
  tasks.forEach((task) => {
    if (!PACKAGE_PHASES.includes((task.phase || "").toUpperCase())) return;
    const label = extractPackageLabel(task);
    if (label) unique.add(label);
  });
  return Array.from(unique);
}

function addPackageToProject(project, label) {
  if (!project) return "";
  const normalized = normalizePackageLabel(label);
  if (!normalized) return "";
  const packages = getProjectPackages(project);
  const exists = packages.some((pkg) => pkg.toLowerCase() === normalized.toLowerCase());
  if (!exists) packages.push(normalized);
  return normalized;
}

function promptNewPackageName() {
  const name = window.prompt("Nome do pacote (ex.: Pacote 01: 5 entregas prioritarias)");
  if (!name) return "";
  return name.trim();
}

function promptNewClientName() {
  const name = window.prompt("Nome do novo cliente:");
  if (!name) return "";
  return name.trim();
}

function promptRenameClientName(currentName) {
  const name = window.prompt("Novo nome do cliente:", currentName || "");
  if (!name) return "";
  return name.trim();
}

async function handleRenameClient(client) {
  if (!client) return;
  const nextName = promptRenameClientName(client.name);
  if (!nextName || nextName === client.name) return;
  const existing = findClientByName(nextName);
  if (existing && existing !== client) {
    alert("Ja existe um cliente com esse nome.");
    return;
  }

  const previousName = client.name;
  if (db && client.id) {
    try {
      await db.ref(`clients/${client.id}`).update({ name: nextName });
      await loadStateFromDb({
        clientId: client.id,
        projectId: state.selectedProject?.id,
        clientName: nextName,
        projectName: state.selectedProject?.name
      });
      return;
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar cliente no Firebase.");
      return;
    }
  }

  client.name = nextName;
  if (Object.prototype.hasOwnProperty.call(state.clientVisibility, previousName)) {
    state.clientVisibility[nextName] = state.clientVisibility[previousName];
    delete state.clientVisibility[previousName];
  }
  saveLocalState();
  renderClientList();
  renderMain();
  hydrateClientSelect(client.name);
}

function resetClientSelect(select) {
  const fallback = state.clients[0]?.name || "";
  select.value = fallback;
}

function hydrateClientSelect(selectedValue) {
  const select = byId("project-client-select");
  select.innerHTML = "";
  state.clients.forEach((client) => {
    const opt = document.createElement("option");
    opt.value = client.name;
    opt.textContent = client.name;
    select.appendChild(opt);
  });
  const add = document.createElement("option");
  add.value = "__new__";
  add.textContent = "+ Adicionar cliente";
  select.appendChild(add);

  if (selectedValue) {
    select.value = selectedValue;
  }

  if (!select.dataset.wired) {
    select.addEventListener("change", () => {
      if (select.value !== "__new__") return;
      const name = promptNewClientName();
      if (!name) {
        resetClientSelect(select);
        return;
      }
      const existing = findClientByName(name);
      const client = existing || addClientToState(name);
      if (db) {
        ensureClientDoc(client.name).catch((err) => console.error(err));
      }
      hydrateClientSelect(client.name);
    });
    select.dataset.wired = "true";
  }
}

function updateActivityProjectLabel() {
  const lbl = byId("activity-project");
  lbl.value = state.selectedProject ? state.selectedProject.name : "";
}

function updateActivityPackageField() {
  const field = byId("activity-package-field");
  const select = byId("activity-package-select");
  const phaseSelect = byId("activity-phase-select");
  if (!field || !select || !phaseSelect) return;

  const phase = phaseSelect.value;
  if (!PACKAGE_PHASES.includes(phase)) {
    field.classList.add("hidden");
    select.value = "";
    return;
  }

  field.classList.remove("hidden");
  const project = state.selectedProject;
  if (!project) {
    field.classList.add("hidden");
    select.value = "";
    return;
  }
  const packages = getProjectPackages(project);
  select.innerHTML = "";

  const none = document.createElement("option");
  none.value = "";
  none.textContent = "Sem pacote";
  select.appendChild(none);

  packages.forEach((pkg) => {
    const opt = document.createElement("option");
    opt.value = pkg;
    opt.textContent = pkg;
    select.appendChild(opt);
  });

  const add = document.createElement("option");
  add.value = "__new_package__";
  add.textContent = "+ Criar pacote";
  select.appendChild(add);

  if (!select.dataset.wired) {
    select.addEventListener("change", () => {
      if (select.value !== "__new_package__") return;
      const name = promptNewPackageName();
      if (!name) {
        select.value = "";
        return;
      }
      const label = addPackageToProject(project, name);
      if (label && db && project?.id && project?.clientId) {
        updateProjectPackagesOnDb(project.clientId, project.id, project.packages).catch((err) => console.error(err));
      } else if (label) {
        saveLocalState();
      }
      updateActivityPackageField();
      select.value = label;
    });
    select.dataset.wired = "true";
  }
}

function statusInfo(status) {
  return (
    STATUS_OPTIONS.find((opt) => opt.value === status) || {
      label: "Planejado",
      className: "planejado"
    }
  );
}

function scheduleStatusInfo(status) {
  if (status === "em_atraso") {
    return { label: "Em Atraso", className: "em-atraso" };
  }
  return { label: "Em Dia", className: "em-dia" };
}

function projectScheduleStatus(project) {
  const tasks = Array.isArray(project?.tasks) ? project.tasks : [];
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const hasOverdue = tasks.some((task) => {
    if ((task.status || "").toLowerCase() === "concluido") return false;
    const dt = parseTaskDate(task.due);
    return dt && dt.getTime() < today;
  });
  return hasOverdue ? "em_atraso" : "em_dia";
}

function setupStatusPopover() {
  const popover = byId("status-popover");
  const select = byId("status-select");
  select.innerHTML = "";
  STATUS_OPTIONS.forEach((opt) => {
    const o = document.createElement("option");
    o.value = opt.value;
    o.textContent = opt.label;
    select.appendChild(o);
  });

  document.body.addEventListener("click", (e) => {
    const phaseBtn = e.target.closest("[data-phase-toggle]");
    if (phaseBtn) {
      const phase = phaseBtn.dataset.phaseToggle;
      state.collapsedPhases[phase] = !state.collapsedPhases[phase];
      renderMain();
      return;
    }
    const subBtn = e.target.closest("[data-sub-epic-toggle]");
    if (subBtn) {
      const key = subBtn.dataset.subEpicToggle;
      state.collapsedPhases[key] = !state.collapsedPhases[key];
      renderMain();
      return;
    }
    const btn = e.target.closest(".status-btn");
    if (btn) {
      hideTaskActionsPopover();
      openStatusPopover(btn);
      return;
    }
    if (!e.target.closest("#status-popover")) {
      hideStatusPopover();
    }
  });

  select.addEventListener("change", () => {
    const idx = Number(popover.dataset.taskIndex);
    if (Number.isNaN(idx) || !state.selectedProject) return;
    state.selectedProject.tasks[idx].status = select.value;
    const task = state.selectedProject.tasks[idx];
    if (db && state.selectedProject.id && task.id) {
      updateTaskStatusOnDb(state.selectedProject.clientId, state.selectedProject.id, task.id, select.value)
        .then(() => {
          hideStatusPopover();
          renderMain();
        })
        .catch((err) => {
          console.error(err);
          alert("Erro ao atualizar status no Firebase.");
        });
      return;
    }
    saveLocalState();
    hideStatusPopover();
    renderMain();
  });
}

function setupTaskActions() {
  const popover = byId("task-actions-popover");
  const editBtn = byId("task-edit-action");
  const deleteBtn = byId("task-delete-action");

  document.body.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-task-action]");
    if (btn) {
      openTaskActionsPopover(btn);
      return;
    }
    if (!e.target.closest("#task-actions-popover")) {
      hideTaskActionsPopover();
    }
  });

  editBtn.addEventListener("click", () => {
    const idx = Number(popover.dataset.taskIndex);
    if (Number.isNaN(idx)) return;
    hideTaskActionsPopover();
    openActivityModal("edit", idx);
  });

  deleteBtn.addEventListener("click", () => {
    const idx = Number(popover.dataset.taskIndex);
    if (Number.isNaN(idx)) return;
    const confirmed = window.confirm("Excluir esta atividade?");
    if (!confirmed) return;
    deleteTaskByIndex(idx);
    hideTaskActionsPopover();
  });
}

function openTaskActionsPopover(target) {
  hideStatusPopover();
  const popover = byId("task-actions-popover");
  const idx = target.dataset.taskIndex;
  popover.dataset.taskIndex = idx;
  document.querySelectorAll(".task-row.selected").forEach((row) => row.classList.remove("selected"));
  const row = target.closest(".task-row");
  if (row) row.classList.add("selected");
  const rect = target.getBoundingClientRect();
  popover.style.top = `${rect.bottom + window.scrollY + 6}px`;
  popover.style.left = `${rect.left + window.scrollX - 60}px`;
  popover.classList.add("show");
}

function hideTaskActionsPopover() {
  const popover = byId("task-actions-popover");
  popover.classList.remove("show");
  document.querySelectorAll(".task-row.selected").forEach((row) => row.classList.remove("selected"));
}

function openStatusPopover(target) {
  const popover = byId("status-popover");
  const select = byId("status-select");
  const idx = target.dataset.taskIndex;
  popover.dataset.taskIndex = idx;
  const currentStatus = state.selectedProject?.tasks[Number(idx)]?.status;
  if (currentStatus) select.value = currentStatus;
  const rect = target.getBoundingClientRect();
  popover.style.top = `${rect.bottom + window.scrollY + 6}px`;
  popover.style.left = `${rect.left + window.scrollX}px`;
  popover.classList.add("show");
}

function hideStatusPopover() {
  byId("status-popover").classList.remove("show");
}

function setupDashboardFilters() {
  ensureDashboardState();
  let popover = byId("dashboard-filter-popover");
  if (!popover) {
    popover = document.createElement("div");
    popover.id = "dashboard-filter-popover";
    popover.className = "table-filter-popover";
    popover.innerHTML = `
      <div class="filter-header">
        <span class="filter-title">Filtro</span>
        <button class="icon-btn filter-close" type="button">&times;</button>
      </div>
      <div class="filter-sort">
        <button class="btn sm ghost" type="button" data-sort="asc"></button>
        <button class="btn sm ghost" type="button" data-sort="desc"></button>
        <button class="btn sm ghost" type="button" data-sort-clear>Limpar ordenacao</button>
      </div>
      <div class="filter-list">
        <label class="filter-option filter-all">
          <input type="checkbox" data-filter-select-all>
          <span>Selecionar tudo</span>
        </label>
        <div class="filter-divider"></div>
        <div class="filter-options"></div>
      </div>
      <div class="filter-footer">
        <button class="btn sm ghost" type="button" data-filter-clear>Limpar</button>
        <button class="btn sm primary" type="button" data-filter-apply>Aplicar</button>
      </div>
    `;
    document.body.appendChild(popover);
  }

  if (popover.dataset.wired) return;
  popover.dataset.wired = "true";

  document.body.addEventListener("click", (e) => {
    const filterBtn = e.target.closest(".table-filter-btn");
    if (filterBtn) {
      openDashboardFilterPopover(filterBtn);
      return;
    }
    if (!e.target.closest("#dashboard-filter-popover")) {
      hideDashboardFilterPopover();
    }
  });

  popover.addEventListener("click", (e) => {
    const closeBtn = e.target.closest(".filter-close");
    if (closeBtn) {
      hideDashboardFilterPopover();
      return;
    }
    const sortBtn = e.target.closest("[data-sort]");
    if (sortBtn) {
      const key = popover.dataset.key;
      if (!key) return;
      state.dashboard.sort = { key, direction: sortBtn.dataset.sort };
      hideDashboardFilterPopover();
      renderMain();
      return;
    }
    const clearSortBtn = e.target.closest("[data-sort-clear]");
    if (clearSortBtn) {
      state.dashboard.sort = { key: null, direction: "asc" };
      hideDashboardFilterPopover();
      renderMain();
      return;
    }
    const clearBtn = e.target.closest("[data-filter-clear]");
    if (clearBtn) {
      const key = popover.dataset.key;
      if (!key) return;
      delete state.dashboard.filters[key];
      hideDashboardFilterPopover();
      renderMain();
      return;
    }
    const applyBtn = e.target.closest("[data-filter-apply]");
    if (applyBtn) {
      applyDashboardFilterFromPopover(popover);
      hideDashboardFilterPopover();
      renderMain();
    }
  });

  popover.addEventListener("change", (e) => {
    if (e.target.matches("[data-filter-select-all]")) {
      const checked = e.target.checked;
      popover.querySelectorAll(".filter-options input[type='checkbox']").forEach((input) => {
        input.checked = checked;
      });
      updateDashboardSelectAll(popover);
      return;
    }
    if (e.target.matches(".filter-options input[type='checkbox']")) {
      updateDashboardSelectAll(popover);
    }
  });
}

function openDashboardFilterPopover(button) {
  ensureDashboardState();
  const popover = byId("dashboard-filter-popover");
  if (!popover) return;
  const key = button.dataset.filterKey;
  const column = DASHBOARD_COLUMNS.find((col) => col.key === key);
  if (!column) return;
  popover.dataset.key = key;
  popover.querySelector(".filter-title").textContent = column.label;
  const sortAsc = popover.querySelector("[data-sort='asc']");
  const sortDesc = popover.querySelector("[data-sort='desc']");
  if (column.type === "number" || column.type === "date") {
    sortAsc.textContent = "Menor -> Maior";
    sortDesc.textContent = "Maior -> Menor";
  } else {
    sortAsc.textContent = "A-Z";
    sortDesc.textContent = "Z-A";
  }

  const options = popover.querySelector(".filter-options");
  options.innerHTML = "";
  const values = dashboardFilterValues(allProjects(), key);
  const active = new Set(state.dashboard.filters[key] || []);
  values.forEach((value) => {
    const label = document.createElement("label");
    label.className = "filter-option";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.value = value;
    input.checked = active.size === 0 || active.has(value);
    const text = document.createElement("span");
    text.textContent = column?.type === "date" ? formatDateBR(value) : value;
    label.appendChild(input);
    label.appendChild(text);
    options.appendChild(label);
  });

  updateDashboardSelectAll(popover);
  popover.classList.add("show");
  positionDashboardPopover(button, popover);
}

function positionDashboardPopover(button, popover) {
  const rect = button.getBoundingClientRect();
  const top = rect.bottom + window.scrollY + 8;
  popover.style.top = `${top}px`;
  const popoverRect = popover.getBoundingClientRect();
  const maxLeft = window.scrollX + window.innerWidth - popoverRect.width - 12;
  const left = Math.min(Math.max(rect.left + window.scrollX, 12), maxLeft);
  popover.style.left = `${left}px`;
}

function updateDashboardSelectAll(popover) {
  const selectAll = popover.querySelector("[data-filter-select-all]");
  const boxes = Array.from(popover.querySelectorAll(".filter-options input[type='checkbox']"));
  const checked = boxes.filter((box) => box.checked).length;
  selectAll.checked = boxes.length > 0 && checked === boxes.length;
  selectAll.indeterminate = checked > 0 && checked < boxes.length;
}

function applyDashboardFilterFromPopover(popover) {
  const key = popover.dataset.key;
  if (!key) return;
  const boxes = Array.from(popover.querySelectorAll(".filter-options input[type='checkbox']"));
  const selected = boxes.filter((box) => box.checked).map((box) => box.value);
  if (selected.length === 0 || selected.length === boxes.length) {
    delete state.dashboard.filters[key];
    return;
  }
  state.dashboard.filters[key] = selected;
}

function hideDashboardFilterPopover() {
  const popover = byId("dashboard-filter-popover");
  if (!popover) return;
  popover.classList.remove("show");
}

function ensureExportPopover() {
  let popover = byId("export-popover");
  if (popover) return popover;
  popover = document.createElement("div");
  popover.id = "export-popover";
  popover.className = "export-popover";
  popover.innerHTML = `
    <button type="button" class="btn sm ghost export-option" data-export-format="pdf">Exportar PDF</button>
    <button type="button" class="btn sm ghost export-option" data-export-format="pptx">Exportar PPTX</button>
  `;
  document.body.appendChild(popover);
  return popover;
}

function positionExportPopover(button, popover) {
  const rect = button.getBoundingClientRect();
  const top = rect.bottom + window.scrollY + 8;
  popover.style.top = `${top}px`;
  const popoverRect = popover.getBoundingClientRect();
  const maxLeft = window.scrollX + window.innerWidth - popoverRect.width - 12;
  const left = Math.min(Math.max(rect.left + window.scrollX - popoverRect.width + rect.width, 12), maxLeft);
  popover.style.left = `${left}px`;
}

function openExportPopover(button) {
  const popover = ensureExportPopover();
  popover.classList.add("show");
  positionExportPopover(button, popover);
}

function hideExportPopover() {
  const popover = byId("export-popover");
  if (!popover) return;
  popover.classList.remove("show");
}

function showLogin() {
  byId("login-screen")?.classList.remove("hidden");
  byId("app-shell")?.classList.add("hidden");
  const errEl = byId("login-error");
  if (errEl) {
    errEl.textContent = "";
    errEl.classList.add("hidden");
  }
}

function showApp() {
  byId("login-screen")?.classList.add("hidden");
  byId("app-shell")?.classList.remove("hidden");
}

function wireLogin() {
  const form = byId("login-form");
  if (!form || form.dataset.wired) return;
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = byId("login-email")?.value.trim() || "";
    const pass = byId("login-password")?.value || "";
    const errEl = byId("login-error");
    if (errEl) {
      errEl.textContent = "";
      errEl.classList.add("hidden");
    }
    if (!email || !pass) {
      if (errEl) {
        errEl.textContent = "Falha no login. Verifique e-mail e senha.";
        errEl.classList.remove("hidden");
      }
      return;
    }
    try {
      await auth.signInWithEmailAndPassword(email, pass);
    } catch (err) {
      console.error(err);
      if (errEl) {
        errEl.textContent = "Falha no login. Verifique e-mail e senha.";
        errEl.classList.remove("hidden");
      }
    }
  });
  form.dataset.wired = "true";
}

async function logout() {
  if (!auth) return;
  await auth.signOut();
}

async function init() {
  showLogin();
  const ok = await initFirebase();
  if (!ok) return;
  if (!firebase?.auth) {
    console.error("Firebase Auth nao carregado.");
    return;
  }
  auth = firebase.auth();
  wireLogin();

  auth.onAuthStateChanged(async (user) => {
    if (!user) {
      showLogin();
      return;
    }
    showApp();
    if (!appInitialized) {
      appInitialized = true;
      await initApp();
      return;
    }
    await loadStateFromDb();
    renderClientList();
    renderMain();
    hydrateClientSelect();
  });
}

document.addEventListener("DOMContentLoaded", init);

if (typeof window !== "undefined") {
  window.formatDateBR = formatDateBR;
  window.parseTaskDate = parseTaskDate;
}

async function ensureClientDoc(clientName) {
  const query = db.ref("clients").orderByChild("name").equalTo(clientName).limitToFirst(1);
  const existing = await query.once("value");
  if (existing.exists()) {
    const clientId = Object.keys(existing.val())[0];
    return { id: clientId, ref: db.ref(`clients/${clientId}`) };
  }
  const newRef = db.ref("clients").push();
  await newRef.set({ name: clientName, projects: {} });
  return { id: newRef.key, ref: newRef };
}

async function deleteProjectFromDb(clientId, projectId) {
  await db.ref(`clients/${clientId}/projects/${projectId}`).remove();
}

async function saveProjectToDb(payload) {
  const client = await ensureClientDoc(payload.client);
  const projectRef = client.ref.child("projects").push();
  await projectRef.set({
    name: payload.name,
    developer: payload.developer,
    start: payload.start,
    end: payload.end,
    epics: DEFAULT_EPICS.slice(),
    packages: [],
    tasks: {},
    createdAt: firebase.database.ServerValue.TIMESTAMP
  });
}

async function updateProjectOnDb(clientId, projectId, payload) {
  await db.ref(`clients/${clientId}/projects/${projectId}`).update({
    name: payload.name,
    developer: payload.developer,
    start: payload.start,
    end: payload.end
  });
}

async function saveTaskToDb(clientId, projectId, task) {
  const taskRef = db.ref(`clients/${clientId}/projects/${projectId}/tasks`).push();
  await taskRef.set({
    title: task.title,
    phase: task.phase,
    package: task.package,
    due: task.due,
    status: task.status,
    createdAt: firebase.database.ServerValue.TIMESTAMP
  });
}

async function updateTaskStatusOnDb(clientId, projectId, taskId, status) {
  await db.ref(`clients/${clientId}/projects/${projectId}/tasks/${taskId}`).update({ status });
}

async function updateTaskOnDb(clientId, projectId, taskId, payload) {
  await db.ref(`clients/${clientId}/projects/${projectId}/tasks/${taskId}`).update({
    title: payload.title,
    phase: payload.phase,
    package: payload.package,
    due: payload.due,
    status: payload.status
  });
}

async function deleteTaskFromDb(clientId, projectId, taskId) {
  await db.ref(`clients/${clientId}/projects/${projectId}/tasks/${taskId}`).remove();
}

async function updateProjectPackagesOnDb(clientId, projectId, packages) {
  await db.ref(`clients/${clientId}/projects/${projectId}`).update({ packages });
}

function projectMetrics(tasks = []) {
  const total = tasks.length;
  const done = tasks.filter((t) => t.status === "concluido").length;
  const pending = Math.max(total - done, 0);
  const progress = total ? Math.round((done / total) * 100) : 0;
  return { total, done, pending, progress };
}

function computeProgress(tasks) {
  return projectMetrics(tasks).progress;
}

function groupTasksByPhase(tasks, requiredPhases = []) {
  const normalized = tasks.map((t, idx) => ({
    ...t,
    _idx: idx,
    phase: (t.phase || "OUTROS").toUpperCase()
  }));
  const required = requiredPhases.map((phase) => phase.toUpperCase());
  const ordered = [...required, ...PHASE_ORDER.filter((phase) => !required.includes(phase))];
  const grouped = [];

  ordered.forEach((phase) => {
    const items = normalized.filter((t) => t.phase === phase);
    if (!items.length && !required.includes(phase)) return;
    const { subEpics, flatTasks } = groupBySubEpic(items);
    grouped.push({
      phase,
      tasks: sortTasksForDisplay(flatTasks),
      subEpics: subEpics.sort((a, b) => compareLatestDesc(a.latest, b.latest)),
      isEmpty: items.length === 0
    });
  });

  const remaining = normalized.filter((t) => !ordered.includes(t.phase));
  if (remaining.length) {
    const { subEpics, flatTasks } = groupBySubEpic(remaining);
    const existing = grouped.find((group) => group.phase === "OUTROS");
    if (existing) {
      existing.tasks = sortTasksForDisplay(existing.tasks.concat(flatTasks));
      existing.subEpics = existing.subEpics.concat(subEpics).sort((a, b) => compareLatestDesc(a.latest, b.latest));
      existing.isEmpty = existing.tasks.length === 0 && existing.subEpics.length === 0;
    } else {
      grouped.push({
        phase: "OUTROS",
        tasks: sortTasksForDisplay(flatTasks),
        subEpics: subEpics.sort((a, b) => compareLatestDesc(a.latest, b.latest)),
        isEmpty: remaining.length === 0
      });
    }
  }

  return grouped;
}

function upcomingTasks(tasks, days = 10) {
  const now = new Date();
  const limit = new Date(now.getTime() + days * 24 * 60 * 60 * 1000);
  return tasks
    .filter((t) => t.due && !Number.isNaN(Date.parse(t.due)))
    .filter((t) => {
      const d = new Date(t.due);
      return d >= now && d <= limit;
    })
    .sort((a, b) => new Date(a.due) - new Date(b.due));
}

function groupBySubEpic(tasks) {
  const subMap = new Map();
  const flat = [];
  tasks.forEach((task) => {
    const sub = getSubEpicTitle(task);
    if (sub) {
      if (!subMap.has(sub)) subMap.set(sub, []);
      subMap.get(sub).push(task);
      return;
    }
    flat.push(task);
  });
  const subEpics = Array.from(subMap.entries()).map(([title, items]) => ({
    title,
    tasks: sortTasksForDisplay(items),
    latest: latestDate(items)
  }));
  return { subEpics, flatTasks: flat };
}

function getSubEpicTitle(task) {
  const label = extractPackageLabel(task);
  return label || null;
}

function taskStatusRank(status) {
  const key = (status || "").toLowerCase();
  if (key === "em_andamento") return 0;
  if (key === "atrasado") return 1;
  if (key === "planejado") return 2;
  if (key === "concluido") return 3;
  return 2;
}

function dateSortValue(value) {
  const dt = parseTaskDate(value);
  return dt ? dt.getTime() : Number.POSITIVE_INFINITY;
}

function dateMetricValue(value) {
  const dt = parseTaskDate(value);
  return dt ? dt.getTime() : null;
}

function sortTasksForDisplay(tasks) {
  return tasks.slice().sort((a, b) => {
    const d = dateSortValue(a.due) - dateSortValue(b.due);
    if (d !== 0) return d;
    return (a.title || "").localeCompare(b.title || "");
  });
}

function goLiveValue(value) {
  if (!value || Number.isNaN(Date.parse(value))) return null;
  return new Date(value).getTime();
}

function latestDate(tasks) {
  return tasks.reduce((acc, t) => {
    const value = dateMetricValue(t.due);
    if (value === null) return acc;
    if (acc === null) return value;
    return Math.max(acc, value);
  }, null);
}

function compareLatestDesc(aValue, bValue) {
  if (aValue === null && bValue === null) return 0;
  if (aValue === null) return 1;
  if (bValue === null) return -1;
  return bValue - aValue;
}

function ensureDashboardState() {
  if (!state.dashboard) {
    state.dashboard = { sort: { key: null, direction: "asc" }, filters: {} };
  }
  if (!state.dashboard.sort) {
    state.dashboard.sort = { key: null, direction: "asc" };
  }
  if (!state.dashboard.filters) {
    state.dashboard.filters = {};
  }
}

function dashboardDisplayValue(project, key) {
  if (key === "name") return project.name || "";
  if (key === "clientName") return project.clientName || "";
  if (key === "developer") return project.developer || "-";
  if (key === "status") return statusInfo(project.status).label;
  if (key === "schedule") return scheduleStatusInfo(project.schedule).label;
  if (key === "progress") return `${project.progress}%`;
  if (key === "goLive") return project.goLive || "-";
  return "";
}

function dashboardFilterValues(projects, key) {
  const column = DASHBOARD_COLUMNS.find((col) => col.key === key);
  const values = Array.from(new Set(projects.map((project) => dashboardDisplayValue(project, key))));
  return values.sort((a, b) => {
    if (column?.type === "number") {
      return Number(String(a).replace("%", "")) - Number(String(b).replace("%", ""));
    }
    if (column?.type === "date") {
      const aValue = goLiveValue(a);
      const bValue = goLiveValue(b);
      if (aValue === null && bValue === null) return 0;
      if (aValue === null) return 1;
      if (bValue === null) return -1;
      return aValue - bValue;
    }
    return String(a).localeCompare(String(b));
  });
}

function applyDashboardFilters(projects) {
  ensureDashboardState();
  const filters = state.dashboard.filters;
  return projects.filter((project) =>
    DASHBOARD_COLUMNS.every((column) => {
      const selected = filters[column.key];
      if (!Array.isArray(selected) || selected.length === 0) return true;
      const value = dashboardDisplayValue(project, column.key);
      return selected.includes(value);
    })
  );
}

function sortDashboardProjects(projects) {
  ensureDashboardState();
  const sort = state.dashboard.sort;
  if (!sort?.key) {
    return projects.slice().sort(sortProjectsForDashboard);
  }
  const column = DASHBOARD_COLUMNS.find((col) => col.key === sort.key);
  const direction = sort.direction === "desc" ? -1 : 1;
  return projects.slice().sort((a, b) => {
    if (column?.type === "number") {
      return direction * ((Number(a[sort.key]) || 0) - (Number(b[sort.key]) || 0));
    }
    if (column?.type === "date") {
      const aValue = goLiveValue(a.goLive);
      const bValue = goLiveValue(b.goLive);
      if (aValue === null && bValue === null) return 0;
      if (aValue === null) return 1;
      if (bValue === null) return -1;
      return direction * (aValue - bValue);
    }
    const aValue = dashboardDisplayValue(a, sort.key).toLowerCase();
    const bValue = dashboardDisplayValue(b, sort.key).toLowerCase();
    return direction * aValue.localeCompare(bValue);
  });
}

function allProjects() {
  return state.clients.flatMap((client) =>
    (client.projects || []).map((p) => {
      const metrics = projectMetrics(p.tasks || []);
      return {
        ...p,
        clientName: client.name,
        metrics,
        progress: metrics.progress,
        status: projectStatus(p, metrics),
        schedule: projectScheduleStatus(p),
        goLive: p.end || ""
      };
    })
  );
}

function projectStatus(project, metrics = projectMetrics(project.tasks || [])) {
  if (metrics.progress === 100 && metrics.total > 0) return "concluido";
  const goLive = goLiveValue(project.end);
  if (goLive !== null && goLive < Date.now() && metrics.progress < 100) return "atrasado";
  const hasWorkStarted = (project.tasks || []).some((t) => t.status && t.status !== "planejado");
  return hasWorkStarted ? "em_andamento" : "planejado";
}

function sortProjectsForDashboard(a, b) {
  const priority = { atrasado: 0, em_andamento: 1, planejado: 2, concluido: 3 };
  const aRank = priority[a.status] ?? 9;
  const bRank = priority[b.status] ?? 9;
  if (aRank !== bRank) return aRank - bRank;
  const aDate = goLiveValue(a.goLive);
  const bDate = goLiveValue(b.goLive);
  if (aDate !== null && bDate !== null) return aDate - bDate;
  if (aDate !== null) return -1;
  if (bDate !== null) return 1;
  return a.name.localeCompare(b.name);
}

function renderDashboard(container) {
  byId("crumb-path").textContent = "Dashboard Projetos";
  ensureDashboardState();
  const all = allProjects();
  const filtered = applyDashboardFilters(all);
  const projects = sortDashboardProjects(filtered);

  const header = document.createElement("div");
  header.className = "section-header span-all";
  header.innerHTML = `
    <div class="header-row">
      <h2>Resumo de Projetos</h2>
      <button class="btn sm ghost" type="button" data-clear-dashboard-sort>Limpar ordenacao</button>
    </div>
    <div class="muted">Ordenado por atrasos e Go Live mais proximo.</div>
  `;

  const clearSortBtn = header.querySelector("[data-clear-dashboard-sort]");
  clearSortBtn.addEventListener("click", () => {
    state.dashboard.sort = { key: null, direction: "asc" };
    renderMain();
  });

  const headerCells = DASHBOARD_COLUMNS.map((column) => {
    const isSorted = state.dashboard.sort?.key === column.key;
    const isFiltered = Array.isArray(state.dashboard.filters?.[column.key]) && state.dashboard.filters[column.key].length > 0;
    const buttonClass = ["table-filter-btn", isSorted || isFiltered ? "active" : ""].filter(Boolean).join(" ");
    const sortIndicator = isSorted ? (state.dashboard.sort.direction === "asc" ? "^" : "v") : "";
    return `
      <th>
        <button class="${buttonClass}" type="button" data-filter-key="${column.key}">
          <span class="filter-label">${column.label}</span>
          <span class="filter-icons">
            <span class="sort-indicator">${sortIndicator}</span>
            <span class="filter-caret">v</span>
          </span>
        </button>
      </th>
    `;
  }).join("");

  const tableCard = document.createElement("div");
  tableCard.className = "table-card span-all";
  const rows = projects
    .map((p) => {
      const info = statusInfo(p.status);
      const scheduleInfo = scheduleStatusInfo(p.schedule);
      return `
        <tr data-client="${p.clientName}" data-project="${p.name}">
          <td>${p.name}</td>
          <td>${p.clientName}</td>
          <td>${p.developer || "-"}</td>
          <td><span class="pill project-status ${info.className}">${info.label}</span></td>
          <td><span class="pill schedule-status ${scheduleInfo.className}">${scheduleInfo.label}</span></td>
          <td>${p.progress}%</td>
          <td>${formatDateBR(p.goLive) || "-"}</td>
        </tr>
      `;
    })
    .join("");
  tableCard.innerHTML = `
    <table>
      <thead>
        <tr>
          ${headerCells}
        </tr>
      </thead>
      <tbody>
        ${rows || "<tr><td colspan='7'>Nenhum projeto cadastrado.</td></tr>"}
      </tbody>
    </table>
  `;

  tableCard.addEventListener("click", (e) => {
    const row = e.target.closest("tr[data-project]");
    if (!row) return;
    const clientName = row.dataset.client;
    const projectName = row.dataset.project;
    const client = state.clients.find((c) => c.name === clientName);
    const project = client?.projects.find((p) => p.name === projectName);
    if (client && project) {
      openProject(client, project);
    }
  });

  container.appendChild(header);
  container.appendChild(tableCard);
}
