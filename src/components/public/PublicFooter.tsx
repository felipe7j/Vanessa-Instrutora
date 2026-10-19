import React from 'react';
import { LogoBadge } from '../brand/LogoBadge';
import { useAppStore } from '../../services/store';
import { MessageCircle, Instagram, Phone, MapPin, ExternalLink, ShieldCheck } from 'lucide-react';

interface PublicFooterProps {
  onOpenPrivacyModal: () => void;
  onOpenTermsModal: () => void;
}

export const PublicFooter: React.FC<PublicFooterProps> = ({
  onOpenPrivacyModal,
  onOpenTermsModal
}) => {
  const { configuracoes, setRole } = useAppStore();

  const cleanWhatsAppNumber = configuracoes.whatsappOficial.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${cleanWhatsAppNumber}`;
  const instagramUrl = `https://instagram.com/${configuracoes.instagram.replace('@', '')}`;

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Slogan */}
          <div className="lg:col-span-2 space-y-4">
            <LogoBadge size="md" showText={false} />
            <div className="space-y-1">
              <span className="text-base font-extrabold text-white block">
                {configuracoes.nomeComercial}
              </span>
              <p className="text-xs text-amber-400 font-semibold uppercase tracking-wider">
                Estrutura Autônoma de Trânsito
              </p>
              <p className="text-xs text-slate-400 italic font-serif pt-1">
                “Sua habilitação com segurança e confiança.”
              </p>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {configuracoes.posicionamento}
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Navegação
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#estrutura" className="hover:text-amber-400 transition">
                  Conheça a Estrutura
                </a>
              </li>
              <li>
                <a href="#jornada" className="hover:text-amber-400 transition">
                  Como Funciona a Jornada
                </a>
              </li>
              <li>
                <a href="#pacotes" className="hover:text-amber-400 transition">
                  Tabela de Pacotes Práticos
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-amber-400 transition">
                  Perguntas Frequentes
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-amber-400 transition">
                  Formulário de Interesse
                </a>
              </li>
            </ul>
          </div>

          {/* Real Contacts from the authentic flyer */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Contatos Oficiais
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition font-medium"
                >
                  WhatsApp: {configuracoes.whatsappOficial}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Instagram className="w-4 h-4 text-pink-400 shrink-0" />
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition font-medium"
                >
                  {configuracoes.instagram}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{configuracoes.cidadeAtendimento}</span>
              </li>
            </ul>
          </div>

          {/* Portals & Legal Links */}
          <div className="space-y-3 text-xs">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              Áreas Restritas & Legal
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setRole('aluno')}
                  className="text-amber-300 hover:text-amber-200 transition font-semibold cursor-pointer"
                >
                  → Acessar Área do Aluno
                </button>
              </li>
              <li>
                <button
                  onClick={() => setRole('admin')}
                  className="text-slate-400 hover:text-white transition cursor-pointer"
                >
                  → Central de Gestão Administrativa
                </button>
              </li>
              <li className="pt-2 border-t border-slate-800">
                <button
                  onClick={onOpenPrivacyModal}
                  className="text-slate-400 hover:text-slate-200 transition cursor-pointer block"
                >
                  Política de Privacidade (LGPD)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenTermsModal}
                  className="text-slate-400 hover:text-slate-200 transition cursor-pointer block"
                >
                  Termos de Independência
                </button>
              </li>
              <li>
                <a
                  href="https://detran.sp.gov.br/cnhpaulista/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-slate-400 hover:text-amber-400 transition"
                >
                  <span>Portal Oficial Detran-SP</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Mandatory Independent Legal Notice */}
        <div className="mt-12 pt-8 border-t border-slate-800/80 text-[11px] text-slate-400 leading-relaxed space-y-2">
          <div className="flex items-start gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p>
              {configuracoes.avisoLegalDetran}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between pt-4 text-slate-500 text-[10px]">
            <div>
              © {new Date().getFullYear()} Vanessa Becegato — Todos os direitos reservados.
            </div>
            <div>
              CNH do Brasil · Seu sonho, nossa direção!
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
