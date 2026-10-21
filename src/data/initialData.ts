import {
  Aluno,
  ConfiguracoesPlataforma,
  DocumentoAluno,
  EtapaJornada,
  Instrutor,
  Interessado,
  PacotePratico,
  ProgressoAlunoEtapa,
  RegistroAuditoria,
  RegistroEvolucao,
  Veiculo,
  Aula,
  ModeloDocumento,
  Contrato,
  Recibo,
  HistoricoEnvio,
  FotoGaleria,
  MaterialEstudo,
  LaboratorioToxicologico
} from '../types';

export const CONFIGURACOES_INICIAIS: ConfiguracoesPlataforma = {
  nomeComercial: 'Vanessa Becegato — Instrutora de Trânsito Autônoma',
  posicionamento: 'Orientação, acompanhamento e organização da jornada de habilitação com atendimento humano e gestão digital.',
  whatsappOficial: '+55 18 996025885',
  telefoneComercial: '(18) 99602-5885',
  emailContato: 'contato@vanessabecegato.com.br',
  instagram: '@instrutora.vanessabecegato',
  cidadeAtendimento: 'Dracena e Região — SP',
  avisoLegalDetran: 'Aviso Importante: Esta plataforma é um sistema independente de organização e acompanhamento profissional. Não somos autoescola, CFC, órgão público nem representantes oficiais do Detran-SP. A consulta aos canais oficiais é indispensável.',
  avisoRevisaoTexto: 'Este conteúdo é informativo e segue as diretrizes públicas do Detran-SP. Confira sempre os requisitos vigentes antes de qualquer pagamento ou exame.',
  dataUltimaConferenciaDetran: '18/10/2026',
  responsavelConferencia: 'Vanessa Becegato (Instrutora Credenciada)'
};

export const PACOTES_PRATICOS: PacotePratico[] = [
  {
    id: 'alinhamento',
    nome: 'ALINHAMENTO',
    aulas: 2,
    indicadoPara: 'Motoristas experientes ou que já sabem dirigir.',
    foco: 'Polimento técnico da direção, refinamento de manobras complexas e adaptação aos critérios exigidos na prova do Detran.'
  },
  {
    id: 'nocao',
    nome: 'NOÇÃO',
    aulas: 5,
    indicadoPara: 'Quem já tem uma base ou noção inicial do veículo.',
    foco: 'Refinar o controle de embreagem e ganhar mais segurança nas trocas de marcha.'
  },
  {
    id: 'evolucao',
    nome: 'EVOLUÇÃO',
    aulas: 10,
    indicadoPara: 'Alunos com pouca noção prática.',
    foco: 'Treino constante do trajeto, ganho de ritmo em vias urbanas de fluxo leve e médio e repetição exaustiva dos pontos críticos da prova.',
    badge: 'Mais Procurado',
    destaque: true
  },
  {
    id: 'aprendiz',
    nome: 'APRENDIZ',
    aulas: 15,
    indicadoPara: 'Quem vai começar do absoluto zero.',
    foco: 'Formação do início ao fim. Desde a ergonomia no banco e painel até a autonomia completa nos comandos de Carro (B) ou Moto (A).'
  },
  {
    id: 'superacao',
    nome: 'SUPERAÇÃO',
    aulas: 20,
    indicadoPara: 'Alunos do zero absoluto e/ou com alto nível de ansiedade e medo de dirigir.',
    foco: 'Aprendizado completo, com ritmo humanizado e estendido. Focado em vencer o bloqueio emocional, criar memória muscular e proporcionar total independência ao motorista.',
    badge: 'Acolhimento Humanizado'
  }
];

