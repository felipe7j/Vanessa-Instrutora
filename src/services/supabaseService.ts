import { supabase, isSupabaseConfigured } from './supabaseClient';
import {
  Aluno,
  Aula,
  ConfiguracoesPlataforma,
  Contrato,
  DocumentoAluno,
  EtapaJornada,
  FotoGaleria,
  HistoricoEnvio,
  Instrutor,
  Interessado,
  ModeloDocumento,
  PacotePratico,
  ProgressoAlunoEtapa,
  Recibo,
  RegistroAuditoria,
  RegistroEvolucao,
  Veiculo
} from '../types';

/**
 * Service to interact directly with Supabase Database tables
 */
export const supabaseService = {
  isReady: isSupabaseConfigured,

  // --- CONFIGURAÇÕES ---
  async fetchConfiguracoes(): Promise<ConfiguracoesPlataforma | null> {
    if (!isSupabaseConfigured()) return null;
    const { data, error } = await supabase.from('configuracoes').select('*').limit(1).single();
    if (error || !data) return null;
    return {
      nomeComercial: data.nome_comercial,
      posicionamento: data.posicionamento,
      whatsappOficial: data.whatsapp_oficial,
      telefoneComercial: data.telefone_comercial,
      emailContato: data.email_contato,
      instagram: data.instagram,
      cidadeAtendimento: data.cidade_atendimento,
      avisoLegalDetran: data.aviso_legal_detran,
      avisoRevisaoTexto: data.aviso_revisao_texto,
      dataUltimaConferenciaDetran: data.data_ultima_conferencia_detran,
      responsavelConferencia: data.responsavel_conferencia,
      logoUrl: data.logo_url || undefined,
      razaoSocialContratada: data.razao_social_contratada || undefined,
      cpfCnpjContratada: data.cpf_cnpj_contratada || undefined,
      registroInstrutora: data.registro_instrutora || undefined,
      enderecoContratada: data.endereco_contratada || undefined,
      provedorEmailConfigurado: data.provedor_email_configurado
    };
  },

  async saveConfiguracoes(cfg: ConfiguracoesPlataforma): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    const payload = {
      id: 'config-default',
      nome_comercial: cfg.nomeComercial,
      posicionamento: cfg.posicionamento,
      whatsapp_oficial: cfg.whatsappOficial,
      telefone_comercial: cfg.telefoneComercial,
      email_contato: cfg.emailContato,
      instagram: cfg.instagram,
      cidade_atendimento: cfg.cidadeAtendimento,
      aviso_legal_detran: cfg.avisoLegalDetran,
      aviso_revisao_texto: cfg.avisoRevisaoTexto,
      data_ultima_conferencia_detran: cfg.dataUltimaConferenciaDetran,
      responsavel_conferencia: cfg.responsavelConferencia,
      logo_url: cfg.logoUrl || null,
      razao_social_contratada: cfg.razaoSocialContratada || null,
      cpf_cnpj_contratada: cfg.cpfCnpjContratada || null,
      registro_instrutora: cfg.registroInstrutora || null,
      endereco_contratada: cfg.enderecoContratada || null,
      provedor_email_configurado: cfg.provedorEmailConfigurado ?? true
    };
    const { error } = await supabase.from('configuracoes').upsert(payload);
    return !error;
  },

  // --- ALUNOS ---
  async fetchAlunos(): Promise<Aluno[] | null> {
    if (!isSupabaseConfigured()) return null;
    const { data, error } = await supabase.from('alunos').select('*').order('nome');
    if (error || !data) return null;
    return data.map(row => ({
      id: row.id,
      nome: row.nome,
      email: row.email,
      telefone: row.telefone,
      categoria: row.categoria,
      statusProcesso: row.status_processo,
      etapaAtualId: row.etapa_atual_id,
      dataMatricula: row.data_matricula,
      pacoteContratado: row.pacote_contratado,
      totalAulasContratadas: row.total_aulas_contratadas,
      aulasRealizadas: row.aulas_realizadas,
      observacoes: row.observacoes || undefined,
      comunicacaoWhatsapp: row.comunicacao_whatsapp,
      comunicacaoEmail: row.comunicacao_email
    }));
  },

  async upsertAluno(aluno: Aluno): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    const { error } = await supabase.from('alunos').upsert({
      id: aluno.id,
      nome: aluno.nome,
      email: aluno.email,
      telefone: aluno.telefone,
      categoria: aluno.categoria,
      status_processo: aluno.statusProcesso,
      etapa_atual_id: aluno.etapaAtualId,
      data_matricula: aluno.dataMatricula,
      pacote_contratado: aluno.pacoteContratado,
      total_aulas_contratadas: aluno.totalAulasContratadas,
      aulas_realizadas: aluno.aulasRealizadas,
      observacoes: aluno.observacoes || null,
      comunicacao_whatsapp: aluno.comunicacaoWhatsapp,
      comunicacao_email: aluno.comunicacaoEmail
    });
    return !error;
  },

  // --- VEÍCULOS ---
  async fetchVeiculos(): Promise<Veiculo[] | null> {
    if (!isSupabaseConfigured()) return null;
    const { data, error } = await supabase.from('veiculos').select('*').order('codigo_interno');
    if (error || !data) return null;
    return data.map(row => ({
      id: row.id,
      codigoInterno: row.codigo_interno,
      marcaModelo: row.marca_modelo,
      ano: row.ano,
      placaMascarada: row.placa_mascarada,
      categoria: row.categoria,
      status: row.status,
      quilometragem: row.quilometragem || 0,
      proximaManutencao: row.proxima_manutencao,
      alertaManutencao: row.alerta_manutencao || undefined,
      ativo: row.ativo
    }));
  },

  async upsertVeiculo(veic: Veiculo): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    const { error } = await supabase.from('veiculos').upsert({
      id: veic.id,
      codigo_interno: veic.codigoInterno,
      marca_modelo: veic.marcaModelo,
      ano: veic.ano,
      placa_mascarada: veic.placaMascarada,
      categoria: veic.categoria,
      status: veic.status,
      quilometragem: veic.quilometragem,
      proxima_manutencao: veic.proximaManutencao,
      alerta_manutencao: veic.alertaManutencao || null,
      ativo: veic.ativo
    });
    return !error;
  },

  // --- CONTRATOS ---
  async fetchContratos(): Promise<Contrato[] | null> {
    if (!isSupabaseConfigured()) return null;
    const { data, error } = await supabase.from('contratos').select('*').order('created_at', { ascending: false });
    if (error || !data) return null;
    return data.map(row => ({
      id: row.id,
      numeroContrato: row.numero_contrato,
      alunoId: row.aluno_id,
      alunoNome: row.aluno_nome,
      alunoCpf: row.aluno_cpf || undefined,
      alunoRg: row.aluno_rg || undefined,
      alunoEndereco: row.aluno_endereco || undefined,
      alunoTelefone: row.aluno_telefone,
      alunoEmail: row.aluno_email || undefined,
      pacoteNome: row.pacote_nome,
      quantidadeAulas: row.quantidade_aulas,
      duracaoAulaMinutos: row.duracao_aula_minutos,
      categoria: row.categoria,
      valorTotal: Number(row.valor_total),
      formaPagamento: row.forma_pagamento,
      dataInicioPrevista: row.data_inicio_prevista,
      versaoModelo: row.versao_modelo,
      status: row.status,
      dataCriacao: row.data_criacao,
      dataAceite: row.data_aceite || undefined,
      evidenciaAceiteIp: row.evidencia_aceite_ip || undefined,
      evidenciaAceiteDataHora: row.evidencia_aceite_data_hora || undefined,
      dataAssinatura: row.data_assinatura || undefined,
      motivoCancelamento: row.motivo_cancelamento || undefined,
      pdfGeradoEm: row.pdf_gerado_em || undefined
    }));
  },

  async upsertContrato(ct: Contrato): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    const { error } = await supabase.from('contratos').upsert({
      id: ct.id,
      numero_contrato: ct.numeroContrato,
      aluno_id: ct.alunoId,
      aluno_nome: ct.alunoNome,
      aluno_cpf: ct.alunoCpf || null,
      aluno_rg: ct.alunoRg || null,
      aluno_endereco: ct.alunoEndereco || null,
      aluno_telefone: ct.alunoTelefone,
      aluno_email: ct.alunoEmail || null,
      pacote_nome: ct.pacoteNome,
      quantidade_aulas: ct.quantidadeAulas,
      duracao_aula_minutos: ct.duracaoAulaMinutos,
      categoria: ct.categoria,
      valor_total: ct.valorTotal,
      forma_pagamento: ct.formaPagamento,
      data_inicio_prevista: ct.dataInicioPrevista,
      versao_modelo: ct.versaoModelo,
      status: ct.status,
      data_criacao: ct.dataCriacao,
      data_aceite: ct.dataAceite || null,
      evidencia_aceite_ip: ct.evidenciaAceiteIp || null,
      evidencia_aceite_data_hora: ct.evidenciaAceiteDataHora || null,
      data_assinatura: ct.dataAssinatura || null,
      motivo_cancelamento: ct.motivoCancelamento || null,
      pdf_gerado_em: ct.pdfGeradoEm || null
    });
    return !error;
  },

  // --- RECIBOS ---
  async fetchRecibos(): Promise<Recibo[] | null> {
    if (!isSupabaseConfigured()) return null;
    const { data, error } = await supabase.from('recibos').select('*').order('created_at', { ascending: false });
    if (error || !data) return null;
    return data.map(row => ({
      id: row.id,
      numeroRecibo: row.numero_recibo,
      alunoId: row.aluno_id,
      alunoNome: row.aluno_nome,
      pagadorNome: row.pagador_nome,
      pagadorCpf: row.pagador_cpf || undefined,
      contratoId: row.contrato_id || undefined,
      servicoDescricao: row.servico_descricao,
      valorRecebido: Number(row.valor_recebido),
      formaPagamento: row.forma_pagamento,
      dataPagamento: row.data_pagamento,
      dataEmissao: row.data_emissao,
      emitidoPor: row.emitido_por,
      status: row.status,
      observacoes: row.observacoes || undefined
    }));
  },

  async upsertRecibo(rec: Recibo): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    const { error } = await supabase.from('recibos').upsert({
      id: rec.id,
      numero_recibo: rec.numeroRecibo,
      aluno_id: rec.alunoId,
      aluno_nome: rec.alunoNome,
      pagador_nome: rec.pagadorNome,
      pagador_cpf: rec.pagadorCpf || null,
      contrato_id: rec.contratoId || null,
      servico_descricao: rec.servicoDescricao,
      valor_recebido: rec.valorRecebido,
      forma_pagamento: rec.formaPagamento,
      data_pagamento: rec.dataPagamento,
      data_emissao: rec.dataEmissao,
      emitido_por: rec.emitidoPor,
      status: rec.status,
      observacoes: rec.observacoes || null
    });
    return !error;
  },

  // --- INTERESSADOS (LEADS DO SITE) ---
  async insertInteressado(lead: Interessado): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    const { error } = await supabase.from('interessados').insert({
      id: lead.id,
      nome: lead.nome,
      telefone: lead.telefone,
      email: lead.email || null,
      servico_interesse: lead.servicoInteresse,
      categoria_desejada: lead.categoriaDesejada,
      horario_preferencial: lead.horarioPreferencial || null,
      mensagem: lead.mensagem || null,
      status: lead.status,
      origem: lead.origem,
      data_criacao: lead.dataCriacao,
      notas_atendimento: lead.notasAtendimento || null
    });
    return !error;
  },

  // --- GALERIA DE FOTOS ---
  async fetchGaleria(): Promise<FotoGaleria[] | null> {
    if (!isSupabaseConfigured()) return null;
    const { data, error } = await supabase.from('galeria_fotos').select('*').order('created_at', { ascending: false });
    if (error || !data) return null;
    return data.map(row => ({
      id: row.id,
      titulo: row.titulo,
      categoria: row.categoria,
      descricao: row.descricao,
      imagemUrl: row.imagem_url,
      destaque: row.destaque
    }));
  },

  async upsertFotoGaleria(foto: FotoGaleria): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    const { error } = await supabase.from('galeria_fotos').upsert({
      id: foto.id,
      titulo: foto.titulo,
      categoria: foto.categoria,
      descricao: foto.descricao,
      imagem_url: foto.imagemUrl,
      destaque: foto.destaque ?? false
    });
    return !error;
  },

  async deleteFotoGaleria(id: string): Promise<boolean> {
    if (!isSupabaseConfigured()) return false;
    const { error } = await supabase.from('galeria_fotos').delete().eq('id', id);
    return !error;
  },

  // --- SINCRONIZAÇÃO COMPLETA LOCAL -> SUPABASE ---
  async syncAllToSupabase(allData: {
    configuracoes: ConfiguracoesPlataforma;
    pacotes: PacotePratico[];
    etapas: EtapaJornada[];
    instrutores: Instrutor[];
    veiculos: Veiculo[];
    alunos: Aluno[];
    interessados: Interessado[];
    contratos: Contrato[];
    recibos: Recibo[];
    modeloContrato: ModeloDocumento;
    galeria: FotoGaleria[];
  }): Promise<{ success: boolean; message: string; details?: Record<string, number> }> {
    if (!isSupabaseConfigured()) {
      return {
        success: false,
        message: 'Supabase não está configurado. Preencha VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.'
      };
    }

    try {
      // 1. Configurações
      await supabaseService.saveConfiguracoes(allData.configuracoes);

      // 2. Pacotes
      for (const p of allData.pacotes) {
        await supabase.from('pacotes_praticos').upsert({
          id: p.id,
          nome: p.nome,
          aulas: p.aulas,
          indicado_para: p.indicadoPara,
          foco: p.foco,
          destaque: p.destaque ?? false,
          badge: p.badge || null
        });
      }

      // 3. Etapas
      for (const e of allData.etapas) {
        await supabase.from('etapas_jornada').upsert({
          id: e.id,
          ordem: e.ordem,
          titulo: e.titulo,
          descricao: e.descricao,
          categoria_aplicavel: e.categoriaAplicavel,
          pre_requisitos: e.preRequisitos,
          acoes_recomendadas: e.acoesRecomendadas,
          documentos_necessarios: e.documentosNecessarios,
          orgao_responsavel: e.orgaoResponsavel,
          link_oficial: e.linkOficial,
          fonte_referencia: e.fonteReferencia,
          data_ultima_revisao: e.dataUltimaRevisao,
          responsavel_revisao: e.responsavelRevisao,
          precisa_revisao: e.precisaRevisao,
          depende_confirmacao_oficial: e.dependeConfirmacaoOficial,
          observacoes: e.observacoes
        });
      }

      // 4. Instrutores
      for (const inst of allData.instrutores) {
        await supabase.from('instrutores').upsert({
          id: inst.id,
          nome: inst.nome,
          telefone: inst.telefone,
          email: inst.email,
          categorias_autorizadas: inst.categoriasAutorizadas,
          ativo: inst.ativo,
          credencial_valida: inst.credencialValida,
          observacoes_internas: inst.observacoesInternas || null
        });
      }

      // 5. Veículos
      for (const v of allData.veiculos) {
        await supabaseService.upsertVeiculo(v);
      }

      // 6. Alunos
      for (const al of allData.alunos) {
        await supabaseService.upsertAluno(al);
      }

      // 7. Interessados
      for (const lead of allData.interessados) {
        await supabase.from('interessados').upsert({
          id: lead.id,
          nome: lead.nome,
          telefone: lead.telefone,
          email: lead.email || null,
          servico_interesse: lead.servicoInteresse,
          categoria_desejada: lead.categoriaDesejada,
          horario_preferencial: lead.horarioPreferencial || null,
          mensagem: lead.mensagem || null,
          status: lead.status,
          origem: lead.origem,
          data_criacao: lead.dataCriacao,
          notas_atendimento: lead.notasAtendimento || null
        });
      }

      // 8. Modelo de Contrato
      const m = allData.modeloContrato;
      await supabase.from('modelos_documentos').upsert({
        id: m.id,
        tipo: m.tipo,
        titulo: m.titulo,
        versao: m.versao,
        ativo: m.ativo,
        estado: m.estado,
        data_criacao: m.dataCriacao,
        responsavel_alteracao: m.responsavelAlteracao,
        clausulas: m.clausulas
      });

      // 9. Contratos
      for (const ct of allData.contratos) {
        await supabaseService.upsertContrato(ct);
      }

      // 10. Recibos
      for (const rec of allData.recibos) {
        await supabaseService.upsertRecibo(rec);
      }

      // 11. Galeria
      for (const f of allData.galeria) {
        await supabaseService.upsertFotoGaleria(f);
      }

      return {
        success: true,
        message: 'Todos os dados locais foram sincronizados com sucesso no Supabase!',
        details: {
          veiculos: allData.veiculos.length,
          alunos: allData.alunos.length,
          contratos: allData.contratos.length,
          recibos: allData.recibos.length,
          galeria: allData.galeria.length
        }
      };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      return {
        success: false,
        message: `Falha na sincronização com Supabase: ${msg}`
      };
    }
  }
};
