import React from 'react';
import { X, ShieldCheck, Lock, FileCheck } from 'lucide-react';

interface LegalModalProps {
  type: 'privacy' | 'terms' | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800">
              {type === 'privacy' ? <Lock className="w-5 h-5" /> : <FileCheck className="w-5 h-5" />}
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {type === 'privacy' ? 'Política de Privacidade e LGPD' : 'Termos de Uso e Independência Institucional'}
              </h3>
              <p className="text-xs text-slate-500">
                Vanessa Becegato — Estrutura Autônoma de Trânsito
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/50 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
          {type === 'privacy' ? (
            <>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 font-medium">
                Em conformidade com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 - LGPD), tratamos seus dados pessoais com estrito respeito à privacidade, transparência e segurança.
              </div>

              <h4 className="font-bold text-slate-900 text-sm pt-2">1. Coleta Mínima Necessária</h4>
              <p>
                No primeiro contato público, solicitamos apenas nome, número de telefone/WhatsApp e interesse de modalidade. Nenhum dado de CPF, RG ou endereço completo é solicitado em áreas públicas do site.
              </p>

              <h4 className="font-bold text-slate-900 text-sm pt-2">2. Finalidade do Tratamento</h4>
              <p>
                Os dados fornecidos no formulário são utilizados unicamente para:
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Esclarecer dúvidas sobre os pacotes de aulas práticas e disponibilidade de horários;</li>
                <li>Organizar o agendamento de aulas e acompanhamento pedagógico do condutor;</li>
                <li>Garantir a comunicação direta e individualizada sobre aulas e alterações de agenda.</li>
              </ul>

              <h4 className="font-bold text-slate-900 text-sm pt-2">3. Segurança dos Documentos</h4>
              <p>
                Documentos enviados por alunos na Área do Aluno (como LADV e comprovantes) são acessíveis exclusivamente pela instrutora responsável. Não armazenamos senhas em texto puro e não expomos dados entre alunos.
              </p>

              <h4 className="font-bold text-slate-900 text-sm pt-2">4. Direitos do Titular</h4>
              <p>
                O aluno pode a qualquer momento solicitar a confirmação, correção, anonimização ou exclusão de seus dados pessoais por meio do canal oficial de atendimento ou diretamente no portal.
              </p>
            </>
          ) : (
            <>
              <div className="p-3 bg-slate-100 rounded-xl border border-slate-300 text-slate-800 font-medium">
                Declaração expressa de independência institucional e escopo de atuação.
              </div>

              <h4 className="font-bold text-slate-900 text-sm pt-2">1. Natureza dos Serviços</h4>
              <p>
                A atuação de Vanessa Becegato compreende o treinamento prático autônomo de direção veicular (Carro e Moto), focado no desenvolvimento de habilidades motoras, controle de ansiedade e adequação aos critérios de avaliação pública.
              </p>

              <h4 className="font-bold text-slate-900 text-sm pt-2">2. Ausência de Vínculo com Órgãos Públicos</h4>
              <p>
                A plataforma <strong>NÃO</strong> é uma autoescola, CFC, órgão público nem representante oficial do Detran-SP ou Poupatempo. Não realizamos consultas automáticas a sistemas sigilosos do Estado, não emitimos RENACH diretamente nem homologamos aprovações de exames práticos ou teóricos.
              </p>

              <h4 className="font-bold text-slate-900 text-sm pt-2">3. Exames e Bancas Avaliadoras</h4>
              <p>
                A aprovação nos exames oficiais depende exclusivamente do desempenho individual do candidato perante a comissão examinadora designada pelo órgão estadual de trânsito competente. Não prometemos aprovação nem prazos fixos para obtenção de CNH.
              </p>

              <h4 className="font-bold text-slate-900 text-sm pt-2">4. Atualização de Orientações</h4>
              <p>
                As informações normativas presentes no módulo "Minha Jornada" são baseadas em fontes públicas oficiais e possuem registro da data de última conferência, devendo sempre ser checadas pelo candidato nos portais oficiais vigentes.
              </p>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-slate-800 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
