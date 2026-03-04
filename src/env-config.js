/**
 * Configuração de ambientes - cada ambiente aponta para uma base/database diferente.
 * Opção A: múltiplas instâncias de Realtime Database no mesmo projeto Firebase.
 *
 * Para criar instâncias staging/demo no Firebase Console:
 * Realtime Database > Criar banco > nome: staging-rtdb ou demo-rtdb
 */
const ENVIRONMENTS = {
  prod: {
    name: "Produção",
    databaseURL: "https://controle-projetos-a55d5-default-rtdb.firebaseio.com",
  },
  staging: {
    name: "Homologação",
    databaseURL: "https://controle-projetos-a55d5-staging-rtdb.firebaseio.com",
  },
  demo: {
    name: "Demo",
    databaseURL: "https://controle-projetos-a55d5-demo-rtdb.firebaseio.com",
  },
};

const DEFAULT_ENVIRONMENT_ID = "prod";