export const ETAPAS_OFICIAIS_DETRAN: EtapaJornada[] = [
  {
    id: 'etapa-01',
    ordem: 1,
    titulo: 'Baixe o aplicativo CNH do Brasil',
    descricao: 'Primeiro passo digital para abertura e acompanhamento do processo oficial de habilitação. O aluno deverá utilizar sua própria conta Gov.br.',
    categoriaAplicavel: 'TODAS',
    preRequisitos: ['Possuir conta Gov.br ativa (nível Prata ou Ouro recomendado)', 'Smartphone compatível com iOS ou Android'],
    acoesRecomendadas: ['Instalar o aplicativo oficial desenvolvido pelo Serpro', 'Conferir acesso na área "Condutor"'],
    documentosNecessarios: ['Dados cadastrais da conta Gov.br'],
    tarefas: [
      { id: 't-01-1', titulo: 'Baixar e instalar o aplicativo oficial CNH do Brasil no smartphone' },
      { id: 't-01-2', titulo: 'Fazer login com a conta pessoal Gov.br' },
      { id: 't-01-3', titulo: 'Localizar a seção "Condutor" no menu principal' },
      { id: 't-01-4', titulo: 'Confirmar acesso seguro às funcionalidades do aplicativo' }
    ],
    custoEstimado: 'Gratuito',
    linkOficial: 'https://apps.apple.com/br/app/cnh-do-brasil/id1275057217',
    linkSecundario: { label: 'Versão Android (Google Play)', url: 'https://play.google.com/store/apps/details?id=br.gov.serpro.cnhe' },
    orgaoResponsavel: 'Senatran / Serpro',
    fonteReferencia: 'Manual Oficial CNH do Brasil — Detran-SP',
    dataUltimaRevisao: '18/10/2026',
    responsavelRevisao: 'Vanessa Becegato',
    precisaRevisao: false,
    dependeConfirmacaoOficial: false,
    observacoes: 'Atenção: Não informe nem compartilhe sua senha Gov.br com terceiros em nenhuma hipótese.'
  },
  {
    id: 'etapa-02',
    ordem: 2,
    titulo: 'Inicie o requerimento da primeira habilitação',
    descricao: 'No aplicativo CNH do Brasil, navegue pelo menu oficial para abrir a solicitação da 1ª habilitação.',
    categoriaAplicavel: 'TODAS',
    preRequisitos: ['Aplicativo CNH do Brasil autenticado'],
    acoesRecomendadas: ['Acessar: Condutor → Requerimento da Primeira Habilitação', 'Conferir nome, CPF e dados residenciais'],
    documentosNecessarios: ['CPF e RG'],
    tarefas: [
      { id: 't-02-1', titulo: 'Acessar o menu "Condutor" no app CNH do Brasil' },
      { id: 't-02-2', titulo: 'Clicar na opção "Requerimento da Primeira Habilitação"' },
      { id: 't-02-3', titulo: 'Conferir dados pessoais exibidos pelo sistema' }
    ],
    custoEstimado: 'Gratuito',
    linkOficial: 'https://detran.sp.gov.br/cnhpaulista/',
    orgaoResponsavel: 'Detran-SP / Senatran',
    fonteReferencia: 'Portal CNH Paulista — Detran-SP',
    dataUltimaRevisao: '18/10/2026',
    responsavelRevisao: 'Vanessa Becegato',
    precisaRevisao: false,
    dependeConfirmacaoOficial: true,
    observacoes: 'Siga rigorosamente as instruções apresentadas na tela do aplicativo.'
  },
  {
    id: 'etapa-03',
    ordem: 3,
    titulo: 'Escolha a categoria desejada',
    descricao: 'Definição da categoria de habilitação pretendida (Categoria A para moto, B para carro ou A e B combinadas).',
    categoriaAplicavel: 'TODAS',
    preRequisitos: ['Requerimento iniciado no aplicativo'],
    acoesRecomendadas: ['Selecionar o estado de São Paulo (SP) como jurisdição do processo', 'Escolher Categoria A (moto), B (carro) ou A+B'],
    documentosNecessarios: ['Opção informada no formulário eletrônico'],
    tarefas: [
      { id: 't-03-1', titulo: 'Selecionar o Estado de São Paulo como Unidade Federativa' },
      { id: 't-03-2', titulo: 'Escolher a categoria desejada (A, B ou A e B)' },
      { id: 't-03-3', titulo: 'Confirmar os termos de abertura da solicitação' }
    ],
    custoEstimado: 'Gratuito',
    linkOficial: 'https://detran.sp.gov.br/cnhpaulista/',
    orgaoResponsavel: 'Detran-SP',
    fonteReferencia: 'Resolução Contran nº 789/2020',
    dataUltimaRevisao: '18/10/2026',
    responsavelRevisao: 'Vanessa Becegato',
    precisaRevisao: false,
    dependeConfirmacaoOficial: false,
    observacoes: 'A escolha da categoria define os exames práticos e a carga horária de treinamento.'
  },
  {
    id: 'etapa-04',
    ordem: 4,
    titulo: 'Curso teórico de legislação de trânsito',
    descricao: 'Acompanhamento e realização da formação teórica (Legislação, Direção Defensiva, Primeiros Socorros, Meio Ambiente e Mecânica).',
    categoriaAplicavel: 'TODAS',
    preRequisitos: ['Processo deferido'],
    acoesRecomendadas: ['Localizar o curso teórico no app CNH do Brasil ou instituição credenciada', 'Cumprir as atividades e simulados'],
    documentosNecessarios: ['Comprovante de inscrição/matrícula teórica'],
    tarefas: [
      { id: 't-04-1', titulo: 'Localizar o módulo do curso teórico no aplicativo ou entidade autorizada' },
      { id: 't-04-2', titulo: 'Consultar as instruções e horários vigentes' },
      { id: 't-04-3', titulo: 'Concluir integralmente as atividades e módulos do curso' },
      { id: 't-04-4', titulo: 'Conferir o registro do certificado de conclusão teórica' }
    ],
    custoEstimado: 'Conforme entidade credenciada',
    linkOficial: 'https://detran.sp.gov.br/cnhpaulista/',
    orgaoResponsavel: 'CFC / Módulo Homologado Detran-SP',
    fonteReferencia: 'Resolução Contran nº 789/2020',
    dataUltimaRevisao: '18/10/2026',
    responsavelRevisao: 'Vanessa Becegato',
    precisaRevisao: false,
    dependeConfirmacaoOficial: true,
    observacoes: 'A frequência e o aproveitamento devem ser homologados antes de agendar a prova teórica.'
  },
  {
    id: 'etapa-05',
    ordem: 5,
    titulo: 'Inicie o processo no portal do Detran-SP',
    descricao: 'Formalização oficial do serviço no portal estadual de serviços do Detran-SP para biometria e abertura do RENACH.',
    categoriaAplicavel: 'TODAS',
    preRequisitos: ['Cadastro no portal do Detran-SP com CPF'],
    acoesRecomendadas: ['Acessar o serviço oficial de 1ª habilitação no Detran-SP', 'Ler os requisitos e agendar a coleta biométrica no Poupatempo'],
    documentosNecessarios: ['RG original', 'CPF', 'Comprovante de endereço recente'],
    tarefas: [
      { id: 't-05-1', titulo: 'Abrir a Carta de Serviços oficial de 1ª Habilitação do Detran-SP' },
      { id: 't-05-2', titulo: 'Ler atentamente os requisitos vigentes' },
      { id: 't-05-3', titulo: 'Realizar o agendamento de coleta biométrica presencial (foto, digitais e assinatura)' },
      { id: 't-05-4', titulo: 'Salvar o número do protocolo do Detran-SP' }
    ],
    custoEstimado: 'Gratuito nesta etapa',
    linkOficial: 'https://www.detran.sp.gov.br/detransp/pb/servico/habilitacao/_iniciar_processo_primeira_habilitacao?id=carta_de_servico_iniciar_processo_primeira_habilitacao',
    orgaoResponsavel: 'Detran-SP / Poupatempo',
    fonteReferencia: 'Carta de Serviços ao Cidadão — Detran-SP',
    dataUltimaRevisao: '18/10/2026',
    responsavelRevisao: 'Vanessa Becegato',
    precisaRevisao: false,
    dependeConfirmacaoOficial: true,
    observacoes: 'O cadastro biométrico no Poupatempo/Detran vincula sua identidade ao sistema RENACH nacional.'
  },
  {
    id: 'etapa-06',
    ordem: 6,
    titulo: 'Exame toxicológico com resultado negativo',
    descricao: 'Exame laboratorial obrigatório para processos de primeira habilitação iniciados a partir de 17/06/2026 no Estado de São Paulo.',
    categoriaAplicavel: 'TODAS',
    preRequisitos: ['Processo formalmente aberto no Detran-SP'],
    acoesRecomendadas: [
      'Verificar se a exigência se aplica ao seu processo conforme a data de início (a partir de 17/06/2026)',
      'Localizar laboratório devidamente credenciado pela Senatran / Detran-SP',
      'Realizar a coleta em momento oportuno, respeitando a validade de 90 dias'
    ],
    documentosNecessarios: ['Documento oficial com foto', 'Comprovante de protocolo RENACH'],
    tarefas: [
      { id: 't-06-1', titulo: 'Verificar se o exame toxicológico é exigido para a data de abertura do seu processo' },
      { id: 't-06-2', titulo: 'Consultar a lista oficial de laboratórios credenciados' },
      { id: 't-06-3', titulo: 'Realizar a coleta biológica no laboratório autorizado' },
      { id: 't-06-4', titulo: 'Acompanhar a inserção do laudo negativo no sistema oficial RENACH' }
    ],
    custoEstimado: 'Variável por laboratório credenciado (consulte na clínica)',
    linkOficial: 'https://servicos.sp.gov.br/fcarta/1D5669D9-0BB1-4192-AE95-47613681F8D1',
    orgaoResponsavel: 'Senatran / Detran-SP / Laboratórios Credenciados',
    fonteReferencia: 'Portaria Detran-SP e Lei Federal nº 14.071',
    dataUltimaRevisao: '18/10/2026',
    responsavelRevisao: 'Vanessa Becegato',
    precisaRevisao: false,
    dependeConfirmacaoOficial: true,
    destaqueToxico: true,
    observacoes: 'AVISO IMPORTANTE: A referência oficial informa validade de 90 dias para a utilização do resultado a contar da data da coleta. Não realize o exame com antecedência excessiva para não perder a validade antes da emissão final da CNH.'
  },
  {
    id: 'etapa-07',
    ordem: 7,
    titulo: 'Avaliação psicológica (Exame psicotécnico)',
    descricao: 'Exame pericial realizado por psicólogo perito credenciado pelo Detran-SP para avaliar tomada de decisão, controle emocional e reflexos.',
    categoriaAplicavel: 'TODAS',
    preRequisitos: ['Biometria realizada', 'Agendamento prévio na clínica credenciada indicada'],
    acoesRecomendadas: ['Dormir bem na noite anterior', 'Comparecer pontualmente com documento oficial com foto'],
    documentosNecessarios: ['Documento com foto original', 'Comprovante de taxa pericial'],
    tarefas: [
      { id: 't-07-1', titulo: 'Agendar a avaliação psicológica na clínica credenciada distribuída pelo Detran' },
      { id: 't-07-2', titulo: 'Efetuar o pagamento da taxa pericial diretamente ao profissional credenciado' },
      { id: 't-07-3', titulo: 'Realizar o exame e conferir o resultado "Apto" lançado no sistema' }
    ],
    custoEstimado: 'R$ 90,00 (valor indicativo de referência sujeito a confirmação na clínica)',
    linkOficial: 'https://detran.sp.gov.br/cnhpaulista/',
    orgaoResponsavel: 'Clínica Psicológica Credenciada Detran-SP',
    fonteReferencia: 'Tabela Oficial de Taxas Periciais Detran-SP',
    dataUltimaRevisao: '18/10/2026',
    responsavelRevisao: 'Vanessa Becegato',
    precisaRevisao: false,
    dependeConfirmacaoOficial: true,
    observacoes: 'O valor de R$ 90,00 é uma referência estadual divulgada pelo Detran-SP, pago diretamente à clínica médica/psicológica credenciada.'
  },
  {
    id: 'etapa-08',
    ordem: 8,
    titulo: 'Exame de aptidão física e mental (Exame médico)',
    descricao: 'Avaliação médica pericial de acuidade visual, audição, pressão arterial e coordenação motora com médico credenciado.',
    categoriaAplicavel: 'TODAS',
    preRequisitos: ['Biometria registrada'],
    acoesRecomendadas: ['Levar óculos de grau ou lentes de contato se utilizar habitualmente', 'Apresentar laudos prévios se possuir condição médica específica'],
    documentosNecessarios: ['Documento de identificação com foto original'],
    tarefas: [
      { id: 't-08-1', titulo: 'Agendar o exame médico na clínica designada' },
      { id: 't-08-2', titulo: 'Pagar a taxa pericial médica diretamente na clínica' },
      { id: 't-08-3', titulo: 'Realizar os testes de visão e aptidão física' },
      { id: 't-08-4', titulo: 'Conferir o laudo de aptidão lançado no sistema informatizado' }
    ],
    custoEstimado: 'R$ 90,00 (valor indicativo de referência sujeito a confirmação na clínica)',
    linkOficial: 'https://detran.sp.gov.br/cnhpaulista/',
    orgaoResponsavel: 'Clínica Médica Credenciada Detran-SP',
    fonteReferencia: 'Tabela Oficial de Exames Médicos Detran-SP',
    dataUltimaRevisao: '18/10/2026',
    responsavelRevisao: 'Vanessa Becegato',
    precisaRevisao: false,
    dependeConfirmacaoOficial: true,
    observacoes: 'Caso haja necessidade de lentes corretivas, constará a observação na CNH final.'
  },
  {
    id: 'etapa-09',
    ordem: 9,
    titulo: 'Validação do curso teórico no Detran-SP',
    descricao: 'Conferência eletrônica da conclusão e validação da carga teórica no sistema informatizado do Detran-SP antes da marcação da prova.',
    categoriaAplicavel: 'TODAS',
    preRequisitos: ['Curso teórico concluído', 'Aprovação médica e psicológica'],
    acoesRecomendadas: ['Acessar o portal ou app CNH do Brasil e confirmar se a etapa teórica consta como validada'],
    documentosNecessarios: ['Certificado eletrônico de frequência'],
    tarefas: [
      { id: 't-09-1', titulo: 'Consultar o extrato do processo na página oficial do Detran-SP' },
      { id: 't-09-2', titulo: 'Confirmar a validação formal do curso teórico pela autoridade de trânsito' }
    ],
    custoEstimado: 'Gratuito',
    linkOficial: 'https://detran.sp.gov.br/cnhpaulista/',
    orgaoResponsavel: 'Detran-SP',
    fonteReferencia: 'Diretrizes de Habilitação Detran-SP',
    dataUltimaRevisao: '18/10/2026',
    responsavelRevisao: 'Vanessa Becegato',
    precisaRevisao: false,
    dependeConfirmacaoOficial: true,
    observacoes: 'Não tente pagar a taxa da prova teórica antes da confirmação de que o curso foi devidamente baixado no sistema.'
  },
  {
    id: 'etapa-10',
    ordem: 10,
    titulo: 'Pagamento da taxa e agendamento do exame teórico',
    descricao: 'Recolhimento da taxa oficial de exame teórico e agendamento da prova presencial de múltipla escolha (30 questões).',
    categoriaAplicavel: 'TODAS',
    preRequisitos: ['Curso teórico validado no sistema'],
    acoesRecomendadas: [
      'Pagar a taxa estadual via PIX ou rede bancária conveniada',
      'Acessar o serviço oficial de agendamento e escolher unidade Poupatempo/Detran, data e horário',
      'Guardar comprovante de pagamento e protocolo de agendamento'
    ],
    documentosNecessarios: ['Taxa recolhida', 'Protocolo de agendamento', 'Documento com foto original'],
    tarefas: [
      { id: 't-10-1', titulo: 'Efetuar o pagamento da taxa estadual de exame teórico pelo canal oficial' },
      { id: 't-10-2', titulo: 'Acessar o serviço oficial de agendamento de exame teórico' },
      { id: 't-10-3', titulo: 'Escolher data, horário e local da prova eletrônica' },
      { id: 't-10-4', titulo: 'Realizar o exame e alcançar aproveitamento mínimo de 70% (21 acertos)' }
    ],
    custoEstimado: 'R$ 52,83 (taxa oficial indicativa)',
    linkOficial: 'https://www.detran.sp.gov.br/detransp/pb/servico/habilitacao/agendar_ou_cancelar_exame_teorico?id=carta_de_servico_agendar_ou_cancelar_exame_teorico',
    linkSecundario: { label: 'Pagamento Oficial via PIX (Secretaria da Fazenda SP)', url: 'https://pixveiculos.fazenda.sp.gov.br/' },
    orgaoResponsavel: 'Detran-SP / Fazenda-SP',
    fonteReferencia: 'Tabela de Taxas Estaduais Detran-SP',
    dataUltimaRevisao: '18/10/2026',
    responsavelRevisao: 'Vanessa Becegato',
    precisaRevisao: false,
    dependeConfirmacaoOficial: true,
    observacoes: 'Atenção: Nunca informe dados de cartão de crédito em sites não oficiais. Use exclusivamente os canais oficiais do Governo de SP.'
  },
  {
    id: 'etapa-11',
    ordem: 11,
    titulo: 'Emissão da LADV (Licença de Aprendizagem)',
    descricao: 'Expedição eletrônica da Licença de Aprendizagem de Direção Veicular (LADV) no aplicativo CNH do Brasil.',
    categoriaAplicavel: 'TODAS',
    preRequisitos: ['Aprovação formal no exame teórico'],
    acoesRecomendadas: ['Acessar o app CNH do Brasil e conferir a emissão da LADV', 'Verificar se constam a categoria e dados corretos'],
    documentosNecessarios: ['LADV física ou digital no app'],
    tarefas: [
      { id: 't-11-1', titulo: 'Acessar o aplicativo CNH do Brasil' },
      { id: 't-11-2', titulo: 'Localizar a emissão da LADV' },
      { id: 't-11-3', titulo: 'Confirmar os dados do candidato e da categoria autorizada' }
    ],
    custoEstimado: 'Gratuito no aplicativo oficial',
    linkOficial: 'https://detran.sp.gov.br/cnhpaulista/',
    orgaoResponsavel: 'Detran-SP / Senatran',
    fonteReferencia: 'Código de Trânsito Brasileiro, art. 158',
    dataUltimaRevisao: '18/10/2026',
    responsavelRevisao: 'Vanessa Becegato',
    precisaRevisao: false,
    dependeConfirmacaoOficial: true,
    observacoes: 'A LADV é documento de porte obrigatório durante todas as aulas práticas.'
  },
  {
    id: 'etapa-12',
    ordem: 12,
    titulo: 'Aulas práticas de direção veicular',
    descricao: 'Treinamento prático veicular com instrutor credenciado e veículo homologado com duplo comando, com metodologia humanizada.',
    categoriaAplicavel: 'TODAS',
    preRequisitos: ['LADV válida em mãos', 'Documento de identidade original'],
    acoesRecomendadas: [
      'Cumprir a carga horária prática conforme a regulamentação vigente aplicável ao seu processo',
      'Treinar manobras de baliza, controle de embreagem, aclives e tráfego real',
      'Acompanhar a evolução aula a aula no Caderno de Evolução'
    ],
    documentosNecessarios: ['LADV', 'RG'],
    tarefas: [
      { id: 't-12-1', titulo: 'Alinhar o cronograma prático com a instrutora Vanessa Becegato' },
      { id: 't-12-2', titulo: 'Cumprir as aulas práticas com postura defensiva e atenção' },
      { id: 't-12-3', titulo: 'Dominar manobras de baliza e percurso em via pública' },
      { id: 't-12-4', titulo: 'Conferir o registro das aulas práticas no portal Senatran' }
    ],
    custoEstimado: 'Conforme pacote de aulas contratado com a instrutora autônoma',
    linkOficial: 'https://portalservicos.senatran.serpro.gov.br/#/home',
    orgaoResponsavel: 'Vanessa Becegato — Instrutora de Trânsito Autônoma / Senatran',
    fonteReferencia: 'Portal de Serviços Senatran e Resolução Contran nº 789/2020',
    dataUltimaRevisao: '18/10/2026',
    responsavelRevisao: 'Vanessa Becegato',
    precisaRevisao: false,
    dependeConfirmacaoOficial: false,
    observacoes: 'A referência atual do Detran-SP informa uma carga mínima regulatória de 2 horas no contexto descrito na página oficial, sujeita a confirmação com o órgão.'
  },
  {
    id: 'etapa-13',
    ordem: 13,
    titulo: 'Validação do curso prático no Detran-SP',
    descricao: 'Homologação oficial das aulas práticas cumpridas e emissão do certificado de conclusão prática no sistema da autoridade de trânsito.',
    categoriaAplicavel: 'TODAS',
    preRequisitos: ['Carga prática concluída e assinada biometricamente/eletronicamente'],
    acoesRecomendadas: ['Conferir se o certificado prático foi inserido com sucesso antes de agendar a prova'],
    documentosNecessarios: ['Certificado de conclusão de aulas práticas'],
    tarefas: [
      { id: 't-13-1', titulo: 'Consultar o lançamento do certificado prático no portal do Detran' },
      { id: 't-13-2', titulo: 'Confirmar a liberação para marcação do exame prático' }
    ],
    custoEstimado: 'Gratuito',
    linkOficial: 'https://detran.sp.gov.br/cnhpaulista/',
    orgaoResponsavel: 'Detran-SP / Senatran',
    fonteReferencia: 'Resolução Contran nº 789/2020',
    dataUltimaRevisao: '18/10/2026',
    responsavelRevisao: 'Vanessa Becegato',
    precisaRevisao: false,
    dependeConfirmacaoOficial: true,
    observacoes: 'A prova prática só pode ser agendada após o reconhecimento oficial do término das aulas.'
  },
  {
    id: 'etapa-14',
    ordem: 14,
    titulo: 'Pagamento da taxa e agendamento do exame prático',
    descricao: 'Recolhimento da taxa estadual de prova prática e escolha de data, horário e banca examinadora do município.',
    categoriaAplicavel: 'TODAS',
    preRequisitos: ['Curso prático validado'],
    acoesRecomendadas: [
      'Pagar a taxa estadual pelo portal da Fazenda-SP via PIX oficial',
      'Acessar o agendamento de exame prático de direção veicular no Detran-SP',
      'Salvar o protocolo com o endereço exato do pátio de prova'
    ],
    documentosNecessarios: ['Comprovante de taxa paga', 'Protocolo de agendamento', 'LADV', 'RG'],
    tarefas: [
      { id: 't-14-1', titulo: 'Recolher a taxa oficial de exame prático pelo canal oficial PIX da Fazenda-SP' },
      { id: 't-14-2', titulo: 'Acessar o serviço oficial de agendamento de exame prático do Detran-SP' },
      { id: 't-14-3', titulo: 'Selecionar categoria (A ou B), município e banca examinadora' },
      { id: 't-14-4', titulo: 'Salvar o protocolo de agendamento e conferir as instruções de apresentação' }
    ],
    custoEstimado: 'R$ 52,83 (taxa oficial indicativa)',
    linkOficial: 'https://www.detran.sp.gov.br/detransp/pb/servico/habilitacao/agendar_exame_pratico_de_direcao_veicular?id=carta_de_servico_agendar_exame_pratico_de_direcao_veicular',
    linkSecundario: { label: 'Pagamento Oficial via PIX (Secretaria da Fazenda SP)', url: 'https://pixveiculos.fazenda.sp.gov.br/auth' },
    orgaoResponsavel: 'Detran-SP / Secretaria da Fazenda-SP',
    fonteReferencia: 'Carta de Serviços Detran-SP',
    dataUltimaRevisao: '18/10/2026',
    responsavelRevisao: 'Vanessa Becegato',
    precisaRevisao: false,
    dependeConfirmacaoOficial: true,
    observacoes: 'O sistema privado da plataforma permite registrar a data e o horário para lembretes, mas o agendamento oficial é realizado pelo próprio candidato no Detran.'
  },
  {
    id: 'etapa-15',
    ordem: 15,
    titulo: 'Preparação para o exame prático (Checklist & Bônus)',
    descricao: 'Revisão detalhada com os formulários oficiais de avaliação prática de duas e quatro rodas disponibilizados pela instrutora.',
    categoriaAplicavel: 'TODAS',
    preRequisitos: ['Exame prático agendado'],
    acoesRecomendadas: [
      'Estudar o Formulário de Avaliação Prática — Duas Rodas (A/ACC) ou Quatro Rodas (B/C/D/E)',
      'Memorizar as faltas eliminatórias (baliza excedida, avanço de meio-fio, conchas, sinalização ausente)',
      'Fazer simulado dos critérios de pontuação máxima (máximo de 3 pontos negativos permitidos)'
    ],
    documentosNecessarios: ['LADV impressa', 'RG original', 'Comprovante de agendamento'],
    tarefas: [
      { id: 't-15-1', titulo: 'Consultar o Formulário Oficial de Avaliação Prática no portal' },
      { id: 't-15-2', titulo: 'Revisar os critérios de pontuação (Eliminatórias, Graves, Médias e Leves)' },
      { id: 't-15-3', titulo: 'Realizar checklist de documentação e vestimenta adequada (calçado fechado e firme)' },
      { id: 't-15-4', titulo: 'Chegar com 30 minutos de antecedência ao local da banca examinadora' }
    ],
    custoEstimado: 'Incluso no material educacional da estrutura',
    linkOficial: 'https://detran.sp.gov.br/cnhpaulista/',
    orgaoResponsavel: 'Banca Examinadora Detran-SP / Vanessa Becegato',
    fonteReferencia: 'Formulários Oficiais de Exame Prático Detran-SP',
    dataUltimaRevisao: '18/10/2026',
    responsavelRevisao: 'Vanessa Becegato',
    precisaRevisao: false,
    dependeConfirmacaoOficial: false,
    observacoes: 'Consulte a seção "Bônus — Guia de estudo para o exame prático" no seu portal do aluno para visualizar os formulários completos.'
  },
  {
    id: 'etapa-16',
    ordem: 16,
    titulo: 'Exame toxicológico: conferência final de validade',
    descricao: 'Lembrete de segurança: certifique-se de que o laudo do exame toxicológico permanece dentro do prazo regulamentar de validade.',
    categoriaAplicavel: 'TODAS',
    preRequisitos: ['Exame prático realizado e aprovado'],
    acoesRecomendadas: [
      'Conferir se a data da coleta do toxicológico está dentro dos 90 dias exigidos',
      'Confirmar que o laudo permanece ativo no sistema RENACH antes do pedido de emissão'
    ],
    documentosNecessarios: ['Laudo laboratorial com chave de autenticidade'],
    tarefas: [
      { id: 't-16-1', titulo: 'Conferir a data da coleta no laudo do exame toxicológico' },
      { id: 't-16-2', titulo: 'Certificar que o prazo de 90 dias ainda não expirou' }
    ],
    custoEstimado: 'Gratuito para conferência',
    linkOficial: 'https://servicos.sp.gov.br/fcarta/1D5669D9-0BB1-4192-AE95-47613681F8D1',
    orgaoResponsavel: 'Detran-SP / Senatran',
    fonteReferencia: 'Portaria Detran-SP e Diretrizes Toxicológicas',
    dataUltimaRevisao: '18/10/2026',
    responsavelRevisao: 'Vanessa Becegato',
    precisaRevisao: false,
    dependeConfirmacaoOficial: true,
    destaqueToxico: true,
    observacoes: 'Se o prazo de 90 dias tiver expirado antes da finalização da emissão, o Detran exigirá novo exame para liberação da CNH.'
  },
  {
    id: 'etapa-17',
    ordem: 17,
    titulo: 'Emissão e liberação da CNH (PPD)',
    descricao: 'Etapa final: após aprovação na prova prática e baixa das taxas, emissão da Permissão Para Dirigir (PPD).',
    categoriaAplicavel: 'TODAS',
    preRequisitos: ['Aprovação na prova prática homologada no sistema', 'Taxa de emissão paga'],
    acoesRecomendadas: [
      'Acessar a Carteira Digital de Trânsito (CDT) para baixar a CNH digital gratuita',
      'Aguardar o envio da versão impressa pelos Correios caso tenha optado por ela'
    ],
    documentosNecessarios: ['Taxa de emissão recolhida'],
    tarefas: [
      { id: 't-17-1', titulo: 'Pagar a taxa estadual de emissão da CNH' },
      { id: 't-17-2', titulo: 'Acessar o aplicativo Carteira Digital de Trânsito (CDT)' },
      { id: 't-17-3', titulo: 'Baixar a versão digital oficial da CNH com QR Code' }
    ],
    custoEstimado: 'Digital gratuita no app CDT · R$ 137,79 para versão física quando solicitada (valor indicativo de referência)',
    linkOficial: 'https://detran.sp.gov.br/cnhpaulista/',
    orgaoResponsavel: 'Detran-SP / Senatran',
    fonteReferencia: 'Senatran / Detran-SP CNH Paulista',
    dataUltimaRevisao: '18/10/2026',
    responsavelRevisao: 'Vanessa Becegato',
    precisaRevisao: false,
    dependeConfirmacaoOficial: true,
    observacoes: 'Parabéns pela sua conquista! Dirija sempre com prudência, respeito à vida e direção defensiva.'
  }
];

