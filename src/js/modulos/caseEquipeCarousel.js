export class CaseEquipeCarousel {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    if (!this.container) return;

    // Elementos internos
    this.slidesContainer = this.container.querySelector('.case_equipe__slides');
    this.slides = this.container.querySelectorAll('.case_equipe-card');
    this.prevBtn = this.container.querySelector('.case_equipe__nav--prev');
    this.nextBtn = this.container.querySelector('.case_equipe__nav--next');

    // Estado
    this.currentIndex = 0;
    this.totalSlides = this.slides.length;
    this.cardsPerView = 3; // Será recalculado

    // Função que calcula quantos cards cabem na tela
    this.recalcCardsPerView = () => {
      if (!this.slides.length) return;

      const containerWidth = this.slidesContainer.offsetWidth;
      const firstCard = this.slides[0];
      const cardWidth = firstCard.offsetWidth;

      // Tenta pegar o gap definido em CSS; se não existir, fallback = 32px (~2rem)
      const slidesStyles = window.getComputedStyle(this.slidesContainer);
      const gapValue = slidesStyles.getPropertyValue('gap');
      const gap = gapValue ? parseFloat(gapValue) : 32;

      const itemSpace = cardWidth + gap;

      let newCardsPerView = Math.floor(containerWidth / itemSpace);

      if (newCardsPerView < 1) newCardsPerView = 1;
      if (newCardsPerView > this.totalSlides) {
        newCardsPerView = this.totalSlides;
      }

      this.cardsPerView = newCardsPerView;
    };

    // Atualiza a posição dos slides com base no índice atual
    this.updateSlidePosition = () => {
      this.recalcCardsPerView();
      if (!this.slides.length) return;

      const firstCard = this.slides[0];
      const cardWidth = firstCard.offsetWidth;

      const slidesStyles = window.getComputedStyle(this.slidesContainer);
      const gapValue = slidesStyles.getPropertyValue('gap');
      const gap = gapValue ? parseFloat(gapValue) : 32;
      const itemSpace = cardWidth + gap;

      const offset = this.currentIndex * itemSpace;
      this.slidesContainer.style.transform = `translateX(-${offset}px)`;
    };

    // Avança 1 card, ajustando o cálculo do índice máximo conforme a largura da tela
    this.next = () => {
      this.recalcCardsPerView();
      let maxIndex;
      if (window.innerWidth < 600) {
        maxIndex = this.totalSlides - this.cardsPerView;
      } else {
        maxIndex = this.totalSlides - this.cardsPerView - 1;
      }

      if (this.currentIndex >= maxIndex) {
        this.currentIndex = 0;
      } else {
        this.currentIndex++;
      }
      this.updateSlidePosition();
    };

    // Retrocede 1 card, ajustando o cálculo do índice máximo conforme a largura da tela
    this.prev = () => {
      this.recalcCardsPerView();
      let maxIndex;
      if (window.innerWidth < 600) {
        maxIndex = this.totalSlides - this.cardsPerView;
      } else {
        maxIndex = this.totalSlides - this.cardsPerView - 1;
      }

      if (this.currentIndex <= 0) {
        this.currentIndex = maxIndex >= 0 ? maxIndex : 0;
      } else {
        this.currentIndex--;
      }
      this.updateSlidePosition();
    };

    // Eventos para os botões de navegação
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prev());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.next());
    }

    // Atualiza a posição ao redimensionar a janela
    window.addEventListener('resize', () => {
      this.updateSlidePosition();
    });

    // Inicializa o carousel
    this.updateSlidePosition();
  }
}
