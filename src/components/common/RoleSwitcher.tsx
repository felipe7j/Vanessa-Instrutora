import React from 'react';
import { useAppStore } from '../../services/store';
import { UserRole } from '../../types';
import { ShieldCheck, UserCheck, Eye, RefreshCw, KeyRound, Sparkles } from 'lucide-react';

interface RoleSwitcherProps {
  onOpenAuthModal?: (role: 'admin' | 'aluno') => void;
}

export const RoleSwitcher: React.FC<RoleSwitcherProps> = ({ onOpenAuthModal }) => {
  const { role, setRole, resetToDefaultData, currentAlunoId, alunos } = useAppStore();

  const currentAluno = alunos.find(a => a.id === currentAlunoId) || alunos[0];

  const roles: { id: UserRole; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: 'public',
      label: 'Site Público',
      icon: <Eye className="w-3.5 h-3.5" />,
      desc: 'Visão do interessado / visitante'
    },
    {
      id: 'aluno',
      label: `Área do Aluno (${currentAluno?.nome?.split(' ')[0] || 'Mariana'})`,
      icon: <UserCheck className="w-3.5 h-3.5" />,
      desc: 'Portal pessoal da aluna (Mariana S.)'
    },
    {
      id: 'admin',
      label: 'Central Gestão',
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
      desc: 'Painel administrativo (Vanessa Becegato)'
    }
  ];

  const [showConfirmReset, setShowConfirmReset] = React.useState(false);

  return (
    <div className="bg-slate-900 text-slate-200 border-b border-slate-800 text-xs py-1.5 px-4 relative">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-amber-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            Ambientes da Plataforma
          </span>
          <span className="text-slate-400 hidden sm:inline">|</span>
          <span className="text-slate-400 text-[11px] hidden md:inline">
            Navegue pelos módulos ou teste a autenticação de login:
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {/* Direct Role switches */}
          {roles.map(r => {
            const isActive = role === r.id;
            return (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                title={r.desc}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded transition-colors text-xs font-medium cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-sm font-semibold'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {r.icon}
                <span>{r.label}</span>
              </button>
            );
          })}

          {/* Test Login Buttons */}
          {onOpenAuthModal && (
            <div className="flex items-center gap-1 ml-1 pl-1.5 border-l border-slate-700">
              <button
                onClick={() => onOpenAuthModal('admin')}
                className="flex items-center gap-1 px-2 py-1 bg-amber-400/20 text-amber-300 border border-amber-400/40 hover:bg-amber-400/30 rounded text-[11px] font-bold transition cursor-pointer"
                title="Abrir tela de login da Central Gestão"
              >
                <KeyRound className="w-3 h-3 text-amber-400" />
                <span>Login Gestão</span>
              </button>
              <button
                onClick={() => onOpenAuthModal('aluno')}
                className="flex items-center gap-1 px-2 py-1 bg-sky-500/20 text-sky-300 border border-sky-400/40 hover:bg-sky-500/30 rounded text-[11px] font-bold transition cursor-pointer"
                title="Abrir tela de login do Aluno (com exemplo)"
              >
                <Sparkles className="w-3 h-3 text-sky-400" />
                <span>Login Aluno (Exemplo)</span>
              </button>
            </div>
          )}

          {showConfirmReset ? (
            <div className="flex items-center gap-1.5 ml-2 bg-slate-800 px-2 py-0.5 rounded border border-slate-700 animate-fade-in">
              <span className="text-[10px] text-amber-300 font-bold">Restaurar dados?</span>
              <button
                onClick={() => {
                  resetToDefaultData();
                  setShowConfirmReset(false);
                }}
                className="text-[10px] bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded font-bold cursor-pointer hover:bg-amber-400"
              >
                Sim
              </button>
              <button
                onClick={() => setShowConfirmReset(false)}
                className="text-[10px] text-slate-400 hover:text-white px-1 cursor-pointer"
              >
                Não
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowConfirmReset(true)}
              title="Restaurar dados iniciais padrão"
              className="ml-2 text-slate-400 hover:text-slate-200 p-1 rounded hover:bg-slate-800 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