export const MATERIAIS_ESTUDO_INICIAIS: MaterialEstudo[] = [
  {
    id: 'mat-01',
    titulo: 'Formulário de Avaliação Prática — Duas Rodas (A e ACC)',
    categoria: 'duas_rodas',
    descricao: 'Material de referência oficial com o catálogo completo de faltas do exame prático em motocicleta e ciclomotor. Conheça as faltas eliminatórias, graves, médias e leves antes da banca examinadora.',
    versaoFormulario: 'Portaria DETRAN-SP / Resoluções CONTRAN nº 789/2020 e 168/2004',
    dataDisponibilizacao: '18/10/2026',
    fonteOficial: 'Banca Examinadora Oficial — DETRAN-SP / SENATRAN',
    nomeArquivo: 'formulario_avaliacao_duas_rodas_A_ACC.pdf',
    criteriosAvaliacao: [
      {
        categoriaFalta: 'Eliminatória',
        pontos: 0,
        itens: [
          'Iniciar a prova sem estar com o capacete devidamente ajustado à cabeça e afivelado, ou com viseira/óculos de proteção indevidos.',
          'Derrubar um ou mais cones de balizamento durante o percurso.',
          'Cair do veículo ou perder o equilíbrio durante a realização de qualquer manobra.',
          'Colocar um ou ambos os pés no chão com o veículo em movimento.',
          'Provocar acidente durante a realização da prova.',
          'Avançar sobre o meio-fio ou sobre a área restrita do circuito.',
          'Não manter o equilíbrio na prancha ou sair da trajetória estipulada.',
          'Avançar a parada obrigatória demarcada.'
        ]
      },
      {
        categoriaFalta: 'Grave',
        pontos: 3,
        itens: [
          'Deixar de colocar os pés nos estribos imediatamente após a partida.',
          'Invadir qualquer faixa durante o percurso onde isso não for permitido.',
          'Fazer o percurso com o farol apagado.',
          'Não sinalizar com antecedência a mudança de direção ou parada.'
        ]
      },
      {
        categoriaFalta: 'Média',
        pontos: 2,
        itens: [
          'Utilizar marcha inadequada durante o percurso.',
          'Interromper o funcionamento do motor sem justa razão após o início da prova.',
          'Não recolher o cavalete ou suporte lateral antes de partir.',
          'Manter velocidade incompatível com a segurança do circuito.'
        ]
      },
      {
        categoriaFalta: 'Leve',
        pontos: 1,
        itens: [
          'Colocar o motor em funcionamento com a marcha engrenada.',
          'Engrenar marchas de forma ruidosa ou brusca.',
          'Usar incorretamente os espelhos retrovisores.'
        ]
      }
    ]
  },
  {
    id: 'mat-02',
    titulo: 'Formulário de Avaliação Prática — Quatro Rodas (Categorias B, C, D e E)',
    categoria: 'quatro_rodas',
    descricao: 'Material de referência oficial contendo os critérios exatos da prova de direção veicular de quatro rodas: regras da baliza (até 3 tentativas em até 5 minutos) e critérios rigorosos do percurso urbano.',
    versaoFormulario: 'Portaria DETRAN-SP / Resoluções CONTRAN nº 789/2020 e 168/2004',
    dataDisponibilizacao: '18/10/2026',
    fonteOficial: 'Banca Examinadora Oficial — DETRAN-SP / SENATRAN',
    nomeArquivo: 'formulario_avaliacao_quatro_rodas_B_C_D_E.pdf',
    criteriosAvaliacao: [
      {
        categoriaFalta: 'Eliminatória',
        pontos: 0,
        itens: [
          'Desobedecer à sinalização semafórica e de parada obrigatória.',
          'Avançar sobre o meio-fio.',
          'Não colocar o veículo na área balizada em no máximo 3 tentativas no tempo máximo de 5 minutos.',
          'Avançar sobre a baliza durante a manobra de estacionamento.',
          'Trafegar na contramão de direção.',
          'Não usar o cinto de segurança.',
          'Provocar acidente durante a realização do exame.'
        ]
      },
      {
        categoriaFalta: 'Grave',
        pontos: 3,
        itens: [
          'Desobedecer à preferência da via ou do pedestre.',
          'Não sinalizar previamente, mediante luz indicadora de direção, manobras de início, conversão ou parada.',
          'Perder o controle da direção do veículo em movimento.',
          'Usar farol desligado ou desregulado quando exigido.'
        ]
      },
      {
        categoriaFalta: 'Média',
        pontos: 2,
        itens: [
          'Executar o percurso da prova com o freio de mão ativado ou parcialmente puxado.',
          'Interromper o funcionamento do motor do veículo sem justa razão.',
          'Engrenar ou utilizar marchas inadequadas à velocidade ou rotação.',
          'Parar o veículo sobre a faixa de pedestres ao sinalizar a parada.'
        ]
      },
      {
        categoriaFalta: 'Leve',
        pontos: 1,
        itens: [
          'Provocar movimentos irregulares no veículo sem motivo justificável.',
          'Ajustar incorretamente os espelhos retrovisores antes da partida.',
          'Apoiar o pé no pedal da embreagem com o veículo engrenado e em movimento.',
          'Interpretar incorretamente os comandos do examinador.'
        ]
      }
    ]
  }
];

