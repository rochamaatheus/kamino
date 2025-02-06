export function inicializarDropdown() {
  const dropdownToggle = document.getElementById('dropdown-toggle');
  const dropdown = document.getElementById('dropdown');

  if (!dropdownToggle || !dropdown) return;

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

  // Mostrar/ocultar ao passar o mouse
  dropdownToggle.addEventListener('mouseenter', () => {
    if (!isDropdownActive) showDropdown();
  });
  dropdownToggle.addEventListener('mouseleave', hideDropdown);

  dropdown.addEventListener('mouseenter', showDropdown);
  dropdown.addEventListener('mouseleave', hideDropdown);

  // Fechar ao clicar fora
  document.addEventListener('click', e => {
    if (!dropdown.contains(e.target) && !dropdownToggle.contains(e.target)) {
      dropdown.classList.remove('active');
      isDropdownActive = false;
    }
  });
}
