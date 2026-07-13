import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

/**
 * Controla o tema (claro/escuro) do painel.
 * A troca só é efetivada de fato em toda a tela quando `aplicarTema` é
 * chamado (ex: ao clicar em "Salvar configurações" na página de
 * Configurações). Até lá, a tela pode manter apenas uma pré-visualização
 * local do toggle, sem afetar o restante do painel.
 */
@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly STORAGE_KEY = 'tema-escuro';

  private get isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  /** Tema escuro atualmente ativo (persistido/efetivado). */
  get temaEscuroAtivo(): boolean {
    if (!this.isBrowser) return false;
    return sessionStorage.getItem(this.STORAGE_KEY) === '1';
  }

  /** Aplica (ou remove) o tema escuro em todo o painel. */
  aplicarTema(ativo: boolean): void {
    if (!this.isBrowser) return;
    sessionStorage.setItem(this.STORAGE_KEY, ativo ? '1' : '0');
    document.body.classList.toggle('tema-escuro', ativo);
  }

  /** Reaplica o tema salvo — chamado na inicialização da aplicação. */
  inicializar(): void {
    if (!this.isBrowser) return;
    document.body.classList.toggle('tema-escuro', this.temaEscuroAtivo);
  }
}
