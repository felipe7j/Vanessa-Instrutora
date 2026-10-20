-- ==============================================================================
-- MIGRAÇÃO DE CARGA INICIAL (SEED) — VANESSA BECEGATTO
-- Arquivo: 20261019000001_seed_initial_data.sql
-- ==============================================================================

-- 1. CONFIGURAÇÕES INICIAIS
INSERT INTO public.configuracoes (
  id, nome_comercial, posicionamento, whatsapp_oficial, telefone_comercial,
  email_contato, instagram, cidade_atendimento, aviso_legal_detran,
  aviso_revisao_texto, data_ultima_conferencia_detran, responsavel_conferencia,
  logo_url, razao_social_contratada, cpf_cnpj_contratada, registro_instrutora,
  endereco_contratada, provedor_email_configurado
) VALUES (
  'config-default',
  'Vanessa Becegato',
  'Estrutura Autônoma de Trânsito',
  '(18) 99602-5885',
  '(18) 99602-5885',
  'contato@vanessabecegato.com.br',
  '@instrutora.vanessabecegato',
  'Dracena e Região — SP',
  'Aviso Importante: Esta plataforma é um sistema independente de organização e acompanhamento profissional. Não somos autoescola, CFC, órgão público nem representantes oficiais do Detran-SP. A consulta aos canais oficiais é indispensável.',
  'Este conteúdo é informativo e segue as diretrizes públicas do Detran-SP. Confira sempre os requisitos vigentes antes de qualquer pagamento ou exame.',
  '18/10/2026',
  'Vanessa Becegato',
  NULL,
  'Vanessa Becegato Aulas e Treinamento Ltda',
  '45.892.103/0001-44',
  'DETRAN-SP 084920/2019',
  'Dracena e Região - SP',
  true
) ON CONFLICT (id) DO UPDATE SET
  cidade_atendimento = EXCLUDED.cidade_atendimento,
  whatsapp_oficial = EXCLUDED.whatsapp_oficial;

-- 2. PACOTES PRÁTICOS
INSERT INTO public.pacotes_praticos (id, nome, aulas, indicado_para, foco, destaque, badge) VALUES
('pacote-hab-carro', 'Primeira Habilitação Carro (Cat. B)', 20, 'Alunos que buscam aprovação com tranquilidade e postura defensiva.', 'Domínio de embreagem, baliza com referências claras, circulação urbana segura e controle emocional.', true, 'Mais Escolhido'),
('pacote-hab-moto', 'Primeira Habilitação Moto (Cat. A)', 20, 'Alunos em busca de equilíbrio, agilidade e segurança em duas rodas.', 'Circuito de pista, postura, frenagem progressiva, trocas de marchas e atenção defensiva.', false, 'Especializado'),
('pacote-perder-medo', 'Superação do Medo de Dirigir', 10, 'Condutores já habilitados que sentem insegurança, ansiedade ou travamento ao volante.', 'Aulas no seu próprio ritmo, reativação gradual, subidas íngremes, vias rápidas e acolhimento.', true, 'Foco Humanizado'),
('pacote-reforco-exame', 'Treinamento Intensivo Pré-Exame', 5, 'Quem já completou a carga básica e quer reforçar manobras e critérios de avaliação do examinador.', 'Simulado detalhado dos critérios de pontuação do Detran-SP, controle de nervosismo e manobras precisas.', false, 'Reta Final')
ON CONFLICT (id) DO NOTHING;

-- 3. INSTRUTORES
INSERT INTO public.instrutores (id, nome, telefone, email, categorias_autorizadas, ativo, credencial_valida, observacoes_internas) VALUES
('inst-01', 'Vanessa Becegato', '(18) 99602-5885', 'vanessa@vanessabecegato.com.br', '["A", "B"]'::jsonb, true, true, 'Instrutora fundadora, credenciada e pós-graduada em Psicologia do Trânsito e Educação Defensiva.')
ON CONFLICT (id) DO NOTHING;

