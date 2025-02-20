import { inicializarMenuMobile } from './modulos/menuMobile.js';
import { inicializarAnimacoesScroll } from './modulos/animacoesScroll.js';
import { setupScrollAnimation } from './modulos/scrollAnimation.js';
import { inicializarFormulario } from './modulos/formulario.js';
import { initMarqueeAllNichos } from './modulos/marquee.js';
import { CaseEquipeCarousel } from './modulos/caseEquipeCarousel.js';

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();

      const targetId = e.currentTarget.getAttribute('href').substring(1);
      let targetElement;

      if (targetId) {
        targetElement = document.getElementById(targetId);
      } else {
        targetElement = document.body;
      }

      if (targetElement) {
        const threeRem =
          parseFloat(getComputedStyle(document.documentElement).fontSize) * 3;

        const elementPosition =
          targetElement.getBoundingClientRect().top + window.pageYOffset;

        const offsetPosition = elementPosition - threeRem;

        window.scrollTo({
          top: offsetPosition < 0 ? 0 : offsetPosition,
          behavior: 'smooth',
        });
      }
    });
  });

  // 1) Menu Mobile
  inicializarMenuMobile();

  // 2) Animações gerais de scroll
  inicializarAnimacoesScroll();

  // 3) IntersectionObserver (ScrollAnimation)
  setupScrollAnimation('.cards-servicos-nicho');

  // 4) Formulário
  inicializarFormulario();

  // 5) Marquee e Botões de Nichos (com velocidade=1, por ex.)
  initMarqueeAllNichos(1, 48);

  // 6) Carousel testemunho
  const carousel = new CaseEquipeCarousel('#case_equipe');
});
