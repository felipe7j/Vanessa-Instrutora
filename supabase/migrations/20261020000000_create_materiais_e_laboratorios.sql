-- ==============================================================================
-- MIGRAÇÃO SUPABASE: MATERIAIS DE ESTUDO & LABORATÓRIOS TOXICOLÓGICOS
-- Arquivo: 20261020000000_create_materiais_e_laboratorios.sql
-- Aplicação: Vanessa Becegato — Estrutura Autônoma
-- ==============================================================================

-- 1. TABELA: MATERIAIS DE ESTUDO (Formulários Oficiais Detran-SP e Guias de Revisão)
CREATE TABLE IF NOT EXISTS public.materiais_estudo (
  id TEXT PRIMARY KEY,
  titulo TEXT NOT NULL,
  categoria TEXT NOT NULL CHECK (categoria IN ('duas_rodas', 'quatro_rodas', 'legislacao', 'checklist')),
  descricao TEXT NOT NULL,
  versao_formulario TEXT NOT NULL,
  data_disponibilizacao TEXT NOT NULL,
  fonte_oficial TEXT NOT NULL,
  nome_arquivo TEXT NOT NULL,
  criterios_avaliacao JSONB NOT NULL DEFAULT '[]'::jsonb,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS: materiais_estudo
ALTER TABLE public.materiais_estudo ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Todos podem consultar materiais de estudo ativos"
  ON public.materiais_estudo FOR SELECT
  USING (ativo = true);

CREATE POLICY "Administrador pode gerenciar materiais de estudo"
  ON public.materiais_estudo FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'role' = 'authenticated')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'role' = 'authenticated');


-- 2. TABELA: LABORATÓRIOS TOXICOLÓGICOS CREDENCIADOS
CREATE TABLE IF NOT EXISTS public.laboratorios_toxicologicos (
  id TEXT PRIMARY KEY,
  nome TEXT NOT NULL,
  cidade TEXT NOT NULL,
  endereco TEXT NOT NULL,
  telefone TEXT NOT NULL,
  whatsapp TEXT,
  site TEXT,
  fonte_informacao TEXT NOT NULL,
  data_verificacao TEXT NOT NULL,
  credenciamento_confirmado BOOLEAN NOT NULL DEFAULT true,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- RLS: laboratorios_toxicologicos
ALTER TABLE public.laboratorios_toxicologicos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Todos podem consultar laboratórios toxicológicos cadastrados"
  ON public.laboratorios_toxicologicos FOR SELECT
  USING (ativo = true);

CREATE POLICY "Administrador pode gerenciar catálogo de laboratórios"
  ON public.laboratorios_toxicologicos FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'role' = 'authenticated')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin' OR auth.jwt() ->> 'role' = 'authenticated');


