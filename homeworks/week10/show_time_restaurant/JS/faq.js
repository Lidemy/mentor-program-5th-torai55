const cards = document.querySelector('.faq__cards')

cards.addEventListener('click', (e) => {
  if (!(e.target.classList.contains('question'))) return
  const card = e.target.closest('.faq__card')
  card?.querySelector('.answer').classList.toggle('collapsed')
})
