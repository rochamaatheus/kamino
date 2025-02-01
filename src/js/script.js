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

// Animação de scroll (Intersection Observer)
const inicializarAnimacoesScroll = () => {
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
    { threshold: 0.4 }, // Ajuste o threshold conforme necessário
  );

  // Observa todos os elementos com a classe .fade-in
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
};
inicializarAnimacoesScroll();

// Anima ao aparecer com reset de translateX e controle de responsividade.
// Uma vez ativado, a animação não é desativada mesmo se o elemento sair da viewport.
function setupScrollAnimation(selector, threshold = 0.4, responsive = true) {
  const element = document.querySelector(selector);

  if (!element) {
    console.error(`Elemento com o seletor "${selector}" não encontrado.`);
    return;
  }

  let observer = null;
  let activated = false; // Flag que indica se a animação já foi ativada
  let isWideViewport = () => window.innerWidth > 768;

  const initAnimation = () => {
    // Se for responsivo e a viewport não for larga, não inicializa
    // Ou se o observer já foi criado (ou já ativado), sai
    if ((responsive && !isWideViewport()) || observer) return;

    observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          // Se o elemento está visível e ainda não foi ativado, ativa a animação
          if (entry.isIntersecting && !activated) {
            activated = true;
            entry.target.classList.add('anime--active');
            // Se houver alguma transformação inline, opcionalmente pode resetá-la aqui:
            entry.target.style.transform = 'translateX(0)';
            // Desconecta o observer para evitar toggles posteriores
            observer.disconnect();
          }
        });
      },
      { threshold },
    );

    observer.observe(element);
  };

  const destroyAnimation = () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    // Se ainda não foi ativado, reseta o estado do elemento.
    if (!activated) {
      element.classList.remove('anime--active');
      element.style.transform = 'translateX(0)';
    }
  };

  // Controle de redimensionamento com debounce
  let resizeTimeout;
  const handleResize = () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      if (responsive) {
        isWideViewport() ? initAnimation() : destroyAnimation();
      } else {
        initAnimation();
      }
    }, 100);
  };

  window.addEventListener('resize', handleResize);
  handleResize(); // Verifica na carga inicial

  // Retorna uma função de cleanup, se for necessário destruir o observer futuramente
  return () => {
    destroyAnimation();
    window.removeEventListener('resize', handleResize);
  };
}
setupScrollAnimation('.cards-servicos');
setupScrollAnimation('#comparativo', 0.4, false);
setupScrollAnimation('#metodologia', 0.4, false);

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
