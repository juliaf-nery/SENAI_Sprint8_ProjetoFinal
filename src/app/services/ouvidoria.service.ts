import { Injectable } from '@angular/core';

export type StatusManifestacao = 'recebido' | 'analise' | 'respondido' | 'concluido';

export type RemetenteManifestacao = 'aluno' | 'professor';

export interface EtapaManifestacao {
  status: StatusManifestacao;
  label: string;
  data?: string;
  concluida: boolean;
}

export interface RespostaEscola {
  texto: string;
  autor: string;
  data: string;
}

export interface Manifestacao {
  protocolo: string;
  /** Quem enviou a manifestação. A identidade da pessoa continua sigilosa — só o perfil (aluno/professor) é exposto. */
  remetente: RemetenteManifestacao;
  titulo: string;
  categorias: string[];
  descricao: string;
  data: string;
  statusAtual: StatusManifestacao;
  etapas: EtapaManifestacao[];
  resposta?: RespostaEscola;
}

/**
 * Fonte única das manifestações da Ouvidoria Escolar.
 * - Aluno e Professor enviam manifestações e acompanham "Minhas Manifestações".
 * - Direção Escolar (e Administrador) recebe todas as manifestações e as responde
 *   em "Manifestações Recebidas" / "Manifestações Respondidas".
 * Como é a mesma fonte de dados, a resposta dada pela Direção aparece
 * imediatamente também para quem enviou a manifestação original.
 */
@Injectable({
  providedIn: 'root',
})
export class OuvidoriaService {
  private proximoProtocolo = 920;

  readonly manifestacoes: Manifestacao[] = [
    {
      protocolo: '#2026-0842',
      remetente: 'aluno',
      titulo: 'Lâmpada queimada na sala 12',
      categorias: ['Infraestrutura'],
      descricao: 'A lâmpada do fundo da sala 12 está queimada há alguns dias, dificultando a leitura durante as aulas da tarde. Poderiam trocar assim que possível?',
      data: '05/07/2026',
      statusAtual: 'concluido',
      etapas: [
        { status: 'recebido', label: 'Recebido', data: '05/07/2026 08:30', concluida: true },
        { status: 'analise', label: 'Em análise', data: '05/07/2026 14:00', concluida: true },
        { status: 'respondido', label: 'Respondido', data: '06/07/2026 10:00', concluida: true },
        { status: 'concluido', label: 'Concluído', data: '07/07/2026 09:00', concluida: true },
      ],
      resposta: {
        texto: 'Obrigado pelo aviso! A manutenção já trocou a lâmpada da sala 12 no dia 07/07. Qualquer novo problema, é só nos avisar por aqui.',
        autor: 'Direção Escolar',
        data: '07/07/2026 09:00',
      },
    },
    {
      protocolo: '#2026-0901',
      remetente: 'aluno',
      titulo: 'Sugestão de atividade extracurricular',
      categorias: ['Sugestão', 'Ensino'],
      descricao: 'Seria muito bacana se a escola oferecesse uma oficina de robótica no contraturno. Vários colegas da minha turma teriam interesse em participar.',
      data: '08/07/2026',
      statusAtual: 'analise',
      etapas: [
        { status: 'recebido', label: 'Recebido', data: '08/07/2026 16:00', concluida: true },
        { status: 'analise', label: 'Em análise', data: '09/07/2026 09:00', concluida: true },
        { status: 'respondido', label: 'Respondido', concluida: false },
        { status: 'concluido', label: 'Concluído', concluida: false },
      ],
    },
    {
      protocolo: '#2026-0918',
      remetente: 'aluno',
      titulo: 'Bebedouro quebrado no pátio principal',
      categorias: ['Infraestrutura'],
      descricao: 'O bebedouro do pátio principal, perto da quadra, está vazando e sem pressão de água há uns dois dias.',
      data: '11/07/2026',
      statusAtual: 'recebido',
      etapas: [
        { status: 'recebido', label: 'Recebido', data: '11/07/2026 12:40', concluida: true },
        { status: 'analise', label: 'Em análise', concluida: false },
        { status: 'respondido', label: 'Respondido', concluida: false },
        { status: 'concluido', label: 'Concluído', concluida: false },
      ],
    },
    {
      protocolo: '#2026-0715',
      remetente: 'professor',
      titulo: 'Projetor da sala de Matemática com defeito',
      categorias: ['Infraestrutura', 'Gestão'],
      descricao: 'O projetor da sala 08 está apresentando falhas de imagem há duas semanas, o que vem prejudicando as aulas que dependem de recursos visuais.',
      data: '01/07/2026',
      statusAtual: 'concluido',
      etapas: [
        { status: 'recebido', label: 'Recebido', data: '01/07/2026 07:45', concluida: true },
        { status: 'analise', label: 'Em análise', data: '01/07/2026 13:00', concluida: true },
        { status: 'respondido', label: 'Respondido', data: '04/07/2026 09:00', concluida: true },
        { status: 'concluido', label: 'Concluído', data: '04/07/2026 09:00', concluida: true },
      ],
      resposta: {
        texto: 'O projetor da sala 08 foi substituído no dia 04/07. Qualquer novo problema com equipamentos, pode registrar por aqui.',
        autor: 'Direção Escolar',
        data: '04/07/2026 09:00',
      },
    },
    {
      protocolo: '#2026-0868',
      remetente: 'professor',
      titulo: 'Solicitação de material pedagógico complementar',
      categorias: ['Gestão', 'Sugestão'],
      descricao: 'Solicito a aquisição de calculadoras científicas para uso compartilhado nas turmas do 3º ano, já que muitos alunos não possuem o material em casa.',
      data: '06/07/2026',
      statusAtual: 'analise',
      etapas: [
        { status: 'recebido', label: 'Recebido', data: '06/07/2026 11:20', concluida: true },
        { status: 'analise', label: 'Em análise', data: '07/07/2026 09:00', concluida: true },
        { status: 'respondido', label: 'Respondido', concluida: false },
        { status: 'concluido', label: 'Concluído', concluida: false },
      ],
    },
    {
      protocolo: '#2026-0910',
      remetente: 'professor',
      titulo: 'Elogio à equipe da coordenação pedagógica',
      categorias: ['Elogio'],
      descricao: 'Gostaria de registrar um elogio ao suporte dado pela coordenação pedagógica na organização do conselho de classe deste bimestre.',
      data: '09/07/2026',
      statusAtual: 'recebido',
      etapas: [
        { status: 'recebido', label: 'Recebido', data: '09/07/2026 15:10', concluida: true },
        { status: 'analise', label: 'Em análise', concluida: false },
        { status: 'respondido', label: 'Respondido', concluida: false },
        { status: 'concluido', label: 'Concluído', concluida: false },
      ],
    },
  ];

