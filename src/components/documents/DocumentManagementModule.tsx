import React, { useState } from 'react';
import { useAppStore } from '../../services/store';
import {
  FileText,
  Receipt,
  FileCheck2,
  Send,
  Settings,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Printer,
  MessageCircle,
  Mail,
  ShieldCheck,
  Eye,
  X,
  History,
  FileEdit,
  Save,
  AlertCircle
} from 'lucide-react';
import { Contrato, ContratoStatus, Recibo, ModeloDocumento } from '../../types';
import { ContractViewModal } from './ContractViewModal';
import { ReceiptViewModal } from './ReceiptViewModal';

export const DocumentManagementModule: React.FC = () => {
  const {
    contratos,
    addContrato,
    updateContratoStatus,
    recibos,
    addRecibo,
    cancelarRecibo,
    modeloContrato,
    updateModeloContrato,
    historicoEnvios,
    registrarEnvio,
    alunos,
    configuracoes,
    updateConfiguracoes
  } = useAppStore();

  const [activeSubTab, setActiveSubTab] = useState<
    'visao_geral' | 'contratos' | 'recibos' | 'modelos' | 'historico' | 'configuracoes'
  >('visao_geral');

  // Viewing modals
  const [viewingContract, setViewingContract] = useState<Contrato | null>(null);
  const [viewingReceipt, setViewingReceipt] = useState<Recibo | null>(null);

  // New Contract Modal state
  const [showNewContractModal, setShowNewContractModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(alunos[0]?.id || '');
  const [contractValor, setContractValor] = useState('2400.00');
  const [contractFormaPagto, setContractFormaPagto] = useState('PIX à Vista');
  const [contractDataInicio, setContractDataInicio] = useState(new Date().toISOString().split('T')[0]);

  // New Receipt Modal state
  const [showNewReceiptModal, setShowNewReceiptModal] = useState(false);
  const [receiptStudentId, setReceiptStudentId] = useState(alunos[0]?.id || '');
  const [receiptPayer, setReceiptPayer] = useState('');
  const [receiptAmount, setReceiptAmount] = useState('1200.00');
  const [receiptPaymentMethod, setReceiptPaymentMethod] = useState<
    'PIX' | 'Cartão de Crédito' | 'Cartão de Débito' | 'Dinheiro em Espécie' | 'Transferência'
  >('PIX');
  const [receiptServiceDesc, setReceiptServiceDesc] = useState('Pagamento de Aulas Práticas');
  const [receiptError, setReceiptError] = useState('');

  // Template Editor state
  const [editingTemplate, setEditingTemplate] = useState<ModeloDocumento>(modeloContrato);
  const [templateSavedMsg, setTemplateSavedMsg] = useState(false);

  // Filter state for contracts
  const [contractStatusFilter, setContractStatusFilter] = useState<string>('ALL');
  const [contractSearch, setContractSearch] = useState('');

  // In-app cancel modal state (replaces prompt)
  const [cancelingDoc, setCancelingDoc] = useState<{
    type: 'contrato' | 'recibo';
    id: string;
    numero: string;
  } | null>(null);
  const [cancelReasonInput, setCancelReasonInput] = useState('');

  // Computed Indicators
  const contratosAguardandoRevisao = contratos.filter(c => c.status === 'aguardando_conferencia').length;
  const contratosAguardandoAceite = contratos.filter(c => c.status === 'aguardando_aceite').length;
  const contratosAceitos = contratos.filter(c => c.status === 'aceito_eletronicamente' || c.status === 'assinado').length;
  const recibosEmitidos = recibos.filter(r => r.status === 'emitido').length;
  const enviosPendentes = historicoEnvios.filter(h => h.statusEnvio === 'pendente' || h.statusEnvio === 'falhou').length;
  const totalDocumentosGerados = contratos.length + recibos.length;

  // Selected student for new contract
  const targetStudent = alunos.find(a => a.id === selectedStudentId);

  // Check missing student fields for contract
  const missingStudentFields = [];
  if (targetStudent) {
    if (!targetStudent.email) missingStudentFields.push('E-mail');
  }

  const handleCreateContract = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetStudent) return;

    const valorNum = parseFloat(contractValor) || 2400;

    const novo = addContrato({
      alunoId: targetStudent.id,
      alunoNome: targetStudent.nome,
      alunoTelefone: targetStudent.telefone,
      alunoEmail: targetStudent.email,
      pacoteNome: targetStudent.pacoteContratado,
      quantidadeAulas: targetStudent.totalAulasContratadas,
      duracaoAulaMinutos: 50,
      categoria: targetStudent.categoria,
      valorTotal: valorNum,
      formaPagamento: contractFormaPagto,
      dataInicioPrevista: contractDataInicio,
      versaoModelo: modeloContrato.versao,
      status: 'aguardando_aceite'
    });

    setShowNewContractModal(false);
    setViewingContract(novo);
  };

  const handleCreateReceipt = (e: React.FormEvent) => {
    e.preventDefault();
    setReceiptError('');

    const st = alunos.find(a => a.id === receiptStudentId);
    if (!st) return;

    const val = parseFloat(receiptAmount);
    if (isNaN(val) || val <= 0) {
      setReceiptError('Informe um valor de pagamento válido maior que zero.');
      return;
    }

    const linkedContract = contratos.find(c => c.alunoId === st.id && c.status !== 'cancelado');

    const result = addRecibo({
      alunoId: st.id,
      alunoNome: st.nome,
      pagadorNome: receiptPayer.trim() || st.nome,
      contratoId: linkedContract?.id,
      servicoDescricao: receiptServiceDesc,
      valorRecebido: val,
      formaPagamento: receiptPaymentMethod,
      dataPagamento: new Date().toISOString().split('T')[0],
      emitidoPor: 'Vanessa Becegato',
      observacoes: `Comprovante de pagamento vinculado à matrícula de ${st.nome}.`
    });

    if (!result.success) {
      setReceiptError(result.error || 'Erro ao emitir recibo.');
      return;
    }

    setShowNewReceiptModal(false);
    if (result.recibo) {
      setViewingReceipt(result.recibo);
    }
  };

  const handleSaveTemplateNewVersion = () => {
    const currentVer = parseFloat(modeloContrato.versao) || 1.0;
    const newVer = (currentVer + 0.1).toFixed(1);

    const updated: ModeloDocumento = {
      ...editingTemplate,
      versao: newVer,
      dataCriacao: new Date().toISOString().split('T')[0],
      responsavelAlteracao: 'Vanessa Becegato (Instrutora Titular)',
      estado: 'aprovado',
      ativo: true
    };

    updateModeloContrato(updated);
    setEditingTemplate(updated);
    setTemplateSavedMsg(true);
    setTimeout(() => setTemplateSavedMsg(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Sub-menu Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-xs flex flex-wrap gap-1.5 text-xs font-semibold">
        {[
          { id: 'visao_geral', label: 'Visão Geral', icon: <FileCheck2 className="w-4 h-4" /> },
          { id: 'contratos', label: `Contratos (${contratos.length})`, icon: <FileText className="w-4 h-4" /> },
          { id: 'recibos', label: `Recibos (${recibos.length})`, icon: <Receipt className="w-4 h-4" /> },
          { id: 'modelos', label: 'Modelos de Documentos', icon: <FileEdit className="w-4 h-4" /> },
          { id: 'historico', label: `Histórico de Envios (${historicoEnvios.length})`, icon: <History className="w-4 h-4" /> },
          { id: 'configuracoes', label: 'Configurações', icon: <Settings className="w-4 h-4" /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition cursor-pointer ${
              activeSubTab === tab.id
                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 1. VISÃO GERAL DOCUMENTAL */}
      {activeSubTab === 'visao_geral' && (
        <div className="space-y-6">
          {/* Indicator Cards derived from real data */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 block">Total Gerado</span>
              <div className="text-xl font-black text-slate-900">{totalDocumentosGerados}</div>
              <span className="text-[10px] text-slate-500">Contratos e Recibos</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 block">Aguardando Revisão</span>
              <div className="text-xl font-black text-amber-600">{contratosAguardandoRevisao}</div>
              <span className="text-[10px] text-amber-700">Minutas internas</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 block">Aguardando Aceite</span>
              <div className="text-xl font-black text-blue-600">{contratosAguardandoAceite}</div>
              <span className="text-[10px] text-blue-700">Enviados ao aluno</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 block">Contratos Aceitos</span>
              <div className="text-xl font-black text-emerald-600">{contratosAceitos}</div>
              <span className="text-[10px] text-emerald-700">Com evidência</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 block">Recibos Emitidos</span>
              <div className="text-xl font-black text-slate-900">{recibosEmitidos}</div>
              <span className="text-[10px] text-slate-500">Quitados/confirmados</span>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-1">
              <span className="text-[11px] font-semibold text-slate-500 block">Envios Pendentes</span>
              <div className="text-xl font-black text-rose-600">{enviosPendentes}</div>
              <span className="text-[10px] text-slate-500">WhatsApp / E-mail</span>
            </div>
          </div>

          {/* Quick Action Bar */}
          <div className="bg-gradient-to-r from-slate-900 to-[#0B132B] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-lg font-bold">Gestão Documental Ágil</h3>
              <p className="text-xs text-slate-300">
                Gere contratos a partir da ficha do aluno e emita recibos vinculados a pagamentos com proteção contra duplicidade.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setShowNewContractModal(true)}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm transition"
              >
                <Plus className="w-4 h-4" />
                <span>Gerar Contrato</span>
              </button>

              <button
                onClick={() => setShowNewReceiptModal(true)}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm transition"
              >
                <Plus className="w-4 h-4" />
                <span>Emitir Recibo</span>
              </button>
            </div>
          </div>

          {/* Recent Contracts Preview */}
          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Contratos Recentes
              </h3>
              <button
                onClick={() => setActiveSubTab('contratos')}
                className="text-xs font-bold text-amber-700 hover:underline"
              >
                Ver todos ({contratos.length})
              </button>
            </div>

            <div className="space-y-3">
              {contratos.slice(0, 4).map(c => (
                <div
                  key={c.id}
                  className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900">{c.numeroContrato}</span>
                      <span className="font-bold text-slate-800">· {c.alunoNome}</span>
                    </div>
                    <div className="text-slate-500 text-[11px]">
                      {c.pacoteNome} · Categoria {c.categoria} · R$ {c.valorTotal.toFixed(2)}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        c.status === 'aceito_eletronicamente'
                          ? 'bg-emerald-100 text-emerald-900'
                          : c.status === 'assinado'
                          ? 'bg-blue-100 text-blue-900'
                          : 'bg-amber-100 text-amber-900'
                      }`}
                    >
                      {c.status.replace('_', ' ').toUpperCase()}
                    </span>

                    <button
                      onClick={() => setViewingContract(c)}
                      className="px-2.5 py-1 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded font-semibold cursor-pointer"
                    >
                      Ver PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. CONTRATOS */}
      {activeSubTab === 'contratos' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Pesquisar por contrato ou aluno..."
                  value={contractSearch}
                  onChange={e => setContractSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none"
                />
              </div>

              <select
                value={contractStatusFilter}
                onChange={e => setContractStatusFilter(e.target.value)}
                className="px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none"
              >
                <option value="ALL">Todos Status</option>
                <option value="aguardando_aceite">Aguardando Aceite</option>
                <option value="aceito_eletronicamente">Aceito Eletronicamente</option>
                <option value="assinado">Assinado</option>
                <option value="cancelado">Cancelado</option>
              </select>
            </div>

            <button
              onClick={() => setShowNewContractModal(true)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold cursor-pointer transition shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Gerar Novo Contrato</span>
            </button>
          </div>

          {/* Contracts Table */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
                  <tr>
                    <th className="px-4 py-3">Nº Contrato</th>
                    <th className="px-4 py-3">Aluno</th>
                    <th className="px-4 py-3">Pacote & Categoria</th>
                    <th className="px-4 py-3">Valor</th>
                    <th className="px-4 py-3">Versão</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {contratos
                    .filter(c => (contractStatusFilter === 'ALL' ? true : c.status === contractStatusFilter))
                    .filter(c =>
                      contractSearch
                        ? c.alunoNome.toLowerCase().includes(contractSearch.toLowerCase()) ||
                          c.numeroContrato.toLowerCase().includes(contractSearch.toLowerCase())
                        : true
                    )
                    .map(contrato => (
                      <tr key={contrato.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-mono font-bold text-slate-900">
                          {contrato.numeroContrato}
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-bold text-slate-900 block">{contrato.alunoNome}</span>
                          <span className="text-[11px] text-slate-500">{contrato.alunoTelefone}</span>
                        </td>
                        <td className="px-4 py-3 text-slate-700">
                          <div>{contrato.pacoteNome}</div>
                          <span className="text-[10px] text-slate-500">Cat. {contrato.categoria} · {contrato.quantidadeAulas} aulas</span>
                        </td>
                        <td className="px-4 py-3 font-bold text-slate-900">
                          R$ {contrato.valorTotal.toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-slate-500 font-mono">
                          v{contrato.versaoModelo}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                              contrato.status === 'aceito_eletronicamente'
                                ? 'bg-emerald-100 text-emerald-900'
                                : contrato.status === 'assinado'
                                ? 'bg-blue-100 text-blue-900'
                                : contrato.status === 'cancelado'
                                ? 'bg-rose-100 text-rose-900'
                                : 'bg-amber-100 text-amber-900'
                            }`}
                          >
                            {contrato.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right space-x-2">
                          <button
                            onClick={() => setViewingContract(contrato)}
                            className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-bold cursor-pointer"
                          >
                            Ver / Imprimir
                          </button>
                          {contrato.status !== 'cancelado' && (
                            <button
                              onClick={() => {
                                setCancelingDoc({
                                  type: 'contrato',
                                  id: contrato.id,
                                  numero: contrato.numeroContrato
                                });
                                setCancelReasonInput('');
                              }}
                              className="text-slate-400 hover:text-rose-600 text-xs font-semibold cursor-pointer"
                              title="Cancelar contrato"
                            >
                              Cancelar
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* 3. RECIBOS */}
      {activeSubTab === 'recibos' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Recibos de Pagamento Emitidos
              </h3>
              <p className="text-xs text-slate-500">
                Comprovantes oficiais com controle estrito contra emissão duplicada acidental.
              </p>
            </div>

            <button
              onClick={() => {
                setReceiptError('');
                setShowNewReceiptModal(true);
              }}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold cursor-pointer transition shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Emitir Novo Recibo</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
                <tr>
                  <th className="px-4 py-3">Nº Recibo</th>
                  <th className="px-4 py-3">Aluno / Pagador</th>
                  <th className="px-4 py-3">Serviço</th>
                  <th className="px-4 py-3">Valor</th>
                  <th className="px-4 py-3">Forma Pagto</th>
                  <th className="px-4 py-3">Data</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Ação</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recibos.map(recibo => (
                  <tr key={recibo.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-mono font-bold text-emerald-800">
                      {recibo.numeroRecibo}
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-900">
                      <div>{recibo.alunoNome}</div>
                      {recibo.pagadorNome !== recibo.alunoNome && (
                        <div className="text-[10px] text-slate-500">Pagador: {recibo.pagadorNome}</div>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-600 max-w-xs truncate">
                      {recibo.servicoDescricao}
                    </td>
                    <td className="px-4 py-3 font-black text-slate-900">
                      R$ {recibo.valorRecebido.toFixed(2)}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-700">
                      {recibo.formaPagamento}
                    </td>
                    <td className="px-4 py-3 text-slate-500">{recibo.dataPagamento}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                          recibo.status === 'emitido'
                            ? 'bg-emerald-100 text-emerald-900'
                            : 'bg-rose-100 text-rose-900'
                        }`}
                      >
                        {recibo.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right space-x-2">
                      <button
                        onClick={() => setViewingReceipt(recibo)}
                        className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded font-bold cursor-pointer"
                      >
                        Visualizar
                      </button>
                      {recibo.status === 'emitido' && (
                        <button
                          onClick={() => {
                            setCancelingDoc({
                              type: 'recibo',
                              id: recibo.id,
                              numero: recibo.numeroRecibo
                            });
                            setCancelReasonInput('');
                          }}
                          className="text-slate-400 hover:text-rose-600 text-xs font-semibold cursor-pointer"
                          title="Cancelar recibo"
                        >
                          Cancelar
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 4. MODELOS DE DOCUMENTOS */}
      {activeSubTab === 'modelos' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Modelo Padrão de Contrato
              </h3>
              <p className="text-xs text-slate-500">
                Versão ativa: <strong>v{modeloContrato.versao}</strong> · Criado em: {modeloContrato.dataCriacao} por {modeloContrato.responsavelAlteracao}
              </p>
            </div>

            <button
              onClick={handleSaveTemplateNewVersion}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold cursor-pointer transition shadow-xs"
            >
              <Save className="w-4 h-4" />
              <span>Salvar Como Nova Versão</span>
            </button>
          </div>

          {templateSavedMsg && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-xs font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Nova versão do modelo de contrato aprovada e salva com sucesso!</span>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <div className="text-xs text-slate-500">
              * Edite as cláusulas abaixo conforme as normas aprovadas. Ao salvar, uma nova versão incremental (ex: v1.1) é registrada no histórico sem sobrescrever silenciosamente contratos já aceitos.
            </div>

            <div className="space-y-4">
              {editingTemplate.clausulas.map((cl, idx) => (
                <div key={cl.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">
                      CLÁUSULA {cl.numero} — {cl.titulo}
                    </span>
                  </div>
                  <textarea
                    rows={2}
                    value={cl.conteudo}
                    onChange={e => {
                      const newContent = e.target.value;
                      setEditingTemplate(prev => ({
                        ...prev,
                        clausulas: prev.clausulas.map((c, i) =>
                          i === idx ? { ...c, conteudo: newContent } : c
                        )
                      }));
                    }}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-700 leading-relaxed focus:outline-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 5. HISTÓRICO DE ENVIOS */}
      {activeSubTab === 'historico' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Rastreamento e Histórico de Envios
            </h3>
            <p className="text-xs text-slate-500">
              Registro completo de envios de contratos e recibos por WhatsApp assistido e e-mail.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-semibold">
                <tr>
                  <th className="px-4 py-3">Data/Hora</th>
                  <th className="px-4 py-3">Documento</th>
                  <th className="px-4 py-3">Aluno</th>
                  <th className="px-4 py-3">Canal</th>
                  <th className="px-4 py-3">Destinatário</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Detalhes do Provedor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {historicoEnvios.map(item => (
                  <tr key={item.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 text-slate-500 font-mono text-[11px]">{item.dataTentativa}</td>
                    <td className="px-4 py-3 font-mono font-bold text-slate-900">{item.documentoNumero}</td>
                    <td className="px-4 py-3 font-semibold text-slate-800">{item.alunoNome}</td>
                    <td className="px-4 py-3 capitalize font-bold text-slate-700">
                      {item.canal === 'whatsapp' ? (
                        <span className="text-emerald-700 flex items-center gap-1">
                          <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                        </span>
                      ) : (
                        <span className="text-blue-700 flex items-center gap-1">
                          <Mail className="w-3.5 h-3.5" /> E-mail
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{item.destinatario}</td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded font-bold text-[10px] bg-slate-100 text-slate-800">
                        {item.statusEnvio.replace('_', ' ').toUpperCase()}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600">{item.resultadoProvedor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* 6. CONFIGURAÇÕES DOCUMENTAIS */}
      {activeSubTab === 'configuracoes' && (
        <div className="max-w-2xl bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Dados da Contratada para Documentos
            </h3>
            <p className="text-xs text-slate-500">
              Estas informações são impressas automaticamente no cabeçalho e quadro-resumo dos contratos e recibos.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Razão Social / Nome da Contratada</label>
              <input
                type="text"
                value={configuracoes.nomeComercial}
                disabled
                className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-xl text-slate-600"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Cidade de Atendimento</label>
                <input
                  type="text"
                  value={configuracoes.cidadeAtendimento}
                  disabled
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-xl text-slate-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">WhatsApp Oficial</label>
                <input
                  type="text"
                  value={configuracoes.whatsappOficial}
                  disabled
                  className="w-full px-3 py-2 bg-slate-100 border border-slate-300 rounded-xl text-slate-600"
                />
              </div>
            </div>

            <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-950 space-y-1">
              <strong className="block">Status do Provedor de E-mail:</strong>
              <p className="text-[11px] text-amber-900">
                Atualmente configurado no modo <strong>WhatsApp Assistido</strong>. Para envio direto automático de e-mails, configure as variáveis de ambiente de um provedor transacional (como Resend ou SendGrid).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Gerar Novo Contrato */}
      {showNewContractModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-base font-bold text-slate-900">Gerar Contrato de Prestação de Serviços</h4>
              <button onClick={() => setShowNewContractModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            {missingStudentFields.length > 0 && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-amber-950 text-xs space-y-1">
                <strong>Campos complementares ausentes no aluno:</strong>
                <div>{missingStudentFields.join(', ')} (poderão ser complementados no cadastro do aluno).</div>
              </div>
            )}

            <form onSubmit={handleCreateContract} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Selecione o Aluno *</label>
                <select
                  value={selectedStudentId}
                  onChange={e => setSelectedStudentId(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                >
                  {alunos.map(a => (
                    <option key={a.id} value={a.id}>
                      {a.nome} — {a.pacoteContratado} (Cat. {a.categoria})
                    </option>
                  ))}
                </select>
              </div>

              {targetStudent && (
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 space-y-1 text-[11px] text-slate-600">
                  <div><strong>Telefone:</strong> {targetStudent.telefone}</div>
                  <div><strong>Pacote:</strong> {targetStudent.pacoteContratado} ({targetStudent.totalAulasContratadas} aulas)</div>
                  <div><strong>Categoria:</strong> Categoria {targetStudent.categoria}</div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Valor Contratado (R$) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={contractValor}
                    onChange={e => setContractValor(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Condição de Pagamento *</label>
                  <select
                    value={contractFormaPagto}
                    onChange={e => setContractFormaPagto(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  >
                    <option value="PIX à Vista">PIX à Vista</option>
                    <option value="Cartão de Crédito em 2x">Cartão de Crédito em 2x</option>
                    <option value="Cartão de Crédito em 3x">Cartão de Crédito em 3x</option>
                    <option value="PIX Entrada + Saldo Cartão">PIX Entrada + Saldo Cartão</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Data Prevista para Início das Aulas *</label>
                <input
                  type="date"
                  required
                  value={contractDataInicio}
                  onChange={e => setContractDataInicio(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewContractModal(false)}
                  className="px-4 py-2 text-slate-600 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl cursor-pointer"
                >
                  Gerar Minuta e Prévia
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Emitir Novo Recibo */}
      {showNewReceiptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-base font-bold text-slate-900">Emitir Recibo de Pagamento</h4>
              <button onClick={() => setShowNewReceiptModal(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-4 h-4" />
              </button>
            </div>

            {receiptError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{receiptError}</span>
              </div>
            )}

            <form onSubmit={handleCreateReceipt} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Aluno Vinculado *</label>
                <select
                  value={receiptStudentId}
                  onChange={e => {
                    setReceiptStudentId(e.target.value);
                    const st = alunos.find(a => a.id === e.target.value);
                    if (st) setReceiptPayer(st.nome);
                  }}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                >
                  {alunos.map(a => (
                    <option key={a.id} value={a.id}>
                      {a.nome} ({a.pacoteContratado})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Nome do Pagador (se diferente do aluno)</label>
                <input
                  type="text"
                  placeholder="Nome de quem efetuou o pagamento"
                  value={receiptPayer}
                  onChange={e => setReceiptPayer(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Valor Efetivamente Recebido (R$) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={receiptAmount}
                    onChange={e => setReceiptAmount(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Forma de Pagamento *</label>
                  <select
                    value={receiptPaymentMethod}
                    onChange={e => setReceiptPaymentMethod(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                  >
                    <option value="PIX">PIX</option>
                    <option value="Cartão de Crédito">Cartão de Crédito</option>
                    <option value="Cartão de Débito">Cartão de Débito</option>
                    <option value="Dinheiro em Espécie">Dinheiro em Espécie</option>
                    <option value="Transferência">Transferência Bancária</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Descrição do Serviço / Objeto *</label>
                <input
                  type="text"
                  required
                  value={receiptServiceDesc}
                  onChange={e => setReceiptServiceDesc(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowNewReceiptModal(false)}
                  className="px-4 py-2 text-slate-600 font-semibold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl cursor-pointer"
                >
                  Confirmar e Emitir Recibo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Viewing Modals */}
      {viewingContract && (
        <ContractViewModal
          contrato={viewingContract}
          onClose={() => setViewingContract(null)}
        />
      )}

      {viewingReceipt && (
        <ReceiptViewModal
          recibo={viewingReceipt}
          onClose={() => setViewingReceipt(null)}
        />
      )}

      {/* In-app Cancellation Modal */}
      {cancelingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Cancelar {cancelingDoc.type === 'contrato' ? 'Contrato' : 'Recibo'} ({cancelingDoc.numero})</span>
              </h4>
              <button onClick={() => setCancelingDoc(null)} className="text-slate-400 hover:text-slate-700 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-slate-600">
              O cancelamento preservará o histórico do documento no sistema para fins de auditoria, marcando-o como cancelado com justificativa legal formal.
            </p>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Motivo / Justificativa do Cancelamento *
              </label>
              <textarea
                rows={3}
                value={cancelReasonInput}
                onChange={e => setCancelReasonInput(e.target.value)}
                placeholder="Ex: Aluno solicitou alteração do pacote de aulas antes do início prático."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setCancelingDoc(null)}
                className="px-4 py-2 text-slate-600 font-semibold cursor-pointer"
              >
                Voltar
              </button>
              <button
                type="button"
                disabled={!cancelReasonInput.trim()}
                onClick={() => {
                  if (!cancelReasonInput.trim()) return;
                  if (cancelingDoc.type === 'contrato') {
                    updateContratoStatus(cancelingDoc.id, 'cancelado', cancelReasonInput.trim());
                  } else {
                    cancelarRecibo(cancelingDoc.id, cancelReasonInput.trim());
                  }
                  setCancelingDoc(null);
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl cursor-pointer disabled:opacity-50"
              >
                Confirmar Cancelamento
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
