# AGENTS.md — ControleProjetos (Axon Project)

Este repositório é o produto **ControleProjetos**: gestão de execução com **baseline → riscos → intervenções → inbox**.
Sem buzzword. Sem “SaaS genérico pra tudo”. O objetivo é: reduzir atraso operacional com governança simples e rastreável.

## Escopo do produto (o que existe)
- Workspaces + membros + RBAC por workspace
- Onboarding com instalação de blueprint (idempotente)
- Projetos com estrutura instanciada (work items em árvore)
- Work items editáveis com status validado pelo blueprint
- Baseline (snapshot do plano) + summary + diff mínimo (date-only) com críticos
- Motor de riscos v1 (regras determinísticas) + recompute transacional (debounce + mutex)
- Intervenções 1:1 por risco HIGH com evidência obrigatória para finalizar
- Inbox (minha fila / workspace) + last-seen + badges
- Auditoria mínima (somente mudanças relevantes)
- Exec Summary (texto pronto para colar)
- Ops: métricas de recompute (RecomputeRun)

## Stack
- Backend: Node.js + Express + Prisma
- Banco: Postgres (ou compatível com Prisma)
- Frontend: React + TypeScript (.tsx)
- Router: react-router-dom (Data Router) com loaders e gating por blueprint
- Auth: JWT Bearer; `req.userId = payload.sub`

## Estrutura do repositório
- apps/server: API Express, Prisma Client, rotas
- apps/web: React UI
- apps/server/prisma: schema + migrations

## Regras de engenharia (não negociar)
1. **Segurança no backend**: guard no front é UX, não segurança.
2. **Blueprint é contrato**:
   - status de WorkItem deve ser validado contra statuses do workspace/blueprint.
   - troca de blueprint após install deve retornar 409.
3. **Risco idempotente**:
   - Risk.targetKey NOT NULL
   - unique: @@unique([projectId, ruleId, targetKey])
4. **Intervenção 1:1**:
   - Intervention.riskId NOT NULL + @unique
5. **Recompute**:
   - Sempre dentro de `$transaction`.
   - Debounce + mutex por projectId (in-memory).
   - Registrar RecomputeRun (observability).
6. **Baseline é foto do plano**:
   - snapshot inclui work_items relevantes.
   - baseline diff usa comparação date-only (evitar bug de timezone).
7. **Auditoria**:
   - só grava mudanças relevantes (status, dueDate, owner; create baseline; install blueprint; update intervention).
   - não logar “PATCH sem mudança”.
8. **Migrations em produção**:
   - usar `prisma migrate deploy`.
   - NÃO usar `prisma db push` em produção.

## Variáveis de ambiente (exemplo)
### apps/server/.env
- DATABASE_URL=postgresql://user:pass@host:5432/db
- JWT_PUBLIC_KEY=...
- JWT_ISSUER=...
- PORT=...

### apps/web/.env
- VITE_API_BASE=/api (ou URL completa em dev)

## Scripts recomendados
### Server
- npm run dev
- npm run build
- npm run start
- npm run prisma:generate
- npm run prisma:migrate
- npm run prisma:deploy
- npm run backfill:risks

### Web
- npm run dev
- npm run build
- npm run preview

## Contratos de API (resumo)
### Auth
- POST /api/login
- POST /api/register

### Workspaces
- GET  /api/workspaces
- POST /api/workspaces
- GET  /api/workspaces/:id
- POST /api/workspaces/:id/blueprint/install
- POST /api/workspaces/:id/members
- GET  /api/workspaces/:id/projects (health + riscos agregados + badges)
- GET  /api/workspaces/:id/recompute-runs (admin+)

### Projects
- POST /api/workspaces/:id/projects (instancia work items)
- GET  /api/projects/:id/work-items -> { statuses, items }
- PATCH /api/work-items/:id (valida status, dueDate>=startDate, doneAt coerente; scheduleRecompute)
- POST /api/projects/:id/baselines
- GET  /api/projects/:id/baselines
- GET  /api/projects/:id/baseline-diff
- GET  /api/projects/:id/risks
- GET  /api/projects/:id/interventions
- POST /api/projects/:id/seen
- GET  /api/projects/:id/audit-events
- GET  /api/projects/:id/exec-summary

### Inbox / Interventions
- GET  /api/interventions?workspaceId=...&scope=mine|workspace&status=open,in_progress
- PATCH /api/interventions/:id (evidência obrigatória para status=done)

## Smoke test obrigatório (antes de qualquer PR)
1) Register/Login
2) /post-auth resolve workspace (cria se vazio)
3) Onboarding instala blueprint (idempotente)
4) Criar projeto -> work items instanciados
5) PATCH em milestone crítico -> recompute -> risco HIGH -> intervenção
6) Inbox lista intervenção vencida primeiro
7) Finalizar intervenção sem evidência -> 400 EVIDENCE_REQUIRED
8) Adicionar evidência -> finalizar -> audit registra
9) Dashboard mostra health + badges "novos"
10) Ops/recompute mostra runs

## Convenções
- Commits: feat/fix/refactor/chore + descrição objetiva
- Evitar abstrações “plataforma genérica”
- Preferir regras determinísticas a “IA” sem dado
