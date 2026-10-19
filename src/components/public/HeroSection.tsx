import React from 'react';
import { LogoBadge } from '../brand/LogoBadge';
import { useAppStore } from '../../services/store';
import { MessageCircle, ArrowRight, ShieldCheck, Clock, Award, HeartHandshake } from 'lucide-react';

interface HeroSectionProps {
  onOpenInterestForm: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenInterestForm }) => {
  const { configuracoes } = useAppStore();

  const cleanWhatsAppNumber = configuracoes.whatsappOficial.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent(
    'Olá, Vanessa! Gostaria de tirar dúvidas e saber mais sobre as aulas práticas de direção.'
  )}`;

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-[#0B132B] to-[#0A192F] text-white pt-12 pb-20 lg:pt-20 lg:pb-28">
      {/* Decorative ambient road lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/30 blur-[130px] rounded-full" />
        <div className="absolute bottom-0 right-10 w-96 h-96 bg-emerald-500/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              Instrutora de Trânsito Autônoma · Categoria A e B
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-white">
              Sua habilitação começa com um plano.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
                Sua liberdade começa ao volante.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-2xl">
              Organize suas etapas, acompanhe suas aulas e conte com orientação humanizada durante toda a sua jornada para dirigir com segurança e independência.
            </p>

            {/* Direct Real Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <button
                onClick={onOpenInterestForm}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 rounded-xl shadow-lg shadow-amber-500/25 transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <span>Quero começar minha jornada</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 hover:border-slate-600 rounded-xl transition-all cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400" />
                <span>Falar com a Vanessa</span>
              </a>
            </div>

            {/* Micro Pillars directly from the official flyer */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Aulas com segurança</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Horários flexíveis</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <HeartHandshake className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Atendimento humanizado</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Foco na sua aprovação</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Card with Brand Emblem & Car Details */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md bg-gradient-to-b from-slate-800/90 to-slate-900/95 border border-slate-700/80 rounded-2xl p-6 sm:p-8 shadow-2xl backdrop-blur-sm">
              <div className="flex flex-col items-center text-center space-y-4">
                {/* Large Emblem */}
                <LogoBadge size="xl" showText={false} className="justify-center" />

                <div className="space-y-1">
                  <h2 className="text-xl font-bold text-white tracking-wide">
                    Vanessa Becegato
                  </h2>
                  <p className="text-xs font-semibold text-amber-400 tracking-wider uppercase">
                    Instrutora de Trânsito Autônoma
                  </p>
                  <p className="text-xs italic text-slate-300 font-serif pt-1">
                    “Sua habilitação com segurança e confiança.”
                  </p>
                </div>

                {/* Practical Structure Highlights */}
                <div className="w-full bg-slate-950/70 border border-slate-800 rounded-xl p-4 text-left space-y-2.5 text-xs">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Veículo de Instrução:</span>
                    <span className="font-semibold text-white">VW Gol 1.6 Power</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Instrução de Motocicleta:</span>
                    <span className="font-semibold text-white">Yamaha Fazer 250 ABS</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Modalidade:</span>
                    <span className="font-semibold text-amber-300">Carro (B) e Moto (A)</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Região de Atuação:</span>
                    <span className="font-semibold text-white">{configuracoes.cidadeAtendimento}</span>
                  </div>
                </div>

                {/* Slogan from the poster */}
                <p className="text-xs font-semibold text-amber-300/90 tracking-wide">
                  ✨ Juntos rumo à sua independência!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
