import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from 'react';
import {
  Aluno,
  Aula,
  ConfiguracoesPlataforma,
  Contrato,
  ContratoStatus,
  DocumentoAluno,
  EtapaJornada,
  FotoGaleria,
  HistoricoEnvio,
  Instrutor,
  Interessado,
  LeadStatus,
  ModeloDocumento,
  PacotePratico,
  ProgressoAlunoEtapa,
  Recibo,
  RegistroAuditoria,
  RegistroEvolucao,
  StatusAcompanhamento,
  StatusAula,
  StatusDocumento,
  StatusVeiculo,
  UserRole,
  Veiculo
} from '../types';
import {
  ALUNOS_INICIAIS,
  AUDITORIA_INICIAL,
  AULAS_INICIAIS,
  CONFIGURACOES_INICIAIS,
  CONTRATOS_INICIAIS,
  DOCUMENTOS_INICIAIS_MARIANA,
  ETAPAS_OFICIAIS_DETRAN,
  EVOLUCAO_INICIAL_MARIANA,
  FOTOS_GALERIA_INICIAIS,
  HISTORICO_ENVIOS_INICIAIS,
  INSTRUTORES_INICIAIS,
  INTERESSADOS_INICIAIS,
  MODELO_CONTRATO_PADRAO,
  PACOTES_PRATICOS,
  PROGRESSO_INICIAL_MARIANA,
  RECIBOS_INICIAIS,
  VEICULOS_INICIAIS
} from '../data/initialData';

interface ConflictCheckResult {
  hasConflict: boolean;
  reason?: string;
}

interface AppStoreContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  currentAlunoId: string;
  setCurrentAlunoId: (id: string) => void;
  configuracoes: ConfiguracoesPlataforma;
  updateConfiguracoes: (novasConfigs: Partial<ConfiguracoesPlataforma>) => void;
  pacotes: PacotePratico[];
  alunos: Aluno[];
  addAluno: (aluno: Omit<Aluno, 'id' | 'dataMatricula'>) => Aluno;
  updateAluno: (id: string, updates: Partial<Aluno>) => void;
  archiveAluno: (id: string) => void;
  interessados: Interessado[];
  addInteressado: (lead: Omit<Interessado, 'id' | 'dataCriacao' | 'status' | 'origem'> & { origem?: string }) => Interessado;
  updateLeadStatus: (id: string, status: LeadStatus, notas?: string) => void;
  etapas: EtapaJornada[];
  updateEtapa: (id: string, updates: Partial<EtapaJornada>) => void;
  progressoMariana: ProgressoAlunoEtapa[];
  updateProgressoEtapa: (etapaId: string, status: StatusAcompanhamento, notasAluno?: string, evidencia?: string) => void;
  aulas: Aula[];
  checkConflict: (dados: {
    instrutorId: string;
    veiculoId: string;
    alunoId: string;
    data: string;
    horarioInicio: string;
    horarioFim: string;
    ignoreAulaId?: string;
  }) => ConflictCheckResult;
  addAula: (aulaData: Omit<Aula, 'id' | 'status'>) => { success: boolean; error?: string; aula?: Aula };
  updateAulaStatus: (id: string, status: StatusAula, motivoCancelamento?: string) => void;
  instrutores: Instrutor[];
  addInstrutor: (instrutor: Omit<Instrutor, 'id'>) => Instrutor;
  updateInstrutor: (id: string, updates: Partial<Instrutor>) => void;
  veiculos: Veiculo[];
  updateVeiculoStatus: (id: string, status: StatusVeiculo, alerta?: string) => void;
  addVeiculo: (veiculo: Omit<Veiculo, 'id'>) => Veiculo;
  updateVeiculo: (id: string, updates: Partial<Veiculo>) => void;
  documentos: DocumentoAluno[];
  uploadDocumentoMock: (alunoId: string, titulo: string, tipo: string, fileName: string) => void;
  revisarDocumento: (docId: string, status: StatusDocumento, motivoRecusa?: string) => void;
  evolucoes: RegistroEvolucao[];
  addRegistroEvolucao: (registro: Omit<RegistroEvolucao, 'id'>) => RegistroEvolucao;
  contratos: Contrato[];
  addContrato: (dados: Omit<Contrato, 'id' | 'numeroContrato' | 'dataCriacao' | 'status'> & { status?: ContratoStatus }) => Contrato;
  updateContratoStatus: (id: string, status: ContratoStatus, motivoCancelamento?: string) => void;
  aceitarContrato: (id: string) => void;
  recibos: Recibo[];
  addRecibo: (dados: Omit<Recibo, 'id' | 'numeroRecibo' | 'dataEmissao' | 'status'>) => { success: boolean; error?: string; recibo?: Recibo };
  cancelarRecibo: (id: string, motivo: string) => void;
  modeloContrato: ModeloDocumento;
  updateModeloContrato: (novoModelo: ModeloDocumento) => void;
  historicoEnvios: HistoricoEnvio[];
  registrarEnvio: (envio: Omit<HistoricoEnvio, 'id' | 'dataTentativa'>) => HistoricoEnvio;
  galeria: FotoGaleria[];
  addFotoGaleria: (foto: Omit<FotoGaleria, 'id'>) => FotoGaleria;
  removeFotoGaleria: (id: string) => void;
  auditoria: RegistroAuditoria[];
  addLogAuditoria: (acao: string, entidade: string, detalhes: string) => void;
  resetToDefaultData: () => void;
}

