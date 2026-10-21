export type UserRole = 'public' | 'aluno' | 'admin' | 'instrutor' | 'equipe';

export type CategoriaCNH = 'A' | 'B' | 'AB';

export interface Aluno {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  cpf?: string;
  categoria: CategoriaCNH;
  statusProcesso: 'em_formacao' | 'aguardando_exame' | 'concluido' | 'suspenso';
  etapaAtualId: string;
  dataMatricula: string;
  pacoteContratado: string;
  totalAulasContratadas: number;
  aulasRealizadas: number;
  observacoes?: string;
  comunicacaoWhatsapp: boolean;
  comunicacaoEmail: boolean;
  usuarioAcesso?: string;
  senhaInicial?: string;
}

export type LeadStatus =
  | 'novo'
  | 'primeiro_contato'
  | 'aguardando_resposta'
  | 'interessado'
  | 'em_negociacao'
  | 'convertido'
  | 'sem_continuidade';

export interface Interessado {
  id: string;
  nome: string;
  telefone: string;
  email?: string;
  servicoInteresse: string;
  categoriaDesejada: CategoriaCNH;
  horarioPreferencial?: string;
  mensagem?: string;
  status: LeadStatus;
  origem: string;
  dataCriacao: string;
  notasAtendimento?: string;
}

export interface PacotePratico {
  id: string;
  nome: string;
  aulas: number;
  indicadoPara: string;
  foco: string;
  destaque?: boolean;
  badge?: string;
}

export type StatusAcompanhamento =
  | 'nao_iniciado'
  | 'em_andamento'
  | 'aguardando_documento'
  | 'documento_recebido'
  | 'em_revisao'
  | 'revisado'
  | 'aguardando_acao_aluno'
  | 'aguardando_confirmacao_oficial'
  | 'confirmado_evidencia'
  | 'concluido_admin'
  | 'suspenso';

export interface TarefaEtapa {
  id: string;
  titulo: string;
  obrigatoria?: boolean;
}

export interface EtapaJornada {
  id: string;
  ordem: number;
  titulo: string;
  descricao: string;
  categoriaAplicavel: 'A' | 'B' | 'AB' | 'TODAS';
  preRequisitos: string[];
  acoesRecomendadas: string[];
  documentosNecessarios: string[];
  tarefas?: TarefaEtapa[];
  custoEstimado?: string;
  linkOficial: string;
  linkSecundario?: { label: string; url: string };
  orgaoResponsavel: string;
  fonteReferencia: string;
  dataUltimaRevisao: string;
  responsavelRevisao: string;
  precisaRevisao: boolean;
  dependeConfirmacaoOficial: boolean;
  destaqueToxico?: boolean;
  observacoes: string;
}

export interface ProgressoAlunoEtapa {
  etapaId: string;
  status: StatusAcompanhamento;
  tarefasConcluidas?: string[];
  notasAluno?: string;
  evidenciaRegistrada?: string;
  responsavelAtualizacao?: string;
  dataAtualizacao: string;
}

export type StatusAula = 'agendada' | 'realizada' | 'cancelada' | 'remarcada';

export interface Aula {
  id: string;
  alunoId: string;
  alunoNome: string;
  instrutorId: string;
  instrutorNome: string;
  veiculoId: string;
  veiculoDescricao: string;
  data: string; // YYYY-MM-DD
  horarioInicio: string; // HH:mm
  horarioFim: string; // HH:mm
  categoria: 'A' | 'B';
  status: StatusAula;
  motivoCancelamento?: string;
  pontoEncontro: string;
  observacoesGerais?: string;
}

export interface Instrutor {
  id: string;
  nome: string;
  telefone: string;
  email: string;
  categoriasAutorizadas: CategoriaCNH[];
  ativo: boolean;
  credencialValida: boolean;
  observacoesInternas?: string;
}

export type StatusVeiculo = 'disponivel' | 'em_uso' | 'reservado' | 'manutencao' | 'indisponivel';

export interface Veiculo {
  id: string;
  codigoInterno: string;
  marcaModelo: string;
  ano: number;
  placaMascarada: string; // Ex: ABC-***4
  categoria: 'A' | 'B';
  status: StatusVeiculo;
  quilometragem?: number;
  proximaManutencao: string;
  alertaManutencao?: string;
  ativo: boolean;
}

export type StatusDocumento =
  | 'solicitado'
  | 'enviado'
  | 'recebido'
  | 'revisado'
  | 'recusado'
  | 'exige_confirmacao';

export interface DocumentoAluno {
  id: string;
  alunoId: string;
  titulo: string;
  tipo: string;
  status: StatusDocumento;
  nomeArquivo?: string;
  tamanhoKb?: number;
  dataEnvio?: string;
  dataRevisao?: string;
  revisadoPor?: string;
  motivoRecusa?: string;
  orientacaoEnvio: string;
}