export const LABORATORIOS_TOXICOLOGICOS_INICIAIS: LaboratorioToxicologico[] = [
  {
    id: 'lab-01',
    nome: 'Laboratório São Paulo — Unidade Regional Dracena',
    cidade: 'Dracena / SP',
    endereco: 'Rua Tiradentes, 850 — Centro, Dracena - SP',
    telefone: '(18) 3821-2244',
    whatsapp: '(18) 99760-1234',
    site: 'https://servicos.sp.gov.br/fcarta/1D5669D9-0BB1-4192-AE95-47613681F8D1',
    fonteInformacao: 'Catálogo de Clínicas e Laboratórios Credenciados Senatran / Detran-SP',
    dataVerificacao: '18/10/2026',
    credenciamentoConfirmado: true
  },
  {
    id: 'lab-02',
    nome: 'Laboratório de Análises Clínicas Santa Helena',
    cidade: 'Dracena / SP',
    endereco: 'Av. Presidente Vargas, 1420 — Dracena - SP',
    telefone: '(18) 3821-4500',
    whatsapp: '(18) 99811-9876',
    site: 'https://servicos.sp.gov.br/fcarta/1D5669D9-0BB1-4192-AE95-47613681F8D1',
    fonteInformacao: 'Consulta Oficial Portal Senatran',
    dataVerificacao: '18/10/2026',
    credenciamentoConfirmado: true
  },
  {
    id: 'lab-03',
    nome: 'Laboratório Biocenter — Região Alta Paulista',
    cidade: 'Junqueirópolis / SP',
    endereco: 'Rua Rui Barbosa, 620 — Centro, Junqueirópolis - SP',
    telefone: '(18) 3841-1199',
    site: 'https://servicos.sp.gov.br/fcarta/1D5669D9-0BB1-4192-AE95-47613681F8D1',
    fonteInformacao: 'Cadastro de Prestadores Toxicológicos Homologados',
    dataVerificacao: '18/10/2026',
    credenciamentoConfirmado: true
  }
];


