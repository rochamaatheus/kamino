export function inicializarAnimacoesScroll() {
  const isWideViewport = () => window.innerWidth > 768;

  // Define o threshold dinamicamente
  const getThreshold = () => (isWideViewport() ? 0.4 : 0.1);

  // Cria o IntersectionObserver
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Adiciona a classe de animação
          entry.target.classList.add('show');
          // Para de observar esse elemento
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: getThreshold() },
  );

  // Observa todos os elementos com .fade-in
  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

  // Recriar observer ao redimensionar (caso queira recalcular threshold)
  window.addEventListener('resize', () => {
    // Você pode criar lógica adicional caso precise reiniciar a animação
  });
}
