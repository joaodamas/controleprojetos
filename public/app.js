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

const THEME_STORAGE_KEY = "jp-theme";

const state = {
  clients: [
    {
      name: "KPMG",
      projects: [
        {
          name: "EPAYS",
          developer: "Vanessa Martinez",
          squadMembers: ["Vanessa Martinez", "Fernando Barrozo", "Hanna Kodama", "Rafael Lima"],
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
        { name: "BAIXA EM LOTE – Demais Clientes", developer: "A definir", squadMembers: [], start: "", end: "", progress: 0, tasks: [] },
        { name: "JnJ", developer: "A definir", squadMembers: [], start: "", end: "", progress: 0, tasks: [] },
        {
          name: "OBI",
          developer: "Henrique K.",
          squadMembers: ["Henrique K.", "Fernando Barrozo", "Vanessa Martinez", "Hanna Kodama", "Rafael Lima"],
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
          developer: "Vanessa Martinez",
          squadMembers: ["Vanessa Martinez", "Fernando Barrozo", "Hanna Kodama"],
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
        { name: "Demandas Internas", developer: "A definir", squadMembers: [], start: "", end: "", progress: 0, tasks: [] },
        { name: "Pendente Execucao", developer: "A definir", squadMembers: [], start: "", end: "", progress: 0, tasks: [] },
        { name: "BBP - Melhorias", developer: "A definir", squadMembers: [], start: "", end: "", progress: 0, tasks: [] }
      ]
    },
    {
      name: "ASCENTY",
      projects: [
        {
          name: "Monitoramento NFSe",
          developer: "Henrique K.",
          squadMembers: ["Henrique K.", "Vanessa Martinez", "Fernando Barrozo"],
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
  selectedImprovement: null,
  editingImprovementId: null,
  users: [],
  groups: [],
  currentUserEmail: "",
  currentUserRole: "user",
  currentUserKey: "",
  dbAccessDenied: false,
  usersLoadDenied: false,
  effectiveClientsPath: null,
  effectiveGroupsPath: null,
  selectedClient: null,
  selectedProject: null,
  collapsedPhases: {},
  clientVisibility: {},
  editingProjectId: null,
  editingTaskIndex: null,
  home: {
    lastAccess: "",
    quote: "",
    search: "",
    view: "grid"
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
    responsible: "",
    query: ""
  },
  monitorEditing: null
};

const LOCAL_STORAGE_KEY = "controle_projetos_state_v1";
const LOCAL_STORAGE_USER_KEY = "controle_projetos_state_user";
const ADMIN_EMAILS = new Set(["joaodamasit@gmail.com", "joaodamas4@gmail.com"]);

const STATUS_OPTIONS = [
  { value: "planejado", label: "Nao iniciado", className: "planejado" },
  { value: "em_andamento", label: "Em andamento", className: "em-andamento" },
  { value: "em_validacao", label: "Em validacao", className: "em-validacao" },
  { value: "parado", label: "Parado", className: "parado" },
  { value: "atrasado", label: "Atrasado", className: "atrasado" },
  { value: "concluido", label: "Concluido", className: "concluido" }
];

const IMPROVEMENT_STAGES = [
  { id: "triagem", label: "Triagem", progress: 20 },
  { id: "analise_tecnica", label: "Analise Tecnica", progress: 40 },
  { id: "implementacao", label: "Implementacao", progress: 70 },
  { id: "validacao", label: "Validacao", progress: 90 },
  { id: "concluido", label: "Concluido", progress: 100 }
];

const IMPROVEMENT_STAGE_MAP = new Map(IMPROVEMENT_STAGES.map((s) => [s.id, s]));
const IMPROVEMENT_STAGE_ORDER = IMPROVEMENT_STAGES.map((s) => s.id);

function improvementStageRank(stageId) {
  const id = normalizeImprovementStage(stageId);
  const idx = IMPROVEMENT_STAGE_ORDER.indexOf(id);
  return idx >= 0 ? idx : 0;
}

function improvementRequiresEstimate(stageId) {
  // Gate: to move beyond Analise Tecnica into Implementacao (or later),
  // we require both estimate hours and executor.
  return improvementStageRank(stageId) >= improvementStageRank("implementacao");
}

function applyImprovementFieldRequirements(form, stageId) {
  if (!form || !form.elements) return;
  const required = improvementRequiresEstimate(stageId);
  if (form.elements.estimateHours) form.elements.estimateHours.required = required;
  if (form.elements.executor) form.elements.executor.required = required;
}

function applyImprovementOriginRefVisibility(form, originValue) {
  if (!form) return;
  const origin = String(originValue || "email").trim().toLowerCase();
  const wrap = form.querySelector("[data-improvement-origin-ref]");
  if (!wrap) return;
  const show = origin === "chamado";
  wrap.classList.toggle("hidden", !show);
}

const IMPROVEMENT_ORIGIN_LABELS = {
  chamado: "Chamado",
  chamado_interno: "Chamado Interno",
  reuniao: "Reunião de Review",
  diretoria: "Solicitação Directa",
  email: "E-mail"
};

function improvementOriginLabel(origin) {
  const o = String(origin || "email").trim().toLowerCase();
  return IMPROVEMENT_ORIGIN_LABELS[o] || IMPROVEMENT_ORIGIN_LABELS.email;
}

function improvementOriginIcon(origin) {
  const o = String(origin || "email").trim().toLowerCase();
  if (o === "chamado" || o === "chamado_interno") return "alert-circle";
  if (o === "reuniao") return "users";
  if (o === "diretoria") return "briefcase";
  return "mail";
}

function applyImprovementApprovalVisibility(modal, stageId) {
  if (!modal) return;
  const wrap = modal.querySelector("[data-improvement-approval]");
  if (!wrap) return;
  const st = normalizeImprovementStage(stageId);
  const show = improvementStageRank(st) >= improvementStageRank("validacao");
  wrap.classList.toggle("hidden", !show);
  const form = byId("improvement-form");
  if (form?.elements?.clientApproval) {
    // Only required when trying to set as Concluido.
    form.elements.clientApproval.required = normalizeImprovementStage(stageId) === "concluido";
  }
}

function stageLabelById(stageId) {
  const s = IMPROVEMENT_STAGE_MAP.get(normalizeImprovementStage(stageId));
  return s?.label || "Etapa";
}

function requiredNotesBeforeStage(nextStageId) {
  const nextRank = improvementStageRank(nextStageId);
  return IMPROVEMENT_STAGE_ORDER.filter((id) => improvementStageRank(id) < nextRank);
}

function firstMissingStageNote(stageNotes, nextStageId) {
  const notes = stageNotes && typeof stageNotes === "object" ? stageNotes : {};
  const required = requiredNotesBeforeStage(nextStageId);
  for (const id of required) {
    const txt = String(notes[id] || "").trim();
    if (!txt) return id;
  }
  return "";
}

function hasClientApproval(approval) {
  if (!approval) return false;
  if (typeof approval === "string") return !!approval.trim();
  if (typeof approval === "object") return !!String(approval.dataUrl || approval.url || "").trim();
  return false;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result || ""));
      reader.onerror = () => reject(reader.error || new Error("Falha ao ler arquivo."));
      reader.readAsDataURL(file);
    } catch (err) {
      reject(err);
    }
  });
}

function improvementActorLabel() {
  const user = auth?.currentUser || null;
  const email = String(state.currentUserEmail || user?.email || "").trim();
  if (email) return email;
  return "Usuario";
}

function appendImprovementLog(improvement, action) {
  if (!improvement) return;
  if (!Array.isArray(improvement.logs)) improvement.logs = [];
  improvement.logs.push({
    id: `log_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 6)}`,
    user: improvementActorLabel(),
    action: String(action || "").trim(),
    createdAt: Date.now()
  });
}

function getImprovementMaxStageId(improvement) {
  const raw =
    improvement?.maxStage ||
    improvement?.max_stage ||
    improvement?.maxStageId ||
    improvement?.max_stage_id ||
    improvement?.stage ||
    improvement?.status ||
    "triagem";
  return normalizeImprovementStage(raw);
}

function computeMaxStageId(stageA, stageB) {
  const a = normalizeImprovementStage(stageA);
  const b = normalizeImprovementStage(stageB);
  return improvementStageRank(b) > improvementStageRank(a) ? b : a;
}

function applyImprovementStageNotesLocks(modal, lockMaxStageId) {
  if (!modal) return;
  const lockStage = normalizeImprovementStage(lockMaxStageId || "triagem");
  const lockRank = improvementStageRank(lockStage);
  modal.querySelectorAll("[data-improvement-stage-note]").forEach((wrap) => {
    const id = normalizeImprovementStage(wrap.dataset.improvementStageNote || "");
    const ta = wrap.querySelector("textarea");
    const locked = improvementStageRank(id) < lockRank;
    wrap.classList.toggle("is-locked", locked);
    if (ta) ta.readOnly = locked;
  });
}

function improvementStageNotesFromForm(form) {
  const out = {};
  if (!form || !form.elements) return out;
  IMPROVEMENT_STAGES.forEach((st) => {
    const key = `stageNote_${st.id}`;
    const el = form.elements[key];
    if (!el) return;
    out[st.id] = String(el.value || "").trim();
  });
  return out;
}

function applyImprovementStageNotesToForm(form, stageNotes) {
  if (!form || !form.elements) return;
  const notes = stageNotes && typeof stageNotes === "object" ? stageNotes : {};
  IMPROVEMENT_STAGES.forEach((st) => {
    const key = `stageNote_${st.id}`;
    const el = form.elements[key];
    if (!el) return;
    el.value = String(notes[st.id] || "");
  });
}

function updateImprovementStageNotesActive(modal, stageId) {
  if (!modal) return;
  const st = normalizeImprovementStage(stageId);
  modal.querySelectorAll("[data-improvement-stage-note]").forEach((el) => {
    const id = normalizeImprovementStage(el.dataset.improvementStageNote || "");
    el.classList.toggle("is-active", id === st);
  });
}

function focusImprovementStageNote(modal, stageId) {
  if (!modal) return;
  const id = normalizeImprovementStage(stageId);
  const wrap = modal.querySelector(`[data-improvement-stage-note="${CSS.escape(id)}"]`);
  const ta = wrap?.querySelector("textarea");
  if (ta) ta.focus();
}

function renderImprovementLogList(modal, improvement) {
  if (!modal) return;
  const list = modal.querySelector("[data-improvement-log-list]");
  if (!list) return;
  const logs = Array.isArray(improvement?.logs) ? improvement.logs : [];
  if (!logs.length) {
    list.innerHTML = `<div class="imprm-log-empty"><div class="imprm-log-empty-ico"><i data-lucide="message-square"></i></div><p class="imprm-log-empty-title">Sem actividade</p><p class="imprm-log-empty-sub">As notas e alterações automáticas aparecerão aqui.</p></div>`;
    if (window.lucide) window.lucide.createIcons();
    return;
  }
  const rows = logs
    .slice()
    .sort((a, b) => Number(b?.createdAt || 0) - Number(a?.createdAt || 0))
    .map((log) => {
      const user = escapeHtml(String(log?.user || "Usuario"));
      const dt = log?.createdAt ? formatDateTime(new Date(log.createdAt)) : escapeHtml(String(log?.date || ""));
      const action = escapeHtml(String(log?.action || ""));
      return `
        <div class="imprm-log-item">
          <div class="imprm-log-top">
            <div class="imprm-log-user">${user}</div>
            <div class="imprm-log-date">${escapeHtml(dt)}</div>
          </div>
          <div class="imprm-log-text">${action}</div>
        </div>
      `;
    })
    .join("");
  list.innerHTML = rows;
}

function normalizeImprovementStage(value) {
  const v = String(value || "").trim().toLowerCase();
  if (IMPROVEMENT_STAGE_MAP.has(v)) return v;
  // Back-compat: old "status" values map roughly to stages.
  if (v === "planejado") return "triagem";
  if (v === "em_andamento") return "implementacao";
  if (v === "em_validacao") return "validacao";
  if (v === "concluido") return "concluido";
  return "triagem";
}

function improvementStageInfo(improvement) {
  const stage = normalizeImprovementStage(improvement?.stage || improvement?.stageId || improvement?.status || "");
  return IMPROVEMENT_STAGE_MAP.get(stage) || IMPROVEMENT_STAGES[0];
}

function improvementDisplayId(improvement) {
  const raw = String(improvement?.code || improvement?.id || "").trim();
  if (!raw) return "IMP";
  if (/^IMP[-_ ]/i.test(raw)) return raw.toUpperCase().replace(/_/g, "-");
  if (raw.length <= 14) return raw.toUpperCase();
  return raw.slice(0, 8).toUpperCase();
}

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
  { key: "cost", label: "Custo", type: "number" },
  { key: "goLive", label: "Go Live previsto", type: "date" }
];

const MONITOR_FILTERS = [
  { key: "all", label: "Todos" },
  { key: "atrasado", label: "Atrasadas" },
  { key: "proximo", label: "Proximas" }
];

const MONITOR_VIEW_TABS = [
  { key: "geral", label: "Geral" },
  { key: "prioritario", label: "Prioritário" }
];

const DEFAULT_EPICS = [];

function getPackagePhases() {
  const project = typeof state !== "undefined" && state.selectedProject ? state.selectedProject : null;
  if (project && Array.isArray(project.epics) && project.epics.length) {
    return project.epics.map((e) => normalizePhaseLabel(e)).filter(Boolean);
  }
  return [];
}


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
  state.selectedImprovement = null;
  state.editingImprovementId = null;
  state.users = [];
  state.groups = [];
  state.selectedClient = null;
  state.selectedProject = null;
  state.collapsedPhases = {};
  state.clientVisibility = {};
  state.editingProjectId = null;
  state.editingTaskIndex = null;
  state.dashboard = { sort: { key: null, direction: "asc" }, filters: {} };
  state.monitor = { filter: "all", client: "", project: "", responsible: "", query: "" };
  state.currentSection = "inicio";
  state.lastRenderContext = null;
  state.effectiveClientsPath = null;
  state.effectiveGroupsPath = null;
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
  if (value instanceof Date) {
    if (Number.isNaN(value.getTime())) return "-";
    const dd = String(value.getDate()).padStart(2, "0");
    const mm = String(value.getMonth() + 1).padStart(2, "0");
    const yyyy = value.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  }
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

function firebaseErrorLabel(err) {
  const code = String(err?.code || "").trim();
  const msg = String(err?.message || "").trim();
  if (code && msg) return `${code}: ${msg}`;
  return code || msg || "erro_desconhecido";
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

async function isAdminFromClaims(user) {
  try {
    const token = await user?.getIdTokenResult?.();
    return token?.claims?.admin === true;
  } catch (_) {
    return false;
  }
}

function isAdminUser(user = auth?.currentUser) {
  return isAdminEmail(user?.email);
}

function normalizeUserRole(role) {
  const value = String(role || "").trim().toLowerCase();
  if (value === "admin" || value === "administrador" || value === "admin_master") return "admin";
  if (value === "manager" || value === "gestor" || value === "project_manager" || value === "developer" || value === "dev" || value === "desenvolvedor") return "manager";
  if (value === "viewer" || value === "visualizador") return "viewer";
  return "viewer";
}

function roleLabel(role) {
  const normalized = normalizeUserRole(role);
  if (normalized === "admin") return "Administrador";
  if (normalized === "manager") return "Gestor de Projetos";
  return "Visualizador";
}

function usesTenantData() {
  return false;
}

function clientDataRootPath(user = auth?.currentUser) {
  if (usesTenantData()) {
    const uid = user?.uid;
    return uid ? `tenants/${uid}/clients` : null;
  }
  return state.effectiveClientsPath || "clients";
}

function environmentGroupsPath() {
  return state.effectiveGroupsPath || "groups";
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

function updateRoleNavVisibility() {
  const role = normalizeUserRole(state.currentUserRole);
  const devLink = byId("nav-dev-board");
  const navGroups = document.querySelectorAll(".nav-group");
  const navSections = ["inicio", "dashboard", "monitor", "config"];
  const topButtons = [
    document.querySelector('[data-section="relatorio"]'),
    byId("open-gantt-btn"),
    byId("open-employee-modal"),
    byId("edit-project-btn"),
    byId("open-project-modal"),
    byId("open-improvement-modal")
  ];

  if (devLink) devLink.classList.remove("hidden");
  navSections.forEach((section) => {
    const link = document.querySelector(`.nav-link[data-section="${section}"]`);
    if (link) link.classList.remove("hidden");
  });
  navGroups.forEach((group) => group.classList.remove("hidden"));
  topButtons.forEach((btn) => {
    if (btn) btn.classList.remove("hidden");
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

const PROJECT_ROLE_OPTIONS = [
  { value: "lider_projeto", label: "Lider de Projeto" },
  { value: "gerente_desenvolvimento", label: "Gerente Desenvolvimento" },
  { value: "desenvolvedor", label: "Desenvolvedor" },
  { value: "gerente_projeto", label: "Gerente de Projeto" },
  { value: "suporte", label: "Suporte" }
];

const PROJECT_TEAM_DIRECTORY = [
  { name: "Mario Zuchieri", defaultRole: "lider_projeto" },
  { name: "Rafael Legramandi", defaultRole: "lider_projeto" },
  { name: "Vanessa Martinez", defaultRole: "lider_projeto" },
  { name: "Jose Bonna", defaultRole: "lider_projeto" },
  { name: "Ricardo Hamada", defaultRole: "lider_projeto" },
  { name: "Lucas Svizzero", defaultRole: "gerente_desenvolvimento" },
  { name: "Lucas Bonna", defaultRole: "desenvolvedor" },
  { name: "Hanna Kodama", defaultRole: "desenvolvedor" },
  { name: "Fernando Barrozo", defaultRole: "desenvolvedor" },
  { name: "Thiago Felippete", defaultRole: "gerente_projeto" },
  { name: "Joao Damas", defaultRole: "gerente_projeto" },
  { name: "Lucas Barbi", defaultRole: "suporte" }
].sort((a, b) => a.name.localeCompare(b.name));

function applyTheme(theme) {
  const isDark = theme === "dark";
  document.body.classList.toggle("theme-dark", isDark);
  document.body.dataset.theme = isDark ? "dark" : "light";
  const themeText = document.querySelector("[data-theme-text]");
  if (themeText) themeText.textContent = isDark ? "Dark mode" : "Light mode";
  const toggle = document.querySelector("[data-theme-toggle]");
  if (toggle) toggle.setAttribute("aria-pressed", isDark ? "true" : "false");
}

function getStoredTheme() {
  try {
    return localStorage.getItem(THEME_STORAGE_KEY);
  } catch (err) {
    return null;
  }
}

function storeTheme(theme) {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (err) {
    // ignore storage errors
  }
}

function setupThemeToggle() {
  const toggle = document.querySelector("[data-theme-toggle]");
  if (!toggle) return;
  const stored = getStoredTheme();
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initial = stored || (prefersDark ? "dark" : "light");
  applyTheme(initial);
  toggle.addEventListener("click", () => {
    const next = document.body.classList.contains("theme-dark") ? "light" : "dark";
    applyTheme(next);
    storeTheme(next);
  });
}

function updateUserHeader(user) {
  const sidebarName = document.querySelector("[data-sidebar-name]");
  const sidebarRole = document.querySelector("[data-sidebar-role]");
  if (!sidebarName && !sidebarRole) return;
  const label = user?.displayName || user?.email || "Usuario";
  const roleText = roleLabel(state.currentUserRole);
  if (sidebarName) sidebarName.textContent = label;
  if (sidebarRole) sidebarRole.textContent = roleText;
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

function taskStartValueSafe(task) {
  const dt = parseTaskDate(taskStartStr(task));
  return dt ? dt.getTime() : Number.POSITIVE_INFINITY;
}

function compareTasksByStart(a, b) {
  const aStart = taskStartValueSafe(a);
  const bStart = taskStartValueSafe(b);
  if (aStart !== bStart) return aStart - bStart;
  const aDue = taskDueValueSafe(a);
  const bDue = taskDueValueSafe(b);
  if (aDue !== bDue) return aDue - bDue;
  const aTitle = taskTitle(a) || "";
  const bTitle = taskTitle(b) || "";
  const byTitle = aTitle.localeCompare(bTitle);
  if (byTitle) return byTitle;
  const ai = Number(a?._idx);
  const bi = Number(b?._idx);
  if (Number.isFinite(ai) && Number.isFinite(bi)) return ai - bi;
  return 0;
}

function isDoneTask(task) {
  const st = normalizeTaskStatus(getTaskStatus(task));
  return st === "concluido";
}

function isInProgressTask(task) {
  const st = normalizeTaskStatus(getTaskStatus(task));
  // Treat explicit "atrasado" as work started (late can still be "nao iniciado", but if the user set status to atraso,
  // we should not roll up parents as "nao iniciado").
  if (st === "em_andamento" || st === "em_validacao" || st === "atrasado") return true;
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

function projectAllTasks(project) {
  const all = flattenProjectTasks(project);
  if (!all.length) return [];
  const seen = new Set();
  const out = [];
  for (const t of all) {
    if (!t) continue;
    const id = t?.id || t?.taskId || t?.uid || "";
    const key = id
      ? `id:${String(id)}`
      : `k:${normHeader(taskTitle(t) || "")}::${taskStartStr(t) || ""}::${taskDueStr(t) || ""}::${normalizePhaseLabel(t?.phase || "OUTROS")}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(t);
  }
  return out;
}

function leafTasksForProgress(tasks = []) {
  const list = Array.isArray(tasks) ? tasks : [];
  if (!list.length) return [];

  // If a "package/macro" header exists (task.title == package label) we exclude it from progress rollups,
  // keeping only leaf tasks (children with `package` pointing to that header).
  const parentKeySet = new Set(
    list
      .map((t) => ({ phase: normalizePhaseLabel(t?.phase || "OUTROS"), pkg: extractPackageLabel(t) }))
      .filter((x) => x.pkg)
      .map((x) => `${x.phase}::${normHeader(x.pkg)}`)
  );

  const leaf = list.filter(
    (t) => !parentKeySet.has(`${normalizePhaseLabel(t?.phase || "OUTROS")}::${normHeader(taskTitle(t) || "")}`)
  );
  return leaf.length ? leaf : list;
}

function progressPctFromTasks(tasks = []) {
  const leaf = leafTasksForProgress(tasks);
  if (!leaf.length) return 0;
  return weightedProgressPct(leaf);
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
        const epicLabel = normalizePhaseLabel(task?.phase || task?.epic || task?.epico || task?.epicoName || "");
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
          epicLabel,
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

function formatMonitorShortDate(dueDay) {
  if (!(dueDay instanceof Date)) return "-";
  const months = ["JAN", "FEV", "MAR", "ABR", "MAI", "JUN", "JUL", "AGO", "SET", "OUT", "NOV", "DEZ"];
  const dd = String(dueDay.getDate()).padStart(2, "0");
  const mm = months[dueDay.getMonth()] || "";
  return `${dd} ${mm}`.trim();
}

function renderMonitorActivitiesV2(container) {
  setCrumbPathText("Monitor de Operações");

  if (!state.monitor) state.monitor = { filter: "all", client: "", project: "", responsible: "", query: "", viewMode: "geral", collapsed: {} };
  if (state.monitor.query == null) state.monitor.query = "";
  if (!state.monitor.collapsed || typeof state.monitor.collapsed !== "object") state.monitor.collapsed = {};
  const collapsed = state.monitor.collapsed;
  const collapsedAtraso = collapsed.atraso === true;
  const collapsedHoje = collapsed.hoje === true;
  const collapsedProximas = collapsed.proximas === true;
  const viewMode = state.monitor.viewMode || "geral";

  const filter = state.monitor.filter || "all";
  const queryKey = normHeader(String(state.monitor.query || "").trim());
  const items = buildMonitorItems();

  const scopeFiltered = items.filter((item) => {
    if (state.monitor.client && item.clientName !== state.monitor.client) return false;
    if (state.monitor.project && item.projectName !== state.monitor.project) return false;
    if (state.monitor.responsible && item.responsible !== state.monitor.responsible) return false;
    if (!queryKey) return true;
    const hay = normHeader(
      [
        item.clientName,
        item.projectName,
        item.taskTitle,
        item.epicLabel || "",
        item.responsible || ""
      ].join(" ")
    );
    return hay.includes(queryKey);
  });

  const today = startOfDay(new Date());
  const overdueScope = [];
  const todayScope = [];
  const upcomingScope = [];
  scopeFiltered.forEach((item) => {
    const diff = daysDiff(item.dueDay, today);
    if (diff < 0) overdueScope.push(item);
    else if (diff === 0) todayScope.push(item);
    else upcomingScope.push(item);
  });

  const sortByDue = (a, b) => a.dueDay.getTime() - b.dueDay.getTime();
  overdueScope.sort(sortByDue);
  todayScope.sort(sortByDue);
  upcomingScope.sort(sortByDue);

  const renderMonitorItem = (item) => {
    const diff = daysDiff(item.dueDay, today);
    const tone = diff < 0 ? "overdue" : diff === 0 ? "today" : "upcoming";
    const dateShort = formatMonitorShortDate(item.dueDay);
    const badgeText = diff < 0 ? `${Math.abs(diff)}D ATRASO` : diff === 0 ? "HOJE" : dateShort;
    const badgeCls = diff < 0 ? "bad" : diff === 0 ? "warn" : "ok";
    const client = escapeHtml(item.clientName || "Cliente");
    const project = escapeHtml(item.projectName || "Projeto");
    const epic = escapeHtml(item.epicLabel || "OUTROS");
    const title = escapeHtml(item.taskTitle || "Atividade");
    const owner = escapeHtml(item.responsible || "A definir");
    const initials = escapeHtml(initialsFromName(item.responsible || "A"));
    return `
      <div class="monitor-v2-item monitor-v2-item--${tone}" data-monitor-card="true" data-client-index="${item.clientIndex}" data-project-index="${item.projectIndex}" data-task-index="${item.taskIndex}">
        <div class="monitor-v2-item-left">
          <div class="monitor-v2-body">
            <div class="monitor-v2-meta">
              <span class="monitor-v2-client">${client}</span>
              <span class="monitor-v2-sep"> </span>
              <span class="monitor-v2-project">${project}</span>
              <span class="monitor-v2-sep"> - </span>
              <span class="monitor-v2-epic">${epic}</span>
            </div>
            <div class="monitor-v2-title">${title}</div>
            <div class="monitor-v2-owner-row">
              <span class="monitor-v2-avatar">${initials}</span>
              <span class="monitor-v2-owner">${owner}</span>
            </div>
          </div>
        </div>
        <div class="monitor-v2-item-right">
          <div class="monitor-v2-date">${dateShort}</div>
          <div class="monitor-v2-badge monitor-v2-badge--${badgeCls}">${badgeText}</div>
          <button type="button" class="monitor-v2-more" aria-label="Opções" onclick="event.stopPropagation()"><i data-lucide="more-vertical"></i></button>
        </div>
      </div>
    `;
  };

  const sections = [
    { id: "atraso", title: "ATIVIDADES EM ATRASO", pillCls: "monitor-v2-pill--red", items: overdueScope, collapsed: collapsedAtraso },
    { id: "hoje", title: "PARA ENTREGAR HOJE", pillCls: "monitor-v2-pill--amber", items: todayScope, collapsed: collapsedHoje },
    { id: "proximas", title: "PRÓXIMAS ATIVIDADES", pillCls: "monitor-v2-pill--gray", items: upcomingScope, collapsed: collapsedProximas }
  ];

  const activeSection = sections.find((s) => !s.collapsed) || sections[0];
  const activeItems = activeSection.items;

  const sidebarHtml = sections
    .map(
      (s) => `
    <button type="button" class="monitor-v2-sidebar-card ${!s.collapsed ? "active" : ""}" data-monitor-collapse-section="${escapeHtml(s.id)}" aria-expanded="${!s.collapsed}">
      <span class="monitor-v2-pill ${s.pillCls}"></span>
      <div class="monitor-v2-sidebar-card-text">
        <span class="monitor-v2-sidebar-title">${escapeHtml(s.title)}</span>
        <span class="monitor-v2-sidebar-count">${s.items.length} ${s.items.length === 1 ? "ATIVIDADE" : "ATIVIDADES"}</span>
      </div>
      <span class="monitor-v2-sidebar-chevron"><i data-lucide="${s.collapsed ? "chevron-down" : "chevron-up"}"></i></span>
    </button>
  `
    )
    .join("");

  container.innerHTML = `
    <div class="monitor-v2 span-all">
      <div class="monitor-v2-top">
        <div class="monitor-v2-head">
          <h1 class="monitor-v2-kicker">Monitor de Operações</h1>
          <div class="monitor-v2-sub">Visão temporal e carga de trabalho em tempo real</div>
        </div>
        <div class="monitor-v2-controls">
          <div class="monitor-chip-bar" role="tablist" aria-label="Modo de visualização">
            ${MONITOR_VIEW_TABS.map((opt) => {
              const active = opt.key === viewMode ? "active" : "";
              return `<button type="button" class="monitor-chip ${active}" data-monitor-view="${escapeHtml(opt.key)}">${escapeHtml(opt.label)}</button>`;
            }).join("")}
          </div>
          <div class="monitor-v2-search">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="M21 21l-4.35-4.35"></path></svg>
            <input type="search" data-monitor-search placeholder="Cliente, Projeto, Atividade..." value="${escapeHtml(state.monitor.query || "")}">
          </div>
          <button type="button" class="btn sm ghost" data-monitor-export-pdf title="Exportar PDF">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            Exportar PDF
          </button>
        </div>
      </div>

      <div class="monitor-v2-main monitor-v2-main--split">
        <aside class="monitor-v2-sidebar">
          ${sidebarHtml}
        </aside>
        <div class="monitor-v2-content">
          <div class="monitor-v2-list">
            ${activeItems.length ? activeItems.map(renderMonitorItem).join("") : `<div class="monitor-v2-empty">Sem atividades nesta categoria.</div>`}
          </div>
        </div>
      </div>
    </div>
  `;
}

function exportMonitorPdf() {
  const JsPDF = window.jspdf?.jsPDF || window.jsPDF;
  if (!JsPDF) { alert("jsPDF nao carregou."); return; }

  if (!state.monitor) state.monitor = { filter: "all", client: "", project: "", responsible: "", query: "" };
  const filter = state.monitor.filter || "all";
  const queryKey = normHeader(String(state.monitor.query || "").trim());
  const items = buildMonitorItems();

  const scopeFiltered = items.filter((item) => {
    if (state.monitor.client && item.clientName !== state.monitor.client) return false;
    if (state.monitor.project && item.projectName !== state.monitor.project) return false;
    if (state.monitor.responsible && item.responsible !== state.monitor.responsible) return false;
    if (!queryKey) return true;
    const hay = normHeader([item.clientName, item.projectName, item.taskTitle, item.epicLabel || "", item.responsible || ""].join(" "));
    return hay.includes(queryKey);
  });

  const today = startOfDay(new Date());
  const overdueScope = [], todayScope = [], upcomingScope = [];
  scopeFiltered.forEach((item) => {
    const diff = daysDiff(item.dueDay, today);
    if (diff < 0) overdueScope.push(item);
    else if (diff === 0) todayScope.push(item);
    else upcomingScope.push(item);
  });
  const sortByDue = (a, b) => a.dueDay.getTime() - b.dueDay.getTime();
  overdueScope.sort(sortByDue);
  todayScope.sort(sortByDue);
  upcomingScope.sort(sortByDue);

  let listItems;
  let filterLabel;
  if (filter === "proximo") { listItems = upcomingScope; filterLabel = "Proximas atividades"; }
  else if (filter === "atrasado") { listItems = overdueScope; filterLabel = "Atividades atrasadas"; }
  else { listItems = [...overdueScope, ...todayScope, ...upcomingScope]; filterLabel = "Todas as atividades"; }

  const toAscii = (s) => String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x00-\x7F]/g, "?");

  const pdf = new JsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const margin = 15;
  const contentW = pageW - margin * 2;
  let y = 0;
  let pageNum = 0;

  const dateStr = new Date().toLocaleDateString("pt-BR");
  const tw = (t) => (typeof pdf.getTextWidth === "function" ? pdf.getTextWidth(t) : t.length * 1.5);

  const addHeader = () => {
    pageNum++;
    pdf.setFillColor(15, 23, 42);
    pdf.rect(0, 0, pageW, 14, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text("JP", margin, 7);
    pdf.setFont("helvetica", "normal");
    pdf.text(" Projects", margin + 14, 7);
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "bold");
    pdf.text("Monitor de Atividades", margin, 11.5);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7);
    pdf.setTextColor(203, 213, 225);
    const gen = "Gerado em " + dateStr;
    pdf.text(gen, pageW - margin - tw(gen), 7);
    pdf.text(toAscii(filterLabel) + " (" + listItems.length + ")", pageW - margin - tw(toAscii(filterLabel) + " (" + listItems.length + ")"), 11);
    pdf.setTextColor(0, 0, 0);
    y = 18;
  };

  const addFooter = () => {
    pdf.setFontSize(7);
    pdf.setTextColor(148, 163, 184);
    pdf.text("JP Projects - " + dateStr, margin, pageH - 5);
    pdf.text("Pagina " + pageNum, pageW - margin - tw("Pagina " + pageNum), pageH - 5);
    pdf.setTextColor(0, 0, 0);
  };

  const checkPage = (need) => {
    if (y + need > pageH - 12) {
      addFooter();
      pdf.addPage();
      addHeader();
    }
  };

  const colX = [margin, margin + 35, margin + 75, margin + 155, margin + 195, margin + 225];
  const colLabels = ["Cliente", "Projeto", "Atividade", "Responsavel", "Data", "Status"];
  const colWidths = [35, 40, 80, 40, 30, contentW - 225 + margin];

  const drawTableHeader = () => {
    pdf.setFillColor(241, 245, 249);
    pdf.rect(margin, y, contentW, 7, "F");
    pdf.setFontSize(7);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(71, 85, 105);
    colLabels.forEach((label, i) => {
      pdf.text(toAscii(label), colX[i] + 1.5, y + 4.5);
    });
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(0, 0, 0);
    y += 8;
  };

  const truncText = (text, maxW) => {
    if (typeof pdf.getTextWidth !== "function") return text.slice(0, Math.floor(maxW / 1.5));
    let t = text;
    while (t.length > 1 && pdf.getTextWidth(t) > maxW) t = t.slice(0, -1);
    if (t.length < text.length) t += "..";
    return t;
  };

  addHeader();

  const kpiY = y;
  const kpiH = 14;
  const kpiW = contentW / 3;
  const kpis = [
    { label: "ATRASADAS", val: String(overdueScope.length), color: [220, 38, 38] },
    { label: "VENCE HOJE", val: String(todayScope.length), color: [245, 158, 11] },
    { label: "PROXIMAS", val: String(upcomingScope.length), color: [16, 185, 129] }
  ];
  kpis.forEach((kpi, i) => {
    const kx = margin + i * kpiW;
    pdf.setFillColor(248, 250, 252);
    pdf.setDrawColor(226, 232, 240);
    pdf.roundedRect(kx + 1, kpiY, kpiW - 2, kpiH, 2, 2, "FD");
    pdf.setFontSize(16);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(...kpi.color);
    pdf.text(kpi.val, kx + kpiW / 2, kpiY + 7, { align: "center" });
    pdf.setFontSize(6);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(100, 116, 139);
    pdf.text(kpi.label, kx + kpiW / 2, kpiY + 11.5, { align: "center" });
  });
  pdf.setTextColor(0, 0, 0);
  y = kpiY + kpiH + 4;

  drawTableHeader();

  const rowH = 6.5;
  listItems.forEach((item, idx) => {
    checkPage(rowH + 2);
    if (idx > 0 && idx % 40 === 0) { drawTableHeader(); }

    if (idx % 2 === 0) {
      pdf.setFillColor(248, 250, 252);
      pdf.rect(margin, y, contentW, rowH, "F");
    }

    const diff = daysDiff(item.dueDay, today);
    const dateShort = formatMonitorShortDate(item.dueDay);
    let statusText, statusColor;
    if (diff < 0) { statusText = "ATRASO: " + Math.abs(diff) + "D"; statusColor = [220, 38, 38]; }
    else if (diff === 0) { statusText = "VENCE HOJE"; statusColor = [245, 158, 11]; }
    else { statusText = "EM " + diff + "D"; statusColor = [16, 185, 129]; }

    pdf.setFontSize(7);
    pdf.setTextColor(30, 41, 59);
    const textY = y + 4.2;
    pdf.text(toAscii(truncText(item.clientName || "", colWidths[0] - 3)), colX[0] + 1.5, textY);
    pdf.text(toAscii(truncText(item.projectName || "", colWidths[1] - 3)), colX[1] + 1.5, textY);
    pdf.text(toAscii(truncText(item.taskTitle || "", colWidths[2] - 3)), colX[2] + 1.5, textY);
    pdf.text(toAscii(truncText(item.responsible || "A definir", colWidths[3] - 3)), colX[3] + 1.5, textY);
    pdf.text(toAscii(dateShort || ""), colX[4] + 1.5, textY);

    pdf.setFontSize(6);
    pdf.setFont("helvetica", "bold");
    pdf.setTextColor(...statusColor);
    pdf.text(toAscii(statusText), colX[5] + 1.5, textY);
    pdf.setFont("helvetica", "normal");
    pdf.setTextColor(0, 0, 0);

    y += rowH;
  });

  if (!listItems.length) {
    pdf.setFontSize(9);
    pdf.setTextColor(148, 163, 184);
    pdf.text("Sem atividades para o filtro selecionado.", margin, y + 8);
  }

  addFooter();
  pdf.save("monitor-atividades-" + new Date().toISOString().slice(0, 10) + ".pdf");
}

function renderOnePageItem(task, options = {}) {
  if (!task) return "";
  const name = escapeHtml(taskTitle(task));
  const todayTs = options.todayTs ?? todayStartTs();

  const epicLabel = task?.phase || "";
  const macroLabel = extractPackageLabel(task) || "";

  const due = parseTaskDate(taskDueStr(task));
  const dueTs = due ? startOfDay(due).getTime() : null;
  const done = isDoneTask(task);
  let schLabel = "EM DIA";
  let schCls = "sched-ok";
  if (done) {
    schLabel = "EM DIA";
    schCls = "sched-ok";
  } else if (dueTs && dueTs < todayTs) {
    schLabel = "EM RISCO";
    schCls = "sched-risk";
  }

  const startLabel = taskStartStr(task) ? formatDateBR(taskStartStr(task)) : "-";
  const endLabel = taskDueStr(task) ? formatDateBR(taskDueStr(task)) : "-";

  const owner = taskOwner(task) || "";
  const ownerInitials = owner
    ? owner.split(/\s+/).map((w) => w[0]?.toUpperCase() || "").join("").slice(0, 2)
    : "";
  const ownerFirstName = owner ? owner.split(/\s+/)[0] : "";

  const epicHtml = epicLabel
    ? `<span class="rpt-badge rpt-badge-epic">${escapeHtml(epicLabel)}</span>`
    : "";
  const macroHtml = macroLabel
    ? `<span class="rpt-badge rpt-badge-macro">MACRO: ${escapeHtml(macroLabel)}</span>`
    : "";
  const schedHtml = `<span class="rpt-badge ${schCls}">${schLabel}</span>`;
  const ownerHtml = owner
    ? `<span class="rpt-owner"><span class="rpt-owner-initials">${escapeHtml(ownerInitials)}</span> ${escapeHtml(ownerFirstName)}</span>`
    : "";

  return `
    <div class="item rpt-card" title="${name}">
      <div class="rpt-badges">${epicHtml}${macroHtml}${schedHtml}</div>
      <div class="rpt-card-title">${name}</div>
      <div class="rpt-card-bottom">
        <div class="rpt-dates">
          <span class="rpt-date">&#128197; ${escapeHtml(startLabel)}</span>
          <span class="rpt-date">&#9674; ${escapeHtml(endLabel)}</span>
        </div>
        ${ownerHtml}
      </div>
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

function parseNumericValue(value) {
  if (value === null || value === undefined) return 0;
  if (typeof value === "number" && Number.isFinite(value)) return value;
  const raw = String(value).trim();
  if (!raw) return 0;
  let normalized = raw.replace(/[^0-9,.-]/g, "");
  const hasComma = normalized.includes(",");
  const hasDot = normalized.includes(".");
  if (hasComma && hasDot) {
    normalized = normalized.replace(/\./g, "").replace(",", ".");
  } else if (hasComma) {
    normalized = normalized.replace(",", ".");
  }
  const num = Number(normalized);
  return Number.isFinite(num) ? num : 0;
}

function resolveProjectCost(project) {
  const budgetBase = resolveProjectBudget(project);
  if (Number.isFinite(budgetBase) && budgetBase > 0) return budgetBase;
  const summary = computeFinanceSummary(project);
  if (Number.isFinite(summary.despesa) && summary.despesa > 0) {
    return summary.despesa;
  }
  return null;
}

function resolveProjectBudget(project) {
  if (!project) return null;
  const candidates = [
    project.budget,
    project.cost,
    project.custo,
    project.valor,
    project.valorProjeto
  ];
  for (const value of candidates) {
    const numeric = parseNumericValue(value);
    if (Number.isFinite(numeric) && numeric > 0) return numeric;
  }
  return null;
}

function formatCurrency(value) {
  if (!Number.isFinite(value)) return "-";
  try {
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
  } catch (err) {
    return `R$ ${value.toFixed(2)}`;
  }
}

function normalizeFinanceType(value) {
  const type = String(value || "").trim().toLowerCase();
  return type === "receita" ? "receita" : "despesa";
}

function getProjectFinancials(project) {
  if (!project) return [];
  if (!Array.isArray(project.financials)) {
    project.financials = [];
  }
  return project.financials;
}

function sortFinanceEntries(entries) {
  return entries.slice().sort((a, b) => {
    const aDate = parseDateSafe(a?.date || a?.createdAt);
    const bDate = parseDateSafe(b?.date || b?.createdAt);
    if (!aDate && !bDate) return 0;
    if (!aDate) return 1;
    if (!bDate) return -1;
    const aTime = aDate.getTime();
    const bTime = bDate.getTime();
    if (aTime !== bTime) return aTime - bTime;
    return (a?.createdAt || 0) - (b?.createdAt || 0);
  });
}

function computeFinanceSummary(project) {
  const entries = getProjectFinancials(project);
  const budgetBase = resolveProjectBudget(project);
  let receita = 0;
  let despesa = 0;
  entries.forEach((entry) => {
    const amount = parseNumericValue(entry?.amount);
    if (normalizeFinanceType(entry?.type) === "receita") {
      receita += amount;
    } else {
      despesa += amount;
    }
  });
  const saldoBase = Number.isFinite(budgetBase) ? budgetBase : 0;
  return {
    receita,
    despesa,
    saldo: saldoBase + receita - despesa,
    budgetBase,
    entries
  };
}

function formatFinanceAmount(amount, type) {
  if (!Number.isFinite(amount)) return "-";
  const label = formatCurrency(amount);
  return normalizeFinanceType(type) === "despesa" ? `-${label}` : label;
}

function taskDurationHours(task) {
  const start = parseTaskDate(taskStartStr(task));
  const end = parseTaskDate(taskDueStr(task));
  if (!start || !end) return null;
  const diffMs = Math.abs(end.getTime() - start.getTime());
  const days = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
  return Math.max(days * 8, 8);
}

function taskEffectiveDuration(task) {
  const d = task?.duration || task?.durationHours || taskDurationHours(task);
  return (d != null && Number.isFinite(d) && d > 0) ? d : null;
}

function taskDurationLabel(task) {
  const h = taskEffectiveDuration(task);
  if (h == null) return "-";
  return `${h} hrs`;
}

function weightedProgressPct(tasks) {
  if (!tasks || !tasks.length) return 0;
  let totalWeight = 0;
  let weightedSum = 0;
  let hasAnyWeight = false;

  for (const t of tasks) {
    const pct = taskProgressValue(t);
    const dur = taskEffectiveDuration(t);
    if (dur != null && dur > 0) {
      totalWeight += dur;
      weightedSum += pct * dur;
      hasAnyWeight = true;
    } else {
      totalWeight += 1;
      weightedSum += pct;
    }
  }

  if (totalWeight <= 0) return 0;
  return clampPct(Math.round(weightedSum / totalWeight));
}

function taskBaselinePct(task) {
  if (task?.baselinePct != null) {
    const n = Number(task.baselinePct);
    if (Number.isFinite(n)) return clampPct(Math.round(n));
  }
  if (task?.plannedPct != null) {
    const n = Number(task.plannedPct);
    if (Number.isFinite(n)) return clampPct(Math.round(n));
  }
  return baselinePctFromDates(taskStartStr(task), taskDueStr(task));
}

function taskSPI(task) {
  const planned = taskBaselinePct(task);
  const actual = taskProgressValue(task);
  if (planned <= 0) return actual > 0 ? 2.0 : 0.0;
  return Math.round((actual / planned) * 100) / 100;
}

function spiIndicatorClass(spi) {
  if (spi <= 0) return "spi-neutral";
  if (spi >= 1.0) return "spi-green";
  if (spi >= 0.8) return "spi-yellow";
  return "spi-red";
}

function spiIndicatorHtml(spi) {
  if (spi == null || !Number.isFinite(spi)) return `<span class="spi-dot spi-neutral"></span><span class="spi-val">-</span>`;
  const cls = spiIndicatorClass(spi);
  return `<span class="spi-dot ${cls}"></span><span class="spi-val">${spi.toFixed(2)}</span>`;
}

function rollupSPI(items) {
  const list = Array.isArray(items) ? items : [];
  if (!list.length) return 0.0;
  let totalPlanned = 0;
  let totalActual = 0;
  for (const t of list) {
    const dur = taskEffectiveDuration(t) || 1;
    totalPlanned += taskBaselinePct(t) * dur;
    totalActual += taskProgressValue(t) * dur;
  }
  if (totalPlanned <= 0) return totalActual > 0 ? 2.0 : 0.0;
  return Math.round((totalActual / totalPlanned) * 100) / 100;
}

function rollupDurationHours(items) {
  const list = Array.isArray(items) ? items : [];
  let total = 0;
  list.forEach((t) => {
    const h = t?.duration || t?.durationHours || taskDurationHours(t);
    if (h != null && Number.isFinite(h) && h > 0) total += h;
  });
  return total > 0 ? total : null;
}

function rollupDurationLabel(items) {
  const h = rollupDurationHours(items);
  if (h == null) return "-";
  return `${Math.round(h)} hrs`;
}

function rollupBaselinePct(items) {
  const list = Array.isArray(items) ? items : [];
  if (!list.length) return 0;
  let totalWeight = 0;
  let weightedSum = 0;
  for (const t of list) {
    const dur = taskEffectiveDuration(t) || 1;
    totalWeight += dur;
    weightedSum += taskBaselinePct(t) * dur;
  }
  return totalWeight > 0 ? clampPct(Math.round(weightedSum / totalWeight)) : 0;
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
  if (!Number.isFinite(gapValue)) {
    return { className: "gap-ok", label: "Em dia", color: "#2F8F61" };
  }
  // Rule (PP):
  // Verde: <= 3pp => Em dia (includes negative).
  // Amarelo claro: >3 a 10 => Baixo risco
  // Amarelo forte: >10 a 19 => Potencial risco
  // Laranja: 20 a 29 => Alto risco
  // Vermelho: 30+ => Critico
  if (gapValue <= 3) {
    return { className: "gap-ok", label: "Em dia", color: "#2F8F61" };
  }
  if (gapValue <= 10) {
    return { className: "gap-low", label: "Baixo risco", color: "#D97706" };
  }
  if (gapValue <= 19) {
    return { className: "gap-risk", label: "Potencial risco", color: "#B45309" };
  }
  if (gapValue <= 29) {
    return { className: "gap-delayed", label: "Alto risco", color: "#EA580C" };
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

// Planned (PV) at report date based on baseline dates per leaf task (mirrors OnePage logic).
// Returns a percentage [0..100] or null when inputs are insufficient.
function computePlannedBaselinePctByTasks(project, activities) {
  const list = Array.isArray(activities)
    ? activities
    : Array.isArray(project?.activities)
      ? project.activities
      : [];
  const tasksRaw = list.length ? list : flattenProjectTasks(project);
  const tasks = leafTasksForProgress(tasksRaw);
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
  const idxNow = Math.max(0, Math.min(dates.length - 1, daysDiff(clampedReport, startDate)));

  const parseWeightValue = (value) => {
    if (value == null) return null;
    if (typeof value === "number" && Number.isFinite(value)) return value > 0 ? value : null;
    const s = String(value || "").trim();
    if (!s) return null;
    const cleaned = s.replace(",", ".").replace(/[^0-9.]+/g, "");
    const n = Number(cleaned);
    return Number.isFinite(n) && n > 0 ? n : null;
  };

  const taskWeight = (t) => {
    const w =
      parseWeightValue(t?.weight) ??
      parseWeightValue(t?.work) ??
      parseWeightValue(t?.hours) ??
      parseWeightValue(t?.effort) ??
      parseWeightValue(t?.cost) ??
      null;
    return w ?? 1;
  };

  const normFieldKey = (value) =>
    String(value || "")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "");

  const pickDateField = (task, keys) => {
    if (!task || typeof task !== "object") return null;
    const taskKeys = Object.keys(task);
    for (const k of keys) {
      let raw = null;
      try {
        raw = task[k];
      } catch (_err) {
        raw = null;
      }
      const dt = parseDateSafe(raw);
      if (dt) return dt;
    }
    for (const k of keys) {
      const want = normFieldKey(k);
      if (!want) continue;
      const found = taskKeys.find((kk) => {
        const got = normFieldKey(kk);
        return got === want || got.includes(want) || want.includes(got);
      });
      if (!found) continue;
      const dt = parseDateSafe(task[found]);
      if (dt) return dt;
    }
    return null;
  };

  const pickBaselineStart = (t) =>
    pickDateField(t, [
      "baselineStart",
      "baseline_start",
      "baseline_start_date",
      "baselineInicio",
      "baseline_inicio",
      "baselineBegin",
      "Baseline Start",
      "BaselineStart"
    ]);

  const pickBaselineFinish = (t) =>
    pickDateField(t, [
      "baselineFinish",
      "baselineEnd",
      "baseline_finish",
      "baseline_end",
      "baseline_end_date",
      "baselineTermino",
      "baseline_termino",
      "baselineFim",
      "baseline_fim",
      "baselineDue",
      "Baseline Finish",
      "Baseline End",
      "BaselineFinish"
    ]);

  const pickPlannedStart = (t) =>
    pickDateField(t, [
      "start",
      "startDate",
      "inicio",
      "dataInicio",
      "Inicio",
      "Data Inicio",
      "Start",
      "Inicio (planejado)"
    ]);

  const pickPlannedFinish = (t) =>
    pickDateField(t, [
      "due",
      "dueDate",
      "plannedEnd",
      "end",
      "endDate",
      "termino",
      "fim",
      "dataFim",
      "Fim",
      "Data Fim",
      "Finish",
      "Termino"
    ]);

  const plannedInc = Array.from({ length: totalDays + 1 }, () => 0);
  let totalWeight = 0;
  let hasAnyTaskWindow = false;

  for (const t of tasks) {
    if (!t) continue;
    const w = taskWeight(t);
    totalWeight += w;

    const bs = pickBaselineStart(t);
    const bf = pickBaselineFinish(t);
    const ps = pickPlannedStart(t);
    const pf = pickPlannedFinish(t) || parseDateSafe(activityDueDate(t));
    if (bs || bf || ps || pf) hasAnyTaskWindow = true;

    // Prefer baseline windows when they exist; otherwise, planned start/finish.
    // Even without baseline fields, distributing PV by planned dates is more realistic than
    // a single linear ramp at project level.
    const s = startOfDay(bs || ps || startDate);
    const e = startOfDay(bf || pf || endDate);
    const eSafe = e < s ? s : e;

    const i0 = Math.max(0, Math.min(totalDays, daysDiff(s, startDate)));
    const i1 = Math.max(0, Math.min(totalDays, daysDiff(eSafe, startDate)));
    const daysInclusive = Math.max(1, i1 - i0 + 1);
    const perDay = w / daysInclusive;
    for (let i = i0; i <= i1; i += 1) plannedInc[i] += perDay;
  }

  if (totalWeight <= 0) totalWeight = 1;

  if (!hasAnyTaskWindow) {
    // Fallback: no task windows at all (unlikely). Use linear PV by project time.
    return round1(clamp01(idxNow / totalDays) * 100);
  }

  let pv = 0;
  for (let d = 0; d <= idxNow; d += 1) pv += plannedInc[d] || 0;
  return round1(clamp01(pv / totalWeight) * 100);
}

function renderSCurveSvgDaily(sc, opts = {}) {
  if (!sc || !Array.isArray(sc.dates) || sc.dates.length < 2) return "";
  const W = opts.width ?? 1760;
  const H = opts.height ?? 240;
  const footerPad = 18;
  const svgH = H + footerPad;

  const pad = { l: 96, r: 24, t: 18, b: 40 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;

  const basePalette = {
    planned: "#cbd5e1",
    actual: "#10b981",
    axis: "#e2e8f0",
    muted: "#94a3b8",
    text: "#0f172a"
  };
  const colors = opts.colors || {};
  const palette = {
    planned: colors.planned || basePalette.planned,
    actual: colors.actual || basePalette.actual,
    axis: colors.grid || colors.axis || basePalette.axis,
    muted: colors.muted || basePalette.muted,
    text: colors.text || basePalette.text
  };

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

  const xNow = xAtDate(sc.report);
  const yBaseNow = yAt(sc.baselineNow ?? 0);
  const yRealNow = yAt(sc.realizedNow ?? 0);

  const yTicks = [0, 0.5, 1].map((p) => ({
    value: Math.round(p * 100),
    y: yAt(p)
  }));

  return `
    <svg width="${W}" height="${svgH}" viewBox="0 0 ${W} ${svgH}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="realGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="rgba(16, 185, 129, 0.35)"/>
        </filter>
      </defs>

      <line x1="${pad.l}" y1="${pad.t}" x2="${pad.l}" y2="${H - pad.b}" stroke="${palette.axis}" stroke-width="1"/>
      <line x1="${pad.l}" y1="${H - pad.b}" x2="${W - pad.r}" y2="${H - pad.b}" stroke="${palette.axis}" stroke-width="1"/>

      ${yTicks
        .map(
          (tick) => `
        <line x1="${pad.l - 6}" y1="${tick.y}" x2="${pad.l}" y2="${tick.y}" stroke="${palette.axis}" stroke-width="1"/>
        <text x="${pad.l - 10}" y="${tick.y + 4}" text-anchor="end" font-size="10" fill="${palette.muted}" font-family="Inter, system-ui, -apple-system, sans-serif" style="font-variant-numeric: tabular-nums;">${tick.value}%</text>
      `
        )
        .join("")}

      <line x1="${xNow}" y1="${pad.t}" x2="${xNow}" y2="${H - pad.b}" stroke="${palette.muted}" stroke-width="1" stroke-dasharray="4 6" opacity="0.7"/>

      <path d="${basePath}" fill="none" stroke="${palette.planned}" stroke-width="2"/>
      <path id="curve-real-path" d="${realPath}" fill="none" stroke="${palette.actual}" stroke-width="4" filter="url(#realGlow)"/>
      <path id="curve-real-hit" d="${realPath}" fill="none" stroke="transparent" stroke-width="14" pointer-events="stroke"/>

      <circle cx="${xNow}" cy="${yBaseNow}" r="3" fill="${palette.planned}"/>
      <circle cx="${xNow}" cy="${yRealNow}" r="4" fill="${palette.actual}"/>

      <text x="${pad.l}" y="${H - 18}" font-size="10" fill="${palette.muted}" font-family="Inter, system-ui, -apple-system, sans-serif" style="font-variant-numeric: tabular-nums;">${fmtBR(sc.start)}</text>
      <text x="${W - pad.r}" y="${H - 18}" text-anchor="end" font-size="10" fill="${palette.muted}" font-family="Inter, system-ui, -apple-system, sans-serif" style="font-variant-numeric: tabular-nums;">${fmtBR(sc.end)}</text>
      <text x="${pad.l}" y="${svgH - 4}" font-size="10" fill="${palette.muted}" font-family="Inter, system-ui, -apple-system, sans-serif" style="font-variant-numeric: tabular-nums;">Inicio: ${fmtBR(sc.start)}</text>
      <text x="${W - pad.r}" y="${svgH - 4}" text-anchor="end" font-size="10" fill="${palette.muted}" font-family="Inter, system-ui, -apple-system, sans-serif" style="font-variant-numeric: tabular-nums;">Go-Live: ${fmtBR(sc.end)}</text>
    </svg>
  `;
}

function renderSCurveSvg(sc, opts = {}) {
  if (!sc || !sc.start || !sc.end || !Array.isArray(sc.buckets) || sc.buckets.length < 2) return "";
  const W = opts.width ?? 1760;
  const H = opts.height ?? 240;
  const footerPad = 18;
  const svgH = H + footerPad;

  const pad = { l: 96, r: 24, t: 18, b: 40 };
  const innerW = W - pad.l - pad.r;
  const innerH = H - pad.t - pad.b;

  const palette = {
    planned: "#cbd5e1",
    actual: "#10b981",
    axis: "#e2e8f0",
    muted: "#94a3b8",
    text: "#0f172a"
  };

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

  const xNow = xAtDate(reportDate);
  const yPlanNow = yAt(sc.plannedNow ?? 0);
  const yRealNow = yAt(sc.actualNow ?? 0);

  const yTicks = [0, 0.5, 1].map((p) => ({
    value: Math.round(p * 100),
    y: yAt(p)
  }));

  return `
    <svg width="${W}" height="${svgH}" viewBox="0 0 ${W} ${svgH}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="realGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="4" stdDeviation="4" flood-color="rgba(16, 185, 129, 0.35)"/>
        </filter>
      </defs>

      <line x1="${pad.l}" y1="${pad.t}" x2="${pad.l}" y2="${H - pad.b}" stroke="${palette.axis}" stroke-width="1"/>
      <line x1="${pad.l}" y1="${H - pad.b}" x2="${W - pad.r}" y2="${H - pad.b}" stroke="${palette.axis}" stroke-width="1"/>

      ${yTicks
        .map(
          (tick) => `
        <line x1="${pad.l - 6}" y1="${tick.y}" x2="${pad.l}" y2="${tick.y}" stroke="${palette.axis}" stroke-width="1"/>
        <text x="${pad.l - 10}" y="${tick.y + 4}" text-anchor="end" font-size="10" fill="${palette.muted}" font-family="Inter, system-ui, -apple-system, sans-serif" style="font-variant-numeric: tabular-nums;">${tick.value}%</text>
      `
        )
        .join("")}

      <path d="${plannedPath}" fill="none" stroke="${palette.planned}" stroke-width="2"/>
      <path id="curve-real-path" d="${actualPath}" fill="none" stroke="${palette.actual}" stroke-width="4" filter="url(#realGlow)"/>
      <path id="curve-real-hit" d="${actualPath}" fill="none" stroke="transparent" stroke-width="14" pointer-events="stroke"/>

      <circle cx="${xNow}" cy="${yPlanNow}" r="3" fill="${palette.planned}"/>
      <circle cx="${xNow}" cy="${yRealNow}" r="4" fill="${palette.actual}"/>

      <text x="${pad.l}" y="${H - 18}" font-size="10" fill="${palette.muted}" font-family="Inter, system-ui, -apple-system, sans-serif" style="font-variant-numeric: tabular-nums;">${fmtBR(sc.start)}</text>
      <text x="${W - pad.r}" y="${H - 18}" text-anchor="end" font-size="10" fill="${palette.muted}" font-family="Inter, system-ui, -apple-system, sans-serif" style="font-variant-numeric: tabular-nums;">${fmtBR(sc.end)}</text>
      <text x="${pad.l}" y="${svgH - 4}" font-size="10" fill="${palette.muted}" font-family="Inter, system-ui, -apple-system, sans-serif" style="font-variant-numeric: tabular-nums;">Inicio: ${fmtBR(sc.start)}</text>
      <text x="${W - pad.r}" y="${svgH - 4}" text-anchor="end" font-size="10" fill="${palette.muted}" font-family="Inter, system-ui, -apple-system, sans-serif" style="font-variant-numeric: tabular-nums;">Go-Live: ${fmtBR(sc.end)}</text>
    </svg>
  `;
}

function renderOnePageSCurve({ root, project, metrics }) {
  const mount = root ? root.querySelector("#sCurveMount") : document.getElementById("sCurveMount");
  if (!mount) return;
  mount.innerHTML = "";
  const progressPct = clampPct(project?.progress ?? metrics?.progress ?? 0);
  const series = computeSCurveDailyBaseline(project, project?.activities || null, progressPct);
  const height = 260;
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

function buildSparklineSeries(endValue, points = 6) {
  const end = clampPct(endValue);
  const start = Math.max(0, end - 24);
  const step = (end - start) / Math.max(1, points - 1);
  const series = [];
  for (let i = 0; i < points; i += 1) {
    const jitter = i % 2 === 0 ? 0 : step * 0.18;
    series.push(clampPct(start + step * i + jitter));
  }
  return series;
}

function renderSparklineSvg(points, opts = {}) {
  if (!Array.isArray(points) || points.length < 2) return "";
  const width = opts.width ?? 120;
  const height = opts.height ?? 34;
  const stroke = opts.stroke ?? "var(--accent)";
  const fill = opts.fill ?? "rgba(16, 185, 129, 0.12)";
  const pad = 4;
  const max = 100;
  const min = 0;
  const scaleX = (width - pad * 2) / Math.max(1, points.length - 1);
  const scaleY = (height - pad * 2) / Math.max(1, max - min);
  const coords = points.map((p, i) => {
    const x = pad + i * scaleX;
    const y = height - pad - (p - min) * scaleY;
    return { x, y };
  });
  const linePath = coords
    .map((pt, i) => `${i === 0 ? "M" : "L"} ${pt.x.toFixed(2)} ${pt.y.toFixed(2)}`)
    .join(" ");
  const fillPath = `${linePath} L ${coords[coords.length - 1].x.toFixed(2)} ${height - pad} L ${coords[0].x.toFixed(
    2
  )} ${height - pad} Z`;
  return `
    <svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="${fillPath}" fill="${fill}"></path>
      <path d="${linePath}" fill="none" stroke="${stroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg>
  `;
}

function upcomingMilestones(tasks = [], limit = 4) {
  const today = startOfDay(new Date());
  return (tasks || [])
    .filter((task) => normalizeTaskStatus(getTaskStatus(task)) !== "concluido")
    .map((task) => {
      const due = parseDateSafe(taskDueStr(task));
      return { task, due };
    })
    .filter((entry) => entry.due && entry.due >= today)
    .sort((a, b) => a.due - b.due)
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
    .report-page .gap-card.gap-low { background: rgba(253, 230, 138, 0.35); border-color: rgba(245, 158, 11, 0.30); }
    .report-page .gap-card.gap-risk { background: rgba(245, 158, 11, 0.16); border-color: rgba(245, 158, 11, 0.34); }
    .report-page .gap-card.gap-delayed { background: rgba(234, 88, 12, 0.18); border-color: rgba(234, 88, 12, 0.34); }
    .report-page .gap-card.gap-critical { background: rgba(155, 28, 35, 0.12); border-color: rgba(155, 28, 35, 0.3); }
    .report-page .gap-card.gap-ok .kpiValue,
    .report-page .gap-card.gap-ok .kpiSub { color: #2f8f61; }
    .report-page .gap-card.gap-low .kpiValue,
    .report-page .gap-card.gap-low .kpiSub { color: #92400e; }
    .report-page .gap-card.gap-risk .kpiValue,
    .report-page .gap-card.gap-risk .kpiSub { color: #b45309; }
    .report-page .gap-card.gap-delayed .kpiValue,
    .report-page .gap-card.gap-delayed .kpiSub { color: #c2410c; }
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
    .report-page .miniStat.gap.gap-low b { color: #92400e; }
    .report-page .miniStat.gap.gap-risk b { color: #b45309; }
    .report-page .miniStat.gap.gap-delayed b { color: #c2410c; }
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

    .report-page .rpt-card {
      padding: 12px;
      border-left: 3px solid #e2e8f0;
    }

    .report-page .rpt-badges {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-bottom: 6px;
    }

    .report-page .rpt-badge {
      font-size: 10px;
      font-weight: 600;
      padding: 2px 8px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }

    .report-page .rpt-badge-epic {
      background: #fee2e2;
      color: #dc2626;
    }

    .report-page .rpt-badge-macro {
      background: #f1f5f9;
      color: #475569;
      border: 1px solid #e2e8f0;
    }

    .report-page .sched-ok {
      background: #dcfce7;
      color: #16a34a;
    }

    .report-page .sched-risk {
      background: #fef3c7;
      color: #d97706;
    }

    .report-page .rpt-card-title {
      font-size: 13px;
      font-weight: 700;
      line-height: 1.3;
      color: #1e293b;
      margin-bottom: 8px;
    }

    .report-page .rpt-card-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 8px;
    }

    .report-page .rpt-dates {
      display: flex;
      gap: 12px;
    }

    .report-page .rpt-date {
      font-size: 11px;
      color: #64748b;
    }

    .report-page .rpt-owner {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 11px;
      font-weight: 600;
      color: #475569;
      white-space: nowrap;
    }

    .report-page .rpt-owner-initials {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 22px;
      height: 22px;
      border-radius: 6px;
      background: #e0e7ff;
      color: #4338ca;
      font-size: 10px;
      font-weight: 700;
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

    .report-page .curve-card {
      border-radius: 32px;
      border: 1px solid #eef2f6;
      padding: 24px;
    }

    .report-page .curve-head {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      gap: 16px;
      margin-bottom: 12px;
    }

    .report-page .curve-kicker {
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      color: #94a3b8;
    }

    .report-page .curve-title {
      margin: 6px 0 0;
      font-size: 28px;
      font-weight: 800;
      letter-spacing: -0.02em;
      color: #0f172a;
    }

    .report-page .curve-dot {
      color: #10b981;
    }

    .report-page .curve-head-stats {
      display: flex;
      gap: 16px;
      align-items: flex-end;
    }

    .report-page .curve-stat {
      display: flex;
      flex-direction: column;
      gap: 4px;
      text-align: right;
      font-variant-numeric: tabular-nums;
    }

    .report-page .curve-stat-label {
      font-size: 9px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.2em;
      color: #94a3b8;
    }

    .report-page .curve-stat-value {
      font-size: 20px;
      font-weight: 700;
      color: #0f172a;
    }

    .report-page .curve-stat-gap {
      padding: 8px 12px;
      border-radius: 14px;
      border: 1px solid rgba(239, 68, 68, 0.2);
      background: rgba(239, 68, 68, 0.1);
      color: #ef4444;
    }

    .report-page .curve-stat-gap.gap-ok {
      background: rgba(16, 185, 129, 0.12);
      border-color: rgba(16, 185, 129, 0.2);
      color: #10b981;
    }

    .report-page .curve-stat-gap.gap-low {
      background: rgba(253, 230, 138, 0.35);
      border-color: rgba(245, 158, 11, 0.30);
      color: #92400e;
    }

    .report-page .curve-stat-gap.gap-risk {
      background: rgba(245, 158, 11, 0.16);
      border-color: rgba(245, 158, 11, 0.34);
      color: #b45309;
    }

    .report-page .curve-stat-gap.gap-delayed {
      background: rgba(234, 88, 12, 0.18);
      border-color: rgba(234, 88, 12, 0.34);
      color: #c2410c;
    }

    .report-page .curve-stat-gap.gap-critical {
      background: rgba(239, 68, 68, 0.12);
      border-color: rgba(239, 68, 68, 0.24);
      color: #ef4444;
    }

    .report-page .curve-stat-gap .curve-stat-label,
    .report-page .curve-stat-gap .curve-stat-value {
      color: inherit;
    }

    .report-page .curve-legend {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-bottom: 12px;
    }

    .report-page .legend-card {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 6px 12px;
      border-radius: 999px;
      border: 1px solid #e2e8f0;
      background: #ffffff;
      font-size: 10px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.18em;
      color: #64748b;
      white-space: nowrap;
    }

    .report-page .legend-line {
      width: 18px;
      height: 4px;
      border-radius: 999px;
      background: #cbd5e1;
    }

    .report-page .legend-line.actual {
      background: #10b981;
      box-shadow: 0 0 8px rgba(16, 185, 129, 0.4);
    }

    .report-page .svgBox {
      width: 100%;
      height: 260px;
      border-radius: 20px;
      border: 1px solid #e2e8f0;
      background: #f8fafc;
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
  const allTasks = flattenProjectTasks(project);
  const reportMetrics = metrics || projectMetrics(allTasks);
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
    ? renderSCurveSvgDaily(sCurveSeries, { width: 1760, height: 260, colors: getSystemColors() })
    : `<div class="empty">Curva S: defina Data Inicio e Go Live.</div>`;
  const baselinePct = rollupBaselinePct(leafTasksForProgress(allTasks));
  const realizedPct = progressPct;
  const baselineLabel = `${baselinePct.toFixed(1)}%`;
  const realizedLabel = `${realizedPct.toFixed(1)}%`;
  const gapPP = round1(baselinePct - realizedPct);
  const gapLabel = `${formatSignedMetric(gapPP)}pp`;
  const gapStatus = gapStatusInfo(gapPP, baselinePct, realizedPct);
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
        <div class="card curve-card">
          <div class="curve-head">
            <div>
              <span class="curve-kicker">Desempenho fisico</span>
              <h2 class="curve-title">Curva S <span class="curve-dot">.</span></h2>
            </div>
            <div class="curve-head-stats">
              <div class="curve-stat">
                <span class="curve-stat-label">Realizado</span>
                <span class="curve-stat-value">${realizedLabel}</span>
              </div>
              <div class="curve-stat curve-stat-gap ${gapTone}">
                <span class="curve-stat-label">GAP</span>
                <span class="curve-stat-value">${gapLabel}</span>
              </div>
            </div>
          </div>
          <div class="curve-legend">
            <div class="legend-card">
              <span class="legend-line planned"></span>
              Planejado
            </div>
            <div class="legend-card">
              <span class="legend-line actual"></span>
              Realizado
            </div>
          </div>
          <div id="sCurveMount" class="svgBox curve-canvas">${sCurveSvg}</div>
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
            <h2>&#10004; Concluido</h2>
            <span class="pill"><b>${done.length}</b></span>
          </div>
          <div class="cardBody">
            <div class="items">${doneList}</div>
          </div>
        </div>

        <div class="card">
          <div class="cardHeader">
            <h2>Em andamento</h2>
            <span class="pill"><b>${inProgress.length}</b></span>
          </div>
          <div class="cardBody">
            <div class="items">${inProgressList}</div>
          </div>
        </div>

        <div class="card">
          <div class="cardHeader">
            <h2>&#9888; Proximos passos</h2>
            <span class="pill"><b>${nextSteps.length}</b></span>
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
  // Match the on-screen onepage iframe width to export the same responsive layout.
  const onScreenFrame = document.querySelector("iframe.onepage-frame");
  const targetW = Math.ceil(
    onScreenFrame?.getBoundingClientRect?.().width ||
      document.documentElement?.clientWidth ||
      window.innerWidth ||
      1280
  );
  reportFrame.style.width = `${Math.max(360, targetW)}px`;
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

    // Ensure OnePage uses the same in-memory project data as the screen (avoid localStorage/query mismatches).
    try {
      const payload = buildOnePagePayload(project, client);
      const win = reportFrame.contentWindow;
      if (win && typeof win.__applyOnePageData === "function") win.__applyOnePageData(payload);
      else win?.postMessage({ type: "onepage-data", payload }, "*");
    } catch (_err) {}

    const frameDoc = reportFrame.contentDocument;
    const captureEl = frameDoc?.getElementById("onepageRoot") || frameDoc?.body;
    if (!captureEl) {
      throw new Error("Conteudo do relatorio nao encontrado.");
    }

    if (frameDoc?.fonts?.ready) await frameDoc.fonts.ready;
    await sleep(120);
    await waitForImages(captureEl);
    await new Promise((resolve) => requestAnimationFrame(resolve));

    const rect = captureEl.getBoundingClientRect();
    let pageW = Math.ceil(captureEl.scrollWidth || rect.width || targetW || 1280);
    let pageH = Math.ceil(captureEl.scrollHeight || rect.height || 900);
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
          (allProjects.reduce((acc, { project }) => acc + clampPct(project.progress || 0), 0) / allProjects.length) * 10
        ) / 10;

  const today = startOfDay(new Date());
  const clientsCards = (clients || [])
    .filter((c) => (c.projects || []).length > 0)
    .map((c) => {
      const projs = c.projects || [];
      const avg = projs.length
        ? Math.round((projs.reduce((a, p) => a + clampPct(p.progress || 0), 0) / projs.length) * 10) / 10
        : 0;

      const counters = { "Nao iniciado": 0, "Em andamento": 0, Atrasado: 0, Concluido: 0 };
      let overdueCount = 0;
      let worstOverdueDays = 0;
      let worstTaskTitle = "";
      let worstTaskProject = "";
      projs.forEach((p) => {
        const st = getProjectStatus(p);
        counters[st] = (counters[st] || 0) + 1;
        const tasks = flattenProjectTasks(p);
        tasks.forEach((task) => {
          if (!task || isDoneTask(task)) return;
          const dueValue = taskDueValueSafe(task);
          if (!Number.isFinite(dueValue) || dueValue === Number.POSITIVE_INFINITY) return;
          const dueDay = new Date(dueValue);
          if (dueDay >= today) return;
          overdueCount += 1;
          const overdueDays = Math.abs(daysDiff(dueDay, today));
          if (overdueDays > worstOverdueDays) {
            worstOverdueDays = overdueDays;
            worstTaskTitle = taskTitle(task);
            worstTaskProject = p?.name || "";
          }
        });
      });

      return {
        name: c.name || c.id || "Cliente",
        projectsCount: projs.length,
        avgProgress: avg,
        counters,
        overdueCount,
        worstOverdueDays,
        worstTaskTitle,
        worstTaskProject
      };
    });

  return { activeClients, projectsActive, tasksNext7, avgProgress, clientsCards };
}

function renderHomeMacroSummary() {
  const { activeClients, projectsActive, tasksNext7, avgProgress } = computeHomeMacroStats(state.clients);
  const allProjects = getAllProjects(state.clients);

  const view = state.home?.view === "list" ? "list" : "grid";
  const searchRaw = String(state.home?.search || "").trim().toLowerCase();

  const today = startOfDay(new Date());
  const fmtShort = (name) => {
    const parts = String(name || "").trim().split(/\s+/g).filter(Boolean);
    if (!parts.length) return "-";
    if (parts.length === 1) return parts[0];
    return `${parts[0]} ${parts[parts.length - 1][0]}.`;
  };

  const scoreProject = (p) => {
    // higher score = more urgent
    const tasks = flattenProjectTasks(p.project);
    let overdue = 0;
    for (const t of tasks) {
      if (!t || isDoneTask(t)) continue;
      const due = taskDueValueSafe(t);
      if (!Number.isFinite(due) || due === Number.POSITIVE_INFINITY) continue;
      const dueDay = new Date(due);
      if (dueDay < today) overdue += 1;
    }
    const progress = clampPct(p.project?.progress || 0);
    const endDt = parseTaskDate(p.project?.end || p.project?.goLive || p.project?.goLiveDate || "");
    const late = endDt && endDt.getTime() < today.getTime() ? 1 : 0;
    return late * 1000 + overdue * 50 + (100 - progress);
  };

  const resolveHealth = (project) => {
    const endDt = parseTaskDate(project?.end || project?.goLive || project?.goLiveDate || "");
    if (endDt && endDt.getTime() < today.getTime() && clampPct(project?.progress || 0) < 100) {
      return { label: "ATRASADO", tone: "bad" };
    }
    const tasks = flattenProjectTasks(project);
    for (const t of tasks) {
      if (!t || isDoneTask(t)) continue;
      const due = taskDueValueSafe(t);
      if (!Number.isFinite(due) || due === Number.POSITIVE_INFINITY) continue;
      if (new Date(due) < today) return { label: "EM RISCO", tone: "warn" };
    }
    return { label: "EM DIA", tone: "ok" };
  };

  const buildAlertHtml = (project) => {
    const tasks = flattenProjectTasks(project);
    const overdue = [];
    let nextTask = null;
    let nextDue = Infinity;
    for (const t of tasks) {
      if (!t || isDoneTask(t)) continue;
      const dueValue = taskDueValueSafe(t);
      if (!Number.isFinite(dueValue) || dueValue === Number.POSITIVE_INFINITY) continue;
      const dueDay = new Date(dueValue);
      if (dueDay < today) {
        const days = Math.abs(daysDiff(dueDay, today));
        overdue.push({ task: t, days });
      } else if (dueValue < nextDue) {
        nextDue = dueValue;
        nextTask = t;
      }
    }
    if (overdue.length) {
      overdue.sort((a, b) => b.days - a.days);
      const top = overdue.slice(0, 3);
      const lines = top.map((item) => {
        const name = escapeHtml(taskTitle(item.task));
        return `<div class="alert-item alert-item--late"><span class="alert-dot alert-dot--red"></span><b>${item.days}d</b> ${name}</div>`;
      });
      if (overdue.length > 3) lines.push(`<div class="alert-item alert-item--more">+${overdue.length - 3} atrasadas</div>`);
      return lines.join("");
    }
    if (nextTask) {
      const name = escapeHtml(taskTitle(nextTask));
      const dueLabel = escapeHtml(formatDateBR(taskDueStr(nextTask)));
      return `<div class="alert-item alert-item--next"><span class="alert-dot alert-dot--green"></span>Proxima: <b>${name}</b> — ${dueLabel}</div>`;
    }
    return `<div class="alert-item alert-item--ok">Nenhuma pendencia critica</div>`;
  };

  const deriveSquad = (project) => {
    if (Array.isArray(project?.squadMembers) && project.squadMembers.length) {
      return project.squadMembers.map((s) => String(s || "").trim()).filter(Boolean);
    }
    if (Array.isArray(project?.team) && project.team.length) {
      return project.team
        .map((m) => (typeof m === "string" ? m : m?.name || m?.member || ""))
        .map((s) => String(s || "").trim())
        .filter(Boolean);
    }
    const tasks = flattenProjectTasks(project);
    const owners = [];
    for (const t of tasks) {
      const o = String(taskOwner(t) || "").trim();
      if (!o) continue;
      if (!owners.includes(o)) owners.push(o);
      if (owners.length >= 7) break;
    }
    return owners;
  };

  const renderAvatarStack = (members) => {
    const list = (members || []).slice(0, 7);
    const extra = (members || []).length - list.length;
    const items = list
      .map((name) => {
        const initials = escapeHtml(initialsFromName(name || "T"));
        const safeTitle = escapeHtml(name || "");
        return `<span class="avatar-stack-item" title="${safeTitle}" aria-label="${safeTitle}">${initials}</span>`;
      })
      .join("");
    const more = extra > 0 ? `<span class="avatar-stack-item avatar-stack-item--more" title="+${extra}">+${extra}</span>` : "";
    return `<div class="avatar-stack" aria-label="Squad">${items}${more}</div>`;
  };

  const normalized = allProjects
    .map(({ client, project }, idx) => {
      const key = `${idx}`;
      return { key, client, project };
    })
    .filter(({ client, project }) => {
      if (!project) return false;
      const hasTasks = Array.isArray(project.tasks) && project.tasks.length > 0;
      const isActive = clampPct(project.progress || 0) < 100;
      if (!isActive) return false;
      if (!hasTasks && !project.start && !project.end) return false;
      if (!searchRaw) return true;
      const hay = `${client?.name || ""} ${project?.name || ""}`.toLowerCase();
      return hay.includes(searchRaw);
    })
    .sort((a, b) => scoreProject(b) - scoreProject(a));

  const cards = normalized.map(({ client, project }) => {
    const clientName = client?.name || "Cliente";
    const projectName = project?.name || "Projeto";
    const clientInitials = escapeHtml(initialsFromName(clientName));
    const health = resolveHealth(project);
    const progress = clampPct(project?.progress || 0);
    const alertHtml = buildAlertHtml(project);
    const squad = deriveSquad(project);
    const pmNameRaw =
      project?.pm ||
      project?.responsible ||
      project?.leader ||
      project?.lead ||
      project?.developer ||
      "A definir";
    const pmName = escapeHtml(fmtShort(pmNameRaw));

    return `
      <article class="home-project-card" data-home-open-project="true" data-client-name="${escapeHtml(clientName)}" data-project-name="${escapeHtml(projectName)}">
        <div class="home-project-head">
          <div class="home-project-head-left">
            <div class="home-project-client-avatar">${clientInitials}</div>
            <div class="home-project-titles">
              <div class="home-project-client">${escapeHtml(clientName)}</div>
              <div class="home-project-name">${escapeHtml(projectName)}</div>
            </div>
          </div>
          <span class="home-project-pill home-project-pill--${health.tone}">${health.label}</span>
        </div>

        <div class="home-project-progress">
          <div class="home-project-progress-label">Progresso</div>
          <div class="home-project-progress-row">
            <div class="home-project-bar" aria-hidden="true"><span style="width:${progress}%"></span></div>
            <div class="home-project-progress-value">${progress}%</div>
          </div>
        </div>

        <div class="home-project-alert">
          <div class="home-project-alert-kicker">ALERTA DE OPERACAO</div>
          <div class="home-project-alert-text">${alertHtml}</div>
        </div>

        <div class="home-project-footer">
          <div class="home-project-footer-left">
            ${renderAvatarStack(squad)}
            <div class="home-project-pm">
              <div class="home-project-pm-label">PM RESPONSAVEL</div>
              <div class="home-project-pm-name">${pmName}</div>
            </div>
          </div>
          <button type="button" class="home-project-cta" title="Abrir projeto" aria-label="Abrir projeto">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7"></path><path d="M7 7h10v10"></path></svg>
          </button>
        </div>
      </article>
    `;
  });

  // Side panels
  const allTasks = normalized.flatMap(({ client, project }) => {
    const tasks = flattenProjectTasks(project);
    return tasks.map((t) => ({ task: t, clientName: client?.name || "", projectName: project?.name || "" }));
  });

  const milestoneEntries = upcomingMilestones(allTasks.map((x) => x.task), 3).map((entry) => {
    const task = entry.task;
    const due = entry.due;
    const owner = String(taskOwner(task) || "").trim();
    const match = allTasks.find((x) => x.task === task);
    const clientName = match?.clientName || "";
    const projectName = match?.projectName || "";
    const day = due ? String(due.getDate()).padStart(2, "0") : "--";
    const month = due ? String(due.getMonth() + 1).padStart(2, "0") : "--";
    const title = escapeHtml(taskTitle(task));
    const sub = escapeHtml(`${clientName}${projectName ? ` - ${projectName}` : ""}`);
    const delta = due ? Math.max(0, daysDiff(due, today)) : 0;
    const deltaLabel = due ? `Faltam ${delta} dias` : "";
    const ownerLabel = owner ? escapeHtml(owner) : "";
    return `
      <div class="home-side-item">
        <div class="home-side-date">
          <div class="home-side-date-day">${day}</div>
          <div class="home-side-date-month">${month}</div>
        </div>
        <div class="home-side-item-body">
          <div class="home-side-item-title">${sub}</div>
          <div class="home-side-item-desc">${title}</div>
          <div class="home-side-item-meta">${escapeHtml(deltaLabel)}${ownerLabel ? ` · ${ownerLabel}` : ""}</div>
        </div>
      </div>
    `;
  });

  const completed = latestCompletedTasks(allTasks.map((x) => x.task), 3).map((task) => {
    const owner = String(taskOwner(task) || "").trim();
    const initials = escapeHtml(initialsFromName(owner || "T"));
    const match = allTasks.find((x) => x.task === task);
    const clientName = match?.clientName || "";
    const projectName = match?.projectName || "";
    const title = escapeHtml(taskTitle(task));
    const where = escapeHtml(clientName || projectName || "");
    const who = escapeHtml(fmtShort(owner || "Equipe"));
    const whenDt = parseDateSafe(activityDoneDate(task) || task.due || task.start || "");
    const when = whenDt ? escapeHtml(formatDateBR(whenDt)) : "";
    const suffix = when ? ` · ${when}` : "";
    return `
      <div class="home-feed-item">
        <div class="home-feed-avatar">${initials}</div>
        <div class="home-feed-text">
          <div class="home-feed-line"><strong>${who}</strong> concluiu ${title}${where ? ` em <strong>${where}</strong>` : ""}</div>
          <div class="home-feed-sub">${suffix ? suffix.slice(3) : "Atualizado"}</div>
        </div>
      </div>
    `;
  });

  const viewGridActive = view === "grid" ? "active" : "";
  const viewListActive = view === "list" ? "active" : "";
  const safeSearch = escapeHtml(state.home?.search || "");

  return `
    <div class="home-v2">
      <div class="home-v2-top">
        <div class="home-v2-title">
          <h1>Inicio</h1>
          <p>Gestao de portfolio e equipes ativas</p>
        </div>
        <div class="home-v2-actions">
          <div class="home-v2-search">
            <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="M21 21l-4.35-4.35"></path></svg>
            <input type="search" data-home-search="true" placeholder="Pesquisar projetos ou clientes..." value="${safeSearch}" />
          </div>
          <button type="button" class="home-v2-icon-btn" title="Notificacoes" aria-label="Notificacoes">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 7h18s-3 0-3-7"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          </button>
        </div>
      </div>

      <div class="home-v2-kpis">
        <div class="home-kpi">
          <div class="home-kpi-head">
            <div class="home-kpi-label">Clientes ativos</div>
            <div class="home-kpi-icon home-kpi-icon--blue">
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
            </div>
          </div>
          <div class="home-kpi-value">${activeClients}</div>
          <div class="home-kpi-sub">Atualizado hoje</div>
        </div>

        <div class="home-kpi">
          <div class="home-kpi-head">
            <div class="home-kpi-label">Projetos em curso</div>
            <div class="home-kpi-icon home-kpi-icon--indigo">
              <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="14" width="7" height="7" rx="1"></rect><rect x="3" y="14" width="7" height="7" rx="1"></rect></svg>
            </div>
          </div>
          <div class="home-kpi-value">${projectsActive}</div>
          <div class="home-kpi-sub">Atualizado hoje</div>
        </div>

        <div class="home-kpi">
          <div class="home-kpi-head">
            <div class="home-kpi-label">Tarefas prox. 7 dias</div>
            <div class="home-kpi-icon home-kpi-icon--amber">
              <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg>
            </div>
          </div>
          <div class="home-kpi-value">${tasksNext7}</div>
          <div class="home-kpi-sub">Janela de 7 dias</div>
        </div>

        <div class="home-kpi">
          <div class="home-kpi-head">
            <div class="home-kpi-label">Progresso medio</div>
            <div class="home-kpi-icon home-kpi-icon--green">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 6L9 17l-5-5"></path></svg>
            </div>
          </div>
          <div class="home-kpi-value">${avgProgress.toFixed(1)}%</div>
          <div class="home-kpi-sub">Media do portfolio</div>
        </div>
      </div>

      <div class="home-v2-main">
        <section class="home-v2-left">
          <div class="home-section-head">
            <h2>Projetos em Curso</h2>
            <div class="home-view-toggle" role="tablist" aria-label="Visualizacao">
              <button type="button" class="home-view-btn ${viewGridActive}" data-home-view="grid" aria-selected="${view === "grid" ? "true" : "false"}" title="Grade">
                <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="3" width="7" height="7" rx="1"></rect><rect x="14" y="14" width="7" height="7" rx="1"></rect><rect x="3" y="14" width="7" height="7" rx="1"></rect></svg>
              </button>
              <button type="button" class="home-view-btn ${viewListActive}" data-home-view="list" aria-selected="${view === "list" ? "true" : "false"}" title="Lista">
                <svg viewBox="0 0 24 24" aria-hidden="true"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
              </button>
            </div>
          </div>

          <div class="home-project-grid home-project-grid--${view}">
            ${cards.join("")}
            <button type="button" class="home-project-card home-project-card--new" data-home-new-project="true" aria-label="Novo projeto">
              <div class="home-project-new-plus">+</div>
              <div class="home-project-new-text">Novo Projeto</div>
            </button>
          </div>
        </section>

        <aside class="home-v2-right">
          <div class="home-side-card">
            <div class="home-side-head">
              <h3>Proximas Entregas</h3>
            </div>
            <div class="home-side-list">
              ${milestoneEntries.length ? milestoneEntries.join("") : `<div class="home-side-empty">Sem entregas futuras.</div>`}
            </div>
          </div>

          <div class="home-side-card">
            <div class="home-side-head">
              <h3>Movimentacoes</h3>
            </div>
            <div class="home-side-feed">
              ${completed.length ? completed.join("") : `<div class="home-side-empty">Sem movimentacoes recentes.</div>`}
            </div>
          </div>
        </aside>
      </div>
    </div>
  `;
}

function wireHomeV2(container) {
  if (!container || container.__homeV2Wired) return;
  container.__homeV2Wired = true;

  container.addEventListener("input", (e) => {
    const input = e.target && e.target.matches && e.target.matches("[data-home-search]") ? e.target : null;
    if (!input) return;
    state.home.search = input.value || "";
    const pos = typeof input.selectionStart === "number" ? input.selectionStart : null;
    renderHome(container);
    const next = container.querySelector("[data-home-search]");
    if (next) {
      next.focus();
      if (pos != null && typeof next.setSelectionRange === "function") {
        next.setSelectionRange(pos, pos);
      }
    }
  });

  container.addEventListener("click", (e) => {
    const viewBtn = e.target?.closest?.("[data-home-view]");
    if (viewBtn) {
      const view = viewBtn.dataset.homeView;
      state.home.view = view === "list" ? "list" : "grid";
      renderHome(container);
      return;
    }

    const newBtn = e.target?.closest?.("[data-home-new-project]");
    if (newBtn) {
      openProjectModal("new");
      return;
    }

    const openCard = e.target?.closest?.("[data-home-open-project]");
    if (openCard) {
      const clientName = openCard.dataset.clientName || "";
      const projectName = openCard.dataset.projectName || "";
      const client = (state.clients || []).find((c) => (c?.name || "") === clientName) || null;
      const project = client ? (client.projects || []).find((p) => (p?.name || "") === projectName) || null : null;
      if (client && project) {
        openProject(client, project);
      }
    }
  });
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
    if (!data || typeof data !== "object") return false;
    const hasClients = Array.isArray(data.clients);
    const hasEmployees = Array.isArray(data.employees);
    const hasImprovements = Array.isArray(data.improvements);
    if (!hasClients && !hasEmployees && !hasImprovements) return false;
    if (hasClients) state.clients = data.clients;
    if (hasEmployees) state.employees = data.employees;
    if (hasImprovements) state.improvements = data.improvements;
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
      employees: state.employees,
      improvements: state.improvements
    };
    localStorage.setItem(localStorageKeyForUser(), JSON.stringify(payload));
  } catch (err) {
    console.warn("Nao foi possivel salvar dados locais.", err);
  }
}

function createImprovementId() {
  const ts = Date.now().toString(36);
  const rnd = Math.random().toString(36).slice(2, 8);
  return `imp_${ts}_${rnd}`;
}

function ensureFirebaseApp() {
  if (!firebase.apps?.length) {
    firebase.initializeApp(firebaseConfig);
  }
}

function getFirebaseFunctions() {
  ensureFirebaseApp();
  return firebase.functions();
}

function openInviteUserModal() {
  let overlay = byId("invite-user-overlay");
  if (overlay) overlay.remove();
  overlay = document.createElement("div");
  overlay.id = "invite-user-overlay";
  overlay.style.cssText = "position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;background:rgba(0,0,0,0.45);";
  overlay.innerHTML = `
    <div class="config-card" style="width:100%;max-width:440px;padding:24px;border-radius:16px;box-shadow:0 8px 32px rgba(0,0,0,0.18);position:relative;">
      <button type="button" class="icon-btn" data-invite-close style="position:absolute;top:12px;right:12px;font-size:18px;">&times;</button>
      <h3 style="margin:0 0 4px;font-size:16px;font-weight:800;">Convidar usuario</h3>
      <p style="margin:0 0 16px;font-size:12px;color:var(--muted);">O usuario recebera um e-mail para definir a senha.</p>
      <form id="invite-user-form" class="form" style="display:grid;gap:12px;">
        <label>
          E-mail <span style="color:#ef4444;">*</span>
          <input id="invite-email" type="email" required placeholder="usuario@empresa.com" class="config-input">
        </label>
        <label>
          Nome
          <input id="invite-name" type="text" placeholder="Nome do usuario (opcional)" class="config-input">
        </label>
        <label>
          Perfil
          <select id="invite-role" class="config-input">
            <option value="viewer">Visualizador</option>
            <option value="manager">Gestor de Projetos</option>
            <option value="admin">Administrador</option>
          </select>
        </label>
        <p id="invite-status" style="margin:0;font-size:12px;min-height:18px;"></p>
        <div style="display:flex;gap:8px;justify-content:flex-end;">
          <button type="button" class="btn sm ghost" data-invite-close>Cancelar</button>
          <button type="submit" class="btn sm primary" id="invite-submit-btn">Convidar</button>
        </div>
      </form>
    </div>
  `;
  document.body.appendChild(overlay);

  overlay.querySelectorAll("[data-invite-close]").forEach((btn) => {
    btn.addEventListener("click", () => overlay.remove());
  });
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) overlay.remove();
  });

  const form = byId("invite-user-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const emailInput = byId("invite-email");
    const nameInput = byId("invite-name");
    const roleSelect = byId("invite-role");
    const statusEl = byId("invite-status");
    const submitBtn = byId("invite-submit-btn");

    const email = emailInput?.value.trim() || "";
    const displayName = nameInput?.value.trim() || "";
    const role = roleSelect?.value || "viewer";

    if (!email) {
      statusEl.textContent = "Informe o e-mail.";
      statusEl.style.color = "#ef4444";
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Criando...";
    statusEl.textContent = "";

    try {
      const fn = getFirebaseFunctions();
      const createUser = fn.httpsCallable("createUserByAdmin");
      const result = await createUser({ email, displayName, role });
      statusEl.textContent = result.data.message || "Usuario criado com sucesso!";
      statusEl.style.color = "#16a34a";
      submitBtn.textContent = "Convidar";
      submitBtn.disabled = false;
      emailInput.value = "";
      nameInput.value = "";
      await loadAdminUsers();
    } catch (err) {
      console.error(err);
      const msg = err?.message || "Erro ao criar usuario.";
      statusEl.textContent = msg.replace("Firebase: ", "").replace(/\(.*\)/, "").trim();
      statusEl.style.color = "#ef4444";
      submitBtn.textContent = "Convidar";
      submitBtn.disabled = false;
    }
  });

  byId("invite-email")?.focus();
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

function mapClientData(clientId, clientData) {
  const projectsData = clientData.projects || {};
  const projects = Object.entries(projectsData).map(([projectId, projData]) => {
    const tasksData = projData.tasks || {};
    const tasks = Object.entries(tasksData).map(([taskId, taskData]) => ({
      id: taskId,
      ...taskData
    }));
      const progress = computeProgress(tasks);
      const epics = Array.isArray(projData.epics) ? projData.epics : [];
      const packages = Array.isArray(projData.packages) ? projData.packages : [];
      const packageParents = normalizePackageParentsMap(projData.packageParents || projData.package_parents || {});
      const financials = Array.isArray(projData.financials) ? projData.financials : [];
      return {
        id: projectId,
        clientId,
        ...projData,
        progress,
        epics,
        packages,
        packageParents,
        financials,
        tasks
      };
  });
  const squads = Array.isArray(clientData.squads) ? clientData.squads : [];
  return { id: clientId, ...clientData, squads, projects };
}

  async function loadStateFromDb(keepSelection = null) {
    if (!db) return false;
    const role = normalizeUserRole(state.currentUserRole);
    const clientsPath = clientDataRootPath();
    let snapshot = null;
    try {
      if (role === "admin") {
        snapshot = await db.ref(clientsPath).once("value");
      } else if (role === "user") {
        if (!clientsPath) return false;
        snapshot = await db.ref(clientsPath).once("value");
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
    let clientsData = snapshot ? snapshot.val() || {} : {};
    let effectivePath = clientsPath || "clients";
    if (Object.keys(clientsData).length === 0) {
      const pathsToTry = clientsPath === "clients"
        ? ["workspaces/default/clients"]
        : ["clients"];
      for (const altPath of pathsToTry) {
        try {
          const legacySnap = await db.ref(altPath).once("value");
          const altData = legacySnap.val() || {};
          if (Object.keys(altData).length > 0) {
            clientsData = altData;
            effectivePath = altPath;
            state.effectiveClientsPath = altPath;
            state.effectiveGroupsPath = altPath.replace("/clients", "/groups");
            break;
          }
        } catch (_) {}
      }
      if (Object.keys(clientsData).length === 0 && auth?.currentUser?.uid) {
        try {
          const wsSnap = await db.ref(`users/${auth.currentUser.uid}/workspaces`).once("value");
          const wsIds = Object.keys(wsSnap.val() || {});
          for (const wsId of wsIds) {
            const wsSnap2 = await db.ref(`workspaces/${wsId}/clients`).once("value");
            const wsData = wsSnap2.val() || {};
            if (Object.keys(wsData).length > 0) {
              clientsData = wsData;
              effectivePath = `workspaces/${wsId}/clients`;
              state.effectiveClientsPath = effectivePath;
              state.effectiveGroupsPath = `workspaces/${wsId}/groups`;
              break;
            }
          }
        } catch (_) {}
      }
    }
    if (Object.keys(clientsData).length > 0 && !state.effectiveClientsPath) {
      state.effectiveClientsPath = effectivePath;
      state.effectiveGroupsPath = effectivePath.replace("/clients", "/groups");
    }
    if (role === "admin") {
      clients = Object.entries(clientsData).map(([clientId, clientData]) => mapClientData(clientId, clientData));
      state.dbAccessDenied = false;
    } else if (role === "user") {
      clients = Object.entries(clientsData).map(([clientId, clientData]) => mapClientData(clientId, clientData));
      state.dbAccessDenied = false;
      state.groups = [];
    } else {
      const groups = await loadGroupsFromDb();
      state.groups = groups.slice();
      const uid = auth?.currentUser?.uid;
      const allowedGroups = uid ? groups.filter((group) => group.members?.[uid]) : [];
    const clientIds = new Set();
    allowedGroups.forEach((group) => {
      Object.keys(group.clients || {}).forEach((clientId) => clientIds.add(clientId));
    });
      const clientsBase = clientDataRootPath();
      const clientPromises = Array.from(clientIds).map(async (clientId) => {
        try {
          const snap = await db.ref(clientsBase ? `${clientsBase}/${clientId}` : `clients/${clientId}`).once("value");
          const clientData = snap.val();
          if (!clientData) return null;
          return mapClientData(clientId, clientData);
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
  // Keep localStorage in sync so OnePage (standalone or early-render) sees the latest edits.
  saveLocalState();
  return true;
}

async function syncUserProfile(user) {
  if (!db || !user?.uid) return;
  const profileRef = db.ref(`users/${user.uid}`);
  const snapshot = await profileRef.once("value");
  const existing = snapshot.val() || {};
  const adminByEmail = isAdminUser(user);
  const adminByClaims = await isAdminFromClaims(user);
  const admin = adminByEmail || adminByClaims;
  const role = normalizeUserRole(admin ? "admin" : (existing.role || "viewer"));
  const payload = {
    uid: user.uid,
    email: user.email || "",
    displayName: user.displayName || "",
    role,
    isAdmin: admin,
    lastLoginAt: firebase.database.ServerValue.TIMESTAMP
  };
  if (!snapshot.exists()) {
    payload.createdAt = firebase.database.ServerValue.TIMESTAMP;
  }
  await profileRef.update(payload);
}

async function loadUsersFromDb() {
  if (!db) return [];
  try {
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
  } catch (err) {
    const code = String(err?.code || "");
    if (code === "PERMISSION_DENIED") {
      state.usersLoadDenied = true;
      return [];
    }
    throw err;
  }
}

async function loadGroupsFromDb() {
  if (!db) return [];
  const groupsPath = environmentGroupsPath();
  try {
    let snapshot = await db.ref(groupsPath).once("value");
    let raw = snapshot.val() || {};
    if (Object.keys(raw).length === 0) {
      try {
        const altPath = groupsPath === "workspaces/default/groups" ? "groups" : "workspaces/default/groups";
        const legacySnap = await db.ref(altPath).once("value");
        const altData = legacySnap.val() || {};
        if (Object.keys(altData).length > 0) raw = altData;
      } catch (_) {}
    }
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

async function removeUserFromGroups(uid) {
  if (!db || !uid) return;
  const groupsPath = environmentGroupsPath();
  const snapshot = await db.ref(groupsPath).once("value");
  const groups = snapshot.val() || {};
  const updates = {};
  Object.entries(groups).forEach(([groupId, data]) => {
    if (data?.members?.[uid]) {
      updates[`${groupsPath}/${groupId}/members/${uid}`] = null;
    }
  });
  if (Object.keys(updates).length) {
    await db.ref().update(updates);
  }
}

async function deleteUserFromDb(uid) {
  if (!db || !uid) return;
  await db.ref(`users/${uid}`).remove();
  await removeUserFromGroups(uid);
}

async function sendPasswordReset(email) {
  if (!auth) throw new Error("Auth indisponivel.");
  if (!email) throw new Error("E-mail invalido.");
  await auth.sendPasswordResetEmail(email);
}

async function createGroupInDb(name) {
  if (!db) return null;
  const groupsPath = environmentGroupsPath();
  const groupRef = db.ref(groupsPath).push();
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
  const groupsPath = environmentGroupsPath();
  await db.ref(`${groupsPath}/${groupId}`).update({
    name: name || "Grupo",
    updatedAt: firebase.database.ServerValue.TIMESTAMP
  });
}

async function updateGroupMemberInDb(groupId, uid, enabled) {
  if (!db || !groupId || !uid) return;
  const groupsPath = environmentGroupsPath();
  const ref = db.ref(`${groupsPath}/${groupId}/members/${uid}`);
  if (enabled) {
    await ref.set(true);
  } else {
    await ref.remove();
  }
}

async function assignClientToGroup(clientId, groupId) {
  if (!db || !clientId || !groupId) return;
  const groupsPath = environmentGroupsPath();
  const clientsPath = clientDataRootPath();
  const updates = {
    [`${groupsPath}/${groupId}/clients/${clientId}`]: true
  };
  (state.groups || []).forEach((group) => {
    if (group.id !== groupId && group.clients?.[clientId]) {
      updates[`${groupsPath}/${group.id}/clients/${clientId}`] = null;
    }
  });
  updates[`${clientsPath}/${clientId}/groupId`] = groupId;
  await db.ref().update(updates);
}

async function removeClientFromGroup(clientId, groupId) {
  if (!db || !clientId || !groupId) return;
  const groupsPath = environmentGroupsPath();
  const clientsPath = clientDataRootPath();
  const updates = {
    [`${groupsPath}/${groupId}/clients/${clientId}`]: null,
    [`${clientsPath}/${clientId}/groupId`]: null
  };
  await db.ref().update(updates);
}

async function deleteGroupFromDb(groupId) {
  if (!db || !groupId) return;
  const group = (state.groups || []).find((item) => item.id === groupId);
  const groupsPath = environmentGroupsPath();
  const clientsPath = clientDataRootPath();
  const updates = {};
  if (group?.clients) {
    Object.keys(group.clients).forEach((clientId) => {
      updates[`${clientsPath}/${clientId}/groupId`] = null;
    });
  }
  updates[`${groupsPath}/${groupId}`] = null;
  await db.ref().update(updates);
}

async function initApp() {
  loadHomeContext();
  wireOnePageMessages();
  // Load local-only data (employees/improvements) even when Firebase is available.
  loadLocalState();
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
  setupProjectTaskSearch();
  setupStatusPopover();
  setupProgressPopover();
  setupTaskActions();
  setupMembersPicker();
  setupTaskDragAndDrop();
  setupDashboardFilters();
}

let onepageMessagesWired = false;
function wireOnePageMessages() {
  if (onepageMessagesWired) return;
  onepageMessagesWired = true;
  window.addEventListener("message", (ev) => {
    const data = ev?.data;
    if (!data || typeof data !== "object") return;
    if (data.type === "export-onepage-pdf") {
      exportProjectReportPdf();
    }
  });
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
  setCrumbPathText("Melhorias");
  const improvements = Array.isArray(state.improvements) ? state.improvements : [];
  if (!state.improvementsUi) state.improvementsUi = {};
  if (state.improvementsUi.query == null) state.improvementsUi.query = "";
  if (state.improvementsUi.client == null) state.improvementsUi.client = "";
  if (state.improvementsUi.stage == null) state.improvementsUi.stage = "";
  if (state.improvementsUi.startFrom == null) state.improvementsUi.startFrom = "";
  if (state.improvementsUi.startTo == null) state.improvementsUi.startTo = "";
  if (state.improvementsUi.endFrom == null) state.improvementsUi.endFrom = "";
  if (state.improvementsUi.endTo == null) state.improvementsUi.endTo = "";
  if (state.improvementsUi.filtersOpen == null) state.improvementsUi.filtersOpen = false;

  const ui = state.improvementsUi;
  const query = String(ui.query || "");
  const q = query.trim().toLowerCase();
  const clientFilter = String(ui.client || "").trim().toLowerCase();
  const stageFilter = String(ui.stage || "").trim();
  const stageFilterNorm = stageFilter ? normalizeImprovementStage(stageFilter) : "";
  const startFrom = parseTaskDate(String(ui.startFrom || "").trim());
  const startTo = parseTaskDate(String(ui.startTo || "").trim());
  const endFrom = parseTaskDate(String(ui.endFrom || "").trim());
  const endTo = parseTaskDate(String(ui.endTo || "").trim());

  const filtersActive =
    !!clientFilter ||
    !!stageFilterNorm ||
    !!startFrom ||
    !!startTo ||
    !!endFrom ||
    !!endTo;

  const matches = (item) => {
    const hay = `${item?.name || ""} ${item?.client || ""} ${item?.executor || ""} ${item?.owner || ""}`.toLowerCase();
    if (q && !hay.includes(q)) return false;

    if (clientFilter) {
      const c = String(item?.client || "").trim().toLowerCase();
      if (!c || c !== clientFilter) return false;
    }

    const itStage = normalizeImprovementStage(item?.stage || item?.status);
    if (stageFilterNorm && itStage !== stageFilterNorm) return false;

    if (startFrom || startTo) {
      const dt = parseTaskDate(item?.start);
      if (!dt) return false;
      if (startFrom && dt.getTime() < startFrom.getTime()) return false;
      if (startTo && dt.getTime() > startTo.getTime()) return false;
    }

    if (endFrom || endTo) {
      const dt = parseTaskDate(item?.end);
      if (!dt) return false;
      if (endFrom && dt.getTime() < endFrom.getTime()) return false;
      if (endTo && dt.getTime() > endTo.getTime()) return false;
    }

    return true;
  };

  const filtered = improvements.filter(matches);
  const countByStage = (stageId) => filtered.filter((it) => normalizeImprovementStage(it?.stage || it?.status) === stageId).length;
  const total = filtered.length;
  const triagem = countByStage("triagem");
  const emExecucao = filtered.filter((it) => ["analise_tecnica", "implementacao", "validacao"].includes(normalizeImprovementStage(it?.stage || it?.status))).length;
  const concluido = countByStage("concluido");

  const taxaConclusao = total > 0 ? Math.round((concluido / total) * 100) : 0;
  const sucessoMensalVal = total > 0 ? `${taxaConclusao}%` : "-";

  const kpis = [
    { label: "Backlog Ativo", value: total, icon: "history", color: "blue" },
    { label: "Em Triagem", value: triagem, icon: "clock", color: "amber" },
    { label: "Em Execucao", value: emExecucao, icon: "activity", color: "emerald" },
    { label: "Concluidos", value: concluido, icon: "check-circle-2", color: "indigo" },
    { label: "Sucesso Mensal", value: sucessoMensalVal, icon: "activity", color: "dark" }
  ];

  const clientOptions = Array.from(
    new Set(
      filtered
        .map((it) => String(it?.client || "").trim())
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b))
    )
  );

  const stageColumns = IMPROVEMENT_STAGES.map((st) => {
    const items = filtered
      .filter((it) => normalizeImprovementStage(it?.stage || it?.status) === st.id)
      .sort((a, b) => String(b?.id || "").localeCompare(String(a?.id || "")));

    const cards = items
      .map((it) => {
        const info = improvementStageInfo(it);
        const stageId = normalizeImprovementStage(it?.stage || it?.status || st.id);
        const idLabel = escapeHtml(improvementDisplayId(it));
        const title = escapeHtml(it?.name || "(Sem titulo)");
        const company = escapeHtml(it?.client || "-");
        const exec = String(it?.executor || it?.owner || "").trim();
        const initials = escapeHtml(initialsFromName(exec || ""));
        const pct = info?.progress ?? 0;
        const showProgress = pct > 0 && stageId !== "triagem";
        const tags = Array.isArray(it?.tags) ? it.tags : [];
        const comments = typeof it?.comments === "number" ? it.comments : 0;
        const attachments = typeof it?.attachments === "number" ? it.attachments : 0;
        const endDate = it?.end || it?.dueDate || it?.due;
        const dueLabel = endDate ? formatDateBR(endDate) : "";
        const isEmExecucao = stageId === "implementacao" || stageId === "validacao";
        const tagsHtml =
          tags.length > 0
            ? tags
                .map((tag) => `<span class="impr-card-tag">${escapeHtml(String(tag))}</span>`)
                .join("")
            : "";
        return `
          <button type="button" class="impr-card impr-card--stage-${escapeHtml(stageId)}" data-improvement-card="${escapeHtml(String(it.id || ""))}">
            <div class="impr-card-head">
              <span class="impr-card-id">${idLabel}</span>
              <div class="impr-card-head-right">
                ${isEmExecucao ? '<span class="impr-card-zap" aria-hidden="true"><i data-lucide="zap"></i></span>' : ""}
                <button type="button" class="impr-card-menu" data-improvement-card-menu="${escapeHtml(String(it.id || ""))}" onclick="event.stopPropagation()" aria-label="Menu"><i data-lucide="more-vertical"></i></button>
              </div>
            </div>
            <div class="impr-card-body">
              <h3 class="impr-card-title">${title}</h3>
              <p class="impr-card-company">${company}</p>
            </div>
            ${tagsHtml ? `<div class="impr-card-tags">${tagsHtml}</div>` : ""}
            ${showProgress ? `
            <div class="impr-card-progress-wrap">
              <div class="impr-card-progress-head">
                <span class="impr-card-progress-label">Progresso</span>
                <span class="impr-card-progress-pct">${pct}%</span>
              </div>
              <div class="impr-card-progress-bar"><i style="width:${Math.min(100, Math.max(0, pct))}%"></i></div>
            </div>
            ` : ""}
            <div class="impr-card-foot">
              <div class="impr-card-meta">
                <span class="impr-card-meta-item"><i data-lucide="message-square"></i>${comments}</span>
                <span class="impr-card-meta-item"><i data-lucide="paperclip"></i>${attachments}</span>
                ${dueLabel ? `<span class="impr-card-meta-item"><i data-lucide="clock"></i>${escapeHtml(dueLabel)}</span>` : ""}
              </div>
              <div class="impr-card-avatar-wrap">
                ${exec ? `<span class="impr-card-avatar">${initials}</span>` : '<span class="impr-card-avatar impr-card-avatar--empty"><i data-lucide="user"></i></span>'}
              </div>
            </div>
          </button>
        `;
      })
      .join("");

    return `
      <section class="impr-col" data-improvement-stage="${escapeHtml(st.id)}">
        <div class="impr-col-head">
          <div class="impr-col-left">
            <span class="impr-col-dot ${st.id === "concluido" ? "ok" : ""}"></span>
            <span class="impr-col-title">${escapeHtml(st.label)}</span>
            <span class="impr-count">${items.length}</span>
          </div>
        </div>
        <div class="impr-col-body">
          ${cards}
          <button type="button" class="impr-add-item" data-improvement-add-stage="${escapeHtml(st.id)}">
            <i data-lucide="plus"></i>
            <span>Adicionar Item</span>
          </button>
        </div>
      </section>
    `;
  });

  container.innerHTML = `
    <div class="impr-page span-all">
      <div class="impr-top">
        <div class="impr-top-left">
          <h1>Melhorias</h1>
          <p>Gestao de melhorias pos-entrega e backlog de valor</p>
        </div>
      </div>

      <div class="impr-kpis">
        ${kpis
          .map(
            (k) => `
              <div class="impr-kpi impr-kpi--${escapeHtml(k.color || "emerald")}">
                <div class="impr-kpi-meta">
                  ${k.trend ? `<span class="impr-kpi-trend">${escapeHtml(k.trend)}</span>` : ""}
                  <div class="impr-kpi-label">${escapeHtml(k.label)}</div>
                  <div class="impr-kpi-value">${escapeHtml(String(k.value))}</div>
                </div>
                <div class="impr-kpi-ico"><i data-lucide="${escapeHtml(k.icon)}"></i></div>
              </div>
            `
          )
          .join("")}
      </div>

      <div class="impr-filter-bar">
        <div class="impr-search">
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="M21 21l-4.35-4.35"></path></svg>
          <input type="search" data-improvement-search placeholder="Pesquisar melhorias..." value="${escapeHtml(query)}">
        </div>
        <div class="impr-filter-bar-right">
          <div class="impr-filter-wrap" data-improvement-filter-wrap>
            <button type="button" class="btn ghost impr-filter-btn ${filtersActive ? "active" : ""}" data-improvement-filter-btn>
              <i data-lucide="filter"></i>
              <span>Filtros</span>
              ${filtersActive ? `<span class="impr-filter-dot" aria-hidden="true"></span>` : ""}
            </button>
            <div class="impr-filter-pop ${ui.filtersOpen ? "show" : ""}" data-improvement-filter-pop>
              <div class="impr-filter-head">
                <div class="impr-filter-title">Filtros</div>
                <button type="button" class="icon-btn" data-improvement-filter-close aria-label="Fechar">&times;</button>
              </div>

              <div class="impr-filter-grid">
                <label class="impr-filter-field">
                  Cliente
                  <select data-improvement-filter-client>
                    <option value="">Todos</option>
                    ${clientOptions.map((c) => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join("")}
                  </select>
                </label>

                <label class="impr-filter-field">
                  Etapa
                  <select data-improvement-filter-stage>
                    <option value="">Todas</option>
                    ${IMPROVEMENT_STAGES.map((s) => `<option value="${escapeHtml(s.id)}">${escapeHtml(s.label)}</option>`).join("")}
                  </select>
                </label>

                <div class="impr-filter-row">
                  <div class="impr-filter-rowlabel">Data inicio</div>
                  <div class="impr-filter-rowinputs">
                    <input type="date" data-improvement-filter-start-from>
                    <input type="date" data-improvement-filter-start-to>
                  </div>
                </div>

                <div class="impr-filter-row">
                  <div class="impr-filter-rowlabel">Prazo</div>
                  <div class="impr-filter-rowinputs">
                    <input type="date" data-improvement-filter-end-from>
                    <input type="date" data-improvement-filter-end-to>
                  </div>
                </div>
              </div>

              <div class="impr-filter-actions">
                <button type="button" class="btn ghost" data-improvement-filter-clear>Limpar</button>
                <button type="button" class="btn" data-improvement-filter-apply>Aplicar</button>
              </div>
            </div>
          </div>
          <button type="button" class="btn ghost impr-report-btn" data-improvement-report>Gerar Relat\u00f3rio</button>
          <button type="button" class="btn primary impr-new-btn" data-improvement-new>+ Nova Melhoria</button>
        </div>
      </div>

      <div class="impr-board">
        ${stageColumns.join("")}
      </div>
    </div>
  `;

  const input = container.querySelector("[data-improvement-search]");
  if (input && !input.dataset.wired) {
    input.addEventListener("input", () => {
      state.improvementsUi.query = input.value || "";
      renderImprovementsDashboard(container);
    });
    input.dataset.wired = "true";
  }

  const filterBtn = container.querySelector("[data-improvement-filter-btn]");
  if (filterBtn && !filterBtn.dataset.wired) {
    filterBtn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      state.improvementsUi.filtersOpen = !state.improvementsUi.filtersOpen;
      renderImprovementsDashboard(container);
    });
    filterBtn.dataset.wired = "true";
  }

  const filterPop = container.querySelector("[data-improvement-filter-pop]");
  const filterWrap = container.querySelector("[data-improvement-filter-wrap]");
  if (filterPop && filterWrap) {
    const selClient = filterPop.querySelector("[data-improvement-filter-client]");
    const selStage = filterPop.querySelector("[data-improvement-filter-stage]");
    const inStartFrom = filterPop.querySelector("[data-improvement-filter-start-from]");
    const inStartTo = filterPop.querySelector("[data-improvement-filter-start-to]");
    const inEndFrom = filterPop.querySelector("[data-improvement-filter-end-from]");
    const inEndTo = filterPop.querySelector("[data-improvement-filter-end-to]");
    const btnClear = filterPop.querySelector("[data-improvement-filter-clear]");
    const btnApply = filterPop.querySelector("[data-improvement-filter-apply]");
    const btnClose = filterPop.querySelector("[data-improvement-filter-close]");

    if (selClient) selClient.value = String(ui.client || "");
    if (selStage) selStage.value = String(stageFilterNorm || "");
    if (inStartFrom) inStartFrom.value = String(ui.startFrom || "");
    if (inStartTo) inStartTo.value = String(ui.startTo || "");
    if (inEndFrom) inEndFrom.value = String(ui.endFrom || "");
    if (inEndTo) inEndTo.value = String(ui.endTo || "");

    const applyFilters = (keepOpen = true) => {
      if (selClient) state.improvementsUi.client = String(selClient.value || "");
      if (selStage) state.improvementsUi.stage = String(selStage.value || "");
      if (inStartFrom) state.improvementsUi.startFrom = String(inStartFrom.value || "");
      if (inStartTo) state.improvementsUi.startTo = String(inStartTo.value || "");
      if (inEndFrom) state.improvementsUi.endFrom = String(inEndFrom.value || "");
      if (inEndTo) state.improvementsUi.endTo = String(inEndTo.value || "");
      state.improvementsUi.filtersOpen = keepOpen;
      renderImprovementsDashboard(container);
    };

    // Apply filters immediately on change; keep popover open.
    [selClient, selStage, inStartFrom, inStartTo, inEndFrom, inEndTo].forEach((el) => {
      if (!el || el.dataset.wired) return;
      el.addEventListener("change", () => applyFilters(true));
      el.dataset.wired = "true";
    });

    if (btnClear && !btnClear.dataset.wired) {
      btnClear.addEventListener("click", () => {
        state.improvementsUi.client = "";
        state.improvementsUi.stage = "";
        state.improvementsUi.startFrom = "";
        state.improvementsUi.startTo = "";
        state.improvementsUi.endFrom = "";
        state.improvementsUi.endTo = "";
        state.improvementsUi.filtersOpen = true;
        renderImprovementsDashboard(container);
      });
      btnClear.dataset.wired = "true";
    }

    if (btnApply && !btnApply.dataset.wired) {
      btnApply.addEventListener("click", () => applyFilters(false));
      btnApply.dataset.wired = "true";
    }

    if (btnClose && !btnClose.dataset.wired) {
      btnClose.addEventListener("click", () => {
        state.improvementsUi.filtersOpen = false;
        renderImprovementsDashboard(container);
      });
      btnClose.dataset.wired = "true";
    }

    if (!document.body.dataset.imprFiltersWired) {
      document.body.addEventListener("click", (e) => {
        if (!state.improvementsUi?.filtersOpen) return;
        const wrap = document.querySelector("[data-improvement-filter-wrap]");
        if (wrap && wrap.contains(e.target)) return;
        state.improvementsUi.filtersOpen = false;
        const panels = byId("dashboard-panels");
        if (panels && state.currentSection === "dashboard-melhorias") {
          renderImprovementsDashboard(panels);
        }
      });
      document.body.dataset.imprFiltersWired = "true";
    }
  }

  const newBtn = container.querySelector("[data-improvement-new]");
  if (newBtn && !newBtn.dataset.wired) {
    newBtn.addEventListener("click", () => openImprovementModal(null));
    newBtn.dataset.wired = "true";
  }

  const reportBtn = container.querySelector("[data-improvement-report]");
  if (reportBtn && !reportBtn.dataset.wired) {
    reportBtn.addEventListener("click", () => openImprovementsReportModal());
    reportBtn.dataset.wired = "true";
  }

  container.querySelectorAll("[data-improvement-add-stage]").forEach((btn) => {
    if (btn.dataset.wired) return;
    btn.dataset.wired = "true";
    const stageId = btn.dataset.improvementAddStage || "triagem";
    btn.addEventListener("click", () => {
      state.improvementNewStage = stageId;
      openImprovementModal(null);
    });
  });

  container.querySelectorAll("[data-improvement-card]").forEach((btn) => {
    // Enable drag between stages (Kanban).
    btn.setAttribute("draggable", "true");

    btn.addEventListener("dragstart", (e) => {
      const id = btn.dataset.improvementCard || "";
      if (!id) return;
      state.improvementsDrag = { id, startedAt: Date.now() };
      // Dragging a card often triggers a click event afterwards; suppress it briefly.
      state.improvementsSuppressClickUntil = Date.now() + 400;
      btn.classList.add("is-dragging");
      try {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", id);
      } catch (_) {
        // ignore
      }
    });

    btn.addEventListener("dragend", () => {
      btn.classList.remove("is-dragging");
      const id = btn.dataset.improvementCard || "";
      state.improvementsDragLast = id ? { id, endedAt: Date.now() } : null;
      state.improvementsSuppressClickUntil = Date.now() + 400;
      state.improvementsDrag = null;
    });

    btn.addEventListener("click", () => {
      // Ignore accidental click right after a drag operation.
      if (Date.now() < Number(state.improvementsSuppressClickUntil || 0)) return;
      const id = btn.dataset.improvementCard;
      const last = state.improvementsDragLast;
      if (last && String(last.id || "") === String(id || "") && Date.now() - Number(last.endedAt || 0) < 500) return;
      const improvement = (state.improvements || []).find((x) => String(x?.id || "") === String(id || "")) || null;
      if (improvement) openImprovementModal(improvement.id);
    });
  });

  container.querySelectorAll("[data-improvement-stage]").forEach((col) => {
    col.addEventListener("dragover", (e) => {
      e.preventDefault();
      col.classList.add("is-drop-target");
      try {
        e.dataTransfer.dropEffect = "move";
      } catch (_) {
        // ignore
      }
    });

    col.addEventListener("dragleave", () => {
      col.classList.remove("is-drop-target");
    });

    col.addEventListener("drop", (e) => {
      e.preventDefault();
      col.classList.remove("is-drop-target");

      const stageId = col.dataset.improvementStage || "triagem";
      const nextStage = normalizeImprovementStage(stageId);

      let id = "";
      try {
        id = String(e.dataTransfer.getData("text/plain") || "");
      } catch (_) {
        id = "";
      }
      if (!id && state.improvementsDrag?.id) id = state.improvementsDrag.id;
      if (!id) return;

      const improvement = (state.improvements || []).find((x) => String(x?.id || "") === String(id || "")) || null;
      if (!improvement) return;

      const currentStage = normalizeImprovementStage(improvement?.stage || improvement?.status || "triagem");
      if (improvementStageRank(nextStage) > improvementStageRank(currentStage)) {
        const notes = improvement?.stageNotes || improvement?.stageDetails || {};
        const missingNoteStage = firstMissingStageNote(notes, nextStage);
        if (missingNoteStage) {
          alert(`Para mover para ${stageLabelById(nextStage)}, descreva o que foi feito em ${stageLabelById(missingNoteStage)}.`);
          state.improvementsModalFocus = { kind: "note", stageId: missingNoteStage };
          openImprovementModal(improvement.id);
          return;
        }
        if (nextStage === "concluido" && !hasClientApproval(improvement?.clientApproval)) {
          alert("Para mover para Concluido, anexe o 'de acordo do cliente' na etapa de Validacao.");
          state.improvementsModalFocus = { kind: "approval" };
          openImprovementModal(improvement.id);
          return;
        }
      }

      if (improvementRequiresEstimate(nextStage)) {
        const missingEstimate = improvement.estimateHours == null;
        const missingExecutor = !String(improvement.executor || "").trim();
        if (missingEstimate || missingExecutor) {
          alert("Para mover para Implementacao, informe Estimativa (horas) e Executor.");
          openImprovementModal(improvement.id);
          return;
        }
      }

      const prevStage = normalizeImprovementStage(improvement?.stage || improvement?.status || "triagem");
      improvement.stage = nextStage;
      improvement.maxStage = computeMaxStageId(getImprovementMaxStageId(improvement), nextStage);
      improvement.progress = improvementStageInfo({ stage: nextStage }).progress;
      if (prevStage !== nextStage) {
        appendImprovementLog(
          improvement,
          `Alterou etapa: ${stageLabelById(prevStage)} -> ${stageLabelById(nextStage)}.`
        );
      }
      saveLocalState();
      renderImprovementsDashboard(container);
    });
  });

  if (window.lucide) window.lucide.createIcons();
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

  const stageInfo = improvementStageInfo(improvement);
  const scheduleBadge = scheduleStatusInfo(improvementScheduleStatus(improvement));
  const progress = clampPct(stageInfo.progress);
  const originLabel = improvementOriginLabel(improvement.origin);
  const estimateLabel = improvement.estimateHours == null ? "-" : `${String(improvement.estimateHours)}h`;

  const headerCard = document.createElement("div");
  headerCard.className = "card project-header span-all";
  headerCard.innerHTML = `
    <div class="project-header-top">
      <div>
        <h2>${escapeHtml(improvement.name)}</h2>
        <div class="project-subtitle">${escapeHtml(improvement.client || "Cliente")}</div>
      </div>
      <div class="project-header-badges">
        <span class="pill project-status planejado">${escapeHtml(stageInfo.label)}</span>
        <span class="pill schedule-status ${scheduleBadge.className}">${scheduleBadge.label}</span>
      </div>
    </div>
    <div class="project-meta-grid">
      <div class="meta-item">
        <div class="label">Cliente</div>
        <div class="value">${escapeHtml(improvement.client || "-")}</div>
      </div>
      <div class="meta-item">
        <div class="label">Origem</div>
        <div class="value">${escapeHtml(originLabel)}</div>
      </div>
      <div class="meta-item">
        <div class="label">Responsavel</div>
        <div class="value">${escapeHtml(improvement.owner || "A definir")}</div>
      </div>
      <div class="meta-item">
        <div class="label">Executor</div>
        <div class="value">${escapeHtml(improvement.executor || "-")}</div>
      </div>
      <div class="meta-item">
        <div class="label">Resp. estimativa</div>
        <div class="value">${escapeHtml(improvement.estimator || "-")}</div>
      </div>
      <div class="meta-item">
        <div class="label">Estimativa</div>
        <div class="value">${escapeHtml(estimateLabel)}</div>
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

  container.appendChild(headerCard);
}

function setActiveNav(section) {
  const navSection =
    section === "dashboard-melhorias" || section === "minhas-melhorias" ? "melhorias" : section;
  document.querySelectorAll(".nav-link").forEach((el) => el.classList.remove("active"));
  const active = document.querySelector(`.nav-link[data-section="${navSection}"]`);
  if (active) active.classList.add("active");
  if (navSection === "meus-projetos") {
    ensureProjectsNavOpen();
  }
}

function ensureProjectsNavOpen() {
  const link = document.querySelector('.nav-link[data-section="meus-projetos"]');
  if (link) link.classList.add("open");
}

// Improvements do not have a collapsible sub-nav.

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
  const openImprovementBtn = byId("open-improvement-modal");
  const isHome = state.currentSection === "inicio";
  const isConfig = state.currentSection === "config";
  const isDevBoard = state.currentSection === "dev-board";
  const isProject = state.currentSection === "meus-projetos";
  const isBoard = state.currentSection === "board";
  const isImprovements = state.currentSection === "dashboard-melhorias" || state.currentSection === "minhas-melhorias";
  if (openProjectBtn) openProjectBtn.classList.toggle("hidden", isHome || isConfig || isDevBoard || isBoard);
  if (openEmployeeBtn) openEmployeeBtn.classList.toggle("hidden", isHome || isConfig || isDevBoard || isBoard);
  if (editProjectBtn) editProjectBtn.classList.toggle("hidden", !isProject);
  if (openGanttBtn) {
    openGanttBtn.classList.toggle("hidden", isDevBoard);
    openGanttBtn.disabled = !state.selectedProject;
  }
  // Improvements use the in-page button (next to the search input).
  if (openImprovementBtn) openImprovementBtn.classList.add("hidden");
}

function renderHome(container) {
  setCrumbPathText("Inicio");
  container.innerHTML = renderHomeMacroSummary();
  wireHomeV2(container);
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
  // Cache-bust onepage.html to avoid stale iframe content after rapid UI iterations.
  params.set("v", "20260213-37");
  const query = params.toString();
  return query ? `?${query}` : "";
}

function buildOnePagePayload(project, client) {
  // OnePage must mirror the project screen: prefer `project.tasks` (source of truth after edits),
  // falling back to epics/items only when tasks is missing.
  const tasksSource =
    Array.isArray(project?.tasks) && project.tasks.length ? project.tasks : flattenProjectTasks(project);
  const tasksRaw = leafTasksForProgress(tasksSource);
  // Normalize owner field for OnePage cards.
  const tasks = tasksRaw.map((t) => {
    if (!t || typeof t !== "object") return t;
    const existing =
      (t.owner || t.responsible || t.responsavel || t.assignee || "").toString().trim();

    // OnePage expects progress in `progress` (the project screen often uses `progressPct`).
    // Keep both fields in sync so the report reflects edited child-task percentages.
    const derivedProgress = taskProgressValue(t);
    const effectiveMembers = computeEffectiveMembersForTask(t, project, client).join("; ");
    const withProgress = {
      ...t,
      progress: derivedProgress,
      progressPct: derivedProgress,
      ...(effectiveMembers ? { members: effectiveMembers } : {})
    };

    if (existing) return withProgress;
    const derived = String(taskOwner(t) || "").trim();
    if (derived) return { ...withProgress, responsavel: derived };
    const fallbackOwner = effectiveMembers ? effectiveMembers.split(";")[0].trim() : "";
    return fallbackOwner ? { ...withProgress, responsavel: fallbackOwner } : withProgress;
  });
  const metrics = projectMetrics(tasks);
  const progressPct = clampPct(metrics.progress ?? project?.progress ?? 0);
  const statusLabel = statusInfo(projectStatus(project, metrics)).label || "Em andamento";

  // Prefer role-based definitions from `project.team` (more reliable than single text fields).
  const policy = buildProjectMembersPolicy(project, client);
  const leaderLabel =
    policy?.leader ||
    project?.responsible ||
    project?.leader ||
    project?.lead ||
    "-";
  const devListRaw = Array.isArray(policy?.developers) ? policy.developers : [];
  const fallbackDev = String(project?.developer || project?.dev || "").trim();
  const devList = devListRaw.length
    ? devListRaw
    : (fallbackDev ? fallbackDev.split(/[;,|/]+/g).map((s) => s.trim()).filter(Boolean) : []);
  const developersLabel = devList.length ? devList.join(" / ") : "-";

  const baselinePctCalc = rollupBaselinePct(tasks);

  const epicNames = Array.isArray(project?.epics) ? project.epics : [];
  const epicsList = epicNames.map((epicName) => {
    const epicTasks = tasks.filter((t) => normalizePhaseLabel(t?.phase || "") === normalizePhaseLabel(epicName));
    const epicLeafTasks = leafTasksForProgress(epicTasks);
    return {
      name: epicName,
      progress: epicLeafTasks.length ? Math.round(weightedProgressPct(epicLeafTasks)) : 0,
      total: epicTasks.length,
      done: epicTasks.filter((t) => isDoneTask(t)).length
    };
  });

  return {
    project: {
      name: project?.name || "Projeto",
      client: client?.name || project?.client || "-",
      leader: leaderLabel,
      developer: developersLabel,
      developers: devList,
      team: Array.isArray(project?.team) ? project.team : [],
      packages: Array.isArray(project?.packages) ? project.packages : getProjectPackages(project),
      packageParents: project?.packageParents || project?.package_parents || {},
      responsible: leaderLabel,
      reportDate: project?.reportDate || formatDateBR(new Date()),
      statusLabel,
      startDate: project?.start || project?.startDate || "",
      goLiveDate: project?.end || project?.goLiveDate || project?.goLive || ""
    },
    overall: {
      progressPct,
      baselinePct: baselinePctCalc,
      phaseLabel: project?.phaseLabel || project?.phase || ""
    },
    epics: epicsList,
    tasks
  };
}

function wireOnePageFrameData(frame, project, client) {
  if (!frame) return;
  const send = () => {
    const payload = buildOnePagePayload(project, client);
    try {
      const win = frame.contentWindow;
      // Same-origin: call directly when available (more reliable than postMessage).
      if (win && typeof win.__applyOnePageData === "function") {
        win.__applyOnePageData(payload);
        return;
      }
      win?.postMessage({ type: "onepage-data", payload }, "*");
    } catch (err) {
      // ignore
    }
  };
  // Try immediately (in case the iframe is already interactive) and once more shortly after.
  send();
  setTimeout(send, 120);
  frame.addEventListener("load", () => {
    send();
    // Send again after a short delay in case the OnePage booted before listeners were attached.
    setTimeout(send, 60);
  }, { once: true });
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

  const basePath = `onepage.html${buildOnePageQuery(project, client)}`;
  const debugPath = `${basePath}${basePath.includes("?") ? "&" : "?"}debug=1`;
  const baseUrl = new URL(basePath, window.location.href).toString();
  const debugUrl = new URL(debugPath, window.location.href).toString();

  const reportFrame = document.createElement("iframe");
  reportFrame.className = "onepage-frame";
  reportFrame.title = "Relatorio do Projeto";
  reportFrame.loading = "lazy";
  reportFrame.src = basePath;

  const toolbar = document.createElement("div");
  toolbar.className = "report-toolbar";
  toolbar.innerHTML = `
    <div class="report-toolbar-title">OnePage</div>
    <input class="report-url" type="text" readonly value="${escapeHtml(debugUrl)}" aria-label="URL do OnePage (debug)" />
    <button type="button" class="btn sm" data-copy-onepage-url>Copiar URL (debug)</button>
    <button type="button" class="btn sm" data-open-onepage-debug>Ativar Debug (no relatório)</button>
    <button type="button" class="btn sm" data-open-onepage-normal>Voltar Normal</button>
    <a class="btn sm" href="${escapeHtml(debugUrl)}" target="_blank" rel="noopener">Abrir Debug (aba)</a>
  `;
  reportWrapper.appendChild(toolbar);

  const copyBtn = toolbar.querySelector("[data-copy-onepage-url]");
  copyBtn?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(debugUrl);
      copyBtn.textContent = "Copiado";
      setTimeout(() => {
        copyBtn.textContent = "Copiar URL (debug)";
      }, 1200);
    } catch (err) {
      // Fallback: keep it simple and still let the user copy.
      window.prompt("Copie a URL do OnePage (debug):", debugUrl);
    }
  });

  toolbar.querySelector("[data-open-onepage-debug]")?.addEventListener("click", () => {
    reportFrame.src = debugPath;
    wireOnePageFrameData(reportFrame, project, client);
  });
  toolbar.querySelector("[data-open-onepage-normal]")?.addEventListener("click", () => {
    reportFrame.src = basePath;
    wireOnePageFrameData(reportFrame, project, client);
  });

  wireOnePageFrameData(reportFrame, project, client);
  reportWrapper.appendChild(reportFrame);

  contentArea.innerHTML = "";
  contentArea.appendChild(reportWrapper);
}

function renderMonitorActivities(container) {
  renderMonitorActivitiesV2(container);
  return;
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
        <div class="monitor-chip-bar" role="tablist" aria-label="Filtros do monitor">
          ${MONITOR_FILTERS.map((option) => {
            const active = option.key === filter ? "active" : "";
            const selected = option.key === filter ? "true" : "false";
            return `<button type="button" class="monitor-chip ${active}" data-monitor-filter="${option.key}" aria-selected="${selected}">${option.label}</button>`;
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

  const list = document.createElement("div");
  list.className = "monitor-container span-all monitor-bento-grid";

  const today = startOfDay(new Date());
  const overdueItems = [];
  const todayItems = [];
  const upcomingItems = [];

  filtered.forEach((item) => {
    const diff = daysDiff(item.dueDay, today);
    if (diff < 0 || item.status === "atrasado") {
      overdueItems.push(item);
    } else if (diff === 0) {
      todayItems.push(item);
    } else {
      upcomingItems.push(item);
    }
  });

  const sortByDue = (a, b) => a.dueDay.getTime() - b.dueDay.getTime();
  overdueItems.sort(sortByDue);
  todayItems.sort(sortByDue);
  upcomingItems.sort(sortByDue);

  const iconSvg = (name) => {
    const icons = {
      alert: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
      calendarCheck: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><polyline points="9 16 11 18 15 14"></polyline></svg>`,
      calendar: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
      users: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
      trend: `<svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>`,
      code: `<svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
      review: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M9 12l2 2 4-4"></path></svg>`,
      meeting: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="1" y="5" width="15" height="14" rx="2"></rect><polygon points="23 7 16 12 23 17 23 7"></polygon></svg>`
    };
    return icons[name] || icons.code;
  };

  const pickMonitorIcon = (item) => {
    const rawTitle = String(item.taskTitle || "").toLowerCase();
    const normalized = rawTitle.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (normalized.includes("revis") || normalized.includes("review") || normalized.includes("valid")) {
      return "review";
    }
    if (
      normalized.includes("reun") ||
      normalized.includes("meeting") ||
      normalized.includes("call") ||
      normalized.includes("reuniao")
    ) {
      return "meeting";
    }
    return "code";
  };

  const renderTaskMiniCard = (item) => {
    const diff = daysDiff(item.dueDay, today);
    const tone = diff < 0 ? "overdue" : diff === 0 ? "today" : "upcoming";
    const labelBase = formatMonitorDateLabel(item.dueDay, today);
    const badgeLabel = diff < 0 ? "ATRASADO" : diff === 0 ? "HOJE" : "PROXIMO";
    const deltaLabel =
      diff < 0 ? `Atraso: ${Math.abs(diff)}d` : diff === 0 ? "Vence hoje" : `Em ${diff}d`;
    const responsible = item.responsible || "A definir";
    const icon = pickMonitorIcon(item);
    return `
      <div class="monitor-mini-card monitor-mini-card--${tone}" data-monitor-card="true" data-client-index="${item.clientIndex}" data-project-index="${item.projectIndex}" data-task-index="${item.taskIndex}">
        <div class="monitor-mini-left">
          <label class="monitor-mini-check" data-monitor-toggle="true" title="Concluir">
            <input type="checkbox" aria-label="Concluir atividade">
          </label>
          <div class="monitor-mini-icon">${iconSvg(icon)}</div>
          <div class="monitor-mini-info">
            <div class="monitor-mini-title">${escapeHtml(item.taskTitle)}</div>
            <div class="monitor-mini-meta">
              <span class="monitor-mini-client">${escapeHtml(item.clientName)}</span>
              <span class="monitor-mini-sep">|</span>
              <span>${escapeHtml(item.projectName)}</span>
              <span class="monitor-mini-sep">|</span>
              <span>${escapeHtml(responsible)}</span>
            </div>
          </div>
        </div>
        <div class="monitor-mini-right">
          <div class="monitor-mini-date">${labelBase}</div>
          <div class="monitor-mini-status monitor-mini-status--${tone}">${badgeLabel}</div>
          <div class="monitor-mini-gap">${deltaLabel}</div>
        </div>
      </div>
    `;
  };

  const renderMiniList = (items) => {
    if (!items.length) {
      return `<div class="monitor-mini-empty">Sem atividades.</div>`;
    }
    const limit = 12;
    const sliced = items.slice(0, limit);
    const extra = items.length - sliced.length;
    return `${sliced.map(renderTaskMiniCard).join("")}${
      extra > 0 ? `<div class="monitor-mini-more">+${extra} restantes</div>` : ""
    }`;
  };

  const teamMap = new Map();
  filtered.forEach((item) => {
    const name = item.responsible || "A definir";
    const entry = teamMap.get(name) || { name, total: 0, overdue: 0 };
    entry.total += 1;
    if (daysDiff(item.dueDay, today) < 0) entry.overdue += 1;
    teamMap.set(name, entry);
  });
  const teamItems = Array.from(teamMap.values())
    .sort((a, b) => b.total - a.total)
    .slice(0, 4);

  const bottleneckMap = new Map();
  overdueItems.forEach((item) => {
    const key = item.projectName || "Projeto";
    const entry = bottleneckMap.get(key) || { project: key, client: item.clientName || "", total: 0 };
    entry.total += 1;
    bottleneckMap.set(key, entry);
  });
  const bottlenecks = Array.from(bottleneckMap.values())
    .sort((a, b) => b.total - a.total)
    .slice(0, 4);

  const renderTeamList = () => {
    if (!teamItems.length) {
      return `<div class="monitor-mini-empty">Sem dados de time.</div>`;
    }
    return teamItems
      .map((member) => {
        const initials = escapeHtml(initialsFromName(member.name || "T"));
        const name = escapeHtml(member.name || "A definir");
        return `
          <div class="monitor-mini-card monitor-mini-card--neutral">
            <div class="monitor-mini-left">
              <div class="monitor-mini-avatar">${initials}</div>
              <div class="monitor-mini-info">
                <div class="monitor-mini-title">${name}</div>
                <div class="monitor-mini-meta">
                  <span>${member.total} atividades</span>
                </div>
              </div>
            </div>
            <div class="monitor-mini-right">
              <div class="monitor-mini-gap monitor-mini-gap--warn">${member.overdue} atrasadas</div>
            </div>
          </div>
        `;
      })
      .join("");
  };

  const renderBottleneckList = () => {
    if (!bottlenecks.length) {
      return `<div class="monitor-mini-empty">Sem gargalos.</div>`;
    }
    return bottlenecks
      .map((entry) => {
        const project = escapeHtml(entry.project || "Projeto");
        const client = escapeHtml(entry.client || "");
        return `
          <div class="monitor-mini-card monitor-mini-card--risk">
            <div class="monitor-mini-left">
              <div class="monitor-mini-icon">${iconSvg("trend")}</div>
              <div class="monitor-mini-info">
                <div class="monitor-mini-title">${project}</div>
                <div class="monitor-mini-meta">${client ? `${client}` : "Sem cliente"}</div>
              </div>
            </div>
            <div class="monitor-mini-right">
              <div class="monitor-mini-gap monitor-mini-gap--danger">${entry.total} atrasos</div>
            </div>
          </div>
        `;
      })
      .join("");
  };

  const cardsHtml = `
    <div class="monitor-bento-col monitor-bento-col--primary">
      <div class="monitor-bento-card monitor-bento-card--critical monitor-bento-card--xl">
        <div class="monitor-bento-head">
          <div>
            <div class="monitor-bento-title">Acoes Criticas</div>
            <div class="monitor-bento-sub">Intervencao imediata</div>
          </div>
          <div class="monitor-bento-icon monitor-bento-icon--critical">${iconSvg("alert")}</div>
        </div>
        <div class="monitor-bento-count">${overdueItems.length} atividades</div>
        <div class="monitor-bento-list">${renderMiniList(overdueItems)}</div>
      </div>
    </div>

    <div class="monitor-bento-col monitor-bento-col--secondary">
      <div class="monitor-bento-card monitor-bento-card--today monitor-bento-card--wide">
        <div class="monitor-bento-head">
          <div>
            <div class="monitor-bento-title">Cronograma do Dia</div>
            <div class="monitor-bento-sub">Entrega e follow-up</div>
          </div>
          <div class="monitor-bento-icon monitor-bento-icon--today">${iconSvg("calendarCheck")}</div>
        </div>
        <div class="monitor-bento-count">${todayItems.length} atividades</div>
        <div class="monitor-bento-list">${renderMiniList(todayItems)}</div>
      </div>

      <div class="monitor-bento-card monitor-bento-card--team">
        <div class="monitor-bento-head">
          <div>
            <div class="monitor-bento-title">Metricas de Time</div>
            <div class="monitor-bento-sub">Carga por responsavel</div>
          </div>
          <div class="monitor-bento-icon monitor-bento-icon--team">${iconSvg("users")}</div>
        </div>
        <div class="monitor-bento-list">${renderTeamList()}</div>
      </div>

      <div class="monitor-bento-card monitor-bento-card--upcoming">
        <div class="monitor-bento-head">
          <div>
            <div class="monitor-bento-title">Proximos 7 dias</div>
            <div class="monitor-bento-sub">Planejamento</div>
          </div>
          <div class="monitor-bento-icon monitor-bento-icon--upcoming">${iconSvg("calendar")}</div>
        </div>
        <div class="monitor-bento-count">${upcomingItems.length} atividades</div>
        <div class="monitor-bento-list">${renderMiniList(upcomingItems)}</div>
      </div>

      <div class="monitor-bento-card monitor-bento-card--bottleneck">
        <div class="monitor-bento-head">
          <div>
            <div class="monitor-bento-title">Gargalos</div>
            <div class="monitor-bento-sub">Projetos com atraso</div>
          </div>
          <div class="monitor-bento-icon monitor-bento-icon--risk">${iconSvg("trend")}</div>
        </div>
        <div class="monitor-bento-list">${renderBottleneckList()}</div>
      </div>
    </div>
  `;

  list.innerHTML = cardsHtml;
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
  if (role !== "manager" && role !== "admin") {
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
        <div class="config-users-shell" id="admin-users-section">
          <div class="config-users-toolbar">
            <div>
              <h2>Gerenciamento de equipe</h2>
              <div class="muted">Controle de acessos, convites e permissoes.</div>
            </div>
            <div class="config-users-actions">
              <label class="config-users-search">
                <i data-lucide="search"></i>
                <input id="admin-users-search" type="search" placeholder="Buscar usuario ou e-mail">
              </label>
              <button class="btn primary" type="button" id="admin-invite-btn">+ Convidar usuario</button>
            </div>
          </div>
          <div class="config-users-filters">
            <label>
              Perfil
              <select id="admin-role-filter" class="config-input">
                <option value="all">Todos</option>
                <option value="admin">Administrador</option>
                <option value="manager">Gestor de Projetos</option>
                <option value="viewer">Visualizador</option>
              </select>
            </label>
            <label>
              Status
              <select id="admin-status-filter" class="config-input">
                <option value="all">Todos</option>
                <option value="active">Ativo</option>
                <option value="pending">Pendente</option>
                <option value="disabled">Desativado</option>
              </select>
            </label>
            <button class="btn sm ghost" type="button" id="admin-clear-filters">Limpar filtros</button>
          </div>
          <div class="config-users-table">
            <div class="config-users-head">
              <div>Usuario</div>
              <div>Perfil</div>
              <div>Status</div>
              <div>Ultimo login</div>
              <div></div>
            </div>
            <div id="admin-users-list" class="config-users-body">Carregando usuarios...</div>
          </div>
          <div class="config-hint">Use "Resetar senha" para enviar o e-mail de redefinicao ao usuario.</div>
        </div>

        <div class="config-user-drawer" id="admin-user-drawer" aria-hidden="true">
          <div class="config-user-drawer-backdrop" data-drawer-close></div>
          <div class="config-user-drawer-panel">
            <div class="drawer-header">
              <div>
                <div class="drawer-title">Usuario selecionado</div>
                <div class="drawer-subtitle" id="drawer-user-email">-</div>
              </div>
              <button class="btn sm ghost" type="button" data-drawer-close>
                <i data-lucide="x"></i>
              </button>
            </div>
            <div class="drawer-body">
              <label>
                Nome
                <input id="drawer-user-name" class="config-input" type="text" placeholder="Nome do usuario">
              </label>
              <label>
                Perfil
                <select id="drawer-user-role" class="config-input">
                  <option value="viewer">Visualizador</option>
                  <option value="manager">Gestor de Projetos</option>
                  <option value="admin">Administrador</option>
                </select>
              </label>
            </div>
            <div class="drawer-actions">
              <button class="btn sm ghost" type="button" id="drawer-toggle-status-btn" style="color:#ef4444;">Desativar usuario</button>
              <button class="btn sm ghost" type="button" id="drawer-reset-btn">Resetar senha</button>
              <button class="btn sm primary" type="button" id="drawer-save-btn">Salvar alteracoes</button>
            </div>
            <p id="drawer-status" class="config-message"></p>
          </div>
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

  if (window.lucide) {
    window.lucide.createIcons();
  }

  if (admin) {
    if (!state.adminUserFilters) {
      state.adminUserFilters = { query: "", role: "all", status: "all" };
    }

    const searchInput = byId("admin-users-search");
    if (searchInput) {
      searchInput.value = state.adminUserFilters.query || "";
      if (!searchInput.dataset.wired) {
        searchInput.addEventListener("input", () => {
          state.adminUserFilters.query = searchInput.value;
          applyAdminUserFilters();
        });
        searchInput.dataset.wired = "true";
      }
    }

    const roleFilter = byId("admin-role-filter");
    if (roleFilter) {
      roleFilter.value = state.adminUserFilters.role || "all";
      if (!roleFilter.dataset.wired) {
        roleFilter.addEventListener("change", () => {
          state.adminUserFilters.role = roleFilter.value;
          applyAdminUserFilters();
        });
        roleFilter.dataset.wired = "true";
      }
    }

    const statusFilter = byId("admin-status-filter");
    if (statusFilter) {
      statusFilter.value = state.adminUserFilters.status || "all";
      if (!statusFilter.dataset.wired) {
        statusFilter.addEventListener("change", () => {
          state.adminUserFilters.status = statusFilter.value;
          applyAdminUserFilters();
        });
        statusFilter.dataset.wired = "true";
      }
    }

    const clearFiltersBtn = byId("admin-clear-filters");
    if (clearFiltersBtn && !clearFiltersBtn.dataset.wired) {
      clearFiltersBtn.addEventListener("click", () => {
        state.adminUserFilters = { query: "", role: "all", status: "all" };
        if (searchInput) searchInput.value = "";
        if (roleFilter) roleFilter.value = "all";
        if (statusFilter) statusFilter.value = "all";
        applyAdminUserFilters();
      });
      clearFiltersBtn.dataset.wired = "true";
    }

    const inviteBtn = byId("admin-invite-btn");
    if (inviteBtn && !inviteBtn.dataset.wired) {
      inviteBtn.addEventListener("click", () => openInviteUserModal());
      inviteBtn.dataset.wired = "true";
    }


    loadAdminUsers();
    loadAdminGroups();
    wireAdminUserDrawer();

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
    state.usersLoadDenied = false;
    const user = auth?.currentUser;
    if (user) await syncUserProfile(user);
    let users = await loadUsersFromDb();
    if (state.usersLoadDenied) {
      const fn = getFirebaseFunctions();
      const listUsersByAdmin = fn?.httpsCallable?.("listUsersByAdmin");
      if (listUsersByAdmin) {
        try {
          const res = await listUsersByAdmin({});
          users = res?.data?.users || [];
          state.usersLoadDenied = false;
        } catch (fnErr) {
          console.warn("listUsersByAdmin falhou:", fnErr);
        }
      }
    }
    state.users = (users || []).slice();
    if (state.usersLoadDenied) {
      list.innerHTML = "<div class=\"muted\">Sem permissao para listar usuarios. Verifique se seu perfil esta configurado como administrador.</div>";
    } else {
      renderAdminUsers(list, getFilteredAdminUsers(users));
    }
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
    const user = auth?.currentUser;
    if (user) await syncUserProfile(user);
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

function getAdminUserStatus(user) {
  if (user?.status === "disabled") {
    return { key: "disabled", label: "Desativado", className: "status-disabled" };
  }
  if (user?.lastLoginAt) {
    return { key: "active", label: "Ativo", className: "status-active" };
  }
  if (user?.createdAt) {
    return { key: "pending", label: "Pendente", className: "status-pending" };
  }
  return { key: "inactive", label: "Inativo", className: "status-inactive" };
}

function getAdminUserLastLoginLabel(user) {
  if (!user?.lastLoginAt) return "Nunca";
  const raw = typeof user.lastLoginAt === "number" ? user.lastLoginAt : Number(user.lastLoginAt);
  const dt = new Date(raw);
  if (Number.isNaN(dt.getTime())) return "-";
  return formatDateTime(dt);
}

function getFilteredAdminUsers(users) {
  const filters = state.adminUserFilters || { query: "", role: "all", status: "all" };
  const query = String(filters.query || "").trim().toLowerCase();
  return (users || []).filter((user) => {
    const name = String(user.displayName || "").toLowerCase();
    const email = String(user.email || "").toLowerCase();
    const role = normalizeUserRole(user.role);
    const status = getAdminUserStatus(user).key;
    const matchesQuery = !query || name.includes(query) || email.includes(query);
    const matchesRole = filters.role === "all" || role === filters.role;
    const matchesStatus = filters.status === "all" || status === filters.status;
    return matchesQuery && matchesRole && matchesStatus;
  });
}

function applyAdminUserFilters() {
  const list = byId("admin-users-list");
  if (!list) return;
  renderAdminUsers(list, getFilteredAdminUsers(state.users || []));
}

function openAdminUserDrawer(user) {
  if (!user) return;
  const drawer = byId("admin-user-drawer");
  if (!drawer) return;
  drawer.classList.add("open");
  drawer.setAttribute("aria-hidden", "false");
  drawer.dataset.userId = user.uid || "";
  drawer.dataset.userEmail = user.email || "";
  const nameInput = byId("drawer-user-name");
  if (nameInput) nameInput.value = user.displayName || "";
  const roleSelect = byId("drawer-user-role");
  if (roleSelect) roleSelect.value = normalizeUserRole(user.role);
  const emailLabel = byId("drawer-user-email");
  if (emailLabel) emailLabel.textContent = user.email || "-";
  const statusMsg = byId("drawer-status");
  if (statusMsg) {
    statusMsg.textContent = "";
    statusMsg.classList.remove("error", "success");
  }
  const toggleBtn = byId("drawer-toggle-status-btn");
  updateDrawerToggleBtn(toggleBtn, user.status === "disabled");
}

function closeAdminUserDrawer() {
  const drawer = byId("admin-user-drawer");
  if (!drawer) return;
  drawer.classList.remove("open");
  drawer.setAttribute("aria-hidden", "true");
  drawer.dataset.userId = "";
  drawer.dataset.userEmail = "";
}

function wireAdminUserDrawer() {
  const drawer = byId("admin-user-drawer");
  if (!drawer || drawer.dataset.wired) return;

  drawer.addEventListener("click", (event) => {
    if (event.target.closest("[data-drawer-close]")) {
      closeAdminUserDrawer();
    }
  });

  const saveBtn = byId("drawer-save-btn");
  if (saveBtn) {
    saveBtn.addEventListener("click", async () => {
      const uid = drawer.dataset.userId || "";
      if (!uid) return;
      const nameInput = byId("drawer-user-name");
      const roleSelect = byId("drawer-user-role");
      const newName = nameInput?.value.trim() || "";
      const newRole = normalizeUserRole(roleSelect?.value);
      const statusMsg = byId("drawer-status");
      if (statusMsg) {
        statusMsg.textContent = "Salvando...";
        statusMsg.classList.remove("error", "success");
      }
      try {
        await updateUserProfileInDb(uid, { displayName: newName, role: newRole });
        try {
          const fn = getFirebaseFunctions();
          const setRole = fn.httpsCallable("setAdminClaim");
          await setRole({ targetUid: uid, role: newRole });
        } catch (claimErr) {
          console.warn("Custom Claims sync failed (will apply on next login):", claimErr);
        }
        if (auth?.currentUser?.uid === uid) {
          await loadCurrentUserRole(auth.currentUser);
          renderMain();
        }
        const idx = (state.users || []).findIndex((user) => user.uid === uid);
        if (idx >= 0) {
          state.users[idx] = { ...state.users[idx], displayName: newName, role: newRole };
        }
        applyAdminUserFilters();
        if (statusMsg) {
          statusMsg.textContent = "Salvo.";
          statusMsg.classList.add("success");
        }
      } catch (err) {
        console.error(err);
        if (statusMsg) {
          statusMsg.textContent = "Erro ao salvar.";
          statusMsg.classList.add("error");
        }
      }
    });
  }

  const resetBtn = byId("drawer-reset-btn");
  if (resetBtn) {
    resetBtn.addEventListener("click", async () => {
      const email = drawer.dataset.userEmail || "";
      const statusMsg = byId("drawer-status");
      if (!email) {
        if (statusMsg) {
          statusMsg.textContent = "E-mail indisponivel.";
          statusMsg.classList.add("error");
        }
        return;
      }
      const confirmed = window.confirm(`Enviar redefinicao de senha para ${email}?`);
      if (!confirmed) return;
      if (statusMsg) {
        statusMsg.textContent = "Enviando...";
        statusMsg.classList.remove("error", "success");
      }
      try {
        await sendPasswordReset(email);
        if (statusMsg) {
          statusMsg.textContent = "E-mail enviado.";
          statusMsg.classList.add("success");
        }
      } catch (err) {
        console.error(err);
        if (statusMsg) {
          statusMsg.textContent = "Erro ao enviar.";
          statusMsg.classList.add("error");
        }
      }
    });
  }

  const toggleStatusBtn = byId("drawer-toggle-status-btn");
  if (toggleStatusBtn) {
    toggleStatusBtn.addEventListener("click", async () => {
      const uid = drawer.dataset.userId || "";
      if (!uid) return;
      const statusMsg = byId("drawer-status");
      const user = (state.users || []).find((u) => u.uid === uid);
      const isCurrentlyDisabled = user?.status === "disabled";
      const action = isCurrentlyDisabled ? "reativar" : "desativar";
      const confirmed = window.confirm(`Tem certeza que deseja ${action} este usuario?`);
      if (!confirmed) return;
      if (statusMsg) {
        statusMsg.textContent = isCurrentlyDisabled ? "Reativando..." : "Desativando...";
        statusMsg.classList.remove("error", "success");
      }
      try {
        const fn = getFirebaseFunctions();
        const toggle = fn.httpsCallable("toggleUserStatus");
        await toggle({ targetUid: uid, disabled: !isCurrentlyDisabled });
        const idx = (state.users || []).findIndex((u) => u.uid === uid);
        if (idx >= 0) {
          state.users[idx] = { ...state.users[idx], status: isCurrentlyDisabled ? "active" : "disabled" };
        }
        applyAdminUserFilters();
        updateDrawerToggleBtn(toggleStatusBtn, !isCurrentlyDisabled);
        if (statusMsg) {
          statusMsg.textContent = isCurrentlyDisabled ? "Usuario reativado." : "Usuario desativado.";
          statusMsg.classList.add("success");
        }
      } catch (err) {
        console.error(err);
        if (statusMsg) {
          statusMsg.textContent = "Erro ao alterar status.";
          statusMsg.classList.add("error");
        }
      }
    });
  }

  drawer.dataset.wired = "true";
}

function updateDrawerToggleBtn(btn, isDisabled) {
  if (!btn) return;
  if (isDisabled) {
    btn.textContent = "Reativar usuario";
    btn.style.color = "#16a34a";
  } else {
    btn.textContent = "Desativar usuario";
    btn.style.color = "#ef4444";
  }
}

function renderAdminUsers(container, users) {
  const rows = users
    .sort((a, b) => (a.email || "").localeCompare(b.email || ""))
    .map((user) => {
      const email = escapeHtml(user.email || "");
      const name = escapeHtml(user.displayName || user.email || "Usuario");
      const role = normalizeUserRole(user.role);
      const roleClass = role === "admin" ? "role-admin" : role === "manager" ? "role-manager" : "role-viewer";
      const status = getAdminUserStatus(user);
      const lastLoginLabel = getAdminUserLastLoginLabel(user);
      return `
        <div class="config-user-row" data-user-id="${escapeHtml(user.uid)}" data-user-email="${email}">
          <div class="config-user-main">
            <div class="config-user-name">${name}</div>
            <div class="config-user-email">${email || "-"}</div>
          </div>
          <div>
            <span class="config-badge ${roleClass}">${roleLabel(role)}</span>
          </div>
          <div>
            <span class="config-badge ${status.className}">${status.label}</span>
          </div>
          <div class="config-user-last">${lastLoginLabel}</div>
          <div class="config-user-actions">
            <button class="btn sm ghost" type="button" data-user-open title="Detalhes">
              <i data-lucide="more-horizontal"></i>
            </button>
            <button class="btn sm danger" type="button" data-user-delete title="Excluir perfil">
              <i data-lucide="trash-2"></i>
            </button>
          </div>
        </div>
      `;
    })
    .join("");

  container.innerHTML = rows || "<div class=\"muted\">Nenhum usuario encontrado.</div>";

  if (!container.dataset.wired) {
    container.addEventListener("click", async (e) => {
      const deleteBtn = e.target.closest("[data-user-delete]");
      if (deleteBtn) {
        const row = deleteBtn.closest("[data-user-id]");
        if (!row) return;
        const uid = row.dataset.userId || "";
        const email = row.dataset.userEmail || "";
        if (!uid) return;
        if (auth?.currentUser?.uid === uid) {
          alert("Nao e possivel excluir o proprio perfil.");
          return;
        }
        if (isAdminEmail(email)) {
          alert("Nao e possivel excluir o administrador principal.");
          return;
        }
        const confirmed = window.confirm(`Excluir o perfil de ${email || "este usuario"}?`);
        if (!confirmed) return;
        deleteBtn.disabled = true;
        try {
          await deleteUserFromDb(uid);
          state.users = (state.users || []).filter((item) => item.uid !== uid);
          applyAdminUserFilters();
          await loadAdminGroups();
          closeAdminUserDrawer();
        } catch (err) {
          console.error(err);
          alert("Erro ao excluir usuario.");
        } finally {
          deleteBtn.disabled = false;
        }
        return;
      }

      const row = e.target.closest("[data-user-id]");
      if (!row) return;
      const isOpen = e.target.closest("[data-user-open]") || e.target.closest(".config-user-row");
      if (!isOpen) return;
      const uid = row.dataset.userId || "";
      const user = (state.users || []).find((item) => item.uid === uid);
      openAdminUserDrawer(user);
    });
    container.dataset.wired = "true";
  }

  if (window.lucide) {
    window.lucide.createIcons();
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

  if (state.currentSection === "dashboard-melhorias") {
    renderImprovementsDashboard(panels);
    finalizeRender();
    return;
  }

  if (state.currentSection === "minhas-melhorias") {
    // No dedicated detail screen for improvements; keep user on Kanban.
    state.currentSection = "dashboard-melhorias";
    setActiveNav(state.currentSection);
    renderImprovementsDashboard(panels);
    finalizeRender();
    return;
  }

  if (state.currentSection === "portfolio") {
    renderPortfolio(panels);
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

  if (state.currentSection === "board") {
    renderBoardApp(panels);
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

  const tasks = selectedProject.tasks || [];
  const metrics = projectMetrics(tasks);
  const status = projectStatus(selectedProject, metrics);
  const statusBadge = statusInfo(status);
  const scheduleBadge = scheduleStatusInfo(projectScheduleStatus(selectedProject));
  // Realizado: refletir o % informado nas atividades (folhas), nao apenas "concluidas/total".
  const progressPct = clampPct(tasks.length ? progressPctFromTasks(tasks) : (metrics.progress ?? selectedProject.progress ?? 0));

  // Previsto (baseline): usar o mesmo calculo do cronograma (rollupBaselinePct por tarefa-folha).
  const baselinePct = rollupBaselinePct(leafTasksForProgress(tasks));
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
  const projectCost = resolveProjectCost(selectedProject);
  const costLabel = formatCurrency(projectCost);
  const tasksWithIdx = tasks.map((t, idx) => ({ ...(t || {}), _idx: idx }));
  const sparkRealized = renderSparklineSvg(buildSparklineSeries(progressPct), {
    stroke: "var(--accent)",
    fill: "var(--accent-soft)"
  });
  const sparkBaseline = renderSparklineSvg(buildSparklineSeries(baselinePct), {
    stroke: "var(--muted)",
    fill: "rgba(148, 163, 184, 0.14)"
  });
  const gapSparkPalette = {
    "gap-ok": { stroke: "#16a34a", fill: "rgba(22, 163, 74, 0.12)" },
    "gap-low": { stroke: "#d97706", fill: "rgba(245, 158, 11, 0.12)" },
    "gap-risk": { stroke: "#b45309", fill: "rgba(245, 158, 11, 0.16)" },
    "gap-delayed": { stroke: "#ea580c", fill: "rgba(234, 88, 12, 0.18)" },
    "gap-critical": { stroke: "#9b1c23", fill: "rgba(155, 28, 35, 0.14)" }
  };
  const gapSparkTone = gapSparkPalette[gapStatus.className] || gapSparkPalette["gap-risk"];
  const gapSparkBase = 100 - Math.min(Math.abs(gap) * 2, 60);
  const sparkGap = renderSparklineSvg(buildSparklineSeries(gapSparkBase), gapSparkTone);
  const emptyIllustration = `
    <svg class="empty-illustration" viewBox="0 0 64 40" role="img" aria-hidden="true">
      <rect x="4" y="8" width="56" height="24" rx="6" fill="none" stroke="currentColor" stroke-width="2"></rect>
      <line x1="16" y1="18" x2="48" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>
      <line x1="16" y1="26" x2="38" y2="26" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>
    </svg>
  `;
  const renderSideEmpty = (label) => `
    <div class="side-empty">
      ${emptyIllustration}
      <span>${label}</span>
    </div>
  `;
  const milestoneItems = upcomingMilestones(tasks, 4);
  const milestoneList = milestoneItems.length
    ? `<ul class="side-list">
        ${milestoneItems
          .map(({ task, due }) => {
            const title = escapeHtml(task?.title || "Atividade");
            const phase = normalizePhaseLabel(task?.phase || "");
            const dueLabel = due ? formatDateBR(due) : "-";
            return `<li><span class="side-item-title">${title}</span><span class="side-item-meta">${phase} | ${dueLabel}</span></li>`;
          })
          .join("")}
      </ul>`
    : renderSideEmpty("Sem marcos proximos.");
  const logItems = latestCompletedTasks(tasks, 4);
  const logList = logItems.length
    ? `<ul class="side-list">
        ${logItems
          .map((task) => {
            const title = escapeHtml(task?.title || "Atividade");
            const doneLabel = formatDateBR(activityDoneDate(task) || taskDueStr(task)) || "-";
            return `<li><span class="side-item-title">${title}</span><span class="side-item-meta">Concluido | ${doneLabel}</span></li>`;
          })
          .join("")}
      </ul>`
    : renderSideEmpty("Sem logs recentes.");

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
        <button class="btn sm primary" type="button" data-open-expense>Adicionar despesa</button>
      </div>
    </div>
    <div class="project-strip">
      <div class="project-strip-item">
        <span class="project-strip-ico pm" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 21a8 8 0 0 0-16 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          </svg>
        </span>
        <div class="project-strip-text">
          <span class="k">PM responsavel</span>
          <span class="v">${escapeHtml((buildProjectMembersPolicy(selectedProject, selectedClient)?.leader) || selectedProject.responsible || selectedProject.leader || selectedProject.lead || selectedProject.developer || "A definir")}</span>
        </div>
      </div>
      <div class="project-strip-item">
        <span class="project-strip-ico kick" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M8 2v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M16 2v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M3 10h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M5 6h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          </svg>
        </span>
        <div class="project-strip-text">
          <span class="k">Kick-off</span>
          <span class="v">${formatDateBR(selectedProject.start) || "-"}</span>
        </div>
      </div>
      <div class="project-strip-item">
        <span class="project-strip-ico deadline" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M6 3h12v18H6V3Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M9 7h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M9 11h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M9 15h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </span>
        <div class="project-strip-text">
          <span class="k">Deadline</span>
          <span class="v">${formatDateBR(selectedProject.end) || "-"}</span>
        </div>
      </div>
    </div>
  `;

  const performanceGrid = document.createElement("div");
  performanceGrid.className = "metrics-grid performance-grid project-performance-grid";
  const teamMembersRaw = Array.isArray(selectedProject.team) ? selectedProject.team : [];
  const teamNames = teamMembersRaw.map((m) => normalizeTeamMemberName(m?.name)).filter(Boolean);
  const uniqTeam = [];
  teamNames.forEach((n) => {
    if (uniqTeam.some((x) => normHeader(x) === normHeader(n))) return;
    uniqTeam.push(n);
  });
  const teamShown = uniqTeam.slice(0, 4);
  const teamBadges = teamShown
    .map((name) => `<span class="avatar-chip" title="${escapeHtml(name)}">${escapeHtml(initialsFromName(name))}</span>`)
    .join("");
  const teamMore = uniqTeam.length > teamShown.length ? `+${uniqTeam.length - teamShown.length}` : "";
  const gapTrendLabel = gap > 0 ? "Tendencia de atraso" : gap < 0 ? "Tendencia adiantada" : "No prazo";
  performanceGrid.innerHTML = `
    <div class="metric-card card--kpi performance-card realizado">
      <div class="kpi-top">
        <div class="label">Progresso real</div>
        <span class="kpi-ico realizado" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M9 12l2 2 4-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z" stroke="currentColor" stroke-width="2"/>
          </svg>
        </span>
      </div>
      <div class="value">${progressPct}%</div>
      <div class="sub">${metrics.done} de ${metrics.total} concluidas</div>
    </div>
    <div class="metric-card card--kpi performance-card previsto">
      <div class="kpi-top">
        <div class="label">Previsto (Baseline)</div>
        <span class="kpi-ico previsto" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M8 2v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M16 2v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M3 10h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M5 6h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          </svg>
        </span>
      </div>
      <div class="value">${baselineLabel}%</div>
      <div class="sub">Meta para hoje</div>
    </div>
    <div class="metric-card card--kpi performance-card gap ${gapStatus.className}">
      <div class="kpi-top">
        <div class="label">GAP de desvio</div>
        <span class="kpi-ico gap" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 9v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M12 17h.01" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            <path d="M10.3 3.5L2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.5a2 2 0 0 0-3.4 0Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          </svg>
        </span>
      </div>
      <div class="value">${gapLabel}pp</div>
      <div class="sub">${gapTrendLabel}</div>
    </div>
    <div class="metric-card card--kpi performance-card squad">
      <div class="kpi-top">
        <div class="label">Squad ativa</div>
        <span class="kpi-ico squad" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 21a8 8 0 0 0-16 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M22 21a7 7 0 0 0-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </span>
      </div>
      <div class="value kpi-avatars">
        ${teamBadges || `<span class="members-empty">-</span>`}
        ${teamMore ? `<span class="avatar-more" title="Mais ${escapeHtml(String(uniqTeam.length - teamShown.length))}">${escapeHtml(teamMore)}</span>` : ""}
      </div>
      <div class="sub">${uniqTeam.length ? `${uniqTeam.length} especialistas` : "Sem equipe cadastrada"}</div>
    </div>
  `;

  const progressCompare = document.createElement("div");
  progressCompare.className = "card progress-compare card--progress";
  progressCompare.innerHTML = `
    <div class="progress-head">
      <div class="progress-title">Avanco vs meta</div>
      <div class="progress-legend">
        <span class="leg"><b>Realizado</b> <span>${progressPct}%</span></span>
        <span class="dot">|</span>
        <span class="leg"><b>Previsto</b> <span>${baselineLabel}%</span></span>
      </div>
      <div class="delta-badge ${gapStatus.className}">${gapLabel}pp</div>
    </div>
    <div class="progress-curve">
      ${curveSvg || `<div class="side-empty">Curva S: defina Data Inicio e Go Live.</div>`}
    </div>
  `;
}

function setActiveNav(section) {
  const navSection =
    section === "dashboard-melhorias" || section === "minhas-melhorias" ? "melhorias" : section;
  document.querySelectorAll(".nav-link").forEach((el) => el.classList.remove("active"));
  const active = document.querySelector(`.nav-link[data-section="${navSection}"]`);
  if (active) active.classList.add("active");
  if (navSection === "meus-projetos") {
    ensureProjectsNavOpen();
  }
}

function ensureProjectsNavOpen() {
  const link = document.querySelector('.nav-link[data-section="meus-projetos"]');
  if (link) link.classList.add("open");
}

// Improvements do not have a collapsible sub-nav.

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
  const openImprovementBtn = byId("open-improvement-modal");
  const isHome = state.currentSection === "inicio";
  const isConfig = state.currentSection === "config";
  const isDevBoard = state.currentSection === "dev-board";
  const isProject = state.currentSection === "meus-projetos";
  const isImprovements = state.currentSection === "dashboard-melhorias" || state.currentSection === "minhas-melhorias";
  if (openProjectBtn) openProjectBtn.classList.toggle("hidden", isHome || isConfig || isDevBoard);
  if (openEmployeeBtn) openEmployeeBtn.classList.toggle("hidden", isHome || isConfig || isDevBoard);
  if (editProjectBtn) editProjectBtn.classList.toggle("hidden", !isProject);
  if (openGanttBtn) {
    openGanttBtn.classList.toggle("hidden", isDevBoard);
    openGanttBtn.disabled = !state.selectedProject;
  }
  // Improvements use the in-page button (next to the search input).
  if (openImprovementBtn) openImprovementBtn.classList.add("hidden");
}

function renderHome(container) {
  setCrumbPathText("Inicio");
  container.innerHTML = renderHomeMacroSummary();
  wireHomeV2(container);
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
  // Cache-bust onepage.html to avoid stale iframe content after rapid UI iterations.
  params.set("v", "20260213-37");
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

  const basePath = `onepage.html${buildOnePageQuery(project, client)}`;
  const debugPath = `${basePath}${basePath.includes("?") ? "&" : "?"}debug=1`;
  const baseUrl = new URL(basePath, window.location.href).toString();
  const debugUrl = new URL(debugPath, window.location.href).toString();

  const reportFrame = document.createElement("iframe");
  reportFrame.className = "onepage-frame";
  reportFrame.title = "Relatorio do Projeto";
  reportFrame.loading = "lazy";
  reportFrame.src = basePath;

  const toolbar = document.createElement("div");
  toolbar.className = "report-toolbar";
  toolbar.innerHTML = `
    <div class="report-toolbar-title">OnePage</div>
    <input class="report-url" type="text" readonly value="${escapeHtml(debugUrl)}" aria-label="URL do OnePage (debug)" />
    <button type="button" class="btn sm" data-copy-onepage-url>Copiar URL (debug)</button>
    <button type="button" class="btn sm" data-open-onepage-debug>Ativar Debug (no relatório)</button>
    <button type="button" class="btn sm" data-open-onepage-normal>Voltar Normal</button>
    <a class="btn sm" href="${escapeHtml(debugUrl)}" target="_blank" rel="noopener">Abrir Debug (aba)</a>
  `;
  reportWrapper.appendChild(toolbar);

  const copyBtn = toolbar.querySelector("[data-copy-onepage-url]");
  copyBtn?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(debugUrl);
      copyBtn.textContent = "Copiado";
      setTimeout(() => {
        copyBtn.textContent = "Copiar URL (debug)";
      }, 1200);
    } catch (err) {
      window.prompt("Copie a URL do OnePage (debug):", debugUrl);
    }
  });

  toolbar.querySelector("[data-open-onepage-debug]")?.addEventListener("click", () => {
    reportFrame.src = debugPath;
    wireOnePageFrameData(reportFrame, project, client);
  });
  toolbar.querySelector("[data-open-onepage-normal]")?.addEventListener("click", () => {
    reportFrame.src = basePath;
    wireOnePageFrameData(reportFrame, project, client);
  });

  wireOnePageFrameData(reportFrame, project, client);
  reportWrapper.appendChild(reportFrame);

  contentArea.innerHTML = "";
  contentArea.appendChild(reportWrapper);
}

function renderMonitorActivities(container) {
  renderMonitorActivitiesV2(container);
  return;
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
        <div class="monitor-chip-bar" role="tablist" aria-label="Filtros do monitor">
          ${MONITOR_FILTERS.map((option) => {
            const active = option.key === filter ? "active" : "";
            const selected = option.key === filter ? "true" : "false";
            return `<button type="button" class="monitor-chip ${active}" data-monitor-filter="${option.key}" aria-selected="${selected}">${option.label}</button>`;
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

  const list = document.createElement("div");
  list.className = "monitor-container span-all monitor-bento-grid";

  const today = startOfDay(new Date());
  const overdueItems = [];
  const todayItems = [];
  const upcomingItems = [];

  filtered.forEach((item) => {
    const diff = daysDiff(item.dueDay, today);
    if (diff < 0 || item.status === "atrasado") {
      overdueItems.push(item);
    } else if (diff === 0) {
      todayItems.push(item);
    } else {
      upcomingItems.push(item);
    }
  });

  const sortByDue = (a, b) => a.dueDay.getTime() - b.dueDay.getTime();
  overdueItems.sort(sortByDue);
  todayItems.sort(sortByDue);
  upcomingItems.sort(sortByDue);

  const iconSvg = (name) => {
    const icons = {
      alert: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>`,
      calendarCheck: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line><polyline points="9 16 11 18 15 14"></polyline></svg>`,
      calendar: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>`,
      users: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
      trend: `<svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"></polyline><polyline points="16 7 22 7 22 13"></polyline></svg>`,
      code: `<svg viewBox="0 0 24 24" aria-hidden="true"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>`,
      review: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><path d="M9 12l2 2 4-4"></path></svg>`,
      meeting: `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="1" y="5" width="15" height="14" rx="2"></rect><polygon points="23 7 16 12 23 17 23 7"></polygon></svg>`
    };
    return icons[name] || icons.code;
  };

  const pickMonitorIcon = (item) => {
    const rawTitle = String(item.taskTitle || "").toLowerCase();
    const normalized = rawTitle.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (normalized.includes("revis") || normalized.includes("review") || normalized.includes("valid")) {
      return "review";
    }
    if (
      normalized.includes("reun") ||
      normalized.includes("meeting") ||
      normalized.includes("call") ||
      normalized.includes("reuniao")
    ) {
      return "meeting";
    }
    return "code";
  };

  const renderTaskMiniCard = (item) => {
    const diff = daysDiff(item.dueDay, today);
    const tone = diff < 0 ? "overdue" : diff === 0 ? "today" : "upcoming";
    const labelBase = formatMonitorDateLabel(item.dueDay, today);
    const badgeLabel = diff < 0 ? "ATRASADO" : diff === 0 ? "HOJE" : "PROXIMO";
    const deltaLabel =
      diff < 0 ? `Atraso: ${Math.abs(diff)}d` : diff === 0 ? "Vence hoje" : `Em ${diff}d`;
    const responsible = item.responsible || "A definir";
    const icon = pickMonitorIcon(item);
    return `
      <div class="monitor-mini-card monitor-mini-card--${tone}" data-monitor-card="true" data-client-index="${item.clientIndex}" data-project-index="${item.projectIndex}" data-task-index="${item.taskIndex}">
        <div class="monitor-mini-left">
          <label class="monitor-mini-check" data-monitor-toggle="true" title="Concluir">
            <input type="checkbox" aria-label="Concluir atividade">
          </label>
          <div class="monitor-mini-icon">${iconSvg(icon)}</div>
          <div class="monitor-mini-info">
            <div class="monitor-mini-title">${escapeHtml(item.taskTitle)}</div>
            <div class="monitor-mini-meta">
              <span class="monitor-mini-client">${escapeHtml(item.clientName)}</span>
              <span class="monitor-mini-sep">|</span>
              <span>${escapeHtml(item.projectName)}</span>
              <span class="monitor-mini-sep">|</span>
              <span>${escapeHtml(responsible)}</span>
            </div>
          </div>
        </div>
        <div class="monitor-mini-right">
          <div class="monitor-mini-date">${labelBase}</div>
          <div class="monitor-mini-status monitor-mini-status--${tone}">${badgeLabel}</div>
          <div class="monitor-mini-gap">${deltaLabel}</div>
        </div>
      </div>
    `;
  };

  const renderMiniList = (items) => {
    if (!items.length) {
      return `<div class="monitor-mini-empty">Sem atividades.</div>`;
    }
    const limit = 12;
    const sliced = items.slice(0, limit);
    const extra = items.length - sliced.length;
    return `${sliced.map(renderTaskMiniCard).join("")}${
      extra > 0 ? `<div class="monitor-mini-more">+${extra} restantes</div>` : ""
    }`;
  };

  const teamMap = new Map();
  filtered.forEach((item) => {
    const name = item.responsible || "A definir";
    const entry = teamMap.get(name) || { name, total: 0, overdue: 0 };
    entry.total += 1;
    if (daysDiff(item.dueDay, today) < 0) entry.overdue += 1;
    teamMap.set(name, entry);
  });
  const teamItems = Array.from(teamMap.values())
    .sort((a, b) => b.total - a.total)
    .slice(0, 4);

  const bottleneckMap = new Map();
  overdueItems.forEach((item) => {
    const key = item.projectName || "Projeto";
    const entry = bottleneckMap.get(key) || { project: key, client: item.clientName || "", total: 0 };
    entry.total += 1;
    bottleneckMap.set(key, entry);
  });
  const bottlenecks = Array.from(bottleneckMap.values())
    .sort((a, b) => b.total - a.total)
    .slice(0, 4);

  const renderTeamList = () => {
    if (!teamItems.length) {
      return `<div class="monitor-mini-empty">Sem dados de time.</div>`;
    }
    return teamItems
      .map((member) => {
        const initials = escapeHtml(initialsFromName(member.name || "T"));
        const name = escapeHtml(member.name || "A definir");
        return `
          <div class="monitor-mini-card monitor-mini-card--neutral">
            <div class="monitor-mini-left">
              <div class="monitor-mini-avatar">${initials}</div>
              <div class="monitor-mini-info">
                <div class="monitor-mini-title">${name}</div>
                <div class="monitor-mini-meta">
                  <span>${member.total} atividades</span>
                </div>
              </div>
            </div>
            <div class="monitor-mini-right">
              <div class="monitor-mini-gap monitor-mini-gap--warn">${member.overdue} atrasadas</div>
            </div>
          </div>
        `;
      })
      .join("");
  };

  const renderBottleneckList = () => {
    if (!bottlenecks.length) {
      return `<div class="monitor-mini-empty">Sem gargalos.</div>`;
    }
    return bottlenecks
      .map((entry) => {
        const project = escapeHtml(entry.project || "Projeto");
        const client = escapeHtml(entry.client || "");
        return `
          <div class="monitor-mini-card monitor-mini-card--risk">
            <div class="monitor-mini-left">
              <div class="monitor-mini-icon">${iconSvg("trend")}</div>
              <div class="monitor-mini-info">
                <div class="monitor-mini-title">${project}</div>
                <div class="monitor-mini-meta">${client ? `${client}` : "Sem cliente"}</div>
              </div>
            </div>
            <div class="monitor-mini-right">
              <div class="monitor-mini-gap monitor-mini-gap--danger">${entry.total} atrasos</div>
            </div>
          </div>
        `;
      })
      .join("");
  };

  const cardsHtml = `
    <div class="monitor-bento-col monitor-bento-col--primary">
      <div class="monitor-bento-card monitor-bento-card--critical monitor-bento-card--xl">
        <div class="monitor-bento-head">
          <div>
            <div class="monitor-bento-title">Acoes Criticas</div>
            <div class="monitor-bento-sub">Intervencao imediata</div>
          </div>
          <div class="monitor-bento-icon monitor-bento-icon--critical">${iconSvg("alert")}</div>
        </div>
        <div class="monitor-bento-count">${overdueItems.length} atividades</div>
        <div class="monitor-bento-list">${renderMiniList(overdueItems)}</div>
      </div>
    </div>

    <div class="monitor-bento-col monitor-bento-col--secondary">
      <div class="monitor-bento-card monitor-bento-card--today monitor-bento-card--wide">
        <div class="monitor-bento-head">
          <div>
            <div class="monitor-bento-title">Cronograma do Dia</div>
            <div class="monitor-bento-sub">Entrega e follow-up</div>
          </div>
          <div class="monitor-bento-icon monitor-bento-icon--today">${iconSvg("calendarCheck")}</div>
        </div>
        <div class="monitor-bento-count">${todayItems.length} atividades</div>
        <div class="monitor-bento-list">${renderMiniList(todayItems)}</div>
      </div>

      <div class="monitor-bento-card monitor-bento-card--team">
        <div class="monitor-bento-head">
          <div>
            <div class="monitor-bento-title">Metricas de Time</div>
            <div class="monitor-bento-sub">Carga por responsavel</div>
          </div>
          <div class="monitor-bento-icon monitor-bento-icon--team">${iconSvg("users")}</div>
        </div>
        <div class="monitor-bento-list">${renderTeamList()}</div>
      </div>

      <div class="monitor-bento-card monitor-bento-card--upcoming">
        <div class="monitor-bento-head">
          <div>
            <div class="monitor-bento-title">Proximos 7 dias</div>
            <div class="monitor-bento-sub">Planejamento</div>
          </div>
          <div class="monitor-bento-icon monitor-bento-icon--upcoming">${iconSvg("calendar")}</div>
        </div>
        <div class="monitor-bento-count">${upcomingItems.length} atividades</div>
        <div class="monitor-bento-list">${renderMiniList(upcomingItems)}</div>
      </div>

      <div class="monitor-bento-card monitor-bento-card--bottleneck">
        <div class="monitor-bento-head">
          <div>
            <div class="monitor-bento-title">Gargalos</div>
            <div class="monitor-bento-sub">Projetos com atraso</div>
          </div>
          <div class="monitor-bento-icon monitor-bento-icon--risk">${iconSvg("trend")}</div>
        </div>
        <div class="monitor-bento-list">${renderBottleneckList()}</div>
      </div>
    </div>
  `;

  list.innerHTML = cardsHtml;
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
  if (role !== "manager" && role !== "admin") {
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
        <div class="config-users-shell" id="admin-users-section">
          <div class="config-users-toolbar">
            <div>
              <h2>Gerenciamento de equipe</h2>
              <div class="muted">Controle de acessos, convites e permissoes.</div>
            </div>
            <div class="config-users-actions">
              <label class="config-users-search">
                <i data-lucide="search"></i>
                <input id="admin-users-search" type="search" placeholder="Buscar usuario ou e-mail">
              </label>
              <button class="btn primary" type="button" id="admin-invite-btn">+ Convidar usuario</button>
            </div>
          </div>
          <div class="config-users-filters">
            <label>
              Perfil
              <select id="admin-role-filter" class="config-input">
                <option value="all">Todos</option>
                <option value="admin">Administrador</option>
                <option value="manager">Gestor de Projetos</option>
                <option value="viewer">Visualizador</option>
              </select>
            </label>
            <label>
              Status
              <select id="admin-status-filter" class="config-input">
                <option value="all">Todos</option>
                <option value="active">Ativo</option>
                <option value="pending">Pendente</option>
                <option value="disabled">Desativado</option>
              </select>
            </label>
            <button class="btn sm ghost" type="button" id="admin-clear-filters">Limpar filtros</button>
          </div>
          <div class="config-users-table">
            <div class="config-users-head">
              <div>Usuario</div>
              <div>Perfil</div>
              <div>Status</div>
              <div>Ultimo login</div>
              <div></div>
            </div>
            <div id="admin-users-list" class="config-users-body">Carregando usuarios...</div>
          </div>
          <div class="config-hint">Use "Resetar senha" para enviar o e-mail de redefinicao ao usuario.</div>
        </div>

        <div class="config-user-drawer" id="admin-user-drawer" aria-hidden="true">
          <div class="config-user-drawer-backdrop" data-drawer-close></div>
          <div class="config-user-drawer-panel">
            <div class="drawer-header">
              <div>
                <div class="drawer-title">Usuario selecionado</div>
                <div class="drawer-subtitle" id="drawer-user-email">-</div>
              </div>
              <button class="btn sm ghost" type="button" data-drawer-close>
                <i data-lucide="x"></i>
              </button>
            </div>
            <div class="drawer-body">
              <label>
                Nome
                <input id="drawer-user-name" class="config-input" type="text" placeholder="Nome do usuario">
              </label>
              <label>
                Perfil
                <select id="drawer-user-role" class="config-input">
                  <option value="viewer">Visualizador</option>
                  <option value="manager">Gestor de Projetos</option>
                  <option value="admin">Administrador</option>
                </select>
              </label>
            </div>
            <div class="drawer-actions">
              <button class="btn sm ghost" type="button" id="drawer-toggle-status-btn" style="color:#ef4444;">Desativar usuario</button>
              <button class="btn sm ghost" type="button" id="drawer-reset-btn">Resetar senha</button>
              <button class="btn sm primary" type="button" id="drawer-save-btn">Salvar alteracoes</button>
            </div>
            <p id="drawer-status" class="config-message"></p>
          </div>
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

  if (window.lucide) {
    window.lucide.createIcons();
  }

  if (admin) {
    if (!state.adminUserFilters) {
      state.adminUserFilters = { query: "", role: "all", status: "all" };
    }

    const searchInput = byId("admin-users-search");
    if (searchInput) {
      searchInput.value = state.adminUserFilters.query || "";
      if (!searchInput.dataset.wired) {
        searchInput.addEventListener("input", () => {
          state.adminUserFilters.query = searchInput.value;
          applyAdminUserFilters();
        });
        searchInput.dataset.wired = "true";
      }
    }

    const roleFilter = byId("admin-role-filter");
    if (roleFilter) {
      roleFilter.value = state.adminUserFilters.role || "all";
      if (!roleFilter.dataset.wired) {
        roleFilter.addEventListener("change", () => {
          state.adminUserFilters.role = roleFilter.value;
          applyAdminUserFilters();
        });
        roleFilter.dataset.wired = "true";
      }
    }

    const statusFilter = byId("admin-status-filter");
    if (statusFilter) {
      statusFilter.value = state.adminUserFilters.status || "all";
      if (!statusFilter.dataset.wired) {
        statusFilter.addEventListener("change", () => {
          state.adminUserFilters.status = statusFilter.value;
          applyAdminUserFilters();
        });
        statusFilter.dataset.wired = "true";
      }
    }

    const clearFiltersBtn = byId("admin-clear-filters");
    if (clearFiltersBtn && !clearFiltersBtn.dataset.wired) {
      clearFiltersBtn.addEventListener("click", () => {
        state.adminUserFilters = { query: "", role: "all", status: "all" };
        if (searchInput) searchInput.value = "";
        if (roleFilter) roleFilter.value = "all";
        if (statusFilter) statusFilter.value = "all";
        applyAdminUserFilters();
      });
      clearFiltersBtn.dataset.wired = "true";
    }

    const inviteBtn = byId("admin-invite-btn");
    if (inviteBtn && !inviteBtn.dataset.wired) {
      inviteBtn.addEventListener("click", () => openInviteUserModal());
      inviteBtn.dataset.wired = "true";
    }


    loadAdminUsers();
    loadAdminGroups();
    wireAdminUserDrawer();

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
    state.usersLoadDenied = false;
    const user = auth?.currentUser;
    if (user) await syncUserProfile(user);
    let users = await loadUsersFromDb();
    if (state.usersLoadDenied) {
      const fn = getFirebaseFunctions();
      const listUsersByAdmin = fn?.httpsCallable?.("listUsersByAdmin");
      if (listUsersByAdmin) {
        try {
          const res = await listUsersByAdmin({});
          users = res?.data?.users || [];
          state.usersLoadDenied = false;
        } catch (fnErr) {
          console.warn("listUsersByAdmin falhou:", fnErr);
        }
      }
    }
    state.users = (users || []).slice();
    if (state.usersLoadDenied) {
      list.innerHTML = "<div class=\"muted\">Sem permissao para listar usuarios. Verifique se seu perfil esta configurado como administrador.</div>";
    } else {
      renderAdminUsers(list, getFilteredAdminUsers(users));
    }
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
    const user = auth?.currentUser;
    if (user) await syncUserProfile(user);
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
      const name = escapeHtml(user.displayName || user.email || "Usuario");
      const role = normalizeUserRole(user.role);
      const roleClass = role === "admin" ? "role-admin" : role === "manager" ? "role-manager" : "role-viewer";
      const status = getAdminUserStatus(user);
      const lastLoginLabel = getAdminUserLastLoginLabel(user);
      return `
        <div class="config-user-row" data-user-id="${escapeHtml(user.uid)}" data-user-email="${email}">
          <div class="config-user-main">
            <div class="config-user-name">${name}</div>
            <div class="config-user-email">${email || "-"}</div>
          </div>
          <div>
            <span class="config-badge ${roleClass}">${roleLabel(role)}</span>
          </div>
          <div>
            <span class="config-badge ${status.className}">${status.label}</span>
          </div>
          <div class="config-user-last">${lastLoginLabel}</div>
          <div class="config-user-actions">
            <button class="btn sm ghost" type="button" data-user-open title="Detalhes">
              <i data-lucide="more-horizontal"></i>
            </button>
            <button class="btn sm danger" type="button" data-user-delete title="Excluir perfil">
              <i data-lucide="trash-2"></i>
            </button>
          </div>
        </div>
      `;
    })
    .join("");

  container.innerHTML = rows || "<div class=\"muted\">Nenhum usuario encontrado.</div>";

  if (!container.dataset.wired) {
    container.addEventListener("click", async (e) => {
      const deleteBtn = e.target.closest("[data-user-delete]");
      if (deleteBtn) {
        const row = deleteBtn.closest("[data-user-id]");
        if (!row) return;
        const uid = row.dataset.userId || "";
        const email = row.dataset.userEmail || "";
        if (!uid) return;
        if (auth?.currentUser?.uid === uid) {
          alert("Nao e possivel excluir o proprio perfil.");
          return;
        }
        if (isAdminEmail(email)) {
          alert("Nao e possivel excluir o administrador principal.");
          return;
        }
        const confirmed = window.confirm(`Excluir o perfil de ${email || "este usuario"}?`);
        if (!confirmed) return;
        deleteBtn.disabled = true;
        try {
          await deleteUserFromDb(uid);
          state.users = (state.users || []).filter((item) => item.uid !== uid);
          applyAdminUserFilters();
          await loadAdminGroups();
          closeAdminUserDrawer();
        } catch (err) {
          console.error(err);
          alert("Erro ao excluir usuario.");
        } finally {
          deleteBtn.disabled = false;
        }
        return;
      }

      const row = e.target.closest("[data-user-id]");
      if (!row) return;
      const isOpen = e.target.closest("[data-user-open]") || e.target.closest(".config-user-row");
      if (!isOpen) return;
      const uid = row.dataset.userId || "";
      const user = (state.users || []).find((item) => item.uid === uid);
      openAdminUserDrawer(user);
    });
    container.dataset.wired = "true";
  }

  if (window.lucide) {
    window.lucide.createIcons();
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

  if (state.currentSection === "dashboard-melhorias") {
    renderImprovementsDashboard(panels);
    finalizeRender();
    return;
  }

  if (state.currentSection === "minhas-melhorias") {
    // No dedicated detail screen for improvements; keep user on Kanban.
    state.currentSection = "dashboard-melhorias";
    setActiveNav(state.currentSection);
    renderImprovementsDashboard(panels);
    finalizeRender();
    return;
  }

  if (state.currentSection === "portfolio") {
    renderPortfolio(panels);
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

  const tasks = selectedProject.tasks || [];
  const metrics = projectMetrics(tasks);
  const status = projectStatus(selectedProject, metrics);
  const statusBadge = statusInfo(status);
  const scheduleBadge = scheduleStatusInfo(projectScheduleStatus(selectedProject));
  // Realizado: refletir o % informado nas atividades (folhas), nao apenas "concluidas/total".
  const progressPct = clampPct(tasks.length ? progressPctFromTasks(tasks) : (metrics.progress ?? selectedProject.progress ?? 0));

  // Previsto (baseline): usar o mesmo calculo do cronograma (rollupBaselinePct por tarefa-folha).
  const baselinePct = rollupBaselinePct(leafTasksForProgress(tasks));
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
  const projectCost = resolveProjectCost(selectedProject);
  const costLabel = formatCurrency(projectCost);
  const tasksWithIdx = tasks.map((t, idx) => ({ ...(t || {}), _idx: idx }));
  const sparkRealized = renderSparklineSvg(buildSparklineSeries(progressPct), {
    stroke: "var(--accent)",
    fill: "var(--accent-soft)"
  });
  const sparkBaseline = renderSparklineSvg(buildSparklineSeries(baselinePct), {
    stroke: "var(--muted)",
    fill: "rgba(148, 163, 184, 0.14)"
  });
  const gapSparkPalette = {
    "gap-ok": { stroke: "#16a34a", fill: "rgba(22, 163, 74, 0.12)" },
    "gap-low": { stroke: "#d97706", fill: "rgba(245, 158, 11, 0.12)" },
    "gap-risk": { stroke: "#b45309", fill: "rgba(245, 158, 11, 0.16)" },
    "gap-delayed": { stroke: "#ea580c", fill: "rgba(234, 88, 12, 0.18)" },
    "gap-critical": { stroke: "#9b1c23", fill: "rgba(155, 28, 35, 0.14)" }
  };
  const gapSparkTone = gapSparkPalette[gapStatus.className] || gapSparkPalette["gap-risk"];
  const gapSparkBase = 100 - Math.min(Math.abs(gap) * 2, 60);
  const sparkGap = renderSparklineSvg(buildSparklineSeries(gapSparkBase), gapSparkTone);
  // Curva S removida da tela principal (mantida apenas no OnePage).
  const emptyIllustration = `
    <svg class="empty-illustration" viewBox="0 0 64 40" role="img" aria-hidden="true">
      <rect x="4" y="8" width="56" height="24" rx="6" fill="none" stroke="currentColor" stroke-width="2"></rect>
      <line x1="16" y1="18" x2="48" y2="18" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>
      <line x1="16" y1="26" x2="38" y2="26" stroke="currentColor" stroke-width="2" stroke-linecap="round"></line>
    </svg>
  `;
  const renderSideEmpty = (label) => `
    <div class="side-empty">
      ${emptyIllustration}
      <span>${label}</span>
    </div>
  `;
  const milestoneItems = upcomingMilestones(tasks, 4);
  const milestoneList = milestoneItems.length
    ? `<ul class="side-list">
        ${milestoneItems
          .map(({ task, due }) => {
            const title = escapeHtml(task?.title || "Atividade");
            const phase = normalizePhaseLabel(task?.phase || "");
            const dueLabel = due ? formatDateBR(due) : "-";
            return `<li><span class="side-item-title">${title}</span><span class="side-item-meta">${phase} | ${dueLabel}</span></li>`;
          })
          .join("")}
      </ul>`
    : renderSideEmpty("Sem marcos proximos.");
  const logItems = latestCompletedTasks(tasks, 4);
  const logList = logItems.length
    ? `<ul class="side-list">
        ${logItems
          .map((task) => {
            const title = escapeHtml(task?.title || "Atividade");
            const doneLabel = formatDateBR(activityDoneDate(task) || taskDueStr(task)) || "-";
            return `<li><span class="side-item-title">${title}</span><span class="side-item-meta">Concluido | ${doneLabel}</span></li>`;
          })
          .join("")}
      </ul>`
    : renderSideEmpty("Sem logs recentes.");

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
        <button class="btn sm primary" type="button" data-open-expense>Adicionar despesa</button>
      </div>
    </div>
    <div class="project-strip">
      <div class="project-strip-item">
        <span class="project-strip-ico pm" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 21a8 8 0 0 0-16 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          </svg>
        </span>
        <div class="project-strip-text">
          <span class="k">PM responsavel</span>
          <span class="v">${escapeHtml(selectedProject.developer || "A definir")}</span>
        </div>
      </div>
      <div class="project-strip-item">
        <span class="project-strip-ico kick" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M8 2v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M16 2v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M3 10h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M5 6h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          </svg>
        </span>
        <div class="project-strip-text">
          <span class="k">Kick-off</span>
          <span class="v">${formatDateBR(selectedProject.start) || "-"}</span>
        </div>
      </div>
      <div class="project-strip-item">
        <span class="project-strip-ico deadline" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M6 3h12v18H6V3Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M9 7h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M9 11h6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M9 15h4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </span>
        <div class="project-strip-text">
          <span class="k">Deadline</span>
          <span class="v">${formatDateBR(selectedProject.end) || "-"}</span>
        </div>
      </div>
    </div>
  `;

  const performanceGrid = document.createElement("div");
  performanceGrid.className = "metrics-grid performance-grid project-performance-grid";
  const teamMembersRaw = Array.isArray(selectedProject.team) ? selectedProject.team : [];
  const teamNames = teamMembersRaw.map((m) => normalizeTeamMemberName(m?.name)).filter(Boolean);
  const uniqTeam = [];
  teamNames.forEach((n) => {
    if (uniqTeam.some((x) => normHeader(x) === normHeader(n))) return;
    uniqTeam.push(n);
  });
  const teamShown = uniqTeam.slice(0, 4);
  const teamBadges = teamShown
    .map((name) => `<span class="avatar-chip" title="${escapeHtml(name)}">${escapeHtml(initialsFromName(name))}</span>`)
    .join("");
  const teamMore = uniqTeam.length > teamShown.length ? `+${uniqTeam.length - teamShown.length}` : "";
  const gapTrendLabel = gap > 0 ? "Tendencia de atraso" : gap < 0 ? "Tendencia adiantada" : "No prazo";
  performanceGrid.innerHTML = `
    <div class="metric-card card--kpi performance-card realizado">
      <div class="kpi-top">
        <div class="label">Progresso real</div>
        <span class="kpi-ico realizado" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M9 12l2 2 4-6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 22a10 10 0 1 0-10-10 10 10 0 0 0 10 10Z" stroke="currentColor" stroke-width="2"/>
          </svg>
        </span>
      </div>
      <div class="value">${progressPct}%</div>
      <div class="sub">${metrics.done} de ${metrics.total} concluidas</div>
    </div>
    <div class="metric-card card--kpi performance-card previsto">
      <div class="kpi-top">
        <div class="label">Previsto (Baseline)</div>
        <span class="kpi-ico previsto" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M8 2v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M16 2v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M3 10h18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M5 6h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          </svg>
        </span>
      </div>
      <div class="value">${baselineLabel}%</div>
      <div class="sub">Meta para hoje</div>
    </div>
    <div class="metric-card card--kpi performance-card gap ${gapStatus.className}">
      <div class="kpi-top">
        <div class="label">GAP de desvio</div>
        <span class="kpi-ico gap" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 9v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M12 17h.01" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            <path d="M10.3 3.5L2.6 17a2 2 0 0 0 1.7 3h15.4a2 2 0 0 0 1.7-3L13.7 3.5a2 2 0 0 0-3.4 0Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          </svg>
        </span>
      </div>
      <div class="value">${gapLabel}pp</div>
      <div class="sub">${gapTrendLabel}</div>
    </div>
    <div class="metric-card card--kpi performance-card squad">
      <div class="kpi-top">
        <div class="label">Squad ativa</div>
        <span class="kpi-ico squad" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M20 21a8 8 0 0 0-16 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M12 13a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M22 21a7 7 0 0 0-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </span>
      </div>
      <div class="value kpi-avatars">
        ${teamBadges || `<span class="members-empty">-</span>`}
        ${teamMore ? `<span class="avatar-more" title="Mais ${escapeHtml(String(uniqTeam.length - teamShown.length))}">${escapeHtml(teamMore)}</span>` : ""}
      </div>
      <div class="sub">${uniqTeam.length ? `${uniqTeam.length} especialistas` : "Sem equipe cadastrada"}</div>
    </div>
    <button class="metric-card card--kpi performance-card cost is-clickable" type="button" data-open-financials>
      <div class="kpi-top">
        <div class="label">Custo do projeto</div>
        <span class="kpi-ico cost" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M12 1v22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7H14a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
      </div>
      <div class="value">${costLabel}</div>
      <div class="sub">Clique para detalhes</div>
    </button>
  `;

  const requiredPhases = Array.isArray(selectedProject.epics) ? selectedProject.epics : [];
  const searchQuery = String(state.projectTaskSearch || "").trim();
  const searchKey = normHeader(searchQuery);
  const matchesSearch = (task) => {
    if (!searchKey) return true;
    const title = normHeader(taskTitle(task) || "");
    const pkg = normHeader(extractPackageLabel(task) || "");
    const phase = normHeader(normalizePhaseLabel(task?.phase || "OUTROS"));
    return title.includes(searchKey) || pkg.includes(searchKey) || phase.includes(searchKey);
  };
  const tasksForView = searchKey ? tasksWithIdx.filter((t) => matchesSearch(t)) : tasksWithIdx;
  const tasksCard = document.createElement("div");
  tasksCard.className = "card scroll-card";
  tasksCard.innerHTML = `
    <div class="card-head">
      <h3>Cronograma de Atividades</h3>
      <div class="card-actions">
        <div class="task-search">
          <span class="task-search-ico" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M21 21l-4.3-4.3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z" stroke="currentColor" stroke-width="2"/>
            </svg>
          </span>
          <input type="search" placeholder="Buscar..." value="${escapeHtml(searchQuery)}" data-task-search>
        </div>
        <button class="btn sm ghost" type="button" data-import-cronograma>Importar Cronograma</button>
        <button class="btn sm ghost" type="button" data-add-epic>+ Novo Epico</button>
        <button class="btn sm primary" type="button" data-open-activity>+ Nova Atividade</button>
      </div>
    </div>`;
  const tasksBox = document.createElement("div");
  tasksBox.className = "tasks";
  tasksBox.dataset.preserveScroll = `tasks-${selectedProject.id || selectedProject.name || "default"}`;
  const tasksHeader = document.createElement("div");
  tasksHeader.className = "task-row header";
  tasksHeader.innerHTML = `
    <div class="col-spi">SPI</div>
    <div>Atividade / Epico</div>
    <div class="col-pct">% Planej.</div>
    <div class="col-pct">% Concl.</div>
    <div class="col-dur">Duracao</div>
    <div>Inicio</div>
    <div>Termino</div>
    <div>Resp.</div>
  `;
  tasksBox.appendChild(tasksHeader);

  const grouped = groupTasksByPhase(tasksForView, requiredPhases);
  if (!grouped.length) {
    const empty = document.createElement("div");
    empty.className = "empty";
    empty.textContent = searchKey ? "Nenhuma atividade encontrada para sua busca." : "Nenhuma atividade cadastrada.";
    tasksBox.appendChild(empty);
  } else {
    const todayTs = todayStartTs();
    const reorderableEpics = new Set(requiredPhases.map((p) => normalizePhaseLabel(p)));
    const parseMembers = (task) => {
      return parseTaskMembersList(task).slice(0, 6);
    };

    const groupMembersHtml = (phase) => {
      const p = normalizePhaseLabel(phase || "OUTROS");
      const policy = buildProjectMembersPolicy(state.selectedProject, state.selectedClient);
      const rule = phaseMembersRule(p);
      const out = [];
      if (rule.needsLeader && policy.leader) out.push(policy.leader);
      if (rule.needsDev) {
        if (policy.developers.length) out.push(...policy.developers.slice(0, 2));
        else if (policy.defaultDev) out.push(policy.defaultDev);
      }
      // De-dup (same person could be both leader/dev in some configs).
      const uniq = [];
      out.forEach((name) => {
        const n = normalizeTeamMemberName(name);
        if (!n) return;
        if (uniq.some((u) => normHeader(u) === normHeader(n))) return;
        uniq.push(n);
      });
      if (!uniq.length) return `<span class="resp-badge empty">-</span>`;
      const shown = uniq.slice(0, 2);
      const badges = shown
        .map((name) => `<span class="resp-badge" title="${escapeHtml(name)}">${escapeHtml(initialsFromName(name))}</span>`)
        .join("");
      const more =
        uniq.length > shown.length
          ? `<span class="resp-badge empty" title="Mais ${uniq.length - shown.length}">+${uniq.length - shown.length}</span>`
          : "";
      return `<div class="resp-cell">${badges}${more}</div>`;
    };

    const membersHtml = (task, idx) => {
      const phase = normalizePhaseLabel(task?.phase || "OUTROS");
      const policy = buildProjectMembersPolicy(state.selectedProject, state.selectedClient);
      const rule = phaseMembersRule(phase);
      const stored = parseMembers(task);
      const effective = stored.length ? stored : computeEffectiveMembersForTask(task, state.selectedProject, state.selectedClient);

      const needsDevPick =
        rule.needsDev &&
        policy.developers.length > 1 &&
        !hasAnyDeveloperSelected(task, state.selectedProject, state.selectedClient);

      if (!effective.length && !needsDevPick) return `<span class="resp-badge empty">-</span>`;

      const primary = effective.length ? effective[0] : "";
      const tag = primary
        ? `<span class="resp-badge" title="${escapeHtml(primary)}">${escapeHtml(initialsFromName(primary))}</span>`
        : ``;
      const pickBtn = needsDevPick
        ? `<button type="button" class="resp-badge pick" data-members-pick data-task-index="${idx}" title="Selecionar desenvolvedor">-</button>`
        : "";
      return `<div class="resp-cell">${tag}${pickBtn}</div>`;
    };

    const scheduleForTask = (task) => {
      if (isDoneTask(task)) return { label: "Em dia", className: "schedule-status em-dia" };
      const due = parseTaskDate(taskDueStr(task));
      if (!due) return { label: "Sem prazo", className: "sem-prazo" };
      const dueTs = startOfDay(due).getTime();
      if (dueTs < todayTs) return { label: "Em atraso", className: "schedule-status em-atraso" };
      return { label: "Em dia", className: "schedule-status em-dia" };
    };

    const scheduleForTasks = (items) => {
      const list = Array.isArray(items) ? items : [];
      const open = list.filter((t) => !isDoneTask(t));
      if (!open.length) return { label: "Em dia", className: "schedule-status em-dia" };
      let hasDue = false;
      let hasOverdue = false;
      open.forEach((t) => {
        const due = parseTaskDate(taskDueStr(t));
        if (!due) return;
        hasDue = true;
        const dueTs = startOfDay(due).getTime();
        if (dueTs < todayTs) hasOverdue = true;
      });
      if (!hasDue) return { label: "Sem prazo", className: "sem-prazo" };
      if (hasOverdue) return { label: "Em atraso", className: "schedule-status em-atraso" };
      return { label: "Em dia", className: "schedule-status em-dia" };
    };

    const rollupForTasks = (items) => {
      const list = Array.isArray(items) ? items : [];
      const startTs = list
        .map((t) => parseTaskDate(taskStartStr(t))?.getTime() ?? null)
        .filter((v) => v != null);
      const dueTs = list
        .map((t) => parseTaskDate(taskDueStr(t))?.getTime() ?? null)
        .filter((v) => v != null);
      const startLabel = startTs.length ? formatDateBR(new Date(Math.min(...startTs))) : "-";
      const endLabel = dueTs.length ? formatDateBR(new Date(Math.max(...dueTs))) : "-";
      const progress = weightedProgressPct(list);
      // Rollup rule:
      // - Concluido only when ALL children are done (status concluido OR progress 100).
      // - Em andamento when ANY child has work started or status is not "nao iniciado" (planejado),
      //   even if some tasks are still "nao iniciado".
      const isDoneLike = (t) => isDoneTask(t) || taskProgressValue(t) >= 100;
      const isActiveLike = (t) => {
        if (!t) return false;
        if (isDoneLike(t)) return false;
        const st = normalizeTaskStatus(getTaskStatus(t));
        if (st && st !== "planejado") return true;
        const p = taskProgressValue(t);
        return p > 0 && p < 100;
      };
      const allDone = list.length && list.every((t) => isDoneLike(t));
      const anyInProgress = list.some((t) => isActiveLike(t));
      const statusKey = allDone ? "concluido" : anyInProgress ? "em_andamento" : "planejado";
      const status = taskStatusInfo(statusKey);
      status.value = statusKey;
      const schedule = scheduleForTasks(list);
      return { startLabel, endLabel, progress, status, schedule };
    };

    const toneKeyFromStatus = (statusKey) => {
      const k = normalizeTaskStatus(statusKey);
      if (k === "concluido") return "done";
      if (k === "em_andamento" || k === "em_validacao" || k === "atrasado") return "active";
      return "pending";
    };

    const progressCellHtml = (pct, clickable, idx, tone = "pending") => {
      const safe = clampPct(pct ?? 0);
      const bar = `<span class="tree-progress ${tone}"><i style="width:${safe}%"></i></span><span class="tree-progress-label">${safe}%</span>`;
      if (!clickable) return `<div class="tree-progress-wrap">${bar}</div>`;
      return `
        <button type="button" class="task-progress-btn tree-progress-btn" data-task-index="${idx}" aria-label="Editar percentual">
          <span class="tree-progress-wrap">${bar}</span>
        </button>
      `;
    };

    const isProjectCollapsed = !!state.collapsedPhases.__project__;
    const parentKeySet = new Set(
      tasks
        .map((t) => ({ phase: normalizePhaseLabel(t?.phase || "OUTROS"), pkg: extractPackageLabel(t) }))
        .filter((x) => x.pkg)
        .map((x) => `${x.phase}::${normHeader(x.pkg)}`)
    );
    const projectLeafTasks = tasks.filter((t) => !parentKeySet.has(`${normalizePhaseLabel(t?.phase || "OUTROS")}::${normHeader(t?.title || "")}`));
    const projectRollup = rollupForTasks(projectLeafTasks);
    const projSpi = rollupSPI(projectLeafTasks);
    const projBaselinePctVal = rollupBaselinePct(projectLeafTasks);
    const projectRow = document.createElement("div");
    projectRow.className = "task-row tree-row tree-row--project";
    projectRow.dataset.projectToggle = "1";
    projectRow.style.setProperty("--level", 0);
    projectRow.innerHTML = `
      <div class="col-spi">${spiIndicatorHtml(projSpi)}</div>
      <div class="tree-title">
        <span class="tree-caret ${isProjectCollapsed ? "collapsed" : ""}">▾</span>
        <span class="tree-ico project" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path d="M3 9l9-6 9 6v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
            <path d="M9 22V12h6v10" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
          </svg>
        </span>
        <span class="tree-label">${escapeHtml(selectedProject.name || "Projeto")}</span>
      </div>
      <div class="col-pct">${projBaselinePctVal}%</div>
      <div class="col-pct">${projectRollup.progress}%</div>
      <div class="col-dur">${rollupDurationLabel(projectLeafTasks)}</div>
      <div class="task-date">${projectRollup.startLabel}</div>
      <div class="task-date">${projectRollup.endLabel}</div>
      <span class="members-empty">-</span>
    `;
    tasksBox.appendChild(projectRow);

    if (!isProjectCollapsed) {
    grouped.forEach(({ phase, tasks, subEpics, isEmpty }) => {
      const isCollapsed = !!state.collapsedPhases[phase];
      const phaseParentKeys = new Set(
        subEpics
          .map((s) => s?.title)
          .filter(Boolean)
          .map((t) => `${phase}::${normHeader(t)}`)
      );
      const allPhaseLeafTasks = tasks
        .filter((t) => !phaseParentKeys.has(`${phase}::${normHeader(t?.title || "")}`))
        .concat(subEpics.flatMap((s) => s.tasks || []));
      const epicRollup = rollupForTasks(allPhaseLeafTasks);
      const epicRow = document.createElement("div");
      epicRow.className = "task-row tree-row tree-row--epic";
      epicRow.dataset.phaseToggle = phase;
      epicRow.dataset.dropKind = "epic";
      epicRow.dataset.dropPhase = phase;
      // Reorder only epics explicitly configured for this project (not auxiliary phases like OUTROS).
      if (reorderableEpics.has(phase)) {
        epicRow.draggable = true;
        epicRow.dataset.epicReorder = "1";
        epicRow.dataset.dragEpicPhase = phase;
      }
      epicRow.style.setProperty("--level", 1);
      const epicSpi = rollupSPI(allPhaseLeafTasks);
      const epicBaselinePctVal = rollupBaselinePct(allPhaseLeafTasks);
      epicRow.innerHTML = `
        <div class="col-spi">${spiIndicatorHtml(epicSpi)}</div>
        <div class="tree-title">
          <span class="tree-caret ${isCollapsed ? "collapsed" : ""}">▾</span>
          <span class="tree-ico epic" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path d="M3 7h6l2 2h10v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
              <path d="M3 7a2 2 0 0 1 2-2h4l2 2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </span>
          <span class="tree-label tree-label--epic">${escapeHtml(phase)}</span>
        </div>
        <div class="col-pct">${epicBaselinePctVal}%</div>
        <div class="col-pct">${epicRollup.progress}%</div>
        <div class="col-dur">${rollupDurationLabel(allPhaseLeafTasks)}</div>
        <div class="task-date">${epicRollup.startLabel}</div>
        <div class="task-date">${epicRollup.endLabel}</div>
        <div class="members-cell">
          ${groupMembersHtml(phase)}
          <button class="btn sm ghost task-action-btn" data-epic-action="1" data-epic-phase="${escapeHtml(phase)}">...</button>
        </div>
      `;
      tasksBox.appendChild(epicRow);

      if (isEmpty) {
        const empty = document.createElement("div");
        empty.className = "empty";
        empty.textContent = "Nenhuma atividade neste epico.";
        if (!isCollapsed) tasksBox.appendChild(empty);
      }
      if (subEpics.length && !isCollapsed) {
        const project = state.selectedProject;
        const packageParents = getProjectPackageParents(project);

        const macroNodesByLabel = new Map();
        subEpics.forEach((sub) => {
          const label = normalizePackageLabel(sub?.title || "");
          if (!label) return;
          macroNodesByLabel.set(label, {
            label,
            tasks: Array.isArray(sub.tasks) ? sub.tasks : [],
            children: [],
            _parent: ""
          });
        });

        // Ensure macro ancestors exist as nodes, so you can nest macros under an "anchor" label
        // even when that parent macro has no tasks directly inside it.
        const ensureMacroNode = (label) => {
          const l = normalizePackageLabel(label);
          if (!l) return;
          if (macroNodesByLabel.has(l)) return;
          macroNodesByLabel.set(l, { label: l, tasks: [], children: [], _parent: "" });
        };
        macroNodesByLabel.forEach((node) => {
          const visited = new Set([normalizePackageLabel(node.label)]);
          let p = normalizePackageLabel(packageParents[node.label] || "");
          while (p) {
            if (visited.has(p)) break;
            visited.add(p);
            ensureMacroNode(p);
            p = normalizePackageLabel(packageParents[p] || "");
          }
        });

        const macroTitleKeySet = new Set(Array.from(macroNodesByLabel.keys()).map((x) => normHeader(x)));

        const isCycleCandidate = (child, parent) => {
          const c = normalizePackageLabel(child);
          let p = normalizePackageLabel(parent);
          if (!c || !p) return false;
          const visited = new Set();
          while (p) {
            if (p === c) return true;
            if (visited.has(p)) return true;
            visited.add(p);
            p = normalizePackageLabel(packageParents[p] || "");
          }
          return false;
        };

        // assign parents
        macroNodesByLabel.forEach((node) => {
          const parent = normalizePackageLabel(packageParents[node.label] || "");
          if (!parent) return;
          if (!macroNodesByLabel.has(parent)) return;
          if (parent === node.label) return;
          if (isCycleCandidate(node.label, parent)) return;
          node._parent = parent;
        });

        // link children + roots
        const roots = [];
        macroNodesByLabel.forEach((node) => {
          if (node._parent && macroNodesByLabel.has(node._parent)) {
            macroNodesByLabel.get(node._parent).children.push(node);
          } else {
            roots.push(node);
          }
        });
        const sortNodes = (arr) =>
          (arr || []).sort((a, b) => (a?.label || "").localeCompare(b?.label || ""));
        sortNodes(roots);
        macroNodesByLabel.forEach((node) => sortNodes(node.children));

        const macroDisplayTitle = (label) => {
          const parentTask = tasks.find((t) => normHeader(t?.title) === normHeader(label));
          return parentTask?.title || label;
        };

        const collectMacroTasksDeep = (node) => {
          const out = [];
          const walk = (n) => {
            if (!n) return;
            (n.tasks || []).forEach((t) => out.push(t));
            (n.children || []).forEach((c) => walk(c));
          };
          walk(node);
          return out;
        };

        const macroNodeSortStartTs = (node) => {
          if (!node) return Number.POSITIVE_INFINITY;
          if (Number.isFinite(node._sortStartTs)) return node._sortStartTs;
          const list = collectMacroTasksDeep(node);
          const tsList = list
            .map((t) => parseTaskDate(taskStartStr(t))?.getTime() ?? null)
            .filter((v) => v != null);
          const ts = tsList.length ? Math.min(...tsList) : Number.POSITIVE_INFINITY;
          node._sortStartTs = ts;
          return ts;
        };

        const sortMacroNodesByStart = (arr) => {
          (arr || []).sort((a, b) => {
            const at = macroNodeSortStartTs(a);
            const bt = macroNodeSortStartTs(b);
            if (at !== bt) return at - bt;
            return (a?.label || "").localeCompare(b?.label || "");
          });
        };

        // Re-sort macros by earliest start date in their subtree (more intuitive than alphabetical).
        sortMacroNodesByStart(roots);
        macroNodesByLabel.forEach((n) => sortMacroNodesByStart(n.children));

        const macroLeafTasks = (node) => {
          const list = Array.isArray(node?.tasks) ? node.tasks : [];
          const leaf = list.filter((t) => !macroTitleKeySet.has(normHeader(t?.title || "")));
          // If a macro has only a single task whose title equals the macro label,
          // we still want something visible when expanded (otherwise the macro looks "empty").
          return leaf.length ? leaf : list;
        };

        const macroKeyFromPath = (pathLabels) => {
          const safe = (pathLabels || []).map((x) => normHeader(x)).filter(Boolean);
          return `${phase}::macro::${safe.join(">>")}`;
        };

        const renderTaskRow = (task, level, macroLabelForTitle = "") => {
          const row = document.createElement("div");
          row.className = "task-row tree-row tree-row--task";
          row.style.setProperty("--level", level);
          row.draggable = true;
          row.dataset.dragTaskIndex = task._idx;
          row.dataset.dropKind = "task";
          row.dataset.dropPhase = phase;
          row.dataset.dropTaskIndex = task._idx;
          row.dataset.dropTaskTitle = task.title || "";
          const info = taskStatusInfo(getTaskStatus(task));
          const health = taskHealthInfo(task);
          const title = macroLabelForTitle ? formatTaskTitle(task.title, macroLabelForTitle) : task.title;
          const startLabel = formatDateBR(taskStartStr(task));
          const endLabel = formatDateBR(taskDueStr(task));
          const progressValue = taskProgressValue(task);
          const tSpi = taskSPI(task);
          const tBaseline = taskBaselinePct(task);
          row.innerHTML = `
            <div class="col-spi">${spiIndicatorHtml(tSpi)}</div>
            <div class="tree-title">
              <span class="tree-ico task" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M7 3h7l3 3v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                  <path d="M14 3v4h4" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                </svg>
              </span>
              <span class="tree-label">${escapeHtml(title)}</span>
            </div>
            <div class="col-pct">${tBaseline}%</div>
            <div class="col-pct"><button type="button" class="task-progress-btn" data-task-index="${task._idx}" aria-label="Editar percentual">${progressValue}%</button></div>
            <div class="col-dur">${taskDurationLabel(task)}</div>
            <div class="task-date task-date-editable" data-edit-task-date="start" data-task-index="${task._idx}" tabindex="0" role="button" aria-label="Editar data inicio">${startLabel}</div>
            <div class="task-date task-date-editable" data-edit-task-date="due" data-task-index="${task._idx}" tabindex="0" role="button" aria-label="Editar data fim">${endLabel}</div>
            <div class="members-cell">
              ${membersHtml(task, task._idx)}
              <button class="btn sm ghost task-action-btn" data-task-action data-task-index="${task._idx}">...</button>
            </div>
          `;
          tasksBox.appendChild(row);
        };

        const renderMacroNode = (node, level, path) => {
          const key = macroKeyFromPath(path);
          const collapsed = !!state.collapsedPhases[key];
          const macroRollup = rollupForTasks(collectMacroTasksDeep(node));
          const macroRow = document.createElement("div");
          macroRow.className = "task-row tree-row tree-row--macro";
          macroRow.dataset.subEpicToggle = key;
          macroRow.dataset.dropKind = "macro";
          macroRow.dataset.dropPhase = phase;
          macroRow.dataset.dropMacroTitle = node.label;
          macroRow.draggable = true;
          macroRow.dataset.dragMacroTitle = node.label;
          macroRow.dataset.dragMacroPhase = phase;
          macroRow.style.setProperty("--level", level);
          const macroAllTasks = collectMacroTasksDeep(node);
          const macroSpi = rollupSPI(macroAllTasks);
          const macroBaselinePctVal = rollupBaselinePct(macroAllTasks);
          macroRow.innerHTML = `
            <div class="col-spi">${spiIndicatorHtml(macroSpi)}</div>
            <div class="tree-title">
              <span class="tree-caret ${collapsed ? "collapsed" : ""}">▾</span>
              <span class="tree-ico macro" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M12 3l9 4.5-9 4.5-9-4.5L12 3Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                  <path d="M3 12.5V17l9 4.5 9-4.5v-4.5" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                </svg>
              </span>
              <span class="tree-label">${escapeHtml(macroDisplayTitle(node.label))}</span>
            </div>
            <div class="col-pct">${macroBaselinePctVal}%</div>
            <div class="col-pct">${macroRollup.progress}%</div>
            <div class="col-dur">${rollupDurationLabel(macroAllTasks)}</div>
            <div class="task-date">${macroRollup.startLabel}</div>
            <div class="task-date">${macroRollup.endLabel}</div>
            <div class="members-cell">
              ${groupMembersHtml(phase)}
              <button class="btn sm ghost task-action-btn" data-macro-action="1" data-macro-phase="${escapeHtml(
                phase
              )}" data-macro-title="${escapeHtml(node.label)}">...</button>
            </div>
          `;
          tasksBox.appendChild(macroRow);

          if (collapsed) return;

          // children macros first
          (node.children || []).forEach((child) => {
            renderMacroNode(child, level + 1, [...path, child.label]);
          });

          // then leaf tasks that belong to this macro
          macroLeafTasks(node)
            .slice()
            .sort(compareTasksByStart)
            .forEach((task) => {
            renderTaskRow(task, level + 1, node.label);
          });
        };

        roots.forEach((root) => renderMacroNode(root, 2, [root.label]));
      }

      if (!isCollapsed) {
        // If a task is a "macro parent" (other tasks are inside it via Pacote=task.title), we hide it here
        // to avoid double-counting and duplicate display: the macro row above represents it.
        const macroParentTitleSet = new Set(subEpics.map((s) => normHeader(s.title)));
        tasks
          .filter((task) => !macroParentTitleSet.has(normHeader(task?.title || "")))
          .slice()
          .sort(compareTasksByStart)
          .forEach((task) => {
          const row = document.createElement("div");
          row.className = "task-row tree-row tree-row--task";
          row.style.setProperty("--level", 2);
          row.draggable = true;
          row.dataset.dragTaskIndex = task._idx;
          row.dataset.dropKind = "task";
          row.dataset.dropPhase = phase;
          row.dataset.dropTaskIndex = task._idx;
          row.dataset.dropTaskTitle = task.title || "";
          const info = taskStatusInfo(getTaskStatus(task));
          const startLabel = formatDateBR(taskStartStr(task));
          const endLabel = formatDateBR(taskDueStr(task));
          const progressValue = taskProgressValue(task);
          const looseSpi = taskSPI(task);
          const looseBaseline = taskBaselinePct(task);
          row.innerHTML = `
            <div class="col-spi">${spiIndicatorHtml(looseSpi)}</div>
            <div class="tree-title">
              <span class="tree-ico task" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none">
                  <path d="M7 3h7l3 3v15a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                  <path d="M14 3v4h4" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
                </svg>
              </span>
              <span class="tree-label">${escapeHtml(task.title)}</span>
            </div>
            <div class="col-pct">${looseBaseline}%</div>
            <div class="col-pct"><button type="button" class="task-progress-btn" data-task-index="${task._idx}" aria-label="Editar percentual">${progressValue}%</button></div>
            <div class="col-dur">${taskDurationLabel(task)}</div>
            <div class="task-date task-date-editable" data-edit-task-date="start" data-task-index="${task._idx}" tabindex="0" role="button" aria-label="Editar data inicio">${startLabel}</div>
            <div class="task-date task-date-editable" data-edit-task-date="due" data-task-index="${task._idx}" tabindex="0" role="button" aria-label="Editar data fim">${endLabel}</div>
            <div class="members-cell">
              ${membersHtml(task, task._idx)}
              <button class="btn sm ghost task-action-btn" data-task-action data-task-index="${task._idx}">...</button>
            </div>
          `;
          tasksBox.appendChild(row);
          });
      }
    });
    }
  }
  tasksCard.appendChild(tasksBox);

  const projectLayout = document.createElement("div");
  projectLayout.className = "project-layout span-all";
  const projectMain = document.createElement("div");
  projectMain.className = "project-main";
  projectMain.appendChild(performanceGrid);
  projectMain.appendChild(tasksCard);
  const projectSide = document.createElement("div");
  projectSide.className = "project-side";
  const milestonesCard = document.createElement("div");
  milestonesCard.className = "card project-side-card";
  milestonesCard.innerHTML = `
    <div class="card-head">
      <h4>Proximos marcos</h4>
    </div>
    ${milestoneList}
  `;
  const logsCard = document.createElement("div");
  logsCard.className = "card project-side-card";
  logsCard.innerHTML = `
    <div class="card-head">
      <h4>Logs recentes</h4>
    </div>
    ${logList}
  `;
  projectSide.appendChild(milestonesCard);
  projectSide.appendChild(logsCard);
  projectLayout.appendChild(projectMain);
  projectLayout.appendChild(projectSide);

  panels.appendChild(headerCard);
  panels.appendChild(projectLayout);

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

// --- Board Agile (React Integration) ---
function renderBoardApp(container) {
  container.innerHTML = `
    <div style="height: 100%; min-height: 70vh;">
      <iframe
        src="./board.html"
        title="Board Agile"
        style="border: 0; width: 100%; height: 100%; min-height: 70vh; border-radius: 14px; background: #020617;"
      ></iframe>
    </div>
  `;
}

    const navBtn = e.target.closest(".nav-link, .btn[data-section], .sidebar-user-logout");
    if (!navBtn) return;

    const section = navBtn.dataset.section;
    if (section === "relatorio") {
      // Open the OnePage in a separate tab with an explicit payload.
      // This avoids relying on the iframe/localStorage state and makes the report deterministic.
      const project = state.selectedProject;
      const client = state.selectedClient;
      if (!project || !client) {
        alert("Selecione um projeto antes de gerar o relatório.");
        return;
      }
      try {
        const payload = buildOnePagePayload(project, client);
        const key = `JP_ONEPAGE_PAYLOAD:${Date.now()}:${Math.random().toString(16).slice(2)}`;
        localStorage.setItem(key, JSON.stringify({ createdAt: Date.now(), payload }));
        const basePath = `onepage.html${buildOnePageQuery(project, client)}`;
        const url = `${basePath}${basePath.includes("?") ? "&" : "?"}payloadKey=${encodeURIComponent(key)}`;
        window.open(url, "_blank", "noopener,noreferrer");
      } catch (err) {
        console.error(err);
        alert("Falha ao gerar relatório. Veja o console.");
      }
      return;
    }
    if (section === "sair") {
      logout();
      return;
    }

    if (section === "meus-projetos") {
      navBtn.classList.toggle("open");
      return;
    }

    if (section === "melhorias") {
      state.currentSection = "dashboard-melhorias";
      setActiveNav(state.currentSection);
      renderMain();
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
  const financeModal = byId("finance-modal");
  const expenseModal = byId("expense-modal");
  const improvementModal = byId("improvement-modal");
  const improvementsReportModal = byId("improvements-report-modal");
  const monitorTaskModal = byId("monitor-task-modal");
  const ganttModal = byId("gantt-modal");
  const deleteProjectBtn = byId("delete-project-btn");
  const deleteClientBtn = byId("delete-client-btn");

  const openProjectBtn = byId("open-project-modal");
  const openImprovementBtn = byId("open-improvement-modal");
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
  if (openImprovementBtn) {
    openImprovementBtn.addEventListener("click", () => openImprovementModal(null));
  }
  document.body.addEventListener("click", (e) => {
    // Improvement modal tabs - delegado global para garantir que "Ações por Etapa" funcione
    const imprTab = e.target.closest("[data-imprm-tab]");
    if (imprTab) {
      const modal = imprTab.closest("#improvement-modal");
      if (modal) {
        e.preventDefault();
        e.stopPropagation();
        const panelId = imprTab.dataset.imprmTab || "detalhes";
        modal.querySelectorAll(".imprm-tab").forEach((t) => t.classList.remove("imprm-tab--active"));
        modal.querySelectorAll(".imprm-panel").forEach((p) => p.classList.remove("imprm-panel--active"));
        imprTab.classList.add("imprm-tab--active");
        const panel = modal.querySelector(`[data-imprm-panel="${panelId}"]`);
        if (panel) panel.classList.add("imprm-panel--active");
        return;
      }
    }
    if (e.target.closest("[data-open-activity]")) {
      openActivityModal("new");
      return;
    }
    if (e.target.closest("[data-add-epic]")) {
      const project = state.selectedProject;
      const client = state.selectedClient;
      if (!project || !client) {
        alert("Nenhum projeto selecionado.");
        return;
      }
      const name = promptNewEpicName();
      if (!name) return;
      const created = addEpicToProject(project, name);
      if (!created) {
        alert("Nome de epico invalido.");
        return;
      }
      // Persist new epic list and rerender; the epic row will appear even before tasks exist.
      if (db && project?.id && project?.clientId) {
        updateProjectEpicsOnDb(project.clientId, project.id, project.epics).catch((err) => console.error(err));
      } else {
        saveLocalState();
      }
      renderMain();
      return;
    }
    if (e.target.closest("[data-import-cronograma]")) {
      openImportCronograma();
      return;
    }
    const financeBtn = e.target.closest("[data-open-financials]");
    if (financeBtn) {
      openFinanceModal();
      return;
    }
    const expenseBtn = e.target.closest("[data-open-expense]");
    if (expenseBtn) {
      openExpenseModal(expenseBtn.dataset.openExpense || "despesa");
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
      if (financeModal) hideModal(financeModal);
      if (expenseModal) hideModal(expenseModal);
      if (improvementModal) hideModal(improvementModal);
      if (improvementsReportModal) hideModal(improvementsReportModal);
      if (monitorTaskModal) hideModal(monitorTaskModal);
      if (ganttModal) hideModal(ganttModal);
      resetProjectModal();
      resetClientModal();
      resetActivityModal();
      resetExpenseModal();
      resetImprovementModal();
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
        squadId: data.get("squadId") || "",
        team: readProjectTeamFromPicker(),
        start: data.get("start"),
        end: data.get("end"),
        client: clientName
      };
      const teamCheck = validateProjectTeam(payload.team);
      if (!teamCheck.ok) {
        alert(teamCheck.message);
        return;
      }

      if (state.editingProjectId) {
        if (db && state.selectedProject?.id && state.selectedProject?.clientId) {
          updateProjectOnDb(state.selectedProject.clientId, state.selectedProject.id, payload)
            .then(async () => {
              await loadStateFromDb();
              renderClientList();
              renderMain();
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
            renderClientList();
            renderMain();
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
        const newProject = { ...payload, squadId: payload.squadId || "", team: payload.team || [], tasks: [], epics: [], packages: [], financials: [] };
        newProject.packageParents = normalizePackageParentsMap(payload.packageParents || {});
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

  const expenseForm = byId("expense-form");
  if (expenseForm) {
    expenseForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const project = state.selectedProject;
      if (!project) {
        alert("Nenhum projeto selecionado.");
        return;
      }
      const data = new FormData(expenseForm);
      const amount = parseNumericValue(data.get("amount"));
      if (!Number.isFinite(amount) || amount <= 0) {
        alert("Informe um valor valido.");
        return;
      }
      const entry = {
        id: createFinanceEntryId(),
        type: normalizeFinanceType(data.get("type")),
        description: String(data.get("description") || "").trim(),
        amount,
        date: data.get("date") || "",
        createdAt: Date.now()
      };
      getProjectFinancials(project).push(entry);
      persistProjectFinancials(project);
      if (expenseModal) hideModal(expenseModal);
      resetExpenseModal();
      renderMain();
      openFinanceModal();
    });
  }

  const improvementForm = byId("improvement-form");
  if (improvementForm) {
    improvementForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const data = new FormData(improvementForm);
      const name = String(data.get("name") || "").trim();
      if (!name) {
        alert("Informe o nome da melhoria.");
        return;
      }
      const originRaw = String(data.get("origin") || "email").trim().toLowerCase();
      const origin = ["chamado", "chamado_interno", "reuniao", "diretoria"].includes(originRaw) ? originRaw : "email";
      const originRefRaw = String(data.get("originRef") || "").trim();
      const originRef = origin === "chamado" ? originRefRaw : "";
      if (origin === "chamado" && !originRef) {
        alert("Para origem Chamado, informe o número ou link do chamado.");
        return;
      }
      const estimateHoursRaw = String(data.get("estimateHours") || "").trim();
      const estimateHoursNum = estimateHoursRaw === "" ? null : Number(estimateHoursRaw);
      const estimateHours = Number.isFinite(estimateHoursNum) && estimateHoursNum >= 0 ? estimateHoursNum : null;
      const stage = normalizeImprovementStage(String(data.get("stage") || "triagem"));
      const stageInfo = IMPROVEMENT_STAGE_MAP.get(stage) || IMPROVEMENT_STAGES[0];
      const description = String(data.get("description") || "").trim();

      if (improvementRequiresEstimate(stage)) {
        if (estimateHours == null) {
          alert("Para avancar para Implementacao, informe a estimativa (horas).");
          return;
        }
        const executor = String(data.get("executor") || "").trim();
        if (!executor) {
          alert("Para avancar para Implementacao, informe o executor.");
          return;
        }
      }

      const stageNotes = improvementStageNotesFromForm(improvementForm);
      const existing =
        (state.improvements || []).find((it) => String(it?.id || "") === String(state.editingImprovementId || "")) || null;
      const logs = Array.isArray(existing?.logs) ? existing.logs : [];
      const prevStage = normalizeImprovementStage(existing?.stage || existing?.status || "triagem");
      const prevMaxStage = getImprovementMaxStageId(existing || { stage: prevStage });
      let clientApproval = existing?.clientApproval || null;
      const approvalFile = data.get("clientApproval");
      if (approvalFile && typeof approvalFile === "object" && approvalFile.size > 0) {
        try {
          const dataUrl = await readFileAsDataUrl(approvalFile);
          clientApproval = {
            name: approvalFile.name || "anexo",
            type: approvalFile.type || "",
            size: approvalFile.size || 0,
            dataUrl,
            uploadedAt: Date.now()
          };
        } catch (err) {
          console.error(err);
          alert("Nao foi possivel anexar o arquivo do cliente.");
          return;
        }
      }

      const missingStage = firstMissingStageNote(stageNotes, stage);
      if (missingStage) {
        alert(`Para avancar para ${stageLabelById(stage)}, descreva o que foi feito em ${stageLabelById(missingStage)}.`);
        // Keep modal open and focus the missing textarea.
        const modal = byId("improvement-modal");
        if (modal) focusImprovementStageNote(modal, missingStage);
        return;
      }
      if (stage === "concluido" && !hasClientApproval(clientApproval)) {
        alert("Para mover para Concluido, anexe o 'de acordo do cliente' na etapa de Validacao.");
        return;
      }

      // Lock notes from stages already passed before this save.
      const existingNotes = existing?.stageNotes || existing?.stageDetails || {};
      const lockRank = improvementStageRank(prevMaxStage);
      IMPROVEMENT_STAGE_ORDER.forEach((id) => {
        if (improvementStageRank(id) < lockRank) {
          stageNotes[id] = String(existingNotes?.[id] || "").trim();
        }
      });

      const nextMaxStage = computeMaxStageId(prevMaxStage, stage);
      const payload = {
        id: state.editingImprovementId || createImprovementId(),
        name,
        client: String(data.get("client") || "").trim(),
        owner: String(data.get("owner") || "").trim(),
        origin,
        originRef,
        description,
        stageNotes,
        logs,
        clientApproval,
        maxStage: nextMaxStage,
        estimateHours,
        estimator: String(data.get("estimator") || "").trim(),
        executor: String(data.get("executor") || "").trim(),
        stage,
        start: String(data.get("start") || "").trim(),
        end: String(data.get("end") || "").trim(),
        progress: stageInfo.progress
      };

      // Auto-log stage changes (not manual).
      if (existing && prevStage !== stage) {
        const tmp = { logs: payload.logs };
        appendImprovementLog(
          tmp,
          `Alterou etapa: ${stageLabelById(prevStage)} -> ${stageLabelById(stage)}.`
        );
        payload.logs = tmp.logs;
      }
      if (!Array.isArray(state.improvements)) state.improvements = [];
      const idx = state.improvements.findIndex((it) => it && it.id === payload.id);
      if (idx >= 0) state.improvements[idx] = { ...state.improvements[idx], ...payload };
      else state.improvements.push(payload);

      saveLocalState();
      if (improvementModal) hideModal(improvementModal);
      resetImprovementModal();
      renderMain();
    });
  }

  const clientForm = byId("client-form");
  if (clientForm) {
    clientForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleSaveClient();
    });
  }

  const squadAddBtn = byId("client-squad-add-btn");
  if (squadAddBtn && !squadAddBtn.dataset.wired) {
    squadAddBtn.addEventListener("click", async () => {
      const client = getClientFromModal();
      if (!client) {
        alert("Cliente nao encontrado.");
        return;
      }
      const nameInput = byId("client-squad-name");
      const membersInput = byId("client-squad-members");
      const name = normalizeSquadName(nameInput?.value || "");
      if (!name) {
        alert("Informe o nome do squad.");
        return;
      }
      client.squads = Array.isArray(client.squads) ? client.squads : [];
      const exists = client.squads.some((s) => normHeader(s?.name) === normHeader(name));
      if (exists) {
        alert("Ja existe um squad com esse nome.");
        return;
      }
      const members = parseSquadMembers(membersInput?.value || "");
      client.squads.push({ id: createSquadId(), name, members });

      if (db && client.id) {
        try {
          await updateClientSquadsOnDb(client.id, client.squads);
          await loadStateFromDb({
            clientId: client.id,
            projectId: state.selectedProject?.id,
            clientName: client.name,
            projectName: state.selectedProject?.name
          });
        } catch (err) {
          console.error(err);
          alert("Nao foi possivel salvar o squad no Firebase.");
          return;
        }
      } else {
        saveLocalState();
      }

      if (nameInput) nameInput.value = "";
      if (membersInput) membersInput.value = "";
      renderClientSquads();
      hydrateProjectSquadSelect(client.name);
    });
    squadAddBtn.dataset.wired = "true";
  }

  const squadsList = byId("client-squads-list");
  if (squadsList && !squadsList.dataset.wired) {
    squadsList.addEventListener("click", async (e) => {
      const item = e.target.closest(".squad-item");
      if (!item) return;
      const squadId = item.dataset.squadId;
      if (!squadId) return;
      const client = getClientFromModal();
      if (!client) return;
      client.squads = Array.isArray(client.squads) ? client.squads : [];
      const idx = client.squads.findIndex((s) => s.id === squadId);
      if (idx < 0) return;

      if (e.target.closest("[data-squad-delete]")) {
        const confirmed = window.confirm("Excluir este squad?");
        if (!confirmed) return;
        const removedId = client.squads[idx].id;
        client.squads.splice(idx, 1);
        // Clear assignment on projects that used this squad
        const affectedProjects = [];
        (client.projects || []).forEach((p) => {
          if (p.squadId === removedId) {
            p.squadId = "";
            affectedProjects.push(p);
          }
        });

        if (db && client.id) {
          try {
            await updateClientSquadsOnDb(client.id, client.squads);
            await Promise.all(
              affectedProjects
                .filter((p) => p?.id && p.squadId === "")
                .map((p) => updateProjectOnDb(client.id, p.id, p).catch(() => null))
            );
            await loadStateFromDb({ clientId: client.id, clientName: client.name });
          } catch (err) {
            console.error(err);
            alert("Nao foi possivel excluir o squad no Firebase.");
            return;
          }
        } else {
          saveLocalState();
          renderClientList();
          renderMain();
        }

        renderClientSquads();
        hydrateProjectSquadSelect(client.name);
        return;
      }

      if (e.target.closest("[data-squad-edit]")) {
        const current = client.squads[idx];
        const nextName = normalizeSquadName(window.prompt("Nome do squad:", current.name) || "");
        if (!nextName) return;
        const nextMembers = parseSquadMembers(window.prompt("Membros (separe por ; ou ,):", (current.members || []).join("; ")) || "");
        client.squads[idx] = { ...current, name: nextName, members: nextMembers };

        if (db && client.id) {
          try {
            await updateClientSquadsOnDb(client.id, client.squads);
            await loadStateFromDb({ clientId: client.id, clientName: client.name });
          } catch (err) {
            console.error(err);
            alert("Nao foi possivel atualizar o squad no Firebase.");
            return;
          }
        } else {
          saveLocalState();
        }
        renderClientSquads();
        hydrateProjectSquadSelect(client.name);
      }
    });
    squadsList.dataset.wired = "true";
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
      const rawContextPhase = String(activityForm.dataset.contextPhase || "").trim();
      const contextPhase = rawContextPhase ? normalizePhaseLabel(rawContextPhase) : "";
      const hasContextPackage = Object.prototype.hasOwnProperty.call(activityForm.dataset, "contextPackage");
      const contextPackage = hasContextPackage ? normalizePackageLabel(activityForm.dataset.contextPackage || "") : null;
      const progress = normalizeTaskProgress(data.get("progress"));
      const task = {
        title: data.get("title"),
        phase: contextPhase || data.get("phase"),
        package: contextPackage !== null ? contextPackage : (data.get("package") || ""),
        start: data.get("start"),
        due: data.get("due"),
        status: data.get("status"),
        progress
      };
      // Default members based on project team + squad rules.
      const effectiveMembers = computeEffectiveMembersForTask(task, selectedProject, state.selectedClient).join("; ");
      if (effectiveMembers) {
        task.members = effectiveMembers;
        task.responsavel = effectiveMembers.split(";")[0].trim();
      }
      applyTaskStatus(task, task.status);
      if (normalizeTaskStatus(task.status) === "concluido" && task.due) {
        task.dataConclusao = task.due;
      }
      const isEditMode =
        activityForm.dataset.activityMode === "edit" &&
        state.editingTaskIndex !== null &&
        state.editingTaskIndex !== undefined;

      if (isEditMode) {
        const idx = Number(state.editingTaskIndex);
        const currentTask = selectedProject.tasks?.[idx];
        if (!currentTask) return;
        const payload = { ...currentTask, ...task };
        applyTaskStatus(payload, payload.status);
        if (normalizeTaskStatus(payload.status) === "concluido" && payload.due) {
          payload.dataConclusao = payload.due;
        }
        // Optimistic local update: never lose user edits if Firebase sync fails.
        selectedProject.tasks[idx] = payload;
        saveLocalState();
        renderMain();
        resetActivityModal();
        if (activityModal) hideModal(activityModal);

        if (db && selectedProject.id && selectedProject.clientId && currentTask.id) {
          updateTaskOnDb(selectedProject.clientId, selectedProject.id, currentTask.id, payload)
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
              alert(`Atividade salva localmente, mas falhou sincronizacao no Firebase.\n${firebaseErrorLabel(err)}`);
            });
        }
        return;
      }

      if (db && selectedProject.id && selectedProject.clientId) {
        // Optimistic local create: keeps item visible even if backend is unavailable.
        const tempTask = {
          ...task,
          id: `tmp_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`
        };
        selectedProject.tasks.push(tempTask);
        saveLocalState();
        renderMain();
        resetActivityModal();
        if (activityModal) hideModal(activityModal);

        saveTaskToDb(selectedProject.clientId, selectedProject.id, task)
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
            alert(`Atividade salva localmente, mas falhou sincronizacao no Firebase.\n${firebaseErrorLabel(err)}`);
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

function normHeader(value) {
  return String(value ?? "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");
}

function excelDateToISO(value) {
  if (!value) return "";

  const parsePtBrMonthDate = (s) => {
    const v = String(s || "").trim();
    if (!v) return null;
    // Examples: "04 Fevereiro 2026 09:00", "4 fev 2026", "04 fevereiro 2026"
    const m = /^(\d{1,2})\s+([A-Za-z\u00C0-\u017F.]+)\s+(\d{4})(?:\s+(\d{1,2}):(\d{2}))?/.exec(v);
    if (!m) return null;
    const day = Number(m[1]);
    const monthRaw = normHeader(m[2]).replace(/\./g, "");
    const year = Number(m[3]);
    const months = {
      janeiro: 1,
      jan: 1,
      fevereiro: 2,
      fev: 2,
      marco: 3,
      mar: 3,
      abril: 4,
      abr: 4,
      maio: 5,
      jun: 6,
      junho: 6,
      jul: 7,
      julho: 7,
      agosto: 8,
      ago: 8,
      setembro: 9,
      set: 9,
      outubro: 10,
      out: 10,
      novembro: 11,
      nov: 11,
      dezembro: 12,
      dez: 12
    };
    const month = months[monthRaw];
    if (!month || !year || !day) return null;
    const dt = new Date(year, month - 1, day);
    return Number.isNaN(dt.getTime()) ? null : dt;
  };

  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  if (typeof value === "number") {
    // XLSX serial date
    if (typeof XLSX !== "undefined" && XLSX?.SSF?.parse_date_code) {
      const decoded = XLSX.SSF.parse_date_code(value);
      if (decoded && decoded.y && decoded.m && decoded.d) {
        const yyyy = String(decoded.y).padStart(4, "0");
        const mm = String(decoded.m).padStart(2, "0");
        const dd = String(decoded.d).padStart(2, "0");
        return `${yyyy}-${mm}-${dd}`;
      }
    }
    // Fallback: treat as epoch millis (rare in XLSX exports)
    const dt = new Date(value);
    return Number.isNaN(dt.getTime()) ? "" : dt.toISOString().slice(0, 10);
  }

  if (typeof value === "string") {
    let v = value.trim();
    if (!v) return "";

    const parseBrDateToISO = (raw) => {
      const m = /^(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})$/.exec(String(raw || "").trim());
      if (!m) return "";
      const dd = Number(m[1]);
      const mm = Number(m[2]);
      let yy = Number(m[3]);
      if (!dd || !mm || !yy) return "";
      if (yy < 100) yy = 2000 + yy;
      const dt = new Date(yy, mm - 1, dd);
      return Number.isNaN(dt.getTime()) ? "" : formatDateISO(dt);
    };

    // Support MS Project-style strings like "Seg 22/12/25" (weekday + dd/mm/yy).
    const weekdayPrefix = /^[A-Za-zÀ-ÿ]{3,}\s+(\d{1,2}\/\d{1,2}\/\d{2,4})/;
    const weekdayMatch = v.match(weekdayPrefix);
    if (weekdayMatch) v = weekdayMatch[1];

    // Common date-time strings: keep only the date portion.
    const isoDateTime = /^(\d{4}-\d{2}-\d{2})[ T]/.exec(v);
    if (isoDateTime) return isoDateTime[1];
    const brDateTime = /^(\d{2}\/\d{2}\/\d{2,4})\s+\d{1,2}:\d{2}/.exec(v);
    if (brDateTime) {
      return parseBrDateToISO(brDateTime[1]);
    }

    const brOnly = parseBrDateToISO(v);
    if (brOnly) return brOnly;

    const pt = parsePtBrMonthDate(v);
    if (pt) return formatDateISO(pt);

    const dt = parseTaskDate(v);
    return dt ? formatDateISO(dt) : "";
  }

  return "";
}

function parseMSProjectXML(xmlText) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlText, "application/xml");
  if (doc.querySelector("parsererror")) return [];

  const ns = doc.documentElement.namespaceURI || "";
  const q = (parent, tag) => {
    if (ns) return Array.from(parent.getElementsByTagNameNS(ns, tag));
    return Array.from(parent.getElementsByTagName(tag));
  };
  const txt = (parent, tag) => {
    const els = ns ? parent.getElementsByTagNameNS(ns, tag) : parent.getElementsByTagName(tag);
    if (!els.length) return "";
    return els[0].textContent || "";
  };

  const resourceMap = new Map();
  q(doc, "Resource").forEach((r) => {
    const uid = txt(r, "UID");
    const name = txt(r, "Name");
    if (uid && name) resourceMap.set(uid, name);
  });

  const assignMap = new Map();
  q(doc, "Assignment").forEach((a) => {
    const taskUID = txt(a, "TaskUID");
    const resUID = txt(a, "ResourceUID");
    const pctRaw = txt(a, "PercentWorkComplete");
    if (!taskUID) return;
    const resName = resourceMap.get(resUID) || "";
    if (!assignMap.has(taskUID)) assignMap.set(taskUID, { resources: [], pct: 0 });
    const entry = assignMap.get(taskUID);
    if (resName && !entry.resources.includes(resName)) entry.resources.push(resName);
    const pctNum = Number.parseInt(pctRaw, 10);
    if (Number.isFinite(pctNum) && pctNum > entry.pct) entry.pct = clampPct(pctNum);
  });

  const parseDurationISO = (dur) => {
    if (!dur) return null;
    const m = dur.match(/PT(?:(\d+)H)?(?:(\d+)M)?/);
    if (!m) return null;
    const h = Number(m[1] || 0);
    const min = Number(m[2] || 0);
    const total = h + min / 60;
    return total > 0 ? Math.round(total) || 1 : null;
  };

  const parseDateISO = (dt) => {
    if (!dt) return "";
    const m = dt.match(/(\d{4})-(\d{2})-(\d{2})/);
    return m ? `${m[1]}-${m[2]}-${m[3]}` : "";
  };

  const taskElements = q(doc, "Task");
  const parsed = [];
  const uidToId = new Map();

  taskElements.forEach((t) => {
    const uid = txt(t, "UID");
    const id = txt(t, "ID");
    const name = txt(t, "Name").trim();
    const level = Number.parseInt(txt(t, "OutlineLevel"), 10) || 0;
    const isSummary = txt(t, "Summary") === "1";
    const start = parseDateISO(txt(t, "Start"));
    const finish = parseDateISO(txt(t, "Finish"));
    const duration = parseDurationISO(txt(t, "Duration"));
    const pctComplete = Number.parseInt(txt(t, "PercentComplete"), 10) || 0;

    const predLinks = q(t, "PredecessorLink");
    const predUIDs = predLinks.map((pl) => txt(pl, "PredecessorUID")).filter(Boolean);

    if (uid) uidToId.set(uid, id || uid);

    if (!name) return;
    parsed.push({ uid, id, name, level, isSummary, start, finish, duration, pctComplete, predUIDs });
  });

  const level1Summaries = parsed.filter((e) => e.level === 1 && e.isSummary);
  const epicLevel = level1Summaries.length === 1 ? 2 : 1;

  const tasks = [];
  const macroParents = {};
  const parentStack = {};

  for (const entry of parsed) {
    const { uid, id, name, level, isSummary, start, finish, duration, pctComplete, predUIDs } = entry;

    parentStack[level] = name;
    for (const k of Object.keys(parentStack)) {
      if (Number(k) > level) delete parentStack[k];
    }

    if (level === 0) continue;

    if (isSummary) {
      if (level > epicLevel) {
        const parentName = parentStack[level - 1] || "";
        const epicName = parentStack[epicLevel] || "";
        if (level === epicLevel + 1) {
          macroParents[name] = normalizePhaseLabel(epicName);
        } else if (parentName) {
          macroParents[name] = parentName;
        }
      }
      continue;
    }

    const epic = parentStack[epicLevel] || "";
    let packageName = "";
    for (let l = level - 1; l > epicLevel; l--) {
      if (parentStack[l]) { packageName = parentStack[l]; break; }
    }

    const predIds = predUIDs.map((puid) => uidToId.get(puid) || puid).filter(Boolean);
    const predecessors = predIds.join(", ");

    const assign = assignMap.get(uid);
    const assignMembers = assign ? assign.resources.join(", ") : "";
    const assignPct = assign ? assign.pct : 0;
    const progress = clampPct(Math.max(pctComplete, assignPct));
    const members = assignMembers;
    const responsible = assign && assign.resources.length ? assign.resources[0] : "";
    const status = progress >= 100 ? "concluido" : progress > 0 ? "em_andamento" : "planejado";

    tasks.push({
      title: name,
      start,
      due: finish,
      phase: normalizePhaseLabel(epic || "OUTROS"),
      package: packageName,
      importType: "",
      status,
      progress,
      members,
      responsible,
      duration,
      predecessors,
      plannedPct: null,
      msProjectId: id || uid
    });
  }

  return { tasks, macroParents };
}

function isMSProjectWorkbook(workbook) {
  if (!workbook || !workbook.SheetNames) return false;
  const names = workbook.SheetNames.map((n) => normHeader(n));
  return names.some((n) => n.includes("tabela") && n.includes("tarefa"));
}

function parseMSProjectWorkbook(workbook) {
  const findSheet = (keyword1, keyword2) => {
    for (const name of workbook.SheetNames) {
      const n = normHeader(name);
      if (n.includes(keyword1) && (!keyword2 || n.includes(keyword2))) return workbook.Sheets[name];
    }
    return null;
  };

  const taskSheet = findSheet("tarefa");
  const assignSheet = findSheet("atribuic") || findSheet("assignment");
  if (!taskSheet) return [];

  const taskRows = XLSX.utils.sheet_to_json(taskSheet, { header: 1, defval: "" });
  if (taskRows.length < 2) return [];

  const hdr = taskRows[0].map((h) => normHeader(h));
  const col = (keyword) => {
    let idx = hdr.findIndex((h) => h === keyword);
    if (idx >= 0) return idx;
    idx = hdr.findIndex((h) => h.includes(keyword));
    return idx;
  };

  const iId = col("id");
  const iName = col("nome");
  const iDuration = col("duracao");
  const iStart = hdr.findIndex((h) => h === "inicio" || h === "inicio" || h.includes("inicio"));
  const iEnd = hdr.findIndex((h) => h === "termino" || h.includes("termino"));
  const iPred = hdr.findIndex((h) => h.includes("predecessor"));
  const iLevel = hdr.findIndex((h) => h.includes("nivel") || h.includes("topico") || h.includes("outline"));
  const iNotes = hdr.findIndex((h) => h.includes("anotac") || h.includes("notes"));

  if (iName < 0) return [];

  const assignMap = new Map();
  if (assignSheet) {
    const aRows = XLSX.utils.sheet_to_json(assignSheet, { header: 1, defval: "" });
    if (aRows.length > 1) {
      const aHdr = aRows[0].map((h) => normHeader(h));
      const aTask = aHdr.findIndex((h) => h.includes("tarefa") || h.includes("task"));
      const aRes = aHdr.findIndex((h) => h.includes("recurso") || h.includes("resource"));
      const aPct = aHdr.findIndex((h) => h.includes("% trabalho concluido") || h.includes("concluido") || h.includes("% work"));
      for (let i = 1; i < aRows.length; i++) {
        const r = aRows[i];
        const taskName = String(r[aTask] || "").trim();
        if (!taskName) continue;
        const resource = String(r[aRes] || "").trim();
        const pctRaw = aPct >= 0 ? r[aPct] : "";
        const key = normHeader(taskName);
        if (!assignMap.has(key)) assignMap.set(key, { resources: [], pct: 0 });
        const entry = assignMap.get(key);
        if (resource && !entry.resources.includes(resource)) entry.resources.push(resource);
        let pctNum = typeof pctRaw === "number" ? pctRaw : Number.parseFloat(String(pctRaw).replace(",", "."));
        if (Number.isFinite(pctNum)) {
          if (pctNum <= 1) pctNum = Math.round(pctNum * 100);
          entry.pct = Math.max(entry.pct, clampPct(Math.round(pctNum)));
        }
      }
    }
  }

  const parseDuration = (raw) => {
    const s = String(raw || "").trim().replace(",", ".");
    const m = s.match(/([\d.]+)/);
    if (!m) return null;
    const n = Number.parseFloat(m[1]);
    return Number.isFinite(n) && n > 0 ? Math.round(n) : null;
  };

  const parsed = [];
  for (let i = 1; i < taskRows.length; i++) {
    const r = taskRows[i];
    const name = String(r[iName] || "").trim();
    if (!name) continue;
    const level = iLevel >= 0 ? Number(r[iLevel]) || 1 : 1;
    parsed.push({ idx: i, name, level, row: r });
  }

  const isParentRow = new Set();
  for (let i = 0; i < parsed.length - 1; i++) {
    if (parsed[i + 1].level > parsed[i].level) isParentRow.add(parsed[i].idx);
  }

  const tasks = [];
  const macroParents = {};
  const parentStack = {};

  for (const entry of parsed) {
    const { idx, name, level, row } = entry;

    parentStack[level] = name;
    for (const k of Object.keys(parentStack)) {
      if (Number(k) > level) delete parentStack[k];
    }

    if (isParentRow.has(idx)) {
      if (level > 2) {
        const epicName = parentStack[2] || "";
        if (level === 3) {
          macroParents[name] = normalizePhaseLabel(epicName);
        } else {
          const parentName = parentStack[level - 1] || "";
          if (parentName) macroParents[name] = parentName;
        }
      }
      continue;
    }

    if (level <= 2) continue;

    const epic = parentStack[2] || "";
    let packageName = "";
    for (let l = level - 1; l > 2; l--) {
      if (parentStack[l]) { packageName = parentStack[l]; break; }
    }

    const taskId = iId >= 0 ? String(row[iId] || "").trim() : String(idx);
    const duration = iDuration >= 0 ? parseDuration(row[iDuration]) : null;
    const startRaw = iStart >= 0 ? row[iStart] : "";
    const endRaw = iEnd >= 0 ? row[iEnd] : "";
    const predRaw = iPred >= 0 ? String(row[iPred] || "").trim() : "";
    const start = excelDateToISO(startRaw);
    const due = excelDateToISO(endRaw);

    const assign = assignMap.get(normHeader(name));
    const members = assign ? assign.resources.join(", ") : "";
    const progress = assign ? assign.pct : 0;
    const responsible = assign && assign.resources.length ? assign.resources[0] : "";
    const status = progress >= 100 ? "concluido" : progress > 0 ? "em_andamento" : "planejado";

    tasks.push({
      title: name,
      start,
      due,
      phase: normalizePhaseLabel(epic || "OUTROS"),
      package: packageName,
      importType: "",
      status,
      progress,
      members,
      responsible,
      duration,
      predecessors: predRaw,
      plannedPct: null,
      msProjectId: taskId
    });
  }

  return { tasks, macroParents };
}

function xlsxRowsToCronogramaTasks(rows) {
  const keySet = (keys) => new Set(keys.map((k) => normHeader(k)));
  const TITLE_KEYS = keySet([
    "nome",
    "atividade",
    "atividade/estrutura",
    "atividade / estrutura",
    "atividade estrutura",
    "título",
    "titulo",
    "título da atividade",
    "titulo da atividade",
    "tarefa",
    "task"
  ]);
  const TYPE_KEYS = keySet(["tipo", "type", "categoria"]);
  const START_KEYS = keySet([
    "inicio",
    "início",
    "data inicio",
    "data início",
    "data de inicio",
    "data de início",
    "inicio previsto",
    "início previsto",
    "data inicio prevista",
    "data de inicio prevista",
    "start"
  ]);
  const DUE_KEYS = keySet([
    "termino",
    "término",
    "data termino",
    "data término",
    "termino previsto",
    "término previsto",
    "fim",
    "data fim",
    "data de fim",
    "due",
    "end"
  ]);
  const PHASE_KEYS = keySet(["fase", "epico", "épico", "epico/fase", "etapa"]);
  const PACKAGE_KEYS = keySet(["pacote", "package"]);
  const PROGRESS_KEYS = keySet([
    "%concluido",
    "% concluido",
    "%concluida",
    "% concluida",
    "% concluída",
    "percentual",
    "%",
    "progresso",
    "progress",
    "concluido",
    "concluida"
  ]);
  const MEMBERS_KEYS = keySet([
    "membros",
    "membro",
    "recursos",
    "recurso",
    "nomes dos recursos",
    "nome dos recursos",
    "responsaveis",
    "responsáveis",
    "responsavel",
    "responsável",
    "members",
    "resources"
  ]);
  const DURATION_KEYS = keySet([
    "duracao",
    "duração",
    "duration",
    "horas",
    "hours",
    "hrs"
  ]);
  const PREDECESSOR_KEYS = keySet([
    "predecessora",
    "predecessoras",
    "predecessor",
    "predecessors",
    "predecessores",
    "pred",
    "predec"
  ]);
  const PLANNED_PCT_KEYS = keySet([
    "%planejado",
    "% planejado",
    "% planejada",
    "%planejada",
    "planejado",
    "planned",
    "% planned"
  ]);

  const tasks = [];
  (rows || []).forEach((row) => {
    if (!row || typeof row !== "object") return;
    const entries = Object.entries(row);
    const matchesKey = (set, keyNorm) => {
      if (!keyNorm) return false;
      if (set.has(keyNorm)) return true;
      // Allow headers like "Nome (Atividade/Estrutura)" or "Fim (ou Termino)".
      const base = keyNorm.replace(/\(.*/, "").trim();
      if (base && set.has(base)) return true;
      // Prefix match: header begins with one of the known keys.
      const keys = Array.from(set);
      return keys.some((k) => (k && (keyNorm.startsWith(k) || (base && base.startsWith(k)))));
    };
    const pick = (set) => {
      for (const [key, val] of entries) {
        const k = normHeader(key);
        if (matchesKey(set, k)) return val;
      }
      return "";
    };

    const title = String(pick(TITLE_KEYS) || "").trim();
    if (!title) return;

    const typeRaw = String(pick(TYPE_KEYS) || "").trim();
    const start = excelDateToISO(pick(START_KEYS));
    const due = excelDateToISO(pick(DUE_KEYS));
    const phaseRaw = String(pick(PHASE_KEYS) || "").trim();
    const pkgRaw = String(pick(PACKAGE_KEYS) || "").trim();
    const membersRaw = pick(MEMBERS_KEYS);
    const progressRaw = pick(PROGRESS_KEYS);

    const parseProgress = (raw) => {
      if (raw == null) return 0;
      if (typeof raw === "number") {
        // Sometimes exports come as 0.57 (57%)
        const n = raw <= 1 ? raw * 100 : raw;
        return clampPct(Math.round(n));
      }
      const s = String(raw).trim();
      if (!s) return 0;
      const cleaned = s.replace("%", "").replace(/\s+/g, "").replace(",", ".");
      const num = Number.parseFloat(cleaned);
      if (!Number.isFinite(num)) return 0;
      const n = num <= 1 && !s.includes("%") ? num * 100 : num;
      return clampPct(Math.round(n));
    };

    const progress = parseProgress(progressRaw);
    const status = progress >= 100 ? "concluido" : progress > 1 ? "em_andamento" : "planejado";
    const members = String(membersRaw || "").trim();
    const responsible = members ? members.split(/[;,|]/g).map((v) => v.trim()).filter(Boolean)[0] || "" : "";

    const durationRaw = pick(DURATION_KEYS);
    const predecessorRaw = String(pick(PREDECESSOR_KEYS) || "").trim();
    const plannedPctRaw = pick(PLANNED_PCT_KEYS);
    const parsedDuration = (() => {
      if (durationRaw == null) return null;
      const s = String(durationRaw).trim().replace(/[^0-9.,]/g, "").replace(",", ".");
      const n = Number.parseFloat(s);
      return Number.isFinite(n) && n > 0 ? Math.round(n) : null;
    })();
    const parsedPlannedPct = parseProgress(plannedPctRaw);

    tasks.push({
      title,
      start,
      due,
      phase: normalizePhaseLabel(phaseRaw || "OUTROS"),
      package: pkgRaw || "",
      importType: typeRaw,
      status,
      progress,
      members: members || "",
      responsible: responsible || "",
      duration: parsedDuration,
      predecessors: predecessorRaw || "",
      plannedPct: parsedPlannedPct || null
    });
  });
  return tasks;
}

function pickCronogramaFile() {
  return new Promise((resolve) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".xlsx,.xml,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,text/xml,application/xml";
    input.style.display = "none";
    input.addEventListener(
      "change",
      () => {
        const file = input.files && input.files[0] ? input.files[0] : null;
        input.remove();
        resolve(file);
      },
      { once: true }
    );
    document.body.appendChild(input);
    input.click();
  });
}

function setupProjectTaskSearch() {
  if (document.body.dataset.taskSearchWired) return;
  document.body.dataset.taskSearchWired = "true";
  let t = null;
  const apply = (value, caretStart = null, caretEnd = null) => {
    state.projectTaskSearch = value;
    renderMain();
    // Restore focus so typing doesn't feel "broken" due to rerender.
    requestAnimationFrame(() => {
      const next = document.querySelector("[data-task-search]");
      if (!next) return;
      next.focus({ preventScroll: true });
      try {
        const len = String(next.value || "").length;
        const s = Number.isFinite(caretStart) ? caretStart : len;
        const e = Number.isFinite(caretEnd) ? caretEnd : len;
        next.setSelectionRange(Math.min(s, len), Math.min(e, len));
      } catch (_err) {
        // ignore
      }
    });
  };
  document.body.addEventListener("input", (e) => {
    const input = e.target.closest("[data-task-search]");
    if (!input) return;
    const value = String(input.value || "");
    const caretStart = typeof input.selectionStart === "number" ? input.selectionStart : null;
    const caretEnd = typeof input.selectionEnd === "number" ? input.selectionEnd : null;
    // debounce to avoid re-render on every keystroke
    if (t) window.clearTimeout(t);
    t = window.setTimeout(() => apply(value, caretStart, caretEnd), 120);
  });
}

function resolveEpicFromFixedList(rawEpic, allowedEpics) {
  const allowed = Array.isArray(allowedEpics) ? allowedEpics : [];
  if (!allowed.length) return null;
  const wanted = normHeader(rawEpic);
  if (!wanted) return null;
  const map = new Map();
  allowed.forEach((epic) => {
    map.set(normHeader(epic), normalizePhaseLabel(epic));
  });
  if (map.has(wanted)) return map.get(wanted);
  // Accept already-normalized inputs like "deploy" -> "DEPLOY"
  const normalized = normalizePhaseLabel(rawEpic);
  const normalizedKey = normHeader(normalized);
  return map.get(normalizedKey) || null;
}

function resolveImportedTasksForFixedEpics(imported, allowedEpics) {
  const tasks = Array.isArray(imported) ? imported : [];
  let currentEpic = null;
  let currentMacro = null;
  const unknownEpics = new Set();
  const resolved = [];

  const normType = (v) =>
    String(v || "")
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  tasks.forEach((t) => {
    if (!t) return;
    const phaseValue = normalizePhaseLabel(t.phase || "");
    const epicFromCell = resolveEpicFromFixedList(phaseValue, allowedEpics);

    const type = normType(t.importType);
    const isEpicRow = type === "epico" || type === "épico" || type === "epic";
    const isProjectRow = type === "projeto" || type === "project";
    const isMacroRow = type === "macro" || type === "pacote" || type === "package";
    const isActivityRow = type === "atividade" || type === "activity" || type === "tarefa" || type === "task";
    const hasAnyDate = !!(t.start || t.due);

    if (epicFromCell) {
      currentEpic = epicFromCell;
      currentMacro = null;
      // EPICO rows are headers (epicos sao fixos na plataforma), even if they have dates.
      // Activity rows may carry the EPICO in a dedicated column; those should be imported.
      if (isEpicRow) return;
    }

    // If the user accidentally placed EPICO labels as "Atividade" rows, treat them as headers
    // and carry that EPICO to subsequent rows where EPICO is blank.
    const epicFromTitle = resolveEpicFromFixedList(t.title, allowedEpics);
    if (epicFromTitle && (isEpicRow || !hasAnyDate)) {
      currentEpic = epicFromTitle;
      currentMacro = null;
      return; // skip header row
    }

    // Skip project header rows (MS Project export sometimes includes "PROJETO").
    if (isProjectRow) return;

    // Macro header: set current macro name; subsequent leaf rows will be assigned to this package.
    if (isMacroRow) {
      currentMacro = String(t.title || "").trim() || null;
      // If it's only a header row (no dates), skip persisting the macro task.
      if (!hasAnyDate) return;
    }

    if (phaseValue && phaseValue !== "OUTROS") {
      unknownEpics.add(String(t.phase || phaseValue).trim());
      currentMacro = null;
      resolved.push({ ...t, phase: "OUTROS" });
      return;
    }

    if (isEpicRow && epicFromTitle) {
      currentEpic = epicFromTitle;
      currentMacro = null;
      return;
    }

    if (currentEpic) {
      // Many XLSX exports don't fill the "Tipo" column for leaf tasks. When we're inside a macro,
      // treat any non-header row that has at least one date as a leaf activity and inherit currentMacro.
      const isLeafLike =
        isActivityRow || (!isEpicRow && !isMacroRow && !isProjectRow && hasAnyDate);
      const nextPackage = t.package || (isLeafLike && currentMacro ? currentMacro : "");
      resolved.push({ ...t, phase: currentEpic, package: nextPackage });
      return;
    }

    resolved.push({ ...t, phase: "OUTROS" });
  });

  return { tasks: resolved, unknownEpics };
}

async function openImportCronograma() {
  const project = state.selectedProject;
  const client = state.selectedClient;
  if (!project || !client) {
    alert("Nenhum projeto selecionado.");
    return;
  }

  const file = await pickCronogramaFile();
  if (!file) return;

  const fileName = String(file.name || "").toLowerCase();
  const isXML = fileName.endsWith(".xml");

  let imported = [];
  let unknownEpics = new Set();
  let parsedMacroParents = {};

  if (isXML) {
    let xmlText = "";
    try {
      xmlText = await file.text();
    } catch (err) {
      console.error(err);
      alert("Nao foi possivel ler o arquivo XML.");
      return;
    }
    const result = parseMSProjectXML(xmlText);
    if (!result.tasks || !result.tasks.length) {
      alert("Nenhuma tarefa encontrada no XML. Verifique se o arquivo foi exportado do MS Project (Arquivo > Salvar Como > XML).");
      return;
    }
    imported = result.tasks;
    parsedMacroParents = result.macroParents || {};
  } else {
    if (typeof XLSX === "undefined" || !XLSX?.read || !XLSX?.utils?.sheet_to_json) {
      alert("Biblioteca de XLSX indisponivel. Verifique sua conexao e recarregue a pagina.");
      return;
    }
    let workbook = null;
    try {
      const buffer = await file.arrayBuffer();
      workbook = XLSX.read(buffer, { type: "array", cellDates: true });
    } catch (err) {
      console.error(err);
      alert("Nao foi possivel ler o arquivo XLSX.");
      return;
    }
    const msProject = isMSProjectWorkbook(workbook);
    if (msProject) {
      const result = parseMSProjectWorkbook(workbook);
      if (!result.tasks || !result.tasks.length) {
        alert("Nenhuma tarefa encontrada no arquivo MS Project.");
        return;
      }
      imported = result.tasks;
      parsedMacroParents = result.macroParents || {};
    } else {
      const firstSheetName = workbook?.SheetNames?.[0];
      const sheet = firstSheetName ? workbook.Sheets[firstSheetName] : null;
      if (!sheet) { alert("Planilha vazia ou invalida."); return; }
      const rows = XLSX.utils.sheet_to_json(sheet, { defval: "", raw: false, dateNF: "yyyy-mm-dd" });
      const importedRaw = xlsxRowsToCronogramaTasks(rows);
      if (!importedRaw.length) {
        alert("Nenhuma linha importada. Confirme se o XLSX possui as colunas: Nome, Inicio, Termino, %Concluido, Recursos.");
        return;
      }
      const allowedEpics = Array.isArray(project.epics) ? project.epics : [];
      const resolved = resolveImportedTasksForFixedEpics(importedRaw, allowedEpics);
      imported = resolved.tasks;
      unknownEpics = resolved.unknownEpics;
    }
  }

  if (!imported.length) {
    alert("Nada para importar.");
    return;
  }

  project.epics = Array.isArray(project.epics) ? project.epics : [];
  const epicSet = new Set(project.epics.map((e) => normalizePhaseLabel(e)));
  const pkgSet = new Set((Array.isArray(project.packages) ? project.packages : []).map((p) => normHeader(p)));
  const pkgParents = project.packageParents || {};

  Object.entries(parsedMacroParents).forEach(([child, parent]) => {
    pkgParents[child] = parent;
    if (!pkgSet.has(normHeader(child))) {
      if (!Array.isArray(project.packages)) project.packages = [];
      project.packages.push(child);
      pkgSet.add(normHeader(child));
    }
    if (parent && !pkgSet.has(normHeader(parent)) && !epicSet.has(normalizePhaseLabel(parent))) {
      if (!Array.isArray(project.packages)) project.packages = [];
      project.packages.push(parent);
      pkgSet.add(normHeader(parent));
    }
  });

  imported.forEach((t) => {
    const phase = normalizePhaseLabel(t.phase);
    if (phase && phase !== "OUTROS" && !epicSet.has(phase)) {
      project.epics.push(t.phase);
      epicSet.add(phase);
    }
    const pkg = String(t.package || "").trim();
    if (pkg && !pkgSet.has(normHeader(pkg))) {
      if (!Array.isArray(project.packages)) project.packages = [];
      project.packages.push(pkg);
      pkgSet.add(normHeader(pkg));
    }
    if (pkg && phase && phase !== "OUTROS" && !pkgParents[pkg]) {
      pkgParents[pkg] = phase;
    }
  });
  project.packageParents = normalizePackageParentsMap(pkgParents);

  if (db && project.id && project.clientId) {
    try {
      await updateProjectEpicsOnDb(project.clientId, project.id, project.epics);
      const clientRef = clientDocRef(project.clientId);
      if (clientRef) {
        await clientRef.child("projects").child(project.id).update({
          packages: project.packages || [],
          packageParents: project.packageParents || {}
        });
      }
    } catch (e) { console.error(e); }
  }

  const proceed = window.confirm(
    `Importar ${imported.length} atividade(s) para o projeto "${project.name || "Projeto"}"?`
  );
  if (!proceed) return;

  const upsert = window.confirm(
    "Se ja existir uma atividade com o mesmo nome, deseja atualizar as datas dela ao inves de criar duplicada?\n\nOK = atualizar existentes\nCancelar = criar novas"
  );

  const keepClientId = client?.id;
  const keepProjectId = project?.id;
  const keepClientName = client?.name;
  const keepProjectName = project?.name;

  project.tasks = Array.isArray(project.tasks) ? project.tasks : [];
  const normTitle = (value) => normHeader(String(value || "")).replace(/\s+/g, " ");
  const normPhase = (value) => normalizePhaseLabel(value || "");

  let created = 0;
  let updated = 0;
  let failed = 0;

  if (db && project.id && project.clientId) {
    for (const t of imported) {
      try {
        const payload = {
          ...t,
          phase: normPhase(t.phase) || "OUTROS"
        };

        if (upsert) {
          const existing = project.tasks.find(
            (x) =>
              normTitle(x?.title) &&
              normTitle(x?.title) === normTitle(payload.title) &&
              normPhase(x?.phase) === normPhase(payload.phase)
          );
          if (existing?.id) {
            await updateTaskOnDb(project.clientId, project.id, existing.id, {
              ...existing,
              title: payload.title,
              start: payload.start,
              due: payload.due,
              phase: payload.phase,
              package: payload.package || existing.package,
              progress: payload.progress != null ? payload.progress : existing.progress,
              status: payload.status || existing.status,
              members: payload.members || existing.members,
              responsible: payload.responsible || existing.responsible || existing.responsavel,
              duration: payload.duration || existing.duration,
              predecessors: payload.predecessors || existing.predecessors
            });
            updated += 1;
            continue;
          }
        }

        await saveTaskToDb(project.clientId, project.id, payload);
        created += 1;
      } catch (err) {
        console.error(err);
        failed += 1;
      }
    }

    await loadStateFromDb({
      clientId: keepClientId,
      projectId: keepProjectId,
      clientName: keepClientName,
      projectName: keepProjectName
    });
  } else {
    imported.forEach((t) => {
      const payload = { ...t, phase: normPhase(t.phase) || "OUTROS" };
      if (upsert) {
        const existingIdx = project.tasks.findIndex(
          (x) =>
            normTitle(x?.title) &&
            normTitle(x?.title) === normTitle(payload.title) &&
            normPhase(x?.phase) === normPhase(payload.phase)
        );
        if (existingIdx >= 0) {
          project.tasks[existingIdx] = { ...project.tasks[existingIdx], ...payload };
          updated += 1;
          return;
        }
      }
      project.tasks.push(payload);
      created += 1;
    });
    saveLocalState();
    renderMain();
  }

  const unknownLabel = unknownEpics.size
    ? `\n\nEpicos nao reconhecidos (foram para OUTROS):\n- ${Array.from(unknownEpics).join("\n- ")}`
    : "";
  alert(`Importacao concluida.\nCriadas: ${created}\nAtualizadas: ${updated}\nFalhas: ${failed}${unknownLabel}`);
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

function completeMonitorTask(clientIndex, projectIndex, taskIndex) {
  const client = state.clients?.[clientIndex];
  const project = client?.projects?.[projectIndex];
  const task = project?.tasks?.[taskIndex];
  if (!client || !project || !task) return;
  const previousStatus = task.status;
  const previousDone = task.dataConclusao;
  applyTaskStatus(task, "concluido");
  const payload = { status: task.status, dataConclusao: task.dataConclusao ?? null };

  if (db && project.id && client.id && task.id) {
    updateTaskStatusOnDb(client.id, project.id, task.id, payload)
      .then(() => {
        saveLocalState();
        renderMain();
      })
      .catch((err) => {
        console.error(err);
        task.status = previousStatus;
        task.dataConclusao = previousDone;
        alert("Erro ao concluir atividade.");
        renderMain();
      });
    return;
  }
  saveLocalState();
  renderMain();
}

function setupMonitorActions() {
  if (document.body.dataset.monitorWired) return;
  document.body.dataset.monitorWired = "true";

  document.body.addEventListener("click", (e) => {
    const toggle = e.target.closest("[data-monitor-toggle]");
    if (toggle) {
      e.stopPropagation();
      return;
    }

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

    const viewOpt = e.target.closest("[data-monitor-view]");
    if (viewOpt) {
      if (!state.monitor) state.monitor = {};
      state.monitor.viewMode = viewOpt.dataset.monitorView || "geral";
      renderMain();
      return;
    }

    const collapseBtn = e.target.closest("[data-monitor-collapse-section]");
    if (collapseBtn) {
      const sectionId = collapseBtn.dataset.monitorCollapseSection;
      if (!sectionId) return;
      if (!state.monitor.collapsed) state.monitor.collapsed = {};
      const wasExpanded = !state.monitor.collapsed[sectionId];
      state.monitor.collapsed = { atraso: true, hoje: true, proximas: true };
      state.monitor.collapsed[sectionId] = wasExpanded;
      if (wasExpanded) state.monitor.collapsed.atraso = false;
      const panels = byId("dashboard-panels");
      if (panels && state.currentSection === "monitor") renderMonitorActivitiesV2(panels);
      return;
    }

    const next7 = e.target.closest("[data-monitor-view-next7]");
    if (next7) {
      state.monitor.filter = "proximo";
      renderMain();
      return;
    }

    const pdfBtn = e.target.closest("[data-monitor-export-pdf]");
    if (pdfBtn) {
      exportMonitorPdf();
      return;
    }

    const actionBtn = e.target.closest("[data-monitor-action]");
    if (actionBtn) {
      e.stopPropagation();
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

  document.body.addEventListener("input", (e) => {
    const search = e.target.closest("[data-monitor-search]");
    if (!search) return;
    if (!state.monitor) state.monitor = { filter: "all", client: "", project: "", responsible: "", query: "" };
    state.monitor.query = search.value || "";
    const pos = typeof search.selectionStart === "number" ? search.selectionStart : null;
    if (state.currentSection === "monitor") {
      const panels = byId("dashboard-panels");
      if (panels) {
        panels.innerHTML = "";
        renderMonitorActivitiesV2(panels);
        const next = panels.querySelector("[data-monitor-search]");
        if (next) {
          next.focus();
          if (pos != null && typeof next.setSelectionRange === "function") next.setSelectionRange(pos, pos);
        }
        return;
      }
    }
    renderMain();
  });

  document.body.addEventListener("change", (e) => {
    const toggle = e.target.closest("[data-monitor-toggle]");
    if (toggle) {
      const input = toggle.matches("input") ? toggle : toggle.querySelector("input");
      if (!input || !input.checked) return;
      const card = toggle.closest("[data-monitor-card]");
      if (!card) return;
      const clientIndex = Number(card.dataset.clientIndex);
      const projectIndex = Number(card.dataset.projectIndex);
      const taskIndex = Number(card.dataset.taskIndex);
      if (Number.isFinite(clientIndex) && Number.isFinite(projectIndex) && Number.isFinite(taskIndex)) {
        completeMonitorTask(clientIndex, projectIndex, taskIndex);
      }
      return;
    }

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
  const squadSelect = byId("project-squad-select");
  const deleteProjectBtn = byId("delete-project-btn");

  if (mode === "edit" && state.selectedProject && state.selectedClient) {
    state.editingProjectId = state.selectedProject.id || "local";
    hydrateClientSelect(state.selectedClient.name);
    hydrateProjectSquadSelect(state.selectedClient.name);
    form.elements.name.value = state.selectedProject.name || "";
    form.elements.developer.value = state.selectedProject.developer || "";
    if (squadSelect) squadSelect.value = state.selectedProject.squadId || "";
    renderProjectTeamPicker(state.selectedProject.team || []);
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
    hydrateProjectSquadSelect();
    renderProjectTeamPicker([]);
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
  const squadSelect = byId("project-squad-select");
  const deleteProjectBtn = byId("delete-project-btn");
  state.editingProjectId = null;
  if (form) form.reset();
  if (clientSelect) clientSelect.disabled = false;
  if (squadSelect) squadSelect.value = "";
  renderProjectTeamPicker([]);
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

function openActivityModal(mode = "new", taskIndex = null, defaults = null) {
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
    form.dataset.activityMode = "edit";
    title.textContent = "Editar Atividade";
    submitBtn.textContent = "Salvar Alteracoes";
  } else {
    resetActivityModal();
    form.dataset.activityMode = "new";
    state.editingTaskIndex = null;
    if (defaults?.phase) {
      const forcedPhase = normalizePhaseLabel(defaults.phase || "LEVANTAMENTO");
      form.dataset.contextPhase = forcedPhase;
      form.elements.phase.value = forcedPhase;
    }
    updateActivityPackageField();
    if (defaults && Object.prototype.hasOwnProperty.call(defaults, "package")) {
      const forcedPackage = normalizePackageLabel(defaults.package || "");
      form.dataset.contextPackage = forcedPackage;
      if (forcedPackage && getPackagePhases().includes((form.elements.phase.value || "").toUpperCase())) {
        addPackageToProject(state.selectedProject, forcedPackage);
        updateActivityPackageField();
        form.elements.package.value = forcedPackage;
      } else if (form.elements.package) {
        form.elements.package.value = "";
      }
    }
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
  if (form) {
    delete form.dataset.activityMode;
    delete form.dataset.contextPhase;
    delete form.dataset.contextPackage;
  }
  if (title) title.textContent = "Nova Atividade";
  if (submitBtn) submitBtn.textContent = "Salvar Atividade";
  updateActivityPackageField();
}

function createFinanceEntryId() {
  return `fin_${Date.now()}_${Math.random().toString(16).slice(2, 8)}`;
}

function persistProjectFinancials(project) {
  saveLocalState();
  if (db && project?.id && project?.clientId) {
    updateProjectFinancialsOnDb(project.clientId, project.id, project.financials).catch((err) => {
      console.error(err);
      alert("Erro ao salvar financeiro no Firebase.");
    });
  }
}

function openFinanceModal() {
  const project = state.selectedProject;
  const modal = byId("finance-modal");
  if (!project || !modal) return;
  const summary = computeFinanceSummary(project);
  const entries = sortFinanceEntries(summary.entries);
  const summaryBox = modal.querySelector("[data-finance-summary]");
  const historyBody = modal.querySelector("[data-finance-history]");

  if (summaryBox) {
    const saldoClass = summary.saldo < 0 ? "is-negative" : "is-positive";
    const cards = [];
    if (Number.isFinite(summary.budgetBase)) {
      cards.push(`
        <div class="summary-card">
          <div class="label">Orcamento base</div>
          <div class="value">${formatCurrency(summary.budgetBase)}</div>
        </div>
      `);
    }
    cards.push(`
      <div class="summary-card">
        <div class="label">Receita</div>
        <div class="value">${formatCurrency(summary.receita)}</div>
      </div>
      <div class="summary-card">
        <div class="label">Despesa</div>
        <div class="value">${formatCurrency(summary.despesa)}</div>
      </div>
      <div class="summary-card ${saldoClass}">
        <div class="label">Saldo</div>
        <div class="value">${formatCurrency(summary.saldo)}</div>
      </div>
    `);
    summaryBox.innerHTML = cards.join("");
  }

  if (historyBody) {
    let running = Number.isFinite(summary.budgetBase) ? summary.budgetBase : 0;
    const rows = entries.length
      ? entries
          .map((entry) => {
            const type = normalizeFinanceType(entry?.type);
            const amount = parseNumericValue(entry?.amount);
            running += type === "receita" ? amount : -amount;
            const dateLabel = formatDateBR(entry?.date) || "-";
            const description = entry?.description ? escapeHtml(entry.description) : "-";
            const typeLabel = type === "receita" ? "Receita" : "Despesa";
            const amountLabel = formatFinanceAmount(amount, type);
            const runningLabel = formatCurrency(running);
            return `
              <tr>
                <td>${dateLabel}</td>
                <td>${typeLabel}</td>
                <td>${description}</td>
                <td>${amountLabel}</td>
                <td>${runningLabel}</td>
              </tr>
            `;
          })
          .join("")
      : `<tr><td colspan="5">Nenhum movimento cadastrado.</td></tr>`;
    historyBody.innerHTML = rows;
  }

  showModal(modal);
}

function openExpenseModal(defaultType = "despesa") {
  const financeModal = byId("finance-modal");
  const modal = byId("expense-modal");
  const form = byId("expense-form");
  if (form) {
    form.reset();
    if (form.elements.type) {
      form.elements.type.value = normalizeFinanceType(defaultType);
    }
    if (form.elements.date) {
      form.elements.date.value = new Date().toISOString().slice(0, 10);
    }
  }
  if (financeModal) hideModal(financeModal);
  if (modal) showModal(modal);
}

function resetExpenseModal() {
  const form = byId("expense-form");
  if (form) form.reset();
}

function exportImprovementsReportPdf(data) {
  const { reportRows = [], total, triagem, emExecucao, concluido, dateStr, stageLabel } = data;
  const JsPDF = window.jspdf?.jsPDF || window.jsPDF;
  if (!JsPDF) return;

  const pdf = new JsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentW = pageW - margin * 2;
  let y = margin;

  const toAscii = (s) => String(s || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\x00-\x7F]/g, "?");

  const STAGE_COLORS = {
    triagem: { bg: [219, 234, 254], text: [29, 78, 216], border: [59, 130, 246] },
    analise_tecnica: { bg: [254, 243, 199], text: [180, 83, 9], border: [245, 158, 11] },
    implementacao: { bg: [237, 233, 254], text: [109, 40, 217], border: [139, 92, 246] },
    validacao: { bg: [207, 250, 254], text: [8, 145, 178], border: [6, 182, 212] },
    concluido: { bg: [209, 250, 229], text: [5, 150, 105], border: [16, 185, 129] }
  };
  const getStageColor = (id) => STAGE_COLORS[id] || STAGE_COLORS.triagem;

  const rows = (reportRows || []).map(({ improvement: it, stageId, stageLabel: lbl }) => {
    const info = improvementStageInfo(it);
    const exec = String(it?.executor || "").trim();
    return {
      id: toAscii(improvementDisplayId(it)),
      nome: toAscii(it?.name || "-"),
      cliente: toAscii(it?.client || "-"),
      etapa: toAscii(lbl),
      stageId,
      executor: toAscii(exec || "A definir"),
      initials: initialsFromName(exec || "EQ"),
      inicio: formatDateBR(it?.start) || "-",
      prazo: formatDateBR(it?.end) || "-",
      pct: info.progress,
      pctStr: String(info.progress) + "%"
    };
  });

  const addHeader = () => {
    pdf.setFillColor(15, 23, 42);
    pdf.rect(0, 0, pageW, 14, "F");
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(12);
    pdf.setFont("helvetica", "bold");
    pdf.text("JP", margin, 7);
    pdf.setFont("helvetica", "normal");
    pdf.text(" Projects", margin + 14, 7);
    pdf.setFontSize(10);
    pdf.setFont("helvetica", "bold");
    pdf.text("Relatorio de Melhorias", margin, 11.5);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7);
    pdf.setTextColor(203, 213, 225);
    const tw = (t) => (typeof pdf.getTextWidth === "function" ? pdf.getTextWidth(t) : t.length * 1.5);
    pdf.text("Gerado em " + dateStr, pageW - margin - tw("Gerado em " + dateStr), 7);
    pdf.text("JP Projects", pageW - margin - tw("JP Projects"), 10.5);
    pdf.setTextColor(0, 0, 0);
    y = 20;
  };

  const hasCircle = typeof pdf.circle === "function";
  const drawSimpleIcon = (x, y0, type, color) => {
    const [r, g, b] = color || [100, 116, 139];
    pdf.setFillColor(r, g, b);
    pdf.setDrawColor(r, g, b);
    try {
      if (type === "sparkle") {
        if (hasCircle) pdf.circle(x + 2, y0 + 2, 1.2, "F");
        else pdf.rect(x + 0.8, y0 + 0.8, 2.4, 2.4, "F");
      } else if (type === "clock") {
        if (hasCircle) pdf.circle(x + 2, y0 + 2, 1.2, "S");
        else pdf.rect(x + 0.8, y0 + 0.8, 2.4, 2.4, "S");
      } else if (type === "wand") {
        pdf.rect(x + 1, y0 + 0.5, 2, 3, "FD");
      } else if (type === "check") {
        if (hasCircle) pdf.circle(x + 2, y0 + 2, 1.2, "FD");
        else pdf.rect(x + 0.8, y0 + 0.8, 2.4, 2.4, "FD");
      } else if (type === "trend") {
        pdf.setLineWidth(0.3);
        pdf.line(x, y0 + 3, x + 1.5, y0 + 1);
        pdf.line(x + 1.5, y0 + 1, x + 3, y0 + 2.5);
      }
    } catch (_) {}
  };

  const addKpis = () => {
    const sucessoMensal = total > 0 ? String(Math.round((concluido / total) * 100)) + "%" : "-";
    const kpis = [
      { label: "BACKLOG ATIVO", val: String(total), icon: "sparkle", border: [59, 130, 246] },
      { label: "EM TRIAGEM", val: String(triagem), icon: "clock", border: [148, 163, 184] },
      { label: "EM EXECUCAO", val: String(emExecucao), icon: "wand", border: [139, 92, 246] },
      { label: "CONCLUIDOS", val: String(concluido), icon: "check", border: [16, 185, 129] },
      { label: "SUCESSO MENSAL", val: sucessoMensal, icon: "trend", border: [16, 185, 129] }
    ];
    const boxW = (contentW - 20) / 5;
    const boxH = 20;
    kpis.forEach((k, i) => {
      const x = margin + i * (boxW + 5);
      pdf.setFillColor(249, 250, 251);
      pdf.setDrawColor(229, 231, 235);
      pdf.setLineWidth(0.2);
      pdf.rect(x, y, boxW, boxH, "FD");
      pdf.setFillColor(k.border[0], k.border[1], k.border[2]);
      pdf.rect(x, y, 2, boxH, "F");
      drawSimpleIcon(x + 4, y + 6, k.icon, k.border);
      pdf.setTextColor(107, 114, 128);
      pdf.setFontSize(6);
      pdf.setFont("helvetica", "bold");
      pdf.text(k.label, x + 8, y + 8);
      pdf.setTextColor(17, 24, 39);
      pdf.setFontSize(11);
      pdf.text(k.val, x + 8, y + 14);
    });
  };
  const kpiHeight = 20 + 14;

  const colW = [24, 52, 26, 34, 38, 22, 22, 20];
  const headers = ["ID", "Nome", "Cliente", "Etapa", "Executor", "Inicio", "Prazo", "Progresso"];
  const rowH = 10;
  const cellPad = 2;

  const drawPill = (x, y0, w, h, text, stageId) => {
    const c = getStageColor(stageId);
    pdf.setFillColor(c.bg[0], c.bg[1], c.bg[2]);
    pdf.setDrawColor(c.border[0], c.border[1], c.border[2]);
    pdf.setLineWidth(0.15);
    pdf.rect(x, y0 - h + 1.5, w, h - 1, "FD");
    pdf.setTextColor(c.text[0], c.text[1], c.text[2]);
    pdf.setFontSize(6);
    pdf.setFont("helvetica", "bold");
    const txt = String(text).length > 14 ? String(text).substring(0, 12) + ".." : String(text);
    const txtW = typeof pdf.getTextWidth === "function" ? pdf.getTextWidth(txt) : txt.length * 1.2;
    pdf.text(txt, x + Math.max(0, (w - txtW) / 2), y0 - 0.5);
    pdf.setTextColor(0, 0, 0);
  };

  const drawProgressBar = (x, y0, w, h, pct) => {
    const barH = 3;
    const barY = y0 - barH - 1;
    pdf.setFillColor(229, 231, 235);
    pdf.rect(x, barY, w, barH, "F");
    const fillW = Math.max(0, Math.min(1, pct / 100)) * (w - 1);
    if (fillW > 0) {
      pdf.setFillColor(16, 185, 129);
      pdf.rect(x + 0.5, barY + 0.3, fillW, barH - 0.6, "F");
    }
    pdf.setFontSize(6);
    pdf.setTextColor(55, 65, 81);
    pdf.text(pct + "%", x + w + 1, y0 - 1.5);
  };

  const drawAvatar = (x, y0, initials) => {
    const r = 3;
    pdf.setFillColor(16, 185, 129);
    if (hasCircle) {
      try { pdf.circle(x + r, y0 - r, r, "F"); } catch (_) { pdf.rect(x, y0 - r * 2, r * 2, r * 2, "F"); }
    } else {
      pdf.rect(x, y0 - r * 2, r * 2, r * 2, "F");
    }
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(5);
    pdf.setFont("helvetica", "bold");
    const init = String(initials).substring(0, 2).toUpperCase();
    const iw = typeof pdf.getTextWidth === "function" ? pdf.getTextWidth(init) : 2;
    pdf.text(init, x + r - iw / 2, y0 - r + 1.2);
    pdf.setTextColor(0, 0, 0);
  };

  const drawTableHeader = (startY) => {
    let x = margin;
    pdf.setFillColor(249, 250, 251);
    pdf.setDrawColor(229, 231, 235);
    pdf.rect(margin, startY, contentW, rowH, "FD");
    pdf.setTextColor(107, 114, 128);
    pdf.setFontSize(7);
    pdf.setFont("helvetica", "bold");
    headers.forEach((h, i) => {
      pdf.text(h, x + cellPad, startY + rowH - 2.5);
      x += colW[i];
    });
    return startY + rowH + 2;
  };

  const wrapText = (text, maxLen) => {
    if (String(text).length <= maxLen) return [String(text)];
    const words = String(text).split(/\s+/);
    const lines = [];
    let curr = "";
    words.forEach((w) => {
      if (curr.length + w.length + 1 <= maxLen) curr += (curr ? " " : "") + w;
      else {
        if (curr) lines.push(curr);
        curr = w.length > maxLen ? w.substring(0, maxLen - 1) + "." : w;
      }
    });
    if (curr) lines.push(curr);
    return lines.slice(0, 2);
  };

  const drawTableRow = (row, startY, isZebra) => {
    if (isZebra) {
      pdf.setFillColor(249, 250, 251);
      pdf.rect(margin, startY, contentW, rowH, "F");
    }
    pdf.setDrawColor(229, 231, 235);
    pdf.rect(margin, startY, contentW, rowH, "S");

    let x = margin;
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(7);

    const idPillW = Math.min(colW[0] - 4, Math.max(10, String(row.id).length * 1.8));
    drawPill(x + cellPad, startY + rowH - 2, idPillW, 4.5, row.id, row.stageId);
    x += colW[0];

    const nomeLines = wrapText(row.nome, 32);
    pdf.setTextColor(17, 24, 39);
    nomeLines.forEach((line, i) => {
      pdf.text(line, x + cellPad, startY + 5 + i * 3.5);
    });
    x += colW[1];

    pdf.text(String(row.cliente).substring(0, 14), x + cellPad, startY + 6);
    x += colW[2];

    const etapaPillW = Math.min(colW[3] - 4, Math.max(14, String(row.etapa).length * 1.8));
    drawPill(x + cellPad, startY + rowH - 2, etapaPillW, 4.5, row.etapa, row.stageId);
    x += colW[3];

    drawAvatar(x + 2, startY + rowH - 2.5, row.initials);
    pdf.setTextColor(55, 65, 81);
    pdf.text(String(row.executor).substring(0, 14), x + 10, startY + 6);
    x += colW[4];

    pdf.text(row.inicio, x + cellPad, startY + 6);
    x += colW[5];
    pdf.text(row.prazo, x + cellPad, startY + 6);
    x += colW[6];

    drawProgressBar(x + cellPad, startY + rowH - 1, 12, 4, row.pct);
    return startY + rowH;
  };

  const addFooter = (pageNum, totalPages) => {
    pdf.setFontSize(7);
    pdf.setTextColor(156, 163, 175);
    const footerText = "Pagina " + pageNum + " de " + totalPages;
    const footerW = typeof pdf.getTextWidth === "function" ? pdf.getTextWidth(footerText) : 25;
    pdf.text(footerText, pageW / 2 - footerW / 2, pageH - 10);
    pdf.setFontSize(6);
    const axW = typeof pdf.getTextWidth === "function" ? pdf.getTextWidth("JP Projects") : 25;
    pdf.text("JP Projects", pageW - margin - axW, pageH - 10);
  };

  addHeader();
  addKpis();
  y += kpiHeight;
  y = drawTableHeader(y);

  const maxRowsPerPage = Math.floor((pageH - y - 22) / rowH);
  let pageNum = 1;
  const totalPages = Math.max(1, Math.ceil(rows.length / maxRowsPerPage) || 1);

  if (rows.length === 0) {
    pdf.setTextColor(107, 114, 128);
    pdf.setFontSize(9);
    pdf.text("Nenhuma melhoria encontrada.", margin + 5, y + 12);
  } else {
    rows.forEach((row, i) => {
      if (i > 0 && i % maxRowsPerPage === 0) {
        addFooter(pageNum, totalPages);
        pdf.addPage("a4", "l");
        pageNum++;
        y = margin;
        addHeader();
        addKpis();
        y += kpiHeight;
        y = drawTableHeader(y);
      }
      y = drawTableRow(row, y, i % 2 === 1);
    });
  }

  addFooter(pageNum, totalPages);
  pdf.save("relatorio-melhorias-" + new Date().toISOString().slice(0, 10) + ".pdf");
}

function openImprovementsReportModal() {
  const modal = byId("improvements-report-modal");
  const bodyEl = document.querySelector("[data-improvements-report-body]");
  const dateEl = document.querySelector("[data-improvements-report-date]");
  if (!modal || !bodyEl) return;

  const improvements = (Array.isArray(state.improvements) ? state.improvements : [])
    .slice()
    .sort((a, b) => {
      const ar = improvementStageRank(a?.stage || a?.status);
      const br = improvementStageRank(b?.stage || b?.status);
      if (ar !== br) return ar - br;
      return String(b?.id || "").localeCompare(String(a?.id || ""));
    });
  const stageLabel = (id) => IMPROVEMENT_STAGE_MAP.get(id)?.label || id;
  const stageColorClass = {
    triagem: "bg-slate-400",
    analise_tecnica: "bg-amber-500",
    implementacao: "bg-indigo-500",
    validacao: "bg-cyan-500",
    concluido: "bg-emerald-600"
  };

  const dataset = improvements.map((it) => {
    const stageId = normalizeImprovementStage(it?.stage || it?.status);
    const execName = String(it?.executor || it?.owner || "").trim() || "A definir";
    const initials = initialsFromName(execName);
    return {
      improvement: it,
      id: improvementDisplayId(it),
      name: String(it?.name || "-"),
      statusId: stageId,
      status: stageLabel(stageId),
      exec: initials || "AD",
      executorName: execName,
      progress: improvementStageInfo(it).progress,
      color: stageColorClass[stageId] || "bg-slate-400"
    };
  });

  const execOptions = Array.from(new Set(dataset.map((item) => item.exec))).sort();
  const dateStr = new Date().toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });
  if (dateEl) dateEl.textContent = `Gerado em ${dateStr}`;

  bodyEl.innerHTML = `
    <style>
      .impr-export-wrap { color: #1e293b; background: #f8fafc; padding: 8px; border-radius: 12px; }
      .impr-export-page { background: #fff; min-height: 297mm; margin: 0 auto; padding: 10mm 15mm; border-radius: 8px; border: 1px solid #e2e8f0; position: relative; }
      .impr-export-filter { margin: 0 auto 20px auto; background: #fff; padding: 15px; border-radius: 8px; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); display: flex; gap: 15px; align-items: flex-end; }
      .impr-export-filter label { display: block; font-size: 10px; font-weight: 700; text-transform: uppercase; color: #94a3b8; margin-bottom: 4px; }
      .impr-export-filter input,.impr-export-filter select { border: 1px solid #e2e8f0; border-radius: 6px; padding: 8px 10px; font-size: 13px; }
      .impr-export-filter input { min-width: 280px; width: 100%; }
      .impr-export-filter .is-grow { flex: 1; min-width: 240px; }
      .impr-export-table { width: 100%; border-collapse: collapse; }
      .impr-export-table th { text-align: left; font-size: 10px; color: #94a3b8; text-transform: uppercase; letter-spacing: .05em; padding: 8px 12px; border-bottom: 1px solid #e2e8f0; background: #f8fafc; }
      .impr-export-table td { padding: 6px 12px; font-size: 11px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
      .impr-export-table tr:hover { background-color: #f8fafc; }
      .impr-export-badge { padding: 2px 6px; border-radius: 6px; font-size: 9px; font-weight: 700; white-space: nowrap; }
      .impr-export-avatar { width: 22px; height: 22px; border-radius: 999px; display: inline-flex; align-items: center; justify-content: center; font-size: 9px; font-weight: 700; color: #fff; }
      .impr-export-pbar { height: 4px; background: #e2e8f0; border-radius: 2px; width: 40px; overflow: hidden; }
      .impr-export-kpis { display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 12px; margin-bottom: 20px; }
      .impr-export-kpi { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 10px; }
      .impr-export-kpi p { margin: 0; }
      .impr-export-kpi .k-label { font-size: 9px; text-transform: uppercase; font-weight: 700; color: #94a3b8; margin-bottom: 4px; }
      .impr-export-kpi .k-val { font-size: 20px; font-weight: 800; color: #0f172a; }
      .impr-export-footer { position: absolute; left: 15mm; right: 15mm; bottom: 8mm; display: flex; justify-content: space-between; align-items: center; font-size: 8px; color: #94a3b8; text-transform: uppercase; font-weight: 700; border-top: 1px solid #e2e8f0; padding-top: 6px; }
      .impr-export-empty { text-align: center; padding: 32px 0; color: #94a3b8; font-style: italic; }
      @media (max-width: 1024px) {
        .impr-export-filter { flex-wrap: wrap; }
        .impr-export-kpis { grid-template-columns: repeat(2, minmax(0,1fr)); }
      }
      @media print {
        .impr-export-filter, .impr-print-inline { display: none !important; }
        .impr-export-wrap { background: #fff; padding: 0; }
        .impr-export-page { border: none; box-shadow: none; padding: 0; margin: 0; }
      }
    </style>
    <div class="impr-export-wrap">
      <div class="impr-export-filter">
        <div class="is-grow">
          <label>Buscar Melhoria</label>
          <input type="text" data-impr-report-search placeholder="Digite o nome ou ID...">
        </div>
        <div>
          <label>Status</label>
          <select data-impr-report-status>
            <option value="todos">Todos os Status</option>
            <option value="implementacao">Implementacao</option>
            <option value="triagem">Triagem</option>
            <option value="analise_tecnica">Analise Tecnica</option>
            <option value="validacao">Validacao</option>
            <option value="concluido">Concluido</option>
          </select>
        </div>
        <div>
          <label>Executor</label>
          <select data-impr-report-executor>
            <option value="todos">Todos</option>
            ${execOptions.map((e) => `<option value="${escapeHtml(e)}">${escapeHtml(e)}</option>`).join("")}
          </select>
        </div>
        <button type="button" class="btn primary impr-print-inline" data-impr-report-print-inline>Gerar PDF</button>
      </div>

      <div class="impr-export-page" data-impr-report-page>
        <div class="flex justify-between items-start border-b border-slate-100 pb-4 mb-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <div class="w-6 h-6 bg-[#1A2B4B] rounded flex items-center justify-center"><span class="text-white font-bold text-[10px]">A</span></div>
              <h1 class="font-bold text-lg tracking-tight">JP Projects</h1>
            </div>
            <h2 class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Relatorio de Melhorias</h2>
          </div>
          <div class="text-right text-[9px] space-y-0.5">
            <p><span class="text-slate-400 uppercase">Gerado em:</span> <span class="font-semibold" data-impr-report-current-date>${escapeHtml(dateStr)}</span></p>
            <p><span class="text-slate-400 uppercase">Filtro aplicado:</span> <span class="font-semibold text-indigo-600" data-impr-report-filter-label>Nenhum</span></p>
          </div>
        </div>

        <div class="impr-export-kpis">
          <div class="impr-export-kpi"><p class="k-label">Total Filtrado</p><p class="k-val" data-impr-report-kpi-total>0</p></div>
          <div class="impr-export-kpi"><p class="k-label">Em Execucao</p><p class="k-val text-indigo-600" data-impr-report-kpi-exec>0</p></div>
          <div class="impr-export-kpi"><p class="k-label">Concluidos</p><p class="k-val text-emerald-600" data-impr-report-kpi-done>0</p></div>
          <div class="impr-export-kpi"><p class="k-label">Progresso Medio</p><p class="k-val" data-impr-report-kpi-avg>0%</p></div>
        </div>

        <table class="impr-export-table">
          <thead>
            <tr>
              <th style="width: 12%">ID</th>
              <th style="width: 38%">Atividade / Melhoria</th>
              <th style="width: 18%">Status / Etapa</th>
              <th style="width: 12%">Responsavel</th>
              <th style="width: 20%">Progresso</th>
            </tr>
          </thead>
          <tbody data-impr-report-table></tbody>
        </table>

        <div class="impr-export-footer">
          <p>JP Projects - Gestao de Backlog de Valor</p>
          <p>Pagina 1 de 1</p>
        </div>
      </div>
    </div>
  `;

  const searchInput = bodyEl.querySelector("[data-impr-report-search]");
  const statusFilter = bodyEl.querySelector("[data-impr-report-status]");
  const executorFilter = bodyEl.querySelector("[data-impr-report-executor]");
  const tableBody = bodyEl.querySelector("[data-impr-report-table]");
  const filterLabelEl = bodyEl.querySelector("[data-impr-report-filter-label]");
  const kpiTotalEl = bodyEl.querySelector("[data-impr-report-kpi-total]");
  const kpiExecEl = bodyEl.querySelector("[data-impr-report-kpi-exec]");
  const kpiDoneEl = bodyEl.querySelector("[data-impr-report-kpi-done]");
  const kpiAvgEl = bodyEl.querySelector("[data-impr-report-kpi-avg]");

  const avatarColor = (initials) => {
    const map = { FB: "bg-emerald-500", JD: "bg-blue-500", VM: "bg-violet-500" };
    return map[String(initials || "").toUpperCase()] || "bg-slate-500";
  };
  const countByStage = (list, id) => list.filter((item) => item.statusId === id).length;
  const syncReportData = (list) => {
    const reportRows = list.map((item) => ({
      improvement: item.improvement,
      stageId: item.statusId,
      stageLabel: item.status
    }));
    const total = list.length;
    const triagem = countByStage(list, "triagem");
    const emExecucao = list.filter((item) => ["analise_tecnica", "implementacao", "validacao"].includes(item.statusId)).length;
    const concluido = countByStage(list, "concluido");
    state.improvementsReportData = {
      reportRows,
      total,
      triagem,
      emExecucao,
      concluido,
      dateStr,
      stageLabel
    };
  };
  const updateKpis = (list) => {
    const total = list.length;
    const exec = list.filter((item) => item.statusId === "implementacao").length;
    const done = list.filter((item) => item.statusId === "concluido").length;
    const avg = total ? weightedProgressPct(list) : 0;
    if (kpiTotalEl) kpiTotalEl.textContent = String(total);
    if (kpiExecEl) kpiExecEl.textContent = String(exec);
    if (kpiDoneEl) kpiDoneEl.textContent = String(done);
    if (kpiAvgEl) kpiAvgEl.textContent = `${avg}%`;
  };
  const renderTable = (list) => {
    if (!tableBody) return;
    if (!list.length) {
      tableBody.innerHTML = `<tr><td colspan="5" class="impr-export-empty">Nenhuma atividade encontrada com os filtros selecionados.</td></tr>`;
      updateKpis([]);
      syncReportData([]);
      return;
    }
    tableBody.innerHTML = list
      .map(
        (item) => `
          <tr>
            <td><span class="impr-export-badge bg-indigo-50 text-indigo-600 border border-indigo-100">${escapeHtml(item.id)}</span></td>
            <td class="font-medium text-slate-700">${escapeHtml(item.name)}</td>
            <td>
              <div class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full ${escapeHtml(item.color)}"></span>
                <span>${escapeHtml(item.status)}</span>
              </div>
            </td>
            <td><span class="impr-export-avatar ${avatarColor(item.exec)}">${escapeHtml(item.exec)}</span></td>
            <td>
              <div class="flex items-center gap-2">
                <div class="impr-export-pbar"><div class="h-full ${escapeHtml(item.color)}" style="width:${Math.max(0, Math.min(100, Number(item.progress || 0)))}%"></div></div>
                <span class="font-bold text-[9px]">${Math.max(0, Math.min(100, Number(item.progress || 0)))}%</span>
              </div>
            </td>
          </tr>
        `
      )
      .join("");
    updateKpis(list);
    syncReportData(list);
  };
  const applyFilters = () => {
    const query = String(searchInput?.value || "").trim().toLowerCase();
    const status = String(statusFilter?.value || "todos");
    const executor = String(executorFilter?.value || "todos");
    const filtered = dataset.filter((item) => {
      const matchSearch = !query || item.name.toLowerCase().includes(query) || String(item.id).toLowerCase().includes(query);
      const matchStatus = status === "todos" || item.statusId === status;
      const matchExec = executor === "todos" || item.exec === executor;
      return matchSearch && matchStatus && matchExec;
    });
    const hasFilters = Boolean(query || status !== "todos" || executor !== "todos");
    if (filterLabelEl) filterLabelEl.textContent = hasFilters ? "Ativo" : "Nenhum";
    renderTable(filtered);
  };

  if (searchInput) searchInput.addEventListener("input", applyFilters);
  if (statusFilter) statusFilter.addEventListener("change", applyFilters);
  if (executorFilter) executorFilter.addEventListener("change", applyFilters);

  const inlinePrintBtn = bodyEl.querySelector("[data-impr-report-print-inline]");
  if (inlinePrintBtn) {
    inlinePrintBtn.addEventListener("click", () => {
      const content = bodyEl.querySelector("[data-impr-report-page]");
      if (!content) return;
      const w = window.open("", "_blank");
      if (!w) {
        alert("Permita pop-ups para imprimir.");
        return;
      }
      w.document.write(`<!DOCTYPE html><html><head><title>Relatorio de Melhorias</title></head><body>${content.outerHTML}</body></html>`);
      w.document.close();
      w.focus();
      w.print();
      w.close();
    });
  }

  applyFilters();
  modal.dataset.imprReportContent = "1";
  showModal(modal);

  const printBtn = modal.querySelector("[data-improvements-report-print]");
  const pdfBtn = modal.querySelector("[data-improvements-report-pdf]");
  if (printBtn && !printBtn.dataset.wired) {
    printBtn.addEventListener("click", () => {
      const content = modal.querySelector("[data-impr-report-page]");
      if (content) {
        const w = window.open("", "_blank");
        if (w) {
          w.document.write(`<!DOCTYPE html><html><head><title>Relatorio de Melhorias</title></head><body>${content.outerHTML}</body></html>`);
          w.document.close();
          w.focus();
          w.print();
          w.close();
        } else {
          alert("Permita pop-ups para imprimir.");
        }
      }
    });
    printBtn.dataset.wired = "1";
  }
  if (pdfBtn && !pdfBtn.dataset.wired) {
    pdfBtn.addEventListener("click", () => {
      const data = state.improvementsReportData;
      const JsPDF = window.jspdf?.jsPDF || window.jsPDF;
      if (!JsPDF || !data) {
        alert("Dados do relat\u00f3rio n\u00e3o dispon\u00edveis. Feche e abra o relat\u00f3rio novamente.");
        return;
      }
      try {
        exportImprovementsReportPdf(data);
      } catch (err) {
        console.error(err);
        alert("Erro ao exportar PDF.");
      }
    });
    pdfBtn.dataset.wired = "1";
  }
}

function openImprovementModal(improvementId = null) {
  const modal = byId("improvement-modal");
  const form = byId("improvement-form");
  const title = byId("improvement-modal-title");
  if (!modal || !form) return;
  const improvement = state.improvements.find((item) => item.id === improvementId) || null;
  state.editingImprovementId = improvement?.id || null;
  modal.dataset.improvementMaxStage = getImprovementMaxStageId(improvement || { stage: "triagem" });
  form.elements.name.value = improvement?.name || "";
  form.elements.client.value = improvement?.client || "";
  form.elements.owner.value = improvement?.owner || "";
  if (form.elements.origin) {
    const o = String(improvement?.origin || "email").trim().toLowerCase();
    form.elements.origin.value = ["chamado", "chamado_interno", "reuniao", "diretoria"].includes(o) ? o : "email";
  }
  if (form.elements.originRef) form.elements.originRef.value = improvement?.originRef || "";
  if (form.elements.description) form.elements.description.value = improvement?.description || "";
  if (form.elements.estimateHours) form.elements.estimateHours.value = improvement?.estimateHours ?? "";
  if (form.elements.estimator) form.elements.estimator.value = improvement?.estimator || "";
  if (form.elements.executor) form.elements.executor.value = improvement?.executor || "";
  const initialStage = improvement ? (improvement?.stage || improvement?.status) : (state.improvementNewStage || "triagem");
  if (form.elements.stage) form.elements.stage.value = normalizeImprovementStage(initialStage);
  state.improvementNewStage = null;
  form.elements.start.value = improvement?.start || "";
  form.elements.end.value = improvement?.end || "";
  applyImprovementStageNotesToForm(form, improvement?.stageNotes || improvement?.stageDetails || null);
  applyImprovementFieldRequirements(form, form.elements.stage?.value || "triagem");
  applyImprovementOriginRefVisibility(form, form.elements.origin?.value || "email");
  applyImprovementApprovalVisibility(modal, form.elements.stage?.value || "triagem");
  updateImprovementStageNotesActive(modal, form.elements.stage?.value || "triagem");
  applyImprovementStageNotesLocks(modal, modal.dataset.improvementMaxStage || "triagem");

  // Header meta: badge "NOVA MELHORIA", "Ticket #X", titulo = nome
  const codeEl = modal.querySelector("[data-improvement-code]");
  if (codeEl) {
    codeEl.textContent = improvement ? improvementDisplayId(improvement) : "NOVA MELHORIA";
    codeEl.classList.toggle("imprm-pill--nova", !improvement);
  }
  const projEl = modal.querySelector("[data-improvement-project]");
  if (projEl) projEl.textContent = improvement ? `Ticket #${improvement.id || improvementDisplayId(improvement) || "---"}` : "Ticket #---";
  if (title) title.textContent = improvement ? (improvement.name || "Sem titulo") : "Registar Nova Melhoria";

  if (form.elements.stage && !form.elements.stage.dataset.wired) {
    form.elements.stage.addEventListener("change", () => {
      applyImprovementFieldRequirements(form, form.elements.stage?.value || "triagem");
      updateImprovementStageNotesActive(modal, form.elements.stage?.value || "triagem");
      applyImprovementApprovalVisibility(modal, form.elements.stage?.value || "triagem");
      applyImprovementStageNotesLocks(modal, modal.dataset.improvementMaxStage || "triagem");
    });
    form.elements.stage.dataset.wired = "true";
  }
  if (form.elements.origin && !form.elements.origin.dataset.wired) {
    form.elements.origin.addEventListener("change", () => {
      applyImprovementOriginRefVisibility(form, form.elements.origin?.value || "email");
    });
    form.elements.origin.dataset.wired = "true";
  }

  // Logs
  renderImprovementLogList(modal, improvement || { logs: [] });
  const logInput = modal.querySelector("[data-improvement-log-input]");
  const logAddBtn = modal.querySelector("[data-improvement-log-add]");
  const addLogEntry = () => {
    const txt = String(logInput?.value || "").trim();
    if (!txt) return;
    if (!state.editingImprovementId) {
      alert("Salve a melhoria antes de adicionar logs.");
      return;
    }
    const ref = (state.improvements || []).find((it) => String(it?.id || "") === String(state.editingImprovementId || "")) || null;
    if (!ref) return;
    if (!Array.isArray(ref.logs)) ref.logs = [];
    const user = (state.currentUserEmail || "Usuario").trim() || "Usuario";
    ref.logs.push({ id: `log_${Date.now().toString(36)}`, user, action: txt, createdAt: Date.now() });
    saveLocalState();
    if (logInput) logInput.value = "";
    renderImprovementLogList(modal, ref);
  };
  if (logAddBtn && !logAddBtn.dataset.wired) {
    logAddBtn.addEventListener("click", addLogEntry);
    logAddBtn.dataset.wired = "true";
  }
  if (logInput && !logInput.dataset.wired) {
    logInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        addLogEntry();
      }
    });
    logInput.dataset.wired = "true";
  }

  // Delete
  const delBtn = modal.querySelector("[data-improvement-delete]");
  if (delBtn && !delBtn.dataset.wired) {
    delBtn.addEventListener("click", () => {
      if (!state.editingImprovementId) return;
      const confirmed = window.confirm("Excluir esta melhoria?");
      if (!confirmed) return;
      state.improvements = (state.improvements || []).filter((it) => String(it?.id || "") !== String(state.editingImprovementId || ""));
      saveLocalState();
      hideModal(modal);
      resetImprovementModal();
      renderMain();
    });
    delBtn.dataset.wired = "true";
  }

  showModal(modal);
  if (window.lucide) window.lucide.createIcons();

  // Approval preview.
  const approvalMeta = modal.querySelector("[data-improvement-approval-meta]");
  if (approvalMeta) {
    const ap = improvement?.clientApproval || null;
    if (!hasClientApproval(ap)) {
      approvalMeta.innerHTML = `<div>Nenhum anexo.</div>`;
    } else {
      const url = typeof ap === "object" ? String(ap.dataUrl || ap.url || "") : String(ap || "");
      const name = typeof ap === "object" ? String(ap.name || "de_acordo") : "de_acordo";
      approvalMeta.innerHTML = `
        <div>Anexo atual: <a href="${escapeHtml(url)}" download="${escapeHtml(name)}">${escapeHtml(name)}</a></div>
      `;
    }
  }

  // Optional focus when modal was opened by a blocked move.
  const focus = state.improvementsModalFocus || null;
  state.improvementsModalFocus = null;
  if (focus && focus.kind === "note" && focus.stageId) {
    const tabEtapas = modal.querySelector('[data-imprm-tab="etapas"]');
    const panelEtapas = modal.querySelector('[data-imprm-panel="etapas"]');
    if (tabEtapas && panelEtapas) {
      modal.querySelectorAll(".imprm-tab").forEach((t) => t.classList.remove("imprm-tab--active"));
      modal.querySelectorAll(".imprm-panel").forEach((p) => p.classList.remove("imprm-panel--active"));
      tabEtapas.classList.add("imprm-tab--active");
      panelEtapas.classList.add("imprm-panel--active");
    }
    focusImprovementStageNote(modal, focus.stageId);
  } else if (focus && focus.kind === "approval") {
    const input = form.elements.clientApproval;
    if (input) input.focus();
  }
}

function resetImprovementModal() {
  const form = byId("improvement-form");
  const title = byId("improvement-modal-title");
  const modal = byId("improvement-modal");
  state.editingImprovementId = null;
  if (form) form.reset();
  if (title) title.textContent = "Registar Nova Melhoria";
  if (modal) {
    delete modal.dataset.improvementMaxStage;
    const codeEl = modal.querySelector("[data-improvement-code]");
    if (codeEl) {
      codeEl.textContent = "NOVA MELHORIA";
      codeEl.classList.add("imprm-pill--nova");
    }
    const projEl = modal.querySelector("[data-improvement-project]");
    if (projEl) projEl.textContent = "Ticket #---";
    updateImprovementStageNotesActive(modal, "triagem");
    applyImprovementStageNotesLocks(modal, "triagem");
    renderImprovementLogList(modal, { logs: [] });
    const logInput = modal.querySelector("[data-improvement-log-input]");
    if (logInput) logInput.value = "";
    applyImprovementApprovalVisibility(modal, "triagem");
    const approvalMeta = modal.querySelector("[data-improvement-approval-meta]");
    if (approvalMeta) approvalMeta.innerHTML = "";
  }
}

function deleteTaskByIndex(idx) {
  const project = state.selectedProject;
  if (!project || !project.tasks || !project.tasks[idx]) return;
  const keepClientId = state.selectedClient?.id;
  const keepProjectId = state.selectedProject?.id;
  const keepClientName = state.selectedClient?.name;
  const keepProjectName = state.selectedProject?.name;
  const task = project.tasks[idx];
  // Optimistic local delete first.
  project.tasks.splice(idx, 1);
  sanitizeProjectPackageParents(project);
  saveLocalState();
  renderMain();

  if (db && project.id && project.clientId && task.id) {
    deleteTaskFromDb(project.clientId, project.id, task.id)
      .then(async () => {
        // After deleting a task, clean stale macro-parent links that referenced it.
        const nextPackageParents = sanitizeProjectPackageParents(project);
        await updateProjectPackageParentsOnDb(project.clientId, project.id, nextPackageParents);
        await loadStateFromDb({
          clientId: keepClientId,
          projectId: keepProjectId,
          clientName: keepClientName,
          projectName: keepProjectName
        });
      })
      .catch((err) => {
        console.error(err);
        alert(`Exclusao aplicada localmente, mas falhou sincronizacao no Firebase.\n${firebaseErrorLabel(err)}`);
      });
    return;
  }
}

function findClientByName(name) {
  if (!name) return null;
  const normalized = name.trim().toLowerCase();
  return state.clients.find((client) => client.name.trim().toLowerCase() === normalized) || null;
}

function addClientToState(name) {
  const existing = findClientByName(name);
  if (existing) return existing;
  const client = { name, projects: [], squads: [] };
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
    squadId: payload.squadId || "",
    team: Array.isArray(payload.team) ? payload.team : [],
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
    if (!getPackagePhases().includes((task.phase || "").toUpperCase())) return;
    const label = extractPackageLabel(task);
    if (label) unique.add(label);
  });
  return Array.from(unique);
}

function normalizePackageParentsMap(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const out = {};
  Object.entries(value).forEach(([k, v]) => {
    const key = normalizePackageLabel(k);
    const parent = normalizePackageLabel(v);
    if (!key) return;
    if (parent) out[key] = parent;
  });
  return out;
}

function sanitizeProjectPackageParents(project) {
  const raw =
    project?.packageParents ||
    project?.package_parents ||
    project?.packageParent ||
    project?.package_parent ||
    {};
  const map = normalizePackageParentsMap(raw);
  const tasks = Array.isArray(project?.tasks) ? project.tasks : [];

  // Children are real macro labels (package values found in tasks).
  const childLabels = new Set(derivePackagesFromTasks(tasks).map((x) => normalizePackageLabel(x)));

  // Parents can be another macro label OR an existing task-title anchor.
  const parentLabels = new Set(childLabels);
  tasks.forEach((t) => {
    const title = normalizePackageLabel(String(t?.title || ""));
    if (title) parentLabels.add(title);
  });

  const out = {};
  Object.entries(map).forEach(([child, parent]) => {
    const c = normalizePackageLabel(child);
    const p = normalizePackageLabel(parent);
    if (!c || !p) return;
    if (c === p) return;
    if (!childLabels.has(c)) return;
    if (!parentLabels.has(p)) return;
    out[c] = p;
  });

  // Break cycles defensively.
  const hasCycle = (start, dict) => {
    const seen = new Set([start]);
    let p = normalizePackageLabel(dict[start] || "");
    while (p) {
      if (seen.has(p)) return true;
      seen.add(p);
      p = normalizePackageLabel(dict[p] || "");
    }
    return false;
  };
  Object.keys(out).forEach((child) => {
    if (hasCycle(child, out)) delete out[child];
  });

  project.packageParents = out;
  return out;
}

function getProjectPackageParents(project) {
  if (!project) return {};
  return sanitizeProjectPackageParents(project);
}

function wouldCreateMacroCycle(project, childLabel, parentLabel) {
  const child = normalizePackageLabel(childLabel);
  const parent = normalizePackageLabel(parentLabel);
  if (!child || !parent) return false;
  const map = getProjectPackageParents(project);
  const visited = new Set();
  let p = parent;
  while (p) {
    if (p === child) return true;
    if (visited.has(p)) return true; // existing cycle
    visited.add(p);
    p = normalizePackageLabel(map[p] || "");
  }
  return false;
}

function setProjectMacroParent(project, childLabel, parentLabel) {
  if (!project) return;
  const child = normalizePackageLabel(childLabel);
  const parent = normalizePackageLabel(parentLabel);
  if (!child) return;
  const map = getProjectPackageParents(project);
  if (!parent) delete map[child];
  else map[child] = parent;
  project.packageParents = map;
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

function addEpicToProject(project, label) {
  if (!project) return "";
  const normalized = normalizePhaseLabel(label);
  if (!normalized) return "";
  if (normalized === "OUTROS") return "";
  const list = Array.isArray(project.epics) ? project.epics.filter((x) => typeof x === "string" && x.trim()) : [];
  const exists = list.some((e) => e.toUpperCase() === normalized);
  if (!exists) list.push(normalized);
  project.epics = list;
  return normalized;
}

function promptNewPackageName() {
  const name = window.prompt("Nome do pacote (ex.: Pacote 01: 5 entregas prioritarias)");
  if (!name) return "";
  return name.trim();
}

function promptNewEpicName() {
  const name = window.prompt("Nome do epico (fase) (ex.: INTEGRACAO / TREINAMENTO / HOMOLOGACAO)");
  if (!name) return "";
  return name.trim();
}

async function clearOutrosTasks() {
  const project = state.selectedProject;
  const client = state.selectedClient;
  if (!project || !client) return;
  const list = Array.isArray(project.tasks) ? project.tasks : [];
  if (!list.length) {
    alert("Nao ha atividades para limpar.");
    return;
  }

  const outrosIdx = [];
  list.forEach((t, idx) => {
    if (!t) return;
    const phase = normalizePhaseLabel(t.phase || "OUTROS");
    if (phase === "OUTROS") outrosIdx.push(idx);
  });

  if (!outrosIdx.length) {
    alert('Nao ha atividades dentro de "OUTROS".');
    return;
  }

  const confirmed = window.confirm(
    `Excluir todas as ${outrosIdx.length} atividade(s) do epico "OUTROS"?\n\nEssa acao nao pode ser desfeita.`
  );
  if (!confirmed) return;

  const keepClientId = client?.id;
  const keepProjectId = project?.id;
  const keepClientName = client?.name;
  const keepProjectName = project?.name;

  // Firebase: delete by id; Local: just filter.
  if (db && project.id && project.clientId) {
    const ids = outrosIdx
      .map((idx) => list[idx]?.id)
      .filter(Boolean);
    try {
      // Best-effort: ignore items without id (shouldn't happen in DB mode).
      await Promise.allSettled(ids.map((id) => deleteTaskFromDb(project.clientId, project.id, id)));
      await loadStateFromDb({
        clientId: keepClientId,
        projectId: keepProjectId,
        clientName: keepClientName,
        projectName: keepProjectName
      });
    } catch (err) {
      console.error(err);
      alert('Erro ao limpar atividades de "OUTROS" no Firebase.');
    }
    return;
  }

  project.tasks = list.filter((t) => normalizePhaseLabel(t?.phase || "OUTROS") !== "OUTROS");
  saveLocalState();
  renderMain();
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

function createSquadId() {
  if (typeof crypto !== "undefined" && crypto?.randomUUID) return crypto.randomUUID();
  return `sqd_${Math.random().toString(16).slice(2)}_${Date.now()}`;
}

function normalizeSquadName(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function parseSquadMembers(value) {
  if (!value) return [];
  return String(value)
    .split(/[;,|]/g)
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 30);
}

function resolveSquadName(client, squadId) {
  if (!client || !squadId) return "";
  const squads = Array.isArray(client.squads) ? client.squads : [];
  const found = squads.find((s) => s?.id === squadId);
  return found?.name || "";
}

function renderClientSquads() {
  const list = byId("client-squads-list");
  if (!list) return;
  const client = getClientFromModal();
  const squads = Array.isArray(client?.squads) ? client.squads : [];
  if (!squads.length) {
    list.textContent = "Nenhum squad cadastrado.";
    return;
  }
  list.innerHTML = squads
    .map((s) => {
      const members = Array.isArray(s.members) ? s.members : [];
      const membersLabel = members.length ? members.join("; ") : "-";
      return `
        <div class="squad-item" data-squad-id="${escapeHtml(s.id)}">
          <div>
            <div class="squad-item-title">${escapeHtml(s.name || "Squad")}</div>
            <div class="squad-item-members">${escapeHtml(membersLabel)}</div>
          </div>
          <div class="squad-item-actions">
            <button class="btn sm ghost" type="button" data-squad-edit>Editar</button>
            <button class="btn sm ghost danger" type="button" data-squad-delete>Excluir</button>
          </div>
        </div>
      `;
    })
    .join("");
}

function hydrateProjectSquadSelect(clientName) {
  const select = byId("project-squad-select");
  const clientSelect = byId("project-client-select");
  if (!select) return;
  const name = clientName || clientSelect?.value || state.selectedClient?.name || "";
  const client = name ? state.clients.find((c) => c.name === name) : state.selectedClient;
  const squads = Array.isArray(client?.squads) ? client.squads : [];
  const current = select.value || "";
  select.innerHTML = `<option value="">Sem squad</option>`;
  squads.forEach((s) => {
    const opt = document.createElement("option");
    opt.value = s.id;
    opt.textContent = s.name || "Squad";
    select.appendChild(opt);
  });
  // Keep selection if still valid
  const stillValid = current && squads.some((s) => s.id === current);
  select.value = stillValid ? current : "";
}

function normalizeTeamRole(value) {
  const v = String(value || "").trim().toLowerCase();
  if (!v) return "";
  const match = PROJECT_ROLE_OPTIONS.find((opt) => opt.value === v);
  return match ? match.value : v;
}

function resolveSquadMembersForProject(client, project) {
  const squadId = project?.squadId || "";
  if (!client || !squadId) return [];
  const squads = Array.isArray(client.squads) ? client.squads : [];
  const squad = squads.find((s) => s?.id === squadId) || null;
  const members = Array.isArray(squad?.members) ? squad.members : [];
  return members.map((m) => normalizeTeamMemberName(m)).filter(Boolean);
}

function buildProjectMembersPolicy(project, client) {
  const team = Array.isArray(project?.team) ? project.team : [];
  const squadMembers = resolveSquadMembersForProject(client, project);
  const squadKeySet = new Set(squadMembers.map((n) => normHeader(n)));
  const inSquad = (name) => {
    if (!name) return false;
    if (!squadKeySet.size) return true; // no squad: allow project team
    return squadKeySet.has(normHeader(name));
  };

  const leaders = team
    .filter((m) => normalizeTeamRole(m?.role) === "lider_projeto")
    .map((m) => normalizeTeamMemberName(m?.name))
    .filter(Boolean)
    .filter(inSquad);
  const developers = team
    .filter((m) => normalizeTeamRole(m?.role) === "desenvolvedor")
    .map((m) => normalizeTeamMemberName(m?.name))
    .filter(Boolean)
    .filter(inSquad);

  // Fallbacks (keeps UX working even if team is incomplete)
  const fallbackLeader = leaders[0] || "";
  const fallbackDev =
    developers[0] ||
    (inSquad(project?.developer) ? normalizeTeamMemberName(project?.developer) : "") ||
    "";

  return {
    leaders,
    developers,
    leader: fallbackLeader,
    defaultDev: fallbackDev
  };
}

function phaseMembersRule(phase) {
  const p = normalizePhaseLabel(phase || "OUTROS");
  if (p === "LEVANTAMENTO") return { needsLeader: true, needsDev: false };
  if (p === "DESENVOLVIMENTO") return { needsLeader: false, needsDev: true };
  if (p === "TESTES") return { needsLeader: true, needsDev: true };
  if (p === "DEPLOY") return { needsLeader: true, needsDev: true };
  return { needsLeader: false, needsDev: false };
}

function parseTaskMembersList(task) {
  const raw =
    task?.members ||
    task?.membros ||
    task?.owners ||
    task?.responsibles ||
    taskOwner(task) ||
    task?.responsavel ||
    task?.responsible ||
    "";
  const list = Array.isArray(raw)
    ? raw
    : String(raw || "")
        .split(/[;,|]/g)
        .map((s) => s.trim())
        .filter(Boolean);
  return list.map((x) => normalizeTeamMemberName(x)).filter(Boolean);
}

function computeEffectiveMembersForTask(task, project, client) {
  const members = parseTaskMembersList(task);
  if (members.length) return members;

  const policy = buildProjectMembersPolicy(project, client);
  const phase = normalizePhaseLabel(task?.phase || "OUTROS");
  const rule = phaseMembersRule(phase);

  const out = [];
  if (rule.needsLeader && policy.leader) out.push(policy.leader);
  if (rule.needsDev) {
    if (policy.developers.length === 1) {
      out.push(policy.developers[0]);
    }
    // If multiple devs exist, leave blank so the UI can request a pick.
  }
  return out;
}

function hasAnyDeveloperSelected(task, project, client) {
  const members = parseTaskMembersList(task);
  if (!members.length) return false;
  const policy = buildProjectMembersPolicy(project, client);
  const devKeySet = new Set(policy.developers.map((n) => normHeader(n)));
  return members.some((m) => devKeySet.has(normHeader(m)));
}

function normalizeTeamMemberName(value) {
  return String(value || "").trim().replace(/\s+/g, " ");
}

function renderProjectTeamPicker(team = []) {
  const picker = byId("project-team-picker");
  if (!picker) return;

  const current = Array.isArray(team) ? team : [];
  const selectedByName = new Map(current.map((m) => [normHeader(m?.name), normalizeTeamRole(m?.role)]));

  if (!PROJECT_TEAM_DIRECTORY.length) {
    picker.innerHTML = `<div class="project-team-empty">Diretorio de equipe vazio.</div>`;
    return;
  }

  const roleOptionsHtml = PROJECT_ROLE_OPTIONS.map(
    (r) => `<option value="${r.value}">${escapeHtml(r.label)}</option>`
  ).join("");

  picker.innerHTML = PROJECT_TEAM_DIRECTORY.map((p) => {
    const key = normHeader(p.name);
    const selectedRole = selectedByName.get(key) || p.defaultRole || "desenvolvedor";
    const checked = selectedByName.has(key);
    return `
      <div class="project-team-row" data-team-row="${escapeHtml(key)}">
        <input type="checkbox" data-team-check value="${escapeHtml(p.name)}" ${checked ? "checked" : ""}>
        <div class="project-team-name" title="${escapeHtml(p.name)}">${escapeHtml(p.name)}</div>
        <select class="config-input project-team-role" data-team-role ${checked ? "" : "disabled"}>
          ${roleOptionsHtml}
        </select>
      </div>
    `;
  }).join("");

  picker.querySelectorAll("[data-team-row]").forEach((row) => {
    const check = row.querySelector("[data-team-check]");
    const role = row.querySelector("[data-team-role]");
    const key = row.dataset.teamRow;
    const person = PROJECT_TEAM_DIRECTORY.find((p) => normHeader(p.name) === key);
    const desiredRole = selectedByName.get(key) || person?.defaultRole || "desenvolvedor";
    if (role) role.value = desiredRole;
    if (check && role) {
      check.addEventListener("change", () => {
        role.disabled = !check.checked;
      });
    }
  });
}

function readProjectTeamFromPicker() {
  const picker = byId("project-team-picker");
  if (!picker) return [];
  const out = [];
  picker.querySelectorAll(".project-team-row").forEach((row) => {
    const check = row.querySelector("[data-team-check]");
    const role = row.querySelector("[data-team-role]");
    if (!check || !role) return;
    if (!check.checked) return;
    const name = normalizeTeamMemberName(check.value);
    const r = normalizeTeamRole(role.value);
    if (!name || !r) return;
    out.push({ name, role: r });
  });
  return out;
}

function validateProjectTeam(team) {
  const list = Array.isArray(team) ? team : [];
  if (!list.length) return { ok: false, message: "Selecione ao menos 1 pessoa para a equipe do projeto." };
  const hasLeader = list.some((m) => normalizeTeamRole(m?.role) === "lider_projeto");
  if (!hasLeader) return { ok: false, message: "Selecione ao menos 1 Lider de Projeto." };
  return { ok: true, message: "" };
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
      const clientRef = clientDocRef(client.id);
      if (!clientRef) return;
      await clientRef.update({ name: trimmed });
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
  renderClientSquads();
  showModal(modal);
  if (nameInput) nameInput.focus();
}

function resetClientModal() {
  const modal = byId("client-modal");
  const form = byId("client-form");
  const deleteBtn = byId("delete-client-btn");
  const squadsList = byId("client-squads-list");
  const squadName = byId("client-squad-name");
  const squadMembers = byId("client-squad-members");
  if (form) {
    form.reset();
    delete form.dataset.clientId;
    delete form.dataset.clientName;
  }
  if (squadName) squadName.value = "";
  if (squadMembers) squadMembers.value = "";
  if (squadsList) squadsList.textContent = "Nenhum squad cadastrado.";
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
  hydrateProjectSquadSelect(select.value);

  if (!select.dataset.wired) {
    select.addEventListener("change", () => {
      hydrateProjectSquadSelect(select.value);
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
  if (!getPackagePhases().includes(phase)) {
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
  const tasks = projectAllTasks(project);
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
    // Clicking action buttons ("...") should not toggle expand/collapse rows.
    if (e.target.closest("[data-task-action], [data-macro-action], [data-epic-action]")) return;
    const projectBtn = e.target.closest("[data-project-toggle]");
    if (projectBtn) {
      state.collapsedPhases.__project__ = !state.collapsedPhases.__project__;
      renderMain();
      return;
    }
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
          saveLocalState();
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
    const btn = e.target.closest(".task-progress-btn, .tree-progress-btn");
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
    // Optional: keep status in sync with progress for leaf tasks.
    const prevStatus = task.status;
    if (progress >= 100) {
      applyTaskStatus(task, "concluido");
    } else if (progress > 0 && normalizeTaskStatus(getTaskStatus(task)) === "planejado") {
      applyTaskStatus(task, "em_andamento");
    }
    if (db && state.selectedProject.id && task.id) {
      const updates = [updateTaskProgressOnDb(state.selectedProject.clientId, state.selectedProject.id, task.id, progress)];
      if (task.status !== prevStatus) {
        updates.push(
          updateTaskStatusOnDb(state.selectedProject.clientId, state.selectedProject.id, task.id, {
            status: task.status,
            dataConclusao: task.dataConclusao ?? null
          })
        );
      }
      Promise.all(updates)
        .then(() => {
          hideProgressPopover();
          saveLocalState();
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
  const addBtn = byId("task-add-action");
  const editBtn = byId("task-edit-action");
  const deleteBtn = byId("task-delete-action");
  const createMacroBtn = byId("task-macro-create-action");
  const undoMacroBtn = byId("task-macro-undo-action");
  const undoMacroGroupBtn = byId("macro-undo-action");
  const clearOutrosBtn = byId("epic-clear-outros-action");

  document.body.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-task-action], [data-macro-action], [data-epic-action]");
    if (btn) {
      e.preventDefault();
      e.stopPropagation();
      openTaskActionsPopover(btn);
      return;
    }
    if (!e.target.closest("#task-actions-popover")) {
      hideTaskActionsPopover();
    }
  });

  if (addBtn) {
    addBtn.addEventListener("click", () => {
      const mode = popover.dataset.mode || "task";
      let defaults = {};

      if (mode === "epic") {
        const phase = normalizePhaseLabel(popover.dataset.epicPhase || "");
        if (!phase) return;
        defaults = { phase, package: "" };
      } else if (mode === "macro") {
        const phase = normalizePhaseLabel(popover.dataset.macroPhase || "");
        const pkg = normalizePackageLabel(popover.dataset.macroTitle || "");
        if (!phase) return;
        defaults = { phase, package: pkg || "" };
      } else {
        const idx = Number(popover.dataset.taskIndex);
        if (Number.isNaN(idx)) return;
        const task = state.selectedProject?.tasks?.[idx];
        if (!task) return;
        const phase = normalizePhaseLabel(task.phase || "OUTROS");
        const pkg = normalizePackageLabel(extractPackageLabel(task));
        defaults = { phase, package: pkg || "" };
      }

      hideTaskActionsPopover();
      openActivityModal("new", null, defaults);
    });
  }

  editBtn.addEventListener("click", () => {
    if (popover.dataset.mode && popover.dataset.mode !== "task") return;
    const idx = Number(popover.dataset.taskIndex);
    if (Number.isNaN(idx)) return;
    hideTaskActionsPopover();
    openActivityModal("edit", idx);
  });

  deleteBtn.addEventListener("click", () => {
    if (popover.dataset.mode === "epic") {
      const phase = normalizePhaseLabel(popover.dataset.epicPhase || "");
      if (!phase) return;
      if (phase === "OUTROS") return;
      const project = state.selectedProject;
      const list = Array.isArray(project?.tasks) ? project.tasks : [];
      const affected = list.filter((t) => normalizePhaseLabel(t?.phase || "OUTROS") === phase);
      const confirmed = window.confirm(
        `Excluir o epico "${phase}"?\n\n${affected.length ? `As ${affected.length} atividade(s) desse epico serao movidas para OUTROS.` : "Nao ha atividades dentro dele."}`
      );
      if (!confirmed) return;
      hideTaskActionsPopover();
      deleteEpicByPhase(phase).catch((err) => console.error(err));
      return;
    }
    if (popover.dataset.mode && popover.dataset.mode !== "task") return;
    const idx = Number(popover.dataset.taskIndex);
    if (Number.isNaN(idx)) return;
    const confirmed = window.confirm("Excluir esta atividade?");
    if (!confirmed) return;
    deleteTaskByIndex(idx);
    hideTaskActionsPopover();
  });

  if (clearOutrosBtn) {
    clearOutrosBtn.addEventListener("click", () => {
      if (popover.dataset.mode !== "epic") return;
      const phase = normalizePhaseLabel(popover.dataset.epicPhase || "");
      if (phase !== "OUTROS") return;
      hideTaskActionsPopover();
      clearOutrosTasks().catch((err) => console.error(err));
    });
  }

  const persistTaskPatch = async (idx, patch) => {
    const project = state.selectedProject;
    const client = state.selectedClient;
    if (!project || !client) return;
    const list = Array.isArray(project.tasks) ? project.tasks : [];
    const task = list[idx];
    if (!task) return;

    const payload = { ...task, ...patch };
    list[idx] = payload;

    if (db && project.id && project.clientId && task.id) {
      try {
        await updateTaskOnDb(project.clientId, project.id, task.id, payload);
        await loadStateFromDb({
          clientId: client.id,
          projectId: project.id,
          clientName: client.name,
          projectName: project.name
        });
      } catch (err) {
        console.error(err);
        alert("Erro ao atualizar atividade.");
      }
      return;
    }

    saveLocalState();
    renderMain();
  };

  if (createMacroBtn) {
    createMacroBtn.addEventListener("click", async () => {
      if (popover.dataset.mode && popover.dataset.mode !== "task") return;
      const idx = Number(popover.dataset.taskIndex);
      if (Number.isNaN(idx)) return;
      const project = state.selectedProject;
      if (!project) return;
      const task = project.tasks?.[idx];
      if (!task) return;
      const phase = normalizePhaseLabel(task.phase || "OUTROS");
      if (!getPackagePhases().includes(phase)) {
        alert(`Macros/pacotes estao disponiveis apenas nos epicos do projeto.`);
        return;
      }
      const name = promptNewPackageName();
      if (!name) return;
      const label = addPackageToProject(project, name);
      if (!label) return;

      hideTaskActionsPopover();

      if (db && project?.id && project?.clientId) {
        updateProjectPackagesOnDb(project.clientId, project.id, project.packages).catch((err) => console.error(err));
      } else {
        saveLocalState();
      }

      await persistTaskPatch(idx, { package: label });
    });
  }

  if (undoMacroBtn) {
    undoMacroBtn.addEventListener("click", async () => {
      if (popover.dataset.mode && popover.dataset.mode !== "task") return;
      const idx = Number(popover.dataset.taskIndex);
      if (Number.isNaN(idx)) return;
      const project = state.selectedProject;
      const task = project?.tasks?.[idx];
      if (!task) return;
      const confirmed = window.confirm("Desfazer macro desta atividade (remover do pacote)?");
      if (!confirmed) return;
      hideTaskActionsPopover();
      await persistTaskPatch(idx, { package: "" });
    });
  }

  if (undoMacroGroupBtn) {
    undoMacroGroupBtn.addEventListener("click", async () => {
      if (popover.dataset.mode !== "macro") return;
      const project = state.selectedProject;
      const client = state.selectedClient;
      if (!project || !client) return;
      const phase = normalizePhaseLabel(popover.dataset.macroPhase || "OUTROS");
      const macroTitle = String(popover.dataset.macroTitle || "").trim();
      if (!macroTitle) return;

      const confirmed = window.confirm(`Desfazer macro "${macroTitle}"? Todas as atividades sairao do pacote.`);
      if (!confirmed) return;

      const list = Array.isArray(project.tasks) ? project.tasks : [];
      const normMacro = normalizePackageLabel(macroTitle).toLowerCase();
      const affected = [];
      const phasePackages = new Set();
      list.forEach((t, idx) => {
        if (!t) return;
        const samePhase = normalizePhaseLabel(t.phase || "OUTROS") === phase;
        if (!samePhase) return;
        const pkg = normalizePackageLabel(extractPackageLabel(t));
        if (!pkg) return;
        phasePackages.add(pkg.toLowerCase());
        if (pkg.toLowerCase() !== normMacro) return;
        affected.push({ task: t, idx });
      });

      const packageParents = getProjectPackageParents(project);
      const structuralChildren = Object.keys(packageParents).filter((child) => {
        const c = normalizePackageLabel(child).toLowerCase();
        const p = normalizePackageLabel(packageParents[child]).toLowerCase();
        return p === normMacro && phasePackages.has(c);
      });
      const isStructuralMacroInPhase =
        phasePackages.has(normMacro) || structuralChildren.length > 0;

      if (!affected.length) {
        if (!isStructuralMacroInPhase) {
          alert("Nenhuma atividade encontrada dentro deste macro.");
          return;
        }

        hideTaskActionsPopover();

        const nextParents = { ...packageParents };
        // If this macro itself has a parent mapping, drop it.
        Object.keys(nextParents).forEach((child) => {
          const c = normalizePackageLabel(child).toLowerCase();
          if (c === normMacro) delete nextParents[child];
        });
        // Promote direct children to root by removing parent=macro links.
        Object.keys(nextParents).forEach((child) => {
          const c = normalizePackageLabel(child).toLowerCase();
          const p = normalizePackageLabel(nextParents[child]).toLowerCase();
          if (p === normMacro && phasePackages.has(c)) delete nextParents[child];
        });
        project.packageParents = normalizePackageParentsMap(nextParents);

        if (db && project.id && project.clientId) {
          try {
            await updateProjectPackageParentsOnDb(project.clientId, project.id, project.packageParents);
            await loadStateFromDb({
              clientId: client.id,
              projectId: project.id,
              clientName: client.name,
              projectName: project.name
            });
          } catch (err) {
            console.error(err);
            alert("Erro ao desfazer macro.");
          }
          return;
        }

        saveLocalState();
        renderMain();
        return;
      }

      hideTaskActionsPopover();

      // Optimistic UI update
      affected.forEach(({ idx }) => {
        project.tasks[idx] = { ...project.tasks[idx], package: "" };
      });

      if (db && project.id && project.clientId && affected.every(({ task }) => !!task.id)) {
        try {
          const updatesById = {};
          affected.forEach(({ task }) => {
            updatesById[task.id] = { package: "" };
          });
          await batchUpdateTasksOnDb(project.clientId, project.id, updatesById);
          await loadStateFromDb({
            clientId: client.id,
            projectId: project.id,
            clientName: client.name,
            projectName: project.name
          });
        } catch (err) {
          console.error(err);
          alert("Erro ao desfazer macro no Firebase.");
        }
        return;
      }

      saveLocalState();
      renderMain();
    });
  }
}

function setupTaskDragAndDrop() {
  if (document.body.dataset.taskDnDWired) return;
  document.body.dataset.taskDnDWired = "true";

  let draggingRef = null; // { kind:"task", idx:number } | { kind:"macro", phase:string, title:string } | { kind:"epic", phase:string }
  let overEl = null;

  const clearOver = () => {
    if (overEl) overEl.classList.remove("is-drag-over");
    overEl = null;
  };

  const clearDragging = () => {
    document.querySelectorAll(".is-dragging").forEach((el) => el.classList.remove("is-dragging"));
    draggingRef = null;
    clearOver();
  };

  const parseDragData = (dt) => {
    if (!dt) return null;
    try {
      const raw = dt.getData("text/plain");
      if (!raw) return null;
      const obj = JSON.parse(raw);
      if (
        obj &&
        typeof obj === "object" &&
        (obj.kind === "task" || obj.kind === "macro" || obj.kind === "epic")
      )
        return obj;
      return null;
    } catch (_err) {
      return null;
    }
  };

  const canDrop = (source, target) => {
    if (!target) return false;
    const kind = target.dataset.dropKind;
    if (!kind) return false;
    if (!source || !source.kind) return false;

    if (source.kind === "epic") {
      if (kind !== "epic") return false;
      if (target.dataset.epicReorder !== "1") return false;
      const srcPhase = normalizePhaseLabel(source.phase || "");
      const dstPhase = normalizePhaseLabel(target.dataset.dropPhase || "");
      if (!srcPhase || !dstPhase) return false;
      if (srcPhase === dstPhase) return false;
      return true;
    }

    if (source.kind === "task") {
      const sourceIdx = Number(source.idx);
      if (!Number.isFinite(sourceIdx)) return false;
      if (kind === "task") {
        const targetIdx = Number(target.dataset.dropTaskIndex);
        if (Number.isNaN(targetIdx)) return false;
        if (targetIdx === sourceIdx) return false;
      }
      return kind === "task" || kind === "macro" || kind === "epic";
    }

    // source.kind === "macro"
    // Allow nesting a macro under another macro, epic, or a task-row label (task becomes an "anchor" label).
    if (kind !== "macro" && kind !== "epic" && kind !== "task") return false;
    const srcPhase = normalizePhaseLabel(source.phase || "");
    const dstPhase = normalizePhaseLabel(target.dataset.dropPhase || "");
    if (!srcPhase || !dstPhase || srcPhase !== dstPhase) return false;
    if (kind === "macro") {
      const srcTitle = normalizePackageLabel(source.title || "");
      const dstTitle = normalizePackageLabel(target.dataset.dropMacroTitle || "");
      if (!srcTitle || !dstTitle) return false;
      if (srcTitle === dstTitle) return false;
    } else if (kind === "task") {
      const srcTitle = normalizePackageLabel(source.title || "");
      const dstTitle = normalizePackageLabel(target.dataset.dropTaskTitle || "");
      if (!srcTitle || !dstTitle) return false;
      if (srcTitle === dstTitle) return false;
    }
    return true;
  };

  const applyMove = async (source, target, ev = null) => {
    const project = state.selectedProject;
    const client = state.selectedClient;
    if (!project || !client) return;

    const kind = target.dataset.dropKind;
    const dropPhase = normalizePhaseLabel(target.dataset.dropPhase || "OUTROS");

    if (source.kind === "epic") {
      if (kind !== "epic") return;
      if (target.dataset.epicReorder !== "1") return;
      const srcPhase = normalizePhaseLabel(source.phase || "");
      const dstPhase = dropPhase;
      if (!srcPhase || !dstPhase || srcPhase === dstPhase) return;

      // Epics are ordered by `project.epics` (fallback to default only if missing).
      const list = Array.isArray(project.epics) ? project.epics.slice() : [];
      const srcIdx = list.findIndex((p) => normalizePhaseLabel(p) === srcPhase);
      const dstIdx0 = list.findIndex((p) => normalizePhaseLabel(p) === dstPhase);
      if (srcIdx < 0 || dstIdx0 < 0) return;

      const rect = typeof target.getBoundingClientRect === "function" ? target.getBoundingClientRect() : null;
      const after = rect && ev && typeof ev.clientY === "number" ? ev.clientY > rect.top + rect.height / 2 : false;
      const [moved] = list.splice(srcIdx, 1);
      const dstIdx = srcIdx < dstIdx0 ? dstIdx0 - 1 : dstIdx0;
      const insertAt = Math.max(0, Math.min(list.length, after ? dstIdx + 1 : dstIdx));
      list.splice(insertAt, 0, moved);

      project.epics = list;

      if (db && project.id && project.clientId) {
        try {
          await updateProjectEpicsOnDb(project.clientId, project.id, project.epics);
          await loadStateFromDb({
            clientId: client.id,
            projectId: project.id,
            clientName: client.name,
            projectName: project.name
          });
        } catch (err) {
          console.error(err);
          alert("Erro ao reordenar epicos.");
        }
        return;
      }

      saveLocalState();
      renderMain();
      return;
    }

    if (source.kind === "task") {
      const sourceIdx = Number(source.idx);
      const list = Array.isArray(project.tasks) ? project.tasks : [];
      const task = list[sourceIdx];
      if (!task) return;

      let nextPackage = task.package || "";
      if (kind === "macro") {
        nextPackage = String(target.dataset.dropMacroTitle || "").trim();
      } else if (kind === "task") {
        nextPackage = String(target.dataset.dropTaskTitle || "").trim();
      } else if (kind === "epic") {
        nextPackage = "";
      } else {
        return;
      }

      const payload = { ...task, phase: dropPhase || normalizePhaseLabel(task.phase || "OUTROS"), package: nextPackage };

      // Optimistic UI update
      list[sourceIdx] = payload;

      if (db && project.id && project.clientId && task.id) {
        try {
          await updateTaskOnDb(project.clientId, project.id, task.id, payload);
          await loadStateFromDb({
            clientId: client.id,
            projectId: project.id,
            clientName: client.name,
            projectName: project.name
          });
        } catch (err) {
          console.error(err);
          alert("Erro ao mover atividade.");
        }
        return;
      }

      saveLocalState();
      renderMain();
      return;
    }

    // source.kind === "macro": update packageParents mapping
    const srcTitle = normalizePackageLabel(source.title || "");
    const srcPhase = normalizePhaseLabel(source.phase || "");
    if (!srcTitle || !srcPhase) return;
    if (dropPhase && srcPhase !== dropPhase) return;

    let nextParent = "";
    if (kind === "macro") {
      nextParent = normalizePackageLabel(target.dataset.dropMacroTitle || "");
    } else if (kind === "task") {
      // Nest macro under a task label (acts as a macro anchor even if it has no tasks inside it).
      // This enables: macro -> activity -> macro (2+ levels), using the activity title as label.
      nextParent = normalizePackageLabel(target.dataset.dropTaskTitle || "");
    } else if (kind === "epic") {
      nextParent = "";
    } else {
      return;
    }
    if (nextParent === srcTitle) return;
    if (nextParent && wouldCreateMacroCycle(project, srcTitle, nextParent)) {
      alert("Movimento invalido: isso criaria um ciclo de macros (macro dentro dela mesma).");
      return;
    }

    setProjectMacroParent(project, srcTitle, nextParent);

    if (db && project.id && project.clientId) {
      try {
        await updateProjectPackageParentsOnDb(project.clientId, project.id, project.packageParents);
        await loadStateFromDb({
          clientId: client.id,
          projectId: project.id,
          clientName: client.name,
          projectName: project.name
        });
      } catch (err) {
        console.error(err);
        alert("Erro ao mover macro.");
      }
      return;
    }

    saveLocalState();
    renderMain();
  };

  document.body.addEventListener("dragstart", (e) => {
    const taskRow = e.target.closest("[data-drag-task-index]");
    const macroRow = !taskRow ? e.target.closest("[data-drag-macro-title]") : null;
    const epicRow = !taskRow && !macroRow ? e.target.closest("[data-drag-epic-phase]") : null;
    const row = taskRow || macroRow || epicRow;
    if (!row) return;
    if (taskRow) {
      const idx = Number(row.dataset.dragTaskIndex);
      if (Number.isNaN(idx)) return;
      draggingRef = { kind: "task", idx };
    } else if (macroRow) {
      const title = String(row.dataset.dragMacroTitle || "").trim();
      const phase = String(row.dataset.dragMacroPhase || "").trim();
      if (!title || !phase) return;
      draggingRef = { kind: "macro", title, phase };
    } else {
      if (row.dataset.epicReorder !== "1") return;
      const phase = String(row.dataset.dragEpicPhase || "").trim();
      if (!phase) return;
      draggingRef = { kind: "epic", phase };
    }
    row.classList.add("is-dragging");
    if (e.dataTransfer) {
      e.dataTransfer.effectAllowed = "move";
      try {
        e.dataTransfer.setData("text/plain", JSON.stringify(draggingRef));
      } catch (err) {
        // ignore
      }
    }
  });

  document.body.addEventListener("dragend", () => {
    clearDragging();
  });

  document.body.addEventListener("dragover", (e) => {
    const target = e.target.closest("[data-drop-kind]");
    const source = draggingRef || parseDragData(e.dataTransfer);
    if (!source || !target || !canDrop(source, target)) return;
    e.preventDefault();
    if (overEl !== target) {
      clearOver();
      overEl = target;
      overEl.classList.add("is-drag-over");
    }
    if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
  });

  document.body.addEventListener("dragleave", (e) => {
    const target = e.target.closest("[data-drop-kind]");
    if (!target) return;
    if (overEl === target && !target.contains(e.relatedTarget)) {
      clearOver();
    }
  });

  document.body.addEventListener("drop", async (e) => {
    const target = e.target.closest("[data-drop-kind]");
    if (!target) return;
    const source = draggingRef || parseDragData(e.dataTransfer);
    if (!source || !canDrop(source, target)) return;
    e.preventDefault();
    clearOver();
    await applyMove(source, target, e);
    clearDragging();
  });
}

function setupMembersPicker() {
  if (document.body.dataset.membersPickerWired) return;
  document.body.dataset.membersPickerWired = "true";

  const popover = byId("members-popover");
  if (!popover) return;

  const hide = () => {
    popover.classList.remove("show");
    popover.innerHTML = "";
    delete popover.dataset.taskIndex;
  };

  const open = (button, taskIdx) => {
    const project = state.selectedProject;
    const client = state.selectedClient;
    if (!project || !client) return;
    const task = project.tasks?.[taskIdx];
    if (!task) return;

    const phase = normalizePhaseLabel(task?.phase || "OUTROS");
    const rule = phaseMembersRule(phase);
    if (!rule.needsDev) return;

    const policy = buildProjectMembersPolicy(project, client);
    const devs = policy.developers.slice();
    if (devs.length <= 1) return;

    popover.dataset.taskIndex = String(taskIdx);
    popover.innerHTML = `
      <button type="button" class="action-item" data-members-pick-opt="__cancel__">Cancelar</button>
      ${devs
        .map(
          (name) =>
            `<button type="button" class="action-item" data-members-pick-opt="${escapeHtml(name)}">${escapeHtml(
              name
            )}</button>`
        )
        .join("")}
    `;

    const rect = button.getBoundingClientRect();
    popover.style.top = `${rect.bottom + window.scrollY + 6}px`;
    popover.style.left = `${rect.left + window.scrollX - 20}px`;
    popover.classList.add("show");
  };

  document.body.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-members-pick]");
    if (btn) {
      e.preventDefault();
      const idx = Number(btn.dataset.taskIndex);
      if (Number.isNaN(idx)) return;
      hideTaskActionsPopover();
      hideStatusPopover();
      hideProgressPopover();
      open(btn, idx);
      return;
    }
    if (!e.target.closest("#members-popover")) {
      hide();
    }
  });

  popover.addEventListener("click", async (e) => {
    const opt = e.target.closest("[data-members-pick-opt]");
    if (!opt) return;
    const value = opt.dataset.membersPickOpt || "";
    if (value === "__cancel__") {
      hide();
      return;
    }
    const idx = Number(popover.dataset.taskIndex);
    if (Number.isNaN(idx)) return;

    const project = state.selectedProject;
    const client = state.selectedClient;
    if (!project || !client) return;
    const task = project.tasks?.[idx];
    if (!task) return;

    const phase = normalizePhaseLabel(task?.phase || "OUTROS");
    const rule = phaseMembersRule(phase);
    const policy = buildProjectMembersPolicy(project, client);
    const pickedDev = normalizeTeamMemberName(value);

    const next = [];
    if (rule.needsLeader && policy.leader) next.push(policy.leader);
    if (rule.needsDev && pickedDev) next.push(pickedDev);

    task.members = next.join("; ");
    task.responsavel = next[0] || "";

    // Persist
    if (db && project.id && project.clientId && task.id) {
      try {
        await updateTaskOnDb(project.clientId, project.id, task.id, task);
        await loadStateFromDb({
          clientId: client.id,
          projectId: project.id,
          clientName: client.name,
          projectName: project.name
        });
      } catch (err) {
        console.error(err);
        alert("Erro ao atualizar membros no Firebase.");
      }
    } else {
      saveLocalState();
      renderMain();
    }
    hide();
  });
}

async function deleteEpicByPhase(phase) {
  const project = state.selectedProject;
  const client = state.selectedClient;
  if (!project || !client) return;

  const p = normalizePhaseLabel(phase || "");
  if (!p || p === "OUTROS") return;

  // Remove from epic list.
  const current = Array.isArray(project.epics) ? project.epics.slice() : [];
  project.epics = current.filter((x) => normalizePhaseLabel(x) !== p);

  // Move tasks from this epic to OUTROS (keep tasks; avoid orphan macros).
  const list = Array.isArray(project.tasks) ? project.tasks : [];
  const affected = [];
  list.forEach((t, idx) => {
    if (!t) return;
    if (normalizePhaseLabel(t.phase || "OUTROS") !== p) return;
    const next = { ...t, phase: "OUTROS", package: "" };
    list[idx] = next;
    affected.push({ before: t, after: next });
  });

  if (db && project.id && project.clientId) {
    try {
      await updateProjectEpicsOnDb(project.clientId, project.id, project.epics);

      const updatesById = {};
      affected.forEach(({ after }) => {
        if (!after?.id) return;
        updatesById[after.id] = { phase: "OUTROS", package: "" };
      });
      if (Object.keys(updatesById).length) {
        await batchUpdateTasksOnDb(project.clientId, project.id, updatesById);
      }

      await loadStateFromDb({
        clientId: client.id,
        projectId: project.id,
        clientName: client.name,
        projectName: project.name
      });
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir epico.");
    }
    return;
  }

  saveLocalState();
  renderMain();
}

function openTaskActionsPopover(target) {
  hideStatusPopover();
  hideProgressPopover();
  const popover = byId("task-actions-popover");
  const isMacro = !!target.dataset.macroAction;
  const isEpic = !!target.dataset.epicAction;
  popover.dataset.mode = isEpic ? "epic" : isMacro ? "macro" : "task";
  if (isEpic) {
    delete popover.dataset.taskIndex;
    delete popover.dataset.macroPhase;
    delete popover.dataset.macroTitle;
    popover.dataset.epicPhase = target.dataset.epicPhase || target.dataset.dropPhase || "";
  } else if (isMacro) {
    delete popover.dataset.taskIndex;
    popover.dataset.macroPhase = target.dataset.macroPhase || "";
    popover.dataset.macroTitle = target.dataset.macroTitle || "";
  } else {
    const idx = target.dataset.taskIndex;
    popover.dataset.taskIndex = idx;
    delete popover.dataset.macroPhase;
    delete popover.dataset.macroTitle;
    delete popover.dataset.epicPhase;
  }

  const editBtn = byId("task-edit-action");
  const addBtn = byId("task-add-action");
  const deleteBtn = byId("task-delete-action");
  const createMacroBtn = byId("task-macro-create-action");
  const undoMacroBtn = byId("task-macro-undo-action");
  const undoMacroGroupBtn = byId("macro-undo-action");
  const clearOutrosBtn = byId("epic-clear-outros-action");

  if (!deleteBtn.dataset.baseLabel) deleteBtn.dataset.baseLabel = deleteBtn.textContent || "Excluir";
  if (!editBtn.dataset.baseLabel) editBtn.dataset.baseLabel = editBtn.textContent || "Editar";
  if (addBtn && !addBtn.dataset.baseLabel) addBtn.dataset.baseLabel = addBtn.textContent || "Adicionar atividade aqui";

  if (isEpic) {
    if (addBtn) {
      addBtn.classList.remove("hidden");
      addBtn.textContent = "Adicionar atividade neste epico";
    }
    if (createMacroBtn) createMacroBtn.classList.add("hidden");
    if (undoMacroBtn) undoMacroBtn.classList.add("hidden");
    if (undoMacroGroupBtn) undoMacroGroupBtn.classList.add("hidden");
    if (editBtn) editBtn.classList.add("hidden");
    const phase = normalizePhaseLabel(popover.dataset.epicPhase || "");
    const showClearOutros = phase === "OUTROS";
    if (clearOutrosBtn) clearOutrosBtn.classList.toggle("hidden", !showClearOutros);
    if (deleteBtn) {
      deleteBtn.classList.toggle("hidden", showClearOutros);
      deleteBtn.textContent = "Excluir epico";
    }
  } else if (isMacro) {
    if (addBtn) {
      addBtn.classList.remove("hidden");
      addBtn.textContent = "Adicionar atividade nesta macro";
    }
    if (createMacroBtn) createMacroBtn.classList.add("hidden");
    if (undoMacroBtn) undoMacroBtn.classList.add("hidden");
    if (editBtn) editBtn.classList.add("hidden");
    if (deleteBtn) deleteBtn.classList.add("hidden");
    if (undoMacroGroupBtn) undoMacroGroupBtn.classList.remove("hidden");
    if (clearOutrosBtn) clearOutrosBtn.classList.add("hidden");
  } else {
    if (addBtn) {
      addBtn.classList.remove("hidden");
      addBtn.textContent = addBtn.dataset.baseLabel || "Adicionar atividade aqui";
    }
    if (undoMacroGroupBtn) undoMacroGroupBtn.classList.add("hidden");
    if (editBtn) editBtn.classList.remove("hidden");
    if (deleteBtn) deleteBtn.classList.remove("hidden");
    if (deleteBtn) deleteBtn.textContent = deleteBtn.dataset.baseLabel || "Excluir";
    if (clearOutrosBtn) clearOutrosBtn.classList.add("hidden");

    const idx = Number(popover.dataset.taskIndex);
    const task = Number.isNaN(idx) ? null : state.selectedProject?.tasks?.[idx] || null;
    const hasPackage = !!normalizePackageLabel(extractPackageLabel(task));
    const phase = normalizePhaseLabel(task?.phase || "OUTROS");
    const canCreateMacro = !hasPackage && getPackagePhases().includes(phase);

    if (createMacroBtn) createMacroBtn.classList.toggle("hidden", !canCreateMacro);
    if (undoMacroBtn) undoMacroBtn.classList.toggle("hidden", !hasPackage);
  }

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
  delete popover.dataset.mode;
  delete popover.dataset.macroPhase;
  delete popover.dataset.macroTitle;
  delete popover.dataset.epicPhase;
  const deleteBtn = byId("task-delete-action");
  if (deleteBtn && deleteBtn.dataset.baseLabel) deleteBtn.textContent = deleteBtn.dataset.baseLabel;
  const clearOutrosBtn = byId("epic-clear-outros-action");
  if (clearOutrosBtn) clearOutrosBtn.classList.add("hidden");
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
  if (/^\/[we]\//.test(window.location.pathname)) {
    window.location.replace(window.location.origin + "/");
    return;
  }
  showLogin();
  setupThemeToggle();
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

document.addEventListener("DOMContentLoaded", () => {
  try {
    const tag = document.createElement("div");
    tag.id = "app-build-tag";
    tag.textContent = `build ${APP_BUILD}`;
    tag.style.cssText =
      "position:fixed;right:10px;bottom:10px;z-index:99999;background:#0f172a;color:#fff;border:1px solid #334155;border-radius:8px;padding:4px 8px;font:11px/1.2 monospace;opacity:.9;";
    document.body.appendChild(tag);
    console.info("[JP]", "build", APP_BUILD);
  } catch (_err) {
    // ignore
  }
});

if (typeof window !== "undefined") {
  window.formatDateBR = formatDateBR;
  window.parseTaskDate = parseTaskDate;
}

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
  await newRef.set({ name: clientName, projects: {}, squads: [] });
  return { id: newRef.key, ref: newRef };
}

async function deleteProjectFromDb(clientId, projectId) {
  const clientRef = clientDocRef(clientId);
  if (!clientRef) return;
  await clientRef.child("projects").child(projectId).remove();
}

async function deleteClientFromDb(clientId) {
  const clientRef = clientDocRef(clientId);
  if (!clientRef) return;
  await clientRef.remove();
}

async function saveProjectToDb(payload) {
  const client = await ensureClientDoc(payload.client);
  const projectRef = client.ref.child("projects").push();
  await projectRef.set({
    name: payload.name,
    developer: payload.developer,
    squadId: payload.squadId || "",
    team: Array.isArray(payload.team) ? payload.team : [],
    start: payload.start,
    end: payload.end,
    startDate: payload.start,
    goLiveDate: payload.end,
    epics: [],
    packages: [],
    packageParents: {},
    financials: [],
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
    squadId: payload.squadId || "",
    team: Array.isArray(payload.team) ? payload.team : [],
    start: payload.start,
    end: payload.end,
    startDate: payload.startDate || payload.start,
    goLiveDate: payload.goLiveDate || payload.end
  });
}

async function updateProjectFinancialsOnDb(clientId, projectId, financials) {
  const clientRef = clientDocRef(clientId);
  if (!clientRef) return;
  await clientRef.child("projects").child(projectId).update({ financials });
}

async function saveTaskToDb(clientId, projectId, task) {
  const clientRef = clientDocRef(clientId);
  if (!clientRef) return;
  const taskRef = clientRef.child("projects").child(projectId).child("tasks").push();
  const normalizedStatus = normalizeTaskStatus(task.status);
  const dataConclusao =
    task.dataConclusao || (normalizedStatus === "concluido" ? new Date().toISOString().slice(0, 10) : "");
  const members = String(task?.members || task?.membros || "").trim();
  const responsavel = String(task?.responsavel || task?.responsible || task?.owner || taskOwner(task) || "").trim();
  const dur = task.duration != null && Number.isFinite(Number(task.duration)) ? Number(task.duration) : null;
  const pred = String(task.predecessors || "").trim();
  await taskRef.set({
    title: task.title,
    phase: task.phase,
    package: task.package,
    start: task.start,
    due: task.due,
    status: task.status,
    progress: task.progress,
    ...(members ? { members } : {}),
    ...(responsavel ? { responsavel } : {}),
    ...(dataConclusao ? { dataConclusao } : {}),
    ...(dur ? { duration: dur } : {}),
    ...(pred ? { predecessors: pred } : {}),
    createdAt: firebase.database.ServerValue.TIMESTAMP
  });
}

async function updateTaskStatusOnDb(clientId, projectId, taskId, payload) {
  const updatePayload = { ...payload };
  if (normalizeTaskStatus(updatePayload.status) === "concluido" && !updatePayload.dataConclusao) {
    updatePayload.dataConclusao = new Date().toISOString().slice(0, 10);
  }
  const clientRef = clientDocRef(clientId);
  if (!clientRef) return;
  await clientRef.child("projects").child(projectId).child("tasks").child(taskId).update(updatePayload);
}

async function updateTaskProgressOnDb(clientId, projectId, taskId, progress) {
  if (progress == null) return;
  const value = Number(progress);
  if (!Number.isFinite(value)) return;
  const clientRef = clientDocRef(clientId);
  if (!clientRef) return;
  await clientRef.child("projects").child(projectId).child("tasks").child(taskId).update({ progress: value });
}

async function updateTaskOnDb(clientId, projectId, taskId, payload) {
  const dur = payload.duration != null && Number.isFinite(Number(payload.duration)) ? Number(payload.duration) : null;
  const pred = String(payload.predecessors || "").trim();
  const updatePayload = {
    title: payload.title,
    phase: payload.phase,
    package: payload.package,
    start: payload.start,
    due: payload.due,
    status: payload.status,
    progress: payload.progress != null ? Number(payload.progress) : undefined,
    members: payload.members,
    responsavel: payload.responsavel ?? payload.responsible ?? payload.owner,
    ...(dur != null ? { duration: dur } : {}),
    ...(pred ? { predecessors: pred } : {})
  };
  if (payload.order != null) {
    const orderValue = Number(payload.order);
    if (Number.isFinite(orderValue)) {
      updatePayload.order = orderValue;
    }
  }
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
  const clientRef = clientDocRef(clientId);
  if (!clientRef) return;
  await clientRef.child("projects").child(projectId).child("tasks").child(taskId).update(updatePayload);
}

async function batchUpdateTasksOnDb(clientId, projectId, updatesByTaskId) {
  if (!db || !clientId || !projectId || !updatesByTaskId) return;
  const clientRef = clientDocRef(clientId);
  if (!clientRef) return;
  const tasksRef = clientRef.child("projects").child(projectId).child("tasks");
  const updates = {};
  Object.entries(updatesByTaskId).forEach(([taskId, patch]) => {
    if (!taskId || !patch) return;
    Object.entries(patch).forEach(([key, value]) => {
      if (!key) return;
      updates[`${taskId}/${key}`] = value;
    });
  });
  if (!Object.keys(updates).length) return;
  await tasksRef.update(updates);
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

async function updateProjectPackageParentsOnDb(clientId, projectId, packageParents) {
  const clientRef = clientDocRef(clientId);
  if (!clientRef) return;
  const normalized = normalizePackageParentsMap(packageParents);
  await clientRef.child("projects").child(projectId).update({ packageParents: normalized });
}

async function updateProjectEpicsOnDb(clientId, projectId, epics) {
  const clientRef = clientDocRef(clientId);
  if (!clientRef) return;
  await clientRef.child("projects").child(projectId).update({ epics });
}

async function updateClientSquadsOnDb(clientId, squads) {
  const clientRef = clientDocRef(clientId);
  if (!clientRef) return;
  await clientRef.update({ squads: Array.isArray(squads) ? squads : [] });
}

function projectMetrics(tasks = []) {
  const total = tasks.length;
  const done = tasks.filter((t) => isDoneTask(t)).length;
  const pending = Math.max(total - done, 0);
  const progress = progressPctFromTasks(tasks);
  return { total, done, pending, progress };
}

function computeProgress(tasks) {
  return projectMetrics(tasks).progress;
}

function groupTasksByPhase(tasks, requiredPhases = []) {
  const normalized = tasks.map((t, idx) => {
    const preservedIdx = Number.isFinite(Number(t?._idx)) ? Number(t._idx) : idx;
    return {
      ...t,
      // Preserve original project.tasks index when the UI filters the list.
      _idx: preservedIdx,
      phase: (t.phase || "OUTROS").toUpperCase()
    };
  });
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
    // Keep open items on top (sorted by dates), and push concluded items down.
    const aDone = isDoneTask(a);
    const bDone = isDoneTask(b);
    if (aDone !== bDone) return aDone ? 1 : -1;

    // For open items, sort by due date; for done items, sort by completion (fallback: due).
    const aDate = aDone ? dateSortValue(a.dataConclusao || a.due) : dateSortValue(a.due);
    const bDate = bDone ? dateSortValue(b.dataConclusao || b.due) : dateSortValue(b.due);
    const d = aDate - bDate;
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
  if (key === "cost") return formatCurrency(project.cost);
  if (key === "goLive") return project.goLive || "-";
  return "";
}

function dashboardFilterValues(projects, key) {
  const column = DASHBOARD_COLUMNS.find((col) => col.key === key);
  const values = Array.from(new Set(projects.map((project) => dashboardDisplayValue(project, key))));
  return values.sort((a, b) => {
    if (column?.type === "number") {
      const toNumber = (value) => parseNumericValue(value);
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
      const tasksAll = projectAllTasks(p);
      const metrics = projectMetrics(tasksAll);
      const progressPct = clampPct(tasksAll.length ? progressPctFromTasks(tasksAll) : (metrics.progress ?? p.progress ?? 0));

      const baseline = rollupBaselinePct(leafTasksForProgress(tasksAll));
      const gap = round1(baseline - progressPct);
      const cost = resolveProjectCost(p);
      return {
        ...p,
        cost,
        clientName: client.name,
        metrics,
        progress: progressPct,
        baseline,
        gap,
        status: projectStatus(p, metrics, tasksAll),
        schedule: projectScheduleStatus(p),
        goLive: p.end || ""
      };
    })
  );
}

function projectStatus(project, metrics = null, tasks = null) {
  const taskList = tasks || projectAllTasks(project);
  const m = metrics || projectMetrics(taskList);
  if (m.progress === 100 && m.total > 0) return "concluido";
  const goLive = goLiveValue(project.end);
  if (goLive !== null && goLive < Date.now() && m.progress < 100) return "atrasado";
  const hasWorkStarted = taskList.some((t) => normalizeTaskStatus(getTaskStatus(t)) !== "planejado");
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

function renderPortfolio(container) {
  setCrumbPathText("Projetos Consolidados");

  const allClients = Array.isArray(state.clients) ? state.clients : [];
  const todayTs = todayStartTs();

  const portfolioProjects = allClients.flatMap((client) => {
    const projects = Array.isArray(client?.projects) ? client.projects : [];
    return projects.map((p) => {
      const tasksAll = projectAllTasks(p);
      const metrics = projectMetrics(tasksAll);
      const progressPct = clampPct(tasksAll.length ? progressPctFromTasks(tasksAll) : (metrics.progress ?? p.progress ?? 0));

      const plannedByTasks = computePlannedBaselinePctByTasks(p, tasksAll);
      const sCurveSeries = plannedByTasks == null ? computeSCurveDailyBaseline(p, tasksAll || null, progressPct) : null;
      const baselinePct = plannedByTasks != null
        ? plannedByTasks
        : (sCurveSeries ? round1(sCurveSeries.baselineNow * 100) : projectBaselinePct(p, progressPct));
      const gap = round1(baselinePct - progressPct);
      const overdue = tasksAll.filter((t) => !isDoneTask(t) && taskDueValueSafe(t) < todayTs).length;
      const status = projectStatus(p, metrics, tasksAll);
      return {
        clientName: client?.name || p?.client || "-",
        project: p,
        tasksAll,
        metrics,
        progressPct,
        baselinePct,
        gap,
        overdue,
        status
      };
    });
  });

  // Include new projects even if they don't have tasks yet (metrics.total can be 0).
  const activeProjects = portfolioProjects.filter((x) => x.progressPct < 100);
  const totalActive = activeProjects.length;
  const avgGap = activeProjects.length
    ? round1(activeProjects.reduce((sum, x) => sum + (Number.isFinite(x.gap) ? x.gap : 0), 0) / activeProjects.length)
    : 0;
  const overdueTotal = activeProjects.reduce((sum, x) => sum + (x.overdue || 0), 0);

  const gapInfoAvg = gapStatusInfo(avgGap, null, null);
  const gapAvgLabel = `${formatSignedMetric(avgGap)}pp`;

  // Resource load (capacity heuristic)
  const CAPACITY_TASKS = 10; // 10 open tasks ~= 100%
  const peopleMap = new Map();
  for (const p of activeProjects) {
    for (const t of p.tasksAll) {
      if (isDoneTask(t)) continue;
      const members = (t?.members || t?.membros || t?.owners || t?.responsibles || taskOwner(t) || "").toString();
      const list = members
        ? members
            .split(/[;,|]/g)
            .map((s) => s.trim())
            .filter(Boolean)
        : [];
      // If no explicit members, skip (keeps UI clean).
      for (const m of list.slice(0, 4)) {
        const key = m;
        const entry = peopleMap.get(key) || { name: key, open: 0, overdue: 0, projects: new Set() };
        entry.open += 1;
        if (taskDueValueSafe(t) < todayTs) entry.overdue += 1;
        entry.projects.add(p.project?.name || "Projeto");
        peopleMap.set(key, entry);
      }
    }
  }
  const people = Array.from(peopleMap.values())
    .map((x) => ({
      name: x.name,
      open: x.open,
      overdue: x.overdue,
      utilPct: Math.round((x.open / CAPACITY_TASKS) * 100),
      projects: Array.from(x.projects)
    }))
    .sort((a, b) => b.utilPct - a.utilPct);

  const maxUtil = people.length ? Math.max(...people.map((p) => p.utilPct)) : 0;
  const overallUtil = Math.min(100, Math.max(0, maxUtil));
  const superAllocated = people.some((p) => p.utilPct > 100);

  const utilColorClass = (pct) => {
    if (pct > 100) return "is-super";
    if (pct >= 85) return "is-warn";
    return "is-ok";
  };

  // Cascading risk heuristic: overdue tasks that likely block planned tasks in other projects
  const tokenize = (s) =>
    String(s || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/g)
      .filter((w) => w.length >= 5)
      .slice(0, 12);

  const cascades = [];
  for (const source of activeProjects) {
    for (const t of source.tasksAll) {
      if (isDoneTask(t)) continue;
      const dueTs = taskDueValueSafe(t);
      if (!Number.isFinite(dueTs) || dueTs >= todayTs) continue;
      const tokens = tokenize(taskTitle(t));
      if (!tokens.length) continue;

      const impacted = new Set();
      for (const other of activeProjects) {
        if (other.project === source.project) continue;
        for (const ot of other.tasksAll) {
          if (isDoneTask(ot)) continue;
          const st = parseTaskDate(taskStartStr(ot))?.getTime() ?? null;
          if (st == null || st < dueTs) continue;
          const title = taskTitle(ot);
          const hit = tokens.some((w) => title.toLowerCase().includes(w));
          if (hit) {
            impacted.add(other.project?.name || "Projeto");
            break;
          }
        }
      }
      if (impacted.size >= 2) {
        cascades.push({
          title: taskTitle(t),
          fromProject: source.project?.name || "Projeto",
          impactedCount: impacted.size
        });
      }
    }
  }
  cascades.sort((a, b) => b.impactedCount - a.impactedCount);
  const topCascades = cascades.slice(0, 2);

  const insight = (() => {
    if (people.length < 2) return null;
    const most = people[0];
    const least = people[people.length - 1];
    if (!most || !least || most.name === least.name) return null;
    const moveCount = Math.min(2, Math.max(1, Math.ceil((most.utilPct - least.utilPct) / 50)));
    const targetReduction = 15; // heuristic "IA" output
    return `Sugestao: Mover ${moveCount} tarefa(s) de ${most.name} para ${least.name} para reduzir o GAP em ${targetReduction}%.`;
  })();

  const kpiHtml = `
    <div class="portfolio-kpis span-all">
      <div class="portfolio-kpi">
        <div class="portfolio-kpi-icon"><i data-lucide="folder-kanban"></i></div>
        <div class="portfolio-kpi-meta">
          <div class="portfolio-kpi-label">Projetos</div>
          <div class="portfolio-kpi-value">${String(totalActive).padStart(2, "0")}</div>
          <div class="portfolio-kpi-sub">${activeProjects.filter((p) => p.gap >= 30).length} Criticos, ${activeProjects.filter((p) => p.gap >= 20 && p.gap < 30).length} Alto risco</div>
        </div>
      </div>
      <div class="portfolio-kpi">
        <div class="portfolio-kpi-icon"><i data-lucide="activity"></i></div>
        <div class="portfolio-kpi-meta">
          <div class="portfolio-kpi-label">GAP medio</div>
          <div class="portfolio-kpi-value gap-strong" style="color:${gapInfoAvg.color}">${gapAvgLabel}</div>
          <div class="portfolio-kpi-sub">Tendencia consolidada</div>
        </div>
      </div>
      <div class="portfolio-kpi">
        <div class="portfolio-kpi-icon"><i data-lucide="users"></i></div>
        <div class="portfolio-kpi-meta">
          <div class="portfolio-kpi-label">Recursos</div>
          <div class="portfolio-kpi-value">${overallUtil}%</div>
          <div class="portfolio-kpi-sub">Alocacao maxima</div>
        </div>
      </div>
      <div class="portfolio-kpi">
        <div class="portfolio-kpi-icon"><i data-lucide="alert-circle"></i></div>
        <div class="portfolio-kpi-meta">
          <div class="portfolio-kpi-label">Atrasos</div>
          <div class="portfolio-kpi-value">${overdueTotal}</div>
          <div class="portfolio-kpi-sub">Atividades vencidas</div>
        </div>
      </div>
    </div>
  `;

  const statusRows = activeProjects
    .slice()
    .sort((a, b) => sortProjectsForDashboard({ ...a.project, status: a.status, goLive: a.project?.end }, { ...b.project, status: b.status, goLive: b.project?.end }))
    .slice(0, 6)
    .map((x) => {
      const p = x.project;
      const dev = p?.developer || p?.responsible || "A definir";
      const prog = clampPct(x.progressPct);
      const gap = x.gap;
      const gapInfo = gapStatusInfo(gap, x.baselinePct, x.progressPct);
      const badge =
        gap >= 30
          ? { text: "CRITICO (30PP+)", cls: "bad" }
          : gap >= 20
            ? { text: "ALTO RISCO (20-29PP)", cls: "warn" }
            : gap > 10
              ? { text: "POTENCIAL (11-19PP)", cls: "warn" }
              : gap > 3
                ? { text: "BAIXO RISCO (4-10PP)", cls: "warn" }
                : { text: "EM DIA (<=3PP)", cls: "ok" };
      return `
        <div class="portfolio-project-row">
          <div class="pp-left">
            <div class="pp-dot ${badge.cls}"></div>
            <div class="pp-names">
              <div class="pp-name">${escapeHtml(p?.name || "Projeto")}</div>
              <div class="pp-sub">Resp: ${escapeHtml(dev)}</div>
            </div>
          </div>
          <div class="pp-metrics">
            <div class="pp-metric">
              <div class="k">PROGRESSO</div>
              <div class="v">${prog}%</div>
            </div>
            <div class="pp-metric">
              <div class="k">GAP</div>
              <div class="v" style="color:${gapInfo.color}">${formatSignedMetric(gap)}pp</div>
            </div>
            <div class="pp-metric">
              <div class="k">ATRASOS</div>
              <div class="v">${x.overdue}</div>
            </div>
          </div>
          <div class="pp-badge ${badge.cls}">${badge.text}</div>
        </div>
      `;
    })
    .join("");

  const allocationRows = people.slice(0, 6).map((p) => {
    const pct = p.utilPct;
    const cls = utilColorClass(pct);
    const showPct = `${pct}%`;
    const over = pct > 100;
    return `
      <div class="alloc-row ${over ? "is-super" : ""}">
        <div class="alloc-head">
          <div class="alloc-name">${escapeHtml(p.name)}</div>
          <div class="alloc-pct ${cls}">${showPct}</div>
        </div>
        <div class="alloc-sub">${escapeHtml(p.projects.slice(0, 2).join(" + ") || "")}${over ? " • Superalocado" : ""}</div>
        <div class="alloc-bar ${cls} ${over ? "pulse" : ""}">
          <i style="width:${Math.min(100, pct)}%"></i>
        </div>
      </div>
    `;
  }).join("");

  const allocationNote = superAllocated
    ? `<div class="alloc-warning"><span class="dot"></span> Superalocado: soma de atividades excede 100%.</div>`
    : `<div class="alloc-muted">Sem superalocacao no momento.</div>`;

  const cascadeHtml = topCascades.length
    ? topCascades
        .map((c) => {
          return `
            <div class="deps-card">
              <div class="deps-title">Risco de Cascata</div>
              <div class="deps-sub">Atraso em <b>${escapeHtml(c.title)}</b> afeta ${c.impactedCount} projeto(s).</div>
              <button class="btn sm ghost" type="button">Analisar solucao</button>
            </div>
          `;
        })
        .join("")
    : `<div class="deps-empty">Nenhum risco de cascata detectado.</div>`;

  const efficiencyBars = people.slice(0, 6).map((p) => {
    const total = Math.max(1, p.open);
    const ok = Math.max(0, total - p.overdue);
    const okPct = Math.round((ok / total) * 100);
    const badPct = 100 - okPct;
    return `
      <div class="eff-row">
        <div class="eff-name">${escapeHtml(p.name)}</div>
        <div class="eff-stack" title="${ok} ok / ${p.overdue} atraso">
          <i class="ok" style="width:${okPct}%"></i>
          <i class="bad" style="width:${badPct}%"></i>
        </div>
      </div>
    `;
  }).join("");

  const html = `
    <div class="portfolio span-all">
      <div class="portfolio-top">
        <div class="portfolio-title">
          <div class="h">Gestao de Portfólio & Recursos</div>
          <div class="s">Visao consolidada • ${totalActive} projeto(s) ativos</div>
        </div>
        <div class="portfolio-tabs">
          <button type="button" class="portfolio-tab is-active">Portfólio Global</button>
          <button type="button" class="portfolio-tab" disabled>OnePage Individual</button>
        </div>
      </div>

      ${kpiHtml}

      <div class="portfolio-grid span-all">
        <div class="portfolio-card card projects">
          <div class="pc-head">
            <div class="pc-title">Status do Portfólio</div>
            <button type="button" class="pc-link" data-portfolio-view-all>Ver todos</button>
          </div>
          <div class="pc-body">
            ${statusRows || `<div class="deps-empty">Nenhum projeto ativo.</div>`}
          </div>
        </div>

        <div class="portfolio-card card alloc">
          <div class="pc-head">
            <div class="pc-title">Alocacao de Recursos</div>
          </div>
          <div class="pc-body">
            ${allocationRows || `<div class="deps-empty">Sem dados de alocacao.</div>`}
            ${allocationNote}
            <div class="insight-box">
              <div class="insight-title">Insight do Gestor</div>
              <div class="insight-text">${escapeHtml(insight || "Sugestao: Cadastre responsaveis nas atividades para gerar insights de redistribuicao.")}</div>
            </div>
          </div>
        </div>

        <div class="portfolio-card card deps">
          <div class="pc-head">
            <div class="pc-title">Gargalos & Dependencias Criticas</div>
          </div>
          <div class="pc-body">
            ${cascadeHtml}
          </div>
        </div>

        <div class="portfolio-card card eff">
          <div class="pc-head">
            <div class="pc-title">Eficiencia por Recurso</div>
            <div class="pc-legend"><span class="l ok"></span> Tarefas OK <span class="l bad"></span> Atrasos</div>
          </div>
          <div class="pc-body">
            ${efficiencyBars || `<div class="deps-empty">Sem dados.</div>`}
          </div>
        </div>
      </div>

      <div class="portfolio-legend">
        <div class="lg-title">Legenda global de saude</div>
        <div class="lg-items">
          <span><span class="pp-dot ok"></span> Excelente</span>
          <span><span class="pp-dot warn"></span> Atencao</span>
          <span><span class="pp-dot bad"></span> Critico</span>
        </div>
      </div>
    </div>
  `;

  container.innerHTML = html;

  const viewAll = container.querySelector("[data-portfolio-view-all]");
  if (viewAll) {
    viewAll.addEventListener("click", () => {
      state.currentSection = "dashboard";
      setActiveNav(state.currentSection);
      renderMain();
    });
  }

  if (window.lucide) window.lucide.createIcons();
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
        <span class="legend-item"><span class="legend-dot gap-ok" aria-hidden="true"></span>Em dia (<= 3pp)</span>
        <span class="legend-item"><span class="legend-dot gap-low" aria-hidden="true"></span>Baixo risco (&gt; 3pp a 10pp)</span>
        <span class="legend-item"><span class="legend-dot gap-risk" aria-hidden="true"></span>Potencial risco (&gt; 10pp a 19pp)</span>
        <span class="legend-item"><span class="legend-dot gap-delayed" aria-hidden="true"></span>Alto risco (20pp a 29pp)</span>
        <span class="legend-item"><span class="legend-dot gap-critical" aria-hidden="true"></span>Critico (30pp+)</span>
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
      const progressValue = clampPct(p.progress);
      const isCompleted = progressValue >= 100;
      const developerName = p.developer || "";
      const avatarLabel = developerName ? initialsFromName(developerName) : "";
      const avatarHtml = developerName
        ? `<div class="table-person" title="${escapeHtml(developerName)}"><span class="avatar">${escapeHtml(avatarLabel)}</span></div>`
        : `<span class="person-empty">-</span>`;
      const costLabel = formatCurrency(p.cost);
      const progressBarClass = isCompleted ? "progress-inline-bar progress-inline-bar--done" : "progress-inline-bar";
      const progressValueClass = isCompleted
        ? "progress-inline-value progress-inline-value--done"
        : "progress-inline-value";
      return `
        <tr data-client="${p.clientName}" data-project="${p.name}">
          <td>${p.name}</td>
          <td>${p.clientName}</td>
          <td>${avatarHtml}</td>
          <td><span class="pill project-status ${info.className}">${info.label}</span></td>
          <td><span class="pill schedule-status ${scheduleInfo.className}">${scheduleInfo.label}</span></td>
          <td>${progressValue}%</td>
          <td>${formatMetric(p.baseline)}%</td>
          <td><span class="delta-badge ${gapInfo.className}">${formatSignedMetric(p.gap)}pp</span></td>
          <td>${costLabel}</td>
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
        ${rows || "<tr><td colspan='10'>Nenhum projeto cadastrado.</td></tr>"}
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
