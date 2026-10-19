import React, { useState } from 'react';
import { useAppStore } from '../../services/store';
import { LogoBadge } from '../brand/LogoBadge';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Calendar,
  Car,
  FileCheck,
  Compass,
  Settings,
  ShieldAlert,
  Search,
  Plus,
  AlertTriangle,
  CheckCircle2,
  Clock,
  BookOpen,
  History,
  Phone,
  MessageCircle,
  ExternalLink,
  Archive,
  Edit,
  Save,
  X,
  ChevronRight,
  TrendingUp,
  LogOut,
  Wrench,
  Camera,
  Upload,
  Trash2,
  Image,
  FolderOpen
} from 'lucide-react';
import { DocumentManagementModule } from '../documents/DocumentManagementModule';
import { StudentProfileModal } from './StudentProfileModal';
import {
  Aluno,
  Aula,
  CategoriaCNH,
  LeadStatus,
  StatusAcompanhamento,
  StatusAula,
  StatusDocumento,
  StatusVeiculo,
  Veiculo,
  FotoGaleria
} from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    alunos,
    addAluno,
    updateAluno,
    archiveAluno,
    interessados,
    updateLeadStatus,
    aulas,
    addAula,
    updateAulaStatus,
    instrutores,
    veiculos,
    updateVeiculoStatus,
    addVeiculo,
    updateVeiculo,
    documentos,
    revisarDocumento,
    etapas,
    updateEtapa,
    evolucoes,
    addRegistroEvolucao,
    auditoria,
    configuracoes,
    updateConfiguracoes,
    galeria,
    addFotoGaleria,
    removeFotoGaleria,
    setRole
  } = useAppStore();

  const [activeModule, setActiveModule] = useState<
    'visao_geral' | 'alunos' | 'interessados' | 'agenda' | 'veiculos' | 'documentos' | 'conteudo' | 'evolucao' | 'auditoria' | 'configuracoes'
  >('visao_geral');

  // Vehicle Add / Edit state
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<Veiculo | null>(null);
  const [veicCodigo, setVeicCodigo] = useState('');
  const [veicMarcaModelo, setVeicMarcaModelo] = useState('');
  const [veicAno, setVeicAno] = useState(2023);
  const [veicPlaca, setVeicPlaca] = useState('');
  const [veicCat, setVeicCat] = useState<'A' | 'B'>('B');
  const [veicStatus, setVeicStatus] = useState<StatusVeiculo>('disponivel');
  const [veicKm, setVeicKm] = useState<number>(35000);
  const [veicProxManut, setVeicProxManut] = useState(new Date().toISOString().split('T')[0]);
  const [veicAlerta, setVeicAlerta] = useState('');

  // Module 2: Alunos search & filter
  const [alunoSearch, setAlunoSearch] = useState('');
  const [alunoFilterCat, setAlunoFilterCat] = useState<string>('ALL');
  const [showAddAlunoModal, setShowAddAlunoModal] = useState(false);
  const [newAlunoNome, setNewAlunoNome] = useState('');
  const [newAlunoEmail, setNewAlunoEmail] = useState('');
  const [newAlunoTelefone, setNewAlunoTelefone] = useState('');
  const [newAlunoCat, setNewAlunoCat] = useState<CategoriaCNH>('B');
  const [newAlunoPacote, setNewAlunoPacote] = useState('EVOLUÇÃO (10 Aulas)');
  const [newAlunoTotalAulas, setNewAlunoTotalAulas] = useState(10);
  const [newAlunoObs, setNewAlunoObs] = useState('');

  // Module 3: Interessados funnel filter
  const [leadStatusFilter, setLeadStatusFilter] = useState<LeadStatus | 'ALL'>('ALL');
  const [leadDetailNote, setLeadDetailNote] = useState<{ id: string; note: string } | null>(null);

  // Module 4: New Lesson scheduling form
  const [showNewLessonModal, setShowNewLessonModal] = useState(false);
  const [lessonStudentId, setLessonStudentId] = useState(alunos[0]?.id || '');
  const [lessonInstructorId, setLessonInstructorId] = useState(instrutores[0]?.id || '');
  const [lessonVehicleId, setLessonVehicleId] = useState(veiculos[0]?.id || '');
  const [lessonDate, setLessonDate] = useState(new Date().toISOString().split('T')[0]);
  const [lessonStartTime, setLessonStartTime] = useState('10:00');
  const [lessonEndTime, setLessonEndTime] = useState('11:00');
  const [lessonCategory, setLessonCategory] = useState<'A' | 'B'>('B');
  const [lessonMeetingPoint, setLessonMeetingPoint] = useState('Ponto Central de Encontro');
  const [lessonGeneralNotes, setLessonGeneralNotes] = useState('');
  const [schedulingError, setSchedulingError] = useState<string | null>(null);

  // Module 7: Review Document modal
  const [reviewDocModal, setReviewDocModal] = useState<{ docId: string; title: string } | null>(null);
  const [rejectionReason, setRejectionReason] = useState('');

  // Module 8: Stage Editor
  const [editingStageId, setEditingStageId] = useState<string | null>(null);
  const [stageEditTitle, setStageEditTitle] = useState('');
  const [stageEditDesc, setStageEditDesc] = useState('');
  const [stageEditUrl, setStageEditUrl] = useState('');

  // Module 9: Evolution entry modal
  const [showNewEvoModal, setShowNewEvoModal] = useState(false);
  const [evoStudentId, setEvoStudentId] = useState(alunos[0]?.id || '');
  const [evoSkills, setEvoSkills] = useState('');
  const [evoPositive, setEvoPositive] = useState('');
  const [evoImprove, setEvoImprove] = useState('');
  const [evoGoal, setEvoGoal] = useState('');
  const [evoStudentNotes, setEvoStudentNotes] = useState('');
  const [evoInternalNotes, setEvoInternalNotes] = useState('');

  // Module 11: Config form & Logo
  const [cfgWhatsapp, setCfgWhatsapp] = useState(configuracoes.whatsappOficial);
  const [cfgTelefone, setCfgTelefone] = useState(configuracoes.telefoneComercial);
  const [cfgInstagram, setCfgInstagram] = useState(configuracoes.instagram);
  const [cfgCidade, setCfgCidade] = useState(configuracoes.cidadeAtendimento);
  const [cfgAvisoLegal, setCfgAvisoLegal] = useState(configuracoes.avisoLegalDetran);
  const [cfgConferenciaData, setCfgConferenciaData] = useState(configuracoes.dataUltimaConferenciaDetran);
  const [cfgLogoUrl, setCfgLogoUrl] = useState(configuracoes.logoUrl || '');
  const [cfgSavedSuccess, setCfgSavedSuccess] = useState(false);

  // Student Profile Modal & Archive state
  const [selectedStudentForProfile, setSelectedStudentForProfile] = useState<Aluno | null>(null);
  const [studentToArchive, setStudentToArchive] = useState<Aluno | null>(null);

  // Lesson cancellation modal state
  const [cancelingLessonId, setCancelingLessonId] = useState<string | null>(null);
  const [lessonCancelReason, setLessonCancelReason] = useState('');

  // Gallery photo modal state
  const [showAddPhotoModal, setShowAddPhotoModal] = useState(false);
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoDesc, setNewPhotoDesc] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoCat, setNewPhotoCat] = useState<'veiculos' | 'aulas' | 'pista' | 'instrutora'>('veiculos');

  // Computed metrics
  const activeAlunos = alunos.filter(a => a.statusProcesso !== 'suspenso');
  const todayStr = new Date().toISOString().split('T')[0];
  const lessonsToday = aulas.filter(a => a.data === todayStr && a.status === 'agendada');
  const pendingDocs = documentos.filter(d => d.status === 'enviado' || d.status === 'solicitado');
  const newLeads = interessados.filter(l => l.status === 'novo');
  const vehiclesInMaintenance = veiculos.filter(v => v.status === 'manutencao');

  // Handle Add Aluno
  const handleCreateAluno = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlunoNome.trim()) return;

    addAluno({
      nome: newAlunoNome.trim(),
      email: newAlunoEmail.trim(),
      telefone: newAlunoTelefone.trim(),
      categoria: newAlunoCat,
      statusProcesso: 'em_formacao',
      etapaAtualId: 'etapa-07',
      pacoteContratado: newAlunoPacote,
      totalAulasContratadas: newAlunoTotalAulas,
      aulasRealizadas: 0,
      observacoes: newAlunoObs.trim(),
      comunicacaoWhatsapp: true,
      comunicacaoEmail: true
    });

    setShowAddAlunoModal(false);
    setNewAlunoNome('');
    setNewAlunoEmail('');
    setNewAlunoTelefone('');
    setNewAlunoObs('');
  };

  // Handle Schedule Lesson with conflict checking
  const handleScheduleLesson = (e: React.FormEvent) => {
    e.preventDefault();
    setSchedulingError(null);

    const studentObj = alunos.find(a => a.id === lessonStudentId);
    const instrutorObj = instrutores.find(i => i.id === lessonInstructorId);
    const veiculoObj = veiculos.find(v => v.id === lessonVehicleId);

    if (!studentObj || !instrutorObj || !veiculoObj) {
      setSchedulingError('Selecione todos os dados obrigatórios da aula.');
      return;
    }

    const res = addAula({
      alunoId: studentObj.id,
      alunoNome: studentObj.nome,
      instrutorId: instrutorObj.id,
      instrutorNome: instrutorObj.nome,
      veiculoId: veiculoObj.id,
      veiculoDescricao: `${veiculoObj.marcaModelo} (${veiculoObj.codigoInterno})`,
      data: lessonDate,
      horarioInicio: lessonStartTime,
      horarioFim: lessonEndTime,
      categoria: lessonCategory,
      pontoEncontro: lessonMeetingPoint,
      observacoesGerais: lessonGeneralNotes
    });

    if (!res.success) {
      setSchedulingError(res.error || 'Erro ao agendar aula.');
      return;
    }

    setShowNewLessonModal(false);
    setLessonGeneralNotes('');
  };

  // Handle Add Evolution
  const handleCreateEvolution = (e: React.FormEvent) => {
    e.preventDefault();
    const st = alunos.find(a => a.id === evoStudentId);
    if (!st) return;

    addRegistroEvolucao({
      alunoId: st.id,
      dataAula: new Date().toISOString().split('T')[0],
      instrutorId: instrutores[0]?.id || 'inst-01',
      instrutorNome: instrutores[0]?.nome || 'Vanessa Becegato',
      habilidadesPraticadas: evoSkills.split(',').map(s => s.trim()).filter(Boolean),
      pontosFortes: evoPositive,
      aspectosParaPraticar: evoImprove,
      metaProximaAula: evoGoal,
      observacoesAluno: evoStudentNotes,
      observacoesInternas: evoInternalNotes
    });

    setShowNewEvoModal(false);
    setEvoSkills('');
    setEvoPositive('');
    setEvoImprove('');
    setEvoGoal('');
    setEvoStudentNotes('');
    setEvoInternalNotes('');
  };

  // Handle Vehicle Add & Edit
  const handleOpenAddVehicle = () => {
    setVeicCodigo(`VEI-0${veiculos.length + 1}`);
    setVeicMarcaModelo('');
    setVeicAno(new Date().getFullYear());
    setVeicPlaca('');
    setVeicCat('B');
    setVeicStatus('disponivel');
    setVeicKm(30000);
    setVeicProxManut(new Date().toISOString().split('T')[0]);
    setVeicAlerta('');
    setShowAddVehicleModal(true);
  };

  const handleOpenEditVehicle = (v: Veiculo) => {
    setEditingVehicle(v);
    setVeicCodigo(v.codigoInterno);
    setVeicMarcaModelo(v.marcaModelo);
    setVeicAno(v.ano);
    setVeicPlaca(v.placaMascarada);
    setVeicCat(v.categoria);
    setVeicStatus(v.status);
    setVeicKm(v.quilometragem || 0);
    setVeicProxManut(v.proximaManutencao);
    setVeicAlerta(v.alertaManutencao || '');
  };

  const handleSaveNewVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!veicMarcaModelo.trim()) return;

    addVeiculo({
      codigoInterno: veicCodigo.trim() || `VEI-${Date.now().toString().slice(-3)}`,
      marcaModelo: veicMarcaModelo.trim(),
      ano: Number(veicAno) || new Date().getFullYear(),
      placaMascarada: veicPlaca.trim() || 'BRA-***9',
      categoria: veicCat,
      status: veicStatus,
      quilometragem: Number(veicKm) || 0,
      proximaManutencao: veicProxManut,
      alertaManutencao: veicAlerta.trim() || undefined,
      ativo: true
    });

    setShowAddVehicleModal(false);
  };

  const handleSaveEditVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingVehicle) return;

    updateVeiculo(editingVehicle.id, {
      codigoInterno: veicCodigo.trim(),
      marcaModelo: veicMarcaModelo.trim(),
      ano: Number(veicAno),
      placaMascarada: veicPlaca.trim(),
      categoria: veicCat,
      status: veicStatus,
      quilometragem: Number(veicKm),
      proximaManutencao: veicProxManut,
      alertaManutencao: veicAlerta.trim() || undefined
    });

    setEditingVehicle(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 flex flex-col lg:flex-row">
      {/* Sidebar Navigation (Desktop) */}
      <aside className="w-full lg:w-64 bg-slate-900 text-slate-300 border-r border-slate-800 shrink-0">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <LogoBadge size="sm" showText={true} className="[&_span]:text-white" />
        </div>

        <div className="p-3">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest px-3 py-2">
            Módulos de Gestão
          </div>

          <nav className="space-y-1">
            <button
              onClick={() => setActiveModule('visao_geral')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeModule === 'visao_geral'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Visão Geral</span>
            </button>

            <button
              onClick={() => setActiveModule('alunos')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeModule === 'alunos'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>Alunos</span>
              </div>
              <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md">
                {activeAlunos.length}
              </span>
            </button>

            <button
              onClick={() => setActiveModule('interessados')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeModule === 'interessados'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <TrendingUp className="w-4 h-4" />
                <span>Interessados (Leads)</span>
              </div>
              {newLeads.length > 0 && (
                <span className="text-[11px] bg-amber-400 text-slate-950 font-bold px-2 py-0.5 rounded-md">
                  {newLeads.length} novos
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveModule('agenda')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeModule === 'agenda'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4" />
                <span>Agenda & Aulas</span>
              </div>
              <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md">
                {aulas.filter(a => a.status === 'agendada').length}
              </span>
            </button>

            <button
              onClick={() => setActiveModule('evolucao')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeModule === 'evolucao'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Caderno de Evolução</span>
            </button>

            <button
              onClick={() => setActiveModule('veiculos')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeModule === 'veiculos'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Car className="w-4 h-4" />
                <span>Frota de Veículos</span>
              </div>
              <span className="text-[11px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded-md">
                {veiculos.length}
              </span>
            </button>

            <button
              onClick={() => setActiveModule('documentos')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeModule === 'documentos'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <FileCheck className="w-4 h-4" />
                <span>Gestão Documental</span>
              </div>
              {pendingDocs.length > 0 && (
                <span className="text-[11px] bg-rose-500 text-white font-bold px-2 py-0.5 rounded-md">
                  {pendingDocs.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveModule('conteudo')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeModule === 'conteudo'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>Conteúdo Oficial Detran</span>
            </button>

            <button
              onClick={() => setActiveModule('auditoria')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeModule === 'auditoria'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <History className="w-4 h-4" />
              <span>Auditoria de Operações</span>
            </button>

            <button
              onClick={() => setActiveModule('configuracoes')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                activeModule === 'configuracoes'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Configurações</span>
            </button>
          </nav>
        </div>

        <div className="p-4 mt-auto border-t border-slate-800">
          <button
            onClick={() => setRole('public')}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 rounded-xl hover:bg-slate-700 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Voltar ao Site Público</span>
          </button>
        </div>
      </aside>

      {/* Main Administrative Workspace */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 capitalize">
              {activeModule === 'visao_geral' && 'Visão Geral Operacional'}
              {activeModule === 'alunos' && 'Gestão de Alunos'}
              {activeModule === 'interessados' && 'Funil de Interessados (Leads)'}
              {activeModule === 'agenda' && 'Agenda e Agendamento de Aulas'}
              {activeModule === 'evolucao' && 'Caderno de Evolução do Condutor'}
              {activeModule === 'veiculos' && 'Frota de Veículos e Manutenções'}
              {activeModule === 'documentos' && 'Conferência e Gestão Documental'}
              {activeModule === 'conteudo' && 'Conteúdo Oficial e Links da Jornada'}
              {activeModule === 'auditoria' && 'Registro de Auditoria e Segurança'}
              {activeModule === 'configuracoes' && 'Configurações da Plataforma'}
            </h2>
            <p className="text-xs text-slate-500">
              Ambiente de administração e acompanhamento · Vanessa Becegato
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-600 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
              Usuário: <strong>Vanessa Becegato (Admin)</strong>
            </span>
          </div>
        </header>

        <main className="p-6 space-y-6">
          {/* MÓDULO 1: VISÃO GERAL */}
          {activeModule === 'visao_geral' && (
            <div className="space-y-6">
              {/* Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                    <span>Alunos em Formação</span>
                    <Users className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-2xl font-black text-slate-900">
                    {activeAlunos.length}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Acompanhamento ativo de aulas
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                    <span>Novos Interessados</span>
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-black text-slate-900">
                    {newLeads.length}
                  </div>
                  <div className="text-[11px] text-emerald-700 font-medium">
                    {interessados.length} contatos registrados no funil
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                    <span>Aulas Agendadas</span>
                    <Calendar className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-2xl font-black text-slate-900">
                    {aulas.filter(a => a.status === 'agendada').length}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {lessonsToday.length} aula(s) programada(s) para hoje
                  </div>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
                    <span>Documentos para Revisar</span>
                    <FileCheck className="w-4 h-4 text-rose-600" />
                  </div>
                  <div className="text-2xl font-black text-slate-900">
                    {pendingDocs.length}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    LADV e comprovantes enviados
                  </div>
                </div>
              </div>

              {/* Maintenance Alerts Banner if any */}
              {vehiclesInMaintenance.length > 0 && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Wrench className="w-5 h-5 text-amber-700" />
                    <div>
                      <h4 className="text-sm font-bold text-amber-950">Aviso de Manutenção de Frota</h4>
                      <p className="text-xs text-amber-900">
                        {vehiclesInMaintenance.map(v => `${v.marcaModelo} (${v.codigoInterno})`).join(', ')} em manutenção preventiva. O sistema bloqueia agendamentos automáticos neste veículo.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick Actions & Recent Activity Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Today's Lessons & Upcoming */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                      Aulas Programadas
                    </h3>
                    <button
                      onClick={() => setShowNewLessonModal(true)}
                      className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Agendar Aula</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {aulas.slice(0, 4).map(aula => (
                      <div
                        key={aula.id}
                        className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                      >
                        <div className="space-y-0.5">
                          <span className="font-bold text-slate-900">{aula.alunoNome}</span>
                          <div className="text-slate-500 flex items-center gap-2">
                            <span>{aula.data}</span>
                            <span>•</span>
                            <span>{aula.horarioInicio} - {aula.horarioFim}</span>
                            <span>•</span>
                            <span>{aula.veiculoDescricao}</span>
                          </div>
                        </div>
                        <span
                          className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                            aula.status === 'agendada'
                              ? 'bg-amber-100 text-amber-900'
                              : aula.status === 'realizada'
                              ? 'bg-emerald-100 text-emerald-900'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {aula.status.toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Leads / Contacts */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                      Interessados Recentes
                    </h3>
                    <button
                      onClick={() => setActiveModule('interessados')}
                      className="text-xs font-bold text-amber-700 hover:text-amber-800"
                    >
                      Ver todos
                    </button>
                  </div>

                  <div className="space-y-3">
                    {interessados.slice(0, 4).map(lead => (
                      <div
                        key={lead.id}
                        className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs"
                      >
                        <div className="space-y-0.5">
                          <span className="font-bold text-slate-900">{lead.nome}</span>
                          <div className="text-slate-500">
                            {lead.telefone} · {lead.servicoInteresse}
                          </div>
                        </div>
                        <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-slate-200 text-slate-800">
                          {lead.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* MÓDULO 2: GESTÃO DE ALUNOS */}
          {activeModule === 'alunos' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3 flex-1 max-w-md">
                  <div className="relative w-full">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Pesquisar por nome ou telefone..."
                      value={alunoSearch}
                      onChange={e => setAlunoSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20"
                    />
                  </div>

                  <select
                    value={alunoFilterCat}
                    onChange={e => setAlunoFilterCat(e.target.value)}
                    className="px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none"
                  >
                    <option value="ALL">Todas Categorias</option>
                    <option value="B">Carro (B)</option>
                    <option value="A">Moto (A)</option>
                    <option value="AB">Carro/Moto (AB)</option>
                  </select>
                </div>

                <button
                  onClick={() => setShowAddAlunoModal(true)}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold cursor-pointer transition shadow-xs"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Cadastrar Aluno</span>
                </button>
              </div>

              {/* Table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
                      <tr>
                        <th className="px-4 py-3">Aluno</th>
                        <th className="px-4 py-3">Contato</th>
                        <th className="px-4 py-3">Cat.</th>
                        <th className="px-4 py-3">Pacote</th>
                        <th className="px-4 py-3">Aulas Realizadas</th>
                        <th className="px-4 py-3">Situação</th>
                        <th className="px-4 py-3 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {alunos
                        .filter(a =>
                          alunoFilterCat === 'ALL' ? true : a.categoria === alunoFilterCat
                        )
                        .filter(a =>
                          alunoSearch
                            ? a.nome.toLowerCase().includes(alunoSearch.toLowerCase()) ||
                              a.telefone.includes(alunoSearch)
                            : true
                        )
                        .map(aluno => (
                          <tr key={aluno.id} className="hover:bg-slate-50 transition">
                            <td className="px-4 py-3">
                              <button
                                onClick={() => setSelectedStudentForProfile(aluno)}
                                className="font-bold text-slate-900 hover:text-amber-700 text-left cursor-pointer transition block"
                                title="Abrir Perfil e Documentos do Aluno"
                              >
                                {aluno.nome}
                              </button>
                              <span className="text-[11px] text-slate-500">Desde: {aluno.dataMatricula}</span>
                            </td>
                            <td className="px-4 py-3 text-slate-600">
                              <div>{aluno.telefone}</div>
                              <div className="text-[10px] text-slate-500">{aluno.email}</div>
                            </td>
                            <td className="px-4 py-3">
                              <span className="px-2 py-0.5 font-bold rounded bg-slate-100 text-slate-800">
                                {aluno.categoria}
                              </span>
                            </td>
                            <td className="px-4 py-3 font-medium text-slate-800">
                              {aluno.pacoteContratado}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() =>
                                    updateAluno(aluno.id, {
                                      aulasRealizadas: Math.max(0, aluno.aulasRealizadas - 1)
                                    })
                                  }
                                  title="Diminuir aula"
                                  className="w-5 h-5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs cursor-pointer"
                                >
                                  -
                                </button>
                                <span className="font-bold text-amber-700 text-xs px-1">
                                  {aluno.aulasRealizadas}/{aluno.totalAulasContratadas}
                                </span>
                                <button
                                  onClick={() =>
                                    updateAluno(aluno.id, {
                                      aulasRealizadas: Math.min(
                                        aluno.totalAulasContratadas,
                                        aluno.aulasRealizadas + 1
                                      )
                                    })
                                  }
                                  title="Concluir mais 1 aula"
                                  className="w-5 h-5 rounded bg-amber-100 hover:bg-amber-200 text-amber-900 flex items-center justify-center font-bold text-xs cursor-pointer"
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td className="px-4 py-3">
                              <span
                                className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                                  aluno.statusProcesso === 'em_formacao'
                                    ? 'bg-amber-100 text-amber-900'
                                    : aluno.statusProcesso === 'aguardando_exame'
                                    ? 'bg-blue-100 text-blue-900'
                                    : 'bg-slate-200 text-slate-700'
                                }`}
                              >
                                {aluno.statusProcesso.replace('_', ' ').toUpperCase()}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-right space-x-2">
                              <button
                                onClick={() => setSelectedStudentForProfile(aluno)}
                                className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs cursor-pointer transition shadow-2xs"
                              >
                                Perfil & Docs
                              </button>
                              <button
                                onClick={() => setStudentToArchive(aluno)}
                                className="text-slate-400 hover:text-rose-600 cursor-pointer p-1"
                                title="Arquivar aluno"
                              >
                                <Archive className="w-3.5 h-3.5 inline" />
                              </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Add Aluno Modal */}
              {showAddAlunoModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
                  <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h4 className="text-base font-bold text-slate-900">Cadastrar Novo Aluno</h4>
                      <button onClick={() => setShowAddAlunoModal(false)} className="text-slate-400 hover:text-slate-700">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <form onSubmit={handleCreateAluno} className="space-y-3 text-xs">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Nome Completo *</label>
                        <input
                          type="text"
                          required
                          value={newAlunoNome}
                          onChange={e => setNewAlunoNome(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Telefone / WhatsApp *</label>
                          <input
                            type="text"
                            required
                            value={newAlunoTelefone}
                            onChange={e => setNewAlunoTelefone(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">E-mail</label>
                          <input
                            type="email"
                            value={newAlunoEmail}
                            onChange={e => setNewAlunoEmail(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Categoria</label>
                          <select
                            value={newAlunoCat}
                            onChange={e => setNewAlunoCat(e.target.value as CategoriaCNH)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                          >
                            <option value="B">Carro (B)</option>
                            <option value="A">Moto (A)</option>
                            <option value="AB">Carro e Moto (AB)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Total de Aulas Contratadas</label>
                          <input
                            type="number"
                            min={1}
                            value={newAlunoTotalAulas}
                            onChange={e => setNewAlunoTotalAulas(Number(e.target.value))}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Pacote Contratado</label>
                        <select
                          value={newAlunoPacote}
                          onChange={e => setNewAlunoPacote(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                        >
                          <option value="ALINHAMENTO (2 Aulas)">ALINHAMENTO (2 Aulas)</option>
                          <option value="NOÇÃO (5 Aulas)">NOÇÃO (5 Aulas)</option>
                          <option value="EVOLUÇÃO (10 Aulas)">EVOLUÇÃO (10 Aulas)</option>
                          <option value="APRENDIZ (15 Aulas)">APRENDIZ (15 Aulas)</option>
                          <option value="SUPERAÇÃO (20 Aulas)">SUPERAÇÃO (20 Aulas)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Observações Iniciais</label>
                        <textarea
                          rows={2}
                          value={newAlunoObs}
                          onChange={e => setNewAlunoObs(e.target.value)}
                          placeholder="Ex: Medo de rampa, histórico de reprovações anteriores, etc."
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                        />
                      </div>

                      <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => setShowAddAlunoModal(false)}
                          className="px-4 py-2 text-slate-600 font-semibold"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl"
                        >
                          Salvar Aluno
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MÓDULO 3: FUNIL DE INTERESSADOS */}
          {activeModule === 'interessados' && (
            <div className="space-y-6">
              {/* Funnel Tabs */}
              <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
                {[
                  { id: 'ALL', label: 'Todos' },
                  { id: 'novo', label: 'Novo Contato' },
                  { id: 'primeiro_contato', label: 'Primeiro Atendimento' },
                  { id: 'interessado', label: 'Interessado' },
                  { id: 'em_negociacao', label: 'Em Negociação' },
                  { id: 'convertido', label: 'Convertido em Aluno' },
                  { id: 'sem_continuidade', label: 'Sem Continuidade' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setLeadStatusFilter(tab.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition ${
                      leadStatusFilter === tab.id
                        ? 'bg-amber-500 text-slate-950 shadow-xs'
                        : 'bg-white text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Leads List */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {interessados
                  .filter(l => (leadStatusFilter === 'ALL' ? true : l.status === leadStatusFilter))
                  .map(lead => {
                    const cleanPhone = lead.telefone.replace(/\D/g, '');
                    const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
                      `Olá, ${lead.nome}! Sou a Vanessa Becegato. Vi que você entrou em contato sobre ${lead.servicoInteresse}. Como posso te ajudar?`
                    )}`;

                    return (
                      <div
                        key={lead.id}
                        className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col justify-between space-y-4"
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-sm font-bold text-slate-900">{lead.nome}</h4>
                              <span className="text-[11px] text-slate-500">
                                {lead.dataCriacao} · {lead.origem}
                              </span>
                            </div>
                            <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-slate-100 text-slate-800">
                              {lead.categoriaDesejada}
                            </span>
                          </div>

                          <div className="space-y-1.5 text-xs text-slate-600">
                            <div>
                              <strong>Interesse:</strong> {lead.servicoInteresse}
                            </div>
                            <div>
                              <strong>Horário Preferencial:</strong> {lead.horarioPreferencial || 'Não informado'}
                            </div>
                            {lead.mensagem && (
                              <div className="p-2.5 bg-slate-50 rounded-xl text-slate-700 italic border border-slate-100">
                                "{lead.mensagem}"
                              </div>
                            )}
                            {lead.notasAtendimento && (
                              <div className="p-2.5 bg-amber-50/80 rounded-xl text-amber-950 text-[11px] border border-amber-200">
                                <strong>Nota interna:</strong> {lead.notasAtendimento}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="pt-3 border-t border-slate-100 space-y-2">
                          <div className="flex items-center justify-between gap-2">
                            <select
                              value={lead.status}
                              onChange={e => updateLeadStatus(lead.id, e.target.value as LeadStatus)}
                              className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-2 py-1 font-semibold text-slate-800 focus:outline-none"
                            >
                              <option value="novo">Novo</option>
                              <option value="primeiro_contato">Primeiro Atendimento</option>
                              <option value="aguardando_resposta">Aguardando Resposta</option>
                              <option value="interessado">Interessado</option>
                              <option value="em_negociacao">Em Negociação</option>
                              <option value="convertido">Convertido em Aluno</option>
                              <option value="sem_continuidade">Sem Continuidade</option>
                            </select>

                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>WhatsApp</span>
                            </a>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* MÓDULO 4: AGENDA & AULAS (Com Prevenção Rigorosa de Conflitos) */}
          {activeModule === 'agenda' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Aulas Práticas e Prevenção de Conflitos
                  </h3>
                  <p className="text-xs text-slate-500">
                    O sistema valida sobreposição de horários para o instrutor e para o veículo antes de confirmar qualquer agendamento.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setSchedulingError(null);
                    setShowNewLessonModal(true);
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold cursor-pointer transition shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Nova Aula Prática</span>
                </button>
              </div>

              {/* Lessons Table */}
              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
                      <tr>
                        <th className="px-4 py-3">Data & Horário</th>
                        <th className="px-4 py-3">Aluno</th>
                        <th className="px-4 py-3">Instrutor</th>
                        <th className="px-4 py-3">Veículo</th>
                        <th className="px-4 py-3">Ponto de Encontro</th>
                        <th className="px-4 py-3">Status</th>
                        <th className="px-4 py-3 text-right">Alterar Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {aulas.map(aula => (
                        <tr key={aula.id} className="hover:bg-slate-50">
                          <td className="px-4 py-3 font-semibold text-slate-900">
                            <div>{aula.data}</div>
                            <div className="text-slate-500 font-mono text-[11px]">
                              {aula.horarioInicio} - {aula.horarioFim}
                            </div>
                          </td>
                          <td className="px-4 py-3 font-bold text-slate-900">{aula.alunoNome}</td>
                          <td className="px-4 py-3 text-slate-700">{aula.instrutorNome}</td>
                          <td className="px-4 py-3 text-slate-700">{aula.veiculoDescricao}</td>
                          <td className="px-4 py-3 text-slate-600 max-w-xs truncate">{aula.pontoEncontro}</td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                                aula.status === 'agendada'
                                  ? 'bg-amber-100 text-amber-900'
                                  : aula.status === 'realizada'
                                  ? 'bg-emerald-100 text-emerald-900'
                                  : 'bg-rose-100 text-rose-900'
                              }`}
                            >
                              {aula.status.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right space-x-1.5">
                            {aula.status === 'agendada' && (
                              <>
                                <button
                                  onClick={() => updateAulaStatus(aula.id, 'realizada')}
                                  className="text-emerald-700 hover:text-emerald-900 font-bold"
                                >
                                  Concluir
                                </button>
                                <span className="text-slate-300">|</span>
                                <button
                                  onClick={() => {
                                    setCancelingLessonId(aula.id);
                                    setLessonCancelReason('');
                                  }}
                                  className="text-rose-600 hover:text-rose-800 font-medium cursor-pointer"
                                >
                                  Cancelar
                                </button>
                              </>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Schedule Lesson Modal */}
              {showNewLessonModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
                  <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h4 className="text-base font-bold text-slate-900">Agendar Nova Aula Prática</h4>
                      <button onClick={() => setShowNewLessonModal(false)} className="text-slate-400 hover:text-slate-700">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {schedulingError && (
                      <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 shrink-0" />
                        <span>{schedulingError}</span>
                      </div>
                    )}

                    <form onSubmit={handleScheduleLesson} className="space-y-3 text-xs">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Selecione o Aluno *</label>
                        <select
                          value={lessonStudentId}
                          onChange={e => setLessonStudentId(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                        >
                          {alunos.map(a => (
                            <option key={a.id} value={a.id}>
                              {a.nome} (Cat. {a.categoria} - {a.pacoteContratado})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Instrutor *</label>
                          <select
                            value={lessonInstructorId}
                            onChange={e => setLessonInstructorId(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                          >
                            {instrutores.map(i => (
                              <option key={i.id} value={i.id}>
                                {i.nome}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Veículo de Instrução *</label>
                          <select
                            value={lessonVehicleId}
                            onChange={e => setLessonVehicleId(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                          >
                            {veiculos.map(v => (
                              <option key={v.id} value={v.id}>
                                {v.marcaModelo} ({v.codigoInterno}) - {v.status}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Data *</label>
                          <input
                            type="date"
                            required
                            value={lessonDate}
                            onChange={e => setLessonDate(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Início *</label>
                          <input
                            type="time"
                            required
                            value={lessonStartTime}
                            onChange={e => setLessonStartTime(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Término *</label>
                          <input
                            type="time"
                            required
                            value={lessonEndTime}
                            onChange={e => setLessonEndTime(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Ponto de Encontro / Local de Início</label>
                        <input
                          type="text"
                          value={lessonMeetingPoint}
                          onChange={e => setLessonMeetingPoint(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Objetivo Pedagógico / Observações</label>
                        <textarea
                          rows={2}
                          value={lessonGeneralNotes}
                          onChange={e => setLessonGeneralNotes(e.target.value)}
                          placeholder="Ex: Treino de baliza e arrancada em aclive."
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                        />
                      </div>

                      <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => setShowNewLessonModal(false)}
                          className="px-4 py-2 text-slate-600 font-semibold"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl cursor-pointer"
                        >
                          Verificar e Agendar
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MÓDULO 5: CADERNO DE EVOLUÇÃO */}
          {activeModule === 'evolucao' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Caderno de Evolução do Condutor
                  </h3>
                  <p className="text-xs text-slate-500">
                    Registros pedagógicos factuais visíveis ao aluno e notas internas confidenciais da equipe.
                  </p>
                </div>

                <button
                  onClick={() => setShowNewEvoModal(true)}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold cursor-pointer transition shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Novo Registro de Evolução</span>
                </button>
              </div>

              <div className="space-y-4">
                {evolucoes.map(evo => {
                  const student = alunos.find(a => a.id === evo.alunoId);
                  return (
                    <div key={evo.id} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                        <div>
                          <span className="text-xs text-slate-500">Aluno:</span>
                          <h4 className="text-sm font-bold text-slate-900">{student?.nome || 'Aluno'}</h4>
                        </div>
                        <div className="text-xs text-slate-600">
                          Aula do dia: <strong>{evo.dataAula}</strong> · Instrutor: <strong>{evo.instrutorNome}</strong>
                        </div>
                      </div>

                      <div className="text-xs space-y-2">
                        <div>
                          <strong className="text-slate-800">Habilidades Praticadas:</strong>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            {evo.habilidadesPraticadas.map((h, i) => (
                              <span key={i} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px]">
                                {h}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                          <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 text-emerald-950">
                            <strong>Pontos Positivos:</strong> {evo.pontosFortes}
                          </div>
                          <div className="bg-amber-50 p-3 rounded-xl border border-amber-100 text-amber-950">
                            <strong>A Praticar:</strong> {evo.aspectosParaPraticar}
                          </div>
                        </div>

                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                          <strong>Meta Próxima Sessão:</strong> {evo.metaProximaAula}
                        </div>

                        {evo.observacoesInternas && (
                          <div className="bg-purple-50 p-3 rounded-xl border border-purple-200 text-purple-950 text-[11px]">
                            <strong>🔒 Nota Interna Confidencial (Não visível ao aluno):</strong> {evo.observacoesInternas}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* New Evolution Modal */}
              {showNewEvoModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
                  <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h4 className="text-base font-bold text-slate-900">Registrar Evolução Pedagógica</h4>
                      <button onClick={() => setShowNewEvoModal(false)} className="text-slate-400 hover:text-slate-700">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <form onSubmit={handleCreateEvolution} className="space-y-3 text-xs">
                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Aluno *</label>
                        <select
                          value={evoStudentId}
                          onChange={e => setEvoStudentId(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                        >
                          {alunos.map(a => (
                            <option key={a.id} value={a.id}>
                              {a.nome}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Habilidades Praticadas (separadas por vírgula) *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: Ponto de embreagem, baliza de ré, rotatória"
                          value={evoSkills}
                          onChange={e => setEvoSkills(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Pontos Fortes *</label>
                          <textarea
                            rows={2}
                            required
                            placeholder="O que o aluno executou bem"
                            value={evoPositive}
                            onChange={e => setEvoPositive(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Aspectos a Praticar *</label>
                          <textarea
                            rows={2}
                            required
                            placeholder="Pontos de melhoria"
                            value={evoImprove}
                            onChange={e => setEvoImprove(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Meta para a Próxima Aula *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: Treino em aclive acentuado e tempo regulamentar"
                          value={evoGoal}
                          onChange={e => setEvoGoal(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Mensagem de Apoio ao Aluno</label>
                        <input
                          type="text"
                          placeholder="Ex: Excelente avanço hoje! Mantenha a calma na hora de parar."
                          value={evoStudentNotes}
                          onChange={e => setEvoStudentNotes(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Nota Interna (Confidencial equipe)</label>
                        <input
                          type="text"
                          placeholder="Ex: Notado nervosismo com buzinas; focar em isolamento acústico emocional."
                          value={evoInternalNotes}
                          onChange={e => setEvoInternalNotes(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                        />
                      </div>

                      <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => setShowNewEvoModal(false)}
                          className="px-4 py-2 text-slate-600 font-semibold"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl"
                        >
                          Salvar Registro
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MÓDULO 6: FROTA DE VEÍCULOS */}
          {activeModule === 'veiculos' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Frota de Veículos de Treinamento
                  </h3>
                  <p className="text-xs text-slate-500">
                    Controle de disponibilidade operacional, cadastro, edição e alertas preventivos.
                  </p>
                </div>

                <button
                  onClick={handleOpenAddVehicle}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold cursor-pointer transition shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  <span>Cadastrar Novo Veículo</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {veiculos.map(veic => (
                  <div key={veic.id} className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-900 font-bold">
                            <Car className="w-6 h-6 text-amber-700" />
                          </div>
                          <div>
                            <h4 className="text-base font-bold text-slate-900">{veic.marcaModelo}</h4>
                            <span className="text-xs text-slate-500 font-mono">
                              Código: {veic.codigoInterno} · Placa: {veic.placaMascarada}
                            </span>
                          </div>
                        </div>
                        <span
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                            veic.status === 'disponivel'
                              ? 'bg-emerald-100 text-emerald-900'
                              : veic.status === 'manutencao'
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-rose-100 text-rose-900'
                          }`}
                        >
                          {veic.status.toUpperCase()}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200">
                        <div>
                          <span className="text-slate-500 block">Ano de Fabricação:</span>
                          <strong className="text-slate-800">{veic.ano}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Quilometragem:</span>
                          <strong className="text-slate-800">{veic.quilometragem?.toLocaleString('pt-BR')} km</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Próxima Manutenção:</span>
                          <strong className="text-slate-800">{veic.proximaManutencao}</strong>
                        </div>
                        <div>
                          <span className="text-slate-500 block">Categoria:</span>
                          <strong className="text-slate-800">Categoria {veic.categoria}</strong>
                        </div>
                      </div>

                      {veic.alertaManutencao && (
                        <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 text-xs flex items-start gap-2">
                          <Wrench className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                          <div>
                            <strong>Alerta de Manutenção:</strong> {veic.alertaManutencao}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-500 font-medium">Status:</span>
                        <select
                          value={veic.status}
                          onChange={e => updateVeiculoStatus(veic.id, e.target.value as StatusVeiculo)}
                          className="text-xs bg-white border border-slate-300 rounded-lg px-2 py-1 font-semibold text-slate-800"
                        >
                          <option value="disponivel">Disponível</option>
                          <option value="em_uso">Em Uso</option>
                          <option value="manutencao">Em Manutenção</option>
                          <option value="indisponivel">Indisponível</option>
                        </select>
                      </div>

                      <button
                        onClick={() => handleOpenEditVehicle(veic)}
                        className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold cursor-pointer transition flex items-center gap-1.5"
                      >
                        <Edit className="w-3.5 h-3.5" />
                        <span>Editar Dados</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Modal: Cadastrar Novo Veículo */}
              {showAddVehicleModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
                  <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h4 className="text-base font-bold text-slate-900">Cadastrar Novo Veículo</h4>
                      <button onClick={() => setShowAddVehicleModal(false)} className="text-slate-400 hover:text-slate-700">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveNewVehicle} className="space-y-3 text-xs">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Código Interno *</label>
                          <input
                            type="text"
                            required
                            placeholder="Ex: CAR-02"
                            value={veicCodigo}
                            onChange={e => setVeicCodigo(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Categoria *</label>
                          <select
                            value={veicCat}
                            onChange={e => setVeicCat(e.target.value as 'A' | 'B')}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                          >
                            <option value="B">Carro (Categoria B)</option>
                            <option value="A">Moto (Categoria A)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Marca e Modelo *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ex: Volkswagen Gol Power 1.6 ou Fiat Mobi"
                          value={veicMarcaModelo}
                          onChange={e => setVeicMarcaModelo(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Ano de Fabricação</label>
                          <input
                            type="number"
                            value={veicAno}
                            onChange={e => setVeicAno(Number(e.target.value))}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Placa (visível ou mascarada)</label>
                          <input
                            type="text"
                            placeholder="Ex: BRA-***8"
                            value={veicPlaca}
                            onChange={e => setVeicPlaca(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Quilometragem (km)</label>
                          <input
                            type="number"
                            value={veicKm}
                            onChange={e => setVeicKm(Number(e.target.value))}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Próxima Manutenção Preventiva</label>
                          <input
                            type="date"
                            value={veicProxManut}
                            onChange={e => setVeicProxManut(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Status Operacional Inicial</label>
                        <select
                          value={veicStatus}
                          onChange={e => setVeicStatus(e.target.value as StatusVeiculo)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                        >
                          <option value="disponivel">Disponível para Aulas</option>
                          <option value="em_uso">Em Uso</option>
                          <option value="manutencao">Em Manutenção</option>
                          <option value="indisponivel">Indisponível</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Observações de Manutenção / Alertas</label>
                        <input
                          type="text"
                          placeholder="Ex: Revisão de pastilhas de freio e óleo em 2.000 km"
                          value={veicAlerta}
                          onChange={e => setVeicAlerta(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                        />
                      </div>

                      <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => setShowAddVehicleModal(false)}
                          className="px-4 py-2 text-slate-600 font-semibold"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl cursor-pointer"
                        >
                          Salvar Veículo
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Modal: Editar Veículo Existente */}
              {editingVehicle && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
                  <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h4 className="text-base font-bold text-slate-900">Editar Veículo: {editingVehicle.marcaModelo}</h4>
                      <button onClick={() => setEditingVehicle(null)} className="text-slate-400 hover:text-slate-700">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <form onSubmit={handleSaveEditVehicle} className="space-y-3 text-xs">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Código Interno</label>
                          <input
                            type="text"
                            required
                            value={veicCodigo}
                            onChange={e => setVeicCodigo(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Categoria</label>
                          <select
                            value={veicCat}
                            onChange={e => setVeicCat(e.target.value as 'A' | 'B')}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                          >
                            <option value="B">Carro (Categoria B)</option>
                            <option value="A">Moto (Categoria A)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Marca e Modelo</label>
                        <input
                          type="text"
                          required
                          value={veicMarcaModelo}
                          onChange={e => setVeicMarcaModelo(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Ano de Fabricação</label>
                          <input
                            type="number"
                            value={veicAno}
                            onChange={e => setVeicAno(Number(e.target.value))}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Placa Mascarada</label>
                          <input
                            type="text"
                            value={veicPlaca}
                            onChange={e => setVeicPlaca(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Quilometragem</label>
                          <input
                            type="number"
                            value={veicKm}
                            onChange={e => setVeicKm(Number(e.target.value))}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                          />
                        </div>
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Próxima Manutenção</label>
                          <input
                            type="date"
                            value={veicProxManut}
                            onChange={e => setVeicProxManut(e.target.value)}
                            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Status Operacional</label>
                        <select
                          value={veicStatus}
                          onChange={e => setVeicStatus(e.target.value as StatusVeiculo)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                        >
                          <option value="disponivel">Disponível para Aulas</option>
                          <option value="em_uso">Em Uso</option>
                          <option value="manutencao">Em Manutenção (Bloqueia agendamentos)</option>
                          <option value="indisponivel">Indisponível</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-bold text-slate-700 mb-1">Alerta de Manutenção Preventiva</label>
                        <input
                          type="text"
                          value={veicAlerta}
                          onChange={e => setVeicAlerta(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                        />
                      </div>

                      <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                        <button
                          type="button"
                          onClick={() => setEditingVehicle(null)}
                          className="px-4 py-2 text-slate-600 font-semibold"
                        >
                          Cancelar
                        </button>
                        <button
                          type="submit"
                          className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl cursor-pointer"
                        >
                          Salvar Alterações
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* MÓDULO 7: GESTÃO DOCUMENTAL INTEGRADA */}
          {activeModule === 'documentos' && (
            <DocumentManagementModule />
          )}

          {/* MÓDULO 8: CONTEÚDO OFICIAL DETRAN */}
          {activeModule === 'conteudo' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Catálogo Administrável de Etapas da Jornada
                </h3>
                <p className="text-xs text-slate-500">
                  Atualize textos explicativos, links oficiais e registre a data de verificação sem alterar o código-fonte.
                </p>
              </div>

              <div className="space-y-4">
                {etapas.map(etapa => (
                  <div key={etapa.id} className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-xs">
                          {etapa.ordem}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900">{etapa.titulo}</h4>
                      </div>
                      <div className="text-xs text-slate-500">
                        Última revisão: <strong>{etapa.dataUltimaRevisao}</strong> por {etapa.responsavelRevisao}
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">{etapa.descricao}</p>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 text-xs">
                      <a
                        href={etapa.linkOficial}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-amber-700 font-bold hover:underline inline-flex items-center gap-1"
                      >
                        <span>Link Oficial: {etapa.linkOficial}</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      {editingStageId === etapa.id ? (
                        <div className="w-full space-y-2 pt-2">
                          <textarea
                            rows={3}
                            value={stageEditDesc}
                            onChange={e => setStageEditDesc(e.target.value)}
                            className="w-full p-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                          />
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setEditingStageId(null)}
                              className="px-3 py-1 text-slate-600 font-semibold cursor-pointer"
                            >
                              Cancelar
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                updateEtapa(etapa.id, { descricao: stageEditDesc });
                                setEditingStageId(null);
                              }}
                              className="px-4 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg cursor-pointer"
                            >
                              Salvar Orientação
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingStageId(etapa.id);
                            setStageEditDesc(etapa.descricao);
                          }}
                          className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold cursor-pointer"
                        >
                          Editar Orientação
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* MÓDULO 9: AUDITORIA DE OPERAÇÕES */}
          {activeModule === 'auditoria' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Registro de Auditoria e Segurança
                </h3>
                <p className="text-xs text-slate-500">
                  Rastreabilidade completa de todas as alterações, agendamentos e atualizações administrativas.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
                    <tr>
                      <th className="px-4 py-3">Data e Hora</th>
                      <th className="px-4 py-3">Usuário</th>
                      <th className="px-4 py-3">Ação</th>
                      <th className="px-4 py-3">Entidade</th>
                      <th className="px-4 py-3">Detalhes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                    {auditoria.map(log => (
                      <tr key={log.id} className="hover:bg-slate-50 font-sans">
                        <td className="px-4 py-3 text-slate-500 font-mono text-[10px]">{log.dataHora}</td>
                        <td className="px-4 py-3 font-bold text-slate-800">{log.usuarioNome}</td>
                        <td className="px-4 py-3">
                          <span className="px-2 py-0.5 rounded font-mono text-[10px] bg-slate-100 text-slate-800 font-bold">
                            {log.acao}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-700 font-medium">{log.entidade}</td>
                        <td className="px-4 py-3 text-slate-600">{log.detalhes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* MÓDULO 10: CONFIGURAÇÕES DA PLATAFORMA & PERSONALIZAÇÃO */}
          {activeModule === 'configuracoes' && (
            <div className="space-y-6 max-w-4xl">
              {/* Card 1: Logotipo da Marca */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Image className="w-5 h-5 text-amber-600" />
                      <span>Personalização do Logotipo da Marca</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Você pode colocar a imagem ou foto oficial do seu logotipo. O sistema atualiza o cabeçalho, rodapé e documentos instantaneamente.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-center p-4 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-slate-200 text-center space-y-2">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      Prévia do Logotipo
                    </span>
                    <div className="p-2 border border-slate-100 rounded-xl bg-slate-50 flex items-center justify-center">
                      <LogoBadge size="lg" showText={false} />
                    </div>
                    <span className="text-[10px] text-slate-400">
                      {cfgLogoUrl ? 'Foto personalizada ativa' : 'Padrão executivo elegante'}
                    </span>
                  </div>

                  <div className="sm:col-span-2 space-y-3 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Opção 1: Escolher arquivo de foto no seu dispositivo
                      </label>
                      <label className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-300 hover:border-amber-500 rounded-xl font-bold text-slate-700 cursor-pointer transition shadow-2xs hover:bg-amber-50/50">
                        <Upload className="w-4 h-4 text-amber-600" />
                        <span>Selecionar Imagem do Computador (PNG, JPG, SVG)</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={e => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = ev => {
                                const dataUrl = ev.target?.result as string;
                                setCfgLogoUrl(dataUrl);
                                updateConfiguracoes({ logoUrl: dataUrl });
                                setCfgSavedSuccess(true);
                                setTimeout(() => setCfgSavedSuccess(false), 3000);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                        />
                      </label>
                      <span className="text-[11px] text-slate-400 mt-1 block">
                        Carrega a imagem direto na hora sem precisar de hospedagem externa.
                      </span>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">
                        Opção 2: Ou informe o caminho / URL da imagem
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Ex: /logo.png ou https://seu-site.com/foto-logo.png"
                          value={cfgLogoUrl}
                          onChange={e => setCfgLogoUrl(e.target.value)}
                          className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-xl focus:bg-white text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            updateConfiguracoes({ logoUrl: cfgLogoUrl });
                            setCfgSavedSuccess(true);
                            setTimeout(() => setCfgSavedSuccess(false), 3000);
                          }}
                          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl cursor-pointer"
                        >
                          Aplicar
                        </button>
                      </div>
                    </div>

                    {cfgLogoUrl && (
                      <div className="pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setCfgLogoUrl('');
                            updateConfiguracoes({ logoUrl: undefined });
                            setCfgSavedSuccess(true);
                            setTimeout(() => setCfgSavedSuccess(false), 3000);
                          }}
                          className="text-xs text-rose-600 hover:text-rose-800 font-semibold cursor-pointer underline"
                        >
                          Remover foto personalizada e restaurar logotipo padrão
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Card 2: Contatos e Dados Legais */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Configurações Operacionais & Contatos
                  </h3>
                  <p className="text-xs text-slate-500">
                    Edite os canais oficiais e avisos legais sem necessidade de alterar o código.
                  </p>
                </div>

                {cfgSavedSuccess && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Configurações salvas com sucesso!</span>
                  </div>
                )}

                <form
                  onSubmit={e => {
                    e.preventDefault();
                    updateConfiguracoes({
                      whatsappOficial: cfgWhatsapp,
                      telefoneComercial: cfgTelefone,
                      instagram: cfgInstagram,
                      cidadeAtendimento: cfgCidade,
                      avisoLegalDetran: cfgAvisoLegal,
                      dataUltimaConferenciaDetran: cfgConferenciaData,
                      logoUrl: cfgLogoUrl
                    });
                    setCfgSavedSuccess(true);
                    setTimeout(() => setCfgSavedSuccess(false), 3000);
                  }}
                  className="space-y-4 text-xs"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">WhatsApp Oficial</label>
                      <input
                        type="text"
                        value={cfgWhatsapp}
                        onChange={e => setCfgWhatsapp(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Telefone Comercial</label>
                      <input
                        type="text"
                        value={cfgTelefone}
                        onChange={e => setCfgTelefone(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Instagram</label>
                      <input
                        type="text"
                        value={cfgInstagram}
                        onChange={e => setCfgInstagram(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Cidade / Região de Atendimento</label>
                      <input
                        type="text"
                        value={cfgCidade}
                        onChange={e => setCfgCidade(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Data da Última Conferência Detran-SP</label>
                    <input
                      type="text"
                      value={cfgConferenciaData}
                      onChange={e => setCfgConferenciaData(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Aviso Legal de Independência Institucional</label>
                    <textarea
                      rows={3}
                      value={cfgAvisoLegal}
                      onChange={e => setCfgAvisoLegal(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl cursor-pointer transition shadow-xs"
                    >
                      Salvar Todas as Configurações
                    </button>
                  </div>
                </form>
              </div>

              {/* Card 3: Gestão da Galeria de Fotos */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                      <Camera className="w-5 h-5 text-amber-600" />
                      <span>Galeria de Fotos do Site ({galeria.length} fotos)</span>
                    </h3>
                    <p className="text-xs text-slate-500">
                      Gerencie as fotos dos veículos, aulas e treinos que aparecem na página pública.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setNewPhotoTitle('');
                      setNewPhotoDesc('');
                      setNewPhotoUrl('');
                      setNewPhotoCat('veiculos');
                      setShowAddPhotoModal(true);
                    }}
                    className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl text-xs cursor-pointer shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Adicionar Nova Foto</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {galeria.map(foto => (
                    <div
                      key={foto.id}
                      className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden flex flex-col justify-between"
                    >
                      <div className="aspect-video w-full overflow-hidden bg-slate-200 relative">
                        <img
                          src={foto.imagemUrl}
                          alt={foto.titulo}
                          className="w-full h-full object-cover"
                        />
                        <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900/80 text-white">
                          {foto.categoria.toUpperCase()}
                        </span>
                      </div>
                      <div className="p-3 text-xs space-y-1">
                        <h4 className="font-bold text-slate-900 truncate">{foto.titulo}</h4>
                        <p className="text-[11px] text-slate-500 line-clamp-2">{foto.descricao}</p>
                      </div>
                      <div className="p-3 pt-0 flex justify-end">
                        <button
                          onClick={() => removeFotoGaleria(foto.id)}
                          className="text-xs text-rose-600 hover:text-rose-800 font-semibold flex items-center gap-1 cursor-pointer p-1"
                          title="Remover foto"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Remover</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Student Profile Modal */}
      {selectedStudentForProfile && (
        <StudentProfileModal
          aluno={selectedStudentForProfile}
          onClose={() => setSelectedStudentForProfile(null)}
          onOpenNewContract={alunoId => {
            setSelectedStudentForProfile(null);
            setActiveModule('documentos');
          }}
          onOpenNewReceipt={alunoId => {
            setSelectedStudentForProfile(null);
            setActiveModule('documentos');
          }}
        />
      )}

      {/* Archive Student Confirmation Modal */}
      {studentToArchive && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
                <span>Confirmar Arquivamento de Aluno</span>
              </h4>
              <button onClick={() => setStudentToArchive(null)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-slate-600 leading-relaxed">
              Deseja realmente arquivar o cadastro do aluno <strong>{studentToArchive.nome}</strong>? O registro não será apagado, permanecendo disponível para consultas e auditoria.
            </p>
            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setStudentToArchive(null)}
                className="px-4 py-2 text-slate-600 font-semibold cursor-pointer"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={() => {
                  archiveAluno(studentToArchive.id);
                  setStudentToArchive(null);
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl cursor-pointer"
              >
                Sim, Arquivar Aluno
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lesson Cancellation Modal */}
      {cancelingLessonId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
                <span>Cancelar Agendamento de Aula</span>
              </h4>
              <button onClick={() => setCancelingLessonId(null)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Motivo do Cancelamento *
              </label>
              <textarea
                rows={3}
                value={lessonCancelReason}
                onChange={e => setLessonCancelReason(e.target.value)}
                placeholder="Ex: Aluno solicitou remarcação com 24h de antecedência por motivo de trabalho."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setCancelingLessonId(null)}
                className="px-4 py-2 text-slate-600 font-semibold cursor-pointer"
              >
                Voltar
              </button>
              <button
                type="button"
                disabled={!lessonCancelReason.trim()}
                onClick={() => {
                  if (!lessonCancelReason.trim()) return;
                  updateAulaStatus(cancelingLessonId, 'cancelada', lessonCancelReason.trim());
                  setCancelingLessonId(null);
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl cursor-pointer disabled:opacity-50"
              >
                Confirmar Cancelamento
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Photo to Gallery Modal */}
      {showAddPhotoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Camera className="w-5 h-5 text-amber-600" />
                <span>Adicionar Foto à Galeria do Site</span>
              </h4>
              <button onClick={() => setShowAddPhotoModal(false)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={e => {
                e.preventDefault();
                if (!newPhotoTitle.trim() || !newPhotoUrl.trim()) return;
                addFotoGaleria({
                  titulo: newPhotoTitle.trim(),
                  descricao: newPhotoDesc.trim() || 'Foto de aula prática e estrutura Vanessa Becegato.',
                  imagemUrl: newPhotoUrl.trim(),
                  categoria: newPhotoCat,
                  destaque: false
                });
                setShowAddPhotoModal(false);
              }}
              className="space-y-3"
            >
              <div>
                <label className="block font-bold text-slate-700 mb-1">Título da Foto *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Treino de Baliza no Circuito Oficial"
                  value={newPhotoTitle}
                  onChange={e => setNewPhotoTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Categoria *</label>
                <select
                  value={newPhotoCat}
                  onChange={e => setNewPhotoCat(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                >
                  <option value="veiculos">Veículos de Treinamento</option>
                  <option value="aulas">Aulas Práticas</option>
                  <option value="pista">Pista e Baliza</option>
                  <option value="instrutora">Atendimento e Orientação</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">URL da Imagem ou Caminho Local *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: https://images.unsplash.com/... ou /minha-foto.jpg"
                  value={newPhotoUrl}
                  onChange={e => setNewPhotoUrl(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                />
                <div className="mt-1">
                  <label className="text-[11px] text-amber-700 font-semibold hover:underline cursor-pointer inline-flex items-center gap-1">
                    <Upload className="w-3 h-3" />
                    <span>Ou carregar foto do computador</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={ev => {
                        const file = ev.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = fileEv => {
                            setNewPhotoUrl(fileEv.target?.result as string);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Descrição</label>
                <textarea
                  rows={2}
                  placeholder="Breve descrição pedagógica ou contextual da foto..."
                  value={newPhotoDesc}
                  onChange={e => setNewPhotoDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddPhotoModal(false)}
                  className="px-4 py-2 text-slate-600 font-semibold cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl cursor-pointer"
                >
                  Salvar Foto na Galeria
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
