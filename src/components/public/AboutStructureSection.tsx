import React from 'react';
import { useAppStore } from '../../services/store';
import { Car, Bike, Sparkles, Compass, CheckCircle2, ShieldCheck } from 'lucide-react';

export const AboutStructureSection: React.FC = () => {
  const { configuracoes } = useAppStore();

  const diferencials = [
    {
      title: 'Pedagogia Humanizada e Paciência',
      desc: 'Método focado em construir segurança emocional e memória muscular, ideal para quem tem receio, ansiedade ou traumas prévios com o trânsito.',
      icon: <Sparkles className="w-5 h-5 text-amber-600" />
    },
    {
      title: 'Treinamento Prático Individualizado',
      desc: 'Aulas sob medida no veículo de instrução (Gol Power 1.6 ou Moto Fazer 250), ajustadas ao seu ritmo e focadas exatamente nos pontos que você precisa lapidar.',
      icon: <Car className="w-5 h-5 text-amber-600" />
    },
    {
      title: 'Orientação Técnica para a Prova',
      desc: 'Alinhamento detalhado com os critérios formais de avaliação das bancas do Detran-SP: baliza no tempo regulamentar, pontos de parada e sinalização defensiva.',
      icon: <Compass className="w-5 h-5 text-amber-600" />
    },
    {
      title: 'Organização e Gestão Digital',
      desc: 'Portal exclusivo do aluno com registro transparente de evolução, agenda sincronizada, status documental e acompanhamento de cada etapa do processo.',
      icon: <ShieldCheck className="w-5 h-5 text-amber-600" />
    }
  ];

  return (
    <section id="estrutura" className="py-16 sm:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
            Acompanhamento com Propósito
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Conheça a Estrutura Autônoma
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Mais do que ensinar comandos mecânicos de embreagem e volante, oferecemos um ambiente seguro, acolhedor e profissional para você conquistar sua autonomia no trânsito.
          </p>
        </div>

        {/* Core Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {diferencials.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 transition-all hover:shadow-md hover:border-amber-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center">
                  {item.icon}
                </div>
                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Commitment & Transparency Banner */}
        <div className="mt-12 bg-amber-50/70 border border-amber-200 rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <h4 className="text-base font-bold text-amber-950 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-amber-700 shrink-0" />
                <span>Compromisso Ético e Independência Institucional</span>
              </h4>
              <p className="text-xs sm:text-sm text-amber-900/80 leading-relaxed max-w-4xl">
                Atuamos com instrução autônoma profissional, orientando candidatos em conformidade com as normas de trânsito brasileiras. A plataforma não possui vínculo de representação direta ou convênio oficial com órgãos públicos estaduais.
              </p>
            </div>
            <div className="shrink-0 text-xs text-amber-950 font-medium bg-amber-100/90 border border-amber-300/80 px-4 py-2.5 rounded-xl">
              Região de atendimento: <strong>{configuracoes.cidadeAtendimento}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
