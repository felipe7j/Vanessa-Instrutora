import React, { useState } from 'react';
import { useAppStore } from '../../services/store';

interface LogoBadgeProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  variant?: 'light' | 'dark' | 'document';
}

export const LogoBadge: React.FC<LogoBadgeProps> = ({
  size = 'md',
  showText = true,
  className = '',
  variant = 'light'
}) => {
  const { configuracoes } = useAppStore();
  const [imageError, setImageError] = useState(false);

  const pixelSizes = {
    sm: 36,
    md: 46,
    lg: 64,
    xl: 96
  };

  const dim = pixelSizes[size];
  const customLogoUrl = configuracoes.logoUrl?.trim();

  // If user has uploaded or configured a logo image and it has not errored
  const hasCustomLogo = Boolean(customLogoUrl && !imageError);

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {hasCustomLogo ? (
        <div
          style={{ width: `${dim}px`, height: `${dim}px` }}
          className="rounded-xl overflow-hidden shadow-xs border border-amber-300/60 bg-white shrink-0 flex items-center justify-center p-0.5"
        >
          <img
            src={customLogoUrl}
            alt="Logo Vanessa Becegato"
            onError={() => setImageError(true)}
            className="w-full h-full object-contain rounded-lg"
          />
        </div>
      ) : (
        /* Clean, refined luxury executive monogram */
        <div
          style={{ width: `${dim}px`, height: `${dim}px` }}
          className="rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-amber-950 border border-amber-400/50 flex flex-col items-center justify-center shrink-0 shadow-sm relative overflow-hidden"
          role="img"
          aria-label="Vanessa Becegato"
        >
          <span
            className="font-bold font-serif tracking-wide text-amber-300 select-none leading-none"
            style={{ fontSize: `${Math.round(dim * 0.42)}px` }}
          >
            VB
          </span>
          <span
            className="text-[8px] uppercase tracking-widest font-sans font-bold text-amber-200/80 -mt-0.5"
            style={{ fontSize: `${Math.max(7, Math.round(dim * 0.14))}px` }}
          >
            AUTO
          </span>
        </div>
      )}

      {/* Typography side label */}
      {showText && (
        <div className="flex flex-col">
          <span
            className={`font-black tracking-tight leading-none ${
              variant === 'dark' ? 'text-white' : 'text-slate-900'
            } ${size === 'lg' || size === 'xl' ? 'text-lg md:text-xl' : 'text-base md:text-lg'}`}
          >
            Vanessa Becegato
          </span>
          <span
            className={`text-[11px] font-semibold tracking-wider uppercase mt-1 ${
              variant === 'dark' ? 'text-amber-400' : 'text-amber-700'
            }`}
          >
            Estrutura Autônoma de Trânsito
          </span>
        </div>
      )}
    </div>
  );
};
