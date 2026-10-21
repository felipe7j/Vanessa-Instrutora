import React, { useState } from 'react';
import { LogoBadge } from '../brand/LogoBadge';
import { useAppStore } from '../../services/store';
import { Menu, X, MessageCircle, User, Shield, ChevronRight } from 'lucide-react';

interface PublicHeaderProps {
  onOpenInterestModal?: () => void;
  onOpenAuthModal?: (role: 'admin' | 'aluno') => void;
}

export const PublicHeader: React.FC<PublicHeaderProps> = ({ onOpenInterestModal, onOpenAuthModal }) => {
  const { configuracoes, setRole } = useAppStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cleanWhatsAppNumber = configuracoes.whatsappOficial.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${cleanWhatsAppNumber}?text=${encodeURIComponent(
    'Olá, Vanessa! Acessei seu site e gostaria de informações sobre os pacotes práticos de habilitação.'
  )}`;

  const navLinks = [
    { label: 'Conheça a Estrutura', href: '#estrutura' },
    { label: 'Como Funciona', href: '#jornada' },
    { label: 'Pacotes Práticos', href: '#pacotes' },
    { label: 'Galeria', href: '#galeria' },
    { label: 'Perguntas Frequentes', href: '#faq' },
    { label: 'Contato', href: '#contato' }
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenAuth = (targetRole: 'admin' | 'aluno') => {
    if (onOpenAuthModal) {
      onOpenAuthModal(targetRole);
    } else {
      setRole(targetRole);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3">
            <LogoBadge size="md" showText={true} />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-700">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="hover:text-amber-600 transition-colors cursor-pointer py-1"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              onClick={() => handleOpenAuth('aluno')}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-700 hover:text-slate-900 border border-slate-300 rounded-lg hover:bg-slate-50 transition cursor-pointer"
              title="Acessar Área do Aluno com autenticação"
            >
              <User className="w-4 h-4 text-slate-500" />
              <span>Área do Aluno</span>
            </button>

            <button
              onClick={() => handleOpenAuth('admin')}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-amber-950 border border-amber-300 rounded-lg bg-amber-400 hover:bg-amber-300 transition cursor-pointer shadow-xs"
              title="Acesso Administrativo da Vanessa (Central Gestão)"
            >
              <Shield className="w-3.5 h-3.5 text-amber-950" />
              <span>Central Gestão</span>
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm transition cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => handleOpenAuth('aluno')}
              className="p-2 text-slate-600 hover:text-slate-900 border border-slate-200 rounded-lg text-xs flex items-center gap-1"
              title="Área do Aluno"
            >
              <User className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-slate-900 rounded-lg focus:outline-none"
              aria-label="Abrir menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <nav className="flex flex-col space-y-2">
            {navLinks.map(link => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left py-2 px-3 text-sm font-medium text-slate-800 hover:bg-slate-50 rounded-md"
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="pt-3 border-t border-slate-200 space-y-2">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp: {configuracoes.telefoneComercial}</span>
            </a>

            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenAuth('aluno');
                }}
                className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-slate-700 border border-slate-300 rounded-lg bg-slate-50"
              >
                <User className="w-3.5 h-3.5 text-slate-500" />
                <span>Portal do Aluno</span>
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleOpenAuth('admin');
                }}
                className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs font-semibold text-amber-900 border border-amber-300 rounded-lg bg-amber-50"
              >
                <Shield className="w-3.5 h-3.5 text-amber-700" />
                <span>Central Gestão</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
