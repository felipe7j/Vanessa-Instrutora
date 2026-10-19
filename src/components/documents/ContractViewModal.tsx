import React from 'react';
import { Contrato, ModeloDocumento } from '../../types';
import { useAppStore } from '../../services/store';
import { X, Printer, Download, MessageCircle, Mail, CheckCircle2, ShieldCheck, AlertCircle } from 'lucide-react';

interface ContractViewModalProps {
  contrato: Contrato;
  onClose: () => void;
  isStudentView?: boolean;
}

export const ContractViewModal: React.FC<ContractViewModalProps> = ({
  contrato,
  onClose,
  isStudentView = false
}) => {
  const { configuracoes, modeloContrato, aceitarContrato, registrarEnvio } = useAppStore();
  const [actionFeedback, setActionFeedback] = React.useState<string | null>(null);
  const [showConfirmAccept, setShowConfirmAccept] = React.useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleConfirmAcceptElectronic = () => {
    aceitarContrato(contrato.id);
    setShowConfirmAccept(false);
    setActionFeedback('Aceite eletrônico registrado com sucesso com data, hora e evidência digital!');
    setTimeout(() => setActionFeedback(null), 4000);
  };

  const handleShareWhatsApp = () => {
    const cleanPhone = contrato.alunoTelefone.replace(/\D/g, '');
    const msg = `Olá, ${contrato.alunoNome}! Segue o seu contrato de prestação de serviços de aulas práticas (${contrato.numeroContrato}) com Vanessa Becegato - Estrutura Autônoma. Acesse sua Área do Aluno na plataforma para visualizar a via completa e registrar seu aceite formal.`;
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');

    registrarEnvio({
      documentoId: contrato.id,
      documentoTipo: 'contrato',
      documentoNumero: contrato.numeroContrato,
      alunoId: contrato.alunoId,
      alunoNome: contrato.alunoNome,
      canal: 'whatsapp',
      destinatario: contrato.alunoTelefone,
      statusEnvio: 'aberto_manual',
      resultadoProvedor: 'Mensagem assistida aberta no WhatsApp pelo operador',
      usuarioResponsavel: 'Vanessa Becegato'
    });

    setActionFeedback('Envio via WhatsApp registrado no histórico com sucesso!');
    setTimeout(() => setActionFeedback(null), 4000);
  };

  const handleShareEmail = () => {
    const emailDest = contrato.alunoEmail || 'aluno@email.com';
    const msg = configuracoes.provedorEmailConfigurado
      ? `Documento enviado para a fila do provedor transacional (${emailDest}).`
      : `Envio registrado para ${emailDest}. (Dica: utilize o compartilhamento assistido via WhatsApp para envio direto com comprovante).`;

    registrarEnvio({
      documentoId: contrato.id,
      documentoTipo: 'contrato',
      documentoNumero: contrato.numeroContrato,
      alunoId: contrato.alunoId,
      alunoNome: contrato.alunoNome,
      canal: 'email',
      destinatario: emailDest,
      statusEnvio: configuracoes.provedorEmailConfigurado ? 'enviado' : 'pendente',
      resultadoProvedor: configuracoes.provedorEmailConfigurado ? 'Enviado ao provedor SMTP' : 'Fila local de e-mail registrada',
      usuarioResponsavel: 'Vanessa Becegato'
    });

    setActionFeedback(msg);
    setTimeout(() => setActionFeedback(null), 5000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative max-w-4xl w-full bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col my-6 max-h-[92vh] overflow-hidden">
        {/* Modal Top Bar (Hidden during print) */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 print:hidden">
          <div className="flex items-center gap-3">
            <span className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs">
              CTR
            </span>
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Contrato {contrato.numeroContrato}
              </h3>
              <p className="text-xs text-slate-400">
                Aluno: {contrato.alunoNome} · Versão do Modelo: {contrato.versaoModelo}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold cursor-pointer transition"
              title="Imprimir ou Salvar em PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Imprimir / Salvar PDF</span>
            </button>

            {!isStudentView && (
              <>
                <button
                  onClick={handleShareWhatsApp}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold cursor-pointer transition"
                  title="Compartilhar pelo WhatsApp"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">WhatsApp</span>
                </button>

                <button
                  onClick={handleShareEmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold cursor-pointer transition"
                  title="Enviar por E-mail"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">E-mail</span>
                </button>
              </>
            )}

            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Contract Printable Sheet Body */}
        <div className="p-6 sm:p-12 overflow-y-auto space-y-6 text-slate-900 bg-white font-serif leading-relaxed text-xs sm:text-sm">
          {/* Document Header */}
          <div className="border-b-2 border-slate-900 pb-5 text-center space-y-2">
            <div className="font-sans text-xs font-bold tracking-widest text-amber-700 uppercase">
              Vanessa Becegato — Estrutura Autônoma de Trânsito
            </div>
            <h1 className="text-base sm:text-lg font-bold text-slate-950 uppercase tracking-tight">
              CONTRATO DE PRESTAÇÃO DE SERVIÇOS DE INSTRUÇÃO PRÁTICA VEICULAR
            </h1>
            <div className="font-sans flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 pt-1">
              <span><strong>Documento Nº:</strong> {contrato.numeroContrato}</span>
              <span>·</span>
              <span><strong>Data de Emissão:</strong> {contrato.dataCriacao}</span>
              <span>·</span>
              <span><strong>Versão do Modelo:</strong> {contrato.versaoModelo}</span>
            </div>
          </div>

          {/* Qualification Summary Box */}
          <div className="font-sans bg-slate-50 border border-slate-300 rounded-xl p-4 sm:p-5 space-y-3 text-xs leading-normal">
            <h4 className="font-bold text-slate-950 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-1">
              Quadro Resumo da Contratação
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <span className="text-slate-500 block">CONTRATADA:</span>
                <strong className="text-slate-900">Vanessa Becegato — Instrutora de Trânsito Autônoma</strong>
                <div className="text-slate-600 text-[11px]">
                  Região: {configuracoes.cidadeAtendimento} · Tel/WhatsApp: {configuracoes.whatsappOficial}
                </div>
              </div>

              <div>
                <span className="text-slate-500 block">CONTRATANTE (ALUNO):</span>
                <strong className="text-slate-900">{contrato.alunoNome}</strong>
                <div className="text-slate-600 text-[11px]">
                  CPF: {contrato.alunoCpf || 'Pendente de validação'} · RG: {contrato.alunoRg || 'Conforme LADV'}
                </div>
                <div className="text-slate-600 text-[11px]">
                  Telefone: {contrato.alunoTelefone} · Endereço: {contrato.alunoEndereco || 'Presidente Prudente/SP'}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-200 text-[11px]">
              <div>
                <span className="text-slate-500 block">Pacote:</span>
                <strong className="text-slate-900">{contrato.pacoteNome}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Carga Horária:</span>
                <strong className="text-slate-900">{contrato.quantidadeAulas} aulas ({contrato.duracaoAulaMinutos} min cada)</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Categoria:</span>
                <strong className="text-slate-900">Categoria {contrato.categoria}</strong>
              </div>
              <div>
                <span className="text-slate-500 block">Valor Ajustado:</span>
                <strong className="text-amber-800 font-bold">R$ {contrato.valorTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong>
              </div>
            </div>
          </div>

          {/* Clauses List */}
          <div className="space-y-4 pt-2">
            {modeloContrato.clausulas.map(cl => (
              <div key={cl.id} className="space-y-1">
                <h4 className="font-sans font-bold text-slate-950 text-xs uppercase tracking-wide">
                  CLÁUSULA {cl.numero} — {cl.titulo}
                </h4>
                <p className="text-slate-700 text-justify leading-relaxed">
                  {cl.conteudo}
                </p>
              </div>
            ))}
          </div>

          {/* Acceptance & Signature Section */}
          <div className="font-sans pt-6 border-t-2 border-slate-300 space-y-4">
            <h4 className="font-bold text-slate-950 uppercase text-xs">
              Manifestação de Vontade e Assinaturas
            </h4>

            {contrato.status === 'aceito_eletronicamente' ? (
              <div className="p-4 bg-emerald-50 border border-emerald-300 rounded-xl space-y-1 text-xs text-emerald-950">
                <div className="flex items-center gap-2 font-bold text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>CONTRATO ACEITO ELETRONICAMENTE</span>
                </div>
                <div>
                  <strong>Data e Hora do Aceite:</strong> {contrato.dataAceite}
                </div>
                <div className="text-[11px] text-emerald-800 font-mono">
                  Evidência Digital: {contrato.evidenciaAceiteDataHora || 'Registrado via sessão autenticada do aluno'} (IP: {contrato.evidenciaAceiteIp})
                </div>
              </div>
            ) : contrato.status === 'assinado' ? (
              <div className="p-4 bg-blue-50 border border-blue-300 rounded-xl space-y-1 text-xs text-blue-950">
                <div className="flex items-center gap-2 font-bold text-blue-800">
                  <ShieldCheck className="w-4 h-4 text-blue-600" />
                  <span>CONTRATO ASSINADO COM EVIDÊNCIA REGISTRADA</span>
                </div>
                <div>Data da formalização: {contrato.dataAssinatura}</div>
              </div>
            ) : (
              <div className="p-4 bg-amber-50 border border-amber-300 rounded-xl text-xs text-amber-950 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>Aguardando confirmação de aceite eletrônico pelo contratante.</span>
                </div>

                {isStudentView && (
                  <button
                    onClick={() => setShowConfirmAccept(true)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold cursor-pointer shadow-sm transition"
                  >
                    Manifestar Aceite Eletrônico
                  </button>
                )}
              </div>
            )}

            {/* Signature Lines for Print */}
            <div className="grid grid-cols-2 gap-8 pt-8 text-center text-xs">
              <div className="space-y-1">
                <div className="border-b border-slate-400 pb-1 font-bold">
                  VANESSA BECEGATO
                </div>
                <div className="text-slate-500 text-[11px]">CONTRATADA · Instrutora de Trânsito</div>
              </div>
              <div className="space-y-1">
                <div className="border-b border-slate-400 pb-1 font-bold">
                  {contrato.alunoNome.toUpperCase()}
                </div>
                <div className="text-slate-500 text-[11px]">CONTRATANTE (ALUNO)</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer (Hidden during print) */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 print:hidden">
          <span>Identificador interno: {contrato.id}</span>
          <div className="flex items-center gap-2">
            {isStudentView && contrato.status !== 'aceito_eletronicamente' && contrato.status !== 'assinado' && (
              <button
                onClick={() => setShowConfirmAccept(true)}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold cursor-pointer"
              >
                Concordar e Aceitar Contrato
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-semibold cursor-pointer"
            >
              Fechar Visualização
            </button>
          </div>
        </div>

        {/* In-modal confirmation for electronic acceptance */}
        {showConfirmAccept && (
          <div className="absolute inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-xl border border-slate-200 text-xs">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>Confirmar Aceite Eletrônico</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Você confirma que leu integralmente todas as cláusulas do contrato nº <strong>{contrato.numeroContrato}</strong>, referente ao pacote <strong>{contrato.pacoteNome}</strong>, e concorda com todos os termos e condições?
              </p>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500">
                O sistema registrará seu endereço IP e carimbo de data/hora oficial como evidência idônea do aceite eletrônico.
              </div>
              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowConfirmAccept(false)}
                  className="px-4 py-2 text-slate-600 font-medium hover:bg-slate-100 rounded-xl cursor-pointer"
                >
                  Revisar Mais Tarde
                </button>
                <button
                  type="button"
                  onClick={handleConfirmAcceptElectronic}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl cursor-pointer shadow-xs"
                >
                  Sim, Concordo e Aceito
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
