-- Enable UUID extension if not already enabled
CREATE EXTENSION
IF NOT EXISTS "uuid-ossp";

-- 1. Tabela de Logs de Auditoria (Audit Logs)
-- Esta tabela rastreia ações administrativas e mudanças críticas para conformidade Enterprise.
CREATE TABLE audit_logs
(
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    admin_id UUID REFERENCES auth.users(id),
    -- Quem fez
    action TEXT NOT NULL,
    -- O que fez (ex: 'DELETE_USER', 'CHANGE_ROLE')
    target_id TEXT,
    -- Em quem fez (ID do usuário ou projeto)
    previous_value JSONB,
    -- Como estava antes (opcional)
    new_value JSONB,
    -- Como ficou depois (opcional)
    ip_address TEXT,
    -- De onde fez (Segurança extra)
    created_at TIMESTAMP
    WITH TIME ZONE DEFAULT timezone
    ('utc'::text, now
    ())
);

    -- Ativar RLS para que apenas super-admins leiam os logs
    ALTER TABLE audit_logs ENABLE ROW LEVEL SECURITY;

    -- 2. Fluxo de "Direito ao Esquecimento" (Soft Delete) e Aceite de Termos
    -- Adicionar colunas na tabela de perfis/usuários para conformidade LGPD
    ALTER TABLE profiles ADD COLUMN deleted_at TIMESTAMP
    WITH TIME ZONE DEFAULT NULL;
    ALTER TABLE profiles ADD COLUMN accepted_terms BOOLEAN DEFAULT FALSE;
    ALTER TABLE profiles ADD COLUMN terms_accepted_at TIMESTAMP
    WITH TIME ZONE DEFAULT NULL;

    -- 3. Implementação do RLS (Multi-tenant)
    -- Garantir isolamento de dados entre empresas (tenants)

    -- Habilitar RLS na tabela de projetos
    ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

    -- Política: Usuário só vê projetos se o seu company_id for igual ao company_id do projeto
    CREATE POLICY "Users can only see their own company projects"
ON projects
FOR
    SELECT
        USING (
  auth.jwt() ->> 'company_id' = company_id::text
);

-- =================================================================
-- ESQUEMA ENTERPRISE: WORKSPACES, ROLES E PROFILES (Multi-tenancy)
-- =================================================================

-- 1. Tabela de Workspaces (Empresas)
CREATE TABLE workspaces (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL, -- Ex: 'axon-tech'
    owner_id UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- 2. Tabela de Grupos de Acesso (Roles)
-- Permite que cries grupos como 'Admin', 'Editor', 'Viewer'
CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    name TEXT UNIQUE NOT NULL -- 'admin', 'manager', 'user'
);

-- 3. Tabela de Perfis de Usuário (Profiles)
-- Estendendo o auth.users do Supabase
-- Nota: O script anterior já adiciona colunas a 'profiles'. Este CREATE TABLE é para um cenário onde a tabela não existe.
-- Um script de migração real deve verificar a existência da tabela antes de criar.
-- CREATE TABLE profiles (
--     id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
--     workspace_id UUID REFERENCES workspaces(id),
--     role_id INTEGER REFERENCES roles(id),
--     full_name TEXT,
--     has_completed_onboarding BOOLEAN DEFAULT FALSE
-- );

-- Adicionando colunas de workspace e role à tabela de profiles existente
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS workspace_id UUID REFERENCES workspaces(id);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role_id INTEGER REFERENCES roles(id);
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS has_completed_onboarding BOOLEAN DEFAULT FALSE;


-- 4. Inserir Roles básicas
INSERT INTO roles (name) VALUES ('admin'), ('manager'), ('user');

-- 5. Ativar Row Level Security (RLS)
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;

-- Política: Usuário só vê o workspace ao qual pertence
CREATE POLICY "Users can see their own workspace"
ON workspaces FOR SELECT
USING (id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));

-- Política: Usuários só podem ver outros perfis dentro do mesmo workspace
CREATE POLICY "Users can see profiles of their own workspace"
ON profiles FOR SELECT
USING (workspace_id IN (SELECT workspace_id FROM profiles WHERE id = auth.uid()));