const STORAGE_KEY_PREFIX = 'vb_estrutura_';

function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PREFIX + key);
    if (!raw) return fallback;
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(STORAGE_KEY_PREFIX + key, JSON.stringify(data));
  } catch (err) {
    console.error('Falha ao salvar no armazenamento local:', err);
  }
}

const AppStoreContext = createContext<AppStoreContextType | null>(null);

export const AppStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useState<UserRole>(() => loadFromStorage<UserRole>('role', 'public'));
  const [currentAlunoId, setCurrentAlunoIdState] = useState<string>(() => loadFromStorage<string>('current_aluno_id', 'aluno-01'));
  const [configuracoes, setConfiguracoesState] = useState<ConfiguracoesPlataforma>(() => loadFromStorage('configs', CONFIGURACOES_INICIAIS));
  const [pacotes] = useState<PacotePratico[]>(PACOTES_PRATICOS);
  const [alunos, setAlunosState] = useState<Aluno[]>(() => loadFromStorage('alunos', ALUNOS_INICIAIS));
  const [interessados, setInteressadosState] = useState<Interessado[]>(() => loadFromStorage('interessados', INTERESSADOS_INICIAIS));
  const [etapas, setEtapasState] = useState<EtapaJornada[]>(() => loadFromStorage('etapas', ETAPAS_OFICIAIS_DETRAN));
  const [progressoMariana, setProgressoMarianaState] = useState<ProgressoAlunoEtapa[]>(() => loadFromStorage('progresso_mariana', PROGRESSO_INICIAL_MARIANA));
  const [aulas, setAulasState] = useState<Aula[]>(() => loadFromStorage('aulas', AULAS_INICIAIS));
  const [instrutores, setInstrutoresState] = useState<Instrutor[]>(() => loadFromStorage('instrutores', INSTRUTORES_INICIAIS));
  const [veiculos, setVeiculosState] = useState<Veiculo[]>(() => loadFromStorage('veiculos', VEICULOS_INICIAIS));
  const [documentos, setDocumentosState] = useState<DocumentoAluno[]>(() => loadFromStorage('documentos', DOCUMENTOS_INICIAIS_MARIANA));
  const [evolucoes, setEvolucoesState] = useState<RegistroEvolucao[]>(() => loadFromStorage('evolucoes', EVOLUCAO_INICIAL_MARIANA));
  const [contratos, setContratosState] = useState<Contrato[]>(() => loadFromStorage('contratos', CONTRATOS_INICIAIS));
  const [recibos, setRecibosState] = useState<Recibo[]>(() => loadFromStorage('recibos', RECIBOS_INICIAIS));
  const [modeloContrato, setModeloContratoState] = useState<ModeloDocumento>(() => loadFromStorage('modelo_contrato', MODELO_CONTRATO_PADRAO));
  const [historicoEnvios, setHistoricoEnviosState] = useState<HistoricoEnvio[]>(() => loadFromStorage('historico_envios', HISTORICO_ENVIOS_INICIAIS));
  const [galeria, setGaleriaState] = useState<FotoGaleria[]>(() => loadFromStorage('galeria', FOTOS_GALERIA_INICIAIS));
  const [auditoria, setAuditoriaState] = useState<RegistroAuditoria[]>(() => loadFromStorage('auditoria', AUDITORIA_INICIAL));

  const setRole = useCallback((newRole: UserRole) => {
    setRoleState(newRole);
    saveToStorage('role', newRole);
  }, []);

  const setCurrentAlunoId = useCallback((id: string) => {
    setCurrentAlunoIdState(id);
    saveToStorage('current_aluno_id', id);
  }, []);

  const addLogAuditoria = useCallback((acao: string, entidade: string, detalhes: string) => {
    const usuarioNome = role === 'admin' ? 'Vanessa Becegato (Admin)' : role === 'instrutor' ? 'Instrutor' : role === 'aluno' ? 'Aluno Logado' : 'Visitante';
    const novoLog: RegistroAuditoria = {
      id: 'aud-' + Date.now().toString(),
      dataHora: new Date().toISOString().replace('T', ' ').substring(0, 16),
      usuarioNome,
      usuarioPapel: role,
      acao,
      entidade,
      detalhes
    };
    setAuditoriaState(prev => {
      const updated = [novoLog, ...prev];
      saveToStorage('auditoria', updated);
      return updated;
    });
  }, [role]);

  const updateConfiguracoes = useCallback((novasConfigs: Partial<ConfiguracoesPlataforma>) => {
    setConfiguracoesState(prev => {
      const updated = { ...prev, ...novasConfigs };
      saveToStorage('configs', updated);
      return updated;
    });
    addLogAuditoria('ATUALIZAÇÃO_CONFIGURAÇÕES', 'Configurações da Plataforma', 'Alteração em parâmetros de contato ou dados da contratada');
  }, [addLogAuditoria]);

  const addAluno = useCallback((alunoData: Omit<Aluno, 'id' | 'dataMatricula'>): Aluno => {
    const novoAluno: Aluno = {
      ...alunoData,
      id: 'aluno-' + Date.now().toString(),
      dataMatricula: new Date().toISOString().split('T')[0]
    };
    setAlunosState(prev => {
      const updated = [novoAluno, ...prev];
      saveToStorage('alunos', updated);
      return updated;
    });
    addLogAuditoria('CADASTRO_ALUNO', 'Alunos', `Novo aluno cadastrado: ${novoAluno.nome}`);
    return novoAluno;
  }, [addLogAuditoria]);

  const updateAluno = useCallback((id: string, updates: Partial<Aluno>) => {
    setAlunosState(prev => {
      const updated = prev.map(a => (a.id === id ? { ...a, ...updates } : a));
      saveToStorage('alunos', updated);
      return updated;
    });
    addLogAuditoria('EDICAO_ALUNO', 'Alunos', `Dados de aluno atualizados (ID: ${id})`);
  }, [addLogAuditoria]);

  const archiveAluno = useCallback((id: string) => {
    updateAluno(id, { statusProcesso: 'suspenso' });
    addLogAuditoria('ARQUIVAMENTO_ALUNO', 'Alunos', `Aluno arquivado conforme política de retenção (ID: ${id})`);
  }, [updateAluno, addLogAuditoria]);

  const addInteressado = useCallback((leadData: Omit<Interessado, 'id' | 'dataCriacao' | 'status' | 'origem'> & { origem?: string }): Interessado => {
    const novoLead: Interessado = {
      ...leadData,
      id: 'lead-' + Date.now().toString(),
      dataCriacao: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'novo',
      origem: leadData.origem || 'Site Oficial — Formulário de Interesse'
    };
    setInteressadosState(prev => {
      const updated = [novoLead, ...prev];
      saveToStorage('interessados', updated);
      return updated;
    });
    addLogAuditoria('NOVO_INTERESSADO', 'Interessados', `Novo interessado cadastrado via formulário: ${novoLead.nome}`);
    return novoLead;
  }, [addLogAuditoria]);

  const updateLeadStatus = useCallback((id: string, status: LeadStatus, notas?: string) => {
    setInteressadosState(prev => {
      const updated = prev.map(item => (item.id === id ? { ...item, status, ...(notas ? { notasAtendimento: notas } : {}) } : item));
      saveToStorage('interessados', updated);
      return updated;
    });
    addLogAuditoria('STATUS_INTERESSADO', 'Interessados', `Status do lead ${id} alterado para: ${status}`);
  }, [addLogAuditoria]);

  const updateEtapa = useCallback((id: string, updates: Partial<EtapaJornada>) => {
    setEtapasState(prev => {
      const updated = prev.map(et => (et.id === id ? { ...et, ...updates, dataUltimaRevisao: new Date().toLocaleDateString('pt-BR') } : et));
      saveToStorage('etapas', updated);
      return updated;
    });
    addLogAuditoria('REVISAO_ETAPA_OFICIAL', 'Etapas da Jornada', `Atualização das orientações oficiais da etapa ${id}`);
  }, [addLogAuditoria]);

  const updateProgressoEtapa = useCallback((etapaId: string, status: StatusAcompanhamento, notasAluno?: string, evidencia?: string) => {
    setProgressoMarianaState(prev => {
      const exists = prev.some(p => p.etapaId === etapaId);
      let updated: ProgressoAlunoEtapa[];
      if (exists) {
        updated = prev.map(p =>
          p.etapaId === etapaId
            ? {
                ...p,
                status,
                ...(notasAluno !== undefined ? { notasAluno } : {}),
                ...(evidencia !== undefined ? { evidenciaRegistrada: evidencia } : {}),
                dataAtualizacao: new Date().toISOString().split('T')[0]
              }
            : p
        );
      } else {
        updated = [
          ...prev,
          {
            etapaId,
            status,
            notasAluno,
            evidenciaRegistrada: evidencia,
            dataAtualizacao: new Date().toISOString().split('T')[0]
          }
        ];
      }
      saveToStorage('progresso_mariana', updated);
      return updated;
    });
    addLogAuditoria('ATUALIZACAO_PROGRESSO', 'Progresso da Jornada', `Etapa ${etapaId} atualizada para estado: ${status}`);
  }, [addLogAuditoria]);

  const checkConflict = useCallback(({
    instrutorId,
    veiculoId,
    alunoId,
    data,
    horarioInicio,
    horarioFim,
    ignoreAulaId
  }: {
    instrutorId: string;
    veiculoId: string;
    alunoId: string;
    data: string;
    horarioInicio: string;
    horarioFim: string;
    ignoreAulaId?: string;
  }): ConflictCheckResult => {
    const veic = veiculos.find(v => v.id === veiculoId);
    if (!veic) {
      return { hasConflict: true, reason: 'Veículo selecionado não encontrado no cadastro.' };
    }
    if (veic.status === 'manutencao') {
      return { hasConflict: true, reason: `O veículo ${veic.marcaModelo} está em MANUTENÇÃO no momento.` };
    }
    if (veic.status === 'indisponivel') {
      return { hasConflict: true, reason: `O veículo ${veic.marcaModelo} está marcado como INDISPONÍVEL.` };
    }

    const toMinutes = (timeStr: string) => {
      const [h, m] = timeStr.split(':').map(Number);
      return h * 60 + m;
    };

    const newStart = toMinutes(horarioInicio);
    const newEnd = toMinutes(horarioFim);

    if (newEnd <= newStart) {
      return { hasConflict: true, reason: 'O horário de término deve ser posterior ao horário de início.' };
    }

    const activeLessonsOnDate = aulas.filter(
      a => a.data === data && a.status === 'agendada' && a.id !== ignoreAulaId
    );

    for (const aula of activeLessonsOnDate) {
      const aStart = toMinutes(aula.horarioInicio);
      const aEnd = toMinutes(aula.horarioFim);

      const isOverlapping = Math.max(newStart, aStart) < Math.min(newEnd, aEnd);

      if (isOverlapping) {
        if (aula.instrutorId === instrutorId) {
          return {
            hasConflict: true,
            reason: `Conflito de agenda: o instrutor já possui aula agendada das ${aula.horarioInicio} às ${aula.horarioFim} com o aluno ${aula.alunoNome}.`
          };
        }
        if (aula.veiculoId === veiculoId) {
          return {
            hasConflict: true,
            reason: `Conflito de frota: o veículo ${veic.marcaModelo} já está reservado das ${aula.horarioInicio} às ${aula.horarioFim}.`
          };
        }
        if (aula.alunoId === alunoId) {
          return {
            hasConflict: true,
            reason: `Conflito de aluno: este aluno já possui outra aula agendada das ${aula.horarioInicio} às ${aula.horarioFim}.`
          };
        }
      }
    }

    return { hasConflict: false };
  }, [aulas, veiculos]);

  const addAula = useCallback((aulaData: Omit<Aula, 'id' | 'status'>): { success: boolean; error?: string; aula?: Aula } => {
    const conflict = checkConflict({
      instrutorId: aulaData.instrutorId,
      veiculoId: aulaData.veiculoId,
      alunoId: aulaData.alunoId,
      data: aulaData.data,
      horarioInicio: aulaData.horarioInicio,
      horarioFim: aulaData.horarioFim
    });

    if (conflict.hasConflict) {
      return { success: false, error: conflict.reason };
    }

    const novaAula: Aula = {
      ...aulaData,
      id: 'aula-' + Date.now().toString(),
      status: 'agendada'
    };

    setAulasState(prev => {
      const updated = [novaAula, ...prev];
      saveToStorage('aulas', updated);
      return updated;
    });

    addLogAuditoria('AGENDAMENTO_AULA', 'Agenda e Aulas', `Aula agendada para ${novaAula.alunoNome} no dia ${novaAula.data} (${novaAula.horarioInicio}-${novaAula.horarioFim})`);

    return { success: true, aula: novaAula };
  }, [checkConflict, addLogAuditoria]);

  const updateAulaStatus = useCallback((id: string, status: StatusAula, motivoCancelamento?: string) => {
    setAulasState(prev => {
      const updated = prev.map(a =>
        a.id === id ? { ...a, status, ...(motivoCancelamento ? { motivoCancelamento } : {}) } : a
      );
      saveToStorage('aulas', updated);
      return updated;
    });
    addLogAuditoria('STATUS_AULA', 'Agenda e Aulas', `Status da aula ${id} alterado para: ${status}${motivoCancelamento ? ` (Motivo: ${motivoCancelamento})` : ''}`);
  }, [addLogAuditoria]);

  const addInstrutor = useCallback((instrutorData: Omit<Instrutor, 'id'>): Instrutor => {
    const novo: Instrutor = {
      ...instrutorData,
      id: 'inst-' + Date.now().toString()
    };
    setInstrutoresState(prev => {
      const updated = [...prev, novo];
      saveToStorage('instrutores', updated);
      return updated;
    });
    addLogAuditoria('CADASTRO_INSTRUTOR', 'Instrutores', `Novo instrutor cadastrado: ${novo.nome}`);
    return novo;
  }, [addLogAuditoria]);

  const updateInstrutor = useCallback((id: string, updates: Partial<Instrutor>) => {
    setInstrutoresState(prev => {
      const updated = prev.map(i => (i.id === id ? { ...i, ...updates } : i));
      saveToStorage('instrutores', updated);
      return updated;
    });
    addLogAuditoria('EDICAO_INSTRUTOR', 'Instrutores', `Dados do instrutor ${id} atualizados`);
  }, [addLogAuditoria]);

  const addVeiculo = useCallback((veiculoData: Omit<Veiculo, 'id'>): Veiculo => {
    const novo: Veiculo = {
      ...veiculoData,
      id: 'veic-' + Date.now().toString()
    };
    setVeiculosState(prev => {
      const updated = [...prev, novo];
      saveToStorage('veiculos', updated);
      return updated;
    });
    addLogAuditoria('CADASTRO_VEICULO', 'Frota de Veículos', `Novo veículo cadastrado: ${novo.marcaModelo} (${novo.codigoInterno})`);
    return novo;
  }, [addLogAuditoria]);

  const updateVeiculo = useCallback((id: string, updates: Partial<Veiculo>) => {
    setVeiculosState(prev => {
      const updated = prev.map(v => (v.id === id ? { ...v, ...updates } : v));
      saveToStorage('veiculos', updated);
      return updated;
    });
    addLogAuditoria('EDICAO_VEICULO', 'Frota de Veículos', `Dados do veículo ${id} atualizados`);
  }, [addLogAuditoria]);

  const updateVeiculoStatus = useCallback((id: string, status: StatusVeiculo, alerta?: string) => {
    setVeiculosState(prev => {
      const updated = prev.map(v => (v.id === id ? { ...v, status, ...(alerta !== undefined ? { alertaManutencao: alerta } : {}) } : v));
      saveToStorage('veiculos', updated);
      return updated;
    });
    addLogAuditoria('STATUS_VEICULO', 'Frota de Veículos', `Status do veículo ${id} alterado para ${status}`);
  }, [addLogAuditoria]);

  const uploadDocumentoMock = useCallback((alunoId: string, titulo: string, tipo: string, fileName: string) => {
    const novoDoc: DocumentoAluno = {
      id: 'doc-' + Date.now().toString(),
      alunoId,
      titulo,
      tipo,
      status: 'enviado',
      nomeArquivo: fileName,
      tamanhoKb: Math.floor(Math.random() * 400) + 150,
      dataEnvio: new Date().toISOString().split('T')[0],
      orientacaoEnvio: 'Arquivo anexado pelo aluno para conferência administrativa interna.'
    };
    setDocumentosState(prev => {
      const updated = [novoDoc, ...prev];
      saveToStorage('documentos', updated);
      return updated;
    });
    addLogAuditoria('ENVIO_DOCUMENTO', 'Documentos', `Documento "${titulo}" enviado pelo aluno (ID: ${alunoId})`);
  }, [addLogAuditoria]);

  const revisarDocumento = useCallback((docId: string, status: StatusDocumento, motivoRecusa?: string) => {
    setDocumentosState(prev => {
      const updated = prev.map(d =>
        d.id === docId
          ? {
              ...d,
              status,
              dataRevisao: new Date().toISOString().split('T')[0],
              revisadoPor: 'Vanessa Becegato',
              ...(motivoRecusa ? { motivoRecusa } : {})
            }
          : d
      );
      saveToStorage('documentos', updated);
      return updated;
    });
    addLogAuditoria('REVISAO_DOCUMENTO', 'Documentos', `Documento ${docId} revisado: status ${status}`);
  }, [addLogAuditoria]);

  const addRegistroEvolucao = useCallback((registroData: Omit<RegistroEvolucao, 'id'>): RegistroEvolucao => {
    const novo: RegistroEvolucao = {
      ...registroData,
      id: 'evo-' + Date.now().toString()
    };
    setEvolucoesState(prev => {
      const updated = [novo, ...prev];
      saveToStorage('evolucoes', updated);
      return updated;
    });
    addLogAuditoria('REGISTRO_EVOLUCAO', 'Caderno de Evolução', `Anotação pedagógica registrada para a aula de ${novo.dataAula}`);
    return novo;
  }, [addLogAuditoria]);

  // Contratos
  const addContrato = useCallback((dados: Omit<Contrato, 'id' | 'numeroContrato' | 'dataCriacao' | 'status'> & { status?: ContratoStatus }): Contrato => {
    const year = new Date().getFullYear();
    const count = contratos.length + 1;
    const numeroContrato = `CTR-${year}-${String(count).padStart(3, '0')}`;
    const novoContrato: Contrato = {
      ...dados,
      id: 'ctr-' + Date.now().toString(),
      numeroContrato,
      status: dados.status || 'aguardando_conferencia',
      dataCriacao: new Date().toISOString().split('T')[0],
      pdfGeradoEm: new Date().toISOString().split('T')[0]
    };
    setContratosState(prev => {
      const updated = [novoContrato, ...prev];
      saveToStorage('contratos', updated);
      return updated;
    });
    addLogAuditoria('CRIACAO_CONTRATO', 'Gestão Documental', `Contrato ${numeroContrato} gerado para o aluno ${novoContrato.alunoNome}`);
    return novoContrato;
  }, [contratos.length, addLogAuditoria]);

  const updateContratoStatus = useCallback((id: string, status: ContratoStatus, motivoCancelamento?: string) => {
    setContratosState(prev => {
      const updated = prev.map(c =>
        c.id === id
          ? {
              ...c,
              status,
              ...(motivoCancelamento ? { motivoCancelamento } : {})
            }
          : c
      );
      saveToStorage('contratos', updated);
      return updated;
    });
    addLogAuditoria('STATUS_CONTRATO', 'Gestão Documental', `Status do contrato ${id} alterado para: ${status}`);
  }, [addLogAuditoria]);

  const aceitarContrato = useCallback((id: string) => {
    const now = new Date();
    const dataHoraFormatada = now.toLocaleString('pt-BR');
    setContratosState(prev => {
      const updated = prev.map(c =>
        c.id === id
          ? {
              ...c,
              status: 'aceito_eletronicamente' as ContratoStatus,
              dataAceite: dataHoraFormatada,
              evidenciaAceiteIp: '189.40.***.72',
              evidenciaAceiteDataHora: `${now.toISOString()} BRT (Aceite explícito via Portal do Aluno)`
            }
          : c
      );
      saveToStorage('contratos', updated);
      return updated;
    });
    addLogAuditoria('ACEITE_CONTRATO', 'Gestão Documental', `Contrato ${id} aceito eletronicamente pelo aluno em ${dataHoraFormatada}`);
  }, [addLogAuditoria]);

  // Recibos
  const addRecibo = useCallback((dados: Omit<Recibo, 'id' | 'numeroRecibo' | 'dataEmissao' | 'status'>): { success: boolean; error?: string; recibo?: Recibo } => {
    // Check duplicate receipt protection
    const jaExiste = recibos.some(
      r => r.contratoId && r.contratoId === dados.contratoId && r.status === 'emitido' && r.valorRecebido === dados.valorRecebido
    );
    if (jaExiste) {
      return {
        success: false,
        error: 'Atenção: Já existe um recibo emitido ativo com o mesmo valor para este contrato. Verifique o histórico para evitar duplicidade acidental.'
      };
    }

    const year = new Date().getFullYear();
    const count = recibos.length + 1;
    const numeroRecibo = `REC-${year}-${String(count).padStart(3, '0')}`;
    const novoRecibo: Recibo = {
      ...dados,
      id: 'rec-' + Date.now().toString(),
      numeroRecibo,
      dataEmissao: new Date().toISOString().split('T')[0],
      status: 'emitido'
    };

    setRecibosState(prev => {
      const updated = [novoRecibo, ...prev];
      saveToStorage('recibos', updated);
      return updated;
    });
    addLogAuditoria('EMISSAO_RECIBO', 'Gestão Documental', `Recibo ${numeroRecibo} emitido para ${novoRecibo.pagadorNome} no valor de R$ ${novoRecibo.valorRecebido.toFixed(2)}`);
    return { success: true, recibo: novoRecibo };
  }, [recibos, addLogAuditoria]);

  const cancelarRecibo = useCallback((id: string, motivo: string) => {
    setRecibosState(prev => {
      const updated = prev.map(r => (r.id === id ? { ...r, status: 'cancelado' as const, observacoes: `Cancelado: ${motivo}` } : r));
      saveToStorage('recibos', updated);
      return updated;
    });
    addLogAuditoria('CANCELAMENTO_RECIBO', 'Gestão Documental', `Recibo ${id} cancelado pelo operador. Motivo: ${motivo}`);
  }, [addLogAuditoria]);

  // Modelo de Contrato
  const updateModeloContrato = useCallback((novoModelo: ModeloDocumento) => {
    setModeloContratoState(novoModelo);
    saveToStorage('modelo_contrato', novoModelo);
    addLogAuditoria('VERSAO_MODELO_CONTRATO', 'Gestão Documental', `Modelo de contrato atualizado para a versão ${novoModelo.versao}`);
  }, [addLogAuditoria]);

  // Histórico de Envios
  const registrarEnvio = useCallback((envioData: Omit<HistoricoEnvio, 'id' | 'dataTentativa'>): HistoricoEnvio => {
    const novoEnvio: HistoricoEnvio = {
      ...envioData,
      id: 'env-' + Date.now().toString(),
      dataTentativa: new Date().toISOString().replace('T', ' ').substring(0, 16)
    };
    setHistoricoEnviosState(prev => {
      const updated = [novoEnvio, ...prev];
      saveToStorage('historico_envios', updated);
      return updated;
    });
    addLogAuditoria('REGISTRO_ENVIO_DOCUMENTO', 'Histórico de Envios', `Envio registrado para ${novoEnvio.destinatario} via ${novoEnvio.canal}`);
    return novoEnvio;
  }, [addLogAuditoria]);

  // Galeria de Fotos
  const addFotoGaleria = useCallback((fotoData: Omit<FotoGaleria, 'id'>): FotoGaleria => {
    const novaFoto: FotoGaleria = {
      ...fotoData,
      id: 'foto-' + Date.now().toString()
    };
    setGaleriaState(prev => {
      const updated = [novaFoto, ...prev];
      saveToStorage('galeria', updated);
      return updated;
    });
    addLogAuditoria('UPLOAD_FOTO_GALERIA', 'Galeria de Fotos', `Nova foto adicionada: ${novaFoto.titulo}`);
    return novaFoto;
  }, [addLogAuditoria]);

  const removeFotoGaleria = useCallback((id: string) => {
    setGaleriaState(prev => {
      const updated = prev.filter(f => f.id !== id);
      saveToStorage('galeria', updated);
      return updated;
    });
    addLogAuditoria('EXCLUSAO_FOTO_GALERIA', 'Galeria de Fotos', `Foto removida da galeria (ID: ${id})`);
  }, [addLogAuditoria]);

  const resetToDefaultData = useCallback(() => {
    localStorage.clear();
    setRoleState('public');
    setCurrentAlunoIdState('aluno-01');
    setConfiguracoesState(CONFIGURACOES_INICIAIS);
    setAlunosState(ALUNOS_INICIAIS);
    setInteressadosState(INTERESSADOS_INICIAIS);
    setEtapasState(ETAPAS_OFICIAIS_DETRAN);
    setProgressoMarianaState(PROGRESSO_INICIAL_MARIANA);
    setAulasState(AULAS_INICIAIS);
    setInstrutoresState(INSTRUTORES_INICIAIS);
    setVeiculosState(VEICULOS_INICIAIS);
    setDocumentosState(DOCUMENTOS_INICIAIS_MARIANA);
    setEvolucoesState(EVOLUCAO_INICIAL_MARIANA);
    setContratosState(CONTRATOS_INICIAIS);
    setRecibosState(RECIBOS_INICIAIS);
    setModeloContratoState(MODELO_CONTRATO_PADRAO);
    setHistoricoEnviosState(HISTORICO_ENVIOS_INICIAIS);
    setGaleriaState(FOTOS_GALERIA_INICIAIS);
    setAuditoriaState(AUDITORIA_INICIAL);
  }, []);

  const value = useMemo(
    () => ({
      role,
      setRole,
      currentAlunoId,
      setCurrentAlunoId,
      configuracoes,
      updateConfiguracoes,
      pacotes,
      alunos,
      addAluno,
      updateAluno,
      archiveAluno,
      interessados,
      addInteressado,
      updateLeadStatus,
      etapas,
      updateEtapa,
      progressoMariana,
      updateProgressoEtapa,
      aulas,
      checkConflict,
      addAula,
      updateAulaStatus,
      instrutores,
      addInstrutor,
      updateInstrutor,
      veiculos,
      updateVeiculoStatus,
      addVeiculo,
      updateVeiculo,
      documentos,
      uploadDocumentoMock,
      revisarDocumento,
      evolucoes,
      addRegistroEvolucao,
      contratos,
      addContrato,
      updateContratoStatus,
      aceitarContrato,
      recibos,
      addRecibo,
      cancelarRecibo,
      modeloContrato,
      updateModeloContrato,
      historicoEnvios,
      registrarEnvio,
      galeria,
      addFotoGaleria,
      removeFotoGaleria,
      auditoria,
      addLogAuditoria,
      resetToDefaultData
    }),
    [
      role,
      setRole,
      currentAlunoId,
      setCurrentAlunoId,
      configuracoes,
      updateConfiguracoes,
      pacotes,
      alunos,
      addAluno,
      updateAluno,
      archiveAluno,
      interessados,
      addInteressado,
      updateLeadStatus,
      etapas,
      updateEtapa,
      progressoMariana,
      updateProgressoEtapa,
      aulas,
      checkConflict,
      addAula,
      updateAulaStatus,
      instrutores,
      addInstrutor,
      updateInstrutor,
      veiculos,
      updateVeiculoStatus,
      addVeiculo,
      updateVeiculo,
      documentos,
      uploadDocumentoMock,
      revisarDocumento,
      evolucoes,
      addRegistroEvolucao,
      contratos,
      addContrato,
      updateContratoStatus,
      aceitarContrato,
      recibos,
      addRecibo,
      cancelarRecibo,
      modeloContrato,
      updateModeloContrato,
      historicoEnvios,
      registrarEnvio,
      galeria,
      addFotoGaleria,
      removeFotoGaleria,
      auditoria,
      addLogAuditoria,
      resetToDefaultData
    ]
  );

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
};

export const useAppStore = () => {
  const context = useContext(AppStoreContext);
  if (!context) {
    throw new Error('useAppStore must be used within an AppStoreProvider');
  }
  return context;
};
