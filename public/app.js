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
  users: [],
  groups: [],
  currentUserEmail: "",
  currentUserRole: "user",
  currentUserKey: "",
  dbAccessDenied: false,
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
    filter: "all",
    client: "",
    project: "",
    responsible: ""
  },
  monitorEditing: null
};

const LOCAL_STORAGE_KEY = "controle_projetos_state_v1";
const LOCAL_STORAGE_USER_KEY = "controle_projetos_state_user";
const ADMIN_EMAILS = new Set(["joaodamasit@gmail.com"]);

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
  { key: "schedule", label: "Saúde", type: "text" },
  { key: "progress", label: "Progresso", type: "number" },
  { key: "baseline", label: "Previsto", type: "number" },
  { key: "gap", label: "GAP (pp)", type: "number" },
  { key: "goLive", label: "Go Live previsto", type: "date" }
];

const MONITOR_FILTERS = [
  { key: "all", label: "Todos" },
  { key: "atrasado", label: "Atrasadas" },
  { key: "proximo", label: "Proximas" }
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

function normalizeUserKey(value) {
  return String(value || "").trim().toLowerCase();
}

function currentUserKey(user = auth?.currentUser) {
  return normalizeUserKey(user?.uid || user?.email || state.currentUserEmail || "");
}

function localStorageKeyForUser(user = auth?.currentUser) {
  const key = currentUserKey(user);
  return key ? `${LOCAL_STORAGE_KEY}_${key}` : LOCAL_STORAGE_KEY;
}

function persistActiveUserKey(userKey) {
  try {
    if (userKey) {
      localStorage.setItem(LOCAL_STORAGE_USER_KEY, userKey);
    }
  } catch (err) {
    console.warn("Nao foi possivel salvar a chave do usuario.", err);
  }
}

function resetUserState() {
  state.clients = [];
  state.employees = [];
  state.improvements = [];
  state.users = [];
  state.groups = [];
  state.selectedClient = null;
  state.selectedProject = null;
  state.collapsedPhases = {};
  state.clientVisibility = {};
  state.editingProjectId = null;
  state.editingTaskIndex = null;
  state.dashboard = { sort: { key: null, direction: "asc" }, filters: {} };
  state.monitor = { filter: "all", client: "", project: "", responsible: "" };
  state.currentSection = "inicio";
  state.lastRenderContext = null;
}

function clearLocalState(user = auth?.currentUser) {
  try {
    localStorage.removeItem(localStorageKeyForUser(user));
  } catch (err) {
    console.warn("Nao foi possivel limpar dados locais.", err);
  }
}

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

function formatDateISO(value) {
  const dt = value instanceof Date ? value : parseTaskDate(value);
  if (!dt) return "";
  const dd = String(dt.getDate()).padStart(2, "0");
  const mm = String(dt.getMonth() + 1).padStart(2, "0");
  const yyyy = dt.getFullYear();
  return `${yyyy}-${mm}-${dd}`;
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

function isAdminEmail(email) {
  if (!email) return false;
  return ADMIN_EMAILS.has(String(email).trim().toLowerCase());
}

function isAdminUser(user = auth?.currentUser) {
  return isAdminEmail(user?.email);
}

function normalizeUserRole(role) {
  const value = String(role || "").trim().toLowerCase();
  if (value === "admin" || value === "administrador") return "admin";
  if (value === "developer" || value === "dev" || value === "desenvolvedor") return "developer";
  return "user";
}

function roleLabel(role) {
  const normalized = normalizeUserRole(role);
  if (normalized === "admin") return "Administrador";
  if (normalized === "developer") return "Desenvolvedor";
  return "Usuario";
}

function updateRoleNavVisibility() {
  const role = normalizeUserRole(state.currentUserRole);
  const isDev = role === "developer";
  const devLink = byId("nav-dev-board");
  const navGroup = document.querySelector(".nav-group");
  const navSections = ["inicio", "dashboard", "monitor", "config"];
  const topButtons = [
    document.querySelector('[data-section="relatorio"]'),
    byId("open-gantt-btn"),
    byId("open-employee-modal"),
    byId("edit-project-btn"),
    byId("open-project-modal")
  ];

  if (devLink) {
    devLink.classList.toggle("hidden", !(role === "developer" || role === "admin"));
  }
  navSections.forEach((section) => {
    const link = document.querySelector(`.nav-link[data-section="${section}"]`);
    if (link) link.classList.toggle("hidden", isDev);
  });
  if (navGroup) navGroup.classList.toggle("hidden", isDev);
  topButtons.forEach((btn) => {
    if (btn) btn.classList.toggle("hidden", isDev);
  });
}

async function loadCurrentUserRole(user = auth?.currentUser) {
  const fallbackRole = normalizeUserRole(isAdminUser(user) ? "admin" : "user");
  if (!db || !user?.uid) {
    state.currentUserRole = fallbackRole;
    state.currentUserEmail = user?.email || "";
    updateRoleNavVisibility();
    return fallbackRole;
  }
  try {
    const snapshot = await db.ref(`users/${user.uid}`).once("value");
    const data = snapshot.val() || {};
    const role = normalizeUserRole(data.role || fallbackRole);
    state.currentUserRole = role;
    state.currentUserEmail = user?.email || "";
    updateRoleNavVisibility();
    return role;
  } catch (err) {
    console.warn("Nao foi possivel carregar o perfil do usuario.", err);
    state.currentUserRole = fallbackRole;
    state.currentUserEmail = user?.email || "";
    updateRoleNavVisibility();
    return fallbackRole;
  }
}

function initialsFromName(name) {
  const trimmed = String(name || "").trim();
  if (!trimmed) return "U";
  const parts = trimmed.split(/\s+/).filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function updateUserHeader(user) {
  const nameEl = document.querySelector(".user-name");
  const avatarEl = document.querySelector(".user-avatar");
  if (!nameEl && !avatarEl) return;
  const label = user?.displayName || user?.email || "Usuario";
  if (nameEl) nameEl.textContent = label;
  if (avatarEl) avatarEl.textContent = initialsFromName(label);
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
  return task?.owner || task?.responsible || task?.responsavel || task?.assignee || "";
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

function taskStartKey(task) {
  if (task?.startDate != null) return "startDate";
  if (task?.start != null) return "start";
  if (task?.plannedStart != null) return "plannedStart";
  return "start";
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

function taskDueKey(task) {
  if (task?.dueDate != null) return "dueDate";
  if (task?.due != null) return "due";
  if (task?.plannedEnd != null) return "plannedEnd";
  if (task?.endDate != null) return "endDate";
  if (task?.end != null) return "end";
  if (task?.deadline != null) return "deadline";
  return "due";
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

function monitorFilterLabel(filterKey) {
  const match = MONITOR_FILTERS.find((item) => item.key === filterKey);
  return match ? match.label : "Todos";
}

function formatMonitorDateLabel(dueDay, today) {
  const diff = daysDiff(dueDay, today);
  if (diff === 0) return "HOJE";
  if (diff === 1) return "AMANHA";
  const months = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
  const dd = String(dueDay.getDate()).padStart(2, "0");
  const mm = months[dueDay.getMonth()] || "";
  return `${dd} ${mm}`.trim();
}

function buildMonitorItems() {
  const today = startOfDay(new Date());
  const upcomingLimit = startOfDay(addDays(today, 7));
  const items = [];

  state.clients.forEach((client, clientIndex) => {
    (client.projects || []).forEach((project, projectIndex) => {
      (project.tasks || []).forEach((task, taskIndex) => {
        if (!task) return;
        if (normalizeTaskStatus(getTaskStatus(task)) === "concluido") return;
        const dueRaw = taskDueStr(task);
        const dueDate = parseTaskDate(dueRaw);
        if (!dueDate) return;
        const dueDay = startOfDay(dueDate);
        const isOverdue = dueDay < today;
        const isUpcoming = dueDay >= today && dueDay <= upcomingLimit;
        if (!isOverdue && !isUpcoming) return;

        const responsible = taskOwner(task) || project.developer || "A definir";
        items.push({
          clientIndex,
          projectIndex,
          taskIndex,
          clientName: client.name,
          projectName: project.name,
          projectDeveloper: project.developer || "",
          taskTitle: taskTitle(task),
          taskOwner: taskOwner(task),
          responsible,
          dueDay,
          status: isOverdue ? "atrasado" : "proximo",
          taskId: task.id || "",
          projectId: project.id || "",
          clientId: client.id || ""
        });
      });
    });
  });

  return items;
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
    planned: cssVar("--color-primary", cssVar("--accent-dark", "#245363", rootEl), rootEl),
    actual: cssVar(
      "--color-accent",
      cssVar("--color-warning", cssVar("--warning-text", "#c76b1a", rootEl), rootEl),
      rootEl
    ),
    warn: cssVar("--color-warning", cssVar("--warning-text", "#c76b1a", rootEl), rootEl),
    ok: cssVar("--color-success", cssVar("--success-text", "#2f8f61", rootEl), rootEl),
    danger: cssVar("--color-danger", cssVar("--danger-text", "#9b1c23", rootEl), rootEl),
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

function gapStatusInfo(gap, baselinePct = null, realizedPct = null) {
  const base = Number(baselinePct);
  const real = Number(realizedPct);
  if (Number.isFinite(base) && Number.isFinite(real)) {
    const baseRounded = Math.round(base);
    if (baseRounded >= 100 && real < 100) {
      return { className: "gap-critical", label: "Critico", color: "#9B1C23" };
    }
  }
  const gapValue = Number(gap);
  if (gapValue < 0) {
    return { className: "gap-ok", label: "Adiantado", color: "#2F8F61" };
  }
  if (gapValue === 0) {
    return { className: "gap-ok", label: "Em dia", color: "#2F8F61" };
  }
  if (gapValue < 10) {
    return { className: "gap-low", label: "Sob controle", color: "#64748B" };
  }
  if (gapValue < 30) {
    return { className: "gap-delayed", label: "Alerta", color: "#C76B1A" };
  }
  return { className: "gap-critical", label: "Critico", color: "#9B1C23" };
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
  const explicit =
    activity?.dataConclusao ||
    activity?.completedAt ||
    activity?.doneAt ||
    activity?.finishedAt ||
    activity?.completed ||
    "";
  if (explicit) return explicit;
  if (normalizeTaskStatus(getTaskStatus(activity)) !== "concluido") return "";
  return activityDueDate(activity) || "";
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

  const start = parseDateSafe(project?.start || project?.startDate);
  const end = parseDateSafe(project?.end || project?.goLiveDate || project?.goLive);
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

  const start = parseDateSafe(project?.start || project?.startDate);
  const end = parseDateSafe(project?.end || project?.goLiveDate || project?.goLive);
  if (!start || !end) return null;

  const startDate = startOfDay(start);
  const endDate = startOfDay(end);
  const report = startOfDay(parseDateSafe(project?.reportDate) ?? new Date());
  const clampedReport = report < startDate ? startDate : report > endDate ? endDate : report;
  const dates = buildDailyDates(startDate, endDate);
  const totalDays = Math.max(1, dates.length - 1);

  const resolveDoneDate = (task) => {
    if (normalizeTaskStatus(getTaskStatus(task)) !== "concluido") return null;
    const explicit = parseDateSafe(
      task?.dataConclusao ||
        task?.completedAt ||
        task?.doneAt ||
        task?.finishedAt ||
        task?.completed ||
        ""
    );
    const explicitDay = explicit ? startOfDay(explicit) : null;
    const due = parseDateSafe(activityDueDate(task));
    const dueDay = due ? startOfDay(due) : null;
    const explicitOk = explicitDay && explicitDay <= clampedReport;
    const dueOk = dueDay && dueDay <= clampedReport;
    if (explicitOk && dueOk) {
      return dueDay <= explicitDay ? dueDay : explicitDay;
    }
    if (dueOk) return dueDay;
    if (explicitOk) return explicitDay;
    const created = parseDateSafe(
      task?.createdAt ||
        task?.created_at ||
        task?.created ||
        task?.createdOn ||
        task?.createdDate ||
        ""
    );
    if (created) return created;
    const updated = parseDateSafe(
      task?.updatedAt ||
        task?.updated_at ||
        task?.updated ||
        task?.updatedOn ||
        task?.updatedDate ||
        ""
    );
    if (updated) return updated;
    return clampedReport;
  };

  const totalWeight = tasks.length || 1;
  const doneWeightByDay = new Map();
  tasks.forEach((task) => {
    const doneAt = resolveDoneDate(task);
    if (!doneAt) return;
    const doneDay = startOfDay(doneAt);
    if (doneDay > clampedReport) return;
    const clamped = doneDay < startDate ? startDate : doneDay;
    const key = clamped.getTime();
    doneWeightByDay.set(key, (doneWeightByDay.get(key) || 0) + 1);
  });

  const baseline = dates.map((d) => clamp01(daysDiff(d, startDate) / totalDays));
  let realizedAcc = 0;
  const realized = dates.map((d) => {
    const key = startOfDay(d).getTime();
    realizedAcc += doneWeightByDay.get(key) || 0;
    return clamp01(realizedAcc / totalWeight);
  });

  const idxNow = Math.max(0, Math.min(dates.length - 1, daysDiff(clampedReport, startDate)));

  const baselineNow = baseline[idxNow];
  for (let i = 1; i < realized.length; i += 1) {
    realized[i] = Math.max(realized[i], realized[i - 1]);
  }
  const realizedNow = realized[idxNow];
  const ds = downsampleSeries(dates, baseline, realized, 60);
  const reportIndex = ds.dates.reduce((idx, d, i) => {
    return d.getTime() <= clampedReport.getTime() ? i : idx;
  }, 0);

  return {
    start: startDate,
    end: endDate,
    report: clampedReport,
    dates: ds.dates,
    baseline: ds.a,
    realized: ds.b,
    baselineNow,
    realizedNow,
    reportIndex
  };
}

function renderSCurveSvgDaily(sc, opts = {}) {
  if (!sc || !Array.isArray(sc.dates) || sc.dates.length < 2) return "";
  const W = opts.width ?? 1760;
  const H = opts.height ?? 240;
  const footerPad = 18;
  const svgH = H + footerPad;
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

  const pathFrom = (arr, dateList = sc.dates) =>
    (arr || [])
      .map((p, i) => {
        const xx = xAtDate(dateList[i]);
        const yy = yAt(p);
        return `${i === 0 ? "M" : "L"} ${xx.toFixed(2)} ${yy.toFixed(2)}`;
      })
      .join(" ");
  const pathFromStep = (arr, dateList = sc.dates) => {
    if (!arr || !arr.length) return "";
    let d = `M ${xAtDate(dateList[0]).toFixed(2)} ${yAt(arr[0]).toFixed(2)}`;
    for (let i = 1; i < arr.length; i += 1) {
      const xx = xAtDate(dateList[i]).toFixed(2);
      const yPrev = yAt(arr[i - 1]).toFixed(2);
      const yy = yAt(arr[i]).toFixed(2);
      d += ` L ${xx} ${yPrev} L ${xx} ${yy}`;
    }
    return d;
  };

  const basePath = pathFrom(sc.baseline);
  const realEndIndex = Math.min(
    sc.realized.length - 1,
    Number.isFinite(sc.reportIndex) ? sc.reportIndex : sc.realized.length - 1
  );
  const realDates = sc.dates.slice(0, realEndIndex + 1);
  const realValues = sc.realized.slice(0, realEndIndex + 1);
  const realPath = pathFromStep(realValues, realDates);

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
  const gapPP = round1((sc.baselineNow - sc.realizedNow) * 100);
  const gapLabel = `${gapPP > 0 ? "+" : ""}${gapPP}pp`;
  const baselinePct = round1(sc.baselineNow * 100);
  const realizedPct = round1(sc.realizedNow * 100);
  const gapStatus = gapStatusInfo(gapPP, baselinePct, realizedPct);
  const gapColor = gapStatus.color;
  const labelText = `GAP ${gapLabel}`;
  const labelWidth = Math.max(52, labelText.length * 6.4);
  const labelHeight = 18;
  const gapLabelX = Math.max(pad.l + labelWidth / 2, Math.min(W - pad.r - labelWidth / 2, xToday));
  const gapLabelY = Math.max(pad.t + 14, Math.min(yBaseNow, yRealNow) - 18);
  const labelX = xToday;

  return `
    <svg width="${W}" height="${svgH}" viewBox="0 0 ${W} ${svgH}" xmlns="http://www.w3.org/2000/svg">
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
      <text x="${pad.l}" y="${svgH - 4}" font-size="10" fill="${c.muted}" font-family="Arial">Início: ${fmtBR(sc.start)}</text>
      <text x="${W - pad.r}" y="${svgH - 4}" text-anchor="end" font-size="10" fill="${c.muted}" font-family="Arial">Go-Live: ${fmtBR(sc.end)}</text>

    </svg>
  `;
}

function renderSCurveSvg(sc, opts = {}) {
  if (!sc || !sc.start || !sc.end || !Array.isArray(sc.buckets) || sc.buckets.length < 2) return "";
  const W = opts.width ?? 1760;
  const H = opts.height ?? 240;
  const footerPad = 18;
  const svgH = H + footerPad;
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

  const pathFrom = (arr, buckets = sc.buckets) =>
    (arr || [])
      .map((p, i) => {
        const xx = xAtDate(buckets[i]);
        return `${i === 0 ? "M" : "L"} ${xx.toFixed(2)} ${yAt(p).toFixed(2)}`;
      })
      .join(" ");
  const pathFromStep = (arr, buckets = sc.buckets) => {
    if (!arr || !arr.length) return "";
    let d = `M ${xAtDate(buckets[0]).toFixed(2)} ${yAt(arr[0]).toFixed(2)}`;
    for (let i = 1; i < arr.length; i += 1) {
      const xx = xAtDate(buckets[i]).toFixed(2);
      const yPrev = yAt(arr[i - 1]).toFixed(2);
      const yy = yAt(arr[i]).toFixed(2);
      d += ` L ${xx} ${yPrev} L ${xx} ${yy}`;
    }
    return d;
  };

  const plannedPath = pathFrom(sc.planned);
  const reportDate = sc.report || sc.end;
  const reportIndex = sc.buckets.reduce((idx, d, i) => {
    return d.getTime() <= reportDate.getTime() ? i : idx;
  }, 0);
  const actualBuckets = sc.buckets.slice(0, reportIndex + 1);
  const actualPath = pathFromStep(sc.actual.slice(0, reportIndex + 1), actualBuckets);

  const xToday = xAtDate(reportDate);
  const plannedNow = clamp01(sc.plannedNow ?? 0);
  const actualNow = clamp01(sc.actualNow ?? 0);
  const yPlanNow = yAt(plannedNow);
  const yRealNow = yAt(actualNow);
  const gapPP = Math.round((plannedNow - actualNow) * 100);
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
    <svg width="${W}" height="${svgH}" viewBox="0 0 ${W} ${svgH}" xmlns="http://www.w3.org/2000/svg">
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
      <text x="${pad.l}" y="${svgH - 4}" font-size="10" fill="${c.muted}" font-family="Arial">Início: ${fmtBR(sc.start)}</text>
      <text x="${W - pad.r}" y="${svgH - 4}" text-anchor="end" font-size="10" fill="${c.muted}" font-family="Arial">Go-Live: ${fmtBR(sc.end)}</text>

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

      --ok: #2f8f61;
      --warn: #c76b1a;
      --bad: #9b1c23;

      --primary: #1ca7a6;
      --primary2: #0b3c5d;

      --baseline: #0f172a;
      --real: #c76b1a;

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

    .report-page .healthTag.ok { background: rgba(47, 143, 97, 0.12); color: #1f6b4b; }
    .report-page .healthTag.warn { background: rgba(199, 107, 26, 0.12); color: #9a5a12; }
    .report-page .healthTag.bad { background: rgba(155, 28, 35, 0.12); color: #9b1c23; }

    .report-page .gap-card.gap-ok { background: rgba(47, 143, 97, 0.10); border-color: rgba(47, 143, 97, 0.24); }
    .report-page .gap-card.gap-low { background: rgba(100, 116, 139, 0.12); border-color: rgba(100, 116, 139, 0.28); }
    .report-page .gap-card.gap-risk { background: rgba(199, 107, 26, 0.12); border-color: rgba(199, 107, 26, 0.28); }
    .report-page .gap-card.gap-delayed { background: rgba(199, 107, 26, 0.18); border-color: rgba(199, 107, 26, 0.32); }
    .report-page .gap-card.gap-critical { background: rgba(155, 28, 35, 0.12); border-color: rgba(155, 28, 35, 0.3); }
    .report-page .gap-card.gap-ok .kpiValue,
    .report-page .gap-card.gap-ok .kpiSub { color: #2f8f61; }
    .report-page .gap-card.gap-low .kpiValue,
    .report-page .gap-card.gap-low .kpiSub { color: #64748b; }
    .report-page .gap-card.gap-risk .kpiValue,
    .report-page .gap-card.gap-risk .kpiSub { color: #b06013; }
    .report-page .gap-card.gap-delayed .kpiValue,
    .report-page .gap-card.gap-delayed .kpiSub { color: #9c4f0f; }
    .report-page .gap-card.gap-critical .kpiValue,
    .report-page .gap-card.gap-critical .kpiSub { color: #9b1c23; }

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
    .report-page .miniStat.gap.gap-ok b { color: #2f8f61; }
    .report-page .miniStat.gap.gap-low b { color: #64748b; }
    .report-page .miniStat.gap.gap-risk b { color: #b06013; }
    .report-page .miniStat.gap.gap-delayed b { color: #9c4f0f; }
    .report-page .miniStat.gap.gap-critical b { color: #9b1c23; }

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

    .report-page .tag.bad { color: #9b1c23; background: rgba(155, 28, 35, 0.12); }
    .report-page .tag.warn { color: #9a5a12; background: rgba(199, 107, 26, 0.12); }
    .report-page .tag.ok { color: #1f6b4b; background: rgba(47, 143, 97, 0.12); }

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
  const gapPP = sCurveSeries ? round1(baselinePct - realizedPct) : 0;
  const gapLabel = sCurveSeries ? `${formatSignedMetric(gapPP)}pp` : "--";
  const gapStatus = sCurveSeries
    ? gapStatusInfo(gapPP, baselinePct, realizedPct)
    : { className: "gap-ok", label: "Sem baseline", color: "#2F8F61" };
  const gapTone = gapStatus.className;
  const gapStatusLabel = gapStatus.label;

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
            <h2>Curva S - Avanço fisico acumulado</h2>
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
    "em-andamento": { fill: "E3EDF1", text: "245363" },
    atrasado: { fill: "F3DEDD", text: "9B1C23" },
    concluido: { fill: "DFF3E9", text: "1F6B4B" }
  };
  const scheduleColorMap = {
    "em-dia": { fill: "DFF3E9", text: "1F6B4B" },
    "em-atraso": { fill: "F7E8C9", text: "9A5A12" }
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
    { label: "Em andamento", value: schedule.inProgress, fill: "E3EDF1", text: "245363" },
    { label: "Nao iniciado", value: schedule.planned, fill: "F1F2F6", text: "6B7280" },
    { label: "Em atraso", value: schedule.overdue, fill: "F7E8C9", text: "9A5A12" }
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

function normalizePhaseLabel(label) {
  const value = String(label || "").trim();
  return value ? value.toUpperCase() : "OUTROS";
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
    const raw = localStorage.getItem(localStorageKeyForUser());
    if (!raw) return false;
    const data = JSON.parse(raw);
    if (!data || !Array.isArray(data.clients)) return false;
    state.clients = data.clients;
    state.employees = Array.isArray(data.employees) ? data.employees : [];
    state.dbAccessDenied = false;
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
    localStorage.setItem(localStorageKeyForUser(), JSON.stringify(payload));
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
  if (!db) return false;
  const role = normalizeUserRole(state.currentUserRole);
  let snapshot = null;
  try {
    if (role === "admin") {
      snapshot = await db.ref("clients").once("value");
    } else {
      snapshot = null;
    }
  } catch (err) {
    const message = String(err?.message || "");
    const code = String(err?.code || "");
    const denied = code === "PERMISSION_DENIED" || /permission/i.test(message);
    console.error(err);
    if (denied) {
      state.dbAccessDenied = true;
      resetUserState();
      clearLocalState();
      renderClientList();
      renderMain();
      hydrateClientSelect();
      return false;
    }
    throw err;
  }
  let clients = [];
  if (role === "admin") {
    const clientsData = snapshot ? snapshot.val() || {} : {};
    clients = Object.entries(clientsData).map(([clientId, clientData]) => {
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
    state.dbAccessDenied = false;
  } else {
    const groups = await loadGroupsFromDb();
    state.groups = groups.slice();
    const uid = auth?.currentUser?.uid;
    const allowedGroups = uid ? groups.filter((group) => group.members?.[uid]) : [];
    const clientIds = new Set();
    allowedGroups.forEach((group) => {
      Object.keys(group.clients || {}).forEach((clientId) => clientIds.add(clientId));
    });
    const clientPromises = Array.from(clientIds).map(async (clientId) => {
      try {
        const snap = await db.ref(`clients/${clientId}`).once("value");
        const clientData = snap.val();
        if (!clientData) return null;
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
      } catch (err) {
        console.error(err);
        return null;
      }
    });
    const resolved = await Promise.all(clientPromises);
    clients = resolved.filter(Boolean);
    if (!clients.length) {
      state.dbAccessDenied = true;
    }
  }

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
  return true;
}

async function syncUserProfile(user) {
  if (!db || !user?.uid) return;
  const profileRef = db.ref(`users/${user.uid}`);
  const snapshot = await profileRef.once("value");
  const existing = snapshot.val() || {};
  const role = normalizeUserRole(isAdminUser(user) ? "admin" : (existing.role || "user"));
  const payload = {
    uid: user.uid,
    email: user.email || "",
    displayName: user.displayName || "",
    role,
    lastLoginAt: firebase.database.ServerValue.TIMESTAMP
  };
  if (!snapshot.exists()) {
    payload.createdAt = firebase.database.ServerValue.TIMESTAMP;
  }
  await profileRef.update(payload);
}

async function loadUsersFromDb() {
  if (!db) return [];
  const snapshot = await db.ref("users").once("value");
  const raw = snapshot.val() || {};
  return Object.entries(raw).map(([uid, data]) => ({
    uid,
    email: data?.email || "",
    displayName: data?.displayName || "",
    role: normalizeUserRole(data?.role || (isAdminEmail(data?.email) ? "admin" : "user")),
    createdAt: data?.createdAt || null,
    lastLoginAt: data?.lastLoginAt || null
  }));
}

async function loadGroupsFromDb() {
  if (!db) return [];
  try {
    const snapshot = await db.ref("groups").once("value");
    const raw = snapshot.val() || {};
    state.dbAccessDenied = false;
    return Object.entries(raw).map(([groupId, data]) => ({
      id: groupId,
      name: data?.name || "Grupo",
      members: data?.members || {},
      clients: data?.clients || {}
    }));
  } catch (err) {
    const message = String(err?.message || "");
    const code = String(err?.code || "");
    const denied = code === "PERMISSION_DENIED" || /permission/i.test(message);
    console.error(err);
    if (denied) {
      state.dbAccessDenied = true;
      return [];
    }
    throw err;
  }
}

async function updateUserProfileInDb(uid, payload) {
  if (!db || !uid) return;
  await db.ref(`users/${uid}`).update({
    ...payload,
    updatedAt: firebase.database.ServerValue.TIMESTAMP
  });
}

async function sendPasswordReset(email) {
  if (!auth) throw new Error("Auth indisponivel.");
  if (!email) throw new Error("E-mail invalido.");
  await auth.sendPasswordResetEmail(email);
}

async function createGroupInDb(name) {
  if (!db) return null;
  const groupRef = db.ref("groups").push();
  await groupRef.set({
    name: name || "Novo grupo",
    members: {},
    clients: {},
    createdAt: firebase.database.ServerValue.TIMESTAMP
  });
  return groupRef.key;
}

async function updateGroupNameInDb(groupId, name) {
  if (!db || !groupId) return;
  await db.ref(`groups/${groupId}`).update({
    name: name || "Grupo",
    updatedAt: firebase.database.ServerValue.TIMESTAMP
  });
}

async function updateGroupMemberInDb(groupId, uid, enabled) {
  if (!db || !groupId || !uid) return;
  const ref = db.ref(`groups/${groupId}/members/${uid}`);
  if (enabled) {
    await ref.set(true);
  } else {
    await ref.remove();
  }
}

async function assignClientToGroup(clientId, groupId) {
  if (!db || !clientId || !groupId) return;
  const updates = {
    [`groups/${groupId}/clients/${clientId}`]: true
  };
  (state.groups || []).forEach((group) => {
    if (group.id !== groupId && group.clients?.[clientId]) {
      updates[`groups/${group.id}/clients/${clientId}`] = null;
    }
  });
  updates[`clients/${clientId}/groupId`] = groupId;
  await db.ref().update(updates);
}

async function removeClientFromGroup(clientId, groupId) {
  if (!db || !clientId || !groupId) return;
  const updates = {
    [`groups/${groupId}/clients/${clientId}`]: null,
    [`clients/${clientId}/groupId`]: null
  };
  await db.ref().update(updates);
}

async function deleteGroupFromDb(groupId) {
  if (!db || !groupId) return;
  const group = (state.groups || []).find((item) => item.id === groupId);
  const updates = {};
  if (group?.clients) {
    Object.keys(group.clients).forEach((clientId) => {
      updates[`clients/${clientId}/groupId`] = null;
    });
  }
  updates[`groups/${groupId}`] = null;
  await db.ref().update(updates);
}

async function initApp() {
  loadHomeContext();
  const firebaseReady = db ? true : await initFirebase();
  if (firebaseReady) {
    try {
      const loaded = await loadStateFromDb();
      if (!loaded && !state.dbAccessDenied && !state.clients.length && loadLocalState()) {
        state.selectedClient = state.clients[0] || null;
        state.selectedProject = state.clients[0]?.projects?.[0] || null;
        renderClientList();
        renderMain();
        hydrateClientSelect();
      }
      saveLocalState();
    } catch (err) {
      console.error(err);
      const hasLocal = !state.dbAccessDenied && loadLocalState();
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
  wireInlineProjectDates();
  wireInlineTaskDates();
  setupMonitorActions();
  setupStatusPopover();
  setupProgressPopover();
  setupTaskActions();
  setupDashboardFilters();
}

function renderClientList() {
  const list = byId("client-list");
  list.innerHTML = "";

  if (!state.clients.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = state.dbAccessDenied
      ? "Sem acesso aos projetos cadastrados."
      : "Nenhum projeto cadastrado.";
    list.appendChild(empty);
    return;
  }

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
      openClientModal(client);
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
  const gap = round1(baselinePct - progress);
  const gapStatus = gapStatusInfo(gap, baselinePct, progress);
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
  const openGanttBtn = byId("open-gantt-btn");
  const isHome = state.currentSection === "inicio";
  const isConfig = state.currentSection === "config";
  const isDevBoard = state.currentSection === "dev-board";
  const isProject = state.currentSection === "meus-projetos";
  if (openProjectBtn) openProjectBtn.classList.toggle("hidden", isHome || isConfig || isDevBoard);
  if (openEmployeeBtn) openEmployeeBtn.classList.toggle("hidden", isHome || isConfig || isDevBoard);
  if (editProjectBtn) editProjectBtn.classList.toggle("hidden", !isProject);
  if (openGanttBtn) {
    openGanttBtn.classList.toggle("hidden", isDevBoard);
    openGanttBtn.disabled = !state.selectedProject;
  }
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

function renderMonitorActivities(container) {
  setCrumbPathText("Monitor de Atividades");
  const filter = state.monitor?.filter || "all";
  const clientFilter = state.monitor?.client || "";
  const projectFilter = state.monitor?.project || "";
  const responsibleFilter = state.monitor?.responsible || "";
  const items = buildMonitorItems();
  const statusFiltered = items.filter((item) => {
    if (filter === "atrasado") return item.status === "atrasado";
    if (filter === "proximo") return item.status === "proximo";
    return true;
  });
  const clientOptions = Array.from(new Set(statusFiltered.map((item) => item.clientName))).sort();
  if (clientFilter && !clientOptions.includes(clientFilter)) {
    state.monitor.client = "";
  }
  const projectPool = (state.monitor.client || clientFilter)
    ? statusFiltered.filter((item) => item.clientName === (state.monitor.client || clientFilter))
    : statusFiltered;
  const projectOptions = Array.from(new Set(projectPool.map((item) => item.projectName))).sort();
  if (projectFilter && !projectOptions.includes(projectFilter)) {
    state.monitor.project = "";
  }
  const responsiblePool = statusFiltered.filter((item) => {
    if (state.monitor.client && item.clientName !== state.monitor.client) return false;
    if (state.monitor.project && item.projectName !== state.monitor.project) return false;
    return true;
  });
  const responsibleOptions = Array.from(new Set(responsiblePool.map((item) => item.responsible))).sort();
  if (responsibleFilter && !responsibleOptions.includes(responsibleFilter)) {
    state.monitor.responsible = "";
  }

  const filtered = statusFiltered.filter((item) => {
    if (state.monitor.client && item.clientName !== state.monitor.client) return false;
    if (state.monitor.project && item.projectName !== state.monitor.project) return false;
    if (state.monitor.responsible && item.responsible !== state.monitor.responsible) return false;
    return true;
  });

  const header = document.createElement("div");
  header.className = "monitor-container span-all";
  header.innerHTML = `
    <div class="monitor-header">
      <h2>Monitor de Atividades</h2>
      <div class="monitor-filter">
        <button class="btn-filtro" type="button" data-monitor-filter-btn>
          <span>🔍</span> Filtrar: ${monitorFilterLabel(filter)}
        </button>
        <div class="monitor-filter-menu" id="monitor-filter-popover">
          ${MONITOR_FILTERS.map((option) => {
            const active = option.key === filter ? "active" : "";
            return `<button type="button" class="${active}" data-monitor-filter="${option.key}">${option.label}</button>`;
          }).join("")}
        </div>
      </div>
    </div>
    <div class="monitor-filters">
      <label class="monitor-select">
        <span>Cliente</span>
        <select data-monitor-select="client">
          <option value="">Todos</option>
          ${clientOptions.map((name) => `<option value="${escapeHtml(name)}"${state.monitor.client === name ? " selected" : ""}>${escapeHtml(name)}</option>`).join("")}
        </select>
      </label>
      <label class="monitor-select">
        <span>Projeto</span>
        <select data-monitor-select="project">
          <option value="">Todos</option>
          ${projectOptions.map((name) => `<option value="${escapeHtml(name)}"${state.monitor.project === name ? " selected" : ""}>${escapeHtml(name)}</option>`).join("")}
        </select>
      </label>
      <label class="monitor-select">
        <span>Responsavel</span>
        <select data-monitor-select="responsible">
          <option value="">Todos</option>
          ${responsibleOptions.map((name) => `<option value="${escapeHtml(name)}"${state.monitor.responsible === name ? " selected" : ""}>${escapeHtml(name)}</option>`).join("")}
        </select>
      </label>
    </div>
  `;

  const groups = new Map();
  filtered.forEach((item) => {
    if (!groups.has(item.clientName)) groups.set(item.clientName, []);
    groups.get(item.clientName).push(item);
  });

  const list = document.createElement("div");
  list.className = "monitor-container span-all";
  if (!filtered.length) {
    const empty = document.createElement("div");
    empty.className = "card";
    empty.textContent = "Nenhuma atividade encontrada para o filtro selecionado.";
    list.appendChild(empty);
  } else {
    const today = startOfDay(new Date());
    Array.from(groups.entries()).forEach(([clientName, groupItems]) => {
      const group = document.createElement("div");
      group.className = "cliente-grupo";
      const title = document.createElement("div");
      title.className = "cliente-secao-titulo";
      title.textContent = `Cliente: ${clientName}`;
      group.appendChild(title);

      const orderedItems = groupItems.slice().sort((a, b) => {
        const proj = a.projectName.localeCompare(b.projectName);
        if (proj !== 0) return proj;
        const due = a.dueDay.getTime() - b.dueDay.getTime();
        if (due !== 0) return due;
        return a.taskTitle.localeCompare(b.taskTitle);
      });

      orderedItems.forEach((item) => {
        const statusClass = item.status === "atrasado" ? "status-atrasado" : "status-proximo";
        const labelBase = formatMonitorDateLabel(item.dueDay, today);
        const badgeLabel = item.status === "atrasado" ? `${labelBase} (ATRASADO)` : labelBase;
        const badgeClass = item.status === "atrasado" ? "badge-atrasado" : "badge-proximo";
        const responsible = item.responsible || "A definir";
        const card = document.createElement("div");
        card.className = `atividade-card ${statusClass}`;
        card.dataset.monitorCard = "true";
        card.dataset.clientIndex = String(item.clientIndex);
        card.dataset.projectIndex = String(item.projectIndex);
        card.dataset.taskIndex = String(item.taskIndex);
        card.innerHTML = `
          <div class="info-principal">
            <h4>${escapeHtml(item.taskTitle)}</h4>
            <p>Projeto: <strong>${escapeHtml(item.projectName)}</strong> • Resp: <span class="responsavel-nome">${escapeHtml(responsible)}</span></p>
          </div>
          <div class="info-data">
            <span class="badge-data ${badgeClass}">${badgeLabel}</span>
          </div>
        `;
        group.appendChild(card);
      });

      list.appendChild(group);
    });
  }

  container.appendChild(header);
  container.appendChild(list);
}

function normalizePersonKey(value) {
  if (!value) return "";
  return String(value)
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w@.\s-]/g, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");
}

function developerIdentityKeys() {
  const keys = new Set();
  const user = auth?.currentUser || null;
  const email = (state.currentUserEmail || user?.email || "").trim();
  const name = (user?.displayName || "").trim();
  [name, email].forEach((value) => {
    const key = normalizePersonKey(value);
    if (key) keys.add(key);
  });
  if (email.includes("@")) {
    const base = email.split("@")[0].replace(/[._-]+/g, " ");
    const key = normalizePersonKey(base);
    if (key) keys.add(key);
  }
  return keys;
}

function devColumnKey(task) {
  const normalized = normalizeTaskStatus(getTaskStatus(task));
  if (normalized === "concluido") return "done";
  if (normalized === "em_validacao") return "review";
  if (normalized === "em_andamento" || normalized === "parado") return "doing";
  return "todo";
}

function collectDeveloperTasks(identityKeys) {
  const items = [];
  const unassignedKeys = new Set(["a definir", "nao definido", "sem responsavel"]);
  state.clients.forEach((client) => {
    (client.projects || []).forEach((project) => {
      const projectKey = normalizePersonKey(project?.developer || "");
      const projectMatch = projectKey && identityKeys.has(projectKey);
      (project.tasks || []).forEach((task, taskIndex) => {
        const ownerKey = normalizePersonKey(taskOwner(task));
        const hasOwner = ownerKey && !unassignedKeys.has(ownerKey);
        const matches = (hasOwner && identityKeys.has(ownerKey)) || (!hasOwner && projectMatch);
        if (!matches) return;
        const dueLabel = formatDateBR(taskDueStr(task) || "");
        const progress = taskProgressValue(task);
        const statusInfoData = taskStatusInfo(getTaskStatus(task));
        items.push({
          client,
          project,
          task,
          taskIndex,
          column: devColumnKey(task),
          dueLabel,
          progress,
          statusLabel: statusInfoData.label,
          statusClass: statusInfoData.className || "planejado"
        });
      });
    });
  });
  return items;
}

function resolveDevTaskRef(dataset) {
  const clientId = dataset.clientId || "";
  const clientName = dataset.clientName || "";
  const projectId = dataset.projectId || "";
  const projectName = dataset.projectName || "";
  const taskId = dataset.taskId || "";
  const taskIndexRaw = dataset.taskIndex;
  const taskIndex = taskIndexRaw === "" || taskIndexRaw == null ? null : Number(taskIndexRaw);
  const client =
    state.clients.find((item) => (clientId && item.id === clientId) || (clientName && item.name === clientName)) || null;
  if (!client) return null;
  const project =
    (client.projects || []).find(
      (item) => (projectId && item.id === projectId) || (projectName && item.name === projectName)
    ) || null;
  if (!project) return null;
  let task = null;
  if (Number.isFinite(taskIndex) && project.tasks?.[taskIndex]) {
    task = project.tasks[taskIndex];
  } else if (taskId) {
    task = (project.tasks || []).find((item) => item.id === taskId) || null;
  }
  if (!task) return null;
  return { client, project, task, taskIndex };
}

function updateDeveloperTaskStatus(dataset, columnKey) {
  const ref = resolveDevTaskRef(dataset);
  if (!ref) return;
  const statusMap = {
    todo: "planejado",
    doing: "em_andamento",
    review: "em_validacao",
    done: "concluido"
  };
  const nextStatus = statusMap[columnKey] || "planejado";
  if (normalizeTaskStatus(ref.task.status) === normalizeTaskStatus(nextStatus)) {
    return;
  }
  const previousStatus = ref.task.status;
  applyTaskStatus(ref.task, nextStatus);
  if (db && ref.client.id && ref.project.id && ref.task.id) {
    updateTaskStatusOnDb(ref.client.id, ref.project.id, ref.task.id, {
      status: ref.task.status,
      dataConclusao: ref.task.dataConclusao || null
    })
      .then(() => {
        renderMain();
      })
      .catch((err) => {
        console.error(err);
        ref.task.status = previousStatus;
        applyTaskStatus(ref.task, previousStatus);
        renderMain();
      });
    return;
  }
  saveLocalState();
  renderMain();
}

function updateDeveloperTaskProgress(dataset, progressValue) {
  const ref = resolveDevTaskRef(dataset);
  if (!ref) return;
  const prevProgress = ref.task.progress;
  const prevStatus = ref.task.status;
  const nextProgress = Math.max(0, Math.min(100, Number(progressValue)));
  ref.task.progress = Number.isFinite(nextProgress) ? nextProgress : 0;
  if (ref.task.progress >= 100) {
    applyTaskStatus(ref.task, "concluido");
  } else if (normalizeTaskStatus(ref.task.status) === "concluido") {
    applyTaskStatus(ref.task, "em_andamento");
  }
  const payload = {
    progress: ref.task.progress,
    status: ref.task.status,
    dataConclusao: ref.task.dataConclusao || null
  };
  if (db && ref.client.id && ref.project.id && ref.task.id) {
    updateTaskOnDb(ref.client.id, ref.project.id, ref.task.id, payload)
      .then(() => {
        renderMain();
      })
      .catch((err) => {
        console.error(err);
        ref.task.progress = prevProgress;
        ref.task.status = prevStatus;
        applyTaskStatus(ref.task, prevStatus);
        renderMain();
      });
    return;
  }
  saveLocalState();
  renderMain();
}

function setupDeveloperBoard() {
  if (document.body.dataset.devBoardWired) return;
  document.body.dataset.devBoardWired = "true";

  document.body.addEventListener("dragstart", (e) => {
    const card = e.target.closest("[data-dev-task]");
    if (!card) return;
    const payload = {
      clientId: card.dataset.clientId || "",
      clientName: card.dataset.clientName || "",
      projectId: card.dataset.projectId || "",
      projectName: card.dataset.projectName || "",
      taskId: card.dataset.taskId || "",
      taskIndex: card.dataset.taskIndex || ""
    };
    card.classList.add("dragging");
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", JSON.stringify(payload));
  });

  document.body.addEventListener("dragend", (e) => {
    const card = e.target.closest("[data-dev-task]");
    if (card) card.classList.remove("dragging");
  });

  document.body.addEventListener("dragover", (e) => {
    const column = e.target.closest("[data-dev-column]");
    if (!column) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  });

  document.body.addEventListener("dragenter", (e) => {
    const column = e.target.closest("[data-dev-column]");
    if (column) column.classList.add("over");
  });

  document.body.addEventListener("dragleave", (e) => {
    const column = e.target.closest("[data-dev-column]");
    if (!column) return;
    if (!column.contains(e.relatedTarget)) {
      column.classList.remove("over");
    }
  });

  document.body.addEventListener("drop", (e) => {
    const column = e.target.closest("[data-dev-column]");
    if (!column) return;
    e.preventDefault();
    column.classList.remove("over");
    const payloadRaw = e.dataTransfer.getData("text/plain");
    if (!payloadRaw) return;
    let payload = null;
    try {
      payload = JSON.parse(payloadRaw);
    } catch (err) {
      return;
    }
    const columnKey = column.dataset.devColumn || "";
    if (!columnKey) return;
    updateDeveloperTaskStatus(payload, columnKey);
  });

  document.body.addEventListener("input", (e) => {
    const slider = e.target.closest("[data-progress-input]");
    if (!slider) return;
    const wrapper = slider.closest(".dev-progress");
    const valueEl = wrapper?.querySelector("[data-progress-label]");
    if (valueEl) valueEl.textContent = `${slider.value}%`;
  });

  document.body.addEventListener("change", (e) => {
    const slider = e.target.closest("[data-progress-input]");
    if (!slider) return;
    updateDeveloperTaskProgress(slider.dataset, slider.value);
  });
}

function renderDeveloperBoard(container) {
  setCrumbPathText("Painel Desenvolvedor");
  const role = normalizeUserRole(state.currentUserRole);
  if (role !== "developer" && role !== "admin") {
    container.innerHTML = `
      <div class="empty-state span-all" style="text-align: center; padding: 40px;">
        <h2>Acesso restrito</h2>
        <p>Esta tela esta disponivel apenas para usuarios com perfil Desenvolvedor.</p>
      </div>
    `;
    return;
  }

  const identityKeys = developerIdentityKeys();
  const tasks = collectDeveloperTasks(identityKeys);
  if (!tasks.length) {
    container.innerHTML = `
      <div class="empty-state span-all" style="text-align: center; padding: 40px;">
        <h2>Sem atividades</h2>
        <p>Nenhuma atividade atribuida a voce no momento.</p>
      </div>
    `;
    return;
  }

  const columns = [
    { key: "todo", label: "A fazer" },
    { key: "doing", label: "Em andamento" },
    { key: "review", label: "Revisao / QA" },
    { key: "done", label: "Concluido" }
  ];
  const grouped = columns.reduce((acc, col) => {
    acc[col.key] = [];
    return acc;
  }, {});
  tasks.forEach((item) => {
    const columnKey = grouped[item.column] ? item.column : "todo";
    grouped[columnKey].push(item);
  });

  const columnsHtml = columns
    .map((col) => {
      const ordered = grouped[col.key].slice().sort((a, b) => taskDueValueSafe(a.task) - taskDueValueSafe(b.task));
      const cards = ordered
        .map((item) => {
          const projectLabel = item.project?.name || "Projeto";
          const clientLabel = item.client?.name || "Cliente";
          const taskTitleText = escapeHtml(taskTitle(item.task));
          const phaseLabel = normalizePhaseLabel(item.task?.phase || "OUTROS");
          const dueText = item.dueLabel && item.dueLabel !== "-" ? item.dueLabel : "Sem prazo";
          const progress = Math.max(0, Math.min(100, Math.round(item.progress || 0)));
          const taskId = item.task?.id || "";
          const clientId = item.client?.id || "";
          const projectId = item.project?.id || "";
          return `
            <article class="dev-card" draggable="true" data-dev-task data-client-id="${escapeHtml(clientId)}" data-client-name="${escapeHtml(clientLabel)}" data-project-id="${escapeHtml(projectId)}" data-project-name="${escapeHtml(projectLabel)}" data-task-id="${escapeHtml(taskId)}" data-task-index="${item.taskIndex}">
              <div class="dev-card-meta">
                <span class="dev-card-project">${escapeHtml(projectLabel)} • ${escapeHtml(clientLabel)}</span>
                <span class="pill ${item.statusClass}">${item.statusLabel}</span>
              </div>
              <div class="dev-card-title">${taskTitleText}</div>
              <div class="dev-card-sub">Epico: ${escapeHtml(phaseLabel)}</div>
              <div class="dev-card-sub">Prazo: ${escapeHtml(dueText)}</div>
              <div class="dev-progress">
                <div class="dev-progress-label">
                  <span>Progresso</span>
                  <span class="dev-progress-value" data-progress-label>${progress}%</span>
                </div>
                <input type="range" min="0" max="100" value="${progress}" data-progress-input data-client-id="${escapeHtml(clientId)}" data-client-name="${escapeHtml(clientLabel)}" data-project-id="${escapeHtml(projectId)}" data-project-name="${escapeHtml(projectLabel)}" data-task-id="${escapeHtml(taskId)}" data-task-index="${item.taskIndex}">
              </div>
            </article>
          `;
        })
        .join("");
      return `
        <section class="dev-column" data-dev-column="${col.key}">
          <div class="dev-column-header">
            <div class="dev-column-title">${col.label}</div>
            <span class="dev-column-count">${grouped[col.key].length}</span>
          </div>
          <div class="dev-column-body">
            ${cards || "<div class=\"dev-empty\">Sem atividades</div>"}
          </div>
        </section>
      `;
    })
    .join("");

  container.innerHTML = `
    <div class="dev-board span-all">
      <div class="section-header">
        <div class="header-row">
          <h2>Atividades do Desenvolvedor</h2>
        </div>
        <div class="muted">Arraste os cards entre colunas e atualize o progresso.</div>
      </div>
      <div class="dev-board-grid">
        ${columnsHtml}
      </div>
    </div>
  `;

  setupDeveloperBoard();
}

function openGanttModal() {
  const modal = byId("gantt-modal");
  if (!modal) return;
  renderGanttModal();
  showModal(modal);
}

function renderGanttModal() {
  const container = byId("gantt-content");
  if (!container) return;
  const titleEl = byId("gantt-title");
  const subtitleEl = byId("gantt-subtitle");
  const footerRight = byId("gantt-footer-right");

  const project = state.selectedProject;
  const client = state.selectedClient;

  if (!project) {
    if (titleEl) titleEl.textContent = "Cronograma do Projeto";
    if (subtitleEl) subtitleEl.textContent = "Selecione um projeto para visualizar o Gantt.";
    if (footerRight) footerRight.textContent = "";
    container.innerHTML = `<div class="gantt-empty">Selecione um projeto para gerar o Gantt.</div>`;
    return;
  }

  if (titleEl) titleEl.textContent = project.name || "Cronograma do Projeto";
  if (subtitleEl) {
    const clientLabel = client?.name ? `Cliente: ${client.name}` : "Projeto selecionado";
    subtitleEl.textContent = clientLabel;
  }

  const tasks = flattenProjectTasks(project);
  if (!tasks.length) {
    if (footerRight) footerRight.textContent = "";
    container.innerHTML = `<div class="gantt-empty">Nenhuma atividade cadastrada.</div>`;
    return;
  }

  const normalizedTasks = tasks.map((task, idx) => {
    const title = taskTitle(task);
    const phase = normalizePhaseLabel(task.phase || task.epic || task.stage || "OUTROS");
    const startRaw = taskStartStr(task) || taskDateStr(task);
    const endRaw = taskDueStr(task) || taskDateStr(task);
    let startDate = parseTaskDate(startRaw);
    let endDate = parseTaskDate(endRaw);
    if (!startDate && endDate) startDate = endDate;
    if (!endDate && startDate) endDate = startDate;
    const noDate = !startDate && !endDate;
    if (startDate && endDate && endDate < startDate) {
      const tmp = startDate;
      startDate = endDate;
      endDate = tmp;
    }
    const progress = taskProgressValue(task);
    const gapValue = Number(
      task?.gap ?? task?.gapPP ?? task?.gapPct ?? task?.gapPercent ?? task?.gapValue ?? Number.NaN
    );
    const done = progress >= 100 || isDoneTask(task);
    const overdue = Number.isFinite(gapValue) ? gapValue > 0 : isOverdueTask(task);
    const statusClass = done ? "is-done" : overdue ? "is-late" : "is-ok";
    return {
      id: task?.id || `task-${idx}`,
      title,
      phase,
      startDate,
      endDate,
      startRaw,
      endRaw,
      progress,
      statusClass,
      noDate
    };
  });

  const datedTasks = normalizedTasks.filter((task) => !task.noDate);
  const taskMinTs = datedTasks.length ? Math.min(...datedTasks.map((task) => task.startDate.getTime())) : null;
  const taskMaxTs = datedTasks.length ? Math.max(...datedTasks.map((task) => task.endDate.getTime())) : null;
  const projectStart = parseDateSafe(project?.start || project?.startDate);
  const projectEnd = parseDateSafe(project?.end || project?.goLive || project?.goLiveDate);
  let rangeStart = projectStart
    ? startOfDay(projectStart)
    : taskMinTs
      ? startOfDay(new Date(taskMinTs))
      : startOfDay(new Date());
  let rangeEnd = projectEnd
    ? startOfDay(projectEnd)
    : taskMaxTs
      ? startOfDay(new Date(taskMaxTs))
      : addDays(rangeStart, 1);
  if (taskMinTs != null && taskMinTs < rangeStart.getTime()) {
    rangeStart = startOfDay(new Date(taskMinTs));
  }
  if (taskMaxTs != null && taskMaxTs > rangeEnd.getTime()) {
    rangeEnd = startOfDay(new Date(taskMaxTs));
  }
  if (rangeEnd.getTime() < rangeStart.getTime()) {
    const tmp = rangeStart;
    rangeStart = rangeEnd;
    rangeEnd = tmp;
  }
  if (rangeEnd.getTime() === rangeStart.getTime()) {
    rangeEnd = addDays(rangeStart, 1);
  }
  const minTs = rangeStart.getTime();
  const maxTs = rangeEnd.getTime();
  const rangeMs = Math.max(1, maxTs - minTs);
  const dayMs = 24 * 60 * 60 * 1000;
  const formatTsBR = (ts) => {
    const dt = new Date(ts);
    const dd = String(dt.getDate()).padStart(2, "0");
    const mm = String(dt.getMonth() + 1).padStart(2, "0");
    const yyyy = dt.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  const timelineTicks = [];
  const months = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
  const tickStart = new Date(new Date(minTs).getFullYear(), new Date(minTs).getMonth(), 1);
  const tickEnd = new Date(new Date(maxTs).getFullYear(), new Date(maxTs).getMonth(), 1);
  for (let d = new Date(tickStart); d <= tickEnd; d.setMonth(d.getMonth() + 1)) {
    const left = ((d.getTime() - minTs) / rangeMs) * 100;
    timelineTicks.push({
      label: `${months[d.getMonth()]} ${d.getFullYear()}`,
      left: Math.max(0, Math.min(100, left))
    });
  }

  const todayTs = todayStartTs();
  const todayLeft = todayTs >= minTs && todayTs <= maxTs ? ((todayTs - minTs) / rangeMs) * 100 : null;
  const startLabel = formatTsBR(minTs);
  const endLabel = formatTsBR(maxTs);

  const groupMap = new Map();
  normalizedTasks.forEach((task) => {
    if (!groupMap.has(task.phase)) groupMap.set(task.phase, []);
    groupMap.get(task.phase).push(task);
  });

  const ganttPhaseOrder = new Map([
    ["LEVANTAMENTO", 0],
    ["DESENVOLVIMENTO", 1],
    ["TESTES", 3],
    ["DEPLOY", 4]
  ]);
  const groups = Array.from(groupMap.entries()).sort((a, b) => {
    const aRank = ganttPhaseOrder.has(a[0]) ? ganttPhaseOrder.get(a[0]) : 2;
    const bRank = ganttPhaseOrder.has(b[0]) ? ganttPhaseOrder.get(b[0]) : 2;
    if (aRank !== bRank) return aRank - bRank;
    return a[0].localeCompare(b[0]);
  });

  const groupsHtml = groups
    .map(([phase, groupTasks]) => {
      const anyLate = groupTasks.some((task) => task.statusClass === "is-late");
      const allDone = groupTasks.every((task) => task.statusClass === "is-done");
      const epicColor = allDone ? "#2f8f61" : anyLate ? "#9b1c23" : "#245363";
      const progressAvg = groupTasks.length
        ? Math.round(groupTasks.reduce((acc, task) => acc + (task.progress || 0), 0) / groupTasks.length)
        : 0;
      const tasksHtml = groupTasks
        .sort((a, b) => {
          if (a.noDate && b.noDate) return a.title.localeCompare(b.title);
          if (a.noDate) return 1;
          if (b.noDate) return -1;
          return a.startDate.getTime() - b.startDate.getTime();
        })
        .map((task) => {
          if (task.noDate) {
            return `
              <div class="gantt-row">
                <div class="gantt-task-info">
                  <div class="gantt-task-title">${escapeHtml(task.title)}</div>
                </div>
                <div class="gantt-task-bar no-date">
                  <span class="gantt-task-meta">Sem datas definidas</span>
                </div>
              </div>
            `;
          }
          const startTs = task.startDate.getTime();
          const endTs = task.endDate.getTime();
          const spanMs = Math.max(dayMs, endTs - startTs);
          let leftPct = ((startTs - minTs) / rangeMs) * 100;
          let widthPct = (spanMs / rangeMs) * 100;
          if (!Number.isFinite(leftPct)) leftPct = 0;
          if (!Number.isFinite(widthPct)) widthPct = 1.5;
          widthPct = Math.max(widthPct, 1.5);
          if (widthPct > 100) widthPct = 100;
          leftPct = Math.max(0, Math.min(100 - widthPct, leftPct));
          const progressValue = Number.isFinite(task.progress) ? task.progress : 0;
          const progressPct = Math.max(0, Math.min(100, Math.round(progressValue)));
          const isCompact = widthPct < 5;
          const labelSide = leftPct + widthPct > 92 ? "label-left" : "label-right";
          const compactClass = isCompact ? "is-compact" : "";
          const labelClass = isCompact ? labelSide : "";
          return `
            <div class="gantt-row">
              <div class="gantt-task-info">
                <div class="gantt-task-title">${escapeHtml(task.title)}</div>
              </div>
              <div class="gantt-task-bar">
                <div class="gantt-bar ${task.statusClass} ${compactClass}" style="left:${leftPct.toFixed(2)}%; width:${widthPct.toFixed(2)}%;">
                  <div class="gantt-bar-fill" style="width:${progressPct}%;"></div>
                  <span class="gantt-bar-label ${labelClass}">${progressPct}%</span>
                </div>
              </div>
            </div>
          `;
        })
        .join("");
      return `
        <section class="gantt-group">
          <div class="gantt-group-header">
            <span>${escapeHtml(phase)}</span>
            <div class="gantt-epic-track">
              <span style="width:${progressAvg}%; background:${epicColor};"></span>
            </div>
          </div>
          ${tasksHtml || "<div class=\"gantt-empty\">Nenhuma atividade neste grupo.</div>"}
        </section>
      `;
    })
    .join("");

  const ticksHtml = timelineTicks
    .map((tick) => `<div class="gantt-tick" style="left:${tick.left.toFixed(2)}%"><span>${tick.label}</span></div>`)
    .join("");
  const todayHtml = todayLeft == null ? "" : `<div class="gantt-today" style="left:${todayLeft.toFixed(2)}%"></div>`;

  container.innerHTML = `
    <div class="gantt-canvas">
      <div class="gantt-timeline">
        ${ticksHtml}
        ${todayHtml}
      </div>
      <div class="gantt-content">
        <div class="gantt-top-row">
          <div class="gantt-top-label">Estrutura / Epicos</div>
          <div class="gantt-top-timeline">
            <span>Inicio: ${startLabel}</span>
            <span>Go Live: ${endLabel}</span>
            <div class="gantt-top-line"></div>
          </div>
        </div>
        ${groupsHtml}
      </div>
    </div>
  `;

  if (footerRight) {
    footerRight.textContent = "";
  }
}

function renderConfig(container) {
  setCrumbPathText("Configuracoes");
  const user = auth?.currentUser || null;
  const displayName = user?.displayName || "";
  const email = state.currentUserEmail || user?.email || "";
  const role = normalizeUserRole(state.currentUserRole);
  const admin = role === "admin";
  const roleName = roleLabel(role);

  container.innerHTML = `
    <div class="config-page span-all">
      <div class="section-header">
        <div class="header-row">
          <h2>Configuracoes da conta</h2>
        </div>
        <div class="muted">Atualize seu nome, e-mail ou senha de acesso.</div>
      </div>

      <div class="config-grid">
        <div class="config-card">
          <form id="account-form" class="form">
            <label>
              Nome completo
              <input id="account-name" type="text" value="${escapeHtml(displayName)}" placeholder="Seu nome completo">
            </label>
            <label>
              E-mail
              <input id="account-email" type="email" value="${escapeHtml(email)}" placeholder="seu@email.com">
            </label>
            <label>
              Senha atual
              <input id="account-current-password" type="password" placeholder="Obrigatoria para trocar e-mail ou senha" autocomplete="current-password">
            </label>
            <div class="form-grid">
              <label>
                Nova senha
                <input id="account-new-password" type="password" placeholder="Nova senha" autocomplete="new-password">
              </label>
              <label>
                Confirmar senha
                <input id="account-confirm-password" type="password" placeholder="Repita a nova senha" autocomplete="new-password">
              </label>
            </div>
            <div class="config-hint">Para alterar e-mail ou senha, confirme sua senha atual.</div>
            <div class="config-actions">
              <button class="btn primary" type="submit">Salvar alteracoes</button>
            </div>
            <p id="account-error" class="config-message error hidden"></p>
            <p id="account-success" class="config-message success hidden"></p>
          </form>
        </div>

        <div class="config-card">
          <div class="config-card-title">Dados da conta</div>
          <div class="config-info">
            <div>
              <div class="config-info-label">Usuario</div>
              <div class="config-info-value" id="config-info-name">${escapeHtml(displayName || "Nao informado")}</div>
            </div>
            <div>
              <div class="config-info-label">E-mail</div>
              <div class="config-info-value" id="config-info-email">${escapeHtml(email || "-")}</div>
            </div>
            <div>
              <div class="config-info-label">Perfil</div>
              <div class="config-info-value">${roleName}</div>
            </div>
          </div>
        </div>
      </div>

      ${admin ? `
        <div class="section-header">
          <div class="header-row">
            <h2>Usuarios da plataforma</h2>
          </div>
          <div class="muted">Somente administradores podem visualizar e editar cadastros internos.</div>
        </div>
        <div class="config-card" id="admin-users-section">
          <div id="admin-users-list" class="config-admin-table">Carregando usuarios...</div>
          <div class="config-hint">Use "Resetar senha" para enviar o e-mail de redefinicao ao usuario.</div>
        </div>

        <div class="section-header">
          <div class="header-row">
            <h2>Grupos de acesso</h2>
          </div>
          <div class="muted">Defina quais usuarios visualizam cada cliente.</div>
        </div>
        <div class="config-card" id="admin-groups-section">
          <div class="group-create">
            <input class="config-input" id="group-name-input" type="text" placeholder="Nome do grupo">
            <button class="btn sm primary" type="button" id="group-create-btn">Criar grupo</button>
          </div>
          <div id="admin-groups-list" class="config-groups">Carregando grupos...</div>
        </div>
      ` : ""}
    </div>
  `;

  const form = byId("account-form");
  if (form) {
    form.addEventListener("submit", handleAccountUpdate);
  }

  if (admin) {
    loadAdminUsers();
    loadAdminGroups();
    const groupCreateBtn = byId("group-create-btn");
    if (groupCreateBtn && !groupCreateBtn.dataset.wired) {
      groupCreateBtn.addEventListener("click", async () => {
        const input = byId("group-name-input");
        const name = input?.value.trim() || "";
        if (!name) {
          alert("Informe o nome do grupo.");
          return;
        }
        try {
          await createGroupInDb(name);
          if (input) input.value = "";
          await loadAdminGroups();
        } catch (err) {
          console.error(err);
          alert("Nao foi possivel criar o grupo.");
        }
      });
      groupCreateBtn.dataset.wired = "true";
    }
  }
}

async function handleAccountUpdate(e) {
  e.preventDefault();
  const user = auth?.currentUser;
  if (!user) {
    setAccountMessage("error", "Usuario nao autenticado.");
    return;
  }
  const nameInput = byId("account-name");
  const emailInput = byId("account-email");
  const currentPassInput = byId("account-current-password");
  const newPassInput = byId("account-new-password");
  const confirmPassInput = byId("account-confirm-password");

  const newName = nameInput?.value.trim() || "";
  const newEmail = emailInput?.value.trim() || "";
  const currentPassword = currentPassInput?.value || "";
  const newPassword = newPassInput?.value || "";
  const confirmPassword = confirmPassInput?.value || "";

  setAccountMessage("", "");

  if (!newEmail) {
    setAccountMessage("error", "Informe um e-mail valido.");
    return;
  }
  if (newPassword && newPassword.length < 6) {
    setAccountMessage("error", "A nova senha precisa ter ao menos 6 caracteres.");
    return;
  }
  if (newPassword && newPassword !== confirmPassword) {
    setAccountMessage("error", "As novas senhas nao conferem.");
    return;
  }

  const needsEmailUpdate = newEmail && newEmail !== user.email;
  const needsPasswordUpdate = Boolean(newPassword);

  try {
    if (needsEmailUpdate || needsPasswordUpdate) {
      await reauthenticateUser(user, currentPassword);
    }
    if (newName && newName !== user.displayName) {
      await user.updateProfile({ displayName: newName });
    }
    if (needsEmailUpdate) {
      await user.updateEmail(newEmail);
    }
    if (needsPasswordUpdate) {
      await user.updatePassword(newPassword);
    }
    await syncUserProfile(user);
    await loadCurrentUserRole(user);
    updateUserHeader(user);
    setAccountMessage("success", "Dados atualizados com sucesso.");
    if (currentPassInput) currentPassInput.value = "";
    if (newPassInput) newPassInput.value = "";
    if (confirmPassInput) confirmPassInput.value = "";
    const infoName = byId("config-info-name");
    if (infoName && newName) infoName.textContent = newName;
    const infoEmail = byId("config-info-email");
    if (infoEmail && needsEmailUpdate) infoEmail.textContent = newEmail;
    if (needsEmailUpdate) state.currentUserEmail = newEmail;
  } catch (err) {
    console.error(err);
    if (err?.code === "auth/requires-recent-login") {
      setAccountMessage("error", "Confirme sua autenticacao para atualizar dados sensiveis.");
      return;
    }
    if (err?.code === "auth/wrong-password") {
      setAccountMessage("error", "Senha atual incorreta.");
      return;
    }
    if (err?.code === "auth/invalid-email") {
      setAccountMessage("error", "E-mail invalido.");
      return;
    }
    if (err?.code === "auth/email-already-in-use") {
      setAccountMessage("error", "E-mail ja esta em uso.");
      return;
    }
    if (err?.message) {
      setAccountMessage("error", err.message);
      return;
    }
    setAccountMessage("error", "Nao foi possivel atualizar os dados.");
  }
}

async function loadAdminUsers() {
  const list = byId("admin-users-list");
  if (!list) return;
  if (!db) {
    list.textContent = "Usuarios indisponiveis sem Firebase configurado.";
    return;
  }
  try {
    const users = await loadUsersFromDb();
    state.users = users.slice();
    renderAdminUsers(list, users);
  } catch (err) {
    console.error(err);
    list.textContent = "Falha ao carregar usuarios.";
  }
}

async function loadAdminGroups() {
  const list = byId("admin-groups-list");
  if (!list) return;
  if (!db) {
    list.textContent = "Grupos indisponiveis sem Firebase configurado.";
    return;
  }
  try {
    const groups = await loadGroupsFromDb();
    state.groups = groups.slice();
    if (!state.users.length) {
      state.users = await loadUsersFromDb();
    }
    renderAdminGroups(list, groups, state.users);
  } catch (err) {
    console.error(err);
    list.textContent = "Falha ao carregar grupos.";
  }
}

function renderAdminUsers(container, users) {
  const rows = users
    .sort((a, b) => (a.email || "").localeCompare(b.email || ""))
    .map((user) => {
      const email = escapeHtml(user.email || "");
      const name = escapeHtml(user.displayName || "");
      const isMaster = isAdminEmail(user.email);
      const role = normalizeUserRole(user.role);
      const canReset = Boolean(user.email);
      return `
        <div class="config-admin-row" data-user-id="${escapeHtml(user.uid)}" data-user-email="${email}">
          <input class="config-input" type="text" value="${name}" placeholder="Nome" data-user-name>
          <div class="config-user-email">${email || "-"}</div>
          <select class="config-input" data-user-role ${isMaster ? "disabled" : ""}>
            <option value="user"${role === "user" ? " selected" : ""}>Usuario</option>
            <option value="developer"${role === "developer" ? " selected" : ""}>Desenvolvedor</option>
            <option value="admin"${role === "admin" ? " selected" : ""}>Administrador</option>
          </select>
          <button class="btn sm ghost" type="button" data-user-save ${isMaster ? "disabled" : ""}>Salvar</button>
          <button class="btn sm ghost" type="button" data-user-reset ${!canReset ? "disabled" : ""}>Resetar senha</button>
          <div class="config-admin-status" data-user-status></div>
        </div>
      `;
    })
    .join("");

  container.innerHTML = `
    <div class="config-admin-row header">
      <div>Nome</div>
      <div>E-mail</div>
      <div>Perfil</div>
      <div>Salvar</div>
      <div>Reset senha</div>
      <div></div>
    </div>
    ${rows || "<div class=\"muted\">Nenhum usuario cadastrado.</div>"}
  `;

  if (!container.dataset.wired) {
    container.addEventListener("click", async (e) => {
      const saveBtn = e.target.closest("[data-user-save]");
      const resetBtn = e.target.closest("[data-user-reset]");
      if (!saveBtn && !resetBtn) return;
      const row = (saveBtn || resetBtn).closest("[data-user-id]");
      if (!row) return;
      const status = row.querySelector("[data-user-status]");

      if (resetBtn) {
        const email = row.dataset.userEmail || "";
        if (!email) {
          if (status) {
            status.textContent = "E-mail indisponivel.";
            status.classList.remove("success");
            status.classList.add("error");
          }
          return;
        }
        const confirmed = window.confirm(`Enviar redefinicao de senha para ${email}?`);
        if (!confirmed) return;
        if (status) {
          status.textContent = "Enviando...";
          status.classList.remove("error");
          status.classList.remove("success");
        }
        try {
          await sendPasswordReset(email);
          if (status) {
            status.textContent = "E-mail enviado.";
            status.classList.add("success");
          }
        } catch (err) {
          console.error(err);
          if (status) {
            status.textContent = "Erro ao enviar.";
            status.classList.add("error");
          }
        }
        return;
      }

      const uid = row.dataset.userId;
      const nameInput = row.querySelector("[data-user-name]");
      const roleSelect = row.querySelector("[data-user-role]");
      const newName = nameInput?.value.trim() || "";
      const newRole = normalizeUserRole(roleSelect?.value);
      if (status) {
        status.textContent = "Salvando...";
        status.classList.remove("error");
        status.classList.remove("success");
      }
      try {
        await updateUserProfileInDb(uid, { displayName: newName, role: newRole });
        if (auth?.currentUser?.uid === uid) {
          await loadCurrentUserRole(auth.currentUser);
          renderMain();
        }
        if (status) {
          status.textContent = "Salvo.";
          status.classList.add("success");
        }
      } catch (err) {
        console.error(err);
        if (status) {
          status.textContent = "Erro ao salvar.";
          status.classList.add("error");
        }
      }
    });
    container.dataset.wired = "true";
  }
}

function renderAdminGroups(container, groups, users) {
  const clients = state.clients || [];
  const groupHtml = groups
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((group) => {
      const membersHtml = users
        .sort((a, b) => (a.email || "").localeCompare(b.email || ""))
        .map((user) => {
          const name = escapeHtml(user.displayName || user.email || "Usuario");
          const email = escapeHtml(user.email || "");
          const isMember = Boolean(group.members?.[user.uid]);
          return `
            <label class="config-group-item">
              <input type="checkbox" data-group-member data-user-id="${escapeHtml(user.uid)}"${isMember ? " checked" : ""}>
              <span>${name}</span>
              <small>${email}</small>
            </label>
          `;
        })
        .join("");

      const clientsHtml = clients
        .sort((a, b) => (a.name || "").localeCompare(b.name || ""))
        .map((client) => {
          const isAssigned = Boolean(group.clients?.[client.id]);
          const clientName = escapeHtml(client.name || "Cliente");
          return `
            <label class="config-group-item">
              <input type="checkbox" data-group-client data-client-id="${escapeHtml(client.id)}"${isAssigned ? " checked" : ""}>
              <span>${clientName}</span>
            </label>
          `;
        })
        .join("");

      return `
        <div class="config-group" data-group-id="${escapeHtml(group.id)}">
          <div class="config-group-header">
            <input class="config-input" type="text" value="${escapeHtml(group.name)}" data-group-name>
            <div class="config-group-actions">
              <button class="btn sm ghost" type="button" data-group-save>Salvar</button>
              <button class="btn sm ghost danger" type="button" data-group-delete>Excluir</button>
            </div>
          </div>
          <div class="config-group-columns">
            <div class="config-group-col">
              <div class="config-group-title">Usuarios</div>
              <div class="config-group-list">${membersHtml || "<div class=\"muted\">Sem usuarios</div>"}</div>
            </div>
            <div class="config-group-col">
              <div class="config-group-title">Clientes</div>
              <div class="config-group-list">${clientsHtml || "<div class=\"muted\">Sem clientes</div>"}</div>
            </div>
          </div>
        </div>
      `;
    })
    .join("");

  container.innerHTML = groupHtml || "<div class=\"muted\">Nenhum grupo cadastrado.</div>";

  if (container.dataset.wired) return;
  container.dataset.wired = "true";

  container.addEventListener("click", async (e) => {
    const groupRow = e.target.closest("[data-group-id]");
    if (!groupRow) return;
    const groupId = groupRow.dataset.groupId;
    if (e.target.closest("[data-group-save]")) {
      const nameInput = groupRow.querySelector("[data-group-name]");
      const name = nameInput?.value.trim() || "Grupo";
      try {
        await updateGroupNameInDb(groupId, name);
        await loadAdminGroups();
      } catch (err) {
        console.error(err);
      }
    }
    if (e.target.closest("[data-group-delete]")) {
      const confirmed = window.confirm("Excluir este grupo? Os clientes vinculados ficarao sem grupo.");
      if (!confirmed) return;
      try {
        await deleteGroupFromDb(groupId);
        await loadAdminGroups();
      } catch (err) {
        console.error(err);
      }
    }
  });

  container.addEventListener("change", async (e) => {
    const groupRow = e.target.closest("[data-group-id]");
    if (!groupRow) return;
    const groupId = groupRow.dataset.groupId;
    const memberInput = e.target.closest("[data-group-member]");
    if (memberInput) {
      const uid = memberInput.dataset.userId;
      const enabled = memberInput.checked;
      try {
        await updateGroupMemberInDb(groupId, uid, enabled);
        await loadAdminGroups();
      } catch (err) {
        console.error(err);
      }
      return;
    }
    const clientInput = e.target.closest("[data-group-client]");
    if (clientInput) {
      const clientId = clientInput.dataset.clientId;
      const enabled = clientInput.checked;
      try {
        if (enabled) {
          await assignClientToGroup(clientId, groupId);
        } else {
          await removeClientFromGroup(clientId, groupId);
        }
        await loadAdminGroups();
      } catch (err) {
        console.error(err);
      }
    }
  });
}

function captureScrollPositions() {
  const positions = {};
  document.querySelectorAll("[data-preserve-scroll]").forEach((el) => {
    const key = el.dataset.preserveScroll;
    if (!key) return;
    positions[key] = el.scrollTop;
  });
  return positions;
}

function restoreScrollPositions(positions) {
  if (!positions) return;
  document.querySelectorAll("[data-preserve-scroll]").forEach((el) => {
    const key = el.dataset.preserveScroll;
    if (!key) return;
    if (!(key in positions)) return;
    el.scrollTop = positions[key];
  });
}

function renderMain() {
  removeRelatorioStyles(); 

  if (normalizeUserRole(state.currentUserRole) === "developer" && state.currentSection !== "dev-board") {
    state.currentSection = "dev-board";
  }

  const prevContext = state.lastRenderContext || null;
  const nextContext = {
    section: state.currentSection,
    clientId: state.selectedClient?.id || state.selectedClient?.name || null,
    projectId: state.selectedProject?.id || state.selectedProject?.name || null
  };
  const preserveScroll =
    prevContext &&
    prevContext.section === nextContext.section &&
    prevContext.clientId === nextContext.clientId &&
    prevContext.projectId === nextContext.projectId;
  const scrollX = preserveScroll ? window.scrollX : 0;
  const scrollY = preserveScroll ? window.scrollY : 0;
  const scrollPositions = preserveScroll ? captureScrollPositions() : null;

  const { selectedClient, selectedProject } = state;
  const panels = byId("dashboard-panels");
  panels.innerHTML = "";
  setActiveNav(state.currentSection);
  updateTopActions();

  if (state.currentSection === "dashboard-melhorias" || state.currentSection === "minhas-melhorias") {
    state.currentSection = "dashboard";
  }

  const finalizeRender = () => {
    state.lastRenderContext = nextContext;
    if (preserveScroll) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.scrollTo(scrollX, scrollY);
          restoreScrollPositions(scrollPositions);
        });
      });
    }
  };

  if (state.currentSection === "inicio") {
    renderHome(panels);
    finalizeRender();
    return;
  }

  if (state.currentSection === "dashboard") {
    renderDashboard(panels);
    finalizeRender();
    return;
  }

  if (state.currentSection === "relatorio") {
    renderRelatorioSection();
    finalizeRender();
    return;
  }

  if (state.currentSection === "monitor") {
    renderMonitorActivities(panels);
    finalizeRender();
    return;
  }

  if (state.currentSection === "dev-board") {
    renderDeveloperBoard(panels);
    finalizeRender();
    return;
  }

  if (state.currentSection === "config") {
    renderConfig(panels);
    finalizeRender();
    return;
  }

  if (!selectedClient || !selectedProject) {
    if (!state.clients.length) {
      const message = state.dbAccessDenied
        ? "Sem acesso aos projetos cadastrados. Solicite liberacao ao administrador."
        : "Nenhum projeto cadastrado no momento.";
      panels.innerHTML = `<div class="empty-state span-all" style="text-align: center; padding: 40px;"><h2>Projetos indisponiveis</h2><p>${message}</p></div>`;
    } else {
      panels.innerHTML = `<div class="empty-state span-all" style="text-align: center; padding: 40px;"><h2>Bem-vindo!</h2><p>Selecione um cliente e um projeto na barra lateral para começar.</p></div>`;
    }
    finalizeRender();
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
  const realizedPct = progressPct;
  const gap = round1(baselinePct - realizedPct);
  const gapStart = round1(Math.min(realizedPct, baselinePct));
  const gapWidth = round1(Math.abs(realizedPct - baselinePct));
  const gapStatus = gapStatusInfo(gap, baselinePct, realizedPct);
  const progressTrendClass = realizedPct > baselinePct ? "is-ahead" : realizedPct < baselinePct ? "is-behind" : "";
  const progressTrackClass = [
    "progress-track",
    progressTrendClass,
    gapStatus.className === "gap-critical" ? "is-critical" : ""
  ]
    .filter(Boolean)
    .join(" ");
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
      <div class="meta-item card--meta">
        <div class="label">Cliente</div>
        <div class="value">${selectedClient.name}</div>
      </div>
      <div class="meta-item card--meta">
        <div class="label">Responsavel</div>
        <div class="value">${selectedProject.developer || "A definir"}</div>
      </div>
      <div class="meta-item card--meta">
        <div class="label">Data inicio</div>
        <div class="value is-editable" data-edit-project-date="start" tabindex="0" role="button" aria-label="Editar data inicio">
          ${formatDateBR(selectedProject.start) || "-"}
        </div>
      </div>
      <div class="meta-item card--meta">
        <div class="label">Go Live previsto</div>
        <div class="value is-editable" data-edit-project-date="end" tabindex="0" role="button" aria-label="Editar data fim">
          ${formatDateBR(selectedProject.end) || "-"}
        </div>
      </div>
    </div>
  `;

  const performanceGrid = document.createElement("div");
  performanceGrid.className = "metrics-grid performance-grid project-performance-grid span-all";
  performanceGrid.innerHTML = `
    <div class="metric-card card--kpi performance-card realizado">
      <div class="label">Realizado (%)</div>
      <div class="value">${progressPct}%</div>
      <div class="sub">Atividades concluidas</div>
    </div>
    <div class="metric-card card--kpi performance-card previsto">
      <div class="label">Previsto (Baseline)</div>
      <div class="value">${baselineLabel}%</div>
      <div class="sub">Meta para hoje</div>
    </div>
    <div class="metric-card card--kpi performance-card gap ${gapStatus.className}">
      <div class="label">GAP (Desvio)</div>
      <div class="value">${gapLabel}pp</div>
      <div class="sub">${gapStatus.label}</div>
    </div>
  `;

  const progressCompare = document.createElement("div");
  progressCompare.className = "card progress-compare card--progress span-all";
  progressCompare.innerHTML = `
    <div class="progress-head">
      <div class="progress-title">Avanço vs meta</div>
      <div class="progress-legend">
        <span class="leg"><b>Realizado</b> <span>${progressPct}%</span></span>
        <span class="dot">•</span>
        <span class="leg"><b>Previsto</b> <span>${baselineLabel}%</span></span>
      </div>
      <div class="delta-badge ${gapStatus.className}">${gapLabel}pp</div>
    </div>
    <div class="${progressTrackClass}" style="--realized: ${realizedPct}%; --baseline: ${baselinePct}%; --gapStart: ${gapStart}%; --gapW: ${gapWidth}%;">
      <div class="progress-baseline"></div>
      <div class="progress-gap" aria-hidden="true"></div>
      <div class="progress-realized ${gapStatus.className}"></div>
      <div class="progress-marker"></div>
      <div class="progress-knob ${gapStatus.className}" aria-hidden="true"></div>
    </div>
  `;

  const metricsGrid = document.createElement("div");
  metricsGrid.className = "metrics-grid project-metrics-grid span-all";
  metricsGrid.innerHTML = `
    <div class="metric-card card--kpi">
      <div class="label">Total de atividades</div>
      <div class="value">${metrics.total}</div>
    </div>
    <div class="metric-card card--kpi">
      <div class="label">Atividades concluidas</div>
      <div class="value">${metrics.done}</div>
    </div>
    <div class="metric-card card--kpi">
      <div class="label">Atividades pendentes</div>
      <div class="value">${metrics.pending}</div>
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
  tasksBox.dataset.preserveScroll = `tasks-${selectedProject.id || selectedProject.name || "default"}`;
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
              <div class="task-date task-date-editable" data-edit-task-date="start" data-task-index="${task._idx}" tabindex="0" role="button" aria-label="Editar data inicio">${startLabel}</div>
              <div class="task-date task-date-editable" data-edit-task-date="due" data-task-index="${task._idx}" tabindex="0" role="button" aria-label="Editar data fim">${endLabel}</div>
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
          <div class="task-date task-date-editable" data-edit-task-date="start" data-task-index="${task._idx}" tabindex="0" role="button" aria-label="Editar data inicio">${startLabel}</div>
          <div class="task-date task-date-editable" data-edit-task-date="due" data-task-index="${task._idx}" tabindex="0" role="button" aria-label="Editar data fim">${endLabel}</div>
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

  finalizeRender();
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

    if (normalizeUserRole(state.currentUserRole) === "developer" && section !== "dev-board") {
      state.currentSection = "dev-board";
      setActiveNav(state.currentSection);
      renderMain();
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
  const clientModal = byId("client-modal");
  const activityModal = byId("activity-modal");
  const monitorTaskModal = byId("monitor-task-modal");
  const ganttModal = byId("gantt-modal");
  const deleteProjectBtn = byId("delete-project-btn");
  const deleteClientBtn = byId("delete-client-btn");

  const openProjectBtn = byId("open-project-modal");
  const editProjectBtn = byId("edit-project-btn");
  const openEmployeeBtn = byId("open-employee-modal");
  const openGanttBtn = byId("open-gantt-btn");

  if (openProjectBtn) {
    openProjectBtn.addEventListener("click", () => openProjectModal("new"));
  }
  if (editProjectBtn) {
    editProjectBtn.addEventListener("click", () => openProjectModal("edit"));
  }
  if (openEmployeeBtn && employeeModal) {
    openEmployeeBtn.addEventListener("click", () => showModal(employeeModal));
  }
  if (openGanttBtn) {
    openGanttBtn.addEventListener("click", () => openGanttModal());
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
      if (clientModal) hideModal(clientModal);
      if (activityModal) hideModal(activityModal);
      if (monitorTaskModal) hideModal(monitorTaskModal);
      if (ganttModal) hideModal(ganttModal);
      resetProjectModal();
      resetClientModal();
      resetActivityModal();
      resetMonitorTaskModal();
    });
  });

  if (deleteProjectBtn) {
    deleteProjectBtn.addEventListener("click", () => handleDeleteProject());
  }
  if (deleteClientBtn) {
    deleteClientBtn.addEventListener("click", () => handleDeleteClient());
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

  const clientForm = byId("client-form");
  if (clientForm) {
    clientForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleSaveClient();
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
      if (normalizeTaskStatus(task.status) === "concluido" && task.due) {
        task.dataConclusao = task.due;
      }
      if (state.editingTaskIndex !== null && state.editingTaskIndex !== undefined) {
        const idx = Number(state.editingTaskIndex);
        const currentTask = selectedProject.tasks?.[idx];
        if (!currentTask) return;
        const payload = { ...currentTask, ...task };
        applyTaskStatus(payload, payload.status);
        if (normalizeTaskStatus(payload.status) === "concluido" && payload.due) {
          payload.dataConclusao = payload.due;
        }
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

function wireInlineProjectDates() {
  if (document.body.dataset.inlineDatesWired) return;
  document.body.dataset.inlineDatesWired = "true";

  const startEdit = (target) => {
    const project = state.selectedProject;
    const client = state.selectedClient;
    if (!project || !client) return;
    const field = target.dataset.editProjectDate;
    if (!field || !["start", "end"].includes(field)) return;
    if (target.querySelector("input")) return;

  const currentValue = field === "start" ? (project.start || project.startDate) : (project.end || project.goLiveDate || project.goLive);
    const prevText = target.textContent.trim();
    const input = document.createElement("input");
    input.type = "date";
    input.className = "date-inline-input";
    input.value = formatDateISO(currentValue);
    input.setAttribute("aria-label", field === "start" ? "Data inicio" : "Data fim");

    target.textContent = "";
    target.appendChild(input);
    input.focus();

    let finished = false;
    let canceled = false;

    const restore = () => {
      target.textContent = prevText || "-";
    };

    const commit = () => {
      if (finished || canceled) return;
      finished = true;
      const nextValue = input.value || "";
      const nextStart = field === "start" ? nextValue : (project.start || project.startDate || "");
      const nextEnd = field === "end" ? nextValue : (project.end || project.goLiveDate || project.goLive || "");
      const payload = {
        name: project.name,
        developer: project.developer || "",
        start: nextStart,
        end: nextEnd,
        startDate: nextStart,
        goLiveDate: nextEnd,
        client: client.name
      };

      if (db && project.id && project.clientId) {
        updateProjectOnDb(project.clientId, project.id, payload)
          .then(async () => {
            await loadStateFromDb();
            renderClientList();
            renderMain();
          })
          .catch((err) => {
            console.error(err);
            alert("Erro ao atualizar datas do projeto.");
            restore();
          });
      } else {
        updateProjectInState(payload);
        saveLocalState();
        renderClientList();
        renderMain();
      }
    };

    const cancel = () => {
      if (finished) return;
      canceled = true;
      finished = true;
      restore();
    };

    input.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter") {
        ev.preventDefault();
        input.blur();
      }
      if (ev.key === "Escape") {
        ev.preventDefault();
        cancel();
      }
    });
    input.addEventListener("blur", () => {
      if (canceled) return;
      commit();
    });
  };

  document.body.addEventListener("click", (e) => {
    const target = e.target.closest("[data-edit-project-date]");
    if (!target) return;
    e.preventDefault();
    startEdit(target);
  });

  document.body.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const target = e.target.closest("[data-edit-project-date]");
    if (!target) return;
    e.preventDefault();
    startEdit(target);
  });
}

function wireInlineTaskDates() {
  if (document.body.dataset.inlineTaskDatesWired) return;
  document.body.dataset.inlineTaskDatesWired = "true";

  const startEdit = (target) => {
    const project = state.selectedProject;
    if (!project) return;
    const idx = Number(target.dataset.taskIndex);
    if (Number.isNaN(idx)) return;
    const field = target.dataset.editTaskDate;
    if (!field || !["start", "due"].includes(field)) return;
    if (target.querySelector("input")) return;

    const task = project.tasks?.[idx];
    if (!task) return;

    const currentValue = field === "start" ? taskStartStr(task) : taskDueStr(task);
    const prevText = target.textContent.trim();
    const input = document.createElement("input");
    input.type = "date";
    input.className = "date-inline-input";
    input.value = formatDateISO(currentValue);
    input.setAttribute("aria-label", field === "start" ? "Data inicio" : "Data fim");

    target.textContent = "";
    target.appendChild(input);
    input.focus();

    let finished = false;
    let canceled = false;

    const restore = () => {
      target.textContent = prevText || "-";
    };

    const commit = () => {
      if (finished || canceled) return;
      finished = true;
      const nextValue = input.value || "";
    const key = field === "start" ? taskStartKey(task) : taskDueKey(task);
    const prevValue = task?.[key] ?? "";
    task[key] = nextValue;
    if (field === "due" && normalizeTaskStatus(task.status) === "concluido") {
      task.dataConclusao = nextValue || task.dataConclusao || "";
    }

    const payload = { ...task, [key]: nextValue };
      if (db && project.id && project.clientId && task.id) {
        updateTaskOnDb(project.clientId, project.id, task.id, payload)
          .then(() => {
            renderMain();
          })
          .catch((err) => {
            console.error(err);
            task[key] = prevValue;
            alert("Erro ao atualizar datas da atividade.");
            renderMain();
          });
        return;
      }
      saveLocalState();
      renderMain();
    };

    const cancel = () => {
      if (finished) return;
      canceled = true;
      finished = true;
      restore();
    };

    input.addEventListener("keydown", (ev) => {
      if (ev.key === "Enter") {
        ev.preventDefault();
        input.blur();
      }
      if (ev.key === "Escape") {
        ev.preventDefault();
        cancel();
      }
    });
    input.addEventListener("blur", () => {
      if (canceled) return;
      commit();
    });
  };

  document.body.addEventListener("click", (e) => {
    const target = e.target.closest("[data-edit-task-date]");
    if (!target) return;
    e.preventDefault();
    startEdit(target);
  });

  document.body.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const target = e.target.closest("[data-edit-task-date]");
    if (!target) return;
    e.preventDefault();
    startEdit(target);
  });
}

function openMonitorTaskModalByIndexes(clientIndex, projectIndex, taskIndex) {
  const client = state.clients?.[clientIndex];
  const project = client?.projects?.[projectIndex];
  const task = project?.tasks?.[taskIndex];
  if (!client || !project || !task) return;

  state.monitorEditing = { clientIndex, projectIndex, taskIndex };

  const modal = byId("monitor-task-modal");
  const form = byId("monitor-task-form");
  if (!modal || !form) return;

  form.elements.name.value = task.title || "";
  form.elements.due.value = formatDateISO(taskDueStr(task));

  const responsibleSelect = form.elements.responsible;
  const options = new Set();
  if (taskOwner(task)) options.add(taskOwner(task));
  if (project.developer) options.add(project.developer);
  (state.employees || []).forEach((employee) => {
    if (employee?.name) options.add(employee.name);
  });
  responsibleSelect.innerHTML = "";
  const emptyOption = document.createElement("option");
  emptyOption.value = "";
  emptyOption.textContent = "A definir";
  responsibleSelect.appendChild(emptyOption);
  Array.from(options).forEach((name) => {
    const opt = document.createElement("option");
    opt.value = name;
    opt.textContent = name;
    responsibleSelect.appendChild(opt);
  });
  responsibleSelect.value = taskOwner(task) || project.developer || "";

  showModal(modal);
}

function resetMonitorTaskModal() {
  const form = byId("monitor-task-form");
  state.monitorEditing = null;
  if (form) form.reset();
}

function saveMonitorTaskChanges() {
  const edit = state.monitorEditing;
  if (!edit) return;
  const client = state.clients?.[edit.clientIndex];
  const project = client?.projects?.[edit.projectIndex];
  const task = project?.tasks?.[edit.taskIndex];
  if (!client || !project || !task) return;

  const form = byId("monitor-task-form");
  if (!form) return;

  const name = form.elements.name.value.trim();
  const dueValue = form.elements.due.value || "";
  const responsible = form.elements.responsible.value || "";
  const dueKey = taskDueKey(task);

  const previous = { title: task.title, responsible: task.responsible, due: task[dueKey] };
  task.title = name || task.title || "";
  task.responsible = responsible;
  task[dueKey] = dueValue;

  const payload = { ...task, [dueKey]: dueValue, responsible };
  if (db && project.id && client.id && task.id) {
    updateTaskOnDb(client.id, project.id, task.id, payload)
      .then(() => {
        hideModal(byId("monitor-task-modal"));
        resetMonitorTaskModal();
        renderMain();
      })
      .catch((err) => {
        console.error(err);
        task.title = previous.title;
        task.responsible = previous.responsible;
        task[dueKey] = previous.due;
        alert("Erro ao atualizar atividade.");
        renderMain();
      });
    return;
  }
  saveLocalState();
  hideModal(byId("monitor-task-modal"));
  resetMonitorTaskModal();
  renderMain();
}

function setupMonitorActions() {
  if (document.body.dataset.monitorWired) return;
  document.body.dataset.monitorWired = "true";

  document.body.addEventListener("click", (e) => {
    const filterBtn = e.target.closest("[data-monitor-filter-btn]");
    if (filterBtn) {
      const popover = byId("monitor-filter-popover");
      if (popover) popover.classList.toggle("show");
      return;
    }

    const filterOpt = e.target.closest("[data-monitor-filter]");
    if (filterOpt) {
      state.monitor.filter = filterOpt.dataset.monitorFilter || "all";
      renderMain();
      return;
    }

    const card = e.target.closest("[data-monitor-card]");
    if (card) {
      const popover = byId("monitor-filter-popover");
      if (popover) popover.classList.remove("show");
      const clientIndex = Number(card.dataset.clientIndex);
      const projectIndex = Number(card.dataset.projectIndex);
      const taskIndex = Number(card.dataset.taskIndex);
      if (Number.isFinite(clientIndex) && Number.isFinite(projectIndex) && Number.isFinite(taskIndex)) {
        openMonitorTaskModalByIndexes(clientIndex, projectIndex, taskIndex);
      }
      return;
    }

    if (!e.target.closest("#monitor-filter-popover")) {
      const popover = byId("monitor-filter-popover");
      if (popover) popover.classList.remove("show");
    }
  });

  document.body.addEventListener("change", (e) => {
    const select = e.target.closest("[data-monitor-select]");
    if (!select) return;
    const key = select.dataset.monitorSelect;
    if (!key) return;
    state.monitor[key] = select.value || "";
    renderMain();
  });

  const monitorForm = byId("monitor-task-form");
  if (monitorForm) {
    monitorForm.addEventListener("submit", (e) => {
      e.preventDefault();
      saveMonitorTaskChanges();
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
  const nextStart = payload.start ?? existing.start ?? existing.startDate ?? "";
  const nextEnd = payload.end ?? existing.end ?? existing.goLiveDate ?? existing.goLive ?? "";
  const updated = {
    ...existing,
    name: payload.name,
    developer: payload.developer,
    start: nextStart,
    end: nextEnd,
    startDate: nextStart,
    goLiveDate: nextEnd
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

function getClientFromModal() {
  const form = byId("client-form");
  if (!form) return null;
  const clientId = form.dataset.clientId;
  const clientName = form.dataset.clientName;
  if (clientId) {
    const found = state.clients.find((c) => c.id === clientId);
    if (found) return found;
  }
  if (clientName) {
    const found = state.clients.find((c) => c.name === clientName);
    if (found) return found;
  }
  return state.selectedClient || null;
}

async function renameClient(client, nextName) {
  if (!client) return;
  const trimmed = String(nextName || "").trim();
  if (!trimmed || trimmed === client.name) return;
  const existing = findClientByName(trimmed);
  if (existing && existing !== client) {
    alert("Ja existe um cliente com esse nome.");
    return;
  }

  const previousName = client.name;
  if (db && client.id) {
    try {
      await db.ref(`clients/${client.id}`).update({ name: trimmed });
      await loadStateFromDb({
        clientId: client.id,
        projectId: state.selectedProject?.id,
        clientName: trimmed,
        projectName: state.selectedProject?.name
      });
      return;
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar cliente no Firebase.");
      return;
    }
  }

  client.name = trimmed;
  if (Object.prototype.hasOwnProperty.call(state.clientVisibility, previousName)) {
    state.clientVisibility[trimmed] = state.clientVisibility[previousName];
    delete state.clientVisibility[previousName];
  }
  saveLocalState();
  renderClientList();
  renderMain();
  hydrateClientSelect(client.name);
}

async function handleRenameClient(client) {
  if (!client) return;
  const nextName = promptRenameClientName(client.name);
  if (!nextName || nextName === client.name) return;
  await renameClient(client, nextName);
}

function openClientModal(client) {
  const modal = byId("client-modal");
  const form = byId("client-form");
  if (!modal || !form) return;
  const nameInput = form.querySelector('input[name="name"]');
  const title = modal.querySelector("h2");
  const submitBtn = form.querySelector('button[type="submit"]');
  const deleteBtn = byId("delete-client-btn");
  if (title) title.textContent = "Editar Cliente";
  if (submitBtn) submitBtn.textContent = "Salvar Cliente";
  if (nameInput) nameInput.value = client?.name || "";
  form.dataset.clientId = client?.id || "";
  form.dataset.clientName = client?.name || "";
  if (deleteBtn) deleteBtn.classList.toggle("hidden", !client);
  showModal(modal);
  if (nameInput) nameInput.focus();
}

function resetClientModal() {
  const modal = byId("client-modal");
  const form = byId("client-form");
  const deleteBtn = byId("delete-client-btn");
  if (form) {
    form.reset();
    delete form.dataset.clientId;
    delete form.dataset.clientName;
  }
  if (deleteBtn) deleteBtn.classList.add("hidden");
  if (modal) {
    const title = modal.querySelector("h2");
    const submitBtn = modal.querySelector('button[type="submit"]');
    if (title) title.textContent = "Editar Cliente";
    if (submitBtn) submitBtn.textContent = "Salvar Cliente";
  }
}

async function handleSaveClient() {
  const form = byId("client-form");
  if (!form) return;
  const data = new FormData(form);
  const nextName = data.get("name");
  if (!nextName || !String(nextName).trim()) {
    alert("Informe o nome do cliente.");
    return;
  }
  const client = getClientFromModal();
  if (!client) {
    alert("Cliente nao encontrado.");
    return;
  }
  await renameClient(client, nextName);
  const modal = byId("client-modal");
  resetClientModal();
  if (modal) hideModal(modal);
}

async function handleDeleteClient() {
  const client = getClientFromModal();
  if (!client) {
    alert("Nenhum cliente selecionado.");
    return;
  }
  const confirmed = window.confirm(`Excluir o cliente "${client.name}"? Esta acao nao pode ser desfeita.`);
  if (!confirmed) return;

  const modal = byId("client-modal");
  if (db && client.id) {
    try {
      await deleteClientFromDb(client.id);
      await loadStateFromDb({});
      resetClientModal();
      if (modal) hideModal(modal);
      return;
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir cliente no Firebase.");
      return;
    }
  }

  const idx = state.clients.findIndex((c) => c === client || (c.id && c.id === client.id) || c.name === client.name);
  if (idx >= 0) {
    state.clients.splice(idx, 1);
  }
  if (Object.prototype.hasOwnProperty.call(state.clientVisibility, client.name)) {
    delete state.clientVisibility[client.name];
  }
  state.selectedClient = state.clients[0] || null;
  state.selectedProject = state.selectedClient?.projects?.[0] || null;
  saveLocalState();
  renderClientList();
  renderMain();
  hydrateClientSelect(state.selectedClient?.name || "");
  resetClientModal();
  if (modal) hideModal(modal);
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
      const due = activityDueDate(task);
      task.dataConclusao = due || new Date().toISOString().slice(0, 10);
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

function setAccountMessage(type, message) {
  const errEl = byId("account-error");
  const successEl = byId("account-success");
  if (errEl) {
    errEl.textContent = "";
    errEl.classList.add("hidden");
  }
  if (successEl) {
    successEl.textContent = "";
    successEl.classList.add("hidden");
  }
  if (!message) return;
  if (type === "success" && successEl) {
    successEl.textContent = message;
    successEl.classList.remove("hidden");
    return;
  }
  if (errEl) {
    errEl.textContent = message;
    errEl.classList.remove("hidden");
  }
}

async function reauthenticateUser(user, currentPassword) {
  if (!user) throw new Error("Usuario nao autenticado.");
  const providers = user.providerData || [];
  const hasPassword = providers.some((p) => p.providerId === "password");
  if (hasPassword) {
    if (!currentPassword) {
      throw new Error("Informe sua senha atual para continuar.");
    }
    const credential = firebase.auth.EmailAuthProvider.credential(user.email || "", currentPassword);
    await user.reauthenticateWithCredential(credential);
    return;
  }
  const hasGoogle = providers.some((p) => p.providerId === "google.com");
  if (hasGoogle) {
    const provider = new firebase.auth.GoogleAuthProvider();
    await user.reauthenticateWithPopup(provider);
    return;
  }
  throw new Error("Reautenticacao necessaria. Faca login novamente.");
}

function setLoginError(message) {
  const errEl = byId("login-error");
  if (!errEl) return;
  if (!message) {
    errEl.textContent = "";
    errEl.classList.add("hidden");
    return;
  }
  errEl.textContent = message;
  errEl.classList.remove("hidden");
}

function getLoginMode() {
  const card = byId("login-card");
  return card?.dataset.mode === "signup" ? "signup" : "login";
}

function setLoginMode(mode) {
  const card = byId("login-card");
  if (!card) return;
  const nextMode = mode === "signup" ? "signup" : "login";
  card.dataset.mode = nextMode;
  const title = byId("login-title");
  if (title) title.textContent = nextMode === "signup" ? "Criar conta" : "Entrar";
  const submit = byId("login-submit");
  if (submit) submit.textContent = nextMode === "signup" ? "Criar conta" : "Entrar";
  const switchText = byId("login-switch-text");
  if (switchText) switchText.textContent = nextMode === "signup" ? "Ja tem conta?" : "Nao tem conta?";
  const switchBtn = byId("login-switch-btn");
  if (switchBtn) switchBtn.textContent = nextMode === "signup" ? "Entrar" : "Criar conta";
  const passInput = byId("login-password");
  if (passInput) {
    passInput.autocomplete = nextMode === "signup" ? "new-password" : "current-password";
  }
  setLoginError("");
}

function showLogin() {
  setLoginMode("login");
  state.currentUserEmail = "";
  state.currentUserRole = "user";
  state.currentUserKey = "";
  state.dbAccessDenied = false;
  resetUserState();
  updateRoleNavVisibility();
  byId("login-screen")?.classList.remove("hidden");
  byId("app-shell")?.classList.add("hidden");
  setLoginError("");
}

function showApp() {
  byId("login-screen")?.classList.add("hidden");
  byId("app-shell")?.classList.remove("hidden");
}

function wireLogin() {
  const form = byId("login-form");
  if (!form || form.dataset.wired) return;
  const switchBtn = byId("login-switch-btn");
  if (switchBtn) {
    switchBtn.addEventListener("click", () => {
      const current = getLoginMode();
      setLoginMode(current === "signup" ? "login" : "signup");
    });
  }
  const googleBtn = byId("login-google");
  if (googleBtn) {
    googleBtn.addEventListener("click", async () => {
      setLoginError("");
      if (!auth) {
        setLoginError("Login indisponivel no momento. Tente novamente.");
        return;
      }
      try {
        const provider = new firebase.auth.GoogleAuthProvider();
        await auth.signInWithPopup(provider);
      } catch (err) {
        console.error(err);
        setLoginError("Falha no login com Google. Tente novamente.");
      }
    });
  }
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const mode = getLoginMode();
    const name = byId("login-name")?.value.trim() || "";
    const email = byId("login-email")?.value.trim() || "";
    const pass = byId("login-password")?.value || "";
    const passConfirm = byId("login-password-confirm")?.value || "";
    setLoginError("");
    if (mode === "signup") {
      if (!name || !email || !pass) {
        setLoginError("Preencha nome, e-mail e senha para criar a conta.");
        return;
      }
      if (pass.length < 6) {
        setLoginError("A senha precisa ter ao menos 6 caracteres.");
        return;
      }
      if (pass !== passConfirm) {
        setLoginError("As senhas nao conferem.");
        return;
      }
    } else if (!email || !pass) {
      setLoginError("Falha no login. Verifique e-mail e senha.");
      return;
    }
    if (!auth) {
      setLoginError("Login indisponivel no momento. Tente novamente.");
      return;
    }
    try {
      if (mode === "signup") {
        const cred = await auth.createUserWithEmailAndPassword(email, pass);
        if (cred?.user && name) {
          await cred.user.updateProfile({ displayName: name });
        }
      } else {
        await auth.signInWithEmailAndPassword(email, pass);
      }
    } catch (err) {
      console.error(err);
      if (mode === "signup") {
        if (err?.code === "auth/email-already-in-use") {
          setLoginError("E-mail ja cadastrado. Use outro e-mail.");
          return;
        }
        if (err?.code === "auth/invalid-email") {
          setLoginError("E-mail invalido. Verifique o formato.");
          return;
        }
        if (err?.code === "auth/weak-password") {
          setLoginError("Senha fraca. Use ao menos 6 caracteres.");
          return;
        }
        setLoginError("Falha ao criar conta. Tente novamente.");
        return;
      }
      if (err?.code === "auth/user-not-found" || err?.code === "auth/wrong-password") {
        setLoginError("Falha no login. Verifique e-mail e senha.");
        return;
      }
      setLoginError("Falha no login. Verifique e-mail e senha.");
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
    const userKey = currentUserKey(user);
    if (state.currentUserKey && state.currentUserKey !== userKey) {
      resetUserState();
    }
    state.currentUserKey = userKey;
    persistActiveUserKey(userKey);
    state.dbAccessDenied = false;
    state.currentUserEmail = user?.email || "";
    state.currentUserRole = normalizeUserRole(isAdminUser(user) ? "admin" : "user");
    updateUserHeader(user);
    updateRoleNavVisibility();
    try {
      await syncUserProfile(user);
    } catch (err) {
      console.warn("Nao foi possivel sincronizar o perfil do usuario.", err);
    }
    await loadCurrentUserRole(user);
    if (state.currentSection === "config") {
      renderMain();
    }
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

async function deleteClientFromDb(clientId) {
  await db.ref(`clients/${clientId}`).remove();
}

async function saveProjectToDb(payload) {
  const client = await ensureClientDoc(payload.client);
  const projectRef = client.ref.child("projects").push();
  await projectRef.set({
    name: payload.name,
    developer: payload.developer,
    start: payload.start,
    end: payload.end,
    startDate: payload.start,
    goLiveDate: payload.end,
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
    end: payload.end,
    startDate: payload.startDate || payload.start,
    goLiveDate: payload.goLiveDate || payload.end
  });
}

async function saveTaskToDb(clientId, projectId, task) {
  const taskRef = db.ref(`clients/${clientId}/projects/${projectId}/tasks`).push();
  const normalizedStatus = normalizeTaskStatus(task.status);
  const dataConclusao =
    task.dataConclusao || (normalizedStatus === "concluido" ? new Date().toISOString().slice(0, 10) : "");
  await taskRef.set({
    title: task.title,
    phase: task.phase,
    package: task.package,
    start: task.start,
    due: task.due,
    status: task.status,
    progress: task.progress,
    ...(dataConclusao ? { dataConclusao } : {}),
    createdAt: firebase.database.ServerValue.TIMESTAMP
  });
}

async function updateTaskStatusOnDb(clientId, projectId, taskId, payload) {
  const updatePayload = { ...payload };
  if (normalizeTaskStatus(updatePayload.status) === "concluido" && !updatePayload.dataConclusao) {
    updatePayload.dataConclusao = new Date().toISOString().slice(0, 10);
  }
  await db.ref(`clients/${clientId}/projects/${projectId}/tasks/${taskId}`).update(updatePayload);
}

async function updateTaskProgressOnDb(clientId, projectId, taskId, progress) {
  if (progress == null) return;
  const value = Number(progress);
  if (!Number.isFinite(value)) return;
  await db.ref(`clients/${clientId}/projects/${projectId}/tasks/${taskId}`).update({ progress: value });
}

async function updateTaskOnDb(clientId, projectId, taskId, payload) {
  const updatePayload = {
    title: payload.title,
    phase: payload.phase,
    package: payload.package,
    start: payload.start,
    due: payload.due,
    status: payload.status
  };
  if (payload.progress != null) {
    const progressValue = Number(payload.progress);
    if (Number.isFinite(progressValue)) {
      updatePayload.progress = progressValue;
    }
  }
  if ("dataConclusao" in payload) {
    updatePayload.dataConclusao = payload.dataConclusao;
  }
  Object.keys(updatePayload).forEach((key) => {
    if (updatePayload[key] === undefined) delete updatePayload[key];
  });
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
      const progressPct = clampPct(metrics.progress ?? p.progress ?? 0);
      const sCurveSeries = computeSCurveDailyBaseline(p, p?.tasks || null, progressPct);
      const baseline = sCurveSeries ? round1(sCurveSeries.baselineNow * 100) : projectBaselinePct(p, progressPct);
      const gap = round1(baseline - progressPct);
      return {
        ...p,
        clientName: client.name,
        metrics,
        progress: progressPct,
        baseline,
        gap,
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
    <div class="dashboard-legend" role="note" aria-label="Legenda de cores">
      <div class="legend-group">
        <span class="legend-title">Status</span>
        <span class="legend-item"><span class="legend-dot status-atrasado" aria-hidden="true"></span>Atrasado</span>
        <span class="legend-item"><span class="legend-dot status-andamento" aria-hidden="true"></span>Em andamento</span>
      </div>
      <div class="legend-group">
        <span class="legend-title">Saúde</span>
        <span class="legend-item"><span class="legend-dot health-atraso" aria-hidden="true"></span>Em Atraso</span>
        <span class="legend-item"><span class="legend-dot health-dia" aria-hidden="true"></span>Em Dia</span>
      </div>
      <div class="legend-group">
        <span class="legend-title">GAP (pp)</span>
        <span class="legend-item"><span class="legend-dot gap-critical" aria-hidden="true"></span>+30pp ou mais</span>
        <span class="legend-item"><span class="legend-dot gap-delayed" aria-hidden="true"></span>+10pp a +29pp</span>
        <span class="legend-item"><span class="legend-dot gap-ok" aria-hidden="true"></span>Negativo (adiantado)</span>
      </div>
    </div>
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
      const gapInfo = gapStatusInfo(p.gap, p.baseline, p.progress);
      return `
        <tr data-client="${p.clientName}" data-project="${p.name}">
          <td>${p.name}</td>
          <td>${p.clientName}</td>
          <td>${p.developer || "-"}</td>
          <td><span class="pill project-status ${info.className}">${info.label}</span></td>
          <td><span class="pill schedule-status ${scheduleInfo.className}">${scheduleInfo.label}</span></td>
          <td>${p.progress}%</td>
          <td>${formatMetric(p.baseline)}%</td>
          <td><span class="delta-badge ${gapInfo.className}">${formatSignedMetric(p.gap)}pp</span></td>
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
        ${rows || "<tr><td colspan='9'>Nenhum projeto cadastrado.</td></tr>"}
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
