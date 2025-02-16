import { inicializarMenuMobile } from './modulos/menuMobile.js';
import { inicializarDropdown } from './modulos/dropdown.js';
import { inicializarAnimacoesScroll } from './modulos/animacoesScroll.js';
import { setupScrollAnimation } from './modulos/scrollAnimation.js';
import { inicializarFormulario } from './modulos/formulario.js';
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

  // 5) Formulário
  inicializarFormulario();

  // 6) Marquee e Botões de Nichos (com velocidade=1, por ex.)
  initMarqueeAllNichos(1, 48);
});
