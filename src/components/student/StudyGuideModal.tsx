import React, { useState } from 'react';
import { MaterialEstudo } from '../../types';
import { MATERIAIS_ESTUDO_INICIAIS } from '../../data/initialData';
import {
  X,
  Printer,
  Download,
  AlertTriangle,
  CheckCircle2,
  FileText,
  ShieldAlert,
  Info,
  Car,
  Bike,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { LogoBadge } from '../brand/LogoBadge';

interface StudyGuideModalProps {
  initialMaterialId?: string;
  onClose: () => void;
}

export const StudyGuideModal: React.FC<StudyGuideModalProps> = ({
  initialMaterialId = 'mat-02',
  onClose
}) => {
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>(initialMaterialId);
  const [selectedFilter, setSelectedFilter] = useState<'TODAS' | 'Eliminatória' | 'Grave' | 'Média' | 'Leve'>('TODAS');
  const [simulatedPoints, setSimulatedPoints] = useState<Record<string, boolean>>({});

  const material = MATERIAIS_ESTUDO_INICIAIS.find(m => m.id === selectedMaterialId) || MATERIAIS_ESTUDO_INICIAIS[1];

  // Calculate simulated test score
  const totalDeductedPoints = Object.entries(simulatedPoints).reduce((acc, [item, isChecked]) => {
    if (!isChecked) return acc;
    // Find point value
    for (const crit of material.criteriosAvaliacao) {
      if (crit.itens.includes(item)) {
        if (crit.categoriaFalta === 'Eliminatória') return 999; // direct disqualification
        return acc + crit.pontos;
      }
    }
    return acc;
  }, 0);

  const isEliminated = totalDeductedPoints >= 4;

  const handleToggleSimulatedPoint = (item: string) => {
    setSimulatedPoints(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto animate-fade-in">
      <div className="bg-[#071426] text-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-700/80 overflow-hidden my-auto">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 bg-[#0D2038] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              {material.categoria === 'duas_rodas' ? <Bike className="w-5 h-5" /> : <Car className="w-5 h-5" />}
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Bônus Educacional — Material de Estudo Oficial
              </span>
              <h3 className="text-base sm:text-lg font-extrabold text-white leading-snug">
                {material.titulo}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 border border-slate-700 transition cursor-pointer"
              title="Imprimir ou Salvar em PDF"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Imprimir / Salvar PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              aria-label="Fechar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Category Switcher Tabs */}
        <div className="bg-[#0A192F] px-5 py-3 border-b border-slate-800/80 flex flex-wrap items-center justify-between gap-3 shrink-0 text-xs">
          <div className="flex items-center gap-2">
            {MATERIAIS_ESTUDO_INICIAIS.map(m => {
              const active = m.id === selectedMaterialId;
              return (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedMaterialId(m.id);
                    setSimulatedPoints({});
                  }}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-bold transition cursor-pointer ${
                    active
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  {m.categoria === 'duas_rodas' ? <Bike className="w-3.5 h-3.5" /> : <Car className="w-3.5 h-3.5" />}
                  <span>{m.categoria === 'duas_rodas' ? 'Duas Rodas (A / ACC)' : 'Quatro Rodas (B / C / D / E)'}</span>
                </button>
              );
            })}
          </div>

          <div className="text-[11px] text-slate-400">
            Fonte: <strong>{material.fonteOficial}</strong> · Revisão: {material.dataDisponibilizacao}
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-5 sm:p-6 space-y-6 overflow-y-auto flex-1 text-xs">
          {/* Official Disclaimer Banner */}
          <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-start gap-3 text-amber-200">
            <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs leading-relaxed">
              <span className="font-bold text-amber-300 block">
                Material de Referência Pedagógica Independente
              </span>
              <p className="text-amber-100/80">
                Este formulário espelha com fidelidade a folha de avaliação oficial aplicada pelos examinadores do Detran-SP nas bancas de trânsito. Utilize-o para conferir as faltas que mais reprovam e revisar os pontos críticos antes do exame prático. Confirme sempre os critérios vigentes nos canais oficiais.
              </p>
            </div>
          </div>

          {/* Interactive Scoring Rule Simulator */}
          <div className="bg-[#102139] border border-slate-700 rounded-2xl p-4 sm:p-5 space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-sm text-white">Regra de Aprovação Detran-SP:</span>
                <span className="text-[11px] text-slate-400">
                  Máximo de 3 pontos negativos permitidos (4 pontos ou falta eliminatória = Reprovação)
                </span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Pontuação Simulada:</span>
                <span
                  className={`px-3 py-1 rounded-xl font-black text-xs ${
                    totalDeductedPoints === 0
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : isEliminated
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {totalDeductedPoints >= 999
                    ? 'REPROVAÇÃO DIRETA (Falta Eliminatória)'
                    : `${totalDeductedPoints} Ponto(s) Perdido(s) — ${isEliminated ? 'REPROVADO' : 'APROVADO'}`}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400">
              💡 Você pode marcar os itens abaixo para simular as faltas cometidas e entender exatamente como o examinador pontua cada infração durante a prova prática.
            </p>
          </div>

          {/* Infraction Category Filters */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-slate-400 font-semibold text-[11px]">Filtrar Faltas:</span>
            {(['TODAS', 'Eliminatória', 'Grave', 'Média', 'Leve'] as const).map(filter => {
              const active = selectedFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => setSelectedFilter(filter)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition cursor-pointer ${
                    active
                      ? 'bg-amber-400 text-slate-950 font-black'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {filter === 'TODAS'
                    ? 'Todas as Faltas'
                    : filter === 'Eliminatória'
                    ? 'Eliminatórias (Reprovação Direta)'
                    : `${filter}s (${filter === 'Grave' ? '3 pts' : filter === 'Média' ? '2 pts' : '1 pt'})`}
                </button>
              );
            })}
          </div>

          {/* Criteria Cards */}
          <div className="space-y-4">
            {material.criteriosAvaliacao
              .filter(crit => (selectedFilter === 'TODAS' ? true : crit.categoriaFalta === selectedFilter))
              .map(crit => {
                const isElim = crit.categoriaFalta === 'Eliminatória';
                const isGrave = crit.categoriaFalta === 'Grave';
                const isMedia = crit.categoriaFalta === 'Média';

                return (
                  <div
                    key={crit.categoriaFalta}
                    className={`rounded-2xl border p-4 sm:p-5 space-y-3 ${
                      isElim
                        ? 'bg-rose-950/20 border-rose-700/60'
                        : isGrave
                        ? 'bg-amber-950/20 border-amber-600/50'
                        : isMedia
                        ? 'bg-sky-950/20 border-sky-600/50'
                        : 'bg-slate-900 border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
                      <div className="flex items-center gap-2">
                        {isElim ? (
                          <AlertTriangle className="w-4 h-4 text-rose-400" />
                        ) : (
                          <ShieldAlert className="w-4 h-4 text-amber-400" />
                        )}
                        <h4 className="font-extrabold text-white text-sm">
                          Faltas {crit.categoriaFalta}s
                        </h4>
                      </div>

                      <span
                        className={`px-2.5 py-0.5 rounded-lg text-[11px] font-black uppercase ${
                          isElim
                            ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                            : isGrave
                            ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                            : 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                        }`}
                      >
                        {isElim ? 'Reprovação Imediata' : `Perda de ${crit.pontos} Ponto(s)`}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 gap-2 pt-1">
                      {crit.itens.map((item, idx) => {
                        const isSimChecked = Boolean(simulatedPoints[item]);

                        return (
                          <label
                            key={idx}
                            className={`flex items-start gap-3 p-2.5 rounded-xl border transition-all cursor-pointer ${
                              isSimChecked
                                ? 'bg-amber-500/20 border-amber-500/60 text-white'
                                : 'bg-[#0B1A30]/70 border-slate-800 hover:border-slate-700 text-slate-300'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={isSimChecked}
                              onChange={() => handleToggleSimulatedPoint(item)}
                              className="mt-0.5 rounded border-slate-600 text-amber-500 focus:ring-amber-500/20 shrink-0 cursor-pointer"
                            />
                            <div className="space-y-0.5 text-xs leading-relaxed flex-1">
                              <span>{item}</span>
                            </div>
                            <span className="font-mono text-[10px] text-slate-500 shrink-0">
                              {isElim ? 'ELIM.' : `-${crit.pontos} pt`}
                            </span>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>

          {/* Checklist de Preparação Complementar */}
          <div className="bg-[#0B1A30] border border-slate-700/80 rounded-2xl p-4 sm:p-5 space-y-3">
            <h4 className="font-bold text-white text-sm flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Checklist Essencial para o Dia do Exame Prático</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <span className="text-amber-400 font-bold">1.</span>
                <span>Documento oficial de identidade com foto (RG ou CNH Digital com QR Code legível).</span>
              </div>
              <div className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <span className="text-amber-400 font-bold">2.</span>
                <span>LADV (Licença de Aprendizagem) emitida no aplicativo CNH do Brasil.</span>
              </div>
              <div className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <span className="text-amber-400 font-bold">3.</span>
                <span>Vestimenta adequada: calçado fechado e firme (proibido chinelo, rasteirinha ou salto alto).</span>
              </div>
              <div className="flex items-start gap-2 bg-slate-900/60 p-2.5 rounded-xl border border-slate-800">
                <span className="text-amber-400 font-bold">4.</span>
                <span>Chegada ao local da banca com 30 minutos de antecedência para conferência e chamada.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-[#0D2038] flex flex-wrap items-center justify-between gap-3 shrink-0 text-xs">
          <div className="text-slate-400 text-[11px]">
            Vanessa Becegato — Ensino Humanizado e Focado em Autonomia · Dracena e Região — SP
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar / Imprimir Ficha Oficial</span>
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl transition cursor-pointer"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
