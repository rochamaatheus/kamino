export function inicializarFormulario() {
  const form = document.getElementById('contactForm');
  if (!form) return;

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
      if (campo && campo.value.trim() === '') {
        camposVazios = true;
        campo.classList.add('error');
      } else {
        campo?.classList.remove('error');
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
}
