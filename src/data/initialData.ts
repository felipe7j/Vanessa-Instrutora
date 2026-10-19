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
  FotoGaleria
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
    titulo: 'Requerimento de Primeira Habilitação e Cadastro RENACH',
    descricao: 'Início formal do processo no portal estadual oficial para cadastro biométrico e abertura do Registro Nacional de Carteira de Habilitação.',
    categoriaAplicavel: 'TODAS',
    preRequisitos: ['Ter 18 anos completos', 'Saber ler e escrever', 'Possuir RG e CPF regulares'],
    acoesRecomendadas: ['Acessar o portal oficial Detran-SP', 'Preencher o formulário inicial', 'Separar documento de identidade com foto'],
    documentosNecessarios: ['RG / Documento oficial com foto', 'CPF', 'Comprovante de residência recente'],
    orgaoResponsavel: 'Detran-SP / Poupatempo',
    linkOficial: 'https://detran.sp.gov.br/cnhpaulista/',
    fonteReferencia: 'Manual CNH Paulista — Detran-SP',
    dataUltimaRevisao: '18/10/2026',
    responsavelRevisao: 'Vanessa Becegato',
    precisaRevisao: false,
    dependeConfirmacaoOficial: true,
    observacoes: 'A abertura do formulário online gera o número de protocolo necessário para o agendamento da biometria.'
  },
  {
    id: 'etapa-02',
    ordem: 2,
    titulo: 'Coleta Biométrica e Foto Oficial',
    descricao: 'Comparecimento presencial à unidade oficial para captura de foto digital, impressões digitais e assinatura eletrônica.',
    categoriaAplicavel: 'TODAS',
    preRequisitos: ['Requerimento inicial preenchido', 'Taxa estadual de cadastro recolhida, se aplicável'],
    acoesRecomendadas: ['Comparecer com 15 minutos de antecedência', 'Levar protocolo impresso ou no celular'],
    documentosNecessarios: ['Protocolo de agendamento', 'Documento de identidade original'],
    orgaoResponsavel: 'Poupatempo / Detran-SP',
    linkOficial: 'https://detran.sp.gov.br/cnhpaulista/',
    fonteReferencia: 'Detran-SP — Atendimento Presencial',
    dataUltimaRevisao: '18/10/2026',
    responsavelRevisao: 'Vanessa Becegato',
    precisaRevisao: false,
    dependeConfirmacaoOficial: true,
    observacoes: 'A biometria é requisito indispensável para abertura dos exames médicos e psicológicos.'
  },
  {
    id: 'etapa-03',
    ordem: 3,
    titulo: 'Avaliação Psicológica e Exame Médico de Aptidão',
    descricao: 'Exames realizados em clínica médica credenciada pelo Detran-SP para avaliar condições de saúde física, visual, reflexos e perfil psicológico.',
    categoriaAplicavel: 'TODAS',
    preRequisitos: ['Biometria registrada no sistema'],
    acoesRecomendadas: ['Dormir bem na véspera', 'Levar óculos de grau caso faça uso habitual'],
    documentosNecessarios: ['Documento oficial com foto', 'Taxa médica paga diretamente ao perito credenciado'],
    orgaoResponsavel: 'Clínica Credenciada Detran-SP',
    linkOficial: 'https://detran.sp.gov.br/cnhpaulista/',
    fonteReferencia: 'Tabela de peritos do Detran-SP',
    dataUltimaRevisao: '18/10/2026',
    responsavelRevisao: 'Vanessa Becegato',
    precisaRevisao: false,
    dependeConfirmacaoOficial: true,
    observacoes: 'O resultado "Apto" é lançado diretamente pelo médico/psicólogo no sistema informatizado do Detran.'
  },
  {
    id: 'etapa-04',
    ordem: 4,
    titulo: 'Curso Teórico-Técnico de Legislação',
    descricao: 'Formação teórica abrangendo Legislação de Trânsito, Direção Defensiva, Primeiros Socorros, Meio Ambiente e Cidadania, e Mecânica Básica.',
    categoriaAplicavel: 'TODAS',
    preRequisitos: ['Aprovação nos exames médico e psicológico'],
    acoesRecomendadas: ['Cumprir a carga horária regulamentada', 'Fazer simulados frequentes dos temas'],
    documentosNecessarios: ['Certificado de conclusão emitido pelo módulo credenciado'],
    orgaoResponsavel: 'Estrutura Autorizada / CFC',
    linkOficial: 'https://detran.sp.gov.br/cnhpaulista/',
    fonteReferencia: 'Resolução Contran vigente',
    dataUltimaRevisao: '18/10/2026',
    responsavelRevisao: 'Vanessa Becegato',
    precisaRevisao: false,
    dependeConfirmacaoOficial: true,
    observacoes: 'A validação da frequência biométrica é exigida para liberação da prova teórica.'
  },
  {
    id: 'etapa-05',
    ordem: 5,
    titulo: 'Agendamento e Aprovação no Exame Teórico',
    descricao: 'Prova eletrônica oficial com 30 questões de múltipla escolha para certificar os conhecimentos teóricos de trânsito.',
    categoriaAplicavel: 'TODAS',
    preRequisitos: ['Curso teórico concluído e validado no sistema'],
    acoesRecomendadas: ['Atingir mínimo de 70% de acertos (21 questões)', 'Revisar placas de advertência e regulamentação'],
    documentosNecessarios: ['Comprovante de agendamento', 'Documento oficial com foto'],
    orgaoResponsavel: 'Detran-SP',
    linkOficial: 'https://detran.sp.gov.br/cnhpaulista/',
    fonteReferencia: 'Portal do Detran-SP',
    dataUltimaRevisao: '18/10/2026',
    responsavelRevisao: 'Vanessa Becegato',
    precisaRevisao: false,
    dependeConfirmacaoOficial: true,
    observacoes: 'A nota é emitida no mesmo dia pelo sistema eletrônico da sala de prova.'
  },
  {
    id: 'etapa-06',
    ordem: 6,
    titulo: 'Emissão da LADV (Licença de Aprendizagem)',
    descricao: 'Documento oficial expedido pelo órgão de trânsito que autoriza o candidato a realizar aulas práticas na via pública acompanhado de instrutor credenciado.',
    categoriaAplicavel: 'TODAS',
    preRequisitos: ['Aprovação na prova teórica'],
    acoesRecomendadas: ['Verificar dados cadastrais na LADV', 'Portar sempre a licença original e RG durante as aulas'],
    documentosNecessarios: ['LADV impressa ou autenticada digitalmente'],
    orgaoResponsavel: 'Detran-SP',
    linkOficial: 'https://detran.sp.gov.br/cnhpaulista/',
    fonteReferencia: 'Código de Trânsito Brasileiro art. 158',
    dataUltimaRevisao: '18/10/2026',
    responsavelRevisao: 'Vanessa Becegato',
    precisaRevisao: false,
    dependeConfirmacaoOficial: true,
    observacoes: 'Dirigir sem a LADV ou desacompanhado de instrutor credenciado acarreta suspensão do processo por 6 meses.'
  },
  {
    id: 'etapa-07',
    ordem: 7,
    titulo: 'Treinamento Prático com Estrutura Autônoma',
    descricao: 'Aulas práticas personalizadas no veículo de instrução (Carro B ou Moto A), com metodologia humanizada, gestão de ansiedade, ergonomia, manobras de baliza e controle de tráfego real.',
    categoriaAplicavel: 'TODAS',
    preRequisitos: ['LADV válida em mãos', 'Documento de identificação oficial'],
    acoesRecomendadas: ['Seguir as metas individuais do Caderno de Evolução', 'Praticar o percurso oficial da prova'],
    documentosNecessarios: ['LADV', 'RG'],
    orgaoResponsavel: 'Vanessa Becegato — Instrutora Autônoma',
    linkOficial: 'https://detran.sp.gov.br/cnhpaulista/',
    fonteReferencia: 'Plano Pedagógico Vanessa Becegato',
    dataUltimaRevisao: '18/10/2026',
    responsavelRevisao: 'Vanessa Becegato',
    precisaRevisao: false,
    dependeConfirmacaoOficial: false,
    observacoes: 'Acompanhamento registrado aula a aula com apontamento de habilidades e pontos de atenção.'
  },
  {
    id: 'etapa-08',
    ordem: 8,
    titulo: 'Agendamento Oficial do Exame Prático',
    descricao: 'Marcação do exame prático veicular no sistema do Detran-SP após preparação e validação do preparo técnico.',
    categoriaAplicavel: 'TODAS',
    preRequisitos: ['Aulas práticas completadas', 'Aptidão técnica demonstrada nos simulados de baliza e percurso'],
    acoesRecomendadas: ['Acessar o agendamento prático oficial', 'Conferir datas de banca disponíveis para a categoria'],
    documentosNecessarios: ['Taxa de exame prático recolhida'],
    orgaoResponsavel: 'Detran-SP',
    linkOficial: 'https://detran.sp.gov.br/agendar-pratico',
    fonteReferencia: 'Portal Oficial de Agendamento Prático SP',
    dataUltimaRevisao: '18/10/2026',
    responsavelRevisao: 'Vanessa Becegato',
    precisaRevisao: false,
    dependeConfirmacaoOficial: true,
    observacoes: 'O agendamento depende da disponibilidade de datas e bancas examinadoras do município.'
  },
  {
    id: 'etapa-09',
    ordem: 9,
    titulo: 'Realização da Prova Prática Veicular',
    descricao: 'Avaliação com examinadores oficiais do Detran-SP constando de manobra de baliza (espaço demarcado por balizas) e trajeto em via pública.',
    categoriaAplicavel: 'TODAS',
    preRequisitos: ['Agendamento ativo', 'Apresentação no pátio com antecedência'],
    acoesRecomendadas: ['Chegar com 30 minutos de antecedência', 'Fazer exercícios de respiração diafragmática', 'Ajustar banco, retrovisores e cinto calmamente'],
    documentosNecessarios: ['LADV', 'Documento oficial de identidade original'],
    orgaoResponsavel: 'Banca Examinadora Detran-SP',
    linkOficial: 'https://detran.sp.gov.br/agendar-pratico',
    fonteReferencia: 'Critérios de Avaliação Prática Contran / Detran-SP',
    dataUltimaRevisao: '18/10/2026',
    responsavelRevisao: 'Vanessa Becegato',
    precisaRevisao: false,
    dependeConfirmacaoOficial: true,
    observacoes: 'O resultado (Apto/Inapto) é informado pela banca imediatamente ao término da prova.'
  },
  {
    id: 'etapa-10',
    ordem: 10,
    titulo: 'Emissão e Liberação da CNH Digital (PPD)',
    descricao: 'Após aprovação, recolhimento da taxa de emissão e disponibilização da Permissão Para Dirigir (PPD) no aplicativo Carteira Digital de Trânsito.',
    categoriaAplicavel: 'TODAS',
    preRequisitos: ['Aprovação registrada na banca examinadora', 'Taxa estadual de emissão recolhida'],
    acoesRecomendadas: ['Baixar o aplicativo Carteira Digital de Trânsito (CDT)', 'Validar login Gov.br nível Prata ou Ouro'],
    documentosNecessarios: ['Comprovante de pagamento da taxa de emissão'],
    orgaoResponsavel: 'Detran-SP / Senatran',
    linkOficial: 'https://detran.sp.gov.br/cnhpaulista/',
    fonteReferencia: 'Senatran — CDT',
    dataUltimaRevisao: '18/10/2026',
    responsavelRevisao: 'Vanessa Becegato',
    precisaRevisao: false,
    dependeConfirmacaoOficial: true,
    observacoes: 'A CNH digital tem o mesmo valor jurídico da impressa e fica disponível geralmente em até 72 horas úteis após a baixa da taxa.'
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

export const ALUNOS_INICIAIS: Aluno[] = [
  {
    id: 'aluno-01',
    nome: 'Mariana S. Albuquerque',
    email: 'mariana.albuquerque@email.com',
    telefone: '(18) 99712-4433',
    categoria: 'B',
    statusProcesso: 'em_formacao',
    etapaAtualId: 'etapa-07',
    dataMatricula: '2026-09-10',
    pacoteContratado: 'SUPERAÇÃO (20 Aulas)',
    totalAulasContratadas: 20,
    aulasRealizadas: 8,
    observacoes: 'Foco inicial em superar bloqueio com subidas e baliza. Demonstra excelente evolução no controle de embreagem.',
    comunicacaoWhatsapp: true,
    comunicacaoEmail: true
  },
  {
    id: 'aluno-02',
    nome: 'Lucas Gabriel Martins',
    email: 'lucas.martins@email.com',
    telefone: '(18) 99881-2211',
    categoria: 'B',
    statusProcesso: 'em_formacao',
    etapaAtualId: 'etapa-07',
    dataMatricula: '2026-10-01',
    pacoteContratado: 'EVOLUÇÃO (10 Aulas)',
    totalAulasContratadas: 10,
    aulasRealizadas: 6,
    observacoes: 'Excelente noção espacial. Treinando percurso oficial de prova e rotatórias de fluxo moderado.',
    comunicacaoWhatsapp: true,
    comunicacaoEmail: false
  },
  {
    id: 'aluno-03',
    nome: 'Camila Rocha Ramos',
    email: 'camila.ramos@email.com',
    telefone: '(18) 99655-7788',
    categoria: 'AB',
    statusProcesso: 'aguardando_exame',
    etapaAtualId: 'etapa-08',
    dataMatricula: '2026-08-15',
    pacoteContratado: 'APRENDIZ (15 Aulas)',
    totalAulasContratadas: 15,
    aulasRealizadas: 15,
    observacoes: 'Treinamento concluído com louvor. Aguardando data da banca examinadora.',
    comunicacaoWhatsapp: true,
    comunicacaoEmail: true
  }
];

export const PROGRESSO_INICIAL_MARIANA: ProgressoAlunoEtapa[] = [
  {
    etapaId: 'etapa-01',
    status: 'confirmado_evidencia',
    notasAluno: 'Requerimento e taxa de cadastro realizados no Poupatempo.',
    evidenciaRegistrada: 'Comprovante do protocolo Detran arquivado internamente.',
    responsavelAtualizacao: 'Vanessa Becegato',
    dataAtualizacao: '2026-09-12'
  },
  {
    etapaId: 'etapa-02',
    status: 'confirmado_evidencia',
    notasAluno: 'Biometria e foto feitas com sucesso.',
    evidenciaRegistrada: 'Protocolo de biometria conferido.',
    responsavelAtualizacao: 'Vanessa Becegato',
    dataAtualizacao: '2026-09-15'
  },
  {
    etapaId: 'etapa-03',
    status: 'confirmado_evidencia',
    notasAluno: 'Exame médico e psicotécnico aprovados na clínica credenciada.',
    evidenciaRegistrada: 'Lançamento de Apto verificado no relatório oficial do candidato.',
    responsavelAtualizacao: 'Vanessa Becegato',
    dataAtualizacao: '2026-09-18'
  },
  {
    etapaId: 'etapa-04',
    status: 'confirmado_evidencia',
    notasAluno: 'Aulas teóricas concluídas.',
    evidenciaRegistrada: 'Certificado de conclusão de curso teórico verificado.',
    responsavelAtualizacao: 'Vanessa Becegato',
    dataAtualizacao: '2026-09-28'
  },
  {
    etapaId: 'etapa-05',
    status: 'confirmado_evidencia',
    notasAluno: 'Aprovada com 27 acertos de 30.',
    evidenciaRegistrada: 'Extrato oficial de aprovação arquivado no cadastro.',
    responsavelAtualizacao: 'Vanessa Becegato',
    dataAtualizacao: '2026-10-02'
  },
  {
    etapaId: 'etapa-06',
    status: 'confirmado_evidencia',
    notasAluno: 'LADV física e digital em mãos.',
    evidenciaRegistrada: 'Cópia da LADV ativa arquivada no portal seguro.',
    responsavelAtualizacao: 'Vanessa Becegato',
    dataAtualizacao: '2026-10-04'
  },
  {
    etapaId: 'etapa-07',
    status: 'em_andamento',
    notasAluno: '8 aulas práticas realizadas de 20. Sentindo muito mais segurança ao volante!',
    evidenciaRegistrada: 'Ficha de presença e caderno de evolução assinados aula a aula.',
    responsavelAtualizacao: 'Vanessa Becegato',
    dataAtualizacao: '2026-10-17'
  },
  {
    etapaId: 'etapa-08',
    status: 'aguardando_acao_aluno',
    notasAluno: 'Agendamento será realizado após completar a carga prática e os simulados finais.',
    dataAtualizacao: '2026-10-17'
  },
  {
    etapaId: 'etapa-09',
    status: 'nao_iniciado',
    dataAtualizacao: '2026-10-17'
  },
  {
    etapaId: 'etapa-10',
    status: 'nao_iniciado',
    dataAtualizacao: '2026-10-17'
  }
];

export const AULAS_INICIAIS: Aula[] = [
  {
    id: 'aula-01',
    alunoId: 'aluno-01',
    alunoNome: 'Mariana S. Albuquerque',
    instrutorId: 'inst-01',
    instrutorNome: 'Vanessa Becegato',
    veiculoId: 'veic-01',
    veiculoDescricao: 'Gol Power 1.6 (CAR-01)',
    data: '2026-10-19',
    horarioInicio: '08:00',
    horarioFim: '09:00',
    categoria: 'B',
    status: 'agendada',
    pontoEncontro: 'Ponto Central — Em frente à Praça Matriz',
    observacoesGerais: 'Aula prática 09: Treino focado em arrancada em aclive e baliza de 2 pontos.'
  },
  {
    id: 'aula-02',
    alunoId: 'aluno-01',
    alunoNome: 'Mariana S. Albuquerque',
    instrutorId: 'inst-01',
    instrutorNome: 'Vanessa Becegato',
    veiculoId: 'veic-01',
    veiculoDescricao: 'Gol Power 1.6 (CAR-01)',
    data: '2026-10-21',
    horarioInicio: '08:00',
    horarioFim: '09:00',
    categoria: 'B',
    status: 'agendada',
    pontoEncontro: 'Pátio de Baliza Oficial — Área de Treinamento',
    observacoesGerais: 'Aula prática 10: Simulado completo de percurso com cronômetro.'
  },
  {
    id: 'aula-03',
    alunoId: 'aluno-02',
    alunoNome: 'Lucas Gabriel Martins',
    instrutorId: 'inst-01',
    instrutorNome: 'Vanessa Becegato',
    veiculoId: 'veic-01',
    veiculoDescricao: 'Gol Power 1.6 (CAR-01)',
    data: '2026-10-19',
    horarioInicio: '09:30',
    horarioFim: '10:30',
    categoria: 'B',
    status: 'agendada',
    pontoEncontro: 'Avenida Brasil, esquina com Rua 7 de Setembro',
    observacoesGerais: 'Trocas de marcha e redução em esquinas movimentadas.'
  },
  {
    id: 'aula-04',
    alunoId: 'aluno-01',
    alunoNome: 'Mariana S. Albuquerque',
    instrutorId: 'inst-01',
    instrutorNome: 'Vanessa Becegato',
    veiculoId: 'veic-01',
    veiculoDescricao: 'Gol Power 1.6 (CAR-01)',
    data: '2026-10-16',
    horarioInicio: '08:00',
    horarioFim: '09:00',
    categoria: 'B',
    status: 'realizada',
    pontoEncontro: 'Pátio de Baliza Oficial',
    observacoesGerais: 'Aula 08 realizada com êxito. Conseguiu alinhar o carro na vaga nas 3 tentativas.'
  }
];

export const EVOLUCAO_INICIAL_MARIANA: RegistroEvolucao[] = [
  {
    id: 'evo-01',
    alunoId: 'aluno-01',
    aulaId: 'aula-04',
    dataAula: '2026-10-16',
    instrutorId: 'inst-01',
    instrutorNome: 'Vanessa Becegato',
    habilidadesPraticadas: [
      'Ergonomia e regulagem de retrovisores',
      'Ponto de fricção da embreagem',
      'Baliza entre balizadores (método do triângulo)',
      'Sinalização antecipada de conversões'
    ],
    pontosFortes: 'Excelente atenção à sinalização (seta ligada com antecedência) e postura calma no volante. Superou o receio inicial de aproximação do meio-fio.',
    aspectosParaPraticar: 'Manter a respiração cadenciada na hora de engatar a marcha a ré e não ter pressa para esterçar.',
    metaProximaAula: 'Treinar saída em rampa sem utilizar o freio de mão e 3 balizas consecutivas.',
    observacoesAluno: 'Parabéns pela dedicação, Mariana! Você já domina o controle de pedais. Vamos em frente rumo à sua independência!',
    observacoesInternas: 'Aluna ganhou confiança significativa. Foco agora é na precisão da baliza no tempo regulamentar.'
  },
  {
    id: 'evo-02',
    alunoId: 'aluno-01',
    dataAula: '2026-10-14',
    instrutorId: 'inst-01',
    instrutorNome: 'Vanessa Becegato',
    habilidadesPraticadas: [
      'Partida em aclive com freio de mão',
      'Trocas de 1ª para 2ª e 3ª marcha com suavidade',
      'Cruzamentos com preferência'
    ],
    pontosFortes: 'Não deixou o motor morrer em nenhuma parada obrigatória.',
    aspectosParaPraticar: 'Ajuste suave da distância de segurança do veículo à frente.',
    metaProximaAula: 'Iniciar marcações de baliza de ré.',
    observacoesAluno: 'Excelente controle de marcha, muito estável!',
    observacoesInternas: 'Superação clara de bloqueio emocional em ladeiras.'
  }
];

export const DOCUMENTOS_INICIAIS_MARIANA: DocumentoAluno[] = [
  {
    id: 'doc-01',
    alunoId: 'aluno-01',
    titulo: 'LADV — Licença de Aprendizagem de Direção',
    tipo: 'PDF Oficial',
    status: 'revisado',
    nomeArquivo: 'LADV_Mariana_Albuquerque_2026.pdf',
    tamanhoKb: 342,
    dataEnvio: '2026-10-04',
    dataRevisao: '2026-10-04',
    revisadoPor: 'Vanessa Becegato',
    orientacaoEnvio: 'Documento oficial expedido pelo Detran-SP após aprovação na prova teórica.'
  },
  {
    id: 'doc-02',
    alunoId: 'aluno-01',
    titulo: 'Documento de Identidade Oficial (RG / CNH Digital)',
    tipo: 'Documento de Identificação',
    status: 'revisado',
    nomeArquivo: 'RG_Mariana_Albuquerque.pdf',
    tamanhoKb: 512,
    dataEnvio: '2026-09-10',
    dataRevisao: '2026-09-10',
    revisadoPor: 'Vanessa Becegato',
    orientacaoEnvio: 'Frente e verso nítidos do documento oficial com foto.'
  },
  {
    id: 'doc-03',
    alunoId: 'aluno-01',
    titulo: 'Comprovante de Residência Atualizado',
    tipo: 'Comprovante',
    status: 'revisado',
    nomeArquivo: 'Comprovante_Residencia.pdf',
    tamanhoKb: 280,
    dataEnvio: '2026-09-10',
    dataRevisao: '2026-09-10',
    revisadoPor: 'Vanessa Becegato',
    orientacaoEnvio: 'Conta de água, luz ou telefone dos últimos 90 dias.'
  },
  {
    id: 'doc-04',
    alunoId: 'aluno-01',
    titulo: 'Comprovante de Aprovação no Exame Teórico',
    tipo: 'Certificado / Extrato',
    status: 'revisado',
    nomeArquivo: 'Aprovacao_Exame_Teorico.pdf',
    tamanhoKb: 198,
    dataEnvio: '2026-10-02',
    dataRevisao: '2026-10-03',
    revisadoPor: 'Vanessa Becegato',
    orientacaoEnvio: 'Extrato de resultado emitido pela sala de provas do Detran.'
  }
];

export const INTERESSADOS_INICIAIS: Interessado[] = [
  {
    id: 'lead-01',
    nome: 'Beatriz Vasconcelos',
    telefone: '(18) 99123-9988',
    email: 'beatriz.v@gmail.com',
    servicoInteresse: 'Pacote Superação (20 aulas) — Medo de dirigir',
    categoriaDesejada: 'B',
    horarioPreferencial: 'Manhã (após às 08h30)',
    mensagem: 'Tirei habilitação há 3 anos mas nunca dirigi por trauma no trânsito. Gostaria de saber como funciona o acompanhamento.',
    status: 'interessado',
    origem: 'Instagram (@instrutora.vanessabecegato)',
    dataCriacao: '2026-10-17 14:20',
    notasAtendimento: 'Enviada mensagem calorosa explicando o método passo a passo. Aguardando retorno da aluna para agendar aula diagnóstica.'
  },
  {
    id: 'lead-02',
    nome: 'Rodrigo Mendonça',
    telefone: '(18) 99788-3344',
    email: 'rodrigo.m@outlook.com',
    servicoInteresse: 'Pacote Alinhamento (2 aulas) — Treino para prova',
    categoriaDesejada: 'B',
    horarioPreferencial: 'Fins de tarde',
    mensagem: 'Vou fazer a prova do Detran na próxima semana e quero treinar a baliza no carro da instrutora.',
    status: 'em_negociacao',
    origem: 'Indicação de aluno',
    dataCriacao: '2026-10-18 10:15',
    notasAtendimento: 'Explicada a disponibilidade do Gol Power para o treino de refinamento.'
  },
  {
    id: 'lead-03',
    nome: 'Juliana Costa e Silva',
    telefone: '(18) 99611-0022',
    servicoInteresse: 'Pacote Aprendiz (15 aulas) — Carro e Moto',
    categoriaDesejada: 'AB',
    horarioPreferencial: 'Sábados pela manhã',
    mensagem: 'Estou abrindo o processo no Poupatempo e quero fazer as aulas práticas com a Vanessa.',
    status: 'primeiro_contato',
    origem: 'Site Oficial',
    dataCriacao: '2026-10-18 16:40',
    notasAtendimento: 'Primeiro contato registrado. Contato será feito via WhatsApp.'
  }
];

export const AUDITORIA_INICIAL: RegistroAuditoria[] = [
  {
    id: 'aud-01',
    dataHora: '2026-10-18 17:30',
    usuarioNome: 'Vanessa Becegato',
    usuarioPapel: 'admin',
    acao: 'CONFERÊNCIA_OFICIAL',
    entidade: 'Etapas da Jornada',
    detalhes: 'Conferência periódica de requisitos com portal oficial CNH Paulista Detran-SP.'
  },
  {
    id: 'aud-02',
    dataHora: '2026-10-17 09:15',
    usuarioNome: 'Vanessa Becegato',
    usuarioPapel: 'instrutor',
    acao: 'REGISTRO_EVOLUCAO',
    entidade: 'Caderno de Evolução',
    detalhes: 'Registro de evolução pedagógica da aluna Mariana S. Albuquerque (Aula 08).'
  },
  {
    id: 'aud-03',
    dataHora: '2026-10-16 18:00',
    usuarioNome: 'Vanessa Becegato',
    usuarioPapel: 'admin',
    acao: 'VALIDAÇÃO_DOCUMENTAL',
    entidade: 'DocumentoAluno (LADV)',
    detalhes: 'Conferência e arquivamento de cópia de LADV da candidata Mariana S. Albuquerque.'
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

export const CONTRATOS_INICIAIS: Contrato[] = [
  {
    id: 'ctr-01',
    numeroContrato: 'CTR-2026-001',
    alunoId: 'aluno-01',
    alunoNome: 'Mariana S. Albuquerque',
    alunoCpf: '381.***.***-04',
    alunoRg: '44.***.***-8 SSP/SP',
    alunoEndereco: 'Vamos até você',
    alunoTelefone: '(18) 99712-4433',
    alunoEmail: 'mariana.albuquerque@email.com',
    pacoteNome: 'SUPERAÇÃO (20 Aulas Práticas)',
    quantidadeAulas: 20,
    duracaoAulaMinutos: 50,
    categoria: 'B',
    valorTotal: 2400.00,
    formaPagamento: 'PIX à Vista (com recibo emitido)',
    dataInicioPrevista: '2026-09-12',
    versaoModelo: '1.0',
    status: 'aceito_eletronicamente',
    dataCriacao: '2026-09-10',
    dataAceite: '2026-09-10 16:45',
    evidenciaAceiteIp: '187.54.***.12',
    evidenciaAceiteDataHora: '2026-09-10 16:45:22 BRT',
    pdfGeradoEm: '2026-09-10'
  },
  {
    id: 'ctr-02',
    numeroContrato: 'CTR-2026-002',
    alunoId: 'aluno-02',
    alunoNome: 'Lucas Gabriel Martins',
    alunoCpf: '412.***.***-19',
    alunoRg: '50.***.***-2 SSP/SP',
    alunoEndereco: 'Av. Washington Luiz, 850 - Presidente Prudente/SP',
    alunoTelefone: '(18) 99881-2211',
    alunoEmail: 'lucas.martins@email.com',
    pacoteNome: 'EVOLUÇÃO (10 Aulas Práticas)',
    quantidadeAulas: 10,
    duracaoAulaMinutos: 50,
    categoria: 'B',
    valorTotal: 1300.00,
    formaPagamento: '2x no Cartão de Crédito',
    dataInicioPrevista: '2026-10-02',
    versaoModelo: '1.0',
    status: 'aceito_eletronicamente',
    dataCriacao: '2026-10-01',
    dataAceite: '2026-10-01 11:20',
    evidenciaAceiteIp: '177.20.***.88',
    evidenciaAceiteDataHora: '2026-10-01 11:20:10 BRT',
    pdfGeradoEm: '2026-10-01'
  },
  {
    id: 'ctr-03',
    numeroContrato: 'CTR-2026-003',
    alunoId: 'aluno-03',
    alunoNome: 'Camila Rocha Ramos',
    alunoCpf: '399.***.***-52',
    alunoTelefone: '(18) 99655-7788',
    alunoEmail: 'camila.ramos@email.com',
    pacoteNome: 'APRENDIZ (15 Aulas Práticas)',
    quantidadeAulas: 15,
    duracaoAulaMinutos: 50,
    categoria: 'AB',
    valorTotal: 1950.00,
    formaPagamento: 'PIX Entrada + Saldo Cartão',
    dataInicioPrevista: '2026-08-16',
    versaoModelo: '1.0',
    status: 'assinado',
    dataCriacao: '2026-08-15',
    dataAceite: '2026-08-15 09:12',
    dataAssinatura: '2026-08-15',
    pdfGeradoEm: '2026-08-15'
  }
];

export const RECIBOS_INICIAIS: Recibo[] = [
  {
    id: 'rec-01',
    numeroRecibo: 'REC-2026-001',
    alunoId: 'aluno-01',
    alunoNome: 'Mariana S. Albuquerque',
    pagadorNome: 'Mariana S. Albuquerque',
    pagadorCpf: '381.***.***-04',
    contratoId: 'ctr-01',
    servicoDescricao: 'Pagamento integral referente ao Pacote SUPERAÇÃO (20 Aulas Práticas Categoria B)',
    valorRecebido: 2400.00,
    formaPagamento: 'PIX',
    dataPagamento: '2026-09-10',
    dataEmissao: '2026-09-10',
    emitidoPor: 'Vanessa Becegato',
    status: 'emitido',
    observacoes: 'Quitação integral com comprovação de transferência bancária instantânea.'
  },
  {
    id: 'rec-02',
    numeroRecibo: 'REC-2026-002',
    alunoId: 'aluno-02',
    alunoNome: 'Lucas Gabriel Martins',
    pagadorNome: 'Lucas Gabriel Martins',
    pagadorCpf: '412.***.***-19',
    contratoId: 'ctr-02',
    servicoDescricao: '1ª Parcela referente ao Pacote EVOLUÇÃO (10 Aulas Práticas Categoria B)',
    valorRecebido: 650.00,
    formaPagamento: 'Cartão de Crédito',
    dataPagamento: '2026-10-01',
    dataEmissao: '2026-10-01',
    emitidoPor: 'Vanessa Becegato',
    status: 'emitido',
    observacoes: 'Parcela 1 de 2 autorizada na maquininha.'
  }
];

export const HISTORICO_ENVIOS_INICIAIS: HistoricoEnvio[] = [
  {
    id: 'env-01',
    documentoId: 'ctr-01',
    documentoTipo: 'contrato',
    documentoNumero: 'CTR-2026-001',
    alunoId: 'aluno-01',
    alunoNome: 'Mariana S. Albuquerque',
    canal: 'whatsapp',
    destinatario: '(18) 99712-4433',
    dataTentativa: '2026-09-10 16:30',
    statusEnvio: 'aberto_manual',
    resultadoProvedor: 'Mensagem aberta no WhatsApp da aluna pelo operador',
    usuarioResponsavel: 'Vanessa Becegato'
  },
  {
    id: 'env-02',
    documentoId: 'rec-01',
    documentoTipo: 'recibo',
    documentoNumero: 'REC-2026-001',
    alunoId: 'aluno-01',
    alunoNome: 'Mariana S. Albuquerque',
    canal: 'whatsapp',
    destinatario: '(18) 99712-4433',
    dataTentativa: '2026-09-10 17:00',
    statusEnvio: 'aberto_manual',
    resultadoProvedor: 'Comprovante de recibo compartilhado com a aluna',
    usuarioResponsavel: 'Vanessa Becegato'
  }
];

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

