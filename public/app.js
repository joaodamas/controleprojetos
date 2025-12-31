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
  improvements: [],
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
  { value: "planejado", label: "Nao iniciado", className: "planejado" },
  { value: "em_andamento", label: "Em andamento", className: "em-andamento" },
  { value: "em_validacao", label: "Em validacao", className: "em-validacao" },
  { value: "parado", label: "Parado", className: "parado" },
  { value: "atrasado", label: "Atrasado", className: "atrasado" },
  { value: "concluido", label: "Concluido", className: "concluido" }
];

const TASK_STATUS_OPTIONS = [
  { value: "planejado", label: "Nao iniciado", className: "planejado" },
  { value: "em_andamento", label: "Em andamento", className: "em-andamento" },
  { value: "em_validacao", label: "Em validacao", className: "em-validacao" },
  { value: "parado", label: "Parado", className: "parado" },
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
    em_validacao: 0,
    planejado: 0,
    parado: 0,
    concluido: 0
  };
  tasks.forEach((task) => {
    const status = normalizeTaskStatus(getTaskStatus(task));
    if (status === "em_andamento") counts.em_andamento += 1;
    else if (status === "em_validacao") counts.em_validacao += 1;
    else if (status === "planejado") counts.planejado += 1;
    else if (status === "parado") counts.parado += 1;
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

function setCrumbPathText(label) {
  const crumbPath = byId("crumb-path");
  if (!crumbPath) return;
  crumbPath.textContent = label;
}

function setCrumbPathProject(client, project) {
  const crumbPath = byId("crumb-path");
  if (!crumbPath) return;
  const clientLabel = escapeHtml(client?.name || "Cliente");
  const projectLabel = escapeHtml(project?.name || "Projeto");
  crumbPath.innerHTML =
    `<button type="button" class="crumb-link" data-crumb="client">${clientLabel}</button>` +
    `<span class="crumb-sep">/</span>` +
    `<button type="button" class="crumb-link current" data-crumb="project">${projectLabel}</button>`;
}

function normStatus(value) {
  return String(value || "")
    .trim()
    .replace(/^\d+\s*[-.:]?\s*/g, "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");
}

const STATUS_IN_PROGRESS = new Set(
  ["em andamento", "em desenvolvimento", "em execucao", "em progresso", "in progress", "doing", "atrasado"].map(
    normStatus
  )
);
const STATUS_VALIDATION = new Set(
  ["em validacao", "validacao", "aguardando validacao", "aguardando aprovacao"].map(normStatus)
);
const STATUS_DONE = new Set(["concluido", "concluida", "done", "finalizado", "finalizada", "feito", "feita"].map(normStatus));
const STATUS_PLANNED = new Set(
  [
    "planejado",
    "planejada",
    "nao iniciado",
    "nao iniciada",
    "todo",
    "to do",
    "a fazer",
    "backlog",
    "pendente",
    "pendencia",
    "pendencias"
  ].map(normStatus)
);

function getTaskStatus(task) {
  return task?.status ?? task?.state ?? task?.activityStatus ?? task?.situacao ?? "";
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

function normalizeTaskProgress(value) {
  if (value === "" || value == null) return null;
  const n = Number(value);
  if (!Number.isFinite(n)) return null;
  return Math.max(0, Math.min(100, Math.round(n)));
}

function taskProgressValue(task) {
  const p = taskProgress(task);
  if (p != null) return Math.max(0, Math.min(100, Math.round(p)));
  return isDoneTask(task) ? 100 : 0;
}

function taskStartStr(task) {
  return task?.startDate || task?.start || task?.plannedStart || "";
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
  const st = normalizeTaskStatus(getTaskStatus(task));
  return st === "concluido";
}

function isInProgressTask(task) {
  const st = normalizeTaskStatus(getTaskStatus(task));
  if (st === "em_andamento" || st === "em_validacao") return true;
  const p = taskProgress(task);
  return p != null && p > 0 && p < 100 && !isDoneTask(task);
}

function isPlannedTask(task) {
  const st = normalizeTaskStatus(getTaskStatus(task));
  if (!st || st === "planejado") return true;
  if (st === "em_andamento" || st === "em_validacao" || st === "concluido") return false;
  const p = taskProgress(task);
  return p === 0;
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

function pickExportLists(project, limit = 5) {
  const tasks = flattenProjectTasks(project);

  const done = tasks
    .filter(isDoneTask)
    .slice()
    .sort((a, b) => taskDateValueSafe(b) - taskDateValueSafe(a))
    .slice(0, limit);

  const pending = tasks.filter((task) => !isDoneTask(task));

  const inProgress = pending
    .filter(isInProgressTask)
    .slice()
    .sort((a, b) => {
      const aRank = taskHealthRank(a);
      const bRank = taskHealthRank(b);
      if (aRank !== bRank) return aRank - bRank;
      const aDue = taskDueValueSafe(a);
      const bDue = taskDueValueSafe(b);
      if (aDue !== bDue) return aDue - bDue;
      return taskTitle(a).localeCompare(taskTitle(b));
    })
    .slice(0, limit);

  const nextSteps = pending
    .filter((task) => !isInProgressTask(task) && isPlannedTask(task))
    .slice()
    .sort((a, b) => {
      const aDue = taskDueValueSafe(a);
      const bDue = taskDueValueSafe(b);
      if (aDue !== bDue) return aDue - bDue;
      return taskTitle(a).localeCompare(taskTitle(b));
    })
    .slice(0, limit);

  return { done, inProgress, nextSteps };
}

function normalizeReportItem(item) {
  if (!item) return null;
  if (typeof item === "string" || typeof item === "number") {
    return { title: String(item), meta: "" };
  }
  if (typeof item !== "object") return null;
  const title = item.title || item.name || item.summary || item.description || item.label;
  if (!title) return null;
  const owner = item.owner || item.responsible || item.assignee;
  const dateRaw = item.date || item.due || item.deadline || item.end;
  const dateLabel = dateRaw ? formatDateBR(dateRaw) : "";
  const meta = [owner, dateLabel].filter(Boolean).join(" • ");
  return { title, meta };
}

function projectReportItems(project, keys) {
  const items = [];
  keys.forEach((key) => {
    const value = project?.[key];
    if (!value) return;
    if (Array.isArray(value)) items.push(...value);
    else items.push(value);
  });
  return items;
}

function pickProjectReportItems(project, keys, limit) {
  return projectReportItems(project, keys)
    .map(normalizeReportItem)
    .filter(Boolean)
    .slice(0, limit);
}

function renderReportItems(items, emptyLabel) {
  if (!items.length) {
    return `<li>${escapeHtml(emptyLabel)}</li>`;
  }
  return items
    .map((item) => `<li>${escapeHtml(item.title)}${item.meta ? ` <span>${escapeHtml(item.meta)}</span>` : ""}</li>`)
    .join("");
}

function renderUrgentItems(tasks, todayTs) {
  if (!tasks.length) {
    return `<li>${escapeHtml("Sem atrasos no momento.")}</li>`;
  }
  const dayMs = 24 * 60 * 60 * 1000;
  return tasks
    .map((task) => {
      const title = taskTitle(task);
      const dueRaw = taskDueStr(task) || taskDateStr(task);
      const dueLabel = dueRaw ? formatDateBR(dueRaw) : "-";
      const dueValue = taskDueValueSafe(task);
      const daysLate = Number.isFinite(dueValue) ? Math.max(0, Math.ceil((todayTs - dueValue) / dayMs)) : null;
      const owner = taskOwner(task);
      const parts = ["Atrasada"];
      if (daysLate != null) parts.push(`+${daysLate}d`);
      if (dueLabel && dueLabel !== "-") parts.push(dueLabel);
      if (owner) parts.push(owner);
      const meta = parts.join(" \u00b7 ");
      return `<li>${escapeHtml(title)}${meta ? ` <span>${escapeHtml(meta)}</span>` : ""}</li>`;
    })
    .join("");
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

function nextDeliveryTask(project) {
  const tasks = flattenProjectTasks(project).filter((task) => !isDoneTask(task));
  if (!tasks.length) return null;
  return tasks
    .slice()
    .sort((a, b) => {
      const aDue = taskDueValueSafe(a);
      const bDue = taskDueValueSafe(b);
      if (aDue !== bDue) return aDue - bDue;
      const aDate = taskDateValueSafe(a);
      const bDate = taskDateValueSafe(b);
      if (aDate !== bDate) return aDate - bDate;
      return taskTitle(a).localeCompare(taskTitle(b));
    })[0];
}

function computeScheduleSummary(project) {
  const tasks = flattenProjectTasks(project);
  const total = tasks.length;
  const inProgress = tasks.filter((task) => !isDoneTask(task) && isInProgressTask(task)).length;
  const planned = tasks.filter((task) => !isDoneTask(task) && !isInProgressTask(task) && isPlannedTask(task)).length;
  const todayTs = todayStartTs();
  const weekAhead = todayTs + 7 * 24 * 60 * 60 * 1000;
  let overdue = 0;
  let dueSoon = 0;
  tasks.forEach((task) => {
    if (isDoneTask(task)) return;
    const due = taskDueValueSafe(task);
    if (!Number.isFinite(due) || due === Number.POSITIVE_INFINITY) return;
    if (due < todayTs) overdue += 1;
    else if (due <= weekAhead) dueSoon += 1;
  });
  const scheduleHealthStatus = overdue > 0 ? "em_atraso" : "em_dia";
  return { total, inProgress, planned, overdue, dueSoon, scheduleHealthStatus };
}

function pickMostOverdueTasks(project, limit = 5) {
  const tasks = flattenProjectTasks(project).filter((task) => !isDoneTask(task));
  const todayTs = todayStartTs();
  return tasks
    .filter((task) => {
      const due = taskDueValueSafe(task);
      return Number.isFinite(due) && due !== Number.POSITIVE_INFINITY && due < todayTs;
    })
    .slice()
    .sort((a, b) => taskDueValueSafe(a) - taskDueValueSafe(b))
    .slice(0, limit);
}

function renderTaskLi(task) {
  const startRaw = taskStartStr(task);
  const endRaw = taskDueStr(task) || taskDateStr(task);
  const startLabel = startRaw ? formatDateBR(startRaw) : "-";
  const endLabel = endRaw ? formatDateBR(endRaw) : "-";
  const owner = taskOwner(task);
  const progressLabel = `${taskProgressValue(task)}%`;
  const statusLabel = taskStatusInfo(getTaskStatus(task)).label;
  const healthLabel = taskHealthInfo(task).label;
  const parts = [];
  if (owner) parts.push(owner);
  if (startLabel !== "-" || endLabel !== "-") parts.push(`${startLabel} → ${endLabel}`);
  parts.push(progressLabel);
  parts.push(statusLabel);
  parts.push(healthLabel);
  const right = parts.join(" • ");
  return `
    <li class="op-task">
      <div class="op-task-title">${escapeHtml(taskTitle(task))}</div>
      ${right ? `<div class="op-task-meta">${escapeHtml(right)}</div>` : ""}
    </li>
  `;
}

function taskDueLabel(task) {
  const dueRaw = taskDueStr(task) || taskDateStr(task);
  return dueRaw ? formatDateBR(dueRaw) : "-";
}

function taskUrgencyTag(task, todayTs = todayStartTs()) {
  const dueValue = taskDueValueSafe(task);
  if (!Number.isFinite(dueValue) || dueValue === Number.POSITIVE_INFINITY) {
    return { cls: "ok", text: "Sem prazo" };
  }
  const diffDays = daysDiff(new Date(todayTs), new Date(dueValue));
  if (diffDays > 0) return { cls: "bad", text: `Atrasada +${diffDays}d` };
  if (diffDays === 0) return { cls: "warn", text: "Vence hoje" };
  const ahead = Math.abs(diffDays);
  return { cls: "ok", text: `Em dia • ${ahead}d` };
}

function renderOnePageItem(task, options = {}) {
  if (!task) return "";
  const name = escapeHtml(taskTitle(task));
  const dueLabel = taskDueLabel(task);
  const dueText = escapeHtml(dueLabel);
  const statusLabel = escapeHtml(taskStatusInfo(getTaskStatus(task)).label);
  const todayTs = options.todayTs ?? todayStartTs();
  const tag = options.tag || taskUrgencyTag(task, todayTs);
  const metaParts = [];
  if (dueLabel && dueLabel !== "-") metaParts.push(`Venc.: <b>${dueText}</b>`);
  if (statusLabel) metaParts.push(statusLabel);
  const meta =
    metaParts.length > 0
      ? metaParts.map((part) => `<span>${part}</span>`).join("<span>•</span>")
      : "<span>-</span>";
  return `
    <div class="item" title="${name}">
      <div class="itemTop">
        <div class="itemName">${name}</div>
        <span class="tag ${tag.cls}">${escapeHtml(tag.text)}</span>
      </div>
      <div class="itemMeta">${meta}</div>
    </div>
  `;
}

function renderOnePageEmptyItem(label) {
  return `
    <div class="item empty">
      <div class="itemName">${escapeHtml(label)}</div>
    </div>
  `;
}

function cssVar(name, fallback, rootEl = document.documentElement) {
  if (!rootEl || !window.getComputedStyle) return fallback;
  const value = getComputedStyle(rootEl).getPropertyValue(name).trim();
  return value || fallback;
}

function getSystemColors(rootEl) {
  return {
    planned: cssVar("--color-primary", cssVar("--accent-dark", "#2563eb", rootEl), rootEl),
    actual: cssVar(
      "--color-accent",
      cssVar("--color-warning", cssVar("--warning-text", "#f97316", rootEl), rootEl),
      rootEl
    ),
    warn: cssVar("--color-warning", cssVar("--warning-text", "#f59e0b", rootEl), rootEl),
    ok: cssVar("--color-success", cssVar("--success-text", "#16a34a", rootEl), rootEl),
    danger: cssVar("--color-danger", cssVar("--danger-text", "#ef4444", rootEl), rootEl),
    grid: cssVar("--color-border", cssVar("--border", "#e5e7eb", rootEl), rootEl),
    text: cssVar("--color-text", cssVar("--text", "#111827", rootEl), rootEl),
    muted: cssVar("--color-muted", cssVar("--muted", "#6b7280", rootEl), rootEl),
    bg: cssVar("--color-bg", cssVar("--panel", "#ffffff", rootEl), rootEl)
  };
}

function parseDateSafe(value) {
  if (!value) return null;
  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : new Date(value.getTime());
  }
  if (typeof value === "number") {
    const dt = new Date(value);
    return Number.isNaN(dt.getTime()) ? null : dt;
  }
  if (typeof value === "string") {
    const byFormat = parseTaskDate(value);
    if (byFormat) return byFormat;
    const dt = new Date(value);
    return Number.isNaN(dt.getTime()) ? null : dt;
  }
  return null;
}

function clamp01(value) {
  return Math.max(0, Math.min(1, value));
}

function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

function daysDiff(a, b) {
  return Math.floor((startOfDay(a).getTime() - startOfDay(b).getTime()) / (24 * 60 * 60 * 1000));
}

function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function round1(value) {
  if (!Number.isFinite(value)) return 0;
  return Math.round(value * 10) / 10;
}

function formatMetric(value) {
  if (!Number.isFinite(value)) return "0";
  const rounded = round1(value);
  return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
}

function formatSignedMetric(value) {
  const num = Number(value);
  const base = formatMetric(value);
  if (Number.isFinite(num) && num > 0) return `+${base}`;
  return base;
}

function baselinePctFromDates(startValue, endValue, now = new Date()) {
  const start = parseTaskDate(startValue);
  const end = parseTaskDate(endValue);
  if (!start || !end) return 0;
  const startDay = startOfDay(start);
  const endDay = startOfDay(end);
  const nowDay = startOfDay(now);
  const total = endDay.getTime() - startDay.getTime();
  if (total <= 0) return nowDay >= endDay ? 100 : 0;
  if (nowDay <= startDay) return 0;
  if (nowDay >= endDay) return 100;
  const pct = ((nowDay.getTime() - startDay.getTime()) / total) * 100;
  return Math.max(0, Math.min(100, round1(pct)));
}

function gapStatusInfo(gap) {
  if (gap < -15) return { className: "bad", label: "Atraso critico" };
  if (gap < 0) return { className: "warn", label: "Em risco" };
  return { className: "ok", label: "Em dia" };
}

function projectBaselinePct(project, progressPct) {
  const series = computeSCurveDailyBaseline(project, project?.activities || null, progressPct);
  if (series && Number.isFinite(series.baselineNow)) {
    return Math.max(0, Math.min(100, round1(series.baselineNow * 100)));
  }
  return baselinePctFromDates(project?.start || project?.startDate, project?.end || project?.goLive || project?.goLiveDate);
}

function activityDueDate(activity) {
  return (
    activity?.dueDate ||
    activity?.due ||
    activity?.plannedEnd ||
    activity?.endDate ||
    activity?.end ||
    ""
  );
}

function activityDoneDate(activity) {
  return (
    activity?.dataConclusao ||
    activity?.completedAt ||
    activity?.doneAt ||
    activity?.finishedAt ||
    activity?.completed ||
    ""
  );
}

function getActivityWeight(activity) {
  const n = Number(activity?.points ?? activity?.weight ?? 1);
  return Number.isFinite(n) && n > 0 ? n : 1;
}

function computeProjectProgress01(project, tasks, progressPct = null) {
  const list = project ? flattenProjectTasks(project) : Array.isArray(tasks) ? tasks : [];
  if (list.length) {
    const metrics = projectMetrics(list);
    return clamp01((metrics?.progress ?? 0) / 100);
  }
  if (typeof progressPct === "number" && Number.isFinite(progressPct)) {
    return clamp01(progressPct / 100);
  }
  return 0;
}

function computeSCurveFromActivities(project, activities, points = 10) {
  const list = Array.isArray(activities) ? activities : Array.isArray(project?.activities) ? project.activities : [];
  const tasks = list.length ? list : flattenProjectTasks(project);
  if (!tasks.length) return null;

  const start = parseDateSafe(project?.startDate || project?.start);
  const end = parseDateSafe(project?.goLiveDate || project?.goLive || project?.end);
  if (!start || !end) return null;

  const S = startOfDay(start);
  const E = startOfDay(end);
  if (E.getTime() < S.getTime()) return null;

  const report = startOfDay(parseDateSafe(project?.reportDate) ?? new Date());
  const N = Math.max(2, points);
  const totalMs = Math.max(1, E.getTime() - S.getTime());
  const buckets = Array.from({ length: N }, (_, i) => {
    const t = S.getTime() + totalMs * (i / (N - 1));
    return startOfDay(new Date(t));
  });

  const totalW = tasks.reduce((sum, a) => sum + getActivityWeight(a), 0) || 1;

  const planned = buckets.map((b) => {
    const w = tasks.reduce((sum, a) => {
      const due = parseDateSafe(activityDueDate(a));
      const dueEff = due ? startOfDay(due) : E;
      return dueEff <= b ? sum + getActivityWeight(a) : sum;
    }, 0);
    return clamp01(w / totalW);
  });

  const actual = buckets.map((b) => {
    const w = tasks.reduce((sum, a) => {
      const done = parseDateSafe(activityDoneDate(a));
      if (!done || normalizeTaskStatus(getTaskStatus(a)) !== "concluido") return sum;
      const doneEff = startOfDay(done);
      return doneEff <= b ? sum + getActivityWeight(a) : sum;
    }, 0);
    return clamp01(w / totalW);
  });

  planned[0] = 0;
  planned[planned.length - 1] = 1;

  for (let i = 1; i < planned.length; i += 1) {
    planned[i] = Math.max(planned[i], planned[i - 1]);
  }
  for (let i = 1; i < actual.length; i += 1) {
    actual[i] = Math.max(actual[i], actual[i - 1]);
  }

  const plannedNow = clamp01(
    tasks.reduce((sum, a) => {
      const due = parseDateSafe(activityDueDate(a));
      const dueEff = due ? startOfDay(due) : E;
      return dueEff <= report ? sum + getActivityWeight(a) : sum;
    }, 0) / totalW
  );

  const actualNow = clamp01(
    tasks.reduce((sum, a) => {
      const done = parseDateSafe(activityDoneDate(a));
      if (!done || normalizeTaskStatus(getTaskStatus(a)) !== "concluido") return sum;
      const doneEff = startOfDay(done);
      return doneEff <= report ? sum + getActivityWeight(a) : sum;
    }, 0) / totalW
  );

  return { buckets, planned, actual, report, plannedNow, actualNow, start: S, end: E };
}

function buildDailyDates(start, end) {
  const S = startOfDay(start);
  const E = startOfDay(end);
  const out = [];
  for (let d = S; d <= E; d = addDays(d, 1)) out.push(new Date(d));
  return out;
}

function downsampleSeries(dates, a, b, maxPoints = 60) {
  const n = dates.length;
  if (n <= maxPoints) return { dates, a, b };
  const step = Math.ceil(n / maxPoints);
  const dsD = [];
  const dsA = [];
  const dsB = [];
  for (let i = 0; i < n; i += step) {
    dsD.push(dates[i]);
    dsA.push(a[i]);
    dsB.push(b[i]);
  }
  if (dsD[dsD.length - 1].getTime() !== dates[n - 1].getTime()) {
    dsD.push(dates[n - 1]);
    dsA.push(a[n - 1]);
    dsB.push(b[n - 1]);
  }
  return { dates: dsD, a: dsA, b: dsB };
}

function computeSCurveDailyBaseline(project, activities, progressPct = null) {
  const list = Array.isArray(activities) ? activities : Array.isArray(project?.activities) ? project.activities : [];
  const tasks = list.length ? list : flattenProjectTasks(project);
  if (!tasks.length) return null;

  const start = parseDateSafe(project?.startDate || project?.start);
  const end = parseDateSafe(project?.goLiveDate || project?.goLive || project?.end);
  if (!start || !end) return null;

  const dates = buildDailyDates(start, end);
  const totalDays = Math.max(1, dates.length - 1);
  const report = startOfDay(parseDateSafe(project?.reportDate) ?? new Date());

  const doneDates = tasks.map((t) => {
    if (normalizeTaskStatus(getTaskStatus(t)) !== "concluido") return null;
    const doneAt = parseDateSafe(activityDoneDate(t));
    return doneAt ? startOfDay(doneAt) : null;
  });
  const totalTasks = tasks.length || 1;

  const baseline = dates.map((_, i) => clamp01(i / totalDays));
  const realized = dates.map((d) => {
    const doneCount = doneDates.reduce((sum, doneAt) => {
      return doneAt && doneAt <= d ? sum + 1 : sum;
    }, 0);
    return clamp01(doneCount / totalTasks);
  });

  const startDate = dates[0];
  const endDate = dates[dates.length - 1];
  const clampedReport =
    report < startDate ? startDate : report > endDate ? endDate : report;
  const idxNow = Math.max(0, Math.min(dates.length - 1, daysDiff(clampedReport, startDate)));

  const baselineNow = baseline[idxNow];
  for (let i = 1; i < realized.length; i += 1) {
    realized[i] = Math.max(realized[i], realized[i - 1]);
  }
  const realizedNow = realized[idxNow];
  const ds = downsampleSeries(dates, baseline, realized, 60);

  return {
    start: startDate,
    end: endDate,
    report: clampedReport,
    dates: ds.dates,
    baseline: ds.a,
    realized: ds.b,
    baselineNow,
    realizedNow
  };
}

function renderSCurveSvgDaily(sc, opts = {}) {
  if (!sc || !Array.isArray(sc.dates) || sc.dates.length < 2) return "";
  const W = opts.width ?? 1760;
  const H = opts.height ?? 240;
  const c = opts.colors ?? getSystemColors();

  const pad = { l: 100, r: 18, t: 18, b: 46 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;

  const fmtBR = (d) => {
    if (!d) return "";
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  const t0 = sc.start.getTime();
  const t1 = sc.end.getTime();
  const xAtDate = (d) => pad.l + innerW * clamp01((d.getTime() - t0) / Math.max(1, t1 - t0));
  const yAt = (p) => pad.t + innerH * (1 - clamp01(p));

  const pathFrom = (arr) =>
    (arr || [])
      .map((p, i) => {
        const xx = xAtDate(sc.dates[i]);
        const yy = yAt(p);
        return `${i === 0 ? "M" : "L"} ${xx.toFixed(2)} ${yy.toFixed(2)}`;
      })
      .join(" ");

  const basePath = pathFrom(sc.baseline);
  const realPath = pathFrom(sc.realized);

  const points = sc.dates.map((d, i) => ({
    x: xAtDate(d),
    base: sc.baseline[i],
    real: sc.realized[i]
  }));
  const gapAreas = [];
  let gapArea = null;
  const addAreaPoint = (pt) => {
    gapArea.base.push({ x: pt.x, y: yAt(pt.base) });
    gapArea.real.push({ x: pt.x, y: yAt(pt.real) });
  };
  const addIntersection = (p0, p1) => {
    const g0 = p0.base - p0.real;
    const g1 = p1.base - p1.real;
    const denom = g1 - g0;
    const t = Math.abs(denom) < 1e-6 ? 0 : -g0 / denom;
    const clamped = Math.max(0, Math.min(1, t));
    const x = p0.x + (p1.x - p0.x) * clamped;
    const base = p0.base + (p1.base - p0.base) * clamped;
    const real = p0.real + (p1.real - p0.real) * clamped;
    const y = yAt(base);
    gapArea.base.push({ x, y });
    gapArea.real.push({ x, y });
  };
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const g0 = p0.base - p0.real;
    const g1 = p1.base - p1.real;
    const gap0 = g0 > 0.0001;
    const gap1 = g1 > 0.0001;

    if (gap0 && gap1) {
      if (!gapArea) {
        gapArea = { base: [], real: [] };
        addAreaPoint(p0);
      }
      addAreaPoint(p1);
      continue;
    }
    if (gap0 && !gap1) {
      if (!gapArea) {
        gapArea = { base: [], real: [] };
        addAreaPoint(p0);
      }
      addIntersection(p0, p1);
      gapAreas.push(gapArea);
      gapArea = null;
      continue;
    }
    if (!gap0 && gap1) {
      gapArea = { base: [], real: [] };
      addIntersection(p0, p1);
      addAreaPoint(p1);
    }
  }
  if (gapArea) gapAreas.push(gapArea);

  const gapPaths = gapAreas
    .filter((area) => area.base.length > 1 && area.real.length > 1)
    .map((area) => {
      const baseSegment = area.base
        .map((pt, i) => `${i === 0 ? "M" : "L"} ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`)
        .join(" ");
      const realSegment = area.real
        .slice()
        .reverse()
        .map((pt) => `L ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`)
        .join(" ");
      return `${baseSegment} ${realSegment} Z`;
    });

  const xToday = xAtDate(sc.report);
  const yBaseNow = yAt(sc.baselineNow);
  const yRealNow = yAt(sc.realizedNow);

  const basePct = Math.round(sc.baselineNow * 100);
  const realPct = Math.round(sc.realizedNow * 100);
  const gapPP = round1((sc.realizedNow - sc.baselineNow) * 100);
  const gapLabel = `${gapPP > 0 ? "+" : ""}${gapPP}pp`;
  const gapTone = gapPP < -15 ? "bad" : gapPP < 0 ? "warn" : "ok";
  const gapColor = gapTone === "bad" ? c.danger : gapTone === "warn" ? c.warn : c.ok;
  const labelText = `GAP ${gapLabel}`;
  const labelWidth = Math.max(52, labelText.length * 6.4);
  const labelHeight = 18;
  const gapLabelX = Math.max(pad.l + labelWidth / 2, Math.min(W - pad.r - labelWidth / 2, xToday));
  const gapLabelY = Math.max(pad.t + 14, Math.min(yBaseNow, yRealNow) - 18);
  const labelX = xToday;

  return `
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${W}" height="${H}" rx="14" fill="${c.bg}" stroke="${c.grid}"/>
      ${[0, 0.5, 1]
        .map((p) => {
          const yy = yAt(p);
          return `<line x1="${pad.l}" y1="${yy}" x2="${W - pad.r}" y2="${yy}" stroke="${c.grid}" stroke-width="1"/>`;
        })
        .join("")}
      <text x="${pad.l}" y="${pad.t - 6}" font-size="10" fill="${c.muted}" font-family="Arial">Progresso (%)</text>

      ${gapPaths.map((path) => `<path d="${path}" fill="${c.danger}" fill-opacity="0.12" stroke="none"/>`).join("")}

      <path d="${basePath}" fill="none" stroke="${c.planned}" stroke-width="3" stroke-dasharray="6 4"/>
      <path d="${realPath}" fill="none" stroke="${c.actual}" stroke-width="4"/>

      <line x1="${xToday}" y1="${pad.t}" x2="${xToday}" y2="${H - pad.b}" stroke="${c.danger}" stroke-width="2" opacity="0.85"/>

      <circle cx="${xToday}" cy="${yRealNow}" r="4" fill="${gapColor}" stroke="${c.bg}" stroke-width="2"/>
      <rect x="${(gapLabelX - labelWidth / 2).toFixed(2)}" y="${(gapLabelY - labelHeight).toFixed(2)}" width="${labelWidth.toFixed(2)}" height="${labelHeight}" rx="9" fill="${gapColor}" opacity="0.16" stroke="${gapColor}"/>
      <text x="${gapLabelX.toFixed(2)}" y="${(gapLabelY - 6).toFixed(2)}" text-anchor="middle" font-size="10" fill="${gapColor}" font-family="Arial" font-weight="700">${labelText}</text>

      <text x="${labelX}" y="${yBaseNow - 10}" text-anchor="middle" font-size="11" fill="${c.planned}" font-family="Arial" font-weight="700">${basePct}%</text>
      <text x="${labelX}" y="${yRealNow + 18}" text-anchor="middle" font-size="11" fill="${c.actual}" font-family="Arial" font-weight="700">${realPct}%</text>

      <text x="${pad.l}" y="${H - 26}" font-size="10" fill="${c.muted}" font-family="Arial">${fmtBR(sc.start)}</text>
      <text x="${W - pad.r}" y="${H - 26}" text-anchor="end" font-size="10" fill="${c.muted}" font-family="Arial">${fmtBR(sc.end)}</text>

    </svg>
  `;
}

function renderSCurveSvg(sc, opts = {}) {
  if (!sc || !sc.start || !sc.end || !Array.isArray(sc.buckets) || sc.buckets.length < 2) return "";
  const W = opts.width ?? 1760;
  const H = opts.height ?? 240;
  const c = opts.colors ?? getSystemColors();

  const pad = { l: 110, r: 24, t: 22, b: 44 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;

  const fmtBR = (d) => {
    if (!d) return "";
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  const xAtDate = (d) => {
    const t = d.getTime();
    const S = sc.start.getTime();
    const E = sc.end.getTime();
    const k = (t - S) / Math.max(1, E - S);
    return pad.l + innerW * clamp01(k);
  };

  const yAt = (p) => pad.t + innerH * (1 - clamp01(p));
  const x = (i) => xAtDate(sc.buckets[i]);

  const pathFrom = (arr) =>
    (arr || []).map((p, i) => `${i === 0 ? "M" : "L"} ${x(i).toFixed(2)} ${yAt(p).toFixed(2)}`).join(" ");

  const plannedPath = pathFrom(sc.planned);
  const actualPath = pathFrom(sc.actual);

  const reportDate = sc.report || sc.end;
  const xToday = xAtDate(reportDate);
  const plannedNow = clamp01(sc.plannedNow ?? 0);
  const actualNow = clamp01(sc.actualNow ?? 0);
  const yPlanNow = yAt(plannedNow);
  const yRealNow = yAt(actualNow);
  const gapPP = Math.round((actualNow - plannedNow) * 100);
  const endLabel = Math.round(1 * 100) + "%";
  const planPct = Math.round(plannedNow * 100);
  const realPct = Math.round(actualNow * 100);
  const labelX = xToday;
  const plannedLabelY = Math.max(pad.t + 10, yPlanNow - 8);
  const actualLabelY = Math.min(H - pad.b - 6, yRealNow + 14);
  const gapLabel = `Gap ${gapPP > 0 ? `+${gapPP}` : `${gapPP}`}pp`;

  const gridH = [0, 0.5, 1]
    .map((p) => {
      const yy = yAt(p);
      const lab = Math.round(p * 100) + "%";
      return `
        <line x1="${pad.l}" y1="${yy}" x2="${W - pad.r}" y2="${yy}" stroke="${c.grid}" stroke-width="1" />
        <text x="${pad.l - 8}" y="${yy + 4}" text-anchor="end" font-size="11" fill="${c.muted}" font-family="Arial">
          ${lab}
        </text>
      `;
    })
    .join("");

  return `
    <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="${W}" height="${H}" fill="${c.bg}" stroke="${c.grid}" />
      ${gridH}

      <line x1="${xToday}" y1="${pad.t}" x2="${xToday}" y2="${H - pad.b}" stroke="${c.danger}" stroke-width="2" />

      <path d="${plannedPath}" fill="none" stroke="${c.planned}" stroke-width="3" stroke-dasharray="6 4" />
      <path d="${actualPath}" fill="none" stroke="${c.actual}" stroke-width="4" />

      <circle cx="${xToday}" cy="${yPlanNow}" r="6" fill="${c.planned}" />
      <circle cx="${xToday}" cy="${yRealNow}" r="6" fill="${c.actual}" />

      <text x="${labelX}" y="${plannedLabelY}" text-anchor="middle" font-size="11" fill="${c.planned}" font-family="Arial" font-weight="700">
        ${planPct}%
      </text>
      <text x="${labelX}" y="${actualLabelY}" text-anchor="middle" font-size="11" fill="${c.actual}" font-family="Arial" font-weight="700">
        ${realPct}%
      </text>

      <text x="${xAtDate(sc.end)}" y="${yAt(1) - 8}" text-anchor="end" font-size="11" fill="${c.muted}" font-family="Arial">
        ${endLabel}
      </text>
      <text x="${pad.l}" y="${H - 18}" font-size="11" fill="${c.muted}" font-family="Arial">${fmtBR(sc.start)}</text>
      <text x="${W - pad.r}" y="${H - 18}" text-anchor="end" font-size="11" fill="${c.muted}" font-family="Arial">${fmtBR(sc.end)}</text>

      <text x="${W / 2}" y="${H - 6}" text-anchor="middle" font-size="11" fill="${c.muted}" font-family="Arial">
        ${gapLabel}
      </text>
      <text x="40" y="${H / 2}" transform="rotate(-90 40 ${H / 2})" font-size="11" fill="${c.muted}" font-family="Arial">
        Progresso acumulado (%)
      </text>
    </svg>
  `;
}

function renderOnePageSCurve({ root, project, metrics }) {
  const mount = root ? root.querySelector("#sCurveMount") : document.getElementById("sCurveMount");
  if (!mount) return;
  mount.innerHTML = "";
  const progressPct = clampPct(project?.progress ?? metrics?.progress ?? 0);
  const series = computeSCurveDailyBaseline(project, project?.activities || null, progressPct);
  const height = 240;
  mount.style.height = `${height}px`;
  mount.style.overflow = "hidden";
  const colors = getSystemColors(root || document.documentElement);
  const width = mount.clientWidth || 1760;
  if (!series) {
    mount.innerHTML = `<div class="empty">Curva S: defina Data Inicio e Go Live.</div>`;
    return;
  }
  mount.innerHTML = renderSCurveSvgDaily(series, { width, height, colors });
}

function latestCompletedTasks(tasks = [], limit = 5) {
  return tasks
    .filter((task) => normalizeTaskStatus(getTaskStatus(task)) === "concluido")
    .slice()
    .sort((a, b) => {
      const aTs = dateMetricValue(activityDoneDate(a) || a.due) ?? Number.NEGATIVE_INFINITY;
      const bTs = dateMetricValue(activityDoneDate(b) || b.due) ?? Number.NEGATIVE_INFINITY;
      if (aTs !== bTs) return bTs - aTs;
      return (a.title || "").localeCompare(b.title || "");
    })
    .slice(0, limit);
}

function buildProjectReportStyles() {
  return `
    :root {
      --bg: #f4f6fb;
      --card: #ffffff;
      --panel: #ffffff;
      --text: #1f252f;
      --muted: #7b8794;
      --border: #e4e8f0;
      --shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
      --radius: 14px;

      --ok: #16a34a;
      --warn: #f59e0b;
      --bad: #ef4444;

      --primary: #1ca7a6;
      --primary2: #0b3c5d;

      --baseline: #0f172a;
      --real: #a16207;

      --accent: #1ca7a6;
      --accent-dark: #0b3c5d;
      --accent-soft: rgba(28, 167, 166, 0.12);
      --accent-tint: #e6f6f6;
      --onepage-width: 1100px;
      --onepage-height: 0px;
    }

    * { box-sizing: border-box; }
    body {
      margin: 0;
      font-family: "Poppins", system-ui, -apple-system, sans-serif;
      color: var(--text);
      background: var(--bg);
    }

    .report-page {
      width: min(100%, var(--onepage-width));
      max-width: var(--onepage-width);
      min-height: var(--onepage-height);
      margin: 18px auto;
      padding: 0 14px 18px;
      display: grid;
      gap: 12px;
    }

    .report-page .header {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 12px;
      align-items: end;
    }

    .report-page .title {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .report-page .title h1 {
      margin: 0;
      font-size: 22px;
      letter-spacing: 0.2px;
    }

    .report-page .chips {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
    }

    .report-page .chip {
      background: rgba(15, 23, 42, 0.03);
      border: 1px solid var(--border);
      border-radius: 999px;
      padding: 8px 10px;
      display: flex;
      gap: 8px;
      align-items: baseline;
      line-height: 1;
    }

    .report-page .chip small {
      color: var(--muted);
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.6px;
    }

    .report-page .chip b {
      font-size: 12px;
      font-weight: 700;
    }

    .report-page .headerRight {
      display: flex;
      gap: 10px;
      align-items: center;
      justify-content: flex-end;
      flex-wrap: wrap;
    }

    .report-page .badge {
      border: 1px solid var(--border);
      background: var(--card);
      border-radius: 999px;
      padding: 8px 12px;
      display: flex;
      gap: 8px;
      align-items: center;
      box-shadow: var(--shadow);
      white-space: nowrap;
    }

    .report-page .badge .dot {
      width: 10px;
      height: 10px;
      border-radius: 999px;
      background: var(--muted);
    }

    .report-page .badge strong {
      font-size: 12px;
    }

    .report-page .badge span {
      font-size: 12px;
      color: var(--muted);
    }

    .report-page .dot.ok { background: var(--ok); }
    .report-page .dot.warn { background: var(--warn); }
    .report-page .dot.bad { background: var(--bad); }

    .report-page .card {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      box-shadow: var(--shadow);
      overflow: hidden;
      min-width: 0;
    }

    .report-page .cardHeader {
      padding: 10px 12px 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      border-bottom: 1px solid rgba(15, 23, 42, 0.06);
    }

    .report-page .cardHeader h2 {
      margin: 0;
      font-size: 12px;
      letter-spacing: 0.6px;
      text-transform: uppercase;
      color: var(--muted);
      font-weight: 700;
    }

    .report-page .cardBody {
      padding: 10px 12px;
    }

    .report-page .kpis {
      display: grid;
      grid-template-columns: repeat(4, minmax(160px, 1fr));
      gap: 12px;
    }

    .report-page .progress-card {
      background: var(--accent-tint);
      border-color: rgba(28, 167, 166, 0.2);
    }

    .report-page .progress-card .kpiValue {
      color: var(--accent-dark);
    }

    .report-page .kpiTop {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 10px;
    }

    .report-page .kpiValue {
      font-size: 22px;
      font-weight: 800;
      letter-spacing: -0.3px;
    }

    .report-page .kpiSub {
      margin-top: 6px;
      color: var(--muted);
      font-size: 11px;
    }

    .report-page .bar {
      margin-top: 8px;
      height: 8px;
      background: rgba(15, 23, 42, 0.06);
      border-radius: 999px;
      overflow: hidden;
    }

    .report-page .bar > i {
      display: block;
      height: 100%;
      width: 0%;
      background: linear-gradient(90deg, var(--accent-dark), var(--accent));
      border-radius: 999px;
    }

    .report-page .pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 10px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: rgba(15, 23, 42, 0.02);
      font-size: 12px;
      color: var(--muted);
      white-space: nowrap;
    }

    .report-page .pill b { color: var(--text); }

    .report-page .healthTag {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      border-radius: 999px;
      padding: 6px 10px;
      border: 1px solid var(--border);
      font-size: 12px;
      white-space: nowrap;
    }

    .report-page .healthTag.ok { background: rgba(22, 163, 74, 0.10); color: #166534; }
    .report-page .healthTag.warn { background: rgba(245, 158, 11, 0.12); color: #92400e; }
    .report-page .healthTag.bad { background: rgba(239, 68, 68, 0.12); color: #991b1b; }

    .report-page .gap-card.ok { background: rgba(22, 163, 74, 0.08); border-color: rgba(22, 163, 74, 0.22); }
    .report-page .gap-card.warn { background: rgba(245, 158, 11, 0.10); border-color: rgba(245, 158, 11, 0.22); }
    .report-page .gap-card.bad { background: rgba(239, 68, 68, 0.12); border-color: rgba(239, 68, 68, 0.3); }
    .report-page .gap-card.ok .kpiValue,
    .report-page .gap-card.ok .kpiSub { color: #166534; }
    .report-page .gap-card.warn .kpiValue,
    .report-page .gap-card.warn .kpiSub { color: #92400e; }
    .report-page .gap-card.bad .kpiValue,
    .report-page .gap-card.bad .kpiSub { color: #991b1b; }

    .report-page .mid {
      display: grid;
      grid-template-columns: 2fr 1fr;
      gap: 12px;
      align-items: stretch;
    }

    .report-page .curveMeta {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      justify-content: flex-end;
      align-items: center;
    }

    .report-page .miniStat {
      display: inline-flex;
      gap: 8px;
      align-items: center;
      padding: 6px 10px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: rgba(15, 23, 42, 0.02);
      font-size: 12px;
      color: var(--muted);
      white-space: nowrap;
    }

    .report-page .miniStat b { color: var(--text); }
    .report-page .miniStat.gap.ok b { color: var(--ok); }
    .report-page .miniStat.gap.bad b { color: var(--bad); }

    .report-page .legendDot {
      width: 10px;
      height: 10px;
      border-radius: 999px;
      background: var(--muted);
    }

    .report-page .legendDot.baseline { background: var(--baseline); }
    .report-page .legendDot.real { background: var(--real); }

    .report-page .items {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .report-page .item {
      padding: 10px 10px;
      border: 1px solid rgba(15, 23, 42, 0.08);
      border-radius: 12px;
      background: rgba(15, 23, 42, 0.015);
      display: grid;
      gap: 4px;
      min-width: 0;
    }

    .report-page .item.empty {
      border-style: dashed;
      color: var(--muted);
      background: transparent;
    }

    .report-page .itemTop {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 10px;
      min-width: 0;
    }

    .report-page .itemName {
      font-size: 12.5px;
      font-weight: 700;
      line-height: 1.2;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .report-page .itemMeta {
      font-size: 11px;
      color: var(--muted);
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .report-page .tag {
      font-size: 11px;
      padding: 3px 8px;
      border-radius: 999px;
      border: 1px solid var(--border);
      background: var(--card);
      color: var(--muted);
      white-space: nowrap;
    }

    .report-page .tag.bad { color: #991b1b; background: rgba(239, 68, 68, 0.10); }
    .report-page .tag.warn { color: #92400e; background: rgba(245, 158, 11, 0.12); }
    .report-page .tag.ok { color: #166534; background: rgba(22, 163, 74, 0.10); }

    .report-page .bottom {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 12px;
      align-items: stretch;
    }

    .report-page .svgBox {
      width: 100%;
      height: 240px;
      border-radius: 12px;
      border: 1px solid rgba(15, 23, 42, 0.08);
      background: linear-gradient(180deg, rgba(15, 23, 42, 0.02), transparent);
      overflow: hidden;
    }

    .report-page .empty {
      font-size: 12px;
      color: var(--muted);
      padding: 12px;
    }

    @media (max-width: 1100px) {
      .report-page .kpis { grid-template-columns: 1fr; }
      .report-page .mid { grid-template-columns: 1fr; }
      .report-page .bottom { grid-template-columns: 1fr; }
      .report-page .header { grid-template-columns: 1fr; }
      .report-page .headerRight { justify-content: flex-start; }
    }

    @media print {
      body { background: #fff; }
      .report-page { margin: 0; padding: 0; }
      .report-page .card,
      .report-page .badge {
        box-shadow: none;
      }
    }
  `;
}

function buildProjectReportStylesScoped() {
  return buildProjectReportStyles()
    .replace(/:root/g, "#export-onepage-root")
    .replace(/\bbody\b/g, "#export-onepage-root");
}

function buildOnePageContent({ project, client, metrics, exportMode = false }) {
  const reportMetrics = metrics || projectMetrics(flattenProjectTasks(project));
  const listLimit = exportMode ? 4 : 5;
  const { done, inProgress, nextSteps } = pickExportLists(project, listLimit);
  const schedule = computeScheduleSummary(project);
  const statusBadge = statusInfo(projectStatus(project, reportMetrics));
  const progressPct = clampPct(reportMetrics?.progress ?? project?.progress ?? 0);
  const goLiveLabel = formatDateBR(project.end || project.goLive || project.goLiveDate || "");
  const reportDate = formatDateBR(project?.reportDate || Date.now());
  const developer = project.developer || "A definir";
  const clientName = client?.name || "Cliente";
  const sCurveSeries = computeSCurveDailyBaseline(
    project,
    project?.activities || null,
    progressPct
  );
  const totalCount = reportMetrics?.total ?? schedule.total ?? 0;
  const doneCount = reportMetrics?.done ?? 0;
  const scheduleTone = schedule.overdue > 0 ? "bad" : schedule.dueSoon > 0 ? "warn" : "ok";
  const scheduleLabel = schedule.overdue > 0 ? "Em atraso" : schedule.dueSoon > 0 ? "Em risco" : "Em dia";
  const phaseLabel = project?.phaseLabel || project?.phase || statusBadge.label || "Em execucao";
  const sCurveSvg = sCurveSeries
    ? renderSCurveSvgDaily(sCurveSeries, { width: 1760, height: 240, colors: getSystemColors() })
    : `<div class="empty">Curva S: defina Data Inicio e Go Live.</div>`;
  const baselinePct = sCurveSeries ? Math.round(sCurveSeries.baselineNow * 100) : 0;
  const realizedPct = sCurveSeries ? Math.round(sCurveSeries.realizedNow * 100) : 0;
  const baselineLabel = sCurveSeries ? `${baselinePct}%` : "--";
  const realizedLabel = sCurveSeries ? `${realizedPct}%` : "--";
  const gapPP = sCurveSeries ? realizedPct - baselinePct : 0;
  const gapLabel = sCurveSeries ? `${gapPP > 0 ? "+" : ""}${gapPP}pp` : "--";
  const gapTone = !sCurveSeries ? "ok" : gapPP < -15 ? "bad" : gapPP < 0 ? "warn" : "ok";
  const gapStatusLabel = !sCurveSeries ? "Sem baseline" : gapPP < -15 ? "Atraso critico" : gapPP < 0 ? "Atraso" : "Em dia";

  const todayTs = todayStartTs();
  const urgentTasks = pickMostOverdueTasks(project, 5);
  const urgentList = urgentTasks.length
    ? urgentTasks.map((task) => renderOnePageItem(task, { todayTs })).join("")
    : renderOnePageEmptyItem("Sem atrasos no momento.");
  const topUrgent = urgentTasks[0] || null;
  const topUrgentTag = topUrgent ? taskUrgencyTag(topUrgent, todayTs) : null;
  const topUrgentDue = topUrgent ? taskDueLabel(topUrgent) : "-";
  const topUrgentStatus = topUrgent ? taskStatusInfo(getTaskStatus(topUrgent)).label : "-";

  const doneList = done.length
    ? done.map((task) => renderOnePageItem(task, { todayTs, tag: { cls: "ok", text: "Concluido" } })).join("")
    : renderOnePageEmptyItem("Sem atividades");
  const inProgressList = inProgress.length
    ? inProgress.map((task) => renderOnePageItem(task, { todayTs, tag: { cls: "warn", text: "Em andamento" } })).join("")
    : renderOnePageEmptyItem("Sem atividades");
  const nextStepsList = nextSteps.length
    ? nextSteps.map((task) => renderOnePageItem(task, { todayTs })).join("")
    : renderOnePageEmptyItem("Sem atividades");

  return `
    <div class="report-page">
      <div class="header">
        <div class="title">
          <h1>${escapeHtml(project.name || "Projeto")}</h1>
          <div class="chips">
            <div class="chip"><small>Cliente</small><b>${escapeHtml(clientName)}</b></div>
            <div class="chip"><small>Responsavel</small><b>${escapeHtml(developer)}</b></div>
            <div class="chip"><small>Data report</small><b>${escapeHtml(reportDate)}</b></div>
          </div>
        </div>

        <div class="headerRight">
          <div class="badge">
            <i class="dot ${scheduleTone}"></i>
            <strong>Status:</strong>
            <span>${escapeHtml(statusBadge.label)}</span>
          </div>
          <div class="badge">
            <i class="dot ${scheduleTone}"></i>
            <strong>Go Live:</strong>
            <span>${escapeHtml(goLiveLabel || "-")}</span>
          </div>
        </div>
      </div>

      <div class="kpis">
        <div class="card progress-card">
          <div class="cardHeader">
            <h2>Progresso</h2>
            <span class="pill"><b>${doneCount}</b> / ${totalCount} concluidas</span>
          </div>
          <div class="cardBody">
            <div class="kpiTop">
              <div class="kpiValue">${progressPct}%</div>
              <span class="healthTag ${scheduleTone}">${scheduleLabel}</span>
            </div>
            <div class="bar"><i style="width:${progressPct}%"></i></div>
            <div class="kpiSub">${escapeHtml(phaseLabel)}</div>
          </div>
        </div>

        <div class="card">
          <div class="cardHeader">
            <h2>Previsto</h2>
            <span class="pill">Baseline</span>
          </div>
          <div class="cardBody">
            <div class="kpiTop">
              <div class="kpiValue">${baselineLabel}</div>
            </div>
            <div class="kpiSub">Meta para hoje</div>
          </div>
        </div>

        <div class="card gap-card ${gapTone}">
          <div class="cardHeader">
            <h2>GAP (pp)</h2>
            <span class="pill">${gapStatusLabel}</span>
          </div>
          <div class="cardBody">
            <div class="kpiTop">
              <div class="kpiValue">${gapLabel}</div>
            </div>
            <div class="kpiSub">Desvio atual</div>
          </div>
        </div>

        <div class="card">
          <div class="cardHeader">
            <h2>Cronograma</h2>
            <span class="healthTag ${scheduleTone}">${scheduleLabel}</span>
          </div>
          <div class="cardBody">
            <div class="kpiTop">
              <div class="kpiValue" style="font-size:20px">${schedule.overdue} atrasada(s)</div>
              <span class="pill">${
                schedule.dueSoon ? `+ <b>${schedule.dueSoon}</b> vencem em 7 dias` : "Sem vencimentos em 7 dias"
              }</span>
            </div>
            <div class="kpiSub">
              Total: <b>${schedule.total}</b> • Em andamento: <b>${schedule.inProgress}</b> • Concluidas: <b>${doneCount}</b>
            </div>
          </div>
        </div>

      </div>

      <div class="mid">
        <div class="card">
          <div class="cardHeader">
            <h2>Curva S - Avanco fisico acumulado</h2>
            <div class="curveMeta">
              <span class="miniStat"><i class="legendDot baseline"></i> Baseline <b>${baselineLabel}</b></span>
              <span class="miniStat"><i class="legendDot real"></i> Realizado <b>${realizedLabel}</b></span>
              <span class="miniStat gap ${gapTone}"><b>GAP ${gapLabel}</b></span>
            </div>
          </div>
          <div class="cardBody">
            <div id="sCurveMount" class="svgBox">${sCurveSvg}</div>
          </div>
        </div>

        <div class="card">
          <div class="cardHeader">
            <h2>Mais urgente</h2>
            <span class="pill">Top <b>${urgentTasks.length}</b></span>
          </div>
          <div class="cardBody">
            <div class="items">${urgentList}</div>
          </div>
        </div>
      </div>

      <div class="bottom">
        <div class="card">
          <div class="cardHeader">
            <h2>Ultimas concluidas</h2>
            <span class="pill">Top <b>${done.length}</b></span>
          </div>
          <div class="cardBody">
            <div class="items">${doneList}</div>
          </div>
        </div>

        <div class="card">
          <div class="cardHeader">
            <h2>Em andamento</h2>
            <span class="pill">Top <b>${inProgress.length}</b></span>
          </div>
          <div class="cardBody">
            <div class="items">${inProgressList}</div>
          </div>
        </div>

        <div class="card">
          <div class="cardHeader">
            <h2>Proximos passos</h2>
            <span class="pill">Top <b>${nextSteps.length}</b></span>
          </div>
          <div class="cardBody">
            <div class="items">${nextStepsList}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function buildProjectReportSection({ project, client, metrics }) {
  return buildOnePageContent({ project, client, metrics });
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
      ${buildOnePageContent({ project, client, metrics })}
    </body>
  </html>`;
}

function renderOnePageExportHtml({ project, client, metrics }) {
  return `<style>${buildProjectReportStylesScoped()}
    #export-onepage-root {
      --onepage-width: 1920px;
      --onepage-height: 1080px;
      --bg: #ffffff;
      width: 1920px;
      height: 1080px;
    }
    #export-onepage-root .report-page {
      margin: 0;
      width: 100%;
      height: 100%;
      padding: 24px;
      box-sizing: border-box;
      gap: 14px;
      grid-template-rows: 110px 140px 340px 1fr;
      overflow: hidden;
    }
    #export-onepage-root .report-page > * {
      min-height: 0;
    }
    #export-onepage-root .mid,
    #export-onepage-root .bottom {
      min-height: 0;
    }
    #export-onepage-root .card {
      min-height: 0;
    }
  </style>
    ${buildOnePageContent({ project, client, metrics, exportMode: true })}`;
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
  saveLocalState();
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
  const priorFrame = document.getElementById("export-onepage-frame");
  if (priorFrame) priorFrame.remove();

  const reportFrame = document.createElement("iframe");
  reportFrame.id = "export-onepage-frame";
  reportFrame.setAttribute("aria-hidden", "true");
  reportFrame.src = `onepage.html${buildOnePageQuery(project, client)}`;
  reportFrame.style.position = "fixed";
  reportFrame.style.left = "-10000px";
  reportFrame.style.top = "0";
  reportFrame.style.width = "1280px";
  reportFrame.style.height = "900px";
  reportFrame.style.border = "0";
  reportFrame.style.opacity = "0";
  reportFrame.style.pointerEvents = "none";
  document.body.appendChild(reportFrame);

  try {
    await new Promise((resolve, reject) => {
      reportFrame.onload = () => resolve();
      reportFrame.onerror = () => reject(new Error("Falha ao carregar o relatorio."));
    });

    const frameDoc = reportFrame.contentDocument;
    const captureEl = frameDoc?.getElementById("onepageRoot") || frameDoc?.body;
    if (!captureEl) {
      throw new Error("Conteudo do relatorio nao encontrado.");
    }

    if (frameDoc?.fonts?.ready) await frameDoc.fonts.ready;
    await sleep(80);
    await waitForImages(captureEl);
    await new Promise((resolve) => requestAnimationFrame(resolve));

    const rect = captureEl.getBoundingClientRect();
    let pageW = Math.ceil(rect.width || captureEl.scrollWidth || 1280);
    let pageH = Math.ceil(rect.height || captureEl.scrollHeight || 900);
    if (pageW && pageH) {
      reportFrame.style.width = `${pageW}px`;
      reportFrame.style.height = `${pageH}px`;
      await sleep(80);
    } else {
      pageW = 1280;
      pageH = 900;
    }

    const canvas = await window.html2canvas(captureEl, {
      scale: 2,
      backgroundColor: "#ffffff",
      useCORS: true,
      allowTaint: true,
      scrollX: 0,
      scrollY: 0,
      width: pageW,
      height: pageH,
      windowWidth: pageW,
      windowHeight: pageH,
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
    const pdf = new JsPDF({
      orientation: pageW >= pageH ? "landscape" : "portrait",
      unit: "px",
      format: [pageW, pageH]
    });
    pdf.addImage(imgData, "JPEG", 0, 0, pageW, pageH, undefined, "FAST");

    pdf.save(filename);
  } catch (err) {
    console.error(err);
    alert(`Falha ao exportar PDF: ${err.message || err}`);
  } finally {
    reportFrame.remove();
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
    { label: "Nao iniciado", value: schedule.planned, fill: "F1F2F6", text: "6B7280" },
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
  return "Nao iniciado";
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
      if (normalizeTaskStatus(getTaskStatus(t)) === "concluido") continue;

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

      const counters = { "Nao iniciado": 0, "Em andamento": 0, Atrasado: 0, Concluido: 0 };
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
            <div class="chip planned">Nao iniciado: ${card.counters["Nao iniciado"] || 0}</div>
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
  setupProgressPopover();
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
  document.querySelectorAll("#client-list .project-chip").forEach((chip) => {
    chip.classList.toggle("active", chip.textContent === name);
  });
}

function ensureSelectedImprovement() {
  if (!Array.isArray(state.improvements) || !state.improvements.length) {
    state.selectedImprovement = null;
    return;
  }
  if (!state.selectedImprovement) {
    state.selectedImprovement = state.improvements[0];
    return;
  }
  const match = state.improvements.find((item) => item.id === state.selectedImprovement.id);
  state.selectedImprovement = match || state.improvements[0];
}

function highlightActiveImprovement() {
  const activeId = state.selectedImprovement?.id;
  document.querySelectorAll("#improvement-list [data-improvement-id]").forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.improvementId === activeId);
  });
}

function renderImprovementList() {
  const list = byId("improvement-list");
  if (!list) return;
  list.innerHTML = "";
  ensureSelectedImprovement();
  if (!state.improvements.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = "Nenhuma melhoria cadastrada.";
    list.appendChild(empty);
    return;
  }
  state.improvements.forEach((improvement) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "project-chip";
    btn.dataset.improvementId = improvement.id;
    btn.textContent = improvement.name;
    btn.addEventListener("click", () => openImprovement(improvement));
    list.appendChild(btn);
  });
  highlightActiveImprovement();
}

function openImprovement(improvement) {
  if (!improvement) return;
  state.selectedImprovement = improvement;
  state.currentSection = "minhas-melhorias";
  setActiveNav(state.currentSection);
  renderImprovementList();
  renderMain();
}

function improvementScheduleStatus(improvement) {
  const end = parseTaskDate(improvement?.end);
  if (!end) return "em_dia";
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const progress = clampPct(improvement?.progress || 0);
  if (end.getTime() < today && progress < 100) return "em_atraso";
  return "em_dia";
}

function renderImprovementsDashboard(container) {
  setCrumbPathText("Dashboard Melhorias");
  const header = document.createElement("div");
  header.className = "section-header span-all";
  header.innerHTML = `
    <div class="header-row">
      <h2>Resumo de Melhorias</h2>
    </div>
    <div class="muted">Demandas menores separadas dos projetos principais.</div>
  `;

  const table = document.createElement("div");
  table.className = "table-card span-all";
  const rows = state.improvements
    .map((item) => {
      const statusBadge = statusInfo(item.status);
      const scheduleBadge = scheduleStatusInfo(improvementScheduleStatus(item));
      const progress = clampPct(item.progress || 0);
      return `
        <tr data-improvement-row="${item.id}">
          <td>${escapeHtml(item.name)}</td>
          <td>${escapeHtml(item.client || "-")}</td>
          <td>${escapeHtml(item.owner || "A definir")}</td>
          <td><span class="pill ${statusBadge.className}">${statusBadge.label}</span></td>
          <td>${progress}%</td>
          <td><span class="pill ${scheduleBadge.className}">${scheduleBadge.label}</span></td>
        </tr>
      `;
    })
    .join("");
  table.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Melhoria</th>
          <th>Cliente</th>
          <th>Responsavel</th>
          <th>Status</th>
          <th>Progresso</th>
          <th>Prazo</th>
        </tr>
      </thead>
      <tbody>
        ${rows || `<tr><td colspan="6">Nenhuma melhoria cadastrada.</td></tr>`}
      </tbody>
    </table>
  `;

  table.querySelectorAll("[data-improvement-row]").forEach((row) => {
    row.addEventListener("click", () => {
      const improvement = state.improvements.find((item) => item.id === row.dataset.improvementRow);
      if (improvement) openImprovement(improvement);
    });
  });

  container.appendChild(header);
  container.appendChild(table);
}

function renderImprovementDetail(container) {
  const improvement = state.selectedImprovement;
  setCrumbPathText(improvement ? `Melhorias / ${improvement.name}` : "Melhorias");
  if (!improvement) {
    container.innerHTML = `<div class="empty-state span-all" style="text-align: center; padding: 40px;">
      <h2>Nenhuma melhoria selecionada</h2>
      <p>Selecione uma melhoria na barra lateral para ver os detalhes.</p>
    </div>`;
    return;
  }

  const statusBadge = statusInfo(improvement.status);
  const scheduleBadge = scheduleStatusInfo(improvementScheduleStatus(improvement));
  const progress = clampPct(improvement.progress || 0);
  const baselinePct = baselinePctFromDates(improvement.start, improvement.end);
  const gap = round1(progress - baselinePct);
  const gapStatus = gapStatusInfo(gap);
  const baselineLabel = formatMetric(baselinePct);
  const gapLabel = formatSignedMetric(gap);

  const headerCard = document.createElement("div");
  headerCard.className = "card project-header span-all";
  headerCard.innerHTML = `
    <div class="project-header-top">
      <div>
        <h2>${escapeHtml(improvement.name)}</h2>
        <div class="project-subtitle">${escapeHtml(improvement.client || "Cliente")}</div>
      </div>
      <div class="project-header-badges">
        <span class="pill project-status ${statusBadge.className}">${statusBadge.label}</span>
        <span class="pill schedule-status ${scheduleBadge.className}">${scheduleBadge.label}</span>
      </div>
    </div>
    <div class="project-meta-grid">
      <div class="meta-item">
        <div class="label">Cliente</div>
        <div class="value">${escapeHtml(improvement.client || "-")}</div>
      </div>
      <div class="meta-item">
        <div class="label">Responsavel</div>
        <div class="value">${escapeHtml(improvement.owner || "A definir")}</div>
      </div>
      <div class="meta-item">
        <div class="label">Data inicio</div>
        <div class="value">${formatDateBR(improvement.start) || "-"}</div>
      </div>
      <div class="meta-item">
        <div class="label">Prazo</div>
        <div class="value">${formatDateBR(improvement.end) || "-"}</div>
      </div>
    </div>
    <div>
      <div class="label">Progresso (%)</div>
      <div class="progress"><div class="progress-bar" style="width: ${progress}%"></div></div>
      <div class="value" style="margin-top:6px;">${progress}% concluido</div>
    </div>
  `;

  const metricsGrid = document.createElement("div");
  metricsGrid.className = "metrics-grid span-all";
  metricsGrid.innerHTML = `
    <div class="metric-card">
      <div class="label">Status</div>
      <div class="value">${statusBadge.label}</div>
    </div>
    <div class="metric-card">
      <div class="label">Prazo</div>
      <div class="value">${scheduleBadge.label}</div>
    </div>
    <div class="metric-card">
      <div class="label">% Progresso</div>
      <div class="value">${progress}%</div>
    </div>
    <div class="metric-card">
      <div class="label">Responsavel</div>
      <div class="value">${escapeHtml(improvement.owner || "A definir")}</div>
    </div>
  `;

  const performanceGrid = document.createElement("div");
  performanceGrid.className = "metrics-grid performance-grid span-all";
  performanceGrid.innerHTML = `
    <div class="metric-card">
      <div class="label">Previsto (baseline)</div>
      <div class="value">${baselineLabel}%</div>
      <div class="sub">Meta para hoje</div>
    </div>
    <div class="metric-card gap ${gapStatus.className}">
      <div class="label">GAP (pp)</div>
      <div class="value">${gapLabel}pp</div>
      <div class="sub">${gapStatus.label}</div>
    </div>
  `;

  container.appendChild(headerCard);
  container.appendChild(performanceGrid);
  container.appendChild(metricsGrid);
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
  setCrumbPathText("Inicio");
  container.innerHTML = renderHomeMacroSummary();
}

function removeRelatorioStyles() {
  const priorStyles = document.getElementById("onepage-styles");
  if (priorStyles) {
    priorStyles.remove();
  }
}

function buildOnePageQuery(project, client) {
  const params = new URLSearchParams();
  if (client?.id) {
    params.set("clientId", client.id);
  } else if (client?.name) {
    params.set("client", client.name);
  }
  if (project?.id) {
    params.set("projectId", project.id);
  } else if (project?.name) {
    params.set("project", project.name);
  }
  const query = params.toString();
  return query ? `?${query}` : "";
}

function renderRelatorioSection() {
  const contentArea = byId("dashboard-panels");
  const project = state.selectedProject;
  const client = state.selectedClient;

  setCrumbPathText("Relatório do Projeto");

  if (!project || !client) {
    contentArea.innerHTML = `<div class="empty-state span-all" style="text-align: center; padding: 40px;">
      <h2>Nenhum projeto selecionado</h2>
      <p>Por favor, selecione um projeto na barra lateral ou no dashboard para gerar um relatório.</p>
    </div>`;
    return;
  }

  const reportWrapper = document.createElement("div");
  reportWrapper.className = "span-all report-embed";

  saveLocalState();

  const reportFrame = document.createElement("iframe");
  reportFrame.className = "onepage-frame";
  reportFrame.title = "Relatorio do Projeto";
  reportFrame.loading = "lazy";
  reportFrame.src = `onepage.html${buildOnePageQuery(project, client)}`;
  reportWrapper.appendChild(reportFrame);

  contentArea.innerHTML = "";
  contentArea.appendChild(reportWrapper);
}

function renderMain() {
  removeRelatorioStyles(); 

  const { selectedClient, selectedProject } = state;
  const panels = byId("dashboard-panels");
  panels.innerHTML = "";
  setActiveNav(state.currentSection);
  updateTopActions();

  if (state.currentSection === "dashboard-melhorias" || state.currentSection === "minhas-melhorias") {
    state.currentSection = "dashboard";
  }

  if (state.currentSection === "inicio") {
    renderHome(panels);
    return;
  }

  if (state.currentSection === "dashboard") {
    renderDashboard(panels);
    return;
  }

  if (state.currentSection === "relatorio") {
    renderRelatorioSection();
    return;
  }

  if (!selectedClient || !selectedProject) {
    panels.innerHTML = `<div class="empty-state span-all" style="text-align: center; padding: 40px;"><h2>Bem-vindo!</h2><p>Selecione um cliente e um projeto na barra lateral para começar.</p></div>`;
    return;
  }

  setCrumbPathProject(selectedClient, selectedProject);

  const metrics = projectMetrics(selectedProject.tasks || []);
  const status = projectStatus(selectedProject, metrics);
  const statusBadge = statusInfo(status);
  const scheduleBadge = scheduleStatusInfo(projectScheduleStatus(selectedProject));
  const progressPct = clampPct(metrics.progress ?? selectedProject.progress ?? 0);
  const sCurveSeries = computeSCurveDailyBaseline(selectedProject, selectedProject?.tasks || null, progressPct);
  const baselinePct = sCurveSeries ? round1(sCurveSeries.baselineNow * 100) : projectBaselinePct(selectedProject, progressPct);
  const realizedPct = sCurveSeries ? round1(sCurveSeries.realizedNow * 100) : progressPct;
  const gap = round1(realizedPct - baselinePct);
  const gapStatus = gapStatusInfo(gap);
  const baselineLabel = formatMetric(baselinePct);
  const gapLabel = formatSignedMetric(gap);

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
  `;

  const performanceGrid = document.createElement("div");
  performanceGrid.className = "metrics-grid performance-grid project-performance-grid span-all";
  performanceGrid.innerHTML = `
    <div class="metric-card performance-card realizado">
      <div class="label">Realizado (%)</div>
      <div class="value">${progressPct}%</div>
      <div class="sub">Atividades concluidas</div>
    </div>
    <div class="metric-card performance-card previsto">
      <div class="label">Previsto (Baseline)</div>
      <div class="value">${baselineLabel}%</div>
      <div class="sub">Meta para hoje</div>
    </div>
    <div class="metric-card performance-card gap ${gapStatus.className}">
      <div class="label">GAP (Desvio)</div>
      <div class="value">${gapLabel}pp</div>
      <div class="sub">${gapStatus.label}</div>
    </div>
  `;

  const progressCompare = document.createElement("div");
  progressCompare.className = "card progress-compare span-all";
  progressCompare.innerHTML = `
    <div class="progress-compare-head">
      <div class="label">Avanco vs meta</div>
      <div class="meta">Realizado <b>${progressPct}%</b> | Previsto <b>${baselineLabel}%</b></div>
    </div>
    <div class="progress-track">
      <div class="progress-fill ${gapStatus.className}" style="width: ${progressPct}%" data-value="${progressPct}%"></div>
      <div class="progress-marker" style="left: ${baselinePct}%"><span>Meta</span></div>
    </div>
  `;

  const metricsGrid = document.createElement("div");
  metricsGrid.className = "metrics-grid project-metrics-grid span-all";
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
      <div class="value">${progressPct}%</div>
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
  const tasksHeader = document.createElement("div");
  tasksHeader.className = "task-row header";
  tasksHeader.innerHTML = `
    <div>Atividade</div>
    <div>Data inicio</div>
    <div>Data fim</div>
    <div>%</div>
    <div>Status</div>
    <div>Saude</div>
    <div></div>
  `;
  tasksBox.appendChild(tasksHeader);

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
            const info = taskStatusInfo(getTaskStatus(task));
            const health = taskHealthInfo(task);
            const title = formatTaskTitle(task.title, sub.title);
            const startLabel = formatDateBR(taskStartStr(task));
            const endLabel = formatDateBR(taskDueStr(task));
            const progressLabel = `${taskProgressValue(task)}%`;
            row.innerHTML = `
              <div>${title}</div>
              <div style="color: var(--muted); font-weight:500;">${startLabel}</div>
              <div style="color: var(--muted); font-weight:500;">${endLabel}</div>
              <button type="button" class="task-progress-btn" data-task-edit data-task-index="${task._idx}">
                ${progressLabel}
              </button>
              <button class="pill ${info.className} status-btn" data-task-index="${task._idx}">
                ${info.label}
              </button>
              <span class="pill ${health.className}">${health.label}</span>
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
        const info = taskStatusInfo(getTaskStatus(task));
        const health = taskHealthInfo(task);
        const startLabel = formatDateBR(taskStartStr(task));
        const endLabel = formatDateBR(taskDueStr(task));
        const progressLabel = `${taskProgressValue(task)}%`;
        row.innerHTML = `
          <div>${task.title}</div>
          <div style="color: var(--muted); font-weight:500;">${startLabel}</div>
          <div style="color: var(--muted); font-weight:500;">${endLabel}</div>
          <button type="button" class="task-progress-btn" data-task-edit data-task-index="${task._idx}">
            ${progressLabel}
          </button>
          <button class="pill ${info.className} status-btn" data-task-index="${task._idx}">
            ${info.label}
          </button>
          <span class="pill ${health.className}">${health.label}</span>
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
  panels.appendChild(performanceGrid);
  panels.appendChild(progressCompare);
  panels.appendChild(metricsGrid);
  panels.appendChild(tasksCard);
}

function wireNav() {
  document.body.addEventListener("click", (e) => {
    const crumbLink = e.target.closest(".crumb-link[data-crumb]");
    if (crumbLink) {
      const target = crumbLink.dataset.crumb;
      if (target === "home") {
        state.currentSection = "inicio";
        setActiveNav(state.currentSection);
        renderMain();
        return;
      }
      if (target === "client") {
        if (state.selectedClient) {
          ensureDashboardState();
          state.dashboard.filters = { clientName: [state.selectedClient.name] };
          state.currentSection = "dashboard";
          setActiveNav(state.currentSection);
          renderMain();
        }
        return;
      }
      if (target === "project") {
        if (state.selectedClient && state.selectedProject) {
          openProject(state.selectedClient, state.selectedProject);
        }
        return;
      }
    }

    const navBtn = e.target.closest(".nav-link, .btn[data-section]");
    if (!navBtn) return;

    const section = navBtn.dataset.section;
    if (section === "sair") {
      logout();
      return;
    }
    if (section === "meus-projetos") {
      navBtn.classList.toggle("open");
      return;
    }
    
    state.currentSection = section || "inicio";
    setActiveNav(state.currentSection);
    renderMain();
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
      const progress = normalizeTaskProgress(data.get("progress"));
      const task = {
        title: data.get("title"),
        phase: data.get("phase"),
        package: data.get("package") || "",
        start: data.get("start"),
        due: data.get("due"),
        status: data.get("status"),
        progress
      };
      applyTaskStatus(task, task.status);
      if (state.editingTaskIndex !== null && state.editingTaskIndex !== undefined) {
        const idx = Number(state.editingTaskIndex);
        const currentTask = selectedProject.tasks?.[idx];
        if (!currentTask) return;
        const payload = { ...currentTask, ...task };
        applyTaskStatus(payload, payload.status);
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
    form.elements.start.value = taskStartStr(task);
    form.elements.due.value = task.due || "";
    const progressValue = taskProgress(task);
    form.elements.progress.value = progressValue != null ? progressValue : "";
    form.elements.status.value = normalizeTaskStatus(getTaskStatus(task));
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

function openImprovementModal(improvementId = null) {
  const modal = byId("improvement-modal");
  const form = byId("improvement-form");
  const title = byId("improvement-modal-title");
  if (!modal || !form) return;
  const improvement = state.improvements.find((item) => item.id === improvementId) || null;
  state.editingImprovementId = improvement?.id || null;
  form.elements.name.value = improvement?.name || "";
  form.elements.client.value = improvement?.client || "";
  form.elements.owner.value = improvement?.owner || "";
  form.elements.start.value = improvement?.start || "";
  form.elements.end.value = improvement?.end || "";
  form.elements.status.value = improvement?.status || "planejado";
  form.elements.progress.value = improvement?.progress ?? 0;
  if (title) title.textContent = improvement ? "Editar Melhoria" : "Nova Melhoria";
  showModal(modal);
}

function resetImprovementModal() {
  const form = byId("improvement-form");
  const title = byId("improvement-modal-title");
  state.editingImprovementId = null;
  if (form) form.reset();
  if (title) title.textContent = "Nova Melhoria";
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
      label: "Nao iniciado",
      className: "planejado"
    }
  );
}

function normalizeTaskStatus(status) {
  const value = normStatus(status);
  if (!value) return "planejado";
  if (STATUS_DONE.has(value)) return "concluido";
  if (STATUS_VALIDATION.has(value)) return "em_validacao";
  if (STATUS_IN_PROGRESS.has(value)) return "em_andamento";
  if (value === "parado") return "parado";
  if (STATUS_PLANNED.has(value)) return "planejado";
  return value.replace(/\s+/g, "_");
}

function applyTaskStatus(task, status) {
  if (!task) return;
  task.status = status;
  const normalized = normalizeTaskStatus(status);
  if (normalized === "concluido") {
    if (!task.dataConclusao) {
      task.dataConclusao = new Date().toISOString().slice(0, 10);
    }
    return;
  }
  task.dataConclusao = null;
}

function taskStatusInfo(status) {
  const normalized = normalizeTaskStatus(status);
  return (
    TASK_STATUS_OPTIONS.find((opt) => opt.value === normalized) || {
      label: "Nao iniciado",
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

function taskHealthRank(task) {
  const due = taskDueValueSafe(task);
  if (!Number.isFinite(due) || due === Number.POSITIVE_INFINITY) return 3;
  const today = todayStartTs();
  if (due < today) return 0;
  const riskLimit = today + 7 * 24 * 60 * 60 * 1000;
  if (due <= riskLimit) return 1;
  return 2;
}

function taskHealthInfo(task) {
  if (isDoneTask(task)) return { label: "Em dia", className: "em-dia" };
  const due = taskDueValueSafe(task);
  if (!Number.isFinite(due) || due === Number.POSITIVE_INFINITY) {
    return { label: "Sem prazo", className: "sem-prazo" };
  }
  const today = todayStartTs();
  if (due < today) return { label: "Em Atraso", className: "em-atraso" };
  const riskLimit = today + 7 * 24 * 60 * 60 * 1000;
  if (due <= riskLimit) return { label: "Em risco", className: "em-risco" };
  return { label: "Em dia", className: "em-dia" };
}

function projectScheduleStatus(project) {
  const tasks = Array.isArray(project?.tasks) ? project.tasks : [];
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const hasOverdue = tasks.some((task) => {
    if (normalizeTaskStatus(getTaskStatus(task)) === "concluido") return false;
    const dt = parseTaskDate(task.due);
    return dt && dt.getTime() < today;
  });
  return hasOverdue ? "em_atraso" : "em_dia";
}

function setupStatusPopover() {
  const popover = byId("status-popover");
  const select = byId("status-select");
  select.innerHTML = "";
  TASK_STATUS_OPTIONS.forEach((opt) => {
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
      hideProgressPopover();
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
    const task = state.selectedProject.tasks[idx];
    applyTaskStatus(task, select.value);
    const statusPayload = { status: task.status, dataConclusao: task.dataConclusao ?? null };
    if (db && state.selectedProject.id && task.id) {
      updateTaskStatusOnDb(state.selectedProject.clientId, state.selectedProject.id, task.id, statusPayload)
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

function setupProgressPopover() {
  const popover = byId("progress-popover");
  const input = byId("progress-input");
  const saveBtn = byId("progress-save-btn");

  document.body.addEventListener("click", (e) => {
    const btn = e.target.closest(".task-progress-btn");
    if (btn) {
      hideStatusPopover();
      hideTaskActionsPopover();
      openProgressPopover(btn);
      return;
    }
    if (!e.target.closest("#progress-popover")) {
      hideProgressPopover();
    }
  });

  const applyChange = () => {
    const idx = Number(popover.dataset.taskIndex);
    if (Number.isNaN(idx) || !state.selectedProject) return;
    const task = state.selectedProject.tasks?.[idx];
    if (!task) return;
    const next = normalizeTaskProgress(input.value);
    const progress = next == null ? 0 : next;
    task.progress = progress;
    if (db && state.selectedProject.id && task.id) {
      updateTaskProgressOnDb(state.selectedProject.clientId, state.selectedProject.id, task.id, progress)
        .then(() => {
          hideProgressPopover();
          renderMain();
        })
        .catch((err) => {
          console.error(err);
          alert("Erro ao atualizar percentual no Firebase.");
        });
      return;
    }
    saveLocalState();
    hideProgressPopover();
    renderMain();
  };

  saveBtn.addEventListener("click", applyChange);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      applyChange();
    }
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
  hideProgressPopover();
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

function openProgressPopover(target) {
  const popover = byId("progress-popover");
  const input = byId("progress-input");
  const idx = Number(target.dataset.taskIndex);
  popover.dataset.taskIndex = idx;
  const task = state.selectedProject?.tasks?.[idx];
  const value = taskProgress(task);
  input.value = value != null ? value : taskProgressValue(task);
  const rect = target.getBoundingClientRect();
  popover.style.top = `${rect.bottom + window.scrollY + 6}px`;
  popover.style.left = `${rect.left + window.scrollX}px`;
  popover.classList.add("show");
  input.focus();
  input.select();
}

function hideProgressPopover() {
  byId("progress-popover").classList.remove("show");
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
    if (!auth) {
      if (errEl) {
        errEl.textContent = "Login indisponivel no momento. Tente novamente.";
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
  wireLogin();
  const ok = await initFirebase();
  if (!ok) return;
  if (!firebase?.auth) {
    console.error("Firebase Auth nao carregado.");
    return;
  }
  auth = firebase.auth();

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
    start: task.start,
    due: task.due,
    status: task.status,
    progress: task.progress,
    ...(task.dataConclusao ? { dataConclusao: task.dataConclusao } : {}),
    createdAt: firebase.database.ServerValue.TIMESTAMP
  });
}

async function updateTaskStatusOnDb(clientId, projectId, taskId, payload) {
  await db.ref(`clients/${clientId}/projects/${projectId}/tasks/${taskId}`).update(payload);
}

async function updateTaskProgressOnDb(clientId, projectId, taskId, progress) {
  await db.ref(`clients/${clientId}/projects/${projectId}/tasks/${taskId}`).update({ progress });
}

async function updateTaskOnDb(clientId, projectId, taskId, payload) {
  const updatePayload = {
    title: payload.title,
    phase: payload.phase,
    package: payload.package,
    start: payload.start,
    due: payload.due,
    status: payload.status,
    progress: payload.progress
  };
  if ("dataConclusao" in payload) {
    updatePayload.dataConclusao = payload.dataConclusao;
  }
  await db.ref(`clients/${clientId}/projects/${projectId}/tasks/${taskId}`).update(updatePayload);
}

async function deleteTaskFromDb(clientId, projectId, taskId) {
  await db.ref(`clients/${clientId}/projects/${projectId}/tasks/${taskId}`).remove();
}

async function updateProjectPackagesOnDb(clientId, projectId, packages) {
  await db.ref(`clients/${clientId}/projects/${projectId}`).update({ packages });
}

function projectMetrics(tasks = []) {
  const total = tasks.length;
  const done = tasks.filter((t) => isDoneTask(t)).length;
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
  const key = normalizeTaskStatus(status);
  if (key === "em_andamento" || key === "em_validacao") return 0;
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
  const hasWorkStarted = (project.tasks || []).some((t) => normalizeTaskStatus(getTaskStatus(t)) !== "planejado");
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
  setCrumbPathText("Dashboard Projetos");
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