-- 4. FROTA DE VEÍCULOS
INSERT INTO public.veiculos (id, codigo_interno, marca_modelo, ano, placa_mascarada, categoria, status, quilometragem, proxima_manutencao, alerta_manutencao, ativo) VALUES
('veic-01', 'CAR-01', 'Volkswagen Gol Power 1.6 TotalFlex', 2022, 'BRA-***4', 'B', 'disponivel', 38400, '2026-11-20', 'Alinhamento e rodízio preventivo de pneus em 1.500 km', true),
('veic-02', 'MOT-01', 'Yamaha Fazer 150 ABS', 2023, 'SP-***9', 'A', 'disponivel', 12100, '2026-12-05', 'Revisão preventiva periódica de freios e relação', true)
ON CONFLICT (id) DO UPDATE SET
  marca_modelo = EXCLUDED.marca_modelo,
  ano = EXCLUDED.ano;

-- 5. ALUNOS
INSERT INTO public.alunos (
  id, nome, email, telefone, categoria, status_processo,
  etapa_atual_id, data_matricula, pacote_contratado,
  total_aulas_contratadas, aulas_realizadas, observacoes,
  comunicacao_whatsapp, comunicacao_email
) VALUES (
  'aluno-01',
  'Mariana Silva de Albuquerque',
  'mariana.albuquerque@email.com',
  '(18) 99712-4433',
  'B',
  'em_formacao',
  'etapa-05',
  '2026-09-12',
  'Primeira Habilitação Carro (Cat. B) - 20 Aulas',
  20,
  14,
  'Aluna pontual e dedicada. Apresentava leve insegurança em saídas íngremes na 3ª aula, já totalmente superada.',
  true,
  true
),
(
  'aluno-02',
  'Carlos Eduardo Mendes',
  'cadu.mendes@email.com',
  '(18) 99881-2299',
  'A',
  'aguardando_exame',
  'etapa-06',
  '2026-08-01',
  'Primeira Habilitação Moto (Cat. A) - 20 Aulas',
  20,
  20,
  'Carga prática 100% cumprida. Simulado de pista realizado com zero faltas.',
  true,
  true
)
ON CONFLICT (id) DO NOTHING;

-- 6. ETAPAS DA JORNADA DETRAN
INSERT INTO public.etapas_jornada (
  id, ordem, titulo, descricao, categoria_aplicavel,
  orgao_responsavel, link_oficial, fonte_referencia,
  data_ultima_revisao, responsavel_revisao,
  precisa_revisao, depende_confirmacao_oficial, observacoes
) VALUES
('etapa-01', 1, 'Inscrição e Cadastro no Detran-SP', 'Abertura do processo de 1ª habilitação no portal oficial do Detran-SP.', 'TODAS', 'Detran-SP / Poupatempo', 'https://www.detran.sp.gov.br', 'Portaria Detran-SP nº 101/2023', '2026-10-18', 'Vanessa Becegato', false, false, 'Necessário documento com foto e comprovante de residência.'),
('etapa-02', 2, 'Exames Médico e Psicotécnico', 'Realização da avaliação pericial em clínica credenciada pelo Detran.', 'TODAS', 'Clínica Credenciada Detran-SP', 'https://www.detran.sp.gov.br', 'Resolução CONTRAN nº 927', '2026-10-18', 'Vanessa Becegato', false, true, 'Taxas periciais são pagas diretamente às clínicas credenciadas.'),
('etapa-03', 3, 'Curso Teórico-Técnico (CFC-A)', 'Carga de 45 horas/aula de legislação de trânsito, primeiros socorros e direção defensiva.', 'TODAS', 'CFC-A Homologado', 'https://www.detran.sp.gov.br', 'Resolução CONTRAN nº 789/2020', '2026-10-18', 'Vanessa Becegato', false, false, 'Frequência biométrica obrigatória.'),
('etapa-04', 4, 'Exame Teórico do Detran', 'Avaliação de 30 questões de múltipla escolha com aproveitamento mínimo de 70%.', 'TODAS', 'Detran-SP / Poupatempo', 'https://www.detran.sp.gov.br', 'Diretrizes Detran-SP', '2026-10-18', 'Vanessa Becegato', false, true, 'Após aprovação, é emitida a LADV (Licença de Aprendizagem de Direção Veicular).'),
('etapa-05', 5, 'Aulas Práticas de Direção', 'Treinamento prático veicular com instrutor credenciado e veículo homologado.', 'TODAS', 'Vanessa Becegato — Treinamento Autônomo', 'https://www.detran.sp.gov.br', 'Resolução CONTRAN nº 789/2020', '2026-10-18', 'Vanessa Becegato', false, false, 'Carga de no mínimo 20 aulas com acompanhamento de evolução pedagógica.'),
('etapa-06', 6, 'Exame Prático de Direção Veicular', 'Avaliação prática oficial conduzida por banca de examinadores do Detran-SP.', 'TODAS', 'Banca Examinadora Detran-SP', 'https://www.detran.sp.gov.br', 'Resolução CONTRAN nº 789/2020', '2026-10-18', 'Vanessa Becegato', false, true, 'O aluno deve portar RG original e a LADV física no dia do exame.'),
('etapa-07', 7, 'Emissão da Permissão para Dirigir (PPD)', 'Após aprovação no exame prático e pagamento da taxa de emissão, a PPD é gerada em até 72h.', 'TODAS', 'Detran-SP / SENATRAN', 'https://www.detran.sp.gov.br', 'Código de Trânsito Brasileiro art. 148', '2026-10-18', 'Vanessa Becegato', false, false, 'Disponível digitalmente pelo app Carteira Digital de Trânsito (CDT).')
ON CONFLICT (id) DO NOTHING;

