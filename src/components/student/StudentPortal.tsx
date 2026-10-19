import React, { useState } from 'react';
import { useAppStore } from '../../services/store';
import { LogoBadge } from '../brand/LogoBadge';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Compass,
  FileText,
  LogOut,
  MapPin,
  MessageCircle,
  Upload,
  AlertTriangle,
  Award,
  ChevronRight,
  ExternalLink,
  BookOpen,
  Info,
  Car,
  UserCheck,
  Sparkles,
  HelpCircle,
  FileCheck2,
  RefreshCw,
  Eye
} from 'lucide-react';
import { StatusAcompanhamento, StatusDocumento, Contrato, Recibo } from '../../types';
import { ContractViewModal } from '../documents/ContractViewModal';
import { ReceiptViewModal } from '../documents/ReceiptViewModal';

export const StudentPortal: React.FC = () => {
  const {
    currentAlunoId,
    alunos,
    etapas,
    progressoMariana,
    updateProgressoEtapa,
    aulas,
    evolucoes,
    documentos,
    uploadDocumentoMock,
    contratos,
    recibos,
    configuracoes,
    setRole
  } = useAppStore();

  const aluno = alunos.find(a => a.id === currentAlunoId) || alunos[0];
  const [activeTab, setActiveTab] = useState<'jornada' | 'agenda' | 'evolucao' | 'documentos' | 'ajuda'>('jornada');
  const [selectedEtapaId, setSelectedEtapaId] = useState<string>(aluno.etapaAtualId || 'etapa-07');
  const [studentNotesInput, setStudentNotesInput] = useState<string>('');

  // Contract & Receipt viewer state for student
  const [viewingContract, setViewingContract] = useState<Contrato | null>(null);
  const [viewingReceipt, setViewingReceipt] = useState<Recibo | null>(null);

  // Upload modal state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('Comprovante / Documento Complementar');
  const [uploadFileType, setUploadFileType] = useState('PDF');
  const [uploadFileName, setUploadFileName] = useState('');
  const [uploadError, setUploadError] = useState('');

  // Contact support modal state
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSent, setSupportSent] = useState(false);

  // Filter lessons for this student only
  const studentLessons = aulas.filter(a => a.alunoId === aluno.id);
  const upcomingLessons = studentLessons.filter(a => a.status === 'agendada');
  const completedLessons = studentLessons.filter(a => a.status === 'realizada');

  // Filter evolution logs for this student
  const studentEvolutions = evolucoes.filter(e => e.alunoId === aluno.id);

  // Filter documents for this student
  const studentDocs = documentos.filter(d => d.alunoId === aluno.id);
  const studentContracts = contratos.filter(c => c.alunoId === aluno.id);
  const studentReceipts = recibos.filter(r => r.alunoId === aluno.id);

  // Current stage details
  const currentStage = etapas.find(e => e.id === aluno.etapaAtualId) || etapas[6];
  const activeSelectedStage = etapas.find(e => e.id === selectedEtapaId) || currentStage;
  const stageProgress = progressoMariana.find(p => p.etapaId === activeSelectedStage.id);

  const getStatusBadge = (status?: StatusAcompanhamento) => {
    switch (status) {
      case 'confirmado_evidencia':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Confirmado com evidência</span>
          </span>
        );
      case 'em_andamento':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            <span>Em andamento pelo aluno</span>
          </span>
        );
      case 'aguardando_acao_aluno':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-sky-800 bg-sky-50 px-2.5 py-1 rounded-md border border-sky-200">
            <Info className="w-3.5 h-3.5 text-sky-600" />
            <span>Aguardando sua ação</span>
          </span>
        );
      case 'aguardando_documento':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-800 bg-rose-50 px-2.5 py-1 rounded-md border border-rose-200">
            <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
            <span>Aguardando documento</span>
          </span>
        );
      case 'documento_recebido':
      case 'em_revisao':
        return (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-purple-800 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200">
            <FileText className="w-3.5 h-3.5 text-purple-600" />
            <span>Em revisão pela equipe</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
            <span>Não iniciado</span>
          </span>
        );
    }
  };

  const getDocStatusBadge = (status: StatusDocumento) => {
    switch (status) {
      case 'revisado':
        return <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded text-xs font-semibold">Revisado e Aprovado</span>;
      case 'enviado':
        return <span className="text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded text-xs font-semibold">Enviado (Aguardando Revisão)</span>;
      case 'recusado':
        return <span className="text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded text-xs font-semibold">Recusado para Correção</span>;
      default:
        return <span className="text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded text-xs font-semibold">Solicitado</span>;
    }
  };

  const handleUploadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError('');

    if (!uploadFileName.trim()) {
      setUploadError('Por favor, selecione ou informe o nome do arquivo.');
      return;
    }

    const lower = uploadFileName.toLowerCase();
    if (lower.endsWith('.exe') || lower.endsWith('.bat') || lower.endsWith('.sh') || lower.endsWith('.js')) {
      setUploadError('Extensão de arquivo não permitida por políticas de segurança. Envie apenas PDF, JPG ou PNG.');
      return;
    }

    uploadDocumentoMock(aluno.id, uploadTitle, uploadFileType, uploadFileName);
    setShowUploadModal(false);
    setUploadFileName('');
  };

  const handleSaveStudentNotes = () => {
    if (!studentNotesInput.trim()) return;
    updateProgressoEtapa(
      activeSelectedStage.id,
      stageProgress?.status || 'em_andamento',
      studentNotesInput.trim(),
      stageProgress?.evidenciaRegistrada
    );
    setStudentNotesInput('');
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      {/* Student Portal Header */}
      <header className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-4">
              <LogoBadge size="sm" showText={false} />
              <div>
                <span className="text-xs font-semibold text-amber-400 tracking-wider uppercase">
                  Portal do Aluno · Área Segura
                </span>
                <h1 className="text-lg sm:text-xl font-extrabold text-white">
                  Olá, {aluno.nome.split(' ')[0]}!
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-bold text-slate-200">{aluno.pacoteContratado}</span>
                <span className="text-[11px] text-amber-400 font-semibold">
                  {aluno.aulasRealizadas} de {aluno.totalAulasContratadas} aulas realizadas
                </span>
              </div>

              <button
                onClick={() => setRole('public')}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:text-white border border-slate-700 hover:border-slate-600 rounded-lg bg-slate-800/80 transition cursor-pointer"
                title="Encerrar sessão com segurança"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Encerrar Sessão</span>
              </button>
            </div>
          </div>

          {/* Quick Metrics Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4 border-t border-slate-800 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px]">Etapa Atual:</span>
              <span className="font-bold text-amber-300 truncate block">
                {currentStage.ordem}. {currentStage.titulo}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Próxima Aula Prática:</span>
              <span className="font-bold text-white">
                {upcomingLessons[0] ? `${upcomingLessons[0].data} às ${upcomingLessons[0].horarioInicio}` : 'Nenhuma agendada'}
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Veículo de Treinamento:</span>
              <span className="font-bold text-white">VW Gol 1.6 Power</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Instrutora Responsável:</span>
              <span className="font-bold text-amber-400">Vanessa Becegato</span>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Sub-Tabs */}
      <div className="sticky top-0 z-30 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex overflow-x-auto gap-2 py-2">
          <button
            onClick={() => setActiveTab('jornada')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'jornada'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>GPS da Habilitação</span>
          </button>

          <button
            onClick={() => setActiveTab('agenda')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'agenda'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Minha Agenda ({upcomingLessons.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('evolucao')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'evolucao'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Caderno de Evolução ({studentEvolutions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('documentos')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'documentos'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Meus Documentos ({studentDocs.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('ajuda')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition whitespace-nowrap cursor-pointer ${
              activeTab === 'ajuda'
                ? 'bg-amber-500 text-slate-950 shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Suporte & LGPD</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* TAB 1: GPS DA HABILITAÇÃO */}
        {activeTab === 'jornada' && (
          <div className="space-y-8">
            {/* Disclaimer Banner */}
            <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 sm:p-5 flex items-start gap-3">
              <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div className="space-y-1 text-xs">
                <span className="font-bold text-amber-950 block text-sm">
                  Acompanhamento Pedagógico Independente
                </span>
                <p className="text-amber-900/80 leading-relaxed">
                  O progresso aqui registrado serve para orientar seu estudo e suas aulas práticas com Vanessa Becegato. Ele não substitui a consulta aos sistemas oficiais do Detran-SP e Poupatempo.
                </p>
              </div>
            </div>

            {/* Split Layout: Steps List (Left) + Detail Card (Right) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Steps Navigator */}
              <div className="lg:col-span-5 space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-300">
                  <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wider">
                    Etapas do Processo
                  </h3>
                  <span className="text-xs text-slate-500">10 etapas oficiais</span>
                </div>

                <div className="space-y-2">
                  {etapas.map((etapa) => {
                    const isSelected = selectedEtapaId === etapa.id;
                    const prog = progressoMariana.find(p => p.etapaId === etapa.id);
                    const isCurrent = aluno.etapaAtualId === etapa.id;

                    return (
                      <button
                        key={etapa.id}
                        onClick={() => setSelectedEtapaId(etapa.id)}
                        className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between cursor-pointer ${
                          isSelected
                            ? 'bg-white border-amber-500 shadow-md ring-2 ring-amber-500/10'
                            : 'bg-white/80 border-slate-200 hover:bg-white hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0 pr-2">
                          <div
                            className={`w-8 h-8 rounded-xl font-mono text-xs font-bold flex items-center justify-center shrink-0 ${
                              prog?.status === 'confirmado_evidencia'
                                ? 'bg-emerald-100 text-emerald-800'
                                : isCurrent
                                ? 'bg-amber-400 text-slate-950 font-black'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {prog?.status === 'confirmado_evidencia' ? '✓' : etapa.ordem}
                          </div>
                          <div className="min-w-0">
                            <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                              {etapa.titulo}
                            </h4>
                            <div className="flex items-center gap-2 text-[11px] text-slate-500">
                              <span>{etapa.orgaoResponsavel}</span>
                              {isCurrent && (
                                <span className="text-amber-700 font-bold">· Etapa Atual</span>
                              )}
                            </div>
                          </div>
                        </div>

                        <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step Detail Drawer */}
              <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                      Etapa {activeSelectedStage.ordem} de {etapas.length}
                    </span>
                    <h3 className="text-xl font-extrabold text-slate-900">
                      {activeSelectedStage.titulo}
                    </h3>
                  </div>
                  <div>
                    {getStatusBadge(stageProgress?.status)}
                  </div>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Descrição do Procedimento
                  </h4>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {activeSelectedStage.descricao}
                  </p>
                </div>

                {/* Pre-requisites & Recommended Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-xs">
                    <span className="font-bold text-slate-800 block">Pré-Requisitos:</span>
                    <ul className="space-y-1 text-slate-600">
                      {activeSelectedStage.preRequisitos.map((pr, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="text-amber-500 font-bold">•</span>
                          <span>{pr}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-xs">
                    <span className="font-bold text-slate-800 block">Ações Recomendadas:</span>
                    <ul className="space-y-1 text-slate-600">
                      {activeSelectedStage.acoesRecomendadas.map((ar, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{ar}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Required Documents */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                    Documentos Necessários
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeSelectedStage.documentosNecessarios.map((doc, idx) => (
                      <span
                        key={idx}
                        className="bg-slate-100 text-slate-700 text-xs px-3 py-1.5 rounded-lg border border-slate-200"
                      >
                        {doc}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recorded Evidence / Teacher Observation */}
                {stageProgress?.evidenciaRegistrada && (
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-1.5 text-xs text-emerald-950">
                    <div className="font-bold flex items-center gap-1.5 text-emerald-800">
                      <FileCheck2 className="w-4 h-4 text-emerald-600" />
                      <span>Evidência Registrada pela Instrutora</span>
                    </div>
                    <p className="leading-relaxed">
                      {stageProgress.evidenciaRegistrada}
                    </p>
                    <div className="text-[11px] text-emerald-700 pt-1">
                      Responsável: {stageProgress.responsavelAtualizacao} · Atualizado em: {stageProgress.dataAtualizacao}
                    </div>
                  </div>
                )}

                {/* Student's Personal Notes on this Step */}
                <div className="pt-2 border-t border-slate-200 space-y-3">
                  <span className="text-xs font-bold text-slate-800 block">
                    Suas Anotações Pessoais nesta Etapa:
                  </span>
                  {stageProgress?.notasAluno ? (
                    <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-xl text-xs text-amber-950">
                      "{stageProgress.notasAluno}"
                    </div>
                  ) : (
                    <p className="text-xs text-slate-500 italic">
                      Nenhuma observação registrada por você até o momento.
                    </p>
                  )}

                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Adicione um lembrete (Ex: Exame agendado para terça às 14h)"
                      value={studentNotesInput}
                      onChange={e => setStudentNotesInput(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                    />
                    <button
                      onClick={handleSaveStudentNotes}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold cursor-pointer transition"
                    >
                      Salvar
                    </button>
                  </div>
                </div>

                {/* Official Source & Links Footer */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
                  <div className="space-y-0.5">
                    <div>Fonte de Referência: <strong>{activeSelectedStage.fonteReferencia}</strong></div>
                    <div>Última revisão do conteúdo: {activeSelectedStage.dataUltimaRevisao} ({activeSelectedStage.responsavelRevisao})</div>
                  </div>

                  <a
                    href={activeSelectedStage.linkOficial}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-bold text-amber-700 hover:text-amber-900 bg-amber-50 hover:bg-amber-100 px-3 py-2 rounded-xl transition"
                  >
                    <span>Acessar portal oficial</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MINHA AGENDA */}
        {activeTab === 'agenda' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Minha Agenda de Aulas Práticas
                </h3>
                <p className="text-xs text-slate-500">
                  Acompanhe seus horários agendados e o histórico de sessões já realizadas.
                </p>
              </div>

              <div className="text-xs text-slate-600 bg-white border border-slate-200 px-4 py-2 rounded-xl">
                Instrutora: <strong>Vanessa Becegato</strong> · Telefone: <strong>{configuracoes.telefoneComercial}</strong>
              </div>
            </div>

            {/* Upcoming Lessons */}
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                <span>Próximas Aulas Agendadas</span>
              </h4>

              {upcomingLessons.length === 0 ? (
                <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center text-xs text-slate-500">
                  Nenhuma aula agendada no momento. Fale com a instrutora para marcar novos horários.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {upcomingLessons.map(aula => (
                    <div
                      key={aula.id}
                      className="bg-white border-2 border-amber-300 rounded-2xl p-6 shadow-sm space-y-4"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-sm">
                            <Car className="w-5 h-5 text-amber-700" />
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-slate-500 block">Categoria {aula.categoria}</span>
                            <span className="text-sm font-bold text-slate-900">{aula.veiculoDescricao}</span>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 bg-amber-100 text-amber-900 font-bold text-xs rounded-lg">
                          Agendada
                        </span>
                      </div>

                      <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-2 text-slate-700 font-semibold">
                          <Calendar className="w-4 h-4 text-amber-600" />
                          <span>Data: {aula.data}</span>
                          <span className="text-slate-400">·</span>
                          <Clock className="w-4 h-4 text-amber-600" />
                          <span>Horário: {aula.horarioInicio} às {aula.horarioFim}</span>
                        </div>

                        <div className="flex items-start gap-2 text-slate-600">
                          <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                          <span>Ponto de encontro: <strong>{aula.pontoEncontro}</strong></span>
                        </div>

                        {aula.observacoesGerais && (
                          <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 text-slate-600 mt-2">
                            {aula.observacoesGerais}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Past Completed Lessons */}
            <div className="space-y-4 pt-6 border-t border-slate-300">
              <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Histórico de Aulas Concluídas</span>
              </h4>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
                      <tr>
                        <th className="px-4 py-3">Data</th>
                        <th className="px-4 py-3">Horário</th>
                        <th className="px-4 py-3">Veículo</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3">Observações Pedagógicas</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {completedLessons.map(aula => (
                        <tr key={aula.id} className="hover:bg-slate-50">
                          <td className="px-4 py-3 font-semibold text-slate-900">{aula.data}</td>
                          <td className="px-4 py-3 text-slate-600">{aula.horarioInicio} - {aula.horarioFim}</td>
                          <td className="px-4 py-3 text-slate-700">{aula.veiculoDescricao}</td>
                          <td className="px-4 py-3">
                            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                              Realizada
                            </span>
                          </td>
                          <td className="px-4 py-3 text-slate-600">{aula.observacoesGerais || '—'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CADERNO DE EVOLUÇÃO DO CONDUTOR */}
        {activeTab === 'evolucao' && (
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-slate-900 to-[#0B132B] text-white rounded-3xl p-6 sm:p-8 space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-semibold">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Metodologia Humanizada</span>
              </div>
              <h3 className="text-2xl font-extrabold tracking-tight">
                Caderno de Evolução do Condutor
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Aqui a instrutora registra factualmente as habilidades dominadas a cada aula, celebrando suas conquistas e traçando as metas da próxima sessão com total clareza.
              </p>
            </div>

            <div className="space-y-6">
              {studentEvolutions.map((item, idx) => (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-sm">
                        #{studentEvolutions.length - idx}
                      </div>
                      <div>
                        <span className="text-xs text-slate-500">Aula Prática realizada em</span>
                        <h4 className="text-base font-extrabold text-slate-900">{item.dataAula}</h4>
                      </div>
                    </div>
                    <div className="text-xs font-semibold text-slate-600 bg-slate-100 px-3 py-1.5 rounded-xl">
                      Instrutora: {item.instrutorNome}
                    </div>
                  </div>

                  {/* Skills practiced */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Habilidades e Manobras Praticadas:
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {item.habilidadesPraticadas.map((hab, i) => (
                        <span
                          key={i}
                          className="bg-slate-100 text-slate-800 text-xs px-3 py-1.5 rounded-lg border border-slate-200"
                        >
                          ✓ {hab}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights and Aspects to practice */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-1.5 text-xs text-emerald-950">
                      <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Pontos Positivos Observados:</span>
                      </span>
                      <p className="leading-relaxed text-slate-700">{item.pontosFortes}</p>
                    </div>

                    <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 space-y-1.5 text-xs text-amber-950">
                      <span className="font-bold text-amber-800 flex items-center gap-1.5">
                        <Compass className="w-4 h-4 text-amber-600" />
                        <span>Aspectos que Precisam de Prática:</span>
                      </span>
                      <p className="leading-relaxed text-slate-700">{item.aspectosParaPraticar}</p>
                    </div>
                  </div>

                  {/* Next Lesson Goal & Pedagogical Note */}
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-2 text-xs">
                    <span className="font-bold text-slate-800 block">
                      🎯 Meta para a Próxima Aula:
                    </span>
                    <p className="text-slate-700 font-medium">{item.metaProximaAula}</p>
                    {item.observacoesAluno && (
                      <p className="text-amber-900 italic pt-1 border-t border-slate-200">
                        "{item.observacoesAluno}"
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: MEUS DOCUMENTOS & CONTRATOS */}
        {activeTab === 'documentos' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Meus Documentos, Contratos e Recibos
                </h3>
                <p className="text-xs text-slate-500">
                  Acesse sua via contratual formal, comprovantes de quitação e anexe seus documentos para verificação.
                </p>
              </div>

              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold shadow-xs cursor-pointer transition"
              >
                <Upload className="w-4 h-4" />
                <span>Enviar Novo Documento</span>
              </button>
            </div>

            {/* SEÇÃO 1: CONTRATO DE PRESTAÇÃO DE SERVIÇOS */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-600" />
                <span>Contrato de Prestação de Serviços de Aulas Práticas</span>
              </h4>

              {studentContracts.length === 0 ? (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 text-xs text-slate-500 text-center">
                  Nenhum contrato gerado até o momento. A minuta será disponibilizada pela responsável.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {studentContracts.map(c => (
                    <div
                      key={c.id}
                      className="bg-white border-2 border-amber-300 rounded-2xl p-5 shadow-xs space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="font-mono font-bold text-slate-900 text-sm">{c.numeroContrato}</span>
                            <span className="text-[11px] text-slate-500 block">Versão: v{c.versaoModelo} · Gerado em: {c.dataCriacao}</span>
                          </div>
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              c.status === 'aceito_eletronicamente'
                                ? 'bg-emerald-100 text-emerald-900'
                                : c.status === 'assinado'
                                ? 'bg-blue-100 text-blue-900'
                                : 'bg-amber-100 text-amber-900'
                            }`}
                          >
                            {c.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>

                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1 text-slate-700">
                          <div><strong>Pacote:</strong> {c.pacoteNome}</div>
                          <div><strong>Carga:</strong> {c.quantidadeAulas} aulas ({c.duracaoAulaMinutos} min cada)</div>
                          <div><strong>Valor Total:</strong> R$ {c.valorTotal.toFixed(2)} ({c.formaPagamento})</div>
                        </div>

                        {c.dataAceite && (
                          <div className="text-[11px] text-emerald-800 flex items-center gap-1 font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Aceito em {c.dataAceite}</span>
                          </div>
                        )}
                      </div>

                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                        <button
                          onClick={() => setViewingContract(c)}
                          className="w-full py-2 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs cursor-pointer transition flex items-center justify-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{c.status === 'aceito_eletronicamente' ? 'Visualizar Contrato / PDF' : 'Ler e Aceitar Contrato'}</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SEÇÃO 2: RECIBOS DE PAGAMENTO */}
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <FileCheck2 className="w-4 h-4 text-emerald-600" />
                <span>Recibos de Pagamento Emitidos</span>
              </h4>

              {studentReceipts.length === 0 ? (
                <div className="bg-white p-6 rounded-2xl border border-slate-200 text-xs text-slate-500 text-center">
                  Nenhum recibo emitido ainda. Os comprovantes de quitação aparecem aqui assim que confirmados.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {studentReceipts.map(r => (
                    <div
                      key={r.id}
                      className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between">
                          <div>
                            <span className="font-mono font-bold text-emerald-800 text-sm">{r.numeroRecibo}</span>
                            <span className="text-[11px] text-slate-500 block">Emitido em: {r.dataEmissao}</span>
                          </div>
                          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-900">
                            PAGO
                          </span>
                        </div>

                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                          <div className="text-base font-black text-slate-900 font-mono">
                            R$ {r.valorRecebido.toFixed(2)}
                          </div>
                          <div className="text-slate-600 text-[11px]">Forma: {r.formaPagamento}</div>
                          <div className="text-slate-600 text-[11px] truncate">{r.servicoDescricao}</div>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-slate-100">
                        <button
                          onClick={() => setViewingReceipt(r)}
                          className="w-full py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold rounded-xl text-xs cursor-pointer transition flex items-center justify-center gap-1.5"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Visualizar / Salvar Recibo PDF</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* SEÇÃO 3: DOCUMENTOS ANEXADOS & LADV */}
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                <FileText className="w-4 h-4 text-slate-600" />
                <span>Documentos Pessoais & LADV</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {studentDocs.map(doc => (
                  <div
                    key={doc.id}
                    className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
                          <FileText className="w-5 h-5 text-amber-700" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">{doc.titulo}</h4>
                          <span className="text-[11px] text-slate-500">{doc.tipo}</span>
                        </div>
                      </div>
                      {getDocStatusBadge(doc.status)}
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                      {doc.orientacaoEnvio}
                    </p>

                    <div className="text-[11px] text-slate-500 pt-1 flex items-center justify-between border-t border-slate-100">
                      <span>Arquivo: {doc.nomeArquivo || 'Pendente'}</span>
                      <span>Revisão: {doc.revisadoPor || 'Em fila'}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upload Modal */}
            {showUploadModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
                <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-5 shadow-2xl border border-slate-200">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h4 className="text-base font-bold text-slate-900">
                      Enviar Documento
                    </h4>
                    <button
                      onClick={() => setShowUploadModal(false)}
                      className="text-slate-400 hover:text-slate-700 text-xs font-bold"
                    >
                      Fechar
                    </button>
                  </div>

                  {uploadError && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-xs">
                      {uploadError}
                    </div>
                  )}

                  <form onSubmit={handleUploadSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Tipo de Documento
                      </label>
                      <select
                        value={uploadTitle}
                        onChange={e => setUploadTitle(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none"
                      >
                        <option value="LADV — Licença de Aprendizagem de Direção">LADV — Licença de Aprendizagem</option>
                        <option value="Comprovante de Residência Atualizado">Comprovante de Residência</option>
                        <option value="Documento Oficial de Identidade (RG)">Documento de Identidade (RG / CNH Digital)</option>
                        <option value="Comprovante de Aprovação no Exame Teórico">Comprovante de Aprovação Teórica</option>
                        <option value="Outro Documento Complementar">Outro Documento Complementar</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Formato do Arquivo
                      </label>
                      <select
                        value={uploadFileType}
                        onChange={e => setUploadFileType(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none"
                      >
                        <option value="PDF">Documento PDF (.pdf)</option>
                        <option value="JPG/PNG">Imagem (.jpg / .png)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Nome do Arquivo / Simulação de Anexo
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: ladv_mariana_detran.pdf"
                        value={uploadFileName}
                        onChange={e => setUploadFileName(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none"
                      />
                      <span className="text-[10px] text-slate-500 block mt-1">
                        Formatos aceitos: PDF, PNG, JPG (máximo 5MB). Arquivos executáveis (.exe, .bat) são bloqueados.
                      </span>
                    </div>

                    <div className="pt-2 flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setShowUploadModal(false)}
                        className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold cursor-pointer transition"
                      >
                        Enviar para Revisão
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 5: AJUDA & LGPD */}
        {activeTab === 'ajuda' && (
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
              <div className="space-y-1">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                  Transparência e Seus Direitos
                </span>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Canal de Atendimento & Direitos do Aluno (LGPD)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Conforme a Lei Geral de Proteção de Dados, você tem o direito de solicitar a confirmação de tratamento, correção de dados cadastrais incorretos ou suporte pedagógico direto.
                </p>
              </div>

              {supportSent ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <h4 className="text-sm font-bold text-slate-900">Solicitação Registrada</h4>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto">
                    Sua mensagem foi enviada para a responsável. Retornaremos o contato pelo seu WhatsApp cadastrado ({aluno.telefone}).
                  </p>
                  <button
                    onClick={() => {
                      setSupportSent(false);
                      setSupportMessage('');
                    }}
                    className="text-xs text-amber-700 font-bold underline"
                  >
                    Enviar nova solicitação
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Descreva sua solicitação ou pedido de retificação de dados:
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Ex: Preciso atualizar meu número de telefone ou gostaria de agendar um simulado prático adicional."
                      value={supportMessage}
                      onChange={e => setSupportMessage(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <span className="text-[11px] text-slate-500">
                      Resposta em horário comercial: Seg a Sex das 08h às 18h.
                    </span>
                    <button
                      onClick={() => {
                        if (supportMessage.trim()) {
                          setSupportSent(true);
                        }
                      }}
                      className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold cursor-pointer transition"
                    >
                      Enviar Mensagem
                    </button>
                  </div>
                </div>
              )}

              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-slate-600">
                <div>
                  Dúvida urgente? Fale no WhatsApp oficial:
                </div>
                <a
                  href={`https://wa.me/${configuracoes.whatsappOficial.replace(/\D/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-emerald-700 hover:underline flex items-center gap-1.5"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>{configuracoes.whatsappOficial}</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Contract and Receipt Modals for Student */}
        {viewingContract && (
          <ContractViewModal
            contrato={viewingContract}
            onClose={() => setViewingContract(null)}
            isStudentView={true}
          />
        )}

        {viewingReceipt && (
          <ReceiptViewModal
            recibo={viewingReceipt}
            onClose={() => setViewingReceipt(null)}
          />
        )}
      </main>
    </div>
  );
};
