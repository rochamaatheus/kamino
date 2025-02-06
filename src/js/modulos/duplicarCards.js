export function duplicarCardsServicos() {
  const entregasItems = document.querySelector('.cards-servicos-items');
  if (entregasItems) {
    entregasItems.innerHTML += entregasItems.innerHTML;
  }
}