-- 7. MODELO DE CONTRATO PADRÃO
INSERT INTO public.modelos_documentos (
  id, tipo, titulo, versao, ativo, estado, data_criacao, responsavel_alteracao, clausulas
) VALUES (
  'modelo-contrato-v1',
  'contrato_aulas_praticas',
  'Contrato Padrão de Prestação de Serviços — Aulas Práticas de Direção',
  'v1.0-2026',
  true,
  'aprovado',
  '2026-10-18',
  'Vanessa Becegato',
  '[
    {"id": "cl-1", "numero": "1ª", "titulo": "Identificação das Partes", "conteudo": "O presente instrumento é firmado entre a CONTRATADA (Vanessa Becegato Aulas e Treinamento Ltda) e o(a) CONTRATANTE devidamente qualificado(a) na ficha de matrícula."},
    {"id": "cl-2", "numero": "2ª", "titulo": "Objeto do Contrato", "conteudo": "Prestação de serviços profissionais de instrução prática de direção veicular, com foco em segurança, direção defensiva e atendimento humanizado."},
    {"id": "cl-3", "numero": "3ª", "titulo": "Pacote e Quantidade de Aulas", "conteudo": "A CONTRATADA fornecerá a quantidade exata de aulas práticas contratadas, cada qual com duração de 50 (cinquenta) minutos."},
    {"id": "cl-4", "numero": "4ª", "titulo": "Preços e Forma de Pagamento", "conteudo": "Os valores e condições comerciais acordados são especificados no resumo do documento, quitados conforme recibo emitido."},
    {"id": "cl-5", "numero": "5ª", "titulo": "Agendamento de Aulas", "conteudo": "Os horários das aulas serão alinhados mutuamente com antecedência mínima de 24 horas, conforme disponibilidade da grade de instrução."},
    {"id": "cl-6", "numero": "6ª", "titulo": "Remarcação e Cancelamento", "conteudo": "Cancelamentos com antecedência mínima de 12 horas não geram ônus. Ausências imprevistas sem justificativa comprovada ensejam a perda da aula."},
    {"id": "cl-7", "numero": "7ª", "titulo": "Obrigações das Partes", "conteudo": "A CONTRATADA compromete-se a fornecer veículo com duplo comando inspecionado. O(a) CONTRATANTE compromete-se a portar sua LADV e documento de identificação original em todas as aulas."},
    {"id": "cl-8", "numero": "8ª", "titulo": "Segurança e Conduta", "conteudo": "É expressamente vedada a condução sob efeito de álcool ou substâncias psicoativas. O uso de calçado firme e cinto/capacete é mandatório."},
    {"id": "cl-9", "numero": "9ª", "titulo": "Exames e Resultados", "conteudo": "A CONTRATADA envidará os melhores esforços técnicos pedagógicos para capacitação do(a) aluno(a), não se responsabilizando por reprovações na banca examinadora oficial do Detran-SP."},
    {"id": "cl-10", "numero": "10ª", "titulo": "Desistência e Reembolso", "conteudo": "Em caso de rescisão antecipada por iniciativa do CONTRATANTE, será retida taxa administrativa de 10% sobre o saldo de aulas ainda não ministradas."},
    {"id": "cl-11", "numero": "11ª", "titulo": "Proteção de Dados (LGPD)", "conteudo": "Os dados pessoais coletados destinam-se exclusivamente à gestão pedagógica, emissão documental e comunicação direta de interesse do(a) aluno(a)."},
    {"id": "cl-12", "numero": "12ª", "titulo": "Comunicações e Aceite Eletrônico", "conteudo": "As partes elegem o aceite digital na plataforma e comunicações via WhatsApp oficial e e-mail como válidas e vinculantes para todos os efeitos."}
  ]'::jsonb
)
ON CONFLICT (id) DO NOTHING;

