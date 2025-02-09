import { inicializarMenuMobile } from './modulos/menuMobile.js';
import { inicializarDropdown } from './modulos/dropdown.js';
import { inicializarAnimacoesScroll } from './modulos/animacoesScroll.js';
import { setupScrollAnimation } from './modulos/scrollAnimation.js';
import { initTimeline } from './modulos/timeline.js';
import { inicializarFormulario } from './modulos/formulario.js';

/* Importa as funções do marquee */
import { initMarqueeAllNichos } from './modulos/marquee.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1) Menu Mobile
  inicializarMenuMobile();

  // 2) Dropdown (hover)
  inicializarDropdown();

  // 3) Animações gerais de scroll
  inicializarAnimacoesScroll();

  // 4) IntersectionObserver (ScrollAnimation)
  setupScrollAnimation('.cards-servicos-nicho');
  setupScrollAnimation('#comparativo', false);
  setupScrollAnimation('#metodologia', false);

  // 5) Timeline
  initTimeline();

  // 6) Formulário
  inicializarFormulario();

  // 7) Ajustes adicionais (exemplo)
  document.documentElement.style.setProperty('--circle-offset', '25px');

  // 8) Marquee e Botões de Nichos (com velocidade=1, por ex.)
  initMarqueeAllNichos(1);
});
