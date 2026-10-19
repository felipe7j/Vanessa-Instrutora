import React, { useState } from 'react';
import { Aluno, Contrato, Recibo, ContratoStatus } from '../../types';
import { useAppStore } from '../../services/store';
import {
  X,
  User,
  Phone,
  Mail,
  Calendar,
  FileCheck2,
  FileText,
  Eye,
  Printer,
  MessageCircle,
  Plus,
  Clock,
  CheckCircle2,
  AlertTriangle,
  History,
  Send,
  BookOpen
} from 'lucide-react';
import { ContractViewModal } from '../documents/ContractViewModal';
import { ReceiptViewModal } from '../documents/ReceiptViewModal';

interface StudentProfileModalProps {
  aluno: Aluno;
  onClose: () => void;
  onOpenNewContract: (alunoId: string) => void;
  onOpenNewReceipt: (alunoId: string) => void;
}

export const StudentProfileModal: React.FC<StudentProfileModalProps> = ({
  aluno,
  onClose,
  onOpenNewContract,
  onOpenNewReceipt
}) => {
  const {
    contratos,
    recibos,
    historicoEnvios,
    aulas,
    evolucoes,
    registrarEnvio
  } = useAppStore();

  const [activeTab, setActiveTab] = useState<'documentos' | 'aulas' | 'evolucao'>('documentos');
  const [viewingContract, setViewingContract] = useState<Contrato | null>(null);
  const [viewingReceipt, setViewingReceipt] = useState<Recibo | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  // Filter items for this specific student
  const studentContracts = contratos.filter(c => c.alunoId === aluno.id);
  const studentReceipts = recibos.filter(r => r.alunoId === aluno.id);
  const studentLessons = aulas.filter(a => a.alunoId === aluno.id);
  const studentEvolutions = evolucoes.filter(e => e.alunoId === aluno.id);
  const studentEnvios = historicoEnvios.filter(h => h.alunoId === aluno.id);

  const handleSendContract = (ctr: Contrato, canal: 'whatsapp' | 'email') => {
    if (canal === 'whatsapp') {
      const cleanPhone = ctr.alunoTelefone.replace(/\D/g, '');
      const msg = `Olá, ${ctr.alunoNome}! Segue seu contrato ${ctr.numeroContrato} de aulas práticas com Vanessa Becegato. Acesse seu portal do aluno para consultar ou registrar aceite.`;
      const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }

    registrarEnvio({
      documentoId: ctr.id,
      documentoTipo: 'contrato',
      documentoNumero: ctr.numeroContrato,
      alunoId: ctr.alunoId,
      alunoNome: ctr.alunoNome,
      canal,
      destinatario: canal === 'whatsapp' ? ctr.alunoTelefone : ctr.alunoEmail || 'aluno@email.com',
      statusEnvio: 'aberto_manual',
      resultadoProvedor: `Reenvio assistido via ${canal.toUpperCase()} acionado pelo operador`,
      usuarioResponsavel: 'Vanessa Becegato'
    });

    setFeedbackMsg(`Contrato ${ctr.numeroContrato} enviado via ${canal.toUpperCase()} registrado!`);
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  const handleSendReceipt = (rec: Recibo, canal: 'whatsapp' | 'email') => {
    if (canal === 'whatsapp') {
      const cleanPhone = aluno.telefone.replace(/\D/g, '');
      const msg = `Olá, ${rec.alunoNome}! Segue a 2ª via do recibo ${rec.numeroRecibo} referente a R$ ${rec.valorRecebido.toFixed(2)} com Vanessa Becegato - Estrutura Autônoma.`;
      const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
    }

    registrarEnvio({
      documentoId: rec.id,
      documentoTipo: 'recibo',
      documentoNumero: rec.numeroRecibo,
      alunoId: rec.alunoId,
      alunoNome: rec.alunoNome,
      canal,
      destinatario: canal === 'whatsapp' ? aluno.telefone : aluno.email || 'aluno@email.com',
      statusEnvio: 'aberto_manual',
      resultadoProvedor: `Reenvio de recibo via ${canal.toUpperCase()} registrado`,
      usuarioResponsavel: 'Vanessa Becegato'
    });

    setFeedbackMsg(`Recibo ${rec.numeroRecibo} enviado via ${canal.toUpperCase()} registrado!`);
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative max-w-4xl w-full bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col my-6 max-h-[92vh] overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 font-bold text-lg">
              {aluno.nome.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">{aluno.nome}</h3>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  Cat. {aluno.categoria}
                </span>
              </div>
              <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                <span>{aluno.telefone}</span>
                {aluno.email && (
                  <>
                    <span>•</span>
                    <span>{aluno.email}</span>
                  </>
                )}
                <span>•</span>
                <span>Matrícula: {aluno.dataMatricula}</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onOpenNewContract(aluno.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold cursor-pointer transition shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Gerar Contrato</span>
            </button>
            <button
              onClick={() => onOpenNewReceipt(aluno.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold cursor-pointer transition shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Emitir Recibo</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Feedback message */}
        {feedbackMsg && (
          <div className="px-6 py-2.5 bg-emerald-50 border-b border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{feedbackMsg}</span>
          </div>
        )}

        {/* Summary Mini Cards */}
        <div className="p-4 sm:p-6 bg-slate-50 border-b border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <span className="text-slate-500 block text-[11px]">Pacote Contratado</span>
            <span className="font-bold text-slate-900 truncate block mt-0.5">{aluno.pacoteContratado}</span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <span className="text-slate-500 block text-[11px]">Aulas Realizadas</span>
            <span className="font-bold text-amber-700 block mt-0.5">
              {aluno.aulasRealizadas} de {aluno.totalAulasContratadas} aulas
            </span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <span className="text-slate-500 block text-[11px]">Contratos Ativos</span>
            <span className="font-bold text-slate-900 block mt-0.5">
              {studentContracts.length} ({studentContracts.filter(c => c.status === 'aceito_eletronicamente' || c.status === 'assinado').length} aceitos)
            </span>
          </div>
          <div className="bg-white p-3 rounded-xl border border-slate-200">
            <span className="text-slate-500 block text-[11px]">Recibos Emitidos</span>
            <span className="font-bold text-emerald-700 block mt-0.5">
              {studentReceipts.length} recibos
            </span>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="px-6 border-b border-slate-200 flex items-center gap-4 text-xs font-bold bg-white">
          <button
            onClick={() => setActiveTab('documentos')}
            className={`py-3.5 border-b-2 cursor-pointer transition flex items-center gap-2 ${
              activeTab === 'documentos'
                ? 'border-amber-500 text-amber-800'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Documentos (Contratos & Recibos)</span>
          </button>

          <button
            onClick={() => setActiveTab('aulas')}
            className={`py-3.5 border-b-2 cursor-pointer transition flex items-center gap-2 ${
              activeTab === 'aulas'
                ? 'border-amber-500 text-amber-800'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>Agenda & Aulas ({studentLessons.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('evolucao')}
            className={`py-3.5 border-b-2 cursor-pointer transition flex items-center gap-2 ${
              activeTab === 'evolucao'
                ? 'border-amber-500 text-amber-800'
                : 'border-transparent text-slate-500 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Caderno de Evolução ({studentEvolutions.length})</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'documentos' && (
            <div className="space-y-6">
              {/* Seção 1: Contratos */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-4 h-4 text-amber-600" />
                    <span>Contratos de Prestação de Serviços</span>
                  </h4>
                  <button
                    onClick={() => onOpenNewContract(aluno.id)}
                    className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Novo Contrato</span>
                  </button>
                </div>

                {studentContracts.length === 0 ? (
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
                    Nenhum contrato gerado para este aluno ainda. Clique em "Gerar Contrato" para preparar a minuta inicial.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {studentContracts.map(ctr => (
                      <div
                        key={ctr.id}
                        className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-mono font-bold text-slate-900 text-sm">
                                {ctr.numeroContrato}
                              </span>
                              <span className="text-[11px] text-slate-500 font-mono">
                                v{ctr.versaoModelo}
                              </span>
                            </div>
                            <p className="text-xs text-slate-600 mt-0.5">
                              {ctr.pacoteNome} · {ctr.quantidadeAulas} aulas · Início Previsto: {ctr.dataInicioPrevista}
                            </p>
                          </div>

                          <span
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                              ctr.status === 'aceito_eletronicamente'
                                ? 'bg-emerald-100 text-emerald-900'
                                : ctr.status === 'assinado'
                                ? 'bg-blue-100 text-blue-900'
                                : ctr.status === 'cancelado'
                                ? 'bg-rose-100 text-rose-900'
                                : 'bg-amber-100 text-amber-900'
                            }`}
                          >
                            {ctr.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <div>
                            <span className="text-slate-400 block text-[10px]">Valor Total</span>
                            <strong className="text-slate-800">R$ {ctr.valorTotal.toFixed(2)}</strong>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">Data Criação</span>
                            <span className="text-slate-700">{ctr.dataCriacao}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">Aceite Eletrônico</span>
                            <span className="text-slate-700">{ctr.dataAceite || 'Pendente'}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">Forma de Pagto</span>
                            <span className="text-slate-700 truncate block">{ctr.formaPagamento}</span>
                          </div>
                        </div>

                        {/* Actions for this contract */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                          <button
                            onClick={() => setViewingContract(ctr)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-bold cursor-pointer transition"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Visualizar / PDF</span>
                          </button>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleSendContract(ctr, 'whatsapp')}
                              className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg font-semibold cursor-pointer transition"
                              title="Enviar contrato via WhatsApp"
                            >
                              <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                              <span>Reenviar WhatsApp</span>
                            </button>

                            <button
                              onClick={() => handleSendContract(ctr, 'email')}
                              className="flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold cursor-pointer transition"
                              title="Registrar envio de e-mail"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>E-mail</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Seção 2: Recibos */}
              <div className="space-y-3 pt-4 border-t border-slate-200">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <FileCheck2 className="w-4 h-4 text-emerald-600" />
                    <span>Recibos de Pagamento Emitidos</span>
                  </h4>
                  <button
                    onClick={() => onOpenNewReceipt(aluno.id)}
                    className="text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Emitir Recibo</span>
                  </button>
                </div>

                {studentReceipts.length === 0 ? (
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
                    Nenhum recibo emitido ainda para este aluno.
                  </div>
                ) : (
                  <div className="space-y-3">
                    {studentReceipts.map(rec => (
                      <div
                        key={rec.id}
                        className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-3"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <span className="font-mono font-bold text-emerald-800 text-sm">
                              {rec.numeroRecibo}
                            </span>
                            <p className="text-xs text-slate-600 mt-0.5">{rec.servicoDescricao}</p>
                          </div>
                          <span
                            className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                              rec.status === 'emitido'
                                ? 'bg-emerald-100 text-emerald-900'
                                : 'bg-rose-100 text-rose-900'
                            }`}
                          >
                            {rec.status.toUpperCase()}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100">
                          <div>
                            <span className="text-slate-400 block text-[10px]">Valor Recebido</span>
                            <strong className="text-slate-900 text-sm font-mono">
                              R$ {rec.valorRecebido.toFixed(2)}
                            </strong>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">Forma de Pagamento</span>
                            <span className="text-slate-700">{rec.formaPagamento}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">Data do Pagamento</span>
                            <span className="text-slate-700">{rec.dataPagamento}</span>
                          </div>
                          <div>
                            <span className="text-slate-400 block text-[10px]">Emitido Por</span>
                            <span className="text-slate-700">{rec.emitidoPor}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
                          <button
                            onClick={() => setViewingReceipt(rec)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg font-bold cursor-pointer transition"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Visualizar / PDF</span>
                          </button>

                          <button
                            onClick={() => handleSendReceipt(rec, 'whatsapp')}
                            className="flex items-center gap-1 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg font-semibold cursor-pointer transition"
                            title="Reenviar recibo via WhatsApp"
                          >
                            <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Reenviar WhatsApp</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Seção 3: Histórico de Envios */}
              {studentEnvios.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-slate-200">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                    <History className="w-4 h-4 text-slate-600" />
                    <span>Histórico de Envios ao Aluno</span>
                  </h4>

                  <div className="bg-slate-50 rounded-2xl border border-slate-200 divide-y divide-slate-100 text-xs">
                    {studentEnvios.map(env => (
                      <div key={env.id} className="p-3 flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono font-bold text-slate-800">
                              {env.documentoNumero}
                            </span>
                            <span className="text-[10px] uppercase font-bold text-slate-500">
                              via {env.canal}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5">
                            {env.dataTentativa} · Destino: {env.destinatario}
                          </p>
                        </div>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-900">
                          {env.statusEnvio.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'aulas' && (
            <div className="space-y-3">
              {studentLessons.length === 0 ? (
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
                  Nenhuma aula agendada para este aluno ainda.
                </div>
              ) : (
                <div className="space-y-3">
                  {studentLessons.map(aula => (
                    <div
                      key={aula.id}
                      className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex items-center justify-between text-xs"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{aula.data}</span>
                          <span className="font-mono text-slate-500">
                            {aula.horarioInicio} - {aula.horarioFim}
                          </span>
                        </div>
                        <p className="text-slate-600">
                          Instrutor: <strong>{aula.instrutorNome}</strong> · Veículo: {aula.veiculoDescricao}
                        </p>
                        <p className="text-slate-500 text-[11px]">Local: {aula.pontoEncontro}</p>
                      </div>

                      <span
                        className={`px-2.5 py-1 rounded-lg text-[10px] font-bold ${
                          aula.status === 'realizada'
                            ? 'bg-emerald-100 text-emerald-900'
                            : aula.status === 'agendada'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-rose-100 text-rose-900'
                        }`}
                      >
                        {aula.status.toUpperCase()}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'evolucao' && (
            <div className="space-y-4">
              {studentEvolutions.length === 0 ? (
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center text-xs text-slate-500">
                  Nenhum registro de evolução anotado para este aluno ainda.
                </div>
              ) : (
                <div className="space-y-4">
                  {studentEvolutions.map(evo => (
                    <div
                      key={evo.id}
                      className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-3 text-xs"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                        <span className="font-bold text-slate-900">Aula em {evo.dataAula}</span>
                        <span className="text-slate-500">Instrutor: {evo.instrutorNome}</span>
                      </div>

                      <div className="space-y-2">
                        <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 text-emerald-950">
                          <strong>Pontos Fortes:</strong> {evo.pontosFortes}
                        </div>
                        <div className="bg-amber-50 p-3 rounded-xl border border-amber-100 text-amber-950">
                          <strong>A Praticar:</strong> {evo.aspectosParaPraticar}
                        </div>
                        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-slate-800">
                          <strong>Meta Próxima Sessão:</strong> {evo.metaProximaAula}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-xl text-xs cursor-pointer"
          >
            Fechar Perfil
          </button>
        </div>
      </div>

      {/* Contract Viewer Modal */}
      {viewingContract && (
        <ContractViewModal
          contrato={viewingContract}
          onClose={() => setViewingContract(null)}
          isStudentView={false}
        />
      )}

      {/* Receipt Viewer Modal */}
      {viewingReceipt && (
        <ReceiptViewModal
          recibo={viewingReceipt}
          onClose={() => setViewingReceipt(null)}
        />
      )}
    </div>
  );
};
