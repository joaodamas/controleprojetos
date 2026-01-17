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
  },
  monitor: {
    filters: {
      client: "",
      project: "",
      responsible: ""
    }
  }
};

const LOCAL_STORAGE_KEY = "controle_projetos_state_v1";
const ADMIN_EMAILS = new Set(["joaodamasit@gmail.com"]);

function isAdminEmail(email) {
  if (!email) return false;
  return ADMIN_EMAILS.has(String(email).trim().toLowerCase());
}

function clientDataRootPath(user = auth?.currentUser) {
  if (isAdminEmail(user?.email)) return "clients";
  const uid = user?.uid;
  return uid ? `tenants/${uid}/clients` : "clients";
}

function clientDataRootRef(user = auth?.currentUser) {
  if (!db) return null;
  const path = clientDataRootPath(user);
  return path ? db.ref(path) : null;
}

function clientDocRef(clientId, user = auth?.currentUser) {
  const root = clientDataRootRef(user);
  return root && clientId ? root.child(clientId) : null;
}

const STATUS_OPTIONS = [
  { value: "planejado", label: "Planejado", className: "planejado" },
  { value: "em_andamento", label: "Em andamento", className: "em-andamento" },
  { value: "em_validacao", label: "Em validacao", className: "em-validacao" },
  { value: "atrasado", label: "Atrasado", className: "atrasado" },
  { value: "concluido", label: "Concluido", className: "concluido" }
];

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

const DASHBOARD_COLUMNS = [
  { key: "name", label: "Projeto", type: "text" },
  { key: "clientName", label: "Cliente", type: "text" },
  { key: "developer", label: "Responsavel", type: "text" },
  { key: "status", label: "Status", type: "text" },
  { key: "progress", label: "Progresso", type: "number" },
  { key: "baseline", label: "Previsto", type: "number" },
  { key: "gap", label: "GAP (pp)", type: "number" },
  { key: "goLive", label: "Go Live previsto", type: "date" }
];

const DEFAULT_EPICS = ["LEVANTAMENTO", "DESENVOLVIMENTO", "TESTES", "DEPLOY"];
const PACKAGE_PHASES = ["DESENVOLVIMENTO", "TESTES"];

const PHASE_ORDER = ["LEVANTAMENTO", "DESENVOLVIMENTO", "TESTES", "DEPLOY", "GESTAO", "OUTROS"];
const CLIENT_COLOR_PALETTE = ["#0f766e", "#1d4ed8", "#b45309", "#0f7660", "#be123c", "#334155"];

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
  const rootRef = clientDataRootRef();
  if (!rootRef) return;
  const snapshot = await rootRef.once("value");
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
    header.innerHTML = `<span>${client.name}</span><span class="caret">›</span>`;
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
  const deleteProjectBtn = byId("delete-project-btn");
  const editProjectBtn = byId("edit-project-btn");
  const openEmployeeBtn = byId("open-employee-modal");
  const isHome = state.currentSection === "inicio";
  const isProject = state.currentSection === "meus-projetos";
  if (openProjectBtn) openProjectBtn.classList.toggle("hidden", isHome);
  if (openEmployeeBtn) openEmployeeBtn.classList.toggle("hidden", isHome);
  if (deleteProjectBtn) deleteProjectBtn.classList.toggle("hidden", !isProject);
  if (editProjectBtn) editProjectBtn.classList.toggle("hidden", !isProject);
}