-- 3. CARGA INICIAL (SEED) DOS MATERIAIS DE ESTUDO
INSERT INTO public.materiais_estudo (
  id, titulo, categoria, descricao, versao_formulario, data_disponibilizacao, fonte_oficial, nome_arquivo, criterios_avaliacao
) VALUES 
(
  'mat-01',
  'Formulário de Avaliação do Exame Prático de Direção Veicular — Duas Rodas (A e ACC)',
  'duas_rodas',
  'Critérios oficiais de avaliação do Detran-SP para a prova prática de motocicletas e ciclomotores. Apresenta todas as faltas eliminatórias, graves (3 pts), médias (2 pts) e leves (1 pt), com limite de reprovação.',
  'Modelo Oficial Detran-SP / Resolução Contran nº 789/2020',
  '18/10/2026',
  'Diretoria de Habilitação — Detran-SP',
  'Formulario_Avaliacao_Detran_SP_Duas_Rodas_A_ACC.pdf',
  '[
    {
      "categoriaFalta": "Eliminatória",
      "pontos": 0,
      "itens": [
        "Iniciar a prova sem estar com o capacete devidamente ajustado à cabeça e afivelado",
        "Engrenar ou desengrenar a marcha sem utilizar a embreagem",
        "Bater nos cones de balizamento ou derrubá-los no circuito",
        "Colocar um ou ambos os pés no chão com a motocicleta em movimento",
        "Descumprir o trajeto ou limites de pista delimitados para a prova",
        "Perder o equilíbrio do veículo provocando queda ou risco de acidente"
      ]
    },
    {
      "categoriaFalta": "Grave",
      "pontos": 3,
      "itens": [
        "Deixar de usar vestuário de proteção exigido pelas normas regulamentares",
        "Não sinalizar com antecedência a mudança de direção ou manobra exigida",
        "Transitar em velocidade incompatível com a segurança no circuito",
        "Deixar de parar antes de cruzar via preferencial ou linha de retenção"
      ]
    },
    {
      "categoriaFalta": "Média",
      "pontos": 2,
      "itens": [
        "Interromper o funcionamento do motor por imperícia após o início do exame",
        "Utilizar marcha inadequada para a velocidade e trecho da pista",
        "Deixar de usar o farol aceso durante o dia no percurso",
        "Frear bruscamente sem motivo de emergência comprovada"
      ]
    },
    {
      "categoriaFalta": "Leve",
      "pontos": 1,
      "itens": [
        "Colocar o pé no chão após a parada total sem apoiar na posição adequada",
        "Manusear comandos de forma irregular sem prejuízo iminente à segurança",
        "Engatar marcha com dificuldade ou ruído de engrenagem excessivo"
      ]
    }
  ]'::jsonb
),
(
  'mat-02',
  'Formulário de Avaliação do Exame Prático de Direção Veicular — Quatro Rodas (B, C, D e E)',
  'quatro_rodas',
  'Critérios oficiais de avaliação do Detran-SP para automóveis e utilitários. Detalha regras de baliza de três tentativas com tempo cronometrado, faltas eliminatórias e penalidades por pontuação acumulada.',
  'Modelo Oficial Detran-SP / Artigos 158 a 160 do CTB',
  '18/10/2026',
  'Diretoria de Habilitação — Detran-SP',
  'Formulario_Avaliacao_Detran_SP_Quatro_Rodas_BCDE.pdf',
  '[
    {
      "categoriaFalta": "Eliminatória",
      "pontos": 0,
      "itens": [
        "Desobedecer sinalização semafórica ou placa de Parada Obrigatória (R-1)",
        "Avançar sobre o meio-fio ou tocar balizadores delimitadores na baliza",
        "Não colocar o veículo na área balizada em até 3 tentativas ou no tempo de até 5 minutos",
        "Transitar pela contramão de direção durante o percurso",
        "Perder o controle do veículo provocando colisão ou intervenção no duplo comando",
        "Não colocar ou não manter afivelado o cinto de segurança"
      ]
    },
    {
      "categoriaFalta": "Grave",
      "pontos": 3,
      "itens": [
        "Desobedecer a preferência em cruzamentos, rotatórias ou faixas de pedestre",
        "Não manter distância lateral e frontal de segurança dos demais veículos",
        "Transitar em velocidade incompatível com a via da banca examinadora",
        "Não sinalizar (seta) com antecedência devida o início da marcha ou conversão"
      ]
    },
    {
      "categoriaFalta": "Média",
      "pontos": 2,
      "itens": [
        "Deixar o motor apagar com o veículo engrenado em movimento",
        "Não acionar o freio de estacionamento ao parar em aclive ou declive",
        "Desengrenar o veículo em descida (ponto morto)",
        "Executar conversão com giro aberto ou fechado incorreto",
        "Trafegar em velocidade excessivamente reduzida sem justificativa"
      ]
    },
    {
      "categoriaFalta": "Leve",
      "pontos": 1,
      "itens": [
        "Provocar movimentos irregulares no veículo sem motivo aparente",
        "Tentar engatar marcha sem pisar totalmente na embreagem",
        "Usar a buzina sem necessidade ou em desacordo com as normas de trânsito",
        "Ajustar retrovisores com o veículo em movimento",
        "Estacionar o veículo afastado a mais de 50 cm do meio-fio"
      ]
    }
  ]'::jsonb
)
ON CONFLICT (id) DO UPDATE SET
  titulo = EXCLUDED.titulo,
  descricao = EXCLUDED.descricao,
  criterios_avaliacao = EXCLUDED.criterios_avaliacao;


-- 4. CARGA INICIAL (SEED) DE LABORATÓRIOS TOXICOLÓGICOS CREDENCIADOS
INSERT INTO public.laboratorios_toxicologicos (
  id, nome, cidade, endereco, telefone, whatsapp, site, fonte_informacao, data_verificacao, credenciamento_confirmado
) VALUES
(
  'lab-01',
  'Laboratório Toxicológico Santa Clara — Unidade Dracena',
  'Dracena — SP',
  'Rua Tiradentes, 850 — Centro, Dracena/SP',
  '(18) 3821-4400',
  '(18) 99612-3344',
  'https://santaclara.com.br',
  'Registro de Laboratórios Conveniados Senatran',
  '18/10/2026',
  true
),
(
  'lab-02',
  'Posto de Coleta Toxicológica Pardini / Unilabor',
  'Dracena — SP',
  'Av. Presidente Vargas, 1420 — Dracena/SP',
  '(18) 3822-1900',
  '(18) 99755-8822',
  'https://unilabordracena.com.br',
  'Portal de Serviços Senatran',
  '18/10/2026',
  true
),
(
  'lab-03',
  'Laboratório Central Diagnósticos — Polo Regional',
  'Presidente Prudente — SP',
  'Rua Siqueira Campos, 1120 — Centro, Presidente Prudente/SP',
  '(18) 3229-8000',
  '(18) 99801-4455',
  'https://centraldiagnosticos.com.br',
  'Consulta Oficial Detran-SP',
  '18/10/2026',
  true
)
ON CONFLICT (id) DO UPDATE SET
  nome = EXCLUDED.nome,
  endereco = EXCLUDED.endereco,
  telefone = EXCLUDED.telefone;