-- 8. CONTRATOS INICIAIS
INSERT INTO public.contratos (
  id, numero_contrato, aluno_id, aluno_nome, aluno_cpf, aluno_rg,
  aluno_endereco, aluno_telefone, aluno_email, pacote_nome,
  quantidade_aulas, duracao_aula_minutos, categoria, valor_total,
  forma_pagamento, data_inicio_prevista, versao_modelo, status,
  data_criacao, data_aceite, evidencia_aceite_ip, evidencia_aceite_data_hora, pdf_gerado_em
) VALUES (
  'ct-001',
  'CTR-2026-001',
  'aluno-01',
  'Mariana Silva de Albuquerque',
  '381.***.***-04',
  '44.***.***-8 SSP/SP',
  'Dracena e Região - SP',
  '(18) 99712-4433',
  'mariana.albuquerque@email.com',
  'Primeira Habilitação Carro (Cat. B) - 20 Aulas',
  20,
  50,
  'B',
  1800.00,
  'PIX em 2x (Entrada + 30 dias)',
  '2026-09-15',
  'v1.0-2026',
  'aceito_eletronicamente',
  '2026-09-12 14:30',
  '2026-09-12 16:45',
  '177.18.92.10',
  '12/09/2026 16:45:22',
  '12/09/2026 16:46:00'
)
ON CONFLICT (id) DO NOTHING;

-- 9. RECIBOS INICIAIS
INSERT INTO public.recibos (
  id, numero_recibo, aluno_id, aluno_nome, pagador_nome,
  pagador_cpf, contrato_id, servico_descricao, valor_recebido,
  forma_pagamento, data_pagamento, data_emissao, emitido_por,
  status, observacoes
) VALUES (
  'rec-001',
  'REC-2026-001',
  'aluno-01',
  'Mariana Silva de Albuquerque',
  'Mariana Silva de Albuquerque',
  '381.***.***-04',
  'ct-001',
  'Primeira Parcela (Entrada) - Pacote 20 Aulas Práticas Categoria B',
  900.00,
  'PIX',
  '2026-09-12',
  '2026-09-12 15:00',
  'Vanessa Becegato',
  'emitido',
  'Comprovante recebido e validado via chave PIX oficial.'
)
ON CONFLICT (id) DO NOTHING;

-- 10. GALERIA DE FOTOS
INSERT INTO public.galeria_fotos (id, titulo, categoria, descricao, imagem_url, destaque) VALUES
('foto-01', 'Treinamento de Baliza com Referências Claras', 'pista', 'Ponto a ponto com visão desobstruída para garantir precisão e confiança no exame prático.', 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=1200&q=80', true),
('foto-02', 'Frota Homologada com Duplo Comando', 'veiculos', 'Veículo Volkswagen Gol 1.6 equipado com pedais duplos para segurança integral do aluno.', 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=1200&q=80', true),
('foto-03', 'Aulas Práticas em Circulação Urbana', 'aulas', 'Desenvolvimento de atenção difusa, cruzamentos e posicionamento seguro nas vias.', 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=1200&q=80', true),
('foto-04', 'Instrução em Duas Rodas — Categoria A', 'veiculos', 'Yamaha Fazer 150 ABS com postura ereta e estabilidade exemplar para circuito de pista.', 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=1200&q=80', false),
('foto-05', 'Atendimento Humanizado e Acolhedor', 'instrutora', 'Orientação paciente e sem pressa, respeitando o ritmo de aprendizagem de cada condutor.', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80', true)
ON CONFLICT (id) DO NOTHING;
