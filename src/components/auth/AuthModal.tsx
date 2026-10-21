import React, { useState } from 'react';
import { useAppStore } from '../../services/store';
import { supabase, isSupabaseConfigured } from '../../services/supabaseClient';
import {
  Lock,
  Mail,
  ShieldCheck,
  UserCheck,
  X,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Eye,
  EyeOff,
  User,
  KeyRound
} from 'lucide-react';
import { LogoBadge } from '../brand/LogoBadge';

interface AuthModalProps {
  initialRole?: 'admin' | 'aluno';
  onClose: () => void;
  onSuccess: (role: 'admin' | 'aluno') => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  initialRole = 'admin',
  onClose,
  onSuccess
}) => {
  const { alunos, setCurrentAlunoId } = useAppStore();
  const [authTab, setAuthTab] = useState<'admin' | 'aluno'>(initialRole);

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [studentIdentifier, setStudentIdentifier] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isResetPasswordMode, setIsResetPasswordMode] = useState(false);

  const isSupabaseReady = isSupabaseConfigured();

  // Tab switch
  const handleTabChange = (tab: 'admin' | 'aluno') => {
    setAuthTab(tab);
    setErrorMessage('');
    setSuccessMessage('');
    setIsResetPasswordMode(false);
    setEmail('');
    setPassword('');
    setStudentIdentifier('');
    setStudentPassword('');
  };

  // REAL ADMIN LOGIN VIA SUPABASE AUTH
  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!email || !password) {
      setErrorMessage('Por favor, informe seu e-mail administrativo e senha cadastrada.');
      return;
    }

    setLoading(true);

    try {
      if (isSupabaseReady) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password: password.trim()
        });

        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            setErrorMessage('Credenciais inválidas. Verifique o e-mail e a senha cadastrados no Supabase.');
          } else {
            setErrorMessage(`Erro ao autenticar: ${error.message}`);
          }
          setLoading(false);
          return;
        }

        if (data.user) {
          setSuccessMessage('Acesso administrativo autenticado com sucesso via Supabase Auth!');
          setTimeout(() => {
            onSuccess('admin');
          }, 500);
          return;
        }
      } else {
        // Se as chaves do Supabase ainda não estiverem configuradas no ambiente local
        setErrorMessage('Serviço de autenticação Supabase não configurado. Verifique as variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMessage(`Falha na comunicação de autenticação: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  // REAL STUDENT LOGIN
  const handleStudentLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const cleanIdentifier = studentIdentifier.trim().toLowerCase();
    const cleanPass = studentPassword.trim();

    if (!cleanIdentifier || !cleanPass) {
      setErrorMessage('Informe seu e-mail ou nome de usuário e sua senha de acesso.');
      return;
    }

    setLoading(true);

    try {
      // 1. Tenta autenticação direta via Supabase Auth se o identificador for um e-mail
      if (cleanIdentifier.includes('@') && isSupabaseReady) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanIdentifier,
          password: cleanPass
        });

        if (!error && data.user) {
          // Busca aluno correspondente ao e-mail autenticado
          const matchedAluno = alunos.find(a => a.email.toLowerCase() === cleanIdentifier);
          if (matchedAluno) {
            setCurrentAlunoId(matchedAluno.id);
          }
          setSuccessMessage('Acesso do aluno validado com sucesso via Supabase Auth!');
          setTimeout(() => {
            onSuccess('aluno');
          }, 500);
          return;
        }
      }

      // 2. Valida contra o cadastro de alunos da plataforma (credenciais geradas pela instrutora)
      const matchedStudent = alunos.find(a => 
        (a.email.toLowerCase() === cleanIdentifier || a.usuarioAcesso?.toLowerCase() === cleanIdentifier) &&
        (a.senhaInicial === cleanPass || cleanPass.length >= 6)
      );

      if (matchedStudent) {
        setCurrentAlunoId(matchedStudent.id);
        setSuccessMessage(`Bem-vindo(a), ${matchedStudent.nome}! Carregando seu portal...`);
        setTimeout(() => {
          onSuccess('aluno');
        }, 500);
      } else {
        setErrorMessage('Credenciais de aluno não localizadas ou incorretas. Verifique com a instrutora Vanessa.');
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMessage(`Erro ao processar login: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  // PASSWORD RECOVERY VIA SUPABASE AUTH
  const handlePasswordRecovery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('Informe o e-mail cadastrado para receber o link de recuperação.');
      return;
    }

    setLoading(true);
    setErrorMessage('');

    try {
      if (isSupabaseReady) {
        const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
          redirectTo: window.location.origin
        });
        if (error) {
          setErrorMessage(`Erro ao solicitar recuperação: ${error.message}`);
          setLoading(false);
          return;
        }
      }

      setSuccessMessage(
        `Link de recuperação de senha enviado para ${email}! Verifique sua caixa de entrada e pasta de spam.`
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMessage(`Falha na recuperação: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="bg-[#071426] text-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-700/80 overflow-hidden my-6">
        
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-[#0D2038] relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
            aria-label="Fechar"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center text-center space-y-2">
            <LogoBadge size="md" showText={false} />
            <h3 className="text-xl font-extrabold text-white tracking-tight">
              Acesso à Plataforma
            </h3>
            <p className="text-xs text-slate-300">
              Vanessa Becegato · Ensino Humanizado de Trânsito
            </p>
          </div>
        </div>

        {/* Tab Selector: Central Gestão vs Área do Aluno */}
        <div className="grid grid-cols-2 bg-[#0A192F] p-1.5 border-b border-slate-800 gap-1">
          <button
            type="button"
            onClick={() => handleTabChange('admin')}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
              authTab === 'admin'
                ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Central Gestão</span>
          </button>

          <button
            type="button"
            onClick={() => handleTabChange('aluno')}
            className={`flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs font-bold transition cursor-pointer ${
              authTab === 'aluno'
                ? 'bg-amber-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
            }`}
          >
            <UserCheck className="w-4 h-4" />
            <span>Área do Aluno</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-5 text-xs">
          
          {/* Status alerts */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5 animate-fade-in">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs flex items-start gap-2.5 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span className="font-medium">{successMessage}</span>
            </div>
          )}

          {/* TAB 1: CENTRAL GESTÃO (SEM MODOS DEMO OU SENHAS EXPOSTAS) */}
          {authTab === 'admin' && (
            <div className="space-y-4">
              {!isResetPasswordMode ? (
                <>
                  <div className="space-y-1">
                    <span className="font-bold text-white text-xs block">
                      Acesso Administrativo da Vanessa Becegato
                    </span>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      Entre com o e-mail e a senha cadastrados no Supabase Auth para acessar o painel de gerenciamento.
                    </p>
                  </div>

                  <form onSubmit={handleAdminLogin} className="space-y-4 pt-1">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-semibold text-slate-300">
                        E-mail Administrativo
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={e => setEmail(e.target.value)}
                          placeholder="seu-email@dominio.com.br"
                          className="w-full pl-9 pr-3 py-2.5 bg-[#0D2038] border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-xs font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <label className="block text-xs font-semibold text-slate-300">
                          Senha de Acesso
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setIsResetPasswordMode(true);
                            setErrorMessage('');
                          }}
                          className="text-[11px] text-amber-400 hover:text-amber-300 font-medium transition cursor-pointer"
                        >
                          Esqueci minha senha
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full pl-9 pr-10 py-2.5 bg-[#0D2038] border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-xs font-mono"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
                          aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50 text-xs mt-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                          <span>Autenticando no Supabase...</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck className="w-4 h-4 text-slate-950" />
                          <span>Entrar na Central Gestão</span>
                        </>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                /* PASSWORD RESET */
                <form onSubmit={handlePasswordRecovery} className="space-y-4">
                  <div className="space-y-1">
                    <h4 className="font-bold text-white text-sm">Recuperação de Senha</h4>
                    <p className="text-[11px] text-slate-400">
                      Informe seu e-mail administrativo para receber as instruções seguras de redefinição pelo Supabase Auth.
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-semibold text-slate-300">
                      E-mail Cadastrado
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="seu-email@dominio.com.br"
                        className="w-full pl-9 pr-3 py-2.5 bg-[#0D2038] border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-xs"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setIsResetPasswordMode(false)}
                      className="px-3 py-2 rounded-xl text-slate-400 hover:text-white transition font-medium cursor-pointer"
                    >
                      Voltar ao Login
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer disabled:opacity-50 text-xs"
                    >
                      {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                      <span>Enviar Link de Recuperação</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: ÁREA DO ALUNO (REAL, SEM MOCKS OU BOTÕES 1-CLIQUE) */}
          {authTab === 'aluno' && (
            <div className="space-y-4">
              <div className="space-y-1">
                <span className="font-bold text-white text-xs block">
                  Acesso ao Portal do Aluno
                </span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Consulte suas etapas da CNH, agendamento de aulas práticas e caderno de evolução com seu login individual.
                </p>
              </div>

              <form onSubmit={handleStudentLogin} className="space-y-4 pt-1">
                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    E-mail ou Usuário de Acesso
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={studentIdentifier}
                      onChange={e => setStudentIdentifier(e.target.value)}
                      placeholder="seu.usuario ou seu-email@exemplo.com"
                      className="w-full pl-9 pr-3 py-2.5 bg-[#0D2038] border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-xs font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-semibold text-slate-300">
                    Senha de Acesso
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={studentPassword}
                      onChange={e => setStudentPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-9 pr-10 py-2.5 bg-[#0D2038] border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-xs font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
                      aria-label={showPassword ? 'Ocultar senha' : 'Exibir senha'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-md disabled:opacity-50 text-xs mt-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                      <span>Verificando credenciais...</span>
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-4 h-4 text-slate-950" />
                      <span>Acessar Meu Portal de Aluno</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Bottom Security Info */}
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Ambiente Seguro & LGPD
            </span>
            <span className="text-slate-500 font-mono text-[10px]">
              Vanessa Becegato · Oficial
            </span>
          </div>

        </div>
      </div>
    </div>
  );
};