  /** "Minhas Manifestações" (visão de quem envia: aluno ou professor). */
  obterPorRemetente(remetente: RemetenteManifestacao): Manifestacao[] {
    return this.manifestacoes.filter((m) => m.remetente === remetente);
  }

  /** "Manifestações Recebidas" (visão da gestão): ainda aguardando resposta. */
  obterRecebidas(): Manifestacao[] {
    return this.manifestacoes.filter((m) => !m.resposta);
  }

  /** "Manifestações Respondidas" (visão da gestão): já respondidas — as mesmas que aparecem como respondidas para quem enviou. */
  obterRespondidas(): Manifestacao[] {
    return this.manifestacoes.filter((m) => !!m.resposta);
  }

  registrarManifestacao(
    remetente: RemetenteManifestacao,
    dados: { titulo: string; categorias: string[]; descricao: string }
  ): Manifestacao {
    const agora = new Date();
    const dataFormatada = agora.toLocaleDateString('pt-BR');

    const manifestacao: Manifestacao = {
      protocolo: `#2026-0${this.proximoProtocolo++}`,
      remetente,
      titulo: dados.titulo,
      categorias: dados.categorias,
      descricao: dados.descricao,
      data: dataFormatada,
      statusAtual: 'recebido',
      etapas: [
        {
          status: 'recebido',
          label: 'Recebido',
          data: `${dataFormatada} ${agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`,
          concluida: true,
        },
        { status: 'analise', label: 'Em análise', concluida: false },
        { status: 'respondido', label: 'Respondido', concluida: false },
        { status: 'concluido', label: 'Concluído', concluida: false },
      ],
    };

    this.manifestacoes.unshift(manifestacao);
    return manifestacao;
  }

  /** Direção (ou Administrador) responde a uma manifestação recebida. */
  responder(protocolo: string, texto: string, autor: string): void {
    const manifestacao = this.manifestacoes.find((m) => m.protocolo === protocolo);
    if (!manifestacao) return;

    const agora = new Date();
    const dataFormatada = `${agora.toLocaleDateString('pt-BR')} ${agora.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}`;

    manifestacao.resposta = { texto, autor, data: dataFormatada };
    manifestacao.statusAtual = 'respondido';

    for (const etapa of manifestacao.etapas) {
      if (etapa.status === 'concluido') continue;
      if (!etapa.concluida) {
        etapa.concluida = true;
        etapa.data = etapa.data ?? dataFormatada;
      }
    }
  }
}