function renderHome(container) {
  byId("crumb-path").textContent = "Inicio";

  const welcome = document.createElement("div");
  welcome.className = "welcome-card span-all";
  welcome.innerHTML = `
    <div class="welcome-header">
      <div class="welcome-icon">👋</div>
      <div>
        <p class="welcome-title">Bem-vindo ao AXON - Projects</p>
        <div class="welcome-meta">📅 Ultimo acesso: ${state.home.lastAccess}</div>
      </div>
    </div>
  `;

  const quote = document.createElement("div");
  quote.className = "quote-card span-all";
  quote.innerHTML = `
    <div class="muted">💡 Frase do dia</div>
    <div class="quote-text">"${state.home.quote}"</div>
  `;

  container.appendChild(welcome);
  container.appendChild(quote);
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

  if (state.currentSection === "monitor") {
    renderMonitor(panels);
    return;
  }

  if (!selectedClient || !selectedProject) return;

  byId("crumb-path").textContent = `${selectedClient.name} / ${selectedProject.name}`;

  const metrics = projectMetrics(selectedProject.tasks || []);
  const status = projectStatus(selectedProject, metrics);
  const statusBadge = statusInfo(status);

  const headerCard = document.createElement("div");
  headerCard.className = "card project-header span-all";
  headerCard.innerHTML = `
    <div class="project-header-top">
      <div>
        <h2>${selectedProject.name}</h2>
        <div class="project-subtitle">${selectedClient.name}</div>
      </div>
      <span class="pill project-status ${statusBadge.className}">${statusBadge.label}</span>
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
        <div class="value">${selectedProject.start || "-"}</div>
      </div>
      <div class="meta-item">
        <div class="label">Go Live previsto</div>
        <div class="value">${selectedProject.end || "-"}</div>
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
  tasksCard.className = "card span-all";
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
              <div style="color: var(--muted); font-weight:500;">${task.due}</div>
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
          <div style="color: var(--muted); font-weight:500;">${task.due}</div>
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
  } else {
    resetProjectModal();
    hydrateClientSelect();
    title.textContent = "Novo Projeto";
    submitBtn.textContent = "Salvar Projeto";
  }

  showModal(modal);
}

function resetProjectModal() {
  const form = byId("project-form");
  const modal = byId("project-modal");
  const title = modal.querySelector("h2");
  const submitBtn = modal.querySelector('button[type="submit"]');
  const clientSelect = byId("project-client-select");
  state.editingProjectId = null;
  if (form) form.reset();
  if (clientSelect) clientSelect.disabled = false;
  if (title) title.textContent = "Novo Projeto";
  if (submitBtn) submitBtn.textContent = "Salvar Projeto";
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
    form.elements.status.value = normalizeTaskStatus(task.status) || "planejado";
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
    STATUS_OPTIONS.find((opt) => opt.value === normalizeTaskStatus(status)) || {
      label: "Planejado",
      className: "planejado"
    }
  );
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
    const context = popover.dataset.context || "project";
    if (context === "monitor") {
      const resolved = resolveMonitorTaskFromDataset(popover.dataset);
      if (!resolved) return;
      applyTaskStatus(resolved.task, select.value);
      const statusPayload = {
        status: resolved.task.status,
        dataConclusao: resolved.task.dataConclusao ?? null
      };
      if (db && resolved.project?.id && resolved.project?.clientId && resolved.task?.id) {
        updateTaskStatusOnDb(resolved.project.clientId, resolved.project.id, resolved.task.id, statusPayload)
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
      return;
    }
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
  const context = target.dataset.context || "project";
  popover.dataset.context = context;
  if (context === "monitor") {
    popover.dataset.clientIndex = target.dataset.clientIndex || "";
    popover.dataset.projectIndex = target.dataset.projectIndex || "";
    popover.dataset.taskIndex = idx || "";
    popover.dataset.clientId = target.dataset.clientId || "";
    popover.dataset.projectId = target.dataset.projectId || "";
    popover.dataset.taskId = target.dataset.taskId || "";
    const resolved = resolveMonitorTaskFromDataset(target.dataset);
    const currentStatus = resolved?.task?.status;
    if (currentStatus) select.value = normalizeTaskStatus(currentStatus);
  } else {
    popover.dataset.taskIndex = idx;
    popover.dataset.clientIndex = "";
    popover.dataset.projectIndex = "";
    popover.dataset.taskId = "";
    const currentStatus = state.selectedProject?.tasks[Number(idx)]?.status;
    if (currentStatus) select.value = normalizeTaskStatus(currentStatus);
  }
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
    text.textContent = value;
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

async function ensureClientDoc(clientName) {
  const rootRef = clientDataRootRef();
  if (!rootRef) throw new Error("Base de clientes indisponivel.");
  const query = rootRef.orderByChild("name").equalTo(clientName).limitToFirst(1);
  const existing = await query.once("value");
  if (existing.exists()) {
    const clientId = Object.keys(existing.val())[0];
    return { id: clientId, ref: rootRef.child(clientId) };
  }
  const newRef = rootRef.push();
  await newRef.set({ name: clientName, projects: {} });
  return { id: newRef.key, ref: newRef };
}

async function deleteProjectFromDb(clientId, projectId) {
  const clientRef = clientDocRef(clientId);
  if (!clientRef) return;
  await clientRef.child("projects").child(projectId).remove();
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
  const clientRef = clientDocRef(clientId);
  if (!clientRef) return;
  await clientRef.child("projects").child(projectId).update({
    name: payload.name,
    developer: payload.developer,
    start: payload.start,
    end: payload.end
  });
}

async function saveTaskToDb(clientId, projectId, task) {
  const clientRef = clientDocRef(clientId);
  if (!clientRef) return;
  const taskRef = clientRef.child("projects").child(projectId).child("tasks").push();
  await taskRef.set({
    title: task.title,
    phase: task.phase,
    package: task.package,
    due: task.due,
    status: task.status,
    ...(task.dataConclusao ? { dataConclusao: task.dataConclusao } : {}),
    createdAt: firebase.database.ServerValue.TIMESTAMP
  });
}

async function updateTaskStatusOnDb(clientId, projectId, taskId, payload) {
  const clientRef = clientDocRef(clientId);
  if (!clientRef) return;
  await clientRef.child("projects").child(projectId).child("tasks").child(taskId).update(payload);
}

async function updateTaskOnDb(clientId, projectId, taskId, payload) {
  const updatePayload = {
    title: payload.title,
    phase: payload.phase,
    package: payload.package,
    due: payload.due,
    status: payload.status,
    ...(payload.dataConclusao !== undefined ? { dataConclusao: payload.dataConclusao } : {})
  };
  Object.keys(updatePayload).forEach((key) => {
    if (updatePayload[key] === undefined) delete updatePayload[key];
  });
  const clientRef = clientDocRef(clientId);
  if (!clientRef) return;
  await clientRef.child("projects").child(projectId).child("tasks").child(taskId).update(updatePayload);
}

async function deleteTaskFromDb(clientId, projectId, taskId) {
  const clientRef = clientDocRef(clientId);
  if (!clientRef) return;
  await clientRef.child("projects").child(projectId).child("tasks").child(taskId).remove();
}

async function updateProjectPackagesOnDb(clientId, projectId, packages) {
  const clientRef = clientDocRef(clientId);
  if (!clientRef) return;
  await clientRef.child("projects").child(projectId).update({ packages });
}

function projectMetrics(tasks = []) {
  const total = tasks.length;
  const done = tasks.filter((t) => normalizeTaskStatus(t.status) === "concluido").length;
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
      subEpics: subEpics.sort((a, b) => b.latest - a.latest),
      isEmpty: items.length === 0
    });
  });

  const remaining = normalized.filter((t) => !ordered.includes(t.phase));
  if (remaining.length) {
    const { subEpics, flatTasks } = groupBySubEpic(remaining);
    const existing = grouped.find((group) => group.phase === "OUTROS");
    if (existing) {
      existing.tasks = sortTasksForDisplay(existing.tasks.concat(flatTasks));
      existing.subEpics = existing.subEpics.concat(subEpics).sort((a, b) => b.latest - a.latest);
      existing.isEmpty = existing.tasks.length === 0 && existing.subEpics.length === 0;
    } else {
      grouped.push({
        phase: "OUTROS",
        tasks: sortTasksForDisplay(flatTasks),
        subEpics: subEpics.sort((a, b) => b.latest - a.latest),
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

function parseDateValue(value) {
  if (value === null || value === undefined || value === "") return Number.NaN;
  if (typeof value === "number") return value;
  const raw = String(value).trim();
  const parsed = Date.parse(raw);
  if (!Number.isNaN(parsed)) return parsed;
  const match = raw.match(/^(\d{2})[\/-](\d{2})[\/-](\d{4})$/);
  if (match) {
    return new Date(`${match[3]}-${match[2]}-${match[1]}`).getTime();
  }
  return Number.NaN;
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
  const startMs = parseDateValue(startValue);
  const endMs = parseDateValue(endValue);
  if (Number.isNaN(startMs) || Number.isNaN(endMs)) return 0;
  const start = startOfDay(new Date(startMs));
  const end = startOfDay(new Date(endMs));
  const today = startOfDay(now);
  const total = end.getTime() - start.getTime();
  if (total <= 0) return today >= end ? 100 : 0;
  if (today <= start) return 0;
  if (today >= end) return 100;
  const pct = ((today.getTime() - start.getTime()) / total) * 100;
  return Math.max(0, Math.min(100, round1(pct)));
}

function taskSortDate(value) {
  const parsed = parseDateValue(value);
  return Number.isNaN(parsed) ? Number.POSITIVE_INFINITY : parsed;
}

function sortTasksForDisplay(tasks) {
  return tasks.slice().sort((a, b) => {
    const aRank = taskStatusRank(a.status);
    const bRank = taskStatusRank(b.status);
    if (aRank !== bRank) return aRank - bRank;
    const aDate = taskSortDate(a.due);
    const bDate = taskSortDate(b.due);
    if (aDate !== bDate) return aDate - bDate;
    return (a.title || "").localeCompare(b.title || "");
  });
}

function dateValue(value) {
  const parsed = parseDateValue(value);
  return Number.isNaN(parsed) ? 0 : parsed;
}

function goLiveValue(value) {
  if (!value || Number.isNaN(Date.parse(value))) return null;
  return new Date(value).getTime();
}

function latestDate(tasks) {
  return tasks.reduce((acc, t) => Math.max(acc, dateValue(t.due)), 0);
}

function ensureMonitorState() {
  if (!state.monitor) {
    state.monitor = {
      filters: { client: "", project: "", responsible: "" }
    };
    return;
  }
  if (!state.monitor.filters) {
    state.monitor.filters = { client: "", project: "", responsible: "" };
    return;
  }
  if (state.monitor.filters.client === undefined) state.monitor.filters.client = "";
  if (state.monitor.filters.project === undefined) state.monitor.filters.project = "";
  if (state.monitor.filters.responsible === undefined) state.monitor.filters.responsible = "";
}

function clientColor(name) {
  const value = String(name || "");
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) % 997;
  }
  return CLIENT_COLOR_PALETTE[hash % CLIENT_COLOR_PALETTE.length];
}

function collectMonitorTasks() {
  const items = [];
  state.clients.forEach((client, clientIndex) => {
    (client.projects || []).forEach((project, projectIndex) => {
      const responsible = project.developer || "A definir";
      (project.tasks || []).forEach((task, taskIndex) => {
        items.push({
          client,
          project,
          task,
          responsible,
          clientIndex,
          projectIndex,
          taskIndex,
          dueMs: parseDateValue(task.due)
        });
      });
    });
  });
  return items;
}

function applyMonitorFilters(items) {
  ensureMonitorState();
  const { client, project, responsible } = state.monitor.filters;
  return items.filter((item) => {
    if (client && item.client?.name !== client) return false;
    if (project && item.project?.name !== project) return false;
    if (responsible && item.responsible !== responsible) return false;
    return true;
  });
}

function monitorDaysFromToday(targetMs, now = new Date()) {
  if (!Number.isFinite(targetMs)) return null;
  const today = startOfDay(now).getTime();
  const target = startOfDay(new Date(targetMs)).getTime();
  return Math.round((target - today) / (24 * 60 * 60 * 1000));
}

function monitorDueInfo(item, now = new Date()) {
  const dueMs = Number.isFinite(item.dueMs) ? item.dueMs : parseDateValue(item.task?.due);
  const diff = monitorDaysFromToday(dueMs, now);
  if (diff === null) {
    return { diff: null, isToday: false, isSoon: false, isOverdue: false };
  }
  return {
    diff,
    isToday: diff === 0,
    isSoon: diff >= 0 && diff <= 7,
    isOverdue: diff < 0
  };
}

function monitorCompletionMs(task) {
  const raw = task?.dataConclusao || task?.due;
  const parsed = parseDateValue(raw);
  return Number.isNaN(parsed) ? null : parsed;
}

function monitorBadgeData(item, dueInfo) {
  const status = normalizeTaskStatus(item.task?.status);
  if (status !== "concluido") {
    if (dueInfo.isOverdue) return { label: "Atrasado", className: "atrasado" };
    if (dueInfo.isSoon) return { label: "Proximo", className: "proximo" };
  }
  const info = statusInfo(status);
  return { label: info.label, className: info.className };
}

function resolveMonitorTaskFromDataset(dataset) {
  const clientIndex = Number(dataset.clientIndex);
  const projectIndex = Number(dataset.projectIndex);
  const taskIndex = Number(dataset.taskIndex);
  const client = Number.isNaN(clientIndex) ? null : state.clients[clientIndex];
  const project = client?.projects?.[projectIndex] || null;
  const task = project?.tasks?.[taskIndex] || null;
  if (task) return { client, project, task };
  const taskId = dataset.taskId;
  if (!taskId) return null;
  for (const fallbackClient of state.clients) {
    const matchProject = (fallbackClient.projects || []).find((p) =>
      (p.tasks || []).some((t) => t.id === taskId)
    );
    if (matchProject) {
      const matchTask = matchProject.tasks.find((t) => t.id === taskId);
      return { client: fallbackClient, project: matchProject, task: matchTask };
    }
  }
  return null;
}

function renderMonitorTaskList(container, items, options = {}) {
  const limit = Number.isFinite(options.limit) ? options.limit : items.length;
  const slice = items.slice(0, limit);
  container.innerHTML = "";
  if (!slice.length) {
    const empty = document.createElement("div");
    empty.className = "monitor-empty";
    empty.textContent = options.emptyText || "Sem atividades.";
    container.appendChild(empty);
    return;
  }
  slice.forEach((item) => {
    const dueInfo = monitorDueInfo(item);
    const badge = monitorBadgeData(item, dueInfo);
    const row = document.createElement("div");
    row.className = "monitor-item";
    if (options.compact) row.classList.add("compact");
    row.style.setProperty("--client-color", clientColor(item.client?.name));
    const dueLabel =
      options.dateType === "done"
        ? item.task?.dataConclusao || item.task?.due || "-"
        : item.task?.due || "-";
    row.innerHTML = `
      <div class="monitor-item-main">
        <div class="monitor-item-title">${item.task?.title || "Atividade sem titulo"}</div>
        <div class="monitor-item-meta">
          <span class="client-dot"></span>
          <span>${item.client?.name || "-"}</span>
          <span class="meta-sep">|</span>
          <span>${item.project?.name || "-"}</span>
          <span class="meta-sep">|</span>
          <span>${item.responsible || "A definir"}</span>
        </div>
      </div>
      <div class="monitor-item-due">${dueLabel}</div>
      <button
        class="status-badge ${badge.className} status-btn"
        type="button"
        data-context="monitor"
        data-client-index="${item.clientIndex}"
        data-project-index="${item.projectIndex}"
        data-task-index="${item.taskIndex}"
        data-client-id="${item.client?.id || ""}"
        data-project-id="${item.project?.id || ""}"
        data-task-id="${item.task?.id || ""}">
        ${badge.label}
      </button>
    `;
    container.appendChild(row);
  });
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
  if (key === "progress") return `${project.progress}%`;
  if (key === "baseline") return `${formatMetric(project.baseline)}%`;
  if (key === "gap") return `${formatSignedMetric(project.gap)}pp`;
  if (key === "goLive") return project.goLive || "-";
  return "";
}

function dashboardFilterValues(projects, key) {
  const column = DASHBOARD_COLUMNS.find((col) => col.key === key);
  const values = Array.from(new Set(projects.map((project) => dashboardDisplayValue(project, key))));
  return values.sort((a, b) => {
    if (column?.type === "number") {
      const toNumber = (value) => Number(String(value).replace(/[^0-9.+-]/g, ""));
      return toNumber(a) - toNumber(b);
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
      const baseline = baselinePctFromDates(p.start, p.end);
      const gap = round1(metrics.progress - baseline);
      return {
        ...p,
        clientName: client.name,
        metrics,
        progress: metrics.progress,
        baseline,
        gap,
        status: projectStatus(p, metrics),
        goLive: p.end || ""
      };
    })
  );
}

function projectStatus(project, metrics = projectMetrics(project.tasks || [])) {
  if (metrics.progress === 100 && metrics.total > 0) return "concluido";
  const goLive = goLiveValue(project.end);
  if (goLive !== null && goLive < Date.now() && metrics.progress < 100) return "atrasado";
  const hasWorkStarted = (project.tasks || []).some((t) => normalizeTaskStatus(t.status) !== "planejado");
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

function renderMonitor(container) {
  byId("crumb-path").textContent = "Monitor de Atividades";
  ensureMonitorState();

  const allItems = collectMonitorTasks();
  const filteredItems = applyMonitorFilters(allItems);
  const now = new Date();

  const activeItems = filteredItems.filter(
    (item) => normalizeTaskStatus(item.task?.status) !== "concluido"
  );
  const criticalItems = activeItems
    .filter((item) => {
      const info = monitorDueInfo(item, now);
      return info.isOverdue || info.isSoon;
    })
    .sort((a, b) => (a.dueMs || Number.POSITIVE_INFINITY) - (b.dueMs || Number.POSITIVE_INFINITY));
  const todayItems = activeItems
    .filter((item) => monitorDueInfo(item, now).isToday)
    .sort((a, b) => (a.dueMs || Number.POSITIVE_INFINITY) - (b.dueMs || Number.POSITIVE_INFINITY));
  const upcomingItems = activeItems
    .filter((item) => {
      const info = monitorDueInfo(item, now);
      return info.diff !== null && info.diff > 0 && info.diff <= 7;
    })
    .sort((a, b) => (a.dueMs || Number.POSITIVE_INFINITY) - (b.dueMs || Number.POSITIVE_INFINITY));
  const bottleneckItems = activeItems
    .filter((item) => {
      const info = monitorDueInfo(item, now);
      return info.isOverdue && info.diff !== null && info.diff <= -3;
    })
    .sort((a, b) => (a.dueMs || Number.POSITIVE_INFINITY) - (b.dueMs || Number.POSITIVE_INFINITY));
  const recentDone = filteredItems
    .filter((item) => normalizeTaskStatus(item.task?.status) === "concluido")
    .filter((item) => {
      const doneMs = monitorCompletionMs(item.task);
      const diff = monitorDaysFromToday(doneMs, now);
      return diff !== null && diff <= 0 && diff >= -7;
    })
    .sort((a, b) => (monitorCompletionMs(b.task) || 0) - (monitorCompletionMs(a.task) || 0));

  const totalCount = filteredItems.length;
  const doneCount = filteredItems.filter(
    (item) => normalizeTaskStatus(item.task?.status) === "concluido"
  ).length;
  const efficiency = totalCount ? Math.round((doneCount / totalCount) * 100) : 0;

  const teamMap = new Map();
  activeItems.forEach((item) => {
    const key = item.responsible || "A definir";
    if (!teamMap.has(key)) teamMap.set(key, { total: 0, overdue: 0 });
    const entry = teamMap.get(key);
    entry.total += 1;
    if (monitorDueInfo(item, now).isOverdue) entry.overdue += 1;
  });
  const teamMetrics = Array.from(teamMap.entries())
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.total - a.total || b.overdue - a.overdue || a.name.localeCompare(b.name))
    .slice(0, 6);

  const board = document.createElement("div");
  board.className = "monitor-board span-all";

  const header = document.createElement("div");
  header.className = "monitor-head";
  header.innerHTML = `
    <div class="monitor-title-row">
      <div>
        <h2>Monitor de Atividades</h2>
        <div class="muted">Visao centralizada da execucao e saude da operacao.</div>
      </div>
    </div>
    <div class="monitor-filters">
      <div class="monitor-filter">
        <label>Cliente</label>
        <select data-monitor-filter="client"></select>
      </div>
      <div class="monitor-filter">
        <label>Projeto</label>
        <select data-monitor-filter="project"></select>
      </div>
      <div class="monitor-filter">
        <label>Responsavel</label>
        <select data-monitor-filter="responsible"></select>
      </div>
    </div>
    <div class="monitor-kpi-grid">
      <div class="kpi-card">
        <div class="label">Total de criticas</div>
        <div class="value">${criticalItems.length}</div>
        <div class="muted">Atrasos e proximos 7 dias</div>
      </div>
      <div class="kpi-card">
        <div class="label">Atividades hoje</div>
        <div class="value">${todayItems.length}</div>
        <div class="muted">Vencem ate hoje</div>
      </div>
      <div class="kpi-card">
        <div class="label">Concluidas na semana</div>
        <div class="value">${recentDone.length}</div>
        <div class="muted">Ultimos 7 dias</div>
      </div>
      <div class="kpi-card">
        <div class="label">Eficiencia do time</div>
        <div class="value">${efficiency}%</div>
        <div class="muted">${doneCount} de ${totalCount} entregas</div>
      </div>
    </div>
  `;

  const columns = document.createElement("div");
  columns.className = "monitor-columns";

  const mainCol = document.createElement("div");
  mainCol.className = "monitor-main";

  const sideCol = document.createElement("div");
  const sideGrid = document.createElement("div");
  sideGrid.className = "monitor-side-grid";
  sideCol.appendChild(sideGrid);

  const criticalCard = document.createElement("div");
  criticalCard.className = "card monitor-card";
  criticalCard.innerHTML = `
    <div class="card-head">
      <div>
        <h3>Acoes criticas</h3>
        <div class="muted">Intervencao imediata</div>
      </div>
      <span class="status-badge atrasado">${criticalItems.length} itens</span>
    </div>
  `;
  const criticalList = document.createElement("div");
  criticalList.className = "monitor-list monitor-scroll";
  renderMonitorTaskList(criticalList, criticalItems, {
    emptyText: "Nenhuma criticidade no momento."
  });
  criticalCard.appendChild(criticalList);

  const todayCard = document.createElement("div");
  todayCard.className = "card monitor-card";
  todayCard.innerHTML = `
    <div class="card-head">
      <div>
        <h3>Cronograma do dia</h3>
        <div class="muted">Foco no que vence hoje</div>
      </div>
      <span class="status-badge proximo">${todayItems.length} itens</span>
    </div>
  `;
  const todayList = document.createElement("div");
  todayList.className = "monitor-list";
  renderMonitorTaskList(todayList, todayItems, {
    emptyText: "Nenhuma atividade prevista para hoje."
  });
  todayCard.appendChild(todayList);

  const doneCard = document.createElement("div");
  doneCard.className = "card monitor-card";
  doneCard.innerHTML = `
    <div class="card-head">
      <div>
        <h3>Concluidos recentemente</h3>
        <div class="muted">Ultimos 7 dias</div>
      </div>
      <span class="status-badge concluido">${recentDone.length} itens</span>
    </div>
  `;
  const doneList = document.createElement("div");
  doneList.className = "monitor-list";
  renderMonitorTaskList(doneList, recentDone, {
    emptyText: "Nenhuma entrega recente.",
    dateType: "done",
    limit: 8
  });
  doneCard.appendChild(doneList);

  const upcomingCard = document.createElement("div");
  upcomingCard.className = "card monitor-card";
  upcomingCard.innerHTML = `
    <div class="card-head">
      <div>
        <h3>Proximos 7 dias</h3>
        <div class="muted">Planejamento imediato</div>
      </div>
      <span class="status-badge proximo">${upcomingItems.length} itens</span>
    </div>
  `;
  const upcomingList = document.createElement("div");
  upcomingList.className = "monitor-list";
  renderMonitorTaskList(upcomingList, upcomingItems, {
    emptyText: "Sem entregas na proxima semana.",
    limit: 8,
    compact: true
  });
  upcomingCard.appendChild(upcomingList);

  const teamCard = document.createElement("div");
  teamCard.className = "card monitor-card";
  teamCard.innerHTML = `
    <div class="card-head">
      <div>
        <h3>Metricas de time</h3>
        <div class="muted">Carga por responsavel</div>
      </div>
    </div>
  `;
  const teamList = document.createElement("div");
  teamList.className = "monitor-metrics";
  if (!teamMetrics.length) {
    const empty = document.createElement("div");
    empty.className = "monitor-empty";
    empty.textContent = "Sem atividades abertas.";
    teamList.appendChild(empty);
  } else {
    teamMetrics.forEach((entry) => {
      const row = document.createElement("div");
      row.className = "monitor-metric-row";
      row.innerHTML = `
        <div class="monitor-metric-name">${entry.name}</div>
        <div class="monitor-metric-values">
          <span>${entry.total} itens</span>
          <span>${entry.overdue} atrasos</span>
        </div>
      `;
      teamList.appendChild(row);
    });
  }
  teamCard.appendChild(teamList);

  const bottleneckCard = document.createElement("div");
  bottleneckCard.className = "card monitor-card";
  bottleneckCard.innerHTML = `
    <div class="card-head">
      <div>
        <h3>Gargalos criticos</h3>
        <div class="muted">Atrasos acima de 3 dias</div>
      </div>
      <span class="status-badge atrasado">${bottleneckItems.length} itens</span>
    </div>
  `;
  const bottleneckList = document.createElement("div");
  bottleneckList.className = "monitor-list";
  renderMonitorTaskList(bottleneckList, bottleneckItems, {
    emptyText: "Nenhum gargalo critico identificado.",
    limit: 6,
    compact: true
  });
  bottleneckCard.appendChild(bottleneckList);

  mainCol.appendChild(criticalCard);
  mainCol.appendChild(todayCard);
  mainCol.appendChild(doneCard);

  sideGrid.appendChild(upcomingCard);
  sideGrid.appendChild(teamCard);
  sideGrid.appendChild(bottleneckCard);

  columns.appendChild(mainCol);
  columns.appendChild(sideCol);

  board.appendChild(header);
  board.appendChild(columns);
  container.appendChild(board);

  const clientFilterValue = state.monitor.filters.client;
  const projectFilterValue = state.monitor.filters.project;
  const projectSource = clientFilterValue
    ? allItems.filter((item) => item.client?.name === clientFilterValue)
    : allItems;
  const responsibleSource = allItems.filter((item) => {
    if (clientFilterValue && item.client?.name !== clientFilterValue) return false;
    if (projectFilterValue && item.project?.name !== projectFilterValue) return false;
    return true;
  });

  const uniqueValues = (source, getter) => {
    const values = new Set();
    source.forEach((item) => {
      const value = getter(item);
      if (value) values.add(value);
    });
    return Array.from(values).sort((a, b) => a.localeCompare(b));
  };

  const filterOptions = {
    client: uniqueValues(allItems, (item) => item.client?.name),
    project: uniqueValues(projectSource, (item) => item.project?.name),
    responsible: uniqueValues(responsibleSource, (item) => item.responsible)
  };

  header.querySelectorAll("[data-monitor-filter]").forEach((select) => {
    const key = select.dataset.monitorFilter;
    const options = filterOptions[key] || [];
    if (state.monitor.filters[key] && !options.includes(state.monitor.filters[key])) {
      state.monitor.filters[key] = "";
    }
    select.innerHTML = `<option value="">Todos</option>${options
      .map((value) => `<option value="${value}">${value}</option>`)
      .join("")}`;
    select.value = state.monitor.filters[key] || "";
    select.addEventListener("change", () => {
      state.monitor.filters[key] = select.value;
      renderMain();
    });
  });
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
      return `
        <tr data-client="${p.clientName}" data-project="${p.name}">
          <td>${p.name}</td>
          <td>${p.clientName}</td>
          <td>${p.developer || "-"}</td>
          <td><span class="pill project-status ${info.className}">${info.label}</span></td>
          <td>${p.progress}%</td>
          <td>${formatMetric(p.baseline)}%</td>
          <td>${formatSignedMetric(p.gap)}pp</td>
          <td>${p.goLive || "-"}</td>
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
        ${rows || "<tr><td colspan='8'>Nenhum projeto cadastrado.</td></tr>"}
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