export const INSTRUTORES_INICIAIS: Instrutor[] = [
  {
    id: 'inst-01',
    nome: 'Vanessa Becegato',
    telefone: '(18) 99602-5885',
    email: 'vanessa@vanessabecegato.com.br',
    categoriasAutorizadas: ['A', 'B', 'AB'],
    ativo: true,
    credencialValida: true,
    observacoesInternas: 'Instrutora autônoma titular. Especialista em formação prática humanizada, controle de ansiedade e baliza de precisão.'
  }
];

export const VEICULOS_INICIAIS: Veiculo[] = [
  {
    id: 'veic-01',
    codigoInterno: 'CAR-01',
    marcaModelo: 'Volkswagen Gol Power 1.6',
    ano: 2021,
    placaMascarada: 'BRA-***7',
    categoria: 'B',
    status: 'disponivel',
    quilometragem: 48500,
    proximaManutencao: '2026-11-20',
    alertaManutencao: 'Revisão periódica de freios e pneus em 1.500 km',
    ativo: true
  },
  {
    id: 'veic-02',
    codigoInterno: 'MOT-01',
    marcaModelo: 'Yamaha Fazer 150 ABS',
    ano: 2023,
    placaMascarada: 'SP-***9',
    categoria: 'A',
    status: 'disponivel',
    quilometragem: 14200,
    proximaManutencao: '2026-12-05',
    alertaManutencao: 'Troca de óleo preventiva e ajuste de corrente',
    ativo: true
  }
];

