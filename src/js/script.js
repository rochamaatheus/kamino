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

// Animação de Carrossel
function setupScrollAnimation(selector, threshold = 0.4) {
  const element = document.querySelector(selector);

  if (!element) {
    console.error(`Elemento com o seletor "${selector}" não encontrado.`);
    return;
  }

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('cards-servicos--active');
        } else {
          entry.target.classList.remove('cards-servicos--active');
        }
      });
    },
    { threshold },
  );

  observer.observe(element);
}

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
