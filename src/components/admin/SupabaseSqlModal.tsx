import React, { useState } from 'react';
import { X, Copy, Check, Database, Terminal, Shield, Sparkles } from 'lucide-react';

interface SupabaseSqlModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SupabaseSqlModal: React.FC<SupabaseSqlModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'schema' | 'seed' | 'instrucoes'>('schema');

  if (!isOpen) return null;

  const sqlSchema = `-- ==============================================================================
-- MIGRAÇÃO 1: ESTRUTURA DE TABELAS, ÍNDICES, GATILHOS E RLS (SUPABASE)
-- Aplicação: Vanessa Becegato — Estrutura Autônoma de Trânsito
-- Arquivo: supabase/migrations/20261019000000_create_vanessa_becegato_schema.sql
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 1. CONFIGURAÇÕES
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

-- 2. PACOTES PRÁTICOS
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

-- 3. ETAPAS DETRAN
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

-- 4. INSTRUTORES
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

-- 5. VEÍCULOS (FROTA)
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

-- 6. ALUNOS
CREATE TABLE IF NOT EXISTS public.alunos (
  id TEXT PRIMARY KEY,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT NOT NULL,
  cpf TEXT,
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
  usuario_acesso TEXT,
  senha_inicial TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. INTERESSADOS (LEADS)
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

-- 8. AULAS PRÁTICAS
CREATE TABLE IF NOT EXISTS public.aulas (
  id TEXT PRIMARY KEY,
  aluno_id TEXT NOT NULL REFERENCES public.alunos(id) ON DELETE CASCADE,
  aluno_nome TEXT NOT NULL,
  instrutor_id TEXT NOT NULL REFERENCES public.instrutores(id) ON DELETE RESTRICT,
  instrutor_nome TEXT NOT NULL,
  veiculo_id TEXT NOT NULL REFERENCES public.veiculos(id) ON DELETE RESTRICT,
  veiculo_descricao TEXT NOT NULL,
  data TEXT NOT NULL,
  horario_inicio TEXT NOT NULL,
  horario_fim TEXT NOT NULL,
  categoria TEXT NOT NULL CHECK (categoria IN ('A', 'B')),
  status TEXT NOT NULL DEFAULT 'agendada' CHECK (status IN ('agendada', 'realizada', 'cancelada', 'remarcada')),
  motivo_cancelamento TEXT,
  ponto_encontro TEXT NOT NULL,
  observacoes_gerais TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. MODELOS DE DOCUMENTO
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

-- 10. CONTRATOS
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
  status TEXT NOT NULL,
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

-- 11. RECIBOS
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
  forma_pagamento TEXT NOT NULL,
  data_pagamento TEXT NOT NULL,
  data_emissao TEXT NOT NULL,
  emitido_por TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'emitido',
  observacoes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 12. HISTÓRICO DE ENVIOS
CREATE TABLE IF NOT EXISTS public.historico_envios (
  id TEXT PRIMARY KEY,
  documento_id TEXT NOT NULL,
  documento_tipo TEXT NOT NULL,
  documento_numero TEXT NOT NULL,
  aluno_id TEXT NOT NULL REFERENCES public.alunos(id) ON DELETE CASCADE,
  aluno_nome TEXT NOT NULL,
  canal TEXT NOT NULL,
  destinatario TEXT NOT NULL,
  data_tentativa TEXT NOT NULL,
  status_envio TEXT NOT NULL,
  resultado_provedor TEXT NOT NULL,
  usuario_responsavel TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 13. GALERIA DE FOTOS
CREATE TABLE IF NOT EXISTS public.galeria_fotos (
  id TEXT PRIMARY KEY,
  titulo TEXT NOT NULL,
  categoria TEXT NOT NULL,
  descricao TEXT NOT NULL,
  imagem_url TEXT NOT NULL,
  destaque BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 14. AUDITORIA
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

-- RLS & POLICIES
ALTER TABLE public.configuracoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pacotes_praticos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.etapas_jornada ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instrutores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.veiculos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.alunos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interessados ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.aulas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modelos_documentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contratos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recibos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.historico_envios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.galeria_fotos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.auditoria ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public Read Config" ON public.configuracoes FOR SELECT USING (true);
CREATE POLICY "Public Read Pacotes" ON public.pacotes_praticos FOR SELECT USING (true);
CREATE POLICY "Public Read Etapas" ON public.etapas_jornada FOR SELECT USING (true);
CREATE POLICY "Public Read Galeria" ON public.galeria_fotos FOR SELECT USING (true);
CREATE POLICY "Public Insert Leads" ON public.interessados FOR INSERT WITH CHECK (true);
CREATE POLICY "App Access All" ON public.alunos FOR ALL USING (true);
CREATE POLICY "App Access Veiculos" ON public.veiculos FOR ALL USING (true);
CREATE POLICY "App Access Contratos" ON public.contratos FOR ALL USING (true);
CREATE POLICY "App Access Recibos" ON public.recibos FOR ALL USING (true);
CREATE POLICY "App Access Config" ON public.configuracoes FOR ALL USING (true);
CREATE POLICY "App Access Galeria" ON public.galeria_fotos FOR ALL USING (true);
CREATE POLICY "App Access Interessados" ON public.interessados FOR ALL USING (true);
CREATE POLICY "App Access Aulas" ON public.aulas FOR ALL USING (true);
CREATE POLICY "App Access Instrutores" ON public.instrutores FOR ALL USING (true);
CREATE POLICY "App Access Auditoria" ON public.auditoria FOR ALL USING (true);
`;

  const sqlSeed = `-- ==============================================================================
-- MIGRAÇÃO 2: CARGA INICIAL DE DADOS (SEED) — SUPABASE
-- Arquivo: supabase/migrations/20261019000001_seed_initial_data.sql
-- ==============================================================================

INSERT INTO public.configuracoes (
  id, nome_comercial, posicionamento, whatsapp_oficial, telefone_comercial,
  email_contato, instagram, cidade_atendimento, aviso_legal_detran,
  aviso_revisao_texto, data_ultima_conferencia_detran, responsavel_conferencia
) VALUES (
  'config-default', 'Vanessa Becegato', 'Estrutura Autônoma de Trânsito',
  '(18) 99602-5885', '(18) 99602-5885', 'contato@vanessabecegato.com.br',
  '@instrutora.vanessabecegato', 'Dracena e Região — SP',
  'Aviso Importante: Esta plataforma é um sistema independente de organização e acompanhamento profissional. Não somos autoescola, CFC, órgão público nem representantes oficiais do Detran-SP.',
  'Este conteúdo é informativo e segue as diretrizes públicas do Detran-SP.',
  '18/10/2026', 'Vanessa Becegato'
) ON CONFLICT (id) DO UPDATE SET cidade_atendimento = EXCLUDED.cidade_atendimento;

INSERT INTO public.veiculos (id, codigo_interno, marca_modelo, ano, placa_mascarada, categoria, status, quilometragem, proxima_manutencao, ativo) VALUES
('veic-01', 'CAR-01', 'Volkswagen Gol Power 1.6 TotalFlex', 2022, 'BRA-***4', 'B', 'disponivel', 38400, '2026-11-20', true),
('veic-02', 'MOT-01', 'Yamaha Fazer 150 ABS', 2023, 'SP-***9', 'A', 'disponivel', 12100, '2026-12-05', true)
ON CONFLICT (id) DO UPDATE SET marca_modelo = EXCLUDED.marca_modelo;

INSERT INTO public.instrutores (id, nome, telefone, email, categorias_autorizadas, ativo, credencial_valida) VALUES
('inst-01', 'Vanessa Becegato', '(18) 99602-5885', 'vanessa@vanessabecegato.com.br', '["A", "B"]'::jsonb, true, true)
ON CONFLICT (id) DO NOTHING;
`;

  const currentContent = activeTab === 'schema' ? sqlSchema : activeTab === 'seed' ? sqlSeed : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(currentContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <span>Migrations SQL para o Supabase</span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800">
                  Pronto para Rodar
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Arquivos gerados em <code className="text-amber-300 font-mono">supabase/migrations/</code> e <code className="text-amber-300 font-mono">supabase/schema.sql</code>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center justify-between px-6 py-3 bg-slate-100 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('schema')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === 'schema'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
              }`}
            >
              1. Tabelas & RLS (20261019000000_create_vanessa_becegato_schema.sql)
            </button>
            <button
              onClick={() => setActiveTab('seed')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === 'seed'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
              }`}
            >
              2. Carga Inicial (20261019000001_seed_initial_data.sql)
            </button>
            <button
              onClick={() => setActiveTab('instrucoes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === 'instrucoes'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-300'
              }`}
            >
              Passo a Passo
            </button>
          </div>

          {activeTab !== 'instrucoes' && (
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold transition cursor-pointer shadow-xs"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-slate-950" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado para Área de Transferência!' : 'Copiar Código SQL'}</span>
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 font-sans text-xs">
          {activeTab === 'instrucoes' ? (
            <div className="space-y-4 max-w-2xl mx-auto text-slate-700">
              <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl space-y-2">
                <h4 className="font-bold text-amber-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>Como Conectar o Supabase ao Projeto:</span>
                </h4>
                <p className="text-xs text-amber-950">
                  Siga estes 3 passos simples para ter seu banco PostgreSQL 100% ativo e sincronizado:
                </p>
              </div>

              <ol className="space-y-3 list-decimal list-inside text-xs leading-relaxed font-medium">
                <li className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <strong>Crie ou acesse seu projeto no Supabase:</strong>
                  <p className="text-slate-500 mt-1">
                    Entre em <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-amber-700 underline font-semibold">supabase.com</a>, crie um novo projeto chamado <em>"Vanessa Becegato"</em> e aguarde a inicialização.
                  </p>
                </li>

                <li className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <strong>Execute o SQL no Supabase SQL Editor:</strong>
                  <p className="text-slate-500 mt-1">
                    No painel do Supabase, vá em <strong>SQL Editor</strong> &gt; <strong>New Query</strong>, cole o código da aba <em>"1. Tabelas & RLS"</em> e clique em <strong>Run</strong>. Em seguida, rode também a aba <em>"2. Carga Inicial"</em>.
                  </p>
                </li>

                <li className="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <strong>Adicione as variáveis de ambiente:</strong>
                  <p className="text-slate-500 mt-1">
                    Em <em>Project Settings &gt; API</em> no Supabase, copie a <strong>Project URL</strong> e a <strong>anon public key</strong> e adicione nas variáveis do ambiente (.env):
                  </p>
                  <pre className="mt-2 p-2.5 bg-slate-900 text-amber-300 rounded-lg font-mono text-[11px] overflow-x-auto">
                    VITE_SUPABASE_URL="https://seu-projeto.supabase.co"&#10;VITE_SUPABASE_ANON_KEY="sua-chave-anon"
                  </pre>
                </li>
              </ol>
            </div>
          ) : (
            <div className="relative">
              <pre className="p-4 bg-slate-950 text-slate-200 rounded-2xl font-mono text-[11px] overflow-x-auto max-h-[50vh] leading-relaxed selection:bg-amber-500 selection:text-slate-950">
                {currentContent}
              </pre>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>O projeto continua funcionando de modo resiliente via navegador caso o Supabase ainda não esteja configurado.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl cursor-pointer"
          >
            Fechar Janela
          </button>
        </div>
      </div>
    </div>
  );
};