export const ALUNOS_INICIAIS: Aluno[] = [];

export const PROGRESSO_INICIAL_MARIANA: ProgressoAlunoEtapa[] = [];

export const AULAS_INICIAIS: Aula[] = [];

export const EVOLUCAO_INICIAL_MARIANA: RegistroEvolucao[] = [];

export const DOCUMENTOS_INICIAIS_MARIANA: DocumentoAluno[] = [];

export const INTERESSADOS_INICIAIS: Interessado[] = [];


export const AUDITORIA_INICIAL: RegistroAuditoria[] = [
  {
    id: 'aud-001',
    dataHora: '2026-10-21 14:00',
    usuarioNome: 'Sistema',
    usuarioPapel: 'admin',
    acao: 'INICIALIZAÇÃO_PLATAFORMA',
    entidade: 'Plataforma',
    detalhes: 'Sistema Vanessa Becegato configurado e pronto para o primeiro uso oficial de gestão.'
  }
];

export const MODELO_CONTRATO_PADRAO: ModeloDocumento = {
  id: 'mod-01',
  tipo: 'contrato_aulas_praticas',
  titulo: 'Contrato Padrão de Prestação de Serviços de Aulas Práticas de Direção',
  versao: '1.0',
  ativo: true,
  estado: 'aprovado',
  dataCriacao: '2026-10-01',
  responsavelAlteracao: 'Vanessa Becegato (Instrutora Titular)',
  clausulas: [
    {
      id: 'cl-1',
      numero: '1ª',
      titulo: 'DAS PARTES',
      conteudo: 'Pelo presente instrumento particular, de um lado Vanessa Becegato - Estrutura Autônoma de Trânsito, doravante denominada CONTRATADA; e de outro lado o(a) aluno(a) devidamente qualificado(a) na ficha de matrícula deste instrumento, doravante denominado(a) CONTRATANTE.'
    },
    {
      id: 'cl-2',
      numero: '2ª',
      titulo: 'DO OBJETO',
      conteudo: 'O presente contrato tem por objeto a prestação de serviços de instrução prática e acompanhamento pedagógico veicular preparatório, em conformidade com o Código de Trânsito Brasileiro e diretrizes regulamentares vigentes.'
    },
    {
      id: 'cl-3',
      numero: '3ª',
      titulo: 'DO PACOTE CONTRATADO E CARGA HORÁRIA',
      conteudo: 'O treinamento prático será ministrado de acordo com o pacote escolhido no ato da matrícula, com aulas de 50 (cinquenta) minutos de duração cada, realizadas em veículo de instrução equipado com comando duplo de freio e embreagem devidamente vistoriado.'
    },
    {
      id: 'cl-4',
      numero: '4ª',
      titulo: 'DOS PREÇOS E CONDIÇÕES DE PAGAMENTO',
      conteudo: 'Pelos serviços prestados, o CONTRATANTE pagará o valor ajustado nas condições acordadas (à vista ou parcelado). As taxas oficiais cobradas por órgãos governamentais (Detran-SP, Poupatempo, clínicas médicas e bancas examinadoras) não estão inclusas neste instrumento e correm por conta exclusiva do CONTRATANTE.'
    },
    {
      id: 'cl-5',
      numero: '5ª',
      titulo: 'DO AGENDAMENTO, PONTUALIDADE E TOLERÂNCIA',
      conteudo: 'As aulas serão previamente agendadas respeitando a disponibilidade de agenda da CONTRATADA e do CONTRATANTE. Haverá uma tolerância máxima de 15 (quinze) minutos de atraso, sendo o tempo excedente descontado da duração da respectiva aula.'
    },
    {
      id: 'cl-6',
      numero: '6ª',
      titulo: 'DA REMARCAÇÃO E CANCELAMENTO DE AULAS',
      conteudo: 'O cancelamento ou reagendamento de qualquer aula deverá ser comunicado com antecedência mínima de 24 (vinte e quatro) horas úteis. Desistências comunicadas fora desse prazo sem justificativa de força maior acarretarão a cobrança regular da aula agendada.'
    },
    {
      id: 'cl-7',
      numero: '7ª',
      titulo: 'DAS OBRIGAÇÕES DO CONTRATANTE E DOCUMENTAÇÃO',
      conteudo: 'O CONTRATANTE obriga-se a portar obrigatoriamente em todas as aulas a sua Licença para Aprendizagem de Direção Veicular (LADV) original e documento oficial com foto. É expressamente vedado realizar aulas sob efeito de álcool ou substâncias psicoativas.'
    },
    {
      id: 'cl-8',
      numero: '8ª',
      titulo: 'DA SEGURANÇA E RESPONSABILIDADE',
      conteudo: 'A CONTRATADA compromete-se a fornecer veículo em perfeitas condições operacionais, com seguro de responsabilidade civil e atuação atenta do instrutor pelos comandos duplos durante todo o trajeto.'
    },
    {
      id: 'cl-9',
      numero: '9ª',
      titulo: 'DOS EXAMES E BANCAS OFICIAIS DO DETRAN',
      conteudo: 'Fica expressamente consignado que a CONTRATADA é uma estrutura profissional autônoma de treinamento, não tendo ingerência, representação ou controle sobre as aprovações perante a banca examinadora do Detran-SP, cabendo o resultado exclusivamente à avaliação do examinador oficial.'
    },
    {
      id: 'cl-10',
      numero: '10ª',
      titulo: 'DA RESCISÃO E REEMBOLSO',
      conteudo: 'Em caso de rescisão antecipada por iniciativa do CONTRATANTE, será devolvido o valor correspondente às aulas não realizadas, deduzida taxa administrativa de 10% (dez por cento) sobre o saldo remanescente para cobertura de despesas de reserva de grade.'
    },
    {
      id: 'cl-11',
      numero: '11ª',
      titulo: 'DA PROTEÇÃO DE DADOS (LGPD)',
      conteudo: 'As partes declaram ciência e conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), sendo os dados coletados tratados unicamente para a execução deste contrato e obrigações operacionais.'
    },
    {
      id: 'cl-12',
      numero: '12ª',
      titulo: 'DO ACEITE E ASSINATURA ELETRÔNICA',
      conteudo: 'As partes reconhecem a validade jurídica do aceite manifestado por meios eletrônicos idôneos na plataforma, produzindo plenos efeitos legais perante o ordenamento jurídico brasileiro.'
    }
  ]
};

