-- ==============================================================================
-- MIGRAÇÃO INICIAL SUPABASE — VANESSA BECEGATTO: ESTRUTURA AUTÔNOMA DE TRÂNSITO
-- Arquivo: 20261019000000_create_vanessa_becegato_schema.sql
-- ==============================================================================

-- 1. EXTENSÕES NECESSÁRIAS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Função utilitária para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ------------------------------------------------------------------------------
-- 2. TABELA: CONFIGURAÇÕES DA PLATAFORMA & DADOS INSTITUCIONAIS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.configuracoes (
  id TEXT PRIMARY KEY DEFAULT 'config-default',
  nome_comercial TEXT NOT NULL DEFAULT 'Vanessa Becegato',
  posicionamento TEXT NOT NULL DEFAULT 'Estrutura Autônoma de Trânsito',
  whatsapp_oficial TEXT NOT NULL DEFAULT '(18) 99602-5885',
  telefone_comercial TEXT NOT NULL DEFAULT '(18) 99602-5885',
  email_contato TEXT NOT NULL DEFAULT 'contato@vanessabecegato.com.br',
  instagram TEXT NOT NULL DEFAULT '@instrutora.vanessabecegato',
  cidade_atendimento TEXT NOT NULL DEFAULT 'Dracena e Região — SP',
  aviso_legal_detran TEXT NOT NULL,
  aviso_revisao_texto TEXT NOT NULL,
  data_ultima_conferencia_detran TEXT NOT NULL DEFAULT '18/10/2026',
  responsavel_conferencia TEXT NOT NULL DEFAULT 'Vanessa Becegato',
  logo_url TEXT,
  razao_social_contratada TEXT DEFAULT 'Vanessa Becegato Aulas e Treinamento Ltda',
  cpf_cnpj_contratada TEXT DEFAULT '45.892.103/0001-44',
  registro_instrutora TEXT DEFAULT 'DETRAN-SP 084920/2019',
  endereco_contratada TEXT DEFAULT 'Dracena e Região - SP',
  provedor_email_configurado BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 3. TABELA: PACOTES PRÁTICOS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.pacotes_praticos (
  id TEXT PRIMARY KEY,
  nome TEXT NOT NULL,
  aulas INTEGER NOT NULL,
  indicado_para TEXT NOT NULL,
  foco TEXT NOT NULL,
  destaque BOOLEAN DEFAULT false,
  badge TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 4. TABELA: ETAPAS DA JORNADA OFICIAL DETRAN-SP
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.etapas_jornada (
  id TEXT PRIMARY KEY,
  ordem INTEGER NOT NULL,
  titulo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  categoria_aplicavel TEXT NOT NULL DEFAULT 'TODAS',
  pre_requisitos JSONB DEFAULT '[]'::jsonb,
  acoes_recomendadas JSONB DEFAULT '[]'::jsonb,
  documentos_necessarios JSONB DEFAULT '[]'::jsonb,
  orgao_responsavel TEXT NOT NULL,
  link_oficial TEXT NOT NULL,
  fonte_referencia TEXT NOT NULL,
  data_ultima_revisao TEXT NOT NULL,
  responsavel_revisao TEXT NOT NULL,
  precisa_revisao BOOLEAN DEFAULT false,
  depende_confirmacao_oficial BOOLEAN DEFAULT false,
  observacoes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 5. TABELA: INSTRUTORES
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.instrutores (
  id TEXT PRIMARY KEY,
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  email TEXT NOT NULL,
  categorias_autorizadas JSONB NOT NULL DEFAULT '["A", "B"]'::jsonb,
  ativo BOOLEAN DEFAULT true,
  credencial_valida BOOLEAN DEFAULT true,
  observacoes_internas TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 6. TABELA: VEÍCULOS DE TREINAMENTO (FROTA)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.veiculos (
  id TEXT PRIMARY KEY,
  codigo_interno TEXT NOT NULL UNIQUE,
  marca_modelo TEXT NOT NULL,
  ano INTEGER NOT NULL,
  placa_mascarada TEXT NOT NULL,
  categoria TEXT NOT NULL CHECK (categoria IN ('A', 'B')),
  status TEXT NOT NULL CHECK (status IN ('disponivel', 'em_uso', 'reservado', 'manutencao', 'indisponivel')),
  quilometragem INTEGER DEFAULT 0,
  proxima_manutencao TEXT NOT NULL,
  alerta_manutencao TEXT,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 7. TABELA: ALUNOS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.alunos (
  id TEXT PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT NOT NULL,
  categoria TEXT NOT NULL CHECK (categoria IN ('A', 'B', 'AB')),
  status_processo TEXT NOT NULL CHECK (status_processo IN ('em_formacao', 'aguardando_exame', 'concluido', 'suspenso')),
  etapa_atual_id TEXT REFERENCES public.etapas_jornada(id) ON DELETE SET NULL,
  data_matricula TEXT NOT NULL,
  pacote_contratado TEXT NOT NULL,
  total_aulas_contratadas INTEGER NOT NULL DEFAULT 0,
  aulas_realizadas INTEGER NOT NULL DEFAULT 0,
  observacoes TEXT,
  comunicacao_whatsapp BOOLEAN DEFAULT true,
  comunicacao_email BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 8. TABELA: INTERESSADOS / LEADS DO SITE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.interessados (
  id TEXT PRIMARY KEY,
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  email TEXT,
  servico_interesse TEXT NOT NULL,
  categoria_desejada TEXT NOT NULL CHECK (categoria_desejada IN ('A', 'B', 'AB')),
  horario_preferencial TEXT,
  mensagem TEXT,
  status TEXT NOT NULL DEFAULT 'novo' CHECK (status IN ('novo', 'primeiro_contato', 'aguardando_resposta', 'interessado', 'em_negociacao', 'convertido', 'sem_continuidade')),
  origem TEXT NOT NULL DEFAULT 'Site - Formulário de Interesse',
  data_criacao TEXT NOT NULL,
  notas_atendimento TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 9. TABELA: PROGRESSO DO ALUNO POR ETAPA
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.progresso_aluno_etapas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  aluno_id TEXT NOT NULL REFERENCES public.alunos(id) ON DELETE CASCADE,
  etapa_id TEXT NOT NULL REFERENCES public.etapas_jornada(id) ON DELETE CASCADE,
  status TEXT NOT NULL CHECK (status IN (
    'nao_iniciado', 'em_andamento', 'aguardando_documento', 'documento_recebido',
    'em_revisao', 'revisado', 'aguardando_acao_aluno', 'aguardando_confirmacao_oficial',
    'confirmado_evidencia', 'concluido_admin', 'suspenso'
  )),
  notas_aluno TEXT,
  evidencia_registrada TEXT,
  responsavel_atualizacao TEXT,
  data_atualizacao TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(aluno_id, etapa_id)
);

-- ------------------------------------------------------------------------------
-- 10. TABELA: AULAS PRÁTICAS AGENDADAS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.aulas (
  id TEXT PRIMARY KEY,
  aluno_id TEXT NOT NULL REFERENCES public.alunos(id) ON DELETE CASCADE,
  aluno_nome TEXT NOT NULL,
  instrutor_id TEXT NOT NULL REFERENCES public.instrutores(id) ON DELETE RESTRICT,
  instrutor_nome TEXT NOT NULL,
  veiculo_id TEXT NOT NULL REFERENCES public.veiculos(id) ON DELETE RESTRICT,
  veiculo_descricao TEXT NOT NULL,
  data TEXT NOT NULL, -- Formato YYYY-MM-DD
  horario_inicio TEXT NOT NULL, -- HH:mm
  horario_fim TEXT NOT NULL, -- HH:mm
  categoria TEXT NOT NULL CHECK (categoria IN ('A', 'B')),
  status TEXT NOT NULL DEFAULT 'agendada' CHECK (status IN ('agendada', 'realizada', 'cancelada', 'remarcada')),
  motivo_cancelamento TEXT,
  ponto_encontro TEXT NOT NULL,
  observacoes_gerais TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 11. TABELA: REGISTROS DE EVOLUÇÃO PEDAGÓGICA
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.registros_evolucao (
  id TEXT PRIMARY KEY,
  aluno_id TEXT NOT NULL REFERENCES public.alunos(id) ON DELETE CASCADE,
  aula_id TEXT REFERENCES public.aulas(id) ON DELETE SET NULL,
  data_aula TEXT NOT NULL,
  instrutor_id TEXT NOT NULL REFERENCES public.instrutores(id) ON DELETE RESTRICT,
  instrutor_nome TEXT NOT NULL,
  habilidades_praticadas JSONB DEFAULT '[]'::jsonb,
  pontos_fortes TEXT NOT NULL,
  aspectos_para_praticar TEXT NOT NULL,
  meta_proxima_aula TEXT NOT NULL,
  observacoes_aluno TEXT NOT NULL,
  observacoes_internas TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 12. TABELA: DOCUMENTOS ENVIADOS PELO ALUNO
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.documentos_aluno (
  id TEXT PRIMARY KEY,
  aluno_id TEXT NOT NULL REFERENCES public.alunos(id) ON DELETE CASCADE,
  titulo TEXT NOT NULL,
  tipo TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('solicitado', 'enviado', 'recebido', 'revisado', 'recusado', 'exige_confirmacao')),
  nome_arquivo TEXT,
  tamanho_kb INTEGER,
  data_envio TEXT,
  data_revisao TEXT,
  revisado_por TEXT,
  motivo_recusa TEXT,
  orientacao_envio TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 13. TABELA: MODELOS DE DOCUMENTOS E CONTRATOS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.modelos_documentos (
  id TEXT PRIMARY KEY,
  tipo TEXT NOT NULL CHECK (tipo IN ('contrato_aulas_praticas', 'termo_responsabilidade')),
  titulo TEXT NOT NULL,
  versao TEXT NOT NULL,
  ativo BOOLEAN DEFAULT true,
  estado TEXT NOT NULL CHECK (estado IN ('rascunho', 'aprovado', 'arquivado')),
  data_criacao TEXT NOT NULL,
  responsavel_alteracao TEXT NOT NULL,
  clausulas JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 14. TABELA: CONTRATOS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contratos (
  id TEXT PRIMARY KEY,
  numero_contrato TEXT NOT NULL UNIQUE,
  aluno_id TEXT NOT NULL REFERENCES public.alunos(id) ON DELETE RESTRICT,
  aluno_nome TEXT NOT NULL,
  aluno_cpf TEXT,
  aluno_rg TEXT,
  aluno_endereco TEXT,
  aluno_telefone TEXT NOT NULL,
  aluno_email TEXT,
  pacote_nome TEXT NOT NULL,
  quantidade_aulas INTEGER NOT NULL,
  duracao_aula_minutos INTEGER NOT NULL DEFAULT 50,
  categoria TEXT NOT NULL CHECK (categoria IN ('A', 'B', 'AB')),
  valor_total NUMERIC(10, 2) NOT NULL,
  forma_pagamento TEXT NOT NULL,
  data_inicio_prevista TEXT NOT NULL,
  versao_modelo TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN (
    'minuta', 'aguardando_conferencia', 'aguardando_aceite', 'aceito_eletronicamente',
    'pdf_gerado', 'aguardando_assinatura', 'assinado', 'cancelado', 'substituido'
  )),
  data_criacao TEXT NOT NULL,
  data_aceite TEXT,
  evidencia_aceite_ip TEXT,
  evidencia_aceite_data_hora TEXT,
  data_assinatura TEXT,
  motivo_cancelamento TEXT,
  pdf_gerado_em TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 15. TABELA: RECIBOS
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.recibos (
  id TEXT PRIMARY KEY,
  numero_recibo TEXT NOT NULL UNIQUE,
  aluno_id TEXT NOT NULL REFERENCES public.alunos(id) ON DELETE RESTRICT,
  aluno_nome TEXT NOT NULL,
  pagador_nome TEXT NOT NULL,
  pagador_cpf TEXT,
  contrato_id TEXT REFERENCES public.contratos(id) ON DELETE SET NULL,
  servico_descricao TEXT NOT NULL,
  valor_recebido NUMERIC(10, 2) NOT NULL,
  forma_pagamento TEXT NOT NULL CHECK (forma_pagamento IN (
    'PIX', 'Cartão de Crédito', 'Cartão de Débito', 'Dinheiro em Espécie', 'Transferência'
  )),
  data_pagamento TEXT NOT NULL,
  data_emissao TEXT NOT NULL,
  emitido_por TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'emitido' CHECK (status IN ('emitido', 'cancelado')),
  observacoes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 16. TABELA: HISTÓRICO DE ENVIOS (E-MAIL E WHATSAPP)
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.historico_envios (
  id TEXT PRIMARY KEY,
  documento_id TEXT NOT NULL,
  documento_tipo TEXT NOT NULL CHECK (documento_tipo IN ('contrato', 'recibo', 'termo')),
  documento_numero TEXT NOT NULL,
  aluno_id TEXT NOT NULL REFERENCES public.alunos(id) ON DELETE CASCADE,
  aluno_nome TEXT NOT NULL,
  canal TEXT NOT NULL CHECK (canal IN ('whatsapp', 'email')),
  destinatario TEXT NOT NULL,
  data_tentativa TEXT NOT NULL,
  status_envio TEXT NOT NULL CHECK (status_envio IN ('enviado', 'pendente', 'falhou', 'aberto_manual')),
  resultado_provedor TEXT NOT NULL,
  usuario_responsavel TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 17. TABELA: GALERIA DE FOTOS DO SITE
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.galeria_fotos (
  id TEXT PRIMARY KEY,
  titulo TEXT NOT NULL,
  categoria TEXT NOT NULL CHECK (categoria IN ('veiculos', 'aulas', 'pista', 'instrutora')),
  descricao TEXT NOT NULL,
  imagem_url TEXT NOT NULL,
  destaque BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 18. TABELA: AUDITORIA E SEGURANÇA
-- ------------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.auditoria (
  id TEXT PRIMARY KEY,
  data_hora TEXT NOT NULL,
  usuario_nome TEXT NOT NULL,
  usuario_papel TEXT NOT NULL,
  acao TEXT NOT NULL,
  entidade TEXT NOT NULL,
  detalhes TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ------------------------------------------------------------------------------
-- 19. GATILHOS DE AUTO-UPDATE (UPDATED_AT)
-- ------------------------------------------------------------------------------
DO $$
DECLARE
  t text;
BEGIN
  FOR t IN
    SELECT table_name
    FROM information_schema.columns
    WHERE column_name = 'updated_at'
      AND table_schema = 'public'
  LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS trg_update_updated_at ON public.%I;', t);
    EXECUTE format('CREATE TRIGGER trg_update_updated_at BEFORE UPDATE ON public.%I FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();', t);
  END LOOP;
END;
$$;

-- ------------------------------------------------------------------------------
-- 20. ÍNDICES DE PERFORMANCE
-- ------------------------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_alunos_email ON public.alunos(email);
CREATE INDEX IF NOT EXISTS idx_alunos_categoria ON public.alunos(categoria);
CREATE INDEX IF NOT EXISTS idx_aulas_aluno_id ON public.aulas(aluno_id);
CREATE INDEX IF NOT EXISTS idx_aulas_data ON public.aulas(data);
CREATE INDEX IF NOT EXISTS idx_contratos_aluno_id ON public.contratos(aluno_id);
CREATE INDEX IF NOT EXISTS idx_contratos_numero ON public.contratos(numero_contrato);
CREATE INDEX IF NOT EXISTS idx_recibos_aluno_id ON public.recibos(aluno_id);
CREATE INDEX IF NOT EXISTS idx_recibos_numero ON public.recibos(numero_recibo);
CREATE INDEX IF NOT EXISTS idx_veiculos_status ON public.veiculos(status);
CREATE INDEX IF NOT EXISTS idx_historico_envios_aluno ON public.historico_envios(aluno_id);
CREATE INDEX IF NOT EXISTS idx_interessados_status ON public.interessados(status);

-- ------------------------------------------------------------------------------
-- 21. ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------
ALTER TABLE public.configuracoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pacotes_praticos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.etapas_jornada ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instrutores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.veiculos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alunos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interessados ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.progresso_aluno_etapas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aulas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.registros_evolucao ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documentos_aluno ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modelos_documentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contratos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recibos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.historico_envios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.galeria_fotos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auditoria ENABLE ROW LEVEL SECURITY;

-- Políticas públicas de leitura para a vitrine do site
CREATE POLICY "Leitura pública de configurações" ON public.configuracoes FOR SELECT USING (true);
CREATE POLICY "Leitura pública de pacotes" ON public.pacotes_praticos FOR SELECT USING (true);
CREATE POLICY "Leitura pública de etapas da jornada" ON public.etapas_jornada FOR SELECT USING (true);
CREATE POLICY "Leitura pública da galeria de fotos" ON public.galeria_fotos FOR SELECT USING (true);

-- Política de inserção pública para captação de leads (formulário do site)
CREATE POLICY "Qualquer visitante pode enviar interesse" ON public.interessados FOR INSERT WITH CHECK (true);

-- Políticas para acesso autenticado / anon (usando chave anônima da aplicação ou usuário autenticado)
CREATE POLICY "Acesso completo de leitura anon/auth para todas as tabelas operacionais" ON public.alunos FOR ALL USING (true);
CREATE POLICY "Acesso completo a veículos" ON public.veiculos FOR ALL USING (true);
CREATE POLICY "Acesso completo a instrutores" ON public.instrutores FOR ALL USING (true);
CREATE POLICY "Acesso completo a aulas" ON public.aulas FOR ALL USING (true);
CREATE POLICY "Acesso completo a progresso" ON public.progresso_aluno_etapas FOR ALL USING (true);
CREATE POLICY "Acesso completo a evoluções" ON public.registros_evolucao FOR ALL USING (true);
CREATE POLICY "Acesso completo a documentos de alunos" ON public.documentos_aluno FOR ALL USING (true);
CREATE POLICY "Acesso completo a modelos de documentos" ON public.modelos_documentos FOR ALL USING (true);
CREATE POLICY "Acesso completo a contratos" ON public.contratos FOR ALL USING (true);
CREATE POLICY "Acesso completo a recibos" ON public.recibos FOR ALL USING (true);
CREATE POLICY "Acesso completo a histórico de envios" ON public.historico_envios FOR ALL USING (true);
CREATE POLICY "Acesso completo a interessados" ON public.interessados FOR ALL USING (true);
CREATE POLICY "Acesso completo a auditoria" ON public.auditoria FOR ALL USING (true);
CREATE POLICY "Atualização administrativa de configurações" ON public.configuracoes FOR ALL USING (true);
CREATE POLICY "Gestão da galeria de fotos" ON public.galeria_fotos FOR ALL USING (true);
CREATE POLICY "Gestão de pacotes práticos" ON public.pacotes_praticos FOR ALL USING (true);
CREATE POLICY "Gestão de etapas da jornada" ON public.etapas_jornada FOR ALL USING (true);