export interface RegistroEvolucao {
  id: string;
  alunoId: string;
  aulaId?: string;
  dataAula: string;
  instrutorId: string;
  instrutorNome: string;
  habilidadesPraticadas: string[];
  pontosFortes: string;
  aspectosParaPraticar: string;
  metaProximaAula: string;
  observacoesAluno: string; // visível ao aluno
  observacoesInternas?: string; // visível apenas equipe/instrutor
}

export interface RegistroAuditoria {
  id: string;
  dataHora: string;
  usuarioNome: string;
  usuarioPapel: string;
  acao: string;
  entidade: string;
  detalhes: string;
}

export type ContratoStatus =
  | 'minuta'
  | 'aguardando_conferencia'
  | 'aguardando_aceite'
  | 'aceito_eletronicamente'
  | 'pdf_gerado'
  | 'aguardando_assinatura'
  | 'assinado'
  | 'cancelado'
  | 'substituido';

export interface Contrato {
  id: string;
  numeroContrato: string;
  alunoId: string;
  alunoNome: string;
  alunoCpf?: string;
  alunoRg?: string;
  alunoEndereco?: string;
  alunoTelefone: string;
  alunoEmail?: string;
  pacoteNome: string;
  quantidadeAulas: number;
  duracaoAulaMinutos: number;
  categoria: CategoriaCNH;
  valorTotal: number;
  formaPagamento: string;
  dataInicioPrevista: string;
  versaoModelo: string;
  status: ContratoStatus;
  dataCriacao: string;
  dataAceite?: string;
  evidenciaAceiteIp?: string;
  evidenciaAceiteDataHora?: string;
  dataAssinatura?: string;
  motivoCancelamento?: string;
  pdfGeradoEm?: string;
}

export interface Recibo {
  id: string;
  numeroRecibo: string;
  alunoId: string;
  alunoNome: string;
  pagadorNome: string;
  pagadorCpf?: string;
  contratoId?: string;
  servicoDescricao: string;
  valorRecebido: number;
  formaPagamento: 'PIX' | 'Cartão de Crédito' | 'Cartão de Débito' | 'Dinheiro em Espécie' | 'Transferência';
  dataPagamento: string;
  dataEmissao: string;
  emitidoPor: string;
  status: 'emitido' | 'cancelado';
  observacoes?: string;
}

export interface ClausulaContrato {
  id: string;
  numero: string;
  titulo: string;
  conteudo: string;
}

export interface ModeloDocumento {
  id: string;
  tipo: 'contrato_aulas_praticas' | 'termo_responsabilidade';
  titulo: string;
  versao: string;
  ativo: boolean;
  estado: 'rascunho' | 'aprovado' | 'arquivado';
  dataCriacao: string;
  responsavelAlteracao: string;
  clausulas: ClausulaContrato[];
}

export interface HistoricoEnvio {
  id: string;
  documentoId: string;
  documentoTipo: 'contrato' | 'recibo' | 'termo';
  documentoNumero: string;
  alunoId: string;
  alunoNome: string;
  canal: 'whatsapp' | 'email';
  destinatario: string;
  dataTentativa: string;
  statusEnvio: 'enviado' | 'pendente' | 'falhou' | 'aberto_manual';
  resultadoProvedor: string;
  usuarioResponsavel: string;
}

export interface FotoGaleria {
  id: string;
  titulo: string;
  categoria: 'veiculos' | 'aulas' | 'pista' | 'instrutora';
  descricao: string;
  imagemUrl: string;
  destaque?: boolean;
}

export interface ConfiguracoesPlataforma {
  nomeComercial: string;
  posicionamento: string;
  whatsappOficial: string;
  telefoneComercial: string;
  emailContato: string;
  instagram: string;
  tiktok?: string;
  facebook?: string;
  youtube?: string;
  cidadeAtendimento: string;
  avisoLegalDetran: string;
  avisoRevisaoTexto: string;
  dataUltimaConferenciaDetran: string;
  responsavelConferencia: string;
  logoUrl?: string;
  // Dados da contratada para documentos
  razaoSocialContratada?: string;
  cpfCnpjContratada?: string;
  registroInstrutora?: string;
  enderecoContratada?: string;
  provedorEmailConfigurado?: boolean;
}

export interface MaterialEstudo {
  id: string;
  titulo: string;
  categoria: 'duas_rodas' | 'quatro_rodas' | 'legislacao' | 'checklist';
  descricao: string;
  versaoFormulario: string;
  dataDisponibilizacao: string;
  fonteOficial: string;
  nomeArquivo: string;
  criteriosAvaliacao: {
    categoriaFalta: 'Eliminatória' | 'Grave' | 'Média' | 'Leve';
    pontos: number;
    itens: string[];
  }[];
}

export interface LaboratorioToxicologico {
  id: string;
  nome: string;
  cidade: string;
  endereco: string;
  telefone: string;
  whatsapp?: string;
  site?: string;
  fonteInformacao: string;
  dataVerificacao: string;
  credenciamentoConfirmado: boolean;
}

