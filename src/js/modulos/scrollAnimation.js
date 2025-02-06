export function setupScrollAnimation(selector, responsive = true) {
  const element = document.querySelector(selector);
  if (!element) {
    console.error(`Elemento com seletor "${selector}" não encontrado.`);
    return;
  }

  let observer = null;
  let activated = false;
  const isWideViewport = () => window.innerWidth > 768;
  const getThreshold = () => (isWideViewport() ? 0.4 : 0.1);

  const initAnimation = () => {
    // Se já existe um observer, não cria outro
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
      { threshold: getThreshold() },
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

  // Ajustes para resize
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

  // Inicia
  window.addEventListener('resize', handleResize);
  handleResize();

  // Retorno opcional caso você queira destruir depois
  return () => {
    destroyAnimation();
    window.removeEventListener('resize', handleResize);
  };
}
