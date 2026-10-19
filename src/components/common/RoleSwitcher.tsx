import React from 'react';
import { useAppStore } from '../../services/store';
import { UserRole } from '../../types';
import { ShieldCheck, UserCheck, Eye, RefreshCw, AlertCircle } from 'lucide-react';

export const RoleSwitcher: React.FC = () => {
  const { role, setRole, resetToDefaultData } = useAppStore();

  const roles: { id: UserRole; label: string; icon: React.ReactNode; desc: string }[] = [
    {
      id: 'public',
      label: 'Site Público',
      icon: <Eye className="w-3.5 h-3.5" />,
      desc: 'Visão do interessado / visitante'
    },
    {
      id: 'aluno',
      label: 'Área do Aluno',
      icon: <UserCheck className="w-3.5 h-3.5" />,
      desc: 'Portal pessoal da aluna (Mariana S.)'
    },
    {
      id: 'admin',
      label: 'Central de Gestão',
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
            Modo de Demonstração
          </span>
          <span className="text-slate-400 hidden sm:inline">|</span>
          <span className="text-slate-400 text-[11px] hidden md:inline">
            Alterne entre os ambientes para testar fluxos completos:
          </span>
        </div>

        <div className="flex items-center gap-1.5">
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
