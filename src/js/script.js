const menuToggle = document.getElementById('menu-toggle');
const headerEl = document.querySelector('.header');

menuToggle.addEventListener('click', () => {
  menuToggle.classList.toggle('active');
  headerEl.classList.toggle('active');
});

const dropdownToggle = document.getElementById('dropdown-toggle');
const dropdown = document.getElementById('dropdown');
let hoverTimeout;

dropdownToggle.addEventListener('mouseover', () => {
  dropdown.classList.add('active');
  clearTimeout(hoverTimeout);
});

dropdownToggle.addEventListener('mouseout', () => {
  hoverTimeout = setTimeout(() => {
    if (!dropdown.matches(':hover')) {
      dropdown.classList.remove('active');
    }
  }, 300);
});

dropdown.addEventListener('mouseover', () => {
  clearTimeout(hoverTimeout);
});

dropdown.addEventListener('mouseout', () => {
  hoverTimeout = setTimeout(() => {
    dropdown.classList.remove('active');
  }, 200);
});

// =========== INTERSECTION OBSERVER PARA FADE-IN ===========
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  },
  { threshold: 0.3 },
);

const fadeElements = document.querySelectorAll('.fade-in');
fadeElements.forEach(el => observer.observe(el));

// =========== VALIDAÇÃO SIMPLES DO FORMULÁRIO ===========
const form = document.getElementById('contactForm');
const formError = document.getElementById('formError');

form.addEventListener('submit', function (e) {
  e.preventDefault();

  const nome = document.getElementById('nome');
  const email = document.getElementById('email');
  const telefone = document.getElementById('telefone');
  const investimento = document.getElementById('base_investimento');
  const funcionarios = document.getElementById('base_funcionarios');
  const mensagem = document.getElementById('mensagem');

  if (
    nome.value.trim() === '' ||
    email.value.trim() === '' ||
    telefone.value.trim() === '' ||
    investimento.value === '' ||
    funcionarios.value === '' ||
    mensagem.value.trim() === ''
  ) {
    formError.style.display = 'block';
    return;
  } else {
    formError.style.display = 'none';
  }

  // Exemplo de ação posterior:
  alert(`Olá, ${nome.value}! Recebemos sua mensagem e em breve retornaremos.`);
  form.reset();
});
