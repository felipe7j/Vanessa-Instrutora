import React, { useState } from 'react';
import { useAppStore } from '../../services/store';
import { CategoriaCNH, PacotePratico } from '../../types';
import { Send, CheckCircle2, MessageCircle, AlertCircle, Shield } from 'lucide-react';

interface InterestFormSectionProps {
  selectedPackage?: PacotePratico | null;
  onOpenPrivacyModal: () => void;
}

export const InterestFormSection: React.FC<InterestFormSectionProps> = ({
  selectedPackage,
  onOpenPrivacyModal
}) => {
  const { configuracoes, pacotes, addInteressado } = useAppStore();

  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [servicoInteresse, setServicoInteresse] = useState(
    selectedPackage ? `Pacote ${selectedPackage.nome} (${selectedPackage.aulas} aulas)` : 'Pacote EVOLUÇÃO (10 Aulas)'
  );
  const [categoriaDesejada, setCategoriaDesejada] = useState<CategoriaCNH>('B');
  const [horarioPreferencial, setHorarioPreferencial] = useState('Qualquer horário');
  const [mensagem, setMensagem] = useState('');
  const [lgpdConsent, setLgpdConsent] = useState(true);
  const [honeypot, setHoneypot] = useState(''); // Anti-spam bot trap

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Sync if package was selected externally
  React.useEffect(() => {
    if (selectedPackage) {
      setServicoInteresse(`Pacote ${selectedPackage.nome} (${selectedPackage.aulas} aulas)`);
    }
  }, [selectedPackage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (honeypot) {
      // Bot detected
      return;
    }

    if (!nome.trim() || nome.trim().length < 3) {
      setErrorMsg('Por favor, informe seu nome completo.');
      return;
    }

    const digitsOnly = telefone.replace(/\D/g, '');
    if (digitsOnly.length < 10) {
      setErrorMsg('Por favor, informe um número de telefone/WhatsApp válido com DDD.');
      return;
    }

    if (!lgpdConsent) {
      setErrorMsg('É necessário concordar com a política de contato para prosseguir.');
      return;
    }

    // Persist to store
    addInteressado({
      nome: nome.trim(),
      telefone: telefone.trim(),
      email: email.trim() || undefined,
      servicoInteresse,
      categoriaDesejada,
      horarioPreferencial,
      mensagem: mensagem.trim() || undefined,
      origem: 'Site Oficial — Formulário de Interesse'
    });

    setSubmitted(true);
  };

  const cleanWhatsAppNumber = configuracoes.whatsappOficial.replace(/\D/g, '');
  const directWhatsAppUrl = `https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent(
    `Olá, Vanessa! Meu nome é ${nome || 'Interessado'} e acabei de preencher o formulário no site sobre o ${servicoInteresse}.`
  )}`;

  return (
    <section id="contato" className="py-16 sm:py-24 bg-gradient-to-b from-white to-slate-100 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 shadow-xl relative overflow-hidden">
          {/* Subtle gold accent line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500" />

          {submitted ? (
            <div className="py-12 text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-slate-900">
                  Mensagem Recebida com Sucesso!
                </h3>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Obrigado pelo contato, <strong>{nome}</strong>. Seus dados foram registrados com segurança em nossa Central de Atendimento.
                </p>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-md mx-auto text-xs text-slate-600 text-left space-y-1.5">
                <div className="font-semibold text-slate-800">Resumo da solicitação:</div>
                <div>• Serviço: {servicoInteresse}</div>
                <div>• Categoria: {categoriaDesejada}</div>
                <div>• Telefone: {telefone}</div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <a
                  href={directWhatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-sm font-bold shadow-md transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Agilizar no WhatsApp agora</span>
                </a>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setNome('');
                    setTelefone('');
                    setMensagem('');
                  }}
                  className="w-full sm:w-auto px-5 py-3 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-300 rounded-xl"
                >
                  Enviar outra mensagem
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="max-w-2xl mb-8 space-y-2">
                <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">
                  Atendimento Personalizado
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Inicie Sua Jornada com Orientação Profissional
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Preencha o formulário abaixo para receber orientações sob medida para o seu caso. Sem compromisso e com respeito ao seu tempo.
                </p>
              </div>

              {errorMsg && (
                <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Honeypot field invisible to humans */}
                <input
                  type="text"
                  name="user_organization_code"
                  value={honeypot}
                  onChange={e => setHoneypot(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Seu Nome Completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Ana Clara Ribeiro"
                      value={nome}
                      onChange={e => setNome(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Telefone / WhatsApp com DDD *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="(18) 99999-9999"
                      value={telefone}
                      onChange={e => setTelefone(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Pacote ou Serviço de Interesse *
                    </label>
                    <select
                      value={servicoInteresse}
                      onChange={e => setServicoInteresse(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    >
                      {pacotes.map(p => (
                        <option key={p.id} value={`Pacote ${p.nome} (${p.aulas} aulas)`}>
                          Pacote {p.nome} ({p.aulas} aulas) — {p.indicadoPara}
                        </option>
                      ))}
                      <option value="Aulas Avulsas / Simulado de Exame">
                        Aulas Avulsas / Simulado de Exame Prático
                      </option>
                      <option value="Dúvidas sobre o Processo Inicial">
                        Dúvidas sobre como iniciar no Detran-SP
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Categoria Pretendida
                    </label>
                    <select
                      value={categoriaDesejada}
                      onChange={e => setCategoriaDesejada(e.target.value as CategoriaCNH)}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    >
                      <option value="B">Carro (Categoria B)</option>
                      <option value="A">Moto (Categoria A)</option>
                      <option value="AB">Carro e Moto (Cat. AB)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      E-mail (opcional)
                    </label>
                    <input
                      type="email"
                      placeholder="seu.email@exemplo.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Melhor Turno para Contato
                    </label>
                    <select
                      value={horarioPreferencial}
                      onChange={e => setHorarioPreferencial(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                    >
                      <option value="Qualquer horário">Qualquer horário</option>
                      <option value="Manhã (08h às 12h)">Manhã (08h às 12h)</option>
                      <option value="Tarde (13h às 18h)">Tarde (13h às 18h)</option>
                      <option value="Fins de tarde / Noite">Fins de tarde (após 18h)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Como podemos te ajudar? (Opcional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Conte se já tem processo aberto no Poupatempo, se tem receio de dirigir, etc."
                    value={mensagem}
                    onChange={e => setMensagem(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
                  />
                </div>

                {/* LGPD Consent check */}
                <div className="flex items-start gap-2.5 pt-1">
                  <input
                    type="checkbox"
                    id="lgpd"
                    checked={lgpdConsent}
                    onChange={e => setLgpdConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 text-amber-600 rounded border-slate-300 focus:ring-amber-500 cursor-pointer"
                  />
                  <label htmlFor="lgpd" className="text-xs text-slate-600 leading-normal cursor-pointer">
                    Concordo em fornecer meu nome e contato para atendimento e orientação sobre os serviços da Vanessa Becegato, conforme a{' '}
                    <button
                      type="button"
                      onClick={onOpenPrivacyModal}
                      className="text-amber-700 underline font-semibold hover:text-amber-900"
                    >
                      Política de Privacidade (LGPD)
                    </button>
                    . Seus dados nunca serão compartilhados com terceiros.
                  </label>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl text-sm font-bold text-slate-950 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 shadow-md shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer transition transform hover:-translate-y-0.5"
                  >
                    <Send className="w-4 h-4" />
                    <span>Enviar Solicitação de Contato</span>
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
