import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  pergunta: string;
  resposta: string;
}

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      pergunta: 'Qual é o papel da Instrutora Autônoma na minha habilitação?',
      resposta:
        'A instrutora autônoma oferece formação prática personalizada, treinamento individual focado nas suas maiores dificuldades (como baliza, subidas, controle de ansiedade e trânsito real) e organização metodológica de cada etapa. Não substituímos os órgãos públicos ou os procedimentos oficiais exigidos pelo Detran-SP.'
    },
    {
      pergunta: 'Já tenho CNH, mas tenho medo de dirigir ou travei no trânsito. Posso fazer aulas?',
      resposta:
        'Sim! O pacote SUPERAÇÃO (20 aulas) e o pacote EVOLUÇÃO (10 aulas) são desenhados especialmente para quem quer destravar o medo, reconquistar a autoconfiança e ganhar autonomia sem julgamentos, em um ambiente seguro e paciente.'
    },
    {
      pergunta: 'A plataforma tem acesso direto ou emite documentos pelo Detran-SP?',
      resposta:
        'Não. Esta plataforma é um sistema independente de gestão e orientação profissional da instrutora Vanessa Becegato. Não realizamos consultas automáticas a bancos de dados sigilosos e não emitimos CNH. Acompanhamos o aluno para que ele execute cada procedimento oficial no momento certo.'
    },
    {
      pergunta: 'Como funciona o Caderno de Evolução na Área do Aluno?',
      resposta:
        'Ao término de cada aula prática, a instrutora registra as manobras praticadas, seus pontos fortes e os objetivos para a próxima sessão. O aluno tem acesso transparente ao seu histórico de evolução no próprio celular para acompanhar seu desenvolvimento factual.'
    },
    {
      pergunta: 'As taxas estaduais e exames médicos estão inclusos nos pacotes de aulas?',
      resposta:
        'Não. As taxas oficiais estaduais (requerimento, exames médicos periciais, emissão de LADV e taxa de emissão de CNH) são recolhidas diretamente pelo cidadão aos órgãos arrecadadores e clínicas credenciadas pelo Detran-SP. Nós orientamos passo a passo como e quando realizar cada recolhimento.'
    },
    {
      pergunta: 'Em quais veículos são ministradas as aulas práticas?',
      resposta:
        'Dispomos de veículo de instrução oficial com duplo comando de pedais homologado (Volkswagen Gol Power 1.6) para a Categoria B e motocicleta de treinamento (Yamaha Fazer 250 ABS) para a Categoria A, com manutenção rigorosa e seguro ativo.'
    }
  ];

  return (
    <section id="faq" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-widest">
            <HelpCircle className="w-4 h-4" />
            <span>Tire Suas Dúvidas</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Perguntas Frequentes
          </h2>
          <p className="text-base text-slate-600">
            Respostas claras e transparentes sobre o treinamento e o acompanhamento prático.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="border border-slate-200 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50 transition cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 pr-4">
                    {faq.pergunta}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-amber-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.resposta}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
