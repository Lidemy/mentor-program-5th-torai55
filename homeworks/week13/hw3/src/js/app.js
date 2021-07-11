// eslint-disable-next-line no-unused-vars
import css from '../style.css'
import { getTopGames, getStreams } from './api'
import { renderContent, renderLinks, scrollHandler, loadMore } from './utils'
import { GAMELIMIT } from './variables'

document.addEventListener('DOMContentLoaded', () => {
  getTopGames(GAMELIMIT)
    .then((topGames) => {
      renderLinks(topGames)
      return getStreams(topGames[0])
    })
    .then((data) => renderContent(data))
    .catch((e) => console.error(e))
  loadMore()

  const links = document.querySelector('nav .links')
  links.addEventListener('click', (e) => {
    getStreams(e.target.textContent)
      .then((data) => renderContent(data))
      .catch((e) => console.error(e))
    loadMore()
  })
})

document.addEventListener('scroll', scrollHandler)
