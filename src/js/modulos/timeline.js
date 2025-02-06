export function initTimeline() {
  const container = document.querySelector('.desc-metodologia');
  if (!container) return;

  const verticalLine = container.querySelector('.vertical-line');
  if (!verticalLine) return;

  function updateTimeline() {
    const { top: containerTop } = container.getBoundingClientRect();
    const containerHeight = container.offsetHeight;
    const activationOffset = 120;

    let fillHeight = window.innerHeight - activationOffset - containerTop;
    fillHeight = Math.min(Math.max(fillHeight, 0), containerHeight);

    // Percentual de preenchimento
    const fillPercent = (fillHeight / containerHeight) * 100;
    verticalLine.style.setProperty('--line-fill', `${fillPercent}%`);

    // Ativa cada tópico
    container.querySelectorAll('.topic').forEach(topic => {
      const h3 = topic.querySelector('h3');
      if (!h3) return;
      const { top: h3Top, height: h3Height } = h3.getBoundingClientRect();
      const markerCenter = h3Top - containerTop + h3Height / 2;
      topic.classList.toggle('active', fillHeight >= markerCenter);
    });
  }

  // Observa scroll e resize
  ['scroll', 'resize'].forEach(evt =>
    window.addEventListener(evt, updateTimeline),
  );
  // Chamada inicial
  updateTimeline();

  // Retorno opcional, se quiser “desmontar” depois
  return () => {
    ['scroll', 'resize'].forEach(evt =>
      window.removeEventListener(evt, updateTimeline),
    );
  };
}
