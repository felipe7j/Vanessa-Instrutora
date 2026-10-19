import React from 'react';
import { useAppStore } from '../../services/store';
import { PacotePratico } from '../../types';
import { Check, Star, Shield, ArrowRight, Sparkles } from 'lucide-react';

interface PackagesSectionProps {
  onSelectPackage: (pkg: PacotePratico) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({ onSelectPackage }) => {
  const { pacotes } = useAppStore();

  return (
    <section id="pacotes" className="py-16 sm:py-24 bg-slate-900 text-white relative">
      {/* Background road lines motif */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#DFB743_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
            Tabela de Pacotes Práticos · Instrutor Autônomo
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
            Sua Primeira Habilitação em Boas Mãos
          </h2>
          <p className="text-base text-slate-300 leading-relaxed">
            Planos desenvolvidos especificamente para cada nível de experiência e necessidade emocional, do polimento técnico ao zero absoluto.
          </p>
        </div>

        {/* 5 Real Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {pacotes.map((pkg) => {
            const isHighlight = pkg.destaque || pkg.id === 'superacao';

            return (
              <div
                key={pkg.id}
                className={`flex flex-col justify-between rounded-2xl p-6 transition-all relative ${
                  isHighlight
                    ? 'bg-gradient-to-b from-slate-800 to-slate-900 border-2 border-amber-400 shadow-xl shadow-amber-500/10'
                    : 'bg-slate-800/80 border border-slate-700/80 hover:border-slate-600'
                }`}
              >
                {/* Optional Badge */}
                {pkg.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold text-[10px] uppercase tracking-wider shadow">
                    {pkg.badge}
                  </div>
                )}

                <div className="space-y-4 pt-1">
                  <div className="border-b border-slate-700/80 pb-4">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                      Pacote
                    </span>
                    <h3 className="text-xl font-extrabold text-white mt-1">
                      {pkg.nome}
                    </h3>
                    <div className="mt-2 inline-flex items-baseline gap-1 text-2xl font-black text-amber-300">
                      {pkg.aulas}
                      <span className="text-xs font-semibold text-slate-400 uppercase">
                        {pkg.aulas === 1 ? 'Aula' : 'Aulas Práticas'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs leading-relaxed">
                    <div>
                      <span className="font-semibold text-slate-200 block mb-1">
                        Indicado para:
                      </span>
                      <p className="text-slate-300">
                        {pkg.indicadoPara}
                      </p>
                    </div>

                    <div>
                      <span className="font-semibold text-slate-200 block mb-1">
                        Foco das Aulas:
                      </span>
                      <p className="text-slate-400 leading-normal">
                        {pkg.foco}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-700/60">
                  <button
                    onClick={() => onSelectPackage(pkg)}
                    className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isHighlight
                        ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md shadow-amber-400/20'
                        : 'bg-slate-700 hover:bg-slate-600 text-white'
                    }`}
                  >
                    <span>Quero este pacote</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Note on Transparency & Customization */}
        <div className="mt-12 text-center max-w-2xl mx-auto space-y-2">
          <p className="text-xs text-slate-400 leading-relaxed">
            * Valores e condições de pagamento são tratados de forma transparente durante o primeiro atendimento, conforme a modalidade (Carro ou Moto) e a disponibilidade de horário.
          </p>
        </div>
      </div>
    </section>
  );
};
