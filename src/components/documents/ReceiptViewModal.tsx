import React from 'react';
import { Recibo } from '../../types';
import { useAppStore } from '../../services/store';
import { X, Printer, MessageCircle, Mail, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

interface ReceiptViewModalProps {
  recibo: Recibo;
  onClose: () => void;
}

export const ReceiptViewModal: React.FC<ReceiptViewModalProps> = ({ recibo, onClose }) => {
  const { configuracoes, registrarEnvio, alunos } = useAppStore();
  const [feedbackMsg, setFeedbackMsg] = React.useState<string | null>(null);

  const student = alunos.find(a => a.id === recibo.alunoId);
  const cleanPhone = student ? student.telefone.replace(/\D/g, '') : '';

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const msg = `Olá! Segue a confirmação de emissão do seu recibo de pagamento (${recibo.numeroRecibo}) referente ao valor de R$ ${recibo.valorRecebido.toFixed(2)} com Vanessa Becegato - Estrutura Autônoma. O documento está disponível em PDF para consulta no seu portal.`;
    const url = cleanPhone
      ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`
      : `https://wa.me/?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');

    registrarEnvio({
      documentoId: recibo.id,
      documentoTipo: 'recibo',
      documentoNumero: recibo.numeroRecibo,
      alunoId: recibo.alunoId,
      alunoNome: recibo.alunoNome,
      canal: 'whatsapp',
      destinatario: student?.telefone || recibo.pagadorNome,
      statusEnvio: 'aberto_manual',
      resultadoProvedor: 'Recibo compartilhado via WhatsApp assistido',
      usuarioResponsavel: 'Vanessa Becegato'
    });

    setFeedbackMsg('Recibo enviado via WhatsApp registrado com sucesso!');
    setTimeout(() => setFeedbackMsg(null), 4000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative max-w-2xl w-full bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col my-6 overflow-hidden">
        {/* Top Control Bar (Hidden on print) */}
        <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-emerald-500 text-slate-950 font-bold flex items-center justify-center text-xs">
              REC
            </span>
            <div>
              <h3 className="text-sm font-bold text-white">
                Recibo {recibo.numeroRecibo}
              </h3>
              <p className="text-xs text-slate-400">
                Pagador: {recibo.pagadorNome}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold cursor-pointer transition"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / PDF</span>
            </button>

            <button
              onClick={handleShareWhatsApp}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold cursor-pointer transition"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Body */}
        <div className="p-6 sm:p-10 space-y-6 text-slate-900 bg-white">
          {/* Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b-2 border-slate-900 pb-5 gap-3">
            <div>
              <h2 className="text-sm font-bold tracking-widest text-amber-700 uppercase">
                Vanessa Becegato — Estrutura Autônoma
              </h2>
              <h1 className="text-2xl font-black text-slate-950 uppercase tracking-tight">
                RECIBO DE PAGAMENTO
              </h1>
              <p className="text-xs text-slate-500">
                Instrutora de Trânsito Autônoma · {configuracoes.cidadeAtendimento}
              </p>
            </div>

            <div className="text-left sm:text-right bg-slate-50 p-3 rounded-xl border border-slate-200">
              <div className="text-xs text-slate-500 font-semibold">Nº DO RECIBO</div>
              <div className="text-lg font-black font-mono text-emerald-800">
                {recibo.numeroRecibo}
              </div>
              <div className="text-xs text-slate-500">
                Emissão: {recibo.dataEmissao}
              </div>
            </div>
          </div>

          {/* Amount Box */}
          <div className="bg-emerald-50/80 border-2 border-emerald-400 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <span className="text-xs font-bold text-emerald-950 uppercase tracking-wider">
              VALOR RECEBIDO:
            </span>
            <span className="text-3xl font-black text-emerald-900 font-mono">
              R$ {recibo.valorRecebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </span>
          </div>

          {/* Receipt Declarative Text */}
          <div className="text-xs sm:text-sm text-slate-800 leading-relaxed space-y-3 font-serif">
            <p className="text-justify">
              Recebemos de <strong>{recibo.pagadorNome}</strong>
              {recibo.pagadorCpf ? ` (CPF/Documento: ${recibo.pagadorCpf})` : ''}, referente ao aluno(a){' '}
              <strong>{recibo.alunoNome}</strong>, a importância supramencionada de{' '}
              <strong>
                R$ {recibo.valorRecebido.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </strong>, através de <strong>{recibo.formaPagamento}</strong>, com quitação na data de{' '}
              <strong>{recibo.dataPagamento}</strong>.
            </p>

            <div className="font-sans bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-1">
              <div>
                <strong>Discriminação dos Serviços:</strong> {recibo.servicoDescricao}
              </div>
              {recibo.contratoId && (
                <div className="text-slate-500">
                  <strong>Contrato Vinculado:</strong> CTR-{recibo.contratoId}
                </div>
              )}
              {recibo.observacoes && (
                <div className="text-slate-600 italic">
                  <strong>Observações:</strong> {recibo.observacoes}
                </div>
              )}
            </div>
          </div>

          {/* Legal Notice */}
          <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl text-[11px] text-amber-950 leading-relaxed">
            <strong>Aviso Legal Importante:</strong> O presente recibo comprova exclusivamente o recebimento do valor nele descrito referente à prestação de serviços de instrução prática veicular e não substitui documento fiscal quando este for legalmente exigível.
          </div>

          {/* Signature Line */}
          <div className="pt-8 text-center space-y-1">
            <div className="w-64 mx-auto border-b border-slate-400 pb-1 font-bold text-xs">
              VANESSA BECEGATO
            </div>
            <div className="text-slate-500 text-[11px]">
              Instrutora de Trânsito Autônoma · Credenciada
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end print:hidden">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl text-xs font-bold cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
