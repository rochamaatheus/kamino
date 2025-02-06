import { duplicarCardsServicos } from './modulos/duplicarCards.js';
import { inicializarMenuMobile } from './modulos/menuMobile.js';
import { inicializarDropdown } from './modulos/dropdown.js';
import { inicializarAnimacoesScroll } from './modulos/animacoesScroll.js';
import { setupScrollAnimation } from './modulos/scrollAnimation.js';
import { initTimeline } from './modulos/timeline.js';
import { inicializarFormulario } from './modulos/formulario.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1) Duplicar cards
  duplicarCardsServicos();

  // 2) Menu Mobile
  inicializarMenuMobile();

  // 3) Dropdown (hover)
  inicializarDropdown();

  // 4) Animações de scroll (ex.: .fade-in)
  inicializarAnimacoesScroll();

  // 5) Animação por IntersectionObserver em elementos específicos
  setupScrollAnimation('.cards-servicos');
  setupScrollAnimation('#comparativo', false);
  setupScrollAnimation('#metodologia', false);

  // 6) Timeline
  initTimeline();

  // 7) Formulário
  inicializarFormulario();

  document.documentElement.style.setProperty('--circle-offset', '25px');
});
