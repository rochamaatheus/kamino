// Duplicação de cards (caso necessário para algum slider?)
const duplicarCardsServicos = () => {
  const entregasItems = document.querySelector('.cards-servicos-items');
  if (entregasItems) {
    entregasItems.innerHTML += entregasItems.innerHTML;
  }
};
duplicarCardsServicos();

// Controle do menu mobile
const inicializarMenuMobile = () => {
  const menuToggle = document.getElementById('menu-toggle');
  const headerEl = document.querySelector('.header');
  const navEl = document.querySelector('nav');

  const toggleMenu = () => {
    menuToggle.classList.toggle('active');
    headerEl.classList.toggle('active');
    navEl.classList.toggle('active');
  };

  // Event listeners
  menuToggle.addEventListener('click', toggleMenu);

  // Fechar menu ao clicar nos links
  document.querySelectorAll('nav ul li a').forEach(item => {
    item.addEventListener('click', () => {
      navEl.classList.remove('active');
      menuToggle.classList.remove('active');
      headerEl.classList.remove('active');
    });
  });

  // Fechar menu ao clicar fora
  document.addEventListener('click', event => {
    if (!navEl.contains(event.target) && !menuToggle.contains(event.target)) {
      navEl.classList.remove('active');
      menuToggle.classList.remove('active');
      headerEl.classList.remove('active');
    }
  });
};
inicializarMenuMobile();

// Dropdown com hover
const inicializarDropdown = () => {
  const dropdownToggle = document.getElementById('dropdown-toggle');
  const dropdown = document.getElementById('dropdown');
  let hoverTimeout;
  let isDropdownActive = false;

  const showDropdown = () => {
    clearTimeout(hoverTimeout);
    dropdown.classList.add('active');
    isDropdownActive = true;
  };

  const hideDropdown = () => {
    hoverTimeout = setTimeout(() => {
      if (!dropdown.matches(':hover') && !dropdownToggle.matches(':hover')) {
        dropdown.classList.remove('active');
        isDropdownActive = false;
      }
    }, 100);
  };

  // Event listeners para o toggle
  dropdownToggle.addEventListener('mouseenter', () => {
    if (!isDropdownActive) showDropdown();
  });

  dropdownToggle.addEventListener('mouseleave', hideDropdown);

  // Event listeners para o dropdown
  dropdown.addEventListener('mouseenter', showDropdown);
  dropdown.addEventListener('mouseleave', hideDropdown);

  // Fechar ao clicar fora
  document.addEventListener('click', e => {
    if (!dropdown.contains(e.target) && !dropdownToggle.contains(e.target)) {
      dropdown.classList.remove('active');
      isDropdownActive = false;
    }
  });
};
inicializarDropdown();

const inicializarAnimacoesScroll = () => {
  let isWideViewport = () => window.innerWidth > 768;

  // Define o threshold dinamicamente com base no tamanho da tela
  const getThreshold = () => (isWideViewport() ? 0.4 : 0.1);

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Adiciona a classe de animação
          entry.target.classList.add('show');

          // Para de observar o elemento após a animação
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: getThreshold() }, // Corrigido: threshold é uma propriedade do objeto de opções
  );

  // Observa todos os elementos com a classe .fade-in
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
};
inicializarAnimacoesScroll();

// Adiciona um listener para redimensionamento da tela
window.addEventListener('resize', () => {
  inicializarAnimacoesScroll();
});

// Anima ao aparecer com reset de translateX e controle de responsividade.
// Uma vez ativado, a animação não é desativada mesmo se o elemento sair da viewport.
function setupScrollAnimation(selector, responsive = true) {
  const element = document.querySelector(selector);

  if (!element) {
    console.error(`Elemento com o seletor "${selector}" não encontrado.`);
    return;
  }

  let observer = null;
  let activated = false;
  let isWideViewport = () => window.innerWidth > 768;

  // Define o threshold dinamicamente com base no tamanho da tela
  const getThreshold = () => (isWideViewport() ? 0.4 : 0.1);

  const initAnimation = () => {
    if ((responsive && !isWideViewport()) || observer) return;

    observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !activated) {
            activated = true;
            entry.target.style.transform = 'translateX(0)';
            entry.target.classList.add('anime--active');
            observer.disconnect();
          }
        });
      },
      { threshold: getThreshold() }, // Usa o threshold dinâmico
    );

    observer.observe(element);
  };

  const destroyAnimation = () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    element.classList.remove('anime--active');
    element.style.transform = 'translateX(0)';
    activated = false;
  };

  let resizeTimeout;
  const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (responsive) {
        if (isWideViewport()) {
          initAnimation();
        } else {
          destroyAnimation();
        }
      } else {
        initAnimation();
      }
    }, 100);
  };

  window.addEventListener('resize', handleResize);
  handleResize();

  return () => {
    destroyAnimation();
    window.removeEventListener('resize', handleResize);
  };
}
setupScrollAnimation('.cards-servicos');
setupScrollAnimation('#comparativo', false);
setupScrollAnimation('#metodologia', false);

// Define o offset para os marcadores (caso seja utilizado no CSS)
document.documentElement.style.setProperty('--circle-offset', '25px');

const updateTimeline = () => {
  const container = document.querySelector('.desc-metodologia');
  if (!container) return;

  const verticalLine = container.querySelector('.vertical-line');
  const { top: containerTop } = container.getBoundingClientRect();
  const containerHeight = container.offsetHeight;
  const activationOffset = 120;

  // Calcula a altura do preenchimento, limitando entre 0 e a altura do container
  let fillHeight = window.innerHeight - activationOffset - containerTop;
  fillHeight = Math.min(Math.max(fillHeight, 0), containerHeight);

  // Atualiza a variável CSS com o percentual de preenchimento
  const fillPercent = (fillHeight / containerHeight) * 100;
  verticalLine.style.setProperty('--line-fill', `${fillPercent}%`);

  // Ativa ou desativa cada tópico com base na posição do marcador
  container.querySelectorAll('.topic').forEach(topic => {
    const h3 = topic.querySelector('h3');
    if (!h3) return;
    const { top: h3Top, height: h3Height } = h3.getBoundingClientRect();
    const markerCenter = h3Top - containerTop + h3Height / 2;
    topic.classList.toggle('active', fillHeight >= markerCenter);
  });
};

// Atualiza a timeline nos eventos de scroll e resize
['scroll', 'resize'].forEach(event =>
  window.addEventListener(event, updateTimeline),
);
updateTimeline();

// Uso
setupScrollAnimation('.cards-servicos');

// Validação de formulário
const inicializarFormulario = () => {
  const form = document.getElementById('contactForm');
  const formError = document.getElementById('formError');
  const camposObrigatorios = [
    'nome',
    'email',
    'telefone',
    'base_investimento',
    'base_funcionarios',
    'mensagem',
  ];

  form.addEventListener('submit', e => {
    e.preventDefault();
    let camposVazios = false;

    // Verificar campos obrigatórios
    camposObrigatorios.forEach(campoId => {
      const campo = document.getElementById(campoId);
      if (campo.value.trim() === '') {
        camposVazios = true;
        campo.classList.add('error');
      } else {
        campo.classList.remove('error');
      }
    });

    if (camposVazios) {
      formError.style.display = 'block';
      return;
    }

    formError.style.display = 'none';
    alert(
      `Olá, ${
        document.getElementById('nome').value
      }! Recebemos sua mensagem e em breve retornaremos.`,
    );
    form.reset();
  });
};
inicializarFormulario();
