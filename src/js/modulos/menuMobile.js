export function inicializarMenuMobile() {
  const menuToggle = document.getElementById('menu-toggle');
  const headerEl = document.querySelector('.header');
  const navEl = document.querySelector('nav');

  if (!menuToggle || !headerEl || !navEl) return;

  function toggleMenu() {
    const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';

    // Alterna classes visuais
    menuToggle.classList.toggle('active');
    headerEl.classList.toggle('active');
    navEl.classList.toggle('active');

    // Acessibilidade: Alternar aria-expanded e aria-label
    menuToggle.setAttribute('aria-expanded', !isExpanded);
    menuToggle.setAttribute(
      'aria-label',
      isExpanded ? 'Abrir menu' : 'Fechar menu',
    );
  }

  // Evento de clique para abrir/fechar menu
  menuToggle.addEventListener('click', toggleMenu);

  // Fechar menu ao clicar em um link
  document.querySelectorAll('nav ul li a').forEach(item => {
    item.addEventListener('click', () => {
      navEl.classList.remove('active');
      menuToggle.classList.remove('active');
      headerEl.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menu');
    });
  });

  // Fechar menu ao clicar fora dele
  document.addEventListener('click', event => {
    if (!navEl.contains(event.target) && !menuToggle.contains(event.target)) {
      navEl.classList.remove('active');
      menuToggle.classList.remove('active');
      headerEl.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menu');
    }
  });
}
