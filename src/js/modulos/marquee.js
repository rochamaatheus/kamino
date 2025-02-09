// Variáveis globais para guardar a velocidade e o extraGap (caso queira alterar depois)
let currentSpeed = 1;
let currentExtraGap = 0;

/**
 * Classe que encapsula a lógica do marquee (rolagem infinita)
 */
class Marquee {
  constructor(container, speed, extraGap = 0) {
    this.container = container;
    this.speed = speed;
    this.extraGap = extraGap; // novo parâmetro para ajustar os gaps
    this.offset = 0;
    this.paused = false;
    this.rafId = null;

    if (!this.container.dataset.duplicated) {
      this.container.innerHTML += this.container.innerHTML;
      this.container.dataset.duplicated = 'true';
    }

    this.totalWidth = this.computeTotalWidth();

    // Bind dos métodos para os event listeners
    this.handleMouseEnter = this.pause.bind(this);
    this.handleMouseLeave = this.resume.bind(this);
    if (!this.container.dataset.marqueeListenersAdded) {
      this.container.addEventListener('mouseenter', this.handleMouseEnter);
      this.container.addEventListener('mouseleave', this.handleMouseLeave);
      this.container.dataset.marqueeListenersAdded = 'true';
    }

    this.animate = this.animate.bind(this);
    this.animate();
  }

  computeTotalWidth() {
    const children = Array.from(this.container.children);
    const originalCount = this.container.dataset.duplicated
      ? children.length / 2
      : children.length;
    if (originalCount < 1) return 0;
    const originalItems = children.slice(0, originalCount);

    let totalWidth = 0;
    originalItems.forEach(item => {
      totalWidth += item.getBoundingClientRect().width;
    });

    const style = window.getComputedStyle(this.container);
    const gap = parseFloat(style.gap || style.columnGap || 0);
    if (originalItems.length > 1) {
      totalWidth += gap * (originalItems.length - 1);
    }
    // Adiciona o extraGap informado, para compensar o gap que o marquee não estava considerando no reset
    totalWidth += this.extraGap;
    return totalWidth;
  }

  animate() {
    if (!this.paused) {
      this.offset -= this.speed;
      if (Math.abs(this.offset) >= this.totalWidth) {
        this.offset += this.totalWidth;
      }
      this.container.style.transform = `translateX(${this.offset}px)`;
    }
    this.rafId = requestAnimationFrame(this.animate);
  }

  pause() {
    this.paused = true;
  }

  resume() {
    this.paused = false;
  }

  cancel() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    // Remove os event listeners para que possam ser re-adicionados na nova instância
    this.container.removeEventListener('mouseenter', this.handleMouseEnter);
    this.container.removeEventListener('mouseleave', this.handleMouseLeave);
    delete this.container.dataset.marqueeListenersAdded;
  }
}

/**
 * Função para configurar o marquee em um container específico.
 * Se já houver uma instância, atualiza a velocidade.
 */
function setupMarquee(container, speed, extraGap = 0) {
  if (!container) return;
  if (container._marqueeInstance) {
    container._marqueeInstance.speed = speed;
    container._marqueeInstance.extraGap = extraGap;
    return;
  }
  container._marqueeInstance = new Marquee(container, speed, extraGap);
}

/**
 * Configura os botões que alternam as seções de nichos e o respectivo marquee.
 */
export function setupNichoButtons() {
  const nichoButtons = document.querySelectorAll('.btn-nicho');
  const nichoSections = document.querySelectorAll('.cards-servicos-nicho');

  nichoButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove a classe .active de todos os botões e ativa o clicado
      nichoButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Para cada seção, cancela o marquee (se existir) e remove a classe .active
      nichoSections.forEach(section => {
        const marqueeContainer = section.querySelector('.cards-servicos-items');
        if (marqueeContainer && marqueeContainer._marqueeInstance) {
          marqueeContainer._marqueeInstance.cancel();
          marqueeContainer._marqueeInstance = null;
        }
        section.classList.remove('active');
      });

      // Exibe a seção correspondente ao botão clicado
      const nicho = button.getAttribute('data-nicho');
      const targetSection = document.getElementById(nicho);
      if (targetSection) {
        targetSection.classList.add('active');
      }

      // Seleciona o container do marquee da seção ativa
      const marqueeContainer = targetSection
        ? targetSection.querySelector('.cards-servicos-items')
        : null;
      if (window.innerWidth >= 890) {
        if (marqueeContainer) {
          // Usa currentSpeed e currentExtraGap para manter a referência original
          setupMarquee(marqueeContainer, currentSpeed, currentExtraGap);
        }
      } else {
        // Se for menor, garante que não haverá animação e reseta o transform
        if (marqueeContainer) {
          if (marqueeContainer._marqueeInstance) {
            marqueeContainer._marqueeInstance.cancel();
            marqueeContainer._marqueeInstance = null;
          }
          marqueeContainer.style.transform = 'none';
        }
      }
    });
  });
}

/**
 * Inicializa o marquee em todos os nichos (ou apenas no ativo) conforme a largura da tela.
 * Também configura a reação para o evento de resize, ativando/desativando o marquee dinamicamente.
 */
export function initMarqueeAllNichos(speed = 1, extraGap = 0) {
  currentSpeed = speed; // Salva a velocidade globalmente
  currentExtraGap = extraGap; // Salva o extraGap globalmente

  // Configura os botões de nicho
  setupNichoButtons();

  // Se a tela for >= 890px, inicia o marquee nos containers do nicho ativo
  if (window.innerWidth >= 890) {
    const activeMarqueeContainers = document.querySelectorAll(
      '.cards-servicos-nicho.active .cards-servicos-items',
    );
    activeMarqueeContainers.forEach(marqueeContainer => {
      setupMarquee(marqueeContainer, speed, extraGap);
    });
  }

  // Reage ao evento de resize para ativar/desativar o marquee conforme a largura da tela
  window.addEventListener('resize', () => {
    const activeMarqueeContainer = document.querySelector(
      '.cards-servicos-nicho.active .cards-servicos-items',
    );
    if (activeMarqueeContainer) {
      if (window.innerWidth >= 890) {
        setupMarquee(activeMarqueeContainer, currentSpeed, currentExtraGap);
      } else {
        if (activeMarqueeContainer._marqueeInstance) {
          activeMarqueeContainer._marqueeInstance.cancel();
          activeMarqueeContainer._marqueeInstance = null;
        }
        activeMarqueeContainer.style.transform = 'none';
      }
    }
  });
}
