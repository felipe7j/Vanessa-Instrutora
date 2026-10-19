import React from 'react';
import { useAppStore } from '../../services/store';
import { ExternalLink, CheckCircle, FileText, UserCheck, BookOpen, Car, Award, AlertTriangle } from 'lucide-react';

export const StepByStepSection: React.FC = () => {
  const { configuracoes, etapas } = useAppStore();

  const publicMilestones = [
    {
      num: '01',
      title: 'Requerimento & Biometria',
      desc: 'Início do processo oficial no Detran-SP / Poupatempo com coleta biométrica e cadastro do RENACH.',
      icon: <FileText className="w-5 h-5 text-amber-600" />
    },
    {
      num: '02',
      title: 'Exames de Aptidão',
      desc: 'Avaliação médica e psicológica em clínica credenciada pelo Detran-SP para atestar aptidão física e mental.',
      icon: <UserCheck className="w-5 h-5 text-amber-600" />
    },
    {
      num: '03',
      title: 'Curso & Prova Teórica',
      desc: 'Legislação de trânsito, primeiros socorros e direção defensiva, finalizados com a prova teórica oficial.',
      icon: <BookOpen className="w-5 h-5 text-amber-600" />
    },
    {
      num: '04',
      title: 'Emissão da LADV',
      desc: 'Expedição da Licença de Aprendizagem de Direção Veicular, autorizando formalmente o início das aulas práticas.',
      icon: <CheckCircle className="w-5 h-5 text-amber-600" />
    },
    {
      num: '05',
      title: 'Treinamento com a Vanessa',
      desc: 'Aulas práticas no veículo de instrução (Carro ou Moto), com acompanhamento de evolução e foco em autonomia.',
      icon: <Car className="w-5 h-5 text-amber-600" />
    },
    {
      num: '06',
      title: 'Exame Prático & CNH',
      desc: 'Agendamento e realização da banca examinadora oficial, culminando na liberação da Permissão Para Dirigir.',
      icon: <Award className="w-5 h-5 text-amber-600" />
    }
  ];

  return (
    <section id="jornada" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
            Orientação e Transparência
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
            Como Funciona a Jornada de Habilitação
          </h2>
          <p className="text-base text-slate-600 leading-relaxed">
            Entenda claramente cada fase do seu processo para evitar surpresas, custos desnecessários ou atrasos.
          </p>
        </div>

        {/* 6 Milestones Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {publicMilestones.map((m) => (
            <div
              key={m.num}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm hover:shadow transition relative"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center">
                  {m.icon}
                </div>
                <span className="text-2xl font-black text-slate-200 font-mono">
                  {m.num}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">
                {m.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {m.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Official Reference & Disclaimer Notice */}
        <div className="mt-12 bg-white border border-amber-300 rounded-2xl p-6 sm:p-8 space-y-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-slate-900">
                Aviso Legal sobre Requisitos e Prazos Oficiais
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {configuracoes.avisoRevisaoTexto} Taxas estaduais, agendamentos de clínicas e bancas examinadoras são de competência exclusiva do Detran-SP e órgãos correlatos.
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-slate-500">
              Última conferência com o Detran-SP realizada em: <strong>{configuracoes.dataUltimaConferenciaDetran}</strong> por {configuracoes.responsavelConferencia}
            </span>
            <a
              href="https://detran.sp.gov.br/cnhpaulista/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-bold text-amber-700 hover:text-amber-800 hover:underline"
            >
              <span>Acessar portal CNH Paulista Detran-SP</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