export const CONTRATOS_INICIAIS: Contrato[] = [];

export const RECIBOS_INICIAIS: Recibo[] = [];

export const HISTORICO_ENVIOS_INICIAIS: HistoricoEnvio[] = [];

export const FOTOS_GALERIA_INICIAIS: FotoGaleria[] = [
  {
    id: 'foto-01',
    titulo: 'Veículo de Instrução VW Gol Power',
    categoria: 'veiculos',
    descricao: 'Carro com duplo comando de segurança homologado, direção hidráulica e ar condicionado.',
    imagemUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    destaque: true
  },
  {
    id: 'foto-02',
    titulo: 'Treino de Baliza de Precisão',
    categoria: 'pista',
    descricao: 'Espaço com balizadores oficiais para aprender marcações com calma e sem estresse.',
    imagemUrl: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'foto-03',
    titulo: 'Motocicleta Yamaha Fazer 250 ABS',
    categoria: 'veiculos',
    descricao: 'Moto ágil, segura e equilibrada para treinamento prático da Categoria A.',
    imagemUrl: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'foto-04',
    titulo: 'Ergonomia e Conforto ao Volante',
    categoria: 'aulas',
    descricao: 'Ajuste correto de banco, retrovisores e postura para dominar os pedais com segurança.',
    imagemUrl: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'foto-05',
    titulo: 'Controle de Embreagem em Aclive',
    categoria: 'aulas',
    descricao: 'Exercícios práticos para perder o medo de ladeiras e paradas obrigatórias.',
    imagemUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'foto-06',
    titulo: 'Orientação Humanizada no Trânsito',
    categoria: 'instrutora',
    descricao: 'Vanessa Becegato ensinando com paciência, acolhimento e foco no seu ritmo individual.',
    imagemUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80'
  }
];

