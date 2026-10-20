import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variables for Supabase
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== 'https://your-project.supabase.co' &&
    !supabaseUrl.includes('placeholder')
  );
};

// Fallback dummy client if credentials are not configured yet, preventing runtime crashes
export const supabase: SupabaseClient = isSupabaseConfigured()
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    })
  : createClient('https://placeholder-project.supabase.co', 'placeholder-anon-key', {
      auth: {
        persistSession: false,
        autoRefreshToken: false
      }
    });

/**
 * Tests connection with the configured Supabase instance
 */
export async function testSupabaseConnection(): Promise<{ connected: boolean; message: string }> {
  if (!isSupabaseConfigured()) {
    return {
      connected: false,
      message: 'Variáveis VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY não estão configuradas no ambiente.'
    };
  }

  try {
    const { error } = await supabase.from('configuracoes').select('id').limit(1);
    if (error) {
      // If table doesn't exist yet, but connection reached Supabase
      if (error.code === '42P01') {
        return {
          connected: true,
          message: 'Conectado ao Supabase com sucesso! (As tabelas/migrations ainda precisam ser aplicadas).'
        };
      }
      return {
        connected: false,
        message: `Erro ao conectar com o Supabase: ${error.message}`
      };
    }
    return {
      connected: true,
      message: 'Conexão com o Supabase estabelecida e tabelas validadas com sucesso!'
    };
  } catch (err: unknown) {
    const errMessage = err instanceof Error ? err.message : String(err);
    return {
      connected: false,
      message: `Falha de rede ou configuração: ${errMessage}`
    };
  }
}
